// ============================================================
// KonectaX - Google Apps Script
// Paste this ENTIRE script into your Google Apps Script editor
// See SETUP_GUIDE.md for step-by-step instructions
// ============================================================

const PARTNER_EMAILS = [
  "konectaxservices@gmail.com",
  "nallyou48@gmail.com"
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Submissions") 
                  || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Form Type", "Status", "Name", "Email", "Phone",
        "Service / Topic", "Message", "Extra Details", "Followed Up By", "Notes"
      ]);
      sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#00bcd4").setFontColor("white");
      sheet.setFrozenRows(1);
    }

    // Build extra details string from any additional fields
    const coreFields = ["formType","name","email","phone","message","timestamp","service"];
    const extra = Object.entries(data)
      .filter(([k]) => !coreFields.includes(k))
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ");

    // Append submission row
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.formType || "General",
      "🆕 New",                          // Status — update to "In Progress" or "✅ Closed"
      data.name || "",
      data.email || "",
      data.phone || "",
      data.service || data.formType || "",
      data.message || "",
      extra,
      "",                                // Followed Up By
      ""                                 // Notes
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 11);

    // Send email notification to all partners
    const subject = `📋 New KonectaX Request: ${data.formType} from ${data.name}`;
    const body = `
Hello KonectaX Team,

A new request has been submitted on the website.

━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 Form Type:  ${data.formType}
👤 Name:       ${data.name}
📧 Email:      ${data.email}
📞 Phone:      ${data.phone || "Not provided"}
🕐 Time:       ${data.timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━━━
💬 Message:
${data.message}

${extra ? "📝 Additional Details:\n" + extra.split(" | ").join("\n") : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━
➡️ Please check the Google Sheet to update the status and assign follow-up.

View Sheet: https://docs.google.com/spreadsheets/d/${SpreadsheetApp.getActiveSpreadsheet().getId()}

— KonectaX Auto-Notification
    `.trim();

    PARTNER_EMAILS.forEach(email => {
      MailApp.sendEmail({ to: email, subject: subject, body: body });
    });

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test this function manually in Apps Script to verify it works
function testSetup() {
  const testData = {
    formType: "Test Submission",
    name: "Test User",
    email: "test@test.com",
    phone: "+91 0000000000",
    message: "This is a test submission to verify setup.",
    timestamp: new Date().toLocaleString()
  };
  doPost({ postData: { contents: JSON.stringify(testData) } });
  Logger.log("Test complete — check your sheet and email.");
}
