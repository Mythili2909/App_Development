package com.mockinterview.mockinterview.controller;

import com.mockinterview.mockinterview.model.Interview;
import com.mockinterview.mockinterview.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/interviews")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @GetMapping
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable Long id) {
        Optional<Interview> interview = interviewService.getInterviewById(id);
        return interview.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Interview createInterview(@RequestBody Interview interview) {
        return interviewService.saveInterview(interview);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Interview> updateInterview(@PathVariable Long id, @RequestBody Interview interview) {
        if (!interviewService.getInterviewById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        interview.setId(id);
        Interview updatedInterview = interviewService.saveInterview(interview);
        return ResponseEntity.ok(updatedInterview);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long id) {
        if (!interviewService.getInterviewById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        interviewService.deleteInterview(id);
        return ResponseEntity.noContent().build();
    }
}
