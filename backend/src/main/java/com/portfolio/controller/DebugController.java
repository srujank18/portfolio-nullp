package com.portfolio.controller;

import com.portfolio.model.Asset;
import com.portfolio.model.Category;
import com.portfolio.model.Portfolio;
import com.portfolio.repository.AssetRepository;
import com.portfolio.repository.CategoryRepository;
import com.portfolio.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/debug")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DebugController {
    private final AssetRepository assetRepository;
    private final JdbcTemplate jdbcTemplate;
    private final CategoryRepository categoryRepository;
    private final PortfolioRepository portfolioRepository;

    @GetMapping("/assets")
    public ResponseEntity<List<Asset>> getAllAssets() {
        return ResponseEntity.ok(assetRepository.findAll());
    }

    @GetMapping("/assets/portfolio/{id}")
    public ResponseEntity<List<Asset>> getAssetsByPortfolio(@PathVariable Long id) {
        return ResponseEntity.ok(assetRepository.findByPortfolio_Id(id));
    }

    @GetMapping("/counts")
    public ResponseEntity<Map<String, Object>> getTableCounts() {
        Map<String, Object> counts = new HashMap<>();
        counts.put("portfolio", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM portfolio", Integer.class));
        counts.put("category", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM category", Integer.class));
        counts.put("asset", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM asset", Integer.class));
        counts.put("news_sentiment", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM news_sentiment", Integer.class));
        return ResponseEntity.ok(counts);
    }

    @PostMapping("/seed")
    public ResponseEntity<Map<String, Object>> seedDatabase() {
        // Create or get portfolio id=1
        Portfolio portfolio = portfolioRepository.findById(1L).orElseGet(() -> {
            Portfolio p = new Portfolio();
            p.setName("My Retirement Fund");
            p.setDescription("Long term growth");
            return portfolioRepository.save(p);
        });

        Category stocks = Optional.ofNullable(categoryRepository.findByName("Stocks")).orElseGet(() -> {
            Category c = new Category(); c.setName("Stocks"); return categoryRepository.save(c);
        });
        Category bonds = Optional.ofNullable(categoryRepository.findByName("Bonds")).orElseGet(() -> {
            Category c = new Category(); c.setName("Bonds"); return categoryRepository.save(c);
        });

        // Add assets if not present
        if (assetRepository.findAll().isEmpty()) {
            Asset a1 = new Asset();
            a1.setSymbol("AAPL"); a1.setName("Apple Inc."); a1.setQuantity(BigDecimal.valueOf(10)); a1.setPurchasePrice(BigDecimal.valueOf(150)); a1.setPortfolio(portfolio); a1.setCategory(stocks); assetRepository.save(a1);
            Asset a2 = new Asset();
            a2.setSymbol("GOOG"); a2.setName("Alphabet Inc."); a2.setQuantity(BigDecimal.valueOf(5)); a2.setPurchasePrice(BigDecimal.valueOf(120)); a2.setPortfolio(portfolio); a2.setCategory(stocks); assetRepository.save(a2);
            Asset a3 = new Asset();
            a3.setSymbol("TLT"); a3.setName("iShares 20+ Year Treasury Bond ETF"); a3.setQuantity(BigDecimal.valueOf(20)); a3.setPurchasePrice(BigDecimal.valueOf(130)); a3.setPortfolio(portfolio); a3.setCategory(bonds); assetRepository.save(a3);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("portfolioCount", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM portfolio", Integer.class));
        result.put("categoryCount", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM category", Integer.class));
        result.put("assetCount", jdbcTemplate.queryForObject("SELECT COUNT(*) FROM asset", Integer.class));
        return ResponseEntity.ok(result);
    }
}
