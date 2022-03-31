---
permalink: /tutorial-wbs
title: Work Breakdown Structure
layout: default
section_title: Guides and Tutorials

---

## Background

Work Breakdown Structure (WBS) is a robust, flexible method for organizing and reporting on financial information.
With WBS, Owners, General Contractors, and Specialty Contractors can create a customized framework of unique segments and rules for tagging, tracking, and reporting with Procore's Financial Management tools.

In the past, Procore company accounts and projects were limited to three (3) 'segments', or data fields, that could be used on financial line items.
These segments were: cost code, cost type, and sub job (optional).
With WBS, you can continue to use those three (3) segments and you can also create up to ten (10) custom segments to add to your budget code structure (pattern) at the company level.
To learn more, see [What are segments?](https://support.procore.com/faq/what-are-segments) and [What custom segments should we create for our company's Work Breakdown Structure?](https://support.procore.com/faq/what-custom-segments-should-we-create-for-our-companys-work-breakdown-structure)

## Prerequisites

Before working with the WBS endpoints, we suggest a thorough review of the following articles from our support site.

* [Introducing Work Breakdown Structure](https://support.procore.com/product-releases/new-releases/introducing-work-breakdown-structure)
* [Work Breakdown Structure](https://support.procore.com/products/online/work-breakdown-structure)
* [(WBS) Company Administration Guide](https://support.procore.com/products/online/work-breakdown-structure/company-administration-guide)
* [(WBS) Project Administration Guide](https://support.procore.com/products/online/work-breakdown-structure/project-administration-guide)

## Limitations

* Creation of custom WBS segments is **not** currently supported in companies with Field Productivity and/or ERP Integrations tools enabled.

## WBS Resources

Here are the new WBS resources available in the API.

- [Patterns](https://developers.procore.com/reference/rest/v1/patterns?version=1.0)
- [Codes](https://developers.procore.com/reference/rest/v1/codes?version=1.0)
- [Segments](https://developers.procore.com/reference/rest/v1/segments?version=1.0)
- [Segment Items](https://developers.procore.com/reference/rest/v1/segment-items?version=1.0)
- [Segment Item Lists](https://developers.procore.com/reference/rest/v1/segment-item-lists?version=1.0)

## Additional WBS-Enabled API Resources

In addition to the WBS resources listed above, a number of existing Procore API resources have been updated to support WBS.

### Budget Line Items v1.1 (Create, Show, Update)

Version 1.1 updates to the Budget Line Items resource introduce the new `wbs_code_id` parameter which is now required to successfully create a Budget Line Item.
The `wbs_code_id` parameter replaces the `cost_code_id` and `line_item_type_id` parameters for creating Budget Line Items.
Previously, `cost_code_id` and `line_item_type_id` were required, along with all other attributes in order to create a Budget Line Item.
Additionally, the response body for the [Create Budget Line Item](https://developers.procore.com/reference/rest/v1/budget-line-items?version=1.1#create-budget-line-item) endpoint now includes a `wbs_code` object with `id`, `flat_code`, and `description` attributes.

**Note**: When migrating from v1.0 to v1.1, `cost_code_id` and `line_item_type_id` parameters must be changed to a WBS Code, which can be found using the [List Project WBS Codes](https://developers.procore.com/reference/rest/v1/codes?version=1.0) endpoint.
Once the WBS code containing the matching Cost Code and Line Item Type is found, the `id` can be used as the `wbs_code_id` parameter for the [Budget Line Item Create](https://developers.procore.com/reference/rest/v1/budget-line-items?version=1.1) request.

### Updated v1.0 Resources

The `wbs_code_id` parameter has been added to the request body for the following v1.0 endpoints.

- Purchase Order Contract Line Items ([Sync](https://developers.procore.com/reference/rest/v1/purchase-order-contract-line-items?version=1.0#sync-purchase-order-contract-line-items))
- Work Order Contract Line Items ([Sync](https://developers.procore.com/reference/rest/v1/work-order-contract-line-items?version=1.0#sync-work-order-contract-line-items))
- Prime Contract Line Items ([Sync](https://developers.procore.com/reference/rest/v1/prime-contract-line-items?version=1.0#sync-prime-contract-line-items))
- Direct Costs Line Items ([Create](https://developers.procore.com/reference/rest/v1/direct-costs?version=1.0#create-direct-cost-line-item), [Update](https://developers.procore.com/reference/rest/v1/direct-costs?version=1.0#update-direct-cost-line-item))
- Potential Change Order Line Items ([Sync](https://developers.procore.com/reference/rest/v1/potential-change-orders?version=1.0#sync-potential-change-order-line-items))

The `wbs_code_id` parameter has been added to the response body for the following endpoints.

- Manual Forecast Line Items ([List](https://developers.procore.com/reference/rest/v1/manual-forecast-line-items?version=1.0#list-manual-forecast-line-items))
- Budget View Detail Rows ([List](https://developers.procore.com/reference/rest/v1/budget-view-detail-rows?version=1.0#list-budget-view-detail-rows))

The `wbs_code` object has been added to the response body for  the following endpoint.

- Budget Details ([List](https://developers.procore.com/reference/rest/v1/budget-details?version=1.0#list-budget-details))

### Deprecated Endpoints

With the release of [Work Breakdown Structure](https://developers.procore.com/documentation/tutorial-wbs), the following financial line item endpoints that utilize `cost_code`, `cost_type` and `sub_job` attributes will be deprecated on March 31, 2022.
- [List Standard Cost Code Lists](https://developers.procore.com/reference/rest/v1/cost-codes?version=1.0#list-standard-cost-code-lists) (replaced by [List Company WBS Segment Item Lists](https://developers.procore.com/reference/rest/v1/segment-item-lists?version=1.0#list-company-wbs-segment-item-lists))
- [Delete Standard Cost Code](https://developers.procore.com/reference/rest/v1/cost-codes?version=1.0#delete-standard-cost-code) (replaced by [Delete Company Segment Item](https://developers.procore.com/reference/rest/v1/segment-items?version=1.0#delete-company-segment-item))
- [Delete Sub Job](https://developers.procore.com/reference/rest/v1/sub-jobs?version=1.0#delete-sub-job) (replaced by [Delete Project Segment Item](https://developers.procore.com/reference/rest/v1/segment-items?version=1.0#delete-project-segment-item))

These endpoints will continue to function as they do currently until a sunset date to be announced in the future.
See API Lifecycle for additional information.
If your existing integration uses any of these deprecated endpoints, or Cost Code, Cost Type and Sub Job endpoints in general, we encourage you to adopt the new [Work Breakdown Structure endpoints](https://developers.procore.com/reference/rest/v1/codes?version=1.0) and update your integration as needed.
If you have any concerns please reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

## Understanding WBS Budget Code Patterns and Segments

### Default Company WBS Pattern

Each company includes a default WBS pattern representing a company budget code structure with the following legacy segments.

* cost code
* cost type
* sub job (optional)

Before creating new custom WBS segments, let’s retrieve information on the existing default WBS pattern using the [List Company WBS Patterns](https://developers.procore.com/reference/rest/v1/patterns?version=1.0#list-company-wbs-patterns) endpoint.
This endpoint requires the `company_id` path parameter.

`GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/patterns`

The response you receive from this call will be similar to the following.

```
{
    "id": 3113970,
    "segments": [
        {
            "id": 447334,
            "name": "Sub Job",
            "type": "sub_job",
            "position": 0,
            "delimiter": ".",
            "required": false,
            "segment_items_count": 0,
            "project_can_modify_origin_project": true,
            "project_can_delete_origin_company": true,
            "structure": "flat"
        },
        {
            "id": 447332,
            "name": "Cost Code",
            "type": "cost_code",
            "position": 1,
            "delimiter": ".",
            "required": true,
            "segment_items_count": 0,
            "project_can_modify_origin_project": true,
            "project_can_delete_origin_company": true,
            "structure": "tiered"
        },
        {
            "id": 447333,
            "name": "Cost Type",
            "type": "line_item_type",
            "position": 2,
            "delimiter": ".",
            "required": true,
            "segment_items_count": 7,
            "project_can_modify_origin_project": false,
            "project_can_delete_origin_company": false,
            "structure": "flat"
        }
    ]
}
```

Each default WBS legacy segment in the response object has the following attributes.

* **id** (integer) - unique identifier for the WBS segment.
* **name** (string) - i18n display name of the Wbs segment.
* **type** (string) - type of WBS segment (‘cost_code’, ‘line_item_type’, or ‘sub_job’).
* **position** (integer) - position of the WBS segment within the company WBS pattern.
* **delimiter** (string) - string character used as the delimiter between a WBS segment and the segment.
* **required** (boolean) - whether the WBS segment is required.
* **segment_items_count** (integer) - number of segment items that belong to a segment.
* **project_can_modify_origin_project** (boolean) - whether project-specific segment items are able to be added to a project.
* **project_can_delete_origin_company** (boolean) - whether segment items inherited from the company level are able to be deleted from a project.
* **structure** (string) - structure type for the WBS segment (‘flat’ or ‘tiered’).


### Add a Custom Segment to the Company Level WBS

You can add custom segments to the company WBS pattern using the [Create a Company WBS Segment](https://developers.procore.com/reference/rest/v1/segments?version=1.0#create-a-company-wbs-segment) endpoint.

`POST /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments`

This endpoint requires the `company_id` path parameter and a request body defining the new segment object.

```
{
  "segment": {
    "name": "Phase",
    "project_can_modify_origin_project": true,
    "project_can_delete_origin_company": true,
    "structure": "flat"
  }
}
```
The `name` attribute can be any meaningful string value you choose, ‘Phase’ is used in this example.
We have defined `project_can_modify_origin_project` as ‘true’, meaning that project-specific segment items can be added to a project.
Project administrators will have the ability to add, edit, and delete unused segment items on a project.
We have also defined `project_can_delete_origin_company` as 'true', indicating that segment items inherited from the company level are allowed to be deleted from a project.
Project administrators will have the ability to delete segment items inherited at the project level from the company level Admin tool.
Finally, we define the segment `structure` as ‘flat’ in this case.
For more information on flat versus tiered segment structures, see [What is the difference between a flat and tiered segment in Procore's WBS?](https://support.procore.com/faq/what-is-the-difference-between-a-flat-and-tiered-segment-in-procores-wbs)

A successful response from the Procore API looks similar to the following.

```
{
    "id": 447340,
    "name": "Phase",
    "type": "custom",
    "position": 3,
    "delimiter": ".",
    "required": false,
    "segment_items_count": 0,
    "project_can_modify_origin_project": true,
    "project_can_delete_origin_company": true,
    "structure": "flat"
}
```

We see that the segment has a new `type` value of ‘custom’.
Also, the `position` value has been defined as ‘3’, which is the next available position in the company WBS pattern as the default segments already occupy positions 0, 1, and 2.
No segment items have been created yet, so `segment_items_count` is initially '0'.
We can use the Procore UI to verify that our new custom segment has been created.

![Custom Segment - UI]({{ site.baseurl }}/assets/guides/wbs-segments-phase.png)

See [Add Custom Segments](https://support.procore.com/products/procore-imports/user-guide/company-admin/tutorials/add-custom-segments) for additional information.

### Add a Segment Item to a Segment in the Company Level WBS

A segment item is one of many distinct items in a segment that are the building blocks of WBS budget codes.
After creating a custom segment, you can add an unlimited number of segment items to it.
We use the Create Company Segment Item endpoint to add new segment items.
This endpoint requires `company_id` and `segment_id` as path parameters.

`POST /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{segment_id}/segment_items`

```
{
  "code": P,
  "name": "Planning"
}
```

A successful response body looks similar to the following.

```
{
    "code": "P",
    "name": "Planning",
    "id": 29529,
    "parent_id": null,
    "path_code": "P",
    "path_ids": [
        29529
    ],
    "path_codes": [
        "P"
    ],
    "path_names": [
        "P"
    ],
    "in_use": false,
    "segment": {
        "id": 447340,
        "name": "Phase",
        "type": "custom",
        "position": 1,
        "delimiter": ".",
        "required": false,
        "segment_items_count": 0,
        "project_can_modify_origin_project": true,
        "project_can_delete_origin_company": true,
        "structure": "flat"
    },
    "status": "active",
    "is_parent": false
}
```

See [Add Segment Items](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-segment-items) and [What are segments and segment items?](https://support.procore.com/faq/what-are-segments-and-segment-items) For additional information.


### Define the Company WBS Budget Code Structure

Our next step is to configure the company's default and custom segments to define the WBS budget code structure, or _pattern_.
When arranging and rearranging segments, it’s important to keep these points in mind:

* Although your Procore Administrator can change your company level budget code structure at any time, rearranging the segment order only affects the segment order of new Procore projects.
Existing Procore projects retain the budget code structure that was defined in the Company Admin tool at the time the project was created.
* Before moving segments on your company level budget code structure, it’s important to understand the impact of this action on your Procore projects.
For details, see [What happens to projects when I change the segment order of my company's budget code structure in WBS?](https://support.procore.com/faq/what-happens-to-projects-when-i-change-the-segment-order-of-my-companys-budget-code-structure-in-wbs)

When you first create a new custom segment, the Procore API automatically adds the segment to the WBS pattern in the next available position in the order created.
You can also use the API to arrange these segments to appear in any order.
The arrangement defines your company's budget code structure on all the Procore projects in your company's account.
We use the [Update Company Pattern's Segment Order](https://developers.procore.com/reference/rest/v1/patterns?version=1.0#update-company-patterns-segment-order) endpoint to define the new segment order.
This endpoint requires the `company_id` path parameter as well as a request body containing the new position definitions.

`PUT /rest/v1.0/companies/{company_id}/work_breakdown_structure/patterns/update_segment_order`

In this example, we are moving our custom ‘Phase’ segment to the first position in the WBS pattern.

```
{
  "updated_order": [
    {
      "segment_id": 447340,
      "position": 0
    },
    {
      "segment_id": 447334,
      "position": 1
    },
    {
      "segment_id": 447332,
      "position": 2
    },
    {
      "segment_id": 447333,
      "position": 3
    }
  ]
}
```

The company level budget code structure is now defined as:

`Phase . Sub Job . Cost Code . Cost Type`

See [Arrange the Company Budget Code Structure ](https://support.procore.com/products/online/work-breakdown-structure/tutorials/arrange-the-company-budget-code-structure) for additional information.

### Creating the Project Level WBS Pattern

Once we have created and arranged our Company WBS budget code pattern we can define it for the project level.
We can use any or all of the segments defined at the company level to build the project level WBS budget code pattern
The segments you include in the project-level pattern must be a subset of the segments defined at the company level.
Let’s call [List Project WBS Patterns](https://developers.procore.com/reference/rest/v1/patterns?version=1.0#list-project-wbs-patterns) to see the default configuration. It requires the `project_id` path parameter.

`GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/patterns`

The example response body shows that only the `Cost Code` and `Cost Type` segments are returned.
Sub jobs are not enabled for our project so that segment is excluded.
Note that the custom `Phase` segment we defined at the company level is not included by default.

```
{
    "id": 3113973,
    "segments": [
        {
            "id": 447332,
            "name": "Cost Code",
            "type": "cost_code",
            "position": 1,
            "delimiter": ".",
            "required": true,
            "segment_items_count": 0,
            "project_can_modify_origin_project": true,
            "project_can_delete_origin_company": true,
            "selectable_tiers": false,
            "is_included_in_project_pattern": true,
            "structure": "tiered"
        },
        {
            "id": 447333,
            "name": "Cost Type",
            "type": "line_item_type",
            "position": 2,
            "delimiter": ".",
            "required": true,
            "segment_items_count": 7,
            "project_can_modify_origin_project": false,
            "project_can_delete_origin_company": false,
            "selectable_tiers": false,
            "is_included_in_project_pattern": true,
            "structure": "flat"
        }
    ],
    "is_project_level_ordered": false
}
```

Next, we can add the `Phase` segment to the project-level WBS pattern using the [Add segment to the project pattern](https://developers.procore.com/reference/rest/v1/patterns?version=1.0#add-segment-to-the-project-pattern) endpoint.
We include the required `project_id` path parameter along with a request body specifying the `segment_id` corresponding to the `Phase` segment.

`PUT /rest/v1.0/projects/{project_id}/work_breakdown_structure/patterns/add_segment`

Request body:

```
{
  "segment_id": 447340
}
```

A 204 response code indicates the segment was successfully added to the project level WBS pattern.

Next, we can use the [Create Project Segment Item](https://developers.procore.com/reference/rest/v1/segment-items?version=1.0#create-project-segment-item) endpoint to add items to the segments in the project-level WBS pattern.
Finally, we can choose to rearrange the segment order for the project-level WBS pattern using the [Update Project Pattern's Segment Order](https://developers.procore.com/reference/rest/v1/patterns?version=1.0#update-project-patterns-segment-order) endpoint.
For now, we’ll leave the segment order in place defined as `Phase . Cost Code . Cost Type`.

### Working with WBS Codes

Now that we have our WBS budget code patterns defined at the company and project levels, we can build WBS codes based on those structures using the [Create a WBS code](https://developers.procore.com/reference/rest/v1/codes?version=1.0#create-a-wbs-code) endpoint.
We supply `project_id` as a required path parameter along with a request body specifying the segments and segment items we want to include in the WBS budget code.

`POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/wbs_codes`

Example request body:

```
{
  "description": "Example Cost Code",
  "segment_items": [
    {
      "segment_id": 447340,
      "segment_item_id": 29529
    },
    {
      "segment_id": 447332,
      "segment_item_id": 654142250
    },
    {
      "segment_id": 447333,
      "segment_item_id": 918922
    }
  ]
}
```

Example response:

```
{
    "id": 182877777,
    "flat_code": "P.3.SVC",
    "flat_name": "Planning.Concrete.Professional Services",
    "description": "Example Cost Code",
    "segment_items": [...],
    "updated_at": "2022-03-04T00:03:00Z",
    "created_at": "2022-03-04T00:03:00Z"
}
```

Once you have created a complete set of WBS codes for your organization, you can use them in CRUD operations to manage financial line item data in the following resources.

* [Budget Line Items](https://developers.procore.com/reference/rest/v1/budget-line-items?version=1.1) (UPDATE)
* [Direct Cost Line Items](https://developers.procore.com/reference/rest/v1/direct-costs?version=1.0) (CREATE, UPDATE)
* [Potential Change Order Line Items](https://developers.procore.com/reference/rest/v1/potential-change-orders?version=1.0) (SYNC)
* [Prime Contract Line Items](https://developers.procore.com/reference/rest/v1/prime-contract-line-items?version=1.0) (SYNC)
* [Purchase Order Contract Line Items](https://developers.procore.com/reference/rest/v1/purchase-order-contract-line-items?version=1.0) (SYNC)
* [Work Order Contract Line Items](https://developers.procore.com/reference/rest/v1/work-order-contract-line-items?version=1.0) (SYNC)

## WBS Comparison with Legacy Financial Resources

Existing integrations that rely on the current set of legacy financial line item resources will eventually need to be updated to adopt the WBS resources.

### Cost Codes and Cost Types

The Cost Code and Line Item Type endpoints will continue to work for some time. It is not necessary to immediately switch to the WBS Segment and WBS Segment Items endpoints if you are not adding custom segments. (Note that Cost Type is the user-facing term used in the Procore web application, while the API reference documentation refers to this object as Line Item Type.)

- **Standard Cost Codes and Cost Types (Line Item Types)** - Integrations that currently utilize legacy Standard Cost Codes and Cost Types (Line Item Types) must be updated to use Segment Items within the Cost Codes segment and Cost Types segment.

- **Project Cost Codes** - Integrations that currently utilize legacy Project Cost Codes must be updated to use Segment Items within the Cost Codes segment on the Project.

### Budget Code

The Procore web application automatically creates a Budget Code when users create line items on any financial tools.
Users were first introduced to the creation of Budget Codes in the web application in February of 2020.
The WBS release includes the new WBS Code resource that allows for the creation of Budget Codes through the API. (Note that Budget Code is the user-facing term used in the web application, while the API reference documentation refers to this object as WBS Code.)

Although integrations are not required to create Budget Codes through the API, a Budget Code is required to create a financial line item such as a Budget Line Item or Direct Cost Line Item.
Therefore, some integrations may require updates to add the Budget Code (WBS Code) before creating financial line items.

A comparison of the legacy and WBS segment relationships to the Budget Code and Financial Line Items is depicted below.
Note that with WBS the Budget Code precedes creation of the Budget Line.

**Legacy**:

![Legacy Budget Code]({{ site.baseurl }}/assets/guides/wbs-legacy-budget-line.png)

**WBS**:

![WBS Budget Code]({{ site.baseurl }}/assets/guides/wbs-code-budget-line.png)

### Line Item Entities

API endpoints that return financial line items (Contracts, Change Orders, Change Events, Budget, Direct Cost, etc.) in their response bodies will continue to return `cost_code_id` and `line_item_type_id` until Cost Codes and Line Item Types are sunset at a future date.

A `wbs_code_id` attribute has been added to these responses and encompasses all of the segments of a WBS Code (Budget Code) including Cost Code, Cost Type, and Sub Job.
Eventually the `line_item_type_id` and `cost_code_id` attributes will be removed from these line item responses.

### Custom Segments and Patterns

- **Custom Segments** - If you would like to utilize custom Segments, you will have the option to create a custom Segment and Segment Items through the web application at the company level, or through the API. Custom Segments function very similarly to the current segments of Cost Code and Cost Type.

- **Patterns** - WBS patterns exist at both the company and project levels.
Each project may choose to copy the company pattern, or select a subset of the company pattern.
We will provide the ability to create and edit the Company and Project patterns through both the application and API.

**Note**: Custom Segments can be established in the Project pattern, however, they are not strictly required on financial line items, similar to the way Sub Jobs work currently.

## WBS and Origin IDs

- Many custom integrations use the `origin_id` field in Procore to store an external unique identifier for Cost Codes, Cost Types, and Sub Jobs. Learn more about External IDs and Data here.
- Cost Codes, Cost Types, and Sub Jobs endpoints will continue to support the `origin_id` attribute and the functionality will not change, through Q1 2023.
The `origin_id` is not currently available on Custom Segments or WBS Codes. This functionality may be added to some portions of WBS in the future.

## Additional Information

If you require additional guidance on working with the Work Breakdown Structure endpoints, please reach out to our API Support team at <apisupport@procore.com> for assistance.

