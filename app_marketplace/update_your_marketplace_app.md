---
permalink: /update-your-marketplace-app
title: Update Your Marketplace App
sub_header: Learn how to update your published Procore Marketplace app.
layout: default
section_title: App Marketplace
---

## Introduction

As your app evolves, you may need to update its functionality, features, or Marketplace Listing. These updates can be made at any time through the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a>.

If you’re unable to access the app in the Developer Portal, review [Managing App Collaborators]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_manage_collabs.md %}) to confirm your permissions or request access from your internal team.

While changes to your app’s **source code** do not require approval, **any updates that impact functionality or how your app interacts with Procore must be submitted for review and approved by the Procore Marketplace team.**
<br><br>

***

## Update Your Marketplace Listing

You can update your app’s Marketplace Listing directly within the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a>.

Before updating, make sure:
- You have access to the app
- You’re assigned an appropriate role (Admin or Owner)

If you don’t see the app after logging in, ask your internal team to invite you.
<br><br>

***

## Update App Functionality

If you're adding new features or modifying existing functionality, follow the appropriate steps below.

---

<details>
<summary class="collapseListTierOne">Add API Routes</summary>
<p>
To expand your app’s capabilities, you can integrate additional API routes. Refer to the <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">Procore REST API Overview</a> to identify relevant endpoints for reading, writing, or updating data.

If your app uses the <b>Service Account Authentication</b> grant type, remember to update tool permissions to avoid errors or failed calls.
</p>
</details>

---

<!-- Optional future enhancement -->
<!--
<details>
<summary class="collapseListTierOne">Add Additional App Types</summary>
<p>
If you want to add another supported <b>App Type</b> (e.g., embedded UI or data connector), you can update your existing app in the Developer Portal.

See guides for:
<ul>
  <li>[Build a Full-Screen App](LINK)</li>
  <li>[Build a Side Panel App](LINK)</li>
  <li>[Build an Authorization Code App](LINK)</li>
  <li>[Build a Client Credential App](LINK)</li>
</ul>
</p>
</details>
-->

<details>
<summary class="collapseListTierOne">Update Embedded or Iframe Properties</summary>
<p>
If you're changing your app’s embedded experience—such as modifying the iframe URL, adding views, or using parameter interpolation—follow these steps:

<ol>
  <li>Open your app in the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a>.</li>
  <li>Click the pencil icon next to the embedded component you want to edit.</li>
  <li>Update the required fields (e.g., iframe URL, views, interpolation parameters).</li>
  <li>Click <b>Save Component</b>.</li>
  <li>Click <b>Save Version</b> to commit your changes and generate a new version for testing.</li>
  <li>Test the update in your sandbox by <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app" target="_blank">installing the app as a custom app</a>.</li>
  <li>Once you're satisfied with the results, click <b>Promote Version</b> to apply the changes to the production environment, then <b>Submit for Review</b> for approval.</li>
</ol>
</p>
</details>

---

<details>
<summary class="collapseListTierOne">Update App Tool Permissions</summary>
<p>
If you're expanding your app’s scope, update its tool permissions based on the authentication method in use:

<ul>
  <li><b>User-Level Authentication:</b><br>
  Permissions are tied to the end user’s Procore account and cannot be managed directly. However, you should update your Marketplace Listing to reflect any new tool requirements.</li>

  <li><b>Service Account Authentication:</b><br>
  Follow these steps to update your app’s tool access:
    <ol>
      <li>Open your app in the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a> and click <b>Add Components</b> or <b>Edit Permissions</b>.</li>
      <li>Update your tool permissions or authentication type as needed.</li>
      <li>Click <b>Save Component</b>.</li>
      <li>Click <b>Save Version</b> to finalize your changes.</li>
      <li>Test the update in the sandbox by <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app" target="_blank">installing the app as a custom app</a>.</li>
      <li>Once confirmed, click <b>Promote Version</b> and then <b>Submit for Review</b> for approval.</li>
    </ol>
  </li>
</ul>

> Apps using Service Account Authentication must follow the principle of least privilege—only requesting access to the tools and permissions essential to their function.
</p>
</details>
