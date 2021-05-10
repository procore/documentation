---
permalink: /oauth-roles
title: Understanding OAuth 2.0 Roles
layout: default
section_title: OAuth 2.0 Authentication
---

In order to help you fully understand the OAuth 2.0 protocol, let’s go over the different roles that interact during the course of a complete OAuth 2.0 flow.
The following table summarizes these roles.

| Role                           |   Description                                                                                                                                                                                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resource Owner (Procore User)  | An entity capable of granting access to a protected resource. When the resource owner is a person, it is referred to as an end-user.                                                                                                                                         |
| Resource Server (Procore API)  | The server hosting the protected resources, capable of accepting and responding to protected resource requests using access tokens.                                                                                                                                          |
| Client (Your Application)      | An application making protected resource requests on behalf of the resource owner and with its authorization. The term client does not imply any particular implementation characteristics (e.g. whether the application executes on a server, a desktop, or other devices). |
| Authorization Server (Procore) | The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization.                                                                                                                                             |

Let's summarize these roles:

- First, we have the Resource Owner, which is the entity that grants access to a protected resource. In our case, the resource owner is the Procore User that is authorizing your application to access their Procore account.
- Next, we have the Resource Server, where all of the resources that your application will be accessing are hosted - in our case that is Procore.
- Then, there is the client that makes requests on behalf of the resource owner (user), and in this case that client will be your application.
- Finally we have the authorization server, which processes the authorization and authentication and passes access tokens back to the client application. Procore also plays this role in this instance.