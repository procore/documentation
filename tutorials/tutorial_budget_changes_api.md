---
permalink: /tutorial-budget-changes-api
title: Upgrading from Budget Modifications API to the Budget Changes API
layout: default
section_title: Guides and Tutorials

---

## Introduction
Budget Changes are a new feature in Procore Financials that replace the functionality originally existing in Budget Modifications. They are a resource that can be created from the Budget Tool or via [the Rest API for Budget Changes](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0) when a company has migrated from Budget Modifications to Budget Changes. New companies created today have Budget Changes enabled and no longer see the Budget Modifications feature.

Budget Changes represent changes to a Project's Budget that can be workflowed, created from Change Events, connected to existing Change Events, as well as integrated with an ERP system. For more detailed information on usage of the feature through the Procore Web Application, please visit [our support documentation on the Budget Changes feature](https://support.procore.com/product-releases/new-releases/budget-new-budget-changes-feature-for-change-management-in-project-financials).

Once Budget Changes are enabled for a Company, Budget Modifications are no longer available. This means the behavior of the Rest API for Budget Modifications changes, too. Integrators will continue to be able to use `GET` requests for individual and collections of Budget Modifications, but will receive a `405 - Method Not Allowed` response. This response will include an `Allow` header, detailing that `GET` is the only acceptable method, along with a message explaining that the API is no longer available once a Company has migrated to Budget Changes. Along with this, the Budget Modifications API will be sunset on October, 16th 2023.

As this feature is meant to extend the functionality of Budget Modifications, it is useful to know how Budget Changes relate to Budget Modifications. All of the original features available for Budget Modifications are available for Budget Changes. However the APIs do not behave similarly. This document is intended to provide a detailed explanation of how the Budget Modifications API, its request params and responses, correlate to the Budget Changes API.

## Audience

Any developer who has an application leveraging the [Budget Modifications Rest API](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0) can use this document as a guide in building an application that uses the Budget Changes API to perform similar actions in the domain of Budget Changes.

## Endpoints

