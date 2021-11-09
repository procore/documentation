---
permalink: /introduction
title: Welcome!
layout: default
section_title: Overview
---

Procore's open Application Programming Interface (API) provides the underlying framework for developing applications and custom integrations between Procore and other software tools and technologies.
You can expand the functionality of your Procore account by leveraging existing integrations available in our Marketplace, or by developing new applications and customized connections yourself using the Procore API.

>IMPORTANT!
>
> Procore API resources under the `/vapid` namespace were deprecated on February 1, 2021, and replaced by the new Rest v1.0 resources under the `/rest` namespace with a new architecture that supports versioning and expanded functionality.
>
> On February 1, 2022 the `/vapid` namespace will be sunset in accordance with our [API lifecycle guidelines](https://developers.procore.com/documentation/rest-api-lifecycle).
> While we will support and maintain Vapid endpoints during this 1 year period, all new feature development for the Procore API will be done in Rest.
> We encourage all developers using the Vapid API resources to migrate to Rest v1.0 as soon as possible to take advantage of the latest API features.
>
> - [Vapid Deprecation]({{ site.url }}{{ site.baseurl }}{% link overview/vapid_deprecation.md %})
> - [Rest API Overview]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_overview.md %})
> - [API Lifecycle]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_lifecycle.md %})

## Procore API

If you intend to build your own applications (or hire someone to build them for you), the Procore API allows you to leverage Procore resources within the Procore cloud in a simple, programmatic way using conventional HTTP requests in a RESTful architecture.
The Procore API endpoints are intuitive and powerful, enabling you to easily make calls to retrieve information or execute actions on the various resources in Procore.

## Procore Marketplace

The Procore Marketplace serves as a clearing house for applications and integrations developed by our technology partners using the Procore API.
These offerings allow Procore clients to integrate Procore with their existing tools and workflows.
Integrations currently available in the Marketplace expand project management possibilities for Procore clients in the areas of Analytics, Business Intelligence, Accounting, Estimating, Building Information Modeling (BIM), and others.

## Developer Personas

The two primary developer personas that interact with the Procore API are _Procore Clients_ and _Procore Technology Partners_.
It is likely that you fall into one of these categories and that your specific integration goals and requirements can be characterized by one of these two Procore developer personas.

### Procore Clients

_Procore Clients_ are individuals and organizations that have one or more Procore accounts and utilize Procore for their daily project management activities.
It is not uncommon for clients to rely on a number of other software tools and processes in addition to Procore to manage their projects.
For example, a large general contracting firm may use a legacy tool for bidding/estimation, while using Procore for the balance of their project management tasks.
In this scenario, the GC could build (or hire a development team to build) a [Custom Integration]({{ site.url }}{{ site.baseurl }}{% link overview/custom_overview.md %}) between their legacy systems and Procore using the Procore API, thereby improving efficiency and upgrading the user experience for their employees and collaborators (subcontractors, vendors, etc.).
As a general rule, applications and integrations produced by Procore clients are intended for their own internal use and are not normally published to the Procore Marketplace.

### Procore Technology Partners

_Procore Technology Partners_ leverage the Procore API to provide Procore users with a best-in-class experience, irrespective of what problem they are seeking to solve.
In addition to making their [Partner Integrations]({{ site.url }}{{ site.baseurl }}{% link overview/partner_overview.md %}) available on the Procore Marketplace for purchase by Procore clients and users, members in the Procore Partnerships program benefit from exclusive access to the following resources:

- Brand presence on the Procore Marketplace
- Use of the Procore logo
- Developer training and support
- Development sandbox
- Opportunity to contribute to the The Jobsite publication
- Invitation to exhibit at Procore’s annual _Groundbreak_ conference

## Paths to Success

The two developer personas described in the previous sections take a slightly different path to a successful launch of their applications and integrations.
Generally speaking, Procore clients manage their own integration development milestones and releases.
Since their Custom Integrations are only used internally, they have complete control over quality, performance, and reliability requirements.
Procore clients also manage the internal training needs for their users.

Conversely, Procore technology partners take a different development path as their applications are intended for use by the Procore user community at-large, and therefore must adhere to more stringent standards when it comes to quality, performance, and security.
In addition, since technology partners have the opportunity to publish their [Partner Integrations]({{ site.url }}{{ site.baseurl }}{% link overview/partner_overview.md %}) on the Procore Marketplace, they must submit their applications to Procore for approval.
Finally, technology partners must provide adequate training materials and offer technical support services for their applications.
