---
permalink: /building-apps-define-manifest
title: Creating an App Manifest
layout: default
section_title: Building Applications
---

>**Note:** This article covers topics consistent with the App Manifest v4.1 format.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

## Overview

In order to deploy an App on the Procore platform, you must create a manifest for your App on the Developer Portal.
The manifest is a JSON structure that defines the application type, relevant metadata, and specifies additional instructions that users can follow after installation.
The manifest file can also define what permissions and access rights your App requires to interact with Procore.

The Procore platform currently supports two manifest schema versions - v4.1 (current) and v3.x (legacy).
The following sections cover the steps for creating a new (v4.1) manifest and understanding its format and structure.
[Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}) desribes the differences between the legacy v3.x manifest structure and the new v4.1 structure, and covers the steps for converting a legacy manifest to v4.1.

## Creating the Initial Sandbox Manifest Version

When you create a new application on the developer portal, the system first generates a development sandbox environment for your new application, and then directs you to the Manage App page.

>**Using Your Development Sandbox Environment:**
>The development sandbox is your primary environment for learning about Procore and includes seed project data that can be used for testing purposes.
>You can install new versions of your application manifest to your sandbox environment at any time using the Saandbox App Version Key.
>See [Sandbox Environments]({{ site.url }}{{ site.baseurl }}{% link getting_started/development_environments.md %}) for additional information.

Using the Configuration Builder on the Manage App page, you can define one or more components and specify other settings for your manifest depending on the type of application you are developing.
See [Understanding App Types]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_app_types.md %}) for additional information.

![Initial Config Builder]({{ site.baseurl }}/assets/guides/form-based-initial-config-builder.png)

Refer the following articles for step-by-step instructions for configuring the initial manifest version for your application:

* [Building Procore Full Screen Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_fullscreen_apps.md %})
* [Building Procore Side Panel Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_side_panel_apps.md %})
* [Building Procore Data Connection Applications with DMSA]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %})

Note that it is also possible to develop applications that combine all three application types in a single manifest.

## Creating New Manifest Versions

After you have created the initial sandbox version of your App manifest, you can iterate through your development/test cycle and create subsequent versions as needed to address changes in your App. Complete the following steps to create additional manifest versions.

1. In the 'Manage Manifests' section, click **Create New Version**. The editor displays the content from your last manifest version.
1. Enter a new version number following the semantic versioning scheme.
1. Make changes to the manifest as needed and click **Create**.
1. Repeat Steps 1-3 for each additional manifest version you want to create.

{% include install_sandbox_version.md %}
