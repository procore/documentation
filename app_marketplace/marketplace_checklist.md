---
permalink: /marketplace-checklist
title: Marketplace Approval Checklist
sub_header: Learn the app validation process, key review items, and how to submit your app for publication.
layout: default
section_title: App Marketplace
---

## Introduction
Before submitting your app for approval, review this Marketplace Approval Checklist to ensure your integration meets Procore's standards. This checklist outlines key submission requirements to help you avoid delays and improve your chances of a successful listing.
<br><br>

***
<details>
<summary class="collapseListTierOne">Step 1. Confirm You Are a Procore Partner</summary>
<p>
    To be eligible for listing, you must be an approved Procore Technology Partner. Upon completion of the vetting process, you will receive the signed <b>Procore Framework Agreement</b> and <b>Technology Partner Addendum</b> via email.
    <br><br>
    If you're unsure of your partner status, contact <a href="mailto:techpartners@procore.com">techpartners@procore.com</a>. You can also apply to become a partner via the Marketplace Listing section of your app in the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a>.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 2: Validate Customer Usage</summary>
<p>
    Before submission, your app must have at least one (1) beta or active customer. This real-world use case helps validate onboarding, functionality, and performance.
    <br><br>
    Customer validation builds confidence with both the Marketplace review team and future users.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 3: Thoroughly Test Your App</summary>
<p>
    Procore does not accept trial, beta, or partially tested integrations.
</p>
<p>
    You must validate:
</p>
<ul>
    <li>Installation and configuration workflows (both in your service and in Procore)</li>
    <li>The onboarding experience from a customer’s perspective</li>
    <li>Core feature functionality across use cases</li>
    <li>Support for multi-company Procore accounts (if applicable)</li>
</ul>
<p>
    Also ensure your app is handling:
</p>
<ul>
    <li>OAuth authentication correctly</li>
    <li>Procore’s rate limits without performance degradation</li>
</ul>
<div class="details-bottom-spacing"></div>
</details>

***
<details>
<summary class="collapseListTierOne">Step 4: Complete Your Marketplace Listing</summary>
<p>
    Once your partner application is approved, the Marketplace Team will enable the Marketplace Listing section of your app in the Developer Portal. 
    <br><br>
    If your listing is not enabled, request to have it activated through the <b>Marketplace Listing</b> tab in your app, accessible via the Developer Portal.
    <br><br>
    Ensure your listing includes:
    <ul>
        <li>Accurate feature descriptions and functionality highlights</li>
        <li>Clear onboarding instructions for customers</li>
        <li>Any customer-side requirements for setup or use</li>
    </ul>
    Refer to the <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_listing_guidelines.md %}">Marketing Listing Guidelines</a> for formatting and submission details.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 5: Submit a Demo Video</summary>
<p>
    A 3–5 minute demo video is required when you first submit your app or when major functionality is updated. Upload this in the <b>Admin App Specifications</b> section of your listing.
</p>
    <ul>
        <li>Installation and configuration steps (both in your service/third party service and Procore)</li>
        <li>Linking a Procore company account, if applicable (e.g., selecting a Procore company)</li>
        <li>Key app functionality (data sync, visualization, etc.)</li>
        <li>Embedded experience, if applicable (if your app uses full-screen or side panel views)</li>
    </ul>
<p>
    You may reuse your original video for non-functional changes.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 6: Verify Listing Information</summary>
<p>
    Before submission, review your entire Marketplace Listing for accuracy.
</p>
    <ul>
        <li>Confirm that all descriptions, links, and permissions are correct</li>
        <li>Ensure the app’s value proposition is clear to customers</li>
        <li>If offering a free trial, make instructions accessible and actionable</li>
    </ul>
<p>
    Be transparent about what your app does and how it benefits customers.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 7: Promote to Production</summary>
<p>
Your app must be production-ready at submission.
<h4>General Requirements:</h4>
<ul>
    <li>Update “Post Installation Notes” in the <b>Configuration Builder</b></li>
    <li>Promote your app via the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a></li>
</ul>
<h4>For Embedded Apps:</h4>
<ul>
    <li>Ensure correct cross-origin security settings for rendering in Procore</li>
</ul>
<h4>For OAuth-Based Apps:</h4>
    <ul>
        <li>Update base URLs:</li>
            <ul>
                <li>Token management → <code>https://login.procore.com</code>.</li>
                <li>API calls → <code>https://api.procore.com</code></li>
            </ul>
        <li>Use the production Client ID and Secret</li>
        <li>Ensure correct callback URL and company ID header handling</li>
        <li>Apply the principle of least privilege for access scopes</li>
    </ul>
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 8: Submit Your App</summary>
<p>
    When all steps are complete, submit your app via the <b>Marketplace Listing</b> tab in the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a>. If the tab is not enabled, confirm your partner status and request activation in the Developer Portal.
    <br><br>
    The Marketplace Team will review your app against the <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_requirements.md %}" target="_blank">Marketplace Requirements</a>.
</p>
</details>

***
<div class="details-bottom-spacing"></div>

## Additional Considerations
### Support Documentation
You are responsible for supporting your integration. Procore does not provide end-user support for third-party Marketplace apps.
<br><br>
Your support setup must include:
- Up-to-date content
- A public documentation link
- A getting started guide
- A clear explanation of how your app works with Procore
<br>

### Supporting the Monthly Sandbox
Many customers test integrations using the <b>Monthly Sandbox</b>, which uses different base URLs:
- Token management: <code>https://login-sandbox-monthly.procore.com/</code>
- API calls: <code>https://api-monthly.procore.com/</code>

To support this environment:
- Provide your App Version Key to the customer for to perform a [custom app install](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app)
- Adjust any hard-coded URLs accordingly

For more details about the Monthly Sandbox, including the refresh schedule and additional guidelines, refer to the <a href="{{ site.url }}{{ site.baseurl }}{% link getting_started/development_environments.md %}">Sandbox Environments</a>.
<br><br>

***
{% include app_marketplace_legal_disclaimer.md %}