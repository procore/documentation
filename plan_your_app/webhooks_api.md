---
permalink: /webhooks-api
title: Using the Webhooks API
sub_header: Quick start to creating hooks, adding triggers, and monitoring deliveries.
layout: default
section_title: Webhooks
---

## Overview

Use the Webhooks API to programmatically create and manage webhook configuration in Procore. You’ll create a **hook** (the endpoint + scope) and then add one or more **triggers** (the resources and events you care about). Finally, you can review recent **deliveries** for troubleshooting.

This guide is a quick start with light best practices. It intentionally avoids UI comparisons and deep background so you can set things up fast.
<br><br>

***
## Before You Start

- You have API access and a valid access token.
- Decide your scope: **company** (`company_id`) or **project** (`project_id`). Use one or the other per request.
- Your notification endpoint accepts HTTPS `POST` requests and returns a `2xx` status when it successfully receives an event.
- Plan to handle retries and duplicate deliveries (design idempotent processing).

### Endpoints
- **Hooks** — <a target="_blank" href="https://developers.procore.com/reference/rest/hooks?version=latest">Hook Endpoints</a>
- **Triggers** — <a target="_blank" href="https://developers.procore.com/reference/rest/triggers?version=latest">Trigger Endpoints</a>
- **Deliveries** — <a target="_blank" href="https://developers.procore.com/reference/rest/deliveries?version=latest">Delivery Endpoints</a>
<br><br>

***
## 1) Create a Hook

Create a hook for the company **or** project you want to receive events from.

**Endpoint**: `POST /rest/v1.0/webhooks/hooks`

**Example — company-level hook**

```json
{
  "company_id": 5358233,
  "hook": {
    "api_version": "v2",
    "namespace": "your-integration-name",
    "destination_url": "https://webhooks.yourdomain.com/events",
    "destination_headers": {
      "Authorization": "Bearer <token>"
    }
  }
}
```

**Example — project-level hook**

```json
{
  "project_id": 9876543,
  "hook": {
    "api_version": "v2",
    "namespace": "your-integration-name",
    "destination_url": "https://webhooks.yourdomain.com/events",
    "destination_headers": {
      "Authorization": "Bearer <token>"
    }
  }
}
```

> Tip: Keep `destination_headers` minimal and do **not** log secrets. Rotate tokens periodically.
<div class="details-bottom-spacing"></div>

***
## 2) Add Triggers

Triggers define which resource events should generate webhooks.

**Endpoint**: `POST /rest/v1.0/webhooks/hooks/{hook_id}/triggers`

**Body** must include `api_version` and a `trigger` object with `resource_name` and `event_type` (`create`, `update`, or `delete`).

**Example — add a trigger**

```json
{
  "company_id": 5358233,
  "api_version": "v2",
  "trigger": {
    "resource_name": "Company Users",
    "event_type": "update"
  }
}
```

**Finding resource names**

- Use the Webhook Resources list or the downloadable CSV to look up valid `resource_name` values.
- Only add the triggers you need to reduce noise and processing.
<br><br>

***
## 3) Monitor Deliveries

Use deliveries to see what Procore sent to your endpoint and how your endpoint responded.

**Endpoint**: `GET /rest/v1.0/webhooks/hooks/{hook_id}/deliveries`

**Query parameters**

- `company_id` or `project_id` — matches the hook’s scope
- `filter[status]` — `any` (default), `successful`, `discarded`, or `failing`

**Example — list failing deliveries**

```bash
curl -H "Authorization: Bearer <ACCESS_TOKEN>" -H "Procore-Company-Id: 987654" \
  "https://api.procore.com/rest/v1.0/webhooks/hooks/12345/deliveries?company_id=987654&filter[status]=failing"
```

**Useful delivery fields**

- `response_status`, `response_headers`, `response_error`, `response_body`
- `outcome`: `ok`, `discarded`, `retried`, or `failed`
- `event`: includes `id`, `timestamp`, `resource_name`, `resource_id`, `event_type`, `company_id`, `project_id`, and `api_version`
<br><br>

***
## Best Practices

- **Start small**: enable webhooks in a sandbox, then one project/company before scaling.
- **Return fast**: respond `2xx` quickly and process work asynchronously to avoid timeouts.
- **Be idempotent**: dedupe/retry safely using the event `id` (or ULID) and your own keys.
- **Filter your own changes**: use event metadata (e.g., `source_user_id` or `source_application_id`) to avoid loops from your integration.
- **Secure the endpoint**: HTTPS only, rotate secrets, and verify the `Authorization` header.
- **Log and alert**: monitor failing deliveries and error spikes.
- **Limit triggers**: subscribe only to resources/events you actually need.

### Namespaces (Required)

Namespaces isolate your app’s hooks and triggers from others.

- Allowed characters: lowercase `a–z`, digits `0–9`, and dashes `-`.
- Use **one unique namespace per app/integration** across all companies and projects.
- Keep it consistent and simple (e.g., `acme-invoice-sync`).

### Timeouts (Recommendation)

In order to ensure that you do not receive multiple notifications, it is recommended that your service sends back the '2xx' response as soon as possible after receiving the notification, and perform any required processing of the webhook asynchronously. The timeout window on the Procore side is **5 seconds** (once a successful connection is established) before the request fails.
<br><br>

***
## Troubleshooting

- Nothing arriving? Confirm you created both a **hook** and at least one **trigger** in the **same scope** (company vs project) and API version.
- Seeing loops? Filter out events initiated by your service account or app using event metadata.
- Many failures? Inspect delivery `response_status` and `response_error`, confirm your endpoint returns `2xx` on success, and that secrets/URLs are correct.
- Wrong data? Double‑check `resource_name` values and your `api_version`.