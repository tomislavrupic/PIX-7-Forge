import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { requiredEffects } from "./effect-names.mjs";

test("contains the complete Neko City effect catalogue", async () => {
  const source = await readFile(new URL("../app/effects.ts", import.meta.url), "utf8");
  const renderer = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const labels = [...source.matchAll(/label: "([^"]+)"/g)].map((match) => match[1]);
  const ids = [...source.matchAll(/id: "([^"]+)"/g)].map((match) => match[1]);
  const modes = [...new Set([...source.matchAll(/mode: "([^"]+)"/g)].map((match) => match[1]))];

  assert.equal(labels.length, 37);
  assert.equal(new Set(ids).size, 37);
  assert.deepEqual(labels, requiredEffects);
  for (const mode of modes) {
    assert.match(renderer, new RegExp(`effect\\.mode === "${mode}"`), `missing renderer for ${mode}`);
  }
  assert.match(source, /category: "city"/);
  assert.match(source, /category: "security"/);
  assert.match(source, /category: "signal"/);
  assert.match(source, /category: "archive"/);
  assert.match(source, /category: "type"/);
});
