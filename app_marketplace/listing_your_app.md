---
permalink: /listing-your-app
title: Listing Your App
sub_header: This page goes over the process of publishing an app to Procore's Marketplace.
layout: default
section_title: App Marketplace
---

## Introduction
The Procore App Marketplace connects Procore customers with integrations that deliver real value by enhancing their workflows. Apps listed in the Marketplace are evaluated for quality, reliability, and usefulness. Customers seek integrations that:

- **Increase Operational Efficiency** – Streamline processes within Procore to save time and effort.
- **Create Visibility** – Ensure data, videos, or images are available exactly when and where they’re needed.
- **Provide Accuracy** – Maintain up-to-date and accurate information within Procore.
- **Introduce New Capabilities** – Deliver new abilities that enhance project outcomes.
- **Mitigate Risk** – Reduce potential risks like safety concerns or reliability issues.

While you can distribute apps outside of the Procore Marketplace, listing them here boosts visibility and usage.
<br><br>

***
## Before You Build
### Marketplace Eligibility Requirements
<!-- To list your integration on the Procore App Marketplace, you must build an app using one of Procore's app types. Additionally, you must become a Procore Partner by completing the Partner Vetting Questionnaire and agree to Procore’s Partnership Framework Terms. -->
To list your app on the Procore Marketplace, you must:

- Build an app using one of Procore’s app types.
- Become a Procore Partner by completing the Partner Vetting Questionnaire and agreeing to Procore’s Partnership Framework Terms.

You can initiate Partner onboarding by creating an app through the Procore Developer Portal and navigating to the Marketplace Listing tab.

#### Procore will not list apps that:

- Are custom-built for a specific customer.
- Are internal tools for your own team.
- Provides a low quality or confusing experience for customers.
- Are incomplete or lack active customer usage.
- Cannot be installed through the Procore Marketplace.
- Utilizes APIs that are not publicly documented.
<!-- - Violate Procore’s policies or data privacy model. -->
- Exist solely for searching Procore data outside the platform.
<!-- - Only utilize 'Login with Procore' without additional functionality. -->
<!-- - Lack perceived value or functionality. -->
- Display ads, push notifications or transmit viruses, files, or programs that harm or disrupt the Procore user's experience.
- Use Procore data to train Large Language Models (LLMs).

### Gather Feedback from your Customers
As you plan your app's features and functionality, engage with your customers to understand how they use Procore and identify gaps that exists without your service being integrated into their Procore workflows.

For example, customers may want site photos automatically added to Procore, eliminating double-entry, or they may need to search for information directly within Procore. By learning how your customers interact with both your service and Procore, you can uncover opportunities to solve problems they may not even be aware of. This insight will guide you in building an app that delivers real value.

