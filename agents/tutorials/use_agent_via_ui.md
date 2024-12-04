---
permalink: /agents/tutorials/use_agent_via_ui
title: Direct Agent API call via Procore UI
layout: default
section_title: Agents
---

## Introduction

As a way to use the Agent from Procore UI we can make direct Agent API call. For this approach, the definition of `manifest.yaml` is required.

## Use case

If your logic doesn't require communication with the Agent via Copilot Sidepanel and applying changes via Integration Events you can call the Agent API directly from the Procore UI. As an example, you have an Agent for providing list of recommended options for your select input, in this case you can receive the list via the API call.

## How to use

First step:

Define `manifest.yaml` and Agent Actions based on [Manifest Schema](../schema.md)

Second step:

In Procore UI add next changes

```javascript
  // The predefined input structure that agent should receive 
  const body = {
    input: {
      input_value: ''
    }
  };

  try {
    const response = await httpPost(
      `/rest/v1.0/copilot/manifest_name/agents/agent_name?params=${params}`,
      body
    );

    // Apply response with predefined output structure
  } catch (e) {
    // Apply error if needed
  }
```
