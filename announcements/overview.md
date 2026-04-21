---
permalink: /overview
title: Changelog
sub_header: Recent changes, deprecations, and updates to the Procore Developer Platform.
layout: default
section_title: Announcements
---

## Overview
This page tracks significant changes to the Procore Developer Platform, including new features, breaking changes, and deprecations. Entries are listed in reverse chronological order.
<br><br>

***
## March 2026 — Agentic APIs Now in Design Partner Pilot
**Category:** New Feature

Procore's **Agentic APIs** are now available in a Design Partner pilot. Built on Datagrid infrastructure, they are designed for AI agents, Retrieval-Augmented Generation (RAG), and semantic search across unstructured Procore data. General availability is in development.

Agentic APIs serve use cases that transactional REST APIs are not designed for — including autonomous agent workflows, deep semantic search, and large-scale data analysis.

For full details and to apply, see [Agentic APIs]({{ site.url }}{{ site.baseurl }}{% link announcements/agentic_apis.md %}).

If you have questions, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).
<br><br>

***
## March 2026 — API Usage Guidelines Published
**Category:** Policy

Procore has published [API Usage Guidelines]({{ site.url }}{{ site.baseurl }}{% link platform_concepts/api_usage_guidelines.md %}) to clarify how REST APIs are designed to be used. REST APIs are built for transactional integrations — CRUD operations and workflow automation. Large-scale data extraction and AI/ML training using REST APIs is not permitted under the [Developer Policy]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_policy.md %}).

If you have questions, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).
<br><br>

***
## August 2025 — File Upload API Flow Updated
**Category:** Breaking Change

As of **November 1, 2025**, Procore updated its file upload process to improve speed, reliability, and scalability. File uploads now use a **three-step direct upload flow** that utilizes **presigned URLs**.

This change replaced the legacy single-call upload method. Uploads that do not use the new flow may experience **increased latency**.

### What you need to do:
Update your integration to use the new upload flow:

1. **Request a Presigned Upload URL** — Use the [Uploads](https://developers.procore.com/reference/rest/uploads?version=latest) endpoint to request a presigned S3 URL and receive a `uuid`.
2. **Upload the File** — Upload the file directly to S3 using the presigned URL.
3. **Complete the Upload** — Finalize the process by sending the `uuid` (instead of the file data) to complete the upload.

To learn more, see [Direct Upload Tutorial](https://developers.procore.com/documentation/tutorial-uploads).

If you have questions, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).
<br><br>

***
## January 2025 — Sunset of Traditional Service Accounts
**Category:** Completed

All Traditional Service Accounts were sunset on **March 18, 2025**.

Traditional Service Accounts were deprecated on December 9, 2021. As of January 21, 2025, the creation of new Traditional Service Accounts was no longer allowed. Existing Traditional Service Accounts ceased to function on March 18, 2025.

Developers of data connection applications that used Traditional Service Accounts were required to update their applications to use Developer Managed Service Accounts. All data connection applications not migrated by the sunset date ceased to function. Any application listed on the Procore App Marketplace that was not using a supported method for accessing the Procore API was removed.

See <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/migrating-to-dmsa" target="_blank">Migrating Data Connection Applications to Use DMSAs</a> for additional information.

If you have questions, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).
