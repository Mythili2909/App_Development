package com.mockinterview.mockinterview.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "scheduled_interviews")
@Data 
@Builder
@NoArgsConstructor 
@AllArgsConstructor 
public class ScheduledInterviewsModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scheduled_id")
    private Long scheduledId;

    @Column(name = "interviewer_email", nullable = false)
    private String interviewerEmail;

    @Column(name = "student_email", nullable = false)
    private String studentEmail;

    @Column(name = "scheduled_round_number", nullable = false)
    private Integer scheduledRoundNumber;

    @Column(name = "scheduled_round_name", nullable = false)
    private String scheduledRoundName;

    @Column(name = "date", nullable = false)
    private String date;

    @Column(name = "time", nullable = false)
    private String time;

    @Column(name = "duration_of_round", nullable = false)
    private String durationOfRound;

    @Column(name = "status", nullable = false)
    private String status;
}