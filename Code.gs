/**
 * KTI Admissions Automation
 *
 * Google Forms + Google Sheets + Google Apps Script + Gmail
 *
 * Workflow:
 * Application Submitted -> Contacted -> Accepted ->
 * Payment Pending -> Paid -> Enrolled
 *
 * Important:
 * Admissions approval and payment verification remain manual.
 */

const CONFIG = {
  STATUS_HEADER: "Application Status",
  EMAIL_HEADER: "Email Address",
  NAME_HEADER: "Full Name",
  PROGRAM_HEADER: "Program of Interest",

  STATUS: {
    CONTACTED: "Contacted",
    ACCEPTED: "Accepted",
    PAYMENT_PENDING: "Payment Pending",
    PAID: "Paid",
    ENROLLED: "Enrolled"
  },

  SENDER_NAME: "KTI Admissions",

  // Replace with the official admissions address
  REPLY_TO: "info@ketkinzinstitute.com"
};


/**
 * Runs automatically when a new application is submitted.
 *
 * Sends the application acknowledgement email and
 * changes the applicant's status to Contacted.
 */
function onFormSubmit(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();

  const headers = getHeaders_(sheet);
  const data = getRowData_(sheet, row, headers);

  const email = data[CONFIG.EMAIL_HEADER];
  const name = data[CONFIG.NAME_HEADER] || "Applicant";
  const program = data[CONFIG.PROGRAM_HEADER] || "selected";

  if (!email) {
    throw new Error("Applicant email address was not found.");
  }

  const subject = "KTI Application Received";

  const message = `
Hello ${name},

Thank you for applying to Ketkinz Technologies Institute (KTI).

We have successfully received your application for the ${program} program.

Our admissions team will review your application and provide you with the next steps for enrollment.

If you have any questions, you may reply directly to this email.

Kind regards,

KTI Admissions
Ketkinz Technologies Institute
Empowering Future Technology Professionals
`;

  sendEmail_(email, subject, message);

  setStatus_(
    sheet,
    row,
    headers,
    CONFIG.STATUS.CONTACTED
  );
}


/**
 * Runs when the admissions status is manually changed.
 *
 * Accepted:
 * Sends acceptance email and moves applicant to Payment Pending.
 *
 * Paid:
 * Sends enrollment confirmation and moves applicant to Enrolled.
 */
function onStatusEdit(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();

  if (row === 1) return;

  const headers = getHeaders_(sheet);

  const statusColumn =
    headers.indexOf(CONFIG.STATUS_HEADER) + 1;

  if (statusColumn === 0) {
    throw new Error("Application Status column was not found.");
  }

  // Ignore edits outside the Application Status column.
  if (e.range.getColumn() !== statusColumn) return;

  const newStatus = e.value;

  if (!newStatus) return;

  const data = getRowData_(sheet, row, headers);

  const email = data[CONFIG.EMAIL_HEADER];
  const name = data[CONFIG.NAME_HEADER] || "Applicant";
  const program = data[CONFIG.PROGRAM_HEADER] || "selected";

  if (!email) {
    throw new Error("Applicant email address was not found.");
  }


  /*
   * ACCEPTED
   */
  if (newStatus === CONFIG.STATUS.ACCEPTED) {

    const subject = "Your KTI Application Has Been Accepted";

    const message = `
Hello ${name},

Congratulations!

We are pleased to inform you that your application to Ketkinz Technologies Institute (KTI) for the ${program} program has been accepted.

Your next step is to complete the required payment to secure your enrollment.

Our admissions team will provide you with the necessary payment and enrollment information.

If you have any questions, please reply directly to this email.

Kind regards,

KTI Admissions
Ketkinz Technologies Institute
Empowering Future Technology Professionals
`;

    sendEmail_(email, subject, message);

    e.range.setValue(
      CONFIG.STATUS.PAYMENT_PENDING
    );

    return;
  }


  /*
   * PAID
   */
  if (newStatus === CONFIG.STATUS.PAID) {

    const subject = "KTI Enrollment Confirmation";

    const message = `
Hello ${name},

Thank you.

Your payment has been confirmed and your enrollment in the ${program} program is now complete.

Further information regarding your classes, orientation, student access, and program schedule will be communicated to you.

Welcome to KTI.

Kind regards,

KTI Admissions
Ketkinz Technologies Institute
Empowering Future Technology Professionals
`;

    sendEmail_(email, subject, message);

    e.range.setValue(
      CONFIG.STATUS.ENROLLED
    );
  }
}


/**
 * Sends applicant email.
 */
function sendEmail_(email, subject, message) {
  GmailApp.sendEmail(
    email,
    subject,
    message,
    {
      name: CONFIG.SENDER_NAME,
      replyTo: CONFIG.REPLY_TO
    }
  );
}


/**
 * Returns spreadsheet header names.
 */
function getHeaders_(sheet) {
  return sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0];
}


/**
 * Converts one spreadsheet row into:
 *
 * {
 *   "Email Address": "...",
 *   "Full Name": "...",
 *   "Program of Interest": "...",
 *   ...
 * }
 */
function getRowData_(sheet, row, headers) {

  const values = sheet
    .getRange(row, 1, 1, headers.length)
    .getValues()[0];

  const record = {};

  headers.forEach((header, index) => {
    record[header] = values[index];
  });

  return record;
}


/**
 * Updates the Application Status column.
 */
function setStatus_(sheet, row, headers, status) {

  const statusColumn =
    headers.indexOf(CONFIG.STATUS_HEADER) + 1;

  if (statusColumn === 0) {
    throw new Error("Application Status column was not found.");
  }

  sheet
    .getRange(row, statusColumn)
    .setValue(status);
}
