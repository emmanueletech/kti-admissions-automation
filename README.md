# KTI Admissions Automation

A working admissions workflow I built for Ketkinz Technologies Institute (KTI) to reduce manual follow-up during the application and enrollment process.

The system uses Google Forms, Google Sheets, Google Apps Script, and Gmail. It receives applications, sends applicant emails, tracks each application, and moves applicants through the admissions process while keeping approval and payment verification under staff control.

## Why I built it

KTI needed a simple admissions process that could be used while the main student platform is being developed.

Applications were being collected, but sending the same emails and updating every stage manually would become difficult as the number of applicants increased.

I wanted the process to handle repetitive work automatically without allowing the system to make important admissions or payment decisions on its own.

## Workflow

```text
Application Submitted
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
