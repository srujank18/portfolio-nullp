package com.portfolio.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class AssetDTO {
    private Long id;
    private String symbol;
    private String name;
    private BigDecimal quantity;
    private BigDecimal purchasePrice;
    private BigDecimal currentValue; // Calculated field
    private String categoryName;
}
