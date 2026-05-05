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

When using `multipart/form-data` for this endpoint, upload file content with `attachments[]` directly.

### Example B - Upload to images tool

For `Create image`, the recommended direct-upload flow is to pass:

- upload UUID from the Uploads API (field name depends on API version)
- `image_name` (required when using upload UUID flow)
- `image[...]` metadata fields

Reference:

- [Create image](https://developers.procore.com/reference/rest/images?version=latest#create-image)

For `/rest/v1.0/images`, this is commonly sent as:

```json
{
  "upload_uuid": "1QJ83Q56CVQR4X3C0JG7YV86F8",
  "image_name": "site-photo.png",
  "image": {
    "image_category_id": 2,
    "description": "Photo captured from API upload flow"
  }
}
```

For newer Images contracts, the same data may be nested under `upload` (for example `upload.uuid` and `upload.image_name`).
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
