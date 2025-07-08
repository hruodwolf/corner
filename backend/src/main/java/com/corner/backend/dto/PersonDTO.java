package com.corner.backend.dto;

public class PersonDTO {
    private Long id;
    private String firstName;

    // Konstruktor
    public PersonDTO(Long id, String firstName) {
        this.id = id;
        this.firstName = firstName;
    }

    // Getter/Setter
    public Long getId() { return id; }
    public String getFirstName() { return firstName; }
}
