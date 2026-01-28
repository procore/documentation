---
permalink: /rate-limiting
title: Rate Limiting
sub_header: Understanding and Managing Procore API Rate Limits
layout: default
section_title: Plan Your App

---
## Overview

Procore’s API uses long-term (hourly) and short-term (spike) rate limits to help keep the platform reliable. With every API call, Procore returns rate limit response headers so you can understand which limit is being reported, how many requests remain, and when that limit resets. Depending on your request pattern, the headers may reflect either an hourly limit or a shorter-term spike limit.
<br><br>

***
## Interpret Rate Limit Headers

There are three important response headers returned when making a request to the Procore API. These values reflect your current limits. They can change at any time, so your application should always read and adapt to them.

| Header                 | Explanation                                                                     |
| ---------------------- | --------------------------------------------------------------------------------|
| X-Rate-Limit-Limit     | The total number of requests allowed for the limit currently being reported (hourly or spike).           |
| X-Rate-Limit-Remaining | How many requests are remaining for the limit currently being reported. For short-term windows, this value may increase again after a brief pause as the window rolls forward.                 |
| X-Rate-Limit-Reset     | The Unix timestamp (in seconds) when the currently reported limit resets. For spike limits, this may be only a few seconds in the future.                     |

**Important:** The `X-Rate-Limit-*` headers reflect the limit your app is **closest to exhausting** based on your current traffic pattern. If you send many requests in a short time, the headers may reflect a spike limit. If you make requests more evenly over time, the headers may reflect the hourly limit.

### How to Interpret the Headers

The `X-Rate-Limit-*` headers are designed to help your app back off before you hit a limit.

- If `X-Rate-Limit-Limit` is a smaller number than you expect, your app is likely nearing a **spike limit**.
- If `X-Rate-Limit-Remaining` appears to "jump" back up after a short pause, that’s expected for **short-term windows**. As time passes, earlier requests fall out of the spike window and capacity becomes available again.
- If `X-Rate-Limit-Reset` is only a few seconds ahead of the current time, the headers are likely reporting a **spike window reset**, not the hourly window.

**Best practice:** Always treat the headers as the source of truth and throttle based on the current response, not a single assumed limit (such as `3600/hour`).

**Example:**

Here are two examples. Your actual values may vary depending on which limit you are closest to exhausting.

**Hourly example (even traffic):**

```
X-Rate-Limit-Limit: 3600
X-Rate-Limit-Remaining: 3599
X-Rate-Limit-Reset: 1466182244
```

**Spike example (bursty traffic):**

```
X-Rate-Limit-Limit: 100
X-Rate-Limit-Remaining: 67
X-Rate-Limit-Reset: 1466182247
```
<div class="details-bottom-spacing"></div>


***
## When Requests Are Throttled
To ensure platform stability, Procore may throttle API traffic in the following ways. When you are throttled, inspect the HTTP response code and headers to determine the correct course of action.

### Hourly and Spike Limits (`429 Too Many Requests`)
You will receive a `429 Too Many Requests` status code if you exceed either your **hourly request limit** or a shorter-term **spike limit** designed to prevent sudden bursts of traffic.

While the response body for both may be similar, a `429` can be triggered by either limit type (hourly or spike).

**What to do when you get a 429**

- Read `X-Rate-Limit-Reset` and pause requests until after that time.
- If the headers are reporting a spike limit, the reset may be only a few seconds in the future.
- If the headers are reporting an hourly limit, the reset will typically be farther out.
- Retry with backoff (and jitter, if possible) to avoid immediate re-throttling.
- Spread requests out (avoid back-to-back bursts) and queue work where possible.
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

- Always check the `X-Rate-Limit-*` headers and adjust dynamically.
- Avoid bursts of back-to-back requests. When possible, spread requests out (for example, add small delays and use queues) to stay under spike limits.
- Use index actions to fetch collections in one request instead of requesting individual objects.
- Cache results whenever possible, especially for public or repeated data.
- Review your app’s <a href="{{ site.url }}{{ site.baseurl }}{% link announcements/app_performance_metrics.md %}" target="_blank">API usage report</a> to understand and optimize request patterns.
<br><br>