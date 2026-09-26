---
permalink: /design-a-high-quality-agent
title: Design a High-Quality Agent
sub_header: Choose the right workflow, design Tools an Agent can actually use, and write instructions that make it behave predictably.
layout: default
section_title: Reference
---

## Overview
{% include agentic_closed_beta.md %}

[Building Agentic Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_agentic_apps.md %}) covers the mechanics — which components to add and which fields to fill. This page covers the judgment: what makes an Agent worth building, and what makes it reliable once it is.

Aim your first Agent at one target. **One workflow, one customer role, answers that cite records, and a set of natural questions it answers correctly and consistently.**

If you already have a working Agent, start with the testing and diagnosis sections and use the rest to fix what they turn up.
<br><br>

***
## Start With the Customer Problem
Answer four questions before you build anything.

- **Who has this problem?** Name the role — project engineer, superintendent, project accountant.
- **How often does it happen, and what does it cost today?** Estimate it in hours, rework, or delays.
- **Where does the data live?** It may sit in Procore, in your system, or in both.
- **What would the customer stop doing if the Agent worked?**

If you can answer each in a sentence, the workflow is ready to build. Check the <a href="https://datagrid.com/integrations/procore#data-access" target="_blank">Procore data available to Agents</a> early, and confirm an Agent can reach the Procore data your workflow needs before you design around it.

**Make sure the problem needs an Agent.** If the workflow only retrieves and restates information, it probably belongs in your own product as a feature. Agents earn their cost when they reason across Procore data and yours, or complete real work.

| | Takes little time today | Takes significant time today |
| --- | --- | --- |
| **Rules you can write down** | Build it as a feature in your product | Strong Agent candidate |
| **Requires judgment** | Leave it manual | Build an Agent that gathers the evidence and leaves the decision to the user |

**Plan for the cost of a wrong answer.** Ask what breaks if someone acts on one. Where the stakes are high, build verification in from the start: have the Agent cite the records behind every date, status, and amount, and let Procore AI stage any proposed change for the customer to approve.

<div class="details-bottom-spacing"></div>

***
## Keep the First Version Narrow
Start with one workflow. A narrow Agent has fewer Tools to choose between and simpler instructions to follow, so it picks correctly more often and finishes in fewer steps.

It also costs the customer less. Every run draws credits from their pool, and their administrators see that usage attributed to your app by name.

If your roadmap has five workflows, pick the one with the clearest customer value and make it reliable. Add the next once the first passes your tests.
<br><br>

***
## Design Your MCP Server
An Agent reaches your system through your MCP server, and it chooses Tools by reading their names and descriptions. Tool design is Agent design.

- **Scope the server to your workflow's domain.** A server that exposes your whole platform gives the Agent more to sort through on every plan.
- **Say what the Tool returns and when to call it.** `get_data` gives the Agent nothing to work with. "Returns fabrication status and expected ship date for a steel package" tells it exactly when to reach for the Tool. Write descriptions the way you would brief a new team member, in plain task language with no internal shorthand.
- **Expose outcome-level Tools, and only the ones the workflow needs.** Design each Tool around a task the Agent performs. Thin wrappers over create, read, update, and delete endpoints make the Agent assemble the task itself. Every extra Tool is another option it weighs while planning, which slows answers and raises the chance of a wrong pick.
- **Return data the Agent can use directly.** Concise labeled fields, readable values, and stable record identifiers it can cite. Large or unlabeled responses crowd its context and make answers vague.
- **Return clear errors.** Validate inputs and reject bad ones with a message that says what went wrong. Set `isError` so the Agent can tell the customer what it could not reach. A Tool that crashes or hangs gives it nothing to report.
- **Make Tools safe to retry.** An Agent may call the same Tool more than once. Keep Tools stateless, and make write Tools idempotent so a repeated call produces the same result.
- **Keep each call fast.** The customer waits while the Agent works, and one answer often takes several Tool calls.

Your server authenticates through a redirect-based flow, so the customer signs in to your system and approves access in their own browser. See [Building Agentic Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_agentic_apps.md %}) for the requirement in full.
<br><br>

***
## Write the Agent's Instructions
Three prompts shape an Agent, and each has its own job. The **System Prompt** holds the role and the rules that always apply. The **Planning Prompt** holds the steps and which Tools and data to use. The **Custom Prompt** holds how the answer looks.

