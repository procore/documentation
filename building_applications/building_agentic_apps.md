---
permalink: /building-agentic-apps
title: Building Agentic Applications
sub_header: Add AI Agent and MCP Server capabilities to your Procore app.
layout: default
section_title: Build Your App
published: false
---

<!--
  STAGED — DO NOT PUBLISH until the Dev Portal agentic authoring feature ships.
  Tracking: L2 "Revamp the Developer Portal to Support Agentic Component Declaration"
  (status: drafting, target_quarter: 2026-Q3). This page is conceptual only.
  Do NOT add step-by-step Configuration Builder / manifest authoring instructions
  until the portal UI is live and verified. Do NOT add to _data/navigation.yml
  until publish. See the Agentic Terminology Standard for locked vocabulary.
-->

## Introduction
Agentic capabilities let your app participate in AI-driven workflows in Procore. Like Embedded and Data Connection capabilities, they are declared in the standard Procore App Manifest — you author them in the Developer Portal, and Procore governs how they are installed and consented to. The agentic runtime itself is provided by **Datagrid, a Procore Company**, which executes agents and connects to your MCP servers.

An app can declare either or both of the agentic components below, alongside any Embedded or Data Connection components.
<br><br>

***
## AI Agents
An **AI Agent** is an AI-powered entity that automates work by combining a model, knowledge, and tools, acting within the data it is permitted to access. Declaring an Agent component in your manifest lets customers adopt it through Procore's governed install-and-consent flow, with per-capability configuration routed to the appropriate Datagrid teamspace.
<br><br>

***
## MCP Servers
The **Model Context Protocol (MCP)** is an open standard for exposing capabilities to AI agents. An **MCP Server** is the concrete component your app provides that exposes **Tools** — the individual capabilities an agent can call. In MCP's architecture your app is the *server* and the agent is the *client*; tools are discovered from your server at runtime, so the available set stays current as you update it.

> **A note on naming:** "MCP" is a protocol — always refer to the concrete component as an **MCP Server**, and its capabilities as **Tools**.

> **"Connector" is overloaded — be precise.** Procore's **Data Connector** component (User Level / Service Account auth) is *not* the same as Datagrid's **connectors** (its library of external data sources). When a document spans both, qualify which one you mean.
<br><br>

***
## Authoring
Agentic components are authored in the same manifest and versioning flow as the rest of your app: declare the component, create a version, test it in your Developer Sandbox, and promote to production.

<!-- TODO (on Q3 feature ship): add the Configuration Builder authoring steps for
     Agent and MCP Server components once the portal UI is live and verified.
     Grounding source for field names: "Datagrid Agentic Components — UI vs API" CSV. -->