### Quick Reference
* [List Endpoints](#list-apis)
* [Show Endpoints](#show-apis)
* [Creation Endpoints](#create-apis)
* [Update Endpoints](#update-apis)
* [Delete Endpoints](#delete-apis)

### [List Budget Modifications](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#list-budget-modifications) and [List Budget Change Summaries](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#list-budget-change-summaries) {#list-apis}

The List Budget Modifications API returns a list of objects representing Budget Modifications that have been created. A major difference between this list endpoint and the list endpoint for Budget Changes is the objects returned contain summarized information about a Budget Change and the Adjustments made for it. The endpoint is called `List Budget Change Summaries` because it tells you the information about the Budget Change as a whole: the title, description, number, status, how many Change Event Line Items are associated with it, and the total amount of changes from Adjustments. As well, we include an `erp_status` field to indicate whether or not the Budget Change has been sent to or synced with ERP.

This endpoint behaves similarly to [Potential Change Orders List](https://developers.procore.com/reference/rest/v1/change-order-packages?version=1.0#list-change-order-packages), [Change Order Packages List](https://developers.procore.com/reference/rest/v1/change-order-packages?version=1.0#list-change-order-packages), and [Purchase Order Contracts List](https://developers.procore.com/reference/rest/v1/purchase-order-contracts?version=1.0#list-of-purchase-order-contracts), to give a few examples. The [Budget Changes Show endpoint](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#get-information-of-a-budget-change) must be used to get the list of Adjustment Line Items or Production Quantities from Budget Changes.

### [Show Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#show-budget-modification) and [Get Information of a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#get-information-of-a-budget-change) {#show-apis}

In the Budget Changes API, Budget Modifications are analogous to the `adjustment_line_items` that are returned by the [Get Information of a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#get-information-of-a-budget-change) API endpoint. This `adjustment_line_items` field is also returned in the successful responses from [Create a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#create-a-budget-change) and [Update Information of a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#update-information-of-a-budget-change). Let's look at an Adjustment Line Item object and see how it connects with the information provided by the [Show Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#show-budget-modification) and [List Budget Modifications](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#list-budget-modifications) endpoints.

#### Example

**Budget Modification Object**
```
{
  "id": 75414,
  "created_at": "2016-10-23T21:39:40Z",
  "from_budget_line_item_id": 348383,
  "notes": "Transfer money for extra concrete.",
  "origin_data": "OD-3483830-2",
  "origin_id": 4903400,
  "to_budget_line_item_id": 4034034,
  "transfer_amount": "4500.0",
  "updated_at": "2016-11-23T21:39:40Z"
}
```
**Budget Change Adjustment Line Item Object**
* Found in `data` > `adjustment_line_items` from [Get Information of a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#get-information-of-a-budget-change) API endpoint


```
{
  "id": 56,
  "ref": "item56",
  "adjustment_number": 5,
  "wbs_code": {
    "id": 999,
    "flat_code": "01-011.CT1",
    "description": "Project Engineer.Cost Type 1"
  },
  "description": "Foobar",
  "comment": "Baz",
  "calculation_strategy": "manual",
  "quantity": 1,
  "type": "change_event",
  "uom": "Ea",
  "unit_cost": 30.5,
  "amount": 76.25,
  "change_event_line_item_id": 78
}
```


| Budget Modification Field | Description | Budget Change Adjustment Line Item Field | Description
|---|---|---|---|
| `id` | Identifier of the Budget Modification Record | `id` | Identifier of Adjustment Line Item |
| `from_budget_line_item_id` | ID of the Budget Line Item from which the Budget Modification is withdrawing | `wbs_code` | This attribute on Adjustment Line Items with type `budget_change` indicates the WBS Code from which the Adjustment is withdrawing |
| | The WBS Code of the `From` Budget Line Item is used to set the `wbs_code_id` of the Adjustment Line Item when migrating from Budget Modifications to Budget Changes | | |
| `to_budget_line_item_id` | ID of the Budget Line Item from which the Budget Modification is being credited | `wbs_code` | This attribute on Adjustment Line Items with type `change_event` indicates the WBS Code for which the Adjustment is being credited |
| | The WBS Code of the `To` Budget Line Item is used to set the wbs_code_id of the Adjustment Line Item when migrating from Budget Modifications to Budget Changes | | |
| `notes` | Field for entering information about a Budget Modification | `description` | Field for entering a custom description of an adjustment |
| | | `comment` | Field for entering a comment about an adjustment |
| `transfer_amount` | Amount being transferred from one Budget Line Item to another | `amount` | Amount being withdrawn or credited for the Adjustment Line Item |
| `updated_at` | Timestamp of when the Budget Modification was last updated | N/A | These fields are not present in Adjustment Line Item response object |
| `created_at` | Creation timestamp for Budget Modification | | |
| `origin_data` | Connects a Budget Modification entity to an external resource | | |
| `origin_id` | Connects a Budget Modification entity to an external resource | | |
| N/A | These fields are not present in Budget Modifications response object | `type` | Type of the Adjustment Line Item. Type can be `change_event` or `budget_change`. |
| | | | Lines of type `change_event` can have associated Change Event Line Items. |
| | | | When migrating from Budget Modifications to Budget Changes, the Change Event associated with a Budget Modification will be associated to an Adjustment Line Item of type `change_event` |
| | | `ref` | Reference to Adjustment Line Item record during creation |
| | | `adjustment_number` | Field used to group Adjustment Line Items together |
| | | `calculation_strategy` | Determines if the Adjustment Line Item amount is derived from unit cost and quantity or manually entered. |
| | | `quantity` | Value used to calculated amount of an Adjustment Line Item |
| | | `unit_cost` | Value used to calculated amount of an Adjustment Line Item |
| | | `uom` | Unit of Measure for an Adjustment Line Item |
| | | `change_event_line_item_id` | ID of associated Change Event Line Item record for Adjustment Line Item

### [Create Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#create-budget-modification) and [Create a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#create-a-budget-change) {#create-apis}

Once a company has migrated to Budget Changes from the Budget Modifications experience, the [Create Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#create-budget-modification) endpoint will return 405 error responses with an `Allow` header dictating that the only allowed HTTP method is `GET`. To translate a Budget Modification creation to a Budget Change creation, we use the [Create a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#create-a-budget-change) endpoint with a request body that nests the Budget Modification information as an object under an `adjustment_line_items` attribute.

### Example Request Body
```json
{
  "number": 10,
  "status": "draft",
  "title": "Equipment",
  "description": "example description",
  "adjustment_line_items": [
    {
      "ref": "item56",
      "adjustment_number": 5,
      "wbs_code_id": 56,
      "description": "Foobar",
      "comment": "Baz",
      "calculation_strategy": "manual",
      "quantity": 1,
      "type": "change_event",
      "uom": "Ea",
      "unit_cost": 500,
      "amount": 500,
      "change_event_line_item_id": 860001
    }
  ]
}
```

If attempting to create a Budget Change with adjustments that correlate to a Budget Modification, ensure the WBS Code ID of the `To` Budget Line Item for a Budget Modification maps to an Adjustment Line Item with type `change_event` and the WBS Code ID for the `From` Budget Line Item maps to an Adjustment Line Item of type `budget_change`.

**Example Budget Modification**
* Request Body:

```json
{
  "budget_modification": {
      "to_budget_line_item_id": 1, // WBS Code for "To" Budget Line Item is 2
      "from_budget_line_item_id": 2, // WBS Code for "From" Budget Line Item is 4
      "notes": "Transfer money for extra concrete.",
      "transfer_amount": "4500.0"
    }
}
```

**Example Budget Change Creation**
* Amount is split between a positive amount and a negative amount on the two Adjustment Line Item records to represent each side of the Budget Modification.
* Request Body

```json
{
  "number": 10,
  "status": "draft",
  "title": "Equipment",
  "description": "Example description",
  "adjustment_line_items": [
    {
      "ref": "item1",
      "adjustment_number": 1,
      "wbs_code_id": 2, // Same WBS Code as "To" Budget Line Item above
      "type": "change_event",
      "amount": 4500
    },
    {
      "ref": "item2",
      "adjustment_number": 1,
      "wbs_code_id": 4, // Same WBS Code as "From" Budget Line Item above
      "type": "budget_change",
      "amount": -4500
    }
  ]
}
```

In this case, `number`, `title`, `status`, and `description` are attributes of the Budget Change object, which is a holder for `adjustment_line_items`. The fields in Adjustment Line Items are described above in the [Show Budget Modification](#show-apis) section and can be used to create a Budget Modification as a Budget Change Adjustment Line Item.

### [Update Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#update-budget-modification) and [Update information of a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#update-information-of-a-budget-change) {#update-apis}

Similarly to the [Create Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#create-budget-modification) endpoint, the [Update Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#update-budget-modification) endpoint also will return a `405 - Method not Allowed` response with an `Allow` header describing that `GET` is the only allowed method.

The [Update information of a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#update-information-of-a-budget-change) endpoint behaves similarly to the [Create a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#create-a-budget-change) endpoint, where the request body is almost exactly the same with the exception of an `id` attribute for the Adjustment Line Items in a Budget Change, as well as an `id` attribute alongside other `Budget Change` attributes like `title` and `status`. All fields are not required for updates, only `id` and the attribute or attributes that need to be updated.

#### Example Request Body to update the amount of an Adjustment Line Item

```json
{
  "id": 1,
  "adjustment_line_items": [
    {
      "id": 1,
      "amount": 500,
    }
  ]
}
```

#### Deleting Adjustments
The [Update information of a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#update-information-of-a-budget-change) endpoint can also be used to delete Adjustment Line Items. Passing an optional `_delete` flag with a boolean value will cause the Adjustment Line Item to be deleted.

**Example Request Body to delete an Adjustment Line Item**

```json
{
  "id": 1,
  "adjustment_line_items": [
    {
      "id": 1,
      "_delete": true,
    }
  ]
}
```

### [Delete Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#delete-budget-modification) and [Delete a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#update-information-of-a-budget-change) {#delete-apis}

Similarly to the [Create Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#create-budget-modification) endpoint and the [Update Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#update-budget-modification) endpoints, the [Delete Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#delete-budget-modification) also will return a `405 - Method not Allowed` response with an `Allow` header describing that `GET` is the only allowed method.

The key difference between the [Delete Budget Modification](https://developers.procore.com/reference/rest/v1/budget-modifications?version=1.0#delete-budget-modification) endpoint and the [Delete a Budget Change](https://developers.procore.com/reference/rest/v1/budget-change?version=1.0#update-information-of-a-budget-change) endpoint is that the Budget Modification endpoint deletes the entities that have an amount, namely the `transfer_amount`. The Budget Changes endpoint will delete a holder and all of its Adjustment Line Items and Production Quantities. It would more than likely be deleting multiple Adjustment Line Items, which are the analog to Budget Modification records in Budget Changes. In order to delete individual Adjustment Line Items and not an entire Budget Change, we pass a `_delete` flag to an `adjustment_line_item` object as described [above](#deleting-adjustments).

To delete a Budget Modification, we use the endpoint with the Budget Modification ID in the path:

```
DELETE /rest/v1.0/projects/{project_id}/budget_modifications/{id}
```

The Budget Changes API behaves almost exactly the same way, with the Budget Change ID being provided in the path:

```
DELETE /rest/v1.0/projects/{project_id}/budget_changes/{id}
```