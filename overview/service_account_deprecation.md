---
permalink: /service-account-deprecation
title: Deprecation of Traditional Service Accounts
layout: default
section_title: Overview
---

## Background

Traditional Service Accounts were deprecated on December 9, 2021.
All traditional service accounts will be sunset on a future date to be announced.
As a result of this deprecation, developers of data connection applications that currently use traditional service accounts are required to update their applications to use DMSAs, and customers will be required to install these updated applications before the sunset date.

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
