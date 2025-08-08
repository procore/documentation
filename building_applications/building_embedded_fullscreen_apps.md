---
permalink: /building-embedded-fullscreen-apps
title: Building Full Screen Embedded Applications
sub_header: Learn how to build and configure a full screen embedded application in the Procore Developer Portal.
layout: default
section_title: Building Applications
---

## Introduction
This guide walks you through building a full screen embedded application in Procore. Embedded apps appear directly within the Procore user interface, enabling seamless user workflows without switching between platforms. These apps are defined using the Procore App Manifest and configured through the Developer Portal’s Configuration Builder.

To get started, first [create a Developer Portal account and app]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_create_new.md %}).
<br><br>

***
## Add a New Full Screen Component
Full screen apps require a URL to define which page appears in the Procore UI. Follow the steps below to configure a full screen component.

### 1. Specify Component Type, Description, and Application URL
1. In the Configuration Builder on the Manage App page, expand the **Components** section and click **Add Component**.
2. From the drop-down list, select **Full Screen** for the Type.
3. In the URL field, enter the base web address for your application (e.g., `https://example.com/1234/12`).

### 2. Define Parameter Interpolation
URL parameter interpolation allows you to insert variable data into a URL. In the context of Procore embedded applications, this technique passes dynamic values into the app’s URL so the app can respond to specific company or project contexts.

This is commonly used in HTTP GET requests, where data is passed in the URL. Interpolation makes these values dynamic—changing based on the user’s context or custom setup.

To learn more about this feature, see [Understanding URL Parameter Interpolation]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_url_parameter_interpolation.md %}).

### 3. Save the New Component
After defining the component type, application URL, and URL parameter(s), click **Save Component**.
<br><br>

***
<a name="define-setup-instructions"></a>
{% include setup_instructions.md %}
<br><br>

***
## Create the Initial App Manifest Version
After configuring your component, you're ready to save your app version.

1. In the Configuration Builder, click **Create Version**.
2. Enter a semantic version number (e.g., `0.1.0`).  
   - For details, see [Managing App Versions & Update Notifications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}).
3. Click **Create**.

The version will be saved with the status **Ready for Testing**. As you continue development, click **Save Version** to capture new changes.
<br><br>

***
## Test and Validate in the Development Sandbox
Test and validate each version of your app in your development sandbox before releasing it to production.  
See [Installing an Application in the Development Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_sandbox_install.md %}) for step-by-step instructions.
<br><br>

***
## Promote the Updated Sandbox Manifest to Production
Once you're satisfied with testing, promote your sandbox version to production.  
See [Managing App Versions & Update Notifications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) to learn how.
