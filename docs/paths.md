# Config and skill paths by OS

## Claude Code (Skill)

| OS | Skill path |
|----|------------|
| macOS/Linux | `~/.claude/skills/geomanic/SKILL.md` |

## OpenClaw (Skill)

| OS | Skill path |
|----|------------|
| macOS/Linux | `~/.openclaw/workspace/skills/geomanic/SKILL.md` |

Or install from ClawHub: `/skills install @weltspion/geomanic`

## Claude Desktop

| OS | Config path |
|----|-------------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

## Cursor

Cursor MCP settings are stored in the workspace or global settings:
- Workspace: `.cursor/mcp.json` in your project root
- Global: Cursor Settings > MCP Servers

## Bridge script

Place the bridge script wherever is convenient. Common locations:
- macOS/Linux: `~/bin/geomanic-bridge.js` or clone this repo
- Windows: `C:\tools\geomanic-bridge.js`

Make sure `node` (v18+) is available in your PATH.
