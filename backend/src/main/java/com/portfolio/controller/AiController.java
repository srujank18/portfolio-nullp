package com.portfolio.controller;

import com.portfolio.dto.AiRequest;
import com.portfolio.dto.AiResponse;
import com.portfolio.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/ask")
    public ResponseEntity<AiResponse> ask(@RequestBody AiRequest request) {
        AiResponse resp = aiService.ask(request);
        return ResponseEntity.ok(resp);
    }
}
