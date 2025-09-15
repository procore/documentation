---
permalink: /tutorial-documents
title: Working with the Documents Tool
layout: default
section_title: Best Practices

---

## Overview

Procore's powerful Documents tool provides robust and sophisticated document management and archiving for mission-critical project documentation.
The Documents tool resources are accessible through the Procore API via the [Company Folders and Files](https://developers.procore.com/reference/rest/v1/company-folders-and-files) and [Project Folders and Files](https://developers.procore.com/reference/rest/v1/project-folders-and-files) endpoints.

## Before You Begin

- Learn about [Company Level Documents](https://support.procore.com/products/online/user-guide/company-level/documents) and [Project Level Documents](https://support.procore.com/products/online/user-guide/project-level/documents).
- [Register for a Developer Account](https://developers.procore.com/signup) through the Procore Developer Portal.
- Gain an understanding of [OAuth 2.0]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %}) and view our [API Authentication]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_endpoints.md %}) endpoints.

## Example Workflow for Documents Tool Integrations

This example lists the sequence of API calls for retrieving all project files.

- [List Companies](https://developers.procore.com/reference/rest/v1/companies#list-companies) - GET /rest/v1.0/companies
- [List Projects](https://developers.procore.com/reference/rest/v1/projects#list-projects) - GET /rest/v1.0/projects
- [List Project Folders and Files](https://developers.procore.com/reference/rest/v1/project-folders-and-files#list-project-folders-and-files) - GET /rest/v1.0/folders
- [Show Project Folder](https://developers.procore.com/reference/rest/v1/project-folders-and-files#show-project-folder) - GET /rest/v1.0/folders/{id}

Recursively fetch folders and files by calling the [Show Project Folder](https://developers.procore.com/reference/rest/v1/project-folders-and-files#show-project-folder) endpoint on each previously returned folder.
Repeat this step until all folders and files and been retrieved.

> HELPFUL TIPS:
>
> - To retrieve all Company files, use the [Company Folders and Files](https://developers.procore.com/reference/rest/v1/company-folders-and-files) endpoints.
> - Use the Procore API to directly upload content to a storage service as this will help streamline uploads and reduce upload latency. See [Working with Direct File Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %}) for more information.
> - Usage of Procore's API is subject to rate limits. Procore API rate limits to 3,600 requests per hour. The rate limit resets every hour. See [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}) to learn how to reduce the possibility of exceeding the rate limit. You can also use [Webhooks]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}) to reduce the risk of exceeding Procore API Rate Limit caps.
> - Refer to the [User Permissions](https://support.procore.com/references/user-permissions-matrix-web#Documents-CL) matrix for information on Documents tool permissions.
> - Have Procore API questions? Contact our API Support team at <apisupport@procore.com>.
