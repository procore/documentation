---
permalink: /api-call-sequencing
title: App Installation Design and API Call Sequencing
layout: default
section_title: Best Practices

---

## Background ##

As you develop your project, it is important to understand that your design choices and the order in which API calls are made can have a significant impact on the behavior and performance of your application.
Proper installation design and API call sequencing can help prevent unintended effects when a user with access to more than one company authorizes your application through OAuth 2.0.

## Installation with OAuth 2.0 Authorization

An application not installed from the App Marketplace by a Procore Admin may still be accessed and used by a Procore user if they authorize the application to access their Procore data through the OAuth 2.0 flow.
The ability to authorize and use an application in a Procore account is controlled by the [Allow User Installs](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/allow-user-installs) feature in the Procore Web application.
When a user authorizes the application and subsequently accesses Procore API resources in this manner, it is connected to and visible in the company level App Management tool in Procore.
If Procore users are able to authorize your application through OAuth 2.0 outside the context of a Marketplace installation, it is important to account for this scenario in your design.

## Handling Multiple Companies

When a user with access to more than one Procore company authorizes your application to access their data through OAuth 2.0, it is important to account for the following scenario in your API call sequencing.
Consider these conditions:

* Users have access to more than one company in Procore.
* User authorizes an application to access data on their behalf through OAuth 2.0.
* Application’s first API call with the user’s access token is to the [List Companies](https://developers.procore.com/reference/rest/v1/companies#list-companies) endpoint (or possibly the second call, after [Show User Info](https://developers.procore.com/reference/rest/v1/me)).
* Application iterates through the List Companies response body, making subsequent calls to a resource within each company, e.g. [List Projects](https://developers.procore.com/reference/rest/v1/projects#list-projects) (passing in a company_id).

In the above scenario, your application would show up as ‘installed’ in each company you make an API call to (i.e. a request made using a given company’s ID or the ID of a project belonging to that company).
To prevent this from occurring, we recommend prompting the user to choose the Company they would like to authorize the application to access, and then make the subsequent call to a project resource for only that company.
To access resources belonging to a specific company selected by the user, scope all of your requests to that company and its projects.
For more information, see [List Companies](https://developers.procore.com/reference/rest/v1/companies#list-companies) and [List Projects](https://developers.procore.com/reference/rest/v1/projects#list-projects).

## Edit Post Install Instructions

When you create your first App Manifest it will contain generic post installation instructions to guide Procore clients to a page that ends up telling them to refer to the Integration partner for further instructions.
This is not a helpful message and is a great opportunity for your team to provide a landing page and a CTA for new installs to seek further assistance if needed.

```
"post_installation_instruction": {
    "page": {
      "url": "https://support.procore.com/integrations/app-setup-instructions",
      "label": "App Setup Instructions"
    },
    "notes": "For Data Connection Apps, you may need to take additional steps in the third-party App's system to complete
    the App setup process. For more information, visit the support article below or contact the App developer
    through the Procore Marketplace."
  },
```