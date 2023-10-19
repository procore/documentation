---
permalink: /building-side-panel-apps
title: Building Procore Side Panel Applications
layout: default
section_title: Building Applications
---

>**Note:** This article covers topics consistent with the App Manifest v4.1 format.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

## Background

Procore has expanded the capabilities of the Procore platform to include a context-aware side panel experience in addition to the full screen embedded experience.
Developers can now build applications that display in a side panel iframe located on the right side of the Procore user interface.
Procore users click a dock icon to launch the side panel experience.
Side panel applications operate in the context of specific tools/views in Procore.
Developers use the application manifest to define the specific tools and views their side panel application supports.
Company administrators install side panel applications and create application configurations using the same installation flow as full screen embedded applications.
This article outlines the steps for creating a new side panel application.

## Create an Application

Open your browser and navigate to the Developer Portal landing page.
1. Click **Sign In** to log in to your Developer Portal account.
1. Navigate to the My Apps page and click **Create a New App**. The Create New App dialog displays.
1. Enter an **App Name**. This will be the name you use to refer to your app internally within your organization.
1. Click **Create**. A development sandbox is generated for your new app. You will receive an email notification when your new sandbox is ready.

## Define an App Manifest

The following sections outline the steps for defining an app manifest for a fullscreen embedded app.

### Create New Sandbox Manifest Version

Let’s start by creating a new version of our app manifest in the sandbox environment.
1. In the Developer Portal, navigate to the Manage Manifests panel for your app.
1. Make sure the Sandbox tab is selected.
1. Click **Create New Version** to display the manifest editor. You can use the editor to add an embedded component to your manifest and modify it for your specific application. The editor provides built-in validation so that you are notified when the format of your manifest does not conform to the required structure.

    ![create new manifest version]({{ site.baseurl }}/assets/guides/side-panel-create-new-manifest-version.png)

### Add a Side Panel Component

You can add a side panel component to the manifest using the **Inject Component** button for the `sidepanel` component type.

![Inject SidePanel]({{ site.baseurl }}/assets/guides/inject-component-sidepanel.png)

A new code block is added to the manifest where you can define the structure of your side panel component. For example:

![Sidepanel Snippet]({{ site.baseurl }}/assets/guides/create-new-manifest-v4.1-sidepanel-snippet.png)

The manifest objects and attributes for the side panel component are the same as for embedded components, with the addition of the `sidepanel:views` array.
This is where you define which Procore application views your component supports.
For example, `commitments.purchase_orders.detail` and `commitments.purchase_orders.edit`.
Supported side panel views are discussed in the following section.

## Working with Side Panel Views

Using the ‘Views’ array, you can specify which tools, resources, and actions your application works with and from which page(s) it will be accessible.
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

The following Side Panel Views are supported and can be defined in the application manifest:

| View Key | Sample Path |
|----------|-------------|
| commitments.work_order_contracts.detail | /projects/work_order_contracts/7542524<br> /projects/work_order_contracts/7542524/requisitions/6620298/g703 |
| commitments.purchase_order_contracts.detail | /projects/commitments/purchase_order_contracts/754251<br> /projects/commitments/purchase_order_contracts/754251/requisitions/6620298/g703 |
| commitments.commitment_contract_change_orders.new | /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id<br >/change_orders/commitment_contract_change_orders/new |
| commitments.commitment_contract_change_orders.detail | /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id<br >/change_orders/commitment_contract_change_orders/:id |
| commitments.commitment_contract_change_orders.edit |/:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id<br >/change_orders/commitment_contract_change_orders/:id/edit |
| prime_contracts.invoices.list | /:project_id/project/contracts/prime_contracts/:prime_contract_id/invoices |
| prime_contracts.payment_applications.new | /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/new  |
| prime_contracts.payment_applications.detail | /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/:id |
| prime_contracts.payment_applications.edit | /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/:id/edit |
| change_events.new | /:project_id/project/change_events/events/new |
| change_events.detail | /:project_id/project/change_events/events/:id |
| change_events.edit | /:project_id/project/change_events/events/:id/edit |
| change_events.list | /:project_id/project/change_events/events |
| budgeting.detail | /:project_id/project/budgets/budget_details |
| budgeting.list | /projects/1003496/budgeting |
| submittal_logs.detail | /:project_id/project/submittal_logs/:id |
| drawing_areas_drawing_log.list | /:project_id/project/drawing_areas/:id/drawing_log |
| project_directory.vendors.edit | /:project_id/project/directory/vendors/:id/edit |
| project_directory.person.edit | /:project_id/project/directory/edit_person/:id |
| observations.list | /:project_id/project/observations/items |
| observations.edit | /:project_id/project/observations/items/:id/edit |
| rfi.detail | /:project_id/project/rfi/show/:id |
| inspections.detail | /:project_id/project/checklists/lists/:id |
| prime_contracts.change_orders.detail | /:project_id/project/prime_contracts/:contract_id/change_orders/change_order_packages/:change_order_id |
| commitments.requisitions.detail | /:project_id/project/commitments/purchase_order_contracts/:id/requisitions/:invoice_id |
| correspondence.detail | /:project_id/project/generic_tool/show/:id |

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

window.parent.postMessage({ type: 'initialize' }, '*');
```

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

After you have successfully tested and validated your updated manifest in the development sandbox environment, you can promote it to the production environment.
See [Promoting a Sandbox Manifest to Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) for additional information.
