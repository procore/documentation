---
permalink: /rest-api-lifecycle
title: API Lifecycle
sub_header: Understand the lifecycle stages, how much notice you get before an endpoint is retired, and how to find deprecated endpoints your app is calling.
layout: default
section_title: Platform Concepts
---

## Overview

Every Procore REST API endpoint sits at a lifecycle stage that tells you how stable it is and how much notice you get before it goes away. This page covers what each stage means for an integration you have already built, how long you have to migrate, and how to find out whether any of it affects you.
<br><br>

***
## Lifecycle Stages

An endpoint matures through Pilot, Beta, and General Availability, then retires through Deprecated and Sunset. Sunset is an exit from any stage — an endpoint does not have to reach General Availability before it is retired.

### Pilot
Experimental, and sometimes called Alpha. It carries no long-term support commitment and can change without notice. Build on it only if you can absorb that.

### Beta
Functional and available to use, but still changing, and backed by a shorter commitment than General Availability.

### General Availability
Your calls work and keep working. New resource versions ship periodically with features, refinements, and fixes, reference documentation is maintained and released alongside them, and changelog entries cover endpoint updates. Developer Portal notifications cover new resource version releases.

### Deprecated
Your calls still work. Procore continues to deploy fixes, but no new development happens on the endpoint and new applications are denied access to it. Reference pages are marked **Deprecated**, and changelog entries cover fixes only.

You get a Developer Portal notification and an announcement before this starts. **Treat that as the signal to migrate.** The replacement — or the decision that the functionality is no longer needed — is settled when deprecation is announced, not at the cutoff, so the notice should already tell you where to go next.

### Sunset
Your calls stop working. The endpoint is no longer accessible in production and its reference pages come down. You are notified before sunset, and again once it completes.
<br><br>

***
## Notice Periods by Stage

How much notice you get depends on the stage the endpoint was in when its deprecation was announced.

| Stage at deprecation | Minimum notice before sunset |
| --- | --- |
| **General Availability** | 1 year |
| **Beta** | 6 months |
| **Pilot** | 3 months |

These minimums apply where an endpoint has consumers. Where usage data shows it has none — no usage, so no impact — Procore may deprecate and sunset it on an accelerated timeline, and a Pilot endpoint in that position may be removed with no sunset period at all.

A sunset date can move the other way too. If migration to a replacement is going slowly, Procore may extend it.

<div class="details-bottom-spacing"></div>

***
## Find Deprecated Endpoints You Use

**Use Integration Health.** It is scoped to your app, so it answers the question that actually matters — *are any of the endpoints I call deprecated* — instead of listing everything Procore has ever deprecated.

Its **Deprecated Endpoint Usage** observation flags deprecated routes your app is actively calling. The **API Call Activity Report** then confirms which ones and how often, including the infrequent code paths that are easiest to miss — a deprecated call buried in a once-monthly export is exactly what this surfaces.

Check it as soon as a deprecation is announced, not after sunset. See [Integration Health]({{ site.url }}{{ site.baseurl }}{% link api_essentials/integration_health.md %}#deprecated-endpoint-usage) and [API Call Activity Report]({{ site.url }}{{ site.baseurl }}{% link api_essentials/app_performance_metrics.md %}).

If you would rather automate the check, Procore's OpenAPI Specification annotates deprecated endpoints with `deprecated: true`, the announcement date in `x-deprecated-at`, and the removal date in `x-sunset`, all as `YYYY-MM-DD`. Download it from the <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">REST API Reference</a>.
<br><br>

***
## Need Help?
Please reach out to <apisupport@procore.com> if you have any questions regarding the API lifecycle.
<br><br>

***
## See Also

- [REST API Overview]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_overview.md %})
- [API Request and Response Format]({{ site.url }}{{ site.baseurl }}{% link api_essentials/restful_api_concepts.md %})
- [API Usage Guidelines]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/api_usage_guidelines.md %})
{: .link-list}
<br><br>
