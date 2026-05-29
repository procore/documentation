---
permalink: /integration-health
title: Integration Health
sub_header: Monitor your app's health and compliance against Procore's best practices — what each observation means, why it matters, and how to resolve unhealthy states.
layout: default
section_title: Reference
---

## Overview

The **Integration Health** tab in the Developer Portal helps you build reliable, high-performance integrations. It monitors your app against Procore's best practices and surfaces the actions needed to keep your integration healthy. The data is recomputed daily across a rolling **14-day window** of your live production API traffic.

This page explains how to interpret each observation, why it matters, and how to resolve it.

For a complete reference of HTTP status codes, see the [Error Code Reference]({{ site.url }}{{ site.baseurl }}{% link api_essentials/error_reference.md %}). For broader debugging guidance, see [Troubleshooting]({{ site.url }}{{ site.baseurl }}{% link api_essentials/troubleshooting.md %}).
<br><br>

***
## Where to find this in the Developer Portal

1. Log in to the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a>.
2. Open **My Apps** and select the app you want to inspect.
3. In the App Management sidebar, select **Integration Health**.

The page is organized into three areas:

- **Summary at the top** — a count of observations in each bucket: **Needs Attention** (resolve to improve health), **Review Recommended** (monitor for changes), and **Healthy** (meeting best practices).
- **API Call Activity Report** — a CSV download covering the last 30 days of production API calls for your app. Use this to investigate any observation flagged on the page. See [API Call Activity Report]({{ site.url }}{{ site.baseurl }}{% link api_essentials/app_performance_metrics.md %}) for the full column reference.
- **Health and Compliance Metrics** — the seven observations covered on this page. Select any row to expand the 14-day daily history and the recommended next step.
<br><br>

***
## Status states

Each observation row, and the rolled-up integration status, uses one of three states. Integration Health reflects a rolling 14-day view of your production traffic, refreshed daily — so each status summarizes a recent trend, not a single moment.

| Status | What it means | What to do |
| :---- | :---- | :---- |
| 🔴 **Needs Attention** | A critical issue is active in your recent traffic, or has recurred across the window. | Treat it as a priority bug. Use the **API Call Activity Report** to find the endpoints responsible, and resolve them. |
| 🟡 **Review Recommended** | A critical or warning signal appeared recently but isn't dominating your latest traffic — it may be intermittent or limited to edge-case code paths. | Investigate before it escalates. Use the **API Call Activity Report** to spot the trend or the code path involved. |
| 🟢 **Healthy** | No critical activity, and any warnings are isolated. | No action needed. |

Expand any observation row to see its **Daily status** — the raw severity (`Critical`, `Warning`, or `Healthy`) for each individual day, which can differ from the rolled-up pill above it.
<div class="details-bottom-spacing"></div>

> **Start every investigation with the API Call Activity Report.** When an observation is flagged, the API Call Activity Report is your fastest path to the root cause. It contains the last 30 days of production API calls — endpoints, status codes, HTTP methods, and daily counts — so you can filter to the flagged status code or compliance signal and see exactly which endpoints, workflows, and trends are driving it. Every remediation step below begins here.
<br><br>

***
## How your status improves

Because Integration Health is a rolling 14-day view, your status recovers on its own once you fix the underlying issue — there's nothing to manually clear or dismiss.

1. **Stop the behavior behind the observation,** and it stops appearing in your new traffic.
2. **As the issue fades from the 14-day window,** your status moves back toward **Healthy**.
3. **A fully resolved issue clears within 14 days** of its last occurrence. If it recurs, it reappears in your status on the next daily refresh.

Use the **API Call Activity Report** after each release to confirm the offending calls have stopped — that's your signal the fix landed.
<br><br>

***
## Recommended monitoring cadence

Treat Integration Health as part of your operational rhythm rather than something you check only when alerted:

- **Weekly:** Skim the Integration Health tab for every app you maintain. Look for new **Needs Attention** rows and any **Review Recommended** rows that have lingered across multiple refreshes. Pull the **API Call Activity Report** for anything flagged to see which endpoints are responsible.
- **After every release:** Check the daily history tables for the observation codes most likely to be affected by your change. For example:
  - 403s after a permissions or scope change
  - 401s after an auth refactor
  - Deprecated or private endpoint usage after refactoring API client code
- **Before changelog deprecations land:** Subscribe to the [API Changelog]({{ site.url }}{{ site.baseurl }}{% link announcements/overview.md %}) and check for **Deprecated Endpoint Usage** as soon as a new deprecation is announced — not after sunset.
<br><br>

***
## Observations

This section covers each of the seven observations shown on the Integration Health tab. Expand the observation that matches your status pill to see what it means and how to resolve it. **Every resolution path starts with the API Call Activity Report** — download it to see the exact endpoints, status codes, and daily counts behind each flagged observation.
<br><br>

