package com.mypersonalwebsite.backend.controller;

import com.mypersonalwebsite.backend.model.Entry;
import com.mypersonalwebsite.backend.repository.EntryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
public class EntryController {

    private final EntryRepository repo;

    public EntryController(EntryRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Entry> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<Entry> create(@RequestBody Entry entry) {
        return ResponseEntity.ok(repo.save(entry));
    }
}
