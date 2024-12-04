---
permalink: /agents/manifest_reference
title: Manifest Reference
layout: default
section_title: Agents
---

Manifest for a declarative definition of Agents, Tools, etc. It serves as a namespace for the agents and tools

### Examples

```yaml
agents:
- description: Tells potentially unfunny dad jokes for the given topic
  enable_in_conversation: false
  input_schema:
    description: Input schema for dad jokes agent
    properties:
      topic:
        description: Joke topic
        type: string
    title: Input schema
    type: object
  name: dad_jokes
  output_schema:
    description: Output schema for dad jokes agent
    properties:
      joke:
        description: Dad joke about the topic
        type: string
      topic:
        description: Joke topic
        type: string
    title: Output schema
    type: object
  prompt: You are funny assistant, tell a dad joke about {topic}
  type: prompt
name: examples
name_for_human: Examples
tools:
- description: Tool for extracting project metadata from the API call based on authorized
    user. Use this tool when you need any project metadata.
  name: project_metadata_tool
  openapi:
    selector:
      method: get
      operation_id: getProjectMetadata
      path: /rest/v1.1/companies/{company_id}/projects/{project_id}/search
    spec: openapi.json
  tags:
  - project_metadata_tool:procore_api
  type: procore_api

```

```yaml
agents:
- description: Drafts RFI fields based on input question
  enable_in_conversation: true
  input_schema:
    properties:
      question:
        description: RFI question provided by user, if input does not contain RFI
          question, value must be empty
        type: string
    required:
    - question
    type: object
  name: rfi_drafter
  output_schema:
    properties:
      draft_values:
        description: Best guess draft values based on the inputs and field schema
        properties:
          question:
            description: Field value
            properties:
              confidence_score:
                description: Confidence score from 0 to 1 for the field value
                type: string
              reason:
                description: Reason for the field value and sources
                type: string
              value:
                description: Draft value
                type: string
            type: object
          subject:
            description: Short, descriptive summary of user input question
            properties:
              confidence_score:
                description: Confidence score from 0 to 1 for the field value
                type: string
              reason:
                description: Reason for the field value and sources
                type: string
              value:
                description: Draft value
                type: string
            type: object
        type: object
      recommendations:
        description: Recommendations on how the RFI question could be improved
        type: string
      require_more_information:
        description: Indicates that more information is required to generate a subject
        type: boolean
      succeeded:
        description: Indicates that generation of subject was successful
        type: boolean
      summary:
        description: Summary of generation. Intended for user review. If task is impossible
          add reason here
        type: string
    type: object
  prompt: 'You are a contractor working for a construction company.


    ## Instructions

    - Based on question "{question}", please generate subject and question

    - Correct any grammar mistakes into user''s input you found

    '
  type: prompt
metadata: {}
name: rfis
name_for_human: RFI Agents

```

### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| name | `string` | ✅ | [`^[a-z0-9-_]+$`](https://regex101.com/?regex=%5E%5Ba-z0-9-_%5D%2B%24) |  |  | Name of the manifest, it used as namespace for Agents, Tools, etc. This value should URL friendly allowing lower case letters, digits and "-". | ```rfis```, ```core```, ```search``` |
| name_for_human | `string` |  | string |  |  | Optional readable name of the manifest | ```RFI Agents```, ```Core Tools``` |
| metadata | `object` |  | object |  |  | Arbitrary metadata for the manifest |  |
| tools_definitions | `array` |  | [DeclarativeToolDefinition](#declarativetooldefinition) or [ProcoreApiToolDefinition](#procoreapitooldefinition) |  |  | List of declarative tools definitions. Each item is a subclass of DeclarativeToolDefinition. |  |
| agents | `array` |  | [ExperimentalExternalAgentDefinition](#experimentalexternalagentdefinition) or [PromptAgentDefinition](#promptagentdefinition) |  |  | List of declarative agents |  |


---

# Definitions

## ActionDefinition

No description provided for this model.

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| include_when | `string` | ✅ | string |  |  |  |  |
| action | `object` | ✅ | [AgentAction](#agentaction) |  |  |  |  |

## AgentAction

No description provided for this model.

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| title | `string` | ✅ | string |  |  |  |  |
| id | `string` | ✅ | string |  |  | The unique ID of action, this would be used by integrations to implement functionality |  |
| integration_event | `object` | ✅ | [IntegrationEvent](#integrationevent) |  |  |  |  |
| tooltip | `string` |  | string |  |  | Human readable description, clients might decide to render as tooltip when button is active |  |
| disabled_tooltip | `string` |  | string |  |  | Human readable description, clients might decide to render as tooltip when button is disabled |  |
| type | `string` or `null` |  | string |  | `"action"` | Interactive action, could be rendered to user as button |  |
| icon | `string` |  | string |  |  | Icon to be rendered by client |  |
| supported_urls | `array` |  | string |  |  | webpage url patterns where interactive action (button) should be active |  |

## AgentJSONProperty

Represents a JSONSchema property for JSONSchema flavour for an agent input or output

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| description | `string` |  | string |  |  | Description of the property |  |
| type | `string` |  | string |  | `"string"` | JSONSchema Type of the property | ```string```, ```number```, ```list``` |
| item_type | `string` |  | string |  |  | For list type JSONSchema Type of the item | ```string```, ```number``` |
| additionalProperties | `object` |  | [DynamicField](#dynamicfield) |  |  | For object type additional properties |  |

## AgentJSONSchema

Represents a JSONSchema subset for an agent input or output

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| title | `string` |  | string |  |  | Title of the schema | ```RFI Drafting Input``` |
| description | `string` |  | string |  |  | Description of the schema | ```Input schema for RFI drafting agent``` |
| type | `string` |  | string |  | `"object"` | Type of the schema | ```object``` |
| properties | `object` |  | [AgentJSONProperty](#agentjsonproperty) |  |  |  | ```{'assignees': {'description': 'Users or their Roles to be assigned to answer the RFI. The field can be empty.', 'type': 'string'}, 'attachments': {'description': 'List of question attachments. The field can be empty', 'item_type': 'string', 'type': 'list'}, 'question': {'description': 'Question for which RFI is to be drafted', 'type': 'string'}}``` |
| required | `array` |  | string |  |  | List of required properties. This would be validated automatically by the Agent engine. |  |

## DeclarativeToolDefinition

Agent with a single prompt

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| name | `string` | ✅ | [`^[a-z0-9-_]+$`](https://regex101.com/?regex=%5E%5Ba-z0-9-_%5D%2B%24) |  |  | Name of the tool, it is used to reference the declarative tool. This value should be URL-friendly, allowing lowercase letters, digits, "-" and "_". | ```get_project_metadata```, ```procore_config_data``` |
| description | `string` | ✅ | string |  |  | Detailed description of what this tool is useful for. This will help the Conversation Agent decide when to invoke this tool. | ```Tool for extracting project metadata from the API call based on an authorized user. Use this tool when you need any project metadata.``` |
| type | `string` | ✅ | `unknown` |  |  | Declarative tool type. | ```procore_api```, ```procore_api``` |
| tags | `array` |  | string |  |  | List of tags for the tool. |  |

## DynamicField

Allows extra fields

#### Type: `object`

## ExperimentalExternalAgentDefinition

Defines configuration of the external Agent

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| name | `string` | ✅ | [`^[a-z0-9-_]+$`](https://regex101.com/?regex=%5E%5Ba-z0-9-_%5D%2B%24) |  |  | Name of the agent, it used to reference Agent. This value should URL friendly allowing lower case letters, digits, "-" and "_". | ```rfi_drafter``` |
| type | `string` | ✅ | `experimental_external_agent` |  |  |  |  |
| description | `string` | ✅ | string |  |  | Description of the agent. This will be used by the Conversation Agent to help decide when to invoke this agent. | ```Drafts RFI fields based on input question and attachments``` |
| input_schema | `object` | ✅ | [AgentJSONSchema](#agentjsonschema) |  |  | JSON Schema that defines input of the Agent. Fields of the input schema, could be use in prompt with {field_name} syntax. NOTE: Only first level of properties are supported. |  |
| invoke_url | `string` | ✅ | string |  |  | URL which accepts POST request with JSON body, with input and mata fields |  |
| enable_in_conversation | `boolean` |  | boolean |  |  | Enable the agent in the conversation. When true this agent will be added to the list of agents that could be automatically invoked in the conversation flow. __Important__: This could affect intent routing issues in Copilot and Copilot SidePanel. Please do not enable this without prior consulting with the Copilot Team. |  |
| query_examples | `array` |  | string |  |  | Examples of the queries that the agent can answer in conversation flows | ```For this question, please draft an RFI```, ```Create an RFI for for the following input: <question>```, ```What RFI would look like for the following input: <question>``` |
| output_schema | `object` |  | [AgentJSONSchema](#agentjsonschema) |  |  | Optional JSON Schema for output for the agent. If not defined, Agent will respond with text |  |
| formatting_instructions | `string` |  | string |  |  | Optional formatting instructions for the output where we have a field and rules to be applied. |  |
| max_request_size_kb | `integer` |  | integer |  | `10` | Maximum request size in KB. The maximum available size is 100kb |  |

## IntegrationEvent

No description provided for this model.

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| data | `object` | ✅ | object |  |  | Integration event data in form of arbitrary dictionary. MFE to use this data |  |
| metadata | `object` | ✅ | [Metadata](#metadata) |  |  |  |  |

## ManualOpenApiSpec

No description provided for this model.

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| path | `string` | ✅ | string |  |  | URL Path for request. | ```/rest/v1.1/companies/{company_id}/projects/{project_id}/search``` |
| method | `string` | ✅ | string |  |  | HTTP method that will be used for request. The field is not a case sensitive. | ```GET```, ```POST```, ```get```, ```post``` |
| api_schema | `object` |  | object |  |  | API schema. |  |
| parameters | `array` |  | object |  |  | Global route parameters. |  |

## Metadata

No description provided for this model.

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| type | `string` | ✅ | string |  |  | Identifier of the event type, so MFE can handle |  |

## OpenApiDefinition

Procore API tool OpenAPI definition

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| spec | `object` or `string` | ✅ | [ManualOpenApiSpec](#manualopenapispec) and/or string |  |  | OpenAPI specification file in either JSON or YAML format. |  |
| selector | `object` |  | [OpenApiSelector](#openapiselector) |  |  | OpenAPI selector for the Procore API tool. |  |

## OpenApiSelector

Procore API tool OpenAPI selector

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| operation_id | `string` |  | string |  |  | Operation ID ('operationId') for the OpenAPI selector. | ```getProjectMetadata```, ```getProjectConfigData``` |
| method | `string` |  | string |  |  | HTTP method for the OpenAPI selector. | ```GET```, ```POST``` |
| path | `string` |  | string |  |  | Path for the OpenAPI selector. | ```/projects```, ```/rest/v1.1/companies/{company_id}/projects/{project_id}/search``` |

## ProcoreApiToolDefinition

Procore API tool definition

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| name | `string` | ✅ | [`^[a-z0-9-_]+$`](https://regex101.com/?regex=%5E%5Ba-z0-9-_%5D%2B%24) |  |  | Name of the tool, it is used to reference the declarative tool. This value should be URL-friendly, allowing lowercase letters, digits, "-" and "_". | ```get_project_metadata```, ```procore_config_data``` |
| description | `string` | ✅ | string |  |  | Detailed description of what this tool is useful for. This will help the Conversation Agent decide when to invoke this tool. | ```Tool for extracting project metadata from the API call based on an authorized user. Use this tool when you need any project metadata.``` |
| openapi | `object` | ✅ | [OpenApiDefinition](#openapidefinition) |  |  | OpenAPI definition for the Procore API tool. |  |
| type | `string` |  | `procore_api` |  | `"procore_api"` |  |  |
| tags | `array` |  | string |  |  | List of tags for the tool. |  |

## PromptAgentDefinition

Defines configuration of the Prompt based Agent

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| name | `string` | ✅ | [`^[a-z0-9-_]+$`](https://regex101.com/?regex=%5E%5Ba-z0-9-_%5D%2B%24) |  |  | Name of the agent, it used to reference Agent. This value should URL friendly allowing lower case letters, digits, "-" and "_". | ```rfi_drafter``` |
| type | `string` | ✅ | `prompt` |  |  |  |  |
| description | `string` | ✅ | string |  |  | Description of the agent. This will be used by the Conversation Agent to help decide when to invoke this agent. | ```Drafts RFI fields based on input question and attachments``` |
| input_schema | `object` | ✅ | [AgentJSONSchema](#agentjsonschema) |  |  | JSON Schema that defines input of the Agent. Fields of the input schema, could be use in prompt with {field_name} syntax. NOTE: Only first level of properties are supported. |  |
| prompt | `string` | ✅ | string |  |  | LLM Prompt for the Agent. Agent uses this prompt as a system prompt. Input values could be referenced with {field_name} syntax. | ```Given user's input {question} and attachments, guess as much as possible output field values``` |
| enable_in_conversation | `boolean` |  | boolean |  |  | Enable the agent in the conversation. When true this agent will be added to the list of agents that could be automatically invoked in the conversation flow. __Important__: This could affect intent routing issues in Copilot and Copilot SidePanel. Please do not enable this without prior consulting with the Copilot Team. |  |
| query_examples | `array` |  | string |  |  | Examples of the queries that the agent can answer in conversation flows | ```For this question, please draft an RFI```, ```Create an RFI for for the following input: <question>```, ```What RFI would look like for the following input: <question>``` |
| output_schema | `object` |  | [AgentJSONSchema](#agentjsonschema) |  |  | Optional JSON Schema for output for the agent. If not defined, Agent will respond with text |  |
| formatting_instructions | `string` |  | string |  |  | Optional formatting instructions for the output where we have a field and rules to be applied. |  |
| max_request_size_kb | `integer` |  | integer |  | `10` | Maximum request size in KB. The maximum available size is 100kb |  |
| tools | `array` |  | [ToolReference](#toolreference) |  |  | Reference to the Tools that the Agent uses to generate the output. Under the hood Agent uses ReAct pattern to orchestrate the tools. | ```support/support_pages```, ```{'config': {'item_type': 'rfi'}, 'name': 'search/get_relevant_documents'}``` |
| actions | `array` |  | [ActionDefinition](#actiondefinition) |  |  | List of action used by the agent |  |

## ToolReference

Reference to the Tool to be used by the Agent

#### Type: `object`

| Property | Type | Required | Possible values | Deprecated | Default | Description | Examples |
| -------- | ---- | -------- | --------------- | ---------- | ------- | ----------- | -------- |
| name | `string` | ✅ | string |  |  | Full name of the tool in the format `<namespace>/<tool_name>` | ```search/get_relevant_documents```, ```example/project_metadata``` |
| config | `object` or `null` |  | object |  |  | Extra configuration for the tool. Schema of the configuration is defined by the tool, please refer to the specific tool documentation for more information. |  |


---

Markdown generated with [jsonschema-markdown](https://github.com/elisiariocouto/jsonschema-markdown).
