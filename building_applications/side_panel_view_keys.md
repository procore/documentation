---
permalink: /side-panel-view-keys
title: Side Panel View Key Reference
layout: default
section_title: Building Applications
---

<style>
/* Keep wide tables from overflowing the content column */
/* Use fixed layout so extremely long strings wrap instead of stretching columns */
main table { width: 100%; table-layout: fixed; border-collapse: collapse; }
main th, main td { word-break: break-word; overflow-wrap: anywhere; white-space: normal; }
/* On narrow viewports, allow horizontal scroll as a fallback */
@media (max-width: 1200px) {
  main table { display: block; overflow-x: auto; }
}
</style>

## Introduction
Side Panel View Keys determine where your embedded application can appear within the Procore user interface. Each view key corresponds to a specific tool or view (e.g., Documents, Daily Log, Prime Contracts).

Use this reference when selecting **Supported Side Panel Views** in the Developer Portal.
<br><br>

***
#### Commitments


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/commitments/work_order_contracts/:id | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/ssov | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/change_orders | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/request_for_quotes | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/invoices | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/payments | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/advanced_settings | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/schedule_of_values | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/billings_schedule_of_values | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/billings_schedule_of_values/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/requisitions | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/requisitions/new | commitments.requisitions.new |
| /:project_id/project/commitments/work_order_contracts/:work_order_contract_id/requisitions/:id | commitments.requisitions.detail |
| /:project_id/project/commitments/work_order_contracts/:work_order_contract_id/admin/requisitions/:id/edit | commitments.requisitions.edit |
| /:project_id/project/commitments/work_order_contracts/:id/contract_payments | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/contract_payments/new | commitments.work_order_contracts.new |
| /:project_id/project/commitments/work_order_contracts/:id/related_items | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/related_items/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/communications | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/communications/new | commitments.work_order_contracts.new |
| /:project_id/project/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/commitments/work_order_contracts/:id/advanced_settings/edit | commitments.work_order_contracts.edit |
| /:project_id/project/commitments/work_order_contracts/:id/change_orders/commitment_contract_change_orders<br />/new_from_change_events_bulk_action | commitments.commitment_contract_change_orders.new |
| /:project_id/project/commitments/work_order_contracts/:work_order_contract_id<br />/change_orders/commitment_contract_change_orders/:id | commitments.commitment_contract_change_orders.detail |
| /:project_id/project/commitments/work_order_contracts/:work_order_contract_id<br />/change_orders/commitment_contract_change_orders/:id/edit | commitments.commitment_contract_change_orders.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id/schedule_of_values | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/change_orders | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/requisitions | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id/requisitions/new | commitments.requisitions.new |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id/requisitions/:id | commitments.requisitions.detail |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id/admin/requisitions/:id/edit | commitments.requisitions.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id/contract_payments | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/contract_payments/new | commitments.purchase_order_contracts.new |
| /:project_id/project/commitments/purchase_order_contracts/:id/related_items | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/related_items/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/commitments/purchase_order_contracts/:id/communications | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/communications/new | commitments.purchase_order_contracts.new |
| /:project_id/project/commitments/purchase_order_contracts/:id/change_history | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/advanced_settings | commitments.purchase_order_contracts.detail |
| /:project_id/project/commitments/purchase_order_contracts/:id/advanced_settings/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id<br />/change_orders/commitment_contract_change_orders/new | commitments.commitment_contract_change_orders.new |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id<br />/change_orders/commitment_contract_change_orders/:id | commitments.commitment_contract_change_orders.detail |
| /:project_id/project/commitments/purchase_order_contracts/:purchase_order_contract_id<br />/change_orders/commitment_contract_change_orders/:id/edit | commitments.commitment_contract_change_orders.edit |


#### Commitments Beta


| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments | commitments.contracts.list |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/create | commitments.work_order_contracts.new |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br /> | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/advanced_settings | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/change_orders | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/change_history | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/compliance | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/edit | commitments.work_order_contracts.edit |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/emails | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/invoices | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/payments | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/rfqs | commitments.work_order_contracts.detail |
| /webclients/host/companies/:company_id/projects/:project_id/tools/contracts/commitments/work_order_contracts/:id<br />/ssov | commitments.work_order_contracts.detail |


