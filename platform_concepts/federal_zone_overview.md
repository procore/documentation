---
permalink: /federal-zone-overview
title: Procore Federal Environment Overview
sub_header: Learn how the Federal Zone differs from Procore’s Commercial environment and what developers need to know.
layout: default
section_title: Platform Concepts

---

## Introduction
This guide introduces the Procore **Federal Zone**, a new environment built to support U.S. federal agencies and contractors that require heightened security, compliance, and data governance. It operates as a fully separate platform from Procore’s Commercial environment and is authorized under the Federal Risk and Authorization Management Program (FedRAMP).

In this document, you’ll learn how the Federal Zone differs from Procore’s Commercial environment, what app developers need to consider, and where to find additional resources. Whether you're building a new app or adapting an existing one, this guide will help you understand how to succeed within this highly regulated space.

***

## Overview of Procore’s Federal Zone
Procore is introducing a dedicated **Federal Zone**, a new environment designed to meet the strict compliance and security requirements of U.S. federal agencies and contractors. This zone is FedRAMP-authorized and operates independently from our Commercial (Production) environment.

The Federal Zone includes a standalone <a target="_blank" href="https://developers.procoregov.com/">Developer Portal</a> and <a target="_blank" href="https://marketplace.procoregov.com/">Marketplace</a>. Apps cannot be shared between the Commercial and Federal environments; they must be registered, maintained, and deployed independently in each.

### What Is FedRAMP?
The **Federal Risk and Authorization Management Program (FedRAMP)** is a U.S. government-wide program that provides a standardized approach to security assessment, authorization, and continuous monitoring for cloud products and services. FedRAMP authorization confirms that cloud providers meet rigorous security standards and are approved for use by federal agencies.
<br><br>

***
## Key Differences Between Federal and Commercial Environments
> **Note:** Developers targeting the Federal Zone should review the distinctions below carefully. Each environment requires its own app registration and credentials, and development efforts must be scoped accordingly.
<div class="details-bottom-spacing"></div>


| Feature                     | Federal Zone                                            | Commercial (Production)                   |
|-----------------------------|---------------------------------------------------------|-------------------------------------------|
| Login URL                   | `https://login.procoregov.com`                          | `https://login.procore.com`               |
| API Base URL                | `https://api.procoregov.com`                            | `https://api.procore.com/`                |
| Developer Portal Access     | Request required for access                             | Open to registered users                  |
| Environment Isolation       | Fully separate tenant and infrastructure                | Shared infrastructure                     |
| Customer Base               | U.S. federal agencies and contractors (U.S. IPs only)   | Global usage                              |
| Sandbox Availability        | Not available (no developer or monthly sandboxes)       | Available (developer and monthly sandboxes) |
| Marketplace                 | Separate Federal Marketplace                            | Procore Marketplace                       |

<div class="details-bottom-spacing"></div>

***

## Testing Recommendations
The Federal Zone does not currently offer sandbox environments for testing purposes. This means Procore cannot provision developer or monthly sandbox accounts as it can in the Commercial environment.

To validate your app for the Federal Zone, we recommend:
- **Develop and test in the Commercial environment first**, using Procore’s available sandbox accounts. Once stable, conduct limited testing in the Federal Zone using production credentials in a tightly controlled staging scenario with non-sensitive sample data and restricted access.
- **Swapping in the appropriate Federal environment configuration**: This includes the base API URL (`https://api.procoregov.com`), login endpoint (`https://login.procoregov.com`), and your Federal-specific client ID and client secret. These credentials are not interchangeable with those used in the Commercial environment.

While this approach is not a perfect substitute for a full sandbox, it currently offers the best available method for replicating Federal Zone behavior.
<br><br>

***

## How to Get Started as a FedRAMP Marketplace Partner

> ⚠️ **Important:** The FedRAMP environment does not provide sandbox accounts. All development and testing must be done in outside of the Federal Zone before final validation.

If you’d like to make your app available in Procore’s **Federal Zone**, you’ll need to follow a few steps to gain access to the **FedRAMP Developer Portal** and publish to the **Federal Marketplace**.

***

<details>
<summary class="collapseListTierOne">Step 1: Request Access</summary>
<p>
    Send an email to <a href="mailto:MarketplaceQA@procore.com">MarketplaceQA@procore.com</a> with the following details:
</p>
<ul>
    <li>Your company name</li>
    <li>Confirmation of your intent to build for FedRAMP</li>
    <li>Contact details for all collaborators who will need access</li>
</ul>
<p>
    Additionally, to qualify for access, you must:
</p>
<ul>
    <li>Already be a Procore Marketplace partner</li>
    <li>Plan to list in the FedRAMP Marketplace</li>
    <li>Provide proof of your FedRAMP status (such as an ATO – Authorization to Operate – or reference to your inclusion on the official FedRAMP Marketplace)</li>
</ul>
</details>

***
<details>
<summary class="collapseListTierOne">Step 2: Accept Your Portal Invitation</summary>
<p>
    Once verified, you’ll receive an email invitation to the <strong>FedRAMP Developer Portal</strong>. Accept the invite, and you’ll be able to begin:
</p>
<ul>
    <li>Building or adapting your app</li>
    <li>Preparing your FedRAMP-specific Marketplace listing</li>
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
- <a target="_blank" href="https://www.fedramp.gov/">What Is FedRAMP?</a>
- <a target="_blank" href="https://developers.procoregov.com/">Federal Developer Portal</a>
- <a target="_blank" href="https://marketplace.procoregov.com/">Federal Marketplace</a>
- For questions or support, contact <a href="mailto:marketplaceqa@procore.com">MarketplaceQA@procore.com</a>.