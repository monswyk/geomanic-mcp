---
name: geomanic
description: Query GPS travel data from Geomanic. Use when the user asks about travel distance, countries visited, waypoints, GPS tracking, trip statistics, or travel history. Also use for creating, updating, or deleting waypoints.
---

# Geomanic

Query and manage GPS travel data from [Geomanic](https://geomanic.com), a privacy-first GPS tracking platform.

## Authentication

The API key is in the environment variable `GEOMANIC_TOKEN`. Include it as a Bearer token in every request.

## API

Send JSON-RPC POST requests to `https://geomanic.com/api/v1/mcp`. The response data is in `result.content[0].text` as a JSON string.

```bash
curl -s -X POST https://geomanic.com/api/v1/mcp \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GEOMANIC_TOKEN" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"TOOL_NAME","arguments":{...}}}'
```

## Tools

### get_statistics

Aggregated travel statistics: distance (km), speed (km/h), altitude (m), waypoint count, active days, country breakdown with full/part days.

Required: `from`, `to` (ISO 8601 date or datetime). Optional: `suppress_flights` (boolean, default true).

```bash
curl -s -X POST https://geomanic.com/api/v1/mcp \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GEOMANIC_TOKEN" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_statistics","arguments":{"from":"2026-02-22","to":"2026-02-22"}}}'
```

### get_date_range

Earliest and latest waypoint dates. No parameters.

```bash
curl -s -X POST https://geomanic.com/api/v1/mcp \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GEOMANIC_TOKEN" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_date_range","arguments":{}}}'
```

### list_waypoints

List waypoints with optional filters. Optional: `from`, `to` (ISO 8601), `limit` (default 50, max 200), `offset` (default 0), `order` ("asc"/"desc", default "desc").

```bash
curl -s -X POST https://geomanic.com/api/v1/mcp \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GEOMANIC_TOKEN" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list_waypoints","arguments":{"from":"2026-02-22","to":"2026-02-22","limit":10}}}'
```

### get_waypoint

Single waypoint by UUID. Required: `id` (string).

### create_waypoint

Create a waypoint. Required: `timestamp_utc` (ISO 8601), `latitude`, `longitude`. Optional: `speed_kmh`, `altitude`, `heading_deg`, `device_id`.

### update_waypoint

Update a waypoint. Required: `id` (string, UUID). Optional: `latitude`, `longitude`, `speed_kmh`, `altitude`, `heading_deg`, `country_iso`, `place`, `device_id`.

### delete_waypoint

Delete a waypoint. Required: `id` (string, UUID).

## Notes

- Dates accept both date-only (`2026-02-22`) and full datetime (`2026-02-22T00:00:00Z`).
- Distance is in kilometers, speed in km/h, altitude in meters.
- Get your API key at [geomanic.com/data](https://geomanic.com/data).
