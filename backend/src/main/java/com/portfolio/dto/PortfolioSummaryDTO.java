package com.portfolio.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
public class PortfolioSummaryDTO {
    private BigDecimal totalValue;
    private BigDecimal totalGainLoss;
    private BigDecimal totalGainLossPercentage;
    private List<AssetDTO> assets;
    private Map<String, BigDecimal> categoryAllocation; // Category Name -> Percentage
}
