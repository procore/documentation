---
permalink: /tutorial-change-orders
title: Working with Change Orders
layout: default
section_title: Guides and Tutorials

---

## Introduction

This tutorial provides insight and guidance for developers using the Change Order resources and endpoints available in the Procore API.
Procore's Project level Change Orders tool streamlines the change management process by providing a centralized location for monitoring change orders that affect prime contracts and commitments.
In construction management, _change orders_ represent the specific details of new work item added to the original scope of a construction project.

## Understanding Change Order Tiers

In order to work effectively with the Change Orders API, you'll need a solid understanding of how Change Order Tiers work in Procore.
Before, exploring the various Change Order API resources and endpoints, we recommend reading [What are the different change order tiers?](http://support.procore.com/faq/what-are-the-different-change-order-tiers) on the Procore Support site.

## Single-Tier Change Order Behavior - Procore Web vs. API

When Procore clients use the One Tier (single-tier) setup on a project and one of their users creates a Commitment Change Order using the Procore Web user interface, both a Change Order Package _and_ a Potential Change Order (to hold the line items for the change order) is created in the back-end system.
As a result, you will need to use endpoints for both of these resources in order to successfully work with a Commitment Change Order using the API in a single-tier setup.

To help illustrate this relationship, work through the following steps.

1. Use the Create Change Order Package endpoint ([POST /rest/v1.0/change_order_packages](https://developers.procore.com/reference/rest/v1/change-order-packages#create-change-order-package)) to create a new Change Order Package.
1. Make a call to the List Change Order Packages endpoint ([GET /rest/v1.0/change_order_packages](https://developers.procore.com/reference/rest/v1/change-order-packages#list-change-order-packages)) and examine the response to verify that the Change Order Package created in the previous step exists.
1. Make a call to the List Potential Change Orders endpoint ([GET /rest/v1.0/potential_change_orders](https://developers.procore.com/reference/rest/v1/potential-change-orders#list-potential-change-orders)) to verify that indeed an associated Potential Change Order has also been created.
