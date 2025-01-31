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

## Add a New Data Connector Component

Data connector components define how your app syncs data with Procore.
Data connector components enable you to create, update, and read data from Procore to the connected platform through a Client ID and Client Secret.
Select between User Level Authentication, Service Account Authentication, or both based on your app's functionality and security requirements.

1. Navigate to the Configuration Builder and expand the Data Connector Components section.
2. Click **Add Components**.
3. Choose a Component Type:
    - User Level Authentication - The integration will interact on behalf of a user and limit the API response body based on their Procore permissions (OAuth 2.0 authorization code).
    - Service Account Authentication - The integration will use a (DMSA) service account (OAuth 2.0 Client Credentials).
4. Selecting the Service Account Authentication component type displays a permissions builder where you can define the company level and project level tool permissions required to install and use your integration. Refer to the [User Permissions Matrix](https://support.procore.com/references/user-permissions-matrix-web) for additional information.

    ![Permission Builder]({{ site.baseurl }}/assets/guides/form-based-manifest-dmsa-perms-builder.png)

4. On the Company tab, define the required permission levels (Read Only, Standard, or Admin) for each Company level tool that is accessed by your app.
5. Repeat the previous step on the Project tab to define Project level tool permissions.
6. Click **Save Component**.
Your data connector component is updated with the permissions you defined in the permissions builder.

<a name="define-setup-instructions"></a>
{% include setup_instructions.md %}

## Create Intitial App Manifest Version

After completing the steps above, you're ready to save your app configuration in the App Manifest and set the initial version number. 
1. In the Configuration Builder, click **Create Version**.
2. Enter a version number using the following syntax: **x.x.x.**
For example, '1.1.1'.
Each new version you create must be a higher number than the previous version.
3. Click **Create**.
The new version is saved with a status of `Ready for Testing`.

[As you make ongoing changes to the app configuration during development, you can save these changes as new versions using the **Save Version** button.]

## Test and Validate in Development Sandbox

We recommend testing and validating each version of your application in the development sandbox environment. See [Installing an Application in the Development Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_sandbox_install.md %}) for additional information.

## Promote Updated Sandbox Manifest to Production

After you have successfully tested and validated your updated manifest in the development sandbox environment, you can promote it to the production environment.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.
