---
permalink: /tutorial-timezones
title: Working with Time Zones
layout: default
section_title: Best Practices

---

## Background

Setting or updating a Project’s time zone using the Procore API requires that specific string values are properly applied for the `time_zone` attribute.
If the string value provided does not match exactly what the Procore API is expecting, a `422 Unprocessable Entity` error will be returned.

To illustrate this requirement, let's examine this Postman example showing an attempt to (incorrectly) update an existing project’s time zone to “US Pacific Time”:

![Incorrect time zone]({{ site.baseurl }}/assets/guides/incorrect-time-zone.png)

We see an error returned indicating the time zone "does not exist".
In other words, the string value we provided in the request body for `time_zone` did not match any of the supported values.
In this case, we would need to provide a value of "US/Pacific" as the time zone identifier in order to have a successfull call.

## Supported Time Zones

Here is a list of the time zones currently supported by the Procore API.

| Time Zone Identifer          | Geographic Region | UTC Offset (hours) |
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
