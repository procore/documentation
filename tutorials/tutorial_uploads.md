---
permalink: /tutorial-uploads
title: Working with Direct File Uploads
layout: default
section_title: Guides and Tutorials

---

## Introduction

The Procore API supports the capability to post and store files directly in a web file storage service.
Using the Procore API to directly upload content to a storage service helps to streamline uploads and reduces upload latency.
Uploading a file using the Procore API is generally a two-step process.
The first step to storing files directly from your application to your file storage service is to create an upload at the company or project level using the [Create Upload (Company)](https://developers.procore.com/reference/rest/v1/company-uploads) or [Create Upload (Project)](https://developers.procore.com/reference/rest/v1/project-uploads) endpoints respectively.
The JSON block returned by these endpoints contains attributes that form the 'instructions' for uploading and storing files.
The second step is to use these attributes to form a POST request to the file storage service.
Once a file has been uploaded to a storage service you can use the Procore API to move the file into Procore and associate it with a resource.
See [Moving an Uploaded File into Procore](#moving-an-uploaded-file-into-procore) for additional information.

## Upload Endpoints

The Procore API provides the following endpoints for creating Uploads at the company and project levels.


| Action                                                                                                          | Endpoint URI                                   | Description                                    |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| [Create Upload (Company Level)](https://developers.procore.com/reference/rest/v1/company-uploads#create-upload) | POST /rest/v1.0/companies/{company_id}/uploads | Creates a new Upload in the specified Company. |
| [Create Upload (Project Level)](https://developers.procore.com/reference/rest/v1/project-uploads#create-upload) | POST /rest/v1.0/projects/{project_id}/uploads  | Creates a new Upload in the specified Project. |

## Example Workflow

### Step 1: Create an Upload

To help illustrate the workflow for this example we use the Create Upload endpoint to create a new upload at the company level.
A sample POST request to the [Create Upload](https://developers.procore.com/reference/rest/v1/company-uploads) endpoint would take the following format:

- Request Method: `POST`
- Request URL: `https://api.procore.com/rest/v1.0/companies/{company_id}/uploads`
- Request Body (optional): `{ "response_filename": "example.pdf", "response_content_type": "application/pdf" }`

Including the optional `response_filename` in the request body ensures that the storage service is aware of the filename for the upload in advance.
Since files are often downloaded directly from the storage service, specifying the `response_filename` ensures that the file will save on an end user's device with a meaningful name and extension.
Similarly, specifying the `response_content_type` is helpful when you want to make sure the file extension is correct or if you want to 'force' a file content type that differs from the extension.

Executing a successful call to the Create Uploads endpoint returns a JSON response similar to the following:

```
{
    "uuid": "01EJCD78RY2DR3B51N6E9T2C0R",
    "url": "https://s3.amazonaws.com/pro-core.com",
    "fields": {
        "key": "companies/1234/1R3WZFQ71234CX5TBZ6NRYEC21",
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=\"example.pdf\"",
        "policy": "eyJleHBpcmF0aW9uIjoiMjAxOC0xMS0yMFQwMDo0ODoxNV...==",
        "x-amz-credential": "AKIAINQYGICB5222SEHQ/20181119/us-east-1/s3/aws4_request",
        "x-amz-algorithm": "AWS4-HMAC-SHA256",
        "x-amz-date": "20181119T234815Z",
        "x-amz-signature": "ab9e2f7328111c46c31cd65e88efc5f55fc80efb9ff925adc4e68572478e1234"
    }
}
```

The example JSON response above includes three properties, two (`url` and `fields`) that we’ll use as ‘instructions’ for performing a direct file upload in the next step.

- **uuid** - a unique identifier referencing the upload. (not used when uploading file data but used to reference the file after uploading)
- **url** - the uniform resource locator (URL) used to POST the file upload. In this example, the URL points to Procore's AWS S3 storage area but this may change in the future.
- **fields** - required attributes that must be included with the file upload in Step 2.

### Step 2: Upload File to a Storage Service Using HTTP POST Request

Once we have successfully created an Upload (as described in the previous step), we use the data returned in the JSON response to construct a POST request to the storage service (AWS S3 for this example) that includes the file we want to upload along with the `url` and `fields` retrieved in Step 1 as form data.
Note that in this example we are using "https://s3.amazonaws.com/pro-core.com" as the value for the `url` attribute, but your `url` attribute value will be different depending on the storage service location you are targeting.
Be sure to use the exact `url` value returned from the call to the Create Uploads endpoint.

We'll use Postman to demonstrate this step, as it provides a convenient framework for setting up a payload as form data for a POST request.

![Direct File Upload]({{ site.baseurl }}/assets/guides/postman-direct-file-upload.png)

Examining the illustration above we see that the HTTP action is set to POST and that we've entered `https://s3.amazonaws.com/pro-core.com` as the target URL for our file storage service.
Next, we build up the `Body` for the request payload configured as `form-data`.
We include all parameter values from `fields`, and specify the file to upload using the Choose Files button.
Note that you must use `file` as the Key name for specifying the file to upload.
Remember that all values you define in the request payload must match those returned from the Create Upload endpoint. Choosing the Send button submits the POST request with the payload we've defined.
Returned status codes in the 4xx and 5xx range indicate a problem with the request.

> IMPORTANT CONSIDERATIONS
>
> - You must initiate a direct file upload within one hour from the time you retrieve data from the Create Upload endpoint(s), or you can expect a 403 Forbidden response and must call Create Upload again.
> - The currently authenticated user becomes the owner of the Upload and only that user can use the Upload in subsequent requests.
> - The URL and fields necessary to complete a direct file upload may vary between companies and may also change over time so none of these may be hard-coded.
> - Uploads must be associated with a Procore resource within one week or it will be automatically deleted from Procore servers.
> - Be sure _not_ to include your access token in this request as it will result in an error. Bear in mind that this request is pointing to the AWS server and not the Procore Server.

## Moving an Uploaded File into Procore

Once a file has been successfully uploaded to a storage service, we can move the file into Procore and associate it with a resource.
This example shows using the [Create Project File](https://developers.procore.com/reference/rest/v1/project-folders-and-files#create-project-file) endpoint to move the file into Procore as a project document file.

![Create Project File]({{ site.baseurl }}/assets/guides/create-project-file.png)

The following endpoints may also be used to move uploaded files into Procore depending on your use case.

- [Create Company File](https://developers.procore.com/reference/rest/v1/company-folders-and-files#create-company-file)
- [Create Image](https://developers.procore.com/reference/rest/v1/images#create-image)
- [Create Drawing Upload](https://developers.procore.com/reference/rest/v1/drawings#create-drawing-upload)
- [Create Project File](https://developers.procore.com/reference/rest/v1/project-folders-and-files#create-project-file)
