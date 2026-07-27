import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const requiredEffects = [
  "Transit Spine", "District Grid", "Patrol Coordinates", "Crew Orbit",
  "Signal Board", "Window Telemetry", "Courier Route", "Infrastructure Void",
  "Security Perimeter", "Access Handshake", "Scanner Emission", "System Heartbeat",
  "Control Surface", "Magnetic Field", "Signal Density", "Broadcast Field",
  "Frequency Bleed", "Night Rail", "Spectral Fabric", "Signal Residue",
  "Packet Decay", "City Intelligence Core", "Archive Materialize", "Memory Assembly",
  "Surveillance Decode", "Terminal Recovery", "Corrupted Hologram", "Signal Impact",
  "Identity Mask", "Patrol Searchlight", "Damaged Signage", "Terminal Decode",
  "Intercepted Message", "Neon Failure", "Perimeter Type", "Character Broadcast",
  "ASCII Overload",
];

test("contains the complete Neko City effect catalogue", async () => {
  const source = await readFile(new URL("../app/effects.ts", import.meta.url), "utf8");
  const labels = [...source.matchAll(/label: "([^"]+)"/g)].map((match) => match[1]);
  const ids = [...source.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);

  assert.equal(labels.length, 37);
  assert.equal(new Set(ids).size, 37);
  assert.deepEqual(labels, requiredEffects);
  assert.match(source, /category: "city"/);
  assert.match(source, /category: "security"/);
  assert.match(source, /category: "signal"/);
  assert.match(source, /category: "archive"/);
  assert.match(source, /category: "type"/);
});
