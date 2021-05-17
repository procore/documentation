---
permalink: /using-sync-actions
title: USING SYNC ACTIONS
layout: default
section_title: Guides and Tutorials

---

## Introduction

The Sync action enables batch creation or updates to resources using a single call.
When using a Sync action, the resources to be created or updated can be specified by supplying either an `id` or an `origin_id` in the request body.
Utilizing the `origin_id` attribute for batch operations is often preferable as it allows you to easily link to external systems by maintaining your own list of unique resource identifiers outside of Procore.

The caller provides an array of hashes, each hash containing the attributes for a single resource.
The attribute names in each hash match those used by the Create and Update actions for the resource.
Attributes for a maximum of 1000 resources within a collection may be passed with each call.
The API will always return an HTTP status of 200.

The response body contains two attributes - `entities` and `errors`.
The attributes for each successfully created or updated resource will appear in the entities list.
The attributes for each resource will match those returned by the Show action.
For each resource which could not be created or updated, the attributes supplied by the caller are present in the errors list, along with an additional errors attribute which provides reasons for the failure.

## Behavior
The Sync action uses two different types of unique identifiers to determine whether a new resource is to be created or an existing resource is to be updated.
The unique identifiers are supplied as the `id` and/or `origin_id` attributes.
If neither of these identifiers are provided, a new resource is created.

The following table helps to illustrate the behavior of the Sync Action depending on whether an `id`, an `origin_id`, both, or neither is supplied and whether or not a corresponding resource is found.

| Parameter Supplied                | Resource Found?                                            | Behavior                                                                                        |
| --------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Neither ID nor Origin ID supplied | N/A                                                        | A new resource without an origin id is created.                                                 |
| ID                                | No                                                         | Error is returned.                                                                              |
| ID                                | Yes                                                        | Resource is updated with the request body.                                                      |
| Origin ID                         | No                                                         | Resource is created with the request body.                                                      |
| Origin ID                         | Yes                                                        | Resource is updated with the request body.                                                      |
| ID and Origin ID                  | Yes (Note: Only ID will be used for finding the resource.) | Resource is updated with the request body. (Note: this is the only way to update an origin_id.) |

## Uniqueness Constraint on Origin ID

All Origin IDs are required to be unique within a single company.
The same Origin ID may not be used in more than one project within a given company.
Origin IDs are allowed to be the same across companies.
In other words, the same Origin ID can be used in more than one company, but cannot be used in more than one project within a single company.

## Examples

**Example 1 - Caller does not pass ID or Origin ID**

In the following examples we'll use Projects to illustrate using the Sync action.
In the first example, we create two new Projects without passing IDs or Origin IDs.

```
{
  "updates":[
    {
      "name": "New Project 1"
    },
    {
      "name": "New Project 2"
    }
  ]
}
```

The response to the above request lists the attributes for the two projects which have been created.
Note that the value for `origin_id` in each project is `null`.

```
{
  "entities": [
    {
      "active": true,
      "actual_start_date": "2016-07-25",
      "address": null,
      "city": null,
      "country_code": null,
      "created_at": "2016-07-25T11:24:26Z",
      "departments": [],
      "description": null,
      "display_name": "New Project 1",
      "estimated_completion_date": null,
      "estimated_start_date": null,
      "flag": null,
      "id": 4,
      "latitude": null,
      "logo_url": "http://ude:3000//assets/procore_logo_small.gif",
      "longitude": null,
      "name": "New Project 1",
      "origin_data": null,
      "origin_id": null,
      "phone": null,
      "project_number": null,
      "project_stage": {
        "id": 3,
        "name": "Course of Construction"
      },
      "projected_finish_date": null,
      "public_notes": null,
      "square_feet": null,
      "state_code": null,
      "updated_at": "2016-07-25T11:24:26Z",
      "zip": null
    },
    {
      "active": true,
      "actual_start_date": "2016-07-25",
      "address": null,
      "city": null,
      "country_code": null,
      "created_at": "2016-07-25T11:24:26Z",
      "departments": [],
      "description": null,
      "display_name": "New Project 2",
      "estimated_completion_date": null,
      "estimated_start_date": null,
      "flag": null,
      "id": 5,
      "latitude": null,
      "logo_url": "http://ude:3000//assets/procore_logo_small.gif",
      "longitude": null,
      "name": "New Project 2",
      "origin_data": null,
      "origin_id": null,
      "phone": null,
      "project_number": null,
      "project_stage": {
        "id": 3,
        "name": "Course of Construction"
      },
      "projected_finish_date": null,
      "public_notes": null,
      "square_feet": null,
      "state_code": null,
      "updated_at": "2016-07-25T11:24:26Z",
      "zip": null
    }
  ],
  "errors": []
}
```

