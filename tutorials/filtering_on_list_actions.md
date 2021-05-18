---
permalink: /filtering-on-list-actions
title: Filtering and Sorting on List Actions
layout: default
section_title: Guides and Tutorials

---

> LIMITED FILTERING COVERAGE
>
> Please note that only a subset of the available List Actions in the Procore API currently support filtering.
> Please see the individual endpoint documentation pages for filtering capability.
> Filtering coverage will be expanded in future releases of the API.

## Introduction

The Procore API supports filtering on List Actions to make large response data sets easier to work with.
You can filter on supported attributes included in the response and you can filter on more than one attribute at a time.

## Filtering Syntax

Filtering is simple to implement by appending the names of the attributes and the values you want to filter on to the List Action endpoint.
Filters are implemented as query parameters on top of the base URL.
The most common syntax for adding filters to a List Action is:

```
&filters[<ATTRIBUTE_NAME>]=<VALUE_TO_FILTER_ON>
```

You can string together multiple filters on a single List Action call as a logical `AND` to further refine your results:

```
&filters[<ATTRIBUTE_NAME>]=<VALUE_TO_FILTER_ON>&filters[<ATTRIBUTE_NAME>]=<VALUE_TO_FILTER_ON>...
```

## Examples

Here are a few examples to get you started using the filtering capabilities in Procore API.

First, let's look at a simple case of filtering a list of Work Order Contracts (subcontract) on the Status field.
We only want to return the items with a Status of 'Approved' so we'll format our call as follows:

```
GET https://sandbox.procore.com/rest/v1.0/work_order_contracts?project_id=225096&filters[status]=Approved
```

Now, let's look at an example of filtering on multiple fields.
This time we'll string two filters together to return a list of open Submittals received from a specific subcontractor.

```
GET https://sandbox.procore.com/rest/v1.0/projects/225096/submittals?filters[status_id]=1&filters[received_from_id]=1477686
```

> MULTIPLE FILTERS ON THE SAME FIELD NOT SUPPORTED
>
> In the current version of the Procore API, you may not use multiple filters on the same field in a single call.

Finally, let's take a look at filtering a response based on a date range.
Here we use the `created_at` parameter with the List Purchase Order Contracts action to return a list of purchase orders that were created on September 23, 2016 between 16:30 and 17:00 UTC.

```
GET https://sandbox.procore.com/rest/v1.0/purchase_order_contracts/
    ?project_id=225096&filters[created_at]=\"2016-09-23T16:30:00Z...2016-09-23T17:00:00Z\"
```

It is important to note that the date-time string used with the `created_at` and `updated_at` parameters must adhere to ISO8601 standards.
In addition, these parameters must be formatted as a range using the `...` delimiter.

## Filtering on Deleted Objects

You can return a list of only the deleted objects for a resource using the `filters[include_deleted]` query parameter.
Here is an example for returning a list of deleted work order contracts.

```
GET https://api.procore.com/rest/v1.0/work_order_contracts/?project_id=123456&filters[include_deleted]=only
```

Notice that we use only as the value for the `filters[include_deleted]` parameter.
This returns just the deleted items. Using a value of `with` returns deleted and undeleted items.

## Filtering on User-Defined Field Values

There are a number of resources in the Procore API (such as RFIs) that provide List Action filtering on fields that have user-defined values.
For example, the List RFIs endpoint allows you to filter the response by responsible contractor ID using `filters[responsible_contractor_id]` as a query parameter.
However, you must first use a helper method that returns the available values for the `responsible_contractor_id` field as illustrated below.

Filter options helper method...

```
GET https://api.procore.com/rest/v1.0/projects/123456/rfis/filter_options/responsible_contractor_id
```

Example JSON response...

```
[
  {
    "key": 3968037,
    "value": "Joey's Civil Engineering"
  },
  {
    "key": 3968067,
    "value": "My Sub Company"
  }
]
```

From the response you can determine the ID (key) for the value that you want to filter on, and use that when you call the List RFIs endpoint as shown here...

```
GET https://api.procore.com/rest/v1.0/projects/123456/rfis?filters[responsible_contractor_id]=3968037
```

## Date Range Filtering on Daily Logs

Many of the Daily Log List Action endpoints (e.g., List Accident Logs, List Delivery Logs, etc.) support filtering on dates and date ranges.
However, the syntax for Daily Log filtering differs somewhat from that described above.
Use the following syntax for adding date range filtering to Daily Logs.

To filter on a specific date, use the `log_date` query parameter with the following syntax...

```
?log_Date=<yyyy-mm-dd>
```

For example...

```
GET https://api.procore.com/rest/v1.0/projects/123456/accident_logs?log_date=2017-02-09
```

To filter on a date range, use the `start_date` and `end_date` query parameters with the following syntax...

```
?start_date=<yyyy-mm-dd>&end_date=<yyyy-mm-dd>
```

For example...

```
https://api.procore.com/rest/v1.0/projects/123456/accident_logs?start_date=2017-02-08&end_date=2017-02-09
```

Note that calling the List Action with no date query parameters only returns records for the current (today's) date.

See [Working with Daily Logs]({{ site.url }}{{ site.baseurl }}{% link tutorials/daily_logs.md %}) for additional information.

## Sorting on List Actions

In addition to filtering the results of List Actions, you can also sort the results based on specified fields.
Add sorting to your API call by adding the `sort` query parameter with the following syntax:

```
/rest/v1.0/<procore_endpoint>?sort=<field_name>
```

For example, here is a call to the List Company Vendors endpoint with sorting by the `name` field:

```
https://api.procore.com/rest/v1.0/vendors?company_id=9999999&sort=name
```
Note that you can also multi-sort by passing in comma-separated field attributes, in the order of importance:

```
/rest/v1.0/<procore_endpoint>?sort=<field_name1>,<field_name2>,<field_name3>
```

By default, sorting occurs in ascending order.
You can use `sort=-` to sort results in descending order.

> LIMITED SORTING COVERAGE
>
> Please note that only a subset of the available List Actions in the Procore API currently support sorting.
