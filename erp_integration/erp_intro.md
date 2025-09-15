---
permalink: /erp-intro
title: ERP Integration Overview
layout: default
section_title: ERP Integration

---

## Working with ERP Objects

ERP Objects provide system integrators the ability to support the synchronization of Procore financial objects into and out of Procore via a designated approval workflow.
Inside Procore, the ERP Integrations Tool acts as a type of “staging area” wherein financial objects require specific accounting approval before being formally added to a Procore company (import), or sent out for creation in an external application (export).
ERP Objects effectively represent the staged record of financial objects pending approval in this designated staging area.

## ERP Architecture

To deliver integrations capable of synchronizing financial data through Procore’s ERP Integrations Tool, System Integrators will be required to maintain an external web application capable of the following:

### Integration Logic

Integrations will require logic to manage the flow of data between Procore and the External Application.
More specifically the Integration will require mechanisms to effectively manage the following:

- Unique IDs and the the sync state of each object
- Versioning of object lists coming from the External Application
- The cadence of updates sent to Procore
- Constraints to appropriately create objects in the External Application

### Company Preferences

Integrations will need to leverage Procore’s Metadata Configurations framework to manage each individual company’s user experience on the ERP Integrations Tool.
Procore’s json metadata framework empowers the System Integrator to manage which types of objects and custom fields are available for use in the ERP Integrations Tool.
A template of the default json configuration is provided as an example, and edits can be made to control Entities and custom fields on objects staged for export.
See [Metadata Template and Editing Guide]({{ site.url }}{{ site.baseurl }}{% link erp_integration/erp_metadata_details.md %}) for additional information.

### Webhooks

Using Procore Webhooks System Integrators will need to prescribe a publicly accessible URL to which Procore can send event-based http requests.
These requests from Procore notify the System Integrator that updates have been made in Procore, such as a state change, updated value or new object available for export out of Procore.
The Integration must take action to retrieve all of the necessary information from Procore and act accordingly.
See [Using Procore Webhooks]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/webhooks_api.md %}) for additional information.

ERP event payloads being sent to the Notification Endpoint URL will include an ERP Request ID.
System Integrators will need to respond to Procore with the ERP Request ID to retrieve more information surrounding the request.
Specific to ERP export workflows, the request will include the ERP Request Detail.
Following completion of an export from Procore, the integrator will call back to Procore to update (“close out”) the ERP Request Detail and effectively mark the export as a success.

### Authentication

When calling into Procore to create objects, eg ERP Import, System Integrators will leverage Procore’s OAuth 2.0 framework to authenticate requests on behalf of a Service Account.
To do so, System Integrators will need to leverage the Service Account’s Client ID and Client Secret to obtain OAuth access tokens, which can then be used to authenticate subsequent requests on behalf of the Service Account.
See [Introduction to OAuth 2.0]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_introduction.md %}) for additional information.

## Accounting Integration Workflows

ERP objects are temporary in nature and serve the purpose of collecting approval from the designated Accounting Approver before the object is created in Procore or sent to the external system.

### ERP Import

The process of sending objects from an external system to Procore starts when a System Integrator creates an ERP Object with an Origin ID in Procore.
That ERP Object is then staged on the “Ready to Import” filter in the ERP Integrations Tool inside of Procore.
Once approved, the ERP Object is deleted and a Procore Object is created with the same Origin ID.
The presence of that Origin ID on the Procore Object effectively marks the object as synced inside Procore.

### ERP Export

The process of sending objects from Procore to an external system starts when a Procore user sends a Procore Object from a Procore project tool to the ERP Integrations Tool for accounting review.
Designated Accounting Approvers have the option to accept the export to the external system, or reject and send the object back to the project tool for further editing.
When the object is successfully created in the External Application, System Integrators can update Procore to mark the export request as successful and the Procore Object as synced.

See the [ERP Technical Guide]({{ site.url }}{{ site.baseurl }}{% link erp_integration/erp_technical_guide.md %}) for details on creating the Webhook, Trigger, and ERP Connection.

## Definitions

