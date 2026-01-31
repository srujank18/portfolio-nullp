package com.portfolio.service;

import com.portfolio.dto.AssetDTO;
import com.portfolio.dto.PortfolioSummaryDTO;
import com.portfolio.model.Asset;
import com.portfolio.model.Category;
import com.portfolio.model.Portfolio;
import com.portfolio.repository.AssetRepository;
import com.portfolio.repository.CategoryRepository;
import com.portfolio.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final AssetRepository assetRepository;
    private final CategoryRepository categoryRepository;
    private final PortfolioRepository portfolioRepository; // Need to create this
    private final MarketDataService marketDataService;

    @Transactional(readOnly = true)
    public PortfolioSummaryDTO getPortfolioSummary() {
        // MVP: Assuming single portfolio with ID 1
        Long portfolioId = 1L;
        List<Asset> assets = assetRepository.findByPortfolio_Id(portfolioId);

        PortfolioSummaryDTO summary = new PortfolioSummaryDTO();
        List<AssetDTO> assetDTOs = new ArrayList<>();
        BigDecimal totalValue = BigDecimal.ZERO;
        BigDecimal totalCost = BigDecimal.ZERO;
        Map<String, BigDecimal> categoryValueMap = new HashMap<>();

        for (Asset asset : assets) {
            BigDecimal currentPrice = marketDataService.getCurrentPrice(asset.getSymbol());
            BigDecimal currentValue = currentPrice.multiply(asset.getQuantity());
            BigDecimal costBasis = asset.getPurchasePrice().multiply(asset.getQuantity());

            AssetDTO dto = new AssetDTO();
            dto.setId(asset.getId());
            dto.setSymbol(asset.getSymbol());
            dto.setName(asset.getName());
            dto.setQuantity(asset.getQuantity());
            dto.setPurchasePrice(asset.getPurchasePrice());
            dto.setCurrentValue(currentValue);
            dto.setCategoryName(asset.getCategory().getName());
            assetDTOs.add(dto);

            totalValue = totalValue.add(currentValue);
            totalCost = totalCost.add(costBasis);
            
            String category = asset.getCategory().getName();
            categoryValueMap.put(category, categoryValueMap.getOrDefault(category, BigDecimal.ZERO).add(currentValue));
        }

        summary.setAssets(assetDTOs);
        summary.setTotalValue(totalValue);
        summary.setTotalGainLoss(totalValue.subtract(totalCost));
        if (totalCost.compareTo(BigDecimal.ZERO) > 0) {
             BigDecimal gainLossPercentage = summary.getTotalGainLoss()
                .divide(totalCost, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100));
             summary.setTotalGainLossPercentage(gainLossPercentage);
        } else {
            summary.setTotalGainLossPercentage(BigDecimal.ZERO);
        }

        // Calculate Allocation Percentages
        Map<String, BigDecimal> allocation = new HashMap<>();
        if (totalValue.compareTo(BigDecimal.ZERO) > 0) {
            for (Map.Entry<String, BigDecimal> entry : categoryValueMap.entrySet()) {
                BigDecimal percentage = entry.getValue()
                        .divide(totalValue, 4, RoundingMode.HALF_UP)
                        .multiply(BigDecimal.valueOf(100));
                allocation.put(entry.getKey(), percentage);
            }
        }
        summary.setCategoryAllocation(allocation);

        return summary;
    }

    @Transactional
    public Asset addAsset(AssetDTO assetDTO) {
        // MVP: Hardcode Portfolio ID 1
        Portfolio portfolio = portfolioRepository.findById(1L).orElseThrow(() -> new RuntimeException("Portfolio not found"));
        Category category = categoryRepository.findByName(assetDTO.getCategoryName());
        if (category == null) {
            // Create category if it does not exist so the API is forgiving for the frontend
            Category newCat = new Category();
            newCat.setName(assetDTO.getCategoryName());
            category = categoryRepository.save(newCat);
        }

        Asset asset = new Asset();
        asset.setSymbol(assetDTO.getSymbol().toUpperCase());
        asset.setName(assetDTO.getName());
        asset.setQuantity(assetDTO.getQuantity());
        asset.setPurchasePrice(assetDTO.getPurchasePrice());
        asset.setPortfolio(portfolio);
        asset.setCategory(category);

        return assetRepository.save(asset);
    }
    
    @Transactional
    public void removeAsset(Long assetId) {
        assetRepository.deleteById(assetId);
    }
}
