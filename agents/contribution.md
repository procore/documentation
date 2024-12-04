---
permalink: /agents/contribution
title: Agents Contribution Guide
layout: default
section_title: Agents
---

> [!IMPORTANT] 
> This document is for work in progress version of Procore Agents. Agents is under active development.


This document describes process of contributions via Pull Requests.


## Things to know first

- [ADR](../adrs/0008-copilot-agents.md) - initial ADR
- Examples of agents are located in [`examples`](./services/copilot/contrib/examples) folder, also [`rfis`](../../services/copilot/contrib/rfis) is good one

### Pre-requisites

- Access to copilot repository
- `copilot-service` development environment [setup](./dev_env.md)
- Access to Langfuse

## Contribution

> [!IMPORTANT] 
> Please avoid `enable_in_conversation: true` for now, as it is under active development and not ready for contribution.

1. Create PR with your agent into `./services/copilot/contrib/` folder, take `rfis` or `examples` as an example
2. Test your agent in your local dev environment, please include screenshots of outputs into PR description
3. If needed, test your agent in [Tugboat environment](https://tugboat.procoretech-qa.com/), use this [instructions](https://procoretech.atlassian.net/wiki/spaces/PLATFORM/pages/2927951935/How+to+Spin+up+a+Tugboat+Instance+of+Monoloith+with+Copilot)

## Evaluation

We are working on the process of the evaluation, for now, please include proof of the evaluation into PR description.

## Observability

[Staging](https://langfuse.application.staging.procoretech-qa.com/), [PROD](https://langfuse.us01.production.procoretech.com/)

## Deployment

Once you PR is approved (at least two approvals are needed), please merge it into `main` branch (make sure your branch is up-to-date with `main`). This will trigger deployment of your agent into staging and all productions.