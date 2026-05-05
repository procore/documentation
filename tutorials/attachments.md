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

## Recommended Direct Upload Flow

### Step 1 - Create and Complete an Upload

Start by creating an upload with the Uploads API and then upload the file to the returned storage URL.
Use the Uploads guide for complete request/response details:

- [Working with Direct File Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %})

![Direct File Upload]({{ site.baseurl }}/assets/guides/postman-direct-file-upload.png)

### Step 2 - Associate the Uploaded File to the Target Resource

After the upload is complete, associate the resulting upload/prostore file ID with the endpoint you are calling.

For Attachments specifically (`POST /rest/v1.0/attachments`), pass the ProstoreFile ID(s) in the `id` query parameter.

**Example request**

```bash
curl --request POST "https://api.procore.com/rest/v1.0/attachments?project_id=123&item_type=ManpowerLog&item_id=456&id[]=111&id[]=112" \
  --header "Authorization: Bearer <ACCESS_TOKEN>" \
  --header "Procore-Company-Id: <COMPANY_ID>"
```

### Step 3 - Verify the File is Attached to the Resource

Call the resource endpoint (or list endpoint) and verify the attached file appears in the response payload.

![Associate File to Resource]({{ site.baseurl }}/assets/guides/file-associate-resource.png)

## About multipart/form-data

Some resource endpoints still use multipart/form-data request bodies for direct file-content upload.
That behavior is endpoint-specific and parameter names vary by endpoint.
Always check the endpoint reference before choosing multipart request-body upload versus ID-based association flow.

## See Also

- [Working with the Documents Tool]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_documents.md %})
- [Working with Direct File Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %})
- [Working with Secure File Access]({{ site.url }}{{ site.baseurl }}{% link best_practices/secure_file_access_tips.md %})
- [Working with Drawings]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_drawings.md %})
- [Working with Direct Drawing Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_direct_drawing_uploads.md %})