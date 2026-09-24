---
permalink: /oauth-keys
title: OAuth Credentials Management
layout: default
section_title: Manage & Monitor Your App
---

## Overview
> **Keep your Client Secret confidential — never ship it in client-side code.** Single-page (JavaScript) and native apps can't protect a secret, so plan accordingly and do not use Client Credentials as your grant type.
{: .callout .callout--warning}

Once you have registered a new application on the Developer Portal you will work with two sets of OAuth credentials - one set for your _development sandbox_ and a separate set for the _production environment_.
Initially during the development phase, you use the sandbox credentials to make API calls to your sandbox company account.
Once you have promoted your sandbox application manifest to production, you will have access to your production credentials.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.
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
Use the **Production OAuth Credentials** panel for your live app. The same credentials also work in the On-Demand and Monthly Sandbox environments — only the Developer Sandbox uses a separate pair.

A production Client Secret is not created for you. The panel reads **No Client Secret generated yet** until you select **Generate Client Secret**.

<!--
Screenshot removed 2026-09-24: assets/guides/form-based-production-oauth-creds.png predates the
Credentials tab. Replace with a capture of the Production panel.
-->

