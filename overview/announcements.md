---
permalink: /announcements
title: Procore Developer Documentation
layout: default
section_title: Overview
---
## Announcements

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

