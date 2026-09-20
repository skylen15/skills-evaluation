# Skill Evaluation (`x_711398_se`)

ServiceNow scoped application and metadata-as-code repository built with the ServiceNow SDK (Fluent) and TypeScript.

The **Skill Evaluation** application automates the self-assessment and two-gate approval lifecycle for ServiceNow professionals in ECA (Enterprise Cloud Apps), replacing manual spreadsheets with platform automation, notifications, audit trails, and strict role-based governance.

---

## Architecture & Domain Model

### Workflow Lifecycle

```
[Draft] ---> [Submitted] ---> [Reviewed] ---> [Completed]
   ^              |               |
   |--- (Reject) -+--- (Reject) --+
```

1. **Draft**: Member creates a submission, rates automatically generated `Skill Assessment` records (Proficiency Levels 0–4), claims `Cert Acquisition` credentials, and provides a description.
2. **Submitted (PM Gate)**: Member submits their assessment. A PM (`Skill Evaluation PM` group) reviews, adds work notes, and either approves (advancing to `Reviewed`) or rejects (returning to `Draft`).
3. **Reviewed (CoE Head Gate)**: CoE Head (`Skill Evaluation COE` group) reviews, adds work notes, and either approves (advancing to terminal `Completed`) or rejects (returning to `Draft`).
4. **Completed**: Immutable terminal state. Nobody may edit the record or work notes. The submission becomes `Valid`, invalidating any prior valid submission for that member.

### Core Domain Entities

- **Submission (`x_711398_se_submission`)**: Central record capturing person, state, score, level band, and review journal. At most one in-progress submission per member.
- **Skill Assessment (`x_711398_se_skill_assessment`)**: Generated per active skill on submission creation. Carries proficiency rating (0: Not Applicable to 4: Guru).
- **Cert Acquisition (`x_711398_se_cert_acquisition`)**: Claimed certificates with verification number, acquisition date, and release. Must be unique per submission.
- **Catalog Tables**: Product Lines (`x_711398_se_product_line`), Skills (`x_711398_se_skill`), Certificates (`x_711398_se_certificate`), and Score Levels (`x_711398_se_level`).

---

## Project Structure

```
.
├── src/
│   ├── fluent/                 # ServiceNow Fluent metadata definitions
│   │   ├── cert-acquisition/   # Tables, ACLs, UI policies, business rules
│   │   ├── certificate/        # Certificate catalog metadata & seed data
│   │   ├── foundation/         # Groups, roles, events, notifications
│   │   ├── level/              # Score level bands and thresholds
│   │   ├── product-line/       # Product line catalog definitions
│   │   ├── skill/              # Skills catalog & import definitions
│   │   ├── skill-assessment/   # Skill assessment entity & generation logic
│   │   └── submission/         # Submission entity, gates, ATF test suite
│   └── server/                 # Scoped server-side TypeScript business logic
│       ├── cert-acquisition/   # Duplicate checks & query isolation
│       ├── skill-assessment/   # Generation & access restriction logic
│       └── submission/         # Gate transitions, policies, score calculation
├── standards/                  # Engineering standards & guidelines
├── test/                       # Fast-feedback local unit tests (node:test)
├── docs/                       # Architecture Decision Records (ADRs) & guides
└── requirements/               # Original specifications and reference catalog data
```

---

## Development & Verification

Always use **`pnpm`** as enforced by this repository.

### Prerequisites

- Node.js (v20+ recommended)
- `pnpm` (`corepack enable pnpm`)
- ServiceNow SDK (`@servicenow/sdk`) configured with target instance profile

### Verification Pipeline

Run verification in order as specified in `docs/agents/verify.md`:

```bash
# 1. Format code
pnpm fmt

# 2. Run static analysis / linting
pnpm lint

# 3. Typecheck server-side TypeScript
pnpm typecheck

# 4. Run local fast-feedback unit tests (~120ms)
pnpm test

# 5. Build Fluent metadata
pnpm build
```

---

## Testing Strategy

This repository enforces a two-tier testing strategy:

1. **Tier 1: Local Unit Tests**
   - Pure domain logic, gate transitions, and submission policies tested via `node:test` without instance network overhead.
   - Run via `pnpm test`.

2. **Tier 2: Instance Automated Test Framework (ATF)**
   - End-to-end integration and security validation executed on the target ServiceNow instance via Now SDK CICD.
   - Full suite execution:
     ```bash
     pnpm test:atf
     ```
   - For single-test runs and CLI debugging instructions, refer to [`docs/testing-and-debugging.md`](docs/testing-and-debugging.md).

---

## Reference & Documentation

- [`CONTEXT.md`](CONTEXT.md) — Authoritative domain terminology, ubiquitous language, and business invariants.
- [`CODING_STANDARDS.md`](CODING_STANDARDS.md) — Engineering standards router and priority matrix.
- [`docs/adr/`](docs/adr/) — Architecture Decision Records documenting scope, gate policies, immutability, and import models.
- [`docs/testing-and-debugging.md`](docs/testing-and-debugging.md) — Detailed runbook for ATF execution and log inspection.
