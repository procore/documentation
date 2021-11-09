---
permalink: /tutorial-direct-drawing-uploads
title: Working with Direct Drawing Uploads
layout: default
section_title: Guides and Tutorials

---

## Overview

Direct file uploads can be used to create new drawings in a project without going through the Procore optical character recognition (OCR) process.
The [Create Drawing](https://developers.procore.com/reference/rest/v1/drawings#create-drawing) and [Create Drawing Upload](https://developers.procore.com/reference/rest/v1/drawings#create-drawing-upload) endpoints described here can be used by integrators to import drawings into projects while bypassing OCR.
The example workflow presented below covers the following steps.

- Determine the drawing area and drawing set IDs
- Create a drawing object
- Create an upload in the project
- Upload the file to the storage service
- Create a drawing upload
- Verify upload is ready for review in Procore

## Determine Drawing Area and Drawing Set IDs

Our first step is to retrieve the IDs for the drawing area and drawing set in which the new drawing will be created.
We'll use these values in subsequent steps in the workflow.
The [List Drawing Areas](https://developers.procore.com/reference/rest/v1/drawings#list-drawing-areas) endpoint returns this information.

![list-drawing-areas]({{ site.baseurl }}/assets/guides/drawing-area-id.png)

## Create a Drawing Object

With the drawing area ID, we can now create the drawing object using the [Create Drawing](https://developers.procore.com/reference/rest/v1/drawings#create-drawing) endpoint.
The drawing object will act as a placeholder for our new drawing.
Note that the ID for the drawing area is a required path parameter for this call.
In the request body, `drawing:number` and `drawing_decipline:name` are required fields.

![create-drawing-resp]({{ site.baseurl }}/assets/guides/create-drawing-resp.png)

Note that the response body includes the new ID generated for the drawing object.

## Create an Upload in the Project

Now that we have our drawing object created, we can use the [Create Upload (Project)](https://developers.procore.com/reference/rest/v1/project-uploads) endpoint to facilitate the direct upload of our drawing file.
Though not required, we include the `response_filename` attribute in the request body which ensures that the storage service is aware of the filename for the upload in advance.
Since files are often downloaded directly from the storage service, specifying the `response_filename` ensures that the file will save on an end user's device with a meaningful name and extension.
Note that the filename you define for `response_filename` must include '.pdf' in the name.
Similarly, specifying the `response_content_type` attribute is helpful when you want to make sure the file extension is correct or if you want to 'force' a file content type that differs from the extension.

![create-upload-project]({{ site.baseurl }}/assets/guides/create-upload-project.png)

The response body in the example includes three properties that we'll use as 'instructions' for performing a direct file upload in the next step.

- `uuid` - a unique identifier referencing the upload.
- `url` - the uniform resource locator (URL) used to POST the file upload. In this example, the URL points to Procore's AWS S3 storage area.
- `fields` - required attributes that must be included with the file upload in the next step.

## Upload the File to the Storage Service

With the upload created, the next step is to construct a POST request to the storage service (AWS S3 for this example) that includes the file we want to upload along with the `uuid`, `url` and `fields` retrieved in the previous step as form data.

![post-file-upload]({{ site.baseurl }}/assets/guides/post-file-upload.png)

An HTTP status code 204 is returned when the POST is successful.

## Create Drawing Upload

With the file now available in the storage service, we can import it into the Drawings tool using the Create Drawing Upload endpoint.
The request body includes `drawing_area_id`, `drawing_set_id`, and an array of drawing_log_imports as required fields.
Each object in the `drawing_log_imports` array corresponds to a drawing file on the storage service and includes `drawing_date` and `upload_uuid` as required fields.
This allows you to perform bulk imports by specifying multiple files in the array.
For simplicity, we’ll use just one file in our example.

![create-drawing-upload]({{ site.baseurl }}/assets/guides/create-drawing-upload.png)

The HTTP status code 201 indicates that the drawing upload has been successfully created.

### Working with `drawing_id`

#### Automatic Drawing Review

When a Drawing Revision is created using the Create Drawing Upload endpoint with a defined `drawing_id` in the object of the `drawing_log_imports` array, it will automatically be assigned to the given Drawing without a manual review. If there are issues encountered, a review will be required in the web app for the Drawing Upload.

> **SINGLE DRAWING PDF**
>
> In order to assign a Drawing Revision to a `drawing_id`, please use a single page drawing pdf. If you have more than one Drawing in a pdf, please split up each page into separate pdf files for each Drawing and map it to a corresponding `drawing_id`.

**Note**: When assigning a `drawing_id`, the fields for `default_revision` and `drawing_date` are required in each `drawing_log_imports` object. If the revision number already exists for the Drawing, one of the following must be unique: Drawing Set, Drawing Date or Received Date.

#### Multi-Sheet Drawings

When assigning a multi-sheet drawing pdf to a `drawing_id`, we will append "`(Sheet X of Y)`" to the drawing number for all the sheets in the Drawing. You do not need to split up the pdf pages for a multi-sheet drawing if they all refer to the same drawing number.

For example, a three sheet Drawing for `A100` would form the following drawing numbers:

```
A100 (Sheet 1 of 3)
A100 (Sheet 2 of 3)
A100 (Sheet 3 of 3)
```

## Verify Upload is Ready for Review in Procore

The final step in our example workflow is to use the Procore web application to verify that the new drawing upload is visible and ‘ready for review’.
When we log in to Procore, navigate to the Drawings tool in our project and select the appropriate drawing area, we are able to verify that the upload is there and ready for us to review.

![ready-for-review]({{ site.baseurl }}/assets/guides/ready-for-review.png)

## Further Reading

Refer to Working with [Direct File Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_uploads.md %}) for general information on creating file uploads using the Procore API.
