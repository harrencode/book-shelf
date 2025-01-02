package com.example.bookshelfbackend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin
@RequestMapping("/api/categories")
public class CategoryController {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${google.books.api.key}")
    private String apiKey;

    /**
     * Fetch books for a given category.
     *
     * @param category The category name (e.g., fiction, non-fiction).
     * @return ResponseEntity containing the books for the specified category.
     */
    @GetMapping("/{category}")
    public ResponseEntity<?> getBooksByCategory(@PathVariable String category) {
        String apiUrl = String.format(
            "https://www.googleapis.com/books/v1/volumes?q=%s&maxResults=4&key=%s", 
            category, 
            apiKey
        );

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching books: " + e.getMessage());
        }
    }

    /**
     * Fetch all categories with books.
     *
     * @return ResponseEntity containing books for all categories.
     */
    @GetMapping
    public ResponseEntity<?> getAllCategories() {
        String[] categories = { "fiction", "non-fiction", "history biography", "kids" };
        StringBuilder results = new StringBuilder("{ \"categories\": [");

        try {
            for (String category : categories) {
                String apiUrl = String.format(
                    "https://www.googleapis.com/books/v1/volumes?q=%s&maxResults=4&key=%s",
                    category, 
                    apiKey
                );

                ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
                results.append(String.format("{\"category\": \"%s\", \"books\": %s},", category, response.getBody()));
            }

            // Remove the trailing comma and close JSON
            results = new StringBuilder(results.substring(0, results.length() - 1));
            results.append("]}");

            return ResponseEntity.ok(results.toString());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching books: " + e.getMessage());
        }
    }
}
