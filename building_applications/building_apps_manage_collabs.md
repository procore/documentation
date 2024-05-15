---
permalink: /building-apps-manage-collabs
title: Managing App Collaboration
layout: default
section_title: Building Applications

---

>**Note:** This article covers topics consistent with the App Manifest v4.1 format and the form-based app creation UI experience.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

If you have a team of developers in your organization you can use the Collaborators feature to add team members and assign them to various roles.
Each role (Owner, Administrator, and Developer) has a specific set of permissions that define what a team member can do based on their role.

To begin managing your team, log in to the Developer Portal, visit My Apps, choose the App you want to work in and select the 'Collaborators' section on the Manage App page.
You will see each team member listed along with their current role assignment.

![Collabs modal]({{ site.baseurl }}/assets/guides/form-based-manage-collabs.png)

Each role has a defined set of permissions for actions that can be taken by a team member.
To see which permissions are defined for each role, click **View Permission Details**.

![Permission details]({{ site.baseurl }}/assets/guides/form-based-collab-permissions.png)

## Adding a Team Member

You can add members to your development team and assign them to appropriate roles based on their function within your organization.

1. On the Manage App page, select the 'Collaborators' section.
1. Click **Add Another User**.
1. Enter the Email Address for the new team member, select the appropriate role (Admin or Developer), and click **Send Invitation**.

![Add team member]({{ site.baseurl }}/assets/guides/form-based-collab-add-new.png)

An email is sent out to the new team member inviting them to join your development team.
After they accept the email invite and join the team, they have access to the App on the Developer Portal with the permissions defined by their assigned role.

## Giving Collaborators Access to Development Sandbox Environments

As an App owner you can provide your collaborators with access to the development sandbox using the following steps.

1. Log in to the sandbox company for your App and navigate to the Company Directory tool.
2. Click **Add User**.
3. Fill out the Add User form with the required fields and click **Create**.
4. On the Edit User page, set permissions and project settings for the new user as needed.
5. Scroll to the bottom of the Edit User page and click **Save and Send Invitation to Procore**.

Once your collaborator has accepted the invitation to the sandbox company, they can access resources in that company using the API and sandbox credentials.
For additional information, see [Add a User Account to the Company Directory](https://support.procore.com/products/online/user-guide/company-level/directory/tutorials/add-a-user-account-to-the-company-directory) and [Edit a User Account in the Company Directory](https://support.procore.com/products/online/user-guide/company-level/directory/tutorials/edit-a-user-account-in-the-company-directory).

## Additional Actions

In addition to adding new members to your development team, as an Owner or Admin you can perform other actions to help manage collaboration on your project.

- You can transfer ownership of the App to one of the other team members.
- You can remove a member from your development team.
