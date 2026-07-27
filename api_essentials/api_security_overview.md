---
permalink: /api-security-overview
title: Procore API Security Overview
sub_header: How Procore secures third-party API access — OAuth 2.0, token behavior, service accounts, and the security responsibilities shared between Procore, developers, and customers.
layout: default
section_title: Platform Concepts
---

Procore customers often ask how Procore secures the apps and integrations that third-party developers build on the Procore API. This page explains the authentication model behind that access, how customers stay in control of their data, and how security responsibilities are shared across Procore, developers, and customers.
<br><br>

***

## How Procore authenticates API access

Procore uses <a href="https://tools.ietf.org/html/rfc6749" target="_blank">OAuth 2.0</a>, a widely adopted standard for authorizing and authenticating third-party access to user data. OAuth 2.0 lets an app act on a user's behalf without ever handling that user's Procore password or other sign-in credentials.

Every API request must use HTTPS, so traffic between an app and Procore stays encrypted in transit.

Developers choose one of several [OAuth 2.0 authorization grant types]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}) based on their app's use case. Each grant type relies on encrypted tokens — string values that represent a specific app's authorization to access Procore data on behalf of a Procore user.
<br><br>

***

## How access tokens behave

OAuth 2.0 uses two kinds of tokens: _access tokens_ and _refresh tokens_.

An access token accompanies each API request and identifies the signed-in user making it. It lets the app act with the same permissions that user holds in the Procore web application. Access tokens are time-bound — each one expires after a set period, after which it stops working.

Apps that use the authorization code grant also receive a refresh token. A refresh token requests a new access token after the current one expires, and it lasts until it is used — at which point Procore issues a new access token and a new refresh token.

In the authorization code grant, an app generates its first access token by combining its own credentials — a `Client ID` and `Client Secret` — with an authorization code that Procore returns after the user authorizes the app. Service accounts authenticate differently and do not use an authorization code, as described below.
<br><br>

***

## How apps access your data

An app reaches a company's Procore data through OAuth 2.0 in one of two ways, depending on the grant type it uses. The two models differ in whose permissions the app inherits.

### User-level authentication

A Procore user grants the app access by authorizing it. From that point, the app inherits that user's data visibility and permissions: it can reach only the projects and information available to that individual, and nothing more. Apps built on the authorization code grant work this way.

### Service account authentication

A service account authenticates an app directly, rather than on behalf of a signed-in user. It suits server-to-server data connections that run without anyone logging in. Its access does not depend on the person using the app: Procore creates a dedicated service account profile — a Directory contact with its own permissions, managed in the Company and Project Directory tools — so the app's access stays the same no matter who interacts with it. The account has an auto-assigned `@procore.com` address that cannot sign in to the Procore web or mobile apps.

A [Developer Managed Service Account (DMSA)]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/developer_managed_service_accounts.md %}) uses the [OAuth 2.0 Client Credentials grant type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %}). The app authenticates with its `Client ID` and `Client Secret` to generate a time-bound access token, and it does not use an authorization code or refresh token. The developer defines the permissions the app needs in its app manifest, and a company administrator reviews and approves those permissions — and selects which projects the account can reach — when installing the app. An administrator can also override those permissions afterward, raising or lowering the app's access, though changing what the developer defined can affect how the app functions.

For more on the modern model, see <a href="https://v2.support.procore.com/faq-what-is-developer-managed-service-account" target="_blank">What is a Developer Managed Service Account?</a>
<br><br>

***

## How customers control app access

Every app must be installed in a company's Procore account before it can access any data there. An app that is not installed cannot function and has no access to that company's data — installation is the gate that grants an app entry to a company. For how installation works, see [How to Install & Set Up Apps]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/building_apps_install_arch.md %}).

The administrator's control at installation depends on the app type. A data connection app that uses a DMSA presents the permissions it requests, which the administrator reviews and approves or denies. An app that acts on behalf of a user presents no permissions at install — its access is bounded by the permissions of whoever authorizes it — and an embedded-only app requests no data-access permissions at all.

