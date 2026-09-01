---
permalink: /document-management-document-revisions
title: Working with Document Revisions
layout: default
section_title: "Integration Guides: Document Management"

---

## Overview

The [Document Management Technical Guide]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_technical_guide.md %}) covers the eight-step submit flow: initialize an upload, put the file in storage, enrich metadata, and submit. After Step 8, the upload is consumed and the permanent record is a **Document Revision** in a **Document Container**.

This guide covers the read side of that lifecycle: how to list revisions after submit, fetch a known set of revision IDs, walk a container's version history, detect changes by polling, reconcile recycles, and download files.

***
## Related Documentation

- [Overview]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_intro.md %})
- [Technical Guide]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_technical_guide.md %})
- **Working with Document Revisions** (this page)
- [Metadata Details]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_metadata_details.md %})
- [API Reference: Document Revisions](https://developers.procore.com/reference/rest/document-revisions?version=2.0) — canonical endpoint list, maintained per API version

***

> **List Document Revisions and List Recycled Document Revisions are private and beta.** Both are annotated `visibility: private` and `stage: beta` in the Document Management service. List Selected Document Revisions is public and beta.
{: .callout .callout--warning}

All three endpoints require a valid OAuth 2.0 token. Results are scoped to the calling principal's Document Management permission groups — the same request returns different rows for different tokens. How a withheld revision appears depends on the call: a discovery list omits it with no withheld-count signal; a hydration call by ID returns a masked row. See [Permission Scoping](#permission-scoping).

### Base URL

Document Revision read endpoints use the following base path:

```
/rest/v{version}/companies/{company_id}/projects/{project_id}/document_management
```

Replace `{version}` with the version shown on each endpoint (`2.0` or `2.1`). Replace `{company_id}` and `{project_id}` with your actual Procore company and project IDs. List Document Revisions and List Selected Document Revisions are mounted on both `2.0` and `2.1`. List Recycled Document Revisions is mounted on `2.0` only.

### Three Endpoints, Three Jobs

Continuous sync needs a paginated list, a fetch-by-IDs endpoint, and a recycle-bin list. One does not replace the others.

| Job | Endpoint | When to use it |
| --- | --- | --- |
| Discovery | `GET .../document_revisions` | You do not yet know which revisions to fetch. Page through a project, a container, or an `updated_at` window. |
| Hydration | `POST .../document_revisions/selected_revisions` | You already have revision IDs (from a list pass, a submit response, or local state) and need full records. Page the response — the default `per_page` is 10. |
| Removal | `GET .../document_revisions/recycled_revisions` | Confirm that a row missing from the main list was recycled rather than permission-masked. |

The list endpoint accepts `filters[ids]`, but those IDs travel in the query string. A large ID set exceeds typical gateway URL limits, so List Selected Document Revisions is the supported hydration path: the IDs go in the POST body. The body array has no size cap; pagination still applies to the response.

List endpoints are paginated with a default page size of 10 and a maximum of 100 for full records. Use `page` and `per_page`. Omitting `per_page` silently returns 10 rows. The response includes a `Total` header with the record count and a `Link` header with page URLs. The `Link` header is always present; when all results fit on one page it is empty, otherwise it includes `next`/`prev`/`first`/`last`. Passing `view=ids_only` raises the `per_page` ceiling from 100 to 5000 and returns an array of IDs instead of full objects.

Request and response examples in this guide are condensed for readability and focus on essential fields. For complete schemas, all available fields, and HTTP status codes, follow the endpoint links throughout each section.

***

## List Document Revisions

Use this endpoint to discover revisions after they have been submitted. A submitted upload `404`s on subsequent upload reads, so post-submit state must be read from this surface.

**Request** — [List Document Revisions](https://developers.procore.com/reference/rest/document-revisions?version=2.0#list-document-revisions)

```
GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_revisions
```

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `page` | integer | No | Page number. Minimum `1`. Default `1`. |
| `per_page` | integer | No | Page size. Default `10`. Maximum `100`, or `5000` when `view=ids_only`. |
| `view` | string | No | Omit or pass `default` for full revision objects. Pass `ids_only` to receive an array of revision IDs. |
| `exclude_placeholders` | boolean | No | When `true`, omits revisions whose `item_content` is `Placeholder`. |
| `filters[<name>]` | string | No | Restrict the result set. See [Filtering, Sorting, and Pagination](#filtering-sorting-and-pagination). |
| `sort` | string | No | Sortable attributes: `created_at`, `uploaded_at`, `file_size`, `file_format`, or a field ID. Prefix with `-` for descending. See [Default Sort](#default-sort). |

<details>
<summary class="collapseListTierOne">View example response (HTTP 200)</summary>
<pre><code>{
  "data": [
    {
      "id": "01JDXMPK0TRV0BA5K8GSSY6J0Y",
      "document_container_id": "01G3F39BRDKDK04FV9BARK6YTS",
      "position_within_container": "aaa....",
      "file_locked": false,
      "download_url": "https://api.procore.com/rest/v2.0/companies/1234/projects/5678/document_management/document_revisions/01JDXMPK0TRV0BA5K8GSSY6J0Y/download",
      "latest_event_id": "01HW7PE6TJTVC32HJ7JBJVBNJR",
      "index_updated_at": "2026-08-15T18:22:01.000Z",
      "latest_document_collection_ids": ["01KSQF76ZWW0MTW5633K7J5KHZ"],
      "upload_id": "01JDXMPK0MTP0H41D4PYZ62R6R",
      "recycled": false,
      "permissions": {
        "allowed_actions": ["view", "download"]
      },
      "fields": [
        {
          "id": "01K8FIELDUPDATEDAT00000001",
          "name": "updated_at",
          "type": "timestamp",
          "values": [{ "label": "2026-08-15T18:22:01.000Z" }]
        }
      ],
      "integrations": {}
    }
  ]
}</code></pre>
</details>

Each row is one revision. The revision `id` is the stable identifier — use it, not the upload ID, for subsequent calls. `document_container_id` groups revisions that share match criteria; a metadata change that produces new match criteria re-containerizes the document. `position_within_container` is a reorderable lexicographic sort key in that container, not the sequential version number. The sequential version lives in `fields[]` where `name` is `version`. Use the maximum `version` in a container to identify the latest revision; position can diverge if revisions are reordered.

`updated_at` lives in `fields[]` as a timestamp field whose value is `values[].label`, not as a top-level key. `index_updated_at` is the search-index timestamp and falls back to the revision's `updated_at` when no index record is available. `permissions.allowed_actions` is a subset of `view`, `view_change_history`, `view_recycle_bin`, `edit_markup`, `edit_public_layers`, `move_to_recycle_bin`, `download`, `edit_metadata`, and `edit_shared_markup`.

Full-record responses also include `recycled`, `document_placeholder_id`, `match_type`, `standalone_upload_id`, and workflow fields. Follow the endpoint link for the complete schema.

Recycled revisions are excluded from this list. Confirm a recycle against [List Recycled Document Revisions](#list-recycled-document-revisions) rather than treating absence as a tombstone. A permission change that hides a document is indistinguishable from a recycle on this endpoint alone.

<details>
<summary class="collapseListTierOne">View example ids_only response (HTTP 200)</summary>
<pre><code>{
  "data": [
    "01JDXMPK0TRV0BA5K8GSSY6J0Y",
    "01JDXMPK0WXY0C61L9HTTZ7K1Z"
  ]
}</code></pre>
</details>

`view=ids_only` serializes each row to its `id` only and does not apply per-record permission masking. Use it for cheap enumeration; hydrate the IDs you care about with List Selected Document Revisions.

***

## List Selected Document Revisions

Use this endpoint when you already have revision IDs — for example the `ids` array returned by [Step 8: Submit Document Uploads as Revisions]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_technical_guide.md %}#step-8-submit-document-uploads-as-revisions), or the IDs from a `view=ids_only` list pass.

**Request** — [List Selected Document Revisions](https://developers.procore.com/reference/rest/document-revisions?version=2.0#list-selected-document-revisions)

```
POST /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_revisions/selected_revisions
```

**Request Body**

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ids` | string[] | Yes | Non-empty array of document revision IDs. Duplicates and blank strings are dropped. There is no documented maximum array size. |

<details>
<summary class="collapseListTierOne">View example request</summary>
<pre><code>{
  "ids": [
    "01JDXMPK0TRV0BA5K8GSSY6J0Y",
    "01JDXMPK0WXY0C61L9HTTZ7K1Z"
  ]
}</code></pre>
</details>

The response body uses the same revision object shape as List Document Revisions. Pagination query parameters (`page`, `per_page`, `view`) apply the same way, including the default `per_page` of 10 and the ceiling of 100 for full records. Omitting `per_page` silently returns the first 10 matching rows. Set `per_page=100` and follow `Link: next` until the `Total` header is exhausted. `view=ids_only` is accepted and raises the ceiling to 5000, but you already have the IDs — use the default view to hydrate.

A literal empty `ids` array is rejected as a 400 validation error (`MISSING_REQUIRED_PROPERTY` / `INVALID_PROPERTY`). An array that becomes empty after trimming whitespace returns HTTP 200 with an empty `data` array. Unknown IDs are omitted from `data`. IDs the caller cannot see are returned as masked rows (`permissions.allowed_actions` is `[]` and `download_url` is omitted), not 404'd. The endpoint does not 404 for unknown or unauthorized IDs. Under `view=ids_only`, unauthorized IDs appear as raw ID strings with no masking.

After submit, resolve the returned revision IDs here, read `document_container_id` from each row, then filter List Document Revisions by that container ID to get the document's current state and full revision history. The submit response alone does not include that history.

***

## List Recycled Document Revisions

Use this endpoint to confirm removals. Recycled revisions are hidden from the main list, and the main list does not accept `filters[recycled]` or `filters[include_recycled]`.

**Request** — [List Recycled Document Revisions](https://developers.procore.com/reference/rest/document-revisions?version=2.0#list-recycled-document-revisions)

```
GET /rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_revisions/recycled_revisions
```

This endpoint is `2.0` only. It requires Recycle Bin view permission (`view_recycle_bin`). Pagination, `view=ids_only`, and the `per_page` ceilings match List Document Revisions. `view=ids_only` does not apply per-record permission masking; access is enforced up front by the Recycle Bin view guard.

When no `sort` is supplied, results are ordered by `recycled_at` descending, then `id` descending. User-selectable `sort` attributes are the main-list set plus `recycled_at` and `id`.

The filter allowlist is the main-list default fields plus the recycle fields `recycled_at`, `recycled_by`, and `recycled_reason`. The response uses the same revision object shape, with `recycled` set to `true`.

Reconciliation is a two-endpoint pattern: run the main-list `updated_at` delta for creates and updates, then query this endpoint for recycles. Do not infer a recycle from absence on the main list — a permission change that hides a document looks identical to a recycle there.

***

## Filtering, Sorting, and Pagination

### Filter Keys

Pass filters as `filters[<name>]=<value>` query parameters on List Document Revisions.

| Filter | Purpose |
| --- | --- |
| `filters[document_container_id]=<id>` | All revisions in one container, which is the container's version history. There is no dedicated history endpoint. The value is a plain string ID. |
| `filters[document_container_ids]=["<id>","<id>"]` | Revisions in any of the listed containers. The value is a JSON array of ID strings, not a comma-delimited list. |
| `filters[updated_at]=<start>...<end>` | Revisions whose `updated_at` falls in the range. The primary cheap-delta primitive. Lower bound inclusive, upper bound exclusive. Both ends are required. |
| `filters[id]` / `filters[ids]` | Fetch-by-ID on the GET list. Prefer List Selected Document Revisions for large ID sets. |
| `filters[document_collection_id]=<id>` | Scope the list to one collection (for example the project's All Documents collection). |
| `filters[document_collection_index_type]=latest_revisions` | Combined with a `document_collection_id`, returns one row per container — the latest revision. |
| `filters[saved_view_id]` / `filters[saved_view_ids]` | Scope the list to a saved view. |
| `filters[in_workflow]` | Restrict to revisions that are in a workflow. |
| `filters[<field_name>]` | Attribute subsetting on default fields such as `type`, `status`, `discipline`, `number`, `revision`, `created_at`, and `version`. Custom LOV and reference fields are also filterable. |

`updated_at` range bounds are inclusive on the lower end (`gte`) and exclusive on the upper end (`lt`). Pass the raw maximum `updated_at` seen as the next lower bound and apply the re-delivered boundary rows idempotently. Do not pad the cursor forward — under an inclusive lower bound, `lastSync + 1s` skips every revision whose `updated_at` falls in `(max, max+1s]`. Both range ends are required. An empty upper bound is not a supported "everything since last sync" form; supply an explicit upper bound such as the current time, or a far-future sentinel.

The filter resolves against the Elasticsearch revision index, not the primary datastore. A revision that has not been indexed yet can miss a tight cursor. That index lag is why a periodic full re-list remains necessary as a backstop; see [Periodic Full Re-List](#periodic-full-re-list).

The list does not accept `filters[recycled]` or `filters[include_recycled]`. Recycled rows are hidden from this endpoint — use [List Recycled Document Revisions](#list-recycled-document-revisions).

### Default Sort

When you filter by `document_container_id` or `document_container_ids` and do not pass `sort`, the service orders by `document_container_id` descending, then `position_within_container` descending. `position_within_container` is a server-side sort in that case; it is not a user-selectable `sort` value. The value is still returned on each row so you can re-sort client-side if needed.

`name` ascending, then `created_at` descending, is then appended after that default — and after any caller-supplied `sort` — on every list, including a container-filtered one. The full container-filtered default order is therefore: container descending, position descending, name ascending, created_at descending.

User-selectable `sort` attributes on the list are `created_at`, `uploaded_at`, `file_size`, `file_format`, and a project field ID. Prefix with `-` for descending (`sort=-created_at`).

### Pagination Ceilings

| View | Default `per_page` | Maximum `per_page` |
| --- | --- | --- |
| omitted / `default` | 10 | 100 |
| `ids_only` | 10 | 5000 |

A `per_page` above the ceiling for the current `view` returns HTTP 400 with `reason_code: INVALID_PROPERTY`. These ceilings apply to List Document Revisions, List Selected Document Revisions, and List Recycled Document Revisions.

***

## Change Detection by Polling

There is no `changed_since` cursor type. Change detection is an `updated_at` range on List Document Revisions.

`updated_at` moves for any change. The delta tells you **that** a revision changed, not **what** changed — there is no dedicated status-changed timestamp. Diff against your stored copy to see which fields moved.

### Recommended Two-Phase Pass

Use the two-phase pattern when the changed set can be large. If your typical delta is small, skip Phase 1 and request full records directly from the list with the same `updated_at` filter.

```
1. Phase 1 — changed IDs (cheap):
   GET .../document_revisions
       ?view=ids_only
       &filters[updated_at]=<lastSync>...<now>
       &per_page=5000&page=1
     → follow Link: next to exhaustion

2. Phase 2 — hydrate those IDs:
   POST .../document_revisions/selected_revisions?per_page=100&page=1
        { "ids": ["<changed id>", ...] }
     → follow Link: next to exhaustion (Total carries the full count)

3. Advance the cursor to the maximum updated_at seen on the hydrated rows
   (read it from fields[] where name is "updated_at"). Pass that raw
   timestamp as the next lower bound. Do not pad forward.
```

Omitting `per_page` on Phase 2 silently returns 10 rows. The `ids` body can carry the full changed set; page the response instead of chunking the request.

### How Each Kind of Change Surfaces

- **Created or updated** — the revision's `updated_at` moves, so the row appears in the delta. Hydrate and apply.
- **Withdrawn** — a status value on the same revision. The row reappears in the delta; apply the new status from `fields[]`.
- **Superseded (no workflow)** — a newer revision becomes latest. The prior revision is not rewritten, so it does **not** reappear in the delta. Infer supersession from the maximum `version` in the container (or `filters[document_collection_index_type]=latest_revisions`). `position_within_container` is a reorderable sort key and can diverge from sequential version.
- **Superseded (workflow conflict)** — if the prior revision had an active workflow and the submit supplied `termination_reason` and `terminated_revision_status_id`, the prior revision is written and reappears in the delta.
- **Recycled** — the row drops out of the main list with no tombstone. Confirm against [List Recycled Document Revisions](#list-recycled-document-revisions). Absence alone is not a deletion.

### Periodic Full Re-List

Do not treat the delta as self-sufficient. Run a periodic full enumeration (no `updated_at` filter) and set-difference against local state. That backstop covers revisions that missed a tight cursor because they were not yet in the search index, and it catches permission-scope drift. It is not the primary removal signal — use the recycled list for that.

Hold a **stable, broad permission scope** on the integration token. A permission change that hides a document looks identical to a recycle on the main list.

### Permission Scoping

How a withheld revision appears depends on the call:

| Call | What happens to a revision the token cannot see |
| --- | --- |
| Discovery list (no `id` / `ids` filter) | Omitted. No withheld-count signal. |
| Hydration (`POST .../selected_revisions`, or the list with `filters[id]` / `filters[ids]`) | Returned as a masked row: `permissions.allowed_actions` is `[]` and `download_url` is omitted. Use that shape to distinguish "masked" from "gone". |
| Any `view=ids_only` | Returned as a raw ID string. `ids_only` does not apply per-record permission masking. |

***

## Downloading a Revision

Full-record list, selected-revisions, and recycled-revisions responses include `download_url` when the caller has view access:

```
https://{host}/rest/v2.0/companies/{company_id}/projects/{project_id}/document_management/document_revisions/{document_revision_id}/download
```

GET that URL with the same OAuth 2.0 token. The service responds with HTTP 302 to a short-lived storage URL. Follow the redirect to retrieve the file bytes. Pass `no_redirect=true` to receive HTTP 200 with a JSON body instead of the 302.

`download_url` is never present on a `view=ids_only` response — hydrate first, then download. Masked hydration rows also omit it.

***

## Error Reference

Use the `reason_code` to drive error-handling logic. Treat `message` as human-readable context that should not be parsed programmatically. Multiple errors can appear in the same `details` array. 4xx errors share this envelope:

<details>
<summary class="collapseListTierOne">View example error response</summary>
<pre><code>{
  "error": {
    "code": "BAD_REQUEST",
    "message": "Bad Request",
    "details": [
      {
        "reason_code": "INVALID_PROPERTY",
        "message": "Per page must not exceed 100"
      }
    ]
  }
}</code></pre>
</details>

401 `INVALID_TOKEN`, 403 `ACCESS_DENIED`, and 500 `INTERNAL_ERROR` apply across Document Management V2 endpoints. Handle them globally — see [Standard API Errors]({{ site.url }}{{ site.baseurl }}{% link document_management_integration/document_management_technical_guide.md %}#standard-api-errors) in the Technical Guide. Rate limiting is enforced at the API gateway; see [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %}).

### List, Selected, and Recycled Revisions

| HTTP Status | Reason Code | Description | Resolution |
| --- | --- | --- | --- |
| 400 | `MISSING_REQUIRED_PROPERTY` | A required property is missing. On List Selected Document Revisions this is typically an omitted `ids` body field. | Send `ids` as a non-empty array of strings. |
| 400 | `INVALID_PROPERTY` | A query or body value failed validation — for example `per_page` above the ceiling for the current `view`, a non-numeric `page`, a literal empty `ids` array, or a non-string `ids` element. | Review the `details` array for the field and constraint that failed. |

***

## See Also

- [Choose an Authentication Method]({{ site.url }}{{ site.baseurl }}{% link oauth/oauth_choose_grant_type.md %})
- [Rate Limiting]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/rate_limiting.md %})
- [Filtering and Sorting on List Actions]({{ site.url }}{{ site.baseurl }}{% link tutorials/filtering_on_list_actions.md %})
- [Procore Support: Document Management](https://v2.support.procore.com/product-manuals/document-management-project)
