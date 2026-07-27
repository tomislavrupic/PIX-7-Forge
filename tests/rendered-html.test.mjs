import assert from "node:assert/strict";
import test from "node:test";
import { requiredEffects } from "./effect-names.mjs";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders PIX-7 Forge product shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>PIX-7 Forge/);
  assert.match(html, /ELEMENT/);
  assert.match(html, /FORGE/);
  assert.match(html, /LIVE ELEMENT/);
  assert.match(html, /DESIGN DNA/);
  assert.match(html, /SEED &amp; LINEAGE/);
  assert.match(html, /EXPORT/);
  assert.match(html, /51(?:<!-- -->)? SYSTEMS/);
  for (const effect of requiredEffects) assert.match(html, new RegExp(effect));
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});
