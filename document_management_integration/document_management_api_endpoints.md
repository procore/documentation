---
permalink: /document-management-api-endpoints
title: Document Management API Endpoints
layout: default
section_title: Document Management Integration

---

## Document Management API Endpoints

| Name | Action | Endpoint URI | Description |
| --- | --- | --- | --- |
| [Create Document Uploads](https://developers.procore.com/reference/rest/document-uploads?version=latest#bulk-create-document-uploads) | POST | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads | Creates one or more new Document Uploads in the specified Project. |
| [List Document Uploads](https://developers.procore.com/reference/rest/document-uploads?version=latest#list-document-uploads-v2) | GET | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads | Returns a list of Document Uploads in the specified Project. |
| [Show Document Upload](https://developers.procore.com/reference/rest/document-uploads?version=latest#show-document-upload) | GET | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads/{document_upload_id} | Returns details about a Document Upload. |
| [Update Document Upload](https://developers.procore.com/reference/rest/document-uploads?version=latest#bulk-update-document-uploads) | PATCH | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads | Updates one or more Document Uploads in the specified Project. |
| [List Project Fields](https://developers.procore.com/reference/rest/project-fields?version=latest) | GET | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/fields | Returns the Fields for a Project. |
| [List Project Upload Requirements](https://developers.procore.com/reference/rest/project-upload-requirements?version=latest#list-project-upload-requirements) | GET | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/upload_requirements | Returns a list of Upload Requirements for the Project. |
| [List Project Metadata Values](https://developers.procore.com/reference/rest/project-metadata-values?version=latest#list-project-metadata-values) | GET | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/fields/{field_id_or_name}/values | Returns a list of Metadata Values for the specified field. |
| [Create Document Revisions](https://developers.procore.com/reference/rest/document-revisions?version=latest#create-document-revisions-v2) | POST | /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_revisions | Creates one or more document revisions from document uploads . |
