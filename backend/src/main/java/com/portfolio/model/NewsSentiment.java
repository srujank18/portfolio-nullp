package com.portfolio.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
public class NewsSentiment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ticker;
    private BigDecimal sentimentScore;
    
    @Column(columnDefinition = "TEXT")
    private String summary;

    private LocalDateTime lastUpdated = LocalDateTime.now();
    
    @PreUpdate
    public void preUpdate() {
        lastUpdated = LocalDateTime.now();
    }
}
