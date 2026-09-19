# ServiceNow Staff AI Engineer Showcase & Enterprise Architecture Suite

> **Role & Profile Specification:** Staff AI Engineer  
> **Requisition:** JB0075541 • IT / AI Platform Architecture • West Palm Beach, FL (Flexible / Remote)  
> **Platform Version:** ServiceNow Xanadu Enterprise AI Release  
> **Observability Standard:** OpenTelemetry (OTel) GenAI Semantic Conventions v1.28.0  
> **Multi-Agent Interoperability:** Model Context Protocol (MCP) 2024-11-05 & Agent2Agent (A2A) v1.2  

---

## 1. Executive Synopsis & Mission Alignment

> *"It all started when engineer Fred Luddy wrote code that automated a tedious task for his coworker, Phyllis. She cried tears of joy. That moment inspired Fred to build a company that could do that for everyone—freeing people from busywork so they could focus on meaningful work. Today, ServiceNow is the AI control tower for business reinvention. Our ServiceNow AI platform brings together any AI, any data, and any workflow—helping 85% of the Fortune 500® work smarter, faster, and better."*

As a **Staff AI Engineer**, this enterprise suite serves as a living, end-to-end reference implementation and technical qualification defense. It demonstrates hands-on mastery across every pillar of the role:

1. **Architecting & Implementing AI Agents and Workflows:** Autonomous multi-agent pipelines orchestrated via ServiceNow **AI Agent Studio**, modular **Skill Kits**, and the **Workflow Data Fabric (WDF)** uniting transactional relational schemas (`cmdb_ci`, `incident`) with dense vector embeddings and strict Access Control List (ACL) inheritance.
2. **Leading AI Control Tower Implementation & Governance:** Production guardrail enforcement featuring zero-data exfiltration PII/PCI redaction, real-time adversarial prompt injection/jailbreak mitigation, Human-in-the-Loop (HITL) gates on mission-critical Tier-0 assets, and departmental token budgeting.
3. **Multi-Cloud LLM Gateway & Cloud Integrations:** Hybrid model routing balancing on-platform **NowLLM** with hyper-scale cloud reasoning (**Google Gemini 3.8 Flash**, AWS Bedrock Claude 3.5, and Azure OpenAI) using secure server-side SDKs.
4. **Governed Multi-Agent Interoperability (MCP & A2A):** Zero-lock-in tool execution through Anthropic's **Model Context Protocol (JSON-RPC 2.0)** and multi-agent cryptographic capability negotiation using **Agent2Agent (A2A)** signed scopes and recursion-loop termination.
5. **Production AI Observability with OpenTelemetry:** Distributed tracing adhering to the latest **OTel GenAI Semantic Conventions**, measuring Time to First Token (TTFT), token consumption, span waterfall breakdowns, and departmental cost attribution.
6. **Staff-Level Leadership, Mentorship & Technical Direction:** Verified certifications, enterprise AI architectural RFCs (RFC-2026-08), and an interactive **Staff AI Architecture Defense Simulator** answering complex enterprise trade-offs posed by ServiceNow hiring managers and engineering executives.

---

## 2. System Architecture & Information Flow

The application is structured as a full-stack, enterprise-grade architecture that bridges browser interactions, a secure Node.js/Express server-side gateway, ServiceNow platform Script Includes, and cloud AI microservices:

