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

## Requesting an Access Token

With a DMSA installed in Procore, you can retrieve an OAuth 2.0 access token by making a POST call to the [/oauth/token](https://developers.procore.com/reference/rest/v1/authentication#get-or-refresh-an-access-token) endpoint in the Procore API.
The JSON payload for this call is formatted as follows:

```
{
  "grant_type": "client_credentials",
  "client_id": "242635f69bfc6fb9adax513875a0254a2a908f7bb176x1698d6x169a08f5646d",
  "client_secret": "041372a09c6e4x92aa08ce3axea1cfc0115cbfbf7134exa125fe10cc103ca626"
}
```

And here is a cURL example for calling the [/oauth/token](https://developers.procore.com/reference/rest/v1/authentication#get-or-refresh-an-access-token) endpoint:

```
curl -F grant_type=client_credentials \
     -F client_id=242635f69bfc6fb9adax513875a0254a2a908f7bb176x1698d6x169a08f5646d \
     -F client_secret=041372a09c6e4x92aa08ce3axea1cfc0115cbfbf7134exa125fe10cc103ca626 \
     -X POST https://login.procore.com/oauth/token
```

The JSON response block from the call includes an `access_token` string and addtional attributes as shown here:

```
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9xeyJhaWQiOiIwY2I3ZDc1...",
  "token_type": "bearer",
  "expires_in": 7200,
  "created_at": 1511289006
}
```

- `token_type` - value of "bearer" indicates that the Authorization header you pass when making Procore API calls will be the "bearer" type.
- `expires_in` - value of 7200 indicates that the access token is valid for 7200 seconds (2 hours).
- `created_at` - date/time the access token was genterated in UNIX time format.

## Making a Test Call to the Procore API

Now that you have a valid access token you can make a test call to the Procore API. For this simple example, we will make a call to the [List Projects](https://developers.procore.com/reference/rest/v1/projects#list-projects) endpoint to return a list of the active projects in our company.

```
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9xeyJhaWQiOiIwY2I..." \
     -X GET https://api.procore.com/rest/v1.0/projects?company_id=7656
```

If successful, this call will return a JSON response block similar to the following:

```
{
  "id": 123456,
  "name": "Demo Account Project",
  "display_name": "Demo Account Project",
  "project_number": null,
  "address": "5678 First Street",
  "city": "Anytown",
  "state_code": "CA",
  "country_code": "US",
  "zip": "93013",
  "county": null,
  "latitude": 34.385045633646,
  "longitude": -119.490841957738,
  "stage": "Course of Construction",
  "phone": "",
  "created_at": "2016-08-22T20:18:55Z",
  "updated_at": "2017-10-23T21:19:34Z",
  "active": true,
  "origin_id": null,
  "origin_data": null,
  "company": {
      "id": 1234,
      "name": "My Construction Company"
  }
}
```

## Using Developer Managed Service Accounts with MPR

If you intend to use DMSAs with Multiple Procore Zones (MPR), you _must_ include the `Procore-Company-Id` request header when making calls to the `/rest/v1.0/me` or `/rest/v1.0/companies` endpoints.

Here is a cURL example showing a call to `GET /rest/v1.0/me`:

```
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9xeyJhaWQiOiIwY2I..." \
     -H "Procore-Company-Id: xxxxxxxxx" \
     -X GET https://api.procore.com/rest/v1.0/me
```

Here is a cURL example showing a call to `GET /rest/v1.0/companies`:

```
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzUxMiJ9xeyJhaWQiOiIwY2I..." \
     -H "Procore-Company-Id: xxxxxxxxx" \
     -X GET https://api.procore.com/rest/v1.0/companies
```

The value to use for the `Procore-Company-Id` header can be retrieved from the URL in the address bar of your browser once you have logged into a company.
The company ID displays in the URL as a path parameter as shown in the following example.

```
https://app.procore.com/<COMPANY ID>/company/home/list
```

Where: `<COMPANY ID>` is the integer value for the ID of the company you are currently logged into.

For addtional information on MPR, see [Working with Multiple Procore Regions]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_mpz.md %}).

## Security Considerations

Depending on how you plan to use the Client Credentials grant flow, the credentials for your application (Client ID and Client Secret) could potentially provide access to a large amount of data.
The more data a single set of credentials has access to, the greater the risk if the credentials become compromised.
Therefore, it is imperative that the credentials used to authenticate your application with Procore are kept confidential.
Ideally, these credentials would also be rotated regularly.