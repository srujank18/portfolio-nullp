package com.portfolio.service;

import com.portfolio.model.Asset;
import com.portfolio.model.Category;
import com.portfolio.model.Portfolio;
import com.portfolio.repository.AssetRepository;
import com.portfolio.repository.CategoryRepository;
import com.portfolio.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final PortfolioRepository portfolioRepository;
    private final CategoryRepository categoryRepository;
    private final AssetRepository assetRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Ensure portfolio exists
        Portfolio portfolio = portfolioRepository.findById(1L).orElseGet(() -> {
            Portfolio p = new Portfolio();
            p.setName("My Retirement Fund");
            p.setDescription("Long term growth");
            return portfolioRepository.save(p);
        });

        // Ensure categories exist
        Category stocks = Optional.ofNullable(categoryRepository.findByName("Stocks")).orElseGet(() -> categoryRepository.save(newCategory("Stocks")));
        Category bonds = Optional.ofNullable(categoryRepository.findByName("Bonds")).orElseGet(() -> categoryRepository.save(newCategory("Bonds")));
        Category cash = Optional.ofNullable(categoryRepository.findByName("Cash")).orElseGet(() -> categoryRepository.save(newCategory("Cash")));

        // Ensure some assets exist for portfolio
        if (assetRepository.findAll().isEmpty()) {
            Asset a1 = new Asset();
            a1.setSymbol("AAPL");
            a1.setName("Apple Inc.");
            a1.setQuantity(BigDecimal.valueOf(10));
            a1.setPurchasePrice(BigDecimal.valueOf(150));
            a1.setPortfolio(portfolio);
            a1.setCategory(stocks);
            assetRepository.save(a1);

            Asset a2 = new Asset();
            a2.setSymbol("GOOG");
            a2.setName("Alphabet Inc.");
            a2.setQuantity(BigDecimal.valueOf(5));
            a2.setPurchasePrice(BigDecimal.valueOf(120));
            a2.setPortfolio(portfolio);
            a2.setCategory(stocks);
            assetRepository.save(a2);

            Asset a3 = new Asset();
            a3.setSymbol("TLT");
            a3.setName("iShares 20+ Year Treasury Bond ETF");
            a3.setQuantity(BigDecimal.valueOf(20));
            a3.setPurchasePrice(BigDecimal.valueOf(130));
            a3.setPortfolio(portfolio);
            a3.setCategory(bonds);
            assetRepository.save(a3);
        }
    }

    private Category newCategory(String name) {
        Category c = new Category();
        c.setName(name);
        return c;
    }
}
