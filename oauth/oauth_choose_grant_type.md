---
permalink: /oauth-choose-grant-type
title: Choosing an OAuth 2.0 Grant Type
layout: default
section_title: OAuth 2.0 Authentication
---

## Overview

The first step to implementing an OAuth 2.0 solution for your application or integration is to select the proper OAuth 2.0 authorization grant type for your use case.
The grant type, or means by which a client application acquires an authorized access token, is used to authenticate a request to a Procore API endpoint.
Normally, you determine the proper grant type based on the architecture and framework of your particular project.
Let’s outline the OAuth 2.0 grant types supported by the Procore API.

## Authorization Code Grant (Web Server Applications)

If you are developing a web server-based solution, then you will want to implement the Authorization Code grant type.
Web server applications are written in a server-side language where the source code of the application is not visible to the public.
This means the application is able to take advantage of the Client Secret when communicating with the authorization server, which provides more robust security.
The authorization grant type is considered a “redirection-based” flow.
As such, your application must be capable of interacting with the user’s web browser as well as receiving incoming requests (via redirection) from the Procore authorization server.

Here is a diagram illustrating the flow for the Authorization Code grant type. Let’s walk through each step in the flow.

![Auth code grant type]({{ site.baseurl }}/assets/guides/auth-code-grant-type-diag.svg)

1. When a Procore user accesses your application, it initiates the authorization grant flow and redirects the user’s web browser to the Procore API Grant App Authorization endpoint (/authorize), so the user can authenticate.
1. The Procore authorization server authenticates the user (via the browser) and displays a consent dialog where the user can choose to allow or deny your application access to their data in Procore.
1. Once the user allows access, the Procore authorization server redirects the user back to your application with an Authorization Code.
1. Your application then sends the Authorization Code to the authentication server and asks to exchange it with an access token. This is accomplished using the /token endpoint. When making this request, your application authenticates with the Procore server using your Client ID and Client Secret.
1. The Procore authentication server authenticates your application, validates the Authorization Code and responds back with the access token.
1. Your application can now use the access token to make calls to the Procore API on behalf of the user.

### Using the State Parameter to Enhance Security

The [OAuth 2.0 specification](http://tools.ietf.org/html/rfc6749) provides for enhanced security through the use of the `state` parameter.
By incorporating the `state` parameter into the Authorization Grant flow for your application, you can reduce the likelihood of a [Cross-site Request Forgery (CSRF) attack](http://tools.ietf.org/html/draft-ietf-oauth-v2-22#section-10.12).
CSRF is an exploit in which an attacker causes the user-agent of an end-user to follow a malicious URI to a trusting server.
The `state` parameter is intended to preserve a state object set by the client in the Authorization request and make it available to the client in the response.
The client can then verify the state parameter value in the response - something an attacker could not know.
If the client successfully verifies the value returned, it will reject authorization responses that were generated as the result of requests by third-party attackers trying to log in as the user in the background without the user's knowledge.

In the context of the Procore API, the `state` parameter is passed with the GET request to the [Grant App Authorization](https://developers.procore.com/reference/authentication#grant-app-authorization) endpoint.
The `state` parameter is an arbitrary alphanumeric string that can represent any value you choose.
Your application uses the `state` request parameter to deliver a unique value to the Procore authorization server when making an authorization request.
Once authorization has been granted by the end-user, the Procore authorization server redirects the end user's user-agent (browser) back to your application with the required binding state value included as a query parameter in the redirect URI along with the authorization code.

Though not required for implementing OAuth 2.0 in your Procore integration, we highly recommend including the `state` parameter in your authentication architecture.

## Implicit Grant (Client-Side, Browser-based Applications)

If you are developing a client-side application, such as a single-page javascript browser-based solution, then you will want to implement the Implicit grant type. Browser-based applications run entirely in the browser after loading the source code from a web page. Since the entire source code is available to the browser, they cannot maintain the confidentiality of their Client Secret, so the secret is not used in this case. The authorization code exchange step is skipped and the access token is returned directly from the Grant App Authorization endpoint (/authorize).

Here is a diagram illustrating the flow for the Implicit grant type. Let’s walk through each step in the flow.

![Implicit grant type]({{ site.baseurl }}/assets/guides/implicit-grant-type-diag.svg)

1. When a Procore user accesses your application, it initiates the implicit grant flow and redirects the user’s web browser to the Procore API, so the user can authenticate.
1. The Procore authentication server authenticates the user (via the browser) and displays a consent dialog where the user can choose to allow or deny your application access to their data in Procore.
1. Once the user allows access, the Procore authentication server redirects the user back to your application with an access token in the hash fragment of the URI. Your application can now extract the token from the hash fragment. In a Single Page Application (SPA) this would be done using JavaScript and in a Mobile Application this is typically handled by interacting with a Web View.
1. Your application can now use the access token to make calls to the Procore API on behalf of the user.

## Client Credentials Grant (Machine-to-machine, userless access)

If you are developing an application or integration that does not rely on or require access authorization from a specific Procore user, then you will want to implement the Client Credentials grant type.
This grant type is appropriate for "machine-to-machine" integrations.
For additional information on implementing the Client Credentials grant flow in your application, see [OAuth 2.0 Using Client Credentials]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %}).

Here is a diagram illustrating the flow for the Client Credentials grant type. Let’s walk through each step in the flow.

![Client grant type]({{ site.baseurl }}/assets/guides/client-credentials-grant-type-diag.svg)

1. Client requests an access token from the Procore Authentication Server using the Client ID and Client Secret credentials associated with the service account in Procore.
1. The Procore Authentication Server returns a JSON response that includes the access token and other supporting data.
1. Your application can now use the access token to make calls to the Procore API


