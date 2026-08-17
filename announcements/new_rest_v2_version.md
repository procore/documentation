---
permalink: /new-rest-v2-version
title: New Rest V2 API Version
layout: default
section_title: Announcements
---

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/documentation/rest-api-overview" />
  </head>
  <body>
    <p>If you are not redirected, <a href="/documentation/rest-api-overview">click here</a>.</p>
  </body>
</html>

<!-- Retired 2026-08-17. Merged into REST API Overview (/rest-api-overview) as the "REST v2" section.
     Rationale: the content was evergreen concept material (path format, data envelope, string IDs,
     pagination, error format) sitting in Announcements, where readers expect dated news. It also left
     REST API Overview documenting only the v1 URL scheme, which was misleading about v2's
     company/project-scoped paths. Trimmed on merge: the pagination detail now links to /pagination and
     the error-format note links to /error-reference rather than restating either.
     Original content preserved below for reference.

## What is Procore’s Rest V2 API

Procore’s Rest V2 API is a new major version of Procore Rest API, introducing significant updates in the areas of consistency and performance.

## What are the major changes in Rest V2 API?

We have introduced a number of changes for the Rest V2 APIs, and the following represent the key changes in Rest V2 APIs:

* **URL Path Format:** URL paths for the new Rest V2 API start with `/rest/v2.x/...`, ensuring clear differentiation from previous versions.

* **Paths Scoped to Company and Project:** For Rest V2 APIs, you will notice most of the API paths are scoped to company and/or project.

* **Data Envelope:** Rest V2 API’s successful (200 level) JSON response has a top-level “data” key housing the payload of the response.

* **IDs Formatted as Strings:** Rest V2 APIs generate responses with ID attributes formatted as strings.

* **Pagination:** In Rest V2 APIs, pagination is used for collection endpoints (i.e., APIs that return an array as a main payload).
The default page size is 10, and the maximum page size is 100.

* **Standard Error Response Format:** For Rest V2 APIs, a 400 level unsuccessful JSON response (error JSON response) follow a standardized response format.

## API Paths

As indicated above, most of the URL paths for Rest V2 API are scoped to company and/or project.

* The URL path for company-level resource(s) follow the format: `/rest/v2.x/companies/{company_id}/resource(s)`.
* The URL path for project-level resource(s) follow the format: `/rest/v2.x/companies/{company_id}/projects/{project_id}/resource(s)`.

## API Response Body

For Procore's Rest V2 APIs, there are two noticeable changes in the JSON response body: **data envelope** and **ids formatted as strings**.

For **data envelope**, meaning the JSON object has a top level "data" key that contains the main payload of the API response.
For **ids formatted as strings**, meaning the ids attributes are strings.

```
# JSON Response Example

{
  "data": {
    "id": "160586",
    "login": "carl.contractor@example.com",
    "name": "Carl Contractor"
  }
}
```

## Pagination

For Rest V2 APIs, paginations are used for collection endpoints (meaning API endpoint that returns an array of items as its main payload under the "data" envelope).
And mostly, the default page size should be 10, and the max page size should be 100.

```
# Example

GET /rest/v2.0/companies/{company_id}/items

{
  "data": [
    { item },
    { item },
    ...
  ]
}

# And the associated pagination information is provided with these response headers `Per-Page`, `Total`, and `Link`.
```
-->
