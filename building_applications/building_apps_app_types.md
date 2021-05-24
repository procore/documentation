---
permalink: /building-apps-app-types
title: Understanding App Types
layout: default
section_title: Building Applications

---

Currently, the Procore platform supports two types of Apps that you can build - _data connection_ and _embedded_. The following sections describe the attributes of each App type and should help you choose which type of App best suits your particular use case. Also note that you can build a 'hybrid' App that comprises both an embedded component along with a data connection component.

## Data Connection Apps

Many integrations built for the Procore platform are characterized as data connection Apps. A data connection App acts as connector between Procore and other external data systems commonly used by Procore customers such as accounting software, enterprise resource planning (ERP), document management, equipment tracking, business analytics, scheduling, field productivity, compliance, and many more.

For example, a large general contracting (GC) firm may use a legacy tool for bidding/estimation, while using Procore for the balance of their project management tasks. In this scenario, the GC could install and configure a data connection App to provide the link between their legacy systems and Procore, importing/exporting data between the two systems as needed. Here is a diagram depicting the high-level architecture of a data connection App and how it integrates an external system with Procore.

![Data Connection Architecture]({{ site.baseurl }}/assets/guides/data-connection-diag.png)

Generally speaking, a data connection App creates or updates resource objects in Procore by making POST and UPDATE calls to the Procore API. Conversely, a data connection App retrieves information from Procore using a GET call to the API.
By making these calls to the Procore API, a data connection App acts as middleware to import/export data to/from an external system.

In addition to the standard CRUD actions, there are a number of Procore resource endpoints that provide a Sync action that enables batch creation or updates to resources using a single call. For more information, see [Using Sync Actions]({{ site.url }}{{ site.baseurl }}{% link tutorials/using_sync_actions.md %}).

Another helpful tool that can be incorporated into a data connection app is Webhooks. The Webhooks feature allows you to specify one or more Procore API resources for which you want to be notified when Create, Update, or Delete actions occur. A user interface for configuring the Webhooks feature is available through the Company Admin and Project Admin tabs in the Procore Web application. See [Introduction to Webhooks]({{ site.url }}{{ site.baseurl }}{% link webhooks/webhooks.md %}), [Configure Company Webhooks](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/configure-company-webhooks), and [Configure Project Webhooks](https://support.procore.com/products/online/user-guide/project-level/admin/tutorials/configure-webhooks) for additional information.

## Embedded Apps

Procore technology partners building Marketplace Apps as well as third-party developers building custom integrations now have the capability to develop and deploy embedded Apps that display directly within the Procore user interface. This embedded functionality benefits the end user by enabling streamlined and more efficient workflows. With an embedded App, the user does not need to constantly switch between Procore and an installed App in order to perform integration tasks. The result is a more unified and improved user experience.

Embedded Apps in the Procore ecosystem can be one of two types - _Marketplace Apps_, which are published to Procore's Marketplace and are available to all Procore customers, and _Custom Apps_ which are developed and deployed internally by Procore customers.