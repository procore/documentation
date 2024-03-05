---
permalink: /building-data-connection-apps
title: Building Procore Data Connection Applications with DMSA
layout: default
section_title: Building Applications
---

>**Note:** This article covers topics consistent with the App Manifest v4.1 format.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

## Overview

The following sections provide step-by-step instructions for creating a new data connection App that utilizes a [Devloper Managed Service Account (DMSA)]({{ site.url }}{{ site.baseurl }}{% link building_applications/developer_managed_service_accounts.md %}).

{% include create_application.md %}

## Define an App Manifest

The following sections outline the steps for defining an App manifest for a data connection application.

### Create New Sandbox Manifest Version

Let’s start by creating a new version of our App manifest in the sandbox environment.
1. In the Developer Portal, navigate to the Manage Manifests panel for your app.
1. Make sure the Sandbox tab is selected.
1. Click **Create New Version** to display the manifest editor.
You can use the editor to add a data connection component to your manifest and modify it for your specific application.
The editor provides built-in validation so that you are notified when the format of your manifest does not conform to the required structure.

    ![create new manifest version]({{ site.baseurl }}/assets/guides/side-panel-create-new-manifest-version.png)

### Specify Tool Permissions Using Permission Builder

Next, use the Permission Builder to specify the company level and project level tool permissions that are required to install and use your application.

1. On the Create New Version panel, click **Open Builder** to display the Permission Builder.

    ![Permission Builder]({{ site.baseurl }}/assets/guides/dmsa-perms-builder.png)

1. On the Company tab, define the required permission levels (Read Only, Standard, or Admin) for each tool that is accessed by your App.
1. Repeat the previous step on the Project tab to define project tool permissions.
1. Click **Update Manifest**.
Your manifest is updated with the permissions you defined in the Permission Builder.

    ![Manifest Permissions]({{ site.baseurl }}/assets/guides/dmsa-injected-perms.png)

1. Click **Create** in the manifest editor to save your updates and create the new version of your manifest.

### Promote Updated Sandbox Manifest to Production

After you have successfully tested and validated your updated manifest in the development sandbox environment, you can promote it to the production environment.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.
