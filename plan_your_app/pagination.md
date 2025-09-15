---
permalink: /pagination
title: Using Pagination
sub_header: Use per_page and page to control results and performance.
layout: default
section_title: Plan Your App

---

## Overview

Most Procore REST endpoints support pagination to keep responses fast and predictable when working with large result sets. Use pagination to request a subset of results and follow the links Procore returns to get the next page.
<br><br>

***
## per_page and page parameters

Use two query parameters to paginate results:

- `per_page` — how many items to return per page.
- `page` — which page to return (1-based).

Choose a `per_page` value that balances performance and payload size. We recommend keeping `per_page` at or below **2,000**.

**Example request**

```bash
curl -i -H "Authorization: Bearer <ACCESS_TOKEN>" \
  "https://api.procore.com/rest/v1.0/punch_items?project_id=14406&per_page=5&page=3"
```
<div class="plan_your_app/rate_limiting"></div>

***
## Use Link headers to navigate

Procore includes pagination metadata in response headers:

- `Link` — URLs for the `first`, `prev`, `next`, and `last` pages.
- `Total` — the total number of items available.
- `Per-Page` — the number of items returned per page.

**Example response headers**

```
HTTP/1.1 200 OK
Cache-Control: no-store, must-revalidate, private, max-age=0
Connection: close
Content-Type: application/json; charset=utf-8
Link: <https://api.procore.com/rest/v1.0/punch_items?page=1&per_page=5>; rel="first",
      <https://api.procore.com/rest/v1.0/punch_items?page=2&per_page=5>; rel="prev",
      <https://api.procore.com/rest/v1.0/punch_items?page=30&per_page=5>; rel="last",
      <https://api.procore.com/rest/v1.0/punch_items?page=4&per_page=5>; rel="next"
Per-Page: 5
Total: 150
```

From this response you can see that there are **150** total items, **5** items per page, and URLs you can follow for the first, previous, next, and last pages.
<br><br>

***
## Notes on the `page` parameter

- If `page=1`, the `Link` header includes `next` and `last`.
- If `page=2`, the `Link` header includes `first`, `next`, and `last`.
- If `page=3` (as in the example), the `Link` header includes `first`, `prev`, `next`, and `last`.
- On the last page, `next` is omitted.

> **Note**
> It’s important to know that not all endpoints support pagination. Check the endpoint’s API reference to confirm support and any per‑page limits.