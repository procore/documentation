---
permalink: /building-apps-promote-manifest
title: Promoting a Sandbox Manifest to Production
layout: default
section_title: Building Applications

---

>**Note:** This article covers topics consistent with the App Manifest v4.1 format and the form-based app creation UI experience.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

## Promoting a Manifest Version to Production

When you are ready to release your new application version to production, you can promote the new manifest version and enter release notes that describe the changes being deployed.
When a Procore company administrator installs the updated version of your application in their account, the release notes are displayed in a modal so they can review the changes and decide whether they want to proceed with the installation.
Be sure to provide detailed and accurate information in your release notes.
The following diagram shows a simplified view of the manifest versioning model.<sup>*</sup>

![App manifest diagram]({{ site.baseurl }}/assets/guides/manifest-promotion.png)

<sup>*</sup>Version number objects in the diagram represent semantic (x.y.z) versions.

You can create new working sandbox versions of your manifest, and then promote specific versions to production as needed.
After you are satisfied with the content in your manifest and you are ready to work with your App in a production environment, complete the following steps to promote the manifest.

1. On the Manage App page, select the 'Configuration Builder'.
2. Click **Promote Version**

    ![Promote Button]({{ site.baseurl }}/assets/guides/form-based-promote.png)

3. Enter release notes for the new version and click **Promote**.

    ![Promote confirm dialog]({{ site.baseurl }}/assets/guides/promote-manifest-confirm.png)
