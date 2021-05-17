---
permalink: /tutorial-requisitions
title: Working with Subcontractor Invoices
layout: default
section_title: Guides and Tutorials

---

> IMPORTANT: REQUISITIONS ARE NOW SUBCONTRACTOR INVOICES
>
> In July, 2018 Requisitions were renamed to Subcontractor Invoices in the Procore user interface.
> Note, however, that the corresponding API endpoint URIs still use the requistion nomenclature.
> For example, the endpoint URI for the List Subcontractor Invoices For Project action is still `/rest/v1.0/requisitions`.
> In addition, related query parameter and response attribute names retain the requistion naming convention.
> Pleas keep these aspects in mind as you work with the various Subcontractor Invoice API endpoints.
> For additional information, please review [What happened to Requisitions and Payment Applications?](https://support.procore.com/faq/what-happened-to-requisitions-and-payment-applications) and [Information About Subcontractor Invoices (Requisitions)](https://support.procore.com/products/online/user-guide/project-level/commitments/tutorials/information-about-requisitions) on our [Support Site](http://support.procore.com/).

## Introduction

Subcontractor Invoices allow subcontractors to progressively bill at several stages during the construction process.
These billings are based on a verified percentage of that commitment's completion.
General contractors can configure billing period start and end dates, as well as the billing date, for each billing period.
They can invite subcontractors to complete invoices for the most recent billing period, or they can create invoices on behalf of the subcontractor.
Once the subcontractor invoice has been approved, payment can be issued against the commitment.

For addtional detail on subcontractor invoices and how they work in Procore, see [Information About Subcontractor Invoices](http://support.procore.com/products/online/user-guide/project-level/commitments/tutorials/information-about-requisitions) on our [Support Site](http://support.procore.com/).

## Subcontractor Invoices API Endpoints

The Procore API provides a number of endpoints that allow you perform actions on invoices in Procore.
The following table provides descriptions of these endpoints.
Clicking an endpoint title in the table takes you to the reference page for that endpoint where you can learn about the various parameters and response body attributes.

| Endpoint                                                                                                                                                                                                                | Description                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Create Subcontractor Invoice For Commitment](https://developers.procore.com/reference/rest/v1/requisitions-subcontractor-invoices#create-requisition-subcontractor-invoices-for-commitment)                            | Creates a new subcontrator invoice for the specified commitment.                                                                                                             |
| [List Subcontractor Invoices For Project](https://developers.procore.com/reference/rest/v1/requisitions-subcontractor-invoices#list-requisitions-subcontractor-invoices-for-project)                                    | Lists existing subcontractor invoices for the specified project.                                                                                                             |
| [Show Subcontractor Invoice](https://developers.procore.com/reference/rest/v1/requisitions-subcontractor-invoices#show-requisition-subcontractor-invoice)                                                               | Shows information for the specified subcontractor invoice.                                                                                                                   |
| [Show Detail for Subcontractor Invoice](https://developers.procore.com/reference/rest/v1/requisitions-subcontractor-invoices#show-detail-for-requisition-subcontractor-invoice)                                         | Shows detailed information for the specified subcontractor invoice.                                                                                                          |
| [Update Subcontractor Invoice](https://developers.procore.com/reference/rest/v1/requisitions-subcontractor-invoices#update-requisition-subcontractor-invoice)                                                           | Updates attributes for the specified subcontractor invoice. Must be the latest, open subcontractor invoice. Closed subcontractor invoices cannot be updated.                 |
| [Delete Subcontractor Invoice](https://developers.procore.com/reference/rest/v1/requisitions-subcontractor-invoices#delete-requisition-subcontractor-invoice)                                                           | Deletes the specified subcontractor invoice. Must be the latest, open subcontractor invoice. Closed subcontractor invoice cannot be deleted.                                 |
| [List Subcontractor Invoice Contract Items](https://developers.procore.com/reference/rest/v1/requisition-subcontractor-invoice-contract-items#list-requisition-subcontractor-invoice-contract-items)                    | Lists the contract items associated with the specified subcontractor invoice.                                                                                                |
| [Show Subcontractor Invoice Contract Item](https://developers.procore.com/reference/rest/v1/requisition-subcontractor-invoice-contract-items#show-requisition-subcontractor-invoice-contract-item)                      | Shows information on the specified subcontractor invoice contract item.                                                                                                      |
| [Update Subcontractor Invoice Contract Item](https://developers.procore.com/reference/rest/v1/requisition-subcontractor-invoice-contract-items#update-requisition-subcontractor-invoice-contract-item)                  | Updates attributes for the specified subcontractor invoice contract item.                                                                                                    |
| [Add a Change Order Package to a Subcontractor Invoice](https://developers.procore.com/reference/rest/v1/requisitions-subcontractor-invoices#add-change-order-package-to-a-requisition-subcontractor-invoice)           | Creates an association, or link, between the specified subcontractor invoice and an existing change order package. The change order package must be in the 'approved' state. |
| [Remove a Change Order Package from a Subcontractor Invoice](https://developers.procore.com/reference/rest/v1/requisitions-subcontractor-invoices#remove-change-order-package-from-a-requisition-subcontractor-invoice) | Removes an existing change order package associated with a subcontractor invoice.                                                                                            |
| [List Subcontractor Invoice Change Order Items](https://developers.procore.com/reference/rest/v1/requisition-subcontractor-invoice-change-order-items#list-requisition-subcontractor-invoice-change-order-items)        | Lists the change order items associated with the specified subcontractor invoice.                                                                                            |
| [Show Subcontractor Invoice Change Order Item](https://developers.procore.com/reference/rest/v1/requisition-subcontractor-invoice-change-order-items#show-requisition-subcontractor-invoice-change-order-item)          | Shows information for a change order item in the specified subcontractor invoice.                                                                                            |
| [Update Subcontractor Invoice Change Order Item](https://developers.procore.com/reference/rest/v1/requisition-subcontractor-invoice-change-order-items#update-requisition-subcontractor-invoice-change-order-item)      | Updates attributes for the specified subcontractor invoice change order item.                                                                                                |

## Common Subcontractor Invoice Workflows

Here are the common workflows you will employ when working with the subcontractor invoice API endpoints.

### Subcontractor Invoices Against a Commitment

The desired outcome of this workflow is a new subcontractor invoice created against an existing commitment, along with updated commitment line items for the current billing period.

1. First, we create a new subcontractor invoice against an existing commitment using the [Create Subcontractor Invoice for Commitment](https://developers.procore.com/reference/rest/v1/requisitions-subcontractor-invoices#create-requisition-subcontractor-invoices-for-commitment) endpoint. You will need to supply a JSON request body that includes the `project_id` and `commitment_id`, as well as the requisition object containing a minimum number of required attributes. Here is an example JSON request body.
    ```
    {
      "project_id": 123456,
      "commitment_id": 786001,
      "requisition": {
        "period_id": 117330,
        "requisition_start": "2016-11-01",
        "requisition_end": "2016-11-30",
        "billing_date": "2017-11-01",
        "invoice_number": 123,
        "status": "draft"
      }
    }
    ```
    Here is the JSON response:
    ```
    {
      "id": 1280646,
      "billing_date": "2017-11-01",
      "commitment_id": 786001,
      "invoice_number": "123",
      "origin_data": null,
      "origin_id": null,
      "percent_complete": "96.36%",
      "period_id": 117330,
      "status": "draft",
      "requisition_start": "2016-11-01",
      "requisition_end": "2016-11-30",
      "number": 19,
      "g702": {
        "balance_to_finish_including_retainage": "7300.00",
        "completed_work_retainage_percent": "10.00",
        "completed_work_retainage_amount": "5200.00",
        "contract_sum_to_date": "55000.00",
        "current_payment_due": "0.00",
        "less_previous_certificates_for_payment": "47700.00",
        "net_change_by_change_orders": "5000.00",
        "original_contract_sum": "50000.00",
        "stored_materials_retainage_amount": "100.00",
        "stored_materials_retainage_percent": "10.00",
        "total_completed_and_stored_to_date": "53000.00",
        "total_earned_less_retainage": "47700.00",
        "total_retainage": "5300.00"
      },
      "attachments": []
    }
    ```
    Make note of the `id` attribute returned in the response body, as you will need to include that in the next step.
1. Next, we retrieve a list of contract items by making a call to the [List Subcontractor Invoice Contract Items](https://developers.procore.com/reference/rest/v1/requisition-subcontractor-invoice-contract-items#list-requisition-subcontractor-invoice-contract-items) endpoint. We use the value of the `id` attribute returned from the previous step as the required `requisition_id` path parameter and the `project_id` as the required query parameter. This helps us verify that we have created the subcontractor invoice correctly and that it contains at least one associated contract line item.
    ```
    {
      "id": 17918097,
      "cost_code_id": 80598390,
      "line_item_id": 5175960,
      "description_of_work": "Foundation work",
      "scheduled_value": "50000.00",
      "work_completed_from_previous_application": "51000.00",
      "work_completed_this_period": "0.00",
      "materials_presently_stored": "500.00",
      "total_completed_and_stored_to_date": "51500.00",
      "total_completed_and_stored_to_date_percent": "103.00",
      "work_completed_retainage_from_previous_application": "5100.00",
      "work_completed_retainage_retained_this_period": "0.00",
      "work_completed_retainage_percent_this_period": "10.00",
      "materials_stored_retainage_currently_retained": "50.00",
      "materials_stored_retainage_percent_this_period": "10.00",
      "work_completed_retainage_released_this_period": "0.00",
      "materials_stored_retainage_released_this_period": "0.00"
    }
    ```
1. Finally, we make one or more calls to the [Update Subcontractor Invoice Contract Item](https://developers.procore.com/reference/rest/v1/requisition-subcontractor-invoice-contract-items#update-requisition-subcontractor-invoice-contract-item) endpoint to update line item attributes as needed for the current billing period. For this call we include the `requisition_id` as a required path parameter and the `project_id` as a required query parameter. We send a payload to the Contract Item object containing a minimum number of required attributes. Here is an example JSON request body for updating the description for a Contract Item along with work completed figures.
    ```
    {
      "requisition_contract_item": {
        "work_completed_this_period": "1000",
        "work_completed_this_period_quantity": "0.20",
        "Description": "Initial prep work"
      }
    }
    ```

### Subcontractor Invoices with Change Orders

In some projects you may need to manipulate subcontractor invoice data in the context of change orders.
The outcome of the following workflow is a change order package including one or more change order line items associated with a subcontractor invoice.

1. First we make a call to the [Add a Change Order Package to a Subcontractor Invoice](https://developers.procore.com/reference/rest/v1/requisitions#add-change-order-package-to-a-requisition) endpoint to associate an existing change order package with a subcontractor invoice. We pass the `requisition_id` as a required path parameter, and the `commitment_id`, `project_id`, and `change_order_package_id` as required query parameters. The response to this call shows the change order items from the specified change order package automatically added to the subcontractor invoice.
    ```
    [
      {
        "id": 592007,
        "cost_code_id": 80598417,
        "line_item_id": 11786340,
        "description_of_work": "Landscape design re-work",
        "scheduled_value": "500.00",
        "work_completed_from_previous_application": "0.00",
        "work_completed_this_period": "100.00",
        "total_completed_and_stored_to_date": "100.00",
        "total_completed_and_stored_to_date_percent": "20.00",
        "work_completed_retainage_from_previous_application": "0.00",
        "work_completed_retainage_retained_this_period": "0.00",
        "work_completed_retainage_percent_this_period": "0.00",
        "work_completed_retainage_released_this_period": "0.00",
        "scheduled_quantity": "0.0",
        "scheduled_unit_price": "0.0000",
        "work_completed_this_period_quantity": "0.0",
        "work_completed_from_previous_application_quantity": "0.0",
        "change_order_package_id": 1708957
      },
      {
        "id": 592006,
        "cost_code_id": 80598417,
        "line_item_id": 11786339,
        "description_of_work": "Civil design for extended driveway",
        "scheduled_value": "2000.00",
        "work_completed_from_previous_application": "0.00",
        "work_completed_this_period": "500.00",
        "total_completed_and_stored_to_date": "500.00",
        "total_completed_and_stored_to_date_percent": "25.00",
        "work_completed_retainage_from_previous_application": "0.00",
        "work_completed_retainage_retained_this_period": "0.00",
        "work_completed_retainage_percent_this_period": "0.00",
        "work_completed_retainage_released_this_period": "0.00",
        "scheduled_quantity": "0.0",
        "scheduled_unit_price": "0.0000",
        "work_completed_this_period_quantity": "0.0",
        "work_completed_from_previous_application_quantity": "0.0",
        "change_order_package_id": 1708957
      }
    ]
    ```
1. With the change order package successfully added to the subcontractor invoice, we can now make a call to the [List Subcontractor Invoice Change Order Items](https://developers.procore.com/reference/requisition-subcontractor-invoice-change-order-items#list-requisition-subcontractor-invoice-change-order-items) endpoint to verify that each of the change orders contained in the package are appropriately associated with the subcontractor invoice as line items. We pass the `requisition_id` as a required path parameter and the `project_id` as a required query parameter. The result of this call should be the same as what we see in the previous step.
1. We can now make a call to the [Update Subcontractor Invoice Change Order Item](https://developers.procore.com/reference/rest/v1/requisition-subcontractor-invoice-change-order-items#update-requisition-subcontractor-invoice-change-order-item) endpoint to update the line item values for the current subcontractor invoice billing period. For this endpoint we pass the `requisition_id` and the `id` for the change order item we want to update as required path parameters. In the JSON request body we specify the modifications we want to make to the line item as illustrated in the following example.
    ```
    {
      "requisition_change_order_item":{
        "work_completed_this_period":"1000.00",
        "work_completed_this_period_quantity":"10"
      }
    }
    ```
    Here is the JSON response:
    ```
    {
      "id": 592006,
      "cost_code_id": 80598417,
      "line_item_id": 11786339,
      "description_of_work": "Civil design for extended driveway",
      "scheduled_value": "1500.00",
      "work_completed_from_previous_application": "0.00",
      "work_completed_this_period": "1000.00",
      "total_completed_and_stored_to_date": "1000.00",
      "total_completed_and_stored_to_date_percent": "66.67",
      "work_completed_retainage_from_previous_application": "0.00",
      "work_completed_retainage_retained_this_period": "0.00",
      "work_completed_retainage_percent_this_period": "0.00",
      "work_completed_retainage_released_this_period": "0.00",
      "scheduled_quantity": "15.0",
      "scheduled_unit_price": "100.0000",
      "work_completed_this_period_quantity": "10.0",
      "work_completed_from_previous_application_quantity": "0.0",
      "change_order_package_id": 1708957
    }
    ```

## Additional Information

We recommend the following articles on our [Support Site](http://support.procore.com/) to help you build your understanding of subcontractor invoices, how they are managed in Procore, and their relationship to commitments and change orders.

- [Information About Subcontractor Invoices](http://support.procore.com/products/online/user-guide/project-level/commitments/tutorials/information-about-requisitions)
- [Commitments](https://support.procore.com/products/online/user-guide/project-level/commitments)
- [Change Orders](https://support.procore.com/products/online/user-guide/project-level/change-orders)
- [Commitment Change Order Tiers](https://support.procore.com/faq/what-are-the-different-change-order-tiers#Commitment_Change_Order_Tiers)
