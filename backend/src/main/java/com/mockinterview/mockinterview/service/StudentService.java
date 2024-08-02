package com.mockinterview.mockinterview.service;

import com.mockinterview.mockinterview.model.StudentModel;
import com.mockinterview.mockinterview.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public List<StudentModel> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<StudentModel> getStudentByEmail(String email) {
        return studentRepository.findByStudentEmail(email);
    }

    public StudentModel saveStudent(StudentModel student) {
        return studentRepository.save(student);
    }

    public StudentModel updateStudent(Long id, StudentModel updatedStudent) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setStudentName(updatedStudent.getStudentName());
                    student.setStudentEmail(updatedStudent.getStudentEmail());
                    student.setStudentPassword(updatedStudent.getStudentPassword());
                    student.setStudentRegisterNo(updatedStudent.getStudentRegisterNo());
                    student.setStudentPhoto(updatedStudent.getStudentPhoto());
                    student.setStudentYear(updatedStudent.getStudentYear());
                    student.setStudentDepartment(updatedStudent.getStudentDepartment());
                    student.setStudentSection(updatedStudent.getStudentSection());
                    student.setStudentPhoneNo(updatedStudent.getStudentPhoneNo());
                    student.setStudentGender(updatedStudent.getStudentGender());
                    student.setRole(updatedStudent.getRole());
                    return studentRepository.save(student);
                })
                .orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
