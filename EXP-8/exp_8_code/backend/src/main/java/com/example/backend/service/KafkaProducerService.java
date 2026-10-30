
package com.example.backend.service;

import com.example.backend.entity.ScheduledPost;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

    public void publishPostEvent(ScheduledPost post) {
        System.out.println("Post event received for local processing.");
    }
}
