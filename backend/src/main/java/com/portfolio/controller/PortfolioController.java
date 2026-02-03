package com.portfolio.controller;

import com.portfolio.dto.AssetDTO;
import com.portfolio.dto.PortfolioSummaryDTO;
import com.portfolio.model.Asset;
import com.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite frontend
@RequiredArgsConstructor
@Slf4j
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping
    public ResponseEntity<PortfolioSummaryDTO> getPortfolioSummary() {
        return ResponseEntity.ok(portfolioService.getPortfolioSummary());
    }

    @PostMapping("/assets")
    public ResponseEntity<?> addAsset(@RequestBody AssetDTO assetDTO) {
        try {
            Asset saved = portfolioService.addAsset(assetDTO);
            return ResponseEntity.ok(saved);
        } catch (Exception ex) {
            // Log full stacktrace server-side for diagnosis
            log.error("Error while adding asset: {}", ex.getMessage(), ex);
            // Return a clear error response (so client receives a response body)
            return ResponseEntity.status(500).body(java.util.Map.of("error", "Failed to add asset", "message", ex.getMessage()));
        }
    }

    @DeleteMapping("/assets/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        portfolioService.removeAsset(id);
        return ResponseEntity.noContent().build();
    }
}
