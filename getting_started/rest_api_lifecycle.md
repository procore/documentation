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

<table>
  <tbody>
    <thead>
      <tr>
        <th>Phase</th>
        <th>API Resources</th>
        <th>Support</th>
        <th>Documentation</th>
        <th>Change Notification</th>
      </tr>
    </thead>
      <tr>
        <td>Active</td>
        <td>
            <ul>
                <li>API is live in Production.</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>New resource versions released periodically with new features, refinements, fixes, etc.</li>
                <li>Technical support available at <a <a href="mailto:apisupport@procore.com">apisupport@procore.com</a>.</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Released with new API versions.</li>
                <li>Reference documentation maintained.</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Changelog entries published for updates to resource endpoints.</li>
                <li>Developer Portal notifications covering new resource version releases.</li>
            </ul>
        </td>
      </tr>
      <tr>
        <td>Deprecated</td>
        <td>
            <ul>
                <li>API is live in Production.</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Fixes deployed as needed.</li>
                <li>No new development.</li>
                <li>Technical support available at <a href="mailto:apisupport@procore.com">apisupport@procore.com</a>.</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Endpoint reference pages marked as ‘Deprecated’.</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Developer Portal notification and announcement prior to deprecation.</li>
                <li>Changelog entries published only for fixes and related changes.</li>
            </ul>
        </td>
      </tr>
      <tr>
        <td>Sunset</td>
        <td>
            <ul>
                <li>API is no longer accessible in Production.</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Support no longer provided.</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Reference pages no longer accessible in Production.</li>
            </ul>
        </td>
        <td>
            <ul>
                <li>Developer Portal notification and announcement prior to sunset.</li>
                <li>Final sunset announcement.</li>
            </ul>
        </td>
      </tr>  
  </tbody>
</table>

## Support

Please reach out to <apisupport@procore.com> if you have any questions regarding the API lifecycle.
