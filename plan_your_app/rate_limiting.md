---
permalink: /rate-limiting
title: Rate Limiting
sub_header: Understanding and Managing Procore API Rate Limits
layout: default
section_title: Plan Your App

---
## Overview

Procore’s API uses two rate limits to help keep the platform reliable: an hourly limit (60-minute window) and a spike limit (10-second window). With every API call, Procore returns rate limit headers so you can understand the limit being reported, how many requests remain, and when that limit resets.

The headers returned may reflect either the spike limit or the hourly limit. The values returned reflect the limit your app is most likely to exceed first. In most cases, the spike limit is reported until you are very close to exhausting the hourly limit.
<br><br>

***
## Interpret Rate Limit Headers

There are three important rate limit headers returned when making a request to the Procore API. These values reflect your current limits. They can change at any time, so your application should always read and adapt to them.

| Header                 | Explanation                                                                     |
| ---------------------- | --------------------------------------------------------------------------------|
| X-Rate-Limit-Limit     | The total number of requests allowed for the limit currently being reported (hourly or spike).           |
| X-Rate-Limit-Remaining | How many requests are remaining for the limit currently being reported. For short-term windows, this value may increase again after a brief pause as the window rolls forward.                 |
| X-Rate-Limit-Reset     | The Unix timestamp (in seconds) when the currently reported window resets.                     |

**Important:** The `X-Rate-Limit-*` headers reflect the limit your app is most likely to exceed first (hourly limit or spike limit). Use the headers returned on each response as the source of truth for throttling logic.

### How to use the headers

Use the rate limit headers to pace requests without needing separate logic for the hourly limit vs the spike limit.

- Read `X-Rate-Limit-Remaining` on every response.
- When `X-Rate-Limit-Remaining` reaches `0`, pause requests until after `X-Rate-Limit-Reset`, then resume processing.
- If your app makes concurrent requests (for example, multi-threaded or trigger-based), enqueue work and control throughput by tuning concurrency (such as adjusting thread pool size).

**Best practice:** Treat the headers as the source of truth and throttle based on the current response, not a single assumed limit (such as `3600/hour`).

**Example: hourly limit headers**

```
X-Rate-Limit-Limit: 3600
X-Rate-Limit-Remaining: 3599
X-Rate-Limit-Reset: 1466182244
```

**Example: spike limit headers**

```
X-Rate-Limit-Limit: 100
X-Rate-Limit-Remaining: 99
X-Rate-Limit-Reset: 1466182247
```
<div class="details-bottom-spacing"></div>


***
## When Requests Are Throttled
To ensure platform stability, Procore may throttle API traffic in the following ways. When you are throttled, inspect the HTTP response code and headers to determine the correct course of action.

### Hourly and Spike Limits (`429 Too Many Requests`)
You will receive a `429 Too Many Requests` status code if you exceed either the **hourly limit** or the **spike limit**.

While the response body for both may be similar, a `429` can be triggered by either limit type (hourly or spike).

**What to do when you get a 429**

- Read `X-Rate-Limit-Reset` and pause requests until after that time before retrying.
- Retry with backoff (and jitter, if possible) to avoid immediate re-throttling.
- If you generate requests concurrently (for example, with multiple threads or trigger-based workflows), enqueue work and control throughput by tuning concurrency (such as adjusting thread pool size).
- For webhook-driven integrations, enqueue events in a database and process them once your rate limit refreshes.
- Log `429` responses so you can monitor patterns and tune your request pacing.

**What not to do**

- Don’t keep sending requests while over the limit.
- Don’t assume a single fixed window (for example, only `3600/hour`). Always use the current response headers as the source of truth.

### Heavy Load Throttling (`503 Service Unavailable`)
In rare instances when the Procore platform is experiencing exceptionally heavy load, we may temporarily throttle traffic to maintain overall system health. In these situations, you will receive a `503 Service Unavailable` response.

This response indicates that while your request is valid, the service is currently unable to process it. To handle this, inspect the **`Retry-After`** header, which will specify the number of seconds you should wait before retrying the request.
<br><br>

***
## Tips for Working Within the Rate Limit

Follow these practices to reduce the chance of hitting rate limits and to build resilient applications.

- Always check the `X-Rate-Limit-*` rate limit headers and adjust dynamically.
- If your app makes concurrent requests (for example, multi-threaded or trigger-based), enqueue work and control throughput by tuning concurrency (such as adjusting thread pool size).
- Use index actions to fetch collections in one request instead of requesting individual objects.
- Cache results whenever possible, especially for public or repeated data.
- Review your app’s <a href="{{ site.url }}{{ site.baseurl }}{% link announcements/app_performance_metrics.md %}" target="_blank">API usage report</a> to understand and optimize request patterns.
<br><br>