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

import com.mockinterview.mockinterview.model.Mentor;
import com.mockinterview.mockinterview.service.MentorService;

@RestController
@RequestMapping("/mentors")
public class MentorController {

    @Autowired
    private MentorService mentorService;

    @GetMapping
    public List<Mentor> getAllMentors() {
        return mentorService.getAllMentors();
    }

    @GetMapping("/{id}")
    public Mentor getMentorById(@PathVariable Long id) {
        return mentorService.getMentorById(id);
    }

    @PostMapping
    public Mentor createMentor(@RequestBody Mentor mentor) {
        return mentorService.addMentor(mentor);
    }

    @PutMapping("/{id}")
    public Mentor updateMentor(@PathVariable Long id, @RequestBody Mentor mentorDetails) {
        return mentorService.updateMentor(id, mentorDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteMentor(@PathVariable Long id) {
        mentorService.deleteMentor(id);
    }

    @GetMapping("/department/{department}")
    public List<Mentor> getMentorsByDepartment(@PathVariable String department) {
        return mentorService.getMentorsByDepartment(department);
    }

    @GetMapping("/email/{email}")
    public List<Mentor> getMentorsByEmail(@PathVariable String email) {
        return mentorService.getMentorsByEmail(email);
    }

    @GetMapping("/class/{classBeingMentored}")
    public List<Mentor> getMentorsByClass(@PathVariable String classBeingMentored) {
        return mentorService.getMentorsByClass(classBeingMentored);
    }
}
