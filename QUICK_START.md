# Quick Start - Enhanced Portfolio Dashboard

## 🚀 Getting Started

### 1. Ensure Backend is Running
```bash
cd backend
mvn spring-boot:run
```
Backend will start on `http://localhost:9092`

### 2. Start Frontend
```bash
cd frontend
npm install  # if not already done
npm run dev
```
Frontend will start on `http://localhost:5173`

### 3. Open Dashboard
Navigate to `http://localhost:5173` in your browser

## 📊 What You'll See

### Top Section
3-card summary showing:
- **Portfolio Value**: Total current value
- **Gain/Loss**: ROI in dollars and percentage
- **Largest Position**: Top category allocation

### Charts Section
Three side-by-side charts:
- **Allocation Pie**: Portfolio distribution by category
- **Asset Count Donut**: Number of holdings per category
- **Sentiment Panel**: Market news and trends

### Performance Chart
Bar chart showing per-category:
- Current Value (Cyan)
- Cost Basis (Purple)
- Gain/Loss (Green/Red)

### Management Section
Left: Asset table with all holdings
Right: Add new asset form + AI assistant

### Breakdown Section
Detailed view with:
- Summary table of all categories
- Interactive cards for each asset
- Complete performance metrics

## 🎨 Dark Theme Features

✅ Black background (#0a0e27)
✅ Professional card design
✅ Smooth transitions & hover effects
✅ Color-coded gains (green) and losses (red)
✅ Clear typography with multiple weights
✅ Responsive design for all devices

## 📈 Key Metrics

### View Portfolio Health
1. Check the **Gain/Loss card** for overall ROI
2. Review the **Allocation pie** for diversification
3. Analyze the **Performance bar chart** for category breakdown

### Monitor Individual Assets
1. Scroll to **Your Assets** table
2. View quantity, price, and current value
3. See gain/loss percentage (colored)
4. Delete assets with the Sell button

### Understand Your Categories
1. Go to **Category Breakdown** section
2. See summary table with all metrics
3. Explore individual holdings in cards
4. Check allocation percentages

## 🤖 Using AI Assistant

1. Locate **AI Assistant** panel (right side)
2. Enter a portfolio question
3. Set model (default: gemini)
4. Click "Ask" button
5. Get Gemini AI response

### Example Prompts
- "What's my best performing category?"
- "Should I rebalance my portfolio?"
- "How diversified is my portfolio?"
- "Which assets have the highest returns?"

## 🛠️ Adding Assets

1. Fill the **Add New Asset** form:
   - Symbol (e.g., AAPL)
   - Asset Name (e.g., Apple Inc.)
   - Quantity (number of shares)
   - Purchase Price (cost per share)
   - Category (Stocks, Bonds, Crypto, etc.)

2. Click **Add to Portfolio**

3. Dashboard automatically updates with:
   - Summary cards
   - All charts
   - Asset table
   - Category breakdown

## 📱 Mobile Access

Dashboard is fully responsive:
- ✅ Works on tablets
- ✅ Mobile-friendly layout
- ✅ Touch-optimized buttons
- ✅ Horizontal scroll for tables
- ✅ Optimized font sizes

## 🔍 Data Accuracy

All calculations verified:
- ✅ Cost basis = Quantity × Purchase Price
- ✅ Current value = Quantity × Current Price
- ✅ Gain/Loss = Current Value - Cost Basis
- ✅ G/L % = (Gain/Loss / Cost Basis) × 100
- ✅ Portfolio % = (Category Value / Total Value) × 100

## ⚙️ Configuration

### API Base URL
Frontend automatically detects backend:
- Development: `http://localhost:9092`
- Override with `VITE_API_URL` env variable

### AI API Key
Set environment variables:
```bash
export AI_API_KEY="your-gemini-key-here"
export AI_API_KEY_LOCATION="header"
export AI_API_URL="https://generativelanguage.googleapis.com/..."
```

## 🎯 Pro Tips

1. **Regular Updates**: Add assets as you invest
2. **Monitor Allocation**: Use pie chart to ensure diversification
3. **Track Performance**: Review category breakdown weekly
4. **Ask AI**: Use AI assistant for investment insights
5. **Export Data**: Bookmark important metrics

## 🆘 Troubleshooting

### Dashboard shows "No data"
- Check backend is running (`http://localhost:9092`)
- Ensure database has portfolio and assets
- Refresh browser

### Charts not displaying
- Clear browser cache
- Check console for errors (F12)
- Verify data is loading in network tab

### AI Assistant not working
- Verify API key is set correctly
- Check network tab for API calls
- Ensure Gemini API is enabled in GCP

### Styling looks different
- Clear browser cache (Ctrl+Shift+Delete)
- Check CSS is loaded (inspect element)
- Verify latest frontend code is deployed

## 📚 Documentation

See these files for detailed info:
- `THEME_IMPROVEMENTS.md` - Design details
- `CALCULATIONS.md` - Mathematical formulas
- `ENHANCEMENT_SUMMARY.md` - Features overview
- `VISUALIZATION_GUIDE.md` - Component guide

## 🚀 Performance Tips

1. **First Load**: May take a few seconds as data loads
2. **Updates**: Add assets will refresh all charts instantly
3. **Search**: Use browser find (Ctrl+F) to search assets
4. **Export**: Screenshot sections for sharing/reporting

## 📞 Support

For issues:
1. Check browser console for errors
2. Verify backend is accessible
3. Check database connection
4. Review logs in backend terminal

---

**Happy Investing! 📈**
