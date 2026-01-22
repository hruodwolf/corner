package com.corner.backend.controller;


import com.corner.backend.dto.RecordDto;

import com.corner.backend.entity.Record;
import com.corner.backend.entity.RecordCategory;

import com.corner.backend.mapper.RecordMapper;
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
    private final RecordMapper recordMapper;


    @Autowired
    public RecordController(
            RecordRepository recordRepo,
            RecordCategoryRepository categoryRepo,
            RecordMapper recordMapper
    ) {
        this.recordRepo = recordRepo;
        this.categoryRepo = categoryRepo;
        this.recordMapper = recordMapper;
    }

    // 🟢 GET all
    @GetMapping
    public List<RecordDto> getAll() {
        return recordRepo.findAll().stream()
                .map(recordMapper::toDto)
                .collect(Collectors.toList());
    }

    // 🔵 GET by ID
    @GetMapping("/{id}")
    public RecordDto getById(@PathVariable Integer id) {
        Record record = recordRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found: " + id));
        return recordMapper.toDto(record);
    }

    // 🟡 POST
    @PostMapping
    public RecordDto create(@RequestBody RecordDto dto) {
        // is this necessary or keep for validation?
        RecordCategory category = categoryRepo.findById(dto.getRecordCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        Record entity = recordMapper.toEntity(dto);
        //entity.setRecordCategory(category); // not necessary
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        entity.setCreatedBy("api");
        entity.setUpdatedBy("api");
        entity.setVersion(1);

        Record saved = recordRepo.save(entity);
        return recordMapper.toDto(saved);
    }

    // 🟠 PUT
    @PutMapping("/{id}")
    public RecordDto update(@PathVariable Integer id, @RequestBody RecordDto dto) {
        Record record = recordRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));

        RecordCategory category = categoryRepo.findById(dto.getRecordCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        record.setRecordDate(dto.getRecordDate());
        record.setRecordValue(dto.getRecordValue());
        record.setDescription(dto.getDescription());
        record.setRecordCategory(category);
        record.setUpdatedAt(LocalDateTime.now());
        record.setUpdatedBy("api");

        Record updated = recordRepo.save(record);
        return recordMapper.toDto(updated);
    }

    // 🔴 DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        recordRepo.deleteById(id);
    }
}
