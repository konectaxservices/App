# KonectaX Setup Guide
## Connect Website Forms → Google Sheet → Email Notifications

---

## STEP 1: Create the Google Sheet

1. Go to **https://sheets.google.com** (sign in as konectaxservices@gmail.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Rename it: **"KonectaX Submissions"**
4. Name the first tab (bottom): **"Submissions"**

---

## STEP 2: Set Up the Apps Script

1. In your Google Sheet, click the menu: **Extensions → Apps Script**
2. A new tab opens — **delete** all the default code in the editor
3. Open the file **GOOGLE_APPS_SCRIPT.js** (provided with your website files)
4. **Copy all the code** and **paste** it into the Apps Script editor
5. Click **💾 Save** (Ctrl+S)

---

## STEP 3: Deploy the Script

1. Click the blue **"Deploy"** button → **"New deployment"**
2. Click the gear icon ⚙️ next to "Type" → Select **"Web app"**
3. Fill in:
   - **Description:** KonectaX Form Handler
   - **Execute as:** Me (konectaxservices@gmail.com)
   - **Who has access:** **Anyone**
4. Click **"Deploy"**
5. Google will ask you to **authorize** — click "Authorize access" → choose your Google account → click "Allow"
6. After deploying, you'll see a **Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`
7. **Copy this URL**

---

## STEP 4: Add the URL to Your Website

1. Open the file **form-submit.js** in your website folder
2. Find this line:
   ```
   const GOOGLE_SHEET_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL you copied
4. Save the file

---

## STEP 5: Test It

1. Open your website and fill in any form
2. Submit it
3. Check your Google Sheet — a new row should appear with:
   - Timestamp
   - Form Type (e.g. "Student Admission")
   - Status: 🆕 New
   - Name, Email, Phone, Message, etc.
4. Check both email inboxes (konectaxservices@gmail.com and nallyou48@gmail.com) — you should receive a notification email

If you don't see data, go back to Apps Script → Run the **testSetup()** function to debug.

---

## STEP 6: Tracking Application Status

In your Google Sheet, the **"Status"** column (column C) starts as **"🆕 New"**.

To update it:
- **🆕 New** → someone just submitted
- **🔄 In Progress** → a team member is following up
- **✅ Closed** → deal done / resolved

**To update:**
1. Click the cell in column C
2. Type the new status
3. Press Enter

You can also add who is handling it in the **"Followed Up By"** column and add notes in the **"Notes"** column.

---

## ZAPIER (WhatsApp Notifications) — Optional

To also receive WhatsApp messages when a form is submitted:

1. Go to **https://zapier.com** and create a free account
2. Create a new Zap:
   - **Trigger:** Google Sheets → "New Row in Spreadsheet"
   - Connect your Google account and select "KonectaX Submissions"
   - **Action:** WhatsApp (or use "Email by Zapier" as a simpler alternative)
3. Test and turn on the Zap

Free Zapier gives you 100 tasks/month which is plenty for starting out.

---

## Your Website Files Checklist

```
✅ index.html         — Home page (updated, responsive, no phone numbers)
✅ about.html         — Team page (Vicky removed, Abdirahman Shabalala added)
✅ contact.html       — Contact form → Google Sheet
✅ education.html     — Student Admission form → Google Sheet
✅ medical.html       — Medical Translator form → Google Sheet
✅ travel.html        — Travel Services form → Google Sheet
✅ exchange.html      — Money Exchange form → Google Sheet
✅ room.html          — Room Accommodation form → Google Sheet
✅ form-submit.js     — Shared submission script (add your URL here)
✅ GOOGLE_APPS_SCRIPT.js — Paste this into Apps Script
```

---

*Need help? Email: konectaxservices@gmail.com*
