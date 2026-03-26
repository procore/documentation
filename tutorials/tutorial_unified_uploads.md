---
permalink: /tutorial-unified-uploads
title: Working with the Unified File Uploads
layout: default
section_title: "Product Guides: Documents & Files"

---

## Introduction

The Unified File Upload API (v2.1) provides a single, consistent workflow for uploading files of any size to Procore.
Whether you are uploading a small document or a multi-gigabyte video, the API contract is the same:

1. **POST** — Create an upload and receive presigned URL(s)
2. **PUT** — Upload file content (one or more parts) to the presigned URL(s)
3. **PATCH** — Complete the upload by submitting the ETag(s) returned from each PUT
4. **GET** — Poll the upload status until it is `available`

This four-step workflow replaces the v1.0 and v1.1 upload process with a simpler, more predictable interface.
There is no need to construct form-data payloads or manage cloud-specific policy fields.
The API returns presigned URLs that accept a simple binary PUT.

The Unified File Upload API is designed to work consistently across all Procore tools.
The existing upload workflow applies attaching files to Procore Document Management (PDM).
It is also built with multi-cloud support in mind, so as Procore expands to additional cloud storage providers in the future, your integration code will continue to work without changes.

### Key New Feature Highlights

- **Size Agnostic Upload:** The Files Platform provides a size-agnostic upload experience, removing the need for client-side branching logic based on file size. To ensure consistency and reliability, all uploads should be treated as "Segmented" (Multipart) regardless of the total file size.
- **Strict File Size Thresholds:** The system enforces a strict maximum of 100 MB upper limit for each segmented upload.
- **Checksum Verification:** Segment-level validation will be performed using a mandatory SHA-256 checksum, with an optional MD5 check available for additional verification.
- **24-Hour PDM Tool Association Timeline:** Files uploaded via the Unified File Uploads API must be associated with a PDM tool within 24 hours of upload initialization. If a file is not associated within this timeframe, it will be permanently and automatically deleted from cloud storage with no recovery possible.
- **Status-Driven Interface:** The API relies on a status field (e.g., `in_progress`, `completed`, `available`). Clients should always check that a file's status is `available` before attempting to download it, which indicates all processing and checksum verifications are finished.
- **Standardized ETags:** For uploads, you must explicitly signal completion using an array of `part_etags`.

> **Important — Treat URLs and headers as opaque.**
> The presigned `url` and `headers` returned in each segment must be copied in their entirety and used exactly as provided in your PUT request.
> Do not parse, pattern-match, or make any assumptions about the URL structure or the set of headers.
> Both the URL format and the headers are subject to change across API versions and environments without prior notice.

## Endpoints

All endpoints are scoped to a project:

| Action | Method | Endpoint URI |
|---|---|---|
| Create Upload | POST | `/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads` |
| Upload File Content | PUT | Presigned URL returned in the `segments[].url` field of the POST response |
| Complete Upload | PATCH | `/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/{upload_id}` |
| Get Upload Status | GET | `/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/{upload_id}` |

## Example 1: Small File Upload (Single Part)

This example uploads a 2 MB PDF as a single part.

### Step 1 — Compute File Hashes

Determine the file size and compute the SHA-256 and MD5 hashes.
These values are included in the create-upload request so that Procore can verify data integrity.

```
wc -c < report.pdf
# 2097152

shasum -a 256 report.pdf
# e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855

md5 report.pdf
# d41d8cd98f00b204e9800998ecf8427e
```

### Step 2 — Create the Upload (POST)

Send a POST request to create the upload.Note: "file_size" & "size" should be in bytes

**Request**

```
curl -X POST 'https://sandbox.procore.com/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer "${access_token}"' \
  --header 'Procore-Company-Id: {company_id}' \
  --data '{
  "file_name": "report.pdf",
  "file_size":  2097152,
  "content_type": "application/pdf",
  "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "segments": [
     {
            "size":  2097152,
            "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "md5": "d41d8cd98f00b204e9800998ecf8427e"
        }
  ]
}'

```

**Response (201 Created)**

```
{
  "data": {
    "upload_id": "01JEXAMPLE00000000000000001",
    "file_name": "report.pdf",
    "file_size": 2097152,
    "total_parts": 1,
    "content_type": "application/pdf",
    "upload_expires_at": 1773900000,
    "segments": [
      {
        "url": "https://storage.procore.com/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/01JEXAMPLE00000000000000001/parts/1?expires_at=1773900000&user_id=1234&sig=...",
        "url_expires_at": 1773900000,
        "headers": {
          "Content-Length": "2097152"
        }
      }
    ],
    "status": "ready"
  }
}
```

The response contains a single segment with a presigned `url` and `headers`.
Use these exact values in the next step.

### Step 3 — Upload the File (PUT)

Upload the binary file content using the `url` and `headers` from the segment returned in the previous step.
Copy both values exactly as provided — do not modify the URL or headers.

**Request**

- Method: `PUT`
- URL: The `url` value from the segment (use as-is)
- Headers: All `headers` from the segment (copy in entirety)
- Body: Raw binary file content
- Auth: None (the URL is pre-authenticated)

