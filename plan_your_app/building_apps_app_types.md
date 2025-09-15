---
permalink: /building-apps-app-types
title: Available App Types
sub_header: Choose the right app type for your integration.
layout: default
section_title: Plan Your App
---

## Overview

Procore supports two app types: **data connection apps** and **embedded apps**. You can also combine them to create hybrid apps. Use this page to choose the best fit for your workflow and users.
<br><br>

***
## 1. Data Connection Apps

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

![Data Connection Architecture]({{ site.baseurl }}/assets/guides/data-connection-diag.png)

See also: [Building User Level Auth. Apps]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps_auth.md %}) and [Building Service Account Auth. Apps]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}).
<br><br>

***
## 2. Embedded Apps

**What it is**  
Run your app inside Procore’s web UI to keep users in context and reduce app switching.

**Key details**
- The app **manifest** defines behavior and settings.
- Use URL parameter interpolation to pass values from install configuration or user input.

### Fullscreen Apps
Fullscreen apps occupy the main content area. Users launch them from the **Apps** menu.

See [Building Full Screen Embedded Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_fullscreen_apps.md %}).

### Side Panel Apps
A side panel app renders in a fixed 400‑px panel on the right side of the Procore UI. Because side panel apps are installed for specific tools, you can build solutions tailored to a tool or workflow. Users launch side panel apps from the dock on the right edge of the interface.

See [Building Side Panel Embedded Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_side_panel_apps.md %}).
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