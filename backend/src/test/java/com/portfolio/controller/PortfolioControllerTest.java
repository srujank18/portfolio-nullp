package com.portfolio.controller;

import com.portfolio.dto.PortfolioSummaryDTO;
import com.portfolio.service.PortfolioService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Collections;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PortfolioController.class)
class PortfolioControllerTest {

    @Autowired
    private MockMvc mockMvc;

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
}
