# Config and skill paths by OS

## Claude Desktop (Skill)

Upload `skills/claude/SKILL.md` via **Settings → Skills → Add → Upload Skill**.

Before uploading, replace `YOUR_API_KEY` with your actual API key from [geomanic.com/data](https://geomanic.com/data). Alternatively, download a ready-to-use file with your key included from the same page.

## OpenClaw (Skill)

Install from ClawHub: `/skills install @weltspion/geomanic`

Or manually place at:

| OS | Skill path |
|----|------------|
| macOS/Linux | `~/.openclaw/workspace/skills/geomanic/SKILL.md` |

## Cursor (Bridge)

Cursor MCP settings are stored in the workspace or global settings:
- Workspace: `.cursor/mcp.json` in your project root
- Global: Cursor Settings → MCP Servers

Use the template at `bridge/config/cursor/mcp.json`.

## Bridge script

The bridge is needed for clients that require a local command (e.g. Cursor). Place it wherever is convenient:
- macOS/Linux: `~/bin/geomanic-bridge.js` or clone this repo
- Windows: `C:\tools\geomanic-bridge.js`

Set `GEOMANIC_TOKEN` as environment variable. Make sure `node` (v18+) is available in your PATH.
