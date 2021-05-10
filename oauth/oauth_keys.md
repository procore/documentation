---
permalink: /oauth-keys
title: Managing OAuth Credentials and Redirect URIs
layout: default
section_title: OAuth 2.0 Authentication
---

### Background

Once you have registered a new application on the Developer Portal you will work with two sets of OAuth credentials - one set for your _development sandbox_ and a separate set for the _production environment_.
Initially during the development phase, you use the sandbox credentials to make API calls to your sandbox company account.
Once you have promoted your sandbox application manifest to production and received approval from our App Validation team, you will have access to your production credentials.
See [Promoting a Sandbox Manifest to Production]({{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.
You will use your Client IDs, which are considered public information, to build login URLs or include in Javascript source.
Your Client Secrets, on the other hand, must be kept confidential.

> CLIENT SECRET CONFIDENTIALITY
>
> If your application is unable to maintain confidentiality with the Client Secret, as is the case with single-page Javascript applications or native applications, then you should not use the Client Secret. This is a common scenario with applications that implement the Implicit grant type.

Once a user successfully authorizes your app to access their data in Procore, the Procore authorization server redirects them back to your app with either an authorization code or access token in the URL depending on the particular [OAuth 2.0 _grant type_]({{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}) you have implemented.
To ensure that the user's browser is directed back to the proper location, you are required to define one or more _Redirect URIs_ for your application.
You can optionally manage two distinct sets of Redirect URIs for the sandbox and production environments, though this is not required.
The `http://localhost` redirect URI is registered by default when you create a new application in the Developer Portal.

## Managing Sandbox OAuth Credentials and Redirect URIs

Using the Sandbox Account section on the App Settings page you can view and manage the OAuth credentials and Redirect URIs for your sandbox.
Your sandbox Client ID and Client Secret is accessible in this section and you can reset the Client Secret as needed.
You can also add, update, or delete Redirect URIs for your sandbox.

![Sandbox Account screenshot]({{ site.baseurl }}/assets/guides/sandbox-account-ui-section.png)

## Managing Production OAuth Credentials and Redirect URIs

Using the App Credentials section on the App Settings page you can view and manage the the OAuth credentials and Redirect URIs for your production environment.
Your production Client ID is accessible in this section and you can reset the Client Secret as needed.
It is important to note that your production Client Secret is hidden from view in the App Credentials section and only visible to you once when you initially obtain production credentials through the manifest promotion process.

![App Credentials screenshot]({{ site.baseurl }}/assets/guides/app-credentials-ui-section.png)