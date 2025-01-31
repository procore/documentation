---
permalink: /update-your-marketplace-app
title: Update Your Marketplace App
sub_header: Learn how to update your published Procore Marketplace app.
layout: default
section_title: App Marketplace
---

## Introduction
As your app evolves over time, you may need to update its functionality, content, Marketplace Listing, or app features. You can update these items anytime in your app through the <a href="https://developers.procore.com/developers" target="blank">Procore Developer Portal</a>.

It's important to note that you need to submit these changes to be reviewed and approved by the Procore Marketplace team. While changes to your source code itself do not require approval, any modifications that impact functionality or how your integration interacts with Procore must be reviewed.
<br><br>

***
## Update Marketplace Listing
You can easily update the information shown on your Marketplace Listing directly in your app through the <a href="https://developers.procore.com/developers" target="blank">Procore Developer Portal</a>. 

It's important to note that you must have access to the corresponding app and have the appropriate role applied. If you do not see the app you wish to update after logging into the Procore Developer Portal, reach out to your internal team for them to invite you.
<br><br>
<!-- To learn how to add additional collaborators to your app, visit [Manage App Collaborators](LINK HERE).
<br><br> -->

***
## Update App Functionality
If you wish to update your app's functionality or features, follow the steps below:
<br><br>

<details>
<summary class="collapseListTierOne">Add Additional API Routes</summary>
<p>
To expand your app's functionality, explore additional API routes by referring to the <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="blank"> Procore Rest API Overview</a>. Identify the required routes for creating, updating, or reading data from Procore, and integrate them into your source code.
<br><br>
If your app uses the <b>Service Account Authentication</b> grant type, make sure to update the tool permissions to prevent errors.
</p>
</details>

<!-- ***
<details>
<summary class="collapseListTierOne">Add Additional App Type</summary>
<p>
If you've previously developed an app and wish to include an additional [available app type](LINK HERE), you can do so by simply updating your existing app within the Procore Developer Portal and referencing the followings guides for the specific app types:

<ul>
<li>To add the full-screen embedded app type, visit [Build a Full-Screen App](LINK HERE).</li>
<li>To add the side panel embedded app type, visit [Build a Side Panel App](LINK HERE).</li>
<li>To add the authorization code data connector app type, visit [Build a Authorization Code App](LINK HERE).</li>
<li>To add the client credential data connector app type, visit [Build a Client Credential App](LINK HERE).</li>
</ul>
</p>
</details> -->

***
<details>
<summary class="collapseListTierOne">Updating Embedded & Iframe Properties</summary>
<p>
If you're considering updating your full-screen or side panel app by changing the URL source, adding additional views or incorporating parameter interpolation, follow these steps:

<ol>
    <li>Access your app via the <a href="https://developers.procore.com/developers" target="blank">Procore Developer Portal</a> and click the pencil icon to the right of the component you wish to edit.</li>
    <li>Update the information as needed, such as changing the URL, selecting different views or adding parameter interpolation.</li>
    <li>Select <b>Save Component</b> in the bottom right corner.</li>
    <li>Click <b>Save Version</b> to confirm the changes and create a new version for the Developer Sandbox.</li> <!-- WIP it would be good to link out to 'What is the Developer Sandbox' here -->
    <li>Test the changes by <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app" target="blank">Installing Your App</a> in the Developer Sandbox as a custom app.</li>
    <li>When you're satisfied with the changes, click <b>Promote Version</b> to make the changes available in the production environment and then <b>Submit for Review</b> to notify the Procore Marketplace team for approval.</li>
</ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Update App Tool Permissions</summary>
<p>
If you're expanding your app's functionality, ensure you update the required permissions to prevent errors. Here's how to proceed based on your grant type:
<ul>
    <li>For apps using <b>User Level Authentication</b>:</li>
        <ul>
            <li>Since permissions are user-specific, you can't directly manage them. However, consider updating your app requirements on the Marketplace Listing.</li>
        </ul>
        <br>
    <li>For apps using <b>Service Account Authentication</b>:</li>
        <ol>
            <li>Access your app via the <a href="https://developers.procore.com/developers" target="blank">Procore Developer Portal</a> and click <b>Add Components</b> or <b>Edit Permissions</b>.</li>
            <li>Update the information as needed, such as changing the permissions or selecting a different authentication type.</li>           
            <li>Select <b>Save Component</b> in the bottom right corner.</li>
            <li>Click <b>Save Version</b> to confirm the changes and create a new version for the Developer Sandbox.</li> <!-- WIP it would be good to link out to 'What is the Developer Sandbox' here -->
            <li>Test the changes by <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app" target="blank">Installing Your App</a> in the Developer Sandbox as a custom app.</li>
            <li>When you're satisfied with the changes, click <b>Promote Version</b> to make the changes available in the Production environment and then <b>Submit for Review</b> to notify the Procore Marketplace team for approval.</li>
        </ol>
</ul>

It's important to note that if your app uses a Service Account Authentication, it must adhere to the principle of least privilege, granting access only to the tools it integrates with and using the minimum required permissions.
</p>
</details>