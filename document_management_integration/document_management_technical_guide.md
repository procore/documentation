---
permalink: /document-management-technical-guide
title: Document Management Integration Technical Guide
layout: default
section_title: Document Management Integration

---

This guide walks you through the complete API workflow for uploading documents, enriching them with metadata, and submitting them as document revisions using the Procore Document Management V2 API.

Before starting, review the [Document Management Integration Overview]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %}) for prerequisites, core concepts, and best practices. Your service account will specifically need Upload New Files and Submit New Files permissions enabled in the project's Document Management tool.For a reference of all available endpoints, see [Document Management API Endpoints]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_api_endpoints.md %}).

> **Important:** We recommend developing and testing your integration against the [Procore Developer Sandbox](https://developers.procore.com/documentation/development-environments) before pointing your integration at a live project. The sandbox environment is a safe place to iterate on requests and validate responses without risk to real project data.

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
| 5 | `/rest/v1.1/projects/{project_id}/uploads` | POST, PUT, PATCH | Upload binary file to Procore storage — **uses the V1.1 Direct File Uploads API, not the V2 Document Management base path above** |
| 6 | `.../document_uploads` | PATCH | Associate the uploaded file, set metadata, mark upload as COMPLETED |
| 7 | `.../document_uploads/{document_upload_id}` | GET | Retrieve `latest_event_id` (required for submission) and optionally review Machine Learning (ML)-populated fields before submitting |
| 8 | `.../document_revisions` | POST | Submit uploads to create document revisions |

> **Flexible workflow:** The steps listed above present one approach for uploading and submitting a document to the Document Management tool. The workflow is not the only path to a working integration. The steps can be rearranged based on your specific integration needs and depending on when your binary file and metadata are available. We recommend reading through the full guide first, then reviewing the [Integration Patterns](#integration-patterns) below to choose the path that best fits your use case.

---

## Integration Patterns

The standard workflow described above (Steps 1–8) is the most comprehensive path, but not every step is required in every scenario. The binary file upload (Step 5) can happen at any point — before or after Steps 1–4. Steps 4–8 can be sequenced in different ways depending on when your metadata and binary files become available.

Prerequisites (Steps 1–3): Before choosing and executing one of the upload scenarios below, you will need to understand your project's upload requirements and gather the required field data.
* Execute Steps 1–3: Regardless of your chosen pattern, you will need to fetch your project's upload requirements (Step 1), project fields (Step 2), and metadata values (Step 3).
* Structure Your Metadata Fields: All scenarios require you to submit metadata, whether it is during the initial creation or a subsequent update. For exact JSON payload examples and rules on formatting this data, see [Constructing the Fields Array for API Requests]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %}#constructing-the-fields-array-for-api-requests).


### Scenario A — Asynchronous Metadata 

Best when your integration collects metadata separately from the file.

**Sequence:**
1. Create Document Uploads (Step 4)
2. Upload Binary File to Storage (Step 5)
3. Update Document Uploads with metadata, `file_upload_id`, and `upload_status: "COMPLETED"` (Step 6)
4. Retrieve `latest_event_id` (Step 7)
5. Submit as Revision (Step 8)

Between the Create Document Uploads request (Step 4) and the Update Document Uploads request (Step 6), the upload has `upload_status: INCOMPLETE` and is not visible in document upload list or show endpoints.

### Scenario B — Complete Metadata Available Upfront

Best when all metadata is known immediately at creation time.

**Sequence:**
1. Create Document Uploads with metadata included (Step 4)
2. Upload Binary File to Storage (Step 5)
3. Update Document Uploads with `file_upload_id` and `upload_status: "COMPLETED"` — no metadata changes needed (Step 6)
4. Retrieve `latest_event_id` (Step 7)
5. Submit as Revision (Step 8)

Between the Create Document Uploads request (Step 4) and the Update Document Uploads request (Step 6), the upload has `upload_status: INCOMPLETE` and is not visible in document upload list or show endpoints.

### Scenario C — File Already in Storage

Best when the binary file is already available. Upload the binary file first via the Direct File Uploads API, then include the resulting `file_upload_id` and all required metadata in your initial Create Document Uploads POST. This allows you to skip the Update Document Uploads request entirely.

**Sequence:**
1. Upload Binary File to Storage (Step 5)
2. Create Document Uploads with metadata and `file_upload_id` included (Step 4)
3. *(Skip Step 6 entirely)*
4. Retrieve `latest_event_id` (Step 7)
5. Submit as Revision (Step 8)

Including `file_upload_id` in the Create Document Uploads POST automatically links the binary and sets `upload_status` to `COMPLETED` — no INCOMPLETE window exists and the upload is immediately visible in list and show results.

---

> **About the Examples in This Guide**
> All request and response examples shown are condensed for readability and focus on essential fields. For complete schemas, all available fields, and HTTP status codes, click on the endpoint links throughout this guide.

## Steps 1–3: Gather Project Configuration

These are independent project-level lookups that can be called in any order. Since these responses reflect project-level configuration, you may choose to cache them rather than re-fetching on every upload — particularly if you are processing large batches. Before caching, verify that these values change infrequently in your target projects, as project administrators can update fields, values, and requirements at any time.

> **Pagination:** All list endpoints are paginated. The response includes a `Total` header with the total record count and a `Link` header with `next`/`prev`/`first`/`last` page URLs. Use the `page` and `per_page` query parameters to navigate pages. The default page size is 10 and the maximum is 100.

### Step 1: Fetch Upload Requirements

This endpoint returns all configured upload requirements for the project and it can be used to determine which fields must be populated before a document upload can be submitted as a revision. A project can have multiple upload requirements: a **default rule** that applies to all uploads, and optional **conditional rules** that apply based on a document's field values. For example, drawings may require different metadata than other document types. 

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
          { "id": "01JDXMPK09FD0892J5BDMJD37D", "name": "type",       "label": "Type",       "type": "lov_entry" },
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
            { "id": "01JDXMPK0HMV0N14A7S3C95V9N", "code": "DR", "label": "Drawing", "active": true }
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

- **`fields_required_by_project`** & **`additional_required_fields`** — Together, these arrays define the complete list of fields you must populate. `fields_required_by_project` always contains the baseline fields (Name, Type, Status, Revision). `additional_required_fields` contains extra fields specific to the matched requirement (e.g., drawings may strictly require `date_authored`).

- **`naming_standard`** — If present, the project enforces a naming standard. Procore will automatically attempt to extract metadata from filenames.

- **`allow_duplicate_revisions`** — If `false`, submitting a document with a revision value that already exists in its container will fail with a `DUPLICATE_REVISION` error.

> **Note:** Always ensure all fields in `fields_required_by_project` and `additional_required_fields` for your applicable requirement are populated before submitting document uploads .

---

### Step 2: Fetch Project Fields

Before you can populate metadata on a document upload, you need to know which fields are available for the project and what their IDs are.

**Request** — [List Project Fields](https://developers.procore.com/reference/rest/project-fields?version=2.0)

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

The response lists every user-settable field configured for the project. Save the ID of each field that appears in the `fields_required_by_project` and `additional_required_fields` arrays of the requirement object that matches your document's metadata (i.e., the one whose `rule_qualifiers` all match your values, or the default if none match). You will use these field IDs when populating document upload metadata.

The response excludes system-only fields (`file_format`, `assigned_workflow_template`) that are not user-settable. Fields with `readonly: true` cannot be set by the integrator, and fields with `active: false` or `visible: false` should generally be ignored. For a full reference of standard and system fields, field types, and value structures, see [Document Management Metadata Details]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %}).

