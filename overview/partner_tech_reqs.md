---
permalink: /partner-tech-reqs
title: Technical Requirements
layout: default
section_title: Overview
---

## App Submittal and Technical Review

The following conditions must be met in order to successfully complete the App Markletplace submittal and technical review process.

* Provide details of any paid test accounts that are needed in order to test and use your service.
* Provide details of any test accounts that might be needed for third-party services.
* List all Procore tools/resources that your App makes API calls to, and which direction the information is flowing.
(e.g., "App pulls data from Procore’s Daily Log tool and pushes into our ____ tool on an automated schedule.")
* Your application must be registered and linked to a proper App ID and Application Name. Any applications that reference the live Procore API without reference to their App ID will be rejected.
* Prior to publication, you must verify that your application is showing up in the Developer Portal, and that all calls to the Procore API endpoints are appearing as they are made.
We will not allow an application to be published that we are unable to track.
This is necessary so that we can monitor server usage and application security.
* All applications may only use Procore’s publicly documented production APIs.
* Applications that transmit viruses, files, computer code, or programs that harm or disrupt Procore user’s experience including Push Notifications will be rejected.
* Your application must use the approved Oauth mechanism for authenticating users.
Any use of embedded logins or passwords is strictly prohibited; your application must support the full token - refresh mechanism in order to be published.
* Applications must not make excessive use of polling mechanisms, and should strive to use Procore’s event-based mechanisms for determining when and how to update data.
* Integrations should not display ad banners or test advertisements within Procore.

## Functional Test and User Experience Review

The following conditions must be met in order to successfully complete the functional test and user experience review process.

* Apps submitted to the Procore Marketplace must be final versions.
The Marketplace is not a software testing service.
Demos, betas, and trial versions do not belong on the Marketplace.
* No placeholder text, empty websites, or any other temporary content are allowed in the App when you submit it.
* Make sure you have turned on and initialized any necessary back-end services and set them to Production versions.
* Your App must successfully complete thorough functional testing with no signs of issues/bugs.
* Prior to submitting your App for publication, you must successfully test the entire end-user onboarding process.
You must have detailed step-by-step instructions for setting up and activating the integration.
* Confirm that data pushed to Procore from your App shows up correctly without requiring extra work for the user.
* Once published to the Marketplace, your App must be capable of supporting a large number of users.
* Your App must provide significant value to Procore customers and enhance their experience with the Procore platform.