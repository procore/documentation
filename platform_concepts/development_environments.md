---
permalink: /development-environments
title: Procore Sandboxes
sub_header: Build, test, and demo your Procore integration across three sandboxes — including the new On-Demand Sandbox.
layout: default
section_title: Platform Concepts
---

## Overview

Procore offers three sandboxes that serve two distinct purposes:

- **For building** — the Development Sandbox, where developers build and test the integration.
- **For customer trial and testing** — On-Demand Sandbox and Monthly Sandbox, where Procore customers trial or test the integration inside their own Procore accounts.

This page explains how each sandbox works and when to use it.

> **Note:** Every developer building on Procore can use a Development Sandbox. On-Demand Sandbox and Monthly Sandbox are part of a Procore customer's account — only Procore customers can enable them. If you're a Procore customer building your own integration, you can use both: a Development Sandbox to build, and your company's On-Demand or Monthly Sandbox to test on real data.
<div class="details-bottom-spacing"></div>

***

## Compare the Sandboxes

| Sandbox | Primary user | Set up by | Refresh model | Multi-sandbox | Best for |
| --- | --- | --- | --- | --- | --- |
| Development Sandbox | App developer | Auto-created when an app is registered in the Developer Portal | Never — register a new app to start fresh | Yes — one per app | Building and testing the integration |
| On-Demand Sandbox | A Procore customer's Company Admin | Self-enabled in <a href="https://v2.support.procore.com/product-manuals/admin-company/tutorials/manage-features-with-procore-explore" target="_blank">Procore Explore</a> | Customer-controlled — no automatic refresh | Yes — multiple parallel sandboxes | Trialing the integration on real customer data, with full control |
| Monthly Sandbox | A Procore customer's Company Admin | Enabled in company General Settings | Automatic monthly refresh from Production | No — one shared per company | Trialing the integration against a recent production snapshot |

<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***

## Development Sandbox: For App Building

The Development Sandbox is the primary environment for building and testing an integration. It's separate from Production, comes pre-loaded with seed data, and uses its own OAuth credentials.

### What's included

When you register a new app in the Developer Portal, a Development Sandbox is generated within a few minutes. You'll receive an email to set your sandbox password.

Each Development Sandbox includes:

- A minimum set of users in the Company Directory: Test Architect, Test Subcontractor, and API Support, each with example email addresses (for example, `sandbox+arch@example.com`). To add more, see <a href="https://v2.support.procore.com/product-manuals/directory-company/tutorials/add-a-user-account-to-the-company-directory" target="_blank">Add a User Account to the Company Directory</a>.
- A starter project named **1234 – Sandbox Test Project** with seed data: three project users, eight Schedule Tasks, a basic folder structure, one Photo, a Drawing Set, one RFI, and one Submittal.

### Endpoints

| Resource | URL |
| --- | --- |
| Authentication base URL | `https://login-sandbox.procore.com` |
| API and browser base URL | `https://sandbox.procore.com` |

Use the **Sandbox OAuth credentials** (Client ID and Client Secret) from your app's configuration page in the Developer Portal.

### Working with the Development Sandbox

Once your sandbox is ready, you can:

- Retrieve your `client_id` and `client_secret` from the **Sandbox OAuth Credentials** section of your app's configuration.
- Request an access token using OAuth, then make API requests to `https://sandbox.procore.com` (for example, `https://sandbox.procore.com/rest/v1.0/me`).
- Sign in to the Procore web UI with the credentials you set after receiving the sandbox welcome email, and add or modify data through the Procore tools.

**Next:** [Choose your OAuth grant type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}) and walk through the [Quick Start Guide]({{ site.url }}{{ site.baseurl }}{% link overview/quick_start_guide.md %}) to make your first API call.

### Important considerations

- Development Sandboxes can't be refreshed or deleted, but you can have many of them. To start with a clean environment, register a new app to get a fresh Development Sandbox, then migrate your app setup. Each new Development Sandbox has its own `company_id`, so update your app's connection to point to the new sandbox.
<br><br>

***
## On-Demand and Monthly Sandboxes

> **Note:** A Company Admin needs to enable Monthly Sandbox or On-Demand Sandbox in a Procore customer's account before the integration can be tested in either one.

On-Demand and Monthly Sandboxes are both enabled by a Company Admin and use **Production OAuth credentials** — so the integration uses the same Client ID and Client Secret it does in Production. Each new sandbox needs the integration installed separately, and the OAuth connection should be verified after each install.

### On-Demand Sandbox

**When to use it:** A Procore customer wants to trial or test the integration on their own data, on their own schedule, with the option to spin up multiple parallel sandboxes. This is Procore's recommended sandbox for most testing scenarios.

