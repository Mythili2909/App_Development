package com.mockinterview.mockinterview.controller;
// package com.mockinterview.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mockinterview.mockinterview.model.Student;
import com.mockinterview.mockinterview.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        return studentService.updateStudent(id, studentDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    @GetMapping("/email/{email}")
    public List<Student> getStudentsByEmail(@PathVariable String email) {
        return studentService.getStudentsByEmail(email);
    }

    @GetMapping("/dept/{dept}")
    public List<Student> getStudentsByDept(@PathVariable String dept) {
        return studentService.getStudentsByDept(dept);
    }

    @GetMapping("/section/{section}")
    public List<Student> getStudentsBySection(@PathVariable String section) {
        return studentService.getStudentsBySection(section);
    }

    @GetMapping("/ratings/{ratings}")
    public List<Student> getStudentsByRatings(@PathVariable double ratings) {
        return studentService.getStudentsByRatings(ratings);
    }

    @GetMapping("/batch/{batch}")
    public List<Student> getStudentsByBatch(@PathVariable String batch) {
        return studentService.getStudentsByBatch(batch);
    }
}
