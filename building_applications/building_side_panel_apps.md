---
permalink: /building-side-panel-apps
title: Building Procore Side Panel Applications
layout: default
section_title: Building Applications
---

>**Note:** This article covers topics consistent with the App Manifest v4.1 format and the form-based app creation UI experience.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

## Overview

Procore has expanded the capabilities of the Procore platform to include a context-aware side panel experience in addition to the full screen embedded experience.
Developers can now build applications that display in a side panel iframe located on the right side of the Procore user interface.
Procore users click a dock icon to launch the side panel experience.
Side panel applications operate in the context of specific tools/views in Procore.
Developers use the application manifest to define the specific tools and views their side panel application supports.
Company administrators install side panel applications and create application configurations using the same installation flow as full screen embedded applications.

This article provides details on the following steps for creating a new side panel application:

* [Create a New Application](#create-a-new-application)
* [Add a Side Panel Component](#add-a-side-panel-component)
  * [Specify Component Type and Application URL](#1-specify-component-type-and-application-url)
  * [Define Parameter Interpolation](#2-define-parameter-interpolation)
  * [Specify Supported Side Panel Views](#3-specify-supported-side-panel-views)
  * [Save the New Component](#4-save-the-new-component)
* [Define Setup Instructions and Post-Installation Notes](#define-setup-instructions)
* [Promote Updated Sandbox Manifest to Production](#promote-updated-sandbox-manifest-to-production)
* [Save Manifest and Create Version](#save-manifest-and-create-version)
* [Test and Validate in Development Sandbox](#test-and-validate-in-development-sandbox)
* [Using postMessage to Retrieve Procore Context](#using-postmessage-to-retrieve-procore-context)

<a name="create-a-new-application"></a>
{% include create_application.md %}

## Add a Side Panel Component

The first step in configuring your new side panel application is to add a _component_.
Note that only fullscreen embedded and side panel applications require that components be defined.
If you are building a data connection application based on developer managed service accounts (DMSA), you do not need to add a component in the Configuration Builder.
See [Understanding App Types]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_app_types.md %}) for additional information on application types and components.
Follow these steps to add a new side panel component.

### 1. Specify Component Type, Description, and Application URL

* Navigate to the Configuration Buidler on the Manage App page, expand the Components section and click **Add Component**.
* Using the drop-down, select **Side Panel** for the component Type.
* Enter a Description for the component. This is a custom description used solely as an identifier.
* In the URL field, specify the base web address for your application. (e.g., https://example.com/1234/12).

    ![Component Type and Description]({{ site.baseurl }}/assets/guides/form-based-component-type-url-fields.png)

### 2. Define Parameter Interpolation

{% include url_parameter_interpolation.md %}

* Add one or more custom URL Parameters to the component by clicking **Add Parameter**.

  ![Component Add Param]({{ site.baseurl }}/assets/guides/form-based-component-add-param.png)

* Define the Name, Key, and Description for the custom parameter.
* Specify whether the parameter is required at time of installation.

  ![Component Add Param Field]({{ site.baseurl }}/assets/guides/form-based-component-add-param-custom.png)

* Click **Save Parameter**.

### 3. Specify Supported Side Panel Views

You can specify which tools, resources, and actions your application works with and from which page(s) it will be accessible.
As some tools comprise more than one resource (e.g., commitments), this approach is both granular and flexible.
For example, you might want your app to display only on the list page, but not on the detail page.

* Use the **Side Panel Views** drop-down list to select one or more side panel Views for your application.


  ![Add Views]({{ site.baseurl }}/assets/guides/form-based-component-add-views.png)

The following sections list the currently supported Side Panel Views that can be defined in the application manifest.

#### Commitments

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/commitments/work_order_contracts/:id | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/ssov | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/change_orders | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/request_for_quotes | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/invoices | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/payments | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/advanced_settings | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/schedule_of_values | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/billings_schedule_of_values | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/billings_schedule_of_values/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/requisitions | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/requisitions/new | commitments.requisitions.new |
| /:project_id/project/commitments/work_order_contracts/:work_order_contract_id/requisitions/:id | commitments.requisitions.detail |
| /:project_id/project/commitments/work_order_contracts/:work_order_contract_id/admin/requisitions/:id/edit | commitments.requisitions.edit |
| /:project_id/project/commitments/work_order_contracts/:id/contract_payments | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/contract_payments/new | commitments.work_order_contracts.new |
| /:project_id/project/commitments/work_order_contracts/:id/related_items | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/related_items/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/communications | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/communications/new | commitments.work_order_contracts.new |
| /:project_id/project/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/advanced_settings/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/change_orders/commitment_contract_change_orders<br />/new_from_change_events_bulk_action | commitments.commitment_contract_change_orders.new |
| /:project_id/project/commitments/work_order_contracts/:work_order_contract_id<br />/change_orders/commitment_contract_change_orders/:id | commitments.commitment_contract_change_orders.detail |
| /:project_id/project/commitments/work_order_contracts/:work_order_contract_id<br />/change_orders/commitment_contract_change_orders/:id/edit | commitments.commitment_contract_change_orders.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id/schedule_of_values | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/change_orders | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/requisitions | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id/requisitions/new | commitments.requisitions.new |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id/requisitions/:id | commitments.requisitions.detail |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id/admin/requisitions/:id/edit | commitments.requisitions.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id/contract_payments | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/contract_payments/new | commitments.purchase_order_contracts.new |
| /:project_id/project/commitments/purchase_order_contracts/:id/related_items | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/related_items/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id/communications | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/communications/new | commitments.purchase_order_contracts.new |
| /:project_id/project/commitments/purchase_order_contracts/:id/change_history | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/advanced_settings | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/advanced_settings/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id<br />/change_orders/commitment_contract_change_orders/new | commitments.commitment_contract_change_orders.new |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id<br />/change_orders/commitment_contract_change_orders/:id | commitments.commitment_contract_change_orders.detail |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id<br />/change_orders/commitment_contract_change_orders/:id/edit | commitments.commitment_contract_change_orders.edit |

#### Commitments Beta

| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments | commitments.contracts.list |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/create | commitments.work_order_contracts.new |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br /> | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/advanced_settings | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/change_orders | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/change_history | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/compliance | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/edit | commitments.work_order_contracts.edit |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/emails | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/invoices | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/payments | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/rfqs | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/ssov | commitments.work_order_contracts.detail |

#### Contracts

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/contracts/commitments/work_order_contracts/:id | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/ssov | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/change_orders | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/rfqs | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/invoices | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/payments | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/advanced_settings | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/edit | commitments.work_order_contracts.edit |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/schedule_of_values | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/billings_schedule_of_values | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/billings_schedule_of_values/edit | commitments.work_order_contracts.edit |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/requisitions | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/contract_payments | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/contract_payments/new | commitments.work_order_contracts.new |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/related_items | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/related_items/edit | commitments.work_order_contracts.edit |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/communications | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/communications/new | commitments.work_order_contracts.new |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/advanced_settings/edit | commitments.work_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/schedule_of_values | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/change_orders | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/requisitions | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/contract_payments | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/contract_payments/new | commitments.purchase_order_contracts.new |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/related_items | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/related_items/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/communications | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/communications/new | commitments.purchase_order_contracts.new |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/change_history | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/advanced_settings | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/advanced_settings/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/requisitions/:invoice_id | commitments.requisitions.detail |
| /:project_id/project/contracts/prime_contracts/:prime_contract_id/invoices | prime_contracts.invoices.list |

#### Prime Contracts

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/prime_contracts/:id | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/edit | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/schedule_of_values | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/change_orders | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/payment_applications | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/received_payments | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/received_payments/edit | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/related_items | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/related_items/edit | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/communications | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/communications/new | prime_contracts.new |
| /:project_id/project/prime_contracts/:id/change_history | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/markups | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/advanced_settings | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/advanced_settings/edit | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/change_orders/potential_change_orders<br />/new_from_change_events_bulk_action | prime_contracts.change_orders.potential_change_orders.new |
| /:project_id/project/prime_contracts/:prime_contract_id/change_orders/change_order_packages/:id | prime_contracts.change_orders.detail |
| /:project_id/project/prime_contracts/:prime_contract_id/change_orders/potential_change_orders/:id | prime_contracts.change_orders.potential_change_orders.detail |
| /:project_id/project/prime_contracts/:prime_contract_id/change_orders/potential_change_orders/:id/edit | prime_contracts.change_orders.potential_change_orders.detail |
| /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/new | prime_contracts.payment_applications.new |
| /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/:id | prime_contracts.payment_applications.detail |
| /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/:id/edit | prime_contracts.payment_applications.edit |

#### Change Events

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/change_events/events | change_events.list |
| /:project_id/project/change_events/events/new | change_events.new |
| /:project_id/project/change_events/events/:id | change_events.detail |
| /:project_id/project/change_events/events/:id/edit | hange_events.edit |

#### Budget

| URL Path | View Key |
| -------- | -------- |
| /companies/:company_id/projects/:project_id/tools/budget_changes | budgeting.budget_changes.list |
| /projects/:project_id/budgeting | budgeting.list |
| /projects/:project_id/budgets/budget_details | budgeting.detail |
| /projects/:project_id/forecasting | budgeting.forecasting.detail |
| /:project_id/project/budgeting/change_history | budgeting.change_history.list |

#### Submittal Logs

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/submittal_logs/:id | submittal_logs.detail |

#### Project Directory

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/directory/vendors/:id/edit | project_directory.vendors.edit |
| /:project_id/project/directory/edit_person/:id | project_directory.person.edit |

#### Observations

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/observations/items/:id/edit | observations.edit |
| /:project_id/project/observations/items | observations.list |

#### RFIs

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/rfi/show/:id | rfi.detail |

#### Inspections

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/checklists/lists/:id | inspections.detail |

#### Correspondence

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/generic_tool/show/:id | correspondence.detail |

#### Schedule

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/calendar/all | schedule.calendar.task.list |
| /:project_id/project/calendar/month | schedule.calendar.month.list |
| /:project_id/project/calendar | schedule.calendar.list |
| /:project_id/project/calendar/lookaheads | schedule.calendar.lookaheads.list |
| /:project_id/project/calendar/tasks/:task_id | schedule.calendar.task.detail |

#### Incidents

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/incidents | incidents.list |
| /:project_id/project/incidents/configure_tab | incidents.list |
| /:project_id/project/incidents/new | incidents.new |
| /:project_id/project/incidents/records | incidents.list |
| /:project_id/project/incidents/recycled | incidents.list |
| /:project_id/project/incidents/:id | incidents.detail |
| /:project_id/project/incidents/:id/change_history | incidents.detail |
| /:project_id/project/incidents/:id/edit | incidents.edit |
| /:project_id/project/incidents/:id/emails | incidents.detail |
| /:project_id/project/incidents/:id/emails/new | incidents.detail |
| /:project_id/project/incidents/:id/related_items | incidents.detail |
| /:project_id/project/incidents/:id/related_items/edit | incidents.detail |

### 4. Save the New Component

* Once you have successfully created a new side panel component and defined the Type, Description, URL, Parameter(s), and View(s), click **Save Component**.

  ![Component Save]({{ site.baseurl }}/assets/guides/form-based-component-save.png)

<a name="define-setup-instructions"></a>
{% include setup_instructions.md %}

## Save Manifest and Create Version

After completing the steps above, you're ready to save your application configuration and set your first version number.
1. Click **Save** at the top of the page.
2. The **Create Version** window appears. Enter a version number using the following syntax: **x.x.x.**
Note: Your version number can only contain integers, and must consist of three (3) integers separated by a '.'. For example, '1.1.1'. Each new version you create must be a higher number than the previous version.

## Test and Validate in Development Sandbox

We recommend testing and validating each version of your application in the development sandbox environment. See [Installing an Application in the Development Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_sandbox_install.md %}) for additional information.

## Promote Updated Sandbox Manifest to Production

After you have successfully tested and validated your updated manifest in the development sandbox environment, you can promote it to the production environment.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.

## Using postMessage to Retrieve Procore Context

The Procore Side Panel feature supports the [MessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent) interface and  [Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method to determine the Procore context in which a side panel application instance is running.
The information retrieved from a message event sent from the parent window includes the following data fields.

- Company ID = event.data.context.company_id
- Project ID = event.data.context.project_id
- Resource ID = event.data.context.id
- View = event.data.context.view

To access context data using the MessageEvent interface, add an event listener to your page and the `postMessage` method to initialize communication with the parent window.
Here is some example code that demonstrates retrieving context data from the message event object.
Note the use of conditional statements with the `postMessage` method to account for [Multiple Procore Regions]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_mpz.md %}).

```javascript
window.addEventListener('message', (event) => {

  const obj = event.data;
  if (obj.type === “setup”) {
    const company_id = obj.context.company_id;
    const project_id = obj.context.project_id;
    const view = obj.context.view;
    const resource_id = obj.context.id;
  }});

if (document.referrer === "https://us02.procore.com/") { window.parent.postMessage({ type: 'initialize' }, "https://us02.procore.com/"); }
if (document.referrer === "https://app.procore.com/") { window.parent.postMessage({ type: 'initialize' }, "https://app.procore.com/"); }
```

In the example above we have set the value for the `targetOrigin` parameter of the `postMessage` method to `https://example.com/my-side-panel-app`.
The `targetOrigin` parameter in this method specifies the origin of the window that should receive the message.
It is important that you always provide a specific, fully-qualified URI in the `targetOrigin` parameter to ensure the best security.
For additional information, see the [postMessage() method documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

### Additional postMessage Events

Aside from the “setup” message event that is fired when your app is first started, there are additional events fired at different life cycles of the side panel app.
All of these events are fired as a postMessage from Procore to your app’s window.
You can listen to  “message” events and filter for the data “type”.

```javascript
window.addEventListener('message', (event) => {
  const obj = event.data;
  if (obj.type === “sidepanel:app:visible”) {
    // do something for when app is visible
  }
  if (obj.type === “sidepanel:app:hidden”) {
    // do something for when app is hidden, but still running
  }
  if (obj.type === “sidepanel:app:destroy”) {
    // do something for when app is about to be removed from the DOM
  }
});
```
