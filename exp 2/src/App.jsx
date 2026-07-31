import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addPost,
  deletePost,
} from "./features/posts/postsSlice";

import {
  selectPlatform,
} from "./features/platforms/platformsSlice";

function App() {
  const dispatch = useDispatch();

  // Read posts from Redux store
  const posts = useSelector(
    (state) => state.posts
  );

  // Read platforms from Redux store
  const platforms = useSelector(
    (state) => state.platforms.list
  );

  // Local state for form inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedPlatform, setSelectedPlatform] =
    useState("linkedin");

  const [status, setStatus] =
    useState("Draft");

  // Add a new post
  const handleAddPost = () => {
    if (
      title.trim() === "" ||
      content.trim() === ""
    ) {
      alert(
        "Please enter post title and content."
      );

      return;
    }

    dispatch(
      addPost({
        id: Date.now(),
        title: title,
        body: content,
        platform: selectedPlatform,
        status: status,
      })
    );

    // Clear fields after adding post
    setTitle("");
    setContent("");
  };

  // Dashboard values
  const totalPosts = posts.ids.length;

  const publishedPosts =
    posts.ids.filter(
      (id) =>
        posts.entities[id].status ===
        "Published"
    ).length;

  const draftPosts =
    posts.ids.filter(
      (id) =>
        posts.entities[id].status ===
        "Draft"
    ).length;

  const selectedPlatforms =
    platforms.filter(
      (platform) =>
        platform.selected
    ).length;

  // Inline styles
  const styles = {
    app: {
      minHeight: "100vh",
      padding: "25px",
      fontFamily: "Arial, sans-serif",
      background:
        "linear-gradient(135deg, #e8efff, #f3e8ff)",
      color: "#1f2937",
    },

    header: {
      padding: "25px 30px",
      borderRadius: "18px",
      color: "white",
      background:
        "linear-gradient(100deg, #2563eb, #4f46e5, #7c3aed)",
      boxShadow:
        "0 10px 25px rgba(79, 70, 229, 0.35)",
    },

    headerTitle: {
      margin: "0",
      fontSize: "34px",
    },

    headerText: {
      margin: "7px 0 0",
      color: "#e0e7ff",
      fontSize: "17px",
    },

    stats: {
      display: "grid",
      gridTemplateColumns:
        "repeat(4, 1fr)",
      gap: "22px",
      margin: "28px 0",
    },

    statCard: {
      padding: "25px",
      textAlign: "center",
      borderRadius: "18px",
      background:
        "linear-gradient(145deg, #ffffff, #eef2ff)",
      border:
        "1px solid #dbe4ff",
      boxShadow:
        "0 8px 20px rgba(0, 0, 0, 0.12)",
    },

    statNumber: {
      margin: "0",
      color: "#2563eb",
      fontSize: "40px",
    },

    statText: {
      margin: "10px 0 0",
      fontSize: "18px",
    },

    formCard: {
      padding: "28px",
      borderRadius: "18px",
      background: "white",
      border:
        "1px solid #dbe4ff",
      boxShadow:
        "0 10px 25px rgba(0, 0, 0, 0.12)",
    },

    sectionTitle: {
      marginTop: "0",
      color: "#1e3a8a",
      fontSize: "28px",
    },

    input: {
      width: "100%",
      padding: "14px",
      margin: "8px 0",
      border:
        "1px solid #c7d2fe",
      borderRadius: "10px",
      background: "#f8faff",
      fontSize: "16px",
    },

    textarea: {
      width: "100%",
      height: "95px",
      padding: "14px",
      margin: "8px 0",
      border:
        "1px solid #c7d2fe",
      borderRadius: "10px",
      background: "#f8faff",
      fontSize: "16px",
      resize: "vertical",
    },

    button: {
      width: "100%",
      padding: "15px",
      marginTop: "10px",
      border: "none",
      borderRadius: "10px",
      color: "white",
      fontSize: "17px",
      fontWeight: "bold",
      cursor: "pointer",
      background:
        "linear-gradient(90deg, #2563eb, #4f46e5)",
    },

    postsSection: {
      marginTop: "28px",
      padding: "28px",
      borderRadius: "18px",
      background: "white",
      border:
        "1px solid #dbe4ff",
      boxShadow:
        "0 10px 25px rgba(0, 0, 0, 0.12)",
    },

    postCard: {
      display: "flex",
      justifyContent:
        "space-between",
      alignItems: "center",
      padding: "20px",
      marginTop: "15px",
      border:
        "1px solid #c7d2fe",
      borderLeft:
        "6px solid #4f46e5",
      borderRadius: "12px",
      background:
        "linear-gradient(90deg, #f8faff, #ffffff)",
    },

    postTitle: {
      margin: "0",
      color: "#312e81",
    },

    postText: {
      color: "#4b5563",
    },

    badge: {
      display: "inline-block",
      marginRight: "10px",
      padding: "5px 10px",
      color: "#3730a3",
      background: "#e0e7ff",
      borderRadius: "15px",
      fontSize: "14px",
    },

    deleteButton: {
      padding: "10px 18px",
      border: "none",
      borderRadius: "8px",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      background:
        "linear-gradient(90deg, #ef4444, #dc2626)",
    },
  };

  return (
    <div style={styles.app}>

      {/* Header */}
      <header style={styles.header}>

        <h1 style={styles.headerTitle}>
          🚀 SocialSync Dashboard
        </h1>

        <p style={styles.headerText}>
          Redux Toolkit Social Media Manager
        </p>

      </header>

      {/* Statistics */}
      <section style={styles.stats}>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {totalPosts}
          </h2>

          <p style={styles.statText}>
            Total Posts
          </p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {publishedPosts}
          </h2>

          <p style={styles.statText}>
            Published
          </p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {draftPosts}
          </h2>

          <p style={styles.statText}>
            Drafts
          </p>
        </div>

        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>
            {selectedPlatforms}
          </h2>

          <p style={styles.statText}>
            Platforms
          </p>
        </div>

      </section>

      {/* Create Post Form */}
      <section style={styles.formCard}>

        <h2 style={styles.sectionTitle}>
          Create New Post
        </h2>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          style={styles.input}
          onChange={(event) =>
            setTitle(event.target.value)
          }
        />

        <textarea
          placeholder="Write your post..."
          value={content}
          style={styles.textarea}
          onChange={(event) =>
            setContent(event.target.value)
          }
        />

        <select
          value={selectedPlatform}
          style={styles.input}
          onChange={(event) => {
            setSelectedPlatform(
              event.target.value
            );

            dispatch(
              selectPlatform(
                event.target.value
              )
            );
          }}
        >

          {platforms.map(
            (platform) => (
              <option
                key={platform.id}
                value={platform.id}
              >
                {platform.name}
              </option>
            )
          )}

        </select>

        <select
          value={status}
          style={styles.input}
          onChange={(event) =>
            setStatus(
              event.target.value
            )
          }
        >

          <option value="Draft">
            Draft
          </option>

          <option value="Published">
            Published
          </option>

        </select>

        <button
          style={styles.button}
          onClick={handleAddPost}
        >
          Add Post
        </button>

      </section>

      {/* Display Posts */}
      <section
        style={styles.postsSection}
      >

        <h2 style={styles.sectionTitle}>
          Your Posts
        </h2>

        {totalPosts === 0 && (

          <p>
            No posts added yet.
          </p>

        )}

        {posts.ids.map((id) => {

          const post =
            posts.entities[id];

          return (

            <div
              key={post.id}
              style={styles.postCard}
            >

              <div>

                <h3
                  style={styles.postTitle}
                >
                  {post.title}
                </h3>

                <p
                  style={styles.postText}
                >
                  {post.body}
                </p>

                <span
                  style={styles.badge}
                >
                  Platform:{" "}
                  {post.platform}
                </span>

                <span
                  style={styles.badge}
                >
                  Status:{" "}
                  {post.status}
                </span>

              </div>

              <button
                style={
                  styles.deleteButton
                }

                onClick={() =>
                  dispatch(
                    deletePost(
                      post.id
                    )
                  )
                }
              >
                Delete
              </button>

            </div>

          );

        })}

      </section>

    </div>
  );
}

export default App;