Once an app is authorized, it keeps that access until someone takes it away. A company administrator can cut off any app by uninstalling or disconnecting it through <a href="https://v2.support.procore.com/faq-what-is-app-management" target="_blank">App Management</a>, and an individual user can <a href="https://v2.support.procore.com/product-manuals/portfolio-company/tutorials/revoke-access-for-my-connected-apps" target="_blank">revoke an app's access</a> to their own account. Disconnecting an app in one company does not revoke the user's tokens or block the app in other companies where that user has access.

For a customer-facing explanation of this model, see <a href="https://v2.support.procore.com/faq-how-do-integrations-with-procore-access-my-companys-data" target="_blank">How do integrations with Procore access my company's data?</a>
<br><br>

***

## Rate limits

Procore enforces rate limits on API requests. Beyond keeping the platform stable, rate limits guard customers and Procore against abuse and runaway or excessive request volume from an integration. An app that exceeds the hourly limit or the short-term spike limit receives an `HTTP 429 Too Many Requests` response and should back off and retry rather than keep calling. For how the hourly and spike limits work, the rate limit headers Procore returns so your app can pace itself, and how to handle a `429`, see [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}) and the [API Usage Guidelines]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/api_usage_guidelines.md %}).
<br><br>

***

## Shared responsibility for security

Securing an integration is a shared responsibility across Procore, the developers who build integrations, and the customers who install them.

- **Procore** protects the platform and the customer data it stores, backed by third-party certifications and audits — see the <a href="https://www.procore.com/trust-and-security" target="_blank">Procore Trust Center</a>. Procore also gives developers the documentation, tools, and requirements to build secure integrations. Procore's app review applies to apps published to the Procore Marketplace, which it evaluates against its listing and security requirements — declining to list, or removing, apps that fall short. Apps that are not published to the Marketplace are not vetted by Procore.
- **Developers** build integrations in line with Procore's <a href="https://procore.pactsafe.io/legal.html#contract-hymckkfc9" target="_blank">API Terms of Use</a>, the <a href="https://procore.pactsafe.io/legal.html#contract-syqj4fbct" target="_blank">User Terms of Service</a>, the [Procore Developer Policy]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_policy.md %}), their own legal obligations, and industry best practices. They are responsible for the credentials and tokens they store, and for how their apps handle Procore data. Procore cannot independently verify a third party's internal security practices in every case.
- **Customers** decide which apps to install and when to disconnect them, approve the permissions a data connection app requests, and should assess each integration against their own security requirements.

Some Marketplace listings display a **Security & Trust — Partner Self-Certified** badge. A partner earns it by completing Procore's self-certification review and disclosing company-level security practices, certifications, data storage locations, and application security features. The badge is a disclosure signal, not a guarantee: it reflects a company-level review rather than application-level validation, and the partner is solely responsible for the accuracy of what they report. Before installing an app, customers can review the partner's badge answers, visit the partner's trust or security center, and run their own vendor assessment. For details, see <a href="https://v2.support.procore.com/faq-what-is-the-security-and-trust-self-certified-badge" target="_blank">What is the Security and Trust self-certified badge?</a>
<br><br>

***

## Further reading

- [Introduction to OAuth 2.0]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %})
- [Choose an Authentication Method]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %})
- [Using the OAuth 2.0 Client Credentials Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %})
- [Developer Managed Service Accounts (DMSA)]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/developer_managed_service_accounts.md %})
- [API Usage Guidelines]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/api_usage_guidelines.md %})
- <a href="https://procore.pactsafe.io/legal.html#contract-hymckkfc9" target="_blank">API Terms of Use</a>
- <a href="https://www.procore.com/trust-and-security" target="_blank">Procore Trust Center</a>
- <a href="https://tools.ietf.org/html/rfc6749" target="_blank">OAuth 2.0 Specification (RFC 6749)</a>
<br><br>
