---
permalink: /payload-formats
title: Webhooks Payload Formats
layout: default
section_title: Webhooks
---

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/documentation/webhooks" />
  </head>
  <body>
    <p>If you are not redirected, <a href="/documentation/webhooks">click here</a>.</p>
  </body>
</html>

<!-- ## Payload Format

When creating and configuring a webhook, a user must select a payload format for event deliveries.  In the existing v1.0 versions of the webhooks APIs, this was referred to as api_version. However, in future versions of the API, it will be renamed to payload_version to more accurately reflect the impact this setting has. The payload version determines the schema used when delivering webhook events. The following sections provide a description of each version so that users can determine which option is best for their specific needs.

### Version v2.0
This is our legacy payload format and will generally be the format utilized for all existing webhook deliveries:

```
{
 "id": 123456789,
 "ulid": "0A1B2C3D4F5G6H7I8J9K0LMN",
 "timestamp": "2025-02-06T23:34:12.246562Z",
 "metadata": {
 "source_user_id": 987654321,
 "source_project_id": 2468013579,
 "source_operation_id": null,
 "source_company_id": 1357908642,
 "source_application_id": null
 },
 "user_id": 987654321,
 "company_id": 1357908642,
 "project_id": 2468013579,
 "api_version": "v2.0",
 "event_type": "update",
 "resource_name": "RFIs",
 "resource_id": 54321
}
```

### Version v3.0
A minor alteration was implemented in version 3.0 - the addition of a 'related_resources' array within the payload. The 'related_resources' array is generally empty; however, specific line item resources will include a related object. This encompasses Purchase Order Contracts, Work Order Contracts, Prime Contracts, Direct Costs, and Potential Change Orders. Please reference the example provided below for Direct Cost Line Items:

```
{
 "id": 123456789,
 "ulid": "0A1B2C3D4F5G6H7I8J9K0LMN",
 "timestamp": "2025-02-06T23:34:12.246562Z",
 "metadata": {
 "source_user_id": 987654321,
 "source_project_id": 2468013579,
 "source_operation_id": null,
 "source_company_id": 1357908642,
 "source_application_id": null
 },
 "user_id": 987654321,
 "company_id": 1357908642,
 "project_id": 2468013579,
 "api_version": "v3.0",
 "event_type": "update",
 "resource_name": "RFIs",
 "resource_id": 54321,
 "resource_name": "Direct Cost Line Items",
  "resource_id": 379913,
  "related_resources": [
    {
      "id": 1234,
      "name": "Direct Costs"
    }
  ]
}
```

### Version v4.0
Webhook payload v4.0 has undergone significant changes, including a simplified schema and alterations to the types of certain keys. Notably, all IDs, including resource_id, are now strings. The event_type key has been renamed to "reason" and now encompasses a wider range of events beyond create, update, and delete. Furthermore, hooks configured with payload version v4.0 will support additional resource types that were not available in versions v2.0 or v3.0.  A sample payload is provided to assist with migration.

```
{
  "id": "01JMYXMZRBVKK0PC6XS8SA4QRE",
  "timestamp": "2025-02-25T16:04:43.619085Z",
  "reason": "update",
  "company_id": "8",
  "project_id": "6778",
  "user_id": "5447",
  "resource_type": "Direct Cost Line Items",
  "resource_id": "379913"
}
```
In the future, we may add an additional ```data``` object to store additional details or context relevant to the event.  Please plan accordingly as you write your code because these changes will be considered additive and non-breaking.  Here is a JSON schema for our webhooks v4.0 payloads:

```
json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    },
    "reason": {
      "type": "string"
    },
    "company_id": {
      "type": "string"
    },
    "project_id": {
      "type": "string"
    },
    "user_id": {
      "type": "string"
    },
    "resource_type": {
      "type": "string"
    },
    "resource_id": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "additionalProperties": true
    }
  },
  "required": ["id", "timestamp", "reason", "company_id", "project_id", "user_id", "resource_type", "resource_id"]
}
```  -->
