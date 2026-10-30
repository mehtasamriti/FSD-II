
package com.example.backend.controller;

import com.example.backend.entity.ScheduledPost;
import com.example.backend.repository.ScheduledPostRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
})
public class PostController {

    private final ScheduledPostRepository postRepository;

    public PostController(ScheduledPostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping
    public List<ScheduledPost> getAllPosts() {
        return postRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ScheduledPost> createPost(
            @RequestBody ScheduledPost post) {

        if (post.getStatus() == null || post.getStatus().isBlank()) {
            post.setStatus("PENDING");
        }

        ScheduledPost savedPost = postRepository.save(post);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScheduledPost> getPostById(
            @PathVariable Long id) {

        return postRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {

        if (!postRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        postRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
