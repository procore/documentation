---
permalink: /rest-api-overview
title: Rest API Overview
layout: default
section_title: Getting Started
---

## Introduction
Rest is Procore’s new API that replaces the previous API known as Vapid.
Rest provides a number of advantages over the original Vapid API, including a new versioning architecture, new resources that provide additional coverage, and a new changelog feature.

## Rest API Versioning Architecture

The Rest API versioning architecture allows for a flexible approach to version management because resources are versioned independently from one another.
This lets you choose whether you want to adopt new resource versions (with breaking changes), or stay with the ones you are currently using.
Use new resource versions as they are released and update your code accordingly, or wait until it makes more sense for your particular development timeline.

## Version Numbering

Each resource in Rest is associated with a specific Rest version number which comprises two components.

- The _API version_ is set across the API. There is a complete set of resources at each supported API version (v1.x, v2.x, etc.).
- The _resource version_ is specific to each resource, and incremented whenever a breaking change is made to the API.

A breaking change is any change to the API that could potentially cause failures in the applications that consume the API.
If a change could cause API calls in an application to fail or to return different results than what is expected, we consider it a breaking change.

The format for specifying a Rest version number is as follows:

    v{api_version}.{resource_version}

For example, Rest **v1.4** indicates an API version of **1** with a resource version of **4**.

## Versioning Example

The following diagram presents a typical versioning scenario and illustrates how API versions and resource versions are managed over the course of several API releases.

![rest api versioning]({{ site.baseurl }}/assets/guides/rest-versioning-diagram.png)

Breaking down this example further we see…

- An initial release of Rest v1.0 with Projects and Companies as example resources.
- A breaking change is made to the Projects resource, the resource version is incremented but retains the same API version - Projects v1.1.
- Rest v2.0 is released. All existing resources from Rest v1.0 are promoted to v2.0 and all resource versions are reset to 0.
- A new RFIs resource is added to Rest API v2.0 starting with resource version 0.
- Rest v3.0 is released with all three example resources set to v3.0.

## Making Rest API Calls

The URL format for accessing Rest API endpoints differs from the previous Vapid API.
The `/vapid` namespace has been changed to `/rest`, and support for defining specific resource versions has been added.
The resource version is specified in the URL using the following format.

    /rest/v{api_version}.{resource_version}

_example_: https://api.procore.com/rest/v1.2/projects

## Rest API Changelog

With the release of Rest API v1.0 comes the introduction of our new changelog feature.
Use the changelog to stay up to date on changes our development teams make to Rest API resources.
Changelog entries for individual resource endpoints are viewable in the reference documentation.
Each endpoint has its own list of changes, and only displays changes relevant to the version of the resource you are currently viewing.

![rest changelog endpoint]({{ site.baseurl }}/assets/guides/rest-changelog-endpoint.png)

Each changelog entry includes the following information:

- **Summary** - A short description of the change, typically no longer than a sentence.
- **Date** - Specifies the date the change was introduced.
- **Breaking** - If 'true', the change is considered to be breaking. Breaking changes are only introduced in a new version of a resource.
- **Category** - Identifies the classification of the change as follows.
  - _New_ - a newly created endpoint.
  - _Feature_ - an addition to the endpoint that provides new functionality. Such as a query filter, additional data in the response, etc.
  - _Refinement_ - a change to how the endpoint is used or responds, not directly related to new features. For example, changes that make the endpoint more consistent or easier to use.
  - _Fix_ - a change to address a defect that is significant enough to note in the changelog.
  - _Deprecated_ - the resource endpoint is superseded by a newer version.
  - _Sunset_ - the resource is no longer available on production.

Clicking a changelog entry on the reference page displays a more detailed description that may include additional information such as:

- Affected resource versions
- Instructions on how to take advantage of a new feature
- Details about changes to the API contract
- Links to other documentation
- Short code snippets or examples

![rest changelog popup]({{ site.baseurl }}/assets/guides/rest-changelog-popup.png)

You can also access changelog information for the Rest API directly from the Developer Portal navigation header.
All changelog entries are listed chronologically on this page.
Filters allow you to drill down on the types of changes you are most interested in learning about.

![changelog page]({{ site.baseurl }}/assets/guides/changelog-page.png)

## Further Reading

- [API Lifecycle and Deprecation]({{ site.url }}{{ site.baseurl }}{% link getting_started/rest_api_lifecycle.md %})
