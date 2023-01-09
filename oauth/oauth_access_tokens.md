---
permalink: /oauth-access-tokens
title: OAuth 2.0 Access Tokens
layout: default
section_title: OAuth 2.0 Authentication
---

Under the OAuth 2.0 specification, applications utilize access tokens to make API requests on behalf of a user.
In the context of the Procore API, an access token represents the authorization for a specific application to access a user’s data in Procore.
Access tokens must remain confidential in both transit and storage.
As a result, access tokens are only used over https (SSL) connections, since passing them over non-encrypted channels renders them suceptable to interception and compromised security.
Most services provide a token endpoint where apps make a request to obtain an access token for a user.

The Procore API employs a combination of access tokens and refresh tokens for maximum security and flexibility.
By design, the Procore authorization server issues short-lived access tokens.
When the server issues an access token to your application, it also generates and returns a refresh token that never expires.
Once the initial access token expires, your application uses the refresh token to obtain a renewed access token.
This seamless process occurs behind the scenes without user involvement, and repeats continously for the duration of the user's browser session.

Using this approach, the Procore API is able to issue self-encoded access tokens which are verifiable without a database lookup.
The access tokens are issued with a short expiration time requiring your application to continually refresh them on a periodic basis.
Additionally, this method gives Procore the ability to revoke access if needed.

The following table summarizes the two OAuth 2.0 token types used with the Procore API along with their expiration times and other characteristics.

| Token Type    | Expiration    | Description                                                                                                                                                                          | Applicable OAuth 2.0 Grant Flows                                                                                                                                                                                  |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Access Token  | Two (2) Hours | A confidential credential used by an application to access the Procore API on behalf of a user.                                                                                      | [Authorization Code Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %})<br>[Client Credentials Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %}) |
| Refresh Token | Until Used    | A special kind of token used by an application to obtain a renewed access token. This token lasts indefinitely until it is consumed, at which point a new refresh token is returned. | [Authorization Code Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %})                                                                                                             |

### Related Topics

- [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %})
- [Procore API Authentication Endpoints]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %})
