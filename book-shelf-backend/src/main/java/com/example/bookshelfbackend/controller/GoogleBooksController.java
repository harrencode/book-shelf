package com.example.bookshelfbackend.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin

@RequestMapping("/api/books")
public class GoogleBooksController {

    private final RestTemplate restTemplate = new RestTemplate();
    @Value("${google.books.api.key}")
    private String API_KEY;

    @GetMapping
    public ResponseEntity<?> getBooks(@RequestParam String query) {
        String apiUrl = "https://www.googleapis.com/books/v1/volumes?q=" + query +"&key=" + API_KEY;
        ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
        return ResponseEntity.ok(response.getBody());
    }
}
