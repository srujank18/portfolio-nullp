# 🚀 Quick Start - Update Asset Feature

## Step 1: Start Backend
```bash
cd "C:\Users\Administrator\Downloads\Project-NullPointers\portfolio-nullp\backend"
mvn spring-boot:run
```
✅ Backend starts on `http://localhost:9092`

## Step 2: Start Frontend (new terminal)
```bash
cd "C:\Users\Administrator\Downloads\Project-NullPointers\portfolio-nullp\frontend"
npm run dev
```
✅ Frontend starts on `http://localhost:5173`

## Step 3: Open Application
Navigate to: **http://localhost:5173**

## Step 4: Test Update Asset Feature

### 4a. Add an Asset (if needed)
- Fill in the "Add New Asset" form
- Click "Add to Portfolio"
- Asset appears in "Your Assets" table

### 4b. Edit the Asset
1. Find the asset in the table
2. Click the **"Edit"** button (green button next to Sell)
3. Modal opens with current values

### 4c. Modify Fields
- Change **Asset Name**: "Apple Inc." → "Apple Inc. Updated"
- Change **Quantity**: "10" → "15"
- Change **Purchase Price**: "150" → "160"
- Change **Category**: "Stocks" → (other category if desired)

### 4d. Save Changes
- Click **"Update Asset"** button
- You'll see: "Asset updated successfully" alert
- Modal closes automatically

### 4e. Verify Changes
- Look at the "Your Assets" table
- New values are displayed immediately
- "Gain/Loss" column shows updated calculation

---

## 📊 What Changed in the UI

### Before
```
| Symbol | Name | Category | Qty | Avg Price | Current Value | Actions |
|--------|------|----------|-----|-----------|---------------|---------|
| AAPL   | Apple... | Stocks | 10 | $150 | $1800 | [Sell] |
```

### After ✨
```
| Symbol | Name | Category | Qty | Avg Price | Current Value | Gain/Loss | Actions |
|--------|------|----------|-----|-----------|---------------|-----------|---------|
| AAPL   | Apple... | Stocks | 10 | $150 | $1800 | +$300 | [Edit] [Sell] |
```

---

## 🧪 API Testing with Curl

### Get Current Assets
```bash
curl http://localhost:9092/api/portfolio
```

### Update Asset (ID = 1)
```bash
curl -X PUT http://localhost:9092/api/portfolio/assets/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Apple Inc. Updated",
    "quantity": 15,
    "purchasePrice": 160.00,
    "categoryName": "Stocks"
  }'
```

### Expected Response
```json
{
  "id": 1,
  "symbol": "AAPL",
  "name": "Apple Inc. Updated",
  "quantity": 15,
  "purchasePrice": 160.00,
  "category": {
    "id": 1,
    "name": "Stocks"
  },
  "portfolio": {...}
}
```

---

## 🐛 Troubleshooting

### Issue: Edit button not appearing
**Solution**: Refresh the page or check that AssetTable.jsx is properly updated

### Issue: Modal doesn't open
**Solution**: Check browser console for errors (F12 → Console tab)

### Issue: Update fails with error
**Solution**: 
1. Check backend is running (`http://localhost:9092/swagger-ui.html`)
2. Verify asset ID is correct
3. Check backend logs for error messages

### Issue: Changes not appearing after update
**Solution**: Portfolio data should refresh automatically. If not, manually refresh page (F5)

---

## 📋 Checklist for Manual Testing

- [ ] Backend started successfully
- [ ] Frontend started successfully
- [ ] Can see asset table with assets
- [ ] "Edit" button visible on each asset
- [ ] Click "Edit" opens modal
- [ ] Modal shows current asset values
- [ ] Can modify name, quantity, price, category
- [ ] Click "Update Asset" button works
- [ ] Success message appears
- [ ] Modal closes
- [ ] Updated values appear in table
- [ ] Gain/Loss column shows correct calculation
- [ ] Sell button still works

---

## 🧪 Automated Tests

### Run Service Tests
```bash
cd backend
mvn test -Dtest=PortfolioServiceTest#updateAsset_ShouldUpdateAssetSuccessfully
```

### Run Controller Tests
```bash
mvn test -Dtest=PortfolioControllerTest#updateAsset_ShouldUpdateAndReturn200
```

### Run All Tests
```bash
mvn clean test
```

---

## 📱 Swagger UI (Optional)

View all API endpoints in Swagger UI:
**http://localhost:9092/swagger-ui.html**

Look for:
- `PUT /api/portfolio/assets/{id}` - Update Asset ✨ (NEW)
- `POST /api/portfolio/assets` - Create Asset
- `DELETE /api/portfolio/assets/{id}` - Delete Asset
- `GET /api/portfolio` - Get Summary

---

## 💡 Key Files

**Backend**:
- `src/main/java/com/portfolio/service/PortfolioService.java` - Contains updateAsset()
- `src/main/java/com/portfolio/controller/PortfolioController.java` - Contains PUT endpoint

**Frontend**:
- `src/components/UpdateAssetModal.jsx` - Edit modal component ✨ NEW
- `src/components/AssetTable.jsx` - Asset table with Edit button

---

## ✅ Feature Complete!

The update asset feature is fully implemented and ready to use. Enjoy! 🎉

