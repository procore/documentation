---
permalink: /rate-limiting
title: RATE LIMITING
layout: default
section_title: API Essentials

---

Usage of Procore's API is subject to rate limits.
By limiting the number of API requests that can be issued from a unique authentication token, we are able to offer a more reliable service by protecting our own system infrastructure from being negatively affected by abusive users or applications that are not operating in accordance with our terms and conditions.

## Procore Rate Limits

Procore API rate limits to 3,600 requests per hour.
The rate limit resets every hour.
There are three important response headers returned when making a request to the Procore API.

| Header                 | Explanation                                                                     |
| ---------------------- | --------------------------------------------------------------------------------|
| X-Rate-Limit-Limit     | The total number of requests per 60 minute window.                              |
| X-Rate-Limit-Remaining | The number of requests you are allowed to make in the current 60 minute window. |
| X-Rate-Limit-Reset     | The Unix timestamp for when the next window begins.                             |

**Example:**

```
X-Rate-Limit-Limit: 3600
X-Rate-Limit-Remaining: 3599
X-Rate-Limit-Reset: 1466182244
```

When you exceed the rate limit, the client will receive a 429 status code. The rate limit headers will still be present. The response body will contain the following message.

```
You have surpassed the max number of requests for an hour. Please wait until your limit resets.
```

## Tips For Working Within the Rate Limit

The following tips will help you to code defensively and reduce the possibility of exceeding the rate limit.
Some application features that you may want to provide are simply impossible in light of rate limiting, especially around the most current data available.

- If you do not need all of the fields in the show response, fetch the entire collection of objects through the index action in one API event.
- Cache results whenever possible. This is especially true when you are displaying data to the public (i.e. everyone sees the same output).
- Use logging to see how many requests you are making.
- If you are using a DMSA to make API requests, ensure that your calls include either the `PROCORE_COMPANY_ID` header, or has the `:company_id` parameter decipherable from the API request URL's path or query string parameters to ensure that calls from each company DMSA has its own limit of 3600 requests per hour.

## Handling 429 Errors

In the event your application makes a request that exceeds the rate limit, you will receive a response with the HTTP code 429, a body of "You have surpassed the max number of requests for an hour. Please wait until your limit resets.", and the three rate limit headers described above.
The best practice for handling a 429 error response is to get the Unix timestamp value of the `X-Rate-Limit-Reset` header from the response and have your application sleep until that time.
Otherwise, catch the error and fail gracefully in order to temporarily stop processing requests to Procore.
Event-driven integrations utilizing webhooks should implement a database and a way to enqueue jobs, so that webhooks can be stored and processed later after your application’s rate limit has refreshed.
You should not attempt to continue making requests to Procore until your rate limit has reset.
Further attempts to make requests while your rate limit is exceeded is bad practice, and may cause your application to halt execution.
