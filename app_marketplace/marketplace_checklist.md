---
permalink: /marketplace-checklist
title: Marketplace Approval Checklist
sub_header: Learn the app validation process, key review items, and how to submit your app for publication.
layout: default
section_title: App Marketplace
---

## Introduction
Before submitting your app for approval, it’s essential to review this Marketplace Approval Checklist. This checklist outlines submission requirements, helping ensure your app aligns with our guidelines for a seamless review process.

Following this checklist helps ensure your app meets Procore’s high standards, minimizing delays and positioning your app for success in the Marketplace.
<br><br>

***
## Before You Submit for Approval
Ensure the following steps are completed before submitting your app to avoid rejection or delays.
<br><br>

***
<details>
<summary class="collapseListTierOne">1. You Are a Procore Partner</summary>
<p>
    Approved Procore Partners receive a signed Partner Framework Agreement and Technology Partner Addendum via email upon successful completion of the contracting process. This marks the final step and confirms your status as a Procore Partner.
    <br><br>
    If you're unsure about your partner status, contact <a href= "mailto: partnerprograms@procore.com"> partnerprograms@procore.com</a>. You can also apply to become a Procore Partner directly in the <b>Marketplace Listing</b> section of your app, through the Developer Portal.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">2. You Have an Active Customer Using the App</summary>
<p>
    Prior to having your app approved, and ultimately published to the Procore Marketplace, your app must have at least one (1) beta customer as described in the <a href="https://www.procore.com/partners/documents" target="_blank">Partner Program Guide</a>. This beta customer should help provide feedback about onboarding and functionality before submitting your app for review.
    <br><br>
    This step builds confidence among prospective users, as customers often hesitate to adopt a new solution without prior customer usage.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">3. Your App Has Been Thoroughly Tested</summary>
<p>
    As described in <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_requirements.md %}">Getting Started & Requirements</a>, the Procore Marketplace is not meant for beta or trial apps. Prior to having your app be published, you must thoroughly test the following items: 
</p>
<ul>
    <li>The app installation and configuration processes (both in your/third party service and Procore).</li>
    <li>The customer onboarding experience.</li>
    <li>The usage of all the app features.</li>
    <li>If necessary, your app supports Procore's multi-company architecture.</li>
</ul>
<p>
Additionally, take into consideration how your app will handle rate limiting and authentication as these are common pain points.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">4. Your Marketplace Listing Is Complete</summary>
<p>
    After becoming a Procore Partner, the Marketplace Team will enable your Marketplace Listing. When submitting your app, ensure that all required fields are completed as incomplete or misleading submissions will be rejected, causing a delay in the overall approval process. Key fields include:
</p>
<ul>
    <li>Key features and functionality descriptions.</li>
    <li>Detailed instructions for app onboarding.</li>
    <li>Any specific requirements for customers.</li>
</ul>
<p>
    If your listing is not enabled, request to have it activated through the <b>Marketplace Listing</b> tab in your app, accessible via the Developer Portal. For field requirements, see <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_listing_guidelines.md %}">Marketing Listing Guidelines</a>.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">5. You Have Provided a Demo Video</summary>
<p>
    When submitting your app for initial approval or when updating functionality, provide a 3-5 minute long demo video in the <b>Admin App Specifications</b> section of the Marketplace Listing that showcases the following:
</p>
<ul>
    <li>App installation and configuration processes (both in your service/third party service and Procore).</li>
    <li>Steps to link Procore accounts to the external service (e.g., selecting a Procore company).</li>
    <li>End-to-end app functionality, including data creation or visualization within Procore.</li>
    <li>User experience for embedded apps (if applicable).</li>
</ul>
<p>
    For non-functional updates to the Marketplace Listing, you may reuse the original video.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">6. App Information Is Accurate</summary>
<p>
    While you can always update your Marketplace Listing at any time, ensure links, descriptions, functionality, and permissions are correctly reflected and are not misleading when submitting your app for approval.
    <br><br>
    Clearly convey the value of your app and how it will help the customer, whether it's increasing operational efficiency or providing data accuracy. The customer wants to know <i>how</i> this integration is valuable to them and <i>why</i> they should adopt your app. If possible, support a free trial to help engage the customer and provide them with direct steps to get started.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">7. You Are Supporting The Production Environment</summary>
