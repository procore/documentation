---
permalink: /tutorial-field-prod
title: Field Productivity
layout: default
section_title: Guides and Tutorials

---

## Introduction

This tutorial provides insight and guidance for developers using the Field Productivity resources and endpoints available in the Procore API.
Procore's Project-level Timesheets tool is designed for self-perform contractors who manage internal labor resources on site.
Contractors use time tracking information for payroll and labor productivity reporting.

Prior to working with the Field Productivity resources and endpoints, we recommend reviewing our [Timecard](https://support.procore.com/products/online/user-guide/company-level/timecard) and [Timesheet](https://support.procore.com/products/online/user-guide/project-level/timesheets) articles on the Procore Support Site.
We also encourage you to view our informative [How-to Training Videos](https://support.procore.com/products/online/user-guide/project-level/timesheets/videos) to gain a deeper understanding of our Field Productivity tools.

## Timecard Entries

A Timecard Entry is the most basic element for tracking employee time information.
These records contain all key data, such as employee name, hours worked, work performed, etc.
In Procore, Timecard Entries are created from several places - Timesheets, the Daily Log, and the company-level Timecard tool.
Procore users are restricted to which fields they can fill out depending on where the entry is created from.
In Procore reporting tools (Custom Reports, Labor Budget to Actual, Field Production Report, etc.), all Timecard entries are listed regardless of which tool they were created in.

### Timecard Entry Endpoints

The Procore API provides the following endpoints for working with Timecard Entries.

| Endpoint                                                                                                         | Description                                                                      |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [List Timecard Entries](https://developers.procore.com/reference/rest/v1/timecard-entries#list-timecard-entries) | Returns a list of pending Timecard Entries in the specified Project.             |
| [Create Timecard Entry](https://developers.procore.com/reference/rest/v1/timecard-entries#create-timecard-entry) | Creates a new Timecard Entry for the specified Project for a given timesheet ID. |
| [Show Timecard Entry](https://developers.procore.com/reference/rest/v1/timecard-entries#show-timecard-entry)     | Returns details for a given Timecard Entry in the specified Project.             |
| [Update Timecard Entry](https://developers.procore.com/reference/rest/v1/timecard-entries#update-timecard-entry) | Updates the information for a given Timecard Entry in the specified Project.     |
| [Delete Timecard Entry](https://developers.procore.com/reference/rest/v1/timecard-entries#delete-timecard-entry) | Deletes a given Timecard Entry in the specified Project.                         |

## Timesheets

Each Timesheet represent a grouping of one or more Timecard Entries for one day.
When Timecard Entries are associated with a Timesheet, users are able to interact with them in the Timesheets tool.
Timesheets offer the most advanced time tracking functionality in the Procore web app, allowing users to attach a signature, approve entries, fill out production quantities, and more.

> TIME ENTRY SETTINGS
>
> Timesheets are configured for time entry at the project level using either Total Hours or Start Time and Stop Time.
> It is important to note that when you create timecard entries for a timesheet using the API, you must use paramters consistent with the time entry setting for the particular timesheet you are working with.
> For example, if the timesheet is configured for Total Hours time entry then you would simply use the `hours` parameter.
> Alternately, if the timesheet is configured to use Start Time and Stop Time, you would use the `time_in`, `time_out`, and `lunch_time` parameters.
> Under this scenario, `time_in` and `time_out` are passed as ISO8601-compliant strings and `lunch_time` is passed as the number of minutes spent for a lunch break.

### Timesheet Endpoints

The Procore API provides the following endpoints for working with Timesheets.

| Endpoint                                                                                                                                                 | Description                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [List All Timesheets](https://developers.procore.com/reference/rest/v1/timesheets#list-all-timesheets)                                                   | Returns a list of all Timesheets in a specified Project.                                   |
| [Show a Timesheet](https://developers.procore.com/reference/rest/v1/timesheets#show-a-timesheet)                                                         | Returns detailed information for a given Timesheet in a specified Project.                 |
| [Create Timesheet](https://developers.procore.com/reference/rest/v1/timesheets#create-timesheet)                                                         | Creates a new Timesheet in the specified Project.                                          |
| [Get a List of Possible Timesheet Creators](https://developers.procore.com/reference/rest/v1/timesheets#get-a-list-of-possible-timesheet-creators)       | Returns a list of all potential Timesheet Creators for a specified Project.                |
| [Get A List of Possible Timesheet Creator Ids](https://developers.procore.com/reference/rest/v1/timesheets#get-a-list-of-possible-timesheet-creator-ids) | Returns a list of all potential Timesheet Creator Ids for a specified Project.             |
| [List Cost Codes for Timesheets](https://developers.procore.com/reference/rest/v1/timesheets#list-cost-codes-for-timesheets)                             | Returns a list of Cost Codes for Timesheets in a specified Project.                        |
| [List Cost Code Ids for Timesheets](https://developers.procore.com/reference/rest/v1/timesheets#list-cost-codes-ids-for-timesheets)                      | Returns a list of Cost Code Ids for Timesheets in a specified Project.                     |
| [Update Timesheet Status](https://developers.procore.com/reference/rest/v1/timesheets#update-timesheet-status)                                           | Updates the status of a given Timesheet as either pending/approved in a specified Project. |
| [List Change History for Timesheet](https://developers.procore.com/reference/rest/v1/timesheets#list-change-history-for-timesheet)                       | Returns Change History for a given Timesheet in a specified Project.                       |
| [Create Signature for Timesheet](https://developers.procore.com/reference/rest/v1/timesheets#create-signature-for-timesheet)                             | Create new Signature associated with a specified Project.                                  |
| [Show a Signature](https://developers.procore.com/reference/rest/v1/timesheets#show-a-signature)                                                         | Return detailed information on a given Signature in a specified Project.                   |

## Typical Example Workflow

To help illustrate the relationship between Timecard Entries and Timesheets, let's work through a typical example of a Field Productivity workflow.
In this example we will create a new Timesheet, add a Timecard Entry to the new Timesheet, update the time worked on the Timecard Entry, then finally approve the Timesheet.

### 1. Create a New Timesheet

Use the [Create Timesheet](https://developers.procore.com/reference/rest/v1/timesheets#create-timesheet) endpoint (POST /rest/v1.0/projects/{project_id}/timesheets) to create a new Timesheet grouping object.
Here is a cURL example showing this call:

```
curl -H "Content-type: application/json" -H "Authorization: Bearer <access token>" \
     -X POST -d '{"timesheet":{"date":"2018-11-01"}}' https://api.procore.com/rest/v1.0/projects/123456789/timesheets
```

Note that we specify the `Content-type` as `application/json` and include the oAuth 2.0 access token in the request header using `-H` flags.
In addition, we include the JSON payload for the new timesheet using the `-d` flag.
Running this call returns a JSON response similar to the following:

```
{
    "id": 12345,
    "created_at": "2018-11-01T18:20:24Z",
    "created_by": {
        "id": 1234567,
        "login": "jim.smith@example.com",
        "name": "Jimmy Smith"
    },
    "date": "2018-11-01",
    "name": "2018-11-01 - 01",
    "number": 1,
    "status": "pending",
    "timecard_entries": [],
    "updated_at": "2018-11-01T18:20:24Z"
}
```

### 2. Create a Timecard Entry in a Timesheet ###


Use the [Create Timecard Entry](https://developers.procore.com/reference/rest/v1/timecard-entries#create-timecard-entry) endpoint (POST /rest/v1.0/projects/{project_id}/timecard_entries) to create an entry (or entries) for each employee.
Include the `timesheet_id` for each Timecard Entry.
The value should match the id of the Timesheet you created in Step 1.
Here is the cURL example for this call.
Note that we are using the `time_in`, `time_out`, and `lunch_time` parameters as the means for defining duration of work performed.

```
curl -H "Content-type: application/json" -H "Authorization: Bearer <access token>" \
     -X POST -d '{"timecard_entry": {"lunch_time": "60", \
                  "time_in": "08:00", \
                  "time_out": "17:00", \
                  "billable": true, \
                  "date": "2018-11-01", \
                  "description": "Final cleanup", \
                  "timecard_time_type_id": 9185, \
                  "timesheet_id": 12345, \
                  "cost_code_id": 153428166}}' \
        https://api.procore.com/rest/v1.0/projects/123456/timecard_entries
```

Running this call returns a JSON response similar to the following:

```
{
    "id": 1234567,
    "approval_status": "pending",
    "billable": true,
    "cost_code": {
        "id": 153428166,
        "biller_id": 123456,
        "biller_type": "Project",
        "code": "740",
        "created_at": "2017-10-30T18:31:57Z",
        "deleted_at": null,
        "full_code": "06-200",
        "long_name": "06-200 - Finish Carpentry",
        "name": "Finish Carpentry",
        "parent_id": 153428034,
        "position": null,
        "sortable_code": "06-200",
        "standard_cost_code_id": 3523579,
        "updated_at": "2017-10-30T18:31:57Z"
    },
    "created_at": "2018-11-01T19:10:25Z",
    "created_by": {
        "id": 1234567,
        "login": "jim.smith@example.com",
        "name": "Jimmy Smith"
    },
    "crew": null,
    "date": "2018-11-01",
    "deleted_at": null,
    "description": "Completed workbench countertops in garage.",
    "hours": "8.0",
    "injured": null,
    "location": null,
    "login_information": null,
    "lunch_time": 60,
    "party": null,
    "permissions": {
        "can_update": true,
        "can_delete": true
    },
    "signature": null,
    "sub_job": null,
    "time_in": "2018-11-01T08:00:00Z",
    "time_out": "2018-11-01T17:00:00Z",
    "timecard_time_type": {
        "id": 9185,
        "abbreviated_time_type": "REG",
        "company_id": 1234,
        "global": null,
        "time_type": "Regular Time"
    },
    "timesheet": {
        "id": 12345,
        "created_at": "2018-11-01T18:20:24Z",
        "created_by": {
            "id": 1234567,
            "login": "jim.smith@example.com",
            "name": "Jimmy Smith"
        },
        "date": "2018-11-01",
        "name": "2018-11-01 - 01",
        "number": 1,
        "status": "pending",
        "updated_at": "2018-11-01T18:20:24Z"
    },
    "timesheet_status": "pending",
    "updated_at": "2018-11-01T19:10:25Z"
}
```

The Timecard Entry you created will now show up in the associated timesheet viewable in the Timesheets tool in Procore, or via the Timesheets Index endpoint.

### 3. Update a Timecard Entry

Use the [Update Timecard Entry](https://developers.procore.com/reference/rest/v1/timecard-entries#update-timecard-entry) endpoint (UPDATE /rest/v1.0/projects/{project_id}/timecard_entries/{id}) to update an existing Timecard Entry.
One possile scenario is updating the duration of work for an existing Timecard Entry.
Here is a cURL example illustrating this action:

```
curl -H "Content-type: application/json" -H "Authorization: Bearer <access token>" \
     -X PATCH -d '{"timecard_entry": {"lunch_time": "30", \
                   "time_in": "08:00", \
                   "time_out": "17:00", \
                   "description": "Correcting lunch time to 30 minutes"}}' \
        https://api.procore.com/rest/v1.0/projects/123456/timecard_entries/1234
```

Here we have adjusted the lunch time from 60 to 30 minutes and added a description for the change.
Running this call returns a JSON response similar to the following:

```
{
    "id": 12345678,
    "approval_status": "pending",
    "billable": true,
    "cost_code": {
        "id": 153428166,
        "biller_id": 123456,
        "biller_type": "Project",
        "code": "200",
        "created_at": "2017-10-30T18:31:57Z",
        "deleted_at": null,
        "full_code": "06-200",
        "long_name": "06-200 - Finish Carpentry",
        "name": "Finish Carpentry",
        "parent_id": 153428034,
        "position": null,
        "sortable_code": "06-200",
        "standard_cost_code_id": 3523579,
        "updated_at": "2017-10-30T18:31:57Z"
    },
    "created_at": "2018-11-01T19:10:25Z",
    "created_by": {
        "id": 1234567,
        "login": "jim.smith@example.com",
        "name": "Jimmy Smith"
    },
    "crew": null,
    "date": "2018-11-01",
    "deleted_at": null,
    "description": "Correcting lunch time to 30 minutes.",
    "hours": "8.5",
    "injured": null,
    "location": null,
    "login_information": null,
    "lunch_time": 30,
    "party": null,
    "permissions": {
        "can_update": true,
        "can_delete": true
    },
    "signature": null,
    "sub_job": null,
    "time_in": "2018-11-01T08:00:00Z",
    "time_out": "2018-11-01T17:00:00Z",
    "timecard_time_type": {
        "id": 9185,
        "abbreviated_time_type": "REG",
        "company_id": 1234,
        "global": null,
        "time_type": "Regular Time"
    },
    "timesheet": {
        "id": 12345,
        "created_at": "2018-11-01T18:20:24Z",
        "created_by": {
            "id": 1234567,
            "login": "jim.smith@example.com",
            "name": "Jimmy Smith"
        },
        "date": "2018-11-01",
        "name": "2018-11-01 - 01",
        "number": 1,
        "status": "pending",
        "updated_at": "2018-11-01T18:20:24Z"
    },
    "timesheet_status": "pending",
    "updated_at": "2018-11-01T19:44:40Z"
}
```

### 4. Update the Status of a Timesheet (Approve)

In the final step of this exercise we update the status of our Timesheet from `pending` to `approved` using the [Update Timesheet Status](https://developers.procore.com/reference/rest/v1/timesheets#update-timesheet-status) endpoint (PATCH /rest/v1.0/projects/{project_id}/timesheets/update_approval).
Here is a cURL example illustrating this action:

```
curl -H "Content-type: application/json" -H "Authorization: Bearer <access token>" \
     -X PATCH -d '{"timesheets": [{ \
                   "id": 12345, \
                   "status": "approved"}]}' \
        https://api.procore.com/rest/v1.0/projects/123456/update_approval
```

Running this call returns a JSON response similar to the following:

```
[
    {
        "id": 12345,
        "name": "2018-11-01 - 01",
        "date": "2018-11-01",
        "status": "approved",
        "created_at": "2018-11-01T18:20:24Z",
        "updated_at": "2018-11-01T21:16:45Z",
        "created_by": {
            "id": 1234567,
            "login": "jim.smith@example.com",
            "name": "Jimmy Smith"
        },
        "timecard_entries": [
            {
                "id": 12345678,
                "created_at": "2018-11-01T19:10:25Z",
                "date": "2018-11-01",
                "deleted_at": null,
                "description": "Correcting lunch time to 30 minutes.",
                "hours": "8.5",
                "updated_at": "2018-11-01T21:16:45Z",
                "time_in": "2018-11-01T08:00:00Z",
                "time_out": "2018-11-01T17:00:00Z",
                "injured": null,
                "lunch_time": 30,
                "billable": true,
                "party_id": null,
                "origin_id": null,
                "origin_data": null,
                "crew": {
                    "id": null,
                    "name": null
                },
                "timesheet_status": "approved",
                "timesheet": {
                    "id": 12345,
                    "name": "2018-11-01 - 01",
                    "date": "2018-11-01",
                    "status": "approved",
                    "created_at": "2018-11-01T18:20:24Z",
                    "updated_at": "2018-11-01T21:16:45Z",
                    "created_by": {
                        "id": 1234567,
                        "login": "jim.smith@example.com",
                        "name": "Jimmy Smith"
                    }
                },
                "cost_code": {
                    "id": 153428166,
                    "name": "Finish Carpentry",
                    "long_name": "06-200 - Finish Carpentry",
                    "full_code": "06-200",
                    "sortable_code": "06-200"
                },
                "created_by": {
                    "id": 1234567,
                    "login": "jim.smith@example.com",
                    "name": "Jimmy Smith"
                },
                "timecard_time_type": {
                    "id": 9185,
                    "abbreviated_time_type": "REG",
                    "company_id": 1234,
                    "global": null,
                    "time_type": "Regular Time"
                }
            }
        ]
    }
]
```

The Timesheet you updated will now show up as `approved` when viewed in the Timesheets tool in Procore, or via the [List All Timesheets](https://developers.procore.com/reference/rest/v1/timesheets#list-all-timesheets) endpoint (GET /rest/v1.0/projects/{project_id}/timesheets).