<details id="403-forbidden-responses" markdown="1">
<summary class="collapseListTierOne">403 Forbidden Responses</summary>

**What it means:** Your integration is calling resources the authenticated user or app does not have permission to access.

**Why it matters:** Each blocked request impacts the experience for connected users and consumes API quota without returning data. 403s are the highest-volume issue in the ecosystem and frequently signal a permissions or installation gap rather than a code bug.

**How to resolve:**
1. Download the API Call Activity Report and filter to 403 responses.
2. For each affected endpoint, check the most common causes:
   - The authenticated user lacks the permission level required for the endpoint (verify in **Project > Directory > Permissions**).
   - The app is not installed in the target company.
   - The tool is disabled in the project's **Admin tool settings**.
   - The resource is outside the user's project access scope.
3. See [Error Code Reference — 403 Forbidden]({{ site.url }}{{ site.baseurl }}{% link api_essentials/error_reference.md %}#client-errors-4xx) and [App Install & Setup Overview]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/building_apps_install_arch.md %}).

</details>

***
<details id="404-not-found-responses" markdown="1">
<summary class="collapseListTierOne">404 Not Found Responses</summary>

**What it means:** Your integration is calling resources that do not exist — deleted records, incorrect IDs, or stale cached references.

**Why it matters:** 404s often indicate a bug in how your integration resolves resource IDs. They consume API quota without returning data and frequently surface as unexplained gaps in connected users' experience.

**How to resolve:**
1. Download the API Call Activity Report and filter to 404 responses to identify the affected endpoints.
2. Common causes to investigate:
   - The integration is using a stale resource ID after the underlying record was deleted in Procore.
   - The integration is calling a resource that exists in one project but not the project being targeted.
   - Cache invalidation is incorrect — the integration retains an ID after a delete event.
3. Subscribe to relevant [webhook events]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}) to invalidate cached IDs when records are deleted upstream.

</details>

***
<details id="429-rate-limit-responses" markdown="1">
<summary class="collapseListTierOne">429 Rate Limit Responses</summary>

**What it means:** Your integration is exceeding Procore's allowed request threshold. Common drivers are high-frequency polling, aggressive retries, or bulk reads without pagination.

**Why it matters:** Throttled requests fail outright. Continued excess can exhaust your quota and cause Procore to drop subsequent requests, breaking workflows for connected users.

**How to resolve:**
1. Download the API Call Activity Report and identify the highest-volume endpoints.
2. Reduce request volume:
   - Replace polling with [webhooks]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}) where supported.
   - Implement **exponential backoff with jitter** on retries — never retry a 429 immediately.
   - Honor the `Retry-After` response header.
   - Use [Sync Actions]({{ site.url }}{{ site.baseurl }}{% link tutorials/using_sync_actions.md %}) to batch creates and updates instead of issuing one call per record.
   - Cache responses where the data does not need to be real-time.
3. See [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}) for thresholds and patterns.

</details>

***
<details id="401-unauthorized-responses" markdown="1">
<summary class="collapseListTierOne">401 Unauthorized Responses</summary>

**What it means:** Your integration is sending Procore requests with missing, expired, or invalid credentials.

**Why it matters:** 401s indicate a gap in your token refresh or session-management logic. They are rare across the ecosystem (under 1% of apps), so even a small spike usually points to a specific code path that is not refreshing correctly.

**How to resolve:**
1. Download the API Call Activity Report and filter to 401 responses to identify which endpoints or workflows are affected.
2. Common causes to investigate:
   - Access tokens expire after **90 minutes** — verify your token refresh runs before expiry, not after.
   - Refresh tokens are **single-use**. If a refresh response is lost (network failure), Procore invalidates the previous refresh token. Persist the new refresh token *before* using the new access token.
   - A specific code path (such as a background job or webhook handler) is using a stale token from a different context.
3. See [Troubleshooting — Authentication & Token Issues]({{ site.url }}{{ site.baseurl }}{% link api_essentials/troubleshooting.md %}) and [OAuth 2.0 Authorization Code Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %}).

</details>

***
<details id="missing-procore-company-id-header" markdown="1">
<summary class="collapseListTierOne">Missing Procore-Company-Id Header</summary>

**What it means:** One or more company-scoped API calls were sent without the required `Procore-Company-Id` header.

**Why it matters:** This header tells Procore which company context the request belongs to. Without it, requests may resolve in the wrong company context or fail to resolve the intended resource. As Procore expands enforcement, **Procore will reject any request missing this header**.

**How to resolve:**
1. Add the `Procore-Company-Id` header to every company-scoped request.

   ```
   GET /rest/v1.0/projects?company_id=12345
   Authorization: Bearer <access_token>
   Procore-Company-Id: 12345
   ```

