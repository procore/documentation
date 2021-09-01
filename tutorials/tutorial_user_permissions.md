---
permalink: /tutorial-user-permissions
title: Working with User Permissions and Permission Templates
layout: default
section_title: Guides and Tutorials

---

## Introduction

Procore uses permissions to manage user access to different Procore tools.
User permissions can be managed at the Company level and Project level and consist of four role-based levels, None, Read-only, Standard, and Admin.
Each role can be defined in a [permission template](https://support.procore.com/references/construction-management/glossary-of-terms#Permissions_Template), see [What is a permission template?](https://support.procore.com/faq/what-is-a-permissions-template).

## User Permissions

The [User Permissions Reference Page](https://support.procore.com/faq/what-are-the-default-project-permissions-templates-in-procore) shows a comprehensive breakdown of all user actions and the specific user permissions (Read Only, Standard, and/or Admin) required to perform that action.
Since certain tools are available at both the Company and Project levels, be sure to select the appropriate hyperlink when navigating the page, see [What are the default project permission templates in Procore?](https://support.procore.com/faq/what-are-the-default-project-permissions-templates-in-procore).

## User Permission Templates

Each Procore client is provided with several role-based project permissions templates.
Use the steps below to walk you through the process of using the Procore API to change a project user’s permission template.
In order to update a project user’s permission template through the API, the user must be first removed from the project and then re-added with the new permission template ID.

> TUTORIAL PREREQUISITES
>
> To successfully complete this tutorial, you must have `Admin` permissions on the company level Directory tool.

## Step 1 - Find the user whose permission template will be changed

Using either the [List Project Users](https://developers.procore.com/reference/rest/v1/project-users#list-project-users) or [Show Project User](https://developers.procore.com/reference/rest/v1/project-users#show-project-user) endpoint, find the object associated with the user whose permission template you would like to change.
The important values to note are the user’s `ID` and the `permission_template` object (if applicable).

![User Permissions - 01]({{ site.baseurl }}/assets/guides/user-permissions-01.png)

## Step 2 - Removing the User from a Project

In order to change a user's permission template on a project, it is necessary to remove them and then re-add them to the same project.
Performing this action will not delete or reassign any content from this user.

With the `ID` of the user you wish to change a project template for, use the [Remove a User from the Project](https://developers.procore.com/reference/rest/v1/project-users#remove-a-user-from-the-project) endpoint (DELETE /rest/v1.0/projects/{project_id}/users/{id}/actions/remove) to remove the given user from a specific project.

![User Permissions - 02]({{ site.baseurl }}/assets/guides/user-permissions-02.png)

The successful removal of the user from this project will be indicated by a `204 No Content` HTTP status code (with an empty response body).
This endpoint will remove a user from the given project, but not remove them from the company level directory.

## Step 3 - Re-add the User to the Project

Using the [Add Company User to Project](https://developers.procore.com/reference/rest/v1/project-users#add-company-user-to-project) endpoint, you can re-add the user to the project with the new `permission_template_id`.
A successful request will be indicated by a `201 Created` HTTP response code.

![User Permissions - 03]({{ site.baseurl }}/assets/guides/user-permissions-03.png)

You can confirm the change of the permission template by making a request to the [List Project Users](https://developers.procore.com/reference/rest/v1/project-users#list-project-users) endpoint, finding the object associated with the user whose permission template you were updating, and noticing the new permission template `ID` and `name` values.

![User Permissions - 04]({{ site.baseurl }}/assets/guides/user-permissions-04.png)
