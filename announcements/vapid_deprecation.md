---
permalink: /vapid-deprecation
title: Vapid API Deprecation
layout: default
section_title: Announcements
---

<!-- This is not even referenced anywhere? -->

>**Vapid Sunset in Progress as of Feb 1, 2022**
>
> Procore API resources under the /vapid namespace were deprecated on February 1, 2021, and replaced by the new Rest v1.0 resources under the /rest namespace with a new architecture that supports versioning and expanded functionality.
> As of Feb 1, 2022 we have started to sunset the Vapid API.
> Please ensure you have fully migrated over to Rest v1.0.
> You may not see immediate impact, but we expect this to be completed by end of February 2022.
> If you have any concerns please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

## Migrating to Rest v1.0

Upgrading an application that currently consumes the Vapid API to use Rest v1.0 is as simple as changing the routes you are requesting.
Update your integration to use Rest v1.0 resources by changing the format of the API endpoint URLs in your code to use the new namespace (/rest) and version parameter (v1.0) as shown in the example below.

    https://api.procore.com/vapid/projects

    https://api.procore.com/rest/v1.0/projects

We recommend testing your updated code in your development sandbox to verify that your integration will function correctly using the /rest/v1.0 resource endpoints.

## Frequently Asked Questions ##

### How does Rest differ from Vapid? ###

Rest v1.0 is a superset of the Vapid API. All resource endpoints available in Vapid are also available in Rest v1.0 with the same functionality.

### Are there new resources I can access?

Watch for notifications announcing the release of new Rest API resources.

### Are there breaking changes in Rest v1.0 that I need to account for?

Rest v1.0 contains no breaking changes. Upgrading an application to use Rest v1.0 just requires changing the routes you are requesting (ex. /vapid/projects becomes /rest/v1.0/projects).

### Are there any changes in how authentication is handled?

No. The authentication endpoint (ex. /oauth/authorize) remains the same in Rest, and authentication tokens are shared between both APIs.

## Additional Information

- [Rest API Overview]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_overview.md %}) - covers the new API versioning architecture and other Rest v1.0 topics.
- [API Lifecycle]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_lifecycle.md %}) - learn about the new API lifecycle and deprecation timelines.
- [Rest API v1.x Reference Documentation](https://developers.procore.com/reference/rest/v1) - new reference docs for the Rest v1.0 endpoints.

## Support

For questions on the Vapid API Deprecation or guidance on migrating to Rest API v1.0, please contact the API Support Team at <apisupport@procore.com>.