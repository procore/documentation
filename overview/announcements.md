---
permalink: /announcements
title: Announcements
layout: default
section_title: Overview
---

>**Expiration of OAuth access tokens and OAuth Revoke endpoint are changing** (08/15/2023)
>
>*Effective: NOVEMBER 17, 2023 6PM PT*
>
>**What's changing?**
>
>Beginning on NOVEMBER 17, 2023 6PM PT, Procore OAuth access tokens will be generated with a shorter expiration time.
>Tokens currently expire 2 hours after they are generated.
>After this change, tokens will expire 15 minutes after being generated.
>The `expires_in` parameter returned with tokens will always reflect the amount of time that the token will expire (initially 7200 seconds) so if your integration is following that parameter, or automatically refreshing the access token when receiving an HTTP 401 error for an expired token, then you should not need to make any changes to your integration.
>However, if you've hardcoded the current 2 hour refresh time, then you will need to update your integration to match the new 15 minute expiration time.
>We strongly recommend following the `expires_in` parameter for refreshing access tokens, and not hardcoding a refresh time.
>
>This change will also affect the current Procore OAuth [revoke]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %}) process.
>To follow OAuth best practices, we are shifting towards revoking _only_ renewal tokens instead of simultaneously revoking renewal and access tokens.
>The `/oauth/revoke` endpoint currently revokes both access and renewal tokens but in the future this endpoint will _only_ revoke renewal tokens since access tokens will no longer be valid after 15 minutes.
><u>Between now and NOVEMBER 17, 2023 6PM PT Procore will periodically shorten the 2 hour window to begin this transition.</u>
>
>**When is this happening?**
>
>This change will affect new access tokens starting on NOVEMBER 17.
>Any access tokens created before this change will be valid for their full lifetime based on the `expires_in` parameter received at the time the token was generated.
>
>If you have questions regarding this change, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

>**Change to Monthly Sandbox Refresh Schedule** (02/3/2023)
>
>The scheduled date for the monthly sandbox refresh has changed from the second working day of each month to the first working day of each month.
>See [Sandbox Environments]({{ site.url }}{{ site.baseurl }}{% link getting_started/development_environments.md %}) for additional information.
>If you have questions regarding this change, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

>**Development Sandbox Maintenance** (11/07/2022)
>
>**Maintenance Update (11/16/2022)** 
>We are still working on maintenance work and will extend the maintenance until Friday, November 18th 5:00 PM PST. Details below have been updated to reflect this change.
>
>
>To improve the performance and reliability of the Development Sandbox, we will conduct maintenance beginning on Monday, November 14th, at approximately 9:00 AM PST and expect it to complete by approximately Friday, November 18th 5:00 PM PST.  During this time, the Development Sandbox will not be available. The full impact and schedule are summarized below:
>
> - We will take a snapshot of the Development Sandbox on Friday, November 11th.  Please refrain from writing any new data to the Development Sandbox between 12:00 AM PST Friday, November 11th, and the completion of the maintenance at 5:00 PM PST on Friday, November 18th.
>   - Data written to the environment between taking the snapshot and completing the maintenance window may not be restored.
>   - Creating new application manifests will also be temporarily disabled between when the snapshot is taken and the maintenance is complete.
> - Beginning Monday, November 14th, between approximately 9 AM PST and until Friday, November 18th 5:00 PM PST, the Development Sandbox will not be available. Please note that this only impacts the Development Sandbox and does not impact the Monthly Sandbox.
> - When the environment is restored at approximately 5:00 PM PST on Friday, November 18th, the data will be from the snapshot taken on Friday, November 11th. 
> - After the maintenance is complete, webhooks will continue to be unavailable for approximately one week while we roll out some additional enhancements to resolve the current scale and reliability issues of webhooks in the Development Sandbox.
>
>If you have questions regarding this maintenance, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

>**Procore-Company-Id Request Header Requirement** (06/16/2022)
>
>As described in [Request Header Requirements for Multiple Procore Zones]({{ site.url }}{{ site.baseurl }}{% link best_practices/mpz_headers.md %}), the `Procore-Company-Id` request header is required to successfully make calls to the Procore API (api.procore.com), regardless of zone.
>If you have yet to incorporate the `Procore-Company-Id` request header into your integration designs, we encourage you to do so as soon as possible.
>If you have questions regarding this requirement, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

>**Bearer Token to be Required for File Access Authorization** (06/10/2022)
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

>**Work Breakdown Structure Release and Deprecation of Financial Line Item Endpoints** (03/31/2022)
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

>**Deprecation of Traditional Service Accounts** (12/09/2021)
>
> Traditional Service Accounts were deprecated on December 9, 2021.
> All traditional service accounts will be sunset on a future date to be announced.
> As a result of this deprecation, developers of data connection applications that currently use traditional service accounts are required to update their applications to use DMSAs, and customers will be required to install these updated applications before the sunset date.
> See the following articles for information on Developer Managed Service Accounts and steps for migrating your projects from traditional service accounts.
> - [Deprecation of Traditional Service Accounts]({{ site.url }}{{ site.baseurl }}{% link overview/service_account_deprecation.md %})
> - [Developer Managed Service Accounts]({{ site.url }}{{ site.baseurl }}{% link building_applications/developer_managed_service_accounts.md %})

