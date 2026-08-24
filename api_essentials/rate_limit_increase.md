---
permalink: /rate-limit-increase
title: Request a Rate Limit Increase
sub_header: What Procore reviews when you ask for a higher API rate limit, how to apply, and how to keep an increase once you have it.
layout: default
section_title: Manage & Monitor Your App

---
## Overview

Procore's default rate limits fit most integrations. If your app has outgrown them, you can request a higher limit for that app.

Increases are granted per app and are based on demonstrated production usage. The API Review Board evaluates every request against your app's actual traffic from the past 30 days.

An increase raises your ceiling. It does not change the behavior that reached the old one. An app generating a high volume of `403` or other client errors is not fixed by more quota — the underlying problem goes unaddressed, and a higher ceiling lets it run further before anything surfaces. Resolve the behavior first, or an increase makes the situation worse rather than better.

> **Optimize before you apply.** Requests built on an already-efficient call pattern review faster and are approved more often. See [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}).
{: .callout .callout--note}

***
## Before You Apply

Work through the efficiency practices in [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}#tips-for-working-within-the-rate-limit) first — index endpoints, caching, and reduced polling.

Then review both of the following, because they answer different questions:

- [Integration Health]({{ site.url }}{{ site.baseurl }}{% link api_essentials/integration_health.md %}) tells you whether Procore has flagged your app against platform best practices, and what to fix.
- [API Call Activity Report]({{ site.url }}{{ site.baseurl }}{% link api_essentials/app_performance_metrics.md %}) shows the underlying detail — which endpoints drive your volume and where your errors are concentrated.

If Integration Health flags errors, especially `4xx` responses, resolve those first. They weaken the case for an increase, and they will still be there afterward.

> **Failed calls consume your quota.** A `400`, `403`, or `404` counts against your limit exactly like a successful call, so reducing your error rate recovers capacity directly. See [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}).
{: .callout .callout--note}

***
## Consider Whether More Quota Is the Right Fix

Some workloads are better served by a different approach. These are worth evaluating before you apply, and in some cases they remove the need for an increase entirely.

**Confirm which limit you are actually hitting.** Procore enforces an hourly limit and a spike limit measured over a 10-second window. Only the hourly limit is requestable — the spike limit is set by Procore and adjusts alongside it. If your traffic fits within the hour but arrives in bursts, you are hitting the spike limit, and more hourly quota will not help. Pace your calls across the window instead. See [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}).

**Combine less frequent polling with webhooks.** Apps that poll unchanged data on a short interval spend most of their quota confirming that nothing happened. Subscribe to webhooks so changes reach you as they occur, and keep polling as a reconciliation pass on a longer interval rather than as your primary change-detection mechanism. The two together cost far less quota than frequent polling alone, and you keep a safety net for any event you miss. See [How Webhooks Work]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}).

**Point reporting and warehouse loads at Procore Analytics.** The REST API is transactional — it is built for reading and writing records as work happens, not for bulk extraction. If the goal is hydrating a data warehouse or a business intelligence tool, Procore Analytics is designed for that workload and does not consume your API quota.

Procore Analytics is licensed at the company level. If you are building an integration for your own company, check with your Procore administrator or account team about whether it is already available to you. If you are building on behalf of a customer, raise it with that company. See <a href="https://v2.support.procore.com/process-guides/getting-started-with-analytics/" target="_blank">Getting Started with Procore Analytics</a>.
<br><br>

***
## What We Review

Every signal below comes from your app's own production traffic over the past 30 days.

| What we review | What we look for | Where to check |
| --- | --- | --- |
| Traffic consistency | Sustained production traffic that regularly approaches your current limit. | [API Call Activity Report]({{ site.url }}{{ site.baseurl }}{% link api_essentials/app_performance_metrics.md %}) |
| Backoff behavior | Call volume that drops after a `429`. Apps that keep sending at the same or higher rate are declined. | [Integration Health]({{ site.url }}{{ site.baseurl }}{% link api_essentials/integration_health.md %}) — see the **429 Rate Limit Responses** observation |
| Error rate | A low rate of non-`429` client errors. Frequent `400`, `403`, or `422` responses point to unresolved integration issues, and they consume quota you are asking us to expand. | [Integration Health]({{ site.url }}{{ site.baseurl }}{% link api_essentials/integration_health.md %}) |
| Endpoint usage patterns | Volume that reflects real work being done rather than polling or per-record calls an index endpoint could batch. | [API Call Activity Report]({{ site.url }}{{ site.baseurl }}{% link api_essentials/app_performance_metrics.md %}) |

