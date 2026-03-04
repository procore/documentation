---
permalink: /date-time
title: Dates, Times & Time Zones
layout: default
section_title: Reference

---

## Background

Timestamps returned by the Procore API are a combined date/time representation following the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format in [Coordinated Universal Time (UTC)](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).
The format for a typical Procore API timestamp is:

```
YYYY-MM-DDTHH:MM:SSZ
```

The various symbol elements of the ISO 8601 timestamp format are described in the following table.

| Symbol | Description |
| ------ | ------------------------------------------------------------ |
| YYYY   | four-digit year identifier (e.g., 2018)                      |
| MM     | two-digit month identifier (e.g., 10)                       |
| DD     | two-digit date identifier (e.g., 25)                         |
| T      | delimiter between the date and time portion of the timestamp |
| HH:    | two-digit hour identifier (e.g., 16)                         |
| MM:    | two-digit minute identifier (e.g., 47)                       |
| SS     | two-digit seconds identifier (e.g., 35)                      |
| Z      | specifies the timestamp is in UTC (zulu) time                |

**Example**: 2018-10-25T16:47:35Z represents October 25th, 2018 at 16:47:35 UTC

## Date/Time Usage with the Procore API

There are numerous Procore API endpoints that set or return date/time information.
Here are some guidelines to assist you when working with date/time information and the Procore API.

### Handling Timestamps Returned with GET Requests

Generally speaking, timestamps returned from Procore API GET requests are strings that represent the entire combined date/time in ISO 8601 format.
Let's examine the JSON response from the Show Task Item endpoint.

```
{
  "id": 12877,
  "assignee": {
      "id": 1234567,
      "login": "joearchitect@proarchs.com",
      "name": "Joe Architect"
  },
  "created_at": "2018-06-27T17:57:13Z",
  "created_by": {
      "id": 2468101,
      "login": "jdeveloper@prodevs.com",
      "name": "James Developer"
  },
  "description": "We need to verify that that the final design complies with all applicable local zoning ordinances.",
  "due_date": "2018-08-17T00:00:00Z",
  "number": "1",
  "private": true,
  "status": "initiated",
  "task_item_category": {
      "id": 66043,
      "name": "Design"
  },
  "title": "Verify zoning compliance",
  "updated_at": "2018-06-27T17:57:13Z"
}
```

In the example above, note that all date/time fields returned in the JSON response are represented in their full ISO 8601 format.
However, a common use case is the need to render a date/time string in a user interface as a simple, more human-consumable calendar date.
Most languages/frameworks provide methods for handling and parsing ISO 8601 formatted data.
You should refer to the documentation for your specific language/framework for details on how to work with ISO 8601 data.
Here is a [downloadable JavaScript example]({{ site.baseurl }}/assets/static/datetime-get-sample-code.html) that helps illustrate how the rendering of date/time values might be handled in a single-page JavaScript application.

### Filtering GET Requests Using Date Ranges

Now let's take a look at filtering a response based on a date range.
Here we use the `created_at` parameter with the List Purchase Order Contracts action to return a list of purchase orders that were created on September 23, 2016 between 16:30 and 17:00 UTC.

```
GET https://sandbox.procore.com/rest/v1.0/purchase_order_contracts/?project_id=
    225096&filters[created_at]=\"2016-09-23T16:30:00Z...2016-09-23T17:00:00Z\"
```

It is important to note that the date-time string used with the `created_at` and `updated_at` parameters must adhere to ISO8601 standards.
In addition, these parameters must be formatted as a range using the ... delimiter.
See our [Filtering and Sorting Guide]({{ site.url }}{{ site.baseurl }}{% link tutorials/filtering_on_list_actions.md %}) for additional tips on working with responses from Procore API GET requests.

### Setting Dates/Times with POST and PATCH Requests

If you are creating or updating an instance of a resource that includes date/time attributes, the attribute values you submit with your request body must comply to the ISO 8601 standard.
It is important to note that even if you only want to include a basic calendar date in the body of a POST request (e.g., '08-26-2018'), you still need to send that date information in the full ISO 8601-compliant format.
For example, if you are sending a `due_date` field value it must contain the time component as well the date component of the ISO 8601 string.

```
{
  "task_item":{
    "title":"Review parking plan for parcel A",
    "number":"100-b",
    "description":"Perform full design review for parking plan for parcel A",
    "due_date":"2018-08-26T00:00:00Z",
    "status":"initiated",
    "private":false,
    "assigned_id":1477666
  }
}
```

