---
permalink: /building-apps-app-types-families-staged
title: Available App Types (3-Family Model — Staged)
sub_header: Choose the capabilities your integration needs.
layout: default
section_title: Plan Your App
published: false
---

<!--
  STAGED — DO NOT PUBLISH until the Dev Portal agentic authoring feature ships
  (L2 "Revamp the Developer Portal to Support Agentic Component Declaration",
  status: drafting, target_quarter: 2026-Q3).

  AT PUBLISH TIME:
  1. Replace the body of plan_your_app/building_apps_app_types.md with this 3-family
     version (keep that file's permalink /building-apps-app-types).
  2. Set building_agentic_apps.md `published: true` and add its nav entry under
     "Build Your App" after "Build a Data Connection App".
  3. Delete this staged file.
-->

## Overview

A Procore app is built from three families of capabilities. Pick the ones your integration needs — you can combine them in a single app.

- **Embedded** — run your app inside Procore's UI.
- **Data Connection** — move data between Procore and other systems via the API.
- **Agentic** — add AI Agent and MCP Server capabilities to your app.

Authentication is chosen separately and applies across families — see [Choosing an Authentication Method]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}).
<br><br>

***
## 1. Embedded Apps

**What it is**
Run your app inside Procore's web UI to keep users in context and reduce app switching. The manifest defines behavior; use URL parameter interpolation to pass install- or user-context values.

- **Full Screen** — occupies the main content area; launched from the **Apps** menu.
- **Side Panel** — a fixed 400-px panel scoped to specific tools and views; launched from the right-edge dock.

See [Building Embedded Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_apps.md %}).
<br><br>

***
## 2. Data Connection Apps

**What it is**
Move data between Procore and other systems (accounting, ERP, document management, equipment tracking). Most work happens outside the Procore UI, on a schedule or via webhook events.

**How it works**
- Create, read, and update Procore resources with API calls; some endpoints support **Sync** actions for batch operations.
- Use **Webhooks** to receive near real-time change events.

See [Building Data Connection Apps]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}).
<br><br>

***
## 3. Agentic Apps

**What it is**
Add AI-driven capabilities to your app, declared in the same manifest and governed through Procore's install-and-consent flow. The agentic runtime is provided by **Datagrid, a Procore Company**.

- **AI Agent** — an AI-powered entity that automates work within the data it is permitted to access.
- **MCP Server** — exposes **Tools** (capabilities an agent can call) over the **Model Context Protocol**.

See [Building Agentic Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_agentic_apps.md %}).
<br><br>

***
## Combine Families

An app is not limited to one family — for example, an embedded app can also expose an MCP server, and a data connection app can sync in the background. Declare each capability your app needs in a single manifest.
