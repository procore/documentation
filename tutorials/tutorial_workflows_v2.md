---
permalink: /tutorial-workflows-v2
title: Interacting with Workflows
layout: default
section_title: Guides and Tutorials
---

## Introduction

The company-level Workflows tool was designed to streamline the user experience and to replace time-consuming and manual approval processes.
Custom workflows can be created that define the responsible roles, groups, and conditions for routing an item through that approval process—and that process is tailored to suit the unique needs and specific requirements of a company's business environment.
See [Self-Serve Workflows User Guide](https://support.procore.com/products/online/user-guide/company-level/workflows/tutorials/user-guide) for additional information on using the Workflows tool in Procore.
Once the Workflows tool has been enabled and configured in an account, app developers are able to interact with the workflow objects to perform workflow activities via the Procore API.

## Access

Self-Serve Workflows endpoints are in closed beta. For inquiry and access, reach out to [apisupport@procore.com](mailto:apisupport@procore.com).

---

## Hierarchy of Workflows

There are 3 main levels of a workflow: template, preset and instance.

![API Record Diagram]({{ site.baseurl }}/assets/guides/workflows-v2-api-records-diagram.png)

### Template

A template is the container for a workflow configuration with one or many versions.
It contains information that doesn't change from one version to the next (name, the related Procore tool, etc).

A version is one configuration of a template. Either draft, active (latest published) or inactive (older published).
It contains the configurations for steps, conditionals, responsible groups, transitions, etc.

### Preset

A preset is another layer of configuration on top of the latest published version.
A company-level Procore tool will have one preset for the company and a project-level tool can have any number of presets based on the number of projects assigned to the template.
The latest published version configuration and a preset or instance configuration (which gets copied from the preset when created) come together to create the full configuration (shown in the preset UI).

When an instance is started, it copies the current configuration of the preset specified (or the default if none is specified).

### Instance

An instance is a workflow running for a Procore tool item (Invoice, Prime Contract, etc).
Each step of an instance will create one step occurrence and however many response occurrences for the step's assignees.

---

## Things to Consider

Before starting out with our Workflows API, there are a few things to consider.

### Company and Project-Level Tools

Using the [list tools API](https://developers.procore.com/reference/rest/workflow-tools?version=latest#list-tools-enabled-for-workflows), a tool's "provider" can be determined as "Project" or "Company".
This is how to determine which API endpoints should be used for the specific tool. Another way to tell, for the most part, is the context in which the tool is used when in Procore.

## Example Known Use Cases

Workflow Instances 

### Integration Driven Workflow

When routing an instance step with an integration, the integration steps (a step where you expect the integration to chose a path) must have the integration user listed as one of the assignees.
Only step assignees are able to respond and progress a step.
If the integration were to fail to progress the step for any reason, a workflow manager could assign an additional assignee to the step to manually progress the step.
Alternatively, each integration step could have a manager or other person as an assignee.
That way if the integration failed, those other users would get notified as the step becomes overdue (if other methods of notifications for the integration fail).

First, make a request to [get the current state](https://developers.procore.com/reference/rest/workflow-instances-project?version=latest#get-a-project-workflow-instance) of the instance (or, alternatively, get that info from an instance webhook).

With the `current_step_occurrence_id` (from `current_step_occurrence.id`) and `selected_response_option_id` (from the `current_step_occurrence.available_responses`), the integration can respond to progress the instance using the [create response API](https://developers.procore.com/reference/rest/workflow-responses-project?version=latest#respond-to-an-instance).

### Integration Assignee Management

For large companies with complex org structures and approval processes, sometimes automated assignee management for workflow roles is needed.
This could be driven by changes to teams in an HR system.

In order to make a change like that, you'd need to gather which projects are assigned to the template using the [list templates API](https://developers.procore.com/reference/rest/workflow-templates?version=latest#list-workflow-templates).

For each project, you'd find the related preset (using the template ID as a reference) with the [list presets API](https://developers.procore.com/reference/rest/workflow-presets-project?version=2.0#list-workflow-presets).

Get the current state of the preset and any `responsible_group_memberships` that need to be updated by [requesting the individual preset](https://developers.procore.com/reference/rest/workflow-presets-project?version=latest#get-workflow-preset) that needs to be changed. Build up an array of the `responsible_group_memberships` that need to be modified and save the changes with the [update assignees and workflow manager API](https://developers.procore.com/reference/rest/workflow-presets-project?version=latest#update-assignees-and-workflow-manager).
