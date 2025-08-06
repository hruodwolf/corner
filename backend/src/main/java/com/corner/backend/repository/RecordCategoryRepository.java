package com.corner.backend.repository;

import com.corner.backend.entity.RecordCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordCategoryRepository extends JpaRepository<RecordCategory, Integer> {
}
