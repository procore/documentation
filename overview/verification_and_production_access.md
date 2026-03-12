---
permalink: /verification-and-production-access
title: Verification & Production Access
sub_header: Understand your verification status and what it unlocks in the Developer Portal.
layout: default
section_title: Introduction
---

## Overview

When you sign up for the Developer Portal, your account starts as **Unverified**. You can immediately create apps, access the Developer Sandbox, and install and test your integration — no verification required to get started.

> **The Developer Sandbox is available at every stage.** Whether your account is Unverified or verified, you always have full access to the Developer Sandbox. Build, install, and iterate freely — verification only gates production access.

Moving an app to production requires two distinct steps:

1. **Verify your organization** — Choose the verification path that matches your intentions. This is a one-time step per organization.
2. **Request production credentials per app** — After your organization is verified, each app you want to promote to production requires its own approval. This ensures every app meets Procore's <a href="https://procore.pactsafe.io/legal.html#contract-hymckkfc9" target="_blank">API Terms of Use</a> and <a href="https://procore.pactsafe.io/legal.html#contract-syqj4fbct" target="_blank">User Terms of Service</a> before production credentials are issued.

If your organization is an active Procore customer, verification through the paths below may not be required — your account may already have production access configured.
<br><br>

***
## Unverified

All new Developer Portal accounts start as Unverified.

As an Unverified developer, you can:
- Create apps
- Access the Developer Sandbox and generate sandbox credentials
- Install your app in the Developer Sandbox to test and iterate

When you are ready to move an app to production, you will see a **Become a Verified Developer** prompt instead of production options. Selecting it walks you through the two available verification paths: [Private Developer](#verified-private-developer) and [Marketplace Partner](#verified-marketplace-partner).

Verification is a one-time step for your organization. Once complete, your account transitions to the appropriate verified role and production features become available.
<br><br>

***
## Verified: Private Developer

The Private Developer path is for consultants and independent developers building a custom app for a single Procore customer. This is a non-commercial path — your app is built for one client and will not be distributed publicly or listed on the Marketplace.

**Best for:**
- Consultants creating a custom integration for a specific client
- In-house developers building a proprietary integration exclusively for their own company's use
- App deployments not intended for broader distribution

**Requirements:**
- Business email address (no personal email providers)
- Description of your intended app use cases

As a verified Private Developer, you can:
- Create apps
- Access the Developer Sandbox and continue to build and test your integration
- Request production credential access for each app you build

You cannot:
- Access Marketplace listing tools
- Distribute your app through the Procore Marketplace

**To get verified:** Select **Apply to Become Verified (Private Developer)** from the Developer Portal. You will receive an email notification when your application is approved.
<br><br>

***
## Verified: Marketplace Partner

The Marketplace Partner path is for organizations building apps for commercial distribution on the Procore Marketplace. This path unlocks Marketplace listing tools and allows you to publish your integration for any Procore customer to discover and install.

**Best for:**
- ISVs building apps to distribute to multiple Procore customers
- Partners who want to publish and market an integration in the Marketplace
- Organizations that need listing eligibility and a review process for customer trust

**Requirements:**
- Valid business email address (no personal email providers)
- Complete technical feasibility
- Sign a Partnership Agreement

As a verified Marketplace Partner, you can:
- Create apps
- Access the Developer Sandbox and continue to build and test your integration
- Request production credential access for each app you build
- Access Marketplace listing tools to create and manage your listing

**To get verified:** Select **Apply to Become a Marketplace Partner** from the Developer Portal. You will receive an email notification with next steps when your review is complete. See the [Partner & Marketplace Overview]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/procore_partner_overview.md %}) for requirements and listing details.
<br><br>

***
## Getting to Production

Reaching production requires clearing two gates, regardless of which verification path you take.

### Step 1: Verify your organization

If your account is Unverified, the **Become a Verified Developer** prompt replaces production options in your app dashboard. Complete the verification process to establish who you are and how you intend to use your app. Once approved, your account transitions to either Private Developer or Marketplace Partner.

> **A business email address is required for verification.** Personal email addresses (such as Gmail, Yahoo, or Outlook.com) are not accepted. Your Developer Portal account must be associated with a company or organization domain before verification can be completed.

This step happens once per organization. An app's production access is determined by the verification status of its **owner** — not its collaborators. This is one reason app ownership matters: even if collaborators are added to an app, the owner's verification status governs what production options are available.

### Step 2: Request production credentials per app

After your organization is verified, each app requires its own **Request Production Credential Access** submission. Procore reviews every request to confirm the app complies with the <a href="https://procore.pactsafe.io/legal.html#contract-hymckkfc9" target="_blank">API Terms of Use</a> and <a href="https://procore.pactsafe.io/legal.html#contract-syqj4fbct" target="_blank">User Terms of Service</a> before production credentials are issued.

Until your request is submitted and approved, your app cannot be installed in any customer's production environment. You can continue building and testing in the Developer Sandbox while your request is under review.

This step happens for every app you want to promote to production. If you build a new app, you submit a new request for that app.
<br><br>

***
## Comparison

| | Unverified | Private Developer | Marketplace Partner |
|---|:---:|:---:|:---:|
| Create apps | ✓ | ✓ | ✓ |
| Developer Sandbox access | ✓ | ✓ | ✓ |
| Install app for sandbox testing | ✓ | ✓ | ✓ |
| Request production credential access | — | ✓ | ✓ |
| Marketplace listing tools | — | — | ✓ |

<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***
## See also

- [App Versioning & Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %})
- [Partner & Marketplace Overview]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/procore_partner_overview.md %})
- [Create an App]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_create_new.md %})
- [Procore Environments]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/development_environments.md %})
<br><br>

***
{% include need_help_section.md %}
