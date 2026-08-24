---
permalink: /restful-api-concepts
title: API Request and Response Format
sub_header: How Procore API requests and responses are structured — transport, supported methods, JSON payloads, and user IDs.
layout: default
section_title: Reference

---

## Overview

This page covers the conventions that apply to every Procore API call regardless of which resource you are working with: how requests must be transported, which HTTP methods are supported, how request and response payloads are shaped, and how user IDs are scoped.

For status codes and error responses, see [Error Code Reference]({{ site.url }}{{ site.baseurl }}{% link api_essentials/error_reference.md %}).
For versioning and URL structure, see [REST API Overview]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_overview.md %}).

> **HTTPS protocol requirement.** Because all Procore API resources are protected by Secure Sockets Layer (SSL) encryption, any call you make to a Procore API resource must use the `HTTPS` scheme in the URL.
> SSL establishes an encrypted link between the Procore resource server and your application.
> This link ensures that all data passed between the resource server and your application remains private.
{: .callout .callout--warning}

## Supported HTTP Methods

The Procore API supports the following HTTP verbs as resource methods.

| HTTP Verb | CRUD    | Description                                                                                                                                                                                                             |
| ----------| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET       | Read    | Retrieve information about existing resources. For example, you can use a GET call to retrieve information about all objects or just a singular object.                                                                 |
| POST      | Create  | Create new resources or execute custom actions. For example, you would use a POST call to create a new RFI.                                                                                                             |
| PATCH     | Update  | Partial update of existing resources. For example, if you wanted to change the status of an RFI, you would perform a PATCH call where you could update just the status of the RFI or change other supported parameters. |
| DELETE    | Delete  | Delete resources. Use the DELETE call to remove an existing resource.       |

> **Procore uses PATCH, not PUT, for updates.** Updates are partial — send only the attributes you intend to change. `PUT` is not supported.
{: .callout .callout--note}

## Request and Response Basics

### Requests

By default, all API requests expect input in application/json format where each request is allowed to contain parameters and other discretionary data types.
All JSON requests must specify the object types that the payload is carrying.
The format type, query parameters, and any other required fields are contained within the sample **body** request for each object as depicted in the following example.

```
{
  "company_id": 5,
  "project": {
    "name": "Project A",
    "description": "A description of the project",
    "address": "500 Construction Way",
    "city": "Carpinteria",
    "zip": "93013",
    "department_ids": [1,2],
    "project_number": "A-1",
    "estimated_start_date": "2015-05-15",
    "estimated_completion_date": "2015-05-31"
  }
}
```

### Responses

All API call responses return the requested information in JSON format.
Responses in XML format are currently not supported.
The following example shows the response from the request shown above.

```
{
    "id": 185407,
    "logo_url": "https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_105341655.png?AWSAccessKeyId=xxxxxxxxxxxxxxxxxx",
    "name": "Project F",
    "display_name": "A-2 - Project F",
    "project_number": "A-2",
    "address": "500 Construction Way",
    "city": "Carpinteria",
    "state_code": "CA",
    "country_code": "US",
    "zip": "93013",
    "latitude": null,
    "longitude": null,
    "description": "A description of the project",
    "square_feet": 5000,
    "estimated_start_date": "2015-05-15",
    "estimated_completion_date": "2015-05-31",
    "active": true,
    "flag": "Yellow",
    "phone": "310-555-5555",
    "public_notes": "Notes",
    "actual_start_date": "2015-05-15",
    "projected_finish_date": "2015-05-31",
    "created_at": "2016-04-14T17:55:40Z",
    "updated_at": "2016-04-14T17:55:41Z",
    "office": {
        "id": 3610,
        "name": "Carpinteria"
    },
    "project_stage": {
        "id": 1,
        "name": "Bidding"
    },
    "project_type": {
        "id": 5,
        "name": "Commercial"
    },
    "program": {
        "id": 5,
        "name": "Program NW"
    },
    "departments": [
        {
            "id": 3127,
            "name": "Accounting"
        },
        {
            "id": 3128,
            "name": "Administrative"
        }
    ]
}
```

### Attribute Ordering

Do not rely on the order of attributes in a JSON response.
In general, an object has an unordered set of name/value pairs.
You may sometimes see ordered lists, either lexically or otherwise, but this is not something to expect or depend on for any Procore API endpoint, new or existing.

## Globally Unique User IDs

When a new user is added to Procore, the integer ID assigned to that user has global scope and is unique across all company accounts and projects.
A user can be a member of multiple Procore company accounts by virtue of their unique email address.
As you add that user to project-level directories within a company, the `user_id` value remains the same across those projects — it is inherited from the company-level directory.

## See Also

- [Error Code Reference]({{ site.url }}{{ site.baseurl }}{% link api_essentials/error_reference.md %})
- [REST API Overview]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_overview.md %})
- [Pagination]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/pagination.md %})
- [Filtering & Sorting]({{ site.url }}{{ site.baseurl }}{% link tutorials/filtering_on_list_actions.md %})
- [Dates, Times, and Country Codes]({{ site.url }}{{ site.baseurl }}{% link best_practices/date_time.md %})