```
+----------------------------------------------------------------------------------------------------+
|                                      CLIENT BROWSER (REACT 19 SPA)                                 |
|                                                                                                    |
|  +--------------------+  +--------------------+  +--------------------+  +----------------------+  |
|  |  AI Agent Studio   |  |  AI Control Tower  |  | Skill Kit & Fabric |  |   MCP & A2A Lab      |  |
|  | (5-Hop Delib Graph)|  | (Adversarial Test) |  | (Hybrid Vector/CI) |  | (JSON-RPC 2.0 Runner)|  |
|  +---------+----------+  +---------+----------+  +---------+----------+  +----------+-----------+  |
|            |                       |                       |                        |              |
|  +---------+-----------------------+-----------------------+------------------------+-----------+  |
|  |   OTel Tracing Waterfall   |   Multi-Cloud Router Matrix   |   Staff AI Leadership Defense   |  |
|  +---------------------------------------------+------------------------------------------------+  |
+------------------------------------------------|---------------------------------------------------+
                                                 | HTTPS / REST (Port 3000)
                                                 v
+----------------------------------------------------------------------------------------------------+
|                       ENTERPRISE SERVER GATEWAY (EXPRESS + NODE.JS RUNTIME)                        |
|                                                                                                    |
|  +-----------------------------------------------------------------------------------------------+ |
|  |                        SERVICENOW AI CONTROL TOWER ENFORCEMENT ENGINE                         | |
|  |   - Regex PII/PCI Redaction (SSN, Passwords, API Keys)                                        | |
|  |   - Adversarial Jailbreak & System Override Filter (DAN / Prompt Injection)                   | |
|  |   - Human-in-the-Loop (HITL) Gate Evaluator for Tier-0 Configuration Items (CIs)              | |
|  +---------------------------------------------+-------------------------------------------------+ |
|                                                |                                                   |
|                        +-----------------------+-----------------------+                           |
|                        |                                               |                           |
|                        v                                               v                           |
|  +-------------------------------------------+   +-----------------------------------------------+ |
|  |     MULTI-AGENT ORCHESTRATION GRAPH       |   |       WORKFLOW DATA FABRIC (WDF) ENGINE       | |
|  | - Intent Classification Router            |   | - Hybrid BM25 Sparse Search                   | |
|  | - CMDB Grounding & Topology Agent         |   | - Dense Vector Cosine Similarity (Embeddings) | |
|  | - Cloud Diagnostics Agent (A2A Handoff)   |   | - GlideRecordSecure ACL Inheritance           | |
|  | - Autonomous Remediation Executor         |   | - CMDB CIs (Postgres, Kubernetes, Redis)      | |
|  +---------------------+---------------------+   +-----------------------------------------------+ |
|                        |                                                                           |
|                        +-----------------------+                                                   |
|                                                |                                                   |
|                                                v                                                   |
|  +-----------------------------------------------------------------------------------------------+ |
|  |                    MODEL CONTEXT PROTOCOL (MCP) JSON-RPC 2.0 EXECUTOR                         | |
|  |  [servicenow_query_cmdb]  [servicenow_create_change_request]  [aws_cloudwatch_query_metrics]  | |
|  +---------------------------------------------+-------------------------------------------------+ |
|                                                |                                                   |
|                                                v                                                   |
|  +-----------------------------------------------------------------------------------------------+ |
|  |                        OPENTELEMETRY (OTEL) DISTRIBUTED TRACER                                | |
|  |   Spans: agent.orchestrator -> cmdb_vector_search -> llm.generate_content -> mcp.tool_call    | |
|  |   GenAI Tags: gen_ai.system, gen_ai.usage.prompt_tokens, gen_ai.usage.completion_tokens      | |
|  +-----------------------------------------------------------------------------------------------+ |
+------------------------------------------------+---------------------------------------------------+
                                                 |
                                                 v
+----------------------------------------------------------------------------------------------------+
|                         EXTERNAL CLOUD & PLATFORM AI INTEGRATIONS                                  |
|                                                                                                    |
|  +-----------------------+  +------------------------+  +-------------------+  +-----------------+ |
|  | Google Cloud Vertex   |  | ServiceNow NowLLM      |  | AWS Bedrock       |  | Azure OpenAI    | |
|  | (Gemini 3.8 Flash)    |  | (On-Platform Domain)   |  | (Claude 3.5)      |  | (GPT-4o Entra)  | |
|  +-----------------------+  +------------------------+  +-------------------+  +-----------------+ |
+----------------------------------------------------------------------------------------------------+
```

---

## 3. Directory Structure

