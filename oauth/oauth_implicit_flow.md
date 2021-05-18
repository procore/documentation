---
permalink: /oauth-implicit-flow
title: OAuth 2.0 Implicit Grant Flow
layout: default
section_title: OAuth 2.0 Authentication
---

## Introduction

If you are planning on developing a Single Page Application (SPA) with no backend components, or intend to invoke the Procore API via JavaScript, we recommend using the Implicit Grant flow for access token acquisition.
SPAs run entirely in the browser after loading the source code from a web page.
Since the entire source code is available to the browser, SPAs cannot maintain the confidentiality of their Client Secret.
As a result, the authorization code exchange step is skipped in the Implicit Grant flow and the access token is returned directly from the Grant App Authorization endpoint (/authorize).

> SECURITY CONSIDERATIONS
>
> There are a number of security considerations and caveats that you should take into account if you intend to implement the Implicit Grant flow.
>
> - Since access tokens are delivered in the URL in the Implicit Grant flow, the risk of interception is higher than in the Authorization Code grant type.
> - Details of the various security threats inherent in the Implicit Grant flow and appropriate countermeasures are documented in section 4.4.2 of [OAuth 2.0 Threat Model and Security Considerations](https://tools.ietf.org/html/rfc6819#section-4.4.2).
>
> Please contact <apisupport@procore.com> if you have any questions about implementing the Implicit Grant flow for your application.

In the following sections we examine the Oauth 2.0 Implicit Grant flow in the context of the Procore API and provide some sample javascript code that demonstrates a SPA making a simple call to the Procore API.

## Implicit Grant Activity Diagram

The diagram below illustrates the interaction between the various entities comprised by the Implicit Grant flow.

![Implicit activity]({{ site.baseurl }}/assets/guides/implicit-activity-diag.svg)

Let's summarize the flow as depicted in the diagram:

1. The Procore user opens her browser and navigates to your App's web page.
1. Your App displays a page with a button, link, or other control that allows the user to initiate the authorization step with the Procore authentication server.
1. The user clicks the control on the page served from the authentication server and initiates the flow.
1. The Procore authentication server presents the user with Procore login panel.
1. The user enters her Procore credentials and logs in.
1. The Procore authentication server responds by displaying the consent dialog.
1. The user elects to either allow or deny your App access to their data in Procore.
1. Once authorized by the user, the Procore authentication server redirects control back to your App with the access token included in the hash fragment of the redirect URL.
1. Your App extracts the access token from the hash fragment of the redirect URL.
1. Your App uses the extracted access token and initiates a request to the Procore API on behalf of the user.
1. The Procore API processes the request and responds with a JSON object.
1. Your App displays the contents of the JSON response object in the user's browser.
1. The user views the results of the API call in her browser.

## Javascript Single Page Application Example

You can [download this sample code]({{ site.baseurl }}/assets/static/implicit-grant-sample-code.html) to help you create a simple SPA that authenticates with Procore and initiates a basic call to the Procore API.

> CROSS-ORIGIN RESOURCE SHARING (CORS)
>
> When trying to send an API request from a client-side application using the Implicit Grant flow, you may receive an error indicating that "the 'Access-Control-Allow-Origin' header is present on the requested Resource.”
> For CORS requests from client-side applications, you will need to have your origin domain whitelisted for your App.
> To do that, please contact <apisupport@procore.com> and provide the domain you wish to have whitelisted.

