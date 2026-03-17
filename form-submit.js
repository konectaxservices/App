// ============================================================
// KonectaX - Google Sheet Form Submission
// Replace GOOGLE_SHEET_URL below with your Apps Script Web App URL
// after completing the setup steps in SETUP_GUIDE.md
// ============================================================

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwkGQwD9lH_KyGTkRoXN7xNelFwne8vPzkAygu04jh88fnmkHQ1bLgr2ld7r4r7IBw/exec";

function submitToGoogleSheet(data) {
  return fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}
