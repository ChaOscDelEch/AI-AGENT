ID	Functional Requirement	Description

FR001	Solo Project	Work independently; no team members.

FR002	Single Public Repository	Keep all code in one GitHub repo; instructors are not collaborators.

FR003	PR-Only Workflow	Push all changes to main exclusively through Pull Requests.

FR004	Express + TypeScript Setup	Scaffold an Express server fully typed with TypeScript

FR005	Zod Runtime Validation	Validate every request body and external-API response with Zod schemas.

FR006	POST /agent Endpoint**	Expose a single POST route that accepts { prompt: string } and returns the orchestrated AI response.

FR007	Input Guardrail	Implement at least one guardrail (e.g., regex, moderation check) that rejects or sanitises unsafe prompts before agent execution.

FR008	OpenAI Agents SDK Integration	Use the OpenAI Agents SDK for TypeScript to run an agentic workflow.

FR009	Orchestrator Agent	Create one top-level orchestrator agent that delegates work to sub-agents/tools and returns the final answer.

FR010	Minimum Three Sub-Agents	Implement ≥ 3 additional specialised agents (e.g., Researcher, Summariser, Fact-Checker).

FR011	Tool Functions	Provide ≥ 2 callable functions; at least one must perform an external API request (e.g., fetch weather, stock price, or Wikipedia content).

FR012	Local Model in Dev	When NODE_ENV=development, route LLM calls to a small local model running in LM Studio or Ollama; switch to OpenAI in production.

FR013	Fictitious-Company Use-Case	Design the agents around a made-up company scenario (e.g., customer-support triage, tutoring bot, research assistant).

FR014	UML Sequence Diagram	Produce a UML (sequence or activity) diagram that illustrates every agent, tool, and API interaction in the flow.

FR015	Diagram in Presentation	Include the UML diagram in the final demo slide deck / repo README.

FR016	README & Env Docs	Document your repo in the README file and enable Swagger UI for your Endpoint.