---
permalink: /building-embedded-apps
title: Building Embedded Applications
sub_header: Build an app that runs inside Procore's UI — as a full screen workspace or a contextual side panel.
layout: default
section_title: Build Your App
---

## Introduction
Embedded apps run directly within the Procore user interface, keeping users in context and reducing app switching. They are defined using the Procore App Manifest and configured through the Developer Portal's Configuration Builder.

Procore supports two embedded placements:

- **Full Screen** — occupies the main content area. Users launch it from the **Apps** menu in the top-right of Procore, available at both the Company and Project level.
- **Side Panel** — renders in a fixed 400-px panel on the right side of the UI, scoped to specific tools and views. Users launch it from the dock on the right edge of the interface.

You can add one or both to a single app. To get started, first [create a Developer Portal account and app]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_create_new.md %}).
<br><br>

***
## Add a Full Screen Component
Full screen apps require a URL to define which page appears in the Procore UI.

1. In the Configuration Builder on the Manage App page, expand the **Components** section and click **Add Component**.
2. From the drop-down list, select **Full Screen** for the Type.
3. In the URL field, enter the base web address for your application (e.g., `https://example.com/1234/12`).
4. (Optional) Add dynamic URL parameters so your app adapts to each company, project, or install. See [Understanding URL Parameter Interpolation]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_url_parameter_interpolation.md %}).
5. Click **Save Component**.
<br><br>

***
## Add a Side Panel Component
1. In your Developer Portal app, expand the **Embedded Components** section.
2. Click **Add Component**.
3. For **Type**, select **Side Panel**.
4. In the **URL** field, enter your app's base web address (e.g., `https://example.com/1234/12`).
5. Select from the supported Side Panel Views.
   - Use the **Side Panel Views** menu to select one or more tools and views where your app will be accessible.
6. (Optional) Add dynamic URL parameters so your app adapts to each company, project, or install. See [Understanding URL Parameter Interpolation]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_url_parameter_interpolation.md %}).
7. Click **Save Component**.

For the full list of supported view keys and URL patterns, see the [Side Panel View Key Reference]({{ site.url }}{{ site.baseurl }}{% link building_applications/side_panel_view_keys.md %}).

***
<details>
  <summary class="collapseListH2">
    Accessing Procore Context
    <span class="collapseSubhead">Side panel apps can read the Procore context they're running in — company, project, resource, and view — using the MessageEvent interface and Window.postMessage(). Expand for the fields and setup code.</span>
  </summary>
  <div markdown="1">

The data fields retrieved from a message event sent by the parent window include:

- Company ID = `event.data.context.company_id`
- Project ID = `event.data.context.project_id`
- Resource ID = `event.data.context.id`
- View = `event.data.context.view`

Add an event listener to your page and use [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) to initialize communication with the parent window. Note the conditional statements that account for [Multiple Procore Regions]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_mpz.md %}) — account for all regions where your app needs Procore context, and update this code as new regions become available.

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

Always set the `targetOrigin` parameter of `postMessage` to the specific, fully-qualified origin of the parent window to ensure the best security.

  </div>
</details>

***
<details>
  <summary class="collapseListH2">
    Supported Message Events
    <span class="collapseSubhead">Beyond the initial setup event, Procore fires postMessage events across the side panel app's life cycle — visible, hidden, and destroy. Expand for the event types and a listener example.</span>
  </summary>
  <div markdown="1">

Aside from the `setup` event fired when your app starts, additional events fire at different points in the side panel app's life cycle. All are sent as postMessages from Procore to your app's window. Listen for `message` events and filter by the data `type`.

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

  </div>
</details>
<div class="details-bottom-spacing"></div>

***
<a name="define-setup-instructions"></a>
{% include setup_instructions.md %}
<br><br>

***
## Create the Initial App Manifest Version
After configuring your component(s), save your App Manifest and create a version.

1. Click **Save** at the top of the page.
2. Click **Create Version**.
3. Enter a semantic version number (e.g., `0.1.0`). Versions must be three integers separated by dots (`x.x.x`).
   - For details, see [App Versioning &amp; Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}).
4. Click **Create**.

The version is saved with the status **Ready for Testing**. As you continue development, click **Save Version** to capture new changes.
<br><br>

***
## Test and Validate in Your Developer Sandbox
Test each version of your app in your Developer Sandbox before promoting it to production. See [Install a Version in Your Developer Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/install_version_sandbox.md %}).
<br><br>

***
## Promote to Production
Once you're satisfied with testing, promote your sandbox version to production. See [App Versioning &amp; Production]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}) to learn how.
