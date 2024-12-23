package com.mockinterview.mockinterview.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mockinterview.mockinterview.model.Feedback;
import com.mockinterview.mockinterview.service.FeedbackService;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Add a new Feedback
    @PostMapping("/students/{studentId}")
    public ResponseEntity<Feedback> addFeedback(@PathVariable Long studentId, @RequestBody Feedback feedback) {
        Feedback newFeedback = feedbackService.addFeedback(studentId, feedback);
        return ResponseEntity.ok(newFeedback);
    }

    // Update an existing Feedback
    @PutMapping("/{feedbackId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long feedbackId, @RequestBody Feedback feedbackDetails) {
        Feedback updatedFeedback = feedbackService.updateFeedback(feedbackId, feedbackDetails);
        return ResponseEntity.ok(updatedFeedback);
    }

    // Delete a Feedback by ID
    @DeleteMapping("/{feedbackId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
        return ResponseEntity.noContent().build();
    }

    // Get all Feedbacks for a specific Student
    @GetMapping("/students/{studentId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_MENTOR', 'ROLE_STUDENT')")
    public ResponseEntity<List<Feedback>> getFeedbacksByStudentId(@PathVariable Long studentId) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByStudentId(studentId);
        return ResponseEntity.ok(feedbacks);
    }

    // Get a Feedback by ID
    @GetMapping("/{feedbackId}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_MENTOR', 'ROLE_STUDENT')")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long feedbackId) {
        Feedback feedback = feedbackService.getFeedbackById(feedbackId);
        return ResponseEntity.ok(feedback);
    }

    // Get all Feedbacks
    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_HEAD', 'ROLE_MENTOR', 'ROLE_STUDENT')")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        return ResponseEntity.ok(feedbacks);
    }
}