```
curl -X PUT '{segment_url_from_response}' \
  --header 'Content-Length: 2097152' \
  --data-binary '@report.pdf'
```

**Response**

A successful upload returns HTTP 200 with no body.
The response headers include an `ETag` — save this value for the next step.

```
HTTP/1.1 200 OK
ETag: "d41d8cd98f00b204e9800998ecf8427e"
```

### Step 4 — Complete the Upload (PATCH)

Notify Procore that the upload is complete by submitting the ETag.

**Request**

```
curl -X PATCH 'https://sandbox.procore.com/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/01JEXAMPLE00000000000000001' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer "${access_token}"' \
  --data '{
    "part_etags": ["d41d8cd98f00b204e9800998ecf8427e"]
  }'
```

**Response (200 OK)**

```
{
  "data": {
    "upload_id": "01JEXAMPLE00000000000000001",
    "status": "complete"
  }
}
```

### Step 5 — Poll Until Available (GET)

After completing the upload, poll the upload status until it transitions to `available`.
The file is not ready for use in Procore until this status is reached.

**Request**

```
curl -X GET 'https://sandbox.procore.com/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/01JEXAMPLE00000000000000001' \
  --header 'Authorization: Bearer "${access_token}"'
```

**Response (200 OK)**

```
{
  "data": {
    "upload_id": "01JEXAMPLE00000000000000001",
    "file_name": "report.pdf",
    "sanitized_file_name": "report.pdf",
    "content_type": "application/pdf",
    "file_size": 2097152,
    "status": "available",
    "custom_metadata": {}
  }
}
```

Once `status` is `available`, the file can be associated with a Procore resource.

### Step 6 — Associate the File with a PDM Document

Use the `upload_id` (returned as `file_upload_id`) to associate the uploaded file with a PDM document upload.

**Request**

```
curl -X PATCH 'https://sandbox.procore.com/rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_uploads' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer "${access_token}"' \
  --data '{
    "update_params": [
      {
        "id": "{document_upload_id}",
        "upload_status": "COMPLETED",
        "file_upload_id": "{upload_id_from_unified_upload}"
      }
    ]
  }'
```

The `document_upload_id` is the ID from the PDM document upload batch create endpoint.
The `file_upload_id` is the `upload_id` returned by the Unified File Upload API in Step 2.

---

## Example 2: Large File Upload (Multi-Part)

This example uploads an 8.8 MB video file as two parts.
The same workflow applies to files of any size — split the file, provide per-part checksums, and upload each part separately.

### Step 1 — Split the File and Compute Hashes

Split the source file into parts.
Each part must be between 5 MB and 100 MB, except the last part which can be smaller.

```
split -b 6000000 test-video.mp4 part_
```

This creates two files:

```
6000000  part_aa
2829449  part_ab
```

Compute SHA-256 and MD5 for each part:

```
shasum -a 256 part_aa part_ab
# b2a6304fdd19da95f8750573f5fd33e0ad71c3a41b1b6daaf4621fd9af913952  part_aa
# 9b9ffee440b0936c280d49f42ceb554eb3bf404b0604e95da1783bc3d64d58e7  part_ab

md5 part_aa part_ab
# MD5 (part_aa) = 65fa016357a18272ce086ff4694ba61a
# MD5 (part_ab) = 08758729c38f3081b9d0bbe6b0de41fa
```

Also compute hashes for the whole file:

```
shasum -a 256 test-video.mp4
# a1b2c3d4e5f6...  test-video.mp4

md5 test-video.mp4
# MD5 (test-video.mp4) = f1e2d3c4b5a6...
```

### Step 2 — Create the Upload (POST)

Provide a `segments` array with per-part checksums.

**Request**

```
curl -X POST 'https://sandbox.procore.com/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer "${access_token}"' \
  --data '{
    "file_name": "test-video.mp4",
    "file_size": 8829449,
    "content_type": "video/mp4",
    "sha256": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    "md5": "f1e2d3c4b5a6f1e2d3c4b5a6f1e2d3c4",
    "segments": [
      {
        "size": 6000000,
        "sha256": "b2a6304fdd19da95f8750573f5fd33e0ad71c3a41b1b6daaf4621fd9af913952",
        "md5": "65fa016357a18272ce086ff4694ba61a"
      },
      {
        "size": 2829449,
        "sha256": "9b9ffee440b0936c280d49f42ceb554eb3bf404b0604e95da1783bc3d64d58e7",
        "md5": "08758729c38f3081b9d0bbe6b0de41fa"
      }
    ]
  }'
```

**Response (201 Created)**

```
{
  "data": {
    "upload_id": "01JEXAMPLE00000000000000002",
    "file_name": "test-video.mp4",
    "file_size": 8829449,
    "total_parts": 2,
    "content_type": "video/mp4",
    "upload_expires_at": 1773900000,
    "segments": [
      {
        "url": "https://storage.procore.com/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/01JEXAMPLE00000000000000002/parts/1?expires_at=1773900000&user_id=1234&sig=...",
        "url_expires_at": 1773900000,
        "headers": {
          "Content-Length": "6000000"
        }
      },
      {
        "url": "https://storage.procore.com/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/01JEXAMPLE00000000000000002/parts/2?expires_at=1773900000&user_id=1234&sig=...",
        "url_expires_at": 1773900000,
        "headers": {
          "Content-Length": "2829449"
        }
      }
    ],
    "status": "ready"
  }
}
```

