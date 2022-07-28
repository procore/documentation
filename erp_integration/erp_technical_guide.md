---
permalink: /erp-technical-guide
title: ERP Integration Technical Guide
layout: default
section_title: ERP Integration

---

## Context

The ERP Platform for System Integrators supports exporting/importing/syncing many different entity types and allows for a wide variety of customization.
This guide will stick to the basics of an ERP integration. It is advised to refer to the other ERP documentation depending on the features of the particular Integration.

---

## Getting Started

Before the Integration can start receiving Webhook events and processing events for a particular Procore company, a few things need to be setup:

### 1. Establish ERP Connection and Update ERP Metadata

The purpose of this step is to create a connection between the Procore company and the ERP Integration as well as provide metadata which describes the specific functionality of the ERP Integration.

**User Workflow in Procore:**
1. Procore Super User activates ERP Integrations on customer’s company
2. Project User (admin permission) creates a Service Account in the Procore company. A Client ID and Client secret are generated, as well as a Directory record to manage the Service Account’s read/write permissions to all of the tools available on the Procore company
3. The record that was automatically created in the Directory for the Service Account needs to be updated. Go to the Directory tool and enable `Can Push To Accounting` for the Service account. Then, under the **Company Permissions Templates** set **ERP Integrations** to `Admin`.

