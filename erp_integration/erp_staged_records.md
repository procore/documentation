---
permalink: /erp-staged-records-details
title: ERP Integration Staged Records Developer Guide
layout: default
section_title: ERP Integration

---

## Context

For an ERP object to be imported into Procore, records must be staged in the ERP Integration tool where an accountant can review and approve records for import. 
Integrators can use the publicly accessible [**Staged Records API**](https://developers.procore.com/reference/rest/v1/erp-staged-record).

## Configuration

Procore utilizes the ERP metadata to determine whether or not an ERP Integration uses Staged Records instead of the legacy endpoints (`erp_vendors`, `erp_jobs`, etc).
Staged Records functionality is enabled/disabled at the entity type level. 
To enable Staged Records for an entity, add the following field to the ERP metadata.:

```json
{
  "settings": {
    "entities": {
      "vendors": {
        "configs": {
          "staged_records": {
            "enabled": true
          }
        }
      }
    }
  }
}
```

## Procore Type

When integrators use the Staged Records API to fetch/create/sync Staged Records, they must supply an **item_type**.
The table below enumerates all Procore Object Types the Staged Records API supports, along with the **item_type** to provide when using the API.

| Procore Type            | API Item Type           | Procore Entity Level | Child Entity |
|-------------------------|----------------------|----------------------|--------------|
| Vendor                  | vendor                  | Company              | no           |
| Project              | project                 | Company              | no           |
| Sub Job              | sub_job                 | Project              | no           |
| Prime Contract          | prime_contract          | Project              | no           |
| Purchase Order Contract | purchase_order_contract | Project              | no           |
| Work Order Contract  | work_order_contract     | Project              | no           |
| Change Order         | commitment_change_order | Commitment           | no           |
| Line Item            | line_item               | N/A                  | yes          |


# Staged Records API Details

The following sections provide **important** details related to creating/updating/syncing/deleting Staged Records. 
Information about how Staged Records are imported is also included. 
It is advised to read through the following sections to be familiar with the nuances of the Staged Records API and Import process.

## Staged Records Statuses

Staged Records can have the following statuses: `archived, imported, invalid, staged`.

There are a few **important** details about a Staged Record's status and how status transitions affect the Staged Record and their children (if applicable).

1. When a Staged Record is imported into Procore, the Staged Record and any children automatically get updated to have the status of `imported`.
2. To prevent a record from being displayed on the Ready to Import page the Integrator can mark the Staged Record as `archived`.
3. When transitioning a Staged Record from status `[archived, imported, invalid] -> staged` all children records will be automatically updated to `staged` **except** those that are `archived`. This functionality allows an Integrator to only need to interact with the parent Staged Record's status.
4. When using the [**Status Management API**](https://developers.procore.com/reference/rest/v1/erp-status-management) to unlink a previously imported Staged Record, the Staged Record and any children will be updated to have status `staged`. This will allow them to be re-importable.

## Ready to Import Page

The ERP tool has a page to view Ready to Import Staged Records. 
There are a few details to keep in mind when staging records for import.

1. All records must have status `staged` to be displayed. The only exception is described in pt 4.
2. For Project-Level item types, only Staged Records that belong to a **synced** Project will be displayed.
3. For Commitment-Level item types, only Staged Records that belong to a **synced** Project and **synced** Commitment will be displayed.
4. Depending on the ERP Integration, Prime Contracts can be re-imported. In this case, the Prime Contract can be re-imported if it is marked as `imported`.

## Staging Project-Level Item Types

When creating Staged Records via the API for the item types below, it is **required** to include information about which Project the Staged Record belongs to.

**Item Types:** `commitment_change_order, prime_contract, purchase_order_contract, sub_job, work_order_contract`

The payload **must** include `project_origin_id`  nested inside the `data` attribute. 
This `project_origin_id` must reference the `origin_id` of either a staged or synced Project.

**Note:** The `parent_id` field is used for a different purpose and will be explain further below.

### API Payload Example:
```json
Payload format accepted by the following endpoints:

POST  /staged_records
PUT   /staged_records/:id
PATCH /staged_records/sync
        
{
    "item_type": "sub_job",
    "origin_id": "123 Origin Id",
    "origin_code": "CODE-123",
    "origin_data": "{}",
    "parent_id": null,
    "status": "staged",
    "data": {
      "project_origin_id": "456_Project_Origin_Id"
    },
  }
```

## Staging Commitment-Level Item Types

In addition to being a Project-level item type, `commitment_change_order` must also belong to a `purchase_order_contract` or a `work_order_contract`.

The payload **must** include `project_origin_id` **and** `commitment_origin_id` nested inside the `data` attribute. 
This `commitment_origin_id` must reference the `origin_id` of either a staged or synced Purchase Order Contract/Work Order Contract.

### API Payload Example:
```json
Payload format accepted by the following endpoints:

POST  /staged_records
PUT   /staged_records/:id
PATCH /staged_records/sync
        
{
    "item_type": "commitment_change_order",
    "origin_id": "123 Origin Id",
    "origin_code": "CODE-123",
    "origin_data": "{}",
    "parent_id": null,
    "status": "staged",
    "data": {
      "project_origin_id": "456_Project_Origin_Id",
      "commitment_origin_id": "789_Commitment_Origin_Id"
    },
  }
```

## Staging Children Item Types

Currently, the only supported child item type is `line_item`. 
The `parent_id` attribute connects the children to a parent Staged Record.

Line Items can **only** belong to a Staged Record of the following type:
`commitment_change_order, prime_contract, purchase_order_contract, work_order_contract`

When creating a child Staged Record, you **must** provide either the `parent_id` or `parent_origin_id` key. 
If you use `parent_id` it must be the ID of the parent Staged Record. 
If you provide `parent_origin_id`, it must be the `origin_id` of the parent Staged Record.

**Note:** If a single API call is used to create both the parent and children entities via the `/staged_records/sync` API endpoint, then the integrator **must** use the `parent_origin_id` key. 
This is because the parent record has not been created yet and so there is no `parent_id`.

### API Payload Example:
```json
PATCH /staged_records/sync

{
  "updates": [
    {
      "item_type": "purchase_order_contract",
      "origin_id": "Parent_Origin_Id",
      ...
    },
    {
      "item_type": "line_item",
      "origin_id": "456 Origin Id",
      "origin_code": "CODE-456",
      "origin_data": "{}",
      "status": "staged",
      "parent_origin_id": "Parent_Origin_Id",
      "data": {
        "amount": "1000.0"
      }
    }
  ]
}
```

### Nested Children Payload (only `/sync` endpoint):

This payload format allows you to create staged children records by nesting their attributes under the `children` attribute of the parent Staged Record.

When the parent Staged Record is created, the resulting ID will automatically be assigned to the children when they are created.

**Note:** When using this payload format it is okay to omit the `parent_id` / `parent_origin_id` key from the children attributes.

```json
Payload accepted only by the following endpoints:

PATCH /staged_records/sync

{
  "item_type": "purchase_order_contract",
  "origin_id": "123 Origin Id",
  ...
  "children": [
    {
      "item_type": "line_item",
      "origin_id": "456 Origin Id",
      "origin_code": "CODE-456",
      "origin_data": "{}",
      "status": "staged",
      "data": {
        "amount": "1000.0"
      }
    }
  ]
}
```

## Origin ID Translation During Import

When importing a Staged Record and children Staged Records, our import process will translate Origin IDs to Procore Item IDs. 
This allows the Integrator to stage records using their ERP systems unique identifier instead of providing the Procore IDs.

During the Import process, the fields below will be translated from the Origin ID field to the Procore ID field automatically, as long as a Procore Item exists with the `origin_id` provided.

**Note:** For fields marked as **required**, either the `xyz_origin_id` or `xyz_id` field must be staged for the import to succeed.

| API Item Type                                    | Origin ID Field                  | Procore ID Field           | Required | Note                                                                              |
|--------------------------------------------------|----------------------------------|----------------------------|----------|-----------------------------------------------------------------------------------|
| `vendor`                                         | `vendor_type_origin_id`          | `vendor_type_id`           | no       |                                                                                   |
| `sub_job`                                        | `project_origin_id`              | `project_id`               | yes      |                                                                                   |
| `purchase_order_contract`, `work_order_contract` | `project_origin_id`              | `project_id`               | yes      |                                                                                   |
|                                                  | `vendor_origin_id`               | `vendor_id`                | yes      |                                                                                   |
| `commitment_change_order`                        |                                  |                            |          |                                                                                   |
|                                                  | `project_origin_id`              | `project_id`               | yes      |                                                                                   |
|                                                  | `commitment_origin_id`           | `commitment_id`            | yes      | the key is agnostic of contract type                                              |
| `line_item`                                      | `cost_code_origin_id`            | `cost_code_id`             | yes      |                                                                                   |
|                                                  | `line_item_type_origin_id`       | `line_item_type_id`        | yes      |                                                                                   |
|                                                  | `tax_code_origin_id`             | `tax_code_id`              | no       |                                                                                   |
|                                                  | `commitment_line_item_origin_id` | `commitment_line_item_id`  | yes      | only applicable for line items that belong to item type `commitment_change_order` |