```
.
├── .env.example                     # Environment declarations (GEMINI_API_KEY)
├── index.html                       # Application HTML entry point & viewport meta
├── metadata.json                    # AI Studio manifest: permissions and server-side capabilities
├── package.json                     # Production dependencies, scripts, and build pipeline
├── README.md                        # Architectural specification, instructions, and design breakdown
├── server.ts                        # Express backend, MCP dispatch, OTel tracer, Control Tower engine
├── tsconfig.json                    # Strict TypeScript compilation parameters
├── tsconfig.node.json               # Node-specific build configuration
├── vite.config.ts                   # Vite build tool config with Tailwind CSS v4 plugin
│
├── dist/                            # Production build output
│   ├── index.html                   # Minified client bundle
│   ├── assets/                      # Bundled JS and CSS assets
│   ├── server.cjs                   # Bundled standalone CommonJS server (via esbuild)
│   └── server.cjs.map               # Sourcemap for production stack-trace debugging
│
└── src/
    ├── App.tsx                      # Root application layout, navigation tabs, and global state
    ├── main.tsx                     # React 19 DOM bootstrap mounting #root
    ├── index.css                    # Tailwind CSS v4 (@import "tailwindcss";)
    ├── types.ts                     # Strict TypeScript interfaces (Agents, CIs, Policies, OTel, MCP)
    │
    ├── components/
    │   ├── Header.tsx               # Top enterprise navbar, status badge, P1 Quick-Run CTA
    │   ├── AgentStudio.tsx          # Multi-Agent deliberation graph, live triage logs, HITL gate
    │   ├── ControlTower.tsx         # Live adversarial playground, PII redaction, policy catalog
    │   ├── SkillKitDataFabric.tsx   # Skill Kit Script Includes & Hybrid Vector CMDB workbench
    │   ├── McpA2aLab.tsx            # Model Context Protocol JSON-RPC runner & A2A protocol flow
    │   ├── OpenTelemetrySuite.tsx   # OTel trace waterfall, GenAI semantic metrics, collector YAML
    │   ├── CloudLlmArch.tsx         # AST vs fixed chunking, multi-cloud router matrix, polyglot scripts
    │   └── StaffLeadership.tsx      # Certifications, mentoring artifacts, interactive defense sandbox
    │
    └── data/
        └── mockData.ts              # Enterprise seed records (CIs, Incidents, Policies, Skill Kits)
```

---

## 4. UI/UX Mock Wire Diagrams (Visual ASCII)

### 4.1 Global Platform Navigation & Status Header

```
+---------------------------------------------------------------------------------------------------------+
| [SN] ServiceNow AI Studio | Xanadu Staff Suite      [Active: Xanadu Enterprise] [OTel: Active] [MCP: OK] |
| Subtitle: Staff AI Engineering • Multi-Agent Systems • Governance • OpenTelemetry Observability         |
+---------------------------------------------------------------------------------------------------------+
| [ Agent Studio ] [ AI Control Tower ] [ Skill Kit & Fabric ] [ MCP & A2A ] [ OTel ] [ LLM ] [ Staff ] |
|                                                                    [ > Run P1 Incident Remediation Demo ]|
+---------------------------------------------------------------------------------------------------------+
```

---

### 4.2 Module 1: AI Agent Studio & Autonomous Orchestrator

```
+---------------------------------------------------------------------------------------------------------+
| Select Enterprise P1 Incident: [ INC0948210: 504 Timeouts on Checkout (Tier 0) | Assignment: SRE ] [v] |
+---------------------------------------------------------------------------------------------------------+
| MULTI-AGENT DELIBERATION GRAPH (5 HOPS)                                                                 |
|                                                                                                         |
|  [ 1. Intent Router ] ----> [ 2. CMDB WDF Agent ] ----> [ 3. Cloud Diagnostics ]                        |
|       (Classify)                  (Topology Map)              (A2A AWS CloudWatch)                      |
|                                                                       |                                 |
|                                                                       v                                 |
|  [ 5. Remediation Agent ] <-- [ HITL Gate: Required ] <---- [ 4. AI Control Tower ]                     |
|     (Scale Pods / Rollback)     (Staff Engineer Approve)         (Security Audit: OK)                   |
+---------------------------------------------------------------------------------------------------------+
| EXECUTION CONSOLE & REAL-TIME TRACE BREAKDOWN                                                           |
|                                                                                                         |
|  [Hop 1] 42ms  | Intent classified as 'infrastructure.incident.triage' with confidence 0.98            |
|  [Hop 2] 198ms | Workflow Data Fabric grounded target CI: k8s-ingress-cluster-apigw (Tier 0)           |
|  [Hop 3] 310ms | A2A delegation to AWS CloudWatch MCP tool returned 504 gateway HTTP spike              |
|  [Hop 4] 85ms  | AI Control Tower evaluated payload: PII sanitized, HITL Gate REQUIRED for Tier 0    |
|                                                                                                         |
|  +---------------------------------------------------------------------------------------------------+  |
|  | [!] HUMAN-IN-THE-LOOP (HITL) GATE ENGAGED                                                         |  |
|  | Target CI: k8s-ingress-cluster-apigw is Tier-0 Mission Critical. Remediation requires Staff sign-off.|  |
|  | [x] Authorize Automated Emergency Remediation (Scale ReplicaSet to 8 + Recycle Dead Ingress Pods)  |  |
|  | [ Execute Governed Remediation Workflow ]                                                         |  |
|  +---------------------------------------------------------------------------------------------------+  |
+---------------------------------------------------------------------------------------------------------+
```

