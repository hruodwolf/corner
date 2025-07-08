package com.corner.backend.controller;


import com.corner.backend.dto.PersonDTO;
import com.corner.backend.entity.Person;
import com.corner.backend.repository.PersonRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/persons")
public class PersonController {

    private final PersonRepository repository;

    public PersonController(PersonRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<PersonDTO> getAllPersons() {
        return repository.findAll().stream()
                .map(p -> new PersonDTO(p.getId(), p.getFirstName()))
                .collect(Collectors.toList());
    }
}
