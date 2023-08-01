---
permalink: /data-model-considerations
title: Procore Data Model Considerations
layout: default
section_title: API Essentials

---

## Introduction

The following sections identify certain Procore data model constraints and characteristics that you should be aware of as you design your application.

## Resource ID Value Size

With the introduction of Multiple Procore Regions (MPR), the size of resource ID values in any new Procore region may exceed what can be stored in a 32-bit integer.
As a result, please ensure that you store ID values using a data type capable of storing 64-bit integers or larger, such as `BigInt`, `int64_t`, or `long long` depending on your particular coding language/framework.

## Globally Unique User IDs

It is important to note that when a new user is added to Procore, the integer ID assigned to that user by the system has global scope and is unique across all company accounts and projects within Procore.
A user can therefore be a member of multiple Procore company accounts by virtue of their unqiue email address.
Furthermore, as you subsequently add that user to one or more project-level directories within a given company, the user_id value for that user remains the same across those projects.
In other words, the `user_id` is 'inherited' from the company-level directory.
Keep this aspect of the Procore data architecture in mind as you work with Procore API endpoints that rely on or otherwise utilize the `user_id` parameter.