package com.mockinterview.mockinterview.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "interviewers")
@Data // Generates getters, setters, toString, equals, and hashCode
@Builder // Generates a builder pattern for the class
@NoArgsConstructor // Generates a no-args constructor
@AllArgsConstructor // Generates an all-args constructor
public class InterviewerModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interviewer_id")
    private Long interviewerId;

    @Column(name = "interviewer_name", nullable = false)
    private String interviewerName;

    @Column(name = "interviewer_email", nullable = false, unique = true)
    private String interviewerEmail;

    @Column(name = "interviewer_password", nullable = false)
    private String interviewerPassword;

    @Column(name = "interviewer_gender")
    private String interviewerGender;

    @Column(name = "interviewer_experience")
    private String interviewerExperience;

    @Column(name = "interviewer_qualification")
    private String interviewerQualification;

    @Column(name = "interviewer_phone_number")
    private String interviewerPhoneNumber;

    @Column(name = "role")
    private String role; // No prefix here

    @Column(name = "interviewer_photo")
    private String interviewerPhoto;
}