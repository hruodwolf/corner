package com.corner.backend.mapper;

import com.corner.backend.dto.MeasurementUnitDto;
import com.corner.backend.entity.MeasurementUnit;
import org.springframework.stereotype.Component;

@Component
public class MeasurementUnitMapper {

    public MeasurementUnitDto toDto(MeasurementUnit entity) {
        if (entity == null) {
            return null;
        }

        MeasurementUnitDto dto = new MeasurementUnitDto();
        dto.setId(entity.getId());
        dto.setNameEn(entity.getNameEn());
        dto.setSymbol(entity.getSymbol());
        dto.setQuantityType(entity.getQuantityType());
        dto.setDescription(entity.getDescription());

        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedAt(entity.getUpdatedAt());

        return dto;
    }

    public MeasurementUnit toEntity(MeasurementUnitDto dto) {
        if (dto == null) {
            return null;
        }

        MeasurementUnit entity = new MeasurementUnit();
        entity.setId(dto.getId());
        entity.setNameEn(dto.getNameEn());
        entity.setSymbol(dto.getSymbol());
        entity.setQuantityType(dto.getQuantityType());
        entity.setDescription(dto.getDescription());

        // Audit-Felder bewusst NICHT setzen

        return entity;
    }
}
