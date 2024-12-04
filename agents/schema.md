---
permalink: /agents/schema
title: Agents Manifest Schema
layout: default
section_title: Agents
---

For contribution of the Procore Agents, Copilot defines a manifest to declare Agents. This document describes schema.

## Manifest Schema

```yaml
name: rfis # name of the manifest, we also use it as a namespace
name_for_human: "RFI Agents" # Optional readable name of the manifest
metadata: {} # Arbitrary metadata

# Each manifest can contain multiple agents
agents:
  - # Name is the main identifier of the Agent, this value should be URL friendly
    name: rfi_drafter

    # Description of the agent. This will be used by the Conversation Agent to help decide when to invoke this agent.
    description: "Drafts RFI fields based on input question"

    # Enable the agent in conversations. When true, this agent will be added to the list of agents that could be automatically invoked in the conversation flow.
    # Please be careful, enabling an agent in conversation could lead to unexpected behavior in Copilot SidePanel
    # Always request review by Copilot Team before enabling an agent in conversation
    enable_in_conversation: false

    # LLM Prompt for the Agent. Agent uses this prompt as a system prompt. 
    # Input values could be referenced with {field_name} syntax.
    prompt: |
      You are a contractor working for a construction company.

      ## Instructions
      - Based on question "{question}", please generate subject and question
      - Correct any grammar mistakes you find in the user's input
    
    # Type of the agent. Currently only 'prompt' type is supported
    type: prompt
    
    # Actions declare a way for user to continue interaction with the system. Actions can be interactive UI elements, such as buttons, or non-interactive UI actions that are automatically processed by the system itself. Action should be triggered only if condition in field "include_when" has been met. If action was generated, we pass its integration_event to MFE (if type == "action") or do some operation without additional user involvment (if type == "non-interactive").
    actions:
      - include_when: If the question and subject are generated successfully  # Instructions to LLM when to include this action in output and therefore in UI
        # Payload for the action
        action:
          title: Apply to RFI 
          id: apply_to_rfi 
          tooltip: Apply values to RFI 
          disabled_tooltip: This functionality only applies when you're in Create a New RFI page. 
          icon: apply.svg
          type: action
          supported_urls: ['tools/rfis/create']
          # integration_event indicates that action should trigger Integration Event
          integration_event:
            data: # Payload for event, that would be sent to MFE
              subject: guessed subject
              question: guessed question
            metadata:
              type: copilot:apply_to_rfi

    # JSON Schema that defines input of the Agent. Fields of the input schema could be used in the prompt with {field_name} syntax.
    # When Agent is exposed to the Conversation Agent, Conversation Agent will automatically fill in values of the `input_schema` based on the user input, history, page context, etc
    input_schema:
      type: object
      description: "Input schema for RFI drafting agent"
      title: "RFI Drafting Input"
      required:
        - question
      properties:
        question:
          # Description of the property, this description would be used by Conversation Agent to understand value
          # You can include expectations for the value here
          description: "RFI question provided by user; if input does not contain RFI question, values must be empty"
          type: string

    # Optional JSON Schema for output for the agent. If not defined, Agent will respond with text.
    # Agents uses this schema to define structured output for Agent LLM, so all descriptions and values would affect output
    # It is recommended to give as much descriptive information as possible with examples, constraints and instructions
    output_schema:
      type: object
      description: "Output schema for RFI drafting agent"
      title: "RFI Drafting Output"
      properties:
        draft_values:
          # Description of the property, as with other fields, will be used by Agent LLM to generate the value
          description: "Best guess draft values based on the inputs and field schema"
          type: object
          properties:
            subject:
              description: "Short, descriptive summary of user input question"
              type: string
            question:
              description: "Original question, with fixed grammatical errors and removed noise"
              type: string
        succeeded:
          description: "Indicates that generation of subject was successful"
          type: boolean
        summary:
          # Description of the property
          description: "Summary of generation. Intended for user review. If task is impossible, add reason here"
          type: string
    formatting_instructions: | # how conversation agent needs to format final response, text format, each field could have its own formatting rules, markdown rules only
      Apply italic format for output 

```

## References

- [Manifest Reference](./manifest_reference.md)
- [Manifest JSON Schema](./manifest.schema.json)

## Examples

- Good example is [RFI Drafter](../../services/copilot/contrib/rfis/manifest.yaml)
- Generic [examples](../../services/copilot/contrib/examples/manifest.yaml)