**How it's enabled:** A Company Admin self-enables On-Demand Sandbox in <a href="https://v2.support.procore.com/product-manuals/admin-company/tutorials/manage-features-with-procore-explore" target="_blank">Procore Explore</a>. See the customer guide (for Procore customers): <a href="https://v2.support.procore.com/product-manuals/admin-company/tutorials/create-and-manage-an-on-demand-sandbox" target="_blank">Create and Manage an On-Demand Sandbox</a>.

**Setup notes:** Each new On-Demand Sandbox needs the integration installed separately. After installation, verify the OAuth connection succeeds.

> **Important:** Each On-Demand Sandbox has its own `company_id`. To your app, every sandbox looks like a separate customer company. Install the app in each new sandbox.

**What you need to know:**

- On-Demand Sandbox runs on Production infrastructure with the same Production endpoints (`https://api.procore.com`, `https://login.procore.com`) and Production OAuth credentials.
- **Each On-Demand Sandbox is independent.** A Company Admin must install the app separately in each one. Plan for this if multiple sandboxes are in use.
- Sandboxes are managed on the customer's schedule (create and use as needed), and data is not wiped on a fixed cadence.

### Monthly Sandbox

**When to use it:** A Procore customer wants to trial or test the integration against a full-database snapshot of their Production account, doesn't need multiple parallel sandboxes, and is comfortable with a monthly refresh that wipes all sandbox-only changes.

**How it's enabled:** A Company Admin enables **Access to the Monthly Sandbox Environment** in the company's General Settings.

**Setup notes:** Plan the Production install with the next monthly refresh in mind. After the refresh, verify the OAuth connection succeeds.

**What you need to know:**

- Monthly Sandbox runs on a separate environment with its own URLs (see [Connection Details](#connection-details)). It uses Production OAuth credentials.
- Refresh schedule: Monthly Sandbox is overwritten with a fresh copy from Production on the first working day of each month, typically morning to mid-afternoon ET. The snapshot reflects production data from approximately 24 hours before the refresh. To include recent changes, they must be made in Production by the end of the previous month's last working day.
- **Apps installed in Production appear in the Monthly Sandbox only after the next monthly refresh.** Account for this lag when planning installation.
<br><br>

***
## Connection Details
{:#connection-details}

| Sandbox | Authentication URL | API URL | Credentials |
| --- | --- | --- | --- |
| Development Sandbox | `https://login-sandbox.procore.com` | `https://sandbox.procore.com` | Sandbox OAuth credentials. Browser access at `https://sandbox.procore.com`. |
| On-Demand Sandbox | `https://login.procore.com` | `https://api.procore.com` | Production OAuth credentials. Same endpoints as Production; scope by `company_id`. |
| Monthly Sandbox | `https://login-sandbox-monthly.procore.com` | `https://api-monthly.procore.com` | Production OAuth credentials. Browser access at `https://api-sandbox-monthly.procore.com`. |

<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***
## Projected Monthly Sandbox Refresh Dates

Projected dates are provided for planning. Exact timing can vary based on maintenance and operational needs.

| Month | Date | Day |
| --- | --- | --- |
| May 2026 | 05/05/2026 | Tuesday |
| June 2026 | 06/02/2026 | Tuesday |
| July 2026 | 07/01/2026 | Wednesday |
| August 2026 | 08/04/2026 | Tuesday |
| September 2026 | 09/01/2026 | Tuesday |
| October 2026 | 10/01/2026 | Thursday |
| November 2026 | 11/03/2026 | Tuesday |
| December 2026 | 12/01/2026 | Tuesday |

<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***
## Considerations Across Sandboxes

- Each sandbox is independent. Data created in a sandbox does not affect Production, and credentials and tokens are not interchangeable across environments.
- Federal Zone customers do not have access to these sandboxes. See [Procore Federal Environment Overview]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/federal_zone_overview.md %}) for testing recommendations in the Federal Zone.
<br><br>

***
## See Also

- [Choose Your OAuth Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %})
- [Quick Start Guide]({{ site.url }}{{ site.baseurl }}{% link overview/quick_start_guide.md %})
- [App Installation Overview]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/building_apps_install_arch.md %})
- <a href="https://v2.support.procore.com/product-manuals/admin-company/tutorials/create-and-manage-an-on-demand-sandbox" target="_blank">Create and Manage an On-Demand Sandbox</a> (for Procore customers)
- <a href="https://support.procore.com/faq/what-is-the-monthly-sandbox-environment" target="_blank">What is the Monthly Sandbox Environment?</a> (for Procore customers)