**Integrator Workflow:**
1. Use the Client ID and Client secret to generate an auth token to authorize API requests: [OAuth Documentation](https://developers.procore.com/documentation/oauth-client-credentials).
2. Now that you are authenticated, create an ERP connection and include the ERP Integration Metadata in the API request: 
* [ERP Connection API Documentation](https://developers.procore.com/reference/rest/v1/erp-connections?version=1.0#create-erp-connection-and-metadata-configuration)
* [ERP Integration Metadata Documentation](https://developers.procore.com/documentation/erp-metadata-details)

**Note:** Following the creation of an ERP Connection, an ERP Standard Cost Code List is automatically created on the company in Procore. Use this list when syncing in Standard Cost Codes.

### 2. Create Webhook hook and trigger

At this point the Procore Company should have:
* a service account with admin privileges
* an ERP connection with ERP metadata

Use the following [Webhook Documentation](https://developers.procore.com/documentation/webhooks-api) while keeping in mind the details below:

#### Creating the hook:
* When creating the hook, the `destination_url` is the URL of the ERP Integration endpoint where events will be delivered.
* The `destination_headers` can be used by the ERP Integration to authenticate the event deliveries. Our internal ERP Integrations store a bearer token for each company's hook so that we can authenticate event deliveries.

#### Creating the trigger:
* Use the Hook ID from the step above to create the trigger.
* To subscribe to ERP related events, you must use `resource_name: 'ERP Requests', event_type: 'create'` when creating the trigger.

You should now have a Hook which indicates that you want to receive Webhook events.
Then you created a Trigger to indicate which resource you want to receive events for.

---

## Receiving and Proccessing Events

At this point you may be asking, what causes an event to be fired off?

There are a few main categories of events:
* Export events - initiated when a user presses the `Export` button in the ERP Integration Tool
* Import events - initiated **after** the user-initiated import process succeeds in the ERP Integration Tool
* Sync events - initiated when a user presses the `Sync <Entity Type>` button in the ERP Integration Tool
* Unlink events - initiated when a user unlinks a **synced** record in the ERP Integration Tool
* Reset events - initiated when a **super user** uses a reset tool to reset a **synced** record

#### IMPORTANT:
* When the ERP Integration receives a Webhook event, the actual event payload is **not** included. Use the `resource_id` found in the Webhook event to fetch the event payload using the [ERP Request API](https://developers.procore.com/reference/rest/v1/erp-requests?version=1.0#show-erp-request).
* Most events include a `request_detail_id` in the payload.
  The Request Detail record is used to track the status of an event (export, sync, etc) and control certain UI elements such as the `Sync` buttons in the ERP Integration Tool.
  When the ERP Integrator is finished processing an event that included a `request_detail_id`, it **must** update the Request Detail's `status` and `messages` (if appropriate) via the [Request Detail API](https://developers.procore.com/reference/rest/v1/erp-request-details?version=1.0#update-erp-request-detail).

Refer to the [ERP Events Dictionary](https://developers.procore.com/documentation/erp-events-dictionary) to view an exhaustive list of event types and the **requirements** of an ERP integrator when processing events.

### Export Workflow:

Generally, the export workflow is:
1. Company/Project User creates a new Procore Object.
2. Company/Project User presses the `Send To ERP` button which stages the Procore Object for review in the ERP Integration Tool.
3. The Accounting Approver approves or rejects the Procore Object.
4. If approved, an ERP Request **and** ERP Request Detail are created and the Webhook Events service delivers the export event.
6. The ERP Integrator processes the export by pushing the payload to the ERP System.
7. The ERP Integrator marks the exported record(s) as synced using the [External Data API](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data).
8. The ERP Integrator marks the export as success/failed using the [Request Detail API](https://developers.procore.com/reference/rest/v1/erp-request-details?version=1.0#update-erp-request-detail).

### Sync Workflow:

There are 2 sync workflows.
The [ERP Events Dictionary](https://developers.procore.com/documentation/erp-events-dictionary) describes which sync workflow applies to a particular event type.

#### Sync Staged Records Workflow:
1. Accounting Approver initiates a sync to fetch new data from the ERP System for import in the **Ready to Import** tab.
2. An ERP Request **and** ERP Request Detail are created and the Webhook Events service delivers the sync event.
3. The ERP Integrator fetches the data and syncs it via the [Staged Records API](https://developers.procore.com/reference/rest/v1/erp-staged-record?version=1.0#sync-staged-record)
4. The ERP Integrator marks the sync as success/failed using the [Request Detail API](https://developers.procore.com/reference/rest/v1/erp-request-details?version=1.0#update-erp-request-detail).

#### Sync Records Directly Into Procore Workflow:
1. Accounting Approver initiates a sync to fetch new data from the ERP System
2. It is directly synced into Procore using the Procore API.
3. **Note:** This workflow exists for entities that an ERP System doesn't import via the Accounting Approver workflow but that are still required for other entities to be imported. Ex: `sync_standard_cost_codes, sync_standard_categories, etc`

### Import Workflow:
1. The ERP Integrator stages records via the [Staged Records API](https://developers.procore.com/reference/rest/v1/erp-staged-record?version=1.0#sync-staged-record).
2. An Accounting Approver imports a Staged Record.
3. An ERP Request is created and the Webhook Events service delivers the `create_xyz_in_procore` event.
4. There are no required actions. However, the ERP Integrator may choose to sync some data directly into Procore.

### Unlink Workflow:
1. The Accounting Approver unlinks a **synced** record via the ERP Integrations Tool in Procore.
2. An ERP Request is created and the Webhook Events service delivers the `unlink_xyz` event.
3. The ERP Integrator performs integration specific actions and then uses the [Status Management API](https://developers.procore.com/reference/rest/v1/erp-status-management?version=1.0#unlink-an-erp-synced-entity) to unlink the record.
4. Some unlink events will include a `request_detail_id`  which must be marked as success/failed using the [Request Detail API](https://developers.procore.com/reference/rest/v1/erp-request-details?version=1.0#update-erp-request-detail).

### Reset Workflow:
1. A **super user** uses the ERP Support Tools to reset a **synced** record.
2. An ERP Request is created and the Webhook Events service delivers the `reset_xyz` event.
3. The ERP Integrator performs integration specific actions, typically destroying the record in the ERP system or checking if it was destroyed.
4. The ERP Integrator can use the Procore API to destroy any records or mark the records as unsynced via the [External Data API](https://developers.procore.com/reference/rest/v1/erp-external-data?version=1.0#sync-external-data).
5. Reset events do **not** include a `request_detail_id`.
