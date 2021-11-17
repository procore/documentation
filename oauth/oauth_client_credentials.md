---
permalink: /oauth-client-credentials
title: Using the OAuth 2.0 Client Credentials Grant Type
layout: default
section_title: OAuth 2.0 Authentication
---

## Introduction

The Client Credentials flow is perhaps the most simple of the OAuth 2.0 flows supported by the Procore API.
The primary difference with the Client Credentials flow is that it is not associated with a specific Procore user (resource owner).
In addition, it is not necessary to first obtain an authorization code before retrieving an access token when using the the Client Credentials grant type.

The Procore API implementation of the Client Credentials flow relies on the use of a [_Developer Managed Service Account (DMSA)_]({{ site.url }}{{ site.baseurl }}{% link building_applications/developer_managed_service_accounts.md %}).
The client application requests an access token using its own credentials through a DMSA, which determines the tools and projects the application can access.

## Common Use Cases

There are a number of scenarios in which using the Client Credentials grant flow in the Procore API is the preferred approach.

- Data Connection Apps - sync operations, import/export, or other tasks where a specific user’s permission to access their data is not required.
- Report generators - data mining, sync operations, or other integrations that access company-wide data.
- Backend scripts - system maintenance and administration utilities.

## Security Considerations

Depending on how you plan to use the Client Credentials grant flow, the credentials for your application (Client ID and Client Secret) could potentially provide access to a large amount of data.
The more data a single set of credentials has access to, the greater the risk if the credentials become compromised.
Therefore, it is imperative that the credentials used to authenticate your application with Procore are kept confidential.
Ideally, these credentials would also be rotated regularly.