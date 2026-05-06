---
permalink: /attachments
title: Working with File Attachments and Image Uploads
layout: default
section_title: "Product Guides: Documents & Files"

---

## Overview

Many resources accessible through the Procore API accept file attachments or images.
For new integrations, Procore recommends a direct upload flow:

1. Create and complete an upload using the Uploads API.
2. Associate the uploaded file with the target Procore resource.

This page focuses on that direct upload workflow so integrations can avoid request-body ambiguity across endpoints.
The structure is similar to the Direct Drawing Uploads tutorial, but scoped to attachments use cases.
The example workflow presented below covers:

- Create an upload and upload the file to storage
- Associate the uploaded file to `accident_logs`
- Associate the uploaded file to the `images` tool

## Create an Upload and Upload the File

Start by creating an upload with the Uploads API and then upload the file to the returned storage URL.
Use the Uploads guide for complete request/response details:

- [Working with Direct File Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %})

![Direct File Upload]({{ site.baseurl }}/assets/guides/postman-direct-file-upload.png)

## Associate the Uploaded File to the Target Resource

After the upload is complete, associate the resulting upload ID/UUID with the endpoint you are calling.

This page includes two concrete examples of this association step:

- Upload to `accident_logs`
- Upload to the `images` tool

### Example A - Upload to accident_logs

For `Create Accident Log` (`POST /rest/v1.0/projects/{project_id}/accident_logs`), use the direct-upload reference fields from the accident log contract.
With `application/json`, include attachment references (for example `upload_ids`) in the request body.
Reference:

- [Create Accident Log](https://developers.procore.com/reference/rest/accident-logs?version=latest#create-accident-log)
- [Update Accident Log](https://developers.procore.com/reference/rest/accident-logs?version=latest#update-accident-log)

#### Example request

- Request Method: `POST`
- Request URL: `/rest/v1.0/projects/{project_id}/accident_logs`
- Request Body:

```json
{
  "accident_log": {
    "time_hour": 10,
    "time_minute": 15,
    "comments": "Minor incident near loading zone",
    "upload_ids": [
      "4120226e-36a8-416f-970e-880bae78164f"
    ]
  }
}
```

![Accident log request example]({{ site.baseurl }}/assets/guides/accident-log-direct-upload-request.png)

#### Example response

```json
{
  "id": 1047250,
  "date": "2026-05-06",
  "datetime": "2026-05-06T16:00:00Z",
  "status": "approved",
  "created_by_collaborator": false,
  "position": 1,
  "created_at": "2026-05-06T07:05:19Z",
  "updated_at": "2026-05-06T07:05:19Z",
  "deleted_at": null,
  "created_by": {
    "id": 14078128,
    "login": "api.user@example.com",
    "name": "API User"
  },
  "attachments": [
    {
      "id": 6181940361,
      "name": "image.png",
      "url": "https://example.com/files/{file_token}",
      "filename": "image.png",
      "content_type": "image/png",
      "viewable_type": "image",
      "share_url": "https://example.com/files/{file_token}",
      "viewable_url": "https://example.com/viewable_documents/{document_id}"
    }
  ],
  "permissions": {
    "can_update": true,
    "can_delete": true
  },
  "custom_fields": {},
  "related_items": [],
  "location": null,
  "comments": "Accident Log comments",
  "involved_company": "Procore Technologies",
  "involved_name": "Roger",
  "time_hour": 10,
  "time_minute": 15,
  "vendor": null
}
```

When using `multipart/form-data` for this endpoint, upload file content with `attachments[]` directly.

### Example B - Upload to images tool

For `Create image`, use the upload UUID flow from the Uploads API.

Reference:

- [Create image](https://developers.procore.com/reference/rest/images?version=latest#create-image)

#### Request

- Request Method: `POST`
- Request URL: `/rest/v1.0/images?project_id={project_id}`
- Request Body:

```json
{
  "upload": {
    "source": "Image from API",
    "uuid": "1QJ83Q56CVQR4X3C0JG7YV86F8",
    "image_name": "image.png"
  },
  "image": {
    "provider_type": "MarkupLayer",
    "provider_id": 12,
    "description": "This is a cool image",
    "image_category_id": 2,
    "location_id": 13,
    "log_date": "2018-01-01",
    "mt_location": [
      "string"
    ],
    "private": false,
    "starred": true,
    "trade_ids": [
      1
    ]
  }
}
```

![Create image request example]({{ site.baseurl }}/assets/guides/attachments-images-request-example.png)

#### Response Body

```json
{
  "id": 42,
  "url": "https://example.com/files/{file_token}",
  "size": 42,
  "filename": "image.png",
  "description": "This is a cool image",
  "thumbnail_url": "https://example.com/files/{thumbnail_token}",
  "taken_at": "2026-05-06T07:05:19Z",
  "created_at": "2026-05-06T07:05:19Z",
  "updated_at": "2026-05-06T07:05:19Z",
  "location": {
    "id": 15504,
    "name": "1space>1 space",
    "node_name": "1 space",
    "parent_id": 788866,
    "created_at": "2016-08-01T23:33:54Z",
    "updated_at": "2016-08-01T23:33:54Z"
  },
  "image_category_name": "Progress Photos",
  "image_category_id": 2,
  "permanently_deleted": false,
  "private": false,
  "projection": "regular",
  "starred": true,
  "width": 42,
  "height": 42,
  "uploader": {
    "id": 160586,
    "login": "api.user@example.com",
    "name": "API User"
  },
  "links": {
    "self": "/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074",
    "update": "/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074",
    "delete": "/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074",
    "permanentlyDelete": "/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074&permanent=true",
    "retrieve": "/rest/v1.0/images/9122752/retrieve?project_id=173074"
  },
  "trades": [
    {
      "id": 999,
      "name": "09 - acoustical panels",
      "active": true,
      "updated_at": "2016-08-01T23:33:54Z"
    }
  ],
  "comments_count": 42,
  "daily_log_segment": {
    "id": 123456,
    "name": "Morning Shift",
    "description": "Work performed during the morning shift",
    "deleted_at": null,
    "deleted": false
  }
}
```

Possible responses include `200`, `401`, `403`, and `422` depending on auth and validation.
`image[data]` in `multipart/form-data` is still supported but marked deprecated in favor of upload UUID flow.

## Next Step

After you create or update the resource, use that tool's resource endpoint(s) to confirm the association in the returned payload.
Use the endpoint-specific reference docs for the resource you are integrating.

## About multipart/form-data

Some resource endpoints still use `multipart/form-data` for direct file-content upload.
That behavior is endpoint-specific and parameter names vary by endpoint:

- `accident_logs`: supports `attachments[]` in multipart requests, and also supports attachment reference fields in JSON requests.
- `images`: supports multipart `image[data]`, but the recommended flow is direct upload with `upload_uuid`.

Always check the endpoint reference before choosing multipart request-body upload versus upload-reference flow.
This guide intentionally does not enumerate every tool-specific contract.

## See Also

- [Working with the Documents Tool]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_documents.md %})
- [Working with Direct File Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %})
- [Working with Secure File Access]({{ site.url }}{{ site.baseurl }}{% link best_practices/secure_file_access_tips.md %})
- [Working with Drawings]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_drawings.md %})
- [Working with Direct Drawing Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_direct_drawing_uploads.md %})
