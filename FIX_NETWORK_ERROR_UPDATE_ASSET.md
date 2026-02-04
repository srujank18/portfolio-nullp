# 🔧 FIX: "Failed to update asset: Network Error" - Complete Guide

**Issue**: When trying to update an asset, you get "Failed to update asset: Network Error"

**Date**: February 4, 2026

---

## ✅ QUICK FIX (Try This First!)

### 1. **Verify Both Servers Are Running**

**Terminal 1 - Backend** (Port 9092):
```bash
cd backend
mvn spring-boot:run
```

Wait for: `Started PortfolioApplication in X seconds`

**Terminal 2 - Frontend** (Port 5173):
```bash
cd frontend
npm run dev
```

Wait for: `➜  Local:   http://localhost:5173/`

**Terminal 3** (Optional - Test Backend API):
```bash
curl http://localhost:9092/api/portfolio
```

Expected: JSON response with portfolio data (not error)

---

### 2. **Clear Browser Cache**

Press: `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)

Select:
- ✅ Cookies
- ✅ Cached images and files
- Time range: **All time**

Then refresh the page: `Ctrl + F5` or `Cmd + Shift + R`

---

### 3. **Check the Browser Console for Detailed Errors**

1. Open your browser
2. Press: `F12` (opens Developer Tools)
3. Click: **Console** tab
4. Try updating an asset again
5. Look for error messages that might give more details

---

## 🔍 DIAGNOSIS

### Open Browser Console (F12) and Look for These Patterns:

#### **Error Pattern A: "Network Error: No response from server"**
**Means**: Backend is not running or not accessible
**Solution**: Start backend with `mvn spring-boot:run`

#### **Error Pattern B: "Failed to update asset: Server Error (500)"**
**Means**: Backend received request but had an error processing it
**Solution**: Check backend logs for the actual error

#### **Error Pattern C: "CORS error" or "No 'Access-Control-Allow-Origin' header"**
**Means**: CORS configuration issue
**Solution**: Ensure backend CORS is properly configured (see details below)

---

## 🛠️ DETAILED TROUBLESHOOTING

### Step 1: Verify Backend Port

The backend MUST run on port **9092**

Check `backend/src/main/resources/application.properties`:

```properties
server.port=${PORT:9092}
```

✅ If you see `9092`, that's correct
❌ If you see different port, update the frontend `.env` file accordingly

---

### Step 2: Verify Frontend API URL

Check `frontend/.env`:

```
VITE_API_URL=http://localhost:9092
```

✅ Should match the backend port (9092)
❌ If different, update it to match backend port

---

### Step 3: Verify Backend CORS Configuration

Check `backend/src/main/java/com/portfolio/config/CorsConfig.java`:

**Should look like this**:
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns("http://localhost:*", "http://127.0.0.1:*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // PUT must be here!
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

✅ Verify `PUT` is in the `allowedMethods` list

---

### Step 4: Verify Controller Has CORS Annotation

Check `backend/src/main/java/com/portfolio/controller/PortfolioController.java`:

**Should have**:
```java
@CrossOrigin(origins = "http://localhost:5173")
public class PortfolioController {
    // ...
    
    @PutMapping("/assets/{id}")
    public ResponseEntity<?> updateAsset(@PathVariable Long id, @RequestBody AssetDTO assetDTO) {
        // ...
    }
}
```

✅ Verify `@CrossOrigin` is on the class
✅ Verify `@PutMapping` exists for update endpoint

---

### Step 5: Check Backend Logs

When you run `mvn spring-boot:run`, look for these messages:

**✅ Good signs**:
```
Started PortfolioApplication in 8.123 seconds
Tomcat started on port(s): 9092
```

**❌ Bad signs**:
```
Port 9092 already in use
Connection refused
```

If port 9092 is in use, kill the process:

**Windows**:
```bash
netstat -ano | findstr :9092
taskkill /PID <PID> /F
```

**Mac/Linux**:
```bash
lsof -i :9092
kill -9 <PID>
```

---

## 🧪 MANUAL API TEST

Test the PUT endpoint directly using curl:

```bash
curl -X PUT http://localhost:9092/api/portfolio/assets/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Asset",
    "quantity": 10,
    "purchasePrice": 100.00,
    "categoryName": "Stocks"
  }'
