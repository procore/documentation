---
permalink: /tutorial-correspondence
title: Working with the Correspondence Tool
layout: default
section_title: Guides and Tutorials
---

## Introduction

The Correspondence Tool can be leveraged to handle a wide range of business processes that require communication between project stakeholders.
The Correspondence Tool is built on Procore’s [_custom tool_](https://support.procore.com/products/online/custom-solutions/tools) framework.
This allows each correspondence type to be treated like its own separate tool in terms of project-level configuration, permissions, field entries, etc.
This guide provides information on the various API resources related to the Correspondence Tool and presents examples of some common use cases and tasks you may encounter while working with these resources.
For general information on the Correspondence Tool, see the [Correspondence](https://support.procore.com/products/online/user-guide/project-level/correspondence) article on the Procore Support Site.

## Before You Begin

There are a number of requirements that need to be satisfied before you can work with Correspondence Tool API resources and endpoints used in the examples presented in this guide.

- Verify that the Correspondence Tool is enabled in your Procore account. (See Tool Settings in the Admin tool)
- Use the Admin tool to [Create a New Correspondence Type](https://support.procore.com/products/online/user-guide/project-level/correspondence/tutorials/create-a-new-correspondence-type). There must be at least one Correspondence Type set up in the company.
- Use the Admin tool to [Apply a Fieldset to Projects in the Correspondence Tool](https://support.procore.com/products/online/user-guide/project-level/correspondence/tutorials/apply-a-fieldset-to-projects-in-the-correspondence-tool). There must be at least one fieldset applied to one or more projects.

## Resource Naming Conventions

While working with the Correspondence Tool API resources, it is important to be aware of how the various resources are named and how the naming conventions compare and contrast with the equivalent constructs in the Procore web application.
The following table presents Correspondence Tool API resources and lists the equivalent name in the context of the Procore web application.

| Correspondence Tool API Resource | Procore Web Application Equivalent |
| -------------------------------- | ---------------------------------- |
| Generic Tool                     | Correspondence Type                |
| Generic Tool Item                | Correspondence Item                |

## Resources and Associations

Here is a simplified class diagram showing the main resource objects and their relationships.

![Correspondence Tool Objects]({{ site.baseurl }}/assets/guides/correspondence-tool-objects.png)

The _Generic Tool_ superclass defines the attributes that make up a custom tool on the Procore platform.
The _Correspondence Type_ object inherits from the Generic Tool class and is instantiated using the [Create Generic Tool](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#create-generic-tool) endpoint.
Each Correspondence Type must have at least one or more _Configurable Fieldsets_.
The Correspondence Type Item object represents an individual correspondence within a project.
A user in a project can be specified as an Assignee.
A single Correspondence Type Item can have multiple Assignees, while a single Assignee can be associated with more than one Correspondence Type Item.
Finally, a user in a project can be specified as a _Distribution Member_.
A single Correspondence Type Item can have multiple Distribution Members, while a single Distribution Member can be associated with one or more Correspondence Type Items.

## API Endpoints

The following tables list each endpoint name, HTTP action, endpoint URI, and description.
The endpoint names are linked to their corresponding reference pages.

### Company Level Endpoints (Base URL: /rest/v1.0/companies/{company_id})

| Name                                                                                                                                  | Action | Endpoint URI                                   | Description                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------- | ---------------------------------------------------------------------------- |
| [List Generic Tools](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-generic-tools)                             | GET    | /generic_tools                                 | Returns a list of all Correspondence Generic Tools in the specified Company. |
| [Create Generic Tool \*](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#create-generic-tool)                        | POST   | /generic_tools                                 | Create a new Correspondence Generic Tool in the specified Company.           |
| [List Statuses for a Generic Tool](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-statuses-for-a-generic-tool) | GET    | /generic_tools/{generic_tool_id}/statuses      | Returns a list of all Statuses for a Generic Tool.                           |
| [Create Generic Tool Status](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#create-generic-tool-status)             | POST   | /generic_tools/{generic_tool_id}/statuses      | Create a new Generic Tool Status for the specified Generic Tool.             |
| [Delete Generic Tool Status](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#delete-generic-tool-status)             | DELETE | /generic_tools/{generic_tool_id}/statuses/{id} | Delete the specified Generic Tool Status.                                    |

- Details on working with the Create Generic Tool endpoint will be covered in a future revision of this guide.

### Project Level Endpoints (Base URL: /rest/v1.0/projects/{project_id})

| Name                                                                                                                                                      | Action | Endpoint URI                                                                                                | Description                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [List Generic Tool Items](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-generic-tool-items)                                       | GET    | /generic_tools/{generic_tool_id}/generic_tool_items                                                         | Returns a list of all Generic Tool Items in the specified Project and Generic Tool.                      |
| [Create Generic Tool Item](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#create-generic-tool-item)                                     | POST   | /generic_tools/{generic_tool_id}/generic_tool_items                                                         | Create a new Generic Tool Item in the specified Project and Generic Tool.                                |
| [Batch Update Generic Tool Items](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#batch-update-generic-tool-items)                       | PATCH  | /generic_tools/{generic_tool_id}/generic_tool_items                                                         | Update all selected Generic Tool Items.                                                                  |
| [List Statuses Available for a Generic Tool](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-statuses-available-for-a-generic-tool) | GET    | /generic_tools/{generic_tool_id}/generic_tool_items/available_statuses                                      | Returns a list of all statuses in the specified Project and Generic Tool.                                |
| [List Users With Access to a Generic Tool](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-users-with-access-to-a-generic-tool)     | GET    | /generic_tools/{generic_tool_id}/generic_tool_items/available_read_users                                    | Returns a list of all Users in the specified Project and Generic Tool.                                   |
| [Show Generic Tool Item](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#show-generic-tool-item)                                         | GET    | /generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}                                  | Return details on a single Generic Tool Item.                                                            |
| [Update Generic Tool Item](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#update-generic-tool-item)                                     | PATCH  | /generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}                                  | Update attributes for the specified Generic Tool Item.                                                   |
| [Delete Generic Tool Item](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#delete-generic-tool-item)                                     | DELETE | /generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}                                  | Delete the specified Generic Tool Item.                                                                  |
| [List Responses for a Generic Tool Item](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-responses-for-a-generic-tool-item)         | GET    | /generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}/generic_tool_item_responses      | Returns a list of all Responses for a Generic Tool Item in the specified Project and Generic Tool.       |
| [Create Generic Tool Item Response](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#create-generic-tool-item-response)                   | POST   | /generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}/generic_tool_item_responses      | Create a new Response for a Generic Tool Item in the specified Project and Generic Tool.                 |
| [Update Generic Tool Item Response](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#update-generic-tool-item-response)                   | PATCH  | /generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}/generic_tool_item_responses/{id} | Update a Generic Tool Item Response's attributes.                                                        |
| [List Correspondence Type Items](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-correspondence-type-items)                         | GET    | /correspondence_type_items                                                                                  | Returns a list of all Correspondence Type Items in the specified Project.                                |
| [Batch Update Correspondence Type Items](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#batch-update-correspondence-type-items)         | PATCH  | /correspondence_type_items                                                                                  | Update all specified Correspondence Type Items.                                                          |
| [List Correspondence Type Permissions](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-correspondence-type-permissions)             | GET    | /correspondence_types/permissions                                                                           | Returns a list of all Correspondence Types Permissions for the requesting User in the specified Project. |
| [List Correspondence Type Defaults](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-correspondence-type-defaults)                   | GET    | /correspondence_types/defaults                                                                              | Returns a list of all Correspondence Types Defaults for the specified Project.                           |
| [List Correspondence Type Users](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-correspondence-type-users)                         | GET    | /correspondence_types/users                                                                                 | Returns a list of all Correspondence Types Users Availability for the specified Project.                 |

## Understanding Correspondence Tool Permissions

One key aspect of working with the Correspondence Tool API centers around the concept of permissions.
Certain access levels (Read Only, Standard, and Admin) are required to perform certain tasks within the Correspondence Tool.
Refer to the [Correspondence Tool Permissions](https://support.procore.com/products/online/user-guide/project-level/correspondence/permissions) article on the Procore Support Site for detailed information on the tasks allowed under each access level.
The access level of the currently authenticated user determines which actions you can take on their behalf through your integration.
For example, if the user only has Read Only access then your integration would not be able to create a new Correspondence Type Item on their behalf.
Conversely, if the user has Admin access then most company and project level correspondence actions are allowed.
It is important to keep your users’ roles, access levels, permissions, and general workflow requirements in mind as you design and build out your integration.

### Granular Permissions

In addition to the general access level permissions described above, the Correspondence Tool supports granular permissions for increased configurability.
The table below lists the granular permissions supported for the Read Only and Standard user access levels in the Correspondence Tool.
These granular permissions are used to further define who can create, view, update, or respond to items.

- **create_response** - Grants users the privilege to create a response to items they are associated with.
- **edit_items_they_created** - Grants users the privilege to edit open items they created.
- **create** - Grants users the privilege to create a new item.
- **respond_to_vendor_items** - Grants users the privilege to respond to items accessible to users within the same vendor company.
- **view_vendor_items** - Grants users the privilege to view items accessible to users within the same vendor company.

### Private Correspondence Type Items

Correspondence Type Items are set to ‘private’ by default to limit their scope to only the originator and users designated as assignees or distribution members.
However, the granular permissions described above can be used to expose ‘private’ items to users within the same company for viewing and/or responding.
See [Grant Granular Permissions for the Correspondence Tool](https://support.procore.com/products/online/user-guide/project-level/correspondence/tutorials/grant-granular-permissions-for-the-correspondence-tool) for additional information.

## Common Use Cases and Workflows

Here are some use cases and API-based workflows commonly encountered while working with the Correspondence Tool API.
The tasks described assume the prerequisites described above have been satisfied.

### Retrieve Existing Correspondence Types

Identifying the existing Correspondence Types in a company is a good starting point for working with the Correspondence Tool API.
We’ll use the [List Generic Tools](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-generic-tools) endpoint here to see what Correspondence Types are available in a specific company.

![List Generic Tools]({{ site.baseurl }}/assets/guides/list-generic-tools.png)

The following JSON response shows that two Correspondence Types have been set up in the company.

```
[
  {
    "id": 126094,
    "abbreviation": "01",
    "private_by_default": true,
    "title": "Basic Correspondence"
  },
  {
    "id": 126160,
    "abbreviation": "DR",
    "private_by_default": true,
    "title": "Design Review"
  }
]
```

Each Correspondence Type includes an `id` attribute as a unique identifier.
The `abbreviation` string is used as a prefix to the full length `title`.
The Correspondence Types in the example are set to ‘private’.

### Determine if a Specific Correspondence Type is Available in a Project

Because Correspondence workflows commonly happen at the project level, it is important to verify that the Correspondence Type you want to work with is available for use in your project.

#### Using the Procore Web Application

1.  In the Procore web application, open the project you want to work with.
2.  From the Project Tools menu, choose Correspondence under Project Management.

    ![Correspondence menu item]({{ site.baseurl }}/assets/guides/corres-menu-item.png)

3.  On the Correspondence page, open the **Create** menu and examine the list available Correspondence Types in the dropdown.
    If you find the type you want to work with in the dropdown list, that indicates it is supported in the current project.
    
    ![Create Correspondence]({{ site.baseurl }}/assets/guides/corres-create-menu.png)


        

#### Using the Procore API

1. Use the [List Generic Tools](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-generic-tools) endpoint to return all of the generic tools available in the specified company.
2. Parse the response body to find the `title` for the Correspondence Type you want to work with and retrieve its [`id`](https://developers.procore.com/reference/rest/v1/configurable-field-sets#list-project-configurable-field-sets value.
3. Use the [List Project Configurable Fieldsets](https://developers.procore.com/reference/rest/v1/configurable-field-sets#list-project-configurable-field-sets endpoint to return the fieldsets associated with your project.
4. Iterate through the returned fieldsets and compare each `generic_tool_id` value with the `id` for your Correspondence Type. If you find a match, that indicates that your Correspondence Type is supported and accessible in the specified project.

### Determine User ‘Availability’ for Correspondence Types

It is important to understand which users assigned to a project have the ability to interact with the Correspondence Tool and with which Correspondence Types.
The [List Correspondence Type Users](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-correspondence-type-users) endpoint returns a list of project users and identifies which Correspondence Types they can be associated with and in what capacity.

![List Correspondence Type Users]({{ site.baseurl }}/assets/guides/list-corres-type-users.png)

This excerpt from the JSON response shows that Joe Owner is associated with a vendor company and is able to be a participant on items in the ‘Basic Correspondence’ (id=126094) and ‘Design Review’ (id=126160) Correspondence Types.
He is available as an `potential_assignee`, a `potential_distribution_member`, and can be identified as the `potential_received_from` user.

```
{
  "id": 1477682,
  "company": {
    "id": 3968041,
    "name": "JJ Developers"
  },
  "generic_tools": [
    {
      "id": 126094,
      "potential_assignee": true,
      "potential_received_from": true,
      "potential_distribution_member": true,
      "custom_fields": {}
    },
    {
      "id": 126160,
      "potential_assignee": true,
      "potential_received_from": true,
      "potential_distribution_member": true,
      "custom_fields": {}
    }
  ],
  "name": "Joe Owner"
}
```

**Note**: The user must have Read Only or greater permissions on the specified Correspondence Type for `potential_assignee`, `potential_distribution_member`, and `potential_received_from` to be true.
User-level permissions on Correspondence Types are defined in the Project Directory tool.
See [Change a User's Permissions](https://support.procore.com/products/online/user-guide/project-level/directory/tutorials/change-a-users-permissions) for additional information.

### Retrieve Permissions for the Current User

Now let’s gather information on the currently authenticated user in order to determine which Correspondence Types the user can interact with and the actions the user is permitted to take based on their Correspondence Type Permissions.
Use the List Correspondence Type Permissions endpoint to retrieve this information.

![List Correspondence Type Permissions]({{ site.baseurl }}/assets/guides/list-corres-type-perms.png)

The example response below shows that the authenticated user is allowed to interact with two Correspondence Types.

- ‘Basic Correspondence’ with Standard permissions.
- ‘Design Review’ with Read Only permissions.

```
[
  {
    "available_for_user": true,
    "domain_id": -126094,
    "friendly_name": "Basic Correspondence",
    "id": 57280709,
    "name": "generic_tool_126094",
    "permitted_actions": [
      {
        "id": 44867735,
        "action_name": "create_response",
        "tool_name": "generic_tool_126094",
        "label": "create_response"
      },
      {
        "id": 44867734,
        "action_name": "edit_items_they_created",
        "tool_name": "generic_tool_126094",
        "label": "edit_items_they_created"
      },
      {
        "id": 44867733,
        "action_name": "create",
        "tool_name": "generic_tool_126094",
        "label": "create"
      },
      {
        "id": 44867732,
        "action_name": "respond_to_vendor_items",
        "tool_name": "generic_tool_126094",
        "label": "respond_to_vendor_items"
      },
      {
        "id": 44867731,
        "action_name": "view_vendor_items",
        "tool_name": "generic_tool_126094",
        "label": "view_vendor_items"
      }
    ],
    "create_url": null,
    "can_create": null,
    "tab_group": "custom",
    "url": "/219542/project/generic_tool?tool_id=126094",
    "user_access_level": {
      "id": 3,
      "name": "Standard"
    },
    "trial": false
    },
  {
    "available_for_user": true,
    "domain_id": -126160,
    "friendly_name": "Design Review",
    "id": 57289889,
    "name": "generic_tool_126160",
    "permitted_actions": [
      {
        "id": 44881321,
        "action_name": "create_response",
        "tool_name": "generic_tool_126160",
        "label": "create_response"
      }
    ],
    "create_url": null,
    "can_create": null,
    "tab_group": "custom",
    "url": "/219542/project/generic_tool?tool_id=126160",
    "user_access_level": {
      "id": 2,
      "name": "Read Only"
    },
    "trial": false
  }
]
```

The `permitted_actions` array describes additional actions enabled through granular permissions.
For example, in the Basic Correspondence type, all five granular permissions are enabled while in the Design Review type, just the `create_response` permission is enabled.
Parsing the response from List Correspondence Type Permissions allows you to identify what actions the currently authenticated user is allowed to perform.

### Create a New Correspondence Item

Creating a new item in the Correspondence Tool is a common task accomplished using the [Create Generic Tool Item](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#create-generic-tool-item) endpoint.
We use the Project `id` and the Generic Tool `id` in the path to specify which Project and Correspondence Type we want to work with.

![Create Generic Tool Item]({{ site.baseurl }}/assets/guides/create-generic-tool-item.png)

A JSON request body defines the various attributes for the new Correspondence.
For example:

```
{
  "generic_tool_item": {
    "description": "Ready for review/approval on console finishes.",
    "due_date": "08/31/2020",
    "position": "interior-002",
    "private": true,
    "schedule_impact": "no_impact",
    "cost_impact": "no_impact",
    "status": "Open",
    "title": "Console design finishes",
    "distribution_member_ids": [
      1477666
    ],
    "assignee_ids": [
      1477682
    ]
  }
}
```

Note that this example uses only a subset of the available input attributes for creating a Correspondence.
See the [Create Generic Tool Item ](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#create-generic-tool-item) reference page for the complete list of all request body attributes.

### List Correspondence Items by Correspondence Type

It is often useful to retrieve a list of existing Correspondence Items in a project filtered by a particular Correspondence Type.
We can use `filters[generic_tool_id]` as a query parameter on the [List Correspondence Type Items](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#list-correspondence-type-items) call to achieve this.

![List Correspondence Items Filtered]({{ site.baseurl }}/assets/guides/list-corres-items-filter.png)

The response includes only those items associated with the ‘Design Review’ (id=126160) Correspondence Type.
We also used the `view=ids_only` query parameter to just return the `ids` of the matching Correspondence Items.

```
[
  2752544,
  2752562
]
```

### Return Information on a Specific Correspondence Item

Continuing with our example, let’s take one of the Correspondence Items we retrieved in the last step and use the [Show Generic Tool Item](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#show-generic-tool-item) endpoint to see the details about the item.

![Show Generic Tool Item]({{ site.baseurl }}/assets/guides/show-generic-tool-item.png)

Example JSON response:

```
{
  "id": 2752562,
  "assignees": [
    {
      "id": 1477682,
      "company": {
        "id": 3968041,
        "name": "JJ Developers"
      },
      "locale": "",
      "login": "jjowner@example.com",
      "name": "Joe Owner"
    }
  ],
  "attachments": [],
  "closed_at": null,
  "cost_code": null,
  "cost_impact": {
    "status": null,
    "value": null
  },
  "created_at": "2020-08-11T17:07:14Z",
  "created_by": {
    "id": 3277981,
    "company": {
      "id": 3828353,
      "name": "JMJ Construction"
    },
  "locale": null,
  "login": "architect@example.com",
  "name": " architect"
  },
  "custom_fields": {},
  "description": "Ready for review/approval on console finishes.",
  "distribution_members": [
    {
      "id": 1477666,
      "company": {
        "id": 3968054,
        "name": "Construction Management, Inc"
      },
      "locale": "",
      "login": "projmanager@example.com",
      "name": "Joe ProjectManager"
    }
  ],
  "due_date": null,
  "generic_tool": {
    "id": 126160,
    "title": "Design Review"
  },
  "issued_at": "2020-08-11T17:07:14Z",
  "location": null,
  "position": "DR-interior-002",
  "private": true,
  "received_from": null,
  "schedule_impact": {
    "status": null,
    "value": null
  },
  "specification_section": null,
  "status": "Open",
  "title": "Console design finishes",
  "trade": null,
  "updated_at": "2020-08-11T17:07:14Z"
}
```

The Show Generic Tool Item endpoint returns detailed information about the specified Correspondence Item.

### Create a Response to a Correspondence Item

Now that we have located an item to work with, we can generate a response using the [Create Generic Tool Item Response](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#create-generic-tool-item-response) endpoint.
The example also shows the JSON request body.

![Create Item Response]({{ site.baseurl }}/assets/guides/create-corres-item-response.png)

Use the `notes` attribute to define the text for the response and use the boolean `official` attribute to indicate whether it is an official response.
File attachments are also supported.
See [Working with File Attachments and Image Uploads]({{ site.url }}{{ site.baseurl }}{% link tutorials/attachments.md %}) for information on using file attachments with the Procore API.

### Perform Bulk Operations on Correspondence Items

The [Batch Update Correspondence Type Items](https://developers.procore.com/reference/rest/v1/correspondences?version=1.0#batch-update-generic-tool-items) endpoint may be used to perform bulk operations on a set of Correspondence Items.
The request body defines updated field values for one or more items.

![Bulk Update Correspondence Items]({{ site.baseurl }}/assets/guides/batch-update-corres-items.png)

## Webhooks

The Correspondence tool supports webhooks as described in [Introduction to Webhooks]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks.md %}) and [Using the Webhooks API]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks_api.md %}). Procore customers can configure Correspondence webhooks using the Project Admin tool as outlined in [Configure Project Webhooks](https://support.procore.com/products/online/user-guide/project-level/admin/tutorials/configure-webhooks).

## Further Reading

- [Procore Support Articles - Correspondence Tool](https://support.procore.com/products/online/user-guide/project-level/correspondence)
- [Working with Configurable Fieldsets]({{ site.url }}{{ site.baseurl }}{% link tutorials/tutorial_config_fieldsets.md %})
