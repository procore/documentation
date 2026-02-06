---
permalink: /document-management-metadata-details
title: Document Management Metadata Details
layout: default
section_title: Document Management Integration

---
Document metadata is the foundation of how Procore Document Management (PDM) organizes, filters, and manages documents.  
Document Metadata is a set of attributes that provide information about a document. Metadata can include file-level attributes (Type, Discipline, Number, Status) that describe what the document is, project/company attributes (Location, Trade, Area, etc.) that describe where and how the document applies, and other custom fields configured at the project level.

This reference describes the metadata structure returned by **Document Upload** and **Document Revision** API endpoints.

***
<details>
<summary class="collapseListTierOne">Overview of document metadata fields</summary>
<pre><code>{
  "id": "string",
  "fields": [
    {
      "id": "string",
      "name": "string",
      // One of: string, lov_entry, lov_entries, reference, rich_text, timestamp, numeric
      "type": "string",
      "values": [
        // For text-based types (string, rich_text, timestamp, numeric):
        { "label": "string" },

        // For lov_entry/lov_entries types:
        {
          "id": "string",
          "code": "string",
          "label": "string",
          "active": "boolean",
          "tags": ["string"]
        },
        
        // For reference type:
        { "id": "string", "code": "string", "label": "string" }
      ],
      // Optional - field subtype (e.g., computed, procore_user, procore_project)
      "variant": "string",
      "label_source": "string",
      // Optional - present when label_source is 'ML', range 0-1
      "confidence_score": 0.95,
      "label": "string",
      "description": "string"
    }
  ],
  "fileKey": "string",
  "file_locked": "boolean",
  "integrations": {
    "ml_processing": {
      "errors": [
        {
          "source": "string",
          "message": "string",
          "field_id": "string",
          "reason_code": "string"
        }
      ],
      "success": [
        {
          "source": "string",
          "field_id": "string"
        }
      ]
    },
    "bim_processing": {
      "bim_file_extraction_id": "string",
      "status": "string",
      "errors": []
    },
    "scraping_processing": {
      "errors": [
        {
          "source": "string",
          "message": "string",
          "field_id": "string",
          "reason_code": "string"
        }
      ],
      "success": [
        {
          "source": "string",
          "field_id": "string"
        }
      ]
    }
  },
  "matchCriteria": "string",
  "upload_status": "string",
  "integrationStatuses": {
    "ML": "string",
    "FILENAME_SCRAPING": "string",
    "integrationResponse": {
      "type_ML": {
        "valueId": "string",
        "valueName": "string"
      },
      "number_ML": {
        "valueId": "string",
        "valueName": "string"
      },
      "description_ML": {
        "valueId": "string",
        "valueName": "string"
      },
      "number_scraping": {
        "valueId": "string",
        "valueName": "string"
      },
      "date_authored_ML": {
        "valueId": "string",
        "valueName": "string"
      }
    }
  },
  "upload_requested_at": "string",
  "document_container_id": "string",
  "position_within_container": "string",
  "latestEventId": "string",
  "download_url": "string",
  "upload_completed_at": "string"
}
</code></pre>
</details>

***

## Document Metadata Structure
Document metadata fields can be categorized based on how their values are set:

**Editable via API** - Fields that can be populated and updated by an integrator through PDM API endpoints.  
**System-Generated** - Fields that are automatically populated by PDM and cannot be directly modified through API calls. These fields are provided in API responses for informational purposes.

### Standard Metadata Fields  
Standard fields available across all projects for document organization and classification. All fields in this table are **editable** via PDM API.

| Name | Type | Description |
|---|---|---|
| **authored_by** | reference | The person who created the document. Defaults to uploader if not provided. |
| **classification** | lov_entry | Subtype of a document. |
| **date_authored** | timestamp | Date the document was created. Auto-populated from document content when detected, but can be edited via API. |
| **description** | string | A brief title for the document. |
| **discipline** | lov_entry | Discipline associated with the document. |
| **document_stage** | lov_entry | The associated stage of the document lifecycle. |
| **file_locked** | boolean | Whether the file is locked for editing. Can be toggled via API. |
| **location** | reference | Location associated with the document. Can be extracted from filename via naming standard, but can be edited via API. |
| **name** | string | Unique identifier for a document. |
| **number** | string | Numerical digits that are usually located at the end of a document's name. |
| **originator** | reference | Name of the company that the person who created or uploaded the document is an employee of. |
| **placeholder_assignee** | reference | Assignee of the placeholder document. |
| **placeholder_due_date** | timestamp | Due date of the placeholder document. |
| **project** | reference | An abbreviation of the project's name. |
| **project_stage** | reference | The construction stage associated with the document. |
| **revision** | string | Letter, number, or combination of letters and numbers that identifies a specific version of the document. |
| **status** | lov_entry | State of a document as it goes through a workflow. |
| **type** | lov_entry | The category of the document. |
| **upload_status** | string | Current status of the document: `INCOMPLETE`, `COMPLETED`, or `PLACEHOLDER`. Can be set explicitly via API or transitions automatically based on required field completion. |
| **volume** | lov_entry | Groups related documents together as needed. |

