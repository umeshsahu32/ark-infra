Google Sheets & Apps Script Setup Guide
Follow these steps to create the backend for your contact form.

1. Create a Google Sheet
Go to Google Sheets and create a new spreadsheet.
Name it "Ark Builders Contact Form Responses" (or anything you like).
In the first row (Header Row), add the following column names in exact order:
A1: Timestamp
B1: FirstName
C1: LastName
D1: Designation
E1: Company
F1: BusinessEmail
G1: Phone
H1: Message
2. Create the Apps Script
In the Google Sheet, click on Extensions > Apps Script.
A new tab will open with a code editor.
Delete any code in Code.gs and paste the following code:
javascript



/*
  Google Apps Script to handle contact form submissions
  and save them to the active Google Sheet.
*/
const SHEET_NAME = "Sheet1"; // Make sure this matches your sheet tab name
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);
    // Parse the incoming data
    // We expect the data to be sent as a JSON string in the post body
    let data;
    try {
        data = JSON.parse(e.postData.contents);
    } catch(err) {
        // Fallback if sent as form parameters
        data = e.parameter;
    }
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;
    const newRow = headers.map(function(header) {
      if (header === 'Timestamp') return new Date();
      // Match the header name with the key in the data object
      // The keys in JS are camelCase (firstName), headers in Sheet can be whatever
      // Let's normalize to lowercase for comparison or just map manually
      
      // key mapping based on your form fields:
      // firstName, lastName, designation, company, businessEmail, phone, message
      switch(header) {
        case 'FirstName': return data.firstName || '';
        case 'LastName': return data.lastName || '';
        case 'Designation': return data.designation || '';
        case 'Company': return data.company || '';
        case 'BusinessEmail': return data.businessEmail || '';
        case 'Phone': return data.phone || '';
        case 'Message': return data.message || '';
        default: return '';
      }
    });
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    // Send Email Notification
    // You can send to multiple people by separating emails with commas
    // You can change this line anytime. Just save and create a New Version of deployment.
    const emailRecipient = "manager@example.com, sales@example.com"; 
    const subject = "New Contact Form Submission - Ark Builders";
    const body = `
      You have received a new contact form submission:
      
      Name: ${data.firstName || ''} ${data.lastName || ''}
      Designation: ${data.designation || ''}
      Company: ${data.company || ''}
      Email: ${data.businessEmail || ''}
      Phone: ${data.phone || ''}
      
      Message:
      ${data.message || ''}
    `;
    
    MailApp.sendEmail({
      to: emailRecipient,
      subject: subject,
      body: body
    });
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}



3. Authorize the Script (IMPORTANT FOR EMAIL)
Make sure you have Saved your code (Press Ctrl+S or Cmd+S). If you haven't saved, the toolbar might not update.
Look for the toolbar at the top of the editor. It usually has "Debug" and "Run" buttons. Next to "Debug", there should be a dropdown showing doPost.
If you see doPost in the dropdown, click it and select testPermissions (if you added it) OR just leave it as doPost.
Click the Run button.
If you selected doPost, the Execution Log will show an error (red text). That is fine! The important part is that before the error, it asked for permissions.
If you selected testPermissions, it should run successfully.
Regardless of the error, as long as you clicked Allow on the permission popup, you are good to go.
4. Deploy the Script
Click on the Deploy button (blue button, top right) > Manage deployments.
Click the Edit (pencil icon) next to your active deployment.
Version: Select New version from the dropdown. (CRITICAL: You must create a new version to update the code).
Click Deploy.
Use the same URL: The URL usually stays the same if you just update the version, but verify it matches what you are using in your code.