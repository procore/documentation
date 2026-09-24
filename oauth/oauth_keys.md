---
permalink: /oauth-keys
title: OAuth Credentials Management
layout: default
section_title: Manage & Monitor Your App
---

## Overview
> **Keep your Client Secret confidential — never ship it in client-side code.** Single-page (JavaScript) and native apps can't protect a secret, so plan accordingly and do not use Client Credentials as your grant type.
{: .callout .callout--warning}

Your app works with two sets of OAuth credentials — one for your **Developer Sandbox**, and one for **production**, which is also what you use in the On-Demand and Monthly Sandbox environments.

Neither set is issued when you register the app. Credentials follow the Data Connector component, because that component is what gives an app a reason to call the Procore API:

- **Sandbox credentials** are generated once a version carries a Data Connector component.
- **Production credentials** are populated once you promote a version to production **with** a Data Connector component in it. Promotion alone is not enough.

Until then the panels are empty, and there is nothing to collect. See [Building Data Connector Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}) to add the component, and [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for the promotion flow.

You will use your Client IDs, which are considered public information, to build login URLs or include in Javascript source.
Your Client Secrets, on the other hand, must be kept confidential.

Once a user successfully authorizes your app to access their data in Procore, the Procore authorization server redirects them back to your app with either an authorization code or access token in the URL depending on the particular [OAuth 2.0 _grant type_]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}) you have implemented.
To ensure that the user's browser is directed back to the proper location, you are required to define one or more _Redirect URIs_ for your application.
You can optionally manage two distinct sets of Redirect URIs for the sandbox and production environments, though this is not required.
The `http://localhost` redirect URI is registered by default when you create a new application in the Developer Portal. Please note that dynamic URIs are not supported at this time.

The **Credentials** tab of your app carries both sets, in two panels: **Developer Sandbox OAuth Credentials** and **Production OAuth Credentials**.

## Manage Sandbox Credentials
Use the **Developer Sandbox OAuth Credentials** panel while you build and test. It holds your sandbox Client ID, your Sandbox URL, the Redirect URI, and the Client Secret. Select **Reset Client Secret** to roll the secret, and **Edit** beside the Redirect URI to change where Procore sends users after they authorize your app.

<!--
Screenshot removed 2026-09-24: assets/guides/form-based-sandbox-oauth-creds.png predates the
Credentials tab. It shows a panel titled "Sandbox OAuth Credentials", an editable Redirect URI
textarea with an Update button, and an "App is set to Authorization Code Grant Type" line -
none of which are in the current UI. Replace with a capture of the Developer Sandbox panel.
-->

## Manage Production Credentials
Use the **Production OAuth Credentials** panel for your live app, and in the On-Demand and Monthly Sandbox environments. Only the Developer Sandbox uses a separate pair.

The panel appears populated once you promote a version carrying a Data Connector component. It holds your production Client ID and the Redirect URI, with an **Edit** control beside it.

The Client Secret is a separate, deliberate step. Until you create one the panel reads **No Client Secret generated yet**, alongside a **Generate Client Secret** button. Once generated, the secret is masked and that button becomes **Reset Client Secret**.

<!--
Screenshot removed 2026-09-24: assets/guides/form-based-production-oauth-creds.png predates the
Credentials tab. Replace with a capture of the Production panel.
-->

