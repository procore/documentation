---
permalink: /building-apps-app-types
title: Choose an App Type
sub_header: Choose the right app type for your integration.
layout: default
section_title: Plan Your App
---

## Overview

Procore apps are built from three families of capabilities — **Agentic**, **Data Connector**, and **Embedded** — and you can combine them in a single app, so a customer installs one app and gets everything it offers. Use this page to choose the best fit for your workflow and users.

Each capability works on its own and none depends on another. Data Connector and Embedded do pair naturally, though: an embedded side panel knows which project and record it was opened on, and a Data Connector lets it call the Procore API for the detail.

Whether your app calls the Procore REST API — and how it authenticates when it does — is a separate decision. See [Choose an Authentication Method]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}).
<br><br>

***
## Agentic Apps
{% include agentic_closed_beta.md %}

**What it is**  
Let Procore AI reach out to your external system. You declare the components on an app version, governed through Procore's install-and-consent flow. Procore AI is powered by **Datagrid, a Procore Company**, which runs the Agents you declare and connects out to your external MCP server.

**Components**
- **MCPs** — an external **Model Context Protocol (MCP)** server that you host, connecting your system to Procore AI so users and Agents can query your external data alongside their Procore data.
- **Agents** — an Agent hosted in Procore AI that uses Procore data and the external tools you connect to perform user-approved actions.

**When to use**
- You want Procore AI to draw on your app's external data when a customer asks it a question.
- You want an Agent to propose changes in Procore for the customer to approve, such as updating an RFI or drafting a Submittal.
- You want a centralized way to manage your Agent and MCP server declarations across the many Procore customers who install your app.

**Two constraints to weigh before you choose this capability**
- Customers need **Procore AI Pro or Enterprise**. Without it they can still install your app and use its Embedded or Data Connector capabilities, but they cannot connect Agentic to a project.
- Procore AI is not available in the Developer Sandbox, so Agentic cannot be tested there.

See [Building Agentic Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_agentic_apps.md %}).
<br><br>

***
## Data Connector Apps

**What it is**  
Move data between Procore and an external system — accounting, ERP, document management, equipment tracking — by calling the Procore REST API. The work runs on your own infrastructure and your own schedule, mostly out of sight of the Procore UI.

**Components**
- **User Level Authentication** — your app acts on behalf of a signed-in user and sees only what that person's Procore permissions allow. Every Data Connector app starts here.
- **Service Account Authentication** — your app acts on its own through a Developer Managed Service Account (DMSA), with permissions you declare and a company administrator approves at install. It is added on top of User Level Authentication and cannot be used alone.

**When to use**
- You need to sync or transform data between Procore and another system.
- The work runs on a schedule, or reacts to events through webhooks, rather than when someone is looking at a screen.
- Another capability in your app needs Procore data — an embedded side panel fetching the record it was opened on, for example.

**How it works**
- Create, update, and read Procore resources with API calls.
- Some endpoints support **Sync** actions for batch create/update. See [Using Sync Actions]({{ site.url }}{{ site.baseurl }}{% link tutorials/using_sync_actions.md %}).
- Use **Webhooks** to receive near real‑time change events. See [How Webhooks Work]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}).

![Data Connector Architecture]({{ site.baseurl }}/assets/guides/data-connection-diag.png)

**Two things to know before you choose this capability**
- Adding a Data Connector component is what generates your OAuth credentials. Until you do, the **Credentials** tab has nothing to collect. See [OAuth Credentials Management]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_keys.md %}).
- A Data Connector carried over from a previous app version cannot be removed, so decide what Procore access your app needs before you promote.

See [Building Data Connector Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}).
<br><br>

***
## Embedded Apps

**What it is**  
Run your app inside Procore’s web UI, so users work with it without leaving the tool they are in. Procore renders your External URL in an iframe, and what loads there is your own web app.

**Components**
- **Full Screen** — your app takes the main content area as a full-page workspace, keeping the Procore header. Users launch it from the **Apps** menu, at both Company and Project level.
- **Side Panel** — your app renders in a fixed 400‑px panel on the right side of the UI, scoped to the Procore views you choose. Because a side panel is attached to specific tools, you can tailor it to one tool or workflow. Users launch it from the dock on the right edge.

**When to use**
- You want users to act on your data without leaving the Procore tool they are working in.
- Your app's value is in its interface, rather than in moving records around in the background.
- You want the experience to follow context — the project, tool, and record the user is looking at.

**How it works**
- Procore renders your **External URL** in an iframe inside the Procore UI.
- Use **Dynamic URL Parameters** to adapt that URL to each install, with Procore's built-in values or custom values the installing administrator supplies. See [Understanding URL Parameter Interpolation]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_url_parameter_interpolation.md %}).
- A side panel can read the company, project, resource, and view it was opened in, and hand that context to your app.

**Two things to know before you choose this capability**
- Embedded components do not authenticate. The iframe loads your own web app, signed in however your product normally signs people in.
- To read or write Procore data, pair this with a Data Connector component. The side panel knows which record it was opened on; the Data Connector is what lets it fetch the detail.

See [Building Embedded Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_apps.md %}) to build either placement.
<br><br>

### Optional: Example Images

Use these examples to understand placement and layout.

<details>
<summary class="collapseListTierOne">Full Screen Example</summary>
<p>Here is an example of the full screen <a href="https://marketplace.procore.com/apps/procore-integration-for-google-sheets" target="_blank">Procore Integration for Google Sheets™</a> embedded application running in Procore.</p>
<img src="{{ site.baseurl }}/assets/guides/google-sheets-example.png" alt="Google Sheets example">
</details>

***
<details>
<summary class="collapseListTierOne">Side Panel Example</summary>
<p>Here is an example of a side panel application (contextual help) running within the Procore web UI.</p>
<img src="{{ site.baseurl }}/assets/guides/side-panel-example.png" alt="Side Panel example">
</details>
<div class="details-bottom-spacing"></div>

***
## Which Direction Your Integration Runs
Agentic work on Procore runs in two directions, and they are separate paths with separate entry points. Which one you need depends on where the conversation starts.

| | Agentic capability | Agentic APIs |
| --- | --- | --- |
| **Direction** | Procore AI reaches **out** to your app | Your system reaches **in** to Procore AI |
| **You declare** | Agents and MCP servers on an app version | Nothing on the app version |
| **Starts from** | A customer asking a question in Procore AI | Your own product or service |
| **Built for** | Marketplace and custom apps customers install | External systems that need Procore context |
| **Availability** | Closed beta, Marketplace Partners | Design Partner pilot |

The two are not exclusive. An app can offer the Agentic capability to customers working inside Procore and also call the Agentic APIs from its own backend.

For the reach-in path, see [Agentic APIs]({{ site.url }}{{ site.baseurl }}{% link announcements/agentic_apis.md %}).
<br><br>

***
## See Also
- [Building Agentic Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_agentic_apps.md %})
- [Building Data Connector Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %})
- [Building Embedded Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_apps.md %})
- [Choose an Authentication Method]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %})
{: .link-list}
<br><br>
