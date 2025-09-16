package com.corner.backend.controller;


import com.corner.backend.dto.MeasurementUnitDto;
import com.corner.backend.entity.MeasurementUnit;
import com.corner.backend.repository.MeasurementUnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/measurement-units")
public class MeasurementUnitController {

    private final MeasurementUnitRepository repository;

    @Autowired
    public MeasurementUnitController(MeasurementUnitRepository repository) {
        this.repository = repository;
    }

    // 🟢 GET all → list of DTOs
    @GetMapping
    public List<MeasurementUnitDto> getAll() {
        return repository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    // 🔵 GET one by ID → DTO
    @GetMapping("/{id}")
    public MeasurementUnitDto getById(@PathVariable Integer id) {
        MeasurementUnit entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("MeasurementUnit not found: " + id));
        return toDto(entity);
    }

    // 🟡 POST new → DTO
    @PostMapping
    public MeasurementUnitDto create(@RequestBody MeasurementUnitDto dto) {
        MeasurementUnit entity = new MeasurementUnit();
        entity.setNameEn(dto.getNameEn());
        entity.setSymbol(dto.getSymbol());
        entity.setQuantityType(dto.getQuantityType());
        entity.setDescription(dto.getDescription());

        entity.setCreatedBy("api");
        entity.setUpdatedBy("api");
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        entity.setVersion(1);

        MeasurementUnit saved = repository.save(entity);
        return toDto(saved);
    }

    // 🟠 PUT update → DTO
    @PutMapping("/{id}")
    public MeasurementUnitDto update(@PathVariable Integer id, @RequestBody MeasurementUnitDto dto) {
        MeasurementUnit entity = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("MeasurementUnit not found: " + id));

        entity.setNameEn(dto.getNameEn());
        entity.setSymbol(dto.getSymbol());
        entity.setQuantityType(dto.getQuantityType());
        entity.setDescription(dto.getDescription());
        entity.setUpdatedBy("api");
        entity.setUpdatedAt(LocalDateTime.now());

        MeasurementUnit updated = repository.save(entity);
        return toDto(updated);
    }

    // 🔴 DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        repository.deleteById(id);
    }

    // 🔁 Mapping Entity → DTO
    private MeasurementUnitDto toDto(MeasurementUnit entity) {
        MeasurementUnitDto dto = new MeasurementUnitDto();
        dto.setId(entity.getId());
        dto.setNameEn(entity.getNameEn());
        dto.setSymbol(entity.getSymbol());
        dto.setQuantityType(entity.getQuantityType());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}
