---
permalink: /contentful-integration-in-assist
title: Contentful integration into Assist
layout: default
section_title: Contentful API Integration
---

## Overview

This document describes the Contentful Content Delivery API (CDA) integration, which provides access to content stored in Contentful.

The overall documentation for Contentful can be found [here](https://www.contentful.com/developers/docs/references/content-delivery-api/#/introduction).

## General Contentful API Client

The client is configured via environment variables (the values can be found [here](https://github.com/procore/copilot/blob/main/services/copilot/env.sample)):

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_HOST=https://cdn.contentful.com
CONTENTFUL_ENVIRONMENT=master  # defaults to "master"
```

The default [content_type](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters) for the Assist is `copilotSampleQuestions`.

The locale name styling can be found [here](https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/locales).

## API Endpoints

### Get Copilot Sample Questions

```http
GET /rest/v1.0/copilot/conversations/sample-questions
```

Fetches random `limit` sample questions for the copilot interface.

**Parameters:**

- `locale` (string): Content locale (default: "en-US")
- `limit` (integer): Maximum number of entries to return (default: 3)

**Response:**

```json
{
  "items": [
    "How do I create a project?",
    "What is an RFI?"
  ]
}
```

**Note:** The current implementation only provides the sample questions endpoint. 

### Copilot Usage Examples

#### HTTP Requests

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5067/rest/v1.0/copilot/conversations/sample-questions?company_id=123&project_id=456"

# Get sample questions with specific locale and limit
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:5067/rest/v1.0/copilot/conversations/sample-questions?company_id=123&project_id=456&locale=en-US&limit=5"
```

#### Python Service Usage

```python
from copilot.utils.sample_questions_service import SampleQuestionsService


service = SampleQuestionsService()

questions = await service.get_copilot_sample_questions(
    locale="en-US",
    limit=5
)
```
