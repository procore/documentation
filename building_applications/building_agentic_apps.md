---
permalink: /building-agentic-apps
title: Building Agentic Applications
sub_header: Add Agents and MCP servers to an app version so Procore AI can reach out to your external system.
layout: default
section_title: Build Your App
---

## Overview
{% include agentic_closed_beta.md %}

The **Agentic** capability lets <strong><a href="https://v2.support.procore.com/product-manuals/procore-ai" target="_blank">Procore AI</a></strong> reach out to your external system. You add its components to an app version in the Developer Portal, alongside any Data Connector or Embedded components, and Procore governs how customers install and consent to them. Procore AI is powered by **Datagrid, a Procore Company**, which runs the Agents you declare and connects out to your external MCP server.

Agentic has two components, and you can add either or both:

- **MCPs** — an external **Model Context Protocol (MCP)** server that you host, connecting your system to Procore AI so users and Agents can query your external data alongside their Procore data.
- **Agents** — an Agent hosted in Procore AI that uses Procore data and the external tools you connect to perform user-approved actions.

When a customer asks a question in Procore AI, Procore AI invokes the Agents you declared and calls the Tools on your external MCP server to help answer it. Your external data becomes part of the answer without the customer leaving Procore AI.

Agents are not limited to answering. They can also propose changes in Procore on the customer's behalf — updating an RFI, drafting a Submittal, and similar work. Every proposed change is staged for the customer to review and approve before anything is written.

This page covers that direction, where Procore AI calls out to your app. For the opposite — your own system calling in to converse over a customer's Procore context — see [Agentic APIs]({{ site.url }}{{ site.baseurl }}{% link announcements/agentic_apis.md %}).
<br><br>

***
## Customer Requirements
> **Agentic requires Procore AI Pro or Enterprise.** Customers on any other plan can install your app but cannot use its Agentic capability.
{: .callout .callout--prereq}

This is a subscription gate on the customer's side, not something you configure. Account for it when you size your audience and when you write your Marketplace listing.

**The customer pays for every run.** Each Agent run draws credits from that customer's Datagrid pool, and their administrators see the usage attributed to your app by name. A narrow Agent that calls fewer Tools per run costs them less, which is worth weighing when you decide how much work one Agent should do.

If your app pairs Agentic with the Embedded or Data Connector capabilities, the rest of your app is unaffected. A customer without Procore AI Pro or Enterprise installs your app and uses those capabilities normally.

What they cannot do is put Agentic to work. The install succeeds and the capability appears in their Procore account, but they cannot connect it to a project, because their projects do not have Procore AI Pro or Enterprise enabled.
<br><br>

***
## Create a Version and Add Components
Components belong to an app version, so start by creating one.

1. Open your app in the Developer Portal and select **Create Version**.
2. Under **Components**, select **Edit Components**.
3. In the **Agentic** group, select **MCPs**, **Agents**, or both.
4. Select **Save**.

Procore assigns the version number for you. Override it only if your own release numbering depends on it.

Each component you added now appears in the **Components** list with a status and a **Manage** button. Adding a component does not configure it — you supply the details next, one component at a time.

The same dialog carries the **Data Connector** and **Embedded** capabilities, so you can add their components to this version too. A Data Connector carried over from a previous version cannot be removed.
<br><br>

***
## Configure Your MCP Servers
In the **Components** list, select **Manage** on the **MCPs** row, then select **Add MCP**. Each server takes two values:

1. **Name** — the display name for this server.
2. **Server URL** — the HTTPS endpoint your server listens on.

Select **Save Configuration**. You can declare up to five MCP servers on one app version — select **Add MCP** again for each.

**Your external MCP server must authenticate through a redirect-based flow.** Datagrid connects out using the OAuth 2.0 authorization code grant, so the customer signs in to your system and approves access in their own browser. Manually entered credentials and static bearer tokens are not supported at this time.

You do not list your Tools anywhere. Procore discovers them by calling `tools/list` on your external server when a customer installs your app, so the Tools a customer gets are the ones your server advertises at that moment.
<br><br>

***
## Configure Your Agents
An Agent answers questions from Procore data and the external Tools you connect, and it can propose changes back into Procore — updating an RFI, creating a draft Submittal, and similar work. Procore AI stages every proposed change for the customer to approve, so define what your Agent is allowed to propose, not only what it should know.

Select **Manage** on the **Agents** row, then select **Add Agent**. Three fields are required:

1. **Name** — the name of the Agent, up to 255 characters.
2. **Description** — what the Agent does, up to 1,000 characters.
3. **System Prompt** — directs the Agent's operational behavior. Write it the way you would brief a specialist: state the role, the work it may propose, then the rules it should follow.

Four more are optional:

- **Custom Prompt** — instructs the style and formatting of the Agent's responses.
- **Planning Prompt** — defines the planning strategy the Agent uses when breaking down tasks.
- **Connected MCP Servers** — the servers to enable for this Agent, chosen from those declared on this version.
- **Tools** — the capabilities this Agent can call.

Select **Save Configuration** when you are done. You can declare up to five Agents on one app version.

The three prompts do different jobs, and keeping them separate is what makes an Agent predictable.

| Prompt | Use it for | Length |
| --- | --- | --- |
| **System Prompt** | The Agent's role, and the rules that always hold | Short and stable |
| **Planning Prompt** | The steps to follow, and which Tools and data to use | Brief and explicit |
| **Custom Prompt** | How the answer looks — format, tone, and next steps | As detailed as you need |

Write the workflow you want rather than a list of prohibitions. A prompt that gains a new "don't" every time the Agent surprises you still leaves its actual path undefined, and each addition dilutes every rule around it. A numbered sequence in the **Planning Prompt**, closing with one sentence on what to do when a request falls outside scope, replaces most prohibitions.

Configure your MCP servers before your Agents. **Connected MCP Servers** lists only the servers already declared on this version, so an Agent cannot be attached to a server that does not exist yet.
<br><br>

***
## Save and Promote the Version
Return to the **Create Version** screen, add any **Post-Installation Instructions** a company administrator will need, and select **Save Version**. Promote the version when you are ready for production.

> **Procore AI is not available in the Developer Sandbox.** You cannot exercise Agents or MCP server Tools on a sandbox version, so treat sandbox installation as a check that the version carries the components you expect — not as a test of agent behavior.
{: .callout .callout--warning}

This is the main reason Agentic is a closed beta rather than generally available. Arrange end-to-end validation with the Marketplace team before you put an agentic version in front of customers.

For the versioning flow itself, see [Promote a Version to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}).
<br><br>

***
## See Also
- [Choose an App Type]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/building_apps_app_types.md %}) — how Agentic fits among the capabilities.
- [Agentic APIs]({{ site.url }}{{ site.baseurl }}{% link announcements/agentic_apis.md %}) — the other direction, where your system calls in to Procore AI.
- [Building Data Connector Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}) — the capability that gives your app access to Procore data.
- <a href="https://developers.procore.com/support" target="_blank">Get help</a> — reach the Marketplace, API Support, and Partner Program teams.
{: .link-list}
<br><br>
