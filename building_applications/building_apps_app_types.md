---
permalink: /building-apps-app-types
title: Understanding App Types
layout: default
section_title: Building Applications

---

The Procore platform supports three types of Apps that you can build - _data connection_, _embedded_, and _side panel_.
The following sections describe the attributes of each App type and should help you choose which type of App best suits your particular use case.
Also note that you can build a 'hybrid' App that comprises more than one component type.

## Data Connection Apps

Many integrations built for the Procore platform are characterized as data connection Apps.
A data connection App acts as connector between Procore and other external data systems commonly used by Procore customers such as accounting software, enterprise resource planning (ERP), document management, equipment tracking, business analytics, scheduling, field productivity, compliance, and many more.

For example, a large general contracting (GC) firm may use a legacy tool for bidding/estimation, while using Procore for the balance of their project management tasks.
In this scenario, the GC could install and configure a data connection App to provide the link between their legacy systems and Procore, importing/exporting data between the two systems as needed.
Here is a diagram depicting the high-level architecture of a data connection App and how it integrates an external system with Procore.

![Data Connection Architecture]({{ site.baseurl }}/assets/guides/data-connection-diag.png)

Generally speaking, a data connection App creates or updates resource objects in Procore by making POST and UPDATE calls to the Procore API.
Conversely, a data connection App retrieves information from Procore using a GET call to the API.
By making these calls to the Procore API, a data connection App acts as middleware to import/export data to/from an external system.

In addition to the standard CRUD actions, there are a number of Procore resource endpoints that provide a Sync action that enables batch creation or updates to resources using a single call.
For more information, see [Using Sync Actions]({{ site.url }}{{ site.baseurl }}{% link tutorials/using_sync_actions.md %}).

Another helpful tool that can be incorporated into a data connection app is Webhooks.
The Webhooks feature allows you to specify one or more Procore API resources for which you want to be notified when Create, Update, or Delete actions occur.
A user interface for configuring the Webhooks feature is available through the Company Admin and Project Admin tabs in the Procore Web application.
See [Introduction to Webhooks]({{ site.url }}{{ site.baseurl }}{% link webhooks/webhooks.md %}), [Configure Company Webhooks](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/configure-company-webhooks), and [Configure Project Webhooks](https://support.procore.com/products/online/user-guide/project-level/admin/tutorials/configure-webhooks) for additional information.

See [Building Procore Data Connection Applications with DMSA]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_data_connection_apps.md %}) for additional information.

## Embedded Apps

Procore technology partners building Marketplace Apps as well as third-party developers building custom integrations have the capability to develop and deploy fullscreen embedded applications that display directly within the Procore user interface.
This embedded functionality benefits the end user by enabling streamlined and more efficient workflows.
With an embedded App, the user does not need to constantly switch between Procore and another application, resulting in a more unified and improved user experience.
The behavior and settings for embedded applications are defined in the App manifest.
URL parameter interpolation is supported, giving developers the ability to design applications that can dynamically set values in the parameters of the URL address based on install configurations and user input.

Applications developed and installed as fullscreen embedded applications occupy the entire window area within the Procore web user interface.
fullscreen embedded applications are launched from the **Apps** menu drop-down.
Here is an example of the full screen [Procore Integration for Google Sheets(TM)](https://marketplace.procore.com/apps/procore-integration-for-google-sheets) embedded application running in Procore.

![Google Sheets Example]({{ site.baseurl }}/assets/guides/google-sheets-example.png)

See [Building Procore Embedded (Fullscreen) Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_embedded_fullscreen_apps.md %}) for additional information.

## Side Panel Apps

Developers can also build applications using the side panel experience.
While fullscreen embedded applications occupy the entire Procore user interface window area, side panel appplications occupy just a portion of the display (400px fixed-width) along the right side of the window.
Because side panel applications are installed and configured for specific tools, developers are able to build powerful solutions tailored exactly for a given set of tools or workflows.
Side panel applications are launched by clicking an icon located on the right-hand edge of the Procore web user interface.
Here is an example of a side panel application - in this case a contextual help embedded application - running within the Procore web user interface.

![Side Panel Example]({{ site.baseurl }}/assets/guides/side-panel-example.png)

See [Building Procore Side Panel Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_side_panel_apps.md %}) for additional information.
