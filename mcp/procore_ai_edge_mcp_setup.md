---
permalink: /procore-ai-edge-mcp-setup
title: Procore AI Edge MCP Setup
layout: default
section_title: MCP Integration
sub_header: Connect your AI agent to Procore data in minutes using the hosted Procore AI Edge MCP server.
---

## Overview

The **Procore AI Edge MCP** is a hosted [Model Context Protocol](https://modelcontextprotocol.io/) server that gives AI agents — Cursor, Claude Code, or any MCP-compatible client — direct access to Procore project data. There is nothing to install or build. You point your agent at the server URL, provide your credentials as headers, and start calling tools.

**Available tools:**

| Tool | What it does |
|---|---|
| `procore_read` | Read-only access to any Procore domain — list, search, or get RFIs, submittals, observations, daily logs, drawings, meetings, and more |
| `procore_write` | Preview or execute a Procore mutation (create, update, delete, submit, approve, …) |
| `converse` | Open-ended multi-step queries spanning multiple Procore domains using natural language |
| `health` | Confirms the MCP server is reachable |
| `whoami` | Verifies your credentials and returns the resolved user / teamspace identity |

---

## Prerequisites

You need:

- A **Datagrid API key** (`dg_live_...`) — create one at **Settings → API Keys** in the [Datagrid web app](https://app.datagrid.com).
- Your **Datagrid Teamspace ID** — found in the Datagrid URL or **Settings → Workspace**.
- *(Recommended)* Your **Procore Company ID** and **Project ID**. You can discover these by calling `procore_read` with `objectType: "project"` after connecting.

> Procore credentials are managed by Datagrid. Your Datagrid admin connects Procore once via the Datagrid UI; all team members inherit it automatically. You never configure Procore credentials directly on the MCP server.

---

## Server Endpoints

The server is currently available in US zones. Use the endpoint matching your Procore environment:

| Zone | MCP endpoint |
|---|---|
| US01 | `https://procore-ai-edge-mcp.us01.rnd.procoretech.internal/mcp` |
| US02 | `https://procore-ai-edge-mcp.us02.rnd.procoretech.internal/mcp` |

---

## Connect Cursor

Open `~/.cursor/mcp.json` (create it if it does not exist) and add an entry:

```json
{
  "mcpServers": {
    "procore-ai-edge": {
      "url": "https://procore-ai-edge-mcp.us01.rnd.procoretech.internal/mcp",
      "headers": {
        "Authorization": "Bearer dg_live_...",
        "Datagrid-Teamspace": "<teamspace-uuid>",
        "procore-company-id": "<procore-company-id>",
        "procore-project-id": "<procore-project-id>"
      }
    }
  }
}
```

Reload Cursor's MCP integration (Cursor → Settings → MCP, or restart the window). You should see `health`, `whoami`, `converse`, `procore_read`, and `procore_write` listed.

---

## Connect Claude Code

Register the server with `claude mcp add`:

```bash
claude mcp add \
  --transport http \
  --header 'Authorization: Bearer dg_live_...' \
  --header 'Datagrid-Teamspace: <teamspace-uuid>' \
  --header 'procore-company-id: <procore-company-id>' \
  --header 'procore-project-id: <procore-project-id>' \
  procore-ai-edge \
  https://procore-ai-edge-mcp.us01.rnd.procoretech.internal/mcp
```

Restart the Claude Code session after adding the server. Verify with `/mcp` — you should see the five tools listed.

---

## Verify the Connection

Call `whoami` once to confirm your credentials are working:

```json
{
  "ok": true,
  "latencyMs": 142,
  "client": { "clientId": "procore-ai-edge-production-us01", "teamspaceId": "ts_..." },
  "datagrid": { "user_id": "usr_...", "current_teamspace_id": "ts_..." }
}
```

If `ok` is `false`, see [Troubleshooting](#troubleshooting).

---

## Using the Tools

### `procore_read` — read Procore data

Use this for any single-domain read. Pass `companyId` and `projectId` directly on the call, or rely on the defaults you set in the headers.

**List open RFIs:**
```json
{
  "objectType": "rfi",
  "operation": "list",
  "filters": { "status": "open" },
  "fields": ["id", "number", "subject", "status", "due_date"],
  "pageSize": 25
}
```

**Get a single submittal:**
```json
{
  "objectType": "submittal",
  "operation": "get",
  "id": "12345"
}
```

**Discover projects you have access to:**
```json
{
  "objectType": "project",
  "operation": "list",
  "fields": ["id", "name", "company_id"]
}
```

Common `objectType` values: `rfi`, `submittal`, `observation`, `daily_log`, `image`, `spec`, `drawing`, `meeting`, `inspection`, `punch_item`, `change_event`, `company`, `project`.

### `procore_write` — mutate Procore data

Calls are **preview-only by default** — no data is changed until you explicitly confirm. Use this to see what would happen before committing.

**Preview (default — safe to call anytime):**
```json
{
  "objectType": "rfi",
  "operation": "create",
  "goal": "Create an RFI about the HVAC riser clash on level 3.",
  "fields": {
    "title": "HVAC riser clash on level 3",
    "question": "Can the structural opening be adjusted?"
  }
}
```

**Execute (requires explicit confirmation):**
```json
{
  "objectType": "rfi",
  "operation": "create",
  "goal": "Create an RFI about the HVAC riser clash on level 3.",
  "fields": {
    "title": "HVAC riser clash on level 3",
    "question": "Can the structural opening be adjusted?"
  },
  "execute": true,
  "confirmation": {
    "confirmed": true,
    "idempotencyKey": "rfi-create-2026-06-02-abc123",
    "approvedBy": "user-approval",
    "reason": "User approved this write."
  }
}
```

### `converse` — multi-step natural language queries

Use this when a request spans multiple Procore domains or needs reasoning a single read cannot express:

```json
{
  "prompt": "Summarize the top three open submittals delaying the structural division, and link the affected RFIs."
}
```

Write actions are blocked by default. Pass `allowWriteActions: true` only when your workflow has its own approval gate.

---

## Procore Routing

Project-scoped tools require a Procore company ID. The server resolves it from (in order):

1. Per-call argument: `"companyId": "8"` on the tool call.
2. Request header: `procore-company-id` (set in your `mcp.json` / `claude mcp add` config).

If neither resolves, project-scoped calls fail with a clear error. If you don't know your IDs yet, run `procore_read` with `objectType: "project"` first — no routing needed for discovery calls.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `whoami` returns `ok: false`, `status: 401` | Invalid or missing API key | Check the `Authorization: Bearer dg_live_...` header |
| `whoami` returns a network error | Wrong server URL or network access issue | Confirm you're using the correct zone endpoint |
| `procore_read` fails with "no company id resolved" | Missing Procore routing | Add `procore-company-id` to headers or pass `companyId` on the call |
| Tools not listed in Cursor | `mcp.json` syntax error or wrong URL | Validate JSON and reload Cursor's MCP integration |
| Claude Code does not pick up config changes | Config is read at session start | Restart the Claude Code session |
