// ============================================================
// KonectaX - Google Sheet Form Submission
// Replace GOOGLE_SHEET_URL below with your Apps Script Web App URL
// ============================================================

const GOOGLE_SHEET_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

function submitToGoogleSheet(data) {
  return fetch(GOOGLE_SHEET_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}