---

### 4.3 Module 2: AI Control Tower & Responsible AI Governance

```
+---------------------------------------------------------------------------------------------------------+
| AI Control Tower Governance Framework | Staff AI Engineering Policy Authority                          |
| Compliance Rate: 99.82%   |   Blocked Attacks: 2,419   |   Evaluation Latency: < 15ms                   |
+---------------------------------------------------------------------------------------------------------+
| LIVE ADVERSARIAL SANDBOX (POLICY AUDIT)                                                                 |
| Test Presets: [ PII & Secret Leakage ] [ DAN / Prompt Injection ] [ Safe Query ] [ Token Exhaustion ]   |
|                                                                                                         |
| Payload Input:                                                Guardrail Switches:                       |
| +-----------------------------------------------------------+ [x] PII, PCI & Secret Sanitizer           |
| | Incident: Engineer secret='SuperProdPass123!' with AWS     | [x] Adversarial Jailbreak Defense         |
| | key AKIAIOSFODNN7EXAMPLE. Impacted SSN 987-65-4321...     | Token Cap: [ 2500 tokens ]               |
| +-----------------------------------------------------------+ [ Run Control Tower Policy Audit ]        |
|                                                                                                         |
| Audit Output: DECISION = MODIFIED_AND_PERMITTED (Latency: 12ms | Trace: aud_94102)                       |
| Violations Detected:                                                                                    |
|  - [POL-PII-001] High: Detected & masked Unencrypted SSN                                                |
|  - [POL-SEC-004] Critical: Detected & redacted AWS Access Key Secret                                    |
| Redacted Payload to LLM:                                                                                |
|  "Incident: Engineer secret='[REDACTED_PASSWORD]' with AWS key [REDACTED_AWS_KEY]. SSN [REDACTED_SSN]..."|
+---------------------------------------------------------------------------------------------------------+
| ACTIVE ORGANIZATIONAL POLICIES                                                                          |
|  +--------------------------+  +--------------------------+  +---------------------------------------+  |
|  | POL-PII-001 [ Block ]    |  | POL-INJ-002 [ Block ]    |  | POL-HITL-003 [ HITL Gate ]            |  |
|  | PII & PCI Masking        |  | Jailbreak / DAN Defense  |  | Tier-0 Autonomous Remediation Guard   |  |
|  +--------------------------+  +--------------------------+  +---------------------------------------+  |
+---------------------------------------------------------------------------------------------------------+
```

---

### 4.4 Module 3: Skill Kit Studio & Workflow Data Fabric (WDF)

