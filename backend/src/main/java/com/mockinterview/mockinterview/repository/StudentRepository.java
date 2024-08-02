package com.mockinterview.mockinterview.repository;

import com.mockinterview.mockinterview.model.StudentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<StudentModel, Long> {
    Optional<StudentModel> findByStudentEmail(String email);
}
