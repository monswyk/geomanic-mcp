# How to call tools (cURL)

## 1) List available tools

```bash
curl -X POST "https://geomanic.com/api/v1/mcp" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_MCP_KEY" \
  --data '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

## 2) Call a tool

Pick a tool name from the `tools/list` response and pass `name` + `arguments` via `tools/call`.

### Example: list_waypoints (last 10)

```bash
curl -X POST "https://geomanic.com/api/v1/mcp" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_MCP_KEY" \
  --data '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "list_waypoints",
      "arguments": { "limit": 10 }
    }
  }'
```

### Example: get_statistics

```bash
curl -X POST "https://geomanic.com/api/v1/mcp" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_MCP_KEY" \
  --data '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "get_statistics",
      "arguments": { "from": "2025-01-01T00:00:00Z", "to": "2025-12-31T23:59:59Z" }
    }
  }'
```

### Example: create_waypoint

```bash
curl -X POST "https://geomanic.com/api/v1/mcp" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_MCP_KEY" \
  --data '{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "tools/call",
    "params": {
      "name": "create_waypoint",
      "arguments": {
        "timestamp_utc": "2026-02-16T12:00:00Z",
        "latitude": 47.3769,
        "longitude": 8.5417,
        "altitude": 408,
        "device_id": "manual"
      }
    }
  }'
```

### Example: get_date_range

```bash
curl -X POST "https://geomanic.com/api/v1/mcp" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_MCP_KEY" \
  --data '{"jsonrpc":"2.0","id":5,"method":"tools/call","params":{"name":"get_date_range","arguments":{}}}'
```

## Notes

- All `tools/call` requests require `params.name` (tool name) and `params.arguments` (tool parameters).
- The MCP API key is sent via `Authorization: Bearer <key>`.
- Responses follow JSON-RPC 2.0 format with `result.content[0].text` containing the JSON response.
