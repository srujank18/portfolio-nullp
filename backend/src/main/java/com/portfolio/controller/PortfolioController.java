package com.portfolio.controller;

import com.portfolio.dto.AssetDTO;
import com.portfolio.dto.PortfolioSummaryDTO;
import com.portfolio.model.Asset;
import com.portfolio.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite frontend
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;

    @GetMapping
    public ResponseEntity<PortfolioSummaryDTO> getPortfolioSummary() {
        return ResponseEntity.ok(portfolioService.getPortfolioSummary());
    }

    @PostMapping("/assets")
    public ResponseEntity<Asset> addAsset(@RequestBody AssetDTO assetDTO) {
        return ResponseEntity.ok(portfolioService.addAsset(assetDTO));
    }

    @DeleteMapping("/assets/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        portfolioService.removeAsset(id);
        return ResponseEntity.noContent().build();
    }
}
