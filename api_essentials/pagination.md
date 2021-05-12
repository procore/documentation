---
permalink: /pagination
title: USING PAGINATION
layout: default
section_title: API Essentials

---

## Introduction

The majority of Procore API endpoints support pagination as a means of maximizing performance and responsiveness when dealing with large data sets.
By implementing pagination in your application, you can minimize response times for requests and generally improve the end-user experience.

## The per_page and page Parameters

The Procore API supports pagination through the use of the per_page and page parameters.
Use the `per_page` parameter to specify how many items you want each page to return. Use the page parameter to specify how link headers are created.

> MAXIMUM NUMBER OF ITEMS PER PAGE
>
> The highest value you can specify for the per_page parameter on paginated endpoints is 10,000.

Below is an example of using the `per_page` and page parameters in a typical API call.

```
curl -i -H "Authorization: Bearer <your_authorization_code>" https://api.procore.com/rest/v1.0/punch_items?project_id=14406&per_page=5&page=3
```

Inspecting the headers shows some helpful information you could use in your application:

```
HTTP/1.1 200 OK
Cache-Control: no-store, must-revalidate, private, max-age=0
Connection: close
Content-Type: application/json; charset=utf-8
Link: <https://api.procore.com/rest/v1.0/punch_items?page=1&per_page=5>; rel="first",
    <https://api.procore.com/rest/v1.0/punch_items?page=2&per_page=5>; rel="prev",
    <https://api.procore.com/rest/v1.0/punch_items?page=30&per_page=5>; rel="last",
    <https://api.procore.com/rest/v1.0/punch_items?page=4&per_page=5>; rel="next",
Per-Page: 5
Server: thin 1.5.1 codename Straight Razor
Set-Cookie: __profilin=p%3Dt; path=/
Set-Cookie: __profilin=p%3Dt; path=/
Set-Cookie: __profilin=p%3Dt; path=/
Total: 150
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-MiniProfiler-Ids: ["9d6t1gn1wr0jemmyn7d7","qdduv0ryqh2gtvrciuey","p9tuluby0fe8zmoez1vs",
  "o62b31dbk6yv35vhk72t","4qteypclwjxlynp6kn3g","8qc93elmb9bfrklzywgb","21efri84vp8ttmppu50d",
  "jzumjv8bei8tvcxse18j","k3k0m745colb4yv2auv1","qgdqq4gx52xjqnoz3mjr"]
X-Request-Id: aa5324bf-1b9a-4a8b-8ac7-7229d5d8d325
X-Runtime: 0.568945
X-XSS-Protection: 1; mode=block
```

Examining the output above we see:

- `Total: 150` - indicates total number of items to be retrieved.
- `Per-Page: 5` - indicates the number of items per page that will be retrieved.
- Link headers for the first, prev, last, and next link.
    - `Link: <https://api.procore.com/rest/v1.0/punch_items?page=1 per_page=5>;rel="first"`,
    - `Link: <https://api.procore.com/rest/v1.0/punch_items?page=2 per_page=5>;rel="prev"`,
    - `Link: <https://api.procore.com/rest/v1.0/punch_items?page=30 per_page=5>;rel="last"`,
    - `Link: <https://api.procore.com/rest/v1.0/punch_items?page=4 per_page=5>;rel="next`"

Notes on page parameter:

If `page` is set to 1, then the header will only include the next and last link.

If `page` is set to 2, then the header will only include the first, next, and last link.

If `page` is set to 3 (as in the example), then the header will include the first, prev, next, and last link.

> ENDPOINTS THAT CURRENTLY DO NOT SUPPORT PAGINATION
>
> There are a number of Procore API endpoints that currently do not support pagination:
> - [List Timecard Time Types](https://developers.procore.com/reference/rest/v1/timecards#list-timecard-time-types)
> - [List Checklists](https://developers.procore.com/reference/rest/v1/checklists#list-checklists)
> - [List Company Files and Folders](https://developers.procore.com/reference/rest/v1/company-folders-and-files#list-company-folders-and-files)
> - [List Project Files and Folders](https://developers.procore.com/reference/rest/v1/project-folders-and-files#list-project-folders-and-files)
> - [List Most Recent Images](https://developers.procore.com/reference/rest/v1/images#list-most-recent-images)
