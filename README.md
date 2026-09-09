# KTI Admissions Automation

A working admissions management workflow I built for Ketkinz Technologies Institute (KTI) using Google Workspace.

The system uses Google Forms, Google Sheets, Google Apps Script, and Gmail. It receives applications, sends applicant emails, notifies the KTI admissions team when a new application is received, tracks each application, and moves applicants through the admissions process while keeping admissions approval and payment verification under staff control.

## What I built

- Created and configured the KTI student application Google Form
- Connected the form responses to Google Sheets
- Structured the admissions tracking sheet
- Created the Application Status dropdown and workflow stages
- Built Google Apps Script automation for form submissions and status edits
- Configured installable `On form submit` and `On edit` triggers
- Automated applicant confirmation emails
- Added internal KTI notifications for every new application
- Automated safe status transitions after staff actions
- Tested the complete workflow end to end
- Documented the project and source code on GitHub

## Why I built it

KTI needed a simple admissions process that could be used while the main student platform is being developed.

Applications were being collected, but sending the same emails, checking constantly for new submissions, and updating every stage manually would become difficult as the number of applicants increased.

I wanted the process to handle repetitive work automatically without allowing the system to make important admissions or payment decisions on its own.

## System architecture

```text
Google Form
Application Intake
      |
      v
Google Sheets
Admissions Tracker
      |
      v
Google Apps Script
Workflow Logic + Triggers
      |
      +--> Applicant confirmation email
      |
      +--> KTI new-application notification
      |
      v
Gmail
Applicant + Internal Communications
```

## Admissions workflow

```text
Application Submitted
        |
        +--> Applicant confirmation email
        |
        +--> KTI admissions notification email
        |
        v
    Contacted
        |
        v
Admissions Review
        |
        v
     Accepted
        |
        v
Payment Pending
        |
        v
       Paid
        |
        v
     Enrolled
```

## New application notification

When an applicant submits the KTI application form, the `onFormSubmit` automation processes the submission. In addition to acknowledging the applicant, the workflow sends an internal notification to KTI containing the applicant's name, email address, program of interest, and current application status.

This means the admissions team can know that a new application has arrived without continuously logging into the response spreadsheet.

After the submission workflow completes, the applicant's status is automatically updated to `Contacted` in the admissions tracker.

## Human-controlled decisions

The automation handles repetitive communication and status tracking, but two important decisions remain manual:

- Admissions approval
- Payment verification

The system does not accept an applicant or confirm a payment without staff review.

## Technologies

- Google Forms — application intake
- Google Sheets — applicant records and admissions tracking
- Google Sheets data validation — controlled status values
- Google Apps Script — workflow automation and event handling
- Gmail — applicant communications and internal admissions notifications
- Installable triggers — form submission and status-edit events
- GitHub — source code and project documentation

## Testing

The workflow was tested end to end by submitting a fresh application through the live form and confirming that:

- the application appeared in Google Sheets
- the applicant received the confirmation email
- KTI received the new-application notification email
- the applicant's status changed to `Contacted`
- changing the status to `Accepted` sent the acceptance email
- `Accepted` moved to `Payment Pending`
- the payment stage could be processed manually
- `Paid` moved to `Enrolled`
- both Apps Script triggers executed successfully

## Privacy

The live system contains applicant information. Real applicant names, email addresses, phone numbers, form responses, spreadsheet identifiers, and other private information are not published in this repository.

## Current status

The Google Workspace version is a working admissions workflow for KTI and also serves as a practical prototype for the permanent KTI platform.

Built, configured, tested, and documented by **EmmanueleTech** for **Ketkinz Technologies Institute (KTI)**.
