package com.portfolio.repository;

import com.portfolio.model.NewsSentiment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NewsSentimentRepository extends JpaRepository<NewsSentiment, Long> {
    Optional<NewsSentiment> findByTicker(String ticker);
}
