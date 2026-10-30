
package com.example.backend.service;

import com.example.backend.entity.ProcessedEvent;
import com.example.backend.entity.ScheduledPost;
import com.example.backend.repository.ProcessedEventRepository;
import com.example.backend.repository.ScheduledPostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class KafkaConsumerService {

    private final ScheduledPostRepository postRepository;
    private final ProcessedEventRepository processedEventRepository;

    public KafkaConsumerService(
            ScheduledPostRepository postRepository,
            ProcessedEventRepository processedEventRepository) {
        this.postRepository = postRepository;
        this.processedEventRepository = processedEventRepository;
    }

    public void processPostLocally(ScheduledPost post) {
        System.out.println("Local processing requested for post.");
    }
}
