---
permalink: /tutorial-drawings
title: Working with Drawings
layout: default
section_title: Guides and Tutorials

---

## Overview

One of the most compelling and valuable tools in the Procore platform is the Drawings Tool.
The Procore API provides a number of endpoints you can use to leverage the power of the Drawings Tool in your applications and integrations.
Before you begin working with the various Drawings tool endpoints we recommend familiarizing yourself with the features and capabilities of the tool by referencing the following instructional resources.

- [Procore Support Site - Drawings](https://support.procore.com/products/online/user-guide/project-level/drawings) - A collection of articles covering the capabilities and usage of the Drawings Tool.
- [Interactive Workflow Diagram](https://support.procore.com/products/online/user-guide/project-level/drawings/workflow) - A clickable diagram illustrating the common workflow supported by the Drawings Tool.
- Procore Training Videos:
    - [Configure Drawings Settings](https://www.youtube.com/watch?v=lnvFlpjkIyk)
    - [Upload Drawings](https://www.youtube.com/watch?v=D1CNJcJ8Nbg)
    - [View Drawings](https://www.youtube.com/watch?v=qeE-QTvWBOc)
    - [Mark Up Drawings](https://www.youtube.com/watch?v=CzicT-q_O7k)
    - [Upload Drawing Revisions](https://www.youtube.com/watch?v=0DLPzeFT0v0)

## Getting Started

### Drawing Resources

Before working with the Drawings Tool endpoints we recommend familiarizing yourself with the various Drawings Tool resources and how they relate to one another.
The following diagram illustrates the relationships between the entities that make of the architecture of the Drawiongs Tool.

![ER Diagram - Drawings]({{ site.baseurl }}/assets/guides/drawing-er-diag.svg)

Let's define these entities and gain an understanding of the role each one plays in the overall functionality of the Drawings Tool.

- **Drawings** - The portion of the contract documents that gives a graphic representation and technical details of the work to be done in the construction of a project. A Drawing has one or more Drawing Revisions, is included one or more Drawing Uploads, and is associated with a single Drawing Area and a single Drawing Tile.
- **Drawing Area** - An organizational construct used to differentiate between separate physical portions of a job. Commonly used to denote separate building locations on a jobsite. All projects by default have at least one Drawing Area. A Drawing Area can have zero or more Drawings, Drawing Revisions, Drawing Uploads, and Drawing Sets.
- **Drawing Set** - Used to organize Drawings into logical sets. Often used to group Drawings by project phases or milestones, for example 'bid set', 'addendum #1', 'as built', etc. A Drawing Set comprises one or more Drawings and Drawing Revisions, and can be associated with a specific Drawing Area.
- **Drawing Upload** - Represents a collection of one or more Drawings that have been selected for upload to Procore. Drawing Uploads are associated with a Drawing Area.
- **Drawing Revision** - A single, updated version of a Drawing having the same drawing number, in the same Drawing Set. A Drawing Revision is associated with a specific Drawing Area.
- **Drawing Tile** - A graphical (avatar) representation of a Drawing used in the Procore UI. A Drawing Tile is associated with one (and only one) Drawing.

### Configuring the Drawings Tool ###


Before working with the API endpoints for the Drawings Tool you will want to examine and possibly modify how the tool is configured for the project you are working in.
If you're a Project Administrator, you may find it useful to customize these options by using the advanced configuration settings.
For example, you can control how revisions are ordered, add subscribers to your drawings so that they are automatically notified when the "current set" changes new revisions are uploaded, as well as control each user's permissions levels on the Drawing tool.
To access the Drawings Tool configuration settings, log into Procore and perform the following:

1. Navigate to the Project you are working in.
1. From the Toolbox menu, select Drawings in the Project Management section.
1. Click the 'gear' icon in the upper left portion of the screen to access the Drawings Tool configuration settings for the selected project.
1. Examine and modify the values for the settings described in the sections below as needed.

#### Drawing Log Settings

Use the Drawing Log Settings control to configure a number of attributes of the Drawings Tool:

- Select a Revision # Ordering Scheme
- Add or delete Drawing Log Subscribers
- Specify the Number of Drawings per Page
- Allow Standard Level Users to Delete Published Markup
- Enable Drawings By Area

For additional information on configuring Drawing Log Settings, see the [Configure Advanced Settings: Drawings](https://support.procore.com/products/online/user-guide/project-level/drawings/tutorials/configure-advanced-settings-drawings) article on our Support Site.

#### Discipline Abbreviation Setup

When you upload drawings into Procore, you may notice that the drawing discipline field is automatically pre-filled with the correct drawing discipline.
(e.g Architectural, Civil, Electrical etc.) By default, there are several abbreviations that are mapped to the most common industry standard disciplines.
However, you can customize the default abbreviation mappings or add custom ones, as needed, on a per project basis.

#### Permissions Table

You can use the Permissions Table to manage/change user permissions for the Drawings Tool.

## Drawings Tool API Endpoints

| Action                                                                                                     | Endpoint URI                                                                               | Description                                                                                                             |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Create Drawing Upload](https://developers.procore.com/reference/rest/v1/drawings#create-drawing-upload)   | POST /rest/v1.0/projects/{project_id}/drawing_uploads                                      | Creates a new Drawing Upload in the specified Project.                                                                  |
| [List Drawing Uploads](https://developers.procore.com/reference/rest/v1/drawings#list-drawing-uploads)     | GET /rest/v1.0/projects/{project_id}/drawing_uploads                                       | Returns a list of all Drawing Uploads in the specified Project.                                                         |
| [Delete Drawing Upload](https://developers.procore.com/reference/rest/v1/drawings#delete-drawing-upload)   | DELETE /rest/v1.0/projects/{project_id}/drawing_uploads/{id}                               | Deletes an unreviewed Drawing Upload.                                                                                   |
| [Create Drawing Area](https://developers.procore.com/reference/rest/v1/drawings#create-drawing-area)       | POST /rest/v1.0/projects/{project_id}/drawing_areas                                        | Creates a new Drawing Area in the specified Project.                                                                    |
| [List Drawing Areas](https://developers.procore.com/reference/rest/v1/drawings#list-drawing-areas)         | GET /rest/v1.0/projects/{project_id}/drawing_areas                                         | Returns a list of all Drawing Areas in the specified Project.                                                           |
| [Create Drawing Set](https://developers.procore.com/reference/rest/v1/drawings#create-drawing-set)         | POST /rest/v1.0/projects/{project_id}/drawing_sets                                         | Creates a new Drawing Set in the specified Project.                                                                     |
| [List Drawing Sets](https://developers.procore.com/reference/rest/v1/drawings#list-drawing-sets)           | GET /rest/v1.0/projects/{project_id}/drawing_sets                                          | Lists the Drawing Sets in the specified Project.                                                                        |
| [Update Drawing Set](https://developers.procore.com/reference/rest/v1/drawings#update-drawing-set)         | PATCH /rest/v1.0/projects/{project_id}/drawing_sets                                        | Updates an existing Drawing Set in the specified Project.                                                               |
| [Delete Drawing Set](https://developers.procore.com/reference/rest/v1/drawings#delete-drawing-set)         | DELETE /rest/v1.0/projects/{project_id}/drawing_sets/{id}                                  | Deletes a specified Drawing Set from the specified Project.                                                             |
| [List Drawings](https://developers.procore.com/reference/rest/v1/drawings#list-drawings)                   | GET /rest/v1.0/drawing_areas/{drawing_area_id}/drawings                                    | Returns a list of all Drawings for a specified Drawing Area.                                                            |
| [Update Drawing](https://developers.procore.com/reference/rest/v1/drawings#update-drawing)                 | PATCH /rest/v1.0/drawing_areas/{drawing_area_id}/drawings/{id}                             | Updates a specified Drawing in the Drawing Area.                                                                        |
| [List Drawing Revisions](https://developers.procore.com/reference/rest/v1/drawings#list-drawing-revisions) | GET /rest/v1.0/projects/{project_id}/drawing_revisions                                     | Returns a list of all Drawing Revisions in the specified Project.                                                       |
| [List Drawing Tiles](https://developers.procore.com/reference/rest/v1/drawings#list-drawing-tiles)         | GET /rest/v1.0/projects/{project_id}/drawing_revisions/{drawing_revision_id}/drawing_tiles | Lists the Drawing Tiles in the specified Project and Drawing Revision, along with the maximum Zoom Level and Tile Size. |

## Using the API to Populate the Drawings Tool with Assets ##


The following sections describe in general terms the tasks for setting up and populating the Drawing Tool with drawing assets.

### Creating a New Drawing Upload

One of the primary tasks in working with the Drawings Tool API is creating a new Drawing Upload.
This step is common at the outset of a project when the initial set of drawings is first provided to the team, and throughout the course of the project as new drawing revisions become available.
The Procore API provides the Create Drawing Upload endpoint to enable creating a new Drawing Upload programmatically from your application.
Here are a few things to keep in mind when working with the Create Drawing Upload endpoint.

> PDF REQUIREMENT
>
> Please note that all files uploaded to the Procore Drawings tool must in PDF format.
> Other image file formats are currently not supported.

- **File Format** - Files you include in your Drawing Upload must be PDF.
- **Required Parameters** - The Create Drawing Upload reference page indicates that `project_id`, `drawing_set_id`, and `drawing_area_id` are required parameters. However, it should be noted that `drawing_area_id` is only required if you have drawing areas enabled on your project.
- **Payload Format** - Note that the content-type for your entire payload (including parameter values and files) must be `multipart/form-data`.

Once you have successfully initiated a new Drawing Upload, notifications are sent and the drawings are available for review and subsequent publication using the Procore UI.

### Creating a New Drawing Area

If your project includes more than one building, multiple floors, or other distinct physical areas, you may find it advantages to create one or more Drawing Areas to help you organize your project drawings.
The Procore API provides the Create Drawing Area endpoint to enable creating new Drawing Areas programmatically from your application.
Here are a few things to keep in mind when working with the Create Drawing Area endpoint.

- **Enable Drawing Areas** - In order for Drawing Areas creating using the API to be visible in the Procore UI, you must have the 'Enable Drawings by Area' option enabled in the Drawing Log Settings for your project. Note that you can successfully create a new Drawing Area using the API without this option being enabled, but the new area will not be visible to Procore UI users.
- **Required Parameters** - project_id is a required path parameter and name is a required body parameter for the Create Drawing Area endpoint.
- **Drawing Area Descriptions** - Descriptions on Drawing Areas can only be entered using the Procore UI. Only the `Name` attribute can be defined using the API. There is currently no capability for creating a Description for a Drawing Area using the API.

### Creating Drawing Sets

In Procore, a drawing set is any like group of drawings that were issued on the project, whether it was entire set of plans, or a single drawing revision.
A drawing set can be anything from the bid set, to an addendum, to the issued for construction (IFC) set, or even a bulletin.
The Procore API provides the Create Drawing Set endpoint to enable creating new Drawing Sets programmatically from your application.
Here are a few things to keep in mind when working with the Create Drawing Set endpoint.

- **No Upload Required** - When using the Procore UI, you can only create a new Drawing Set while creating a new Drawing Upload. However, using the Procore API you can create a Drawing Set separate from the Drawing Upload creation process. In this scenario, Drawing Sets you create using the API will show up in the Set drop-down in the Upload New Drawings dialog and be selectable when users create new Drawing Uploads using the Procore UI.
- **Required Parameters** - `project_id` is a required path parameter and `name` is a required body parameter for the Create Drawing Set endpoint.

Optionally, you can specify a date for your Drawing Set as a body parameter.

## Common Drawing Tool Scenarios and Use Cases

Below are some common scenarios and use cases you may encounter while working with the Drawings Tool API endpoints.

### Uploading Drawings to the Latest Drawing Set

One use case that is not inherently addressed by the current set of Drawings Tool endpoints is the ability to upload one or more drawings to the latest (most recently updated/created) Drawing Set.
To accomplish this using the API, you will need to work through the following steps.

1. Make a call to List Drawing Sets to retrieve all Drawing Sets in a specific Project.
1. Iterate through each Drawing Set element in the JSON response block and locate the latest Drawing Set based on the value of the `updated_at` attribute.
1. Now make a call to Create Drawing Upload and use the id of the lastest Drawing Set you located in Step 2 as the value for the required `drawing_set_id` body parameter.

### Finding the Current Drawing Revisions

By default, the List Drawing Revisions endpoint returns all revisions in a given Project regardless of the value of the `current` attribute.
However, there may be instances where you are only interested in working with current revisions.
To accomplish this using the API, you will need to work through the following steps.

1. Make a call to List Drawing Revisions to retrieve all Drawing Revisions in a specific Project.
1. Iterate through each Drawing Revision element in the JSON response block and examine the value of the `current` attribute. If the value is `true`, store the `id` of that revision in an array.
1. Call List Drawing Revisions again, this time using the array of ids you collected in Step 2 to construct a filter using the `id` query parameter (e.g., ?id[]=42&id[]=43...). This will return only the revisions where `current: true`.

## Sample Code ##


This [downloadable sample code]({{ site.baseurl }}/assets/static/implicit-grant-sample-code.html) provides examples of some basic operations using the Drawings Tool API endpoints within the context of a single-page javascript/jquery application.
Each function in the application demonstrates a particular Drawing Tool action or task.
Constants are provided for you to specify `ACCESS_TOKEN`, `PROJECT_ID`, and `DRAWING_AREA_ID` values as needed.
