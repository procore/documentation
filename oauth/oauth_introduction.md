---
permalink: /oauth-introduction
title: Introduction to OAuth 2.0
layout: default
section_title: OAuth 2.0 Authentication
---

When working with the Procore API your application will access Procore on behalf of your users.
Each user will need to authenticate with Procore to verify their identity and to give your application permission to use and access their data.

OAuth 2.0 is a protocol that allows third-party applications to authenticate with APIs.
OAuth 2.0 facilitates two main actions - obtaining an access token through user authorization, and using that access token to make API requests.
At the end of a successful OAuth 2.0 exchange, an access token that lasts for two hours is returned to your application.
You will need to submit this token with each Procore API request in order to properly identify your application and access end-user data in a secure manner.

Because the Procore API supports the OAuth 2.0 protocol, your application does not need to store or transmit user account names or passwords, but instead relies on application credentials in the form of a Client ID and Client Secret that are unique to your application.
The OAuth 2.0 protocol uses these credentials as part of an authorization step in which the user chooses to allow (or deny) your application access their data in Procore.
Access granted to your application may be revoked at any point by the end user.
The result is a more secure API for Procore end users.

If you are brand new to OAuth 2.0, we recommend you review the official [OAuth 2.0 specification](http://tools.ietf.org/html/rfc6749), as well as [OAuth 2.0 Simplified](http://aaronparecki.com/oauth-2-simplified/) by Aaron Pareki to help you come up to speed with the OAuth 2.0 protocol.

### Explore OAuth 2.0 Documentation for the Procore API

- [Understanding OAuth 2.0 Roles]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_roles.md %})
- [OAuth 2.0 Access Tokens]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_access_tokens.md %})
- [Managing OAuth Credentials and Redirect URIs]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_keys.md %})
- [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %})
- [OAuth 2.0 Authorization Code Grant Flow]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %})
- [OAuth 2.0 Implicit Grant Flow]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_implicit_flow.md %})
- [Using the OAuth 2.0 Client Credentials Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %})
- [OAuth 2.0 for Installed Applications]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_installed_apps.md %})
- [Procore API Authentication Endpoints]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %})

### Procore OAuth 2.0 Postman Collection with cURL Examples ###

We've put together a helpful Postman collection of cURL examples for the Procore OAuth 2.0 Authentication endpoints that you can use while you build, test, and maintain your application.
Simply [visit this link](https://documenter.getpostman.com/view/3996804/SW7bzS65) to view the collection and begin exploring the Procore OAuth 2.0 authentication endpoints.
Each endpoint includes an explanation of its functionality along with a pre-formatted cURL example command that you can copy and paste as needed.