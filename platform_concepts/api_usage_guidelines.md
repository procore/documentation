---
permalink: /api-usage-guidelines
title: API Usage Guidelines
sub_header: Understand how Procore's APIs are designed to be used — and what's coming next.
layout: default
section_title: Platform Concepts
---

## Overview
Procore offers a comprehensive set of REST APIs that power integrations across the construction industry. As the platform evolves to support new capabilities — including AI-driven intelligence — it's important to understand how each set of APIs is designed to be used and where we're headed.
<br><br>

***
## The Future: Agentic APIs (Coming Soon)
Procore is developing a new generation of **Agentic APIs**, purpose-built to power AI agents, Retrieval-Augmented Generation (RAG) solutions, and advanced analytics. These APIs are being designed on Procore's Datagrid infrastructure to deliver the performance, scale, and security that data-intensive AI workloads require.

With Agentic APIs, partners and developers will be able to build intelligent solutions that go beyond simple data transactions — enabling AI-powered insights, semantic retrieval, and deep analytics without the need for specialized infrastructure or external data storage.

**Timeline:** General Availability is planned for Late Q1 2026. Stay tuned to our [Announcements]({{ site.url }}{{ site.baseurl }}{% link announcements/overview.md %}) page for updates.

<div class="cta-container">
  <a href="https://docs.google.com/forms/d/e/1FAIpQLSdk_neam_tY1x8jiFG0QniwcYGR9urGNZ1MnZl_Ie81pfereg/viewform" class="create-account-button" target="_blank">
    Sign Up for Agentic API Updates
  </a>
</div>
<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***
## Procore's REST APIs: Designed for Transactional Use
Procore's existing REST APIs are designed for **transactional use cases** — creating, reading, updating, and deleting individual records within the Procore platform. These APIs power the day-to-day operations that keep construction projects moving.

### Common transactional use cases
- Creating or updating records such as RFIs, submittals, or daily logs
- Reading project details, user information, or financial data
- Automating workflows triggered by changes in Procore
- Powering embedded apps that surface external data inside Procore

### What the REST APIs are not designed for
Procore's transactional REST APIs are **not intended for**:
- Large-scale data extraction or bulk export for purposes outside of your app's core integration
- Building datasets for training, fine-tuning, or benchmarking AI/ML models (including LLMs)
- Scraping, harvesting, or creating copies of Procore data
- High-volume data retrieval to power non-complementary analytics or intelligence solutions

These activities can impact platform stability, degrade performance for customers, and violate Procore's <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_policy.md %}">Developer Policy</a> and <a href="https://procore.pactsafe.io/legal.html#contract-hymckkfc9" target="_blank">API Terms of Use</a>.
<br><br>

***
## Choosing the Right API for Your Use Case
As Procore's API ecosystem expands, choosing the right tool for the job ensures the best experience for you and your customers.

| Use Case | Recommended API |
|----------|----------------|
| CRUD operations on individual records | REST APIs (available now) |
| Receiving real-time change notifications | <a href="{{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}">Webhooks</a> (available now) |
| Powering AI agents and intelligent workflows | Agentic APIs (coming Late Q1 2026) |
| Building RAG or semantic retrieval solutions | Agentic APIs (coming Late Q1 2026) |
| Advanced analytics across large datasets | Agentic APIs (coming Late Q1 2026) |

<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***
## Best Practices for API Usage
To maintain platform performance and stay in compliance:
- **Use APIs for their intended purpose.** REST APIs are built for transactional workflows — use them to create, read, update, and delete records as part of your integration's core functionality.
- **Respect rate limits.** Procore enforces <a href="{{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}">rate limits</a> to ensure fair access and platform stability for all users.
- **Request only the data you need.** Use filters, pagination, and targeted queries rather than broad data pulls.
- **Store data responsibly.** Only retain Procore data that is necessary for your application's operation. See our <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_policy.md %}">Developer Policy</a> for data handling requirements.
- **Wait for Agentic APIs** if your use case involves AI workloads, large-scale analytics, or semantic retrieval. Building on the right foundation from the start saves rework later.
<br><br>

***
## See Also
- <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">REST API Reference</a>
- [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %})
- [Procore Developer Policy]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_policy.md %})
- <a href="https://procore.pactsafe.io/legal.html#contract-hymckkfc9" target="_blank">API Terms of Use</a>
- [Announcements]({{ site.url }}{{ site.baseurl }}{% link announcements/overview.md %})
<br><br>

***
{% include need_help_section.md %}
