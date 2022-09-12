---
permalink: /faq
title: FAQ
layout: default
section_title: Additional Resources
---

## General Questions/Issues

**What are the hours for API Support?**

Our official working hours are Monday - Friday from 8am - 5pm Pacific Time.

**How can I get support for any API questions I may have?**

Please contact <apisupport@procore.com> and a Developer Support Engineer will get back to you as soon as possible.

**My sandbox environments are not responding or I am getting an error.**

Please contact <apisupport@procore.com> and we will assist and escalate to our Site Reliability Engineering team if necessary.

**I’m looking for an endpoint or piece of information and can’t find it in the reference docs. What should I do?**

Please email <apisupport@procore.com> and we will assist you as soon as we can.

**How do I learn more about a particular Procore tool or product line?**

The [Procore Support Site](https://support.procore.com/) contains comprehensive documentation and instructional content covering all Procore tools and product lines.
We also recommend visting [learn.procore.com](https://learn.procore.com/) to access video-based content and certification curricula.

**How do I learn about the various user permissions in Procore?**

The [Procore Support Site](https://support.procore.com/) includes a reference page with a comprehensive breakdown of all user actions and the specific user permission(s) (Read-only, Standard, and/or Admin) that are required to perform a given action.

## Development Environments

**What time does the monthly sandbox restore?**

The monthly sandbox is restored on or about the 2nd day of each month.
To ensure that changes you make in your production environment are available in the next monthly restore, we recommend including these changes by the 20th of the month.

## OAuth 2.0 Authentication

**How long does my access token last?**

Once obtained, your access token will last for two (2) hours.
See [OAuth 2.0 Access Tokens]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_access_tokens.md %}) for additional information.

**How long does my refresh token last?**

Your refresh token will last indefinitely until it is used.
See [OAuth 2.0 Access Tokens]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_access_tokens.md %}) for additional information.

**My access token isn’t working. Why not?**

Please ensure that you are passing in your access token under the “Authorization” header in the format `"Bearer <token>"`.
If it has been at least two hours since you received your access token, make sure you have refreshed your token before passing it in.
If you have followed the previous instructions and are still having issues authenticating, please contact us at <apisupport@procore.com> and we will be happy to help.

**My refresh token is not working, or it says it is invalid. Why is that?**

There are a number of reasons why this might be the case as outlined in the following table.

| Symptom               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| Refresh Token Invalid | Keep in mind that refresh tokens are for one-time use only. For security reasons, any call to [refresh an access token](https://developers.procore.com/reference/authentication#get-or-refresh-an-access-token), successful or not, permanently invalidates the current refresh token. Therefore, if your application erroneously makes a "double-call", or does not properly store the returned access & refresh tokens, you will need to re-authenticate the user and retrieve all new tokens using the application's proper OAuth flow. |
| Refresh Token Revoked | Keep in mind that if you use the [Revoke Token](https://developers.procore.com/reference/authentication#revoke-token) endpoint to revoke your access token, your refresh token will also be revoked. Under this scenario, you will need to have your user re-authorize access to your application by calling the [Grant App Authorization](https://developers.procore.com/reference/authentication#grant-app-authorization) endpoint.                                                                                                      |
| Network Problems      | Note that on rare occasions you may experience network issues or other unforseen outages that could cause a call to be made but whose response is lost. In these cases, you would need to regenerate a fresh set of tokens.                                                                                                                                                                                                                                                                                                                |

**How can my installed application go through the OAuth flow without any user interaction?**

While our [installed application configuration]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_installed_apps.md %}) does allow for authentication without any user input, that is after the initial Grant App Authorization step is completed with user input.
Once you manually go through that step by logging in and getting an authorization code, you can then programmatically authenticate from that point forward without user intervention.
After the initial App Authorization Grant, you can retrieve a pair of tokens: an access_token and refresh_token.
The access_token is used to authenticate (passed in under the Authorization header as `Bearer <token>`), and it expires after 2 hours.
The refresh_token, which corresponds to that access_token, will not expire until it is used to acquire a new pair of tokens.
Using those two tokens, you can authenticate endlessly without any user input.

