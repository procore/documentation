---
permalink: /building-side-panel-apps
title: Building Procore Side Panel Applications
layout: default
section_title: Building Applications
---

## Background

Procore has expanded the capabilities of embedded applications to include a context-aware side panel experience in addition to the full screen experience.
Developers can now build applications that display in a side panel iframe located on the right side of the Procore user interface.
Procore users click a dock icon to launch the side panel experience.
Side panel applications operate in the context of specific tools/views in Procore.
Developers use the application manifest to define the specific tools and views their side panel application supports.
Company administrators install side panel applications and create application configurations using the same installation flow as full screen embedded applications.
This article outlines the steps for creating a new side panel application.

## Create an Application

(NOTE: If your existing app already has an embedded component defined in the manifest, you will need to create a new app.
You cannot add a side panel component to your existing app.
This limitation will be addressed in a feature release.)

1. Open your browser and navigate to the Developer Portal landing page.
1. Click **Sign In** to log in to your Developer Portal account.
1. Navigate to the My Apps page and click **Create a New App**. The Create New App dialog displays.
1. Enter an **App Name**. This will be the name you use to refer to your app internally within your organization.
1. Click **Create**. A development sandbox is generated for your new app. You will receive an email notification when your new sandbox is ready.

## Define an App Manifest

As a developer, you can control which Procore tools and resource views your app can display in.
The following sections outline the steps for defining an app manifest for a side panel embedded app.

### Create New Sandbox Manifest Version

Let’s start by creating a new version of our app manifest in the sandbox environment.
1. In the Developer Portal, navigate to the Manage Manifests panel for your app.
1. Make sure the Sandbox tab is selected.
1. Click **Create New Version**.

![create new manifest version]({{ site.baseurl }}/assets/guides/side-panel-create-new-manifest-version.png)

### Add a Side Panel iframe Component

Now we can add an iframe component for our side panel in the manifest.
Below is an example app manifest that defines a simple side panel iframe component.

![3.2 manifest example]({{ site.baseurl }}/assets/guides/side-panel-32-manifest.png)

A valid side panel app manifest requires the following:

* Manifest version number must be ‘3.2’.
* iframe component instance type defined as ‘sidepanel’.
* Targeted tools/resources defined with the ‘views’ attribute (see below).
* Side panel application URL specified in the ‘iframe_src’ attribute.
* Required and/or optional fields defined in the ‘configuration’ section.

See [Creating an App Manifest]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_define_manifest.md %}) to learn more about app manifests and their attributes.

## Working with Side Panel Views

Using the ‘Views’ attribute, you can specify which tools, resources, and actions your application works with and from which page(s) it will be accessible.
A dot notation is used to define each view as shown in the following example.

```json
{
    "views": [
        "change_events.new",
        "change_events.detail",
        "change_events.edit",
        "change_events.list",
        "change_events.all"
    ]
}
```

The last segment in the dot notation is the action type; detail, new, edit, list, or all.

- new: matches the new or similar actions.
- detail: matches against the show or similar actions.
- edit: matches against the edit or similar actions.
- list: matches against the index or similar actions.
- all: matches against all actions.

As some tools comprise more than one resource (e.g., commitments), this approach is both granular and flexible.
For example, you might want your app to display only on the list page, but not on the detail page.

The following sections list the currently supported Side Panel Views that can be defined in the application manifest.

### Commitments

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/commitments/work_order_contracts/:id | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/change_orders | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/advanced_settings | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/schedule_of_values | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/billings_schedule_of_values | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/billings_schedule_of_values/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/requisitions | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/contract_payments | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/contract_payments/new | commitments.work_order_contracts.new |
| /:project_id/project/commitments/work_order_contracts/:id/related_items | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/related_items/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/communications | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/communications/new | commitments.work_order_contracts.new |
| /:project_id/project/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/advanced_settings/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id/schedule_of_values | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/change_orders | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/requisitions | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/contract_payments | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/contract_payments/new | commitments.purchase_order_contracts.new |
| /:project_id/project/commitments/purchase_order_contracts/:id/related_items | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/related_items/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id/communications | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/communications/new | ommitments.purchase_order_contracts.new |
| /:project_id/project/commitments/purchase_order_contracts/:id/change_history | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/advanced_settings | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/advanced_settings/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id/<br>change_orders/commitment_contract_change_orders/new | commitments.commitment_contract_change_orders.new |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id/<br>change_orders/commitment_contract_change_orders/:id | commitments.commitment_contract_change_orders.detail |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id/<br>change_orders/commitment_contract_change_orders/:id/edit | commitments.commitment_contract_change_orders.edit |