```

**✅ Good response** (JSON with updated asset):
```json
{
  "id": 1,
  "symbol": "AAPL",
  "name": "Test Asset",
  "quantity": 10,
  "purchasePrice": 100.00,
  ...
}
```

**❌ Bad response** (error message):
```json
{
  "error": "Failed to update asset",
  "message": "..."
}
```

---

## 📋 COMPLETE CHECKLIST

Run through these checks:

- [ ] Backend running on port 9092 (`mvn spring-boot:run`)
- [ ] Frontend running on port 5173 (`npm run dev`)
- [ ] Backend started successfully (see "Started PortfolioApplication")
- [ ] Frontend at `http://localhost:5173` (not 5073 or other port)
- [ ] `frontend/.env` has `VITE_API_URL=http://localhost:9092`
- [ ] Backend CORS config allows PUT method
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] Page refreshed (Ctrl+F5)
- [ ] Browser console (F12) shows no CORS errors
- [ ] curl test successful (see above)
- [ ] Can see asset in table before editing
- [ ] Click Edit button opens modal
- [ ] Can modify values in modal
- [ ] Submit button doesn't show error in console

---

## 🆘 IF STILL NOT WORKING

### Enable Debug Logging

Add this to `backend/src/main/resources/application.properties`:

```properties
logging.level.org.springframework.web.cors=DEBUG
logging.level.com.portfolio=DEBUG
```

Then run `mvn spring-boot:run` and look for CORS and portfolio debug logs.

---

### Check Network Tab in Browser

1. Open DevTools: `F12`
2. Click: **Network** tab
3. Try updating asset
4. Look for `PUT /api/portfolio/assets/1` request
5. Click it and check:
   - **Status**: Should be `200` (success) or `500` (error, but response received)
   - **Headers**: Should have `Content-Type: application/json`
   - **Response**: Should show response body

---

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port 9092 already in use | Kill process on port 9092 (see above) |
| Frontend connects to wrong port | Update `.env` to correct port |
| CORS errors | Verify `CorsConfig.java` has PUT method |
| 500 error from backend | Check backend logs for exception |
| Modal doesn't open | Check browser console (F12) for JS errors |
| Button disabled after click | Backend might be slow, wait 10 seconds |

---

## 🚀 EXPECTED BEHAVIOR

### Correct Flow:
1. Click Edit button on asset row
2. Modal opens with asset data
3. Modify a field (e.g., quantity)
4. Click "Update Asset"
5. Button shows "Updating..." state
6. Success alert: "Asset updated successfully"
7. Modal closes
8. Table updates with new values

### What Changed in Code

I've enhanced the error handling in `UpdateAssetModal.jsx` to:
- ✅ Log the API base URL being used
- ✅ Log detailed error information
- ✅ Show which port/URL the request is going to
- ✅ Provide better error messages

This will help you see exactly what's wrong when you open the browser console.

---

## 🎯 NEXT STEPS

1. **Follow the Quick Fix steps** above
2. **Check the browser console** (F12) for detailed errors
3. **Run the curl test** to verify backend API works
4. **Share the console error** if still not working

---

## 💡 QUICK DIAGNOSIS COMMAND

Run this in PowerShell to test everything:

```powershell
# Test backend is running
curl http://localhost:9092/api/portfolio

# Test CORS with PUT request
curl -X PUT http://localhost:9092/api/portfolio/assets/1 `
  -H "Content-Type: application/json" `
  -d '{"name":"Test","quantity":10,"purchasePrice":100,"categoryName":"Stocks"}'
```

If these work, the problem is likely frontend-side (browser cache, wrong port).
If these fail, the problem is backend-side (server not running, wrong port).

---

## ✅ SUMMARY

The most common causes:
1. **Backend not running** - Start with `mvn spring-boot:run`
2. **Wrong port** - Verify port 9092 is used, update `.env` if needed
3. **Browser cache** - Clear cache (Ctrl+Shift+Delete)
4. **Frontend on wrong port** - Should be 5173, not 5073

Try these fixes in order, and you should be able to update assets successfully!

