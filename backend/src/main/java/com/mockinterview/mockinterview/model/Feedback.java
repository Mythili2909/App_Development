package com.mockinterview.mockinterview.model;
// package com.mockinterview.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String feedback;
    
    @JsonIgnore
    @ManyToOne
    private Student student;

    @JsonIgnore
    @ManyToOne
    private Interviewer interviewer;

 

    // Getters and setters
}