While the following fields cannot be modified directly, they provide critical information about document state, workflow status, and lifecycle events. 

### System Fields

System-generated fields are automatically populated and cannot be directly modified via PDM API.

| Name | Type | Description | Lifecycle |
|---|---|---|---|
| **action_required** | lov_entries | Document error which requires action. | Set when issues detected |
| **created_at** | timestamp | Timestamp when the document was created. | Set at creation |
| **document_container_id** | string | Container ID where the document belongs, determined by metadata matching. | Set after metadata evaluation |
| **download_url** | string | URL to download the file. | Generated on request |
| **file_size** | string | Size of file in bytes. | Set on file upload |
| **file_key** | string | File upload ID returned by the file upload API. | Set on file upload |
| **format** | string | File format/type derived from MIME type. | Set on file upload |
| **id** | string | Unique identifier assigned at upload creation. Use this ID for update operations. | Set at creation |
| **integrationStatuses** | object | Status of active integrations. | Set at creation, updates during processing |
| **integrations** | object | Detailed integration information. | Set at creation, updates during processing |
| **item_content** | lov_entry | Indicates whether the item is a Document or a Placeholder. | Set at creation |
| **latestEventId** | string | Event ID for optimistic concurrency control. | Updated on each state change |
| **matchCriteria** | string | Identifier generated based on naming standard and file format used for grouping documents into containers. | Set at creation, updates on metadata change |
| **original_filename** | string | Original file name of a document at the time of upload. | Set at creation |
| **position_within_container** | string | Sort position within the document container. | Set when containerized |
| **recycled_at** | timestamp | Timestamp when the document was moved to the Recycle Bin. | Set on recycling |
| **recycled_by** | reference | User who moved the document to the Recycle Bin. | Set on recycling |
| **recycled_reason** | string | Reason the document was moved to the Recycle Bin. | Set on recycling |
| **submitted_into_drawings** | lov_entry | Whether the document was submitted into the Drawings tool. | Set when submitted to Drawings |
| **submitted_into_drawings_at** | timestamp | Timestamp when the document was submitted into the Drawings tool. | Set when submitted to Drawings |
| **submitted_into_drawings_by** | reference | User who submitted the document into the Drawings tool. | Set when submitted to Drawings |
| **updated_at** | timestamp | Timestamp when the upload was last updated. | Updated on metadata change |
| **updated_by** | reference | User who last updated the document. | Updated on metadata change |
| **upload_completed_at** | timestamp | Timestamp when upload processing completed. | Set when upload completes |
| **upload_requested_at** | timestamp | Timestamp when the upload was originally requested/initiated. | Set at upload creation |
| **uploaded_at** | timestamp | Timestamp when the file uploaded. | Set on file upload completion |
| **uploaded_by** | reference | User who uploaded the document. | Set at creation |
| **version** | string | Autogenerated sequential version number that differentiates a document within a container. | Set on revision creation |

### Placeholder Fields

