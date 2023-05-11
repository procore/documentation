---
permalink: /erp-events-dictionary
title: ERP Events Dictionary
layout: default
section_title: ERP Integration

---

## Context

The ERP Platform is events-driven. This means that, as an integrator, you will receive events for every action that requires communication with the ERP accounting system. You will also receive events when ERP data is mutated by user actions in Procore. Below are a few examples of the sort of actions that may produce events.

- Approving a staged record (e.g. **create_job_in_procore**)
- Unlinking a synced record (e.g. **unlink_vendor**)
- Exporting an unsynced record (e.g. **create_commitment**)
- Staging records from the ERP System (e.g. **sync_sub_jobs**)

The event notification payload can be found [here]({{ site.url }}{{ site.baseurl }}{% link webhooks/webhooks_api.md %}).
The main property to be aware of is **resource_id**, which is the ERP Request ID. As a system integrator, you are responsible for fetching event payloads from the [ERP Requests Show](https://developers.procore.com/reference/rest/v1/erp-requests#show-erp-request) endpoint using the **resource_id** provided above.

---

## Standard Cost Codes

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**create_standard_cost_codes**](#create_standard_cost_codes) | No | Yes | A user exports a list of standard cost codes from the Std. Cost Codes & Cost Types tab in Procore's ERP Integration tool. |
| [**delete_standard_cost_codes**](#delete_standard_cost_codes) | Yes | No | An ERP support representative, at the request of the customer, uses Super User access to delete standard cost codes. |
| [**sync_standard_cost_codes**](#sync_standard_cost_codes) | No | Yes | A user initiates a sync of standard cost codes and cost types on the Std. Cost Codes & Cost Types tab in Procore's ERP Integration tool. |
| [**unlink_standard_cost_codes**](#unlink_standard_cost_codes) | Yes | No | An ERP support representative, at the request of the customer, uses Super User access to unlink standard cost codes. |

<br>

### create_standard_cost_codes  
**Event Payload:**
```
{
  "request_name": "create_standard_cost_codes",
  "request_data": [{
    "id": 2,
    "standard_cost_code_list_id": 1,
    "origin_id": null,
    "parent_id": 1,
    "code": "100",
    "full_code": "01-100",
    "name": "Pvmt Repair/Sealing",
    "origin_data": null,
    "parent_origin_id": "scc_parent_origin_id",
    "long_name_helper": [["01", "100"], ["Parent Code", "Child Code"]],
    "erp_custom_fields": {
      "income_account_origin_id": "income_account_origin_id",
      "expense_account_origin_id": "expense_account_origin_id"
    },
    "request_detail_id": 1
  }]
}
```
**Required Actions:**
To close out this event, integrators need to send the third-party **origin_id** for each standard cost code to Procore, so that Procore knows the entity is synced. You can do this for a batch of standard cost codes using the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint. Integrators also need to close out the **request_detail_id** associated with each exported standard cost code. These can be updated one-by-one or in bulk using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

### delete_standard_cost_codes
**Event Payload:**
```
{
  "request_name": "delete_standard_cost_codes",
  "request_data": {
    "standard_cost_code_list_id": 2,
    "standard_cost_code_data_array": [{
      "id": 1,
      "sortable_code": "01-100",
      "origin_id": "scc_origin_id"
    }]
  }
}
```
**Required Actions:**
There are no required actions for this event. If any standard cost code data has been cached in the microservice, the integrator can use the information provided to clean up their local cache.

### sync_standard_cost_codes
**Event Payload:**
```
{
  "request_name": "sync_standard_cost_codes",
  "request_data": {
   "standard_cost_code_list_id": 123,
   "request_detail_id": 1
  }
}
```
**Required Actions:**
To close out this event, the integrator should send standard cost codes from the ERP system to Procore using the [Standard Cost Codes Sync](https://developers.procore.com/reference/rest/v1/cost-codes?version=1.0#sync-standard-cost-codes) endpoint. Note that you are hitting a Procore endpoint rather than the ERP Staged Records endpoint because the ERP Platform does not support staging standard cost codes and cost types. Integrators also need to close out the **request_detail_id** associated with the sync request using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

### unlink_standard_cost_codes
**Event Payload:**
```
{
  "request_name": "unlink_standard_cost_codes",
  "request_data": {
    "standard_cost_codes": [{
      "id": 1,
      "sortable_code": "01-100",
      "origin_id": "scc_origin_id"
    }]
  }
}
```
**Required Actions:**
There are no required actions for this event. If any standard cost code data has been cached in the microservice, the integrator can use the information provided to clean up their local cache.

---

## Standard Categories (Cost Types/Line Item Types)

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**delete_standard_categories**](#delete_standard_categories) | Yes | No | An ERP support representative, at the request of the customer, uses Super User access to delete standard categories. |
| [**sync_standard_categories**](#sync_standard_categories) | No | Yes | A user presses the button to sync standard cost codes and cost types on the Std. Cost Codes & Cost Types tab in Procore's ERP Integration tool. |

<br>

### delete_standard_categories
**Event Payload:**
```
{
  "request_name": "delete_standard_categories",
  "request_data": {
    "standard_category_data_array": [{
      "procore_id": 1,
      "code": "O",
      "origin_id": "standard_category_origin_id"
    }]
  }
}
```
**Required Actions:**
There are no required actions for this event. If any standard category data has been cached in the microservice, the integrator can use the information provided to clean up their local cache.

### sync_standard_categories
**Event Payload:**
```
{
  "request_name": "sync_standard_categories",
  "request_data": {}
}
```
**Required Actions:**
To close out this event, the integrator should send any standard categories retrieved from the ERP system back to Procore via the [Line Item Types Sync](https://developers.procore.com/reference/rest/v1/line-item-types-cost-types?version=1.0#sync-line-item-types) endpoint. Note that there is no **request_detail_id** associated with this sync request, unlike standard cost codes and other syncable entities.

---

## Vendors

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**create_vendor**](#create_vendor) | No | Yes | A user exports a vendor from Procore to the ERP System. |
| [**create_vendor_in_procore**](#create_vendor_in_procore) | No | No | A user imports a staged vendor in the ERP Integration Tool. |
| [**link_all_vendors**](#link_all_vendors) | No | No | A user links multiple ERP vendors to Procore vendors in the ERP Tab. |
| [**link_vendor**](#link_vendor) | No | No | A user links a vendor to a Procore vendor in the ERP Integration Tool. |
| [**merge_vendors**](#merge_vendors) | No | No | A user merges vendors using the Vendor Merge Tool. |
| [**sync_vendors**](#sync_vendors) | No | Yes | A user presses the Refresh Vendors List button in the ERP Tab in Procore. |
| [**unlink_vendor**](#unlink_vendor) | No | No | A user unlinks a vendor in the ERP Integration tool. |

<br>

### create_vendor
**Event Payload:**
```
{
  "request_name": "create_vendor",
  "request_data": {
    "vendor": {
      "id": 35,
      "name": "Test Vendor",
      "abbreviated_name": null,
      "address": "",
      "authorized_bidder": true,
      "business_phone": "",
      "city": "",
      "company": "Test Vendor",
      "country_code": "US",
      "created_at": "2020-07-10T19:41:59Z",
      "email_address": null,
      "fax_number": "",
      "is_active": true,
      "labor_union": null,
      "license_number": null,
      "logo": null,
      "mobile_phone": null,
      "non_union_prevailing_wage": false,
      "notes": null,
      "origin_code": "origin_code",
      "origin_data": null,
      "origin_id": null,
      "prequalified": false,
      "state_code": "",
      "synced_to_erp": false,
      "trade_name": "",
      "union_member": false,
      "updated_at": "2020-07-10T19:42:17Z",
      "website": null,
      "zip": "",
      "erp_custom_fields": {
        "vendor_type_origin_id": "vendor_type_origin_id"
      },
      "business_register": null,
      "primary_contact": null,
      "attachments": [],
      "vendor_group": null
    },
    "request_detail_id": 1,
    "company_id": 7
    }
  }
}
```
**Required Actions:**
To mark the vendor as exported, the integrator must send a third-party **origin_id** associated with the vendor back to Procore, so that Procore knows the vendor is synced. This can be done via the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint. Integrators also need to close out the **request_detail_id** associated with the create request, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

### create_vendor_in_procore
**Event Payload:**
```
{
  "request_name": "create_vendor_in_procore",
  "request_data": {
    "vendor": {
      "id": 32,
      "origin_id": "vendor_origin_id"
    },
    "company_id": 7
  }
}
```
**Required Actions:**
There are no required actions. Optionally, the integration can send any of the vendor's insurances to Procore via the [Company Vendor Insurances Sync](https://developers.procore.com/reference/rest/v1/company-vendor-insurances) endpoint.

### link_all_vendors
**Event Payload:**
```
{
  "request_name": "link_all_vendors",
  "request_data": {
    "vendors": [
      {
        "id": procore_vendor_id,
        "origin_id": "origin_id1"
      },
      {
        "id": procore_vendor_id,
        "origin_id": "origin_id2"
      }
    ],
    "company_id": 7
  }
}
```
**Required Actions:**
There are no required actions. Optionally, the integration can send any of the vendors' insurances to Procore via the [Company Vendor Insurances Sync](https://developers.procore.com/reference/rest/v1/company-vendor-insurances) endpoint.

### link_vendor
**Event Payload:**
```
{
  "request_name": "link_vendor",
  "request_data": {
    "vendor": {
      "id": 32,
      "origin_id": "vendor_origin_id"
    },
    "company_id": 7
  }
}
```
**Required Actions:**
There are no required actions. Optionally, the integration can send any of the vendor's insurances to Procore via the [Company Vendor Insurances Sync](https://developers.procore.com/reference/rest/v1/company-vendor-insurances) endpoint.

### merge_vendors
**Event Payload:**
```
{
  "request_name": "merge_vendors",
  "request_data": {
    "master_vendor": {
      "id": 1,
      "origin_id": "ABC"
    },
    "source_vendors": [
      {
        "id": 2,
        "origin_id": "DEF"
      }, ...
    ]
    "company_id": 7
  }
}
```
**Additional Info:**
The **master_vendor** contains the resulting vendor and its Procore/third-party identifiers. The **source_vendors** contains an array of all vendors that were merged into the master vendor. A source vendor's **origin_id** can be the same as the master vendor's **origin_id**, when a staged vendor is merged into another staged vendor and the source vendor was selected as the staged vendor on Step 2 of the Vendor Merge Tool. The **source_vendors** array can also be empty, when a non-ERP vendor is merged into an ERP vendor.  

**Required Actions:**
There are no required actions. Optionally, the ERP Integration can perform cleanup related to the vendors that were merged and no longer exist in Procore.

### sync_vendors
**Event Payload:**
```
{
  "request_name": "sync_vendors",
  "request_data": {
    "request_detail_id": 100,
    "company_id": 7
  }
}
```
**Required Actions:**
The integrator is responsible for staging any new vendors and updating any vendors in Procore that have already been synced. These actions can be performed using the sync endpoints for [ERP Staged Records](https://developers.procore.com/reference/rest/v1/erp-staged-record?version=1.0#sync-staged-record) and [Company Vendors](https://developers.procore.com/reference/rest/v1/company-vendors?version=1.0#sync-company-vendors). Integrators also need to close out the **request_detail_id** associated with the sync request, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

### unlink_vendor
**Event Payload:**
```
{
  "request_name": "unlink_vendor",
  "request_data": {
    "vendor": {
      "id": 32,
      "origin_id": "vendor_origin_id"
    },
    "company_id": 7
  }
}
```
**Required Actions:**
There are no required actions. Optionally, the ERP Integration can perform cleanup related to the vendor that was unlinked (i.e. unsynced) in Procore.

---

## Projects

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**create_job_in_procore**](#create_job_in_procore) | No | No | A user presses the Add to Procore button for a project in the ERP Integration Tool. |
| [**create_or_update_job**](#create_or_update_job) | No | Yes | A project is exported from Procore to the ERP System. |
| [**reset_job**](#reset_job) | Yes | No | An ERP support representative uses Super User access to reset a project at the request of a user. |
| [**sync_jobs**](#sync_jobs) | No | Yes | A user presses Refresh Job List button in the ERP Tab in Procore. |
| [**sync_single_job**](#sync_single_job) | No | No | Sent out periodically and notifies the integrator to send any updates related to a specific job to Procore. |

<br>

### create_job_in_procore
**Event Payload:**
```
{
  "request_name": "create_job_in_procore",
  "request_data": {
    "project": {
      "id": 8,
      "name": "AN-TSE - Ant Eaters Emporium",
      "origin_id": "a22abb3a-e4ac-4ce7-b6dd-ab5801126eab",
      "origin_data": null,
      "origin_code": "AN-TSE"
    },
    "company_id": 7
  }
}
```
**Required Actions:**
There are no required actions. Optionally, the ERP Integration can sync data related to the new project via the sync endpoints for [Cost Codes](https://developers.procore.com/reference/rest/v1/cost-codes?version=1.0#sync-cost-codes), [Line Item Type Assignments](https://developers.procore.com/reference/rest/v1/cost-code-line-item-types?version=1.0#sync-cost-code-line-item-type-assignments), and [ERP Job Costs](https://developers.procore.com/reference/rest/v1/erp-job-costs?version=1.0#sync-erp-job-costs).

### create_or_update_job
**Event Payload:**
```
{
  "request_name": "create_or_update_job"
  "request_data": {
    "job": {
      "id": 7,
      "name": "Test Project",
      "origin_id": null,
      "origin_data": null,
      "origin_code": "JOB-EXP",
      "erp_custom_fields": {},
      "address": "",
      "city": "",
      "state_code": "",
      "zip": "",
      "latitude": null,
      "longitude": null,
      "synced": false,
      "active": true
    },
    "all_cost_codes": [
      {
        "id": 1,
        "name": "GENERAL CONDITIONS",
        "full_code": "1",
        "origin_id": null,
        "origin_data": null,
        "biller": "Test Project",
        "biller_id": 7,
        "biller_type": "Project",
        "budgeted": false,
        "code": "1",
        "created_at": "2020-07-10T19:36:01Z",
        "deleted_at": null,
        "line_item_types": [],
        "parent": {
          "id": null
        },
        "position": null,
        "sortable_code": "1",
        "updated_at": "2020-07-10T19:36:01Z",
        "long_name_helper": [
          ["1"],
          ["GENERAL CONDITIONS"]
        ],
        "standard_cost_code_origin_id": "standard_cost_code_origin_id"
      },
      {
        "id": 2,
        "name": "Test SCC",
        "full_code": "1-001",
        "origin_id": null,
        "origin_data": null,
        "biller": "Test Project",
        "biller_id": 7,
        "biller_type": "Project",
        "budgeted": false,
        "code": "001",
        "created_at": "2020-07-10T19:36:01Z",
        "deleted_at": null,
        "line_item_types": [
          {
            "id": 9,
            "name": "Other",
            "code": "O",
            "base_type": null,
            "origin_id": "line_item_type_origin_id"
          }
        ],
        "parent": {
          "id": 1
        },
        "position": null,
        "sortable_code": "1-001",
        "updated_at": "2020-07-10T19:36:01Z",
        "long_name_helper": [
          ["1","001"],
          ["GENERAL CONDITIONS","Test SCC"]
        ],
        "standard_cost_code_origin_id": "standard_cost_code_origin_id"
      }
    ]
  },
  "request_detail_id": 2,
  "company_id": 7
}
```
**Required Actions:**
When the project has successfully exported to the ERP System, the integrator must pass back its third-party **origin_id** to Procore to mark the project as synced, via the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint, for both the project and cost codes. For the cost codes' line item type assignments, there is a separate [Line Item Type Assignments](https://developers.procore.com/reference/rest/v1/cost-code-line-item-types?version=1.0#sync-cost-code-line-item-type-assignments) endpoint that will be needed to set the synced flag to true. Whether the job is being updated or exported for the first time, the integration must close out the request detail once the project has been exported to the ERP System, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints. Any error messages included when closing out the request detail will be displayed to the user in the ERP Tab in Procore.

### reset_job
**Event Payload:**
```
{
  "request_name": 'reset_job',
  "request_data": {
    "project": {
      "id": 2,
      "name": "Big Skyscraper",
      "origin_data": nil,
      "origin_id": "project_origin_id"
    }
  }
}
```
**Additional Info:**
This will return the project and any related records (e.g. cost codes, sub jobs, prime contracts, commitments, change orders, etc.) to an unsynced state.  

**Required Actions:**
There are no required actions. If neccessary, the ERP Integration can clean up any related cached data for the job.

### sync_jobs
**Event Payload:**
```
{
  "request_name": "sync_jobs",
  "request_data": {
    "request_detail_id": 123,
    "company_id": 7
  }
}
```
**Required Actions:**
The integrator can use the Procore API to stage any new projects and update any projects that have already been synced, using the sync endpoints for [ERP Staged Records](https://developers.procore.com/reference/rest/v1/erp-staged-record?version=1.0#sync-staged-record) and [Projects](https://developers.procore.com/reference/rest/v1/projects?version=1.0#sync-projects). The event payload also contains a **request_detail_id** which the integrator must close out, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints. Any error messages included when closing out the request detail will be displayed to the user in the ERP Tab in Procore.

### sync_single_job
**Event Payload:**
```
{
  "request_name": "sync_single_job",
  "request_data": {
    "id": "project_origin_id",
    "additional_job_data": {
      "job_name": "Test Project",
      "procore_project_id": 7,
      "project_id": 893,
      "start_date": null,
      "job_cost_transactions_sync_enabled": false
    },
    "company_id": 7
  }
}
```
**Required Actions:**
There are no required actions. Optionally, the ERP Integration can update the project or its related financial data using the [Projects Update](https://developers.procore.com/reference/rest/v1/projects?version=1.0#update-project) endpoint or the sync endpoints for [Cost Codes](https://developers.procore.com/reference/rest/v1/cost-codes?version=1.0#sync-cost-codes), [Line Item Type Assignments](https://developers.procore.com/reference/rest/v1/cost-code-line-item-types?version=1.0#sync-cost-code-line-item-type-assignments), and [ERP Job Costs](https://developers.procore.com/reference/rest/v1/erp-job-costs?version=1.0#sync-erp-job-costs).

---

## Sub Jobs

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**create_sub_job**](#create_sub_job) | No | Yes | A sub job is exported from Procore to the ERP System. The event payload contains all the exported attributes. |
| [**create_sub_job_in_procore**](#create_sub_job_in_procore) | No | No | A user presses the Add to Procore button for a Sub Job in the ERP Integration Tool. |
| [**reset_sub_job**](#reset_sub_job) | Yes | No | An ERP support representative uses Super User access to reset a sub job at the request of the customer. |
| [**sync_sub_job**](#sync_sub_job) | No | No | Sent periodically and notifies the integrator to send any updates related to a specific sub job to Procore. |
| [**sync_sub_jobs**](#sync_sub_jobs) | No | Yes | A user presses the Refresh Sub Jobs button in the ERP Tab in Procore. |

<br>

### create_sub_job
**Event Payload:**
```
{
  "request_name": "create_sub_job",
  "request_data": {
    "sub_job": {
      "id": 1,
      "code": "SJ-XYZ",
      "created_at": "2020-07-10T20:08:09Z",
      "name": "Test Subjob",
      "origin_data": null,
      "origin_id": null,
      "updated_at": "2020-07-10T20:08:42Z",
      "synced": false,
      "project": {
        "id": 7,
        "name": "Test Project",
        "origin_id": "parent_project_origin_id",
        "origin_data": null,
        "origin_code": "JO-EXP"
      },
    },
    "all_cost_codes": [
      {
        "id": 32,
        "name": "GENERAL CONDITIONS",
        "full_code": "1",
        "origin_id": null,
        "origin_data": null,
        "biller": "Test Subjob",
        "biller_id": 1,
        "biller_type": "SubJob",
        "budgeted": false,
        "code": "1",
        "created_at": "2020-07-10T20:08:21Z",
        "deleted_at": null,
        "line_item_types": [],
        "parent": {
          "id": null
        },
        "position": null,
        "sortable_code": "1",
        "updated_at": "2020-07-10T20:08:21Z",
        "long_name_helper": [
          ["1"],
          ["GENERAL CONDITIONS"]
        ],
        "standard_cost_code_origin_id": "standard_cost_code_origin_id"
      },
      {
        "id": 33,
        "name": "Summary of Work",
        "full_code": "1-010",
        "origin_id": null,
        "origin_data": null,
        "biller": "Test Subjob",
        "biller_id": 1,
        "biller_type": "SubJob",
        "budgeted": false,
        "code": "010",
        "created_at": "2020-07-10T20:08:21Z",
        "deleted_at": null,
        "line_item_types": [
          {
            "id": 8,
            "name": "Equipment",
            "code": "E",
            "base_type": null,
            "origin_id": "line-item-type-origin-id"
          }
        ],
        "parent": {
          "id": 32
        },
        "position": null,
        "sortable_code": "1-010",
        "updated_at": "2020-07-10T20:08:21Z",
        "long_name_helper": [
          ["1","010"],
          ["GENERAL CONDITIONS","Summary of Work"]
        ],
        "standard_cost_code_origin_id": "standard_cost_code_origin_id"
      }
    ],
    "request_detail_id": 3,
    "company_id": 7
  }
}
```
**Required Actions:**
When the sub job has successfully exported to the ERP System, the integrator must pass back its third-party **origin_id** to Procore to mark the sub job as synced, via the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint, for both the project and cost codes. For the cost codes' line item type assignments, there is a separate [Line Item Type Assignments](https://developers.procore.com/reference/rest/v1/cost-code-line-item-types?version=1.0#sync-cost-code-line-item-type-assignments) endpoint that will be needed to set the synced flag to true. The integration must close out the request detail once the sub job has been exported to the ERP System, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints. Any error messages included when closing out the request detail will be displayed to the user in the ERP Tab in Procore.

### create_sub_job_in_procore
**Event Payload:**
```
{
  "request_name": "create_sub_job_in_procore"
  "request_data": {
    "sub_job": {
      "id": 2,
      "code": "SJ01",
      "created_at": "2020-07-10T20:23:27Z",
      "name": "Sub Job 1",
      "origin_data": null,
      "origin_id": "sub_job_origin_id",
      "updated_at": "2020-07-10T20:23:27Z",
      "synced": true,
      "project": {
        "id": 8,
        "name": "Parent of Sub Job",
        "origin_id": "sub_jobs_project_origin_id",
        "origin_data": null,
        "origin_code": "AN-TSE"
      }
    },
    "company_id": 7
  }
}
```
**Required Actions:**
There are no required actions. Optionally, the ERP Integration can sync data related to the new sub job via the sync endpoints for [Cost Codes](https://developers.procore.com/reference/rest/v1/cost-codes?version=1.0#sync-cost-codes), [Line Item Type Assignments](https://developers.procore.com/reference/rest/v1/cost-code-line-item-types?version=1.0#sync-cost-code-line-item-type-assignments), and [ERP Job Costs](https://developers.procore.com/reference/rest/v1/erp-job-costs?version=1.0#sync-erp-job-costs).

### reset_sub_job
**Event Payload:**
```
{
  "request_name": 'reset_sub_job',
  "request_data": {
    "sub_job": {
      {
        "id": 1,
        "code": "5",
        "created_at": "",
        "name": "Floor 5",
        "origin_data": nil,
        "origin_id": "sub_job_origin_id",
        "updated_at": "",
        "synced": true,
        "project": {
          "id": 2,
          "name": "Big Skyscraper",
          "origin_data": nil,
          "origin_id": "project_origin_id"
        }
      }
    }
  }
}
```
**Additional Info:**
This will return the sub job to an unsynced state.  

**Required Actions:**
There are no required actions. If neccessary, the integrator can clean up any related cached data for the sub job.

### sync_sub_job
**Event Payload:**
```
{
  "request_name": "sync_sub_job",
  "request_data": {
    "id": "sub_job_origin_id",
    "additional_job_data": {
      "job_name": "Test Subjob",
      "parent_origin_id":"sub_jobs_project_origin_id",
      "procore_project_id":7,
      "procore_sub_job_id":1,
      "project_id":99,
      "start_date":null
    },
    "company_id": 7
  }
}
```
**Required Actions:**
There are no required actions. Optionally, the ERP Integration can update the sub job or its related financial data using the [Sub Jobs Update](https://developers.procore.com/reference/rest/v1/sub-jobs?version=1.0#update-sub-job) endpoint or the sync endpoints for [Cost Codes](https://developers.procore.com/reference/rest/v1/cost-codes?version=1.0#sync-cost-codes), [Line Item Type Assignments](https://developers.procore.com/reference/rest/v1/cost-code-line-item-types?version=1.0#sync-cost-code-line-item-type-assignments), and [ERP Job Costs](https://developers.procore.com/reference/rest/v1/erp-job-costs?version=1.0#sync-erp-job-costs).

### sync_sub_jobs
**Event Payload:**
```
{
  "request_name": "sync_sub_jobs",
  "request_data": {
    "request_detail_id": 3,
    "company_id": 7
  }
}
```
**Required Actions:**
The integrator can use the Procore API to stage any new sub jobs and update any sub jobs that have already been synced, using the sync endpoints for [ERP Staged Records](https://developers.procore.com/reference/rest/v1/erp-staged-record?version=1.0#sync-staged-record) and [Sub Jobs](https://developers.procore.com/reference/rest/v1/sub-jobs?version=1.0#sync-sub-jobs). The event payload also contains a **request_detail_id** which the integrator must close out, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints. Any error messages included when closing out the request detail will be displayed to the user in the ERP Tab in Procore.

---

## Cost Codes and Line Item Type Assignments

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**delete_cost_code**](#delete_cost_code) | Yes | No | An ERP support representative, at the request of the customer, uses Super User access to delete synced project cost codes. |
| [**delete_cost_codes**](#delete_cost_codes) | No | Yes | A user attempts to delete synced project cost codes. |
| [**delete_cost_type_assignments**](#delete_cost_type_assignments) | No | Yes | A user attempts to delete synced project line item type assignments. |

<br>

### delete_cost_code
**Event Payload:**
```
{
  "request_name": "delete_cost_code",
  "request_data": {
    "project_cost_code_data_array": [
      {
        "id": 1,
        "origin_id": "cost_code_origin_id",
        "sortable_code": "1-01"
      }
    ],
    "project_origin_id": "project_origin_id",
    "procore_project_id": 2,
    "procore_sub_job_id": 3
  }
}
```
**Required Actions:**
There are no required actions. If any cost code data has been cached in the microservice, the integrator can use the information provided to clean up their local cache.

### delete_cost_codes
**Event Payload:**
```
{
  "request_name": "delete_cost_codes",
  "request_data": {
    "project": {
      "id": 1,
      "origin_id": "project_origin_id"
    },
    "sub_job": {
      "id": 2,
      "origin_id": "sub_job_origin_id"
    },
    "cost_codes": [
      {
        "id": 3,
        "request_detail_id": 4,
        "origin_id": "cost_code_origin_id",
        "sortable_code": "1-01"
      }
    ]
  }
}
```
**Required Actions:**
The event payload contains a **request_detail_id** which the integrator must close out, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints. Any error messages included when closing out the request detail will be displayed to the user in the ERP Tab in Procore.

### delete_cost_type_assignments
**Event Payload:**
```
{
  "request_name": "delete_cost_type_assignments"
  "request_data": {
    "project": {
      "id": 1,
      "origin_id": "project_origin_id"
    },
    "sub_job": {
      "id": 2,
      "origin_id": "sub_job_origin_id"
    },
    "cost_type_assignments": [
      {
        "id": 3,
        "request_detail_id": 4,
        "cost_code_origin_id": "cost_code_origin_id",
        "line_item_type_origin_id": "line_item_type_origin_id",
        "job_cost_id": 5
      }
    ]
  }
}
```
**Required Actions:**
The ERP Integration is expected to check the state of the assignments. If the assignments are in a deleted state (e.g. deleted, archived, etc.), they and any related job costs should be deleted via the delete endpoints for [Line Item Type Assignments](https://developers.procore.com/reference/rest/v1/cost-code-line-item-types?version=1.0#delete-a-cost-code-line-item-type-assignment) and [ERP Job Costs](https://developers.procore.com/reference/rest/v1/erp-job-costs?version=1.0#delete-erp-job-cost). The request details in the event payoad should then be closed out, optionally with error messages if any assignments failed to delete, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

---

## Budgets

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**create_budget**](#create_budget) | No | Yes | A user attempts to export a budget from Procore. |
| [**update_budget**](#update_budget) | No | Yes | A user attempts to re-export a budget from Procore. |
| [**create_budget_in_procore**](#create_budget_in_procore) | No | No | A user imports a budget in the ERP Integration Tool. |

<br>

### create_budget
**Event Payload:**
```
{
  "request_name": "create_budget",
  "request_data": {
    "job_id": "project_origin_id",
    "budget" {
      "id": 1,
      "origin_id": null,
      "origin_data": null,
      "synced": false,
      "custom_fields": {},
      "project_id": 123
    },
    "job_costs": [
      {
        "id": 456,
        "cost_code_origin_id": "cc_origin_id",
        "line_item_type_origin_id": "cost_type_origin_id",
        "budget_line_item_id": 567
        "new_amount": 44.45
        "job_origin_id": "project_origin_id"
        "sub_job_origin_id": null
      }
    ],
    "transactions": [
      {
        "id": 1,
        "origin_id": null,
        "code": null,
        "value": 33.33,
        "synced": false,
        "type": "Erp::OriginalEstimateTransaction",
        "procore_transaction_id": null,
        "procore_transaction_type": null,
        "job_cost_id": 456,
        "created_at": "2021-03-02T22:26:28Z",
        "notes": null
      }
    ]
  }
}
```
**Required Actions:**
When the budget has been successfully exported to the ERP system, the integrator must send back its third-party **origin_id** value back to Procore to mark the budget as synced, via the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint. Afterwards, mark the transactions as synced by hitting a specific [ERP Transactions Sync](https://developers.procore.com/reference/rest/v1/erp-transactions?version=1.0#sync-erp-transactions) endpoint. Lastly, close out the request detail record using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details?version=1.0) endpoints.

### update_budget
**Additional Info:**
Same as **create_budget** above, except the budget record will contain an **origin_id** value that will help with finding the existing budget in the ERP system and pushing new transaction records only. The **transactions** array will only contain records that are unsynced.

### create_budget_in_procore
**Event Payload:**
```
{
  "request_name": "create_budget_in_procore",
  "request_data": {
    "project_origin_id": "project_origin_id",
    "budget" {
      "id": 1,
      "origin_id": null,
      "origin_data": null,
      "synced": false,
      "custom_fields": {},
      "project_id": 123
    }
  }
}
```
**Required Actions:**
There are no required actions. Optionally, the ERP integration might perform some kind of caching with the newly synced budget information.

---

## Requisitions

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**create_requisitions**](#create_requisitions) | No | Yes | A user exports a batch of requisitions from the ERP Integration tool. |
| [**reset_requisition**](#reset_requisition) | Yes | No | An ERP support representative, at the request of the customer, uses Super User access to reset a synced requisition. |

<br>

### create_requisitions
**Event Payload:**
```
{
  "request_name": "create_requisitions",
  "request_data": {
    "requisitions": [{
      "procore_requisition_id": 1,
      "accounting_method": "unit",
      "billing_date": "2021-03-31",
      "code": "9348",
      "contract_id": 1,
      "contract_origin_id": "contract_origin_id",
      "created_at": "2021-03-02T22:26:28Z",
      "custom_fields": null,
      "erp_custom_fields": null,
      "formatted_payment_due": "$1,087.80",
      "invoice_number": "9348",
      "job_origin_id": "job_origin_id",
      "line_items": [
        {
          "procore_requisition_item_id": 1,
          "accounting_method": "amount",
          "amount": "500.0",
          "change_order_line_item_origin_id": null,
          "commitment_item_origin_id": "commitment_item_origin_id",
          "cost_code_id": 6,
          "cost_code_origin_id": "cost_code_origin_id",
          "description": "Forms equipment",
          "formatted_amount": "$500.00",
          "formatted_unit_cost": "$1,000.00",
          "line_item_description": "Forms equipment",
          "line_item_type_origin_id": "line_item_type_origin_id",
          "qty": "0.0",
          "released_work_completed_this_period": "0.0",
          "requisition_item_type": "Billings::ContractItem",
          "retainage_materials_presently_stored": "0.0",
          "retainage_materials_previously_stored": "0.0",
          "retainage_this_period": "10.0",
          "retainage_work_completed_this_period": "10.0",
          "scheduled_total_amount": "1000.0",
          "tax_code_origin_id": null,
          "unit_cost": "1000.0",
          "uom": "ls"
        },
        {
          "procore_requisition_item_id": 2,
          "accounting_method": "amount",
          "amount": "500.0",
          "change_order_line_item_origin_id": null,
          "commitment_item_origin_id": "commitment_item_origin_id",
          "cost_code_id": 7,
          "cost_code_origin_id": "cost_code_origin_id",
          "description": "Steel",
          "formatted_amount": "$500.00",
          "formatted_unit_cost": "$0.00",
          "line_item_description": "Steel",
          "line_item_type_origin_id": "line_item_type_origin_id",
          "qty": "0.0",
          "released_work_completed_this_period": "0.0",
          "requisition_item_type": "Billings::ContractItem",
          "retainage_materials_presently_stored": "0.0",
          "retainage_materials_previously_stored": "0.0",
          "retainage_this_period": "10.0",
          "retainage_work_completed_this_period": "10.0",
          "scheduled_total_amount": "1000.0",
          "tax_code_origin_id": null,
          "unit_cost":"0.0",
          "uom": null
        }
      ]
    }]
  }
}
```
**Required Actions:**
To mark an exported requisition as synced, send its **origin_id** from the ERP system to Procore via the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint.

### reset_requisition
**Event Payload:**
```
{
  "request_name": "reset_requisition",
  "request_data": {
    "requisition_id": 1,
    "project_id": 1,
    "requisition_origin_id": "requisition_origin_id",
    "reset_override": false
  }
}
```
**Additional Info:**
This resets the status of the requisition in Procore and sends an event to the microservice indicating that the requisition has been unsynced.  

**Required Actions:**
There are no required actions in response to this event, but integrators can use the data provided by this event to clear any cached data associated with the requisition or its items in the microservice.

---

## Payments

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**reset_payment**](#reset_payment) | Yes | Yes | An ERP support member resets a payment at the request of the user. |
| [**sync_contract_payments**](#reset_payment) | No | Yes | A user initiates a sync of invoice payments on the Subcontractor Invoices tab in Procore's ERP Integration tool. |

<br>

### create_payment
**Event Payload:**
```
{
  {
  	"id": 1,
  	"company_id": 2,
  	"request_name": "create_contract_payment",
  	"request_data": {
  		"request_detail_id": 3,
  		"contract_payment": {
  			"id": 4,
  			"company_id": 2,
  			"project_id": 5,
  			"contract_id": 6,
  			"requisition_id": 7,
  			"external_payment_id": "external_payment_id",
  			"invoice_number": "invoice_number",
  			"invoice_date": "2023-05-01",
  			"status": "paid",
  			"amount": "1.0",
  			"date_payment_created": "2023-05-02T15:06:02Z",
  			"date_payment_initiated": "1970-01-01T00:00:00Z",
  			"date_payment_funded": "2023-05-02T15:06:05Z",
  			"date_payment_settled": null,
  			"retainage_released_payment_amount": "3.0",
  			"draw_request_number": 9,
  			"payment_method": "ach",
  			"payment_number": null,
  			"vendor_id": 598134325841112,
  			"bank_id": "primary",
  			"check_number": "12"
  		},
  		"company_id": 2
  	},
  	"created_at": "2023-05-08T19:56:28Z",
  	"updated_at": "2023-05-08T19:56:28Z",
  	"integration_app_name": null
  }
}
```
**Required Actions:** <br>
After the ERP connector handles the export of the payment to the ERP system, the connector should finish up the export by:
1. Setting the **origin_id** values on the external data record here: [Rest API Overview](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) <br>
    **item_type=contract_payment** and **item_id** is the **id** value of the contract payment export <br>
2. Closing out the export request detail record with status success [Rest API Overview](https://developers.procore.com/reference/rest/v1/erp-request-details?version=1.0#update-erp-request-detail) 


### reset_payment
**Event Payload:**
```
{
  request_name: "reset_payment",
  request_data: {
    payment_id: 1,
    payment_type: "credit_card",
    origin_id: "payment_origin_id",
    origin_code: "payment_origin_code",
    origin_data: "payment_origin_data",
    reset_override: false
  }
}
```
**Required Actions:**
The ERP Integration is expected to check the state of the payment. If the payment is in a deleted state (e.g. deleted, archived, etc.), it should be unlinked in Procore via the [Invoice Payments Unlink](https://developers.procore.com/reference/rest/v1/invoice-payments?version=1.0#unlinks-an-invoice-payment-from-erp) endpoint.

### sync_contract_payments
**Event Payload:**
```
{
  request_name: "sync_contract_payments",
  request_data: {
    request_detail_id: 1
  }
}
```
**Required Actions:**
The integrator is responsible for pulling invoice payments from the ERP system and either creating or updating them in Procore. These actions can be performed using the [Invoice Payments Sync](https://developers.procore.com/reference/rest/v1/invoice-payments?version=1.0#updates-creates-invoice-payments-in-bulk) endpoint. Integrators also need to close out the **request_detail_id** associated with the sync request, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

---

## Commitments

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**create_commitment**](#create_commitment) | No | Yes | A user exports a commitment from the ERP Tab in Procore. |
| [**create_commitment_in_procore**](#create_commitment_in_procore) | No | No | A user presses the Add to Procore button for a commitment in the ERP Integration Tool. |
| [**sync_commitments**](#sync_commitments) | No | Yes | A user presses the Refresh Commitments button in the ERP Tab in Procore. |
| [**unlink_commitment**](#unlink_commitment) | No | Yes | A user attempts to unlink a commitment in the ERP Integration tool. |

<br>

### create_commitment
**Event Payload:**
```
{
  "request_name": "create_commitment",
  "request_data": {
    "job_id": "800003DD-1600977189",
    "request_detail_id": 137,
    "commitment": {
      "id": 41,
      "accounting_method": "amount",
      "actual_completion_date": null,
      "approval_letter_date": null,
      "approved_change_orders": "0.0",
      "assignee_id": null,
      "bill_to_address": null,
      "contract_date": null,
      "contract_estimated_completion_date": null,
      "contract_start_date": null,
      "created_at": "2020-10-19T12:17:31-07:00",
      "deleted_at": null,
      "delivery_date": null,
      "description": "",
      "draft_change_orders_amount": "0.0",
      "due_date": null,
      "erp_custom_fields": null,
      "exclusions": "",
      "executed": false,
      "execution_date": null,
      "expected_date": null,
      "grand_total": "250.0",
      "inclusions": "",
      "issued_on_date": null,
      "letter_of_intent_date": null,
      "number": "SC-001",
      "origin_code": null,
      "origin_data": null,
      "origin_id": null,
      "payment_terms": null,
      "pending_change_orders": "0.0",
      "pending_revised_contract": "250.0",
      "percentage_paid": "0.0",
      "private": true,
      "project": {
        "id": 86,
        "name": "Project A",
        "origin_data": "{\"edit_sequence\":\"1600977189\"}",
        "origin_id": "800003DD-1600977189"
      },
      "remaining_balance_outstanding": "250.0",
      "requisitions_are_enabled": null,
      "retainage_percent": null,
      "returned_date": null,
      "revised_contract": "250.0",
      "ship_to_address": null,
      "ship_via": null,
      "show_line_items_to_non_admins": false,
      "signed_contract_received_date": null,
      "status": "Approved",
      "title": "WOC 1 (QB)",
      "total_draw_requests_amount": "0.0",
      "total_payments": "0.0",
      "total_requisitions_amount": "0.0",
      "updated_at": "2020-10-19T19:17:59Z",
      "vendor": {
        "id": 47,
        "company": "90 Minute Courier",
        "origin_data": "{\"edit_sequence\":\"1427805909\"}",
        "origin_id": "800000CD-1389650341"
      },
      "code": "10543",
      "type": "WorkOrderContract"
    },
    "commitment_items": [
      {
        "id": 177,
        "amount": "250.0",
        "company": {
          "id": 9,
          "name": "Quickbooks"
        },
        "cost_code": {
          "id": 1472,
          "name": "Purpose",
          "full_code": "01-000",
          "origin_id": "800003DD-1600977189|800005FA-1477351439",
          "origin_data": null,
          "standard_cost_code_id": 371,
          "biller": "Project A",
          "biller_id": 86,
          "biller_type": "Project",
          "biller_origin_id": "800003DD-1600977189",
          "budgeted": true,
          "code": "000",
          "parent": {
            "id": 1471
          },
          "sortable_code": "01-000",
          "created_at": "2020-09-24T19:56:45Z",
          "deleted_at": null,
          "line_item_types": [
            {
              "id": 47,
              "name": "Other",
              "code": "O",
              "base_type": null,
              "origin_id": "std_cat_9_origin_id"
            }
          ],
          "position": null,
          "updated_at": "2020-09-24T19:59:35Z"
        },
        "created_at": "2020-10-19T19:17:53Z",
        "description": "Line Item 1",
        "extended_amount": "250.0",
        "extended_type": "manual",
        "holder": {
          "id": 41,
          "holder_type": "WorkOrderContract"
        },
        "line_item_type": {
          "id": 47,
          "base_type": null,
          "code": "O",
          "name": "Other",
          "origin_data": null,
          "origin_id": "std_cat_9_origin_id"
        },
        "origin_data": null,
        "origin_id": null,
        "position": 1,
        "project": {
          "id": 86,
          "name": "Project A",
          "origin_data": "{\"edit_sequence\":\"1600977189\"}",
          "origin_id": "800003DD-1600977189"
        },
        "quantity": "0.0",
        "tax_amount": "0.0",
        "tax_code": null,
        "tax_code_id": null,
        "total_amount": "250.0",
        "unit_cost": "0.0",
        "uom": null,
        "updated_at": "2020-10-19T19:17:54Z"
      }
    ],
    "additional_data": {
      "accounting_date": null
    },
    "company_id": 7
  }
}
```
**Required Actions:**
To mark an exported commitment as synced, the integrator must send third-party **origin_id** information back to Procore for the commitment and its items, using the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint. The integrator must also close out the request detail once the commitment and commitment line items have been exported to the ERP System, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details?version=1.0) endpoints. Any error messages included when closing out the request detail will be displayed to the user in the ERP Tab in Procore.

### create_commitment_in_procore
**Event Payload:**
```
{
  "request_name": "create_commitment_in_procore",
  "request_data": {
    "project_origin_id": "project_origin_id",
    "commitment": {
      "approval_letter_date": "10/25/20",
      "contract_date": "10/26/20",
      "title": "Contract 1",
      "description": "Sample contract"
      ...
    }
  }
}
```
**Required Actions:**
There are no required actions. Optionally, the ERP integration might perform some kind of caching with the newly synced commitment information.

### sync_commitments
**Event Payload:**
```
{
  "request_name": "sync_commitments",
  "request_data": {
    "request_detail_id": 3,
    "company_id": 7
  }
}
```
**Required Actions:**
The integrator can stage commitments and commitment line items using the [ERP Staged Records Sync](https://developers.procore.com/reference/rest/v1/erp-staged-record?version=1.0#sync-staged-record) endpoint. Integrators also need to close out the **request_detail_id** associated with the sync request, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details?version=1.0) endpoints.

### unlink_commitment
**Event Payload:**
```
{
  "request_name": "unlink_commitment",
  "request_data": {
    "job_origin_id": "job_origin_id",
    "erp_commitment_id": 1,
    "request_detail_id": 2,
    "project_id": 3,
    "procore_commitment_id": 4,
    "commitment_type": "contract_type",
    "commitment_origin_id": "commitment_origin_id"
  }
}
```
**Required Actions:**
The ERP Integration is expected to check the state of the commitment. If the commitment is in a deleted state (e.g. deleted, archived, etc.), it should be marked as unsynced via the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint. The request detail should then be closed out, optionally with error messages if the commitment failed to unlink, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

---

## Commitment Change Orders

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**create_commitment_change_order**](#create_commitment_change_order) | No | Yes | A user exports a commitment change order from the ERP Tab in Procore. |
| [**sync_commitment_change_orders**](#sync_commitment_change_orders) | No | Yes | A user initiates a sync of commitment change orders in Procore's ERP Integration tool. |
| [**unlink_commitment_change_order**](#unlink_commitment_change_order) | No | Yes | A user attempts to unlink a commitment change order in the ERP Integration tool. |

<br>

### create_commitment_change_order
**Event Payload:**
```
{
  "request_name": "create_commitment_change_order",
  "request_data": {
    "job_origin_id": "project_origin_id",
    "request_detail_id": 1,
    "commitment": {
      "id": 2,
      "accounting_method": "amount",
      "actual_completion_date": null,
      "approval_letter_date": null,
      "approved_change_orders": "0.0",
      "assignee_id": null,
      "bill_to_address": null,
      "contract_date": null,
      "contract_estimated_completion_date": null,
      "contract_start_date": null,
      "created_at": "2020-10-19T12:17:31-07:00",
      "deleted_at": null,
      "delivery_date": null,
      "description": "",
      "draft_change_orders_amount": "0.0",
      "due_date": null,
      "erp_custom_fields": null,
      "exclusions": "",
      "executed": false,
      "execution_date": null,
      "expected_date": null,
      "grand_total": "250.0",
      "inclusions": "",
      "issued_on_date": null,
      "letter_of_intent_date": null,
      "number": "SC-001",
      "origin_code": null,
      "origin_data": null,
      "origin_id": null,
      "payment_terms": null,
      "pending_change_orders": "0.0",
      "pending_revised_contract": "250.0",
      "percentage_paid": "0.0",
      "private": true,
      "project": {
        "id": 86,
        "name": "Project A",
        "origin_data": "{\"edit_sequence\":\"1600977189\"}",
        "origin_id": "800003DD-1600977189"
      },
      "remaining_balance_outstanding": "250.0",
      "requisitions_are_enabled": null,
      "retainage_percent": null,
      "returned_date": null,
      "revised_contract": "250.0",
      "ship_to_address": null,
      "ship_via": null,
      "show_line_items_to_non_admins": false,
      "signed_contract_received_date": null,
      "status": "Approved",
      "title": "WOC 1 (QB)",
      "total_draw_requests_amount": "0.0",
      "total_payments": "0.0",
      "total_requisitions_amount": "0.0",
      "updated_at": "2020-10-19T19:17:59Z",
      "vendor": {
        "id": 47,
        "company": "90 Minute Courier",
        "origin_data": "{\"edit_sequence\":\"1427805909\"}",
        "origin_id": "800000CD-1389650341"
      },
      "code": "10543",
      "type": "WorkOrderContract"
    },
    "commitment_items": [
      {
        "id": 177,
        "amount": "0.0",
        "company": {
          "id": 9,
          "name": "Quickbooks"
        },
        "cost_code": {
          "id": 1472,
          "name": "Purpose",
          "full_code": "01-000",
          "origin_id": "800003DD-1600977189|800005FA-1477351439",
          "origin_data": null,
          "standard_cost_code_id": 371,
          "biller": "Project A",
          "biller_id": 86,
          "biller_type": "Project",
          "biller_origin_id": "800003DD-1600977189",
          "budgeted": true,
          "code": "000",
          "parent": {
            "id": 1471
          },
          "sortable_code": "01-000",
          "created_at": "2020-09-24T19:56:45Z",
          "deleted_at": null,
          "line_item_types": [
            {
              "id": 47,
              "name": "Other",
              "code": "O",
              "base_type": null,
              "origin_id": "std_cat_9_origin_id"
            }
          ],
          "position": null,
          "updated_at": "2020-09-24T19:59:35Z"
        },
        "created_at": "2020-10-19T19:17:53Z",
        "description": "Zero dollar commitment line item",
        "extended_amount": "0.0",
        "extended_type": "manual",
        "holder": {
          "id": 41,
          "holder_type": "WorkOrderContract"
        },
        "line_item_type": {
          "id": 47,
          "base_type": null,
          "code": "O",
          "name": "Other",
          "origin_data": null,
          "origin_id": "std_cat_9_origin_id"
        },
        "origin_data": null,
        "origin_id": null,
        "position": 2,
        "project": {
          "id": 86,
          "name": "Project A",
          "origin_data": "{\"edit_sequence\":\"1600977189\"}",
          "origin_id": "800003DD-1600977189"
        },
        "quantity": "0.0",
        "tax_amount": "0.0",
        "tax_code": null,
        "tax_code_id": null,
        "total_amount": "0.0",
        "unit_cost": "0.0",
        "uom": null,
        "updated_at": "2020-10-19T19:17:54Z"
      }
    ],
    "change_order": {
      "id": 3,
      "contract_id": 1,
      "number": 45,
      "status": "Approved",
      "title": "Change order 1",
      "created_at": "2020-10-19T19:17:54Z"
      "deleted_at": null,
      "origin_code": "cco-1",
      "origin_data": null
      "origin_id": null
      "updated_at": "2020-10-19T19:17:54Z",
      "due_date": "2020-10-19T19:17:54Z",
      "invoiced_date": "2020-10-19T19:17:54Z",
      "paid_date": "2020-10-19T19:17:54Z",
      "reviewed_at": "2020-10-19T19:17:54Z",
      "description": "This is a description",
      "erp_custom_fields": {}
    },
    "change_order_items": [
      {
        "id": 188,
        "amount": "233.0",
        "commitment_line_item_id": 177,
        "company": {
          "id": 9,
          "name": "Quickbooks"
        },
        "cost_code": {
          "id": 1472,
          "name": "Purpose",
          "full_code": "01-000",
          "origin_id": "800003DD-1600977189|800005FA-1477351439",
          "origin_data": null,
          "standard_cost_code_id": 371,
          "biller": "Project A",
          "biller_id": 86,
          "biller_type": "Project",
          "biller_origin_id": "800003DD-1600977189",
          "budgeted": true,
          "code": "000",
          "parent": {
            "id": 1471
          },
          "sortable_code": "01-000",
          "created_at": "2020-09-24T19:56:45Z",
          "deleted_at": null,
          "line_item_types": [
            {
              "id": 47,
              "name": "Other",
              "code": "O",
              "base_type": null,
              "origin_id": "std_cat_9_origin_id"
            }
          ],
          "position": null,
          "updated_at": "2020-09-24T19:59:35Z"
        },
        "created_at": "2020-10-19T19:17:53Z",
        "description": "Line Item 1",
        "extended_amount": "250.0",
        "extended_type": "manual",
        "holder": {
          "id": 41,
          "holder_type": "WorkOrderContract"
        },
        "line_item_type": {
          "id": 47,
          "base_type": null,
          "code": "O",
          "name": "Other",
          "origin_data": null,
          "origin_id": "std_cat_9_origin_id"
        },
        "origin_data": null,
        "origin_id": null,
        "position": 1,
        "project": {
          "id": 86,
          "name": "Project A",
          "origin_data": "{\"edit_sequence\":\"1600977189\"}",
          "origin_id": "800003DD-1600977189"
        },
        "quantity": "0.0",
        "tax_amount": "0.0",
        "tax_code": null,
        "tax_code_id": null,
        "total_amount": "250.0",
        "unit_cost": "0.0",
        "uom": null,
        "updated_at": "2020-10-19T19:17:54Z"
      }
    ],
    "additional_data": {
      "accounting_date": null
    },
    "company_id": 7
  }
}
```
**Required Actions:**
To mark an exported commitment change order as synced, the integrator must send third-party **origin_id** information back to Procore for the commitment change order and its items, using the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint. The integrator must also close out the request detail once the commitment change order and its items have been exported to the ERP System, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details?version=1.0) endpoints. Any error messages included when closing out the request detail will be displayed to the user in the ERP Tab in Procore.

### sync_commitment_change_orders
**Event Payload:**
```
{
  "request_name": "sync_commitment_change_orders",
  "request_data": {
    "request_detail_id": 1
  }
}
```
**Required Actions:**
The integrator is responsible for pulling commitment change orders from the ERP system and staging them in Procore, using the [ERP Staged Records Sync](https://developers.procore.com/reference/rest/v1/erp-staged-record?version=1.0#sync-staged-record) endpoint. Integrators also need to close out the **request_detail_id** associated with the sync request, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

### unlink_commitment_change_order
**Event Payload:**
```
{
  "request_name": "unlink_commitment_change_order",
  "request_data": {
    "job_origin_id": "job_origin_id",
    "erp_commitment_id": 1,
    "erp_commitment_change_order_id": 2,
    "request_detail_id": 3,
    "commitment_origin_id": "commitment_origin_id",
    "commitment_type": "contract_type",
    "commitment_change_order_origin_id": "commitment_change_order_origin_id",
    "procore_commitment_change_order_id": 4,
    "project_id": 6
  }
}
```
**Required Actions:**
The ERP Integration is expected to check the state of the commitment change order. If the commitment change order is in a deleted state (e.g. deleted, archived, etc.), it should be marked as unsynced via the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint. The request detail should then be closed out, optionally with error messages if the commitment change order failed to unlink, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

---

## Prime Contracts

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**sync_prime_contracts**](#sync_prime_contracts) | No | Yes | A user hits the "Refresh Prime Contracts" button asking for new prime contracts they entered in ERP to be staged for import. |

<br>

### sync_prime_contracts
**Event Payload:**
```
{
  "request_name": "sync_prime_contracts",
  "request_data": {
    "request_detail_id": 123
  }
}
```
**Required Actions:**
The integrator can use the Procore API to stage any new prime contracts or prime contract items, using the [ERP Staged Records Sync](https://developers.procore.com/reference/rest/v1/erp-staged-record?version=1.0#sync-staged-record) endpoint. The event payload also contains a **request_detail_id** which the integrator must close out, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

---

## Prime Contract Change Orders

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**create_prime_contract_change_order**](#create_prime_contract_change_order) | No | Yes | An accounting approver approves the export of a prime contract change order. |
| [**reset_prime_contract_change_order**](#reset_prime_contract_change_order) | Yes | Yes | An ERP support member resets a prime contract change order at the request of the user. |
| [**unlink_prime_contract_change_order**](#unlink_prime_contract_change_order) | No | Yes | A user attempts to unlink a prime contract change order in the ERP Integration tool. |

<br>

### create_prime_contract_change_order
**Event Payload:**
```
{
  "request_name": "sync_prime_contracts",
  "request_data": {
    "project": {
      "id": 48,
      "name": "56-234 - Community Center",
      "origin_id": "0cccd6e7-2bd9-43c3-9f9d-aab800bce42c",
      "origin_data": nil,
      "origin_code": "56-234"
    },
    "prime_contract": {
      "id": 76,
      "accounting_method": "amount",
      "actual_completion_date": nil,
      "approval_letter_date": nil,
      "approved_change_orders": "1929.85",
      "architect": nil,
      "attachments": [],
      "contract_date": nil,
      "contract_estimated_completion_date": nil,
      "contract_start_date": nil,
      "contract_termination_date": nil,
      "contractor": {"id": nil},
      "created_at": "2021-04-13T22:17:28Z",
      "created_by": {"id": 2, "login": "procore@procore.com", "name": "Customer Support"},
      "deleted_at": nil,
      "description": "Community Center",
      "draft_change_orders_amount": "0.0",
      "exclusions": nil,
      "executed": nil,
      "execution_date": nil,
      "grand_total": "7396144.0",
      "has_change_order_packages": true,
      "has_potential_change_orders": true,
      "inclusions": nil,
      "issued_on_date": nil,
      "letter_of_intent_date": nil,
      "number": "CC",
      "origin_code": nil,
      "origin_data": nil,
      "origin_id": "1e32af04-b238-458f-8e35-aab800bcd886",
      "original_substantial_completion_date": nil,
      "outstanding_balance": "7398073.85",
      "owner_invoices_amount": "0.0",
      "pending_change_orders_amount": "0.0",
      "pending_revised_contract_amount": "7398073.85",
      "percentage_paid": "0.0",
      "private": true,
      "retainage_percent": "0.0",
      "returned_date": nil,
      "revised_contract_amount": "7398073.85",
      "show_line_items_to_non_admins": nil,
      "signed_contract_received_date": nil,
      "status": "Approved",
      "substantial_completion_date": nil,
      "title": "Community Center",
      "total_payments": "0.0",
      "updated_at": "2021-04-20T15:49:56Z",
      "vendor": {"id": nil}
    },
    "prime_contract_items": [
      {
        "id": 592,
        "amount": "0.0",
        "commitment_line_item_id": nil,
        "company": {"id": 7, "name": "Sage 300 Main"},
        "cost_code":  {
          "id": 1952,
          "name": "Summary of Work",
          "full_code": "1-010",
          "origin_id": "361360e0-4c90-4798-81c3-aab800c2a668",
          "origin_data": nil,
          "standard_cost_code_id": 307,
          "biller": "Community Center",
          "biller_id": 48,
          "biller_type": "Project",
          "biller_origin_id": "0cccd6e7-2bd9-43c3-9f9d-aab800bce42c",
          "budgeted": false,
          "code": "010",
          "parent": {"id": 1951},
          "sortable_code": "1-010",
          "created_at": "2020-09-25T19:12:31Z",
          "deleted_at": nil,
          "line_item_types":  [
            {"id": 23, "name": "Subcontracts", "code": "S",
             "base_type": nil, "origin_id": "c0daefcf-5b29-42bf-b5b1-aa62009650ce"},
            {"id": 17, "name": "Other", "code": "O", "base_type": nil,
            "origin_id": "3e572c2e-e33e-4652-9618-aa6200965095"},
          ],
          "position": nil,
          "updated_at": "2020-09-25T19:12:31Z"
        },
        "created_at": "2021-04-20T15:47:07Z",
        "description": "asfd1",
        "erp_custom_fields": {},
        "extended_amount": "0.0",
        "extended_type": "manual",
        "holder": {"id": 76, "holder_type": "PrimeContract"},
        "line_item_type": {"id": 16, "base_type": nil, "code": "E", "name": "Equipment",
          "origin_data": nil, "origin_id": "1d2de64e-9cec-4ca7-be7a-aa6200965087"},
        "origin_code": "49",
        "origin_data": nil,
        "origin_id": nil,
        "position": 55,
        "prime_line_item_id": nil,
        "project": {"id": 48, "name": "56-234 - Community Center",
          "origin_data": nil, "origin_id": "0cccd6e7-2bd9-43c3-9f9d-aab800bce42c"},
        "quantity": "0.0",
        "tax_amount": "0.0",
        "tax_code_id": 2,
        "total_amount": "0.0",
        "unit_cost": "0.0",
        "uom": nil,
        "updated_at": "2021-04-20T15:54:45Z"
      }
    ],
    "prime_contract_change_order": {
      "id": 81,
      "contract_id": 76,
      "created_at": "2021-04-20T15:45:46Z",
      "deleted_at": nil,
      "description": "asdf",
      "due_date": nil,
      "erp_custom_fields": {"transaction_date": "2021-04-20"},
      "executed": false,
      "invoiced_date": nil,
      "number": "049",
      "origin_code": nil,
      "origin_data": nil,
      "origin_id": nil,
      "paid_date": nil,
      "reviewed_at": "2021-04-20T15:49:18Z",
      "status": "approved",
      "title": "",
      "updated_at": "2021-04-20T15:54:43Z",
      "approved_on": "2021-04-20T15:54:45Z"
    },
    "prime_contract_change_order_items": [
      {
        "id": 593,
        "amount": "343.85",
        "commitment_line_item_id": nil,
        "company": {"id": 7, "name": "Sage 300 Main"},
        "cost_code":  {
          "id": 1952,
          "name": "Summary of Work",
          "full_code": "1-010",
          "origin_id": "361360e0-4c90-4798-81c3-aab800c2a668",
          "origin_data": nil,
          "standard_cost_code_id": 307,
          "biller": "Community Center",
          "biller_id": 48,
          "biller_type": "Project",
          "biller_origin_id": "0cccd6e7-2bd9-43c3-9f9d-aab800bce42c",
          "budgeted": false,
          "code": "010",
          "parent": {"id": 1951},
          "sortable_code": "1-010",
          "created_at": "2020-09-25T19:12:31Z",
          "deleted_at": nil,
          "line_item_types":  [
            {"id": 23, "name": "Subcontracts", "code": "S", "base_type": nil,
               "origin_id": "c0daefcf-5b29-42bf-b5b1-aa62009650ce"},
            {"id": 17, "name": "Other", "code": "O", "base_type": nil,
              "origin_id": "3e572c2e-e33e-4652-9618-aa6200965095"}
          ],
          "position": nil,
          "updated_at": "2020-09-25T19:12:31Z"
        },
        "created_at": "2021-04-20T15:47:08Z",
        "description": "asfd1",
        "erp_custom_fields": {},
        "extended_amount": "299.0",
        "extended_type": "manual",
        "holder": {"id": 81, "holder_type": "PotentialChangeOrder"},
        "line_item_type": {"id": 16, "base_type": nil, "code": "E", "name": "Equipment",
          "origin_data": nil, "origin_id": "1d2de64e-9cec-4ca7-be7a-aa6200965087"},
        "markup_line_items": [
          {
            "id": 9,
            "amount": "44.85",
            "created_at": "2021-04-20T15:49:02Z",
            "markup":  {
              "id": 3,
              "can_export_estimate_markup": true,
              "compounds_markups_above": false,
              "created_at": "2021-04-20T15:49:02Z",
              "destination_budget_line_item_id": nil,
              "destination_cost_code":  {"id": 1952, "name": "Summary of Work", "full_code": "1-010",
                "origin_id": "361360e0-4c90-4798-81c3-aab800c2a668", "origin_data": nil},
              "destination_line_item_type":  {"id": 16, "base_type": nil, "code": "E", "name": "Equipment",
                "origin_data": nil, "origin_id": "1d2de64e-9cec-4ca7-be7a-aa6200965087"},
              "destination_sub_job": {},
              "markup_set": "vertical",
              "name": "ppmarkupvert",
              "percentage": "15.00",
              "position": 1,
              "prime_line_item": {"id": 592, "origin_id": nil},
              "updated_at": "2021-04-20T15:49:02Z"
            },
            "updated_at": "2021-04-20T15:49:02Z"
          }
        ],
        "origin_code": nil,
        "origin_data": nil,
        "origin_id": nil,
        "position": 1,
        "prime_line_item_id": 592,
        "prime_line_item_origin_code": "49",
        "prime_line_item_origin_data": nil,
        "prime_line_item_origin_id": nil,
        "project": {"id": 48, "name": "56-234 - Community Center", "origin_data": nil,
          "origin_id": "0cccd6e7-2bd9-43c3-9f9d-aab800bce42c"},
        "quantity": "0.0",
        "tax_amount": "12.71",
        "tax_code_id": 2,
        "total_amount": "299.0",
        "unit_cost": "0.0",
        "uom": "ls",
        "updated_at": "2021-04-20T15:47:21Z"
      }
    ],
    "request_detail_id": 361
  }
}
```
**Required Actions**:
After the prime contract change order and its items have been exported to the ERP system, the integrator must send third-party **origin_id** information back to Procore for the prime contract change order and its items, using the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint. The event payload also contains a **request_detail_id** which the integrator must close out, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

### reset_prime_contract_change_order
**Event Payload:**
```
{
  "prime_contract_id": 76,
  "prime_contract_origin_id": "1e32af04-b238-458f-8e35-aab800bcd886",
  "prime_contract_change_order_id": 79,
  "prime_contract_change_order_number": "031",
  "job_id": "0cccd6e7-2bd9-43c3-9f9d-aab800bce42c",
  "prime_contract_change_order_line_items": [
    {
      "id": 586,
      "amount": "66.0",
      "commitment_line_item_id": nil,
      "company": {"id": 7, "name": "Sage 300 Main"},
      "cost_code": {
        "id": 1961,
        "name": "Dewatering",
        "full_code": "2-140",
        "origin_id": "1e7310e6-6592-4189-80cb-ab1000ff4452",
        "origin_data": nil,
        "standard_cost_code_id": 420,
        "biller": "Community Center",
        "biller_id": 48,
        "biller_type": "Project",
        "biller_origin_id": "0cccd6e7-2bd9-43c3-9f9d-aab800bce42c",
        "budgeted": false,
        "code": "140",
        "parent": {"id": 1960},
        "sortable_code": "2-140",
        "created_at": "2020-09-25T19:12:32Z",
        "deleted_at": nil,
        "line_item_types": [
          {"id": 39, "name": "Material", "code": "M", "base_type": nil,
            "origin_id": "29eddbaa-62ff-4009-806f-abde0111ee51"},
          {"id": 20, "name": "Labor", "code": "L", "base_type": nil,
            "origin_id": "6e75253f-35a3-4a7d-bed4-aa62009650c4"}
        ],
        "position": nil,
        "updated_at": "2020-09-25T19:12:32Z"
      },
      "created_at": "2021-04-16T15:05:07Z",
      "description": "asdf1",
      "erp_custom_fields": {},
      "extended_amount": "66.0",
      "extended_type": "manual",
      "holder": {"id": 79, "holder_type": "PotentialChangeOrder"},
      "line_item_type": {"id": 17, "base_type": nil, "code": "O", "name": "Other",
        "origin_data": nil, "origin_id": "3e572c2e-e33e-4652-9618-aa6200965095"},
      "markup_line_items": [],
      "origin_code": nil,
      "origin_data": nil,
      "origin_id": nil,
      "position": 1,
      "prime_line_item_id": 585,
      "prime_line_item_origin_code": "047",
      "prime_line_item_origin_data": nil,
      "prime_line_item_origin_id": nil,
      "project": {"id": 48, "name": "56-234 - Community Center", "origin_data": nil,
        "origin_id": "0cccd6e7-2bd9-43c3-9f9d-aab800bce42c"},
      "quantity": "0.0",
      "tax_amount": "2.81",
      "tax_code_id": 2,
      "total_amount": "66.0",
      "unit_cost": "0.0",
      "uom": "ls",
      "updated_at": "2021-04-16T15:05:20Z"
    }
  ],
  "reset_estimate_transactions": false,
  "reset_revenue_transactions": false,
  "project_id": 48,
  "prime_contract_change_order_origin_id": "123f4e60-3417-4a2e-99ae-ad0c0096513a"
}
```
**Required Actions:**
The ERP Integration is expected to check the state of the prime contract change order. If the prime contract change order is in a deleted state (e.g. deleted, archived, etc.), it should be marked as unsynced via the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint.

### unlink_prime_contract_change_order
**Event Payload:**
```
{
  "prime_contract": {
    "id": 1,
    "number": "327 - MYPC",
    "origin_data": null,
    "origin_id": "MYPC",
    "procore_prime_contract_id": 1,
    "project_id": 2,
    "title": "327 My Prime Contract"
  },
  "prime_contract_change_order": {
    "prime_contract_origin_id": "MYPC",
    "created_at": "2021-07-01T08:44:32-13:00",
    "description": "Change Description",
    "id": 3,
    "job_origin_id": "project_origin_id",
    "number": 327 - MYPC - CO1,
    "origin_id": "MYPCCO1",
    "title": "My Change Order",
    "origin_code": "MYPCCO1",
    "custom_fields": {},
    "erp_custom_fields": {}
  },
  "prime_contract_change_order_line_items": [
    {
      "cost_code_origin_id": "cost_code_origin_id",
      "cost_code_origin_data": null,
      "description": "Concrete Finishing",
      "estimate_amount": 123.45,
      "prime_contract_change_order_origin_id": "MYPCCO1",
      "origin_id": "MYPCCO1LI1",
      "prime_contract_item_id": 4,
      "prime_contract_item_origin_data": null,
      "prime_contract_item_origin_id": "prime_contract_item_origin_id",
      "prime_contract_item_position": 1,
      "id": 5,
      "procore_prime_contract_item_id": 4,
      "revenue_amount": 543.21,
      "line_item_type_origin_id": "line_item_type_origin_id",
      "line_item_type_origin_data": null,
      "position": 2,
      "potential_change_order_id": 6,
      "job_origin_id": "project_origin_id",
      "markup_line_items": []
    }
  ],
  "request_detail_id": 12345
}
```
**Required Actions:**
The ERP Integration is expected to check the state of the prime contract change order. If the prime contract change order is in a deleted state (e.g. deleted, archived, etc.), it should be marked as unsynced via the [ERP External Data Sync](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data) endpoint. The request detail should then be closed out, optionally with error messages if the prime contract change order failed to unlink, using the [ERP Request Details](https://developers.procore.com/reference/rest/v1/erp-request-details) endpoints.

---

## ERP Metadata

| **Name** | **Super User** | **Action Required** | **Occurs When** |
| [**sync_metadata**](#sync_metadata) | No | Yes | A user performs an action requiring ERP metadata but the integration's metadata is not stored in Procore. |

<br>

### sync_metadata
**Event Payload:**
```
{
  "request_name": "sync_metadata",
  "request_data": {
    "company_id": 1
  }
}
```
**Required Actions:**
The ERP Integration is expected to sync its ERP metadata with Procore via the [ERP Metadata Configurations Update](https://developers.procore.com/reference/rest/v1/erp-connections?version=1.0#update-erp-metadata-configuration) endpoint.
