---
permalink: /mpz-headers
title: Request Header Requirements for Multiple Procore Regions (MPR)
layout: default
section_title: Best Practices

---

## Background ##

Procore's network toplogy includes [Multiple Procore Regions (MPR)]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_mpz.md %}).
MPR allows us to distribute our customer load across a larger pool of infrastructure to provide better scalability, durability, and security.
MPR allows us to distribute our infrastructure over multiple geographical locations.
In order for your application to function properly in the context of MPR, you will need to adhere to specific implementation requirements for your request headers.

## MPR Request Header Requirement

Each call your application makes to the Procore API must contain a request header that includes the `Procore-Company-Id` field.
This request header field specifies the id of the company into which you are making the call.
It is important to note that even though an endpoint might require the `company_id` as a path or query parameter, MPR still requires you to include the `Procore-Company-Id` field in the request header.

Below is a cURL example showing a call to the [List Projects](https://developers.procore.com/reference/rest/v1/projects) endpoint.
In this example, we use the -H flag to specify the `Procore-Company-Id` request header field.

```
curl -H "Authorization: Bearer <access token>” -H "Procore-Company-Id: xxxxxxxxx"
     -X GET https://api.procore.com/rest/v1.0/projects?company_id=xxxxxxxxx
```

If you do not supply the required request header, the following error message is displayed.

```
Missing Procore-Company-Id header!

Each call your application makes to the Procore API must contain a request header that includes the Procore-Company-Id field. 
This request header field specifies the id of the company into which you are making the call.
```

## MPR and Developer Managed Service Accounts

The `Procore-Company-Id` request header field is required when you are using Developer Managed Service Accounts with the OAuth 2.0 Client Credentials grant type.
See [Using Developer Service Accounts with MPR]({{ site.url }}{{ site.baseurl }}/oauth-client-credentials#using-developer-managed-service-accounts-with-mpz) for additional information.
