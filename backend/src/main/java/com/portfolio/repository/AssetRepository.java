package com.portfolio.repository;

import com.portfolio.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long> {
    // Find assets by the Portfolio's id (nested property syntax)
    List<Asset> findByPortfolio_Id(Long portfolioId);

    // Backwards-compatible alias used by tests / older code
    default List<Asset> findByPortfolioId(Long portfolioId) {
        return findByPortfolio_Id(portfolioId);
    }
}
