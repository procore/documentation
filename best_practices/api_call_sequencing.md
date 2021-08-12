---
permalink: /api-call-sequencing
title:  API Call Sequencing and App Installation Design
layout: default
section_title: Best Practices

---

## Background

As you develop your project, it is important to understand that your design choices and the order in which API calls are made can have a significant impact on the behavior and performance of your application.
Proper API call sequencing in the context of your installation design can help prevent unintended effects when a user with access to more than one company authorizes your application through OAuth 2.0. If not accounted for properly in your design, this installation scenario can result in skewed installation metrics for your application and/or application errors due to installation attempts in companies with the [Allow User Installs](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/allow-user-installs) option turned off.

## Installation with OAuth 2.0 Authorization

An application not installed from the App Marketplace by a Procore Admin may still be installed and used by a Procore user if they authorize the application to access their Procore data through the OAuth 2.0 flow.
The ability to authorize and use an application in a Procore account is controlled by the [Allow User Installs](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/allow-user-installs) feature in the Procore Web application.
When a user authorizes the application and subsequently accesses Procore API resources in this manner, it is connected to and visible in the company level App Management tool in Procore.
If Procore users are able to authorize your application through OAuth 2.0 outside the context of a Marketplace installation, it is important to account for this scenario in your design.

## Handling Multiple Companies

When a user with access to more than one Procore company authorizes your application to access their data through OAuth 2.0, it is important to be aware of and handle the following scenario in your API call sequencing.
Consider these conditions:

* A user has access to more than one company account in Procore.
* User authorizes an application to access data on their behalf through OAuth 2.0.
* Application’s first API call with the user’s access token is to the [List Companies](https://developers.procore.com/reference/rest/v1/companies#list-companies) endpoint (or possibly the second call, after [Show User Info](https://developers.procore.com/reference/rest/v1/me)).
* Application iterates through the List Companies response body, making subsequent calls to a resource within each company, e.g. [List Projects](https://developers.procore.com/reference/rest/v1/projects#list-projects) (passing in a company_id).

In the above example, your application would show up as ‘installed’ in each company it makes an API call to (i.e., a request made using a given company’s ID or the ID of a project belonging to that company).
To prevent this from occurring, we recommend prompting the user to choose the Company they would like to authorize the application to access, and then make the subsequent call to a project resource for only that company.
To access resources belonging to a specific company selected by the user, scope all of your requests to that company and its projects.
For more information, see [List Companies](https://developers.procore.com/reference/rest/v1/companies#list-companies) and [List Projects](https://developers.procore.com/reference/rest/v1/projects#list-projects).

## Provide Helpful Post Installation Instructions

When you first create your App Manifest it contains default post installation instructions (see below) that guide Procore clients to a page telling them to refer to the application developer for further instructions.
The `post_installation_instruction` section in your manifest is customizable and provides a great opportunity for your team to provide a link to a landing page or CTA for new users to seek further assistance if needed.

```
"post_installation_instruction": {
    "page": {
      "url": "https://support.procore.com/integrations/app-setup-instructions",
      "label": "App Setup Instructions"
    },
    "notes": "For Data Connection Apps, you may need to take additional steps in the third-party App's system
    to complete the App setup process. For more information, visit the support article below or contact the
    App developer through the Procore Marketplace."
  },
```