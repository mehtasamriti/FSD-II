import { useCallback, useMemo, useState } from "react";
import {
  DndContext,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./App.css";

// ---------------- SAMPLE POSTS ----------------

const initialPosts = [
  {
    id: "1",
    title: "Instagram Product Launch",
    platform: "Instagram",
    date: "2026-08-31",
    time: "10:00 AM",
    status: "Scheduled",
  },
  {
    id: "2",
    title: "Facebook Marketing Tips",
    platform: "Facebook",
    date: "2026-09-01",
    time: "12:00 PM",
    status: "Scheduled",
  },
  {
    id: "3",
    title: "LinkedIn Career Post",
    platform: "LinkedIn",
    date: "2026-09-02",
    time: "02:00 PM",
    status: "Draft",
  },
  {
    id: "4",
    title: "Twitter Tech Update",
    platform: "Twitter",
    date: "2026-09-03",
    time: "04:00 PM",
    status: "Scheduled",
  },
  {
    id: "5",
    title: "Weekend Promotion",
    platform: "Instagram",
    date: "2026-09-05",
    time: "11:00 AM",
    status: "Draft",
  },
];

// ---------------- SORTABLE CARD ----------------

function PostCard({ post, optimized }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: post.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  console.log(
    `${optimized ? "Optimized" : "Non-Optimized"} card rendered:`,
    post.title
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="post-card"
    >
      <div className="card-top">
        <span className="platform">{post.platform}</span>

        <span
          className={`status ${
            post.status === "Draft" ? "draft" : "scheduled"
          }`}
        >
          {post.status}
        </span>
      </div>

      <h3>{post.title}</h3>

      <div className="post-info">
        <span>📅 {post.date}</span>
        <span>⏰ {post.time}</span>
      </div>

      <div className="drag-text">⋮⋮ Drag card</div>
    </div>
  );
}

// ---------------- CALENDAR COLUMN ----------------

function CalendarColumn({ date, posts, optimized }) {
  const { setNodeRef, isOver } = useDroppable({
    id: date,
  });

  return (
    <div
      ref={setNodeRef}
      className={`calendar-column ${isOver ? "drop-active" : ""}`}
    >
      <div className="date-header">
        <strong>{date}</strong>
        <span>{posts.length} posts</span>
      </div>

      <SortableContext
        items={posts.map((post) => post.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="cards-area">
          {posts.length === 0 ? (
            <div className="empty-drop">
              Drop post here
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                optimized={optimized}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}

// ---------------- MAIN APP ----------------

function App() {
  const [posts, setPosts] = useState(initialPosts);

  const [optimized, setOptimized] = useState(true);

  const [showScheduled, setShowScheduled] = useState(true);
  const [showDrafts, setShowDrafts] = useState(true);
  const [showMonitoring, setShowMonitoring] = useState(true);

  // useMemo
  const filteredPosts = useMemo(() => {
    console.log("Filtering posts...");

    return posts.filter((post) => {
      if (post.status === "Scheduled" && !showScheduled) {
        return false;
      }

      if (post.status === "Draft" && !showDrafts) {
        return false;
      }

      return true;
    });
  }, [posts, showScheduled, showDrafts]);

  // useMemo for statistics
  const statistics = useMemo(() => {
    const scheduled = posts.filter(
      (post) => post.status === "Scheduled"
    ).length;

    const drafts = posts.filter(
      (post) => post.status === "Draft"
    ).length;

    return {
      total: posts.length,
      scheduled,
      drafts,
    };
  }, [posts]);

  // useCallback
  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;

      if (!over) return;

      const draggedPost = posts.find(
        (post) => post.id === active.id
      );

      if (!draggedPost) return;

      // Dropped on another card
      const targetPost = posts.find(
        (post) => post.id === over.id
      );

      if (targetPost) {
        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            post.id === active.id
              ? {
                  ...post,
                  date: targetPost.date,
                }
              : post
          )
        );
      }

      // Dropped directly on date column
      const dateExists = posts.some(
        (post) => post.date === over.id
      );

      if (!dateExists && /^\d{4}-\d{2}-\d{2}$/.test(over.id)) {
        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            post.id === active.id
              ? {
                  ...post,
                  date: over.id,
                }
              : post
          )
        );
      }
    },
    [posts]
  );

  // Calendar dates
  const dates = useMemo(() => {
    return [
      "2026-08-31",
      "2026-09-01",
      "2026-09-02",
      "2026-09-03",
      "2026-09-04",
      "2026-09-05",
    ];
  }, []);

  return (
    <div className="app">
      {/* HEADER */}

      <header className="header">
        <div>
          <h1>📅 Calendar Monitoring</h1>
          <p>
            Interactive social media scheduling dashboard
          </p>
        </div>

        <div className="optimization-badge">
          {optimized ? "⚡ Optimized Mode" : "🐌 Non-Optimized Mode"}
        </div>
      </header>

      {/* TOGGLE PANEL */}

      <section className="control-panel">
        <h2>Performance Controls</h2>

        <div className="toggle-container">

          {/* Toggle 1 */}

          <div className="toggle-item">
            <span>Scheduled Posts</span>

            <button
              className={`toggle ${
                showScheduled ? "active" : ""
              }`}
              onClick={() =>
                setShowScheduled(!showScheduled)
              }
            >
              <span />
            </button>
          </div>

          {/* Toggle 2 */}

          <div className="toggle-item">
            <span>Draft Posts</span>

            <button
              className={`toggle ${
                showDrafts ? "active" : ""
              }`}
              onClick={() => setShowDrafts(!showDrafts)}
            >
              <span />
            </button>
          </div>

          {/* Toggle 3 */}

          <div className="toggle-item">
            <span>Monitoring Panel</span>

            <button
              className={`toggle ${
                showMonitoring ? "active" : ""
              }`}
              onClick={() =>
                setShowMonitoring(!showMonitoring)
              }
            >
              <span />
            </button>
          </div>

        </div>

        <div className="optimization-buttons">
          <button
            className={optimized ? "selected" : ""}
            onClick={() => setOptimized(true)}
          >
            ⚡ Optimized
          </button>

          <button
            className={!optimized ? "selected" : ""}
            onClick={() => setOptimized(false)}
          >
            🐌 Non-Optimized
          </button>
        </div>
      </section>

      {/* MONITORING PANEL */}

      {showMonitoring && (
        <section className="monitoring-panel">
          <div className="stat">
            <span>Total Posts</span>
            <strong>{statistics.total}</strong>
          </div>

          <div className="stat">
            <span>Scheduled</span>
            <strong>{statistics.scheduled}</strong>
          </div>

          <div className="stat">
            <span>Drafts</span>
            <strong>{statistics.drafts}</strong>
          </div>

          <div className="stat">
            <span>Render Mode</span>
            <strong>
              {optimized ? "Optimized" : "Normal"}
            </strong>
          </div>
        </section>
      )}

      {/* CALENDAR */}

      <main className="calendar-wrapper">
        <div className="calendar-title">
          <div>
            <h2>Content Calendar</h2>
            <p>
              Drag and drop cards to reschedule posts
            </p>
          </div>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="calendar-grid">
            {dates.map((date) => {
              const datePosts = filteredPosts.filter(
                (post) => post.date === date
              );

              return (
                <CalendarColumn
                  key={date}
                  date={date}
                  posts={datePosts}
                  optimized={optimized}
                />
              );
            })}
          </div>
        </DndContext>
      </main>

      {/* FOOTER */}

      <footer>
        <span>React Performance Experiment 4</span>

        <span>
          React.memo • useCallback • useMemo • Drag & Drop
        </span>
      </footer>
    </div>
  );
}

export default App;