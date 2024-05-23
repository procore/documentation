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
* [Specify Tool Permissions Using Permission Builder](#specify-tool-permissions-using-permission-builder)
* [Define Setup Instructions and Post-Installation Notes](#define-setup-instructions)
* [Save Manifest and Create Version](#save-manifest-and-create-version)
* [Promote Updated Sandbox Manifest to Production](#promote-updated-sandbox-manifest-to-production)

<a name="create-a-new-application">
{% include create_application.md %}

>**Note:** When creating a data connection application using DMSA, you do not need to add any components. For this type of application, you will begin by configuring tool permissions.

## Specify Tool Permissions Using Permission Builder

Use the Permission Builder to specify the Company level and Project level tool permissions that are required to install and use your application. Refer to the [User Permissions Matrix](https://support.procore.com/references/user-permissions-matrix-web) for additional information.

1. Navigate to the Configuration Builder on the Manage App page.
2. Expand the **Permissions** section of the page.
3. Click **Add Permissions** to open the permissions builder and select the appropriate permissions for your application.

    ![Permission Builder]({{ site.baseurl }}/assets/guides/form-based-manifest-dmsa-perms-builder.png)

4. On the Company tab, define the required permission levels (Read Only, Standard, or Admin) for each Company level tool that is accessed by your app.
5. Repeat the previous step on the Project tab to define Project level tool permissions.
6. Click **Save Permissions**.
Your application is updated with the permissions you defined in the Permission Builder.

<a name="define-setup-instructions"></a>
{% include setup_instructions.md %}

## Save Manifest and Create Version

After completing the steps above, you're ready to save your application configuration and set your first version number. 
1. Click **Save** at the top of the page.
2. The **Create Version** window appears. Enter a version number using the following syntax: **x.x.x.**
Note: Your version number can only contain integers, and must consist of three (3) integers separated by a '.'. For example, '1.1.1'. Each new version you create must be a higher number than the previous version.

## Test and Validate in Development Sandbox

We recommend testing and validating each version of your application in the development sandbox environment. See [Installing an Application in the Development Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_sandbox_install.md %}) for additional information.

## Promote Updated Sandbox Manifest to Production

After you have successfully tested and validated your updated manifest in the development sandbox environment, you can promote it to the production environment.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.
