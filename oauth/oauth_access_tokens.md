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
Most services provide a token endpoint where applications make a request to obtain an access token for a user.

The Procore API employs a combination of access tokens and refresh tokens for maximum security and flexibility.
By design, the Procore authorization server issues short-lived access tokens.
When the server issues an access token to your application, it also generates and returns a refresh token.
Once the initial access token expires, your application uses the refresh token to obtain a renewed access token.
This seamless process occurs behind the scenes without user involvement, and repeats continously for the duration of the user's browser session.

Using this approach, the Procore API is able to issue self-encoded access tokens which are verifiable without a database lookup.
The access tokens are issued with a short expiration time requiring your application to continually refresh them on a periodic basis.
Additionally, this method gives Procore the ability to revoke access if needed.

>**IMPORTANT: Planned Reduction in OAuth Access Token Expiration Times**
>
>The Procore API OAuth token timeout is gradually being reduced from 2 hours to 15 minutes to align with authentication security best practices.
>The original expiration time of 2 hours did not provide the level of security that many of our partners and customers demand today.
>Ultimately, these changes do not mean processes using Procore APIs lasting longer than 15 minutes will need to be split into 15 minute segments.
>Rather, your code that calls these processes needs to periodically check the status of the OAuth token and refresh it if a 401 Unauthorized HTTP status code is returned that indicates “Your access token has expired, please use your refresh token to obtain a fresh token.”
>
>- One method of preventing OAuth token expiration is to always use the `expires_in` value returned from the `/authentication` endpoint to set a timer (in seconds) and refresh your token before it expires.
>By proactively refreshing your token before it expires you can ensure processing is uninterrupted.
>- Another method to safeguard against code failing due to OAuth token expiration is to have a try:catch (or equivalent) code block that refreshes your token when a 401 Unauthorized errors is encountered.
>
>Keep in mind that the refresh token may only be used once.
>In concurrent/parallel network call situations, synchronization needs to be used to ensure only one refresh attempt is in flight.
>After it completes, your code may resume any prior failed/blocked requests.
>Note: This is only valid for API clients that utilize a refresh token.
>
>In typical situations, the approaches described above are the most effective Procore OAuth token refresh strategies for staying resilient with regard to token lifetimes.
>Retrieving a new OAuth token on every Procore API call is not encouraged.
>
>If you have questions regarding this change, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

The following table summarizes the two OAuth 2.0 token types used with the Procore API along with their expiration times and other characteristics.

| Token Type    | Expiration    | Description                                                                                                                                                                          | Applicable OAuth 2.0 Grant Flows                                                                                                                                                                                  |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Access Token  | 1.5 Hours | A confidential credential used by an application to access the Procore API on behalf of a user.                                                                                      | [Authorization Code Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %})<br>[Client Credentials Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %}) |
| Refresh Token | Until Used    | A special kind of token used by an application to obtain a renewed access token. This token lasts indefinitely until it is consumed, at which point a new refresh token is returned. | [Authorization Code Grant]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_auth_grant_flow.md %})                                                                                                             |

### Related Topics

- [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %})
- [Procore API Authentication Endpoints]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %})
