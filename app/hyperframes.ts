export type LoopCollection =
  | "patrol-hud"
  | "neko-broadcast"
  | "packet-assembly"
  | "signal-fault";

export type HyperFramesLoopRecipe = {
  seed: string;
  family: string;
  collection: LoopCollection;
  accent: string;
  duration: number;
  fps: number;
  width: number;
  height: number;
  transparent: boolean;
  density: number;
  detail: number;
  damage: number;
  segments: number;
  variant: number;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character] ?? character);

function collectionMarkup(collection: LoopCollection, segments: number) {
  const particles = Array.from({ length: Math.max(36, segments * 5) }, (_, index) => {
    const angle = (index / Math.max(36, segments * 5)) * Math.PI * 2;
    const radius = 12 + ((index * 29) % 40);
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    return `<i style="--i:${index};--x:${x.toFixed(2)}%;--y:${y.toFixed(2)}%"></i>`;
  }).join("");

  if (collection === "patrol-hud") {
    return `<div class="patrol scope"><i></i><i></i><i></i><i></i><b></b><strong>PX–7 / TARGET ACQUIRED</strong><small>X 071.248 · Y 611.763</small></div>`;
  }
  if (collection === "neko-broadcast") {
    return `<div class="broadcast"><header><span>NEKO CITY // EMERGENCY NETWORK</span><b>LIVE 07</b></header><main><strong>DISTRICT SIGNAL</strong><em>RESTORED</em><div class="bars">${Array.from({ length: 18 }, (_, index) => `<i style="height:${15 + (index % 7) * 12}%;opacity:${0.35 + (index % 3) * 0.25}"></i>`).join("")}</div></main><footer><span>▲ PATROL CHANNEL OPEN</span><div>TRANSMISSION 611763979 · NIGHT RAIL NOMINAL · ARCHIVE LINK STABLE</div></footer></div>`;
  }
  if (collection === "packet-assembly") {
    return `<div class="assembly"><div class="particles">${particles}</div><div class="packet"><span>07</span><strong>MEMORY<br>PACKET</strong><small>ASSEMBLY 98.4%</small></div><b>ARCHIVE MATERIALIZATION</b></div>`;
  }
  return `<div class="fault"><div class="fault-grid"></div><strong data-label="SIGNAL FAULT">SIGNAL FAULT</strong><span>CHROMA DESYNC / PACKET DAMAGE</span><div class="tear tear-a"></div><div class="tear tear-b"></div><div class="tear tear-c"></div></div>`;
}

