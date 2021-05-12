---
permalink: /country-codes
title: Working with Country Codes
layout: default
section_title: Best Practices

---

## Introduction

The Procore API includes a number of endpoints that provide `country_code` and `state_code` parameters used to represent geographic location information.
It is important to note that these parameters expect values that adhere to the Alpha-2 variant of the [ISO-3166 specification](https://www.iso.org/iso-3166-country-codes.html).
ISO-3166 Alpha-2 designates a unique upper-case, two-character code for each country.
For example, the ISO-3166 Alpha-2 code for the United States is 'US'.
Similarly, codes designating country subdivisions (e.g., states, provinces, etc.) also follow the upper-case, two-character scheme.
For example, the ISO-3166 Alpha-2 code for California is 'CA'.

If you intend to utilize any of the Procore API endpoints that include the `country_code` and/or `state_code` parameters, the values you pass must adhere to the ISO-3166 standard described above.
Rather than creating and maintaining your own lookup table of code values, we recommend leveraging one of the many available country code libraries for your particular coding language and platform.

## Endpoints with country_code and state_code Parameters

Here are the Procore API endpoints that include `country_code` and `state_code` parameters:

- Company Users [[Create](https://developers.procore.com/reference/company-users#create-company-user), [Sync](https://developers.procore.com/reference/company-users#sync-company-users), [Update](https://developers.procore.com/reference/company-users#update-company-user)]
- Company Offices [[Create](https://developers.procore.com/reference/company-offices#create-company-office), [Update](https://developers.procore.com/reference/company-offices#update-company-office)]
- Company Vendors [[Create](https://developers.procore.com/reference/company-vendors#create-company-vendor), [Sync](https://developers.procore.com/reference/company-vendors#sync-company-vendors), [Update](https://developers.procore.com/reference/company-vendors#update-company-vendor)]
- Projects [[Create](https://developers.procore.com/reference/projects#create-project), [Sync](https://developers.procore.com/reference/projects#sync-projects), [Update](https://developers.procore.com/reference/projects#update-project)]
- Project Users [[Create](https://developers.procore.com/reference/project-users#create-project-user), [Update](https://developers.procore.com/reference/project-users#update-project-user)]
- Project Vendors [[Create](https://developers.procore.com/reference/project-vendors#create-project-vendor), [Update](https://developers.procore.com/reference/project-vendors#update-project-vendor)]
