# geomanic-mcp-bridge

MCP bridge and configuration templates for [Geomanic](https://geomanic.com) — your GPS tracking companion.

## What this repo contains

- **Bridge**
  - `bridge/geomanic-bridge.js` — Node.js bridge that forwards MCP JSON-RPC messages to the Geomanic API endpoint.
- **Configs**
  - Ready-to-use templates for Claude Desktop (macOS / Windows / Linux), Cursor, and generic MCP clients.
- **Docs**
  - Tool reference, cURL examples, troubleshooting, and config file paths by OS.

## Quick start

1. Generate an MCP API key on **https://geomanic.com/data** (MCP Integration tile).
2. Copy the bridge script somewhere permanent (or clone this repo).
3. Choose a config template, paste your key, and restart your MCP client.

## Config (general)

You can connect any MCP client in one of two ways:

**Direct URL** (clients that support remote MCP servers):
- URL: `https://geomanic.com/api/v1/mcp`
- Header: `Authorization: Bearer YOUR_MCP_KEY`
- Template: `configs/general/direct-url.json`

**Local bridge** (clients that require a local command):
- Command: `node`
- Args: path to `bridge/geomanic-bridge.js`
- Env: `GEOMANIC_TOKEN=YOUR_MCP_KEY`
- Template: `configs/general/curl.txt`

## Claude Desktop

Use the OS-specific templates in `configs/claude-desktop/`:
- `macos.json`
- `windows.json`
- `linux.json`

Update the bridge path and set `GEOMANIC_TOKEN`.

Config file locations:
| OS | Path |
|----|------|
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json` |

## Cursor

1. Copy `configs/cursor/mcp.json` into your Cursor MCP settings.
2. Replace `<GEOMANIC_TOKEN>` with your MCP API key.
3. Save and restart Cursor.

## Available tools

| Tool | Description |
|------|-------------|
| `create_waypoint` | Create a new GPS waypoint |
| `update_waypoint` | Update an existing waypoint by ID |
| `delete_waypoint` | Delete a waypoint by ID |
| `get_waypoint` | Get a single waypoint by ID |
| `list_waypoints` | List waypoints with time range, pagination, sorting |
| `get_statistics` | Aggregated stats: countries, waypoints, dates, country breakdown |
| `get_date_range` | Earliest and latest waypoint dates for the user |

See `docs/functions.md` for detailed parameter documentation.

## OpenClaw

Install the Geomanic skill directly from ClawHub:

```
/skills install @weltspion/geomanic
```

Then set your API key:

```
/secrets set GEOMANIC_TOKEN gmnc_mcp_your_key_here
```

See `openclaw-skill/README.md` for details.

## Security notes

- Treat the MCP API key like a password.
- Never commit keys to git.
- Revoke and regenerate keys on the Geomanic Data page if compromised.

## Development

The bridge is a plain Node.js script (Node 18+) with zero dependencies. No build steps required.
