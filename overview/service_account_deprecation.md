---
permalink: /service-account-deprecation
title: Deprecation of Traditional Service Accounts
layout: default
section_title: Overview
---

>**Sunset of Traditional Service Accounts** (01/29/2024)
>
>*All Traditional Service Accounts will sunset on December 31, 2024.*
>
Traditional Service Accounts were deprecated on December 9, 2021.
>Beginning October 1, 2024, we will no longer allow the creation of new Traditional Service Accounts.
>Existing Traditional Service Accounts will continue to function until December 31, 2024.
>
>In accordance with this timeline, developers of data connection applications that currently use Traditional Service Accounts are required to update their applications to use Developer Managed Service Accounts, and customers will be required to install these updated applications before the sunset date.
>All data connection applications not migrated by the sunset date will cease to function.
>Any application listed on the Procore App Marketplace that is not using a supported method for accessing the Procore API will be removed by the sunset date.
>See [Deprecation of Traditional Service Accounts]({{ site.url }}{{ site.baseurl }}{% link overview/service_account_deprecation.md %}) and [Migrating Data Connection Applications to Use DMSAs](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/migrating-to-dmsa) for additional information.
>If you have questions regarding this change, please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

## Migrating to Developer Managed Service Accounts

### Developers

Procore technology partners, integrators, or other stakeholders who have developed data connection integrations that currently use traditional service accounts must update those applications to use DMSAs.
Here are the high-level steps for migrating an application to use a DMSA.

- Create a new App in your account on the Developer Portal.
- Add a data connection (OAuth) component to the manifest.
- Specify tool permissions using Permissions Builder.
- Test in sandbox and promote to production.
- Submit new Marketplace listing (if applicable).
- Notify users about new application availability.

See [Developer Managed Service Accounts]({{ site.url }}{{ site.baseurl }}{% link building_applications/developer_managed_service_accounts.md %}) for details.

### Procore Customers

Procore customers with traditional service account based applications currently installed in their accounts are encouraged to adopt new DMSA-enabled versions of these applications as they become available.
Here are the high-level steps company administrators should follow to upgrade to a new DMSA-enabled application.

- Install the DMSA-enabled version of the application from the App Marketplace (or as a custom install).
- Migrate all end users to using the new application version.
- Use App Management to uninstall the traditional service account based version of the application.
- Use App Management to configure the new application by adding permitted projects as needed.

See the following support articles for more information.

- [What is a Developer Managed Service Account?](https://support.procore.com/faq/what-is-developer-managed-service-account)
- [Install a Data Connection App from the Marketplace](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/Install-data-connection-app)
- [Uninstall an App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/uninstall-app)
- [Add a Permitted Project to a Data Connection App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-permitted-project)
- [Remove a Permitted Project from a Data Connection App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/remove-permitted-project)
