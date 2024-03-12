---
permalink: /building-data-connection-apps
title: Building Procore Data Connection Applications with DMSA
layout: default
section_title: Building Applications
---

>**Note:** This article covers topics consistent with the App Manifest v4.1 format.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

## Overview

The following sections provide step-by-step instructions for creating a new data connection app manifest that utilizes a [Devloper Managed Service Account (DMSA)]({{ site.url }}{{ site.baseurl }}{% link building_applications/developer_managed_service_accounts.md %}).

This article provides details on the following steps for creating a new data connection application:

* [Create a New Application](#create-a-new-application)
* [App Configurations](#app-configurations)
* [Components](#components)
* [Specify Tool Permissions Using Permission Builder](#specify-tool-permissions-using-permission-builder)
* [Enter Instructions and Post-Installation Notes](#enter-instructions-and-post-installation-notes)
* [Save Manifest and Create Version](#save-manifest-and-create-version)
* [Promote Updated Sandbox Manifest to Production](#promote-updated-sandbox-manifest-to-production)

<a name="create-a-new-application">
{% include create_application.md %}

## App Configurations

The following sections outline the steps for configuring a data connection app manifest.

### Components

Once you have created your app manifest, the first option you see is **Add Componenet**. When creating a data connection app, you do not need to add any components. For this type of application, you'll begin by congifuring permissions for your app.

### Specify Tool Permissions Using Permission Builder

Use the Permission Builder to specify the Company level and Project level tool permissions that are required to install and use your application.

1. Expand the **Permissions** section of the page.
2. Click **Edit** to open the permissions builder and select the appropriate permissions for your application.

    ![Permission Builder]({{ site.baseurl }}/assets/guides/form-based-manifest-dmsa-perms-builder.png)

3. On the Company tab, define the required permission levels (Read Only, Standard, or Admin) for each Company level tool that is accessed by your app.
4. Repeat the previous step on the Project tab to define Project level tool permissions.
5. Click **Save**.
Your application is updated with the permissions you defined in the Permission Builder.

### Enter Instructions and Post-Installation Notes

Complete the required fields as follows:
1. **Instructions URL**. Enter the URL where users can find instructions for your application.
2. **Instructions Page Name**. Enter text that will appear as the label for your Instructions URL.
3. **Post-Installation Notes**. Enter a text description of any post-installation steps required to properly complete setup of the app.

### Save Manifest and Create Version

After completing the steps above, you're ready to save your app's configurations and set your first version number. 
1. Click **Save** at the top of the page.
2. The **Create Version** window appears. Enter a version number using the following syntax: **x.x.x.**
Note: Your version number can only contain integers, and must consist of three (3) integers separated by a '.'. For example, '1.1.1'. Each new version you create must be a higher number than the previous version.

### Promote Updated Sandbox Manifest to Production

After you have successfully tested and validated your updated manifest in the development sandbox environment, you can promote it to the production environment.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.
