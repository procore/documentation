---
permalink: /tutorial-budget-line-items
title: Working with Budget Line Items
layout: default
section_title: Guides and Tutorials

---

## Introduction

Project managers rely on Procore's Budget tool to manage change orders, commitments, and direct costs, as well as leverage the built-in forecasting features to track the estimated cost of completion and savings and loss over the course of the project lifecycle.
The Procore API provides a number of endpoints that support common budget workflows.
In preparation for working with budget views and budget line items using the Procore API, we recommend reviewing the related instructional content available on the Procore Support site.

- [Set up a Budget](https://support.procore.com/products/online/user-guide/project-level/budget/tutorials/set-up-a-budget)
- [Interactive Workflow Diagram](https://support.procore.com/products/online/user-guide/project-level/budget/workflow)

In addition, we recommend completing the [Construction Financials](https://learn.procore.com/series/procore-certification/procore-certification-project-manager-construction-financials) video training course available at [learn.procore.com](https://learn.procore.com/)

## Understanding Budget Views
Before working with budget line items using the Procore API, it is important to gain an understanding of _budget views_ and their associated workflows.
Budgets created using the Procore Budget tool can have one or more views.
Views provide visibility and insight into specific aspects of a budget, such as a buyout savings, change order analysis, commitment billing, and so on.
Prior to working with budget views we recommend visiting the following articles on the Procore Support site.

- [Which budget views should I add to my projects?](https://support.procore.com/faq/which-budget-views-should-i-add-to-my-projects)
- [Set up a New Budget View](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/set-up-a-new-budget-view)

## Accessing Budget Views and Line Items Using the API

The Procore API provides the following endpoints for working with budget views and budget line items.

| Endpoint                                                                                                                                 | Description                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [List Budget Views](https://developers.procore.com/reference/rest/v1/budget-views#list-budget-views)                                     | Return a list of all Budget Views for a project.                                                                                                                                                                                                                                                                                                              |
| [List Budget View Summary Rows](https://developers.procore.com/reference/rest/v1/budget-view-summary-rows#list-budget-view-summary-rows) | Return a list of all Budget View Summary Rows for a specified project and budget view. The type of row returned is dependent on the value used in the group_by query param. In addition to all the fields normally included in the response, an additional key is returned for each visible source and formula column created for the particular budget view. |
| [List Budget View Detail Rows](https://developers.procore.com/reference/rest/v1/budget-view-detail-rows#list-budget-view-detail-rows)    | Return a list of all Budget View Detail Rows for a project and budget view. In addition to all the fields normally included in the response, an additional key is returned for each visible source and formula column created for the specified budget view.                                                                                                  |
| [Create Budget Line Item](https://developers.procore.com/reference/rest/v1/budget-line-items#create-budget-line-item)                    | Add a new line item to a budget.                                                                                                                                                                                                                                                                                                                              |
| [Show Budget Line Item](https://developers.procore.com/reference/rest/v1/budget-line-items#show-budget-line-item)                        | Return information about a Budget Line Item.                                                                                                                                                                                                                                                                                                                  |
| [Update Budget Line Item](https://developers.procore.com/reference/rest/v1/budget-line-items#update-budget-line-item)                    | Update a line item of a specified budget.                                                                                                                                                                                                                                                                                                                     |

## Budget Line Item API cURL Examples

Here are some examples of API calls you can use to work with budget views and budget line items.

### Discovering the Budget Views in a Project

Although Procore provides the standard budget view by default, Procore administrators have the ability to create custom budget views using the Procore Web user interface.
Once created, all budget views available in a given project can be retrieved through the API using the List Budget Views endpoint (GET /rest/v1.0/budget_views).
Here is a cURL example of a call to List Budget Views.

```
curl  -X GET https://api.procore.com/rest/v1.0/budget_views?project_id=123456
```

From the JSON response returned by this call you can determine the `id` for the budget view you want to work with.

### Retrieving Budget View Summary Rows

Once you have acquired the `id` for the budget view you want to work with, you can retrieve the summary rows for that view by making a call to the List Budget View Summary Rows endpoint (GET /rest/v1.0/budget_views/{budget_view_id}/summary_rows).
Here is a cURL example of a call to List Budget View Summary Rows.

```
curl  -X GET https://api.procore.com/rest/v1.0/budget_views/117217/summary_rows?project_id=123456
```

From the JSON response returned by this call you can retrieve summary values along with the `budget_line_item_ids` associated with specified the budget view.

### Retrieving Budget View Detail Rows

You can also retrieve detailed information from a budget view by making a call to the List Budget View Detail Rows (GET /rest/v1.0/budget_views/{budget_view_id}/detail_rows) endpoint.
Here is a cURL example of a call to List Budget View Detail Rows.

```
curl  -X GET https://api.procore.com/rest/v1.0/budget_views/117217/detail_rows?project_id=123456
```

From the JSON response returned by this call you can retrieve detailed information on every line item included in the specified budget view.
Note that Forecast to Complete data, whether or not the column has been renamed in the web user interface, is returned as a `budget_forecast` attribute in the response body.

### Retrieve Information on a Specific Budget Line Item

You can use the Show Budget Line Item (GET /rest/v1.0/budget_line_items/{id}) endpoint to return detailed information on a specific budget line item apart from the context of a budget view.
Here is a cURL example of a call to Show Budget Line Item.

```
curl  -X GET https://api.procore.com/rest/v1.0/budget_line_items/7868294?project_id=123456
```

### Update a Budget Line Item

You can use the Update Budget Line Item (PATCH /rest/v1.0/budget_line_items/{id}) endpoint to modify the information on a specific budget line item.
Here is a cURL example of a call to Update Budget Line Item.

```
curl  -X PATCH https://api.procore.com/rest/v1.0/budget_line_items/7868294 /
      -d '{"project_id": 123456, /
      "budget_line_item": {"cost_code_id": 12345, "line_item_type_id": 12345, "original_budget_amount": 10000, "direct_costs": 2450.35}}'
```

## Common Budget Line Item Workflow

The following sections present a commom workflow you may encounter while integrating with the Procore Budget tool.
We use screenshots from Postman to help illustrate each step.

### Step 1: Return All Budget Views Available on a Specific Project

First, we return all budget views available on a specific project.
The response body includes objects that correlate to all existing budget views on the `project_id` specified as a query parameter.
Select and save the desired `budget_view_id` to utilize in subsequent requests.
The response body also includes a links object that provides the endpoint URLs for obtaining the [Budget View Summary Rows](https://developers.procore.com/reference/rest/v1/budget-view-summary-rows#list-budget-view-summary-rows) and the [Budget View Detail Rows](https://developers.procore.com/reference/rest/v1/budget-view-detail-rows#list-budget-view-detail-rows) detailed in the following steps.

![List Budget Views]({{ site.baseurl }}/assets/guides/list-budget-views.png)

### Step 2: Retrieve Budget View Summary Rows

Use the [List Budget View Summary Rows](https://developers.procore.com/reference/rest/v1/budget-view-summary-rows#list-budget-view-summary-rows) endpoint to obtain high-level budget and budget line item information.
The response body from this endpoint requires a `budget_view_id` (obtained in Step 1 above).
The response also includes an array of `budget_line_item_ids`, but no additional information is displayed about the line items identified.
To obtain more detailed information on each of these budget line items, we use [List Budget View Detail Rows](https://developers.procore.com/reference/rest/v1/budget-view-detail-rows#list-budget-view-detail-rows) (described in the next step) as it is the best and most comprehensive resource.

![List Budget View Summary Rows]({{ site.baseurl }}/assets/guides/list-budget-view-summary-rows.png)

The following illustration shows what the equivalent of the Budget View Summary Rows endpoint results would look like using the Procore Web application.
Notice the budget view name (Procore Legacy View) matches what is displayed by the API in the screenshot outlined in Step 1.
In addition, no specific budget line item information is shown, only information displayed on the left side of the budget tool broken down by parent cost code.

![Budget View Summary UI]({{ site.baseurl }}/assets/guides/budget-view-summary-ui.png)

### Step 3: Retrieve Detailed Information on each Individual Budget Line Item

The List Budget View Detail Rows endpoint is the best resource for obtaining more detailed information on each individual budget line item.
Using the same `budget_view_id` obtained in Step 1, we make a request to this endpoint.
Each object returned contains extensive information on each specific budget line item including the Cost Code, Pending Budget Changes, Job to Date Costs, and the amount budgeted for that line item.
In order to eventually update budget line item information, we need to choose a `budget_line_item_id` from this response body to be used in subsequent requests.

![List Budget View Detail Rows]({{ site.baseurl }}/assets/guides/list-budget-view-detail-rows.png)

In the Procore web application, you can drill down into the budget line items by cost code.
The equivalent data of the Budget View Detail Row endpoint displayed in the Procore Web application is shown below.

![Budget View Detail Rows UI]({{ site.baseurl }}/assets/guides/budget-view-detail-rows-ui.png)

Notice that the line items are broken down by individual cost code, with the corresponding values on the right side of the table matching the values returned by the API response body.

### Step 4: Retrieve Information on one Specific Budget Line Item

Now we can obtain information on one specific Budget Line Item using the `budget_line_item_id` values returned in the Budget Summary Rows or Detail Rows endpoints as path parameters on the [Show Budget Line Item](https://developers.procore.com/reference/rest/v1/budget-line-items#show-budget-line-item) endpoint.
The response body from this endpoint includes most of the same data returned by the [List Budget View Detail Rows](https://developers.procore.com/reference/rest/v1/budget-view-detail-rows#list-budget-view-detail-rows) endpoint.

![Show Budget Line Item]({{ site.baseurl }}/assets/guides/show-budget-line-item.png)

### Step 5: Update a Budget Line Item

For the purposes of this example, our intention is to update the line item type for a given budget line item.
After pulling the `line_item_type_id` from the [List Line Item Types](https://developers.procore.com/reference/rest/v1/line-item-types-cost-types#list-line-item-types) endpoint, we construct a PATCH request with the required ID values:

- Budget_line_item_id
- Project_id (which can be passed in as a body parameter or a query parameter)
- Line_item_type_id (for example only; it is not a required parameter on all requests to update a budget line item.

![Update Budget Line Item]({{ site.baseurl }}/assets/guides/update-budget-line-item.png)

After submitting the properly formatted request body, a 200 OK response is returned.
Notice that the line item type object has been updated with the new information.
We have successfully updated a budget line item!
For more information on which fields on a budget line item can be updated, please consult our [Update Budget Line Item](https://developers.procore.com/reference/rest/v1/budget-line-items#update-budget-line-item) endpoint documentation.
