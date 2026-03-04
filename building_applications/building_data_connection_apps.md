---
permalink: /building-data-connection-apps
title: Building Service Account Authentication Applications
layout: default
section_title: Building Applications
sub_header: Learn how to build a data connection app using a Developer Managed Service Account (DMSA) for automated system-to-system data exchange.
---

## Introduction
This guide provides step-by-step instructions for building a data connection app using Service Account Authentication (OAuth 2.0 Client Credentials). This method allows your integration to interact with the Procore API using system credentials—without requiring user login. These apps use Procore's Developer Managed Service Account (DMSA) model and are ideal for server-to-server communication.

To get started, first [create a Developer Portal account and app]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_create_new.md %}).
<br><br>

***
## Add a New Data Connector Component
1. In your Developer Portal app, expand the **Data Connector Components** section.
2. Click **Add Components**.
3. Select **Service Account Authentication** and **User Level Authentication**.
   - This option uses a Developer Managed Service Account (DMSA) and the OAuth 2.0 Client Credentials Flow to allow system-level access.
4. Use the **Permissions Builder** to define the required company- and project-level tool permissions your app needs.
   - Refer to the [User Permissions Matrix](https://support.procore.com/references/user-permissions-matrix-web) for more details.
5. Click **Save Component**.

![Permission Builder]({{ site.baseurl }}/assets/guides/form-based-manifest-dmsa-perms-builder.png)
<br><br>

***
<a name="define-setup-instructions"></a>
{% include setup_instructions.md %}
<br><br>

***
## Create the Initial App Manifest Version
After configuring your component, you're ready to save your first app version.

1. In the Configuration Builder, click **Create Version**.
2. Enter a semantic version number (e.g., `0.1.0`).  
   - For details, see [Managing App Versions & Update Notifications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}).
3. Click **Create**.

The version will be saved with the status **Ready for Testing**. As you continue development, click **Save Version** to capture changes.
<br><br>

***
## Test and Validate in the Development Sandbox
Test and validate each version of your app in your Development Sandbox before releasing it to production.
For details on setting up your sandbox, see the [Quick Start Guide]({{ site.url }}{{ site.baseurl }}{% link overview/quick_start_guide.md %}).
<br><br>

***
## Promote the Updated Sandbox Manifest to Production
Once you're satisfied with testing, promote your sandbox version to production.  
See [Managing App Versions & Update Notifications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) to learn how.
