---
permalink: /building-apps-define-manifest-v41
title: Creating an App Manifest
layout: default
section_title: Building Applications
---

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/documentation/building-apps-create-new" />
  </head>
  <body>
    <p>If you are not redirected, <a href="/documentation/building-apps-create-new">click here</a>.</p>
  </body>
</html>

<!-- >**Note:** This article covers topics consistent with the App Manifest v4.1 format.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

## Overview

In order to deploy an App on the Procore platform, you must create a manifest for your App on the Developer Portal.
The manifest is a JSON structure that defines the application type, relevant metadata, and specifies additional instructions that users can follow after installation.
The manifest file can also define what permissions and access rights your App requires to interact with Procore.

The Procore platform currently supports two manifest schema versions - v4.1 (current) and v3.x (legacy).
The following sections cover the steps for creating a new (v4.1) manifest and understanding its format and structure.
[Migrating an App Manifest from v3.x to v4.1]() desribes the differences between the legacy v3.x manifest structure and the new v4.1 structure, and covers the steps for converting a legacy manifest to v4.1.

## Understanding URL Parameter Interpolation

_URL Parameter Interpolation_ is a method used in web development to insert variable data into a URL.
In the context of a Procore integration application, it is used to add specific values to the URL that can then be used to request specifc data from the application server.
This technique is often used in HTTP GET requests, where data is passed as parameters in the URL itself.

Interpolation comes into play when these parameter values are dynamic - that is, they change based on user input or some other variable.
Developers can use interpolation to insert these variable values into the URL.
The Procore platform supports URL parameter interpolation for different sections of the URL, which you define in the App manifest using a double curly brace syntax.
You can interpolate values for the URL subdomain, path paramters, and query parameters. 

**Subdomain**
```{% raw %}
https://{{subdomain}}.domain.com
{% endraw %}```

**Path Parameters**
```{% raw %}
https://example.domain.com/{{my_path1}}/{{my_path2}}
{% endraw %}```

**Query Parameters**
```{% raw %}
?companyId={{procore.company.id}}&companyName={{procore.company.name}}&projectId={{procore.project.id}}&projectName={{procore.project.name}}&customField={{CustomField}}
{% endraw %}```

The Procore platform provides the following builtin variables for use as query parameters.

- `procore.company.id` - ID of the company where the App is installed.
- `procore.company.name` - Name of the company where the App is installed.
- `procore.project.id` - ID of the project in which the App has been configured.
- `procore.project.name` - Name of the project in which the App has been configured.

You can also define your own custom field variables for use as query parameters.

## Creating the Initial Sandbox Manifest Version

App manifests are first created in the context of your development sandbox.
You can create any number of sandbox manifest versions for development and test purposes.
After you have successfully validated your manifest in the sandbox environment, you can [promote it to the production environment]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}).
The following steps outline the process of creating the initial version of your App manifest.

1. Log in to the Developer Portal, go to My Apps, then select the App you want to create a manifest for.
2. Scroll down to the ‘Manage Manifests’ section, verify that the ‘Sandbox’ tab is selected, then click **Create New Version** to display the manifest editor.
You can use the editor to add embedded, side panel, and data connection components to your manifest and modify them for your specific application.
The editor provides built-in validation so that you are notified when the format of your manifest does not conform to the required structure.
3. Enter a version number for the manifest. We recommend using '0.0.1' as an initial manifest version. 

    ![Create New Version Semantic]({{ site.baseurl }}/assets/guides/create-new-version-semantic.png)

4. The manifest editor displays a template to help you get started.
The manifest `schema_version` is shown along with a block for defining the `post_install_instruction` that must be carried out by the Procore user installing and setting up your application.
This information is displayed to the user at the time of installation, and later via the App Management page in the Procore Web user interface.
Use the `notes` attribute to provide a textual description of any post-installation steps required to properly complete the setup.
Use the `page:url` attribute to specify a link to an external website or downloadable PDF that provides additional information about setting up your application.
Use the `page:label` attribute to specify the label associated with the URL.

    ![New Manifest Template]({{ site.baseurl }}/assets/guides/create-new-manifest-v4.1-install-instructions.png)

5. Refer to the next sections for adding more components to the manifest.

### Adding Embedded Fullscreen Components

You can add a fullscreen embedded component to the manifest using the **Inject Component** button for the `embedded` component type.

![Inject Embedded]({{ site.baseurl }}/assets/guides/inject-component-embedded.png)

A new code block is added to the manifest where you can define the structure of your embedded (fullscreen) component.
For example:

![Embedded Snippet]({{ site.baseurl }}/assets/guides/create-new-manifest-v4.1-fullscreen-snippet.png)

The manifest objects and attributes for embedded component are described below.

| __Manifest Object/Attribute__ | __Description__ |
| `desciption` | Used for entering a meaningful text description for the component. |
| `source_url` | Defines the URL for the component and defines any parameter interpolation required for your application. |
| `user_configuration:schema` | Defines the `properties` for the component and specifies which ones are required. |
| `user_configuration:schema:properties` | Defines one or more property objects used for gathering user configuration input. The `name` and `description` attribute values are displayed to the user as configurable fields. |

See [Building Procore Embedded (Fullscreen) Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_fullscreen_apps.md %}) for additional information.

### Adding Side Panel Components

You can add a side panel component to the manifest using the **Inject Component** button for the `sidepanel` component type.

![Inject SidePanel]({{ site.baseurl }}/assets/guides/inject-component-sidepanel.png)

A new code block is added to the manifest where you can define the structure of your side panel component. For example:

![Sidepanel Snippet]({{ site.baseurl }}/assets/guides/create-new-manifest-v4.1-sidepanel-snippet.png)

The manifest objects and attributes for the side panel component are same as for the embedded component, with the addition of the `sidepanel:views` array.
This is where you define which Procore application views your component supports.
For example, `"commitments.purchase_orders.detail"` and `"commitments.purchase_orders.edit"`.
See [Building Procore Side Panel Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_side_panel_apps.md %}) for additional information on supported views.

### Adding Data Connection Components

You can add a data connection component to the manifest using the **Open Builder** button under App Tool Permissions.

![Permissions Snippet]({{ site.baseurl }}/assets/guides/create-new-manifest-v4.1-perm-builder.png)

This launches the Permission Builder where you can specify the company level and project level tool access required for your application.

![Permissions Builder UI]({{ site.baseurl }}/assets/guides/create-new-manifest-v4.1-perm-builder-ui.png)

See [Building Procore Data Connection Applications with DMSA]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}) for additional information.

## Creating New Manifest Versions

After you have created the initial sandbox version of your App manifest, you can iterate through your development/test cycle and create subsequent versions as needed to address changes in your App. Complete the following steps to create additional manifest versions.

1. In the 'Manage Manifests' section, click **Create New Version**. The editor displays the content from your last manifest version.
1. Enter a new version number following the semantic versioning scheme.
1. Make changes to the manifest as needed and click **Create**.
1. Repeat Steps 1-3 for each additional manifest version you want to create. -->
