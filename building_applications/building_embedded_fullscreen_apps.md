---
permalink: /building-embedded-fullscreen-apps
title: Building Procore Full Screen Applications
layout: default
section_title: Building Applications
---

>**Note:** This article covers topics consistent with the App Manifest v4.1 format.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

## Overview

With the Procore platform, developers have the capability to develop and deploy embedded Apps that display directly within the Procore user interface.
This embedded functionality benefits the end user by enabling streamlined and more efficient workflows.
With an embedded App, the user does not need to constantly switch between Procore and another application, resulting in a more unified and improved user experience.
The behavior and settings for embedded applications are defined in the App manifest.

This article provides details on the following steps for building a full screen (embedded) application:

* [Create a New Application](#create-a-new-application)
* [Add a Full Screen Component](#add-a-full-screen-component)
  * [Specify Component Type and Application URL](#1-specify-component-type-and-application-url)
  * [Define Parameter Interpolation](#2-define-parameter-interpolation)
  * [Save the New Component](#3-save-the-new-component)
* [Define Setup Instructions and Post-Installation Notes](#define-setup-instructions)
* [Save Manifest and Create Version](#save-manifest-and-create-version)
* [Test and Validate in Development Sandbox](#test-and-validate-in-development-sandbox)
* [Promote Updated Sandbox Manifest to Production](#promote-updated-sandbox-manifest-to-production)

<a name="create-a-new-application"></a>
{% include create_application.md %}

## Add a Full Screen Component

The first step in configuring your new full screen embedded application is to add a _component_.
Note that only full screen embedded and side panel applications require that components be defined.
If you are building a data connection application based on developer managed service accounts (DMSA), you do not need to add a component in the Configuration Builder.
See [Understanding App Types]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_app_types.md %}) for additional information on application types and components.
Follow these steps to add a new full screen component.

### 1. Specify Component Type, Description, and Application URL

* Navigate to the Configuration Builder on the Manage App page, expand the Components section and click **Add Component**.
* Using the drop-down, select **Full Screen** for the component Type.
* Enter a Description for the component.
* In the URL field, specify the base web address for your application. (e.g., https://example.com/1234/12).

    ![Component Type and App URL]({{ site.baseurl }}/assets/guides/form-based-component-type-url-fields-fs.png)

### 2. Define Parameter Interpolation

{% include url_parameter_interpolation.md %}

* Add one or more custom URL Parameters to the component by clicking **Add Parameter**.

  ![Component Add Param]({{ site.baseurl }}/assets/guides/form-based-component-add-param.png)

* Define the Name, Type, Key, and Description for the custom parameter.
* Specify whether the parameter is required at time of installation.

  ![Component Add Param Field]({{ site.baseurl }}/assets/guides/form-based-component-add-param-custom.png)

* Click **Save Parameter**.

### 3. Save the New Component

* Once you have successfully created a new full screen component and defined the component Type, application URL, and URL Parameter(s), click **Save Component**.

  ![Component Save]({{ site.baseurl }}/assets/guides/form-based-component-save.png)

<a name="define-setup-instructions"></a>
{% include setup_instructions.md %}

## Save Manifest and Create Version

After completing the steps above, you're ready to save your application configuration and set your first version number.
1. Click **Save** at the top of the page.
2. The **Create Version** window appears. Enter a version number using the following syntax: **x.x.x**
Note: Your version number can only contain integers, and must consist of three (3) integers separated by a '.'. For example, '1.1.1'. Each new version you create must be a higher number than the previous version.

## Test and Validate in Development Sandbox

We recommend testing and validating each version of your application in the development sandbox environment. See [Installing an Application in the Development Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_sandbox_install.md %}) for additional information.

## Promote Updated Sandbox Manifest to Production

After you have successfully tested and validated your updated manifest in the development sandbox environment, you can promote it to the production environment.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.
