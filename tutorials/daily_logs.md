---
permalink: /daily-logs
title: WORKING WITH DAILY LOGS
layout: default
section_title: Guides and Tutorials

---

Procore's Project level Daily Log tool is designed to provide project team members with a central location for viewing, tracking, and emailing updates about daily project activities.
This guide provides some helpful hints for working with the Daily Log API endpoints.
For additional information on Procore's Daily Log feature, see the [Daily Log](https://support.procore.com/products/online/user-guide/project-level/daily-log) articles on the [Procore Support](https://support.procore.com) site.

## Filtering Logs by Date and Date Ranges

Daily log information retrieved by List action endpoints can be filtered by date (or date ranges) using the following guidelines.

- **Filtering by a Specific Date** - If you want to find logs for a specific date you must use the log_date query parameter with a date format of `YYYY-MM-DD`.  For example, `?log_date=2016-08-09`.
- **Filtering by Date Range** - If you want to find logs within a date range use the start_date and end_date query parameters with the date format of `YYYY-MM-DD`.  For example, `?start_date=2016-08-01&end_date=2016-08-09`.

**Note**: If none of the date parameters are provided in the call, only logs from the current (today's) date are returned.

## Working with Locations in Daily Logs

A number of daily log endpoints support both single locations as well as multi-tier locations.
For information on multi-tier locations in Procore, see this helpful [Support FAQ](https://support.procore.com/faq/how-do-i-add-a-multi-tiered-location-to-an-item).
Here we use `quantity_log` as an example, but you can replace it with the name of the log you want to work with.
Currently, locations are supported in the Manpower log, Equipment log, Quantity log, Notes log, and Inspection log.

- **Existing Location** - If want to reference a single existing location and you have the ID of that location use `quantity_log[location_id]`.
- **New Location** - If you are creating a new location use `quantity_log[mt_location]`. The `[mt_location]` parameter can be used to create both single-tier and multi-tier locations.

### Example JSON Requests

#### Existing Location

```
  "quantity_log": {
    "description": "Quantity",
    "location_id": 35426
  }
```

#### Single-Tier Location

```
  "quantity_log": {
    "description": "Quantity",
    "mt_location": "Building 1"
  }
```

#### Multi-Tier Location

```
  "quantity_log": {
    "description": "Quantity",
    "mt_location": ["Building 1", "Apartment 404"]
  }
```

### Example JSON Responses

#### Existing Location

```
  "quantity_log":
    [
      "location": {
        "id": 35426,
        "name": "Space 1"
      }
    ]
```

#### Existing Location

```
  "quantity_log":
    [
      "location": {
        "name": "Building 1",
        "id": 1
      }
    ]
```

#### Multi-tier Location

```
  "quantity_log":
    [
      "location": {
        "name": "Building 1>Apartment 404",
        "id": 2
      }
    ]
```

## Working With Attachments

Some logs have attachment capabilities through the API with the following limitations.

- The following Daily Logs do **not** support attachments on the web:
    - Call Log
    - Daily Construction Report Log
    - Dumpster Log
    - Plan Revision Log
    - Productivity Log
    - Quantity Log
    - Scheduled Work Log
    - Timecard Entry
    - Visitor Log
    - Waste Log
- Attachments are viewable on the web only for certain logs.

See the individual Daily Log endpoint documentation pages for additional details.
