---
permalink: /building-apps-v3x-v41-manifest-migration
title: Migrating an App Manifest from v3.x to v4.1
layout: default
section_title: Building Applications
---

## Background

The schema for the App manifest has been updated to more easily support multiple component types and simplify the way OAuth 2.0 authentication is configured.
This article describes the differences between the new v4.1 version of the App manifest and the legacy v3.x App manifest version.
Steps are outlined for migrating an existing manifest from the legacy version to the new v4.1 version.

## What’s different about the v4.1 App Manifest schema version?

App Manifest v4.1 offers a more simplified structure and editing experience.
You can quickly define embedded (fullscreen) components, side panel components, and tool access permissions for data connection components by injecting code blocks using the manifest editor.
In addition, you no longer have to explicitly specify the OAuth 2.0 authentication grant type in the manifest.
The single set of OAuth credentials established when you create a new application can be used for making API calls using any OAuth grant type that Procore supports.

## How do I migrate my legacy v3.x manifest to v4.1?

Here are the steps for migrating an existing v3.x manifest to the new v4.1 format.

1. Make a backup copy of the v3.x manifest as a text file before proceeding.
You’ll refer to this file later for copying relevant information into the new manifest.
2. Create a new sandbox manifest version as described in [Create an App Manifest]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_define_manifest.md %}). The previous version of the manifest is automatically converted to the v4.1 format and includes an initial code block to work with.
3. Add data connection, embedded (fullscreen), or side panel components to the manifest as needed using the available buttons in the manifest editor.
Using your backup manifest copy as a reference, edit the definitions and attributes in the new version to be consistent with your previous version.

As a result of simplifying the schema, a number of v3.x attributes have been removed and are no longer applicable to the new version.

- The `components:iframe:instances` nested keys previously used to define embedded and side panel components are no longer needed.
With v4.1, embedded and side panel components are declared directly at the top level of the manifest using the fullscreen and sidepanel keys.
See [Building Procore Embedded (Fullscreen) Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_fullscreen_apps.md %}) and [Building Procore Side Panel Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_side_panel_apps.md %}) for additional information.
- The `components:oauth:instances` nested keys previously used to define OAuth grant types (i.e., client_credentials, authorization_code) are no longer needed.
With v4.1, the grant type does not need to be explicitly declared. See [Building Procore Data Connection Applications with DMSA]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}) for more information.
