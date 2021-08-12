---
permalink: /tutorial-timecard-entries
title: Working with Timecard Entries
layout: default
section_title: Guides and Tutorials

---

## Introduction

Project managers rely on Procore's Budget tool to manage change orders, commitments, and direct costs, as well as leverage built-in forecasting features to track the estimated cost of completion and savings and loss over the course of the project lifecycle.
In addition, Procore's Timecard tool can be used to track labor hours and manage field productivity.
For companies using third-party labor tracking systems, the Procore API provides a Timecard Entry resource that can be used to integrate labor hours managed in external systems with budget views in Procore.
This approach allows for integration with external time tracking solutions without the need to purchase Procore's Field Productivity product.

In preparation for working with timecard entries using the Procore API, we recommend reviewing the related instructional content available on the Procore Support site.

- [Set up a Budget](https://support.procore.com/products/online/user-guide/project-level/budget/tutorials/set-up-a-budget)
- [Interactive Budget Workflow Diagram](https://support.procore.com/products/online/user-guide/project-level/budget/workflow)
- [Company Timecard Tool](https://support.procore.com/products/online/user-guide/project-level/timecard)
- [Create a Timecard Entry](https://support.procore.com/products/online/user-guide/company-level/timecard/tutorials/create-a-timecard-entry)
- [Edit a Timecard Entry](https://support.procore.com/products/online/user-guide/company-level/timecard/tutorials/edit-a-timecard-entry)

In addition, we recommend completing the [Construction Financials](https://learn.procore.com/series/procore-certification/procore-certification-project-manager-construction-financials) video training course available at [learn.procore.com](https://learn.procore.com/)

> PREREQUISITES
>
> Working with the Timecard Entry API endpoints to integrate with external systems requires the following:
>
> - Company level Timecard tool must be enabled in the Procore account.
> - 'Admin' level permissions on the Company level Timecard tool required to create/update timecard entries in Procore.

## Timecard Entry API Endpoints

The Procore API provides the following endpoints for working with timecard entries.

| Endpoint                                                                                                                                                    | Description                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [List Timecard Entries (Project)](https://developers.procore.com/reference/rest/v1/timecard-entries#list-timecard-entries-project)                          | Return a list of all timecard entries for the specified project.   |
| [Create Timecard Entry (Project)](https://developers.procore.com/reference/rest/v1/timecard-entries#create-timecard-entry-project)                          | Create a new timecard entry in the specified project.              |
| [Show Timecard Entry (Project)](https://developers.procore.com/reference/rest/v1/timecard-entries#show-timecard-entry-project)                              | Return detailed information about the specific timecard entry.     |
| [Update Timecard Entry (Project)](https://developers.procore.com/reference/rest/v1/timecard-entries#update-timecard-entry-project)                          | Update the specified timecard entry.                               |
| [Delete Timecard Entry (Project)](https://developers.procore.com/reference/rest/v1/timecard-entries#delete-timecard-entry-project)                          | Delete the specified timecard entry.                               |
| [Update Timecard Entry Signature (Project)](https://developers.procore.com/reference/rest/v1/timecard-entries#update-timecard-entry-signature-project)      | Update a timecard entry signature with the specified signature ID. |
| [Remove Timecard Entry Signature (Project)](https://developers.procore.com/reference/rest/v1/timecard-entries#remove-signature-from-timecard-entry-project) | Remove the signature ID from the specified timecard entry.         |

## Basic Timecard Entry Integration Workflow

Here is a high-level view of a basic integration between an external time tracking system and the Procore Company Timecard and Project Budget tools.

![timecard-integration-workflow]({{ site.baseurl }}/assets/guides/timecard-integration-workflow.png)

In this example, a Timecard Integration App retrieves timecard data from an external third-party system and uses the Timecard Entry API to create new timecard entries in the Procore Company Timecard tool.
A Procore Project Manager uses the Procore Project Budget tool to leverage the timecard entry data created though the API.
A custom budget view with the Timecard Entry Hours column enables the Project Manager to see the impacts of labor hours on the project budget in real time.

## Create Timecard Entries Using the API

### Determining Cost Code ID and Line Item Type ID Values

Using the Procore API to create a timecard entry suitable for incorporating into budget views requires that the correct values for the `cost_code_id` and `line_item_type_id` parameters are included in the Create Timecard Entry request body.
The specific cost code a new timecard entry is associated with must have at least one line item type with a `base_type` value of 'labor'.
You can retrieve possible values for these parameters by calling the List Cost Codes endpoint.
This excerpt from the [List Cost Codes](https://developers.procore.com/reference/rest/v1/cost-codes#list-cost-codes) JSON response body shows where these values are found.

![list-cost-codes-response]({{ site.baseurl }}/assets/guides/list-cost-codes-response.png)

This example for the 'Project Manager' cost code shows a `cost_code_id` value of `78261175`.
In the `line_item_types` array we find an ID of `50887` for the `line_item_type` with a corresponding `base_type` of 'labor'.

### Adding a Timecard Entry

Now, let's use those values as parameters to create a new timecard entry for labor hours attributed to the 'Project Manager' cost code.
In the request body for the [Create Timecard Entry](https://developers.procore.com/reference/rest/v1/timecard-entries#create-timecard-entry-project) endpoint we use the values for `cost_code_id` and `line_item_type_id` that we retrieved in the previous step, so that the labor hours included in the timecard entry can be accessible from the Project Budget tool.

![create-timecard-entry]({{ site.baseurl }}/assets/guides/create-timecard-entry.png)

## Including Timecard Entry Hours in Project Budget Views

After timecard entries are added to a project, labor hours can be accessed and included in project budget views using the Timecard Entry Hours source column.
In order to make Timecard Entry Hours available as a source column, we first need to create a Timesheet to Budget Configuration.
We include the `line_item_type_id` in the request body.

![create-timesheet-to-budget-config]({{ site.baseurl }}/assets/guides/create-timesheet-to-budget-config.png)

With the Timesheet to Budget Configuration successfully created, we can now use Timecard Entry Hours as a source column in a budget view as described in [Add a Budget View for Real-Time Labor Productivity](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-a-budget-view-for-real-time-labor-productivity). When creating a new source column for the budget view, select Timecard Entry Hours in the available dropdown.

![timecard-entry-hours]({{ site.baseurl }}/assets/guides/timecard-entry-hours.png)

See the following Procore Support Site articles to learn more about creating and working with budget views.

- [What are Procore's standard budget views?](https://support.procore.com/faq/what-are-procores-standard-budget-views)
- [Set Up a New Budget View](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/set-up-a-new-budget-view)
