---
permalink: /developer-managed-service-accounts
title: Developer Managed Service Accounts
layout: default
section_title: Best Practices

---

## Background

As you develop and deploy applications that use the Client Credentials Grant type, you must be mindful of the following aspects of Procore _service accounts_.
See [What is a Service Account?](https://support.procore.com/faq/what-is-a-service-account)

- *Service Account Permissions* - Because the default permissions for a service account are set to 'None' at the company level when it is first created, you _must_ explicitly set proper permissions for the service account prior to using it to access the Procore API. Also, bear in mind that although you may be able to successfully generate an OAuth 2.0 access token using a service account with the default ('None') permissions, this token will not work for making calls to the Procore API. Please see [Configure Service Account Permissions](http://support.procore.com/products/online/user-guide/company-level/admin/tutorials/configure-service-account-permissions) on the [Procore Support Site](http://support.procore.com/) for more information.
- *Directory Contact Restriction* - The directory contact associated with a service account must not be added to any other company directory aside from the one it was originally created in. Doing so will render the service account non-functional.
- *Email Restriction* - After a service account is created, the associated default email address must not be changed. Doing so will render the service account non-functional.