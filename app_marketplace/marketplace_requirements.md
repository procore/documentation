---
permalink: /marketplace-requirements
title: Build & Prepare Your App
sub_header: Build, test, and prepare your app for a successful listing on the Procore Marketplace.
layout: default
section_title: App Marketplace
---

## Introduction
Once you've signed up as a developer, it’s time to build a high-quality integration that delivers value to customers and meets Procore’s Marketplace standards. This page walks you through key development milestones, onboarding best practices, and the steps required to become a Procore Technology Partner.
<br><br>

***
## 1. Understand the Developer Environment
Before building, make sure to:
- Review our API documentation to explore <a href="https://developers.procore.com/reference/rest/docs/rest-api-overview" target="_blank">available endpoints</a> and <a href="{{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_app_types.md %}">app types</a>
- Understand <a href="{{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}">OAuth 2.0 authentication flows</a> (User vs. Service Account)
- Familiarize yourself with <a href="{{ site.url }}{{ site.baseurl }}{% link api_essentials/restful_api_concepts.md %}">error handling</a> and <a href="{{ site.url }}{{ site.baseurl }}{% link api_essentials/rate_limiting.md %}">rate limits</a>
- Use your Developer Sandbox to test <a target="_blank" href="https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app">app installations</a> and simulate real-world usage
- Invite <a href="{{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_manage_collabs.md %}">collaborators</a> to your app via the Developer Portal
<br><br>

***
## 2. Meet the Marketplace Requirements
To be listed on the Procore Marketplace, your app must meet the following requirements. These ensure consistency, reliability, and a great experience for customers.

### App Functionality
- Your app must be installable in a customer's Procore account.
- Your app must deliver clear and meaningful value to Procore customers.
- Your app must be production-ready — demo-only or trial-only apps are not accepted.
- Your app must pass functional testing with no major bugs or blockers.

### Customer Validation
- You must have at least one (1) beta customer prior to submission.
- You must have at least one (1) active customer using the app within the past 12 months.

### Onboarding & Support
- You must provide clear, step-by-step onboarding instructions.
- You must offer accessible support documentation or support contact information.
- Your Marketplace listing must be accurate, complete, and regularly maintained.

### Compliance & Conduct
- You must comply with all Procore Partner Program terms, agreements, and conduct policies.
- You must not use private or undocumented Procore APIs.
- You must not use Procore data to train AI/ML models (including LLMs).
- You must not include ads, push notifications, or malicious behaviors in your app.
<br><br>

<!-- ### General Requirements
- Be installable in a customer’s Procore account
- Have at least one (1) beta customer prior to submission
- Have at least one (1) active customer using the app within the past 12 months
- Pass functional testing with no major bugs or blockers
- Include step-by-step onboarding instructions
- Provide clear support documentation or contact info
- Maintain an accurate and up-to-date Marketplace listing
- Be submitted as a production-ready app (no demo or trial-only apps)
- Comply with all Partner Program terms, agreements, and conduct policies

<!-- ### Apps That Will Not Be Accepted
- Are custom-built for a specific customer or internal use only
- Require a developer or partner user to be added to a customer’s Procore account
- Deliver a confusing or low-quality user experience
- Use private or undocumented APIs
- Only offer “Login with Procore” functionality with no added value
- Exist solely to search or export Procore data
- Include ads, push notifications, or any malicious behavior
- Use Procore data to train AI/ML models (including LLMs) -->

***
## 3. Onboard and Test with Customers
As your app nears completion, engage a beta customer to simulate a real-world installation and gather feedback.

- Ensure onboarding is simple, intuitive, and well-documented
- Choose the appropriate authentication method (User vs. Service Account)
- Provide a “Getting Started” guide or FAQ to reduce support friction
- Test behavior across multiple Procore company accounts (a common scenario)
- Design with enterprise needs in mind—privacy, scalability, and security
<br><br>

***
## Post-Approval Expectations
Once your app is live on the Marketplace, it's important to maintain quality and stay engaged with customers.

### Maintain Quality & Engagement
- Respond to customer support requests promptly
- Keep listing content accurate and up to date
- Regularly update your app to support Procore platform changes
- Fix bugs and technical issues in a timely manner
- Monitor performance and user engagement using analytics

### Enforcement Actions May Be Taken If:
- Your app has ongoing issues or bugs that are not resolved
- Customers report broken functionality or spammy behavior
- Contact/support info in your listing is outdated or missing
- Your app becomes inactive or no longer meets usage expectations


Procore may remove or unlist apps that do not meet ongoing requirements.
<br><br>

***
{% include need_help_section.md %}

***
{% include app_marketplace_legal_disclaimer.md %}