2. Audit edge-case workflows specifically — multi-company integrations, background jobs, webhook handlers, and seldom-used admin flows are the most common offenders.
3. See [Handling Procore Regions (MPZ)]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_mpz.md %}) to understand when and why the header is required.

</details>

***
<details id="deprecated-endpoint-usage" markdown="1">
<summary class="collapseListTierOne">Deprecated Endpoint Usage</summary>

**What it means:** Your integration is calling endpoints that are no longer supported and are scheduled to be sunset.

**Why it matters:** Once a deprecated endpoint is fully removed, every call your integration makes to it will fail with no graceful fallback — disrupting your customers until you migrate.

**How to resolve:**
1. Review the [API Changelog]({{ site.url }}{{ site.baseurl }}{% link announcements/overview.md %}) and the [API Lifecycle]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_lifecycle.md %}) page to identify supported replacement endpoints.
2. Download the API Call Activity Report to confirm which deprecated routes your integration is calling.
3. Migrate every code path to the replacement endpoint. Audit infrequent flows — a deprecated call buried in a once-monthly export is the kind of issue this observation is designed to surface.
4. Audit shared internal libraries and SDKs your team may have built that wrap deprecated routes. Wrapper libraries are a common source of stale calls.
5. After deploying the fix, monitor the observation's daily history table to confirm the call pattern has stopped.

</details>

***
<details id="private-endpoint-usage" markdown="1">
<summary class="collapseListTierOne">Private Endpoint Usage</summary>

**What it means:** Your integration is calling internal Procore endpoints that are not part of the documented public API surface.

**Why it matters:** Private endpoints are not supported and can change or disappear at any time without notice. Any change can break your integration without warning, with no migration path published in the changelog.

**How to resolve:**
1. Download the API Call Activity Report and review every endpoint your integration calls.
2. Cross-reference each route against the <a href="https://developers.procore.com/reference/rest/v1/docs/rest-api-overview" target="_blank">REST API Reference</a>. Any route that does not appear there is private.
3. Replace private calls with the documented equivalent. If you cannot find a documented equivalent for the data your integration needs, contact <apisupport@procore.com>. A missing documented equivalent is a signal that there is a gap in the public API surface.
4. Audit shared internal libraries and SDKs your team may have built that wrap private routes.

</details>

***
<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

## Frequently asked questions

### Where do I find the API Call Activity Report?

The **API Call Activity Report** is the CSV download at the top of the Integration Health tab. It contains the last 30 days of production API calls for your app — endpoints, status codes, HTTP methods, and daily counts. See [API Call Activity Report]({{ site.url }}{{ site.baseurl }}{% link api_essentials/app_performance_metrics.md %}) for the full column reference and tips for filtering it.
<br><br>

### Does my app status affect my Marketplace listing?

Marketplace requirements may consider integration health and compliance signals as part of ongoing eligibility. See [Marketplace Requirements]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_requirements.md %}) for details on what is reviewed and how often.
<br><br>

### What if my integration shows Needs Attention but the affected endpoint isn't called by my app?

If you see traffic in the report you don't recognize, contact <apisupport@procore.com>. Possible causes include legacy deployments still running under your client credentials, a copy of your app deployed in another environment, or compromised credentials.
<br><br>

### How often does the data refresh?

The 14-day window is recomputed daily. New rows are appended each day after Procore processes the previous day's API traffic. Status changes typically appear within 24 hours of the underlying traffic change.
<br><br>

### What's the difference between the "Critical" daily status and the "Needs Attention" pill?

`Critical` is the raw severity for a *single day* — the worst value in that day's traffic. **Needs Attention** is the *rolled-up* status across the full 14-day window. The two can differ: an observation can show **Needs Attention** even when today's row reads `Healthy`, because the pill reflects the trend over the whole window, not a single day's snapshot.
<br><br>

### How exactly is my status calculated?

Each status reflects the mix of critical and warning days across the rolling 14-day window, weighted toward your most recent traffic. We tune the exact thresholds over time as the program matures, so we keep specific numbers out of this guide to keep it accurate. To understand why a particular observation is flagged, start with the **API Call Activity Report** — it shows the exact traffic behind the status. If you still have questions, contact <apisupport@procore.com>.
<br><br>

***
## Related documentation

- [Troubleshooting]({{ site.url }}{{ site.baseurl }}{% link api_essentials/troubleshooting.md %})
- [Error Code Reference]({{ site.url }}{{ site.baseurl }}{% link api_essentials/error_reference.md %})
- [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %})
- [Handling Procore Regions (MPZ)]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_mpz.md %})
- [API Usage Guidelines]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/api_usage_guidelines.md %})
- [API Lifecycle]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_lifecycle.md %})
- [API Call Activity Report]({{ site.url }}{{ site.baseurl }}{% link api_essentials/app_performance_metrics.md %})
