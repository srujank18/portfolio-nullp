# Mathematical Formulas & Calculations

## Asset Level Calculations

### Cost Basis
```
Asset Cost Basis = Purchase Price × Quantity
Example: $150/share × 10 shares = $1,500
```

### Current Value
```
Asset Current Value = Current Price × Quantity
Example: $180/share × 10 shares = $1,800
```

### Gain/Loss (Dollar Amount)
```
Gain/Loss = Current Value - Cost Basis
Example: $1,800 - $1,500 = $300 (profit)
```

### Gain/Loss (Percentage)
```
Gain/Loss % = (Gain/Loss / Cost Basis) × 100
Example: ($300 / $1,500) × 100 = 20%
```

## Category Level Aggregations

### Total Category Value
```
Category Total Value = Σ(Asset Current Value)
= Asset1_Value + Asset2_Value + ... + AssetN_Value
```

### Total Category Cost
```
Category Total Cost = Σ(Asset Cost Basis)
= Asset1_Cost + Asset2_Cost + ... + AssetN_Cost
```

### Category Gain/Loss
```
Category Gain/Loss = Category Total Value - Category Total Cost
```

### Category Gain/Loss Percentage
```
Category G/L % = (Category Gain/Loss / Category Total Cost) × 100
```

### Category Portfolio Allocation
```
Category % = (Category Total Value / Portfolio Total Value) × 100
```

### Asset Count per Category
```
Asset Count = Number of unique assets in category
```

## Portfolio Level Metrics

### Total Portfolio Value
```
Portfolio Total Value = Σ(All Asset Current Values)
= Σ(Category Values)
```

### Total Cost Basis
```
Portfolio Total Cost = Σ(All Asset Cost Basis)
= Σ(Category Cost)
```

### Total Gain/Loss
```
Portfolio Gain/Loss = Portfolio Total Value - Portfolio Total Cost
```

### Total Gain/Loss Percentage (ROI)
```
Portfolio G/L % = (Portfolio Gain/Loss / Portfolio Total Cost) × 100
```

### Largest Position
```
Largest Position = MAX(Category % across all categories)
```

## Chart Calculations

### Allocation Chart (Pie)
Data Points: Category allocation percentages
```
Pie Data = [Category1%, Category2%, ..., CategoryN%]
Where each Category% = (Category Value / Portfolio Value) × 100
```

### Performance Chart (Bar)
Three data series per category:
```
Dataset 1: Category Current Values
Dataset 2: Category Cost Basis
Dataset 3: Category Gain/Loss amounts
```

### Distribution Chart (Doughnut)
Data Points: Asset count per category
```
Doughnut Data = [Category1_Count, Category2_Count, ..., CategoryN_Count]
Displayed as percentages: (Count / Total Assets) × 100
```

### Category Breakdown Table
Columns:
1. **Assets**: Count of holdings
2. **Current Value**: Sum of current values
3. **Cost Basis**: Sum of purchase costs
4. **% Portfolio**: (Value / Total Portfolio) × 100
5. **Gain/Loss %**: (G/L / Cost) × 100

## Example Calculation

### Sample Portfolio
```
Category: Stocks
  Asset 1: AAPL
    - Quantity: 10
    - Purchase Price: $150
    - Current Price: $180
  Asset 2: GOOG
    - Quantity: 5
    - Purchase Price: $120
    - Current Price: $130

Category: Bonds
  Asset 3: BND
    - Quantity: 20
    - Purchase Price: $100
    - Current Price: $105
```

### Step-by-Step Calculations

#### Asset Level
```
AAPL Cost = 10 × $150 = $1,500
AAPL Value = 10 × $180 = $1,800
AAPL G/L = $1,800 - $1,500 = $300
AAPL G/L % = ($300 / $1,500) × 100 = 20%

GOOG Cost = 5 × $120 = $600
GOOG Value = 5 × $130 = $650
GOOG G/L = $650 - $600 = $50
GOOG G/L % = ($50 / $600) × 100 = 8.33%

BND Cost = 20 × $100 = $2,000
BND Value = 20 × $105 = $2,100
BND G/L = $2,100 - $2,000 = $100
BND G/L % = ($100 / $2,000) × 100 = 5%
```

#### Category Level
```
STOCKS:
  Total Value = $1,800 + $650 = $2,450
  Total Cost = $1,500 + $600 = $2,100
  Total G/L = $2,450 - $2,100 = $350
  G/L % = ($350 / $2,100) × 100 = 16.67%
  Asset Count = 2

BONDS:
  Total Value = $2,100
  Total Cost = $2,000
  Total G/L = $100
  G/L % = ($100 / $2,000) × 100 = 5%
  Asset Count = 1
```

#### Portfolio Level
```
Total Portfolio Value = $2,450 + $2,100 = $4,550
Total Cost = $2,100 + $2,000 = $4,100
Total G/L = $4,550 - $4,100 = $450
Total G/L % = ($450 / $4,100) × 100 = 10.98%

Allocation:
  Stocks = ($2,450 / $4,550) × 100 = 53.85%
  Bonds = ($2,100 / $4,550) × 100 = 46.15%

Largest Position = Stocks (53.85%)
```

## Important Notes

1. **Cost Basis**: Uses purchase price × quantity, not market price at purchase
2. **Current Value**: Uses latest price from MarketDataService
3. **Percentages**: Rounded to 2 decimal places for display
4. **Tooltips**: Show exact unrounded values for precision
5. **Zero Handling**: Division by zero prevented with checks
6. **Formatting**: Currency shown with 0-2 decimal places based on context

## Accuracy Checks

When validating calculations:
- Sum of all asset values = Total portfolio value
- Sum of all asset costs = Total portfolio cost
- Sum of category allocations = 100% (within rounding)
- Category G/L = Σ(Asset G/L in category)
