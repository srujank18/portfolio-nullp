package com.portfolio.service;

import com.portfolio.dto.AssetDTO;
import com.portfolio.dto.PortfolioSummaryDTO;
import com.portfolio.model.Asset;
import com.portfolio.model.Category;
import com.portfolio.model.Portfolio;
import com.portfolio.repository.AssetRepository;
import com.portfolio.repository.CategoryRepository;
import com.portfolio.repository.PortfolioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PortfolioServiceTest {

    @Mock
    private AssetRepository assetRepository;

    @Mock
    private CategoryRepository categoryRepository;
    
    @Mock
    private PortfolioRepository portfolioRepository;

    @Mock
    private MarketDataService marketDataService;

    @InjectMocks
    private PortfolioService portfolioService;

    private Asset asset;
    private Category category;
    private Portfolio portfolio;

    @BeforeEach
    void setUp() {
        portfolio = new Portfolio();
        portfolio.setId(1L);
        portfolio.setName("Test Portfolio");

        category = new Category();
        category.setId(1L);
        category.setName("Stocks");

        asset = new Asset();
        asset.setId(1L);
        asset.setSymbol("AAPL");
        asset.setName("Apple Inc.");
        asset.setQuantity(new BigDecimal("10"));
        asset.setPurchasePrice(new BigDecimal("150.00"));
        asset.setCategory(category);
        asset.setPortfolio(portfolio);
    }

    @Test
    void getPortfolioSummary_ShouldCalculateValuesCorrectly() {
        when(assetRepository.findByPortfolioId(1L)).thenReturn(Collections.singletonList(asset));
        when(marketDataService.getCurrentPrice("AAPL")).thenReturn(new BigDecimal("180.00"));

        PortfolioSummaryDTO summary = portfolioService.getPortfolioSummary();

        assertNotNull(summary);
        assertEquals(new BigDecimal("1800.00"), summary.getTotalValue()); // 10 * 180
        assertEquals(new BigDecimal("300.00"), summary.getTotalGainLoss()); // 1800 - (10*150)
        assertEquals(1, summary.getAssets().size());
        assertEquals(new BigDecimal("100.00"), summary.getCategoryAllocation().get("Stocks")); // 100%
    }

    @Test
    void addAsset_ShouldSaveAsset() {
        AssetDTO dto = new AssetDTO();
        dto.setSymbol("GOOG");
        dto.setName("Google");
        dto.setQuantity(new BigDecimal("5"));
        dto.setPurchasePrice(new BigDecimal("2000"));
        dto.setCategoryName("Stocks");

        when(portfolioRepository.findById(1L)).thenReturn(Optional.of(portfolio));
        when(categoryRepository.findByName("Stocks")).thenReturn(category);
        when(assetRepository.save(any(Asset.class))).thenAnswer(i -> i.getArguments()[0]);

        Asset savedAsset = portfolioService.addAsset(dto);

        assertNotNull(savedAsset);
        assertEquals("GOOG", savedAsset.getSymbol());
        assertEquals(category, savedAsset.getCategory());
        verify(assetRepository).save(any(Asset.class));
    }
}
