---
permalink: /mpz-headers
title: Request Header Requirements for Multiple Procore Zones (MPZ)
layout: default
section_title: Best Practices

---

## Background ##


Procore's network toplogy includes [Multiple Procore Zones (MPZ)]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_mpz.md %}).
MPZ allows us to distribute our customer load across a larger pool of infrastructure to provide better scalability, durability, and security.
MPZ allows us to distribute our infrastructure over multiple geographical locations.
In order for your application to function properly in the context of MPZ, you will need to adhere to specific implementation requirements for your request headers.

## MPZ Request Header Requirement

Each call your application makes to the Procore API must contain a request header that includes the `Procore-Company-Id` field.
This request header field specifies the id of the company into which you are making the call.
It is important to note that even though an endpoint might require the `company_id` as a path or query parameter, MPZ still requires you to include the `Procore-Company-Id` field in the request header.
There are two endpoints that do _not_ require the `Procore-Company-Id field` ([Show User Info](https://developers.procore.com/reference/rest/v1/me) and [List Companies](https://developers.procore.com/reference/rest/v1/companies)), however it is best practice to always include it.

Below is a cURL example showing a call to the [List Projects](https://developers.procore.com/reference/rest/v1/projects) endpoint.
In this example, we use the -H flag to specify the `Procore-Company-Id` request header field.

```
curl -H "Authorization: Bearer <access token>” -H "Procore-Company-Id: xxxxxxxxx"
     -X GET https://api.procore.com/rest/v1.0/projects?company_id=xxxxxxxxx
```

## MPZ and Service Accounts

The `Procore-Company-Id` request header field is _not_ required when you are using Service Accounts with the OAuth 2.0 Client Credentials grant type.
See [Using Service Accounts with MPZ]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_client_credentials.md %}#using-service-accounts-with-mpz) for additional information.
