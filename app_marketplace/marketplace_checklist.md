---
permalink: /marketplace-checklist
title: Marketplace Approval Checklist
sub_header: Learn the app validation process, key review items, and how to submit your app for publication.
layout: default
section_title: Marketplace & Partnership
---

## Overview
Before submitting your app for approval, review this Marketplace Approval Checklist to ensure your integration meets Procore's standards. By this point in the [Technology Partner journey]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/procore_partner_overview.md %}), you've been approved as a partner, passed Technical Feasibility, certified your app, and signed the Partner Agreement — so this checklist focuses on the final step: confirming those prerequisites and preparing your listing for submission. It shows you where you are and what's left.
<br><br>

***
<details>
<summary class="collapseListTierOne">Step 1. Confirm You Are a Procore Partner</summary>
<p>
    To list on the Marketplace, you must be a <b>full Procore Technology Partner</b> — meaning you have signed the <b>Procore Framework Agreement</b> and <b>Technology Partner Addendum</b> (Step 4 of the partner journey). If you completed that step, you are eligible to list.
    <br><br>
    If you're unsure of your partner status, contact <a href="mailto:techpartners@procore.com">techpartners@procore.com</a>. To start the partner journey, see the <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/procore_partner_overview.md %}">Technology Partner Overview</a>.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 2: Validate with a Customer (Recommended)</summary>
<p>
    We <b>strongly encourage</b> validating your app with at least one beta or active customer before listing — most partners do this during certification, using their temporary-status production access. Real-world use validates onboarding, functionality, and performance, but is not required to submit.
    <br><br>
    Customer validation builds confidence with both the Marketplace review team and future users.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 3: Confirm Your App Is Certified & Production-Ready</summary>
<p>
    Your app must have passed the <b>Certification Assessment</b> — Procore's production-readiness review completed during the Build, Test & Certify step of the partner journey. If your app is certified and running in production, you've cleared this step; if not, complete certification before listing.
</p>
<p>
    Certification confirmed your app handles:
</p>
<ul>
    <li>Installation and configuration workflows (both in your service and in Procore)</li>
    <li>The onboarding experience from a customer’s perspective</li>
    <li>Core feature functionality across use cases</li>
    <li>Support for multi-company Procore accounts (if applicable)</li>
</ul>
<p>
    It also confirmed correct handling of:
</p>
<ul>
    <li>OAuth authentication correctly</li>
    <li>Procore’s rate limits without performance degradation</li>
</ul>
<p>
    Before submitting your listing, double-check your production configuration:
</p>
<h4>General Requirements:</h4>
<ul>
    <li>Post Installation Notes updated in the <b>Configuration Builder</b></li>
    <li>App promoted to production via the <a href="https://developers.procore.com/developers" target="_blank">Procore Developer Portal</a></li>
</ul>
<h4>For Embedded Apps:</h4>
<ul>
    <li>Correct cross-origin security settings for rendering in Procore</li>
</ul>
<h4>For OAuth-Based Apps:</h4>
<ul>
    <li>Base URLs: token management to <code>https://login.procore.com</code>, API calls to <code>https://api.procore.com</code></li>
    <li>Production Client ID and Secret in use</li>
    <li>Correct callback URL and Procore-Company-Id header handling</li>
    <li>Least privilege applied to access scopes</li>
</ul>
<div class="details-bottom-spacing"></div>
</details>

***
<details>
<summary class="collapseListTierOne">Step 4: Complete & Verify Your Marketplace Listing</summary>
<p>
    With full partner status, the <b>Marketplace Listing</b> section is automatically available in your app in the Developer Portal — there is no separate enablement step. 
    <br><br>
    Complete your listing, then review the whole thing for accuracy before submitting.
    <br><br>
    Make sure it includes:
    <ul>
        <li>Accurate feature descriptions and functionality highlights</li>
        <li>Clear onboarding instructions and any customer-side setup requirements</li>
        <li>Correct links, permissions, and a clear value proposition</li>
        <li>Accessible, actionable instructions if you offer a free trial</li>
    </ul>
    Be transparent about what your app does and how it benefits customers. Refer to the <a href="{{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_listing_guidelines.md %}">Marketplace Listing Guidelines</a> for formatting and submission details.
</p>
</details>

***
<details>
<summary class="collapseListTierOne">Step 5: Submit Your App</summary>
<p>
    When all steps are complete, submit your app via the <b>Marketplace Listing</b> tab in the <a href="https://developers.procore.com/developers" target="_blank">Developer Portal</a>. If you don't see the Marketplace Listing tab, confirm your partner status — the tab is available once you're a full partner.
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
- Provide your App Version Key to the customer to perform a [custom app install](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app)
- Adjust any hard-coded URLs accordingly

For more details about the Monthly Sandbox, including the refresh schedule and additional guidelines, refer to the <a href="{{ site.url }}{{ site.baseurl }}{% link platform_concepts/development_environments.md %}">Sandbox Environments</a>.
<br><br>

***
## See Also
- [Technology Partner Overview]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/procore_partner_overview.md %})
- [Build & Prepare Your App]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_requirements.md %})
- [Marketplace Listing Guidelines]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_listing_guidelines.md %})
- [Manage & Improve Your Marketplace App]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/update_your_marketplace_app.md %})
<br><br>

***
{% include app_marketplace_legal_disclaimer.md %}