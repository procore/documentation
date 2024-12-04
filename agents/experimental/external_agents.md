---
permalink: /agents/experimental/external_agents
title: External Agents
layout: default
section_title: Agents
---

External agents, is a mechanism to register Agents implemented outside of the Copilot System.

Currently, simple HTTP request based agents are supported. In feature versions, external Agents will support streaming, human in loop, events, etc.

## Declaration

```yaml
name: example_experimental_external_agent
name_for_human: Example Experimental External Agents
metadata: {}

agents:
  - name: haiku
    enable_in_conversation: false
    type: experimental_external_agent
    # Description would be used for intent classification
    description: Writes a haiku
    # Endpoint that accepts POST request and respond with JSON
    invoke_url: "/rest/v1.0/most-simple-agent/{company_id}/invoke"
    input_schema:
      properties:
        topic:
          type: string
          description: The topic of the haiku
    output_schema:
      type: object
      properties:
        haiku:
          type: string
          description: The haiku
        topic:
          type: string
          description: The topic of the haiku
```

## Requirements for External Agent

In this version, requirements for external agents are:

- Endpoint should implement passport authentication
- Endpoint should accept POST request
- Body of the request should be JSON, with at least single `input` field
- Response should be JSON, with at least single `output` field


## Input and Output Schema

```json
{
  "input": {
    "topic": "Nature"
  },
  "meta": {
    "foo": "bar" 
  }
}
```

```json
{
  "output": {
    "haiku": "An old silent pond...",
    "topic": "Nature"
  }
}
```

## Examples

- [Simple External Agent](../../../services/copilot/contrib_examples/example_experimental_external_agent)
- [Simple External Agent Service(Python)](../../../services/copilot/contrib_examples/example_experimental_external_agent/most-simple-agent)
