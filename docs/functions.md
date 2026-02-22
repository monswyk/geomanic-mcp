# MCP Tools Reference

This document describes all available MCP tools and their parameters.

## create_waypoint

Create a new GPS waypoint with automatic geolookup (country, place, timezone).

**Required:** `timestamp_utc` (ISO 8601), `latitude`, `longitude`

**Optional:** `altitude` (meters), `speed_kmh`, `heading_deg`, `device_id`

**Returns:** The created waypoint with `id`, `timestamp_utc`, `latitude`, `longitude`.

---

## update_waypoint

Update an existing waypoint by ID. Only provided fields are changed.

**Required:** `id` (UUID)

**Optional:** `latitude`, `longitude`, `altitude`, `speed_kmh`, `heading_deg`, `place`, `country_iso`, `device_id`

**Returns:** `{ updated: true/false }`

---

## delete_waypoint

Delete a single waypoint by ID.

**Required:** `id` (UUID)

**Returns:** `{ deleted: true/false }`

---

## get_waypoint

Get full details of a single waypoint by ID.

**Required:** `id` (UUID)

**Returns:** Complete waypoint object with all fields.

---

## list_waypoints

List waypoints with optional filters and pagination.

**Optional:**
- `from` — ISO 8601 start datetime (inclusive)
- `to` — ISO 8601 end datetime (inclusive)
- `limit` — Max results, 1–200 (default 50)
- `offset` — Skip N results (default 0)
- `order` — `asc` or `desc` by timestamp (default `desc`)

**Returns:** `{ waypoints: [...], total, limit, offset }`

---

## get_statistics

Get aggregated statistics for a time period including country breakdown.

**Required:** `from` (ISO 8601 date or datetime), `to` (ISO 8601 date or datetime). Both date-only (`2026-02-22`) and full datetime (`2026-02-22T00:00:00Z`) are accepted.

**Optional:** `suppress_flights` — Filter out likely flight data, i.e. waypoints at altitude > 2000m or with speed = 0 (default `true`)

**Returns:**
- `waypoint_count` — Total waypoints in period
- `active_days` — Days with at least one waypoint
- `country_count` — Distinct countries visited
- `total_distance_km` — Total distance in km
- `avg_speed_kmh` — Average speed in km/h
- `max_speed_kmh` — Max speed in km/h
- `avg_altitude` — Average altitude in meters
- `max_altitude` — Max altitude in meters
- `waypoints_per_day` — Average waypoints per active day
- `avg_km_per_day` — Average km per active day
- `first_waypoint` — ISO timestamp of earliest waypoint
- `last_waypoint` — ISO timestamp of latest waypoint
- `countries` — Array of `{ country_iso, total_days, full_days, part_days }`

---

## get_date_range

Get the overall date range for the authenticated user.

**No parameters.**

**Returns:**
- `earliest` — ISO timestamp of first-ever waypoint
- `latest` — ISO timestamp of most recent waypoint
- `total_waypoints` — Total number of waypoints