### Steps to Get Started
1. **Develop Your App:** Create a Procore Developer Account and choose an app type that complements your customers’ workflows.
2. **Access the Developer Sandbox:** Test your app in the automatically generated sandbox and leverage [Procore's Learning Resources]({{ site.url }}{{ site.baseurl }}{% link overview/help_and_learning_center.md %}).
3. **Apply for the Procore Partner Program:** Once ready, submit your application through your app to become a Procore Partner.

Although you can start developing and testing your app at any time, keep in mind that being accepted into the Partner Program is not guaranteed.

<!-- ### App Submission Options:
- **Marketplace Listing:** If your goal is to list your app on the Procore Marketplace, be prepared for the review and approval process, which often includes rounds of feedback.
- **Private or Custom Apps:** If you don't plan to list your app publicly, you can still offer it to specific customers without joining the Technology Partner Program or having a public listing. -->

### Plan for the Review Process
After submitting your app for approval, expect feedback from our review team. Additional development may be required before your app is accepted. We recommend allowing extra time between submission and your planned launch date to accommodate potential revisions.
<br><br>

***
## As You Are Building
### Collect Customer Feedback
As you move forward with development, gathering customer feedback becomes even more crucial. Running a pilot program with select customers can provide valuable insights into how your integration is used alongside Procore, ensuring it meets real-world needs.

While building, keep these key points in mind:
- **Onboarding Experience:** Ensure that the integration is easy to onboard. Simplify the process as much as possible to reduce friction for your users.

- **Data Connector Considerations:** If your app includes a data connector, carefully understand the difference between Authorization Code and Client Credentials. While your app can utilize both, pick the one that aligns with your users' needs as it will significantly impact the customer experience.

- **Customer Communication & Support:** Plan for customer support by creating 'Getting Started' guides or FAQs.

- **Handling Multiple Procore Company Accounts:** Keep in mind that Procore users may be part of multiple company accounts. Ensure your app is designed to work seamlessly across different Procore company accounts.

- **Enterprise Needs:** Build with enterprise-level customers in mind. Consider their privacy needs, security concerns, and how easy it is to scale your solution across large organizations.
<br><br>

***
## Submitting to the Procore Marketplace
Congratulations on reaching this milestone! After thoroughly testing your app in the Developer Sandbox and incorporating customer feedback, you're now ready to submit your app to be reviewed by the Procore Marketplace team.

In this section, we’ll guide you through the submission process and outline the key steps to ensure a smooth review. Be sure to follow these guidelines carefully, as missing or incorrect information may lead to your app being rejected from the review queue, causing delays in approval.

### Submission Requirements
Before you submit your app for approval, ensure you've completed the following:

- You are an approved Procore Partner and have completed the Partner Vetting Questionnaire, and agreed to Procore’s Partnership Terms.
- Your app is functional, can be installed correctly, and works in all Procore environments. <!--LINK HERE TO PROCORE ENVIRONMENTS-->
- You have thoroughly tested the app, and we mean *tested*, including the installation, onboarding, and usage of all the app features.
- The Marketplace Listing has been enabled by the Procore Marketplace team, and all required information has been completed by your team.
- You are prepared to maintain and support your app to customers who choose to install it.

### How to Submit
You can submit your app for review in the Marketplace Listing within your app. This section is enabled for approved Procore Partners. If your listing is not enabled, you can request activation within the Marketplace Listing section of your app, or request to to become a Procore Partner.

When submitting your app for review, ensure that all required sections of your Marketplace Listing are complete, including details on how your app functions, its key features, and any necessary requirements.

To submit your app for review, click **Submit for Review** in the Marketplace Listing tab of your app within the Procore Developer Portal. This action will notify the Procore Marketplace team that your app is ready for evaluation.

<!-- Before submitting, carefully review your app listing to ensure all required information is complete. When submitting you app for approval for the first time and changes to app functionality, you’ll also need to include a video that highlights the following:

1. How customers install and configure your app within your service.
2. The app’s end-to-end functionality.
    - If your app creates data within Procore, demonstrate what the newly created data looks like for each integrated product.
    - For apps utilizing embedded app types (Full Screen or Side Panel), show the user experience, including login and subsequent screens. -->

### App Review Criteria
Once your app is submitted, the Marketplace team will review it based on the following criteria:

- **Marketplace Listing Information:** Ensure all sections of the Marketplace Listing are filled out and meet the [Marketplace Listing Guidelines]({{ site.url }}{{ site.baseurl }}{% link app_marketplace/marketplace_listing_guidelines.md %}).
- **Post-Installation Notes:** Customize the 'Post Installation Notes' in the 'Configuration Builder' section of your app to clearly explain how the app is configured within your service, and if applicable, in Procore.
- **Developer Managed Service Account (DMSA):** If your app uses a DMSA, it must adhere to the principle of least privilege, granting access only to the tools it integrates with and using the minimum required permissions.
- **Showcase Video:** The submitted video must demonstrate the app’s end-to-end functionality, including how it operates within Procore.
- **Environment Variables:** Ensure all environment variables, such as base URLs, are targeting production environments for both your service and Procore.
- **App Version Promotion:** Promote your app to production by clicking **Promote Version** in the 'Configuration Builder' section of your app.
<br><br>

***
## Post-Approval Requirements
Getting your app approved is just the first step! To ensure a great experience for our shared customers, you must meet certain ongoing requirements as a member of the Procore Marketplace.
 
### Maintain Your Published App
To maintain your app's listing and provide continuous value to customers, you must:

- Respond promptly to customer inquiries and support requests.
- Provide ongoing support for your app and address any issues that arise.
- Keep your Marketplace Listing updated with accurate information, including app features, descriptions, and contact details.
- Regularly update your app to align with Procore’s latest platform enhancements and ensure optimal functionality.
- Add additional collaborators to manage your app, ensuring it remains supported if team members change.
- Ensure your app remains actively used by monitoring customer engagement and usage.
- Maintain or improve the quality of your app’s functionality and customer experience compared to when it was first approved.

### Enforcement Actions
Procore may take enforcement actions if any of the following occurs:

<!-- - Your app no longer meets Marketplace Eligibility Requirements. -->
- We receive reports from mutual customers regarding issues such as:
    - Spammy or disruptive app behavior.
    - Broken or unexpected functionality.
    - Poor customer experience or a lack of response to support inquiries.
- The website or support links provided in your Marketplace Listing are broken or inactive.
<br><br>

***
### Updates to Guidelines and Enforcement

Procore Technologies reserves the right to revise the Developer Documentation in its discretion.

As described in the applicable terms and conditions, Procore may remove or decline the publication of any application listing at any time.