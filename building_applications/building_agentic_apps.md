---
permalink: /building-agentic-apps
title: Building Agentic Applications
sub_header: Add AI Agent and MCP Server capabilities to your Procore app.
layout: default
section_title: Build Your App
published: false  # AGENTIC WIP — hidden until the agentic feature ships (~Q3 2026); set true to restore
---

## Overview
Agentic capabilities let your app bring AI-driven automation into Procore — agents that take on routine work, and tools that AI can call to act on your app's data alongside a customer's Procore data. Like Embedded and Data Connector capabilities, they are declared in the standard Procore App Manifest: you author them in the Developer Portal, and Procore governs how they are installed and consented to. The agentic runtime itself is provided by **Datagrid, a Procore Company**, which executes **AI Agents** and connects to your app's **External MCP Servers**.

An app can declare either or both of the agentic components below, alongside any Embedded or Data Connector components. For how they fit among the app families, see [Choose an App Type]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/building_apps_app_types.md %}).
<br><br>

***
## AI Agents
An **AI Agent** is an AI-powered entity that automates work by combining a model, knowledge, and tools, acting within the data it is permitted to access. Declaring an AI Agent component in your manifest lets customers adopt it through Procore's governed install-and-consent flow, with per-capability configuration routed to the appropriate Datagrid teamspace.
<br><br>

***
## External MCP Servers
The **Model Context Protocol (MCP)** is an open standard for exposing capabilities to AI agents. An **External MCP Server** is the concrete component your app provides that exposes **Tools** — the individual capabilities an agent can call. It's *external* because your app hosts it and Datagrid's agent connects to it as a client — distinct from any MCP server Procore itself hosts. Tools are discovered from your server at runtime, so the available set stays current as you update it.

> **A note on naming:** "MCP" is a protocol — always refer to the concrete component as an **MCP Server** (**External MCP Server** when it's the one your app provides), and its capabilities as **Tools**.

> **"Connector" is overloaded — be precise.** Procore's **Data Connector** component (User Level / Service Account auth) is *not* the same as Datagrid's **connectors** (its library of external data sources). When a document spans both, qualify which one you mean.
<br><br>

***
## How Customers Use Agentic Capabilities
Customers reach agentic capabilities through **Procore AI** — construction-trained AI that works alongside teams in a **side-panel chat** inside Procore. Anyone on a project can ask questions across their project data — drawings, RFIs, submittals, photos, and more — and put agents to work on routine tasks.

Within Procore AI, customers can use:

- **AI Agents** — Procore's built-in agents *and* the agents a customer has built or **installed from apps** (custom and Marketplace). This is where the AI Agent component you publish becomes usable to customers.
- **MCP Servers** — the **Tools** your **External MCP Server** exposes, callable by agents to pull in your app's data and actions alongside Procore's.

Procore AI keeps a person in control: every action an agent proposes is **staged for review and approval** before anything changes in Procore, and the AI cites its sources. For the customer-facing overview, see <a href="https://v2.support.procore.com/product-manuals/procore-ai/tutorials/about-procore-ai" target="_blank">About Procore AI</a>.
<br><br>

***
## Authoring
Agentic components are authored in the same manifest and versioning flow as the rest of your app: declare the component, create a version, test it in your Developer Sandbox, and promote to production.
<br><br>

***
## Next Steps
- [Choose an App Type]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/building_apps_app_types.md %}) — how Agentic fits among the app families.
- [Create an App]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_create_new.md %}) — start an app and its manifest.
- <a href="https://v2.support.procore.com/product-manuals/procore-ai/tutorials/about-procore-ai" target="_blank">About Procore AI</a> — the customer experience your capabilities surface in.
