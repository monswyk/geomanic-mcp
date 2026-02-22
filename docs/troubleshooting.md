# Troubleshooting

## "Unauthorized — invalid or missing MCP API key"

- The MCP API key is invalid or expired.
- Generate a new key on https://geomanic.com/data (MCP Integration tile).
- Keys start with `gmnc_mcp_`.

## Claude Desktop: skill not working

- Make sure you replaced `YOUR_API_KEY` in the SKILL.md with your actual key before uploading.
- Re-upload the skill after making changes.
- Restart Claude Desktop after adding or updating a skill.

## Bridge: "GEOMANIC_TOKEN environment variable is required"

The bridge script requires the `GEOMANIC_TOKEN` env variable. Make sure it is set in:
- Cursor: `env` object in `mcp.json`
- Shell: `export GEOMANIC_TOKEN=gmnc_mcp_...` before running the bridge

## Bridge hangs / no output

- Verify Node.js v18+ is installed: `node --version`
- Test the endpoint directly with cURL (see `docs/howto.md`).
- Check that the URL is correct: `https://geomanic.com/api/v1/mcp`

## Cursor: Geomanic tools not showing

- Verify the config JSON is valid (no trailing commas, correct paths).
- Check that the bridge path in `args` is absolute and correct for your OS.
- Restart Cursor after editing the config.

## "Parse error" response

- The request body is not valid JSON.
- Ensure you are sending JSON-RPC 2.0 format: `{ "jsonrpc": "2.0", "id": 1, "method": "...", "params": {...} }`

## HTTPS / network errors

- The bridge uses `fetch()` (Node 18+ built-in) to connect to `https://geomanic.com`.
- If you are behind a proxy, configure `HTTPS_PROXY` / `HTTP_PROXY` env variables.
- Override the endpoint URL: `GEOMANIC_MCP_URL=https://your-instance.example.com/api/v1/mcp`
