---
permalink: /agentic-apis
title: Agentic APIs
sub_header: A new API for semantic search, RAG, and agents on Procore data. Available today in a Design Partner pilot.
layout: default
section_title: Announcements
---

## Overview

Procore's **Agentic APIs** are built on <a href="https://www.procore.com/press/procore-acquires-datagrid" target="_blank">Datagrid</a>, the AI data infrastructure Procore acquired in January 2026. They handle workloads the transactional REST APIs weren't built for: semantic search across unstructured data, Retrieval-Augmented Generation (RAG), and autonomous agent workflows.

Agentic apps primarily use the Converse API, a conversational endpoint for working with Procore data. General availability (GA) is in development, and we're not committing to a date yet. Access is limited to approved Design Partners, and we'll announce additional endpoints as they ship.

Use Agentic APIs if your integration needs:

- Deep semantic search across PDFs, drawings, photos, video, and Building Information Modeling (BIM) files
- RAG applications grounded in real project data
- Agents that reason across Procore data and take multi-step action

For create, read, update, and delete (CRUD) operations against individual records (RFIs, submittals, budgets, daily logs), keep using the transactional [REST APIs]({{ site.url }}{{ site.baseurl }}{% link overview/introduction.md %}).

If your app currently uses REST APIs for AI-powered features or large-scale data workloads, those use cases are intended for Agentic APIs — see the [API Usage Guidelines]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/api_usage_guidelines.md %}).
<br><br>

***

## Using the Converse API

The Converse API takes a natural-language prompt and returns an agent's response, with optional citations to source records and a conversation ID for multi-turn follow-ups. Call-level options include streaming, structured output, and citation generation. Agent-level behavior — knowledge sources, tools, and Model Context Protocol (MCP) server connections — is configured on the agent itself and can be overridden per call.

Most use cases — agents, RAG, semantic search — are built by configuring different agents and calling Converse, rather than against many purpose-built endpoints.

**Reference documentation.** Datagrid is Procore-owned infrastructure. The Converse API reference is currently hosted at <a href="https://developers.datagrid.com/api-reference/converse/converse" target="_blank">Datagrid</a>.
<br><br>

***

## REST APIs vs. Agentic APIs

| | REST APIs | Agentic APIs |
| --- | --- | --- |
| **Designed for** | CRUD on individual records | Semantic search, RAG, agents |
| **Data shape** | Structured records | Structured records plus unstructured content (PDFs, images, video, BIM files) |
| **Auth** | OAuth 2.0 | OAuth 2.0 (same tokens) |
| **Rate limits** | Per-app, per-endpoint quotas | Scoped to pilot use case |
| **Availability** | GA | Design Partner pilot; GA in development |
| **Primary use case** | Workflow automation | AI-powered features, agents |

<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***

## Get early access

The Ecosystem team reviews Design Partner pilot submissions on a rolling basis. We select partners based on whether the use case fits the API's capabilities and whether customers are asking for it. Pilot use cases are reviewed through the same partnership review process as other Marketplace integrations.

Here's what happens after you submit:

- We review your submission on a rolling basis and follow up with next steps
- If the use case is in scope, you'll have a 30-minute discovery call with a Procore product manager and a Procore engineer from the Datagrid team
- Selected partners sign a pilot agreement and receive access scoped to their use case
- You get a named point of contact for the length of the pilot

<div class="cta-container">
  <a href="https://docs.google.com/forms/d/e/1FAIpQLSdk_neam_tY1x8jiFG0QniwcYGR9urGNZ1MnZl_Ie81pfereg/viewform" class="create-account-button" target="_blank">
    Apply for the Design Partner Pilot
  </a>
</div>

<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***

## Roadmap

In development:

- Declaring agentic components (MCP servers and agents) in your app manifest through the Developer Portal, so Marketplace customers can install your agent without a separate Datagrid relationship
- Agent Marketplace — a managed marketplace for publishing AI agents to Procore's customer base, where partners list certified agents alongside traditional apps with discovery and install handled by Procore

Dates are directional, not committed. Subscribe through the form above to hear when each item ships.
<br><br>

***

## See also

- <a href="https://developers.datagrid.com/api-reference/converse/converse" target="_blank">Converse API reference</a>
- [API Usage Guidelines]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/api_usage_guidelines.md %}) for when to use REST versus Agentic
- [Developer Policy]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_policy.md %}) for data handling and acceptable use
- [Announcements]({{ site.url }}{{ site.baseurl }}{% link announcements/overview.md %}) for the platform changelog
<br><br>