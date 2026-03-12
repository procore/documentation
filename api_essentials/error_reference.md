---
permalink: /error-reference
title: Error Code Reference
sub_header: Common HTTP status codes and Procore-specific error responses with causes and solutions.
layout: default
section_title: Reference
---

## Overview
When making calls to the Procore API, you may encounter HTTP status codes that indicate the success or failure of your request. This page provides a comprehensive reference for common error codes, their causes, and how to resolve them.

For general REST API concepts, see [RESTful API Concepts]({{ site.url }}{{ site.baseurl }}{% link api_essentials/restful_api_concepts.md %}).
<br><br>

***
## Successful responses (2xx)

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | The request succeeded. The response body contains the requested data. |
| 201 | Created | The resource was created successfully. The response body contains the new resource. |
| 204 | No Content | The request succeeded but there is no response body (common for DELETE operations). |

<br><br>

***
## Client errors (4xx)

| Code | Status | Common Cause | How to Fix |
|------|--------|-------------|------------|
| 400 | Bad Request | Malformed JSON, missing required fields, or invalid parameter values. | Check request body syntax and verify all required fields are included. Review the endpoint's parameter documentation. |
| 401 | Unauthorized | Missing, expired, or invalid access token. | Verify the `Authorization: Bearer <token>` header is present. If the token expired, use your refresh token to obtain a new access token. See [Authentication Endpoints]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %}). |
| 403 | Forbidden | The authenticated user or service account lacks the required permissions, the app is not installed in the target company, the resource is outside the user's access scope, or the tool is disabled in the project. | Verify the user or service account has the correct permission level for the endpoint. Confirm the app is installed in the target company. Check that the relevant tool is enabled in the project's Admin tool settings. See [App Install & Setup Overview]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/building_apps_install_arch.md %}). |
| 404 | Not Found | The requested resource does not exist, or the authenticated user does not have access to it. | Verify the resource ID is correct and that the user has access to the project or company containing the resource. |
| 406 | Not Acceptable | The request references non-existent fields or an unsupported content type. | Verify field names match the API specification. |
| 408 | Request Timeout | The request took too long to complete, most commonly caused by fetching a large dataset without filtering or pagination. | Add filters to narrow the dataset and use pagination to retrieve results in smaller pages. See [Filtering & Sorting]({{ site.url }}{{ site.baseurl }}{% link tutorials/filtering_on_list_actions.md %}) and [Pagination]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/pagination.md %}). |
| 409 | Conflict | The request attempts to create a resource that already exists or conflicts with the current state. | Check for duplicate records. If using `origin_id` with sync actions, verify uniqueness. |
| 422 | Unprocessable Entity | The request syntax is valid but the server cannot process it due to business logic (for example, invalid status transitions, required dependent records missing). | Review the error message in the response body for specific validation details. |
| 429 | Too Many Requests | You have exceeded the API rate limit. | Implement request throttling and exponential backoff. See [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}). |

<br><br>

***
## Server errors (5xx)

| Code | Status | Common Cause | How to Fix |
|------|--------|-------------|------------|
| 500 | Internal Server Error | An unexpected error occurred on Procore's servers. | Retry the request after a short delay. If the issue persists, contact <apisupport@procore.com> with the request details and approximate time. |
| 502 | Bad Gateway | A temporary connectivity issue between Procore's load balancer and backend services. | Retry the request. These are typically transient. |
| 503 | Service Unavailable | The service is temporarily unavailable due to maintenance or high load. | Retry the request with exponential backoff. Check the [Procore Status Page](https://status.procore.com/) for ongoing incidents. |

<br><br>

***
## Common error patterns

### "App is not connected to this company"
**HTTP 403** — Your app has been disconnected from the company via App Management in Procore. The company admin needs to reconnect your app. See [What is App Management?](https://support.procore.com/faq/what-is-app-management)

### Token-related errors
- **"The access token is invalid"** — The token has expired (tokens last 90 minutes) or has been revoked. Refresh the token using your refresh token.
- **"The refresh token is invalid"** — Refresh tokens are single-use. If a refresh call was made (even if the response was lost due to a network error), the old refresh token is permanently invalidated. Re-authenticate the user.

### Rate limiting
When you receive a `429` response, the `Retry-After` header indicates how many seconds to wait before retrying. Implement exponential backoff to handle rate limits gracefully.

### Permissions errors
A `403 Forbidden` on a specific endpoint usually means the authenticated user's permission level is insufficient. Check the [User Permissions Matrix](https://support.procore.com/references/user-permissions-matrix-web) to determine the required permission level for each tool.
<br><br>

***
## Best practices for error handling

1. **Always check status codes** — Don't assume success. Check the response status code before processing the response body.
2. **Parse error messages** — The response body for 4xx errors often contains a `message` or `errors` field with specific details.
3. **Implement retry logic** — For 429 and 5xx errors, use exponential backoff with jitter.
4. **Log request details** — When contacting support, include the HTTP method, URL, request headers (without secrets), response status code, and response body.
5. **Handle token expiration proactively** — Refresh tokens before they expire rather than waiting for a 401 error.
<br><br>

***
## See Also

- [Troubleshooting]({{ site.url }}{{ site.baseurl }}{% link api_essentials/troubleshooting.md %})
- [RESTful API Concepts]({{ site.url }}{{ site.baseurl }}{% link api_essentials/restful_api_concepts.md %})
- [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %})
- [Authentication Endpoints]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %})
- [FAQ]({{ site.url }}{{ site.baseurl }}{% link additional_resources/faq.md %})
