<p align="center">
  <a href="https://geomanic.com">
    <img src="https://geomanic.com/assets/mime/logo-geomanic-horizontal.png" alt="Geomanic" width="280" />
  </a>
</p>

<h1 align="center">geomanic-mcp</h1>

<p align="center">
  MCP bridge, skills, and configuration templates for <a href="https://geomanic.com">Geomanic</a> — your GPS tracking platform.
</p>

## Repository structure

```
skills/
  claude/         Claude Desktop skill (SKILL.md)
  openclaw/       OpenClaw skill (SKILL.md)
bridge/
  geomanic-bridge.js   Node.js MCP bridge (stdin/stdout)
  config/
    macos.json         Claude Desktop config (macOS)
    linux.json         Claude Desktop config (Linux)
    windows.json       Claude Desktop config (Windows)
    cursor/mcp.json    Cursor MCP config
    curl/              Direct URL and cURL examples
docs/                  Tool reference and troubleshooting
```

## Quick start

1. Generate an MCP API key on **https://geomanic.com/data** (MCP Integration tile).
2. Choose your client below.

## OpenClaw (Skill)

Install from ClawHub:

```
/skills install @weltspion/geomanic
/secrets set GEOMANIC_TOKEN YOUR_MCP_KEY
```

See `skills/openclaw/README.md` for details.

## Claude Desktop (Skill)

1. Download this repository (Code → Download ZIP) and extract it.
2. Open `skills/claude/SKILL.md` in a text editor and replace every `YOUR_API_KEY` with your actual API key.
3. In Claude Desktop: **Settings → Skills → Add → Upload Skill** and select the edited `SKILL.md`.

Alternatively, download a ready-to-use SKILL.md with your key already included from [geomanic.com/data](https://geomanic.com/data).

## Cursor (Bridge)

1. Copy `bridge/config/cursor/mcp.json` into your Cursor MCP settings.
2. Replace `<GEOMANIC_TOKEN>` with your MCP API key.
3. Save and restart Cursor.

## Direct URL (any MCP client)

Clients that support remote MCP servers:
- URL: `https://geomanic.com/api/v1/mcp`
- Header: `Authorization: Bearer YOUR_MCP_KEY`

## Available tools

| Tool | Description |
|------|-------------|
| `create_waypoint` | Create a new GPS waypoint |
| `update_waypoint` | Update an existing waypoint by ID |
| `delete_waypoint` | Delete a waypoint by ID |
| `get_waypoint` | Get a single waypoint by ID |
| `list_waypoints` | List waypoints with time range, pagination, sorting |
| `get_statistics` | Aggregated stats: distance, speed, altitude, country breakdown |
| `get_date_range` | Earliest and latest waypoint dates |

See `docs/functions.md` for detailed parameter documentation.

## Security notes

- Treat the MCP API key like a password.
- Never commit keys to git.
- Revoke and regenerate keys on the Geomanic Data page if compromised.

## Development

The bridge is a plain Node.js script (Node 18+) with zero dependencies. No build steps required.
