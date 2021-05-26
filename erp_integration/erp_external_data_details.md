---
permalink: /erp-external-data-details
title: ERP Integration External Data Developer Guide
layout: default
section_title: ERP Integration

---

## Context

Whether Procore Objects are exported from Procore or imported from an external system, every synced Procore Object has an associated External Data record.
These External Data records map the Procore ID of the Procore Object to the Third-party ID of the Object in the external system, and they can also be used to store additional information related to the Object that integrators may find useful.
Integrators can use the publicly accessible [**External Data API**](https://developers.procore.com/reference/rest/v1/external-data) to fetch and sync External Data records.

## Procore Type

When integrators use the External Data API to fetch or sync External Data records, they must supply an **item_type** corresponding to the type of the Procore Object associated with the External Data record(s).
The table below enumerates all Procore Object Types the External Data API supports, along with the **item_type** to provide when using the API.

| Procore Type | API Item Type |
| ------------ | ------------- |
| Change Order | change_order |
| Contract Payment | contract_payment |
| Cost Code | cost_code |
| Department | department |
| Direct Cost Item | item |
| ERP Budget | budget |
| Insurance | insurance |
| Invoice Payment | invoice_payment |
| Line Item | line_item |
| Line Item Type | line_item_type |
| Markup | markup |
| Payment Application | payment_application |
| Prime Contract | prime_contract |
| Project | project |
| Purchase Order Contract | purchase_order_contract |
| Requisition | requisition |
| Requisition Change Order Item | requisition_change_order_item |
| Requisition Contract Detail Item | requisition_contract_detail_item |
| Requisition Contract Item | requisition_contract_item |
| Standard Cost Code | standard_cost_code |
| Sub Job | sub_job |
| Tax Code | tax_code |
| Vendor | vendor |
| Work Order Contract | work_order_contract |
