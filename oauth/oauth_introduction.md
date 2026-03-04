---
permalink: /oauth-introduction
title: Introduction to OAuth 2.0
layout: default
section_title: OAuth 2.0 Authentication
---

## What is OAuth 2.0?
OAuth 2.0 is a protocol that allows third-party applications to authenticate with APIs without storing or transmitting user passwords. Instead, your application uses a **Client ID** and **Client Secret** (unique to your app) to request access on behalf of a user.

## Key Facts

- **Access tokens** last for **90 minutes** (5400 seconds)
- **Refresh tokens** last indefinitely until used
- Your app never handles user passwords — only tokens
- Users can **revoke access** to your app at any time
- Every Procore API request requires a valid access token in the `Authorization` header

## How Procore Uses OAuth 2.0
When working with the Procore API, your application accesses Procore on behalf of your users. Each user authenticates with Procore to verify their identity and grant your application permission to use their data.

OAuth 2.0 facilitates two main actions:
1. **Obtaining an access token** through user authorization
2. **Using that access token** to make API requests

Your application credentials (Client ID and Client Secret) are used as part of an authorization step in which the user chooses to allow or deny your application access to their data in Procore.

## New to OAuth 2.0?
If you're unfamiliar with the protocol, these resources will help:
- [OAuth 2.0 specification](http://tools.ietf.org/html/rfc6749) — The official spec
- [OAuth 2.0 Simplified](http://aaronparecki.com/oauth-2-simplified/) by Aaron Parecki — A practical, readable guide

## Explore OAuth 2.0 Documentation for the Procore API

- [Understanding OAuth 2.0 Roles]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_roles.md %})
- [OAuth 2.0 Access Tokens]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_access_tokens.md %})
- [Managing OAuth Credentials and Redirect URIs]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_keys.md %})
- [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %})
- [OAuth 2.0 Authorization Code Grant Flow]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %})
- [Using the OAuth 2.0 Client Credentials Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %})
- [OAuth 2.0 for Installed Applications]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_installed_apps.md %})
- [Procore API Authentication Endpoints]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %})

[//]: ### Procore OAuth 2.0 Postman Collection with cURL Examples

[//]: We've put together a helpful Postman collection of cURL examples for the Procore OAuth 2.0 Authentication endpoints that you can use while you build, test, and maintain your application.
[//]:Simply [visit this link](https://documenter.getpostman.com/view/3996804/SW7bzS65) to view the collection and begin exploring the Procore OAuth 2.0 authentication endpoints.
[//]:Each endpoint includes an explanation of its functionality along with a pre-formatted cURL example command that you can copy and paste as needed.
