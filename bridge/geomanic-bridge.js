#!/usr/bin/env node
/**
 * Geomanic MCP Bridge
 * Reads JSON-RPC from stdin, forwards to Geomanic API, writes response to stdout.
 * Usage: GEOMANIC_TOKEN=<mcp_api_key> node geomanic-bridge.js
 * Or: node geomanic-bridge.js < /path/to/request.json
 */

const MCP_URL = process.env.GEOMANIC_MCP_URL || "https://geomanic.com/api/v1/mcp";
const TOKEN = process.env.GEOMANIC_TOKEN;

if (!TOKEN) {
  console.error("GEOMANIC_TOKEN environment variable is required.");
  process.exit(1);
}

async function forward(line) {
  const res = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: line,
  });

  const text = await res.text();
  if (!res.ok) {
    const err = { jsonrpc: "2.0", error: { code: -32000, message: `HTTP ${res.status}: ${text}` }, id: null };
    return JSON.stringify(err);
  }
  return text;
}

async function main() {
  const rl = require("readline").createInterface({ input: process.stdin, crlfDelay: Infinity });
  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const out = await forward(trimmed);
      process.stdout.write(out + "\n");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const errObj = { jsonrpc: "2.0", error: { code: -32603, message: msg }, id: null };
      process.stdout.write(JSON.stringify(errObj) + "\n");
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
