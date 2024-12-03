---
permalink: /api-security-overview
title: Procore API Security Overview
layout: default
section_title: API Essentials

---

## Background

Procore employs what many consider the industry standard for API authentication - [OAuth 2.0](https://tools.ietf.org/html/rfc6749).
The OAuth 2.0 authentication framework provides a secure means of authorizing and authenticating access to user data for third-party applications.
Developers building integrations with the Procore API implement one of several [OAuth 2.0 authorization grant types]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}) depending on their particular application use case.
The OAuth 2.0 grant types supported by the Procore API rely on the use of tokens which are string values that represent the authorization and authentication of a specific application to access data in Procore on behalf of a Procore user.

## Understanding OAuth 2.0 Token Behavior

There are two types of tokens to consider in the context of OAuth 2.0 - _access tokens_ and _refresh tokens_.
An access token is passed in with an API request and lets the Procore API server know who the logged in user is that is making the request and allows an application to take action on their behalf (using the same permissions the user has in the Procore web application).
An access token lasts for 1.5 hours, after which it ceases to function.
A refresh token is used to request a new access token after the existing one expires.
The refresh token lasts indefinitely until it is consumed by a request for a new access token (at which point a new refresh token is generated).

In order to generate an initial access token, an application uses a combination of its own credentials (Client ID and Client Secret) and an authorization code which is generated after the user authorizes the app to access their data and act on their behalf.
After the user has authenticated with Procore and performed app authorization, that app can use the generated tokens to access the user’s data via the API and can continue to do so indefinitely unless the user revokes the app’s tokens.
A company in Procore can prevent a specific app from accessing data in their account by disconnecting that app using the [App Management](https://support.procore.com/faq/what-is-app-management) screen.
Disconnecting the app in a specific company will not revoke tokens on behalf of the user or prevent the app from accessing a user’s data in other companies in which they exist.

## Service Accounts

>**Deprecation of Traditional Service Accounts**
>
> Traditional Service Accounts were deprecated on December 9, 2021.
> Beginning January 21, 2025, we will no longer allow the creation of new Traditional Service Accounts.
> Existing Traditional Service Accounts will continue to function until March 24, 2025.
> As a result of this deprecation, developers of data connection applications that currently use traditional service accounts are required to update their applications to use Developer Managed Service Accounts (DMMSAs), and customers will be required to install these updated applications before the sunset date.
> See the following articles for information on DMSAs and steps for migrating your projects from traditional service accounts.
> - [Deprecation of Traditional Service Accounts]({{ site.url }}{{ site.baseurl }}{% link overview/service_account_deprecation.md %})
> - [Developer Managed Service Accounts]({{ site.url }}{{ site.baseurl }}{% link building_applications/developer_managed_service_accounts.md %})

Service accounts, which are created and managed by company administrators using the Procore web application, can only be used to access API data within the company account in which they are created.
Service accounts do not utilize refresh tokens, but rather use their Client ID and Client Secret to generate a new access token that lasts for 1.5 hours each time they are used to make API requests.
See [Using the OAuth 2.0 Client Credentials Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %}) for additional information.
Service accounts do not act on behalf of an existing Procore user, but rather they utilize a [Directory contact](https://support.procore.com/faq/what-is-a-contact-in-procore-and-which-project-tools-support-the-concept) that is generated automatically upon creation of the service account.
Service account permissions and access are controlled by the permissions settings for the Directory contact.
By default, upon initial creation a service account will have no permissions ('None') to view any data within the company it is created in.
Procore administrators must manually specify elevated permissions to the service account in order for it to have access to more data.
A service account has an auto-generated @procore.com email address which is inaccessible and cannot be used to set a password or log in to the Procore web/mobile applications.

## Things to Keep in Mind when Using Service Accounts

- If the email address associated with a service account is edited or added to another company’s directory, the service account will cease to function entirely.
- Because service accounts use only a Client ID and Client Secret to authenticate (with no authorization code or refresh token) the Client Secret is only displayed to the creating user one time, and needs to be securely stored before proceeding. If the Client Secret is lost, a Procore user with administrator permissions will need to generate a new Client Secret, which will reset the permissions for the service account and revoke any existing access tokens.

## Additional API Security Considerations

Application and user credentials in Procore are protected from any malicious actors in the same manner in which all of our other data is protected.
However, third-party integrators who store tokens/credentials are not necessarily guaranteed to follow the same security practices that Procore does.
All third-party developers agree to the [Procore Developer Portal Terms of Use](https://developers.procore.com/terms_and_conditions), but ultimately their security practices are not specifically known to us in all cases.

## Further Reading

Here is a list of additional resources to help you learn more about OAuth 2.0 and Procore API Security.

- [Introduction to OAuth 2.0]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %}).
- [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749)
- [OAuth 2.0 Simplified](https://aaronparecki.com/oauth-2-simplified/)
- [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %})
- [What is a Service Account?](https://support.procore.com/faq/what-is-a-service-account)
- [Information Security and Privacy](https://support.procore.com/references/information-security-and-privacy)

