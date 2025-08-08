---
permalink: /building-side-panel-apps
title: Building Side Panel Embedded Applications
sub_header: Learn how to build an embedded application that displays in the right-hand side panel of Procore’s UI.
layout: default
section_title: Building Applications
---

## Introduction
This guide explains how to build a side panel embedded application that appears in Procore’s right-hand side panel. Side panel apps are context-aware and launch from specific tools or views within the Procore UI.

To get started, first [create a Developer Portal account and app]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_create_new.md %}).
<br><br>

***
## Add a New Side Panel Component
1. In your Developer Portal app, expand the **Embedded Components** section.
2. Click **Add Component**.
3. For **Type**, select **Side Panel**.
4. In the **URL** field, enter your app’s base web address (e.g., `https://example.com/1234/12`).
5. Select from the supported Side Panel Views.
  - Use the **Side Panel Views** menu to select one or more tools and views where your app will be accessible.
6. (Optional) Add custom URL parameters.
  - To learn more about URL Parameters, see [Understanding URL Parameter Interpolation]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_url_parameter_interpolation.md %}).
7. Click **Save Component**.
<br><br>

***
<a name="define-setup-instructions"></a>
{% include setup_instructions.md %}
<br><br>

***
## Create Initial App Manifest Version
After configuring your component, save your App Manifest and create a version number.

1. Click **Save** at the top of the page.
2. Click **Create Version**.
3. Enter a semantic version (e.g., `0.1.0`).
   - Versions must be three integers separated by dots (`x.x.x`).
4. Click **Create**.

Your version will be saved with the status `Ready for Testing`. As you continue development, click **Save Version** to capture new changes.
<br><br>

***
## Use postMessage to Access Procore Context
The Procore Side Panel feature supports the [MessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent) interface and the [Window.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method to determine the Procore context in which a side panel application instance is running. The information retrieved from a message event sent from the parent window includes the following data fields:

- Company ID = event.data.context.company_id
- Project ID = event.data.context.project_id
- Resource ID = event.data.context.id
- View = event.data.context.view

To access context data using the MessageEvent interface, add an event listener to your page and use the `postMessage` method to initialize communication with the parent window. The example code below demonstrates how to retrieve context data from the message event object. Note the use of conditional statements with the `postMessage` method to account for [Multiple Procore Regions]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_mpz.md %}). Be sure to account for all regions where your application needs to retrieve Procore context. As new Procore regions become available, update your `postMessage` code to support them.

```javascript
window.addEventListener('message', (event) => {

  const obj = event.data;
  if (obj.type === "setup") {
    const company_id = obj.context.company_id;
    const project_id = obj.context.project_id;
    const view = obj.context.view;
    const resource_id = obj.context.id;
  }
});

if (document.referrer === "https://app.procore.com/") {
  window.parent.postMessage({ type: 'initialize' }, "https://app.procore.com/");
}
if (document.referrer === "https://us02.procore.com/") {
  window.parent.postMessage({ type: 'initialize' }, "https://us02.procore.com/");
}
if (document.referrer === "https://uk01.procore.com/") {
  window.parent.postMessage({ type: 'initialize' }, "https://uk01.procore.com/");
}
```

In the example above, the `targetOrigin` parameter of the `postMessage` method is set to the specific origin of the parent window. The `targetOrigin` parameter specifies the origin of the window that should receive the message. Always provide a specific, fully-qualified URI in the `targetOrigin` parameter to ensure the best security.

For additional information, see the [postMessage() method documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
<br><br>

***
## Supported Message Events
Aside from the "setup" message event fired when your app starts, additional events are fired at different life cycles of the side panel app. All these events are sent as postMessages from Procore to your app’s window.

You can listen for "message" events and filter by the data "type".

```javascript
window.addEventListener('message', (event) => {
  const obj = event.data;
  if (obj.type === "sidepanel:app:visible") {
    // Do something when the app is visible.
  }
  if (obj.type === "sidepanel:app:hidden") {
    // Do something when the app is hidden but still running.
  }
  if (obj.type === "sidepanel:app:destroy") {
    // Do something when the app is about to be removed from the DOM.
  }
});
```
<div class="details-bottom-spacing"></div>

***
## Reference: Supported Side Panel Views
Refer to the full list of supported view keys and URL patterns in the [Side Panel View Key Reference]({{ site.url }}{{ site.baseurl }}{% link building_applications/side_panel_view_keys.md %}).
<br><br>

***
## Test and Validate in Development Sandbox
We recommend testing each app version in a development sandbox environment. See [Installing an Application in the Development Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_sandbox_install.md %}) for step-by-step instructions.
<br><br>

***
## Promote Updated Sandbox Manifest to Production
Once you’ve completed testing, you can promote the sandbox version to production. See [Managing App Versions & Update Notifications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) to learn how.
<br><br>

***