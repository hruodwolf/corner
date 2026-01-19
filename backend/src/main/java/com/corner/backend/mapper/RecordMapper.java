package com.corner.backend.mapper;

import com.corner.backend.dto.RecordDto;
import com.corner.backend.entity.Record;
import org.springframework.stereotype.Component;

@Component
public class RecordMapper {

    private final RecordCategoryMapper recordCategoryMapper;

    public RecordMapper(RecordCategoryMapper recordCategoryMapper) {
        this.recordCategoryMapper = recordCategoryMapper;
    }

    public RecordDto toDto(Record entity) {
        if (entity == null) {
            return null;
        }

        RecordDto dto = new RecordDto();
        dto.setId(entity.getId());
        dto.setRecordDate(entity.getRecordDate());
        dto.setRecordValue(entity.getRecordValue());
        dto.setDescription(entity.getDescription());

        // Delegation an RecordCategoryMapper
        dto.setRecordCategory(recordCategoryMapper.toDto(entity.getRecordCategory()));

        // Audit-Felder
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedAt(entity.getUpdatedAt());

        return dto;
    }

    public Record toEntity(RecordDto dto) {
        if (dto == null) {
            return null;
        }

        Record entity = new Record();
        entity.setId(dto.getId());
        entity.setRecordDate(dto.getRecordDate());
        entity.setRecordValue(dto.getRecordValue());
        entity.setDescription(dto.getDescription());

        // Delegation an RecordCategoryMapper
        entity.setRecordCategory(recordCategoryMapper.toEntity(dto.getRecordCategory()));

        // Audit-Felder bewusst NICHT setzen

        return entity;
    }
}