```
+---------------------------------------------------------------------------------------------------------+
| Skill Kit Studio & Workflow Data Fabric | Unified Semantic Data Layer                                   |
| [ Skill Kit Studio (Active) ]                                 [ Workflow Data Fabric (CMDB Vector) ]     |
+---------------------------------------------------------------+-----------------------------------------+
| CONFIGURED SKILL KITS                                         | SCRIPT INCLUDE SPECIFICATION            |
|                                                               |                                         |
|  [>] Skill-01: Incident Summarization                         | Name: ServiceNowIncidentSkillKit        |
|      Table: incident • Output: JSON                           | Target Schema: incident                 |
|                                                               | Security: GlideRecordSecure Enforced    |
|  [ ] Skill-02: CMDB Graph Relationship Extraction             |                                         |
|      Table: cmdb_rel_ci • Output: Graph AST                   | Code Viewer: (ES2022 JavaScript)        |
|                                                               | +-------------------------------------+ |
|  [ ] Skill-03: Change Risk Predictor                          | | var IncidentSkillKit = Class.create();| |
|      Table: change_request • Output: Risk Score              | | IncidentSkillKit.prototype = {      | |
|                                                               | |   summarize: function(sysId) {      | |
|                                                               | |     var gr = new GlideRecordSecure; | |
|                                                               | |     // Enforces strict ACL check    | |
|                                                               | |     if (gr.get(sysId)) { ... }      | |
|                                                               | +-------------------------------------+ |
|                                                               | [ Copy Script Include ]                 |
+---------------------------------------------------------------+-----------------------------------------+
| WORKFLOW DATA FABRIC: HYBRID VECTOR SEARCH SANDBOX                                                      |
| Query: [ connection pool exhaustion on customer portal                                      ] [ Search ]|
|                                                                                                         |
| Grounded Configuration Items (CMDB Records in Vector Space):                                            |
|  +------------------------------------------------+  +-----------------------------------------------+  |
|  | prod-customer-portal-db-01 (Tier 0)            |  | k8s-ingress-cluster-apigw (Tier 0)            |  |
|  | Class: cmdb_ci_database | Sim: 93.0% (TOP MATCH)|  | Class: cmdb_ci_kubernetes_cluster | Sim: 70.0%|  |
|  +------------------------------------------------+  +-----------------------------------------------+  |
+---------------------------------------------------------------------------------------------------------+
```

---

### 4.5 Module 4: Model Context Protocol (MCP) & A2A Interoperability Lab

```
+---------------------------------------------------------------------------------------------------------+
| Governed Multi-Agent Interoperability | MCP JSON-RPC 2.0 & Agent2Agent (A2A) Protocols                  |
+---------------------------------------------------------------+-----------------------------------------+
| MODEL CONTEXT PROTOCOL (MCP) RUNNER                           | A2A NEGOTIATION PROTOCOL SIMULATOR      |
|                                                               | Step: [ 1 ] [ 2 ] [ 3 ] [ 4 ]           |
| Governed MCP Tools:                                           |                                         |
|  [>] servicenow_query_cmdb                                    | STEP 02: Trust Boundary & Scope Check   |
|  [ ] servicenow_create_change_request                         | Target agent verifies requesting agent  |
|  [ ] aws_cloudwatch_query_metrics                             | holds signed token from Control Tower:  |
|  [ ] azure_entra_audit_logs                                   |                                         |
|                                                               |  [v] Scope: 'sn_incident.read'          |
| Arguments (JSON-RPC):                                         |  [v] Scope: 'cloud_infra.metrics.read'  |
| +-----------------------------------------------------------+ |  [v] Rate Limit: 3,400 / 10,000 queries |
| | { "table": "cmdb_ci_database", "query": "operational=1" } | |  [v] Status: AUTHORIZED_BY_CONTROL_TOWER|
| +-----------------------------------------------------------+ |                                         |
| [ Execute MCP Tool Call ]                                     | Loop Prevention: Hop 2/5 (Trace Hash OK)|
+---------------------------------------------------------------+-----------------------------------------+
```

---

### 4.6 Module 5: OpenTelemetry (OTel) AI Observability Suite

```
+---------------------------------------------------------------------------------------------------------+
| OpenTelemetry GenAI Semantic Conventions v1.28.0 | Distributed AI System Observability                  |
| [ Trace Waterfall (Active) ]                 [ GenAI Metrics ]              [ OTel Collector Config ]   |
+---------------------------------------------------------------------------------------------------------+
| DISTRIBUTED TRACE WATERFALL: trace_sn_0918_p1_outage (Duration: 1245ms)                                 |
|                                                                                                         |
| Span Name                                            Kind     Duration   Latency Timeline (Visual Bar)  |
| --------------------------------------------------   ------   --------   ------------------------------ |
| agent.orchestrator.triage                            SERVER   1245ms     [============================] |
| workflow_data_fabric.cmdb_vector_search              CLIENT    198ms     [====                        ] |
| llm.generate_content (GoogleGenAI / Gemini 3.8 Flash)INTERNAL  460ms     [==========                  ] |
| mcp.tool_call.aws_cloudwatch_query_metrics           CLIENT    310ms     [=======                     ] |
| ai_control_tower.guardrail_evaluation                INTERNAL   85ms     [==                          ] |
+---------------------------------------------------------------------------------------------------------+
| SPAN ATTRIBUTES INSPECTOR (OTel GenAI Standard):                                                        |
|  - gen_ai.system: "GoogleGenAI"                                                                         |
|  - gen_ai.request.model: "gemini-3.8-flash"                                                             |
|  - gen_ai.usage.prompt_tokens: 840 tokens                                                               |
|  - gen_ai.usage.completion_tokens: 420 tokens                                                           |
|  - cost.department: "ServiceNow_AI_Ops" ($0.0018 / exec)                                                |
+---------------------------------------------------------------------------------------------------------+
```

