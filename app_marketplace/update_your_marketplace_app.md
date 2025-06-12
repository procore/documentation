---
permalink: /update-your-marketplace-app
title: Manage & Improve Your Marketplace App
sub_header: Learn how to update your app, track usage metrics, and optimize performance on the Procore Marketplace.
layout: default
section_title: App Marketplace
---

## Introduction
Launching your app on the Procore Marketplace is just the beginning, your journey evolves from there. Maintaining a high-quality app and continuously improving it based on platform updates, performance insights, and customer feedback is essential for long-term success.

This guide covers how to manage updates to your app, view key metrics, and implement best practices to keep your app relevant and impactful.
<br><br>

***

## Manage Your App
You can update your app’s functionality, features, or Marketplace Listing at any time through the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a>. Note that some changes may require approval from the Marketplace team.

If you're unable to access the app in the Developer Portal, see [Managing App Collaborators]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_manage_collabs.md %}) to check your role or request access.

<details>
<summary class="collapseListTierOne">Managing Your Marketplace Listing</summary>
    Your Marketplace Listing serves as the public-facing introduction to your app. You can update it at any time through the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a> to reflect the latest branding, features, and value proposition.
  <br><br>

  <p><b>Access Requirements</b></p>
  To make edits, you must:
  <ul>
    <li>Have access to the app in the Developer Portal</li>
    <li>Be assigned the Admin or Owner role for the app</li>
  </ul>

  If you don’t see the app after logging in, check your role or request access by following the steps in <a href="{{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_manage_collabs.md %}">Managing App Collaborators</a>.
  <br><br>

  <p><b>Best Practices</b></p>
  A well-crafted listing helps attract the right audience and improve discoverability. For guidance on optimizing your listing content, see <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_listing_guidelines.md %}">Marketplace Listing Guidelines</a>.
</details>

***
<details>
<summary class="collapseListTierOne">Managing Your App Functionality</summary>
<p>
You can update your app’s technical configuration through the Developer Portal. This includes enhancing functionality, updating embedded experiences, and configuring tool permissions.

Here’s how to manage common updates:

<p><b>Add or Update API Routes</b></p>
To expand your app’s capabilities, integrate additional Procore API routes. Use the <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">REST API Overview</a> to identify endpoints for reading, writing, or updating data. If your app uses <b>Service Account Authentication</b>, be sure to update tool permissions accordingly.
<br><br>

<p><b>Update Embedded or Iframe Properties</b></p>
To modify the embedded experience (e.g., iframe URL, added views, interpolation), follow these steps:
<ol> 
  <li>Open your app in the Developer Portal.</li>
  <li>Click the pencil icon next to the embedded component.</li>
  <li>Update the required fields (URL, views, parameters).</li>
  <li>Click <b>Save Component</b>, then <b>Save Version</b>.</li>
  <li>Test via <a href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app" target="_blank">custom app installation</a>.</li>
  <li>When ready, click <b>Promote Version</b>, then <b>Submit for Review</b>.</li>
</ol>

<p><b>Update App Tool Permissions</b></p>
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
If your app uses Service Account Authentication, follow the principle of least privilege: request access only to the tools essential to your app’s functionality.
</p>
</details>

 ***

<details>
<summary class="collapseListTierOne">Managing Your App Metrics</summary>
<p>
Understanding how your app is performing on the Procore Marketplace is key to making informed product decisions and improving user experience. The Developer Portal provides visibility into usage metrics without exposing any personally identifiable information (e.g., names, emails).

<p><b>Where to Find Metrics</b></p>
<p>To access your app's performance data:</p>
<ol>
  <li>Log in to the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a></li>
  <li>Select your app</li>
  <li>Click the <b>Metrics</b> tab</li>
</ol>

<p><b>What You Can Track</b></p>
Key metrics include:
<ul>
  <li><b>Marketplace Views:</b> Total and time-filtered views of your app's public listing</li>
  <li><b>Installations:</b> Number of company accounts that installed your app, along with install dates</li>
  <li><b>Uninstalls:</b> Number of companies that removed your app, including when it occurred</li>
</ul>
</p>
</details>
***
<div class="details-bottom-spacing"></div>

## Marketing & Growing Your App
Publishing your app on the Procore Marketplace is just the first step toward scaling adoption and maximizing its impact. This section focuses on the different aspects of growing and maintaining your app, as well as some of the self-service marketing activities.

### Leverage Procore’s Marketing Guides
To support your go-to-market and growth strategies, Procore provides a suite of self-service partner guides that offer actionable tactics and recommendations. Rather than duplicating this guidance, we encourage you to explore the full details in each guide below:
- <b><a href="https://www.procore.com/cdn/downloads/partner-how-to-promote-my-application" target="_blank">Partner How-To: Promote My Application</a></b>: Tips for creating a compelling Marketplace listing, promoting your app across digital channels, and aligning with Procore’s marketing resources.
- <b><a href="https://www.procore.com/cdn/downloads/partner-how-to-increase-integration-adoption-usage" target="_blank">Partner How-To: Increase Integration Adoption & Usage</a></b>: Strategies for training your teams, enabling customer success, and building long-term usage momentum.
- <b><a href="https://www.procore.com/cdn/downloads/partner-how-to-elevate-my-integration" target="_blank">Partner How-To: Elevate My Integration</a></b>: Best practices for enhancing the technical quality, reliability, and user experience of your app.

These resources are designed to help you grow efficiently and successfully within the Procore ecosystem. For questions, contact <a href="mailto:techpartners@procore.com">techpartners@procore.com</a>.

### Best Practices for Growth & Maintenance
Proactively managing your app ensures long-term success and sustained impact.

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

<!-- 
***
## Procore API Updates and Deprecation
Stay informed about Procore API changes through Developer Portal announcements, newsletters, and release documentation. 

- Update your app proactively to maintain compatibility.
- Review deprecation notices carefully to avoid service interruptions.
- Take advantage of new platform capabilities as they become available.
<br><br> -->

***
### Additional Resources
- [Build & Prepare Your App]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_requirements.md %})
- [Marketplace Listing Guidelines]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_listing_guidelines.md %})
- [Marketplace Approval Checklist]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_checklist.md %})
- [Managing App Collaboration]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_manage_collabs.md %})
<br><br>

***
{% include app_marketplace_legal_disclaimer.md %}