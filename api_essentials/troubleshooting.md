---
permalink: /troubleshooting
title: Troubleshooting
sub_header: Solutions for common issues developers encounter when integrating with the Procore API.
layout: default
section_title: Reference
---

## Overview

This page covers the most common issues developers encounter when building with the Procore API, organized by category. For a complete reference of HTTP status codes, see the [Error Code Reference]({{ site.url }}{{ site.baseurl }}{% link api_essentials/error_reference.md %}).
<br><br>

***
## Authentication & Token Issues

### "The access token is invalid"

**Cause:** The access token has expired or been revoked. Access tokens are valid for **90 minutes** (5,400 seconds).

**Solution:**
1. Use your refresh token to obtain a new access token by calling the [token endpoint]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %}).
2. Store the new `access_token` and `refresh_token` from the response.
3. Proactively refresh tokens before they expire rather than waiting for a 401 error.

```
POST https://login.procore.com/oauth/token

Body (x-www-form-urlencoded):
  grant_type=refresh_token
  client_id=YOUR_CLIENT_ID
  client_secret=YOUR_CLIENT_SECRET
  refresh_token=YOUR_REFRESH_TOKEN
```

### "The refresh token is invalid"

**Cause:** Refresh tokens are **single-use**. Once a refresh call is made — even if the response is lost due to a network error — the old refresh token is permanently invalidated.

**Solution:**
- Re-authenticate the user through the full OAuth flow. See [Authorization Code Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %}).
- To prevent this, always persist both the new `access_token` and `refresh_token` atomically after a successful refresh call.

### Authorization code errors

**Cause:** Authorization codes are single-use and expire quickly. Reusing a code or waiting too long to exchange it will fail.

**Solution:**
- Exchange the authorization code for an access token immediately after receiving it.
- Ensure your redirect URI matches exactly (including trailing slashes) between your app configuration and the authorization request.

### Wrong environment credentials

**Cause:** Using production credentials against sandbox endpoints (or vice versa). Tokens are not transferable across environments.

**Solution:**
- Use `login-sandbox.procore.com` and `sandbox.procore.com` for sandbox.
- Use `login.procore.com` and `api.procore.com` for production.
- Maintain separate credential sets for each environment. See [Authentication Endpoints]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %}).
<br><br>

***
## Permission & Access Errors

### 403: "App is not connected to this company"

**Cause:** Your app has been disconnected from the company through App Management in Procore. This can happen when a company admin uninstalls or disconnects your app.

**Solution:**
- The company admin needs to reconnect your app via **Company Admin > App Management**.
- See <a href="https://support.procore.com/faq/what-is-app-management" target="_blank">What is App Management?</a> for details.

### 403: Insufficient permissions

**Cause:** The authenticated user or DMSA does not have the required permission level for the endpoint being called.

**Solution:**
1. Check the <a href="https://support.procore.com/references/user-permissions-matrix-web" target="_blank">User Permissions Matrix</a> to find the required permission level for the specific tool and action.
2. If using a DMSA, verify the tool permissions are configured correctly in the Developer Portal.
3. Some endpoints require project-level permissions in addition to company-level permissions.

### 403: Tool disabled in the project

**Cause:** The user has sufficient permissions and exists in the project directory, but the Procore tool associated with the resource being queried is disabled for that project.

**Solution:**
- A project admin needs to enable the tool in **Project Admin > Tools**.

### 403: Resource outside access scope

**Cause:** The user has permissions to the tool but not to the specific project or resource.

**Solution:**
- Verify the user has been added to the project's directory.
- For DMSAs, check that the target project is in the app's "Permitted Projects" list. See [Developer Managed Service Accounts]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/developer_managed_service_accounts.md %}).

### 404 on a resource that exists

**Cause:** The user does not have read access to the resource. Procore returns 404 (not 403) when the user cannot see the resource at all.

**Solution:**
- Verify the authenticated user has at least "Read Only" permissions to the relevant tool in the project.
<br><br>

***
## Rate Limiting

### 429: Too Many Requests

**Cause:** You have exceeded the API rate limit.

**Solution:**
1. Check the `Retry-After` response header for how many seconds to wait.
2. Implement **exponential backoff with jitter** for retry logic.
3. Reduce request volume by:
   - Using [Sync Actions]({{ site.url }}{{ site.baseurl }}{% link tutorials/using_sync_actions.md %}) to batch creates and updates.
   - Caching responses where appropriate.
   - Using [webhooks]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}) instead of polling for changes.

