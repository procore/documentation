---
permalink: /oauth-choose-grant-type
title: Choose an Authentication Method
sub_header: Pick the right OAuth 2.0 grant type for your app's architecture and use case.
layout: default
section_title: Plan Your App
---

## Overview

Procore supports OAuth 2.0 with two grant types: **Authorization Code** (with a variant for installed apps) and **Client Credentials** (via Developer Managed Service Accounts). Choosing the right one depends on whether your app needs access to a specific user's data and whether it can interact with a browser.

## Decision Tree

| Your scenario | Use this | Implementation guide |
|---|---|---|
| Web app that acts on behalf of a Procore user | Authorization Code grant | [OAuth 2.0 Authorization Code Grant Flow]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %}) |
| Headless app or script (no browser) that acts on behalf of a Procore user | Authorization Code grant — Installed-App variant | [Installed-App Variant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %}#installed-app-variant-no-browser-redirect) |
| Data Connection App or backend service — no specific user context required | Client Credentials grant via DMSA | [OAuth 2.0 Client Credentials Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %}) + [Developer Managed Service Accounts (DMSA)]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/developer_managed_service_accounts.md %}) |

## Authorization Code Grant

Use this when your app accesses Procore data on behalf of a specific Procore user. The user logs in to Procore, approves your app's access, and Procore redirects back to your app with an authorization code that you exchange for an access token. Web apps in any server-side language (Ruby, Python, Node.js, Java, etc.) use this flow.

A variant of this grant supports installed applications without a browser by using a special redirect URI (`urn:ietf:wg:oauth:2.0:oob`) that displays the authorization code on a Procore-hosted page for the user to copy.

> **Note:** When you create a new app on the Developer Portal, OAuth 2.0 credentials for the Authorization Code grant are provided automatically. You don't need to specify a grant type during app configuration.

For implementation details and step-by-step examples, see [OAuth 2.0 Authorization Code Grant Flow]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %}).

## Client Credentials Grant

Use this when your app accesses Procore data without acting on behalf of a specific user — for example, sync jobs, report generators, backend integrations, and Data Connection Apps.

The Procore implementation of Client Credentials uses a **Developer Managed Service Account (DMSA)**, which carries the company- and project-level permissions your app needs. Your client credentials authenticate the app, and the DMSA's permissions determine what the app can access.

For implementation details, see [OAuth 2.0 Client Credentials Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %}). For DMSA setup, see [Developer Managed Service Accounts (DMSA)]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/developer_managed_service_accounts.md %}).
