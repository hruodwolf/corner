package com.corner.backend.mapper;

import com.corner.backend.dto.RecordCategoryDto;
import com.corner.backend.entity.RecordCategory;
import org.springframework.stereotype.Component;

@Component
public class RecordCategoryMapper {

    private final MeasurementUnitMapper measurementUnitMapper;

    public RecordCategoryMapper(MeasurementUnitMapper measurementUnitMapper) {
        this.measurementUnitMapper = measurementUnitMapper;
    }

    public RecordCategoryDto toDto(RecordCategory entity) {
        if (entity == null) {
            return null;
        }

        RecordCategoryDto dto = new RecordCategoryDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());

        dto.setMeasurementUnit(
                measurementUnitMapper.toDto(entity.getMeasurementUnit())
        );

        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedAt(entity.getUpdatedAt());

        return dto;
    }

    public RecordCategory toEntity(RecordCategoryDto dto) {
        if (dto == null) {
            return null;
        }

        RecordCategory entity = new RecordCategory();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());

        entity.setMeasurementUnit(
                measurementUnitMapper.toEntity(dto.getMeasurementUnit())
        );

        // Audit-Felder bewusst NICHT setzen

        return entity;
    }
}
