package com.mockinterview.mockinterview.model;
// package com.mockinterview.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Interview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String type;
    private String scheduleDate;
    private String scheduleTime;

    @JsonIgnore
    @ManyToOne
    private Student student;

    @JsonIgnore
    @ManyToOne
    private Interviewer interviewer;

    @JsonIgnore
    @ManyToOne
    private Admin admin;

    // Getters and setters
}
