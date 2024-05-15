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

Using the [list template tool configurations API](https://developers.procore.com/reference/rest/v1/template-tool-configurations?version=1.0), a tool's "provider" can be determined as "Project" or "Company".
This is how to determine which API endpoints should be used for the specific tool. Another way to tell, for the most part, is the context in which the tool is used when in Procore.

### Update and Replace Fields

There are a few fields where the field's value in the request will fully replace the existing field's value in our record.
For example, for a preset's `responsible_group_memberships` array, you might expect a merge by only providing the group you want updated.
That's not what will happen.
You **must** provide the full shape of the original with any changes.

Fields with this caveat will be noted.

---

## Example Known Use Cases

### Integration Driven Workflow

When routing an instance step with an integration, the integration steps (a step where you expect the integration to chose a path) must have the integration user listed as one of the assignees.
Only step assignees are able to respond and progress a step.
If the integration were to fail to progress the step for any reason, a workflow manager could assign an additional assignee to the step to manually progress the step.
Alternatively, each integration step could have a manager or other person as an assignee.
That way if the integration failed, those other users would get notified as the step becomes overdue (if other methods of notifications for the integration fail).

At the moment, there aren't any Workflow-specific webhooks.
There are two workarounds for this limitation:
* Use the item's create and update webhooks (for update, be aware that changes from step to step in a workflow with no status change will **not** cause a webhook to fire).
* Poll for active instances that are associated to the specific tool and assignee of the integration using the [list instances API](https://developers.procore.com/reference/rest/v1/workflows-instances?version=1.0).

With an instance, you'll be able to find the response occurrence for the integration user through the `current_step_occurrence` by filtering its list of `response_occurrences` to one assigned to the integration user.

With a response occurrence ID and a response option ID (from the `available_responses` for that step), the integration can respond to progress the instance using the [update response occurrence API](https://developers.procore.com/reference/rest/v1/workflows-instances-response-occurrences?version=1.0#update-response-occurrence).

### Integration Assignee Management

For large companies with complex org structures and approval processes, sometimes automated assignee management for workflow roles is needed.
This could be driven by changes to teams in an HR system.

In order to make a change like that, you'd need to gather which projects are assigned to the template using the [list templates API](https://developers.procore.com/reference/rest/v1/workflows-templates?version=1.0).

For each project, you'd find the related preset (using the template ID as a reference) with the [list templates presets API](https://developers.procore.com/reference/rest/v1/workflows-templates-presets?version=1.0).

Starting with a copy of the preset's `responsible_group_memberships`, make any changes needed by updating the user IDs in the `login_ids` array. There might be some empty groups that shouldn't be modified, those are "tool roles" that will be filled by the workflowed item's creator or other dynamic roles specific to the workflowed item.
You can know which memberships should be updated by referring back to the version's `responsible_groups`.
Only groups with the type `responsible_role` should be updated.

Once the changes have been made, save the changes with the [update templates preset API](https://developers.procore.com/reference/rest/v1/workflows-templates-presets?version=1.0#update-workflows-template-preset).
