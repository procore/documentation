---
permalink: /building-apps-create-new
title: Creating an App
sub_header: Set up your account, build your first app, and configure your App Manifest to start developing in Procore.
layout: default
section_title: Building Applications
---

## Introduction
Whether you're a Procore customer or a Technology Partner, you can use the Procore Developer Portal to build apps that embed external systems in Procore or interact directly with its API. This guide walks you through creating your Developer Portal account and building your first app.
<br><br>

***
## 1. Create an Account
Start by registering for a Procore Developer Portal account. Once registered, you can create your first app.

1. Open your browser and go to the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a>.
2. Click **Sign Up** and fill out the required fields: first name, last name, and email.
3. Set and confirm your password.
4. (Optional) Enter your company name.
5. Complete the reCAPTCHA.
6. Click **Create Free Account**, then check your inbox for a verification email.
<br><br>

***
## 2. Create an App
Follow these steps to create a new app in the Developer Portal:

1. Go to the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a> and sign in to your account.
2. Navigate to the **My Apps** page and click **Create a New App**.
3. Enter an app name. The first name you choose is important, so label it carefully.
4. Click **Create**.

When you create a new app, a Developer Sandbox is automatically provisioned for building and testing with sample project data. You can access it by checking the **OAuth Credentials** section of your app or by following the link in the email sent to the app creator.

For detailed instructions on installing your app in the Developer Sandbox, see <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app" target="_blank">Install a Custom App</a>.
<br><br>

***
## 3. App Manifest Overview
After creating your app, use the Configuration Builder to choose the components you want to include. These components define your app’s functionality in Procore and make up the App Manifest. Each saved set of changes becomes a new app version.

Based on the components you select, you can build:
- [User Level Authentication Apps]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps_auth.md %})
- [Service Account Authentication Apps]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %})
- [Full Screen Embedded Apps]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_fullscreen_apps.md %})
- [Side Panel Embedded Apps]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_side_panel_apps.md %})

You can also combine multiple app types in a single manifest.

### Create New Manifest Versions
After your initial version, you can continue iterating by creating new app versions:

1. In the Configuration Builder, make any necessary changes, such as updating permissions or modifying components.
2. Click **Save Version** and enter a version number.
3. After saving, you'll receive a new Sandbox App Version Key. Use this key to install and test the new version in your Developer Sandbox.
4. When you are satisfied with the updates, click **Promote Version** to move it to production.

For more information on app versions, see [App Versioning and Update Notifications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_versioning.md %}).
<br><br>

***
## Explore Our Resources
- [Managing App Collaborators]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_manage_collabs.md %})
- [Understanding App Types]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_app_types.md %})
- [Managing App Versions & Update Notifications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %})