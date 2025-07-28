package com.corner.backend.controller;

import com.corner.backend.dto.RecordCategoryDto;
import com.corner.backend.entity.RecordCategory;
import com.corner.backend.repository.RecordCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/record-categories")
public class RecordCategoryController {

    private final RecordCategoryRepository repository;

    @Autowired
    public RecordCategoryController(RecordCategoryRepository repository) {
        this.repository = repository;
    }

    // 🟢 GET all categories → List of DTOs
    @GetMapping
    public List<RecordCategoryDto> getAll() {
        return repository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 🔵 GET one by ID → DTO
    @GetMapping("/{id}")
    public RecordCategoryDto getById(@PathVariable Integer id) {
        RecordCategory entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("RecordCategory not found: " + id));
        return toDto(entity);
    }

    // 🟡 POST new → DTO
    @PostMapping
    public RecordCategoryDto create(@RequestBody RecordCategoryDto dto) {
        RecordCategory entity = new RecordCategory();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setCreatedBy("api");
        entity.setUpdatedBy("api");
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        entity.setVersion(1);

        RecordCategory saved = repository.save(entity);
        return toDto(saved);
    }

    // 🟠 PUT update → DTO
    @PutMapping("/{id}")
    public RecordCategoryDto update(@PathVariable Integer id, @RequestBody RecordCategoryDto dto) {
        RecordCategory entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("RecordCategory not found: " + id));

        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setUpdatedBy("api");
        entity.setUpdatedAt(LocalDateTime.now());

        RecordCategory updated = repository.save(entity);
        return toDto(updated);
    }

    // 🔴 DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }

    // 🔁 Mapping Entity → DTO
    private RecordCategoryDto toDto(RecordCategory entity) {
        RecordCategoryDto dto = new RecordCategoryDto();
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}
