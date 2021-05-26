---
permalink: /object-model-company
title: Company-Level Resources
layout: default
section_title: Procore API Resource Guide

---

![Company-level Resources]({{ site.baseurl }}/assets/guides/resource-model-company-level.svg)

## Projects

Client Accounts (Companies) have one or more Projects where project management activities occur.
Sometimes, a Project in Procore may be referred to as a Job.
Projects are managed on the [Porfolio](https://support.procore.com/products/online/user-guide/company-level/portfolio) page at the Company level.
See Portfolio for additional information.

API Endpoints: [Projects](https://developers.procore.com/reference/rest/v1/projects)

## Company Directory

The Company-level Directory tool lets you create, import, and store an unlimited number of contacts in Procore.
See [Directory](https://support.procore.com/products/online/user-guide/company-level/directory) for additional information.

### Users (Contacts/Person)

In Procore, a _person_ is a record that can be created to represent either a Procore User or a Vendor/Company Contact.

- A Procore User is a person who will be logging into your organization's Procore account so they can enter and modify information in your company's Procore account.
- A Vendor/Company Contact is a person who will NOT be invited to log into your company's Procore account for the purpose of entering data in the Procore application. Examples of Vendor/Company Contacts include subcontractors, suppliers, vendors, or other contacts for third-party business entities.

Both Users and Vendor/Company Contacts are added to Procore the same way.
The only difference between the two is whether or not you choose to invite a person to log into Procore.
Note that if you add a user to the Project Directory they will also be created in the Company Directory.
See [Add a Person to the Company Directory](http://support.procore.com/products/online/user-guide/company-level/directory/tutorials/add-a-person-to-the-company-directory) for additional informtion.

API Endpoints: [Users](https://developers.procore.com/reference/rest/v1/company-users)

### Vendors

The Company Level has a directory containing Vendors, also known as Directory Companies.
Not to be confused with Client Accounts, a Vendor represents a record that is created for subcontractors, suppliers, vendors, and other entities who are doing business with your organization.
It contains important address, contact, project, bidding, and insurance information that gives you a snapshot view of that entity, and makes it easier to communicate with the people working for the company.
See [Add a Company to a Company Directory](http://support.procore.com/products/online/user-guide/company-level/directory/tutorials/add-a-company-to-the-company-directory) for additional information.

API Endpoints: [Company Vendors](https://developers.procore.com/reference/rest/v1/company-vendors)

#### Vendor Insurance

In Procore, an _Insurance Manager_ is an internal employee at your company who serves as your organization's primary point of contact for ensuring that the insurance policies for your vendors (e.g., contractors, subcontractors, and other vendors) are in compliance with liability requirements, and that their policy and certificate information is kept up-to-date in Procore.
Insurance information for your vendors can be added and maintained in Procore's Company and Project level Directory tools.
The responsibilities of an Insurance Manager include:

- Adding insurance policies for your vendors to the Directory tool
- Receiving automated email notifications from Procore about expiring insurance policies for your vendors
- Updating insurance policies as information changes
- Removing insurance information for your vendors when the information is no longer relevant

See [Add Insurance for a Vendor in the Company Directory](http://support.procore.com/products/online/user-guide/company-level/directory/tutorials/add-insurance-for-a-vendor-in-the-company-directory) for additional information.

API Endpoints: [Company Vendor Insurances](https://developers.procore.com/reference/rest/v1/vendor-insurances)

## Company Documents

Procore's Company-level Documents tool is the central repository for your organization's mission-critical documents.
Designed to accelerate business efficiency, this tool minimizes the amount of time it takes to capture, distribute, and share documents with your team.
Offering virtually unlimited storage space and a variety of markup and revision management features, you can ensure that your staff always has access to the most current document versions available.
See [Documents](http://support.procore.com/products/online/user-guide/company-level/documents) for additional information.

API Endpoints: [Company Folders and Files](https://developers.procore.com/reference/rest/v1/company-folders-and-files)

- Company Folders - Folders in the Company Documents tool allow you to organize sub-folders or files within. See [Create a Folder](http://support.procore.com/products/online/user-guide/project-level/documents/tutorials/create-a-folder) for additional infomation.
- Company Files - Files include documents and images that are added to the root folder or other folders created in the Documents tool. See [Upload Files into a Folder](http://support.procore.com/products/online/user-guide/project-level/documents/tutorials/upload-files-into-a-folder) for additional infomation.

## Cost Codes

The Company-level Admin tool includes a 16 Division Cost Code Structure that aligns with the CSI [MasterFormat](http://support.procore.com/references/construction-management/glossary-of-terms#MasterFormat).
You can add, edit, or delete the codes on this list.
See [Add and Edit Company Cost Codes](http://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-and-edit-company-cost-codes) for additional infomation.

API Endpoints: [Cost Codes](https://developers.procore.com/reference/rest/v1/cost-codes)

## Project Roles

A _Project Role_ gives you the ability to create custom roles to be assigned to Directory Vendors and Objects to reflect your organization’s unique semantics for role-labeling.
See [Add Custom Project Roles](http://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-custom-project-roles) for additional infomation.

API Endpoints: [Project Roles](https://developers.procore.com/reference/rest/v1/project-roles)

## Programs

A _Program_ is a group of related construction projects that provide your organization with benefits from managing projects as a group, over managing projects individually.
See [Add a Custom Program](http://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-a-custom-program) for additional infomation.

API Endpoints: [Company Programs](https://developers.procore.com/reference/rest/v1/programs)

## Offices

_Offices_ are used by companies with multiple corporate office locations that can be assigned to Projects.
Their main use is to substitute the main Client Account’s Company name in the UI, in reports and pdf exports.
See [Add Office Locations](http://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-office-locations) for additional infomation.

API Endpoints: [Company Offices](https://developers.procore.com/reference/rest/v1/company-offices)

## Project Stages

_Project Stages_ assist with defining a project’s current phase/stage of construction.
On top of the default values provided by Procore, you can add extra stages to a company to be later assigned to Projects.
See [Add a Custom Project Stage](http://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-a-custom-project-stage) for additional infomation.

API Endpoints: [Project Stages](https://developers.procore.com/reference/rest/v1/project-stages)

## Project Types

_Project Types_ allow for more granular level of labeling your projects.
See [Add a Custom Project Type](http://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-a-custom-project-type) for additional infomation.

API Endpoints: [Project Types](https://developers.procore.com/reference/rest/v1/project-types)

## Trades

_Trades_ are used to filter out vendors during the bidding phase.
Trades are created at the company level and assigned to Company or Project Directory Vendors.
See [Add or Delete Trades](http://support.procore.com/products/online/user-guide/company-level/admin/tutorials/add-or-delete-trades) for additional infomation.

API Endpoints: [Trades](https://developers.procore.com/reference/rest/v1/trades)
