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

A Pilot endpoint with no external consumers may be removed without a sunset period.

These are minimums rather than targets. If migration to a replacement is going slowly, Procore may extend a sunset date, but never shorten one.

<div class="details-bottom-spacing"></div>

***
## Detect Deprecation in the API Spec

Deprecated endpoints are annotated in Procore's OpenAPI Specification, so you can find them programmatically instead of watching announcements.

| Field | What it tells you |
| --- | --- |
| `deprecated: true` | The endpoint is deprecated. |
| `x-deprecated-at` | The date deprecation was announced, as `YYYY-MM-DD`. |
| `x-sunset` | The date the endpoint will stop responding, as `YYYY-MM-DD`. |

Download the specification from the <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">REST API Reference</a>. Checking `x-sunset` against the endpoints your integration calls — as a step in your own build — is the cheapest way to find out you are on a clock.

<div class="details-bottom-spacing"></div>

***
## Lifecycle Management

How Procore manages an endpoint through each phase.

| Phase      | API Resources                             | Support                                                                                                                                                | Documentation                                                            | Change Notification                                                                                                                         |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Active     | API is live in Production                 | - New resource versions released periodically with new features, refinements, fixes, etc.<br>- Technical support available at <apisupport@procore.com> | - Released with new API versions<br>- Reference documentation maintained | - Changelog entries published for updates to resource endpoints<br> - Developer Portal notifications covering new resource version releases |
| Deprecated | API is live in Production                 | - Fixes deployed as needed<br>- No new development<br>- Technical support available at <apisupport@procore.com>                                        | - Endpoint reference pages marked as 'Deprecated'                        | - Developer Portal notification and announcement prior to deprecation<br> - Changelog entries published only for fixes and related changes  |
| Sunset     | API is no longer accessible in Production | - Support no longer provided                                                                                                                           | - Reference pages no longer accessible in Production                     | - Developer Portal notification and announcement prior to sunset<br> - Final sunset announcement                                            |

<div class="details-bottom-spacing"></div>

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
