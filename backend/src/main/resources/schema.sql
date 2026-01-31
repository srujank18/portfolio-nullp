CREATE TABLE IF NOT EXISTS portfolio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS asset (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    name VARCHAR(255) NOT NULL,
    quantity DECIMAL(19, 4) NOT NULL,
    purchase_price DECIMAL(19, 4) NOT NULL,
    portfolio_id BIGINT,
    category_id BIGINT,
    CONSTRAINT fk_asset_portfolio FOREIGN KEY (portfolio_id) REFERENCES portfolio(id) ON DELETE CASCADE,
    CONSTRAINT fk_asset_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS news_sentiment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ticker VARCHAR(10) NOT NULL,
    sentiment_score DECIMAL(5, 4),
    summary TEXT,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
