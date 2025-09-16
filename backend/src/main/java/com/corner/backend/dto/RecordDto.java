package com.corner.backend.dto;


import java.time.LocalDateTime;

public class RecordDto {

    private Integer id;
    private LocalDateTime recordDate;
    private Double recordValue;
    private String description;

    private Integer recordCategoryId;
    private String recordCategoryName;

    private Integer unitId;
    private String unitName;

    private String createdBy;
    private String updatedBy;

    // Getter & Setter

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(LocalDateTime recordDate) {
        this.recordDate = recordDate;
    }

    public Double getRecordValue() {
        return recordValue;
    }

    public void setRecordValue(Double recordValue) {
        this.recordValue = recordValue;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRecordCategoryId() {
        return recordCategoryId;
    }

    public void setRecordCategoryId(Integer recordCategoryId) {
        this.recordCategoryId = recordCategoryId;
    }

    public String getRecordCategoryName() {
        return recordCategoryName;
    }

    public void setRecordCategoryName(String recordCategoryName) {
        this.recordCategoryName = recordCategoryName;
    }

    public Integer getUnitId() {
        return unitId;
    }

    public void setUnitId(Integer unitId) {
        this.unitId = unitId;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
}

