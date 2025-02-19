---
permalink: /development-environments
title: Sandbox Environments
layout: default
section_title: Getting Started
---

## Introduction

To make Procore's API as explorable as possible, we have provided the following sandbox environments you can use for testing:

- **Monthly Sandbox** - refreshed with current production data on a regularly scheduled basis once each month.
Data you create, update, or manipulate within a Monthly Sandbox environment will never affect the original production data and will exist solely in the context of that environment.
The monthly sandbox environment mimics the production environment approximately 24 hours prior to the swap that occurs during the morning to mid-afternoon (eastern time) on the first working day of each month.
See the section on projected refresh dates below for more information.
In order to ensure that changes you make in your production environment are present in the next month's monthly sandbox instance, we recommend making those production changes by the end of the last working day of the current month.
Please note that access to a Monthly Sandbox environment requires opt-in from the Company Level Admin tool in the company’s corresponding Production environment. 
The client_id and client_secret to use are in the **Production OAuth Credentials** section of the application’s configuration page.
For authentication requests, you will want to use the base URL: <https://login-sandbox-monthly.procore.com>.
For general API requests, you will want to use the base URL: <https://api-monthly.procore.com>.

- **Development Sandbox** - automatically generated for third-party developers in their Developer Portal account and includes seed project data that can be used for testing purposes.
The Development Sandbox environment does not refresh with production data at any time.
The client_id and client_secret to use are in the **Sandbox OAuth Credentials** section of the application’s configuration page.
For authentication requests, you will want to use the base URL: <https://login-sandbox.procore.com>.
For general API requests, you will want to use the base URL: <https://sandbox.procore.com>.

## Sandbox Environment URL Details

| Environment         | URL                                       | Description                                                                                            |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Monthly Sandbox     | https://api-monthly.procore.com           | Domain for API gateway access to the Procore Web Application in the monthly sandbox environment.       |
|                     | https://login-sandbox-monthly.procore.com | Domain for making API calls to the Procore authentication server in the monthly sandbox environment.   |
|                     | https://api-sandbox-monthly.procore.com   | Domain for browser access to the Procore Web Application in the monthly sandbox environment.           |
| Development Sandbox | https://sandbox.procore.com/              | Domain for browser access and API gateway access to a development sandbox environment.                 |
|                     | https://login-sandbox.procore.com/        | Domain for making API calls to the Procore authentication server in a development sandbox environment. |

## Projected Monthly Sandbox Refresh Dates

Here are the projected 2024-25 dates for the monthly sandbox refresh.

| Year | Month     | Date       | Day       |
| ---- | --------- | ---------- | --------- |
| 2024 | October   | 10/01/2024 | Tuesday   |
| 2024 | November  | 11/04/2024 | Monday    |
| 2024 | December  | 12/02/2024 | Monday    |
| 2025 | January   | 01/07/2025 | Tuesday   |
| 2025 | February  | 02/04/2025 | Tuesday   |
| 2025 | March     | 03/04/2025 | Tuesday   |
| 2025 | April     | 04/01/2025 | Tuesday   |
| 2025 | May       | 05/06/2025 | Tuesday   |
| 2025 | June      | 06/03/2025 | Tuesday   |
| 2025 | July      | 07/01/2025 | Tuesday   |
| 2025 | August    | 08/05/2025 | Tuesday   |
| 2025 | September | 09/02/2025 | Tuesday   |
| 2025 | October   | 10/01/2025 | Wednesday |
| 2025 | November  | 11/04/2025 | Tuesday   |
| 2025 | December  | 12/02/2025 | Tuesday   |

## Working with a Development Sandbox

When you create a new application in your Developer Portal account, a _Development Sandbox_ is automatically generated that you can use to test your application.
Development Sandboxes come pre-seeded with company and project level test data that you can expand upon to aid you in your development and test activities.
A Development Sandbox provides an isolated environment in which you can experiment and validate your application without the risk of affecting production data.
The sandbox generation process just takes a few minutes to create your sandbox.
You will receive an email notifying you regarding the availability of your sandbox, as well as the URL to set your password in the sandbox environment.
Once your sandbox has been successfully generated and your password has been set, you can:

- Follow the Concierge account creation process.
- Retrieve your `client_id` and `client_secret` API keys for your sandbox from the Developer Portal.
- Retrieve an access token and refresh token for use with OAuth authentication.
- Retrieve the URL for your sandbox environment.
- Access your sandbox Company using your Developer Portal login username (email address) and your recently set password.
- Add and modify data in your sandbox environment using the Procore Web UI.
- Make Procore API calls to your sandbox environment.

> LEGACY DEVELOPER SANDBOX GENERATION
>
> Developer Sandboxes for applications created prior to July 2019 must be generated manually. Use the following steps to manually generate a sandbox.
>
> - Log in to the Developer Portal and navigate to ‘My Apps’.
> - Click the tile for the App that you want to generate a sandbox for.
> - In the Sandbox Account panel, click ‘Generate Sandbox’. A confirmation dialog displays.
> - Click ‘Generate Sandbox’ again to confirm the generation of your sandbox.

> IMPORTANT CONSIDERATIONS
>
> It is important to note that when making Procore API calls to your Development Sandbox, you will need to ensure that the base URL for the endpoints you hit matches the _https://sandbox.procore.com_ domain. For example, `https://sandbox.procore.com/rest/v1.0/me`
> Development Sandboxes you generate from the Developer Portal cannot be 'refreshed'. You must delete and re-generate the sandbox account if you want to work with a 'clean' environment.

### Development Sandbox First-Time Access

**Note:** On your first login attempt to your new sandbox Company you will be prompted to set your password for Procore access.
This does not affect your Developer Portal password.
When you access your sandbox for the first time, you will have the option to work through the Concierge account creation process.

### Development Sandbox Credentials

It is important to note that as you work in your Development Sandbox you will use authentication credentials that are separate from the Procore production environment.
Once you have generated your sandbox, a new Client ID and Client Secret will be available to use for your testing.
Keep in mind that these credentials are only valid for your sandbox and are not recognized in the Procore production environment.

### Development Sandbox Company Directory Users

In addition to the user account you use to log into the Developer Portal, a minimum set of users is automatically created in the company directory of your sandbox when it is first generated.

- Test Architect (e.g., sandbox+arch@example.com)
- Test Subcontractor (e.g., sandbox+sub@example.com)
- API Support (e.g., sandbox+demo@example.com)

### Development Sandbox Test Project

Your Development Sandbox comes pre-configured with a test project called _1234 - Sandbox Test Project_.
This project includes the following seed data to help get you started.

- _Project Directory_ - three project users (Test Architect, Test Subcontractor, and API Support as described above)
- _Schedule_ - basic high-level schedule with 8 tasks
- _Documents_ - a basic document folder structure
- _Photos_ - one basic image
- _Drawings_ - a basic set of construction plans
- _RFIs_ - a single RFI record
- _Submittals_ - a single submittal record

## Additional Considerations for Sandbox Environments

- Each server environment is independent of one another. Data created or updated in the monthly sandbox environment does not affect production.
- The Production environment is best used to set up data which will eventually propagate to the monthly sandbox environment where you can safely manipulate it.
- After an App is created in your Developer Portal Account, the production credentials for your App will eventually propagate to the monthly sandbox environment.
- Users created in production will eventually propagate to the monthly sandbox environment.
- When working in your Development Sandbox environment, do not rely on `authorization_code`, `access_token`, or `refresh_token` from the production environment as those tokens will no longer align.
