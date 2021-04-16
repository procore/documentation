---
permalink: /rest-api-lifecycle
title: API Lifecycle
layout: default
section_title: Getting Started
---

## API Lifecycle Phases

The API lifecycle comprises three distinct phases.

- **Active**: Current version of the API and is fully supported. Ongoing feature releases, bug fixes, and refinements to functionality may occur in this phase.
- **Deprecated**: Has been superseded by a newer API version. A deprecated API version will be supported for a period of one (1) year following the date of deprecation. However, no new development occurs during this phase. New applications are denied access to deprecated APIs.
- **Sunset**: API resources are no longer available on production. This occurs at the conclusion of the ‘Deprecated’ phase.

## API Lifecycle Management

This table provides additional information on how the Rest API product is managed through the lifecycle.

| Phase      | API Resources                             | Support                                                                                                                                                | Documentation                                                            | Change Notification                                                                                                                         |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Active     | API is live in Production                 | - New resource versions released periodically with new features, refinements, fixes, etc.<br>- Technical support available at <apisupport@procore.com> | - Released with new API versions<br>- Reference documentation maintained | - Changelog entries published for updates to resource endpoints<br> - Developer Portal notifications covering new resource version releases |
| Deprecated | API is live in Production                 | - Fixes deployed as needed<br>- No new development<br>- Technical support available at <apisupport@procore.com>                                        | - Endpoint reference pages marked as 'Deprecated'                        | - Developer Portal notification and announcement prior to deprecation<br> - Changelog entries published only for fixes and related changes  |
| Sunset     | API is no longer accessible in Production | - Support no longer provided                                                                                                                           | - Reference pages no longer accessible in Production                     | - Developer Portal notification and announcement prior to sunset<br> - Final sunset announcement                                            |

## Support

Please reach out to <apisupport@procore.com> if you have any questions regarding the API lifecycle.
