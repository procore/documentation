---
permalink: /tutorial-financial-tools
title: Integrating with Procore Financial Tools
layout: default
section_title: Guides and Tutorials

---

## Overview

The Procore API allows for clients to develop an integration with any ERP system, allowing external systems to access the data in Procore.
The API allows for point to point integrations with objects like vendors/subcontractors, commitments/subcontracts, and change orders.
However, from what we have seen with our clients, a deep ERP integration is greater than the sum of its parts.
That is to say, it’s not just about syncing commitments in a one off fashion, but rather syncing a commitment means there is an integrated set of projects, cost codes, vendors, and commitments that all need to work together to ensure integrity is kept when integrating financial transactions between two systems.

Integrations with Construction financials is usually accomplished by developing individual integration points that work together.
Most clients choose to integrate in the following order:

1. Vendors, Projects
1. Cost Codes, Budget, Direct Costs
1. Commitments, Change Orders
1. Subcontractor Invoices, Payments, Prime Contract

In addition to just the technical [API reference documentation](https://developers.procore.com/reference), there are a few extended features that Procore provides to create a deeper, more robust integration between Procore and your ERP system.
These include:

- External IDs and Data - origin_id, origin_data and origin_code - used to store external data and an external unique identifiers
- Sync banners - a visual indication of synced records for end users
- Record locking - allows control of immutable data in Procore
- Workflow - provides control of the status field on integrated objects
- Webhooks - event based notifications from Procore

Please see the [Integration Experience Features](#integration-experience-features) section for additional information.

To connect Procore with your ERP system, an application will need to be developed to push and pull information to and from Procore and your ERP.
Procore’s clients often work with a systems integrator, however we also work with many clients who develop an integration using their own resources, or a system integrator of their choosing.

> DATABASE CONNECTION LIMITATIONS
>
> A direct database connection to Procore is not supported.
> In order to access content within the Procore database, you are required to use our REST API which uses JSON as the data format.
> RDBMS schema, database tables, or XML and/or SOAP-style integrations are also not supported.
> To get started, see our [API introduction]({{ site.url }}{{ site.baseurl }}{% link overview/introduction.md %}).

## Integration Development Overview

Developing an integration will require an application to be developed which will connect the two systems.
This application will use Procore’s REST webservices to read and write data with Procore, and will also need to connect to your ERP system in a manner that it allows.

There are many different technical solutions, programming languages, etc which can be used to accomplish this, and since Procore’s REST API is technology agnostic, this choice can be made by your own development resources.
Many clients choose to implement an on-premise architecture, however please be aware that to leverage the [API Webhooks]({{ site.url }}{{ site.baseurl }}{% link webhooks/webhooks.md %}), your application will need to allow incoming connections from the public internet.

To evaluate the Procore API with your own technical resources, please start with our [free online training programs](https://developers.procore.com/documentation/training) and our public [API Reference](https://developers.procore.com/reference) documentation.

It is best to start small with the integration development, which is why we recommend developing your integration with Projects and Vendors first.

### Need Some Assistance?

To connect with a Solutions Architect from Procore regarding your integration, please visit the [Technical Services]({{ site.url }}{{ site.baseurl }}{% link additional_resources/tech_services.md %}) page and fill out the available request form.
Procore’s Solutions Architects can provide business process consulting in addition to technical guidance.

For technical questions or issues, please email our API Support team: <apisupport@procore.com>

## Integration Experience Features

In addition to just the technical [API Reference](https://developers.procore.com/reference) documentation, there are a few extended features that Procore provides to create a deeper, more robust integration between Procore and your ERP system.
These features are covered in the following sections.

## External IDs and Data - origin_id, origin_data, and origin_code

The `origin_id`, `origin_data`, and `origin_code` fields provide areas to store external data on a Procore object.
These fields apply to the Projects, Vendors, Commitments, Change Orders, Direct Costs, Cost Codes, Users, Change Events, and Prime Contract resources.
Below find details on how each field is designed to be used.

#### origin_id

This field is designed to store the unique identifier of the object in the external system.
This value is required to be unique (per object type), and is not displayed to the end user.
For example, clients often use the ID from the database of the external system for a given object.

Please note that only one integration can use the `origin_id` field for an object at this time, otherwise a conflict will occur that will cause errors with the existing integration.
It is advised to review the existing data for the existence of `origin_id` prior to your development efforts.

##### Sync Actions

The `origin_id` field also allows for a unique and powerful Sync operation to be completed, and is useful for syncing creates and updates to Procore.
For more information, see the [Sync Actions]({{ site.url }}{{ site.baseurl }}{% link tutorials/using_sync_actions.md %}) guide.

#### origin_data

This field is designed to store the any additional information you would like to store to aid with your integration.
It is not displayed to the end user, and is a generic text field.
It is often used for integration errors, timestamps, or additional information for the integrated object.

#### origin_code (External ID)

This field applies specifically to Vendors, Commitments, and Commitment Change Orders (change order packages) and is designed to store and display the external ID of the object.
While this could be the same value as `origin_id`, it does not have to be.
This provides some flexibility if you would like to display a different user-facing ID that originates from an external system.
The following sections illustrate how the `origin_code` field displays in each of the related tools.

##### Vendors

When an `origin_code` is added to a vendor record, it will display in the Directory Listing, Edit Screen, as well as on the display of a Work Order or Purchase Order as shown in the following illustrations.

![external vendor ids]({{ site.baseurl }}/assets/guides/financials-ext-id-vendors.svg)
![external vendor commit]({{ site.baseurl }}/assets/guides/financials-ext-id-vendor-commit.svg)


##### Commitments

When an `origin_code` is added to a work order or purchase order, it will display to end users when viewing a commitment near the Procore commitment ID as shown in the following illustration.

![external commit id]({{ site.baseurl }}/assets/guides/financials-commit-ext-id.svg)

##### CCOs

When an `origin_code` is added to a Change Order Package, it will display to end users when viewing the Change Order near the Procore Change Order ID as shown in the following illustration.

![external cco id]({{ site.baseurl }}/assets/guides/financials-ext-cco-id.svg)

### Sync Banners

Sync Banners provide a visual indication to users in Procore when certain objects have been integrated with an external system.
This happens when the `origin_id` is stored in Procore which relates to an external system.
This could be in place because you have an ERP integration, or you’re using an integration from our Marketplace which synchronizes data between Procore and another system.
Sync Banners apply to the Commitments, Commitment Change Orders, Direct Costs, Projects, Vendors, Users, and Prime Contract resources.
The following sections illustrate how Sync Banners display in each of the related tools.

#### Commitments Listing

![commit listing]({{ site.baseurl }}/assets/guides/financials-commit-list.svg)

#### Project Listing

![project listing]({{ site.baseurl }}/assets/guides/financials-project-list.svg)

#### Directory Listing

![vendor listing]({{ site.baseurl }}/assets/guides/financials-dir-list.svg)

### Prime Contract Show

![vendor listing]({{ site.baseurl }}/assets/guides/financials-prime-show.svg)

### Technical Details

In order for the sync banners to show up, you’ll need to populate the `origin_id` field for each individual object.
The `origin_id` field is accessible only by the API.
Please note that only one integration can use the origin_id field for an object at this time, otherwise a conflict will occur that will cause errors with the existing integration.
It is advised to review the existing data for the existence of `origin_id` prior to your development efforts.

### Record Locking

It is often the case that when a financial transaction is approved and completed in an ERP system, it is not allowed to be modified.
These feature of Procore allow for control of immutable data, which is usually a rule that is enforced by your ERP system that Procore is integrating with, and therefore the same control should be followed in Procore.
Record Locking applies to the Direct Costs, Commitments, Change Orders, and Vendor Insurances resources.
The following sections illustrate how Record Locking is implemented in the related tools.

#### Direct Costs

When an `origin_id` exists on a direct cost, the entire object is immutable.

![direct cost locking]({{ site.baseurl }}/assets/guides/financials-direct-cost-locking.svg)

#### Commitments

While this is not specifically an integration feature, it is important to understand this behaviour when integrating with Commitments.

If a Commitment (work order or purchase order) has a Status of Approved or Complete, the Contract Company and the Schedule of Values are not able to be modified in Procore.
In addition, the Commitment cannot be deleted.

In order for your teams to not allow for the Status field of a Commitment to be changed (which would in turn allow for modification of these fields), Procore’s Workflow tool to control who can move the Status field to different values.
For more information about Workflow, please contact <support@procore.com>.

There is a configuration option to turn this functionality on or off which can be found in the Company Admin > Cost Types Configuration page titled “Commitment Settings”.

#### Change Orders

As with Commitments, when the `Status` of a Change Order is Approved or Complete, the SOV cannot be modified, nor can the Change Order be deleted.

In order for your teams to not allow for the Status field of a Change Order to be changed (which would in turn allow for modification of the SOV), Procore’s Workflow tool to control who can move the Status field to different values.
For more information about Workflow, please contact <support@procore.com>.

#### Vendor Insurances

When an `origin_id` exists on an insurance record, the following fields are read only in the Procore UI: Policy Number, Insurance Type, Effective Date, Expiration Date, Limit, and Name.

#### Subcontractor Invoices

When an `origin_id` exists on a Subcontrctor Invoice, the entire object is immutable.
In such cases, you will see a notice in the detail view of a locked Subcontractor Invoice stating "The invoice is not editable because it has been synced with ERP".

#### Payment Applications

When an `origin_id` exists on a Payment Application, the entire object is immutable.
In such cases, you will see a notice in the General Settings section of the locked Payment Application view stating "This Payment Application cannot be edited because it has been synced with ERP".

#### Payments

When an `origin_id` exists on a Payment, the entire object is immutable.
In such cases, you will see a notice in the list view of the locked Payment stating "The Contract Payment cannot be edited or deleted because it is synced with an ERP system".
This applies to "Payments Issued" on a commitment and "Payments Received" on a prime contract.

### Workflow

Procore’s workflow tool provides control of the status field on certain objects in Procore.
See the [Workflow API]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_workflows.md %}) guide for additional information.

### Webhooks

The Webhooks feature allows third-party developers and integrators to specify one or more Procore API resources for which they want to be notified when Create, Update, or Delete actions occur.
Please see the [Webhooks API]({{ site.url }}{{ site.baseurl }}{% link webhooks/webhooks.md %}) guide for additional information.
