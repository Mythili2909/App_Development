package com.mockinterview.mockinterview.model;
// package com.mockinterview.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
@Entity
@Data
public class Interviewer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String photo;

    @JsonIgnore
    @OneToMany(mappedBy = "interviewer")
    private List<Feedback> feedbacks;

    @JsonIgnore
    @OneToMany(mappedBy = "interviewer")
    private List<Interview> interviews;

    // Getters and setters
}