#### Contracts


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/contracts/commitments/work_order_contracts/:id | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/ssov | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/change_orders | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/rfqs | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/invoices | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/payments | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/advanced_settings | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/edit | commitments.work_order_contracts.edit |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/schedule_of_values | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/billings_schedule_of_values | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/billings_schedule_of_values/edit | commitments.work_order_contracts.edit |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/requisitions | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/contract_payments | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/contract_payments/new | commitments.work_order_contracts.new |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/related_items | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/related_items/edit | commitments.work_order_contracts.edit |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/communications | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/communications/new | commitments.work_order_contracts.new |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/change_history | commitments.work_order_contracts.detail |
| /:project_id/project/contracts/commitments/work_order_contracts/:id/advanced_settings/edit | commitments.work_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/schedule_of_values | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/change_orders | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/requisitions | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/contract_payments | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/contract_payments/new | commitments.purchase_order_contracts.new |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/related_items | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/related_items/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/communications | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/communications/new | commitments.purchase_order_contracts.new |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/change_history | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/advanced_settings | commitments.purchase_order_contracts.detail |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/advanced_settings/edit | commitments.purchase_order_contracts.edit |
| /:project_id/project/contracts/commitments/purchase_order_contracts/:id/requisitions/:invoice_id | commitments.requisitions.detail |
| /:project_id/project/contracts/prime_contracts/:prime_contract_id/invoices | prime_contracts.invoices.list |


#### Prime Contracts


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/prime_contracts/:id | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/edit | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/schedule_of_values | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/change_orders | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/payment_applications | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/received_payments | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/received_payments/edit | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/related_items | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/related_items/edit | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/communications | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/communications/new | prime_contracts.new |
| /:project_id/project/prime_contracts/:id/change_history | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/markups | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/advanced_settings | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/advanced_settings/edit | prime_contracts.detail |
| /:project_id/project/prime_contracts/:id/change_orders/potential_change_orders<br />/new_from_change_events_bulk_action | prime_contracts.change_orders.potential_change_orders.new |
| /:project_id/project/prime_contracts/:prime_contract_id/change_orders/change_order_packages/:id | prime_contracts.change_orders.detail |
| /:project_id/project/prime_contracts/:prime_contract_id/change_orders/potential_change_orders/:id | prime_contracts.change_orders.potential_change_orders.detail |
| /:project_id/project/prime_contracts/:prime_contract_id/change_orders/potential_change_orders/:id/edit | prime_contracts.change_orders.potential_change_orders.detail |
| /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/new | prime_contracts.payment_applications.new |
| /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/:id | prime_contracts.payment_applications.detail |
| /:project_id/project/prime_contracts/:prime_contract_id/payment_applications/:id/edit | prime_contracts.payment_applications.edit |


#### Change Events


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/change_events/events | change_events.list |
| /:project_id/project/change_events/events/new | change_events.new |
| /:project_id/project/change_events/events/:id | change_events.detail |
| /:project_id/project/change_events/events/:id/edit | change_events.edit |


#### Budget


| URL Path | View Key |
| -------- | -------- |
| /companies/:company_id/projects/:project_id/tools/budget_changes | budgeting.budget_changes.list |
| /projects/:project_id/budgeting | budgeting.list |
| /projects/:project_id/budgets/budget_details | budgeting.detail |
| /projects/:project_id/forecasting | budgeting.forecasting.detail |
| /:project_id/project/budgeting/change_history | budgeting.change_history.list |


#### Submittal Logs


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/submittal_logs/:id | submittal_logs.detail |


#### Project Directory


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/directory/vendors/:id/edit | project_directory.vendors.edit |
| /:project_id/project/directory/edit_person/:id | project_directory.person.edit |


#### Observations


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/observations/items/:id/edit | observations.edit |
| /:project_id/project/observations/items | observations.list |


#### RFIs


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/rfi/show/:id | rfi.detail |


#### Inspections


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/checklists/lists/:id | inspections.detail |


#### Correspondence


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/generic_tool/show/:id | correspondence.detail |


#### Schedule


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/calendar/all | schedule.calendar.task.list |
| /:project_id/project/calendar/month | schedule.calendar.month.list |
| /:project_id/project/calendar | schedule.calendar.list |
| /:project_id/project/calendar/lookaheads | schedule.calendar.lookaheads.list |
| /:project_id/project/calendar/tasks/:task_id | schedule.calendar.task.detail |


#### Incidents


| URL Path | View Key |
| -------- | -------- |
| /:project_id/project/incidents | incidents.list |
| /:project_id/project/incidents/configure_tab | incidents.list |
| /:project_id/project/incidents/new | incidents.new |
| /:project_id/project/incidents/records | incidents.list |
| /:project_id/project/incidents/recycled | incidents.list |
| /:project_id/project/incidents/:id | incidents.detail |
| /:project_id/project/incidents/:id/change_history | incidents.detail |
| /:project_id/project/incidents/:id/edit | incidents.edit |
| /:project_id/project/incidents/:id/emails | incidents.detail |
| /:project_id/project/incidents/:id/emails/new | incidents.detail |
| /:project_id/project/incidents/:id/related_items | incidents.detail |
| /:project_id/project/incidents/:id/related_items/edit | incidents.detail |

***