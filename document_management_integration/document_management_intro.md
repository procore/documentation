---
permalink: /document-management-intro
title: Document Management Integration Overview
layout: default
section_title: Document Management Integration

---

## Working with Document Management

The Procore Document Management (PDM) system provides a platform for integrators to programmatically sync documents from external systems into Procore projects.
Before you begin working with the various Document Management API endpoints, we recommend familiarizing yourself with the core concepts, architecture, and workflows outlined in this guide.

### Prerequisites

To get started with the Document Management API, ensure you have completed these steps:

- **Account Setup** - Create a Procore service account. See [Creating an App]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_create_new.md %}) for additional information.
- **Tool Setup** - Enable the Document Management tool at the Project level for the integrator app.
- **Authentication** - Leverage Procore's OAuth 2.0 framework to authenticate requests. See [Introduction to OAuth 2.0]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %}) for additional information.
- **Permissions** - [Permissions](https://v2.support.procore.com/faq-how-do-permissions-work-in-the-document-management-tool) control which users/services have access to the PDM tool and whether they can upload and submit documents. At the project level, your account must have 'Standard' or 'Admin' level permissions to the Document Management tool. At the tool level, your account must be part of one or more permission groups with 'Upload New Files' and 'Submit New Files' permissions enabled.
- **Required Fields** - Familiarize yourself with the project's:
  - Document [fields](https://procore-support-prototype-master.vercel.app/faq-what-are-the-different-fields-in-the-document-management-tool) and any [custom field](https://procore-support-prototype-master.vercel.app/product-manuals/document-management-project/tutorials/manage-custom-and-default-fields-and-fieldsets-for-the-document-management-tool) requirements
  - Naming Standards: whether your project enforces a [naming standard](https://procore-support-prototype-master.vercel.app/product-manuals/document-management-project/tutorials/edit-the-naming-standard-for-the-document-management-tool). Naming standards can help ensure consistency across your projects and enables automatic metadata population during upload
  - Revision setting: whether duplicate [revision](https://en-gb.support.procore.com/products/online/user-guide/project-level/document-management/tutorials/edit-upload-requirements-for-the-document-management-tool) identifiers are allowed.

  For Document Revision submission, all metadata fields marked as required by your project must be populated. Required fields are determined by:

  - Required fieldsets configured for the project
  - Individual fields marked as required
  - Fields from the project's naming standard (if enforced)

  Query the upload requirements endpoint to determine your specific metadata requirements.

Detailed information on the Document Management tool can be found at [Procore Support: Document Management](https://procore-support-prototype-master.vercel.app/product-manuals/document-management-project).

## Core Concepts

### Document Management Entities

Let's define some key entities and understand the role each plays in Document Management.

- **Document Metadata** - A set of attributes that provide information about a document. Metadata provides context about a file and enables filtering, searching, and better organization. Metadata can include file-level attributes (Type, Discipline, Number, Status) that describe what the document is, project/company attributes (Location, Trade, Area, etc.) that describe where and how the document applies, and other custom fields. As an integrator, you can provide metadata when creating or updating Document Uploads. Additional metadata is also automatically populated via machine learning (ML) analysis of the file content and via naming standards configured by project administrators. See [Metadata Details]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %}).

- **Document Upload** - A document submitted for upload to the Document Management tool. An Upload represents an intermediate stage before Document Revision creation. A Document Upload can be updated with additional metadata via the Document Upload Update API, then submitted to create a Document Revision. Each Document Upload is associated with a single Document Container.

- **Document Revision** - A versioned instance of a document created by submitting a Document Upload. The file content cannot be changed after creation (submit a new Upload to update the file), but metadata can be edited. Revisions with the same Name and Format automatically group into a version history chain with sequential numbering.

- **Document Container** - A set of related documents with common metadata. When a Document Upload is created, PDM calculates a match criteria from key metadata. Any upload that produces the same match criteria is routed into the same container, and every resulting Document Revision is placed into the same container. If metadata changes in a way that produces a new match criteria, the document is re-containerized into a different container.

See [Document Management - Glossary](https://en-gb.support.procore.com/products/online/user-guide/project-level/document-management/glossary) for additional definitions.

### Understanding Organization

**Folderless organization** - Document Management [does not](https://procore-support-prototype-master.vercel.app/faq-does-the-document-management-tool-support-folders/) support a traditional folder hierarchy. Organization is driven by document attributes and metadata. You must design your integration around document metadata instead of a folder structure.

**Version history grouping** - Document Revisions are automatically grouped into Document Containers based on their metadata. Each container maintains a version history chain with sequential version numbers. When you submit Document Revisions with the appropriate metadata, the system manages containerization and version numbering automatically. Providing consistent metadata values allows documents to be grouped correctly.

## How Document Management Works

The Procore Document Management (PDM) system is a metadata-driven platform that organizes project documents based on their attributes. It provides granular permission controls and uses ML to automate metadata detection.

PDM follows a two-stage workflow for ingesting documents:

**Stage 1: Document Upload** - Integrator uploads a file to Procore and sends a post request to document service upload endpoint. The system assigns a unique Upload ID, calculates container placement based on metadata, and triggers ML analysis. The upload can be edited and updated until submission. This stage allows for:
- Metadata review and enrichment before finalization
- Asynchronous ML-based classification and extraction
- Application of workflows before the Upload transitions to a Document Revision

**Stage 2: Document Revision Creation** - Integrator submits a Document Upload, which becomes a Document Revision with an auto-assigned version number. The revision is placed in a document container.

**Note on Editing Document Revisions**: While Document Revision metadata can be edited through the Procore web interface, the API does not currently provide an update endpoint for Document Revisions. If your integration requires metadata corrections after submission, you can either update the metadata during the Document Upload stage before submission, or users can make changes through the web interface.

For detailed step-by-step instructions on implementing this workflow, see the [Document Management Technical Guide]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_technical_guide.md %}).
For a complete list of API endpoints, see [Document Management API Endpoints]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_api_endpoints.md %})

## Machine Learning (ML) and Automated Features

The Document Management system includes features that can automatically enhance document metadata through the following mechanisms:

### Automatic Data Entry from File Contents

Procore uses ML algorithms to scan PDF file contents and recognize patterns to automatically populate the following fields for drawings and specifications:
- **Type** - Predicted as Drawing, Specification, or Other based on content analysis
- **Description** - For drawings, extracted from the title block on the drawing sheet
- **Number** - For drawings, extracted from the drawing number field on the sheet
- **Revision** - For drawings, extracted from the revision identifier on the sheet (left blank if special characters are detected)
- **Date Authored** - For drawings, extracted from the date field on the sheet

### Automatic Data Entry from Naming Standards

If your project enforces a naming standard and documents are named according to that standard, Procore automatically extracts metadata fields based on the codes and identifiers in the filename. 

### Key Points on ML Processing Behavior

- **PDF-only** - ML predictions apply to PDF files
- **Asynchronous Processing** - ML classification occurs asynchronously after a Document Upload is created, not during the API call itself. Your integration should not expect metadata to be populated immediately after creating an upload
- **Completion Status** - The `integrationStatuses.ML` field in the Document Upload response will change from `"in_progress"` to `"completed"` once ML analysis finishes. Check this status before submitting the Document Upload as a Document Revision to ensure ML-inferred metadata is included
- **User-provided values take precedence** - If your integration provides values for any ML-processed fields when creating a Document Upload, those values will not be overridden by ML predictions
- **Automatic application** - If no user values are provided for these fields, ML predictions will be automatically applied when available.
- **Best practices** - For optimal results, refer to the [Procore Support: What data can be automatically populated FAQ](https://procore-support-prototype-master.vercel.app/faq-what-data-can-procore-automatically-populate-when-uploading-files-to-the-document-management-tool)

## Integration Best Practices

Consider the following recommendations when building your integration:

### API Behavior and Constraints

- **Plan for ML Processing Delays** - Do not assume metadata will be immediately available after creating a Document Upload. ML analysis is asynchronous and can take several seconds to complete.
- **Query Upload Status Before Submission** - Before submitting Document Uploads to create Document Revisions, query the Document Upload `upload_status` to ensure it has transitioned from "INCOMPLETE" to "COMPLETED" state. This ensures your integration doesn't attempt to submit an upload before it is ready to be submitted.
- **Use Batch Operations for Efficiency** - Batch endpoints (Create Document Upload Batch, Update Document Upload Batch, Create Document Revision Batch) are optimized for processing multiple documents efficiently.

### Data Model and Naming Strategy

- **Document Identification Strategy** - Documents are uniquely identified by Name and Format. When you submit a new upload with the same Name and Format as an existing document, it automatically creates a new revision. Plan your naming strategy carefully to ensure documents sync correctly.
- **Use Document Revision IDs for References** - If your integration interfaces with other Procore domains or external systems, understand that Document Upload IDs are not stable identifiers. Use Document Revision IDs instead, which remain stable. Only reference Document Upload IDs during the upload stage.

### Permissions and Access Control

- **Verify Permissions Before Integration** - Ensure your service account has appropriate permission group assignments with both "Upload New Files" and "Submit New Files" permissions.
- **Workflow Impact on Status Field** - If a project uses workflows, the Status field may be controlled by the workflow rather than your integration. Verify the project's workflow configuration to determine whether you can set Status values through API calls.
- **Attribute-scoped Visibility** - Document visibility can be constrained by document attributes (e.g., Status = Approved). If your service account's permission group only grants access to certain attribute values, uploads with different values might not be immediately visible to your integration. Align the attributes you assign with the permission group's visibility rules or adjust permissions accordingly.

### Error Handling and Edge Cases

- **Plan for Document Unavailability** - Document Uploads can be deleted by users. Your integration should handle cases where a document that was previously available becomes unavailable.

## Next Steps

See the [Document Management Technical Guide]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_technical_guide.md %}) for detailed step-by-step instructions on using the document management APIs.
