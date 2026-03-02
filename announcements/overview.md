---
permalink: /overview
title: Overview
layout: default
section_title: Announcements
---
>**Agentic APIs and API Usage Guidelines** (updated 03/02/2026)
>
>Procore is developing a new generation of **Agentic APIs**, purpose-built on our Datagrid infrastructure to power AI agents, RAG solutions, and advanced analytics. General Availability is planned for **Late Q1 2026**.
>
>As we introduce these new capabilities, we want to ensure all developers understand how Procore's existing REST APIs are designed to be used. Our REST APIs are built for **transactional use cases** — creating, reading, updating, and deleting individual records. They are not intended for large-scale data extraction or building AI/ML solutions.
>
>For developers interested in AI, semantic retrieval, or analytics workloads, the upcoming Agentic APIs will provide the right foundation — with the performance, scale, and security these use cases require.
>
>### What You Need to Know:
>- **REST APIs** are for transactional integrations (CRUD operations, syncing data, automating workflows).
>- **Agentic APIs** (coming soon) are for AI-driven intelligence, RAG, and advanced analytics.
>- Large-scale data extraction and AI/ML training using REST APIs is not permitted under Procore's [Developer Policy]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_policy.md %}).
>
>To learn more, see [API Usage Guidelines]({{ site.url }}{{ site.baseurl }}{% link api_essentials/api_usage_guidelines.md %}).
>
>If you have questions, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

>**File Upload API Flow Changing on November 1st, 2025** (updated 08/01/2025)  
>
>Starting **November 1, 2025**, Procore is updating its file upload process to improve speed, reliability, and scalability. File uploads must now use a new **three-step direct upload flow** that utilizes **presigned URLs**.  
>
>This change replaces the legacy single-call upload method. Uploads that do not adopt the new flow will still work but may experience **increased latency**.  
>
>### What You Need to Do:
>Update your integration to use the new upload flow by **November 1st, 2025**:  
>
>1. **Request a Presigned Upload URL**  
>   Use one of the following endpoints to request a presigned S3 URL and receive a `uuid`:  
>   - [Uploads](https://developers.procore.com/reference/rest/uploads?version=latest)
>
>2. **Upload the File**  
>   Upload the file directly to S3 using the presigned URL.  
>
>3. **Complete the Upload**  
>   Finalize the process by sending the `uuid` (instead of the file data) to complete the upload.  
>
>To learn more, see [Direct Upload Tutorial](https://developers.procore.com/documentation/tutorial-uploads).  
>
>If you have questions, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

>**Sunset of Traditional Service Accounts** (updated 01/29/2025)
>
>*All Traditional Service Accounts will sunset on March 18, 2025.*
>
>Traditional Service Accounts were deprecated on December 9, 2021.
>Beginning January 21, 2025, we will no longer allow the creation of new Traditional Service Accounts.
>Existing Traditional Service Accounts will continue to function until March 18, 2025.
>
>In accordance with this timeline, developers of data connection applications that currently use Traditional Service Accounts are required to update their applications to use Developer Managed Service Accounts, and customers will be required to install these updated applications before the sunset date.
>All data connection applications not migrated by the sunset date will cease to function.
>Any application listed on the Procore App Marketplace that is not using a supported method for accessing the Procore API will be removed by the sunset date.
>See [Deprecation of Traditional Service Accounts]({{ site.url }}{{ site.baseurl }}{% link announcements/service_account_deprecation.md %}) and [Migrating Data Connection Applications to Use DMSAs](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/migrating-to-dmsa) for additional information.
>If you have questions regarding this change, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).