> **Note on ML Auto-Population:** For PDF files, Procore may automatically populate some required fields via machine learning. When planning which fields to supply manually, account for this. See [ML and Automated Features]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %}#machine-learning-ml-and-automated-features) in the Overview for the full list of fields, precedence rules, and limitations.

---

### Step 3: Fetch Values for Dropdown Fields

For any required field with type `lov_entry` (single select) or `lov_entries` (multi-select), you must fetch the available metadata values to obtain valid value IDs.

**Request** — [List Project Metadata Values](https://developers.procore.com/reference/rest/project-metadata-values?version=2.0)

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

Make one request per field — the endpoint only accepts a single field at a time. Repeat this call for each `lov_entry` or `lov_entries` field you intend to populate, whether required or optional (e.g., `type`, `status`, `discipline`).

Use the `keyword` query parameter to filter results by value name without fetching the entire list. For example, if you only need the location value for "Floor 3", add `?keyword=Floor%203` to the request instead of paginating through all locations. This is useful for large value lists where you know the specific value you need.

---

## Steps 4–8: Upload and Submit Documents

These steps are performed for each batch of documents you upload. The exact ordering depends on your [workflow pattern](#integration-patterns).

### Step 4: Create Document Uploads

Initialize one or more document upload records. This registers the document(s) with the system and returns upload IDs.

**Request** — [Bulk Create Document Uploads](https://developers.procore.com/reference/rest/document-uploads?version=2.0#bulk-create-document-uploads)

```
POST /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads
```

**Request Body**

**Example 1: Minimal request (metadata set in the Update Document Uploads request, Step 6)**

<details>
<summary class="collapseListTierOne">View minimal request</summary>
<pre><code>{
  "uploads": [
    {
      "file_name": "A101-Floor-Plan.pdf",
      "mime_type": "application/pdf"
    },
    {
      "file_name": "A102-Elevation.pdf",
      "mime_type": "application/pdf"
    }
  ]
}</code></pre>
</details>

**Example 2: With metadata included upfront (Scenario B)**

If all required metadata is available before creating uploads, include the `fields` array:

<details>
<summary class="collapseListTierOne">View request with metadata</summary>
<pre><code>{
  "uploads": [
    {
      "file_name": "A101-Floor-Plan.pdf",
      "mime_type": "application/pdf",
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

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `file_name` | string | Yes | The filename of the document. Including the file extension is recommended. |
| `mime_type` | string | Yes | The MIME type of the file |
| `file_locked` | boolean | No | Whether to lock the file from edits. Default is `false`. |
| `file_upload_id` | string | No | UUID of a file already uploaded to Procore storage. Links the binary at creation time and automatically sets `upload_status` to `COMPLETED`. All uploads in the batch must either all include `file_upload_id` or none should; mixing is not allowed. |
| `fields` | array | No | Metadata fields that can be set at creation or update. See [Constructing the Fields Array for API Requests]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %}#constructing-the-fields-array-for-api-requests) for the expected format. Any fields omitted from a subsequent update are preserved. |

<details>
<summary class="collapseListTierOne">View Example Response (HTTP 201)</summary>
<pre><code>{
  "data": [
    {
      "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
      "file_locked": false
    },
    {
      "id": "01JDXMPK0NTP0G50E3NYY51Q5S",
      "file_locked": false
    }
  ]
}</code></pre>
</details>

A successful request returns HTTP `201 Created` with a `data` array containing one object per upload. Each object contains only two fields: `id` (the document upload ID) and `file_locked`. Save all `id` values — you will pass them in the Update Document Uploads request (Step 6) and the Submit Document Revisions request (Step 8). The endpoint does not return an upload URL; file content is uploaded separately via the Binary File Upload. Note that uploads created without a `file_upload_id` start with `upload_status: INCOMPLETE` and won't appear in list or show results until Step 6 is complete.

> **Batch failures:** Any validation error causes the entire batch to fail with a 4xx status code — no uploads are created. This differs from the Update Document Uploads endpoint, which returns HTTP `207` and supports partial success. For error codes and resolution steps, see [Error Reference](#error-reference).

> **Timeouts and retries:** This endpoint is not idempotent. If your request times out before the response arrives, the uploads may have already been created server-side. In that case, you will have no IDs to patch — the records are orphaned and will not affect subsequent operations. To avoid duplicating records, do not retry a POST unless you are certain no response was received.

---

### Step 5: Upload the Binary File

Upload the actual file content to Procore's storage using the Direct File Uploads API. For full request/response details, authentication requirements, multipart form mechanics, and **file size limits**, see the [Direct File Uploads guide]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %}).

The key output from this step is the **`uuid`** returned by `POST /rest/v1.1/projects/{project_id}/uploads`. This is your **`file_upload_id`** — the value you pass in the Update Document Uploads request (Step 6) to link the binary to the document upload record.

> **Sequencing:** The binary file upload has no dependency on the Create Document Uploads request — you can upload the file before or after initializing document upload records.

---

### Step 6: Update Document Uploads

Associate the uploaded file with the document upload, populate all required metadata fields, and mark the upload status as `COMPLETED`.

**Request** — [Bulk Update Document Uploads](https://developers.procore.com/reference/rest/document-uploads?version=2.0#bulk-update-document-uploads)

```
PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads
```

**Request Body Examples**

**Example 1: Update a single upload with all metadata**

<details>
<summary class="collapseListTierOne">View single upload update</summary>
<pre><code>{
  "update_params": [
    {
      "id": "01JDXMPK0MTP0H41D4PYZ62R6R",
      "file_upload_id": "01JDXMPK0PFK0F69F2MXX40P4T",
      "upload_status": "COMPLETED",
      "fields": [
        {
          "id": "01JDXMPK09FD0892J5BDMJD37D",
          "name": "type",
          "values": ["01JDXMPK0HMV0N14A7S3C95V9N"]
        },
        {
          "id": "01JDXMPK0CFD0569F2Y8HEA04G",
          "name": "status",
          "values": ["01JDXMPK0ZMV0655R3BMMQ1DD4"]
        },
        {
          "id": "01JDXMPK0BFD0670G3Z9JFB15F",
          "name": "revision",
          "values": ["Rev A"]
        },
        {
          "id": "01JDXMPK0AFD0781H4ACKGC26E",
          "name": "name",
          "values": ["Floor Plan Level 1"]
        }
      ]
    }
  ],
  "update_all_document_uploads": false,
  "only_update_empty_fields": false
}</code></pre>
</details>

**Example 2: Bulk update of multiple uploads (mixed success/failure)**

<details>
<summary class="collapseListTierOne">View bulk update request</summary>
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
  ],
  "update_all_document_uploads": false,
  "only_update_empty_fields": false
}</code></pre>
</details>

**Field Reference**

| Top-level Field | Type | Required | Description |
| --- | --- | --- | --- |
| `update_params` | array | Yes | Array of update objects, one per document upload to modify. Each object must include `id`. |
| `update_all_document_uploads` | boolean | No | If `true`, all document uploads matching any filter params will be updated. Default is `false`. |
| `only_update_empty_fields` | boolean | No | If `true`, only empty fields are updated — existing values including ML-populated ones are preserved. Default is `false`. |

**Fields within each `update_params` item:**
The `update_params` array contains one object per document upload to modify.

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | The document upload ID returned from the create step. |
| `file_upload_id` | string | No | The file upload UUID from the file upload step. Links the binary to the document upload record. |
| `upload_status` | string | No | Upload status of the document. Allowed values: `INCOMPLETE`, `COMPLETED`, `PLACEHOLDER`. Set to `COMPLETED` to trigger server-side verification that the file exists in storage. |
| `file_locked` | boolean | No | Whether to lock the file from edits. |
| `fields` | array | No | Array of field update objects. See [Constructing the Fields Array for API Requests]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %}#constructing-the-fields-array-for-api-requests) for payload structure and examples. |
| `fields[].id` | string | Yes (if `fields` provided) | The project field ID. |
| `fields[].values` | string[] | Yes (if `fields` provided) | For `lov_entry`/`lov_entries` fields: array of metadata value IDs. For `string`/`numeric`/`timestamp` fields: single-element array containing the text value. |
| `fields[].label_source` | string | No | Indicates how the field value was set. Allowed values: `MANUAL`, `ML`, `FILENAME_SCRAPING`, `SCRAPING_FAILED`, `ML_FAILED`, `SYSTEM`, `NONE`. Typically omitted — the system sets this automatically. |
| `fields[].confidence_score` | number | No | ML confidence score for the field value, between `0.0` and `1.0`. Only relevant for ML-populated fields. |

**Response**

The endpoint always returns HTTP 207 (Multi-Status) with `success` and `failed` arrays. Items in `success` contain only `id`. The `failed` array is populated only when `upload_status: "COMPLETED"` is set but Procore cannot confirm the file in storage — each failed entry includes `id`, `code`, and `message`. All other errors (type mismatches, invalid IDs, permission failures) fail the entire request with a 4xx.

<details>
<summary class="collapseListTierOne">View example response (HTTP 207, partial success)</summary>
<pre><code>{
  "data": {
    "success": [
      {
        "id": "01JDXMPK0MTP0H41D4PYZ62R6R"
      },
      {
        "id": "01JDXMPK0OTP0F32D2PWV40N4U"
      }
    ],
    "failed": [
      {
        "id": "01JDXMPK0NTP0G50E3NYY51Q5S",
        "code": "FILE_KEY_MISMATCH",
        "message": "File keys mismatch"
      },
      {
        "id": "01JDXMPK0PTP0E41C1QXU39M3T",
        "code": "FILE_KEY_MISMATCH",
        "message": "File keys mismatch"
      }
    ]
  }
}</code></pre>
</details>

> **Retrying:** PATCH updates are safe to retry — reapplying the same values overwrites existing ones without creating duplicates. For items in `failed`, fix the file storage issue and re-PATCH only those upload IDs with the correct `file_upload_id`. For whole-request 4xx failures (caused by type mismatches, invalid IDs, missing required fields, or permission errors), no update would have been made and you can fix the request body and retry the full request.

---

### Step 7: Retrieve Latest Event ID and Review Metadata

Issue a `GET` to the Show Document Upload endpoint to retrieve `latest_event_id` and review the current upload state before submitting.

**1. Retrieve `latest_event_id`**

The show response includes `latest_event_id` for every upload. Save this value — you must pass it as `upload_latest_event_id` when submitting in Step 8. If you don't need ML-enriched metadata, grab this ID and proceed immediately.

**2. Check async processing status**

Two background processes may auto-populate fields after `upload_status` is `COMPLETED`:

- **ML** (PDF files only) — Procore analyzes file content and may populate fields such as Type, Description, Number, Revision, and Date Authored. Check `integrationStatuses.ML` — once it reaches `completed` or `error`, ML processing is finished. For non-PDF files, this field will be absent or `"not_applicable"`.
- **Filename scraping** — Procore attempts to extract metadata from the filename. Check `integrationStatuses.FILENAME_SCRAPING` — present on every upload, but only produces meaningful metadata when the project has a naming standard configured.

If you intend to use ML- or filename-scraped values before submitting, wait until both statuses have changed from `"in_progress"` before proceeding.

> **Note on webhooks:** The `Document Upload.Completed` event fires when `upload_status` transitions to `COMPLETED` (Step 6), not when ML finishes. Subscribe to this event if you want to be notified as soon as an upload is ready for this step. See [Introduction to Webhooks]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}) and [Using the Webhooks API]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks_api.md %}) for setup details.

