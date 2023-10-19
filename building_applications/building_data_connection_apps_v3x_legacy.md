---
permalink: /building-data-connection-apps-legacy-v3
title: Building Procore Data Connection Applications with DMSA (legacy manifest v3.2)
layout: default
section_title: Building Applications
---

## Overview

The following sections provide step-by-step instructions for creating a new data connection App that utilizes a DMSA.
You can also view this short <script src="https://fast.wistia.com/embed/medias/1agpq2yo6o.jsonp" async></script><script src="https://fast.wistia.com/assets/external/E-v1.js" async></script><span class="wistia_embed wistia_async_1agpq2yo6o popover=true popoverContent=link" style="display:inline-block; white-space:nowrap;"><a href="#">video demonstration</a></span> that walks through the process.

### Create a New App

(Note: If you have an existing App that does not currently have an OAuth component defined in the manifest, you do not need to create a new App.
You can skip this step and use your existing App.)

1. Open your browser and navigate to the Developer Portal landing page.
1. Click **Sign In** to log in to your Developer Portal account.
1. Navigate to the My Apps page and click **Create a New App**.
The Create New App dialog displays.
1. Enter an **App Name**.
This will be the name you use to refer to your application internally within your organization.
1. Click **Create**.
A development sandbox is generated for your new App.
You will receive an email notification when your new sandbox is ready.

### Add OAuth Component with ‘client_credentials’ Grant Type

DMSA-enabled data connection Apps specify the OAuth component grant type as `client_credentials` in your App manifest.
Use the following steps to add an OAuth component to the manifest and define the grant type.
See [Creating an App Manifest]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_define_manifest.md %}) for additional information on manifest structure and format.

1. In the Developer Portal, navigate to the Manage Manifests panel for your App.
1. Click **Create New Version**.
1. To add an OAuth component to your manifest, click **Copy Code Snippet** under Data Connection.

    ![Copy Code Snippet]({{ site.baseurl }}/assets/guides/dmsa-code-snippet.png)

1. Paste the code snippet into the manifest editor in the `components` section.
1. Enter `client_credentials` for the component `grant_type`.

    ![Manifest Client Credentials]({{ site.baseurl }}/assets/guides/dmsa-manifest-client-credentials.png)

### Specify Tool Permissions Using Permission Builder

Once you have defined the grant type for your OAuth component as `client_credentials`, you can use the Permission Builder to specify the company level and project level tool permissions that are required to install and use your application.

1. On the Create New Version panel, click **Open Builder** to display the Permission Builder.

    ![Permission Builder]({{ site.baseurl }}/assets/guides/dmsa-perms-builder.png)

1. On the Company tab, define the required permission levels (Read Only, Standard, or Admin) for each tool that is accessed by your App.
1. Repeat the previous step on the Project tab to define project tool permissions.
1. Click **Update Manifest**.
The OAuth component in your manifest is updated with the permissions you defined in the Permission Builder.

    ![Manifest Permissions]({{ site.baseurl }}/assets/guides/dmsa-injected-perms.png)

1. Click **Create** to save your updates and create the new version of your manifest.

### Promote Updated Sandbox Manifest to Production

After you have successfully tested and validated your updated manifest in the development sandbox environment, you can promote it to the production environment and use your production OAuth credentials with your App.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.