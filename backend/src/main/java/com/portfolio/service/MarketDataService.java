package com.portfolio.service;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class MarketDataService {

    private final Map<String, BigDecimal> mockPrices = new HashMap<>();
    private final Random random = new Random();

    public MarketDataService() {
        mockPrices.put("AAPL", new BigDecimal("185.50"));
        mockPrices.put("GOOG", new BigDecimal("142.10"));
        mockPrices.put("MSFT", new BigDecimal("402.00"));
        mockPrices.put("TSLA", new BigDecimal("190.00"));
        mockPrices.put("GOLD", new BigDecimal("2050.00"));
        mockPrices.put("SILVER", new BigDecimal("23.00"));
        mockPrices.put("ADANI_CEMENTS", new BigDecimal("250.00"));
    }

    public BigDecimal getCurrentPrice(String symbol) {
        if (mockPrices.containsKey(symbol.toUpperCase())) {
            // Add some jitter to make it look live
            BigDecimal basePrice = mockPrices.get(symbol.toUpperCase());
            double variation = (random.nextDouble() - 0.5) * 2.0; // +/- 1.0
            return basePrice.add(BigDecimal.valueOf(variation));
        }
        // Fallback for unknown assets: random price between 100 and 200
        return BigDecimal.valueOf(100 + random.nextDouble() * 100);
    }
}
