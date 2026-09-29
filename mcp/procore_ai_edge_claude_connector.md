---
permalink: /procore-ai-edge-claude-connector
title: Procore AI Edge Connector for Claude
layout: default
section_title: MCP Integration
sub_header: Ask Claude about your Procore projects. The connector gives Claude read-only access to RFIs, submittals, observations, daily logs, drawings, specifications, and more.
# Release gate (DGAAI-986). This page is kept off the public site until launch:
#   published: false             -> GitHub Pages does not build the page at all (no URL, no raw .md).
#                                   Preview locally with `bundle exec jekyll serve --unpublished`.
#   published: true + noindex    -> Unlisted: the URL works (for Anthropic Directory review and
#                                   internal sign-off) but the page is not in the sidebar and asks
#                                   search engines not to index it.
#   Launch                       -> remove `published` and `noindex`, and add the page to
#                                   _data/navigation.yml.
published: false
noindex: true
---

{% comment %}
TODO before launch (remove this block when resolved):
- Naming: confirm "Procore AI Edge" vs. the public product name with product/marketing (DGAAI-986 acceptance criteria).
- Zones: confirm the supported zones and whether the Directory listing uses one URL or several (DGAAI-993).
- Privacy: replace the privacy links with the policy approved by Legal, including the Datagrid disclosure (DGAAI-987).
- Support: confirm the support contact and security disclosure channel (DGAAI-992).
- Claude UI: re-check the menu names in the "Connect" and "Disconnect" steps against the current Claude apps.
{% endcomment %}

## Overview

