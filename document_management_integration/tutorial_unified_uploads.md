---
permalink: /tutorial-unified-pilot-uploads
title: Unified Upload API Tutorial
layout: default
section_title: Document Management Integration

---

## Overview

The Unified Upload API is a next-generation file upload service designed for tighter integration with the Document Management tool.
It provides a single, consistent upload path for Document Management workflows and supersedes the use of the legacy v1.1 `/uploads` endpoints for document management integrations.

> **Beta Feature** — The Unified Upload API is currently available to select partners. Access is controlled via the Document Management integration program.

This tutorial walks through the end-to-end workflow: creating an upload, transferring the binary file, and associating the upload with a Document Management upload record.

## Prerequisites

Before using the Unified Upload API, ensure you have:

- A Procore [Developer Managed Service Account](https://developers.procore.com/documentation/developer-managed-service-accounts) with Document Management permissions.
- The Document Management tool enabled at the project level.
- OAuth 2.0 authentication configured. See [Choosing an OAuth 2.0 Grant Type]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %}).
- Reviewed the [Document Management Integration Overview]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %}) for core concepts and workflow context.

## How the Unified Upload API Differs from the Legacy Upload API

| | Legacy Upload API (v1.1) | Unified Upload API |
|---|---|---|
| **Endpoint base** | `/rest/v1.1/companies/{id}/uploads` | `/rest/v2.0/companies/{id}/uploads` |
| **Segmented uploads** | Supported | Supported |
| **Non-segmented uploads** | Supported | Supported |
| **Document Management integration** | Manual association via `upload_id` | Native — returned `upload_uuid` is used directly in Document Upload records |
| **Recommended for Document Management** | No | Yes |

If you are building a new Document Management integration, use the Unified Upload API described in this tutorial.
For general (non-Document Management) file uploads, continue to use the [Direct File Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %}) guide.

## Unified Upload Workflow

The full workflow for uploading a document through the Unified Upload API into Document Management consists of three phases:

1. **Initialize** — Create an upload record and receive pre-signed storage instructions.
2. **Transfer** — PUT the binary file directly to the storage service using the pre-signed URL.
3. **Associate** — Reference the upload UUID when creating or updating a Document Upload record.

### Step 1 — Initialize the Upload

Create a new upload by POSTing to the Unified Upload endpoint.

- **Request Method:** `POST`
- **Request URL:** `/rest/v2.0/companies/{company_id}/uploads`
- **Auth:** Procore Bearer Token
- **Request Body:**

```json
{
  "response_filename": "floor-plan-rev3.pdf",
  "response_content_type": "application/pdf"
}
```

**Example Response:**

```json
{
  "uuid": "01JQXAMPLE000UNIFIED0UPLOAD",
  "url": "https://storage.procore.com/uploads",
  "fields": {
    "key": "companies/1234/01JQXAMPLE000UNIFIED0UPLOAD",
    "Content-Type": "application/pdf",
    "Content-Disposition": "inline; filename=\"floor-plan-rev3.pdf\"",
    "policy": "<base64-encoded-policy>",
    "x-amz-credential": "...",
    "x-amz-algorithm": "AWS4-HMAC-SHA256",
    "x-amz-date": "...",
    "x-amz-signature": "..."
  }
}
```

Note the `uuid` — you will use it in Step 3 to associate the upload with a Document Upload record.

> **Important:** You must complete the binary transfer (Step 2) within one hour of receiving the pre-signed URL, or the URL expires and you must call the Initialize endpoint again.

### Step 2 — Transfer the Binary File

Use the `url` and `fields` from Step 1 to POST the file directly to the storage service.
Do not include your Procore Bearer Token in this request — it is directed at the storage service, not the Procore API.

- **Request Method:** `POST`
- **Request URL:** The `url` value from Step 1
- **Auth:** None
- **Request Body:** `multipart/form-data` containing all `fields` key-value pairs, plus the binary file under the key `file`.

A successful transfer returns HTTP `204 No Content`.

> **Important Considerations:**
>
> - Include all `fields` values as form data fields in the exact order returned.
> - Use `file` as the key name for the binary content.
> - Do not hard-code the `url` or `fields` values — they are generated per upload and may change.
> - Uploads not associated with a Procore resource within one week are automatically deleted.

### Step 3 — Associate the Upload with a Document Upload Record

After the binary is in storage, reference the `uuid` from Step 1 when creating or updating a Document Upload.

Refer to the [Document Management Technical Guide]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_technical_guide.md %}) for the full Document Upload create/update API payload.
The relevant field is `upload_uuid`:

```json
{
  "document_upload": {
    "filename": "floor-plan-rev3.pdf",
    "upload_uuid": "01JQXAMPLE000UNIFIED0UPLOAD"
  }
}
```

Once the Document Upload is enriched with metadata and validated, submit it to create a Document Revision.
See [Document Management Integration Overview — Step 4: Submit Document Upload]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %}#step-4-submit-document-upload) for details.

## Segmented Uploads

For large files (over 5 GB), the Unified Upload API also supports segmented uploads using the same segment-based approach as the legacy API.
Provide the `segments` array in the initialization request body instead of `response_filename`/`response_content_type`.
Each segment must include `size` (bytes) and `sha256`.

Refer to the [Direct File Uploads — Segmented Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %}#segmented-direct-file-uploads) guide for segment preparation steps; the storage transfer pattern is identical.

## Error Handling

| HTTP Status | Meaning | Action |
|---|---|---|
| `403 Forbidden` (on storage PUT) | Pre-signed URL expired | Re-initialize upload (Step 1) and retry |
| `422 Unprocessable Entity` (on Document Upload) | Invalid `upload_uuid` or upload not yet complete | Confirm the binary transfer (Step 2) completed successfully |
| `429 Too Many Requests` | Rate limit reached | Back off and retry; see [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}) |

## See Also

- [Document Management Integration Overview]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %})
- [Document Management Technical Guide]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_technical_guide.md %})
- [Document Management API Endpoints]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_api_endpoints.md %})
- [Direct File Uploads (Legacy)]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %})
