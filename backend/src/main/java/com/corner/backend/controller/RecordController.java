package com.corner.backend.controller;


import com.corner.backend.dto.RecordDto;

import com.corner.backend.entity.Record;
import com.corner.backend.entity.RecordCategory;

import com.corner.backend.repository.RecordCategoryRepository;
import com.corner.backend.repository.RecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/records")
public class RecordController {

    private final RecordRepository recordRepo;
    private final RecordCategoryRepository categoryRepo;


    @Autowired
    public RecordController(
            RecordRepository recordRepo,
            RecordCategoryRepository categoryRepo
    ) {
        this.recordRepo = recordRepo;
        this.categoryRepo = categoryRepo;

    }

    // 🟢 GET all
    @GetMapping
    public List<RecordDto> getAll() {
        return recordRepo.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 🔵 GET by ID
    @GetMapping("/{id}")
    public RecordDto getById(@PathVariable Integer id) {
        Record record = recordRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found: " + id));
        return toDto(record);
    }

    // 🟡 POST
    @PostMapping
    public RecordDto create(@RequestBody RecordDto dto) {
        RecordCategory category = categoryRepo.findById(dto.getRecordCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Record entity = new Record();
        entity.setRecordDate(dto.getRecordDate());
        entity.setRecordValue(dto.getRecordValue());
        entity.setDescription(dto.getDescription());
        entity.setRecordCategory(category);

        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        entity.setCreatedBy("api");
        entity.setUpdatedBy("api");
        entity.setVersion(1);

        Record saved = recordRepo.save(entity);
        return toDto(saved);
    }

    // 🟠 PUT
    @PutMapping("/{id}")
    public RecordDto update(@PathVariable Integer id, @RequestBody RecordDto dto) {
        Record record = recordRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        RecordCategory category = categoryRepo.findById(dto.getRecordCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        record.setRecordDate(dto.getRecordDate());
        record.setRecordValue(dto.getRecordValue());
        record.setDescription(dto.getDescription());
        record.setRecordCategory(category);
        record.setUpdatedAt(LocalDateTime.now());
        record.setUpdatedBy("api");

        Record updated = recordRepo.save(record);
        return toDto(updated);
    }

    // 🔴 DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        recordRepo.deleteById(id);
    }

    // 🔁 Entity → DTO
    private RecordDto toDto(Record entity) {
        RecordDto dto = new RecordDto();
        dto.setId(entity.getId());
        dto.setRecordDate(entity.getRecordDate());
        dto.setRecordValue(entity.getRecordValue());
        dto.setDescription(entity.getDescription());

        dto.setRecordCategoryId(entity.getRecordCategory().getId());
        dto.setRecordCategoryName(entity.getRecordCategory().getName());

        dto.setCreatedBy(entity.getCreatedBy());
        dto.setUpdatedBy(entity.getUpdatedBy());

        return dto;
    }
}
