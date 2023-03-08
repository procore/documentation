---
permalink: /building-apps-promote-manifest
title: Promoting a Sandbox Manifest to Production
layout: default
section_title: Building Applications

---

## Creating Additional Sandbox Manifest Versions

After you have created the initial sandbox version of your App manifest, you can iterate through your development/test cycle and create subsequent versions as needed to address changes in your App.
Complete the following steps to create additional manifest versions.

1. In the 'Manage Manifests' section, click **Create New Version**. The editor displays the content from your last manifest version.
1. Enter a new version number following the semantic versioning scheme.
1. Make changes to the manifest as needed and click **Create**.
1. Repeat Steps 1-3 for each additional manifest version you want to create.

## Promoting a Manifest Version to Production

When you are ready to release your new application version to production, you can promote the new manifest version and enter release notes that describe the changes being deployed.
When a Procore company administrator installs the updated version of your application in their account, the release notes are displayed in a modal so they can review the changes and decide whether they want to proceed with the installation.
Be sure to provide detailed and accurate information in your release notes.
The following diagram shows a simplified view of the manifest versioning model.<sup>*</sup>

![App manifest diagram]({{ site.baseurl }}/assets/guides/manifest-promotion.png)

<sup>*</sup>Version number objects in the diagram represent semantic (x.y.z) versions.

You can create new working sandbox versions of your manifest, and then promote specific versions to production as needed.
After you are satisfied with the content in your manifest and you are ready to work with your App in a production environment, complete the following steps to promote the manifest.

> PRODUCTION OAUTH CREDENTIALS
>
> Please note that you must complete the steps for promoting your manifest to production in order to obtain the production OAuth credentials for your app.
> In addition, the promoted manifest you submit for review must properly define components and post-installation instructions suitable for a production deployment.
> Sample code and placeholder definitions will be rejected by our App Validation team.

1. In the 'Manage Manifests' section, click the 'Sandbox' tab.
1. If needed, click **Show Old Versions** to display all available sandbox manifest versions.
1. In the table of available sandbox manifest versions, locate the version you want to promote to production and click **Promote**.

    ![Promote dialog]({{ site.baseurl }}/assets/guides/promote-manifest-dialog.png)

1. Enter release notes for the new version and click **Promote**.

    ![Promote confirm dialog]({{ site.baseurl }}/assets/guides/promote-manifest-confirm.png)

If this is the first time the application has been promoted to the production environment, you will be presented with new production OAuth credentials (Client ID and Client Secret).
Be sure to store these credentials in a safe and secure location.

![oAuth dialog]({{ site.baseurl }}/assets/guides/prod-creds.png)

