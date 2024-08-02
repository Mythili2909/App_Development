package com.mockinterview.mockinterview.repository;
// package com.mockinterview.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mockinterview.mockinterview.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {}

