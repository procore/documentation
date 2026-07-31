---
permalink: /building-apps-app-types
title: Choose an App Type
sub_header: Choose the right app type for your integration.
layout: default
section_title: Plan Your App
---

## Overview

Procore apps are built from three families of capabilities — **Agentic**, **Data Connector**, and **Embedded** — and you can combine them in a single app. Use this page to choose the best fit for your workflow and users.

Authentication is chosen separately and applies across families — see [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}).
<br><br>

***
## 1. Agentic Apps

**What it is**  
Add AI-driven capabilities to your app, declared in the standard App Manifest and governed through Procore's install-and-consent flow. The agentic runtime is provided by **Datagrid, a Procore Company**.

**Components**
- **AI Agent** — an AI-powered entity that automates work within the data it is permitted to access.
- **MCP Server** — exposes **Tools** (the capabilities an agent can call) over the **Model Context Protocol**.

See [Building Agentic Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_agentic_apps.md %}).
<br><br>

***
## 2. Data Connector Apps

**What it is**  
Move data between Procore and other systems (for example, accounting, ERP, document management, or equipment tracking).

**When to use**
- You need to sync or transform data between Procore and another system.
- Most work happens outside the Procore UI.
- Jobs run on a schedule or respond to events via webhooks.

**How it works**
- Create, update, and read Procore resources with API calls.
- Some endpoints support **Sync** actions for batch create/update. See [Using Sync Actions]({{ site.url }}{{ site.baseurl }}{% link tutorials/using_sync_actions.md %}).
- Use **Webhooks** to receive near real‑time change events. See [Introduction to Webhooks]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}).

![Data Connector Architecture]({{ site.baseurl }}/assets/guides/data-connection-diag.png)

See also: [Building Data Connector Apps]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}).
<br><br>

***
## 3. Embedded Apps

**What it is**  
Run your app inside Procore’s web UI to keep users in context and reduce app switching.

**Key details**
- The app **manifest** defines behavior and settings.
- Use URL parameter interpolation to pass values from install configuration or user input.

### Fullscreen Apps
Fullscreen apps occupy the main content area. Users launch them from the **Apps** menu.

### Side Panel Apps
A side panel app renders in a fixed 400‑px panel on the right side of the Procore UI. Because side panel apps are installed for specific tools, you can build solutions tailored to a tool or workflow. Users launch side panel apps from the dock on the right edge of the interface.

See [Building Embedded Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_apps.md %}) to build either placement.
<br><br>

***
## Example Images (Optional)

Use these examples to understand placement and layout.

<details>
<summary class="collapseListTierOne">Fullscreen Example</summary>
<p>Here is an example of the full screen <a href="https://marketplace.procore.com/apps/procore-integration-for-google-sheets" target="_blank">Procore Integration for Google Sheets™</a> embedded application running in Procore.</p>
<img src="{{ site.baseurl }}/assets/guides/google-sheets-example.png" alt="Google Sheets example">
</details>

***
<details>
<summary class="collapseListTierOne">Side Panel Example</summary>
<p>Here is an example of a side panel application (contextual help) running within the Procore web UI.</p>
<img src="{{ site.baseurl }}/assets/guides/side-panel-example.png" alt="Side Panel example">
</details>
***
