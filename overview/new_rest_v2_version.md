---
permalink: /new-rest-v2-version
title: New Rest V2 API Version
layout: default
section_title: Overview
---

## What is Procore’s Rest V2 API

Procore’s Rest V2 API is a new major version of Procore Rest API, introducing significant updates in the areas of consistency and performance.

## What are the major changes in Rest V2 API?

We have introduced a number of rules for the Rest V2 APIs.
Among these Rest V2 API rules, the following represent the key changes in Rest V2 APIs:

* **URL Path Format:** URL paths for the new Rest V2 API start with `/rest/v2.x/...`, ensuring clear differentiation from previous versions.

* **Paths Scoped to Company and Project:** For Rest V2 APIs, we are now mandating the URL paths be scoped to company or project.

* **Data Envelope:** Rest V2 API’s successful (200 level) JSON response has a top-level “data” key housing the payload of the response.

* **IDs Formatted as Strings:** Rest V2 APIs generate responses with ID attributes formatted as strings.

* **Pagination:** In Rest V2 APIs, pagination is used for collection endpoints (i.e., APIs that return an array as a main payload).
The default page size is 10, and the maximum page size is 100.

* **Standard Error Response Format:** For Rest V2 APIs, a 400 level unsuccessful JSON response (error JSON response) follow a standardized response format.

## API Routing Examples

As indicated above, the URL paths for Rest V2 API endpoints must be scoped to company and/or project.
* The URL path for company-level resource(s) follow the format: `/rest/v2.x/companies/{company_id}/resource(s)`.
* The URL path for project-level resource(s) follow the format: `/rest/v2.x/companies/{company_id}/projects/{project_id}/resource(s)`.

**Example 1:**

Using the List Company Vendors API as an example:

* Current Rest V1: `GET /rest/v1.0/vendors` 
* New Rest V2: `GET /rest/v2.0/companies/{company_id}/vendors`

**Example 2:**

Using the List Project Vendors API as an example:

* Current Rest V1: `GET /rest/v1.0/projects/{project_id}/vendors`
* New Rest V2: `GET /rest/v2.0/companies/{company_id}/projects/{project_id}/vendors`
