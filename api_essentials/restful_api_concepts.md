---
permalink: /restful-api-concepts
title: RESTful API CONCEPTS
layout: default
section_title: API Essentials

---

## Overview

Representational state transfer (REST) is a common architectural style used for web development.
Systems and sites designed using this style aim for fast performance, reliability and the ability to scale easily.

## Resources

The primary abstraction of information in a REST architecture is a resource.
Any information that can be named can be a resource - a document or image, a service, a collection of other resources, and so on.
Resources comprise data and functionality and are accessed using Uniform Resource Identifiers (URIs).
Resources are acted upon by using a set of standard, well-defined operations.
Clients and servers exchange representations of resources by using a standardized interface and protocol – typically HTTP.

> HTTPS PROTOCOL REQUIREMENT
>
> Because all Procore API resources are protected by Secure Sockets Layer (SSL) encryption, any call you make to a Procore API resource must use the `HTTPS` scheme in the URL.
> SSL establishes an encrypted link between the Procore resource server and your application.
> This link ensures that all data passed between the resource server and your appplication remain private.

## HTTP Resource Methods

Another important characteristic of REST is the use of resource methods to perform a desired operation.
Similar to other RESTful APIs, Procore API supports the following set of standard HTTP verbs as resource methods.

<table>
	<thead>
    <tr>
        <th>HTTP Verb</th>
        <th>CRUD</th>
        <th>Description</th>
    </tr>
	</thead>
	<tbody>
		<tr>
			<td>GET</td>
			<td>Read</td>
			<td>Retrieve information about existing resources. For example, you can use a GET call to retrieve information about all objects or just a singular object.</td>
		</tr>
		<tr>
			<td>POST</td>
			<td>Create</td>
			<td>Create new resources or execute custom actions. For example, you would use a POST call to create a new RFI.</td>
		</tr>
		<tr>
			<td>PATCH</td>
			<td>Update</td>
			<td>Partial update of existing resources. For example, if you wanted to change the status of an RFI, you would perform a PATCH call where you could update just the status of the RFI or change other supported parameters.</td>
		</tr>
		<tr>
			<td>DELETE</td>
			<td>Delete</td>
			<td>Delete resources. Use the DELETE call to remove an existing resource.</td>
		</tr>
	</tbody>
</table>

To learn more about HTTP verbs as RESTful methods, see [HTTP Methods for RESTful Services](http://www.restapitutorial.com/lessons/httpmethods.html).

## API Requests and Responses

### Requests

By default, all API requests expect input in application/json format where each request is allowed to contain parameters and other discretionary data types.
All JSON requests must specify the object types that the payload is carrying.
The format type, query parameters, and any other required fields are contained within the sample **body** request for each object as depicted in the following example.

```
{
  "company_id": 5,
  "project": {
    "name": "Project A",
    "description": "A description of the project",
    "address": "500 Construction Way",
    "city": "Carpinteria",
    "zip": "93013",
    "department_ids": [1,2,],
    "project_number": "A-1",
    "estimated_start_date": "2015-05-15",
    "estimated_completion_date": "2015-05-31"
  }
}
```

### Responses

All API call responses return the requested information in JSON format.
Responses in XML format are currently not supported.
The following example shows the response from the request shown above.

```
{
    "id": 185407,
    "logo_url": "https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_105341655.png?AWSAccessKeyId=xxxxxxxxxxxxxxxxxx",
    "name": "Project F",
    "display_name": "A-2 - Project F",
    "project_number": "A-2",
    "address": "500 Construction Way",
    "city": "Carpinteria",
    "state_code": "CA",
    "country_code": "US",
    "zip": "93013",
    "latitude": null,
    "longitude": null,
    "description": "A description of the project",
    "square_feet": 5000,
    "estimated_start_date": "2015-05-15",
    "estimated_completion_date": "2015-05-31",
    "active": true,
    "flag": "Yellow",
    "phone": "310-555-5555",
    "public_notes": "Notes",
    "actual_start_date": "2015-05-15",
    "projected_finish_date": "2015-05-31",
    "created_at": "2016-04-14T17:55:40Z",
    "updated_at": "2016-04-14T17:55:41Z",
    "office": {
        "id": 3610,
        "name": "Carpinteria"
    },
    "project_stage": {
        "id": 1,
        "name": "Bidding"
    },
    "project_type": {
        "id": 5,
        "name": "Commercial"
    },
    "program": {
        "id": 5,
        "name": "Program NW"
    },
    "departments": [
        {
            "id": 3127,
            "name": "Accounting"
        },
        {
            "id": 3128,
            "name": "Administrative"
        }
    ]
}
```

## HTTP Status Codes

Every request includes a HTTP status code with the result.
The code indicates the success or failure of an API request.
In general, codes in the **2xx range indicate success**, codes in the **4xx indicate an error** with the provided information, and codes in the **5xx range indicate a server-side error**.

**Successful status codes (2xx)**

- **200 OK** - The request was successful.
- **201 Created** - The resource was successfully created. Confirms a success when creating a new employee, time off request, etc.

**Client error status codes (4xx)**

- **400 Bad Request** - The request was invalid or could not be understood by the server. Resubmitting the request will likely result in the same error.
- **401 Unauthorized** - Your API key is missing.
- **403 Forbidden** - The application is attempting to perform an action it does not have privileges to access. Verify your API key belongs to an enabled user with the required permissions.
- **404 Not Found** - The resource was not found with the given identifier. Either the URL given is not a valid API, or the ID of the object specified in the request is invalid.
- **406 Not Acceptable** - The request contains references to non-existent fields.
- **409 Conflict** - The request attempts to create a duplicate. For employees, duplicate emails are not allowed. For lists, duplicate values are not allowed.
- **422 Unprocessable Entity** - The structure, syntax, etc of the API call was correct, but due to business logic the server is unable to process the request.
- **429 Limit Exceeded** - The account has reached its employee limit. No additional employees could be added.

**Server error status codes (5xx)**

- **500 Internal Server Error** - The server encountered an error while processing your request and failed.
- **502 Gateway Error** - The load balancer or web server had trouble connecting to the ACME app. Please try the request again.
- **503 Service Unavailable** - The service is temporarily unavailable. Please try the request again.

You can future proof your code by using the following status code ranges:

- 200–299 as success
- 400–499 as client request errors
- 500–599 as server errors
