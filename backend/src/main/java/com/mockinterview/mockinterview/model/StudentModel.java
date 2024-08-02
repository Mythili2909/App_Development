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
@Table(name = "students")
@Data
@Builder 
@NoArgsConstructor 
@AllArgsConstructor 
public class StudentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "student_email")
    private String studentEmail;

    @Column(name = "student_password")
    private String studentPassword;

    @Column(name = "student_register_no")
    private String studentRegisterNo;

    @Column(name = "student_photo")
    private String studentPhoto;

    @Column(name = "student_year")
    private int studentYear;

    @Column(name = "student_department")
    private String studentDepartment;

    @Column(name = "student_section")
    private String studentSection;

    @Column(name = "student_phone_no")
    private String studentPhoneNo;

    @Column(name = "student_gender")
    private String studentGender;
    
    @Column(name = "role")
    private String role;
}