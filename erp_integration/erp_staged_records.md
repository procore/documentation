---
permalink: /erp-staged-records-details
title: ERP Integration Staged Records Developer Guide
layout: default
section_title: ERP Integration

---

# Context

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

## Supported Fields
When a Staged Record is imported, we translate the `data` attributes to the appropriate Procore fields when creating a Procore Object. Below you find examples of the supported fields for each item type.

- [Vendor](#vendor)
- [Project](#project)
- [Sub Job](#sub-job)
- [Prime Contract](#prime-contract)
- [Prime Contract Line Item](#prime-contract-line-item)
- [Commitment](#commitment)
- [Commitment Item](#commitment-item)
- [Commitment Change Order](#commitment-change-order)
- [Commitment Change Order Line Item](#commitment-change-order-line-item)

### Vendor
```
{
    item_type: 'vendor',
    origin_id: 'origin_id',
    origin_code: 'origin_code',
    origin_data: { 'field' => 'data' },
    parent_id: null,
    data: {
        zip: '12345',
        city: 'SD',
        name: 'Infinite Loop',
        notes: '',
        address: 'abc',
        website: 'google.com',
        is_active: true,
        fax_number: '1234567890',
        state_code: 'CA',
        bidding_cbe: false,
        labor_union: '',
        country_code: nil,
        mobile_phone: '1234567890',
        prequalified: false,
        union_member: '1',
        email_address: 'example@email.com',
        bidding_mbe_8a: false,
        business_phone: '1234567890',
        license_number: 'dfg',
        bidding_mbe_abe: false,
        bidding_mbe_dbe: false,
        bidding_mbe_hbe: false,
        bidding_mbe_hub: false,
        bidding_mbe_mbe: false,
        bidding_mbe_sbe: false,
        bidding_mbe_wbe: false,
        vendor_group_id: 123,
        abbreviated_name: 'abb',
        bidding_mbe_aabe: false,
        bidding_mbe_nabe: false,
        authorized_bidder: 'xxx',
        bidding_mbe_sdvosb: false,
        non_union_prevailing_wage: false,
        bidding_affirmative_action: false
    }
}
```

### Project
```
{
    item_type: 'project',
    origin_id: 'origin_id',
    origin_code: 'origin_code',
    origin_data: { 'field' => 'data' },
    parent_id: null,
    data: {
        accounting_project_number: 'Accounting #',
        address: '123 CorePro Way',
        city: 'Carpenteria',
        country_code: 'US',
        description: 'Staged Project Description',
        estimated_completion_date: '2021-05-09',
        customer_origin_id: 'customer_origin_id',
        estimated_start_date: '2021-04-09',
        estimated_value: 10000,
        flag: 'Green',
        image_id: 123,
        from_project_template_id: 124,
        name: 'Staged Project',
        office_id: 125,
        parent_job_id: 126,
        phone: '123-456-7890',
        program_id: 127,
        project_number: '01',
        project_bid_type_id: 128,
        project_type_id: 129,
        project_owner_type_id: 130,
        project_region_id: nil,
        public_notes: 'notes',
        square_feet: 1000,
        state_code: 'CA',
        store_number: 131,
        template: false,
        warranty_end_date: '2021-04-09',
        warranty_start_date: '2021-04-09',
        zip: '12345',
        department_ids: []
    }
}
```

### Sub Job
```
{
    item_type: 'sub_job',
    origin_id: 'origin_id',
    origin_code: 'origin_code',
    origin_data: { 'field' => 'data' },
    parent_id: null,
    data: {
        name: 'Sub Job 1',
        code: 'SJ1',
        project_id: 123,
        project_origin_id: 'project_origin_id'
    }
}
```

### Prime Contract
```
{
    item_type: 'prime_contract',
    origin_id: 'origin_id',
    origin_code: 'origin_code',
    origin_data: { 'field' => 'data' },
    parent_id: null,
    data: {
        accounting_method: 'unit | amount',
        actual_completion_date: '2021-04-18',
        allow_markups: true,
        contract_estimated_completion_date: '2021-04-09',
        contract_start_date: '2021-01-01',
        description: 'Prime Contract description',
        exclusions: 'Exclude me.',
        executed: true,
        inclusions: 'Include me.',
        number: 'PC5',
        private: true,
        project_id: 123,
        project_origin_id: 'project_origin_id',
        retainage_percent: 4.25,
        signed_contract_received_date: '2021-04-30',
        status: 'Approved',
        title: 'Prime Contract 5'
    }
}
```

### Prime Contract Line Item
```
{
    item_type: 'line_item',
    origin_id: 'origin_id',
    origin_code: 'origin_code',
    origin_data: { 'field' => 'data' },
    parent_id: 'staged_prime_contract.id',
    data: {
        amount: 12.34,
        description: 'Line Item description',
        position: 1,
        quantity: 5.6,
        unit_cost: 7.89,
        uom: 'Ea',
        cost_code_id: 3,
        cost_code_origin_id: 'cost_code_origin_id',
        line_item_type_id: 4,
        line_item_type_origin_id: 'line_item_type_origin_id',
        tax_code_id: 2,
        tax_code_origin_id: 'tax_code_origin_id'
    }
}
```

### Commitment
```
{
    item_type: 'purchase_order_contract | work_order_contract',
    origin_id: 'origin_id',
    origin_code: 'origin_code',
    origin_data: { 'field' => 'data' },
    parent_id: null,
    data: {
        description: 'desc',
        executed: true,
        number: 1,
        private: false,
        project_id: 123,
        project_origin_id: 'project_origin_id',
        retainage_percent: 0.0,
        show_line_items_to_non_admins: false,
        status: 'Approved',
        title: 'Contract Title',
        vendor_id: 345,
        vendor_origin_id: 'vendor_origin_id',
    }
}
```


### Commitment Item
```
{
    item_type: 'line_item',
    origin_id: 'origin_id',
    origin_code: 'origin_code',
    origin_data: { 'field' => 'data' },
    parent_id: 'staged_commitment.id',
    data: {
        amount: 12.34,
        description: 'Line Item description',
        position: 1,
        quantity: 5.6,
        unit_cost: 7.89,
        uom: 'Ea',
        cost_code_id: 3,
        cost_code_origin_id: 'cost_code_origin_id',
        line_item_type_id: 4,
        line_item_type_origin_id: 'line_item_type_origin_id',
        tax_code_id: 2,
        tax_code_origin_id: 'tax_code_origin_id'
    }
}
```

### Commitment Change Order
```
{
    item_type: 'commitment_change_order',
    origin_id: 'origin_id',
    origin_code: 'origin_code',
    origin_data: { 'field' => 'data' },
    parent_id: null,
    status: 'staged',
    data: {
        commitment_origin_id: 123,
        title: 'CCO title',
        description: 'CCO description',
        number: '100'
    }
}
```

### Commitment Change Order Line Item
```
{
    item_type: 'line_item',
    origin_id: 'origin_id',
    origin_code: 'origin_code',
    origin_data: { 'field' => 'data' },
    parent_id: 'staged_commitment_change_order.id',
    status: 'staged',
    data: {
        amount:                          1500,
        commitment_line_item_id:         123,
        commitment_line_item_origin_id:  'commitment_line_item_origin_id',
        cost_code_id:                    222,
        cost_code_origin_id:             'cost_code_origin_id',
        description:                     'Line Item 1',
        line_item_type_id:               333,
        line_item_type_origin_id:        'line_item_type_origin_id',
        quantity:                        2.0,
        tax_code_id:                     234,
        tax_code_origin_id:              'tax_code_origin_id',
        unit_cost:                       15,
        uom:                             'ea'
    }
}
```
