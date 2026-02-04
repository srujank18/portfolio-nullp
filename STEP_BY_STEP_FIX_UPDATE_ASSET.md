# 🎯 STEP-BY-STEP: Fix "Failed to update asset: Network Error"

---

## Step 1: Stop Everything (Clean Slate)

### If Backend is Running
- Find the terminal where you ran `mvn spring-boot:run`
- Press: **Ctrl + C** to stop it

### If Frontend is Running
- Find the terminal where you ran `npm run dev`
- Press: **Ctrl + C** to stop it

### If Browser is Open
- Close the browser tab with http://localhost:5173 (or 5073)

---

## Step 2: Start Backend (First)

Open PowerShell and navigate to backend folder:

```powershell
cd "C:\Users\Administrator\Downloads\Project-NullPointers\portfolio-nullp\backend"
mvn spring-boot:run
```

**Wait until you see**:
```
... PortfolioApplication                 : Started PortfolioApplication in 8.XXX seconds
... Tomcat started on port(s): 9092 (http)
```

✅ **This means backend is ready!** (Leave this terminal open)

---

## Step 3: Start Frontend (Second Terminal)

**Do NOT close the backend terminal!** Open a NEW PowerShell:

```powershell
cd "C:\Users\Administrator\Downloads\Project-NullPointers\portfolio-nullp\frontend"
npm run dev
```

**Wait until you see**:
```
➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

✅ **This means frontend is ready!** (Leave this terminal open)

---

## Step 4: Open Browser

Open a web browser (Chrome, Firefox, Edge, etc.)

Go to: **http://localhost:5173/**

(Not 5073, NOT 5172, must be **5173**)

---

## Step 5: Clear Browser Cache

1. Press: **Ctrl + Shift + Delete**
2. In the popup:
   - Time range: Select **"All time"**
   - Check **"Cookies and other site data"**
   - Check **"Cached images and files"**
3. Click: **Clear data**
4. Close the popup

---

## Step 6: Refresh Page

Press: **Ctrl + F5** (hard refresh)

The page should reload with fresh data.

---

## Step 7: Test the Update Feature

1. **Look at the portfolio** - You should see assets in a table
2. **Find any asset** (e.g., AAPL)
3. **Click the "Edit" button** on the right side of the asset row
4. **A modal should pop up** with fields like:
   - Asset Name: [text]
   - Quantity: [number]
   - Purchase Price: [number]
   - Category: [dropdown]

5. **Change one field** (e.g., change quantity from 10 to 15)
6. **Click "Update Asset"** button
7. **Wait a moment** (the button should show "Updating...")

---

## Step 8: Check the Result

### ✅ Success (What You Want to See)

- Alert pops up: **"Asset updated successfully"**
- Alert closes automatically
- Modal closes
- You're back to the portfolio table
- The asset row now shows the **new quantity (15)**

---

### ❌ Error (Might Still Happen)

If you get an alert like:
- "Failed to update asset: Network Error"
- "Failed to update asset: Server Error (500)"

**Do this**:
1. Press: **F12** (opens Developer Tools)
2. Click: **Console** tab
3. Scroll through the messages
4. **Look for red error messages**
5. **Copy those errors** and check them against the troubleshooting below

---

## 🔧 Troubleshooting by Error Message

### Error: "No response from server. Check if backend is running on http://localhost:9092"

**Cause**: Backend is not running  
**Fix**:
1. Check if you see the backend terminal (from Step 2)
2. If not, run Step 2 again in a new terminal
3. Verify you see "Started PortfolioApplication"

---

### Error: "Server Error (500): Asset not found"

**Cause**: Asset ID doesn't exist  
**Fix**:
1. Refresh the page (Ctrl+F5)
2. Make sure you're clicking Edit on an asset that exists in the table
3. Try a different asset

---

### Error: "CORS error" or "Access-Control-Allow-Origin"

**Cause**: Backend CORS configuration issue  
**Fix**:
1. Stop backend (Ctrl+C)
2. Stop frontend (Ctrl+C in other terminal)
3. Start backend again (Step 2)
4. Start frontend again (Step 3)
5. Refresh browser (Ctrl+F5)

---

### Error: Nothing happens when clicking Update

**Cause**: Might be slow server, or request hanging  
**Fix**:
1. Click somewhere else (to close modal)
2. Click Edit again
3. Try updating again
4. Wait 10 seconds

---

## 📊 Verify Everything is Connected

### Test 1: Check Backend is Running

Open PowerShell and run:

```powershell
curl http://localhost:9092/api/portfolio
```

**✅ Expected**: JSON output with portfolio data  
**❌ Not getting JSON?** Backend is not running or wrong port

---

### Test 2: Check Frontend is Running

Open your browser and go to:

```
http://localhost:5173
```

**✅ Expected**: You see the portfolio app  
**❌ Page blank or error?** Frontend is not running

---

### Test 3: Check API Call Works

In PowerShell, try updating an asset:

```powershell
curl -X PUT http://localhost:9092/api/portfolio/assets/1 `
  -H "Content-Type: application/json" `
  -d '{
    "name":"Test",
    "quantity":10,
    "purchasePrice":100,
    "categoryName":"Stocks"
  }'
```

**✅ Expected**: JSON response with updated asset  
**❌ Error or no response?** API endpoint not working

---

## 🎯 Summary Checklist

After following all steps, verify:

- [ ] Backend terminal shows "Started PortfolioApplication"
- [ ] Frontend terminal shows "Local: http://localhost:5173/"
- [ ] Browser shows portfolio app at http://localhost:5173 (not 5073!)
- [ ] You can see assets in the table
- [ ] Click Edit opens a modal
- [ ] Modal has 4 fields (name, qty, price, category)
- [ ] You can change a field
- [ ] Click Update shows "Updating..."
- [ ] Alert says "Asset updated successfully"
- [ ] Asset table shows new values

**If all ✅**, the feature is working!

---

## 🆘 Still Not Working?

1. **Open browser DevTools** (F12)
2. **Click Console tab**
3. **Try updating again**
4. **Copy any RED error messages** (Ctrl+C)
5. **Paste them in a reply** and I'll help diagnose

The enhanced error handling I added will show:
- `Updating asset with ID: X`
- `API Base URL: http://localhost:9092`
- Detailed error information if something goes wrong

This will help identify the exact problem!

---

## ✨ That's It!

Follow these steps exactly and your Update Asset feature should work. The most common issue is:
1. Backend not running
2. Frontend on wrong port (5073 instead of 5173)
3. Browser cache not cleared

All fixed by these step-by-step instructions!

