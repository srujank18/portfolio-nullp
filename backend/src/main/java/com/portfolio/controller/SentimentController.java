package com.portfolio.controller;

import com.portfolio.model.NewsSentiment;
import com.portfolio.repository.NewsSentimentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Optional;

@RestController
@RequestMapping("/api/sentiment")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class SentimentController {

    private final NewsSentimentRepository newsSentimentRepository;

    @GetMapping("/{ticker}")
    public ResponseEntity<NewsSentiment> getSentiment(@PathVariable String ticker) {
        Optional<NewsSentiment> sentiment = newsSentimentRepository.findByTicker(ticker.toUpperCase());
        if (sentiment.isPresent()) {
            return ResponseEntity.ok(sentiment.get());
        } else {
            // Mock response if not in DB and persist it so subsequent calls return stored value
            NewsSentiment mock = new NewsSentiment();
            mock.setTicker(ticker.toUpperCase());
            mock.setSentimentScore(new BigDecimal("0.50")); // Neutral
            mock.setSummary("No recent news available for " + ticker + ". Market sentiment appears neutral.");
            NewsSentiment saved = newsSentimentRepository.save(mock);
            return ResponseEntity.ok(saved);
        }
    }
}
