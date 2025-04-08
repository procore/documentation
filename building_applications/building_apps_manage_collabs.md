---
permalink: /building-apps-manage-collabs
title: Managing App Collaboration
sub_header: Learn how to manage your Procore developer app by inviting collaborators and transferring app ownership.
layout: default
section_title: Building Applications

---

>**Note:** This article covers topics consistent with the App Manifest v4.1 format and the form-based app creation UI experience.
>For information on the App Manifest v3.x (legacy) format, see [App Manifest v3.x Legacy Format]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_legacy_v3x_manifest_format.md %}) and [Migrating an App Manifest from v3.x to v4.1]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_apps_v3x_to_v4.1_manifest_migration.md %}).

## Introduction
If you're working with a team, the **Collaborators** feature allows you to manage access and responsibilities across your app. Each collaborator is assigned a role—Owner, Administrator, or Developer—which defines their permissions within the Developer Portal.
## Introduction
If you're working with a team, the **Collaborators** feature allows you to manage access and responsibilities across your app. Each collaborator is assigned a role—Owner, Administrator, or Developer—which defines their permissions within the Developer Portal.

To get started, log in to the [Procore Developer Portal](https://developers.procore.com/signin), go to **My Apps**, select your app, and navigate to the **Collaborators** section of the Manage App page. From here, you can view, add, or manage team members and their roles.

Each role has a defined set of permissions for actions that can be taken by a team member. To see which permissions are defined for each role, click **View Permission Details**.

![Collabs modal]({{ site.baseurl }}/assets/guides/form-based-manage-collabs.png)

***
<details>
  <summary class="collapseListTierOne">Collaborator Permission Overview</summary>
    <p>
    Before inviting team members to collaborate on your app, it's important to understand the roles available and the actions each can perform within the Developer Portal. There are three collaborator roles:
    </p>
    <ul>
        <li><strong>Owner</strong> – Has full access to all app management capabilities, including inviting collaborators, editing app details, updating permissions, and transferring ownership.</li>
        <li><strong>Admin</strong> – Can manage app details, versions, and permissions, but cannot transfer ownership or remove the current Owner.</li>
        <li><strong>Developer</strong> – Can view app details and contribute to development, but cannot make changes to collaborator roles or publish to production.</li>
    </ul>
    <p>
    Refer to the table below for a complete breakdown of permissions by role:
    </p>
    <img src="{{ site.baseurl }}/assets/guides/collab-permissions.png" alt="Collaborator Role Permissions Overview" style="max-width:50%; margin-top:1rem;" />
</details>


***
<details>
    <summary class="collapseListTierOne">Adding Team Members</summary>
    <p>
    App Owners and Admins can invite team members to app and assign roles based on their responsibilities:
        <ol>
            <li>Open your app in the Developer Portal and go to the <b>Collaborators</b> section.</li>
            <li>Click <b>Add Another User</b>.</li>
            <li>Enter the team member’s email address, choose their role (<b>Admin</b> or <b>Developer</b>), and click <b>Send Invitation</b>.</li>
        </ol>
        Once added, the invited user will receive an email to confirm the additional. Once they accept, they gain access to the app with permissions aligned to their assigned role.
    </p>
</details>

***
<details>
    <summary class="collapseListTierOne">Removing Team Members</summary>
    <p>
    App Owners and Admins can remove collaborators from the app:
        <ol>
            <li>Open your app and go to the <b>Collaborators</b> section.</li>
            <li>Click the three-dot menu (<b>⋮</b>) next to the desired collaborator.</li> 
            <li>Select <b>Remove from Project</b> and confirm the action.</li>
        </ol>
        Once removed, the team member will no longer have access to the app in the Developer Portal.
    </p>
</details>

***
<details>
    <summary class="collapseListTierOne">Changing App Ownership</summary>
    <p>
    App Owners can transfer ownership to another team member already added to the app:
        <ol>
            <li>Open your app and go to the <b>Collaborators</b> section.</li>
            <li>Click the three-dot menu (<b>⋮</b>) next to the desired collaborator.</li> 
            <li>Select <b>Transfer App Ownership</b> and confirm the action.</li>
        </ol>
        If the current App Owner is no longer with your organization, Procore can help reassign ownership. To initiate this process, email <a href="mailto:apisupport@procore.com">apisupport@procore.com</a>. Please note that specific criteria must be met before a transfer can be completed.
    </p>
</details>

***
## Giving Collaborators Access to Development Sandbox Environments

As an App Owner, you can provide your collaborators with access to a development sandbox using the following steps:
As an App Owner, you can provide your collaborators with access to a development sandbox using the following steps:

1. Log in to the sandbox company for your app and navigate to the **Company Directory** tool.
1. Log in to the sandbox company for your app and navigate to the **Company Directory** tool.
2. Click **Add User**.
3. Fill out the **Add User** form with the required fields and click **Create**.
4. On the following page, set permissions and project settings for the new user as needed.
3. Fill out the **Add User** form with the required fields and click **Create**.
4. On the following page, set permissions and project settings for the new user as needed.
5. Scroll to the bottom of the Edit User page and click **Save and Send Invitation to Procore**.

Once your collaborator accepts the invitation to the sandbox company, they’ll be able to access resources using the API and sandbox credentials.

For additional information, see 
- [Add a User Account to the Company Directory](https://support.procore.com/products/online/user-guide/company-level/directory/tutorials/add-a-user-account-to-the-company-directory)
- [Edit a User Account in the Company Directory](https://support.procore.com/products/online/user-guide/company-level/directory/tutorials/edit-a-user-account-in-the-company-directory)

Once your collaborator accepts the invitation to the sandbox company, they’ll be able to access resources using the API and sandbox credentials.

For additional information, see 
- [Add a User Account to the Company Directory](https://support.procore.com/products/online/user-guide/company-level/directory/tutorials/add-a-user-account-to-the-company-directory)
- [Edit a User Account in the Company Directory](https://support.procore.com/products/online/user-guide/company-level/directory/tutorials/edit-a-user-account-in-the-company-directory)

