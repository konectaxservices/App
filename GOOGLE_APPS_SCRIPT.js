// ============================================================
// KonectaX - Google Apps Script
// Paste this ENTIRE script into your Google Apps Script editor
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

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Form Type", "Status", "Name", "Email", "Phone",
        "Service / Topic", "Message", "Extra Details", "Followed Up By", "Notes"
      ]);
      sheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#00bcd4").setFontColor("white");
      sheet.setFrozenRows(1);
    }

    const coreFields = ["formType","name","email","phone","message","timestamp","service"];
    const extra = Object.entries(data)
      .filter(([k]) => !coreFields.includes(k))
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ");

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.formType || "General",
      "New",
      data.name || "",
      data.email || "",
      data.phone || "",
      data.service || data.formType || "",
      data.message || "",
      extra,
      "",
      ""
    ]);

    sheet.autoResizeColumns(1, 11);

    const subject = `New KonectaX Request: ${data.formType} from ${data.name}`;
    const body = `Hello KonectaX Team,\n\nA new request has been submitted.\n\nForm: ${data.formType}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nTime: ${data.timestamp}\n\nMessage:\n${data.message}\n\n${extra ? "Details:\n" + extra.split(" | ").join("\n") : ""}\n\nView Sheet: https://docs.google.com/spreadsheets/d/${SpreadsheetApp.getActiveSpreadsheet().getId()}\n\n— KonectaX Auto-Notification`;

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

function testSetup() {
  doPost({ postData: { contents: JSON.stringify({
    formType: "Test", name: "Test User", email: "test@test.com",
    phone: "+91 0000000000", message: "Test submission.",
    timestamp: new Date().toLocaleString()
  })}});
  Logger.log("Test complete - check your sheet and email.");
}