See [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}) for details.
<br><br>

***
## Sandbox Issues

### Sandbox data is empty or different from production

**Cause:** Developer Sandboxes are isolated environments with their own data. They do not mirror your production data.

**Solution:**
- Each app gets its own sandbox environment. Create test data (projects, users, etc.) directly in the sandbox.
- Monthly Sandboxes (available for certain accounts) do copy production data on a schedule, but Developer Sandboxes do not.
- See [Procore Environments]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/development_environments.md %}) for details on environment types.

### Cannot install app in sandbox

**Cause:** You need to create an app version (manifest) before installing.

**Solution:**
1. In the Developer Portal, go to your app and select **Create Version**.
2. Copy the **Sandbox App Version Key**.
3. In your sandbox company, go to **Company Admin > App Management > Install Custom App** and paste the key.
4. See [Create an App]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_create_new.md %}) for the full walkthrough.

### Sandbox credentials vs. production credentials

**Cause:** OAuth credentials (Client ID and Client Secret) are different between sandbox and production environments.

**Solution:**
- Use the **Sandbox OAuth Credentials** (found in the Developer Portal under your app's OAuth Credentials section) for sandbox testing.
- Never mix sandbox and production credentials, tokens, or base URLs.
<br><br>

***
## Webhook Issues

### Webhooks are not being delivered

**Cause:** Several potential issues:
1. Your endpoint is not publicly accessible from the internet.
2. Your endpoint is not responding with a 2xx status code within the timeout window.
3. The webhook subscription has been deactivated after repeated delivery failures.

**Solution:**
1. Verify your endpoint is reachable from the public internet (not behind a firewall or VPN).
2. Respond with a `200 OK` immediately upon receipt — process the payload asynchronously.
3. Check your webhook subscription status in the Procore Admin tool.
4. See [Webhooks Overview]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}) and [Using the Webhooks API]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks_api.md %}).

### Duplicate webhook events

**Cause:** Procore may deliver the same event more than once if it does not receive a timely acknowledgment.

**Solution:**
- Implement **idempotent processing** by tracking the event `id` or resource `updated_at` timestamp to detect duplicates.
<br><br>

***
## Request & Response Issues

### 400: Bad Request

**Cause:** Malformed JSON, missing required fields, or invalid parameter values.

**Solution:**
- Validate your JSON syntax (use a linter).
- Check the endpoint documentation for required fields.
- Ensure `Content-Type: application/json` header is set for POST/PATCH/PUT requests.

### 422: Unprocessable Entity

**Cause:** The request is syntactically valid but violates business logic (for example, invalid status transitions, duplicate `origin_id` values, or missing dependent records).

**Solution:**
- Read the `errors` or `message` field in the response body for specific details.
- Common causes include:
  - Attempting to update a locked record (one with an `origin_id` set by an ERP integration).
  - Referencing a cost code or location that does not exist in the project.
  - Violating a uniqueness constraint on `origin_id`.

### Unexpected empty response

**Cause:** The endpoint may return an empty array if the user has no access to matching resources, or the filter parameters exclude all results.

**Solution:**
- Remove filters to verify the base endpoint returns data.
- Check that the `Procore-Company-Id` header is set correctly.
- Verify the user has permissions to the tool and project.

### Pagination: missing data

**Cause:** List endpoints return paginated results (default and maximum vary by endpoint). If you only read the first page, you may miss records.

**Solution:**
- Always implement pagination. See [Pagination]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/pagination.md %}).
- Check for a `Link` header or `has_next_page` field in the response to determine if more pages exist.
<br><br>

***
## Getting Help

If you cannot resolve your issue using the guidance above:

1. **Check the status page:** <a href="https://status.procore.com/" target="_blank">status.procore.com</a> for ongoing incidents.
2. **Review the API reference:** <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">REST API Reference</a> for endpoint-specific documentation.
3. **Contact API Support:** Email <apisupport@procore.com> with:
   - The HTTP method and full URL of the failing request.
   - Request headers (excluding secrets) and body.
   - The response status code and body.
   - The approximate time the error occurred.
<br><br>

***
## See Also

- [Error Code Reference]({{ site.url }}{{ site.baseurl }}{% link api_essentials/error_reference.md %})
- [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %})
- [Authentication Endpoints]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %})
- [Procore Environments]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/development_environments.md %})
- [FAQ]({{ site.url }}{{ site.baseurl }}{% link additional_resources/faq.md %})
