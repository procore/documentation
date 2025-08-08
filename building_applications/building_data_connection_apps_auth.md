---
permalink: /building-data-connection-apps-auth
title: Building User Level Authentication Applications
sub_header: Learn how to build a data connection app using User Level Authentication (OAuth 2.0) to act on behalf of a Procore user.
layout: default
section_title: Building Applications
---

## Introduction
This guide provides step-by-step instructions for building a data connection app using User Level Authentication (OAuth 2.0 Authorization Code Flow). This method allows your integration to act on behalf of a specific user, enabling secure data exchange between Procore and an external platform using a Client ID and Client Secret.

To get started, first [create a Developer Portal account and app]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_create_new.md %}).
<br><br>

***
## Add a New Data Connector Component
1. In your Developer Portal app, expand the **Data Connector Components** section.
2. Click **Add Components**.
3. Select **User Level Authentication**.
   - This option uses OAuth 2.0 Authorization Code Flow to act on behalf of a user. API responses are limited by the user’s permissions in Procore.
4. Click **Save Component**.
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
See [Installing an Application in the Development Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_sandbox_install.md %}) for step-by-step instructions.
<br><br>

***
## Promote the Updated Sandbox Manifest to Production
Once you're satisfied with testing, promote your sandbox version to production.  
See [Managing App Versions & Update Notifications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) to learn how.
