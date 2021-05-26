---
permalink: /tutorial-config-fieldsets
title: Working with Configurable Fieldsets
layout: default
section_title: Guides and Tutorials

---

## Introduction

A _configurable fieldset_ is a group of fields in certain Procore tools that can be set to _optional_, _required_, or _hidden_, depending on the needs of your company.
When a project user interacts with a tool that supports configurable fieldsets, the fieldset configuration assigned to a given project determines which fields are visible to the user and whether or not they are required fields.
Procore’s API endpoints respect the configurable fieldsets that are created and managed within the Procore web application.
Configurable fieldset requirements are respected on the following API endpoints:

**Portfolio**

- [Projects](https://developers.procore.com/reference/rest/v1/projects#create-project)

**Project Management**

- [Incidents](https://developers.procore.com/reference/rest/v1/projects#create-project)
- [Inspections](https://developers.procore.com/reference/rest/v1/checklists#create-checklist)
- [Observations](https://developers.procore.com/reference/rest/v1/observations#create-observation-item)
- [Punch List](https://developers.procore.com/reference/rest/v1/punch-items#create-punch-item)
- [RFIs](https://developers.procore.com/reference/rest/v1/projects#create-project)

**Daily Log**

- [Manpower Log](https://developers.procore.com/reference/rest/v1/daily-logs)
- [Notes Log](https://developers.procore.com/reference/rest/v1/notes-logs)
- [Daily Construction Report Log](https://developers.procore.com/reference/rest/v1/daily-construction-report-logs)

**Company Directory**

- [Company Users](https://developers.procore.com/reference/rest/v1/company-users#create-company-user)
- [Company Vendors](https://developers.procore.com/reference/rest/v1/company-vendors)

**Project Directory**

- [Project Users](https://developers.procore.com/reference/rest/v1/project-users#create-project-user)
- [Project Vendors](https://developers.procore.com/reference/rest/v1/project-vendors#create-project-vendor)

> ADDITIONAL TOOL SUPPORT FOR CONFIGURABLE FIELDSETS
>
> Our development teams continue to build out support for configurable fieldsets and custom fields in the various Procore tools.
> Although the above list was accurate at time of publication, keep in mind that newly supported tools will have their API endpoints updated over time.
> If you do not see the tool you are working with listed above, check the [API Reference](https://developers.procore.com/reference) pages for the relevant endpoints - support for configurable fieldsets may have been recently added!

## Understanding Configurable Validations

When one or more configurable fields on a resource are set to required, the `run_configurable_validations` attribute must be present in the JSON request body and set to “true” when creating or updating that particular resource via the API.
This ensures that the API endpoints respect and validate those configurable fields.
In the following example, a fieldset is configured on the Project resource using the Company Admin tool so that when new projects are created or updated, the "city" and “address” attributes are required to contain values.

![project fieldset]({{ site.baseurl }}/assets/guides/project-fieldset.png)

In this scenario, creating a new project using the Create Project API endpoint requires the `run_configurable_validations` parameter to be present in the request body and set to "true", along with a value defined for each required field as shown below.

![project new]({{ site.baseurl }}/assets/guides/project-new.png)

The absence of required fields in the request body returns an error indicating which fields are needed for a successful create action.

![project error]({{ site.baseurl }}/assets/guides/project-error.png)

> CONFIGURABLE VALIDATIONS AND UPDATE ACTIONS
>
> It is important to note that when updating a resource, if a required field already has an existing value, it only needs to be included in the JSON request body if you intend to update it.
> However, if the existing value is "null", then the field must be included in the request, otherwise the validation will fail.

## Working with Custom Fields

_Custom fields_ can be created for certain tools in Procore to allow for additional information to be filled out when creating or editing items.
Custom fields can be created within fieldsets, or created separately and later applied to fieldsets.
The following Procore Support Site articles provide general information on custom fields and how they are managed using the Procore web application.

- [What are custom fields and which Procore tools support them?](https://support.procore.com/faq/what-are-custom-fields-and-which-procore-tools-support-them)
- [Create Custom Fields Within a Fieldset](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/create-new-custom-fields#Option_2:_Create_Custom_Fields_Within_a_Fieldset)
- [Create Custom Fields from the Custom Fields Tab](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/create-new-custom-fields#Option_1:_Create_Custom_Fields_from_the_Custom_Fields_Tab)

### Punch List Example

Let's explore an example using the Punch List tool with some existing Punch List Items.
We've created a configurable fieldset for the Punch List tool using the Procore web application, and added a custom field called "Effort Estimate".

![effort estimate]({{ site.baseurl }}/assets/guides/effort-estimate.png)

A unique identifier is assigned to the custom field when it is created.
Next, we use the Show Punch Item endpoint to return information about the custom field associated with an existing Punch List Item.
Here is an excerpt from the response body.

```
"custom_fields": {
    "custom_field_49417": {
        "data_type": "decimal",
        "value": 2.0
    }
}
```

In this example, we see the custom field id is '49417', data_type is 'decimal', and the current field value is 2.0.
Now, let's update the field value using the Update Punch Item endpoint.
We'll change the value for the custom field to 4.0.

![update punch item]({{ site.baseurl }}/assets/guides/update-punch-item.png)

Note that we use the syntax `custom_field_{custom field id}` to define the new value in the request body.
The response body shows that we have successfully updated the value for our custom field to 4.0.