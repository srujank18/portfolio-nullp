package com.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portfolio.dto.AssetDTO;
import com.portfolio.dto.PortfolioSummaryDTO;
import com.portfolio.model.Asset;
import com.portfolio.service.PortfolioService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PortfolioController.class)
class PortfolioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PortfolioService portfolioService;

    @Test
    void getPortfolioSummary_ShouldReturnSummary() throws Exception {
        PortfolioSummaryDTO summary = new PortfolioSummaryDTO();
        summary.setTotalValue(new BigDecimal("5000"));
        summary.setAssets(Collections.emptyList());

        given(portfolioService.getPortfolioSummary()).willReturn(summary);

        mockMvc.perform(get("/api/portfolio")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalValue").value(5000));
    }

    @Test
    void updateAsset_ShouldUpdateAndReturn200() throws Exception {
        Asset asset = new Asset();
        asset.setId(1L);
        asset.setSymbol("AAPL");
        asset.setName("Apple Inc. Updated");
        asset.setQuantity(new BigDecimal("15"));
        asset.setPurchasePrice(new BigDecimal("160.00"));

        AssetDTO updateDto = new AssetDTO();
        updateDto.setName("Apple Inc. Updated");
        updateDto.setQuantity(new BigDecimal("15"));
        updateDto.setPurchasePrice(new BigDecimal("160.00"));
        updateDto.setCategoryName("Stocks");

        given(portfolioService.updateAsset(anyLong(), any(AssetDTO.class))).willReturn(asset);

        String json = objectMapper.writeValueAsString(updateDto);

        mockMvc.perform(put("/api/portfolio/assets/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.symbol").value("AAPL"))
                .andExpect(jsonPath("$.name").value("Apple Inc. Updated"));
    }
}
