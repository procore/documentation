---
permalink: /date-time
title: Working with Dates and Times
layout: default
section_title: Best Practices

---

## Background

Timestamps returned by the Procore API are a combined date/time representation following the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format in [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time). The format for a typical Procore API timestamp is:

```
YYYY-MM-DDTHH:MM:SSZ
```

The various symbol elements of the ISO 8601 timestamp format are described in the following table.

| Symbol | Description |
| ------ | ------------------------------------------------------------ |
| YYYY   | four-digit year identifier (e.g., 2018)                      |
| MM     | two-digit month indentifier (e.g., 10)                       |
| DD     | two-digit date identifier (e.g., 25)                         |
| T      | delimeter between the date and time portion of the timestamp |
| HH:    | two-digit hour identifier (e.g., 16)                         |
| MM:    | two-digit minute identifier (e.g., 47)                       |
| SS     | two-digit seconds identifier (e.g., 35)                      |
| Z      | specifies the timestamp is in UTC (zulu) time                |

**Example**: 2018-10-25T16:47:35Z represents October 25th, 2018 at 16:47:35 UTC

## Date/Time Usage with the Procore API

There are numerous Procore API endpoints that set or return date/time information. Here are some guidelines to assist you when working with date/time information and the Procore API.

### Handling Timestamps Returned with GET Requests

Generally speaking, timestamps returned from Procore API GET requests are strings that represent the entire combined date/time in ISO 8601 format. Let's examine the JSON response from the Show Task Item endpoint.

```
{
  "id": 12877,
  "assignee": {
      "id": 1234567,
      "login": "joearchitect@proarchs.com",
      "name": "Joe Architect"
  },
  "created_at": "2018-06-27T17:57:13Z",
  "created_by": {
      "id": 2468101,
      "login": "jdeveloper@prodevs.com",
      "name": "James Developer"
  },
  "description": "We need to verify that that the final design complies with all applicable local zoning ordinances.",
  "due_date": "2018-08-17T00:00:00Z",
  "number": "1",
  "private": true,
  "status": "initiated",
  "task_item_category": {
      "id": 66043,
      "name": "Design"
  },
  "title": "Verify zoning compliance",
  "updated_at": "2018-06-27T17:57:13Z"
}
```

In the example above, note that all date/time fields returned in the JSON response are represented in their full ISO 8601 format. However, a common use case is the need to render a date/time string in a user interface as a simple, more human-consumable calendar date. Most languages/frameworks provide methods for handling and parsing ISO 8601 formatted data. You should refer to the documentation for your specific language/framework for details on how to work with ISO 8601 data. Here is a [downloadable JavaScript example]({{ site.baseurl }}/assets/static/datetime-get-sample-code.html) that helps illustrate how the rendering of date/time values might be handled in a single-page JavaScript application.

### Filtering GET Requests Using Date Ranges

Now let's take a look at filtering a response based on a date range. Here we use the `created_at` parameter with the List Purchase Order Contracts action to return a list of purchase orders that were created on September 23, 2016 between 16:30 and 17:00 UTC.

```
GET https://sandbox.procore.com/rest/v1.0/purchase_order_contracts/?project_id=
    225096&filters[created_at]=\"2016-09-23T16:30:00Z...2016-09-23T17:00:00Z\"
```

It is important to note that the date-time string used with the `created_at` and `updated_at` parameters must adhere to ISO8601 standards. In addition, these parameters must be formatted as a range using the ... delimiter. See our [Filtering and Sorting Guide]({{ site.url }}{{ site.baseurl }}{% link tutorials/filtering_on_list_actions.md %}) for additional tips on working with responses from Procore API GET requests.

### Setting Dates/Times with POST and PATCH Requests

If you are creating or updating an instance of a resource that includes date/time attributes, the attribute values you submit with your request body must comply to the ISO 8601 standard. It is important to note that even if you only want to include a basic calendar date in the body of a POST request (e.g., '08-26-2018'), you still need to send that date information in the full ISO 8601-compliant format. For example, if you are sending a `due_date` field value it must contain the time component as well the date component of the ISO 8601 string.

```
{
  "task_item":{
    "title":"Review parking plan for parcel A",
    "number":"100-b",
    "description":"Perform full design review for parking plan for parcel A",
    "due_date":"2018-08-26T00:00:00Z",
    "status":"initiated",
    "private":false,
    "assigned_id":1477666
  }
}
```

In the example above we are sending `2018-06-26T00:00:00Z` for the `due_date` attribute value with the time component simply being `T00:00:00Z`. Note that if you do not send a properly formatted value the POST request will not fail, but it will be stored as a `null` value in the database. Here is a [downloadable JavaScript example]({{ site.baseurl }}/assets/static/datetime-post-sample-code.html) that helps illustrate how to properly include date/time data in the request body in the context of a single-page JavaScript application.