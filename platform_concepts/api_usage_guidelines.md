---
permalink: /api-usage-guidelines
title: API Usage Guidelines
sub_header: Understand how Procore's REST APIs are designed to be used and what qualifies as permitted usage.
layout: default
section_title: Platform Concepts
---

## Overview
Procore's REST APIs are designed for **transactional use cases** — creating, reading, updating, and deleting individual records within the Procore platform. These APIs power the day-to-day operations that keep construction projects moving.

This page covers what REST APIs are intended for, what they are not intended for, and best practices for staying in compliance.

If your use case involves AI agents, semantic retrieval, or large-scale analytics, see [Agentic APIs]({{ site.url }}{{ site.baseurl }}{% link announcements/agentic_apis.md %}) for the intended path.
<br><br>

***
## Permitted use cases

REST APIs are built for transactional workflows that complement your app's core integration:

- Creating or updating records such as RFIs, submittals, or daily logs
- Reading project details, user information, or financial data
- Automating workflows triggered by changes in Procore
- Powering embedded apps that surface external data inside Procore
<br><br>

***
## What REST APIs are not designed for

Procore's transactional REST APIs are **not intended for**:

- Large-scale data extraction or bulk export for purposes outside of your app's core integration
- Building datasets for training, fine-tuning, or benchmarking AI/ML models (including LLMs)
- Scraping, harvesting, or creating copies of Procore data
- High-volume data retrieval to power non-complementary analytics or intelligence solutions

These activities can impact platform stability, degrade performance for customers, and violate Procore's <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_policy.md %}">Developer Policy</a> and <a href="https://procore.pactsafe.io/legal.html#contract-hymckkfc9" target="_blank">API Terms of Use</a>.
<br><br>

***
## Best practices

To maintain platform performance and stay in compliance:

- **Use APIs for their intended purpose.** REST APIs are built for transactional workflows — use them to create, read, update, and delete records as part of your integration's core functionality.
- **Respect rate limits.** Procore enforces <a href="{{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}">rate limits</a> to ensure fair access and platform stability for all users.
- **Request only the data you need.** Use filters, pagination, and targeted queries rather than broad data pulls.
- **Store data responsibly.** Only retain Procore data that is necessary for your app's operation. See the <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_policy.md %}">Developer Policy</a> for data handling requirements.
<br><br>

***
## See also
- <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">REST API Reference</a>
- [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %})
- [Agentic APIs]({{ site.url }}{{ site.baseurl }}{% link announcements/agentic_apis.md %}) — for AI agents, semantic retrieval, and advanced analytics use cases
- [Developer Policy]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_policy.md %})
- <a href="https://procore.pactsafe.io/legal.html#contract-hymckkfc9" target="_blank">API Terms of Use</a>
<br><br>

***
{% include need_help_section.md %}
