---
permalink: /building-apps-review-manifest
title: Submitting a Production App Manifest for Review
layout: default
section_title: Building Applications

---

After you have finalized the structure and content of your App manifest and you have successfully promoted it to production, the next step is to submit your manifest for technical review by Procore. This step is required only if you intend to publish your App to the [Procore Marketplace](https://marketplace.procore.com/).

## App Manifest Review Process

The following diagram depicts the high-level steps of the App manifest review process.

![Manifest review process]({{ site.baseurl }}/assets/guides/manifest-review.png)

The manifest review process is iterative, with an initial production manifest version being submitted for review, followed by subsequent manifest revisions and resubmissions as required. It is important to note that the promoted manifest you submit for review must properly define components and post-installation instructions suitable for a production deployment. Sample code and placeholder definitions will be rejected by our App Validation team.

### Submit for Initial Review

To submit your production manifest for technical review, complete the following steps.

1. Log in to the Developer Portal and navigate to the App with the manifest you want to submit for review.
1. Scroll down to the ‘Manage Manifest’ section.
1. Select the ‘Production’ tab.
1. Under the ‘Published to Marketplace’ column, click **Submit for Review**.
1. In the ‘Submit for Review’ confirmation box, please include a brief explanation of what your app will display and any additional information our App Validation Engineer would need for testing your App (e.g., a test username and password if authentication is required, example parameters, etc.) and then click **Submit for Review**. An email is generated and sent to our App Validation Engineer along with your submission notes.

_Hint_: If, for whatever reason, you need to retract your manifest submission, you can use the **Withdraw from Review** button to accomplish this.

### Address Comments and Revise Manifest

After we receive your submission, we conduct a technical review of the manifest to validate the functional behavior of the App and verify compliance with Procore’s terms and conditions. In the event the manifest submission is rejected, you will receive an email response with comments identifying the problems that must be addressed prior to approval. Your next step is to create a new sandbox manifest version and make revisions to address review comments.

1. Open the email response and click **Update**.
1. Scroll down to the ‘Manage Manifest’ section.
1. With the ‘Sandbox’ tab selected, click **Create New Version**.
1. Edit the new manifest version as needed, then click **Create**. Your revised manifest is saved as a new version.
1. Test your new sandbox manifest version to verify your updates.

### Resubmit for Review

After you are satisfied that you have addressed all outstanding comments on your manifest, you can resubmit it for review by completing the following steps.

Promote New Version to Production:

1. Log in to the Developer Portal and navigate to the App with the manifest you want to resubmit for review.
1. Scroll down to the ‘Manage Manifest’ section.
1. Select the ‘Sandbox’ tab.
1. If needed, click **Show Old Versions** to display all available sandbox manifest versions.
1. Click **Promote** on the version you want to resubmit for review.

Submit for Review:

1. On the ‘Production’ tab, click **Show Old Versions** to display all available production manifest versions.
1. Click **Submit for Review** for the production manifest you want to resubmit.
1. In the ‘Submit for Review’ confirmation box, please include a brief explanation of the updates you made to the manifest and then click **Submit for Review**. A new email is generated and sent to our App Validation Engineer along with your submission notes.

### Manifest Approval

After our App Validation Engineer has reviewed your manifest changes and satisfactorily tested your App, you will receive an email notifying you that your manifest has been approved.