<div class="details-bottom-spacing"></div>

***
## Requests We Typically Decline

We rarely approve an increase in these cases:

- **No production activity behind an ongoing request.** We size ongoing limits against real traffic, so an app with no production API calls has nothing to size against. Run the app in production first, then apply. Time-boxed work is the exception — see [Temporary increases](#temporary-increases).
- **No backoff after a `429`.** An app that keeps sending at the same or higher rate after being throttled is declined. Add backoff logic first. See [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}).
- **A high non-`429` client error rate.** Frequent `400`, `403`, or `422` responses signal unresolved integration issues, and they are already spending the quota you want more of. Resolve those before requesting more capacity.
- **Volume driven by patterns a different approach would solve.** Polling that webhooks could replace, per-record calls that an index endpoint could batch, or bulk extraction better served by Procore Analytics. We will point you to the alternative rather than raise a limit the workload should not need.
- **Anticipated volume with nothing live behind it.** Apply once the traffic exists rather than ahead of a projected rollout.

A declined request is not final. Reapply once the underlying issue is resolved and your traffic shows it.
<br><br>

***
## How to Apply

1. Confirm your app is running in production and generating consistent traffic.
2. Review your [Integration Health]({{ site.url }}{{ site.baseurl }}{% link api_essentials/integration_health.md %}) status, then download your [API Call Activity Report]({{ site.url }}{{ site.baseurl }}{% link api_essentials/app_performance_metrics.md %}) to investigate further.
3. Submit the <a href="https://docs.google.com/forms/d/e/1FAIpQLSenx8lYZ0poOThE6qaxUuMIGwgmFtvDgA7oOxYQa6BdS2V5hg/viewform" target="_blank">API Rate Limit Increase Request form</a>.

The form explains what each field needs. Two values are worth locating before you start, because neither is in front of you when you open it:

- **Developer App URL** — your request cannot be reviewed without it. Log in to the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a>, open **My Apps**, and select your app, then copy the URL from your browser address bar.
- **Company ID** — the Procore company submitting the request. Retrieve it from the <a href="https://developers.procore.com/reference/rest/v1/companies?version=1.0" target="_blank">List Companies</a> endpoint.
<br><br>

***
## Temporary Increases

Some work needs headroom for a defined period rather than permanently — a data migration, an archival job, or a one-time backfill. Give an end date on the form rather than requesting an ongoing increase.

A temporary increase is granted with an agreed revert date. On that date your app returns to its previous limit, so plan the work to finish inside the window.
<br><br>

***
## Keep Your Increase
> **Inactive apps lose their increase, without advance notice.** An app that records zero production API calls for a full calendar month returns to the default limits.
{: .callout .callout--warning}

We review approved increases for continued use. Removing headroom from dormant apps keeps capacity available for integrations that are actively using it.

Because there is no advance notification, treat the `X-Rate-Limit-*` response headers as the source of truth for your current limit. An app returning from a dormant period should read them before resuming heavy traffic. See [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}).

Removal is not permanent. If your app becomes active again, apply through the same form and reference the previous increase.
<br><br>

***
## Next Steps
- [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}) — headers, `429` handling, and efficiency practices.
- [Integration Health]({{ site.url }}{{ site.baseurl }}{% link api_essentials/integration_health.md %}) — the status we review with your request.
- [API Call Activity Report]({{ site.url }}{{ site.baseurl }}{% link api_essentials/app_performance_metrics.md %}) — the 30-day CSV that shows what drives your volume.
<br><br>

***
{% include need_help_section.md %}