export function buildHyperFramesComposition(recipe: HyperFramesLoopRecipe) {
  const safeSeed = escapeHtml(recipe.seed);
  const safeCollection = escapeHtml(recipe.collection);
  const background = recipe.transparent ? "transparent" : "#050706";
  const markup = collectionMarkup(recipe.collection, recipe.segments);
  const payload = JSON.stringify({ version: "PIX-7/HYPERFRAMES-01", ...recipe }).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${safeSeed} · VIDEO LOOP</title>
<style>
:root{--accent:${recipe.accent};--duration:${recipe.duration}s;--p:0;--wave:0;--cycle:0}
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:${background};font-family:"SFMono-Regular",Consolas,monospace}
.composition{position:relative;width:${recipe.width}px;height:${recipe.height}px;overflow:hidden;color:var(--accent);background:${background};isolation:isolate}
.composition:before{content:"";position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:8% 8%;opacity:.45}
.scope{position:absolute;left:50%;top:50%;width:52%;aspect-ratio:1;translate:-50% -50%;border:1px solid color-mix(in srgb,var(--accent) 70%,transparent);border-radius:50%;rotate:calc(var(--p)*360deg)}
.scope:before,.scope:after{content:"";position:absolute;inset:13%;border:1px dashed var(--accent);border-radius:50%}.scope:after{inset:36%;border-style:solid;background:color-mix(in srgb,var(--accent) 8%,transparent)}
.scope>i{position:absolute;width:19%;height:19%;border-color:var(--accent);border-style:solid}.scope>i:nth-child(1){left:-3%;top:-3%;border-width:2px 0 0 2px}.scope>i:nth-child(2){right:-3%;top:-3%;border-width:2px 2px 0 0}.scope>i:nth-child(3){right:-3%;bottom:-3%;border-width:0 2px 2px 0}.scope>i:nth-child(4){left:-3%;bottom:-3%;border-width:0 0 2px 2px}.scope>b{position:absolute;left:50%;top:50%;width:8%;aspect-ratio:1;translate:-50% -50%;background:var(--accent);clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)}.scope strong,.scope small{position:absolute;left:50%;translate:-50% 0;white-space:nowrap;letter-spacing:.16em}.scope strong{top:106%;font-size:1.7vw}.scope small{top:114%;font-size:.9vw;color:#7c8880}
.broadcast{position:absolute;inset:7%;border:1px solid var(--accent);display:grid;grid-template-rows:12% 1fr 18%;background:#080b09}.broadcast header,.broadcast footer{display:flex;align-items:center;padding:0 3%;border-bottom:1px solid #344039;font-size:1.2vw;letter-spacing:.14em}.broadcast header b{margin-left:auto;background:var(--accent);color:#050706;padding:.5em .8em}.broadcast main{position:relative;display:flex;flex-direction:column;justify-content:center;padding:5%;overflow:hidden}.broadcast main strong{font-size:4vw;color:#d8ded9}.broadcast main em{font-size:9vw;line-height:.9;font-style:normal;font-weight:900;letter-spacing:-.06em;translate:calc(var(--wave)*3%) 0}.bars{display:flex;gap:.8%;align-items:end;height:19%;margin-top:5%}.bars i{flex:1;background:var(--accent)}.broadcast footer{border:0;border-top:1px solid #344039;gap:4%;overflow:hidden}.broadcast footer div{white-space:nowrap;translate:calc(var(--wave)*-12%) 0;color:#b7c0ba}
.assembly{position:absolute;inset:0}.particles i{position:absolute;left:calc(var(--x) + (50% - var(--x)) * var(--cycle));top:calc(var(--y) + (50% - var(--y)) * var(--cycle));width:4px;height:4px;background:var(--accent);opacity:calc(.25 + var(--cycle)*.75);transform:rotate(calc(var(--i)*19deg)) scale(calc(.5 + var(--cycle)*1.5))}.packet{position:absolute;left:50%;top:50%;width:28%;aspect-ratio:1;translate:-50% -50%;border:1px solid var(--accent);clip-path:polygon(9% 0,100% 0,100% 91%,91% 100%,0 100%,0 9%);display:flex;flex-direction:column;justify-content:center;align-items:center;background:#080b09;scale:calc(.55 + var(--cycle)*.45)}.packet span{font-size:7vw;font-weight:900}.packet strong{text-align:center;font-size:1.7vw;letter-spacing:.12em}.packet small{margin-top:8%;font-size:.9vw;color:#7b857e}.assembly>b{position:absolute;left:4%;bottom:4%;font-size:1vw;letter-spacing:.18em}
.fault{position:absolute;inset:0;overflow:hidden}.fault-grid{position:absolute;inset:-10%;background:repeating-linear-gradient(0deg,transparent 0 7px,color-mix(in srgb,var(--accent) 20%,transparent) 8px 9px);transform:skewY(-4deg) translateY(calc(var(--wave)*30px))}.fault strong{position:absolute;left:50%;top:48%;translate:calc(-50% + var(--wave)*18px) -50%;font:900 9vw/.8 Arial Narrow,Arial,sans-serif;white-space:nowrap;letter-spacing:-.04em}.fault strong:before,.fault strong:after{content:attr(data-label);position:absolute;inset:0;opacity:.5;clip-path:inset(0 0 54% 0)}.fault strong:before{color:#ff397f;translate:-8px 0}.fault strong:after{color:#35dcff;translate:8px 0;clip-path:inset(54% 0 0 0)}.fault>span{position:absolute;left:50%;top:62%;translate:-50% 0;font-size:1.2vw;letter-spacing:.22em}.tear{position:absolute;left:0;right:0;height:3%;background:var(--accent);mix-blend-mode:screen;translate:calc(var(--wave)*18%) 0}.tear-a{top:31%}.tear-b{top:52%;height:1%}.tear-c{top:71%;translate:calc(var(--wave)*-22%) 0}
</style>
</head>
<body>
<section class="composition" data-composition-id="pix7-${safeCollection}" data-start="0" data-duration="${recipe.duration}" data-track-index="0" aria-label="${safeCollection} video loop">
${markup}
</section>
<script>
window.__PIX7_RECIPE__=${payload};
const root=document.documentElement;
const duration=${recipe.duration};
let currentTime=0;
const timeline={
  pause(){return timeline},
  seek(seconds){currentTime=((Number(seconds)||0)%duration+duration)%duration;const p=currentTime/duration;root.style.setProperty("--p",String(p));root.style.setProperty("--wave",String(Math.sin(p*Math.PI*2)));root.style.setProperty("--cycle",String(.5-.5*Math.cos(p*Math.PI*2)));return timeline},
  time(seconds){if(seconds===undefined)return currentTime;return timeline.seek(seconds)},
  progress(value){if(value===undefined)return currentTime/duration;return timeline.seek(Number(value)*duration)},
  duration(){return duration}
};
window.__timelines=[timeline];
timeline.pause().seek(0);
</script>
</body>
</html>`;
}
