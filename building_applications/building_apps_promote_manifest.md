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
1. Make changes to the manifest as needed and click **Create**. Your new manifest version is saved and the version number is incremented by one (1).
1. Repeat Steps 1 and 2 for each additional manifest version you want to create.

## Promoting a Manifest Version to Production

After you have successfully tested and validated your manifest in the sandbox environment, you can promote it to the production environment and obtain your production OAuth credentials.
The following diagram shows the manifest versioning model.

![App manifest diagram]({{ site.baseurl }}/assets/guides/manifest-promotion.png)

Note that you can create any number of working sandbox versions of your manifest, and then promote specific versions to production as needed.

After you are satisfied with the content in your manifest and you are ready to work with your App in a production environment, complete the following steps to promote a manifest version from your sandbox environment to production.

1. In the 'Manage Manifests' section, click the 'Sandbox' tab.
1. If needed, click **Show Old Versions** to display all available sandbox manifest versions.
1. In the table of available sandbox manifest versions, locate the version you want to promote to production and click **Promote**.
1. Click **Promote** again to confirm your choice.

> PRODUCTION OAUTH CREDENTIALS
>
> Please note that you must complete the steps for promoting your manifest to production in order to obtain the production OAuth credentials for your app.
> In addition, the promoted manifest you submit for review must properly define components and post-installation instructions suitable for a production deployment.
> Sample code and placeholder definitions will be rejected by our App Validation team.