Placeholder fields enable creation of document uploads for files that are expected to be delivered at a future date. These fields act as container for anticipated document information, such as name, type, due date, and the responsible party. Once the actual file is ready, it can be uploaded and linked to the corresponding placeholder. Editable placeholder fields (`placeholder_assignee` and `placeholder_due_date`) are listed in the [Standard Metadata Fields](#standard-metadata-fields) section.

| Name | Type | Description | Lifecycle |
|---|---|---|---|
| **placeholder_created_by** | reference | User who created the placeholder. | Set at creation |

### Workflow Fields

Workflow-controlled fields track document review and approval processes. All fields in this table are managed by the **workflow engine** and cannot be edited via API.

| Name | Type | Description | Lifecycle |
|---|---|---|---|
| **assigned_workflow** | reference | Workflow that is selected and assigned for the document. | Set when workflow assigned |
| **in_active_workflow** | lov_entry | Indicates whether the document is currently in an active workflow. | Set when workflow starts/ends |
| **workflow_assignees** | reference | Assignee(s) responsible for responding to workflow steps. | Set by workflow configuration |
| **workflow_completion_date** | timestamp | Timestamp when a document reached an end step in the last workflow completed. | Set when workflow completes |
| **workflow_current_step** | string | Current step in the workflow process. | Updated as workflow progresses |
| **workflow_current_step_assignees** | reference | Assignee(s) currently responsible for responding to the workflow step. | Set by workflow configuration |
| **workflow_manager** | reference | Person assigned as manager of the workflow template the document is in. | Set when workflow initiated |
| **workflow_pending_assignees** | reference | User(s) whose responses are required before the workflow advances. | Set by workflow configuration |
| **workflow_status** | reference | Current status of the workflow. | Updated by workflow actions |
| **workflow_step_due_date** | timestamp | Due date for current workflow step. | Set by workflow rules |
| **workflow_template_version** | reference | Version of the workflow template assigned. | Set when workflow assigned |

## Custom Fields

Projects can define custom metadata fields specific to their organizational needs. Custom fields:

- **Are project-specific**: Different projects may have different custom fields based on assigned fieldsets
- **Follow standard types**: Use the same type system as standard fields 
- **Appear in requirements**: Can be marked as required in upload requirements
- **Integrate with naming standards**: Some custom fields can be extracted from filenames
- **Support workflows**: Can be used in workflow rules and permission groups

To retrieve available fields for a project (including custom fields), use the [List Project Fields](https://developers.procore.com/reference/rest/project-fields?version=latest) endpoint:
The response includes both standard fields and project-level custom fields. **A field is identified as a custom field when `custom_field_definition_id` is present in the response.**

## Field Type Reference

In the [Document Uploads](https://developers.procore.com/reference/rest/document-uploads?version=2.0) API response, each field object in the `fields` array includes a `type` property that determines its value format and structure.

### Field Type Overview

| Type | Description |
|---|---|
| **string** | Text values (UTF-8 encoded) |
| **rich_text** | Text with optional markup |
| **timestamp** | Date and time in ISO 8601 UTC format |
| **numeric** | String-encoded numeric values - integers or decimals (e.g., "42", "3.14") |
| **lov_entry** | Single selection from project-configured list of values |
| **lov_entries** | Multiple selections from project-configured list of values |
| **reference** | Link to another entity such as users, locations, or workflows |

### Field Value Structure in Responses

All metadata fields follow a consistent structure in Document Upload and Document Revision API responses:

```json
{
  "id": "field_id",
  "name": "field_name",
  "type": "string|timestamp|lov_entry|reference|...",
  "label": "Display Name",
  "description": "Field description",
  "values": [
    // Value structure depends on type - see examples below
  ],
  "label_source": "MANUAL|SYSTEM|ML|FILENAME_SCRAPING|NONE|...",
  "variant": "optional - entity subtype for reference/lov fields",
  "confidence_score": 0.95  // Present only for ML-populated fields
}
```

### Example Field Responses

**String field:**
```json
{
  "name": "number",
  "type": "string",
  "values": [{"label": "A-101"}],
  "label_source": "FILENAME_SCRAPING"
}
```

**List of Values (LOV) Fields**  
`lov_entry` and `lov_entries` fields represent dropdown options configured at the project level. When querying metadata, field values include:

- id: The unique identifier for the value.
- label: Human-readable display name
- code: Short code identifier (optional, used for filename matching)
- active: Whether this value is currently available for selection
- tags: Special attributes used by ML and other integrations

**lov_entry (single selection):**
```json
{
  "name": "type",
  "type": "lov_entry",
  "values": [{
    "id": "G3V1QMUWQ280JS5PIYN7HKH0G",
    "label": "Drawing",
    "code": "DWG",
    "active": true,
    "tags": ["ML:auto-detect.type.drawing"]
  }],
  "label_source": "ML",
  "confidence_score": 0.95
}
```

**lov_entries (multiple selections):**
```json
{
  "name": "action_required",
  "type": "lov_entries",
  "values": [
    {
      "id": "UA438V8CXJCN5IR1D8ERQEG23",
      "label": "Missing Required Field",
      "code": "MISSING_FIELD",
      "active": true
    },
    {
      "id": "X53VE6ERY1KJIYPWD0WVS7N1C",
      "label": "Invalid Format",
      "code": "INVALID_FORMAT",
      "active": true
    }
  ],
  "label_source": "SYSTEM"
}
```

**Reference field (user):**

```json
{
  "name": "uploaded_by",
  "type": "reference",
  "variant": "procore_user",
  "values": [{"id": "8972757", "label": "Jane Doe"}],
  "label_source": "SYSTEM"
}
```

### Querying Project Fields

To identify which fields are configured for a specific project, query the [List Project Fields](https://developers.procore.com/reference/rest/project-fields?version=latest#list-project-fields) endpoint.

## Metadata Population Sources

Metadata can be populated through several automated and manual mechanisms:

- **Naming Standards**: Project administrators can configure filename patterns to automatically extract metadata values. For details on naming standard configuration, see [Procore Support: Edit the Naming Standard for the Document Management Tool](https://v2.support.procore.com/product-manuals/document-management-project/tutorials/edit-the-naming-standard-for-the-document-management-tool).
- **Machine Learning (ML)**: For PDF files containing drawings or specifications, ML automatically processes and predicts field values.
- **Manual Input**: When you provide field values via API, those values override both naming standard extraction and ML predictions.

Each field's `label_source` property in API responses indicates how the value was populated.

## Understanding Field Value Sources

When metadata is populated in Document Management, each field includes a `label_source` property indicating how the value was populated:

| Source | Description | User-Overrideable? |
|---|---|---|
| **MANUAL** | Value was explicitly set by a user or API client | Yes - can be changed |
| **NONE** | Field has no source recorded or was never populated | Yes - can be set |
| **FILENAME_SCRAPING** | Value extracted from the document filename via naming standard | Yes - manual values override |
| **SCRAPING_FAILED** | Filename scraping was attempted but failed for this field | Yes - can be set manually |
| **ML** | Value populated by Machine Learning analysis | Yes - manual values override |
| **ML_FAILED** | ML analysis was attempted but failed for this field | Yes - can be set manually |
| **SYSTEM** | Value set by Document Management system automatically | No - system fields cannot be modified |

**Confidence Scores** (0.0 to 1.0) indicate how confident ML-based predictions are. Only present for `label_source: "ML"`; absent for other sources.

### Example: Field Value Sources in Practice

Here's how a single upload response might display different value sources:

```json
{
  "fields": [
    {
      "name": "type",
      "values": [{"id": "drawing_type_id", "label": "Drawing"}],
      "label_source": "ML",
      "confidence_score": 0.95
    },
    {
      "name": "discipline",
      "values": [{"id": "arch_id", "label": "Architectural"}],
      "label_source": "FILENAME_SCRAPING"
    },
    {
      "name": "number",
      "values": [{"label": "A-101"}],
      "label_source": "MANUAL"
    },
    {
      "name": "revision",
      "values": [],
      "label_source": "SCRAPING_FAILED"
    },
    {
      "name": "created_at",
      "values": [{"label": "2026-01-23T21:09:04.662Z"}],
      "label_source": "SYSTEM"
    }
  ]
}
```

## ML and Integration Processing

### Integration Status Monitoring

When a Document Upload is returned, it includes `integrationStatuses` indicating the state of automated processing:

```json
{
  "integrationStatuses": {
    "ML": "in_progress", // One of: in_progress, completed, error, not_applicable
    "FILENAME_SCRAPING": "in_progress" // One of: in_progress, completed, error, not_applicable
  }
}
```

Before submitting a Document Upload as a Document Revision, verify that integrations have completed: check that `integrationStatuses.ML` and `integrationStatuses.FILENAME_SCRAPING` (if applicable) have transitioned to either `completed`, `error`, or `not_applicable`.

### BIM Processing Integration

Document Management can process 3D model files (BIM/Building Information Models) to extract structured data. Check `integrations.bim_processing` for BIM processing state:

```json
{
  "bim_processing": {
    "bim_file_extraction_id": "string or null",
    "status": "not_applicable", // One of: not_applicable, not_started, pending, in_progress, ready, error
    "errors": []
  }
}
```

***
<details>
<summary class="collapseListTierOne">Click to view an example of Document Upload API response</summary>
<pre><code>{
  "id": "31OZMQFW8L1T82WOY8G7WH8TL",
  "fields": [
    {
      "id": "MG8XE61LVYN2UKFYBQXSVI4F3",
      "name": "updated_at",
      "type": "timestamp",
      "values": [ { "label": "2000-01-01T00:00:00.000Z" } ],
      "label_source": "SYSTEM",
      "label": "Date Updated",
      "description": "The date and time the document was last updated"
    },
    {
      "id": "FJI8TLPTERNJIQT6LF3W8MB0Z",
      "name": "uploaded_at",
      "type": "timestamp",
      "values": [ { "label": "2000-01-01T00:00:00.000Z" } ],
      "label_source": "SYSTEM",
      "label": "Date Uploaded",
      "description": "The date and time the document was uploaded to Procore"
    },
    {
      "id": "NFQRRFRI2WXQNDKM8MHFG2FC6",
      "name": "in_active_workflow",
      "type": "lov_entry",
      "values": [ { "id": "TYRCJ5TIQ7ER8WGJXZMOIK9W5", "code": "", "tags": [], "label": "No", "active": true } ],
      "label_source": "SYSTEM",
      "label": "In Active Workflow",
      "description": "Indicates if the document is currently in an active workflow"
    },
    {
      "id": "O1QROZV3IXNPAH2PJ72A4FK9B",
      "name": "uploaded_by",
      "type": "reference",
      "values": [ { "id": "8972757", "code": "", "label": "Jane Doe" } ],
      "variant": "procore_user",
      "label_source": "SYSTEM",
      "label": "Uploaded By",
      "description": "The person who uploaded the document to Procore"
    },
    {
      "id": "LY9NVSGHOK9OF0TQP5SXS7SNI",
      "name": "file_size",
      "type": "string",
      "values": [ { "label": "405475" } ],
      "label_source": "SYSTEM",
      "label": "Size",
      "description": "The amount of storage or space the document uses"
    },
    {
      "id": "4GZVLETC6T4ESGXW6ZYOX1FV5",
      "name": "classification",
      "type": "lov_entry",
      "values": [],
      "label_source": "NONE",
      "label": "Level",
      "description": "The level of a building or structure"
    },
    {
      "id": "58IC8WRCV30EE1URJHN19TNY1",
      "name": "workflow_step_due_date",
      "type": "timestamp",
      "values": [],
      "label_source": "NONE",
      "label": "Workflow Step Due",
      "description": "The due date for the current workflow step to be completed"
    },
    {
      "id": "64Q03PT52MF8LOWIZ7QKBVGWT",
      "name": "date_authored",
      "type": "timestamp",
      "values": [],
      "label_source": "ML_FAILED",
      "confidence_score": 0,
      "label": "Date Authored",
      "description": "The date the document was authored"
    },
    {
      "id": "GT6JHAY20I1B8EU8W8OD79ZE7",
      "name": "originator",
      "type": "reference",
      "values": [],
      "variant": "procore_vendor",
      "label_source": "SYSTEM",
      "label": "Originator",
      "description": "The company that employs the author of a document "
    },
    {
      "id": "TYDBJ9O0KI190ATV1DLMQ2NLZ",
      "name": "workflow_current_step",
      "type": "string",
      "values": [],
      "label_source": "NONE",
      "label": "Current Workflow Step",
      "description": "The Step in the workflow in which the document is currently at"
    },
    {
      "id": "ZCSWZJS8VLG7CQXU8ECGGGG2Y",
      "name": "discipline",
      "type": "lov_entry",
      "values": [],
      "label_source": "SCRAPING_FAILED",
      "label": "Discipline",
      "description": "The discipline associated with this document like architectural, electrical, etc."
    },
    {
      "id": "15WXIWB104E2ZO7O7UBZM55RK",
      "name": "created_at",
      "type": "timestamp",
      "values": [ { "label": "2026-01-14T20:10:05.754Z" } ],
      "label_source": "SYSTEM",
      "label": "Created At",
      "description": "The date the document was created"
    },
    {
      "id": "IUEO5LXJU0MQUK5JA8BYDXUVC",
      "name": "project_stage",
      "type": "reference",
      "values": [],
      "variant": "procore_project_stage",
      "label_source": "NONE",
      "label": "Project Stage",
      "description": "The construction stage associated with the document. Formerly known as Stage."
    },
    {
      "id": "VPGW834ONMDD9BY5SRJYAJJVS",
      "name": "location",
      "type": "reference",
      "values": [],
      "variant": "procore_location",
      "label_source": "NONE",
      "label": "Location",
      "description": "Locations associated with the document pulled from Project Locations"
    },
    {
      "id": "NQ7KXAVMU8D7WLGGC230SX51Y",
      "name": "revision",
      "type": "string",
      "values": [ { "label": "1" } ],
      "label_source": "MANUAL",
      "label": "Revision",
      "description": "A printed identification number, letter, or a combination on a document, which may include special characters like hyphens. Mostly used on Drawings and specifications."
    },
    {
      "id": "AI1SJGE010FDKTMITHTS3CRIE",
      "name": "number",
      "type": "string",
      "values": [ { "label": "I" } ],
      "label_source": "FILENAME_SCRAPING",
      "label": "Number",
      "description": "The numerical digits usually located at the end of a document's name"
    },
    {
      "id": "18BXQ6CNKMP508FGW1HXIWHY1",
      "name": "authored_by",
      "type": "reference",
      "values": [ { "id": "8972757", "code": "", "label": "Jane Doe" } ],
      "variant": "procore_user",
      "label_source": "SYSTEM",
      "label": "Authored By",
      "description": "The person who created the document"
    },
    {
      "id": "9ADT5C4E6NH1WV8QG3CN8P2GP",
      "name": "updated_by",
      "type": "reference",
      "values": [ { "id": "9168335", "code": "", "label": "John Doe" } ],
      "variant": "procore_user",
      "label_source": "NONE",
      "label": "Updated By",
      "description": "The person who last updated the document"
    },
    {
      "id": "QIZQQ34RPJJ9GRG423CVSGQDP",
      "name": "assigned_workflow",
      "type": "reference",
      "values": [ { "id": "90482", "code": "", "label": "Another Workflow" } ],
      "variant": "procore_workflow_template_preset",
      "label_source": "MANUAL",
      "label": "Assigned Workflow",
      "description": "The workflow that's selected and in progress for the document"
    },
    {
      "id": "9E6JMUTKDTWFPIIXCQUGB99BP",
      "name": "original_filename",
      "type": "string",
      "values": [ { "label": "TEST4-SP-I-17.pdf" } ],
      "label_source": "SYSTEM",
      "label": "File",
      "description": "The original file name of a document at the time of upload"
    },
    {
      "id": "U7E3CZW8N2IBQ50EHX8SP2F72",
      "name": "status",
      "type": "lov_entry",
      "values": [],
      "label_source": "NONE",
      "label": "Status",
      "description": "The state of a document as it goes through approval, rejection, etc."
    },
    {
      "id": "IKVS7H25PSF3VYD4ZXCRZQNBC",
      "name": "project",
      "type": "reference",
      "values": [ { "id": "2357041", "code": "TEST4", "label": "E2E Testing 1" } ],
      "variant": "procore_project",
      "label_source": "SYSTEM",
      "label": "Project",
      "description": "An abbreviation of a project's name pulled from the Project Admin tool (Project Code)"
    },
    {
      "id": "7T4FRFO5D2X3JH6XPNE2PYOHW",
      "name": "workflow_assignees",
      "type": "reference",
      "values": [],
      "variant": "procore_user",
      "label_source": "NONE",
      "label": "Workflow Assignees",
      "description": "All assignees responsible for responding to workflow steps"
    },
    {
      "id": "HGUGVJRTP3BXTD3JVI900NCGY",
      "name": "description",
      "type": "rich_text",
      "values": [ { "label": "MECHANICAL PIPE SCHEDULE" } ],
      "label_source": "ML",
      "confidence_score": 0.9999712657370914,
      "label": "Description",
      "description": "A brief title for the document"
    },
    {
      "id": "4K1NAV6MC5LLE211F06ICTBJX",
      "name": "name",
      "type": "string",
      "values": [ { "label": "TEST4-SP-I-17" } ],
      "variant": "computed",
      "label_source": "SYSTEM",
      "label": "Name",
      "description": "A document's unique identifier that can also be configured with a project's requirements"
    },
    {
      "id": "CWGGXADX0Y8R4KVCS4E7W4MZ1",
      "name": "volume",
      "type": "lov_entry",
      "values": [],
      "label_source": "NONE",
      "label": "Volume / System",
      "description": "A complete set of equipment that works together for one role or purpose like a solar-electric system"
    },
    {
      "id": "LRJLVME5FNY5DVU2XO52RBKGQ",
      "name": "workflow_manager",
      "type": "reference",
      "values": [],
      "variant": "procore_user",
      "label_source": "NONE",
      "label": "Workflow Manager",
      "description": "The person assigned as the manager of the workflow template in which the document is"
    },
    {
      "id": "DMUML7IYWGC4T7UCGCFH477NN",
      "name": "workflow_current_step_assignees",
      "type": "reference",
      "values": [],
      "variant": "procore_user",
      "label_source": "NONE",
      "label": "Current Step Assignees",
      "description": "The assignee(s) who is currently responsible for responding to the workflow step"
    },
    {
      "id": "52171P4U231QGCNQM1C7BLDO7",
      "name": "type",
      "type": "lov_entry",
      "values": [ { "id": "QQZ6KDZONTRIQQZUR9E7WES29", "code": "SP", "label": "Specification" } ],
      "label_source": "MANUAL",
      "label": "Type",
      "description": "The different categories of documents like drawings, specifications, or models"
    },
    {
      "id": "BVDPYGSC97Q5EKSV7N05G0WRP",
      "name": "workflow_status",
      "type": "reference",
      "values": [],
      "variant": "procore_workflow_status",
      "label_source": "NONE",
      "label": "Workflow Status",
      "description": "The status of the workflow such as processing, blocked, or complete"
    },
    {
      "id": "K01MXXPC0WPHMQU3KR0R9CC3B",
      "name": "format",
      "type": "lov_entry",
      "values": [ { "id": "BXKQOXKCOBDSD4AEE9SYLITTZ", "code": "application/pdf", "tags": [ "document-service:extension.pdf" ], "label": "PDF", "active": true } ],
      "label_source": "SYSTEM",
      "label": "Format",
      "description": "The file's extension type like EXCEL, PDF, etc."
    },
    {
      "id": "RMOAYBE6GS0WQXOWFJPE9IIHS",
      "name": "workflow_template_version",
      "type": "reference",
      "values": [],
      "variant": "procore_workflow_template_version",
      "label_source": "NONE",
      "label": "Workflow Template Version",
      "description": "The assigned version of the workflow template as one template may have different versions"
    },
    {
      "id": "GSO8UCN9L69UGF77U92WYJ7KZ",
      "name": "workflow_pending_assignees",
      "type": "reference",
      "values": [],
      "variant": "procore_user",
      "label_source": "NONE",
      "label": "Pending Assignees",
      "description": "User(s) who must respond before the workflow moves to the next step"
    },
    {
      "id": "GGXB7EVUK46Y42GM2VUL2CM8V",
      "name": "version",
      "type": "string",
      "values": [],
      "label_source": "SYSTEM",
      "label": "Version",
      "description": "Sequential numbers autogenerated by Procore to differentiate every document iteration submitted. This field is not editable."
    },
    {
      "id": "TGQ4R3LJLAW8NRA73PRMUODJJ",
      "name": "submitted_into_drawings_by",
      "type": "reference",
      "values": [],
      "variant": "procore_user",
      "label_source": "NONE",
      "label": "Submitted to Drawings Tool By",
      "description": "The person who submitted the document into the Drawings tool"
    },
    {
      "id": "WQIBTVNUMBAAZJTIUYS4FTB87",
      "name": "submitted_into_drawings_at",
      "type": "timestamp",
      "values": [],
      "label_source": "NONE",
      "label": "Submitted to Drawings Tool At",
      "description": "The date and time the document was last submitted into the Drawings tool"
    },
    {
      "id": "KS64S7K1MVOW36GM9DGYXME3B",
      "name": "submitted_into_drawings",
      "type": "lov_entry",
      "values": [ { "id": "01JCGGCHGBYW7G9VNWAB61NPK1", "code": "", "tags": [], "label": "No", "active": true } ],
      "label_source": "SYSTEM",
      "label": "Submitted to Drawings Tool",
      "description": "Indicates if the document has been submitted into Drawings tool"
    },
    {
      "id": "LSCNFDDRU1KYDFIZK3L4PHN1S",
      "name": "workflow_completion_date",
      "type": "timestamp",
      "values": [],
      "label_source": "NONE",
      "label": "Workflow Completion Date",
      "description": "The date and time when a document has reached an end step in the last workflow it completed."
    },
    {
      "id": "EMN5K7H0J261EFCFI7VAB66OX",
      "name": "custom_field_123",
      "type": "reference",
      "values": [],
      "variant": "with_code",
      "label_source": "NONE",
      "label": "PDM Custom Field",
      "description": "-"
    },
    {
      "id": "DQ7EITBYC3RFODDTLMW2ND6LG",
      "name": "recycled_by",
      "type": "reference",
      "values": [],
      "variant": "procore_user",
      "label_source": "NONE",
      "label": "Deleted By",
      "description": "The person who moved the document to the Recycle Bin"
    },
    {
      "id": "1JTFK2R6MXZVOSF2GNS15HLNA",
      "name": "recycled_at",
      "type": "timestamp",
      "values": [],
      "label_source": "NONE",
      "label": "Deleted On",
      "description": "The date and time the document was moved to the Recycle Bin"
    },
    {
      "id": "4016TXN1O519P83TIU0QYXPPJ",
      "name": "recycled_reason",
      "type": "string",
      "values": [],
      "label_source": "NONE",
      "label": "Reason for Deletion",
      "description": "The reason the document was moved to the Recycle Bin"
    },
    {
      "id": "6RAV5MTW6RGA8O68S2DFA6C6D",
      "name": "document_stage",
      "type": "lov_entry",
      "values": [],
      "label_source": "NONE",
      "label": "Document Stage",
      "description": "The associated stage of the document lifecycle"
    },
    {
      "id": "PBFEZZKTY0MVNX8511L5C6HSA",
      "name": "action_required",
      "type": "lov_entries",
      "values": [],
      "label_source": "NONE",
      "label": "Action Required",
      "description": "The document error which requires action"
    },
    {
      "id": "V362W72BAZ5Z8YOQ1C9543T7Z",
      "name": "placeholder_assignee",
      "type": "reference",
      "values": [],
      "variant": "procore_user",
      "label_source": "NONE",
      "label": "Placeholder Assignee",
      "description": "The assignee of the placeholder"
    },
    {
      "id": "YQG4KDNVZM7P5R2SJ11KC2UJ1",
      "name": "placeholder_due_date",
      "type": "timestamp",
      "values": [],
      "label_source": "NONE",
      "label": "Placeholder Due Date",
      "description": "The due date of the placeholder"
    },
    {
      "id": "AFFEDVZU6TTQZB6I3PHIG8R5G",
      "name": "item_content",
      "type": "lov_entry",
      "values": [ { "id": "Document", "label": "Document" } ],
      "label_source": "SYSTEM",
      "label": "Item Content",
      "description": "Whether the item is a Document or a Placeholder"
    }
  ],
  "file_key": "KTCLW72UX53NJS3CAW0HKC6Y1",
  "file_locked": false,
  "integrations": {
    "ml_processing": {
      "errors": [
        {
          "source": "revision",
          "message": "Automatic detection failed. Please enter value manually.",
          "field_id": "QNSTE3BC36F5WW9IY7N2D5OS0",
          "reason_code": "LOW_CONFIDENCE"
        },
        {
          "source": "date_authored",
          "message": "Automatic detection failed. Please enter value manually.",
          "field_id": "VBTZVW98L2QAZ7DBVGNMG398G",
          "reason_code": "LOW_CONFIDENCE"
        }
      ],
      "success": [
        {
          "source": "type",
          "field_id": "ZOR1ZWTJ3MHTT0TRTQ9VYBMYE"
        },
        {
          "source": "description",
          "field_id": "EJ8C9OWGNCPVYQGWYFFXQVRUH"
        },
        {
          "source": "number",
          "field_id": "UVD3PUHFKB6TBNOHQ2DQRKNL9"
        }
      ]
    },
    "bim_processing": {
        "errors": [],
        "status": "not_applicable",
        "bim_file_extraction_id": null
    },
    "scraping_processing": {
      "errors": [
        {
          "source": "File Format",
          "message": "File name is incomplete. Add the missing attribute, or rename and reupload the file.",
          "field_id": "01HKMVPPTHNT7BFZTXQMBXH243",
          "reason_code": "FILENAME_NOT_CONTAINS_CODE"
        },
        {
          "source": "Location",
          "message": "File name is incomplete. Add the missing attribute, or rename and reupload the file.",
          "field_id": "01GR1YE66XAJ28RE3G269PDEPW",
          "reason_code": "FILENAME_NOT_CONTAINS_CODE"
        },
        {
          "source": "Number",
          "message": "File name is incomplete. Add the missing attribute, or rename and reupload the file.",
          "field_id": "01GR1YE6FZ7T1P06055VRTY365",
          "reason_code": "FILENAME_NOT_CONTAINS_CODE"
        },
        {
          "source": "Originator",
          "message": "File name is incomplete. Add the missing attribute, or rename and reupload the file.",
          "field_id": "01GR1YE66XN52RKZK0Z7YE64AT",
          "reason_code": "FILENAME_NOT_CONTAINS_CODE"
        },
        {
          "source": "Project",
          "message": "File name is incomplete. Add the missing attribute, or rename and reupload the file.",
          "field_id": "01GR1YE66XZR3NT0317AKE5NK7",
          "reason_code": "FILENAME_NOT_CONTAINS_CODE"
        }
      ],
      "success": [
        {
          "source": "Description",
          "field_id": "01GR1YE5XMTKCPM8SPW68Z1E4T"
        }
      ]
    }
  },
  "matchCriteria": "TEST4-SP-I-17|application/pdf",
  "upload_status": "COMPLETED",
  "integrationStatuses": {
      "ML": "completed",
      "FILENAME_SCRAPING": "completed",
      "integrationResponse": {
          "type_ML": {
              "valueId": "YU0H5NUOLP7TA1VLNBQAZIHMG",
              "valueName": "Drawing"
          },
          "number_ML": {
              "valueId": "MP000",
              "valueName": "MP000"
          },
          "description_ML": {
              "valueId": "MECHANICAL PIPE SCHEDULE",
              "valueName": "MECHANICAL PIPE SCHEDULE"
          },
          "number_scraping": {
              "valueId": "I",
              "valueName": "I"
          },
          "date_authored_ML": {
            "valueId": "2000-01-01T00:00:00.000Z",
            "valueName": "2000-01-01T00:00:00.000Z"
          }
      }
  },
  "upload_requested_at": "2000-01-01T00:00:00.000Z",
  "document_container_id": null,
  "position_within_container": "aaa....",
  "download_url": "https://app.procore.com/rest/v1.0/companies/0/projects/0/collaborative_documents/document_uploads/31OZMQFW8L1T82WOY8G7WH8TL/download",
  "upload_completed_at": "2000-01-01T00:00:01.000Z"
}
</code></pre>
</details>

***
