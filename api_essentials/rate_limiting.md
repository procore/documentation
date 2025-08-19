---
permalink: /rate-limiting
title: Rate Limiting
sub_header: Understanding and Managing Procore API Rate Limits
layout: default
section_title: API Essentials

---
## Introduction
Procore’s API has rate limits to ensure reliability. By controlling the number of API requests a single authentication token can make, we protect system performance and prevent misuse.
<br><br>

***
## Procore Rate Limits

Procore’s API enforces multiple, simultaneous rate limits. The default limit is long-term (hourly), but additional short-term limits (such as burst or spike thresholds) may also apply. Because the specific limits can vary, your application should always check the response headers to determine the current quota and when it resets.

There are three important response headers returned when making a request to the Procore API.

| Header                 | Explanation                                                                     |
| ---------------------- | --------------------------------------------------------------------------------|
| X-Rate-Limit-Limit     | The total number of requests allowed in the current 60‑minute window.           |
| X-Rate-Limit-Remaining | The number of requests you can still make in the current window.                 |
| X-Rate-Limit-Reset     | The Unix timestamp (in seconds) when the next window begins.                     |

These values reflect your current limits. They can change at any time, so your application should always read and adapt to them.

**Example:**

Here’s a sample response. Your actual values may vary depending on which limits are active.

```
X-Rate-Limit-Limit: 3600
X-Rate-Limit-Remaining: 3599
X-Rate-Limit-Reset: 1466182244
```

If you exceed a rate limit, you’ll receive a 429 status code. The headers will still be present, and the response body will include a message like this:

```
You have surpassed the max number of requests for an hour. Please wait until your limit resets.
```
<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***
## Tips For Working Within the Rate Limit

Follow these practices to reduce the chance of hitting rate limits and to build resilient applications.

- Always check the `X-Rate-Limit-*` headers and adjust dynamically.
- Use index actions to fetch collections in one request instead of requesting individual objects.
- Cache results whenever possible, especially for public or repeated data.
- Log API usage to understand and optimize request patterns.
- When using a DMSA, include either the `Procore-Company-Id` header or `:company_id` parameter so each company DMSA gets its own limit (3,600 requests per hour).
<br><br>

***
## Handling 429 Errors

If your application exceeds an active rate limit, Procore will return HTTP 429 with the headers and the following message: "You have surpassed the max number of requests for an hour. Please wait until your limit resets."

Use the `X-Rate-Limit-Reset` timestamp to pause requests until the window resets. Otherwise, catch the error and fail gracefully.

For webhook-driven integrations, enqueue events in a database and process them once your rate limit refreshes.

Do not continue sending requests while over the limit—this may halt your application.
