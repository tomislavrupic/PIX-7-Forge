import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships a deterministic HyperFrames composition exporter", async () => {
  const source = await readFile(new URL("../app/hyperframes.ts", import.meta.url), "utf8");
  assert.match(source, /data-composition-id/);
  assert.match(source, /data-duration/);
  assert.match(source, /window\.__timelines=\[timeline\]/);
  assert.match(source, /pause\(\)/);
  assert.match(source, /seek\(seconds\)/);
  assert.match(source, /patrol-hud/);
  assert.match(source, /neko-broadcast/);
  assert.match(source, /packet-assembly/);
  assert.match(source, /signal-fault/);
});