<p>
After testing in the Developer Sandbox, ensure your app is production-ready by updating specific items in the Procore Developer Portal or in your source code. This process can vary since each app is unique.
</p>
<div>
<h4>General Steps</h4>
<ul>
    <li>Customize the 'Post Installation Notes’ in the <b>Configuration Builder</b> section of your app to clearly explain how the app is configured within your service/third party service, and if applicable, in Procore.</li>
    <li>Through the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a>, promote your app to production.</li>
</ul>
</div>
<div>
<h4>Embedded Apps (Full-Screen and Side Panel)</h4>
<ul>
    <li>Verify cross-security policy configurations to allow Procore to render your webpages in production.</li>
</ul>
</div>
<div>
<h4>Data Connection Apps (User Level and Service Account Authentication)</h4>
<ul>
    <li>Update Base URLs for token management to <code>https://login.procore.com</code>.</li>
    <li>Update Base URLs for API calls to <code>https://api.procore.com</code>.</li>
    <li>Update your source code with the production Client ID and Secret provided to you within your app.</li>
    <li>If using User Level Authentication, update the base URL and Client ID for your callback URL, which is used to generate the access token.</li>
    <li>Pass the Procore Company ID in API headers for all calls except:</li>
    <ul>
        <li>Token management (generate, refresh, revoke).</li>
        <li>Listing available companies.</li>
        <li>The optional <a href="https://developers.procore.com/reference/rest/me?version=latest" target="_blank">ME</a> API call.</li>
    </ul>
    <li>For Service Account Authentication, adhere to the principle of least privileged permissions. For example:</li>
    <ul>
        <li>If your app does not interact with the Directory tool, then it should not have permissions to the Directory.</li>
        <li>If your app is reading information from Procore, it should not have Admin access to the specific solution.</li>
    </ul>
</ul>
</div>
</details>

***
<div class="bulletedBreak"></div>

## How to Submit Your App For Review
Submit your app through the **Marketplace Listing** section of your app, within the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a>. If the listing section is not enabled, request activation within your app and confirm your Procore Partner status.

The Marketplace Team will review your submission to ensure all [Marketplace Requirements]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_requirements.md %}) are met.
<br><br>

***
## Additional Considerations
### Provide Support Documentation
To maintain a high level of customer satisfaction, your support system must be ready to assist users. Procore’s support team does not troubleshoot technical issues with your app, so you should establish a support system with at a minimum:

- Up-to-date support content, kept current with changes to the app.
- A publicly accessible URL for your support documentation.
- Clear instructions on how to get started with your app.
- A detailed description of your app’s core functionality and how it interacts with Procore.
<br><br>

### Supporting the Monthly Sandbox
Many Procore customers test new features and integrations within the <b>Monthly Sandbox</b> environment. The Monthly Sandbox is a replica of their production account, refreshed at the beginning of each month. It operates on different base URLs, requiring adjustments to ensure compatibility with this environment.

To support the Monthly Sandbox, you must:
- Update Base URLs for Token Management: Replace the production token management URL with: <code>https://login-sandbox-monthly.procore.com/</code>.
- Update Base URLs for API Calls: Use the following base URL for API calls: <code>https://api-monthly.procore.com/</code>.
- Provide the App Version Key for Custom App Installation: Share the App Version Key with the client to allow them to perform a custom app installation within the sandbox environment.

For more details about the Monthly Sandbox, including the refresh schedule and additional guidelines, refer to the <a href="{{ site.url }}{{ site.baseurl }}{% link getting_started/development_environments.md %}">Sandbox Environments</a> documentation.
<br><br>

***
### Updates to Guidelines and Enforcement
Procore Technologies reserves the right to revise the Developer Documentation at any time,  in its sole discretion.

As described in the applicable terms and conditions, Procore may remove or decline the publication of any Marketplace Listing at any time.