| Term                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accounting Approver       | A Procore user with admin-granted permission to review staged financial records in the ERP Integrations Tool. On ERP Imports, Accounting Approvers are responsible for vetting information before adding the detail to Procore itself. On ERP Exports, Accounting Approvers are responsible for vetting the object prior to create a parallel record in the External Application.                                                                                                                                                                                                                        |
| Entity                    | A classification inside a company’s Metadata Configurations describing a specific type of financial object. Vendor, for example, is an Entity classification. Metadata configurations control whether a particular Entity (type of object) will be supported through the ERP Integrations Tool for that particular company.                                                                                                                                                                                                                                                                              |
| ERP Integrations Tool     | Part of Procore’s Financial suite, the ERP Integrations Tool is a company-level tool inside Procore where financial objects are staged for accounting approval prior to import or export. Users inside of Procore can send objects from a project-level tool (eg Commitments) to the company level ERP Integrations tool to receive accounting approval prior to being sent (export) to the External Application. Conversely, objects created in the External Application must be approved by an Accounting Approver on the ERP Integration Tool prior to being created in (import) the Procore project. |
| ERP Object                | A financial object that has been staged for approval on the ERP Integrations Tool prior to import or export. ERP Objects have direct relationships to Procore Objects, and always carry a limited utility lifecycle. Once an ERP Object has been approved, the related Procore Object is marked as synced and becomes the lone object of record.                                                                                                                                                                                                                                                         |
| ERP Request               | A representation of an object being exported from the ERP Integrations Tool to the External Application. The ERP Request ID is included in the payload of a Notification Event signaling an object is intended to be exported from the ERP Integrations Tool to the External Application. System Integrators can use the ERP Request ID to retrieve the ERP Request Details.                                                                                                                                                                                                                             |
| ERP Request Detail        | Contextual information that depicts the state (e.g. success, failed) of an ERP Request. The ERP Request Detail should be updated by the System Integrator to reflect the state of the ERP export (in progress, success, failed, stale), also known as “closing out”. The ERP Request Detail ID is separate from the ERP Request ID.                                                                                                                                                                                                                                                                      |
| External Application      | The target ERP or accounting system that will be connected to Procore as part of the System Integrator’s Integration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Integration               | The System Integrator’s application/solution/build responsible for communicating data and objects between Procore and the External Application.                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Integration URL           | A unique URL designated by the System Integrator as part of establishing the ERP Connection to identify an integrated company as belonging to the appropriate Integration.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Metadata Configurations   | A set of company-specific preferences and settings managed through a json framework. Each company record in the Integration will carry its own distinct set of Metadata Configurations. These configurations can be updated as needed, and effectively control the user experience and types of Entities supported in the ERP Integrations Tool.                                                                                                                                                                                                                                                         |
| Notification Event        | A request sent from Procore to a System Integrator to notify the integrator of an update in Procore. Notification Events often signal to the integrator that a new action or update needs to take place in the Integration itself. Notification Events signaling an object to be exported from the ERP Integrations Tool to the External Application will include an ERP Request ID which can be used to gather more information and eventually “close out” the ERP Request Details.                                                                                                                     |
| Notification Endpoint URL | A publicly accessible URL controlled by the System Integrator with the purpose of receiving Notification Events from Procore (see Webooks below). This is referred to as the “destination_url” in the API payloads.                                                                                                                                                                                                                                                                                                                                                                                      |
| Origin ID                 | A field on Procore Objects and ERP Objects that is populated with a unique ID originating outside of Procore. Marked as origin_id in the API payloads, the presence of an Origin ID on Procore Objects triggers unique integration logic inside of Procore that will visually mark the object as synced and lock the object in Procore to prevent edits and the risk of data misalignment. This unique identifier can be shared across the Procore Object, ERP Object, and the object in the External Application to effectively join all of the records together.                                       |
| Procore Object (Record)   | A financial object created in a Procore Project (eg Commitment, Change Order). Procore objects have a direct relationship to ERP objects, effectively representing the permanent record of the object inside Procore itself. The presence of an Origin ID on a Procore object is what triggers the Procore logic to handle the object as if it is synced with the External Application.                                                                                                                                                                                                                  |
| Project User              | A user inside Procore with standard permissions. Project Users have the ability to send objects from Project Financial tools (e.g. Commitments, Change Orders) to the staging area (ERP Integrations Tool), and can also retrieve objects that are pending review.                                                                                                                                                                                                                                                                                                                                       |
| Service Account           | A user profile created on a Procore company that facilitates the authentication of external parties leveraging Procore’s APIs. Once the ERP Connection is established (see below), Integrations will be able to authenticate against the Procore API on behalf of this user and effectively interact with the target Procore company. This is particularly critical when creating ERP Objects for the ERP Import workflows.                                                                                                                                                                              |
| Standard Cost Code List   | A list of company-level cost codes that effectively acts as a template for the cost codes users can add to projects in Procore. Standard Cost Code Lists can be “ERP” or “non-ERP”. An ERP Standard Cost Code List is automatically created on projects that have an ERP Connection. Integrated companies will only have a single ERP Standard Cost Code List.                                                                                                                                                                                                                                           |
| Super User                | A Procore employee with designated permissions to handle the administrative setup, implementation, and support of Procore companies using an Integration. Super Users can access restricted tools and areas of the product that are required to perform the aforementioned actions.                                                                                                                                                                                                                                                                                                                      |
| Synced                    | The effective status of an object that carries an Origin ID. Synced objects trigger ERP-specific logic inside of Procore Financials, including ERP status banners and a block on project users’ ability to edit synced objects.                                                                                                                                                                                                                                                                                                                                                                          |
| System Integrator         | The individual or team responsible for developing and supporting the Integration against Procore’s API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
