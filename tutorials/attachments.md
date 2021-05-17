---
permalink: /attachments
title: Working with File Attachments and Image Uploads
layout: default
section_title: Guides and Tutorials

---

## Overview
Many resources accessible through the Procore API can accept file attachments on Create and Update actions.
In addition, the Photos tool allows you to upload or update images using Create and Update actions.
In this guide we describe how to properly format your request body to successfully handle file attachments and image uploads.

## Content-Type Considerations

In order to work with file attachments or image uploads, you must use the `multipart/form-data` Content-Type when making a request.
The Content-Type is used to specify the media type of the resource.
It is important to note that the entire request body must be defined as `multipart/form-data`.
In POST requests, the client tells the server what type of data is actually being sent.
In a POST request resulting from an HTML form submission, the Content-Type of the request is specified by the `enctype` attribute on the `<form>` element.
  Here is an example HTML code snippet for a form that includes both text data and file data fields.

```html
<form action="/" method="post" enctype="multipart/form-data">
  <input type="text" name="description" value="some text">
  <input type="file" name="myFile">
  <button type="submit">Submit</button>
</form>
```

## A File Attachment Example Using Postman

This example shows how to construct a request body for the Create Accident Log endpoint which includes the ability to attach files to the log.

![Postman attachment example]({{ site.baseurl }}/assets/guides/attach-example-1.png)


You can see from the illustration above that all the request body parameters are defined as `multipart/form-data` Content-Type and are entered in Postman as a set of key/value pairs.
Note that the **form-data** option is selected in the request builder.
Simple text parameters are entered with a key format of `accident_log[<field-name>]`, while the attachments are entered with a key format of `attachments[]`.
Postman provides a convenient **Select Files** button that allows you to choose files from your local computer to use as attachments for test purposes.

**Note**: Keep in mind that the key format used for attachments may differ between resources.
For example, the attachment key format for uploading photos using the Create Image endpoint is `image[data]`, while the key format for attaching an image file using the Create Punch Item endpoint is `images[]`.
Therefore, it is important to review the documentation for the specific endpoint you are working with so that you utilize the correct syntax for specifying your attachments.

## An Image Upload Example Using Postman

This example shows how to construct a request body for the Create Image endpoint which provides the ability to upload an image to a project's Photo Album.

![Postman attachment example]({{ site.baseurl }}/assets/guides/attach-example-2.png)

You can see from the illustration above that all the request body parameters are defined as `multipart/form-data` Content-Type and are entered in Postman as a set of key/value pairs.
Note that the **form-data** option is selected in the request builder.
Request parameters are entered with a key format of `image[<field-name>]`.
This example includes the two required parameters `image[image_category_id]` and `image[data]`.
Postman provides a convenient **Choose Files** button that allows you to select files from your local computer to use as images for test purposes.