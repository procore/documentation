---
permalink: /webhook-fanout-migration
title: "Deprecation: Project Directory Update Webhooks"
sub_header: Procore will remove the update event type on Project Users and Project Vendors webhook triggers on June 30, 2026. Migrate to Company Directory webhooks before the cutoff.
layout: default
section_title: Announcements
---

## What is changing

Procore is deprecating the `update` event type on two webhook triggers: **Project Users** and **Project Vendors**. After **June 30, 2026**, these triggers stop delivering `update` events. Your app will no longer receive them.

The `create` and `delete` event types on these same triggers are **not affected**. All Company Directory webhook triggers are **not affected**.

| Resource | Event type | Status |
| --- | --- | --- |
| `Project Users` | `update` | Deprecated — removed June 30, 2026 |
| `Project Vendors` | `update` | Deprecated — removed June 30, 2026 |
| `Project Users` | `create`, `delete` | No change |
| `Project Vendors` | `create`, `delete` | No change |
| `Company Users` | `create`, `update`, `delete` | No change |
| `Company Vendors` | `create`, `update`, `delete` | No change |

<br><br>

***
## Why this is happening

Procore's Directory tool exists at two levels: Company and Project. When a contact record is updated in a Project Directory, here is what happens:

1. The change syncs up to the Company Directory.
2. The Company Directory pushes that update back down to every project the contact belongs to.
3. Each project-level sync fires a separate webhook event.

One edit to one contact produces one webhook event per project that contact is assigned to. A contact on 500 projects generates 500 events from a single field change. This applies to manual edits, bulk updates, CSV imports, and any integration that writes to the Directory tool.

### Why this matters for your integration

**Volume.** Event counts scale with project assignments. A company-wide safety officer on 2,000 projects generates 2,000 webhook events from one phone number change.

**Rate limiting.** High-volume fanout increases your risk of hitting Procore's webhook delivery rate limits.

**Feedback loops.** If your app receives a webhook and writes changes back to the Directory tool in response, you can amplify the fanout. Make sure your app distinguishes between changes it initiated and changes from Procore's internal sync.
<br><br>

***
## Timeline

| Date | What happens |
| --- | --- |
| April 2026 | Deprecation announced. Migration window begins. |
| April 2026 through June 30, 2026 | Both deprecated and replacement triggers deliver events. You can run old and new subscriptions in parallel. |
| June 30, 2026 | Hard cutoff. The deprecated triggers stop delivering `update` events permanently. |

<br><br>

***
## How to tell if your app is affected

Check whether your app subscribes to either of these trigger and event type combinations:

- `Project Users` with the `update` event type
- `Project Vendors` with the `update` event type

You can review your subscriptions in the Developer Portal under your app's webhook configuration, or query the <a href="https://developers.procore.com/reference/rest/v1/webhooks" target="_blank">Webhooks API</a>.

If your app only uses `create` or `delete` event types on these triggers, no migration is needed.
<br><br>

***
## Migration steps

### Step 1: Subscribe to Company Directory webhooks

Replace your project-level update subscriptions with Company Directory equivalents:

| Instead of | Subscribe to |
| --- | --- |
| `Project Users` → `update` | `Company Users` → `update` |
| `Project Vendors` → `update` | `Company Vendors` → `update` |

Company Directory webhooks deliver one event per actual contact change. No fanout.

### Step 2: Update your event handling logic

Company Directory events do not include a `project_id`. The change applies at the company level, not to a specific project. If your integration needs to know which projects a contact belongs to after processing an update, call the <a href="https://developers.procore.com/reference/rest/project-assignments?version=latest" target="_blank">Project Assignments</a> endpoint.

### Step 3: Test in a sandbox

Before June 30, 2026:

1. Set up Company Directory webhook subscriptions in a sandbox environment.
2. Edit a contact record and verify you receive a single event, not one per project.
3. Confirm your handler processes the Company Directory payload format correctly.
4. If your integration needs project-level context, verify the project lookup API calls return the expected data.

### Step 4: Remove deprecated subscriptions

Once you have validated the new subscriptions:

1. Remove your `Project Users` → `update` subscription.
2. Remove your `Project Vendors` → `update` subscription.
3. Deploy your updated event handler.

**Running both subscriptions in parallel?** If you keep old and new subscriptions active at the same time during cutover, you may receive duplicate events for the same change. Deduplicate by keying on `resource_id` + `event_triggered_at` and discarding events you have already processed.
<br><br>

***
## Quick reference

| Trigger level | Fanout risk | Recommendation |
| --- | --- | --- |
| Company Directory (`update`) | None | Use this for contact-level changes |
| Project Directory (`update`) | High | Migrate away — removed June 30, 2026 |
| Project Directory (`create`, `delete`) | None | Keep. These represent real project-level actions. |

<br><br>

***
## Frequently asked questions

**Will my existing subscriptions break immediately?**
No. The deprecated triggers continue to deliver events until June 30, 2026. You have a migration window to transition.

**What if I need to know which project triggered the update?**
Company Directory events do not include a `project_id` because the change is company-wide, not project-specific. See Step 2 for how to look up project assignments after receiving an event.

**Do I need to recreate all my webhook subscriptions?**
Only the ones using `Project Users` → `update` and `Project Vendors` → `update`. All other subscriptions are unaffected.

**What if I subscribe to both Company and Project Directory webhooks during migration?**
You will receive events from both until you remove the deprecated subscriptions. See the note at the end of the migration steps for how to deduplicate.
<br><br>

***
{% include need_help_section.md %}
