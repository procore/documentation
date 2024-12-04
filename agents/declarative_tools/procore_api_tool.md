---
permalink: /agents/declarative_tools/procore_api_tool
title: Declarative Procore API Tool
layout: default
section_title: Agents
---

### Overview
The Procore API Tool enables seamless interaction with Procore API endpoints without the need to write Python boilerplate code.
This tool streamlines the process of making API requests to Procore by defining the required parameters and managing the execution of requests.

For the tool implementation in Python, refer to the [procore_api_tool.py](../../../services/copilot/agents/tools/declarative_tools/procore_api_tool.py).

### Tool Schema

The tool schema includes a unique field, openapi, alongside the default declarative tool fields.
This openapi field is used to define Procore API endpoints and their parameters.

The `openapi` field is a dictionary containing the following keys:
1. `spec`:
    - Can be either a `string` or a `dictionary`.
    - Depending on its type, the tool will use either the OpenAPI specification file path `(string)` or a manually defined specification `(dictionary)`.
    - See [Types of Schema Configuration](#types-of-schema-configuration) for more details.
2. `selector`: 
   - A dictionary for specifying the endpoint and HTTP method to be used, along with the operationId. The selector field includes:
       - `path`: A string specifying the endpoint path.
       - `method`: A string specifying the HTTP method.
       - `operation_id`: A string specifying the **"operationId"** of the endpoint.
   
   > Notes:
   > 1. The `selector.operation_id` has **higher priority** over `selector.path` and `selector.method` if both are provided.
   > 2. The `selector.operation_id` is **case-sensitive**.
   > 3. The `selector.operation_id` is optional if pair `selector.path` and `selector.method` are provided, and vice versa.

## Generic Schema
```yaml
name: <string>                 # Name of the tool - example: Procore API Tool
description: <string>          # Description of the tool
type: procore_api
openapi:                       # OpenAPI configuration - uniq own field for Procore API Tool
  spec: <string> | <dict>      # OpenAPI spec file or manual definition. Example: path/to/openapi.yaml
  selector:                    # Selector for endpoint
    path: <string>             # Endpoint path - example: /rest/v1.0/projects
    method: <string>           # HTTP method - example: get, post, put, delete ...
    operation_id: <string?     # OperationId of the endpoint - example: getProjects
```

### Types of Schema Configuration
The Procore API tool has two configuration schemas and a generic part of the tool.

1. Based on openapi specification file.
> **IMPORTANT**: The OpenAPI specification file must be located in the agent contrib folder.

* Selecting endpoint by `operationId` from the OpenAPI specification file
```yaml
name: <string>
description: <string>
type: procore_api
openapi:
  spec: path/to/openapi.yaml  # supported formats: .yaml, .json
  selector:
    operation_id: <string>
```

* Selecting endpoint by `path` and `method` from the OpenAPI specification file
```yaml
name: <string>
description: <string>
type: procore_api
openapi:
  spec: path/to/openapi.yaml  # supported formats: .yaml, .json
  selector:
    path: <string>            # url path - example: /rest/v1.0/projects
    method: <string>          # HTTP method - example: get, post, put, delete ...
```

2. Based on manual api specification definition.
```yaml
name: <string>
description: <string>
type: procore_api
openapi:
  spec: 
    path: <string>      # url path - example: /rest/v1.0/projects
    method: <string>    # HTTP method - example: get, post, put, delete ...
    parameters: <dict>  # [optional] - global parameters for the endpoint
    api_schema: <dict>  # [optional] - schema for the API endpoint
```

### Examples
1. Example of the Procore API tool configuration to extract project metadata based on `openapi.json` file.
```yaml
name: procore_project_metadata
description: Tool for extracting project metadata from the Procore API based on authorized user.
type: procore_api
openapi:
  spec: openapi.json
  selector:
    method: get
    path: /rest/v1.0/projects/{project_id}/configuration
```

2. Example of the Procore API tool configuration to extract company configuration based on `openapi.json` file and `operationId`.
```yaml
name: company_config
description: |
   Tool getting information about the company configuration.
   Use this tool when you need to get information about company configuration.
type: procore_api
openapi:
  spec: openapi_specs/company.json
  selector:
    operation_id: getCompanyConfiguration
```

3. Example of the Procore API tool configuration to extract authorized user data based on manual definition and without `api_shema` field. 
```yaml
name: authorized_user_data
description: Tool for extracting authorized user data from the Procore API.
type: procore_api
openapi:
  spec:
    path: /rest/v2.0/me      # key field
    method: get              # key field
    parameters:              # key field
      - name: company_id
        in: query
        description: Unique identifier for the company. You must supply either a company_id
          or project_id in order for a name to be returned.
        required: false
        schema:
          - name: company_id
            in: query
            description: Unique identifier for the company. You must supply either a company_id
              or project_id in order for a name to be returned.
            required: false
            schema:
              type: string
          - name: project_id
            in: query
            description: Unique identifier for the project. You must supply either a company_id
              or project_id in order for a name to be returned.
            required: false
            schema:
              type: string
```

4. Example of the Procore API tool configuration to create Procore API user agent configuration based on manual definition.
```yaml
name: authorized_user_data
description: Tool for extracting authorized user data from the Procore API.
type: procore_api
openapi:
  spec:
    path: /rest/v1.0/internal/migrate_agent               # key field
    method: post                                          # key field
    parameters:                                           # key field
       - name: company_id
         in: query
         description: Unique identifier for the company.
         required: true
         schema:
          type: integer
    api_schema:                                            # key field
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required:
                - agent
              properties:
                agent:
                  type: object
                  properties:
                    email_address:
                      type: string
                      format: email
                    first_name:
                      type: string
                    last_name:
                      type: string
                    implementation_manager_origin_id:
                      type: integer
                  required:
                    - email_address
                    - first_name
                    - last_name
```