---
permalink: /oauth-choose-grant-type
title: Choose an Authentication Method
sub_header: Understand how Procore's two OAuth 2.0 grant types layer together, and which ones your app needs.
layout: default
section_title: Plan Your App
---

## Overview

Procore supports OAuth 2.0 with two grant types: **Authorization Code** (with a variant for installed apps) and **Client Credentials** (via Developer Managed Service Accounts).

These grants govern how your app calls the **Procore REST API**. A Data Connector app exists to do exactly that, so its two components map directly onto them. Other capabilities authenticate their own surfaces separately — an Agentic app's MCP server signs customers in through a redirect-based flow to your system, which is not one of the grants here. Any app that calls the Procore API, whatever else it does, declares Data Connector components and uses the grants below.

They are layers, not a fork. Authorization Code is the baseline — your app declares User Level Authentication and acts on behalf of a signed-in user. Client Credentials is added on top when your app also needs to reach Procore with nobody logged in. It cannot be used on its own.

Your app has one Client ID and Client Secret per environment — one pair for your Developer Sandbox, one for production — and the same credentials serve both grants. There are no separate service account credentials to manage.
<br><br>

***
## Authorization Code Grant

Use this when your app accesses Procore data on behalf of a specific Procore user. The user logs in to Procore, approves your app's access, and Procore redirects back to your app with an authorization code that you exchange for an access token. Web apps in any server-side language (Ruby, Python, Node.js, Java, etc.) use this flow.

A variant of this grant supports installed applications without a browser by using a special redirect URI (`urn:ietf:wg:oauth:2.0:oob`) that displays the authorization code on a Procore-hosted page for the user to copy.

For implementation details and step-by-step examples, see [OAuth 2.0 Authorization Code Grant Flow]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %}).
<br><br>

***
## Client Credentials Grant

Add this when your app also needs to work without a signed-in user — sync jobs, report generators, backend integrations, and webhook handlers that fire when nobody is logged in.

The Procore implementation of Client Credentials uses a **Developer Managed Service Account (DMSA)**, which carries the company- and project-level permissions your app needs. Your client credentials authenticate the app, and the DMSA's permissions determine what the app can access.

**Resolve companies and projects as the user, not as the service account.** A service account's view of what exists is not the signed-in user's view. Use the Authorization Code grant to determine which companies and projects a person can reach, then use the service account for the background work against those resources. Choose per call rather than picking one grant for your whole integration.

For implementation details, see [OAuth 2.0 Client Credentials Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %}). For DMSA setup, see [Developer Managed Service Accounts (DMSA)]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/developer_managed_service_accounts.md %}).
<br><br>

***
## Decision Tree

Still unsure after reading both grants? Match your scenario to the right one in the matrix below.

| Your scenario | Use this | Implementation guide |
|---|---|---|
| Your app acts only on behalf of a signed-in Procore user | Authorization Code grant | [OAuth 2.0 Authorization Code Grant Flow]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %}) |
| Your app has no browser and acts on behalf of a signed-in user | Authorization Code grant — Installed-App variant | [Installed-App Variant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %}#installed-app-variant-no-browser-redirect) |
| Your app also runs unattended — sync jobs, overnight webhook handlers | Authorization Code grant, plus Client Credentials via DMSA | [OAuth 2.0 Client Credentials Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %}) + [Developer Managed Service Accounts (DMSA)]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/developer_managed_service_accounts.md %}) |

<div class="details-bottom-spacing"></div>

***
## See Also
- [Building Data Connector Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}) — declare these components on an app version.
- [Developer Managed Service Accounts (DMSA)]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/developer_managed_service_accounts.md %}) — permissions, and how they behave across app updates.
- [Choose an App Type]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/building_apps_app_types.md %}) — the capabilities you can combine in one app.
{: .link-list}
<br><br>
