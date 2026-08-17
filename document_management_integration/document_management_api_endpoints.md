---
permalink: /document-management-api-endpoints
title: Document Management API Endpoints
layout: default
section_title: "Integration Guides: Document Management"
---

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/documentation/document-management-technical-guide" />
  </head>
  <body>
    <p>If you are not redirected, <a href="/documentation/document-management-technical-guide">click here</a>.</p>
  </body>
</html>

<!-- Retired 2026-08-17. Killed rather than merged.
     Rationale: the page re-hosted per-endpoint data (URIs, HTTP verbs, descriptions) that the canonical REST
     reference already owns and that goes stale on every API version bump. Folding the table into the Technical
     Guide was the earlier audit recommendation, but that only relocates the maintenance liability - so the
     table was dropped entirely rather than moved.
     Coverage check before removal: 7 of the 8 endpoints are already documented in context in the Technical
     Guide's 8-step workflow. The eighth (List Document Uploads) is reachable from the document-uploads
     resource page on the REST reference, which the Technical Guide links to three times - linking a resource
     family inherently exposes all of its actions, which a hand-maintained per-action table does not.
     Replacement: each remaining Document Management page now carries a direct link to the canonical
     API reference in its Related Documentation block.
     Original content preserved below for reference.

This page provides a reference of all available endpoints for the Procore Document Management V2 API.

***
## Related Documentation

- [Overview]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %})
- **API Endpoints** (this page)
- [Technical Guide]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_technical_guide.md %})
- [Metadata Details]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %})

***

## Available Endpoints

| Name | Action | Endpoint URI | Description |
| --- | --- | --- | --- |
| Bulk Create Document Uploads | POST | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads | Creates one or more new Document Uploads in the specified Project. |
| List Document Uploads | GET | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads | Returns a list of Document Uploads in the specified Project. |
| Show Document Upload | GET | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads/{document_upload_id} | Returns details about a Document Upload. |
| Bulk Update Document Uploads | PATCH | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads | Updates one or more Document Uploads in the specified Project. |
| List Project Fields | GET | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/fields | Returns the Fields for a Project. |
| List Project Upload Requirements | GET | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/upload_requirements | Returns a list of Upload Requirements for the Project. |
| List Project Metadata Values | GET | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/fields/{field_id_or_name}/values | Returns a list of Metadata Values for the specified field. |
| Bulk Create Document Revisions | POST | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_revisions | Creates one or more document revisions from document uploads. |

## See Also

- Choose an Authentication Method
- Unified File Upload API
- Rate Limiting
- Procore Support: Document Management
-->