---

## 5. Compile, Transpile, Build & Run Instructions

### 5.1 System Prerequisites
- **Node.js**: Version `18.18.0` or higher (`v20+` or `v22+` recommended).
- **npm**: Version `9.0.0` or higher.
- **Environment**: Linux, macOS, or Windows (WSL2).

---

### 5.2 Environment Configuration
Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Populate your API credentials (optional for UI mock walkthroughs; required for live Gemini completions):

```env
# .env
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Security Note:** `GEMINI_API_KEY` is strictly accessed server-side in `server.ts`. It is **never** injected into the client bundle or prefixed with `VITE_`.

---

### 5.3 Local Development Mode
In development mode, `tsx` runs `server.ts` with TypeScript support, mounting Vite as native development middleware:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

- Server boots on: `http://localhost:3000` (or `http://0.0.0.0:3000` inside container environments).
- Hot client compilation is served on-demand by Vite middleware.

---

### 5.4 Production Compilation, Transpilation & Bundling
The production build pipeline performs a two-stage compilation:
1. **Client SPA Build:** `vite build` invokes Rollup and Tailwind CSS v4 to compile, tree-shake, and emit static HTML, CSS, and JS into `dist/`.
2. **Backend Server Bundle:** `esbuild` transpiles and bundles `server.ts` into a single, self-contained CommonJS artifact at `dist/server.cjs`, using `--packages=external` to preserve external Node runtime modules while bundling relative imports and generating sourcemaps.

```bash
# Execute complete production build
npm run build
```

Expected output structure:
```
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── index.html
├── server.cjs
└── server.cjs.map
```

---

### 5.5 Production Execution
Start the production server using Node.js:

```bash
npm run start
```

The Express server serves the compiled `dist/index.html` and static assets, while actively handling `/api/*` requests for multi-agent workflows, Control Tower evaluations, and MCP tool executions.

---

### 5.6 Static Code Analysis & Verification
Verify TypeScript type conformance across client and server without emitting artifacts:

```bash
npm run lint
```

---

## 6. Detailed Solution Explanation & Engineering Choices

### 6.1 Why Express + Vite Full-Stack Architecture?
* **Zero API Key Leakage:** Client-only Single Page Applications (SPAs) expose credentials through browser network inspectors. By running an Express layer on port 3000, all LLM API invocations (`@google/genai`) and external cloud credentials are held strictly server-side.
* **Unified Port 3000 Routing:** Container environments (such as Google Cloud Run and Kubernetes ingress controllers) mandate single-port ingress. Vite middleware is attached to Express during development, and static Express file serving is engaged in production—guaranteeing identical behavior across all environments.

### 6.2 Why `esbuild` Bundling for `server.ts` (`dist/server.cjs`)?
* Modern Node.js ES Modules enforce strict file extension checks (e.g. mandatory `.js` extensions on relative imports). 
* By bundling `server.ts` into CommonJS (`dist/server.cjs`) via `esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap`, all internal relative imports are resolved at compile-time while native C/C++ and external npm packages remain cleanly externalized.

### 6.3 Why Tailwind CSS v4 with `@tailwindcss/vite`?
* Tailwind v4 introduces a ground-up performance engine using native CSS features. Configured directly as a Vite plugin via `@import "tailwindcss";`, it eliminates legacy PostCSS configuration overhead while providing immediate utility compilation.

### 6.4 Polyglot Scripting Paradigm: ServiceNow JavaScript & Python 3.11 Microservices
A Staff AI Engineer in enterprise environments must bridge two worlds:
1. **On-Platform ServiceNow JavaScript (ES2022 / Rhino / Nashorn evolution):** Demonstrated in `src/components/SkillKitDataFabric.tsx` with native Script Includes utilizing `GlideRecordSecure` to enforce table-level and field-level Access Control Lists (ACLs) directly in the database kernel.
2. **Cloud Python 3.11 Microservices (FastAPI + LangChain / OTel):** Demonstrated in `src/components/CloudLlmArch.tsx`, showcasing how cloud-hosted satellite agents communicate with ServiceNow MID Servers and AI Gateways.

