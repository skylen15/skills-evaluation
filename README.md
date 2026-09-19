# sn-agent-starter

A production-ready repository template providing comprehensive **ServiceNow Coding Standards** and the **`sn-standards` Agent Skill** for AI coding assistants (such as Oh My Pi, Claude Code, Cursor, Copilot, Windsurf).

---

## What's Included

- **`CODING_STANDARDS.md`**: Master router and decision priority matrix for engineering & code reviews.
- **`standards/`**:
  - `standards/typescript.md`: TypeScript engineering baselines (errors as values, branded types, deep modules).
  - `standards/servicenow-now-sdk.md`: Fluent metadata, ServiceNow SDK module boundaries, Jelly sanitization, BFF conventions.
- **`.agents/skills/sn-standards/`**: Complete domain-specific agent skill covering:
  - `core.md`: Core executable artifact defaults and strict instance safety.
  - `automation.md`: Business Rules, scheduled jobs, Flows vs. scripts.
  - `client.md`: Client scripts, UI policies, GlideAjax client patterns.
  - `data.md`: Table design, indexes, large-table query patterns, database views.
  - `scripting.md`: Safe server-side JavaScript, pitfalls, dot-walking invariants.
  - `security.md`: ACLs, roles, Scripted REST authorization.
  - `debugging.md`: Log gating, Slow Query diagnosis, ECC queue.
  - `testing.md`: ATF test design, mock strategies, isolation.
  - `integrations.md` & `integration-patterns.md`: REST/SOAP, integration patterns, credential management.
  - `portal.md` & `catalog.md`: Service Portal widgets, Catalog Items, Record Producers.
  - `naming.md`: Scoped app & metadata naming conventions.

---

## Installation & Usage Guidelines

You can use this repository either as a **starter template for new projects** or by **installing into an existing project**.

### Method 1: Use as a GitHub Template (New Projects)

1. Click **"Use this template"** > **"Create a new repository"** on GitHub.
2. Clone your newly created repository:
   ```bash
   git clone git@github.com:<your-org>/<your-repo>.git
   cd <your-repo>
   ```
3. Customize `CODING_STANDARDS.md` to reference your specific project structure and tech stack.

---

### Method 2: Install into an Existing Project

To install the coding standards and agent skill into an existing repository:

#### Option A: Quick Copy via Shell (macOS / Linux / Git Bash)

Run this one-liner from the root of your target project:

```bash
# Clone template to temporary directory and copy artifacts
TMP_DIR=$(mktemp -d)
git clone --depth 1 https://github.com/skylen15/sn-agent-starter.git "$TMP_DIR"
cp "$TMP_DIR/CODING_STANDARDS.md" .
cp -r "$TMP_DIR/standards" .
mkdir -p .agents/skills
cp -r "$TMP_DIR/.agents/skills/sn-standards" .agents/skills/
rm -rf "$TMP_DIR"
```

#### Option B: Quick Copy via PowerShell (Windows)

Run from your project root in PowerShell:

```powershell
$tempDir = Join-Path $env:TEMP ([System.Guid]::NewGuid().ToString())
git clone --depth 1 https://github.com/skylen15/sn-agent-starter.git $tempDir
Copy-Item "$tempDir\CODING_STANDARDS.md" -Destination . -Force
Copy-Item "$tempDir\standards" -Destination . -Recurse -Force
New-Item -ItemType Directory -Force -Path ".agents\skills" | Out-Null
Copy-Item "$tempDir\.agents\skills\sn-standards" -Destination ".agents\skills" -Recurse -Force
Remove-Item -Recurse -Force $tempDir
```

#### Option C: Git Subtree / Vendor

If you want to keep upstream standards up to date:

```bash
git remote add sn-agent-starter https://github.com/skylen15/sn-agent-starter.git
git fetch sn-agent-starter
git read-tree --prefix=standards/ -u sn-agent-starter/main:standards
```

---

## Agent Integration

### For Agent CLI / Harness (Oh My Pi / Claude Code)
The skill is located at `.agents/skills/sn-standards`. If your agent supports user-level skills:
- Copy `.agents/skills/sn-standards` to `~/.agents/skills/sn-standards` or your agent config directory.
- The assistant will automatically pick up `skill://sn-standards` whenever ServiceNow tasks are requested.

### For Cursor / Windsurf / Copilot
Reference `CODING_STANDARDS.md` in your `.cursorrules` or system prompt:
```markdown
Follow the review standards and routing defined in CODING_STANDARDS.md.
```

---

## License

MIT License. See [LICENSE](LICENSE) for details.
