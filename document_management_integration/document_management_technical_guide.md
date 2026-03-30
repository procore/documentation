---
permalink: /document-management-technical-guide
title: Document Management Integration Technical Guide
layout: default
section_title: Document Management Integration

---

This guide walks you through the complete API workflow for uploading documents, enriching them with metadata, and submitting them as document revisions using the Procore Document Management V2 API.

Before starting, review the [Document Management Integration Overview]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %}) for prerequisites, core concepts, and best practices. Your service account will specifically need Upload New Files and Submit New Files permissions enabled in the project's Document Management tool. For a reference of all available endpoints, see [Document Management API Endpoints]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_api_endpoints.md %}).

> **Important:** We recommend developing and testing your integration against the [Procore Development Sandbox](https://developers.procore.com/documentation/development-environments) before pointing your integration at a live project. The sandbox environment is a safe place to iterate on requests and validate responses without risk to real project data.

### Base URL

All V2 Document Management endpoints use the following base path:

```
/rest/v2.0/companies/{company_id}/projects/{project_id}/document_management
```

Replace `{company_id}` and `{project_id}` with your actual Procore company and project IDs.

### Workflow Summary

| Step | Endpoint | Method | Purpose |
| --- | --- | --- | --- |
| 1 | `.../upload_requirements` | GET | Determine required fields, check if a naming standard applies, and verify duplicate revision rules |
| 2 | `.../fields` | GET | Fetch available project fields and their IDs |
| 3 | `.../fields/{field_id_or_name}/values` | GET | Fetch field value IDs for dropdown list field types |
| 4 | `.../document_uploads` | POST | Initialize document upload records |
| 5 | `/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads` | POST, PUT, PATCH | Upload binary file to Procore storage using the **V2.1 Unified File Upload API** |
| 6 | `.../document_uploads` | PATCH | Associate the uploaded file, set metadata, mark upload as COMPLETED |
| 7 | `.../document_uploads/{document_upload_id}` | GET | Retrieve `latest_event_id` (required for submission) and optionally review Machine Learning (ML)  populated fields |
| 8 | `.../document_revisions` | POST | Submit uploads to create document revisions |

Step 5 (binary file upload) can be performed before or after Step 4 (initialize document upload records). Both steps must be completed before Step 6 (Patch document uploads).
Keep batches to 100 items or fewer in Steps 4, 6, and 8 as larger payloads increase the risk of timeouts and make partial-failure recovery more complex.
If you need to process more than 100 documents, it is recommended to split them into sequential batches.

---

All request and response examples in this guide are condensed for readability and focus on essential fields. For complete schemas, all available fields, and HTTP status codes, follow the endpoint links throughout each step.  

List endpoints are paginated with a default page size of 10 and a maximum of 100. Use `page` and `per_page` query parameters to navigate the list endpoints. The response includes a `Total` header with the total record count and a `Link` header with page URLs. The `Link` header is always present, but its content is conditional: when all results fit on a single page, it is empty. Otherwise, will include `next/prev/first/last` page URLs.

## Steps 1–3: Gather Project Configuration

These are independent project-level lookups that can be called in any order. Since these responses reflect project-level configuration, you may choose to cache them rather than re-fetching on every upload — particularly if you are processing large batches. Before caching, verify that these values change infrequently in your target projects, as project administrators can update fields, values, and requirements at any time.

### Step 1: Fetch Upload Requirements

This endpoint returns all configured upload requirements for the project and can be used to determine which fields must be populated before a document upload can be submitted as a revision. A project can have multiple upload requirements: a **default rule** that applies to all uploads, and optional **conditional rules** that apply based on a document's field values. For example, drawings may require different metadata than other document types. 

**Request** — [List Project Upload Requirements](https://developers.procore.com/reference/rest/project-upload-requirements?version=2.0#list-project-upload-requirements)

```
GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/upload_requirements
```

<details>
<summary class="collapseListTierOne">View Example Response</summary>
<pre><code>{
  "data": [
    {
      "id": "01JDXMPK01REQ0GHAT3KNWPB5V",
      "updated_at": "2026-01-09T09:38:08.847Z",
      "naming_standard": {
        "id": "01JDXMPK02NS0FG9S2JMVRNA4W",
        "name": "Procore Default",
        "fields": [
          { "id": "01JDXMPK03FD0EF8R1HKTRM93X", "name": "discipline", "label": "Discipline", "type": "lov_entry"  },
          { "id": "01JDXMPK04FD0DE7Q0GJSQK82Y", "name": "number",     "label": "Number",     "type": "string"    },
          { "id": "01JDXMPK09FD0892J5BDMJD37D", "name": "type",       "label": "Type",       "type": "lov_entry" }
        ],
        "updated_at": "2025-01-01T00:00:00.000Z"
      },
      "additional_required_fields": [
        { "id": "01JDXMPK06FD0BC5N8EGQNH60A", "name": "date_authored", "label": "Date Authored", "type": "timestamp" },
        { "id": "01JDXMPK07FD0AB4M7DFPMG59B", "name": "location",      "label": "Location",      "type": "reference" },
        { "id": "01JDXMPK08FD09A3K6CENKE48C", "name": "originator",    "label": "Originator",    "type": "reference" }
      ],
      "fields_required_by_project": [
        { "id": "01JDXMPK09FD0892J5BDMJD37D", "name": "type",     "label": "Type",     "type": "lov_entry" },
        { "id": "01JDXMPK0AFD0781H4ACKGC26E", "name": "name",     "label": "Name",     "type": "string"    },
        { "id": "01JDXMPK0BFD0670G3Z9JFB15F", "name": "revision", "label": "Revision", "type": "string"    },
        { "id": "01JDXMPK0CFD0569F2Y8HEA04G", "name": "status",   "label": "Status",   "type": "lov_entry" }
      ],
      "rule_qualifiers": [
        {
          "type": "lov_entry",
          "field": { "id": "01JDXMPK09FD0892J5BDMJD37D", "name": "type", "label": "Type" },
          "acceptable_values": [
            { "id": "01JDXMPK0HMV0N14A7S3C95V9N", "code": "DRW", "label": "Drawing", "active": true }
          ]
        }
      ],
      "allow_duplicate_revisions": true
    }
  ]
}</code></pre>
</details>


The API response is an array of requirement objects. Each object defines a set of required fields that apply based on the document's metadata values. The `rule_qualifiers` field determines which requirement object applies to your upload.

- **`rule_qualifiers`** — An array of field/value filters that determines when a requirement applies. Each qualifier specifies a field (e.g., `type`) and its `acceptable_values` (e.g., `Drawing`). A requirement applies only when **all** of its qualifiers match the document's metadata.

  **Determining the applicable requirement:**
  The response may contain multiple requirement objects. To find the one that applies to your document:
  1. **Conditional rules** — Requirements where `rule_qualifiers` contains one or more entries. If your document's metadata values match all qualifiers in a requirement, that requirement applies. If multiple conditional rules match, the one with the most matching qualifiers takes priority.
  2. **Default rule** — The requirement where `rule_qualifiers` is an empty array (`[]`). This is the catch-all that applies when no conditional rule matches your document's metadata.

- **`fields_required_by_project`** and **`additional_required_fields`** — Together, these arrays define the complete list of fields you must populate. `fields_required_by_project` always contains the baseline fields (Name, Type, Status, Revision). `additional_required_fields` contains extra fields specific to the matched requirement (e.g., drawings may strictly require `date_authored`).

- **`naming_standard`** — If present, the project enforces a naming standard. Procore will automatically attempt to extract metadata from filenames.

- **`allow_duplicate_revisions`** — If `false`, submitting a document with a revision value that already exists in its container will fail with a `DUPLICATE_REVISION` error.

Every requirement object in this response includes the field `id`. If you only need to populate required fields for your document upload, you can use the IDs returned from this API response and skip Step 2.

---

### Step 2: Fetch Project Fields

This endpoint returns every user-settable field configured for the project, including optional fields not listed in upload requirements.  
Skip this step if you only need to populate required fields — their IDs are already in the Step 1 response.

**Request** — [List Project Fields](https://developers.procore.com/reference/rest/project-fields?version=2.0#list-project-fields)

```
GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/fields
```

<details>
<summary class="collapseListTierOne">View Example Response</summary>
<pre><code>{
  "data": [
    {
      "id": "01JDXMPK09FD0892J5BDMJD37D",
      "name": "type",
      "label": "Type",
      "description": "The document type",
      "position": "1",
      "active": true,
      "visible": true,
      "readonly": false,
      "can_affect_permissions": true,
      "type": "lov_entry",
      "variant": "single_select"
    },
    {
      "id": "01JDXMPK0CFD0569F2Y8HEA04G",
      "name": "status",
      "label": "Status",
      "description": "The document status",
      "position": "2",
      "active": true,
      "visible": true,
      "readonly": false,
      "can_affect_permissions": true,
      "type": "lov_entry",
      "variant": "single_select"
    },
    {
      "id": "01JDXMPK0GFP0R25B8T4DA6W0M",
      "name": "custom_field_123",
      "description": "Custom Field",
      "position": "3",
      "active": true,
      "visible": true,
      "readonly": false,
      "can_affect_permissions": false,
      "variant": "procore_location",
      "label": "Location_CF",
      "type": "reference",
      "custom_field_definition_id": "123"
    }
  ]
}</code></pre>
</details>

Based on the matching requirement object (the one whose `rule_qualifiers` all match your document's metadata, or the default if none match), save the field IDs you intend to use to populate the document upload metadata. The response includes optional fields that are available on the project and you should save these if you plan to set additional metadata on document uploads.

The response excludes system-only fields (`file_format`, `assigned_workflow_template`) that are not user-settable. Fields with `readonly: true` cannot be set through the API, and fields with `active: false` or `visible: false` should generally be ignored. For a full reference on standard and system fields, field types, and value structures, see [Document Management Metadata Details]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %}).

> **ML Auto-Population:** For PDF files, Procore may automatically populate some required fields via machine learning. When planning which fields to supply manually, account for this. Note that ML has no completion webhook — if you want to use ML-populated values before submitting, you will need to poll the show endpoint in Step 7. See [ML and Automated Features]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %}#machine-learning-ml-and-automated-features) for the full list of fields, precedence rules, and limitations.

---

### Step 3: Fetch Values for Dropdown Fields

This endpoint returns the available metadata values for a given field and is a required step for any field with type `lov_entry` (single select), `lov_entries` (multi-select), or `reference` that you plan to populate. The response provides value IDs that you will supply when setting field values on a document upload.

> Note that for `reference` fields with a user-type variant of `procore_user`, `procore_tool_user`, or `procore_users`, this endpoint returns an empty response. See [Known Limitation: User-Type Reference Fields](#known-limitation-user-type-reference-fields) below for a workaround.

**Request** — [List Project Metadata Values](https://developers.procore.com/reference/rest/project-metadata-values?version=2.0#list-project-metadata-values)

```
GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/fields/{field_id_or_name}/values
```

The `{field_id_or_name}` path parameter accepts either the field's ULID (e.g., `01JDXMPK09FD0892J5BDMJD37D`) or its name (e.g., `type`, `status`).

**Example — Fetch values for the `type` field**

```
GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/fields/type/values
```

or 

```
GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/fields/01JDXMPK09FD0892J5BDMJD37D/values
```

<details>
<summary class="collapseListTierOne">View Example Response</summary>
<pre><code>{
  "data": [
    {
      "id": "01JDXMPK0HMV0N14A7S3C95V9N",
      "code": "DRW",
      "label": "Drawing",
      "active": true,
      "tags": []
    },
    {
      "id": "01JDXMPK0JMV0M23B6R2B84T8P",
      "code": "SPC",
      "label": "Specification",
      "active": true,
      "tags": []
    },
    {
      "id": "01JDXMPK0KMV0K32C5Q1A73S7Q",
      "code": "IMG",
      "label": "Image",
      "active": true,
      "tags": []
    }
  ]
}</code></pre>
</details>

Save the ID of each value you intend to use — you will pass these IDs in the `values` array when creating or updating document uploads. Only values with `active: true` can be used; inactive values will be rejected.

Use the `keyword` query parameter to filter results by value name without fetching the entire list. For example, if you only need the location value for "Floor 3", add `?keyword=Floor%203` to the request instead of paginating through all locations. This is useful for large value lists where you know the specific value you need.

Make one request per field as the endpoint only accepts a single field at a time. Repeat this call for each `lov_entry`, `lov_entries`, or non-user-type `reference` field you intend to populate. For `reference` fields with a user-type variant, skip this endpoint and use the workaround described below.

#### Known Limitation: User-Type Reference Fields

> The values endpoint returns `{ "data": [] }` for all `reference` fields with a user-type variant (`procore_user`, `procore_tool_user`, or `procore_users`). This is a known API limitation — the empty response does not mean that no valid values exist for these fields.

**Affected user-settable fields:**

- `authored_by`
- `uploaded_by`
- `placeholder_assignee`
- `placeholder_created_by`
- Custom fields configured with a user-type reference variant (`procore_user`, `procore_tool_user`, or `procore_users`)

Workflow user fields (`workflow_assignees`, `workflow_current_step_assignees`, `workflow_manager`, `workflow_pending_assignees`) are editable via the API, but it is recommended for these fields to be managed by the workflow engine and not directly by integrators. See [Workflow Fields]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %}#workflow-fields) for details.

**Practical impact:** For most integrations, this limitation has no practical effect. `authored_by` and `uploaded_by` automatically default to the authenticated user creating the upload, and workflow user fields should be managed by the workflow engine rather than by integrators. You only need the workaround below if your integration needs to override these fields with a different user, set `placeholder_assignee` or `placeholder_created_by`, or populate a custom field that uses a user-type variant.

**Workaround**: Use the Procore project users endpoint to retrieve valid user IDs for these fields instead of the document management field values endpoint. For the complete endpoint reference, see [List Project Users](https://developers.procore.com/reference/rest/project-users?version=1.0#list-project-users).
```
GET /rest/v1.0/projects/{project_id}/users
```

Key details about this endpoint:

- The **Directory** tool must be active on the project.
- Any project-authorized user can call the endpoint, even with Directory permission level set to `none`.
- The response includes at minimum: `id` (Procore user ID), `name`, `first_name`, and `last_name`. Higher Directory permission levels return richer data (email, job title, etc.).
- The endpoint is paginated — use the standard Procore pagination parameters to iterate through all results.
- Extract the `id` from this response and pass it into your `fields[].values` array when updating the document upload.

<details>
<summary class="collapseListTierOne">View Example — Setting <code>authored_by</code> with a user ID from the Project Users endpoint</summary>

<strong>1. Retrieve a user ID from the Project Users endpoint</strong>

<pre><code>GET /rest/v1.0/projects/{project_id}/users</code></pre>

<pre><code>[
    {
      "id": 8972757,
      "name": "Jane Doe",
      "first_name": "Jane",
      "last_name": "Doe"
    }
]</code></pre>

<strong>2. Pass the user ID in the <code>fields</code> array of your document upload PATCH request</strong>

<pre><code>{
  "update_params": [
    {
      "id": "UPLOAD_ID",
      "fields": [
        {
          "id": "AUTHORED_BY_FIELD_ID",
          "values": ["8972757"]
        }
      ]
    }
  ]
}</code></pre>

The <code>values</code> array takes the user's <code>id</code> as a string, following the same pattern used for other <code>reference</code> field types.
</details>

---

## Steps 4–8: Upload and Submit Documents

### Step 4: Create Document Uploads

This request creates the document upload record and returns the `id` you will use to link your binary file and metadata in the steps that follow. In the Procore architecture, a **Document Upload** is an intermediate object — it holds your metadata and file reference, but it does not become a permanent project record until it is formally submitted as a revision in Step 8.

**Request** — [Bulk Create Document Uploads](https://developers.procore.com/reference/rest/document-uploads?version=2.0#bulk-create-document-uploads)

```
POST /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads
```

**Request Body**

<details>
<summary class="collapseListTierOne">View example request</summary>
<pre><code>{
  "uploads": [
    {
      "file_name": "A101-Floor-Plan.pdf",
      "mime_type": "application/pdf",
      "file_locked": true
    },
    {
      "file_name": "A102-Elevation.pdf",
      "mime_type": "application/pdf"
    }
  ]
}</code></pre>
</details>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file_name` | string | Yes | The filename of the document. Including the file extension is recommended. |
| `mime_type` | string | Yes | The MIME type of the file. |
| `file_locked` | boolean | No | Whether to lock the file from edits. Default is `false`. |

<details>
<summary class="collapseListTierOne">View Example Response (HTTP 201)</summary>
<pre><code>{
  "data": [
    {
      "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
      "file_locked": true
    },
    {
      "id": "01JDXMPK0NTP0G50E3NYY51Q5S",
      "file_locked": false
    }
  ]
}</code></pre>
</details>

A successful request returns HTTP `201 Created` with a `data` array containing one object per upload. Each object contains only two fields: `id` (the document upload ID) and `file_locked`. Save all `id` values — you will pass them in the Update Document Uploads request (Step 6) and the Submit Document Revisions request (Step 8). All uploads start with `upload_status: INCOMPLETE` and won't appear in list or show endpoints until Step 6 is complete.

**Handling failures**

**Batch failures:** Validation errors cause the entire batch to fail with a 4xx status code and no uploads are created. This differs from the Update Document Uploads endpoint, which returns HTTP `207` and supports partial success. For error codes and resolution steps, see the [Error Reference](#error-reference) section.

**Timeouts and retries:** This endpoint is not idempotent. If your request times out, uploads may have already been created server-side but no IDs would have been returned. In that case, issue a fresh POST with the same payload to obtain new IDs. Any orphaned records from the timed-out request remain `INCOMPLETE`, are excluded from list and show endpoint results, and cannot be submitted as revisions.

> **Webhooks:** A `Document Upload.Created` event fires for each upload created in this request. Subscribe to this event if you want to be notified when uploads are initialized. See [Introduction to Webhooks]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}) and [Using the Webhooks API]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks_api.md %}) for setup details.

---

### Step 5: Upload the Binary File

Push your binary file to Procore's storage service using the **V2.1 Unified File Upload API**. As file storage and document metadata are handled by separate services, this step requires you to step outside the V2 Document Management endpoints. For the complete request and response flow, see the [Unified File Upload API Guide](https://developers.procore.com/documentation/tutorial-unified-file-uploads). The flow consists of a **POST** to initialize the upload session and receive presigned URLs, a **PUT** to push bytes directly to storage, then a **PATCH** to complete. Save `data.upload_id` from the POST response — this becomes your `file_upload_id` in Step 6.

> **Sequencing:** The binary file upload has no dependency on the Create Document Uploads request. You can perform Steps 4 and 5 in either order, as long as both are complete before Step 6.

---

### Step 6: Update Document Uploads

This step is where you provide the `file_upload_id` returned from the binary file upload, populate required and optional metadata fields, and set `upload_status` to `COMPLETED`. This signals to Procore that the document upload is ready for storage verification and asynchronous Machine Learning analysis.

**Request** — [Bulk Update Document Uploads](https://developers.procore.com/reference/rest/document-uploads?version=2.0#bulk-update-document-uploads)

```
PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads
```

<details>
<summary class="collapseListTierOne">Update a single upload</summary>
<pre><code>{
  "update_params": [
    {
      "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
      "file_upload_id": "01JDXMPK0PFK0F69F2MXX40P4T",
      "upload_status": "COMPLETED",
      "fields": [
        {
          "id": "01JDXMPK09FD0892J5BDMJD37D",
          "values": ["01JDXMPK0HMV0N14A7S3C95V9N"]
        },
        {
          "id": "01JDXMPK0CFD0569F2Y8HEA04G",
          "values": ["01JDXMPK0ZMV0655R3BMMQ1DD4"]
        },
        {
          "id": "01JDXMPK0BFD0670G3Z9JFB15F",
          "values": ["Rev A"]
        },
        {
          "id": "01JDXMPK0AFD0781H4ACKGC26E",
          "values": ["Floor Plan Level 1"]
        }
      ]
    }
  ]
}</code></pre>
</details>

<details>
<summary class="collapseListTierOne">Bulk update of multiple uploads</summary>
<pre><code>{
  "update_params": [
    {
      "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
      "file_upload_id": "01JDXMPK0PFK0F69F2MXX40P4T",
      "upload_status": "COMPLETED",
      "fields": [
        {
          "id": "01JDXMPK09FD0892J5BDMJD37D",
          "values": ["01JDXMPK0HMV0N14A7S3C95V9N"]
        },
        {
          "id": "01JDXMPK0BFD0670G3Z9JFB15F",
          "values": ["Rev A"]
        }
      ]
    },
    {
      "id": "01JDXMPK0NTP0G50E3NYY51Q5S",
      "file_upload_id": "01JDXMPK0QFK0E58E1LWW39O3S",
      "upload_status": "COMPLETED",
      "fields": [
        {
          "id": "01JDXMPK09FD0892J5BDMJD37D",
          "values": ["01JDXMPK0JMV0M23B6R2B84T8P"]
        },
        {
          "id": "01JDXMPK0BFD0670G3Z9JFB15F",
          "values": ["Rev B"]
        }
      ]
    }
  ]
}</code></pre>
</details>

**Field Reference**

| Top-level Field | Type | Required | Description |
| --- | --- | --- | --- |
| `update_params` | array | Yes | Array of update objects, one per document upload to modify. Each object must include an `id`. |
| `update_all_document_uploads` | boolean | No | If `true`, all document uploads matching any filter params will be updated. Default is `false`. |
| `only_update_empty_fields` | boolean | No | If `true`, only empty fields are updated and existing values including ML-populated ones are preserved. Default is `false`. |

**Fields within each `update_params` item:**
The `update_params` array contains one object per document upload to modify.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The document upload ID returned from the create step. |
| `file_upload_id` | string | No | The `upload_id` returned by the Unified File Upload API. Links the binary file to the document upload record. |
| `upload_status` | string | No | Upload status of the document. Allowed values: `INCOMPLETE`, `COMPLETED`, `PLACEHOLDER`. Set to `COMPLETED` to trigger server-side verification that the file exists in storage. |
| `file_locked` | boolean | No | Whether to lock the file from edits. |
| `fields` | array | No | Array of field update objects. See [Constructing the Fields Array for API Requests]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %}#constructing-the-fields-array-for-api-requests) for payload structure and examples. |
| `fields[].id` | string | Yes (if `fields` provided) | The project field ID. |
| `fields[].values` | string[] | Yes (if `fields` provided) | For `lov_entry`/`lov_entries` fields: array of metadata value IDs. For `string`/`numeric`/`timestamp` fields: single-element array containing the text value. |

**Response**

When the request body is valid and updates are processed, the endpoint returns HTTP 207 (Multi-Status) with `success` and `failed` arrays. Items in `success` contain only `id`. The `failed` array is populated only when `upload_status: "COMPLETED"` is set but Procore cannot confirm individual files in storage — each failed entry includes `id`, `code` (a numeric error code from the storage service), and `message` (human-readable; do not parse programmatically).  

PATCH updates are safe to retry since reapplying the same values overwrites existing ones without creating duplicates. For items in the failed array, re-PATCH only those upload IDs. For 4xx and 500 failures, no updates were applied and the full request can be retried after addressing the error. See the [Error Reference](#error-reference) for resolution steps.


<details>
<summary class="collapseListTierOne">View example response (HTTP 207, partial success)</summary>
<pre><code>{
  "data": {
    "success": [
      {
        "id": "01JDXMPK0MTP0H41D4PYZ62R6R"
      }
    ],
    "failed": [
      {
        "id": "01JDXMPK0NTP0G50E3NYY51Q5S",
        "code": 404,
        "message": "File not found in storage"
      }
    ]
  }
}</code></pre>
</details>

> **Warning:** If an ID in `update_params` is a valid ULID but does not correspond to an existing upload, the API returns HTTP 207 but silently drops that entry — it will not appear in either the `success` or `failed` arrays and no error is raised. If all submitted IDs are non-existent, the response will be `{ "data": { "success": [], "failed": [] } }`. Always cross-check the IDs in `success` against your request to detect any that may have been silently dropped.

> **Webhooks:** A `Document Upload.Completed` event fires when `upload_status` transitions to `COMPLETED`. Subscribe to this event if you want to be notified as soon as an upload is ready for Step 7. See [Introduction to Webhooks]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}) and [Using the Webhooks API]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks_api.md %}) for setup details.

---

### Step 7: Retrieve Latest Event ID and Review Metadata

Use this step to review the complete state of your upload, verify that all required fields are present, and capture any data automatically populated by Procore's Machine Learning. This is where you will also retrieve the `latest_event_id`.

**1. Retrieve `latest_event_id`**

The show response includes `latest_event_id` for every upload. Save this value — you must pass it as `upload_latest_event_id` when submitting in Step 8. If you don't need ML-enriched metadata, grab this ID and proceed to step 8.

**2. Check async processing status**

Two background processes may auto-populate fields after `upload_status` is set to `COMPLETED`:

- **ML** (PDF files only) — Procore analyzes file content and may populate fields such as Type, Description, Number, Revision, and Date Authored. Check `integrationStatuses.ML` — once it reaches `completed` or `error`, ML processing is finished. There is no webhook for ML completion; you can poll the show endpoint to detect ML status. ML typically finishes within 10–30 seconds. It is recommended that you start polling 5 seconds after setting upload_status to COMPLETED, then repeat every 5–10 seconds. Stop when both integrationStatuses.ML and integrationStatuses.FILENAME_SCRAPING report completed or error, or after 3 minutes — whichever comes first. If the timeout is reached, proceed with patching metadata fields manually. For details on which fields ML populates, precedence rules, and limitations, see [ML and Automated Features]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %}#machine-learning-ml-and-automated-features).
- **Filename scraping** — Procore attempts to extract metadata from the filename when the project has a naming standard configured. Check `integrationStatuses.FILENAME_SCRAPING` to determine the status of filename scraping.


**3. Verify all required metadata**

Inspect the `fields` array to confirm all required fields are populated, either by you or by ML, before proceeding. The `fields` array in the show response is returned in full and a single API call gives you the complete set of fields for the document upload. This is distinct from the separate [List Project Fields](https://developers.procore.com/reference/rest/project-fields?version=2.0#list-project-fields) endpoint (`GET .../fields`) covered in Step 2, which is paginated and lists available field definitions for the project.  

Note that `permissions.allowed_actions` in the response does not reflect the user's full permission set and can be ignored here.

**Request** — [Show Document Upload](https://developers.procore.com/reference/rest/document-uploads?version=2.0#show-document-upload)

```
GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads/{document_upload_id}
```

<details>
<summary class="collapseListTierOne">View Example Response</summary>
<pre><code>{
  "data": {
    "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
    "fields": [
      {
        "id": "01JDXMPK09FD0892J5BDMJD37D",
        "name": "type",
        "type": "lov_entry",
        "values": [
          {
            "id": "01JDXMPK0HMV0N14A7S3C95V9N",
            "code": "DRW",
            "label": "Drawing",
            "active": true,
            "tags": []
          }
        ],
        "label_source": "MANUAL",
        "label": "Type",
        "description": "The document type"
      },
      {
        "id": "01JDXMPK0BFD0670G3Z9JFB15F",
        "name": "revision",
        "type": "string",
        "values": [{ "label": "Rev A" }],
        "label_source": "MANUAL",
        "label": "Revision",
        "description": "The document revision identifier"
      }
    ],
    "upload_status": "COMPLETED",
    "integrationStatuses": {
      "ML": "completed",
      "FILENAME_SCRAPING": "completed"
    },
    "latest_event_id": "01JDXMPK0REV0D87H0JVVZ8M2W",
    "permissions": {
      "allowed_actions": ["view"]
    }
  }
}</code></pre>
</details>

---

### Step 8: Submit Document Uploads as Revisions

Convert your document upload into a permanent project record. Once a document upload has `upload_status: COMPLETED`, all required metadata fields populated, and a `latest_event_id` retrieved, it is ready for final submission. Submitted document uploads get removed from the uploads list and are no longer retrievable. This POST request consumes your temporary upload ID and creates a versioned Document Revision. Procore will automatically place this new revision into the correct Document Container based on the metadata matching criteria.

**Request** — [Create Document Revisions](https://developers.procore.com/reference/rest/document-revisions?version=2.0#bulk-create-document-revisions)

```
POST /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_revisions
```

**Request Body**

```json
{
  "uploads": [
    {
      "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
      "upload_latest_event_id": "01JDXMPK0REV0D87H0JVVZ8M2W"
    },
    {
      "id": "01JDXMPK0NTP0G50E3NYY51Q5S",
      "upload_latest_event_id": "01JDXMPK0SEV0C96J9HTTZ7K1X"
    }
  ]
}
```


| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `uploads` | array | Yes | Array of uploads to submit. |
| `uploads[].id` | string | Yes | The document upload ID. |
| `uploads[].upload_latest_event_id` | string | Yes | The `latest_event_id` value retrieved from the Show Document Upload request. |
| `uploads[].termination_reason` | string | Conditional | Required when `terminated_revision_status_id` is provided. Reason for terminating existing revision workflows (e.g., `"Superseded"`). |
| `uploads[].terminated_revision_status_id` | string | Conditional | Required when `termination_reason` is provided. The metadata value ID of the status to set on terminated revisions. |

<details>
<summary class="collapseListTierOne">View example response (HTTP 201, partial success)</summary>
<pre><code>{
  "data": {
    "ids": ["01JDXMPK0TRV0BA5K8GSSY6J0Y"],
    "failureIds": [],
    "failures": [
      {
        "upload_id": "01JDXMPK0NTP0G50E3NYY51Q5S",
        "reason_code": "CONCURRENCY_CONFLICT",
        "message": "Upload was modified since last read"
      }
    ]
  }
}</code></pre>
</details>

**`ids`** — The created document revision IDs. These are stable, permanent identifiers — use them (not upload IDs) for any subsequent references or integrations.

**`failures`** — Array of per-item failures that occurred during processing. Check this array even on a 201 response. Each entry contains `upload_id`, `reason_code`, and `message`. `failureIds` is also present but deprecated, use `failures` instead.

> **Retrying:** Uploads that have been successfully submitted cannot be resubmitted. Consumed upload IDs return HTTP `404` with `reason_code: "UPLOAD_NOT_FOUND"` on any subsequent POST or GET. For partial failures, retry only the failed upload IDs.

---

## Error Reference

Use the `reason_code` to drive your error-handling logic as it provides a stable, machine-readable identifier. Treat the `message` field as human-readable context that should not be parsed programmatically. Multiple errors can be returned in the same response. 4xx errors share the following response structure:

<details>
<summary class="collapseListTierOne">View example error response</summary>
<pre><code>{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Bad Request",
    "details": [
      {
        "reason_code": "INVALID_PROPERTY",
        "message": "uploads.0.file_name must be a string"
      }
    ]
  }
}</code></pre>
</details>

### Standard API Errors

The following errors apply to all Document Management API endpoints. It is recommended to build global handler for these in your integration rather than repeating the logic per step.

| HTTP Status | Reason Code | Description | Resolution |
| --- | --- | --- | --- |
| 401 | `INVALID_TOKEN` | Authentication token is missing, invalid, or expired. | Provide a valid OAuth 2.0 access token. See [Authentication]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %}) for details. |
| 403 | `FORBIDDEN` | The service account lacks permissions for the requested action. | Ensure the service account has the "Upload New Files" and "Submit New Files" permissions in the project's Document Management tool. |
| 429 | `TOO_MANY_REQUESTS` | The integration has exceeded Procore's API rate limit. | Inspect the `Retry-After` header in the response, pause your upload loop, and retry after the specified number of seconds. See [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}) for details. |
| 500 | `INTERNAL_SERVER_ERROR` | The server encountered an unexpected error. | Retry the request after a short delay. |

### Endpoint-Specific Errors

The following tables list payload and business-logic validation errors specific to each step.

#### Create Document Uploads (Step 4)

These errors reject the entire initialization batch.

| HTTP Status | Reason Code | Description | Resolution |
| --- | --- | --- | --- |
| 400 | `INVALID_PROPERTY` | Request body failed schema validation. | Review the `details` array in the error response for the specific field and constraint that failed. |
| 403 | `ACCESS_DENIED` | The integrator lacks "Upload New Files" permission for this project. | Verify the service account has "Upload New Files" permission in the project's Document Management tool. |
| 404 | `NOT_FOUND` | The project's naming standard configuration could not be found. | Verify the project is correctly configured in the Document Management tool. |

#### Update Document Uploads (Step 6)

Step 6 has three failure modes: request-level failures (4xx) that reject the entire batch before any updates are applied; item-level failures that appear in the failed array of an otherwise successful HTTP 207 response when Procore cannot verify an individual file in storage; and server-side failures (500) that fail the entire request. Handle all three in your integration.

**Request-level failures (4xx):**

| HTTP Status | Reason Code | Description | Resolution |
| --- | --- | --- | --- |
| 400 | `INVALID_PROPERTY` | Request body failed schema validation. | Review the `details` array in the error response for the specific field and constraint that failed. |

**Item-level failures (in `failed` array of HTTP 207):**

The `failed` array is populated when `upload_status: "COMPLETED"` is set but Procore's storage service cannot verify the individual file. Each entry contains `id`, `code`, and `message`. Uploads not listed in `failed` were updated successfully.

To resolve the error, fix the underlying storage issue (re-upload the file if necessary), then re-PATCH only the failed upload IDs with a corrected `file_upload_id`.

**Server-side failures (500):**

| HTTP Status | Description | Resolution |
| --- | --- | --- |
| 500 | `file_upload_id` is already linked to another upload. | Use the `upload_id` returned from the Binary File Upload step. Each `upload_id` can only be linked to one document upload. |
| 500 | `upload_status: "COMPLETED"` was set with no file linked. | Include `file_upload_id` in the same PATCH request that sets `upload_status: "COMPLETED"`. |
| 500 | Storage verification failed. | Retry the request after a short delay. If the error persists, re-upload the binary file and retry with the new `file_upload_id`. |

#### Submit Document Uploads (Step 8)

Step 8 has two distinct failure modes: **request-level failures** (4xx) that reject the entire request before any uploads are processed, and **item-level failures** that appear in the `failures` array of an otherwise successful HTTP 201 response. Handle both in your integration.

**Request-level failures (4xx):**

| HTTP Status | Reason Code | Description | Resolution |
| --- | --- | --- | --- |
| 400 | `INVALID_PROPERTY` | Request body failed schema validation — e.g., a required field is missing or has an invalid format (such as `id` not being a valid ULID). | Review the `details` array in the error response for the specific field and constraint that failed. |
| 422 | `UPLOAD_NOT_FOUND` | The upload ID does not exist, has been deleted, or was already successfully submitted (consumed uploads are removed from the uploads list). | Verify the upload ID is correct. |
| 422 | `FILE_KEY_MISMATCH` | The upload has no associated binary file in storage. | Ensure you completed the binary file upload (Step 5), updated the document upload using the `file_upload_id`, and set `upload_status: "COMPLETED"`. |
| 422 | `INVALID_INPUT` | One or more required metadata fields are not populated. | Return to your Update Document Uploads request (Step 6) and populate all required fields identified in your List Project Upload Requirements response (Step 1). |
| 422 | `DUPLICATE_REVISION` | The revision value already exists in the target container and duplicate revisions are not allowed. | Change the `revision` field value to a unique value, or update `allow_duplicate_revisions` in upload requirements. |
| 422 | `PERMISSION_DENIED` | The integrator lacks permission to submit this upload. | Verify the service account has "Submit New Files" permission in the project's Document Management tool. |
| 422 | `WORKFLOW_CONFLICT_INSUFFICIENT_PERMISSION` | User lacks permission to terminate existing workflows. | Contact a project admin or workflow manager to submit the document, or escalate permissions. |
| 422 | `WORKFLOW_CONFLICT` | Existing revisions in the target container have active workflows and the project is configured to prevent concurrent revision workflows. | Re-submit with `termination_reason` and `terminated_revision_status_id` added to each conflicting upload. |

**Resolving `WORKFLOW_CONFLICT`:**
When submitting uploads that may supersede or close out existing document revision workflows, you can optionally terminate those workflows as part of the submission. To terminate existing workflows safely, always send the latest `upload_latest_event_id` for each upload and provide:
- **`termination_reason`** a human-readable reason for terminating the existing workflows (e.g., `"Superseded"`, `"Replaced by new revision"`)
- **`terminated_revision_status_id`** metadata value ID of the status to apply to the terminated revisions. To find valid status IDs, call the [metadata values endpoint](#step-3-fetch-values-for-dropdown-fields) for the `status` field: `GET .../fields/status/values`


Terminating workflows requires project admin or workflow manager permissions. If your account lacks these permissions, the error returns `WORKFLOW_CONFLICT_INSUFFICIENT_PERMISSION`.

<details>
<summary class="collapseListTierOne">View example workflow conflict error response</summary>
<pre><code>{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation errors detected",
    "details": [
      {
        "reason_code": "WORKFLOW_CONFLICT",
        "message": "Multiple workflows detected in container",
        "source": "01JDXMPK0MTP0H41D4PYZ62R6R",
        "document_container_id": "01JDXMPK0WDC0988N6EQQW4GA1",
        "existing_revisions_with_workflows": [
          {
            "id": "01JDXMPK0XCR0877P5DPPV3FB2",
            "name": "A101-Floor-Plan.pdf",
            "revision": "Rev A",
            "workflow_instance_id": "01JDXMPK0YWF0766Q4CNNR2EC3",
            "assigned_workflow": "Standard Review",
            "workflow_current_step": "Under Review",
            "status": "In Review"
          }
        ],
        "conflicting_uploads_with_workflow": [
          {
            "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
            "name": "A101-Floor-Plan-v2.pdf",
            "revision": "Rev B"
          }
        ]
      }
    ]
  }
}</code></pre>
</details>

<details>
<summary class="collapseListTierOne">View example resolution request</summary>
<pre><code>{
  "uploads": [
    {
      "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
      "upload_latest_event_id": "01JDXMPK0REV0D87H0JVVZ8M2W",
      "termination_reason": "Superseded",
      "terminated_revision_status_id": "01JDXMPK0ZMV0655R3BMMQ1DD4"
    }
  ]
}</code></pre>
</details>

**Item-level failures (in `failures` array of HTTP 201):**

| Reason Code | Description | Resolution |
| --- | --- | --- |
| `CONCURRENCY_CONFLICT` | The upload was modified between your last read and submission. | Re-fetch the upload to get the current `latest_event_id` and retry submission with the updated value. |
| `UNKNOWN_FAILURE` | An unexpected server-side error occurred during processing of this upload. | Retry the submission for this upload ID. |

---

## Complete Example: End-to-End Workflow

Below is a condensed end-to-end example showing the full sequence of API calls to upload a single PDF document and submit it as a revision. Response examples in this walkthrough show only the values extracted for use in subsequent steps, not the full API response. 

<details markdown="1">
<summary class="collapseListTierOne">View full example</summary>

**1. Get upload requirements — `GET .../upload_requirements`**

```
GET /rest/v2.0/companies/8089/projects/2305/document_management/upload_requirements
```

Response includes `fields_required_by_project`: [`name`, `type`, `status`, `revision`], `additional_required_fields`: []. These are the fields you must populate in Step 6.

**2. Get project fields — `GET .../fields`**

```
GET /rest/v2.0/companies/8089/projects/2305/document_management/fields
```

Response includes fields: `type` (id: `01JDXMPK09FD0892J5BDMJD37D`), `revision` (id: `01JDXMPK0BFD0670G3Z9JFB15F`), `name` (id: `01JDXMPK0AFD0781H4ACKGC26E`), `status` (id: `01JDXMPK0CFD0569F2Y8HEA04G`).

**3. Get values for select-type fields — `GET .../fields/{name}/values`**

```
GET /rest/v2.0/companies/8089/projects/2305/document_management/fields/type/values
```

Response includes: `Drawing` (id: `01JDXMPK0HMV0N14A7S3C95V9N`), `Specification` (id: `01JDXMPK0JMV0M23B6R2B84T8P`).

```
GET /rest/v2.0/companies/8089/projects/2305/document_management/fields/status/values
```

Response includes: `Open` (id: `01JDXMPK0ZMV0655R3BMMQ1DD4`), `Closed` (id: `01JDXMPK0YMV0744S4ANNQ2CC3`).

**4. Create a document upload — `POST .../document_uploads`**

```
POST /rest/v2.0/companies/8089/projects/2305/document_management/document_uploads

{
  "uploads": [
    { "file_name": "A101-Floor-Plan.pdf", "mime_type": "application/pdf" }
  ]
}
```

Response (HTTP 201):
```json
{
  "data": [
    { "id": "01JDXMPK0MTP0H41D4PYZ62R6R", "file_locked": false }
  ]
}
```

Save the `id` value (`01JDXMPK0MTP0H41D4PYZ62R6R`) — this is your document upload ID, used in Steps 6, 7, and 8.

**5. Upload the binary file to Procore storage**

Follow the [Unified File Upload API Guide](https://developers.procore.com/documentation/tutorial-unified-file-uploads) for the complete request and response flow — POST to initialize the session, PUT the binary file to the presigned segment URLs, then PATCH to complete. Save `data.upload_id` from the POST response (`01JDXMPK0PFK0F69F2MXX40P4T`) — this becomes your `file_upload_id` in Step 6.

**6. Update the document upload — `PATCH .../document_uploads`**

Fields used from previous steps:
- `id`: document upload ID from Step 4 (`01JDXMPK0MTP0H41D4PYZ62R6R`)
- `file_upload_id`: `upload_id` from Step 5 (`01JDXMPK0PFK0F69F2MXX40P4T`)
- `type` field ID and `Drawing` value ID from Steps 2 and 3
- `status`, `revision`, `name` field IDs from Step 2; `Open` value ID from Step 3

```json
PATCH /rest/v2.0/companies/8089/projects/2305/document_management/document_uploads

{
  "update_params": [
    {
      "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
      "file_upload_id": "01JDXMPK0PFK0F69F2MXX40P4T",
      "upload_status": "COMPLETED",
      "fields": [
        { "id": "01JDXMPK09FD0892J5BDMJD37D", "values": ["01JDXMPK0HMV0N14A7S3C95V9N"] },
        { "id": "01JDXMPK0CFD0569F2Y8HEA04G", "values": ["01JDXMPK0ZMV0655R3BMMQ1DD4"] },
        { "id": "01JDXMPK0BFD0670G3Z9JFB15F", "values": ["Rev A"] },
        { "id": "01JDXMPK0AFD0781H4ACKGC26E", "values": ["Floor Plan Level 1"] }
      ]
    }
  ]
}
```

Response (HTTP 207):
```json
{
  "data": {
    "success": [
      { "id": "01JDXMPK0MTP0H41D4PYZ62R6R" }
    ],
    "failed": []
  }
}
```

Verify your upload ID appears in `success` and `failed` is empty before proceeding. If the ID appears in `failed`, resolve the issue and re-PATCH before continuing.

**7. Get latest event ID — `GET .../document_uploads/{id}`**

Call the show endpoint to retrieve `latest_event_id`. For PDF files, also check `integrationStatuses.ML` — if it is still `"in_progress"` and you want to use ML-populated fields, wait until it reaches `"completed"` or `"error"` before submitting.

```
GET /rest/v2.0/companies/8089/projects/2305/document_management/document_uploads/01JDXMPK0MTP0H41D4PYZ62R6R
```

Response:
```json
{
  "data": {
    "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
    "upload_status": "COMPLETED",
    "integrationStatuses": {
      "ML": "completed",
      "FILENAME_SCRAPING": "completed"
    },
    "latest_event_id": "01JDXMPK0REV0D87H0JVVZ8M2W",
    "fields": [
      { "id": "01JDXMPK09FD0892J5BDMJD37D", "name": "type", "values": [{ "label": "Drawing" }], "label_source": "MANUAL" },
      { "id": "01JDXMPK0BFD0670G3Z9JFB15F", "name": "revision", "values": [{ "label": "Rev A" }], "label_source": "MANUAL" },
      { "id": "01JDXMPK0AFD0781H4ACKGC26E", "name": "name", "values": [{ "label": "Floor Plan Level 1" }], "label_source": "MANUAL" },
      { "id": "01JDXMPK0CFD0569F2Y8HEA04G", "name": "status", "values": [{ "label": "Open" }], "label_source": "MANUAL" }
    ]
  }
}
```

Save the `latest_event_id` (`01JDXMPK0REV0D87H0JVVZ8M2W`) — required for Step 8. Confirm all required fields are present in the `fields` array before submitting.

**8. Submit the upload as a revision — `POST .../document_revisions`**

Fields used from previous steps:
- `id`: document upload ID from Step 4 (`01JDXMPK0MTP0H41D4PYZ62R6R`)
- `upload_latest_event_id`: `latest_event_id` from Step 7 (`01JDXMPK0REV0D87H0JVVZ8M2W`)

```json
POST /rest/v2.0/companies/8089/projects/2305/document_management/document_revisions

{
  "uploads": [
    {
      "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
      "upload_latest_event_id": "01JDXMPK0REV0D87H0JVVZ8M2W"
    }
  ]
}
```

Response (HTTP 201):
```json
{
  "data": {
    "ids": ["01JDXMPK0TRV0BA5K8GSSY6J0Y"],
    "failures": []
  }
}
```

Check the `failures` array even on a 201 response. If empty, the document is now a permanent revision — use the revision ID (`01JDXMPK0TRV0BA5K8GSSY6J0Y`) for any subsequent references.

</details>

---

## Additional Resources

- [Document Management Integration Overview]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %})
- [Document Management API Endpoints]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_api_endpoints.md %})
- [Document Management Metadata Details]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %})
- [Introduction to OAuth 2.0]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %})
- [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %})
- [Procore Support: Document Management](https://v2.support.procore.com/product-manuals/document-management-project)