In other words, after getting your first pair of tokens, your program would use the access_token for up to 2 hours, after which that token would expire.
After that token expires, the next time your program wanted to access our API it would use the refresh_token received with the now-expired access_token to [refresh the access token](https://developers.procore.com/reference/authentication#get-or-refresh-an-access-token) and get a new pair of tokens.
Once it makes that call, your old refresh_token would expire since it has now been used and you would have a new access_token and refresh_token.
Then, your program would use that new access_token until it expires, and the cycle would repeat again.
Alternately, you can elect to design your application to use a [service account](https://support.procore.com/faq/what-is-a-service-account) and the [OAuth 2.0 Client Credentials Grant Type](({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %})) which requires no end-user interaction.

**Why does my browser take me back to an integration page when I open a new browser tab and type in https://app.procore.com?**

In certain scenarios, you may be redirected back to an integration's web application rather than to Procore due to browser caching and other factors. Below is a summary of the behavior.

1. A user logs in to a web application that integrates with Procore.
1. In the process of authenticating with Procore through the Authorization Code grant flow, the user enters their Procore login credentials and they are redirected to the integration.
1. The user now opens another browser and types in “https://app.procore.com” to attempt to simultaneously interact with Procore and the integration. However, instead of navigating to the Procore login page, they are redirected back to the integration’s web application.

If this occurs, the following workaround will resolve the issue.

- Users should explicitly navigate to “https://login.procore.com” anytime they want to access the Procore web application while simultaneously working with an integrated web application.

## IP Whitelisting

**Does Procore publish a list of IP addresses for whitelisting purposes?**

Some app developers have inquired about which IP addresses Procore API requests are coming from in order to open up specific ports in a firewall.
However, due to the fluid nature of our architecture, we do not have a set range of IPs that API requests consistently originate from.
As a result, Procore does not publish a list of IP addresses for whitelisting purposes because the pool of IP addresses we use can change frequently.
If your internal network environment requires whitelisted IPs in order to allow access, we suggest hosting a server outside your network (e.g.
in a network DMZ) to proxy requests from Procore into the internal network.

## JSON

**What is JavaScript Object Notation (JSON)?**

JSON is an open-standard file format that uses human-readable text to transmit data objects consisting of attribute–value pairs and array data types. It is the data format used for Procore API requests/responses.

**Is there a standard design pattern for how object attributes are ordered in Procore API JSON responses?**

No. In general, an object will have an unordered set of name/value pairs.
On the other hand, you may sometimes see ordered lists, either lexically or otherwise.
However, this is not something you should generally expect or rely on for Procore API endpoints, new or existing.

## Testing

**What is the recommended method for testing my Procore API calls?**

We currently do not provide a 'built-in' API Explorer in our Developer Portal.
However, one application we highly recommend is [Postman](https://www.getpostman.com/).
This application allows you to run and test Procore API endpoints.
This is the tool of choice for our Developer Support team as well as our own in-house developers.

## Deprecation

**How is deprecation handled for Procore API endpoints, and what is the policy?**

As you browse through our Procore API documentation you may see deprecation warning banners on some of our endpoint reference pages.
Please see our [API Lifecycle guide]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_lifecycle.md %}) for information on our API deprecation policy.

## Cross-Origin Resource Sharing (CORS)

**Does the Procore API support Cross-Origin Resource Sharing (CORS)?**

Yes, assuming your users are accessing your application using a modern browser version.
In order to take advantage of CORS, you must first register your domain with our API Support team by contacting them at <apisupport@procore.com>.

**When trying to send a request from my client-side application, I’m getting an error like this: “XMLHttpRequest cannot load [URL]. No 'Access-Control-Allow-Origin' header is present on the requested Resource.” Why is this happening?**

For CORS requests from client-side apps, you will need to have your origin domain whitelisted for your app.
To do that, please contact <apisupport@procore.com> and provide the domain you wish to have whitelisted.

**How many CORS domains can I whitelist?**

While it is certainly possible have more than one domain whitelisted for CORS, please contact our [API Support](mailto:apisupport@procore.com) Team to discuss your requirements so we can arrive at a solution that makes the most sense for your particular needs.

## Webhooks

**How do I get notified of changes to specific Procore resource objects?**

Our Webhooks feature allows you to establish a system through which you can receive notifications for changes that occur to specific resources.
Please visit our [Introduction to Webhooks]({{ site.url }}{{ site.baseurl }}{% link webhooks/webhooks.md %}) and [Using the Webhooks API]({{ site.url }}{{ site.baseurl }}{% link webhooks/webhooks_api.md %}) guides on the Developer Portal for additional information.

## Procore API Rate Limit

**I am receiving a 429 status code error when making a call to the Procore API, what causes this?**

You have exceeded the Procore API rate limit of 3600 requests per hour.
See our [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link api_essentials/rate_limiting.md %}) guide for additional information and suggestions for resolving your issue.

## Multiple Procore Zones (MPZ)

**I’m passing in the Procore Company ID header as required. Do I also need to pass in the query parameter with the company ID in it?**

Yes. If the endpoint you are working with normally requires a `company_id` as either a path or query parameter, you still need to include it in your call, regardless of MPZ header requirements.

## App Management

**I’ve suddenly started getting a 403 forbidden error with the message "App is not connected to this company". Why is this?**

Your application has been disconnected from the company using the App Management page in Procore Web.
As a result, your application is no longer able to access data in that company.
To resolve this issue, use the App Management page in Procore Web to reconnect your application to that company.
For additional information see [What is App Management?](https://support.procore.com/faq/what-is-app-management).

## Error Codes

**I'm receiving a particular error code. What does it mean?**

Our [RESTful API Concepts]({{ site.url }}{{ site.baseurl }}{% link api_essentials/restful_api_concepts.md %}) guide includes a section that lists standard error codes you may encounter while working with the Procore API.
If you need additional assistance with dealing with errors, please contact <apisupport@procore.com>.

## Production Access

**I'm ready to test my application against data in my production environment. How do I request production access?**

Our guide to [Creating a New Application]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_intro.md %}) outlines the steps for requesting production credentials (client_id and client_secret) for your application.
