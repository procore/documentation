---
permalink: /tutorial-observations
title: Working with Observations
layout: default
section_title: Guides and Tutorials

---

## Introduction

Throughout the course of a project, the project manager and superintendent will create observations documenting safety and quality deficiencies, work to be completed, warranty requests, and commissioning.
Tracking these types of items throughout the project helps teams to identify trends and make sure the project progresses smoothly.

The Observations tool allows team members to create observations related to safety, quality, work to complete, commissioning, and warranty directly in Procore.
Users can create observations, view details, track responses, add attachments, and search for relevant observations in the tool.
The Procore API provides a number of endpoints that allow applications to perform operations with observations programmatically.
This guide summarizes the available observations endpoints and presents common workflows and best practices for working with observations using the Procore API.

Before you begin working with the observations endpoints, we strongly recommend studying the available documentation covering observations at [support.procore.com](https://support.procore.com/).
Relevant Quality & Safety training material is available at [learn.procore.com](https://learn.procore.com/series/procore-certification/procore-certification-project-manager-quality-and-safety).

## Observations API Endpoints

The following table lists the observations endpoints currently available through the Procore API.

| Endpoint                                                                                                                                                            | Description                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [Create Observation Item](https://developers.procore.com/reference/rest/v1/observations#create-observation-item)                                                    | Create a new observation in the specified project.                                             |
| [Show Observation Item](https://developers.procore.com/reference/rest/v1/observations#show-observation-item)                                                        | Show details on the specified observation.                                                     |
| [List Observation Items](https://developers.procore.com/reference/rest/v1/observations#list-observation-items)                                                      | List all observations in the specified project.                                                |
| [Update Observation Item](https://developers.procore.com/reference/rest/v1/observations#update-observation-item)                                                    | Update one or more attributes of the specified observation.                                    |
| [List Observation Types](https://developers.procore.com/reference/rest/v1/observations#list-observation-types)                                                      | List the available observation Types in the specified project.                                 |
| [List Observation Assignee Options](https://developers.procore.com/reference/rest/v1/assignee-options#list-observation-assignee-options)                            | Return a list of users that the current user can assign to observations.                       |
| [Send Unsent Observation Items](https://developers.procore.com/reference/rest/v1/observations#send-unsent-observation-items)                                        | Send (via email) observation items that have not been sent previously.                         |
| [List Observation Item Response Logs](https://developers.procore.com/reference/rest/v1/observations#list-observation-item-response-logs)                            | Return a collection of response logs for the specified observation item.                       |
| [Create Observation Item Response Log](https://developers.procore.com/reference/rest/v1/observations#create-observation-item-response-log)                          | Create a new response log for a specified observation item.                                    |
| [List Observation Category Configurable Fieldsets](https://developers.procore.com/reference/rest/v1/observations#list-observation-category-configurable-field-sets) | Return a collection of observation category configurable fieldsets from the specified project. |
| [List Observation Default Distribution Members](https://developers.procore.com/reference/rest/v1/observations#list-observation-default-distribution-members)        | Return a collection of users from the observations default distribution list.                  |
| [List Observation Potential Distribution Members](https://developers.procore.com/reference/rest/v1/observations#list-observation-potential-distribution-members)    | Return a collection of potential users for the observations distribution list.                 |

## Observations Tool Configuration
Before you begin working with observations using the available Procore API endpoints, there are some preliminary tasks you may want to work through in order to establish the proper framework for your observations workflows.
These optional tasks, described in the following sections, include configuring advanced settings, adding custom observation types, and working with configurable fieldsets.

### Configuring Advanced Settings

You can further refine the behaviour of the Project Observations tool by configuring one or more advanced settings.
These settings include specifying a default due date for observations, specifying whether new observations are ‘private’ and thus hidden by default, and defining the default distribution group.
In addition, you can fine-tune the permissions on the Observations tool for individual users.
Similar to the custom observation types described above, you can only configure advanced settings from within the Procore web user interface.

### Adding Custom Observation Types

By default, Procore offers five categories of observations with specific observation types within each category as described in the following table.

| Observation Category | Default Observation Type(s)                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Commissioning        | - _Commissioning_ - items that ensure that the project's mechanical, electrical, HVAC, fire protection, security, etc. equipment function properly before the project is cleared for general use.                                                                                                                                                                                                                                                                                          |
| Quality              | - _Corrective Action_ - items that need to be completed to correct or rectify an issue.<br>- _Deficiency_ - work that was not completed to professional standards or wasn't up to an acceptable level of quality.<br>- _Non-Conformant_ - work that does not conform to the approved plans.<br>- _Pre-Punch_ - punch list items that need to be fixed before the official punch list is created with the owner/architect.                                                                  |
| Safety               | - _Near-Miss_ - an action or condition that had the potential to result in a safety incident, but it was noticed before the incident occurred.<br>- _Safety Hazard_ - a hazardous condition that exists on site.<br>- _Safety Notice_ - a verbal or written warning given to a person or company because he or she was behaving in an unsafe way.<br>- _Safety Violation_ - a behavior or negligence on the part of a person that violates safety policies or safety laws and regulations. |
| Warranty             | - _Warranty_ - instances where a vendor needs to come to the site and service or replace a piece of equipment as covered in the equipment's warranty. |                                                                                                                                                                                                                                                                                                                                    |

In addition to the default observation categories and types listed above, Procore offers the capability to add custom observation types so you can tailor your workflows to better suit your own company’s specific processes.
It is important to note that adding custom observation types can only be accomplished using the Procore web user interface and is not currently supported by the Procore API.
Therefore, we recommend setting up custom observation types prior to working with the observation endpoints provided by the Procore API.

You can add, delete, edit, and mark as 'Inactive' your custom and default observation types in the Company Admin tool.
See [Add Custom Observation Types](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/Add_Custom_Observation_Types) for additional information.

#### Retrieving Observation Types with the API

You can use the [List Observation Types](https://developers.procore.com/reference/observations#list-observation-types) endpoint to retrieve information on the available observation types in a given company or project.
Below is a cURL example showing a call to List Observation Types for a project.

```
curl  -X GET https://api.procore.com/rest/v1.0/observations/types?project_id=123456
```

### Working with Configurable Fieldsets

The Observations tool is one of several Procore tools that support configurable fieldsets.
Configuring fieldsets allows you to customize which fields are visible when your team creates observations.
Fieldsets are associated with different observations types.
Because different fields might be more important on some observation types and less on others, each fieldset can be configured to match the needs of your business.
See [Configure Observation Fieldsets](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/configure-observations-fieldsets) for information on configuring and working with observation fieldsets in Procore.

#### Retrieving Information on Configurable Fieldsets with the API

When using the Procore API to work with observations, you may want to query the list of configured fieldsets so that you know which fields are available/required for a given observation category/type.
You can use the [List Observation Category Configurable Fieldsets](https://developers.procore.com/reference/rest/v1/observations#list-observation-category-configurable-field-sets) endpoint to return information on configured fieldsets from the specified Project.
Below is a cURL example showing a call to List Observation Category Configurable Fieldsets

```
curl  -X GET https://api.procore.com/rest/v1.0/observations/category_configurable_field_sets?project_id=123456
```

By default, Observations tool endpoints do not automatically respect changes made by Procore Admins to the Observations forms via a configurable fieldset.
To validate against a configurable fieldset, you need to include the `run_configurable_validations=true` parameter when creating or updating an observation.
In addition, the JSON responses returned do not respect a configurable fieldset.
For example, if the configurable fieldset makes certain fields hidden, they will still appear in the response body.

## Common Observation Workflows

The following sections cover some of the common workflows you may encounter while building integrations that leverage Procore’s Observations tool.

### Creating and Assigning an Observation

Using the Procore API to create a new observation and assign it to a user is a multi-step process that involves calls to a number of API endpoints.
Below are the high-level steps to creating and assigning a new observation.

- Creating a new observation starts by retrieving a list of the available observation types in the project using the List Observation Types endpoint (GET /rest/v1.0/observations/types). Each observation type returned in the response body includes a corresponding type_id value. This is important because the Create Observation Item endpoint requires the observation `type_id` as a required body parameter. In addition, there may be custom observation types that have been added to the project by the Procore administrator, so making a call to List Observation Types will allow you to discover and note the `type_id` values for these additional observation types.
- Make a call to List Observation Category Configurable Field Sets (GET /rest/v1.0/observations/category_configurable_field_sets) to see which fields are available and/or required to create a new observation. If any fieldset configuration has occurred in the project, this step will help you understand the customization and plan accordingly when constructing the request body for the Create Observation item endpoint.
- Determine default and potential distribution group members for the new observation (GET /rest/v1.0/observations/default_distribution, GET /rest/v1.0/observations/potential_distribution_members) so that you can appropriately include the `id` values for the group members you want to include in the Create Observation item request body.
- Create the observation (POST /rest/v1.0/observations/items) with a request body including the `project_id` and other required field values based on the information gathered from steps 1-3 above.

### Updating an Existing Observation

Once an observation is created it can be updated with additional detail using the following steps.

- Retrieve the `id` for the observation you want to update by making a call to List Observation Items (GET /rest/v1.0/observations/items) and parsing the JSON response.
- Patch the existing observation (PATCH /rest/v1.0/observations/items/{id}) including the `id` as a path parameter with updated field values in the request body.

### Adding Response Logs to an Observation

During the course of an obversation’s lifecycle, there may be the need to add comments, or _response logs_.

- Retrieve the `id` for the observation you want to add a response log to by making a call to List Observation Items (GET /rest/v1.0/observations/items) and parsing the JSON response.
- Create the new response log (POST /rest/v1.0/observations/items/{item_id}/response_logs) including the `item_id` as a path parameter and the response log content in the request body.

### Retrieving All Response Logs for an Observation

Use these steps to retrieve a list of all response logs for a given observation.

- Make a call to List Observation Item Response Logs (GET /rest/v1.0/observations/items/{item_id}/response_logs) including the `item_id` as a path parameter and the `project_id` as a query parameter.
- Parse the JSON response as needed.

### Sending Out Observations
Unlike the behavior of the Procore web user interface, observations are not automatically sent to the assignee and distribution group members upon creation of an observation via the API.
Email notifications must be explicitly sent using the Send Unsent Observation Items endpoint as described by the following steps.
It is also important to note that all unsent observations within a given project are sent out when using the API.
Individual observations can only be sent using the Procore web user interface.

- Determine the `id` for the project that includes the observations you want to send out.
- Send out all unsent observations (POST /rest/v1.0/observations/items/send_unsent) including the `project_id` in the request body.

### Submitting an Observation for Review

Once an observation is acted upon and resolved by the assignee, it can be transitioned to the ‘Ready for Review’ state using the following steps.

- Retrieve details for the specified observation to be submitted for review (GET /rest/v1.0/observations/items/{id}).
- (Optional) Create a response log (POST /rest/v1.0/observations/items/{item_id}/response_logs) including the `item_id` as a path parameter and the response log content in the request body.
- Complete the assigned work and update the observation (PATCH /rest/v1.0/observations/items/{id}), setting the Status field in the request body to ‘ready_for_review’.

### Closing Out an Observation

Once the work has been reviewed for completeness, the final step in the observation lifecycle involves closing out the observation.

- Update the observation (PATCH /rest/v1.0/observations/items/{id}) including the `id` of the observation as a path parameter and setting the Status field in the request body to ‘closed’.

## Additional Information

For additional information on using the Observations tool, refer to the following resources.

- [Procore Support Site Articles](https://support.procore.com/products/online/user-guide/project-level/observations)
- [Procore Training Courses](https://learn.procore.com/series/procore-certification/procore-certification-project-manager-quality-and-safety)
