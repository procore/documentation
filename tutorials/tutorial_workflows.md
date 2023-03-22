---
permalink: /tutorial-workflows
title: Interacting with Workflows
layout: default
section_title: Guides and Tutorials
---

## Introduction

Procore’s Workflows tool provides control of the status field on certain objects in Procore.
Once the Workflows tool has been enabled and configured for your account, you are able to interact with the workflow on objects to perform workflow activities via the Procore API.

A workflow is a Business Process Automation (BPA) solution that provides a company the ability to create customized approval processes that work with different Procore project tools.
The Workflows tool was designed to streamline the user experience and to replace time-consuming and manual approval processes with an automated process, thus eliminating the need to manage approvals by email or collecting physical signatures from key stakeholders.

## Things to Consider

- It is important to note that once a workflow has been applied to an object (such as a Subcontract or Purchase Order), you will not be able to update the status field directly using the API for that object. Instead, you will need to use the Workflow API in order to adjust the status field.
- Currenty, there is no way to programmatically determine if a workflow has been applied to a given object. Your Procore administrator in conjunction with your Procore point-of-contact should be able to identify for you which objects in your account have workflows applied.

## Workflow API Endpoints

The Procore API provides a number of endpoints that allow you interact with workflows in Procore.
The following table provides descriptions of these endpoints.
Clicking an endpoint title in the table takes you to the API reference page for that endpoint where you can learn about the various parameters and response body attributes.

