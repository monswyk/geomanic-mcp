#!/usr/bin/env node
/**
 * Geomanic MCP Bridge
 * Reads JSON-RPC from stdin, forwards to Geomanic API, writes response to stdout.
 * Usage: GEOMANIC_TOKEN=<mcp_api_key> node geomanic-bridge.js
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
    return JSON.stringify({ jsonrpc: "2.0", error: { code: -32000, message: `HTTP ${res.status}: ${text}` }, id: null });
  }
  return text;
}

async function main() {
  const rl = require("readline").createInterface({ input: process.stdin, crlfDelay: Infinity });
  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let msg;
    try {
      msg = JSON.parse(trimmed);
    } catch {
      continue;
    }

    const isNotification = msg.id === undefined || msg.id === null;

    try {
      const out = await forward(trimmed);
      if (!isNotification && out) {
        try {
          const resp = JSON.parse(out);
          if (resp.id !== null && resp.id !== undefined) {
            process.stdout.write(out + "\n");
          }
        } catch {
          // non-JSON response, ignore
        }
      }
    } catch (err) {
      if (!isNotification) {
        const errMsg = err instanceof Error ? err.message : String(err);
        process.stdout.write(JSON.stringify({ jsonrpc: "2.0", error: { code: -32603, message: errMsg }, id: msg.id ?? null }) + "\n");
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
