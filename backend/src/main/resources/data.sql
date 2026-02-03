-- Seed portfolio (ensure ID 1 exists)
INSERT INTO portfolio (id, name, description) VALUES (1, 'My Retirement Fund', 'Long term growth')
    ON DUPLICATE KEY UPDATE name = VALUES(name), description = VALUES(description);

-- Seed categories with explicit IDs so we can reference them from assets
INSERT INTO category (id, name) VALUES (1, 'Stocks')
    ON DUPLICATE KEY UPDATE name = VALUES(name);
INSERT INTO category (id, name) VALUES (2, 'Bonds')
    ON DUPLICATE KEY UPDATE name = VALUES(name);
INSERT INTO category (id, name) VALUES (3, 'Cash')
    ON DUPLICATE KEY UPDATE name = VALUES(name);
INSERT INTO category (id, name) VALUES (4, 'Metals')
    ON DUPLICATE KEY UPDATE name = VALUES(name);
INSERT INTO category (id, name) VALUES (5, 'Real Estate')
    ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Add some assets for portfolio 1
INSERT INTO asset (symbol, name, quantity, purchase_price, portfolio_id, category_id) VALUES
('AAPL', 'Apple Inc.', 10.0000, 150.00, 1, 1),
('GOOG', 'Alphabet Inc.', 5.0000, 120.00, 1, 1),
('TLT', 'iShares 20+ Year Treasury Bond ETF', 20.0000, 130.00, 1, 2)
ON DUPLICATE KEY UPDATE symbol = VALUES(symbol);

-- News sentiment samples
INSERT INTO news_sentiment (ticker, sentiment_score, summary) VALUES
('AAPL', 0.85, 'Apple releases new Vision Pro with great reviews. Good to Buy now.'),
('GOOG', 0.70, 'Google AI integration is progressing well.'),
('TSLA', 0.30, 'Tesla faces production delays in new model release.');
