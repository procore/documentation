---
permalink: /federal-zone-overview
title: Procore Federal Environment Overview
sub_header: Learn how the Federal Zone differs from Procore’s Commercial environment and what developers need to know.
layout: default
section_title: Platform Concepts

---

## Overview
The **Federal Zone** is a separate Procore environment for U.S. federal agencies and contractors that require heightened security, compliance, and data governance. It is distinct from Procore’s Commercial environment and is authorized under the Federal Risk and Authorization Management Program (FedRAMP).

This page explains how the Federal Zone differs from Commercial, what changes for developers, and how to request access and publish to the Federal Marketplace.

***

## What’s Different at a Glance
- Separate environment, infrastructure, and tenants from Commercial.
- Separate **Developer Portal** and **Marketplace**; apps are not shared between environments.
- Unique app registration and credentials per environment.
- Different OAuth and API endpoints (see table below).
- No sandbox environments in the Federal Zone.

***

## Key Differences Between Federal and Commercial Environments
> **Note:** Each environment requires its own app registration, credentials, and listing. Plan and scope development accordingly.
<div class="details-bottom-spacing"></div>

| Feature                 | Federal Zone                                   | Commercial (Production)          |
|-------------------------|-----------------------------------------------|----------------------------------|
| Login URL               | `https://login.procoregov.com`                | `https://login.procore.com`      |
| API base URL            | `https://api.procoregov.com`                  | `https://api.procore.com`        |
| Developer Portal        | Access by request                             | Open to registered developers    |
| Environment isolation   | Separate tenant and infrastructure            | Shared infrastructure            |
| Customer base           | U.S. federal agencies and contractors (U.S. IPs only) | Global usage                     |
| Sandbox availability    | Not available                                 | Available (developer and monthly) |
| Marketplace             | Separate Federal Marketplace                  | Procore Marketplace              |

<div class="details-bottom-spacing"></div>

***

## Testing Recommendations
The Federal Zone does not offer sandbox environments. To validate your app for Federal:

- **Build and test in the Commercial environment first.** Use Procore’s available sandbox accounts to develop and stabilize your app.
- **Switch to Federal configuration for validation.** Update the base API URL (`https://api.procoregov.com`), the login endpoint (`https://login.procoregov.com`), and use your Federal-specific client ID and client secret. Credentials are not interchangeable between environments.
- **Limit scope and use non‑sensitive data.** Perform only the minimum validation required in the Federal Zone using controlled test cases and restricted access.

While not a full substitute for a sandbox, this approach provides the closest model for validating behavior in the Federal Zone.

***

## How to Get Started as a FedRAMP Marketplace Partner

> ⚠️ **Important:** The Federal Zone does not provide sandbox accounts. All development and most testing should occur outside the Federal Zone before final validation.

If you want your app available in the **Federal Zone**, follow these steps to gain access to the **FedRAMP Developer Portal** and publish to the **Federal Marketplace**.

***
<details>
<summary class="collapseListTierOne">Step 1: Request Access</summary>
<p>
  Email <a href="mailto:marketplaceqa@procore.com">marketplaceqa@procore.com</a> with the following details:
</p>
<ul>
  <li>Your company name</li>
  <li>Your intent to build for the Federal Zone</li>
  <li>Contact information for collaborators who need portal access</li>
</ul>
<p>
  To qualify for access, you must:
</p>
<ul>
  <li>Already be a Procore Marketplace partner</li>
  <li>Plan to list in the Federal Marketplace</li>
  <li>Provide proof of your FedRAMP status (for example, an ATO or reference to your listing on the FedRAMP Marketplace)</li>
</ul>
</details>

***
<details>
<summary class="collapseListTierOne">Step 2: Accept Your Portal Invitation</summary>
<p>
  Once verified, you’ll receive an email invitation to the <strong>FedRAMP Developer Portal</strong>. After accepting the invite, you can:
</p>
<ul>
  <li>Build or adapt your app for the Federal Zone</li>
  <li>Prepare your Federal‑specific Marketplace listing</li>
</ul>
</details>

***
<details>
<summary class="collapseListTierOne">Step 3: Submit for Review</summary>
<p>
  When your app is ready, submit it for validation. Procore will review:
</p>
<ul>
  <li>Functionality</li>
  <li>FedRAMP compliance</li>
  <li>Data handling practices</li>
  <li>Your Marketplace listing and documentation</li>
</ul>
</details>

***
<details>
<summary class="collapseListTierOne">Step 4: Publish to the Federal Marketplace</summary>
<p>
  After successful validation, your app will be listed in the <strong>Procore FedRAMP Marketplace</strong> for U.S. federal agencies and contractors.
</p>
</details>

***

### Additional Resources
- <a target="_blank" href="https://www.fedramp.gov/">What is FedRAMP?</a>
- <a target="_blank" href="https://developers.procoregov.com/">Federal Developer Portal</a>
- <a target="_blank" href="https://marketplace.procoregov.com/">Federal Marketplace</a>
- For questions or support, contact <a href="mailto:marketplaceqa@procore.com">marketplaceqa@procore.com</a>.