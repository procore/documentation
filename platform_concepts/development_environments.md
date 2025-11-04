---
permalink: /development-environments
title: Sandbox Environments
layout: default
section_title: Platform Concepts
---

## Overview

Use Procore’s sandbox environments to explore and test without affecting production.

### Monthly Sandbox

- Refreshed on the first working day of each month (morning to mid‑afternoon ET). The snapshot typically reflects production data from ~24 hours before the refresh.
- Changes made in a Monthly Sandbox never affect production.
- To include recent production changes in the next monthly refresh, make those changes by the end of the last working day of the current month.
- Access requires opt-in from the Company level Admin tool in the corresponding Production environment.
- Use Production OAuth credentials (Client ID and Client Secret) from the app’s configuration page.
- Authentication base URL: https://login-sandbox-monthly.procore.com
- API base URL: https://api-monthly.procore.com

### Development Sandbox

- Automatically generated in your Developer Portal account with seed project data.
- Does not refresh from production.
- Use Sandbox OAuth credentials from the app’s configuration page.
- Authentication base URL: https://login-sandbox.procore.com
- API and browser base URL: https://sandbox.procore.com
<br><br>

***
## Sandbox Environment URL Details

| Environment         | URL                                       | Description                                                                                            |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Monthly Sandbox     | https://api-monthly.procore.com           | Domain for API gateway access to the Procore Web Application in the monthly sandbox environment.       |
|                     | https://login-sandbox-monthly.procore.com | Domain for making API calls to the Procore authentication server in the monthly sandbox environment.   |
|                     | https://api-sandbox-monthly.procore.com   | Domain for browser access to the Procore Web Application in the monthly sandbox environment.           |
| Development Sandbox | https://sandbox.procore.com               | Domain for browser access and API gateway access to a development sandbox environment.                 |
|                     | https://login-sandbox.procore.com          | Domain for making API calls to the Procore authentication server in a development sandbox environment. |

## Projected Monthly Sandbox Refresh Dates

Projected dates are provided for planning; exact timing can vary based on maintenance and operational needs.

| Year | Month     | Date       | Day       |
| ---- | --------- | ---------- | --------- |
| 2025 | November  | 11/04/2025 | Tuesday   |
| 2025 | December  | 12/02/2025 | Tuesday   |

<div class="details-bottom-spacing"></div>
<div class="details-bottom-spacing"></div>

***
## Working with a Development Sandbox

When you create a new application in the Developer Portal, a Development Sandbox is generated in a few minutes. You will receive an email to set your sandbox password.

Once ready, you can:
- Retrieve your sandbox `client_id` and `client_secret` from the **Sandbox OAuth Credentials** section in your app’s configuration.
- Use OAuth to request an access token and refresh token.
- Sign in to your sandbox Company with your Developer Portal email and sandbox password.
- Add and modify data in the sandbox using the Procore web UI.
- Make API requests to `https://sandbox.procore.com`.

#### Important considerations

- For Development Sandbox API calls, the base URL must be `https://sandbox.procore.com` (for example, `https://sandbox.procore.com/rest/v1.0/me`).
- Development Sandboxes cannot be “refreshed.” To start clean, delete and re‑generate the sandbox.

### Default users

When your sandbox is generated, a minimum set of users is added to the Company Directory:
- Test Architect (e.g., sandbox+arch@example.com)
- Test Subcontractor (e.g., sandbox+sub@example.com)
- API Support (e.g., sandbox+demo@example.com)

### Test project

Each sandbox includes a project named **1234 – Sandbox Test Project** with seed data to help you get started:
- Directory: three project users (Test Architect, Test Subcontractor, API Support)
- Schedule: eight high‑level tasks
- Documents: a basic folder structure
- Photos: one sample image
- Drawings: a basic set of plans
- RFIs: one RFI
- Submittals: one submittal
<br><br>

***
## Additional Considerations for Sandbox Environments

- Each environment is independent. Data created in a sandbox does not affect production.
- Set up data in Production if you want it to appear in the next Monthly Sandbox refresh.
- After you create an app, its Production credentials will propagate to the Monthly Sandbox.
- Users created in Production will propagate to the Monthly Sandbox.
- Do not reuse `authorization_code`, `access_token`, or `refresh_token` from Production in your Development Sandbox.
