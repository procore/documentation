---
permalink: /tutorial-e-signature-integration
title: Electronic Signature Integration
layout: default
section_title: Guides and Tutorials

---

## Recommended Approach

For technology partners interested in integrating an electronic signature solution with Procore, we recommend leveraging the Procore API in combination with our embedded app experience.
(See our [Embedded App Helper](https://developers.procore.com/documentation/building-apps-helper-library) for information on implementing an embedded experience iframe within Procore.)

An integration can pull PDF documents from Procore to be signed in an external e-signature application.
Signed copies of the document can be returned to Procore’s Documents tool (at a minimum), allowing users to save executed documents within Procore as a project's system of record.
Permissions around this tool can also add an extra layer of security to keep needed documents confidential. 
Additional functionality can be added to the integration for completing business processes.
For example, Procore’s API can be utilized to also update the status of a contract to “Complete,” record the date the document was signed, and mark the contract as executed.

## Accessing PDF Files

Currently, we recommend accessing PDF files through a URL scheme. Adding the .pdf extension to the URL for a given resource will render the corresponding PDF file for that resource.

For example, the following URL would retrieve the PDF file for a project’s prime contract (id #555555).

- URL: https://app.procore.com/101010/project/prime_contracts/55555
- URL pdf: https://app.procore.com/101010/project/prime_contracts/55555.pdf

With this capability, you can use the API to gain knowledge of specific documents that need to be signed, access relevant PDF files, render them in your application, and allow those documents to run through their signature process.

## Note About Attachments

Attachments should be captured separately through the API.
If the attachment is needed as part of the signature document, it must be accessed through the API and merged with the report PDF in an external application.

## Procore Tool Specific URL Schemes

To further explain PDF file access and provide examples for various Procore tools, a general URL path scheme is shown below for each major tool that could benefit from e-signature integration.
Each path assumes a base URL of https://app.procore.com.

### Prime Contract

- /{project_id}/project/prime_contracts/{prime_contract_id}.pdf

### Commitments

- /{project_id}/project/commitments/work_order_contracts/{work_order_contract_id}.pdf
- /{project_id}/project/commitments/purchase_order_contracts/{purchase_order_id}.pdf

### Owner Invoices

- /{project_id}/project/prime_contracts/{prime_contract_id}/payment_applications/{payment_application_id}/pdf.pdf

### Subcontractor Invoices

- /{project_id}/project/commitments/work_order_contracts/{word_order_id}/requisitions/{requisition_id}.pdf

### Change Orders

- /{project_id}/project/commitments/purchase_order_contracts/{purchase_order_contract_id}/change_orders/commitment_contract_change_orders/{change_order_package_id}.pdf
- /{project_id}/project/commitments/work_order_contracts/{work_order_contract_id}/change_orders/work_contract_change_orders/{change_order_package_id}.pdf
- /{project_id}/project/prime_contracts/{prime_contract_id}/change_orders/change_order_packages/{change_order_package_id}.pdf

### RFIs

- (All repsonses) /{project_id}/project/rfi/view_pdf.pdf?id={rfi_id}&only_official=false
- (Official responses only) /{project_id}/project/rfi/view_pdf.pdf?id={rfi_id}&only_official=true

### Submittals

- /{project_id}/project/submittal_logs/{submittal_id}.pdf

### Daily Log

- /{project_id}/project/daily_log/list.pdf?date={date}

## Documents Tool Integration

Additional information on integrating with the Documents tool can be found at [developers.procore.com](https://developers.procore.com/documentation/tutorial-uploads).
We recommended that executed documents be saved to a folder within the Procore Documents tool for reference.
This tool allows for Admin-level users to make folders private. We also recommend this approach for all contract documents.

## Additional Functionality

Additional functionality can be added to the integration to support contract execution.
Through Procore’s API, an integration can update the status of a contract to “Complete,” mark the contract as executed and record the executed date.

**Note:** Procore allows *Custom Workflows* to be assigned with these tools.
Custom Workflow in this scenario mostly refers to internal “controls” or “approvals” prior to something being sent out.
This might add some complexity to the update as it requires a different API call.
(See information below.)

Here are links to the API documentation covering the update actions discussed above for contracts, change orders, and workflows in Procore:

### Contracts

- [Prime Contract](https://developers.procore.com/reference/rest/v1/prime-contracts#update-prime-contract)
- [Commitments](https://developers.procore.com/reference/rest/v1/work-order-contracts#update-work-order-contract) (Subcontracts/Work Order)
- [Commitments](https://developers.procore.com/reference/rest/v1/purchase-order-contracts#update-purchase-order-contract) (Purchase Order)

### Change Orders

- [General Change Order Information](https://developers.procore.com/documentation/tutorial-change-orders)
- [Change Order](https://developers.procore.com/reference/rest/v1/change-order-packages#update-change-order-package)
(Note: Best practice would be to use the APIs to pull an “Approved Change Order” into the technology partner software through webhooks.)
- [Commitment Change Order](https://developers.procore.com/reference/rest/v1/change-order-packages)
(Note: Similar to note for Prime Contract)

### Workflow

- [General Workflow Information](https://developers.procore.com/documentation/tutorial-workflows)
