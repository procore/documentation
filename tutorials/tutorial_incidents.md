---
permalink: /tutorial-incidents
title: Working with Incidents
layout: default
section_title: Guides and Tutorials

---

## Introduction

The Procore API provides a number of endpoints that allow you to work with the Incidents tool to track jobsite hazards, contributing conditions and behavior, person(s) involved, and the paper history associated with each incident throughout the lifecycle of your project.
Leverage the insights provided by the Incidents tool to identify common hazards and behavior to help facilitate the creation of a safer jobsite.
This guide provides information to help you best utilize the available Incidents tool endpoints in your App or integration.
For general information on the Incidents tool, visit the [Incidents](https://support.procore.com/products/online/user-guide/project-level/incidents) article on the Procore Support Site.

## Available Endpoints

The following Procore API endpoints are available for working with Incidents.

| Endpoint Category                                                                                     | Available Functionality                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Incidents](https://developers.procore.com/reference/rest/v1/incidents)                               | Create, List, Show, Update, and Delete Incidents, as well as access and work with recycled Incidents.                                                                    |
| [Incident Attachments](https://developers.procore.com/reference/rest/v1/incident-attachments)         | Create Attachments for Incidents.                                                                                                                                        |
| [Injuries](https://developers.procore.com/reference/rest/v1/injuries)                                 | Create, List, Show, Update, and Delete Injuries in a specified project, as well as access and work with recycled Injuries.                                               |
| [Near Misses](https://developers.procore.com/reference/rest/v1/near-misses)                           | Create, List, Show, Update, and Delete Near Misses in a specified project, as well as access and work with recycled Near Misses.                                         |
| [Affliction Types](https://developers.procore.com/reference/rest/v1/affliction-types)                 | List and Show Affliction Types.                                                                                                                                          |
| [Harm Sources](https://developers.procore.com/reference/rest/v1/harm-sources)                         | List and Show Sources of Harm.                                                                                                                                           |
| [Work Activities](https://developers.procore.com/reference/rest/v1/work-activities)                   | List and Show Work Activities.                                                                                                                                           |
| [Incident Picker Options](https://developers.procore.com/reference/rest/v1/incident-picker-options)   | List Affected Body Parts, List Filing Types, and List Incident Statuses.                                                                                                 |
| [Incident Filter Options](https://developers.procore.com/reference/rest/v1/incident-filter-options)   | List Incident Filter Options for Contributing Behavior, Contributing Condition, Hazard, Location, and Status.                                                            |
| [Injury Filter Options](https://developers.procore.com/reference/rest/v1/injury-filter-options)       | List Injury Filter Options for Affected Company, Affected Persons, Managed Equipment, Harm Sources, Work Activity, Affected Body Part, Affliction Type, and Filing Type. |
| [Near Miss Filter Options](https://developers.procore.com/reference/rest/v1/near-miss-filter-options) | List Near Miss Filter Options for Affected Company, Affected Persons, Managed Equipment, Harm Source, and Work Activity.                                                 |

## Important Considerations
Here are some important considerations and caveats to keep in mind when working with the Incidents tool endpoints.

### Configurable Field Sets

By default, Incidents tool endpoints do not automatically respect changes made by Procore Admins to the Incident forms via a Configurable Field Set (CFS).
To validate against a CFS, you need to include the `run_configurable_validations=true` parameter when creating or updating an Incident or Injury.
In addition, the JSON responses returned do not respect a CFS.
For example, if the CFS makes certain fields hidden, they will still appear in the response body.

### Event Dates and Times

In order to properly specify the local date and time that an Incident or Injury occurred, you will need to use a combination of the `event_date` and `time_unknown` parameters.
Keep in mind that the value you specify for `event_date` must be in Coordinated Universal Time (UTC).

Let's look at an example where we know the local date and exact time of the Incident.
If the event occurred on the West Coast of the United States at 1:30pm Pacific Standard Time (PST) on October 31, 2018, we would specify event_date as the UTC value `2018-10-31T17:30:00.000Z` and `time_unknown=false`.
This appropriately accounts for the eight-hour time difference between PST and UTC (i.e., PST = UTC-0800)

```
"event_date": "2018-10-31T17:30:00.000Z",
"time_unknown": false
```

Now let's assume we do _not_ know the exact local time of the event.
In this scenario, the value for `event_date` must be specified as 12:00am (midnight) local time on the date the event occured, converted to UTC.
So, using our example, the payload would be as follows:

```
"event_date": "2018-10-31T08:0:00.000Z",
"time_unknown": true
```

In this case, `event_date` is set to 8:00am October 31, 2018 UTC to account for the eight-hour time difference between PST and UTC.

### Working with Afflictions

When Creating or Updating an Injury, keep in mind that the `affliction_type_id` attribute is required if you are using the `affected_body_part` attribute.
You cannot set an `affected_body_part` without having a corresponding `affliction_type_id`, and you likewise cannot remove an `affliction_type_id` if affected_body_part is set.

Additionally, the JSON response body from a Create or Update Injury operation includes a single `afflictions` object that contains the `affliction_type_id` and `affected_body_part` combination if they are not null.
Though this construct is deprecated, it has not been removed from the response body as our Procore mobile applications continue to rely on it.
For your own App designs, simply ignore this object and just work with the top-level `affliction_type_id` and `affected_body_part` directly.
