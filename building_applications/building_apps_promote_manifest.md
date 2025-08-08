---
permalink: /building-apps-promote-manifest
title: Managing App Versions & Update Notifications
sub_header: Understand how versioning impacts your app’s lifecycle, and how updates are surfaced to Procore users.
layout: default
section_title: Building Applications

---

## Introduction
After creating an app, you can modify its components using the Configuration Builder. This page explains how to promote an app version to Production and how these updates are delivered to customers. Each saved set of changes creates a new App Version.

***
## Versioning Your App
When you are ready to release a new app version, promote it to Production and include release notes that describe what has changed. These notes appear to Procore Company Admins during the update process and—if your app is listed on the Marketplace—also appear on your Marketplace listing.

Use clear and accurate release notes to help users understand what is new or changed.

### Semantic Versioning
Procore apps use [semantic versioning](https://semver.org/) to track changes:

`X.Y.Z`
- **X** (Major): Breaking Changes.
- **Y** (Minor): Backward-Compatible Feature Additions.
- **Z** (Patch): Bug Fixes or Minor Improvements.

**Versioning tips:**
- Begin development with `v0.0.1`.
- Use `v1.0.0` for your first public release.
- Only increment the major version for breaking changes.

![App Manifest promotion diagram]({{ site.baseurl }}/assets/guides/manifest-promotion.png)

***
## Promoting Your App & Notifying Users
After promoting a version to Production, Procore notifies customers when an update is available. Company Admins will see an **"Update Available"** badge in the App Management section of the Company Admin Tool.

> Important: Customer app settings—such as which projects the app is applied to—do not carry over automatically. Make sure to account for this when releasing updates.

<!-- ![App Update Available]({{ site.baseurl }}/assets/guides/update-available-badge.png) -->

### Promotion Steps

1. Open the Configuration Builder on the Manage App page.
2. Click **Promote Version**.
3. Add release notes.
4. Click **Promote**.

- For custom apps, update notifications are sent automatically after promotion.
- For Marketplace apps, updates must be approved before notifications are sent to customers.

![App Update Available]({{ site.baseurl }}/assets/guides/update-available-badge.png)

See [Update an Installed App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/update-installed-app) for more information.