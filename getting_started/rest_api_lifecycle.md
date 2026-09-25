---
permalink: /rest-api-lifecycle
title: API Lifecycle
sub_header: Understand the lifecycle stages, how much notice you get before an endpoint is retired, and how to detect deprecation from the API spec.
layout: default
section_title: Platform Concepts
---

## Overview

Every Procore REST API endpoint sits at a lifecycle stage that tells you how stable it is and how much notice you get before it goes away. This page covers the stages, what deprecation and sunset mean for an integration you have already built, and how to detect both without waiting for an announcement.
<br><br>

***
## Lifecycle Stages

An endpoint occupies one of three stages:

- **Pilot** — experimental, sometimes called Alpha. It carries no long-term support commitment.
- **Beta** — functional and available to use, but still changing, and backed by a shorter commitment than General Availability.
- **General Availability (GA)** — fully supported, and where most Procore endpoints sit. New features, refinements, and fixes land here.

Sunset is an exit from any of the three. An endpoint does not have to reach GA before it is retired.
<br><br>

***
## Deprecation and Sunset

**Deprecation** is the announced period before an endpoint is removed. The endpoint keeps working and Procore continues to deploy fixes, but no new development happens on it and new applications are denied access.

**Sunset** is the removal itself. The endpoint stops responding in production and its reference documentation comes down.

Before an endpoint is sunset, Procore either makes a replacement available or determines that the functionality is no longer needed. That call is made when deprecation is announced, not at the cutoff date, so a deprecation notice should already tell you where to go next.
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
## Lifecycle Management

What changes for you at each phase.

### General Availability
- **Availability** — live in production.
- **Support** — new resource versions ship periodically with features, refinements, and fixes. Technical support at <apisupport@procore.com>.
- **Documentation** — reference documentation is maintained, and released alongside new API versions.
- **Notifications** — changelog entries for endpoint updates, and Developer Portal notifications for new resource version releases.

### Deprecated
- **Availability** — still live in production.
- **Support** — fixes deployed as needed, no new development. Technical support at <apisupport@procore.com>.
- **Documentation** — endpoint reference pages are marked Deprecated.
- **Notifications** — a Developer Portal notification and announcement before deprecation, then changelog entries only for fixes and related changes.

### Sunset
- **Availability** — no longer accessible in production.
- **Support** — no longer provided.
- **Documentation** — reference pages are removed from production.
- **Notifications** — a Developer Portal notification and announcement before sunset, then a final sunset announcement.
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