The **Procore AI Edge connector** links [Claude](https://claude.ai) to your Procore account through the [Model Context Protocol](https://modelcontextprotocol.io/) (MCP). Once connected, you can ask Claude questions about your Procore projects in plain language, such as "Which RFIs on the Main Street project are overdue?", and Claude looks up the answer in Procore for you.

The connector is **read-only**. It reads Procore data and does not create, update, or delete anything in Procore. Write actions are turned off for this connector.

Claude can read the Procore data you already have permission to see, including:

- RFIs and submittals
- Observations, inspections, and punch items
- Daily logs and meetings
- Drawings, specifications, and photos
- Projects, companies, and the project directory

The connector signs you in as yourself, so it respects your existing Procore permissions. Claude cannot see a project, tool, or record that you cannot see in Procore.

---

## Prerequisites

Before you connect, make sure you have the following:

| Requirement | Details |
|---|---|
| **Procore account** | A Procore user account that signs in with single sign-on (SSO). |
| **Datagrid account** | The connector runs on Datagrid, Procore's AI agent platform. You need a Datagrid account in a teamspace that your Datagrid admin has connected to Procore. Your admin connects Procore once, and everyone in the teamspace can then use it. |
| **Access enabled** | During the initial release, access is enabled per user. If you are not enabled yet, sign-in ends with an `access_denied` error. See [Troubleshooting](#troubleshooting). |
| **Supported zone** | Your Procore company must be in a supported zone. See [Supported zones](#supported-zones). |
| **Claude plan** | A Claude plan that supports connectors. On Claude Team and Enterprise plans, an owner may need to allow connectors for your organization first. |

> **Credits:** `procore_read` and `converse` each run a Datagrid agent task, so every call uses Datagrid credits from your teamspace. Narrow questions, such as one project, one type of record, or a short list, use fewer credits than broad ones. `health` and `whoami` do not use credits.

### Supported zones

| Zone | Procore URL | MCP server URL |
|---|---|---|
| US01 | `app.procore.com` | `https://app.procore.com/rest/v1.0/mcp` |
| US02 | `us02.procore.com` | `https://us02.procore.com/rest/v1.0/mcp` |

Other zones are not supported yet.

---

## Connect Claude to Procore

1. In Claude, open **Settings** → **Connectors**.
2. Click **Browse connectors** and search for **Procore AI Edge**.
3. Click **Connect**. Claude opens a Procore sign-in window.
4. Sign in with your Procore account. You are redirected through Datagrid, which connects your sign-in to your Datagrid teamspace.
5. When sign-in finishes, you are returned to Claude and the connector shows as connected.

To check the connection, start a new chat and ask:

> "Use the Procore AI Edge connector to tell me who I'm signed in as."

Claude calls the `whoami` tool and replies with your Datagrid user and teamspace. If it fails, see [Troubleshooting](#troubleshooting).

### Connect with a custom connector URL

If your organization adds connectors by URL, or your company is in US02, add the connector as a custom connector:

1. In Claude, open **Settings** → **Connectors** and click **Add custom connector**.
2. Enter a name, such as `Procore`, and the [MCP server URL](#supported-zones) for your zone.
3. Click **Add**, then **Connect**, and sign in as described above.

---

## Disconnect and revoke access

To stop Claude from reading your Procore data:

1. In Claude, open **Settings** → **Connectors**.
2. Select **Procore AI Edge** and click **Disconnect**.

Disconnecting deletes the sign-in tokens that Claude stores for the connector. Claude can no longer call the connector until you connect again.

If you think your access was used without your permission, or you want your access removed on the Procore side too, contact [support](#support).

---

## Tools

The connector gives Claude four tools. You do not call them yourself: Claude chooses a tool based on your question.

| Tool | What it does | Changes data? |
|---|---|---|
| `procore_read` | Lists, searches, or opens one type of Procore record, such as open RFIs on a project or a single submittal. Claude uses this tool for most questions. | No |
| `converse` | Handles questions that span several kinds of Procore records or take several steps, such as "Which open submittals are holding up the structural package, and which RFIs are they waiting on?". Answers can take longer. | No |
| `whoami` | Confirms that the connection works and shows the Datagrid user and teamspace you are signed in as. | No |
| `health` | Confirms that the connector's server is running. | No |

Every tool is read-only.

---

## Example prompts

Try these prompts after you connect. Replace the project names with your own.

1. **Find overdue RFIs**
   > "List the open RFIs on the Main Street Tower project that are past their due date, with who each one is assigned to."

2. **Summarize a daily log**
   > "Summarize yesterday's daily log for the Harbor View project: weather, crew counts, and any delays."

3. **Connect submittals and RFIs**
   > "Which submittals on the Riverside Clinic project are still waiting on review, and are any of them tied to open RFIs?"

If you have access to more than one Procore company or project, name the project in your prompt. You can also ask Claude "What Procore projects can I see?" first.

---

## Troubleshooting

| Symptom | Likely cause | What to do |
|---|---|---|
| Sign-in ends with `access_denied` and "Procore SSO is not enabled for this user." | Your user is not enabled for the connector yet. | Ask your Procore admin or [support](#support) to enable access for your email address, then connect again. |
| Sign-in ends with `access_denied` and "User identity could not be determined." | Sign-in did not return an email address that could be checked for access. | Try connecting again. If it keeps happening, contact [support](#support). |
| Sign-in ends with "Could not verify user eligibility. Please retry." | A temporary error while checking your access. | Wait a minute and connect again. |
| Claude says no Procore company could be found, or project questions fail | Your Datagrid teamspace is not connected to a Procore company, or it is connected to a different one. | Ask your Datagrid admin to connect Procore to your teamspace. You can also name the company or project in your prompt, or ask Claude "What Procore companies can I see?" first. |
| `whoami` fails, or Claude says the connector is unauthorized | Your sign-in expired or was revoked. | Disconnect and connect the connector again. |
| Responses are slow | Each question runs an AI agent over your Procore data. Broad questions and multi-step `converse` questions can take a minute or more. | Ask narrower questions: name one project, one type of record, and the fields you need. |
| Claude cannot find a record that you can see in Procore | Your company is in an unsupported zone, or the record is in a different company or project than the one Claude used. | Check [Supported zones](#supported-zones), and name the company and project in your prompt. |

---

## Privacy and data use

The connector reads Procore data on your behalf, only when Claude calls one of its tools in response to your request. Requests are processed by Datagrid, Procore's AI agent platform. The connector's server does not log your prompts or the Procore data it returns.

{% comment %}TODO(DGAAI-987): add the Legal-approved description of Datagrid processing and retention, and any subprocessors (Gemini, Cognito, Sentry).{% endcomment %}

For details on how Procore handles your data, see the [Procore Privacy Notice](https://www.procore.com/legal/privacy). For how Anthropic handles data in Claude, see [Anthropic's Privacy Policy](https://www.anthropic.com/legal/privacy).

---

## Support

For help with the connector, contact [apisupport@procore.com](mailto:apisupport@procore.com). Include the approximate time of the problem, your Procore zone, and any error message you saw. Do not include passwords or tokens.
