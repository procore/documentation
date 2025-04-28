---
permalink: /update-your-marketplace-app
title: Manage & Improve Your Marketplace App
sub_header: Learn how to update your app, track usage metrics, and optimize performance on the Procore Marketplace.
layout: default
section_title: App Marketplace
---

## Introduction
Once your app is live on the Procore Marketplace, your journey doesn’t end—it evolves. Maintaining a high-quality app and continuously improving it based on platform updates, performance insights, and customer feedback is essential for long-term success.

This guide covers how to manage updates to your app, view key metrics, and implement best practices to keep your app relevant and impactful.
<br><br>

***

## Update Your App
You can update your app’s functionality, features, or Marketplace Listing at any time through the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a>.

> **Important:** If you're unable to access the app in the Developer Portal, see [Managing App Collaborators]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_manage_collabs.md %}) to check your role or request access.

### Marketplace Listing Updates
Your app’s public-facing listing can be edited directly in the Developer Portal. Before making changes:
- Make sure you have access to the app
- Confirm you're assigned the Admin or Owner role

If you don’t see the app after logging in, ask your internal team to invite you.

### App Functionality Updates
If you're modifying app features or behavior, follow the appropriate steps below.

<details>
<summary class="collapseListTierOne">Add API Routes</summary> 
  <p>
    To expand your app’s capabilities, integrate additional Procore API routes. Use the <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">REST API Overview</a> to identify endpoints for reading, writing, or updating data.

    If your app uses <b>Service Account Authentication</b>, be sure to update its tool permissions accordingly.
  </p>
 </details>

 ***
 <details>
 <summary class="collapseListTierOne">Update Embedded or Iframe Properties</summary>
  <p>
  If you're updating the embedded experience (e.g., iframe URL, added views, interpolation), follow these steps:
  <ol> 
    <li>Open your app in the Developer Portal.</li>
    <li>Click the pencil icon next to the embedded component.</li>
    <li>Update the required fields (URL, views, parameters).</li>
    <li>Click <b>Save Component</b>, then <b>Save Version</b>.</li>
    <li>Test via <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app" target="_blank">custom app installation</a>.</li> <li>When ready, click <b>Promote Version</b>, then <b>Submit for Review</b>.</li>
  </ol>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Update App Tool Permissions</summary>
<p>
  Tool access varies depending on your authentication type:
  <ul>
    <li><b>User-Level Authentication:</b>
      <ul>
        <li>Permissions are tied to the end user and cannot be edited directly. Be sure to reflect any changes in your Marketplace Listing.</li>
      </ul>
    </li>
    <li><b>Service Account Authentication:</b><br>
      <ol>
        <li>In the Developer Portal, select your app and click <b>Add Components</b> or <b>Edit Permissions</b>.</li>
        <li>Update tool permissions as needed.</li>
        <li>Click <b>Save Component</b> and then <b>Save Version</b>.</li>
        <li>Test via custom app installation.</li>
        <li>Click <b>Promote Version</b>, then <b>Submit for Review</b>.</li>
      </ol>
    </li>
  </ul>
  Apps using Service Account Authentication must follow the principle of least privilege—only request access to tools essential to your app’s function.
</p> 
</details>
***

## View App Metrics
Once published, your app’s performance data is available in the App Metrics section of the Developer Portal. These insights can help you measure adoption, track engagement, and identify opportunities for improvement.

> **Important:** App metrics do not include any personally identifiable information (e.g., names, emails).

### Key Metrics
- **Marketplace Views:** Total and time-based views of your public listing
- **Installations:** Number of company accounts that installed your app, including dates
- **Uninstalls:** Number and timing of uninstall events

To access this data, log in to the Developer Portal → Select your app → Click the Metrics tab.
<br><br>

***
## Best Practices for Growth & Maintenance
Proactive management is key to maximizing your app’s impact and long-term performance.

1. **Regularly Monitor Metrics**<br>
Track engagement trends and installation patterns to stay ahead of changes.

2. **Collect and Act on User Feedback**<br>
Gather insights through support channels, or direct outreach.

3. **Keep Your App Aligned with Platform Changes**<br>
Stay current with Procore API updates and deprecation notices to ensure compatibility.

4. **Communicate Updates to Users**<br>
Release notes, listing updates, and in-app messaging help keep users informed.

5. **Provide Exceptional Support**<br>
Fast, helpful support builds trust and improves customer retention.
<br><br>

***
## Procore API Updates and Deprecation
Stay informed about Procore API changes through Developer Portal announcements, newsletters, and release documentation. 

- Update your app proactively to maintain compatibility.
- Review deprecation notices carefully to avoid service interruptions.
- Take advantage of new platform capabilities as they become available.
<br><br>

***
### Additional Resources
- [Build & Prepare Your App]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_requirements.md %})
- [Marketplace Listing Guidelines]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_listing_guidelines.md %})
- [Marketplace Approval Checklist]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_checklist.md %})
- [Managing App Collaboration]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_manage_collabs.md %})
<br><br>

***
### Updates to Guidelines and Enforcement
Procore Technologies reserves the right to revise the Developer Documentation at any time.

As outlined in our terms and conditions, Procore may remove or decline the publication of any Marketplace listing at its discretion.