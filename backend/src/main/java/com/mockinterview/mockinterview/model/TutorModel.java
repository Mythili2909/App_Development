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
@Table(name = "tutors")
@Data // Generates getters, setters, toString, equals, and hashCode
@Builder // Generates a builder pattern for the class
@NoArgsConstructor // Generates a no-args constructor
@AllArgsConstructor // Generates an all-args constructor
public class TutorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tutor_id")
    private Long tutorId;

    @Column(name = "tutor_name", nullable = false)
    private String tutorName;

    @Column(name = "tutor_email", nullable = false, unique = true)
    private String tutorEmail;

    @Column(name = "tutor_password", nullable = false)
    private String tutorPassword;

    @Column(name = "tutor_department")
    private String tutorDepartment;

    @Column(name = "tutor_year")
    private String tutorYear;

    @Column(name = "tutor_section")
    private String tutorSection;

    @Column(name = "tutor_experience")
    private String tutorExperience;

    @Column(name = "gender")
    private String gender;

    @Column(name = "tutor_phone_number")
    private String tutorPhoneNumber;

    @Column(name = "photo")
    private String photo;

    @Column(name = "role")
    private String role;
}