| Workflow Endpoint                                                                                                                                             | Description                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [List Workflow Instances](https://developers.procore.com/reference/rest/v1/workflow-instances?version=1.0#list-workflow-instances)                            | Return a list of workflow instances for a specified company.             |
| [Show Workflow Instance](https://developers.procore.com/reference/rest/v1/workflow-instances?version=1.0#show-workflow-instance)                              | Return information for a specific workflow instance.                     |
| [Create Workflow Activity History](https://developers.procore.com/reference/rest/v1/workflow-activity-histories?version=1.0#create-workflow-activity-history) | Perform a workflow activity.                                             |
| [List Workflow Activity Histories](https://developers.procore.com/reference/rest/v1/workflow-activity-histories?version=1.0#list-workflow-activity-histories) | Return a list of activities performed for a specified workflow instance. |
| [Show Workflow Activity History](https://developers.procore.com/reference/rest/v1/workflow-activity-histories?version=1.0#show-workflow-activity-history)     | Return information for a single workflow activity.                       |

## Example Workflow

For the purpose of exploring the capabilities of the Workflows API, consider the following example of a simplified Purchase Order Approval workflow.

![Example Workflow]({{ site.baseurl }}/assets/guides/example-workflow.svg)

In the above diagram, a new Purchase Order is created as the first step in the Purchase Order Approval workflow.
The Purchase Order automatically transitions to the `Start` state.
The Purchase Order moves to subsequent states in the workflow when the responsible user role performs a workflow action called an activity.
From the `Start` state, the Project Manager role executes the `Submit for Approval` activity which transitions the Purchase Order to the Pending Approval state.
Next, the Reviewer role can execute the `Approve` activity to transition the Purchase Order to the final `PO Approved` state.
Or, the Reviewer role can execute the `Deny` activity to send the Purchase Order back to the `Start` state for re-work by the Project Manager.
We will refer to this example workflow as we work through the following sections.

## Retrieving Workflow Information

Each object (such as a Subcontract or Purchase Order) that has an associated workflow will have one (and only one) _workflow instance_.
The workflow instance includes the name of the applied workflow, the current workflow state, and the activities that can be performed from the current workflow state.
You can retrieve a list of active workflow instances for your company using the [List Workflow Instances](https://developers.procore.com/reference/rest/v1/workflow#list-workflow-instances) endpoint.
You will need to include the `company_id` as a required query parameter.

A sample GET request to the [List Workflow Instances](https://developers.procore.com/reference/rest/v1/workflow#list-workflow-instances) endpoint would take the following format:

Request Method: `GET`

Request URL: `https://api.procore.com/rest/v1.0/workflow_instances?company_id=1234`

Executing this call returns a JSON response similar to the following:

```
[
  {
    "id": 568150,
    "becomes_overdue_at": "2018-02-28T23:59:59Z",
    "current_state_set_at": "2018-02-13T17:56:49Z",
    "workflowed_object_id": 1953145,
    "workflowed_object_type": "Contract",
    "current_workflow_activities": [
      {
        "id": 29945,
        "name": "Submit for Approval",
        "workflow_user_role": {
          "id": 14301,
          "name": "Project Manager"
        },
        "perform_activity": {
          "url": "https://api.procore.com/rest/v1.0/workflow_activity_histories",
          "method": "POST",
          "data": {
            "workflow_activity_history": {
              "workflow_activity_id": 29945,
              "workflow_instance_id": 568150,
              "workflow_user_role_id": 14301
            }
          }
        }
      }
    ],
    "current_workflow_state": {
      "id": 18706,
      "name": "Start",
      "status": "Draft"
    },
    "workflow": {
      "id": 3293,
      "name": "Purchase Order Approval Workflow",
      "description": "Workflow for purchase order approval automation",
      "created_at": "2018-02-08T23:16:18Z",
      "updated_at": "2018-02-08T23:59:20Z",
      "domain": "commitments",
      "class_name": "PurchaseOrderContract"
    }
  }
]
```

The example response provides details on a single workflow instance - `"id": 568150`.
However, under most conditions this call would return multiple instances as there would likely be more than one Purchase Order with a workflow applied.
Examining this response we can determine the `current_workflow_state` (Start), the available `current_workflow_activities` (Submit for Approval), and other useful information about the workflow instance associated with our sample Purchase Order.

## Performing Workflow Activities

In addition to retrieving information on existing workflow instances in your company, you can use the Workflow API to execute workflow actions (activities) to transition from one workflow state to the next.
Once you have located the specific workflow instance you want to work with using the [List Workflow Instances](https://developers.procore.com/reference/rest/v1/workflow#list-workflow-instances) endpoint, you can use the [Create Workflow Activity History](https://developers.procore.com/reference/rest/v1/workflow#create-workflow-activity-history) endpoint to execute a workflow activity.
The response returned from the [List Workflow Instances](https://developers.procore.com/reference/rest/v1/workflow#list-workflow-instances) endpoint provides information you need to perform the next activity in a specific workflow.
The details returned for each workflow instance indicate exactly what activities are available from the current workflow state, along with the IDs for the workflow instance, workflow activity, and responsible user role(s).
You will also need the ID for the user performing the activity.
The following table lists the required parameters for the [Create Workflow Activity History](https://developers.procore.com/reference/rest/v1/workflow#create-workflow-activity-history) endpoint.

| Parameter             | Type  | Description                                                 |
| --------------------- | ----- | ----------------------------------------------------------- |
| company_id            | Query | ID for the company                                          |
| workflow_instance_id  | Query | ID of the workflow instance                                 |
| workflow_activity_id  | Body  | ID of the workflow activity.                                |
| workflow_instance_id  | Body  | ID of the workflow instance.                                |
| workflow_user_role_id | Body  | ID of the user role associated with the activity.           |
| performed_by_id       | Body  | The login information for the user performing the activity. |

In addition to the parameters listed above, there are optional parameters for including comments and attachements to the activity history.
See the [Create Workflow Activity History](https://developers.procore.com/reference/rest/v1/workflow#create-workflow-activity-history) reference page for more information.

A sample POST request to the [Create Workflow Activity History](https://developers.procore.com/reference/rest/v1/workflow#create-workflow-activity-history) endpoint would take the following format:

Request Method: `POST`

Request URL: `https://api.procore.com/rest/v1.0/workflow_activity_histories?company_id=1234&workflow_instance_id=568150`

Body:

```
{
  "workflow_activity_history":{
    "workflow_activity_id":29945,
    "workflow_instance_id":568150,
    "workflow_user_role_id":14301,
    "performed_by_id":3893316,
    "comments":"Submitting Purchase Order for review/approval."
    }
}
```

Executing this call returns a JSON response similar to the following:

```
{
  "id": 1586809,
  "attachments": [],
  "bic_end": "2018-02-14T21:46:03Z",
  "bic_start": "2018-02-13T17:56:49Z",
  "comments": "Submitting Purchase Order for review/approval.",
  "created_at": "2018-02-14T21:46:03Z",
  "performed_by_id": 1498096,
  "updated_at": "2018-02-14T21:46:03Z",
  "workflow_activity_id": 29945,
  "workflow_instance_id": 568150,
  "workflow_user_role_id": 14301
}
```

## Retrieving a List of Workflow Activity Histories

Once a workflow instance has been initiated, you can use the [List Workflow Activity Histories](https://developers.procore.com/reference/rest/v1/workflow#list-workflow-activity-histories) endpoint to retrieve a list of the activities that have been executed on the workflow.

A sample GET request to the [List Workflow Activity Histories](https://developers.procore.com/reference/rest/v1/workflow#list-workflow-activity-histories) endpoint would take the following format:

Request Method: `GET`

Request URL: `https://api.procore.com/rest/v1.0/workflow_activity_histories?company_id=1234&workflow_instance_id=568150`

Executing this call returns a JSON response similar to the following:

```
[
  {
    "id": 1587130,
    "attachments": [],
    "bic_end": "2018-02-14T23:30:28Z",
    "bic_start": "2018-02-14T21:46:03Z",
    "comments": "Approving this Purchase Order.",
    "created_at": "2018-02-14T23:30:28Z",
    "performed_by_id": 1498096,
    "updated_at": "2018-02-14T23:30:29Z",
    "workflow_activity_id": 29947,
    "workflow_instance_id": 568150,
    "workflow_user_role_id": 14304
  },
  {
    "id": 1586809,
    "attachments": [],
    "bic_end": "2018-02-14T21:46:03Z",
    "bic_start": "2018-02-13T17:56:49Z",
    "comments": "Submitting Purchase Order for review/approval.",
    "created_at": "2018-02-14T21:46:03Z",
    "performed_by_id": 1498096,
    "updated_at": "2018-02-14T21:46:03Z",
    "workflow_activity_id": 29945,
    "workflow_instance_id": 568150,
    "workflow_user_role_id": 14301
  }
]
```

Examining the response we see that the history of workflow activities is arranged with the most recent activity first.
This example shows that both the Submit for Approval (`"id": 1586809`) and Approve (`"id": 1587130`) activities have been executed on our sample workflow.

## Additional Information

If you require additional guidance on working with the Workflows API, please reach out to our Technical Services team at <apisupport@procore.com> for assistance.