### Contracts

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
| /:project_id/project/contracts/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/advanced_settings/edit | commitments.work_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/change_orders | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/change_history | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/advanced_settings | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/advanced_settings/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/requisitions/:invoice_id | commitments.requisitions.detail |

### Prime Contracts

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/contracts/prime_contracts/:prime_contract_id/invoices | prime_contracts.invoices.list
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
| /:project_id/project/prime_contracts/:id/change_orders/potential_change_orders/:id | prime_contracts.change_orders.potential_change_orders.detail |
| /:project_id/project/prime_contracts/:id/change_orders/potential_change_orders/<br>new_from_change_events_bulk_action | prime_contracts.change_orders.potential_change_orders.new |
| /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/new | prime_contracts.payment_applications.new |
| /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/:id | prime_contracts.payment_applications.detail |
| /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/:id/edit | prime_contracts.payment_applications.edit |
| /:project_id/project/prime_contracts/:contract_id/change_orders/<br>change_order_packages/:change_order_id | prime_contracts.change_orders.detail |

### Change Events

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/change_events/events | change_events.list |
| /:project_id/project/change_events/events/:id | change_events.detail |
| /:project_id/project/change_events/events/:id/edit | change_events.edit |
| /:project_id/project/change_events/events/new | change_events.new |

### Budget

| URL Path | View Key |
| -------- | -------- |
| /companies/:company_id/projects/:project_id/tools/budget_changes | budgeting.budget_changes.list |
| /projects/:project_id/budgeting | budgeting.list |
| /projects/:project_id/budgets/budget_details | budgeting.detail |
| /projects/:project_id/forecasting | budgeting.forecasting.detail |
| /:project_id/project/budgeting/change_history | budgeting.change_history.list |

### Submittal Logs

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/submittal_logs/:id | submittal_logs.detail |

### Project Directory

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/directory/vendors/:id/edit | project_directory.vendors.edit |
| /:project_id/project/directory/edit_person/:id | project_directory.person.edit |

### Observations

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/observations/items/:id/edit | observations.edit |
| /:project_id/project/observations/items | observations.list |

### RFIs

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/rfi/show/:id | rfi.detail |

### Inspections

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/checklists/lists/:id | inspections.detail |

### Correspondence

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/generic_tool/show/:id | correspondence.detail |

### Schedule

| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/calendar/all | schedule.calendar.task.list |
| /:project_id/project/calendar/month | schedule.calendar.month.list |
| /:project_id/project/calendar | schedule.calendar.list |
| /:project_id/project/calendar/lookaheads | schedule.calendar.lookaheads.list |
| /:project_id/project/calendar/tasks/:task_id | schedule.calendar.task.detail |

## Using postMessage to Retrieve Procore Context

The Procore Side Panel feature supports the [MessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent) interface and  [Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method to determine the Procore context in which a side panel application instance is running.
The information retrieved from a message event sent from the parent window includes the following data fields.

- Company ID = event.data.context.company_id
- Project ID = event.data.context.project_id
- Resource ID = event.data.context.id
- View = event.data.context.view

To access context data using the MessageEvent interface, add an event listener to your page and the postMessage method to initialize communication with the parent window.
Here is some example code that demonstrates retrieving context data from the message event object.

```javascript
window.addEventListener('message', (event) => {

  const obj = event.data;
  if (obj.type === “setup”) {
    const company_id = obj.context.company_id;
    const project_id = obj.context.project_id;
    const view = obj.context.view;
    const resource_id = obj.context.id;
  }});

window.parent.postMessage({ type: 'initialize' }, 'https://example.com/my-side-panel-app');
```

In the example above we have set the value for the `targetOrigin` parameter of the `postMessage` method to `https://example.com/my-side-panel-app`.
The `targetOrigin` parameter in this method specifies the origin of the window that should receive the message.
It is important that you always provide a specific, fully-qualified URI in the `targetOrigin` parameter to ensure the best security.
For additional information, see the [postMessage() method documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

## Additional postMessage Events

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

## Promote Updated Sandbox Manifest to Production

After you have successfully tested and validated your updated manifest in the development sandbox environment, you can promote it to the production environment and use your production OAuth credentials with your App.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.

## App Installation and Management

Side panel applications are installed by Procore company administrators either from the Procore App Marketplace or as custom installations.
See [Install an Embedded App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-embedded-app), [Install a Data Connection App from the Marketplace](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/Install-data-connection-app), and [Install a Custom App](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app) for additional information.
