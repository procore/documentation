---
permalink: /introduction
title: Procore Developer Documentation
layout: default
section_title: Overview
---

Procore's open Application Programming Interface (API) provides the underlying framework for developing applications and custom integrations between Procore and other software tools and technologies.
You can expand the functionality of your Procore account by leveraging existing integrations available in our Marketplace, or by developing new applications and customized connections yourself using the Procore API.

>**Procore-Company-Id Request Header Requirement**
>
>As described in [Request Header Requirements for Multiple Procore Zones]({{ site.url }}{{ site.baseurl }}{% link best_practices/mpz_headers.md %}), the `Procore-Company-Id` request header is required to successfully make calls to the Procore API (api.procore.com), regardless of zone.
>If you have yet to incorporate the `Procore-Company-Id` request header into your integration designs, we encourage you to do so as soon as possible.
>If you have questions regarding this requirement, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

>**Bearer Token to be Required for File Access Authorization**
>
>Starting June 1, 2023 an authorization bearer token will be required in the request header for accessing any Procore file or document URL.
>Today, an authorization token is not required to access a file directly from storage.procore.com, but it will be a requirement in the future in order to strengthen file access security.
>This change will not only affect files in the Documents tool but will affect any tool where access to file storage is supported (i.e., images, attachments, etc).
>
>For example:
>```
>curl -X GET https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/xxxx/xxxxxx?sig=xxxxxxx \
   -H "Authorization: Bearer <access token>”
>```
>
>If your integration requires direct access to files in storage.procore.com, we encourage you to begin planning for this change now.
>If you have questions regarding this new requirement, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

>**Work Breakdown Structure Release and Deprecation of Financial Line Item Endpoints**
>
> With the release of [Work Breakdown Structure](https://developers.procore.com/documentation/tutorial-wbs), the following financial line item endpoints that utilize `cost_code`, `cost_type` and `sub_job` attributes will be deprecated on March 31, 2022.
> 
> - [List Standard Cost Code Lists](https://developers.procore.com/reference/rest/v1/cost-codes?version=1.0#list-standard-cost-code-lists) (replaced by [List Company WBS Segment Item Lists](https://developers.procore.com/reference/rest/v1/segment-item-lists?version=1.0#list-company-wbs-segment-item-lists))
> - [Delete Standard Cost Code](https://developers.procore.com/reference/rest/v1/cost-codes?version=1.0#delete-standard-cost-code) (replaced by [Delete Company Segment Item](https://developers.procore.com/reference/rest/v1/segment-items?version=1.0#delete-company-segment-item))
> - [Delete Sub Job](https://developers.procore.com/reference/rest/v1/sub-jobs?version=1.0#delete-sub-job) (replaced by [Delete Project Segment Item](https://developers.procore.com/reference/rest/v1/segment-items?version=1.0#delete-project-segment-item))
>
> These endpoints will continue to function as they do currently until a sunset date is determined.
> At this time we plan to support these deprecated endpoints for the foreseeable future, but we encourage developers to start migrating to the new endpoints.
> See [API Lifecycle](https://developers.procore.com/documentation/rest-api-lifecycle) for additional information.
> If your existing integration uses any of these deprecated endpoints, or Cost Code, Cost Type and Sub Job endpoints in general, we encourage you to adopt the new [Work Breakdown Structure endpoints](https://developers.procore.com/reference/rest/v1/codes?version=1.0) and update your integration as needed.
> If you have any concerns please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

>**Deprecation of Traditional Service Accounts**
>
> Service Accounts will be deprecated on December 9, 2021.
> Creation of new service accounts will no longer be allowed after July 31, 2022.
> All service accounts will be sunset on January 31, 2023.
> As a result of this deprecation, developers of data connection applications that currently use traditional service accounts must migrate the app to use Developer Managed Service Accounts (DMSAs), and customers must install these migrated apps before the January 31, 2023 sunset date.
> See the following articles for information on Developer Managed Service Accounts and steps for migrating your projects from traditional service accounts.
> - [Deprecation of Traditional Service Accounts]({{ site.url }}{{ site.baseurl }}{% link overview/service_account_deprecation.md %})
> - [Developer Managed Service Accounts]({{ site.url }}{{ site.baseurl }}{% link building_applications/developer_managed_service_accounts.md %})

## Procore API

If you intend to build your own applications (or hire someone to build them for you), the Procore API allows you to leverage Procore resources within the Procore cloud in a simple, programmatic way using conventional HTTP requests in a RESTful architecture.
The Procore API endpoints are intuitive and powerful, enabling you to easily make calls to retrieve information or execute actions on the various resources in Procore.

## Procore Marketplace

The Procore Marketplace serves as a clearing house for applications and integrations developed by our technology partners using the Procore API.
These offerings allow Procore clients to integrate Procore with their existing tools and workflows.
Integrations currently available in the Marketplace expand project management possibilities for Procore clients in the areas of Analytics, Business Intelligence, Accounting, Estimating, Building Information Modeling (BIM), and others.

## Developer Personas

The two primary developer personas that interact with the Procore API are _Procore Clients_ and _Procore Technology Partners_.
It is likely that you fall into one of these categories and that your specific integration goals and requirements can be characterized by one of these two Procore developer personas.

### Procore Clients

_Procore Clients_ are individuals and organizations that have one or more Procore accounts and utilize Procore for their daily project management activities.
It is not uncommon for clients to rely on a number of other software tools and processes in addition to Procore to manage their projects.
For example, a large general contracting firm may use a legacy tool for bidding/estimation, while using Procore for the balance of their project management tasks.
In this scenario, the GC could build (or hire a development team to build) a [Custom Integration]({{ site.url }}{{ site.baseurl }}{% link overview/custom_overview.md %}) between their legacy systems and Procore using the Procore API, thereby improving efficiency and upgrading the user experience for their employees and collaborators (subcontractors, vendors, etc.).
As a general rule, applications and integrations produced by Procore clients are intended for their own internal use and are not normally published to the Procore Marketplace.

### Procore Technology Partners

_Procore Technology Partners_ leverage the Procore API to provide Procore users with a best-in-class experience, irrespective of what problem they are seeking to solve.
In addition to making their [Partner Integrations]({{ site.url }}{{ site.baseurl }}{% link overview/partner_overview.md %}) available on the Procore Marketplace for purchase by Procore clients and users, members in the Procore Partnerships program benefit from exclusive access to the following resources:

- Brand presence on the Procore Marketplace
- Use of the Procore logo
- Developer training and support
- Development sandbox
- Opportunity to contribute to the The Jobsite publication
- Invitation to exhibit at Procore’s annual _Groundbreak_ conference

## Paths to Success

The two developer personas described in the previous sections take a slightly different path to a successful launch of their applications and integrations.
Generally speaking, Procore clients manage their own integration development milestones and releases.
Since their Custom Integrations are only used internally, they have complete control over quality, performance, and reliability requirements.
Procore clients also manage the internal training needs for their users.

Conversely, Procore technology partners take a different development path as their applications are intended for use by the Procore user community at-large, and therefore must adhere to more stringent standards when it comes to quality, performance, and security.
In addition, since technology partners have the opportunity to publish their [Partner Integrations]({{ site.url }}{{ site.baseurl }}{% link overview/partner_overview.md %}) on the Procore Marketplace, they must submit their applications to Procore for approval.
Finally, technology partners must provide adequate training materials and offer technical support services for their applications.
