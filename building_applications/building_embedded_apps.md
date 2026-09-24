---
permalink: /building-embedded-apps
title: Building Embedded Applications
sub_header: Build an app that runs inside Procore's UI — as a full screen workspace or a contextual side panel.
layout: default
section_title: Build Your App
---

## Overview
The **Embedded** capability runs your app directly inside the Procore user interface, keeping users in context and reducing app switching. You add its components to an app version in the Developer Portal, alongside any Data Connector or Agentic components, and Procore governs how customers install and consent to them.

Embedded has two components, and you can add either or both:

- **Full Screen** — your app occupies the main content area as a full-page workspace. Users launch it from the **Apps** menu in the top right of Procore, at both the Company and Project level.
- **Side Panel** — your app renders in a fixed 400-px panel on the right side of the UI, scoped to specific tools and views. Users launch it from the dock on the right edge of the interface.

<br><br>

***
## Create a Version and Add Components
Components belong to an app version, so start by creating one.

1. Open your app in the Developer Portal and select **Create Version**.
2. Under **Components**, select **Edit Components**.
3. In the **Embedded** group, select **Full Screen**, **Side Panel**, or both.
4. Select **Save**.

Procore assigns the version number for you. Override it only if your own release numbering depends on it.

Each component you added now appears in the **Components** list with a status and a **Manage** button. Adding a component does not configure it — you supply the details next, one component at a time.
<br><br>

***
## Configure Your Full Screen Component
In the **Components** list, select **Manage** on the **Full Screen** row. One field is required:

1. **External URL** — the address of your app to display in Full Screen, for example `https://example.com/1234/12`.

Select **Save Configuration** when you are done.
<br><br>

***
## Configure Your Side Panel Component
Select **Manage** on the **Side Panel** row. Two fields are required:

1. **External URL** — the address of your app to display in the Side Panel.
2. **Supported Side Panel Views** — the Procore views where users can open your Side Panel. Views are grouped by tool — Budgeting, Change Events, Commitments, Daily Log, RFI, Submittal Logs and more — so expand a group to choose individual views within it.

Select **Save Configuration** when you are done.

For the full list of supported view keys and URL patterns, see the [Side Panel View Key Reference]({{ site.url }}{{ site.baseurl }}{% link building_applications/side_panel_view_keys.md %}).
<br><br>

***
## Add Dynamic URL Parameters
Both components carry a **Dynamic URL Parameters** section that makes your External URL adapt to each install. It covers two kinds of value.

**Procore's built-in values** work as soon as you add them to your External URL — there is nothing to define. Four are available: {% raw %}`{{procore.company.id}}`, `{{procore.company.name}}`, `{{procore.project.id}}`, and `{{procore.project.name}}`{% endraw %}.

**Custom parameters** are values the administrator installing your app enters during setup — a Box folder ID, a subdomain, a region. You define each one with **Add Parameter**, then reference it in your External URL as a token. They can fill a subdomain, a path segment, or a query value.

For the field-by-field steps and worked examples, see [Understanding URL Parameter Interpolation]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_url_parameter_interpolation.md %}).

***
<details>
  <summary class="collapseListH2">
    Access Procore Context
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
## Test and Validate in the Developer Sandbox
Install the version in your Developer Sandbox and confirm your app renders and behaves as expected in each placement you declared, before you promote it. See [Install a Version in Your Developer Sandbox]({{ site.url }}{{ site.baseurl }}{% link building_applications/install_version_sandbox.md %}).
<br><br>

***
## Save and Promote the Version
Return to the **Create Version** screen and select **Save Version**. Promote the version when you are ready for production.

For the versioning flow itself, see [App Versioning and Update Notifications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_promote_manifest.md %}).
<br><br>

***
## Next Steps
- [Side Panel View Key Reference]({{ site.url }}{{ site.baseurl }}{% link building_applications/side_panel_view_keys.md %}) — the tools and views a side panel app can attach to.
- [Understanding URL Parameter Interpolation]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_url_parameter_interpolation.md %}) — pass company, project, and install values into your URL.
- [Choose an App Type]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/building_apps_app_types.md %}) — how Embedded fits among the capabilities.
{: .link-list}
<br><br>
