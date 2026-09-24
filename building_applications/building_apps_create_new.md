---
permalink: /building-apps-create-new
title: Creating an App
sub_header: Set up your account, build your first app, and configure your App Manifest to start developing in Procore.
layout: default
section_title: Build Your App
---

## Overview
Whether you're a Procore customer or a Technology Partner, you can use the Procore Developer Portal to build apps that embed external systems in Procore or interact directly with its API. This guide walks you through creating your Developer Portal account and building your first app.
<br><br>

***
## 1. Create an Account
Start by registering for a Procore Developer Portal account. Once registered, you can create your first app.

1. Open your browser and go to the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a>.
2. Click **Sign Up** and fill out the required fields: first name, last name, and email.
3. Set and confirm your password.
4. (Optional) Enter your company name.
5. Complete the reCAPTCHA.
6. Click **Create Free Account**, then check your inbox for a verification email.
<br><br>

***
## 2. Create an App
Follow these steps to create a new app in the Developer Portal:

1. Go to the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a> and sign in to your account.
2. Navigate to the **My Apps** page and click **Create a New App**.
3. Enter an app name. The first name you choose is important, so label it carefully.
4. Click **Create**.

When you create a new app, a Developer Sandbox is automatically provisioned for building and testing with sample project data. You can find its URL on the **Credentials** tab of your app or by following the link in the email sent to the app creator.

For step-by-step instructions on installing a version in the Developer Sandbox, see [Install a Version in Your Developer Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/install_version_sandbox.md %}).
<br><br>

***
## 3. App Manifest Overview
After creating your app, select **Create Version**, then **Edit Components** to choose what that version contains. These components define your app’s functionality in Procore and make up the App Manifest.

Components are grouped into three capabilities. One app version can carry any mix of them, including all three at once, so a customer installs a single app and gets everything it offers.

| Capability | Components | Guide |
|---|---|---|
| **Data Connector** | User Level Authentication, Service Account Authentication | [Building Data Connector Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}) |
| **Embedded** | Full Screen, Side Panel | [Building Embedded Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_apps.md %}) |
| **Agentic** | MCPs, Agents | [Building Agentic Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_agentic_apps.md %}) |

Each capability stands on its own and none requires another. Data Connector and Embedded do pair naturally: a side panel knows which company, project, and record it was opened on, and a Data Connector lets it call the Procore API for the detail.

Adding a Data Connector component is also what generates your OAuth credentials — see [OAuth Credentials Management]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_keys.md %}). Agentic is in closed beta, and customers need Procore AI Pro or Enterprise to use it.

### Create New Manifest Versions
After your initial version, you can continue iterating by creating new app versions:

1. Select **Create Version**, then **Edit Components** to add or remove components, and **Manage** to change how one is configured.
2. Select **Save Version**. Procore assigns the version number for you.
3. After saving, you'll receive a new Sandbox App Version Key. Use this key to install and test the new version in your Developer Sandbox.
4. When you are satisfied with the updates, select **Promote Version** to move it to production.

For more information on app versions, see [Promote a Version to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}).
<br><br>

***
## See Also
- [Managing App Collaboration]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_manage_collabs.md %})
- [Choose an App Type]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/building_apps_app_types.md %})
- [Promote a Version to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %})
- [Verification & Production Access]({{ site.url }}{{ site.baseurl }}{% link overview/verification_and_production_access.md %})
{: .link-list}
<br><br>
