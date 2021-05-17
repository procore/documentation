---
permalink: /tutorial-project-stages
title: Working with Project Stages
layout: default
section_title: Guides and Tutorials

---

## Introduction

Each Procore company account includes an initial default set of project stages from which additional custom project stages can be created.
Procore project stages (both default and custom) are assigned to a Procore project to define its current phase/stage of construction.

Procore's default project stages include the following:

- **Pre-Construction**: The contract has not been awarded yet.
- **Course of Construction**: The contract has been awarded and work has commenced on the project.
- **Post-Construction**: Work on the job site has been completed, but the project is still in close-out, warranty, or being finalized.
- **Completed**: The project is successfully finished.
- **Not Awarded**: No contract was awarded with respect to the project.
- **Canceled**: The project was canceled, either during pre-construction or the course of construction.

If a company uses a unique set of construction phases, custom project stages can be created using the Procore API.
Custom project stages can be used by all projects in a given company account.

## Project Stage API Endpoints

The Procore API provides the following endpoints for working with project stages.

| Endpoint                                                                                             | Description                                                               |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [List Project Stages](https://developers.procore.com/reference/project-stages#list-project-stages)   | Return a list of all project stages available in a company account.       |
| [Create Project Stage](https://developers.procore.com/reference/project-stages#create-project-stage) | Create a new project stage for use by all projects in a company account.  |
| [Show Project Stage](https://developers.procore.com/reference/project-stages#show-project-stage)     | Show details on a specified project stage.                                |
| [Update Project Stage](https://developers.procore.com/reference/project-stages#update-project-stage) | Update a specified project stage.                                         |
| [Delete Project Stage](https://developers.procore.com/reference/project-stages#delete-project-stage) | Delete a specified project stage.                                         |

## Creating Custom Project Stages

You can use the Create Project Stage endpoint to create a new custom project stage.
Each custom project stage you create is associated with one of the default project stages in your company account.
The enumerated value you assign to the `category_type` attribute determines which default project stage the new custom project stage is mapped to.

`category_type` must be set to one of the following values.

- pre_construction
- course_of_construction
- post_construction
- completed
- not_awarded
- canceled

The Create Project Stage endpoint requires a JSON request body as illustrated by this example.

```
{
  "project_stage": {
    "is_bidding_stage": false,
    "name": "Grading and Paving",
    "category": "course_of_construction"
  }
}
```

Use the `name` field to specify the name for the new custom project stage.
Map the new custom project stage to a default project stage by setting the `category` field to one of the `category_type` values listed above.
For this example, we create a new custom project stage called "Grading and Paving" and assign it to the "Course of Construction" default project stage.

## Upcoming API Changes Impacting Project Stages

Please be aware of some upcoming API changes that may affect how you work with projects and project stages.

- The `is_bidding_stage` field is planned for deprecation and will stop being supported by Procore six months after the deprecation is announced.
- `project_stage_id` will be a required field on JSON request payloads for the [Create Project](https://developers.procore.com/reference/projects#create-project), [Update Project](https://developers.procore.com/reference/projects#update-project), and [Sync Projects](https://developers.procore.com/reference/projects#sync-projects) endpoints when the target project does not aleady have a value set for project_stage_id.
- The `total_value`, `start_date`, and `completion_date` fields will be required on projects that have a project stage category type mapped to “Course of Construction”, “Post-Construction”, or “Completed”.

A deprecation announcement is being prepared that will provide specifics regarding the timing of these changes.
