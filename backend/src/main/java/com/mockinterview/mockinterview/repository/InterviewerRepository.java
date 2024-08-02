package com.mockinterview.mockinterview.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.mockinterview.model.Interviewer;

public interface InterviewerRepository extends JpaRepository<Interviewer, Long> {
    
}