**Write the workflow you want, not a list of prohibitions.** A common pattern is a prompt that gains a new "don't" every time the Agent surprises its author:

> Answer questions about fabrication status. Don't use budget data. Don't answer scheduling questions. Don't guess dates. Don't use web search. Don't mention internal order numbers.

That names five things to avoid and still leaves the Agent guessing how to answer a fabrication question, so it improvises. Each prohibition also lengthens the prompt and dilutes every other rule in it. A sequence defines the path instead:

> For every fabrication question, follow these steps.
> 1. Identify the package or scope.
> 2. Call the fabrication status Tool for current status and ship date.
> 3. Check Procore RFIs for open items on the same scope.
> 4. Determine whether any open RFI blocks fabrication.
> 5. Answer with the status, ship date, and blockers, citing each record.
>
> If the request falls outside fabrication tracking, say so in one sentence and state what this Agent covers.

That closing sentence replaces most prohibitions. If you find yourself writing a third "don't", make the positive instruction above it more specific.

**Say when your data comes first.** An Agent can reach both Procore data and your Tools, and it needs telling which to prefer. Put that in the Planning Prompt — "for schedule-impact questions, combine Procore RFI records with fabrication data from your system" — then test with questions that never mention your product. Your instructions are working when the Agent reaches your data anyway.

**Keep hard rules in the System Prompt.** A good one is short: *You are a fabrication tracking assistant for project engineers. Be precise and evidence-based. Never invent records, dates, or statuses. When a field is empty or a Tool returns nothing, say so and name what you could not reach.*

Whatever you write, every Agent needs these four properties:

- Prompts contain no tokens, keys, credentials, or sign-in steps. Authentication runs through the platform.
- When data is unavailable, the Agent says what it could not reach and invents nothing.
- The Agent has a clear scope, and a defined response for questions outside it.
- Data-backed claims cite their source records.
<br><br>

***
## Test With Real Questions
Write 10 to 15 questions the way your target user would type them. "Anything holding up the steel?" is a strong test. "Query the fabrication status tool for package status and then retrieve open RFIs" does half the Agent's work for it and tells you nothing.

Cover three kinds:

1. **Data is available.** The Agent answers correctly and cites its records.
2. **Data is missing or ambiguous.** Several packages match, or the record does not exist. The Agent says what it cannot determine, or asks for the detail it needs.
3. **The question is out of scope.** The Agent states what it covers and stops.

If your Agent can write to Procore, test that too. Confirm the proposed change is correct and legible to the person approving it, that the approval step appears, and that nothing else changes.

**Check every answer, not just the good ones.** Confirm the Agent understood the question, called the right Tools, reached your data where the workflow needed it, and used the right Procore records. You should be able to trace every claim to a source record.

**Rerun the whole set after every change.** Editing one Tool description or enabling one more Tool can shift behavior somewhere unrelated.

**Get a cold read.** Give the Agent to someone who did not build it and let them ask questions with no briefing. If they have to learn special phrasing, so will your customers.
<br><br>

***
## Diagnose by Symptom
Start with the layer most likely to own the problem.

| What you see | Check first |
| --- | --- |
| Steps are skipped or reordered | Planning Prompt |
| The answer is right but badly formatted | Custom Prompt |
| A hard rule is broken | System Prompt |
| Your Tool never gets called | Tool name and description |
| The wrong Tool is chosen | Tool descriptions, and which Tools are enabled |
| The answer is empty or vague | Data availability and setup |
| Procore data is used where yours was needed | Data preference in the Planning Prompt |
| A value is invented when data is missing | System Prompt and its missing-data rule |

Most vague or empty answers trace to data rather than prompts. Before you rewrite an instruction, confirm the customer's data actually covers the workflow, that the Tool is enabled, and that its response is clear enough for the Agent to use. Then rerun your question set.

<div class="details-bottom-spacing"></div>

***
## See Also
- [Building Agentic Applications]({{ site.url }}{{ site.baseurl }}{% link building_applications/building_agentic_apps.md %}) — declare Agents and MCP servers on an app version.
- [Choose an App Type]({{ site.url }}{{ site.baseurl }}{% link plan_your_app/building_apps_app_types.md %}) — how Agentic fits among the capabilities.
- <a href="https://developers.datagrid.com/api-reference/converse/converse" target="_blank">Converse API reference</a> — Tool and MCP server configuration, structured outputs, and credit reporting.
{: .link-list}
<br><br>
