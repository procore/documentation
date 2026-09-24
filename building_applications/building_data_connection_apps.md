---
permalink: /building-data-connection-apps
title: Building Data Connector Applications
layout: default
section_title: Build Your App
sub_header: Learn how to build a data connector app using either User Level Authentication or Service Account Authentication.
---

## Overview
The **Data Connector** capability moves data between Procore and external platforms through the Procore REST API. You add its components to an app version in the Developer Portal, alongside any Embedded or Agentic components, and Procore governs how customers install and consent to them.

Data Connector has two components:

- **User Level Authentication** — uses the OAuth 2.0 Authorization Code flow to act on behalf of a specific user. API responses are limited by that user's permissions in Procore.
- **Service Account Authentication** — uses a Developer Managed Service Account (DMSA) and the OAuth 2.0 Client Credentials flow for automated, system-to-system communication without a user login.

Because data connector apps work entirely through the REST API, review the [API Usage Guidelines]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/api_usage_guidelines.md %}) — including rate limits and permitted usage — before you build.
<br><br>

***
## Choose an Authentication Method
These are not alternatives. **User Level Authentication is always required**, and Service Account Authentication is added on top of it when your app also needs to work without a signed-in user — a nightly sync, or a webhook handler that runs when nobody is logged in.

| | User Level Authentication | Service Account Authentication |
| --- | --- | --- |
| **OAuth Flow** | Authorization Code | Client Credentials |
| **Acts as** | A specific Procore user | A generic service account user |
| **Permissions** | Inherited from the logged-in user | Declared by you, at install |
| **Best for** | Resolving what a user can see | Server-to-server data sync |

Two things follow from this, and both shape how you write your integration.

**Your app has one Client ID and Client Secret per environment** — one pair for your Developer Sandbox, one for production. The same credentials serve both flows. You are not managing separate service account credentials.

**Resolve companies and projects as the end user, not as the service account.** A service account's view of what exists is not the user's view. Call the API with user-level authentication to determine which companies and projects a person can reach, then use the service account for the background work against those resources. Mixing the two per call, rather than picking one for the whole integration, is the pattern to build toward.

For more on the underlying flows, see [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}).
<br><br>

***
## Create a Version and Add Components
Components belong to an app version, so start by creating one.

1. Open your app in the Developer Portal and select **Create Version**.
2. Under **Components**, select **Edit Components**.
3. In the **Data Connector** group, select **User Level Authentication**. If your app also needs to act without a signed-in user, select **Service Account Authentication** as well — it cannot be used on its own.
4. Select **Save**.

Procore assigns the version number for you. Override it only if your own release numbering depends on it.

The two components behave differently from here. **User Level Authentication** shows a status of **No Config. Needed** and has no **Manage** button — adding it is all there is to do, because the signed-in user's own permissions govern what your app can reach. **Service Account Authentication** shows **Not Configured** until you declare the permissions it gets.

> **A Data Connector carried over from a previous version cannot be removed.** Decide what Procore access your app needs before you promote a version.
{: .callout .callout--note}

***
## Set Service Account Permissions
A service account interacts with Procore using a Client ID and Client Secret, independent of any signed-in user. It has only the permissions you declare, so this step defines everything your app can reach.

In the **Components** list, select **Manage** on the **Service Account Authentication** row. Under **Permissions**, work through the **Company Level** and **Project Level** tabs and set each Procore tool your app needs to **Read-only**, **Standard**, or **Admin**.

At least one tool must sit at a level other than **None** before the configuration will save.

Grant the narrowest set that still lets your app work. A customer's company administrator reviews these permissions at install, and an over-broad request is a common reason an app is refused.

Select **Save Configuration** when you are done.

For what each level allows on a given tool, see the <a href="https://support.procore.com/references/user-permissions-matrix-web" target="_blank">User Permissions Matrix</a>. For how these permissions behave when you ship an app update, see [Developer Managed Service Accounts (DMSA)]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/developer_managed_service_accounts.md %}).
<br><br>

***
<a name="define-setup-instructions"></a>
{% include setup_instructions.md %}
<br><br>

***
## Test and Validate in the Developer Sandbox
Install the version in your Developer Sandbox and confirm your API calls succeed with the credentials and permissions you declared, before you promote it. See [Install a Version in Your Developer Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/install_version_sandbox.md %}).
<br><br>

***
## Save and Promote the Version
Return to the **Create Version** screen and select **Save Version**. Promote the version when you are ready for production.

For the versioning flow itself, see [App Versioning and Update Notifications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}).
<br><br>

***
## Next Steps
- [API Usage Guidelines]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/api_usage_guidelines.md %}) — rate limits, permitted usage, and when to use REST versus Agentic APIs.
- [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}) — pick User Level versus Service Account authentication.
- [Developer Managed Service Accounts (DMSA)]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/developer_managed_service_accounts.md %}) — set up Service Account authentication.
- [Choose an App Type]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/building_apps_app_types.md %}) — how Data Connector fits among the capabilities.
{: .link-list}
<br><br>
