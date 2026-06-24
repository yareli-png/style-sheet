// Google Apps Script — paste this into script.google.com and deploy as a web app
// Sheet columns: Timestamp | Reviewer | Section | Comment

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(data.timestamp).toLocaleString(),
      data.author || 'Anonymous',
      data.section || '',
      data.text || '',
    ]);
  } catch (err) {}
  return ContentService.createTextOutput('ok');
}

function doGet() {
  return ContentService.createTextOutput('Style Sheet Review endpoint — use POST to submit comments.');
}

// SETUP INSTRUCTIONS:
// 1. Go to script.google.com → New project
// 2. Paste this code, save
// 3. Click Deploy → New deployment → Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 4. Copy the web app URL
// 5. In index.html, replace 'YOUR_APPS_SCRIPT_URL_HERE' with that URL