In the example above we are sending `2018-06-26T00:00:00Z` for the `due_date` attribute value with the time component simply being `T00:00:00Z`.
Note that if you do not send a properly formatted value the POST request will not fail, but it will be stored as a `null` value in the database.
Here is a [downloadable JavaScript example]({{ site.baseurl }}/assets/static/datetime-post-sample-code.html) that helps illustrate how to properly include date/time data in the request body in the context of a single-page JavaScript application.
<br><br>

***
## Working with Time Zones

Setting or updating a Project's time zone using the Procore API requires that specific string values are properly applied for the `time_zone` attribute.
If the string value provided does not match exactly what the Procore API is expecting, a `422 Unprocessable Entity` error will be returned.

For example, using `"US Pacific Time"` will fail — use `"US/Pacific"` instead. The `time_zone` value must exactly match one of the supported identifiers listed below.

### Supported Time Zones

| Time Zone Identifier          | Geographic Region | UTC Offset (hours) |
| ---------------------------- | ----------------- | ------------------ |
| American Samoa               | Pacific           | -11:00             |
| International Date Line West | Pacific           | -11:00             |
| Midway Island                | Pacific           | -11:00             |
| Hawaii                       | Pacific           | -11:00             |
| Alaska                       | America           | -09:00             |
| Pacific Time (US & Canada)   | America           | -08:00             |
| Tijuana                      | America           | -08:00             |
| US/Pacific                   | US                | -08:00             |
| Arizona                      | America           | -07:00             |
| Chihuahua                    | America           | -07:00             |
| Mazatlan                     | America           | -07:00             |
| Mountain Time (US & Canada)  | America           | -07:00             |
| Central America              | America           | -06:00             |
| Central Time (US & Canada)   | America           | -06:00             |
| Guadalajara                  | America           | -06:00             |
| Mexico City                  | America           | -06:00             |
| Monterrey                    | America           | -06:00             |
| Saskatchewan                 | America           | -06:00             |
| Bogota                       | America           | -05:00             |
| Eastern Time (US & Canada)   | America           | -05:00             |
| Indiana (East)               | America           | -05:00             |
| Lima                         | America           | -05:00             |
| Quito                        | America           | -05:00             |
| Atlantic Time (Canada)       | America           | -04:00             |
| Caracas                      | America           | -04:00             |
| Georgetown                   | America           | -04:00             |
| La Paz                       | America           | -04:00             |
| Santiago                     | America           | -04:00             |
| Newfoundland                 | America           | -03:30             |
| Brasilia                     | America           | -03:00             |
| Buenos Aires                 | America           | -03:00             |
| Greenland                    | America           | -03:00             |
| Montevideo                   | America           | -03:00             |
| Mid-Atlantic                 | Atlantic          | -02:00             |
| Azores                       | Atlantic          | -01:00             |
| Cape Verde Is.               | Atlantic          | -01:00             |
| Edinburgh                    | Europe            | +00:00             |
| Lisbon                       | Europe            | +00:00             |
| London                       | Europe            | +00:00             |
| Monrovia                     | Africa            | +00:00             |
| UTC                          | ETC               | +00:00             |
| Amsterdam                    | Europe            | +01:00             |
| Belgrade                     | Europe            | +01:00             |
| Berlin                       | Europe            | +01:00             |
| Bern                         | Europe            | +01:00             |
| Bratislava                   | Europe            | +01:00             |
| Brussels                     | Europe            | +01:00             |
| Budapest                     | Europe            | +01:00             |
| Casablanca                   | Africa            | +01:00             |
| Copenhagen                   | Europe            | +01:00             |
| Dublin                       | Europe            | +01:00             |
| Ljubljana                    | Europe            | +01:00             |
| Madrid                       | Europe            | +01:00             |
| Paris                        | Europe            | +01:00             |
| Prague                       | Europe            | +01:00             |
| Rome                         | Europe            | +01:00             |
| Sarajevo                     | Europe            | +01:00             |
| Skopje                       | Europe            | +01:00             |
| Stockholm                    | Europe            | +01:00             |
| Vienna                       | Europe            | +01:00             |
| Warsaw                       | Europe            | +01:00             |
| West Central Africa          | Africa            | +01:00             |
| Zagreb                       | Europe            | +01:00             |
| Zurich                       | Europe            | +01:00             |
| Athens                       | Europe            | +02:00             |
| Bucharest                    | Europe            | +02:00             |
| Cairo                        | Africa            | +02:00             |
| Harare                       | Africa            | +02:00             |
| Helsinki                     | Europe            | +02:00             |
| Jerusalem                    | Asia              | +02:00             |
| Kaliningrad                  | Europe            | +02:00             |
| Kyiv                         | Europe            | +02:00             |
| Pretoria                     | Africa            | +02:00             |
| Riga                         | Europe            | +02:00             |
| Sofia                        | Europe            | +02:00             |
| Tallinn                      | Europe            | +02:00             |
| Vilnius                      | Europe            | +02:00             |
| Baghdad                      | Asia              | +03:00             |
| Istanbul                     | Europe            | +03:00             |
| Kuwait                       | Asia              | +03:00             |
| Minsk                        | Europe            | +03:00             |
| Moscow                       | Europe            | +03:00             |
| Nairobi                      | Africa            | +03:00             |
| Riyadh                       | Asia              | +03:00             |
| St. Petersburg               | Europe            | +03:00             |
| Tehran                       | Asia              | +03:30             |
| Abu Dhabi                    | Asia              | +04:00             |
| Baku                         | Asia              | +04:00             |
| Muscat                       | Asia              | +04:00             |
| Samara                       | Europe            | +04:00             |
| Tbilisi                      | Asia              | +04:00             |
| Volgograd                    | Europe            | +04:00             |
| Yerevan                      | Asia              | +04:00             |
| Kabul                        | Asia              | +04:30             |
| Ekaterinburg                 | Asia              | +05:00             |
| Islamabad                    | Asia              | +05:00             |
| Karachi                      | Asia              | +05:00             |
| Tashkent                     | Asia              | +05:00             |
| Chennai                      | Asia              | +05:30             |
| Kolkata                      | Asia              | +05:30             |
| Mumbai                       | Asia              | +05:30             |
| New Delhi                    | Asia              | +05:30             |
| Sri Jayawardenepura          | Asia              | +05:30             |
| Kathmandu                    | Asia              | +05:45             |
| Almaty                       | Asia              | +06:00             |
| Astana                       | Asia              | +06:00             |
| Dhaka                        | Asia              | +06:00             |
| Urumqi                       | Asia              | +06:00             |
| Rangoon                      | Asia              | +06:30             |
| Bangkok                      | Asia              | +07:00             |
| Hanoi                        | Asia              | +07:00             |
| Jakarta                      | Asia              | +07:00             |
| Krasnoyarsk                  | Asia              | +07:00             |
| Novosibirsk                  | Asia              | +07:00             |
| Beijing                      | Asia              | +08:00             |
| Chongqing                    | Asia              | +08:00             |
| Hong Kong                    | Asia              | +08:00             |
| Irkutsk                      | Asia              | +08:00             |
| Kuala Lumpur                 | Asia              | +08:00             |
| Perth                        | Australia         | +08:00             |
| Singapore                    | Asia              | +08:00             |
| Taipei                       | Asia              | +08:00             |
| Ulaanbaatar                  | Asia              | +08:00             |
| Osaka                        | Asia              | +09:00             |
| Sapporo                      | Asia              | +09:00             |
| Seoul                        | Asia              | +09:00             |
| Tokyo                        | Asia              | +09:00             |
| Yakutsk                      | Asia              | +09:00             |
| Adelaide                     | Australia         | +09:30             |
| Darwin                       | Australia         | +09:30             |
| Brisbane                     | Australia         | +10:00             |
| Canberra                     | Australia         | +10:00             |
| Guam                         | Pacific           | +10:00             |
| Hobart                       | Australia         | +10:00             |
| Melbourne                    | Australia         | +10:00             |
| Port Moresby                 | Pacific           | +10:00             |
| Sydney                       | Pacific           | +10:00             |
| Vladivostok                  | Asia              | +10:00             |
| Magadan                      | Asia              | +11:00             |
| New Caledonia                | Pacific           | +11:00             |
| Solomon Is.                  | Pacific           | +11:00             |
| Srednekolymsk                | Asia              | +11:00             |
| Auckland                     | Pacific           | +12:00             |
| Fiji                         | Pacific           | +12:00             |
| Kamchatka                    | Asia              | +12:00             |
| Marshall Is.                 | Pacific           | +12:00             |
| Wellington                   | Pacific           | +12:00             |
| Chatham Is.                  | Pacific           | +12:45             |
| Nuku'alofa                   | Pacific           | +13:00             |
| Samoa                        | Pacific           | +13:00             |
| Tokelau Is.                  | Pacific           | +13:00             |