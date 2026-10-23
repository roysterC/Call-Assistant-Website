# Vendored claude-seo runtime

Copied from [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) v2.4.2 (MIT, see `LICENSE`)
because cloud sessions don't install plugins declared in `.claude/settings.json`.

- Skills live in `.claude/skills/seo*`, sub-agents in `.claude/agents/seo-*.md`.
- `${CLAUDE_PLUGIN_ROOT}` references were rewritten to `.claude/seo/` (scripts) and `.claude/skills/` (skills),
  relative to the repo root, so run commands from there.
- `.claude/seo/scripts/claude-seo setup` builds the Python environment in `.claude/seo/.venv` (git-ignored);
  add `--skip-browser` to skip the Chromium download. `doctor --json` checks readiness.
- Not copied: optional MCP extensions (`extensions/`), the `seo-cockpit` plugin, and the schema-validation hook.

To update, re-copy `skills/`, `agents/`, `scripts/`, `data/`, `schema/`, `requirements.txt` and `pyproject.toml`
from a newer tag and repeat the path rewrite.