### Step 3 — Upload Each Part (PUT)

Upload each part to its corresponding presigned URL using the `url` and `headers` from each segment, copied exactly as returned.
Parts can be uploaded in parallel for better performance.

**Part 1:**

```
curl -X PUT '{segment_1_url_from_response}' \
  --header 'Content-Length: 6000000' \
  --data-binary '@part_aa'
```

**Part 2:**

```
curl -X PUT '{segment_2_url_from_response}' \
  --header 'Content-Length: 2829449' \
  --data-binary '@part_ab'
```

Each successful PUT returns HTTP 200 with an `ETag` in the response headers.
Save both ETags in order for the next step.

### Step 4 — Complete the Upload (PATCH)

Submit all ETags in the same order as the segments from the POST response.

**Request**

```
curl -X PATCH 'https://sandbox.procore.com/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/01JEXAMPLE00000000000000002' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer "${access_token}"' \
  --data '{
    "part_etags": [
      "65fa016357a18272ce086ff4694ba61a",
      "08758729c38f3081b9d0bbe6b0de41fa"
    ]
  }'
```

**Response (200 OK)**

```
{
  "data": {
    "upload_id": "01JEXAMPLE00000000000000002",
    "status": "complete"
  }
}
```

### Step 5 — Poll Until Available (GET)

Poll the upload status until it transitions to `available`.

**Request**

```
curl -X GET 'https://sandbox.procore.com/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/01JEXAMPLE00000000000000002' \
  --header 'Authorization: Bearer "${access_token}"'
```

**Response (200 OK)**

```
{
  "data": {
    "upload_id": "01JEXAMPLE00000000000000002",
    "file_name": "test-video.mp4",
    "sanitized_file_name": "test-video.mp4",
    "content_type": "video/mp4",
    "file_size": 8829449,
    "status": "available",
    "custom_metadata": {},
    "segments": []
  }
}
```

### Step 6 — Associate the File with a PDM Document

Associate the uploaded file with a PDM document upload using the same PATCH request as in Example 1, Step 6.
Use the `upload_id` from this upload (`01JEXAMPLE00000000000000002`) as the `file_upload_id`.

---

## Checking Upload Status (GET)

Use the Get Upload Status endpoint to check the current state of an upload, or to poll until the file is fully processed and available.

**Request**

```
curl -X GET 'https://sandbox.procore.com/rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/{upload_id}' \
  --header 'Authorization: Bearer "${access_token}"'
```

**Response (200 OK)**

```
{
  "data": {
    "upload_id": "01JEXAMPLE00000000000000001",
    "file_name": "report.pdf",
    "sanitized_file_name": "report.pdf",
    "content_type": "application/pdf",
    "file_size": 2097152,
    "status": "complete",
    "custom_metadata": {},
    "segments": []
  }
}
```

Upload status values include:
- `ready` — Upload created, waiting for file content
- `receiving` — Parts are being uploaded (partial ETags submitted)
- `complete` — All parts uploaded and ETags submitted
- `available` — File is fully processed and available for use in Procore

---

## Important Considerations

- **File parts have a 100 MB maximum size.** Files larger than 100 MB must be split into multiple parts. Each part can be at most 100 MB, with a minimum of 5 MB (except the last part, which can be smaller).
- **Maximum of 10,000 parts per upload.** A single upload cannot exceed 10,000 parts. For very large files, increase your part size accordingly to stay within this limit.
- **Presigned URLs expire.** The `url_expires_at` field indicates when the presigned URL becomes invalid. If a URL expires before you complete the PUT, call the GET upload status endpoint to obtain fresh presigned URLs for the remaining segments.
- **Copy URLs and headers exactly as returned.** The `url` and `headers` from each segment are opaque. Copy them in their entirety into your PUT request without adding, removing, or modifying any values. Do not parse or make assumptions about the URL structure or header names — they are subject to change without notice.
- **Do not include your access token in PUT requests.** The presigned URL is pre-authenticated. Including an Authorization header in the PUT will cause an error.
- **ETag order matters.** When completing a multi-part upload, the `part_etags` array must be in the same order as the `segments` returned by the POST response.
- **Partial progress is supported.** You can submit a PATCH with `null` values in `part_etags` for parts that have not been uploaded yet. Once all values are non-null, the upload is finalized.
- **Uploads expire.** Uploads must be completed and associated with a Procore resource within the expiration window or they will be automatically deleted.
- **The authenticated user owns the upload.** Only the user who created the upload can complete it and use it in subsequent API requests.


## Coming Soon

The following capabilities are planned for upcoming releases of the Unified File Upload API:
- **Malware scan status** — Fields indicating whether the uploaded file has been scanned and the scan result
- **Checksum verification status** — Fields confirming whether server-side checksum verification passed
- **Extended analytics and client metadata** — Additional fields for richer upload telemetry and client identification