### 6.5 Model Context Protocol (MCP) & Agent2Agent (A2A) Governance
* **Model Context Protocol (JSON-RPC 2.0):** Standardizes tool execution into declarative envelopes (`tools/call`, `params.name`, `params.arguments`). This prevents proprietary vendor coupling and allows the same agent logic to drive AWS CloudWatch, Azure Entra, and ServiceNow CMDB tools.
* **Agent2Agent (A2A) Protocol:** In multi-agent systems, unconstrained recursion leads to runaway costs and infinite loops. Our A2A implementation introduces:
  - **Cryptographically Signed Agent Cards:** Advertises capabilities before delegation.
  - **Trace Context Propagation:** Injects W3C distributed trace headers.
  - **Recursion Deadband / Hop Limiter:** Hard caps agent-to-agent delegation chains at 5 hops with SHA-256 loop detection hashes.

### 6.6 OpenTelemetry (OTel) GenAI Semantic Conventions (v1.28.0)
Standard APM tools fail to capture the nuances of generative AI systems. This implementation integrates the modern OTel GenAI standard:
* Attributes: `gen_ai.system`, `gen_ai.request.model`, `gen_ai.usage.prompt_tokens`, `gen_ai.usage.completion_tokens`, and `cost.department`.
* Operational Metrics: Measures Time to First Token (TTFT), token budget burns, and Control Tower intervention delays.
* Production Exporter: Includes a validated `otel-collector-config.yaml` supporting dual-export to ServiceNow Health and Prometheus/Datadog.

---

## 7. Staff AI Engineer Competencies & Defense Matrix

This repository addresses each requirement from Job Requisition **JB0075541**:

| Job Requisition Responsibility | Implementation & Code Location | Demonstrated Staff-Level Competency |
| :--- | :--- | :--- |
| **Architect & implement AI agents and workflows** | `src/components/AgentStudio.tsx`<br>`server.ts` (`/api/agents/execute`) | Multi-agent deliberation pipeline with 5-hop progression and Human-in-the-Loop gates. |
| **Skill Kit & Workflow Data Fabric (WDF)** | `src/components/SkillKitDataFabric.tsx`<br>`src/data/mockData.ts` | Server-Side Script Includes (`GlideRecordSecure`) and hybrid BM25 + dense vector CMDB retrieval. |
| **Lead AI Control Tower implementation & governance** | `src/components/ControlTower.tsx`<br>`server.ts` (`/api/control-tower/evaluate`) | Real-time PII/PCI sanitization, prompt injection defenses, and enterprise policy auditing. |
| **Integrate & configure LLM capabilities in Cloud & Platform** | `src/components/CloudLlmArch.tsx`<br>`server.ts` (`getGenAI()`) | Multi-cloud routing matrix (NowLLM, Gemini, Bedrock, OpenAI) and AST semantic chunking. |
| **MCP & A2A multi-agent interoperability** | `src/components/McpA2aLab.tsx`<br>`server.ts` (`/api/mcp/call`) | JSON-RPC 2.0 tool execution and 4-step cryptographic A2A trust delegation with loop prevention. |
| **OpenTelemetry for AI system observability** | `src/components/OpenTelemetrySuite.tsx`<br>`server.ts` (`otelTraceHistory`) | GenAI semantic spans, waterfall flamegraph, token cost attribution, and collector YAML. |
| **Mentoring, technical direction & architecture defense** | `src/components/StaffLeadership.tsx`<br>`server.ts` (`/api/interview/ask`) | Enterprise RFC-2026-08 authorship, verified ServiceNow certifications, and interactive Q&A simulator. |

---

## 8. License & Attribution

Developed for the **ServiceNow Staff AI Engineer** qualification suite.  
Platform concepts and trademarks belong to **ServiceNow, Inc.**  
Observability specifications adhere to the **Cloud Native Computing Foundation (CNCF) OpenTelemetry Project**.  
Tool interoperability complies with Anthropic's **Model Context Protocol (MCP)** specification.