**Example 2 - Caller passes project ID**

This example uses the Procore unique project id identifier.
If the caller already knows the id for a particular project (either through the List Company Projects action or through the Create Company Project action) this value can be passed to indicate which project is to be updated.
Note that if the caller passes an `id` value which Procore does not recognize, Procore will report an error.
These points are illustrated by the request below:

```
{
  "updates":[
    {
      "id": 4,
      "name": "Updated Project 1"
    },
    {
      "id": 0,
      "name": "No project has this id value"
    }
  ]
}
```

The response to this request shows that one project is found with the matching id of 4 and the name attribute has been changed to "Updated Project 1".
Since there is no match for id 0, an error is displayed.

```
{
  "entities": [
    {
      "id": 4,
      "logo_url": "http://ude:3000//assets/procore_logo_small.gif",
      "name": "Updated Project 1",
      "display_name": "Updated Project 1",
      "project_number": null,
      "address": null,
      "city": null,
      "state_code": null,
      "country_code": null,
      "zip": null,
      "latitude": null,
      "longitude": null,
      "description": null,
      "square_feet": null,
      "estimated_start_date": null,
      "estimated_completion_date": null,
      "active": true,
      "flag": null,
      "phone": null,
      "public_notes": null,
      "actual_start_date": "2016-07-25",
      "projected_finish_date": null,
      "created_at": "2016-07-25T11:24:26Z",
      "updated_at": "2016-07-25T12:01:16Z",
      "origin_id": null,
      "origin_data": null,
      "project_stage": {
        "id": 3,
        "name": "Course of Construction"
      },
      "departments": []
    }
  ],
  "errors": [
    {
      "id": 0,
      "name": "No project has this id value",
      "errors": {
        "id": [
          "Entity with this ID not found"
        ]
      }
    }
  ]
}
```

**Example 3 - Caller passes Origin ID**

The caller does not need to be aware of the unique identifiers assigned by Procore for each project in order to create or update them.
Instead the caller can provide their own unique identifier for the project in the origin_id attribute.
If Procore cannot find a project with the supplied `origin_id` it will create a new one.
If Procore does find a project with the supplied `origin_id` it will update it.

In this example below we create two new projects, each with an `origin_id` value.

```
{
  "updates":[
    {
      "origin_id": "abc",
      "name": "New Project ABC"
    },
    {
      "origin_id": "def",
      "name": "New Project DEF"
    }
  ]
}
```

The response to this request will look like this:

```
{
  "entities": [
    {
      "id": 6,
      "logo_url": "http://ude:3000//assets/procore_logo_small.gif",
      "name": "New Project ABC",
      "display_name": "New Project ABC",
      "project_number": null,
      "address": null,
      "city": null,
      "state_code": null,
      "country_code": null,
      "zip": null,
      "latitude": null,
      "longitude": null,
      "description": null,
      "square_feet": null,
      "estimated_start_date": null,
      "estimated_completion_date": null,
      "active": true,
      "flag": null,
      "phone": null,
      "public_notes": null,
      "actual_start_date": "2016-07-25",
      "projected_finish_date": null,
      "created_at": "2016-07-25T12:02:09Z",
      "updated_at": "2016-07-25T12:02:09Z",
      "origin_id": "abc",
      "origin_data": null,
      "project_stage": {
        "id": 3,
        "name": "Course of Construction"
      },
      "departments": []
    },
    {
      "id": 7,
      "logo_url": "http://ude:3000//assets/procore_logo_small.gif",
      "name": "New Project DEF",
      "display_name": "New Project DEF",
      "project_number": null,
      "address": null,
      "city": null,
      "state_code": null,
      "country_code": null,
      "zip": null,
      "latitude": null,
      "longitude": null,
      "description": null,
      "square_feet": null,
      "estimated_start_date": null,
      "estimated_completion_date": null,
      "active": true,
      "flag": null,
      "phone": null,
      "public_notes": null,
      "actual_start_date": "2016-07-25",
      "projected_finish_date": null,
      "created_at": "2016-07-25T12:02:10Z",
      "updated_at": "2016-07-25T12:02:10Z",
      "origin_id": "def",
      "origin_data": null,
      "project_stage": {
        "id": 3,
        "name": "Course of Construction"
      },
      "departments": []
    }
  ],
  "errors": []
}
```