**3. Verify all required metadata**

Inspect the `fields` array to confirm all required fields are populated — by you or by ML — before proceeding. Submission in Step 8 permanently consumes the upload record, and developers can use this step to catch missing fields.

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
        "label_source": "manual",
        "label": "Type",
        "description": "The document type"
      },
      {
        "id": "01JDXMPK0BFD0670G3Z9JFB15F",
        "name": "revision",
        "type": "string",
        "values": [{ "label": "Rev A" }],
        "label_source": "manual",
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

**Key response fields:**

- **`latest_event_id`** — Save this value. Pass it as `upload_latest_event_id` when submitting in the next step.
- **`integrationStatuses.ML`** — For PDF files, transitions from `"in_progress"` to `"completed"` (or `"error"`) once ML analysis finishes. This transition has no associated webhook — it occurs asynchronously after `upload_status` is `COMPLETED`. For details on which fields ML populates, precedence rules, and limitations, see [ML and Automated Features]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %}#machine-learning-ml-and-automated-features) in the Overview.
- **`integrationStatuses.FILENAME_SCRAPING`** — Indicates whether metadata extraction from the filename has completed. Present on every upload, but only produces meaningful metadata when the project has a naming standard configured.
- **`permissions.allowed_actions`** — Does not reflect the user's full permission set. Upload and submit permissions are governed by project-level tool access. This field can be ignored during the upload workflow.

