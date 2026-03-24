package com.mypersonalwebsite.backend.repository;

import com.mypersonalwebsite.backend.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntryRepository extends JpaRepository<Entry, Long> {
}