We can now update these projects using the `origin_id` attribute to identify them:

```
{
  "updates":[
    {
      "origin_id": "abc",
      "name": "Updated Project ABC"
    },
    {
      "origin_id": "def",
      "name": "Updated Project DEF"
    }
  ]
}
```

Here is the response to this request:

```
{
  "entities": [
    {
      "id": 6,
      "logo_url": "http://ude:3000//assets/procore_logo_small.gif",
      "name": "Updated Project ABC",
      "display_name": "Updated Project ABC",
      "project_number": null,
      "address": null,
      "city": null,
      "state_code": null,
      "country_code": null,
      "zip": null,
      "latitude": null,
      "longitude": null,
      "description": null,
      "square_feet": null,
      "estimated_start_date": null,
      "estimated_completion_date": null,
      "active": true,
      "flag": null,
      "phone": null,
      "public_notes": null,
      "actual_start_date": "2016-07-25",
      "projected_finish_date": null,
      "created_at": "2016-07-25T12:02:09Z",
      "updated_at": "2016-07-25T12:02:53Z",
      "origin_id": "abc",
      "origin_data": null,
      "project_stage": {
        "id": 3,
        "name": "Course of Construction"
      },
      "departments": []
    },
    {
      "id": 7,
      "logo_url": "http://ude:3000//assets/procore_logo_small.gif",
      "name": "Updated Project DEF",
      "display_name": "Updated Project DEF",
      "project_number": null,
      "address": null,
      "city": null,
      "state_code": null,
      "country_code": null,
      "zip": null,
      "latitude": null,
      "longitude": null,
      "description": null,
      "square_feet": null,
      "estimated_start_date": null,
      "estimated_completion_date": null,
      "active": true,
      "flag": null,
      "phone": null,
      "public_notes": null,
      "actual_start_date": "2016-07-25",
      "projected_finish_date": null,
      "created_at": "2016-07-25T12:02:10Z",
      "updated_at": "2016-07-25T12:02:53Z",
      "origin_id": "def",
      "origin_data": null,
      "project_stage": {
        "id": 3,
        "name": "Course of Construction"
      },
      "departments": []
    }
  ],
  "errors": []
}
```

Note that in addition to the `origin_id` attribute, Procore provides an `origin_data` attribute.
Procore does not interpret the contents of this attribute.
The caller can use this to store and retrieve their own contextual information about this project.

## Resources that Currently Support Sync

Here is a list of Resources that currently support the Sync action:

- [Sync Work Order Contracts](https://developers.procore.com/reference/work-order-contracts#sync-work-order-contracts)
- [Sync Purchase Order Contracts](https://developers.procore.com/reference/purchase-order-contracts#sync-purchase-order-contracts)
- [Sync Projects](https://developers.procore.com/reference/projects#sync-projects)
- [Sync Company Users](https://developers.procore.com/reference/company-users#sync-company-users)
- [Sync Company Vendors](https://developers.procore.com/reference/company-vendors#sync-company-vendors)
- [Sync Potential Change Orders](https://developers.procore.com/reference/potential-change-orders#potential-change-orders-sync)
- [Sync Change Order Requests](https://developers.procore.com/reference/change-order-requests#sync-change-order-requests)
- [Sync Direct Costs](https://developers.procore.com/reference/direct-costs#sync-direct-cost-items)
- [Sync Direct Cost Line Items](https://developers.procore.com/reference/direct-costs#sync-direct-cost-line-items)
- [Sync Cost Codes](https://developers.procore.com/reference/cost-codes#sync-cost-codes)
- [Sync Standard Cost Codes](https://developers.procore.com/reference/cost-codes#sync-standard-cost-codes)
- [Sync Line Item Types](https://developers.procore.com/reference/line-item-types-cost-types#sync-line-item-types)
