---
permalink: /object-model-project
title: Project-Level Resources
layout: default
section_title: Procore API Resource Guide

---

The Project-level API resources are grouped into the following Procore Product Lines:

- [Core](#core)
- [Project Management](#project-management)
- [Quality and Safety](#quality-and-safety)
- [Construction Financials](#construction-financials)

## Core

![Project-level Core Resources]({{ site.baseurl }}/assets/guides/resource-model-project-level-core.svg)

## Project Directory

Procore's Project-level Directory tool stores all of your project-specific contact information.
Contacts can be employees, project team members, or other business entities, such as subcontractors or vendors.
A user assigned 'Admin' permissions to the Directory tool can add contacts so their information is available for use in Procore, or they can invite contacts to join Procore so they can log into the system as an end user.
See [Directory](http://support.procore.com/products/online/user-guide/project-level/directory) for additional infomation.

### Project Users (Contacts)

Users in the Company Directory include all users given access to any aspect of the Company, including the projects within the Company.
If a user is added to the Project Directory they will also be added to the Company Directory.
See [Add a Person to the Project Directory](http://support.procore.com/products/online/user-guide/project-level/directory/tutorials/add-person-to-project-directory) for additional infomation.

API Endpoints: [Project Users](https://developers.procore.com/reference/rest/v1/project-users)

### Project Vendors

The Company level has a directory containing vendors, also known as Directory Companies.
Not to be confused with Client Accounts, these are the vendors who are working for the Company.
See [Add a Company to the Project Directory](http://support.procore.com/products/online/user-guide/project-level/directory/tutorials/add-a-company-to-the-project-directory) for additional infomation.

API Endpoints: [Project Vendors](https://developers.procore.com/reference/rest/v1/project-vendors)

#### Project Vendor Insurances

In Procore, an insurance manager is an internal employee at your company who serves as your organization's primary point of contact for ensuring that the insurance policies for your vendors (e.g., contractors, subcontractors, and other vendors) are in compliance with legal requirements, and that their policy and certificate information is kept up to date in Procore.
Insurance information for your vendors can be added and maintained in Procore's Company and Project-level Directory tools.
The responsibilities of an insurance manager include:

- Adding insurance policies for your vendors to the Directory tool.
- Receiving automated email notifications from Procore regarding expiring insurance policies for your vendors.
- Updating insurance policies as information changes.
- Removing insurance information for your vendors when the information is no longer relevant.

See [Add Insurance for a Vendor in the Project Directory](http://support.procore.com/products/online/user-guide/project-level/directory/tutorials/add-project-insurance) for additional infomation.

API Endpoints: [Project Vendor Insurances](https://developers.procore.com/reference/rest/v1/project-vendor-insurances)

### Equipment
A project’s list of equipment used in maintaining an equipment log in the Project Daily Log tool.
See [Add Equipment](http://support.procore.com/products/online/user-guide/project-level/admin/tutorials/add-equipment) for additional infomation.

API Endpoints: [Equipment](https://developers.procore.com/reference/rest/v1/equipment)

### Locations

In Procore, tiered locations give users the ability to link different Procore objects (e.g., Drawings, Documents, RFIs, Submittals, and more) to specific locations on a jobsite.
This helps project team members to pinpoint the exact location(s) on a jobsite where a defect was observed, where equipment is to be installed, or where a project change order occurred.
See [Add Tiered Locations to a Project](http://support.procore.com/products/online/user-guide/project-level/admin/tutorials/add-multi-tiered-locations-to-a-project) for additional infomation.

API Endpoints: [Locations](https://developers.procore.com/reference/rest/v1/locations)

### Project Dates

You can create a list of Project Dates for various project milestones in your company's account.
See [Add New Project Dates](http://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-new-project-dates) for additional infomation.

API Endpoints: [Project Dates](https://developers.procore.com/reference/rest/v1/project-dates)

## Project Documents

Procore's Project-level Documents tool is designed to manage and archive all of your mission-critical project content such as drawings, specifications, bid packages, emails, safety checklists, warranty information, and more.
See [Documents](http://support.procore.com/products/online/user-guide/project-level/documents) for additional infomation.

- Project Folders - Folders in the Project Documents tool allows you to organize sub-folders or files within folders.
- Project Files - Files in the Project Files tool include documents and images that are added to the root folder or sub-folders.

API Endpoints: [Project Folders and Files](https://developers.procore.com/reference/rest/v1/project-folders-and-files)

## Project Management

![Project-level Project Management Resources]({{ site.baseurl }}/assets/guides/resource-model-project-level-project-management.svg)

## Bidding
Procore’s Project-level Bidding tool lets you solicit bids from the vendors stored in your Company Directory tool.
With the Bidding tool, you can create bid packages for your projects and send email invitations to your vendors.
See [Bidding](http://support.procore.com/products/online/user-guide/project-level/bidding) for additional infomation.

API Endpoints: [Bids](https://developers.procore.com/reference/rest/v1/bids)

## Drawings
Procore's Project-level Drawings tool is designed to manage and archive project drawings and revisions to ensure that team members always have access to the most current drawing set.
See [Drawings](http://support.procore.com/products/online/user-guide/project-level/drawings) for additional infomation.

API Endpoints: [Drawings](https://developers.procore.com/reference/rest/v1/drawings)

## Email
Procore's Project-level Email tool is designed to store, track, and manage project emails.
General contractors using this tool typically restrict access permissions for this tool to its internal employees.
See [Emails](http://support.procore.com/products/online/user-guide/project-level/emails) for additional infomation.

API Endpoints: [Communications](https://developers.procore.com/reference/rest/v1/communications)

## Meetings ##

Procore's Project-level Meeting tool is designed to help manage project meetings.
It streamlines the process of creating a meeting agenda and quickly converts your meeting agendas to minutes.
See [Meetings](http://support.procore.com/products/online/user-guide/project-level/meetings) for additional infomation.

API Endpoints: [Meetings](https://developers.procore.com/reference/rest/v1/meetings)

## Photos
Procore's Project-level Photos tool is designed to capture, store, and share an unlimited amount of project photos.
See [Photos](http://support.procore.com/products/online/user-guide/project-level/photos) for additional infomation.

API Endpoints: [Image Categories](https://developers.procore.com/reference/rest/v1/image-categories), [Images](https://developers.procore.com/reference/rest/v1/images)

## Project Schedule
Procore's Project-level Schedule tool helps you keep your projects on course by giving you a real-time view of the project.
See [Schedule](http://support.procore.com/products/online/user-guide/project-level/schedule) for additional infomation.

API Endpoints: [Calendar Events](https://developers.procore.com/reference/rest/v1/calendar-events), [Calendar Events](https://developers.procore.com/reference/rest/v1/calendar-events), [Requested Changes](https://developers.procore.com/reference/rest/v1/requested-changes), [Schedule Integration](https://developers.procore.com/reference/rest/v1/schedule-integration), [Schedule Type](https://developers.procore.com/reference/rest/v1/schedule-type), [Tasks](https://developers.procore.com/reference/rest/v1/tasks), [ToDos](https://developers.procore.com/reference/rest/v1/todos)

## RFIs

Procore’s Request for Information (RFIs) tool is designed to keep projects running smoothly.
Serving as a project's central storage and management point for information requests and responses, the RFI tool increases your ability to build project-wide accountability by letting you create, capture, and archive critical information exchanges between project leaders and the subcontractors, vendors, and other suppliers.
See [RFIs](http://support.procore.com/products/online/user-guide/project-level/rfi) for additional infomation.

API Endpoints: [RFIs](https://developers.procore.com/reference/rest/v1/rfis)

## Specifications ##

Procore's Project-level Specifications tool is designed to manage and archive all specs and revisions to ensure that the project team members always work off of the specs with real-time access.
Whether you are in the office, or on a mobile device in the field, Procore ensures that everyone who requires access is looking at the current set.
See [Specifications](http://support.procore.com/products/online/user-guide/project-level/specifications) for additional infomation.

API Endpoints: Comming Soon!

## Submittals
The Project-level Submittals tool provides architects, project engineers, project managers, and subcontractors a way to ensure that the correct products and quantities are installed on a project.
A submittal is often prepared by a contractor (or sub) who then "submits" it to the design team for approval -- either by itself, or as part of a submittal package.
This ensures that plans and materials comply with design requirements, before items are fabricated and/or delivered and installed on a project site.
See [Submittals](http://support.procore.com/products/online/user-guide/project-level/submittals) for additional infomation.

API Endpoints: [Submittals](https://developers.procore.com/reference/rest/v1/submittals)

## Timecards
Procore's Company-level Timecard tool gives you the ability to enter current-week timecard data for employees who have been added as contacts in Procore's Company-level Directory tool.
A user with 'Admin' permissions can configure the end day-of-week for timecard entry fields, as well as save timecard data in the standard Procore format or a format that is compatible with Sage Timberline.
See [Timecard](http://support.procore.com/products/online/user-guide/company-level/timecard) for additional infomation.

API Endpoints: [Timecards](https://developers.procore.com/reference/rest/v1/timecards), [Timecard Entries](https://developers.procore.com/reference/rest/v1/timecard-entries)


## Quality and Safety

![Project-level Quality and Safety Resources]({{ site.baseurl }}/assets/guides/resource-model-project-level-quality-safety.svg)

## Daily Logs
The Project-level Daily Log set of tools is designed to provide members of your project team with a central location for viewing, tracking, and emailing updates about daily project activities.
See [Daily Log](http://support.procore.com/products/online/user-guide/project-level/daily-log) and [Add a Daily Log Item](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-a-daily-log-item) for additional infomation.

### Accident Logs

The Accident Log tracks the party or company involved in any accidents that occurred onsite.
See [Add Accident Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-accident-log-entries) for additional infomation.

API Endpoints: [Accident Logs](https://developers.procore.com/reference/rest/v1/accident-logs)

### Call Logs

The Call Log tracks calls that have been made regarding a project and who was involved on the call.
This is a good place to track calls that occurred that were not quite lengthy or detailed enough to be considered "meetings", but topics that should be noted and archived.
See [Add Call Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-call-log-entries) for additional infomation.

API Endpoints: [Call Logs](https://developers.procore.com/reference/rest/v1/call-logs)

### Daily Construction Report Logs

The Daily Construction Report Log lets you add tracking information about the total number of workers and total number of hours worked for each vendor/company and trade on a project.
See [Add Daily Construction Report Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-daily-construction-report-entries) for additional infomation.

API Endpoints: [Daily Construction Report Logs](https://developers.procore.com/reference/rest/v1/daily-construction-report-logs)

### Delivery Logs

The Delivery Log tracks when shipments/packages are delivered by whom, tracking numbers associated with the delivery, and the contents of the package.
See [Add Delivery Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-delivery-log-entries) for additional infomation.

API Endpoints: [Delivery Logs](https://developers.procore.com/reference/rest/v1/delivery-logs)

### Dumpster Logs

The Dumpster Log lets you record when dumpsters are delivered and removed and any comments related to that action.
See [Add Dumpster Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-dumpster-log-entries) for additional infomation.

API Endpoints: [Dumpster Logs](https://developers.procore.com/reference/rest/v1/dumpster-logs)

### Equipment Logs

The Equipment Log tracks the specific time that certain equipment or machines were used on the project, whether they were inspected and at what time, and the cost code related to them.
See [Add Equipment Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-equipment-log-entries) for additional infomation.

API Endpoints: [Equipment Logs](https://developers.procore.com/reference/rest/v1/equipment-logs)

### Inspection Logs

The Inspections Log tracks inspections made by third-party inspectors that occur throughout the project.
See [Add Inspection Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-inspection-log-entries) for additional infomation.

API Endpoints: [Inspection Logs](https://developers.procore.com/reference/rest/v1/inspection-logs)

### Manpower Logs

The Manpower Log tracks the people on site who have completed work on the project for that day.
You are able to collect information on the companies on site, the number of workers, the number of hours they worked, and the cost code associated with their work.
See [Add Manpower Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-manpower-log-entries) for additional infomation.

API Endpoints: [Manpower Logs](https://developers.procore.com/reference/rest/v1/manpower-logs)

### Notes Logs

The Notes Log tracks any additional issues that occurred throughout the day.
This is a good place to log miscellaneous items that do not necessarily fit in any of the other logs or tools provided.
You can conveniently tag Notes as issues and run dedicated reports on them.
See [Add Notes Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-notes-log-entries) for additional infomation.

API Endpoints: [Notes Logs](https://developers.procore.com/reference/rest/v1/notes-logs)

### Plan Revision Logs

The Plan Revision Log lets you add tracking information about project plans by revision, title, and category.
It also provides you with a place for entering comments.
See [Add Plan Revision Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-plan-revision-log-entries) for additional infomation.

API Endpoints: [Plan Revision Logs](https://developers.procore.com/reference/rest/v1/plan-revision-logs)

### Productivity Logs

The Productivity Log tracks how much material arrives on site and how much is installed.
Any "Approved" purchase orders with line items will appear here so you can track the installation against the line items in the contract.
See [Add Productivity Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-productivity-log-entries) for additional infomation.

API Endpoints: [Productivity Logs](https://developers.procore.com/reference/rest/v1/productivity-logs)

### Quantity Logs

The Quantity Log lets you input tracking information about the amount of materials that are used on a given day.
See [Add Quantity Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-quantity-log-entries) for additional infomation.

API Endpoints: [Quantity Logs](https://developers.procore.com/reference/rest/v1/quantity-logs)

### Safety Violation Logs

The Safety Violation Log tracks any hazardous actions or events that have violated the safety of those on site.
You can record a violation/notice with a picture, time, and/or date.
See [Add Safety Violation Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-safety-violation-log-entries) for additional infomation.

API Endpoints: [Safety Logs](https://developers.procore.com/reference/rest/v1/safety-violation-logs)

### Timecard Entries

While the Manpower Log is used to log subcontractors and external parties, Timecard Entries are used to track the hours of internal workers.
Timecard Entries track the hours each employee has logged, as well as whether or not those hours are billable.
Data from this log is rolled up into the Company-level Timecard tab to show all Timecard Logs for all projects within that company.
See [Add Timecard Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-timecard-entries) for additional infomation.

API Endpoints: [Timecard Entries](https://developers.procore.com/reference/rest/v1/timecard-entries)

### Visitor Logs

The Visitor Log tracks anyone who visits the site (e.g. owner, union representative, salesperson, sales agent, customers, etc.) and a description of their visit.
See [Add Visitor Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-visitor-log-entries) for additional infomation.

API Endpoints: [Timecard Entries](https://developers.procore.com/reference/rest/v1/timecard-entries)

### Waste Logs

The Waste Log tracks what kind of waste is generated by the site, where the waste is deposited, and the method of disposal.
This is useful in keeping the project in accordance with any waste laws the state or local authorities may have.
See [Add Waste Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-waste-log-entries) for additional infomation.

API Endpoints: [Waste Logs](https://developers.procore.com/rest/v1/waste-logs)

### Weather Logs

The Weather Log tracks any delays to the project that may be due to weather conditions.
Each day has a daily snapshot and weather report that automatically pulls weather information for the project's location from Weather Underground.
See [Add Observed Weather Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-observed-weather-log-entries) for additional infomation.

API Endpoints: [Weather Logs](https://developers.procore.com/reference/rest/v1/weather-logs)

### Work Logs

The Work Log lets you add tracking information for the project resources that are scheduled to complete tasks.
You can designate whether the resource shows up at the job site, the number of workers, hours worked, and the compensation rate.
See [Add Scheduled Work Log Entries](http://support.procore.com/products/online/user-guide/project-level/daily-log/tutorials/add-scheduled-work-log-entries) for additional infomation.

API Endpoints: [Work Logs](https://developers.procore.com/rest/v1/work-logs)

## Inspections

Procore's Project-level Inspections tool gives you the ability to create comprehensive checklists to capture all of the requirements ssociated with the different inspection types that take place during the construction project lifecycle.
With this tool, an 'Admin' user can either create a unique template for each inspection, or choose to modify, add to, or edit a Company template on a project-by-project basis.
Templates can be managed in the Inspections (Company Level) tool.
See [Inspections](http://support.procore.com/products/online/user-guide/project-level/inspections) for additional infomation.

API Endpoints: [Checklists](https://developers.procore.com/reference/rest/v1/checklists)

## Observations

Procore's Project-level Observations tool allows project managers to assign tasks that must be completed to team members.
These observations can encompass scopes of work including quality, safety, commissioning, warranty, and work to complete.
However, unlike the Punch List tool, the Observations tool is designed to be used at any phase in the project lifecycle.
See [Observations](http://support.procore.com/products/online/user-guide/project-level/observations) for additional infomation.

API Endpoints: [Observations](https://developers.procore.com/reference/rest/v1/observations)

## Punch Lists

Procore's Project-level Punch List tool is designed to maintain a clear list of issues while assigning responsibility of an item to a specific person at a specific Company, selecting a due date for an item, and tracking an item’s current status.
See [Punch List](http://support.procore.com/products/online/user-guide/project-level/punch-list) for additional infomation.

API Endpoints: [Punch Items](https://developers.procore.com/reference/rest/v1/punch-items), [Punch Item Types](https://developers.procore.com/reference/rest/v1/punch-item-types), [Punch Item Assignments](https://developers.procore.com/reference/rest/v1/punch-item-assignments), [Punch List Assignee Options](https://developers.procore.com/reference/rest/v1/punch-list-assignee-options)

## Construction Financials

![Project-level Construction Financials Resources]({{ site.baseurl }}/assets/guides/resource-model-project-level-construction-financials.svg)

## Budget

Procore’s Project-level Budget tool lets you build and manage a comprehensive budget throughout a project's lifecycle.
It also eliminates the need for double-entry of contract modifications and change order values into complex spreadsheets, giving you greater insight into how seen and unforeseen changes impact the bottom line.
This helps you gain greater control over complicated project factors when evaluating and forecasting your project's completion costs.
See [Budget](http://support.procore.com/products/online/user-guide/project-level/budget) for additional infomation.

For a guide on how to use the Budget Changes API after a company migrates from Budget Modifications to Budget Changes, see the [Understanding Budget Changes API]({{ site.baseurl }}/tutorial-budget-changes-api) tutorial

API Endpoints: [Budget Line Items](https://developers.procore.com/rest/v1/budget-line-items), [Budget Modifications](https://developers.procore.com/documentation/reference/rest/v1/budget-modifications), [Budget](https://developers.procore.com/reference/rest/v1/budget?version=1.0), [Budget Changes](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0), [Budget Views](https://developers.procore.com/reference/rest/v1/budget-views?version=1.0), [Budget View Detail Rows](https://developers.procore.com/reference/rest/v1/budget-view-detail-rows?version=1.0), [Budget Details](https://developers.procore.com/reference/rest/v1/budget-details?version=1.0), [Manual Forecast Line Items](https://developers.procore.com/reference/rest/v1/manual-forecast-line-items?version=1.0), [Monitoring Resources](https://developers.procore.com/reference/rest/v1/monitoring-resources?version=1.0), as well as supplemantary endpoints for Budget Views and Budget Details.

## Change Events

​​Procore's Project-level Change Events tool is designed to track potential costs on a project by better coordinating the entire change management process.
See [Change Events](https://support.procore.com/products/online/user-guide/project-level/change-events) for additional infomation.

API Endpoints: [Change Events](https://developers.procore.com/reference/rest/v1/change-events), [Change Types](https://developers.procore.com/reference/rest/v1/change-types),

## Change Orders

Procore's Project-level Change Orders tool streamlines the change management process for your enterprise by providing your project team with a centralized location to monitor change orders affecting the prime contracts and commitments.
It also gives impacted clients and contractors real-time access to their specific change orders so they can satisfy their obligations, while protecting your project-sensitive data by keeping Change Order Requests (CORs) and Potential Change Orders (PCOs) private.
See [Change Orders](http://support.procore.com/products/online/user-guide/project-level/change-orders) for additional infomation.

API Endpoints: [Potential Change Orders](https://developers.procore.com/reference/rest/v1/potential-change-orders), [Change Packages](https://developers.procore.com/reference/rest/v1/change-order-packages), [Change Order Requests](https://developers.procore.com/reference/rest/v1/change-order-requests), [Change Order Reasons](https://developers.procore.com/reference/rest/v1/change-order-change-reasons), [Change Order Statuses](https://developers.procore.com/reference/rest/v1/change-order-statuses)

## Prime Contract

Procore's Project-level Prime Contract tool allows you to easily create and manage your contract with your client and keep track of change orders and related items to that contract.
See [Prime Contract](http://support.procore.com/products/online/user-guide/project-level/prime-contract) for additional infomation.

API Endpoints: [Prime Contracts](https://developers.procore.com/rest/v1/prime-contracts), [Contract Payments](https://developers.procore.com/reference/rest/v1/contract-payments)

## Commitments

Procore's Project-level Commitments tool is designed to summarize the financial commitments on a project.
It shows all of the subcontracts and purchase orders with contract amounts and approval statuses.
Due to the sensitive nature of a project's Commitments data, this tool can only be accessed by individuals who have been granted 'Admin' level permission to the tool.
See [Commitments](http://support.procore.com/products/online/user-guide/project-level/commitments) for additional infomation.

API Endpoints: [RFQs](https://developers.procore.com/reference/rest/v1/rfqs), [Line Item Types](https://developers.procore.com/rest/v1/line-item-types)

## Work Order Contracts/Subcontracts

A Work Order typically represents a contractual agreement between a an owner who is financing the construction project and the general contractor who is being paid to manage the construction project.
See [Create a Subcontract](http://support.procore.com/products/online/user-guide/project-level/commitments/tutorials/create-a-subcontract) for additional infomation.

API Endpoints: [Work Order Contracts](https://developers.procore.com/reference/rest/v1/work-order-contracts)

## Purchase Order Contracts

A Purchase Order typically represents a contractual agreement issued by a general contractor to a vendor, indicating types, quantities, and agreed prices for material or services.
See [Create a Purchase Order](http://support.procore.com/products/online/user-guide/project-level/commitments/tutorials/create-a-purchase-order) for additional infomation.

API Endpoints: [Purchase Order Contracts](https://developers.procore.com/reference/rest/v1/purchase-order-contracts)

## Draw Requests

Draw requests (requisitions) are billings from your commitments for work performed or materials/equipment purchased.
The draw requests are formatted in a typical progress billing format with a cover page and a detail line item page.
See [Information About Requisitions](http://support.procore.com/products/online/user-guide/project-level/commitments/tutorials/information-about-requisitions).

API Endpoints: [Draw Requests](https://developers.procore.com/rest/v1/draw-requests)

## Direct Costs

Procore's Project-level Direct Costs tool is designed to help you track all direct costs incurred (expenses and invoices) that are not associated with commitments, such as general conditions and self-performed work.
See [Direct Costs](http://support.procore.com/products/online/user-guide/project-level/direct-costs) for additional infomation.

API Endpoints: [Direct Costs](https://developers.procore.com/rest/v1/direct-costs)