---

### Step 8: Submit Document Uploads as Revisions

Once a document upload has `upload_status: COMPLETED`, all required metadata fields populated, and a `latest_event_id` retrieved, it is ready to be submitted as a revision. Submitting creates a permanent, versioned document record in the project.

**Request** — [Create Document Revisions](https://developers.procore.com/reference/rest/document-revisions?version=2.0)

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
| `uploads` | array | Yes | Array of uploads to submit |
| `uploads[].id` | string | Yes | The document upload ID |
| `uploads[].upload_latest_event_id` | string | Yes | The `latest_event_id` value retrieved from the Get Document Upload request. |
| `uploads[].termination_reason` | string | Conditional | Required when `terminated_revision_status_id` is provided. Reason for terminating existing revision workflows (e.g., `"Superseded"`). See [Handling Workflow Conflicts](#handling-workflow-conflicts). |
| `uploads[].terminated_revision_status_id` | string | Conditional | Required when `termination_reason` is provided. The metadata value ID of the status to set on terminated revisions. |

<details>
<summary class="collapseListTierOne">View Example Response (HTTP 201)</summary>
<pre><code>{
  "data": {
    "ids": [
      "01JDXMPK0TRV0BA5K8GSSY6J0Y",
      "01JDXMPK0VRV0A94M7FRRX5H9Z"
    ],
    "failureIds": [],
    "failures": []
  }
}</code></pre>
</details>
**`ids`** — The created document revision IDs. These are stable, permanent identifiers — use them (not upload IDs) for any subsequent references or integrations.

**`failures`** — Array of per-item failures that occurred during processing. Check this array even on a 201 response. Each entry contains `upload_id`, `reason_code`, and `message`. `failureIds` is also present but deprecated — use `failures` instead.

<details>
<summary class="collapseListTierOne">View example response with failures</summary>
<pre><code>{
  "data": {
    "ids": ["01JDXMPK0TRV0BA5K8GSSY6J0Y"],
    "failureIds": ["01JDXMPK0NTP0G50E3NYY51Q5S"],
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

**Resource state after submission:** Submitted uploads are permanently consumed — removed from the uploads list and no longer retrievable. The documents now exist as revisions within document containers, which the system creates automatically based on metadata matching criteria.

> **Retrying:** Consumed upload IDs return HTTP `404` with `reason_code: "NOT_FOUND"` on any subsequent POST or GET. For partial failures, retry only the failed upload IDs — the successful ones are gone and cannot be resubmitted.

---

## Handling Workflow Conflicts

When submitting document uploads, you may encounter a `WORKFLOW_CONFLICT` error. This occurs when the target document container already has revisions with active workflows, and creating a new revision requires terminating those workflows.

### When Workflow Conflicts Occur

The system detects a conflict when:
1. The upload's metadata matches an existing document container (based on match criteria).
2. That container has existing revisions with active workflows.
3. The project has the `preventConcurrentRevisionWorkflows` setting enabled.

### Resolving Workflow Conflicts

When a `WORKFLOW_CONFLICT` error is returned, the response includes details about the conflicting workflows:

<details>
<summary class="collapseListTierOne">View workflow conflict error response</summary>
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

One approach to resolving this error is to re-submit the same request with the `termination_reason` and `terminated_revision_status_id` parameters added to the upload with the workflow conflict:

<details>
<summary class="collapseListTierOne">View resolution request with termination parameters</summary>
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

- **`termination_reason`** — A human-readable reason for terminating the existing workflows (e.g., `"Superseded"`, `"Replaced by new revision"`).
- **`terminated_revision_status_id`** — The metadata value ID representing the status to apply to the terminated revisions. To find valid status IDs, call the [metadata values endpoint](#step-3-fetch-metadata-values-for-select-type-fields) for the `status` field:

  ```
  GET .../fields/status/values
  ```

> **Note:** Your account must have sufficient permissions (project admin or workflow manager) to terminate workflows. If you lack permission, the error will return with reason code `WORKFLOW_CONFLICT_INSUFFICIENT_PERMISSION`.

---

## Error Reference

Use the `reason_code` to drive your error-handling logic, as it provides a stable, machine-readable identifier. Treat the `message` field as human-readable context that should not be parsed programmatically. 4xx errors share the following response structure:

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

### Create Document Uploads (Step 4)

| HTTP Status | Reason Code | Description | Resolution |
| --- | --- | --- | --- |
| 400 | `INVALID_PROPERTY` | The `uploads` key is missing from the request body or is not an array (e.g., the body uses a different key name). The `source` field in the error response will be `"uploads"`. | Ensure the top-level request body contains an `uploads` key whose value is an array. |
| 400 | `INVALID_PROPERTY` | `file_name` or `mime_type` is the wrong type or absent. | Ensure both fields are present in each upload object and are strings. |
| 400 | `INVALID_PROPERTY` | Some uploads in the batch include `file_upload_id` while others do not. | All uploads in a single request must either all include `file_upload_id` or none should. Split into separate requests if mixing upload flows. |
| 400 | `INVALID_PROPERTY` | A `file_upload_id` references a file that does not exist or is inaccessible. | Verify the `file_upload_id` is correct. The file may have expired or been deleted. Re-upload using the standard file upload flow (Steps 5 and 6). |
| 400 | `INVALID_PROPERTY` | A `file_upload_id` belongs to a different company or project than the one in the request URL. | Ensure the `file_upload_id` was created in the same company and project context as the request. Create a new file upload in the correct context if needed. |
| 400 | `INVALID_PROPERTY` | A field ID or value ID is not valid for the project. | Verify all field IDs match those returned by the List Project Fields request and all value IDs match those returned by the List Project Metadata Values request for the correct field. |
| 401 | `UNAUTHORIZED` | Authentication token is missing, invalid, or expired. | Provide a valid OAuth 2.0 access token. See [Authentication]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %}) for details. |
| 403 | `FORBIDDEN` | Current user or service account lacks the "Upload New Files" permission in the Document Management tool. | Contact your project admin to grant the service account access to the Document Management tool and assign it to a permission group with the "Upload New Files" permission enabled. |
| 500 | `INTERNAL_SERVER_ERROR` | The server encountered an unexpected error. | Retry the request after a short delay. If the error persists, contact Procore support. |

### Submit Document Uploads (Step 8)

Step 8 has two distinct failure modes: **request-level failures** (4xx) that reject the entire request before any uploads are processed, and **item-level failures** that appear in the `failures` array of an otherwise successful HTTP 201 response. Handle both in your integration.

**Request-level failures (4xx):**

| HTTP Status | Reason Code | Description | Resolution |
| --- | --- | --- | --- |
| 404 | `UPLOAD_NOT_FOUND` | The specified upload ID does not exist, has been deleted, or has already been successfully submitted (consumed uploads are removed from the uploads list). | Verify the upload ID is correct. If the upload was already submitted, retrieve its revision ID from the original submission response — do not re-submit it. |
| 422 | `FILE_KEY_MISMATCH` | The upload has no associated file in storage. | Ensure you successfully completed the Binary File Upload and the Update Document Uploads request using the resulting `file_upload_id` and `upload_status: "COMPLETED"`. |
| 403 | `PERMISSION_DENIED` | The current user lacks permission to submit this upload. | Verify the service account has "Submit New Files" permission in the project's Document Management tool. Non-admin users can only submit their own uploads. |
| 400 | `REQUIRED_FIELD_MISSING` | One or more required metadata fields are not populated. | Return to your Update Document Uploads request and populate all required fields identified in your List Project Upload Requirements response. |
| 400 | `INVALID_INPUT` | Invalid field or workflow configuration on the upload. | Check that all field values are valid (correct IDs, active values). |
| 400 | `HAS_ERRORS` | The upload has workflow validation errors. | Review workflow configuration and resolve any assignment issues. |
| 400 | `DUPLICATE_REVISION` | The revision value already exists in the target container and duplicate revisions are not allowed. | Change the `revision` field value to a unique value, or verify `allow_duplicate_revisions` in upload requirements. |
| 400 | `WORKFLOW_CONFLICT` | Existing revisions in the target container have active workflows. | Provide `termination_reason` and `terminated_revision_status_id` to resolve. See [Handling Workflow Conflicts](#handling-workflow-conflicts). |
| 403 | `WORKFLOW_CONFLICT_INSUFFICIENT_PERMISSION` | User cannot terminate existing workflows. | Contact a project admin or workflow manager to submit the document, or escalate permissions. |
| 400 | `BAD_REQUEST` | General validation failure. | Review the error `message` for specific details. |

**Item-level failures (in `failures` array of HTTP 201):**

| Reason Code | Description | Resolution |
| --- | --- | --- |
| `CONCURRENCY_CONFLICT` | The upload was modified between your last read and submission. | Re-fetch the upload to get the current `latest_event_id` and retry submission with the updated value. |
| `UNKNOWN_FAILURE` | An unexpected server-side error occurred during processing of this upload. | Retry the submission for this upload ID. If the error persists, contact Procore support. |

---

## Complete Example: End-to-End Workflow

Below is a condensed end-to-end example showing the full sequence of API calls to upload a single PDF document and submit it as a revision.

<details markdown="1">
<summary class="collapseListTierOne">View full example</summary>

**1. Get upload requirements**

```
GET /rest/v2.0/companies/8089/projects/2305/document_management/upload_requirements
```

Response shows `fields_required_by_project`: [`name`, `type`, `status`, `revision`], `additional_required_fields`: [].

**2. Get project fields**

```
GET /rest/v2.0/companies/8089/projects/2305/document_management/fields
```

Response includes fields: `type` (id: `01JDXMPK09FD0892J5BDMJD37D`), `revision` (id: `01JDXMPK0BFD0670G3Z9JFB15F`), `name` (id: `01JDXMPK0AFD0781H4ACKGC26E`), `status` (id: `01JDXMPK0CFD0569F2Y8HEA04G`).

**3. Get values for select-type fields**

```
GET /rest/v2.0/companies/8089/projects/2305/document_management/fields/type/values
```

Response includes: `Drawing` (id: `01JDXMPK0HMV0N14A7S3C95V9N`), `Specification` (id: `01JDXMPK0JMV0M23B6R2B84T8P`).

```
GET /rest/v2.0/companies/8089/projects/2305/document_management/fields/status/values
```

Response includes: `Open` (id: `01JDXMPK0ZMV0655R3BMMQ1DD4`), `Closed` (id: `01JDXMPK0YMV0744S4ANNQ2CC3`).

**4. Create a document upload**

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

**5. Upload the binary file via File Uploads API**

```
POST /rest/v1.1/projects/2305/uploads

{
  "response_filename": "A101-Floor-Plan.pdf",
  "response_content_type": "application/pdf"
}
```

Response:
```json
{
  "uuid": "01JDXMPK0PFK0F69F2MXX40P4T",
  "url": "https://s3.amazonaws.com/procore-uploads/...",
  "fields": {
    "key": "uploads/2305/01JDXMPK0PFK0F69F2MXX40P4T/A101-Floor-Plan.pdf",
    "policy": "...",
    "signature": "..."
  }
}
```

Then POST the file binary to the storage URL with the returned `fields` as multipart form data. Note the `uuid` (`01JDXMPK0PFK0F69F2MXX40P4T`) — this is your **`file_upload_id`**.

**6. Update the document upload**

```
PATCH /rest/v2.0/companies/8089/projects/2305/document_management/document_uploads

{
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
  ],
  "update_all_document_uploads": false,
  "only_update_empty_fields": false
}
```

Response (HTTP 207 — Success):
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

**7. Get latest event ID**

Call the show endpoint to retrieve `latest_event_id`. For PDF files, you can also inspect `integrationStatuses.ML` to see whether ML field auto-population has completed and review any ML-populated fields before submitting.

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
    "fields": [...]
  }
}
```

Capture the `latest_event_id` (`01JDXMPK0REV0D87H0JVVZ8M2W`) — you'll need it for Step 8.

**8. Submit the upload as a revision**

```
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
    "failureIds": [],
    "failures": []
  }
}
```

The document is now a permanent revision (`01JDXMPK0TRV0BA5K8GSSY6J0Y`) in the system.

</details>

---

## Additional Resources

- [Document Management Integration Overview]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %})
- [Document Management API Endpoints]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_api_endpoints.md %})
- [Document Management Metadata Details]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %})
- [Working with Direct File Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %})
- [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %})
- [Introduction to OAuth 2.0]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %})
- [Procore Support: Document Management](https://v2.support.procore.com/product-manuals/document-management-project)
