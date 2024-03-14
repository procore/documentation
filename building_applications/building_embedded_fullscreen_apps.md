---
permalink: /building-embedded-fullscreen-apps
title: Building Procore Embedded (Fullscreen) Applications
layout: default
section_title: Building Applications
---

>**Note:** This article covers topics consistent with the App Manifest v4.1 format.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

## Background

With the Procore platform, developers have the capability to develop and deploy embedded Apps that display directly within the Procore user interface.
This embedded functionality benefits the end user by enabling streamlined and more efficient workflows.
With an embedded App, the user does not need to constantly switch between Procore and another application, resulting in a more unified and improved user experience.
The behavior and settings for embedded applications are defined in the App manifest.
This article convers the steps for building an embedded (fullscreen) application.

## Create an Application

Open your browser and navigate to the Developer Portal landing page.
1. Click **Sign In** to log in to your Developer Portal account.
1. Navigate to the My Apps page and click **Create a New App**. The Create New App dialog displays.
1. Enter an **App Name**. This will be the name you use to refer to your app internally within your organization.
1. Click **Create**. A development sandbox is generated for your new app. You will receive an email notification when your new sandbox is ready.

## Define an App Manifest

The following sections outline the steps for defining an app manifest for a fullscreen embedded app.

### Create New Sandbox Manifest Version

Let’s start by creating a new version of our app manifest in the sandbox environment.
1. In the Developer Portal, navigate to the Manage Manifests panel for your app.
1. Make sure the Sandbox tab is selected.
1. Click **Create New Version** to display the manifest editor. You can use the editor to add an embedded component to your manifest and modify it for your specific application. The editor provides built-in validation so that you are notified when the format of your manifest does not conform to the required structure.

    ![create new manifest version]({{ site.baseurl }}/assets/guides/side-panel-create-new-manifest-version.png)

### Add a Fullscreen Embedded Component

You can add a fullscreen embedded component to the manifest using the **Inject Component** button for the `embedded` component type.

![Inject Embedded]({{ site.baseurl }}/assets/guides/inject-component-embedded.png)

A new code block is added to the manifest where you can define the structure of your embedded component.
For example:

![Embedded Snippet]({{ site.baseurl }}/assets/guides/create-new-manifest-v4.1-fullscreen-snippet.png)

See [Creating an App Manifest]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_define_manifest.md %}) for more detailed information on App manifest format and structure.
Once you have completed defining your manifest in the editor, click **Create** to save the new manifest version. 

## Promote App Manifest to Production

After you have successfully tested and validated your updated manifest in the development sandbox environment, you can promote it to the production environment.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.
