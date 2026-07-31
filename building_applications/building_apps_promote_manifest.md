---
permalink: /building-apps-promote-manifest
title: Promote a Version to Production
sub_header: Understand how versioning impacts your app’s lifecycle, and how updates are surfaced to Procore users.
layout: default
section_title: Build Your App

---

## Overview
After creating an app, you can modify its components using the Configuration Builder. This page explains how to promote an app version to Production and how these updates are delivered to customers. Each saved set of changes creates a new App Version.

***
## Versioning Your App
When you are ready to release a new app version, promote it to Production and include release notes that describe what has changed. These notes appear to Procore Company Admins during the update process and—if your app is listed on the Marketplace—also appear on your Marketplace listing.

Use clear and accurate release notes to help users understand what is new or changed.

### Semantic Versioning
Procore apps follow [semantic versioning](https://semver.org/): `X.Y.Z` — bump **X** for breaking changes, **Y** for backward-compatible features, and **Z** for fixes.

<details>
<summary class="collapseListTierOne">View the promotion flow diagram</summary>
<img src="{{ site.baseurl }}/assets/guides/manifest-promotion.png" alt="App Manifest promotion diagram">
</details>

***
## Promoting Your App & Notifying Users
After promoting a version to Production, Procore notifies customers when an update is available. Company Admins will see an **"Update Available"** badge in the App Management section of the Company Admin Tool.

### Promotion Steps

> **Before you can promote to production,** your organization must be verified. If you see a **Become a Verified Developer** prompt instead of production options, complete the verification process first. See [Verification & Production Access]({{ site.url }}{{ site.baseurl }}{% link overview/verification_and_production_access.md %}) for the two available paths.

1. Open the Configuration Builder on the Manage App page.
2. Click **Promote Version**.
3. Add release notes.
4. Click **Promote**.

- For custom apps, update notifications are sent automatically after promotion.
- For Marketplace apps, updates must be approved before notifications are sent to customers.

![App Update Available]({{ site.baseurl }}/assets/guides/update-available-badge.png)

See [Update an Installed App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/update-installed-app) for more information.