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

    @PutMapping("/{id}")
    public ResponseEntity<Entry> update(@PathVariable Long id, @RequestBody Entry body) {
        return repo.findById(id).map(entry -> {
            entry.setTitle(body.getTitle());
            entry.setLink(body.getLink());
            entry.setDescription(body.getDescription());
            return ResponseEntity.ok(repo.save(entry));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
