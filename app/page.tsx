"use client";

import { useCallback, useMemo, useState } from "react";
import { nekoEffects, type EffectCategory, type NekoEffectId } from "./effects";

type CoreFamily = "panel" | "button" | "slider" | "meter" | "badge" | "hud" | "reticle" | "orbit" | "loader" | "waveform" | "burst" | "pattern" | "divider" | "liquid";
type Family = CoreFamily | NekoEffectId;
type State = "idle" | "hover" | "active" | "disabled" | "error";
type Accent = "lime" | "cyan" | "purple" | "amber" | "red";
type Structure = "flat" | "framed" | "segmented" | "modular" | "industrial";
type AnimationMode = "none" | "pulse" | "scan" | "flicker" | "lock-on" | "data-flow";

type Recipe = {
  family: Family;
  role: string;
  density: number;
  pixelation: number;
  technicality: number;
  detail: number;
  damage: number;
  structure: Structure;
  accent: Accent;
  state: State;
  animation: AnimationMode;
  cornerCut: number;
  borderWidth: number;
  segments: number;
  variant: number;
};

const coreFamilies: { id: CoreFamily; label: string; code: string; category: "core" }[] = [
  { id: "panel", label: "Panel", code: "PNL", category: "core" },
  { id: "button", label: "Button", code: "BTN", category: "core" },
  { id: "slider", label: "Slider", code: "SLD", category: "core" },
  { id: "meter", label: "Meter", code: "MTR", category: "core" },
  { id: "badge", label: "Badge", code: "BDG", category: "core" },
  { id: "hud", label: "HUD Marker", code: "HUD", category: "core" },
  { id: "reticle", label: "Reticle", code: "RTL", category: "core" },
  { id: "orbit", label: "Orbit", code: "ORB", category: "core" },
  { id: "loader", label: "Loader", code: "LDR", category: "core" },
  { id: "waveform", label: "Waveform", code: "WAV", category: "core" },
  { id: "burst", label: "Signal Burst", code: "BST", category: "core" },
  { id: "pattern", label: "Pattern", code: "PTN", category: "core" },
  { id: "divider", label: "Data Divider", code: "DVD", category: "core" },
  { id: "liquid", label: "Liquid Signal", code: "LIQ", category: "core" },
];
const families = [...coreFamilies, ...nekoEffects];
type CatalogueCategory = "all" | "core" | EffectCategory;
const catalogueCategories: CatalogueCategory[] = ["all", "core", "city", "security", "signal", "broadcast", "archive", "type"];

const roles = ["Primary", "Secondary", "Warning", "Data", "Navigation", "Playback"];
const structures: Structure[] = ["flat", "framed", "segmented", "modular", "industrial"];
const accents: Accent[] = ["lime", "cyan", "purple", "amber", "red"];
const animations: AnimationMode[] = ["none", "pulse", "scan", "flicker", "lock-on", "data-flow"];
const states: State[] = ["idle", "hover", "active", "disabled", "error"];
const accentHex: Record<Accent, string> = {
  lime: "#c9ff3d",
  cyan: "#62d9e8",
  purple: "#a780ff",
  amber: "#ffb84c",
  red: "#ff5757",
};

function hashSeed(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  let value = seed || 1;
  return () => {
    value = Math.imul(48271, value) % 2147483647;
    return (value & 2147483647) / 2147483647;
  };
}

function recipeFrom(seedText: string, family: Family): Recipe {
  const random = rng(hashSeed(seedText));
  const pick = <T,>(items: T[]) => items[Math.floor(random() * items.length)];
  return {
    family,
    role: pick(roles),
    density: Math.round((0.25 + random() * 0.7) * 100),
    pixelation: Math.round(random() * 68),
    technicality: Math.round((0.48 + random() * 0.5) * 100),
    detail: Math.round((0.25 + random() * 0.75) * 100),
    damage: Math.round(random() * 38),
    structure: pick(structures),
    accent: pick(accents),
    state: "active",
    animation: pick(animations),
    cornerCut: Math.round(2 + random() * 11),
    borderWidth: random() > 0.82 ? 2 : 1,
    segments: Math.round(4 + random() * 12),
    variant: Math.floor(random() * 6) + 1,
  };
}

function familyCode(family: Family) {
  return families.find((item) => item.id === family)?.code ?? "SYS";
}

function makeSeed(family: Family) {
  return `PX7-${familyCode(family)}-${Math.floor(100000000 + Math.random() * 899999999)}`;
}

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function NekoEffectShape({ effect, recipe, common, style }: {
  effect: (typeof nekoEffects)[number];
  recipe: Recipe;
  common: string;
  style: React.CSSProperties;
}) {
  const marks = Array.from({ length: Math.max(24, recipe.segments * 3) });
  const label = effect.label.toUpperCase();
  const markStyle = (index: number) => ({
    "--i": index,
    "--count": marks.length,
    "--x": `${(index * 37 + recipe.variant * 11) % 100}%`,
    "--y": `${(index * 61 + recipe.segments * 7) % 100}%`,
    "--delay": `${-(index % 12) * 0.11}s`,
  } as React.CSSProperties);

  const frame = (children: React.ReactNode) => (
    <div className={`${common} neko-effect fx-${effect.id} mode-${effect.mode}`} style={style}>
      <div className="fx-meta"><span>NEKO CITY / {effect.code}</span><b>{String(recipe.variant).padStart(2, "0")}</b></div>
      <div className="fx-canvas">{children}</div>
      <div className="fx-caption"><strong>{label}</strong><span>{effect.description}</span></div>
    </div>
  );

  if (effect.mode === "led") {
    return frame(<div className="fx-led"><span>NEKO</span><i>●</i><span>CITY 07</span></div>);
  }
  if (effect.mode === "text") {
    return frame(<div className="fx-type" data-text={label}>{label}</div>);
  }
  if (effect.mode === "ascii") {
    const glyphs = "▓▒░/\\+*#<>[]";
    return frame(<div className="fx-ascii">{marks.map((_, index) => <i key={index} style={markStyle(index)}>{glyphs[(index + recipe.variant) % glyphs.length]}</i>)}</div>);
  }
  if (effect.mode === "orbit-text") {
    return frame(<div className="fx-orbit-type"><span>RESTRICTED • NEKO CITY • SECTOR 07 • KEEP SIGNAL CLEAR •</span><i /></div>);
  }
  if (effect.mode === "type-wave") {
    return frame(<div className="fx-type-wave">{label.split("").map((char, index) => <i key={`${char}-${index}`} style={{ "--i": index } as React.CSSProperties}>{char === " " ? "\u00a0" : char}</i>)}</div>);
  }
  if (effect.mode === "lines" || effect.mode === "waves" || effect.mode === "pulse") {
    return frame(<div className="fx-lines">{Array.from({ length: 15 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}<span /></div>);
  }
  if (effect.mode === "grid" || effect.mode === "dots" || effect.mode === "field") {
    return frame(<div className="fx-grid">{marks.map((_, index) => <i key={index} style={markStyle(index)} />)}<span /></div>);
  }
  if (effect.mode === "cursor" || effect.mode === "spotlight") {
    return frame(<div className="fx-locator"><i className="axis-x" /><i className="axis-y" /><span /><b>X 071 / Y 248</b></div>);
  }
  if (effect.mode === "orbit" || effect.mode === "orb" || effect.mode === "arcs" || effect.mode === "ripple") {
    return frame(<div className="fx-radial"><i className="radial-a" /><i className="radial-b" /><i className="radial-c" /><span /></div>);
  }
  if (effect.mode === "route") {
    return frame(<div className="fx-route">{Array.from({ length: 13 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}<span /></div>);
  }
  if (effect.mode === "void" || effect.mode === "tunnel") {
    return frame(<div className="fx-tunnel">{Array.from({ length: 12 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}<span /></div>);
  }
  if (effect.mode === "border") {
    return frame(<div className="fx-border"><i /><span>ACCESS / {effect.code}</span></div>);
  }
  if (effect.mode === "trail" || effect.mode === "liquid") {
    return frame(<div className="fx-trails">{Array.from({ length: 8 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</div>);
  }
  if (effect.mode === "particles") {
    return frame(<div className="fx-particles">{marks.map((_, index) => <i key={index} style={markStyle(index)} />)}<span>PACKET 07</span></div>);
  }
  if (effect.mode === "reveal" || effect.mode === "tiles" || effect.mode === "pixel") {
    return frame(<div className="fx-tiles">{marks.map((_, index) => <i key={index} style={markStyle(index)} />)}<span>ARCHIVE / FRAME 611</span></div>);
  }
  return frame(<div className="fx-grid">{marks.map((_, index) => <i key={index} style={markStyle(index)} />)}</div>);
}

function ComponentShape({ recipe, scale = 1, state }: { recipe: Recipe; scale?: number; state?: State }) {
  const currentState = state ?? recipe.state;
  const style = {
    "--accent": currentState === "error" ? accentHex.red : accentHex[recipe.accent],
    "--cut": `${recipe.cornerCut}px`,
    "--bw": `${recipe.borderWidth}px`,
    "--density": recipe.density / 100,
    "--damage": recipe.damage / 100,
    "--scale": scale,
    "--variant": recipe.variant,
  } as React.CSSProperties;
  const common = `generated generated-${recipe.family} variant-${recipe.variant} structure-${recipe.structure} state-${currentState} anim-${recipe.animation}`;
  const nekoEffect = nekoEffects.find((effect) => effect.id === recipe.family);
  if (nekoEffect) return <NekoEffectShape effect={nekoEffect} recipe={recipe} common={common} style={style} />;

  if (recipe.family === "button") {
    return (
      <div className={common} style={style}>
        <span className="button-index">07</span><span>INITIALIZE</span><i />
      </div>
    );
  }
  if (recipe.family === "slider") {
    return (
      <div className={common} style={style}>
        <div className="component-label"><span>PHASE OFFSET</span><b>62.8</b></div>
        <div className="slider-track"><span /><i /></div>
        <div className="slider-scale"><span>00</span><span>25</span><span>50</span><span>75</span><span>99</span></div>
      </div>
    );
  }
  if (recipe.family === "meter") {
    return (
      <div className={common} style={style}>
        <div className="component-label"><span>SIGNAL / L</span><b>-08.2 dB</b></div>
        <div className="meter-bars">
          {Array.from({ length: recipe.segments }).map((_, index) => <i key={index} className={index < Math.ceil(recipe.segments * 0.68) ? "lit" : ""} />)}
        </div>
        <div className="meter-footer"><span>GATE -42</span><span>PEAK HOLD</span></div>
      </div>
    );
  }
  if (recipe.family === "badge") {
    return (
      <div className={common} style={style}>
        <span className="badge-dot" /><span>SYNC ARMED</span><b>PX–07</b>
      </div>
    );
  }
  if (recipe.family === "hud") {
    return (
      <div className={common} style={style}>
        <span className="hud-ring ring-a" /><span className="hud-ring ring-b" />
        <span className="hud-cross h" /><span className="hud-cross v" />
        <span className="hud-target" />
        <b>TRK–071</b><small>LOCK 98.4%</small>
      </div>
    );
  }
  if (recipe.family === "reticle") {
    return (
      <div className={common} style={style}>
        <span className="primitive-core" />
        {Array.from({ length: 4 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
        <b>ACQ {String(recipe.variant).padStart(2, "0")}</b><small>VECTOR LOCK</small>
      </div>
    );
  }
  if (recipe.family === "orbit") {
    return (
      <div className={common} style={style}>
        {Array.from({ length: 3 }).map((_, index) => <span key={index} className={`orbit-ring orbit-${index}`}><i /></span>)}
        <span className="primitive-core" /><b>ORBIT / {recipe.segments}</b>
      </div>
    );
  }
  if (recipe.family === "loader") {
    return (
      <div className={common} style={style}>
        <div className="radial-elements">{Array.from({ length: recipe.segments }).map((_, index) => <i key={index} style={{ "--i": index, "--count": recipe.segments } as React.CSSProperties} />)}</div>
        <strong>{recipe.variant % 2 ? "72" : "SYNC"}</strong><small>PROCESS {recipe.variant}/6</small>
      </div>
    );
  }
  if (recipe.family === "waveform") {
    return (
      <div className={common} style={style}>
        <div className="wave-bars">{Array.from({ length: 24 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}</div>
        <span>CH.{recipe.variant} / SIGNAL MEMORY</span>
      </div>
    );
  }
  if (recipe.family === "burst") {
    return (
      <div className={common} style={style}>
        <div className="radial-elements">{Array.from({ length: recipe.segments }).map((_, index) => <i key={index} style={{ "--i": index, "--count": recipe.segments } as React.CSSProperties} />)}</div>
        <span className="primitive-core" /><b>IMPULSE</b>
      </div>
    );
  }
  if (recipe.family === "pattern") {
    return (
      <div className={common} style={style}>
        {Array.from({ length: 48 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
        <b>FIELD {recipe.variant}.0</b>
      </div>
    );
  }
  if (recipe.family === "divider") {
    return (
      <div className={common} style={style}>
        <b>PX–0{recipe.variant}</b><span className="divider-line" />
        {Array.from({ length: Math.min(8, recipe.segments) }).map((_, index) => <i key={index} />)}
        <span className="divider-line end" /><small>DATA FLOW</small>
      </div>
    );
  }
  if (recipe.family === "liquid") {
    return (
      <div className={common} style={style}>
        {Array.from({ length: 5 }).map((_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
        <b>FLUID SIGNAL / {recipe.variant}</b>
      </div>
    );
  }
  return (
    <div className={common} style={style}>
      <header><span>CHANNEL MATRIX / 07</span><b>ONLINE</b></header>
      <div className="panel-readout"><strong>72.4</strong><span>PHASE COHERENCE<br />STABLE / NOMINAL</span></div>
      <div className="panel-lines">{Array.from({ length: 5 }).map((_, i) => <i key={i} />)}</div>
      <footer><span>SYS.24</span><span>∆ 0.008</span><span>LIVE</span></footer>
    </div>
  );
}

function TraitSlider({ label, value, locked, onChange, onLock }: { label: string; value: number; locked: boolean; onChange: (value: number) => void; onLock: () => void }) {
  return (
    <div className="trait-block">
      <div className="trait-title"><label>{label}</label><button className={locked ? "lock locked" : "lock"} onClick={onLock} aria-label={`${locked ? "Unlock" : "Lock"} ${label}`}>{locked ? "◆" : "◇"}</button></div>
      <div className="range-line"><input type="range" min="0" max="100" value={value} onChange={(e) => onChange(Number(e.target.value))} /><output>{String(value).padStart(2, "0")}</output></div>
    </div>
  );
}

export default function Home() {
  const [family, setFamily] = useState<Family>("panel");
  const [seed, setSeed] = useState("PX7-PNL-611763979");
  const [recipe, setRecipe] = useState<Recipe>(() => recipeFrom("PX7-PNL-611763979", "panel"));
  const [locks, setLocks] = useState<Set<keyof Recipe>>(new Set());
  const [previewState, setPreviewState] = useState<State>("active");
  const [context, setContext] = useState<"isolated" | "echo" | "zogg" | "studio">("isolated");
  const [grid, setGrid] = useState(true);
  const [saved, setSaved] = useState(false);
  const [catalogueCategory, setCatalogueCategory] = useState<CatalogueCategory>("all");
  const [catalogueSearch, setCatalogueSearch] = useState("");

  const applyGenerated = useCallback((newSeed: string, newFamily: Family, mode: "reroll" | "mutate") => {
    const generated = recipeFrom(newSeed, newFamily);
    setRecipe((current) => {
      if (mode === "reroll") {
        const merged = { ...generated };
        locks.forEach((key) => {
          (merged as unknown as Record<string, unknown>)[key] = current[key];
        });
        return merged;
      }
      const mutated = { ...current, family: newFamily };
      (Object.keys(generated) as (keyof Recipe)[]).forEach((key) => {
        if (!locks.has(key) && key !== "family" && Math.random() > 0.48) {
          (mutated as unknown as Record<string, unknown>)[key] = generated[key];
        }
      });
      return mutated;
    });
    setSeed(newSeed);
    setSaved(false);
  }, [locks]);

  const selectFamily = (next: Family) => {
    setFamily(next);
    const nextSeed = makeSeed(next);
    setLocks(new Set());
    applyGenerated(nextSeed, next, "reroll");
  };

  const update = <K extends keyof Recipe>(key: K, value: Recipe[K]) => {
    setRecipe((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const toggleLock = (key: keyof Recipe) => {
    setLocks((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const seedStatus = useMemo(() => `${familyCode(family)} / GEN ${seed.slice(-3)}`, [family, seed]);
  const recipeJson = useMemo(() => JSON.stringify({ seed, version: "PIX-7/FORGE-01", ...recipe }, null, 2), [recipe, seed]);
  const filteredFamilies = useMemo(() => families.filter((item) => {
    const categoryMatch = catalogueCategory === "all" || item.category === catalogueCategory;
    const term = catalogueSearch.trim().toLowerCase();
    return categoryMatch && (!term || item.label.toLowerCase().includes(term) || item.code.toLowerCase().includes(term));
  }), [catalogueCategory, catalogueSearch]);
  const activeEffect = nekoEffects.find((effect) => effect.id === family);

  const exportSvg = () => {
    const color = accentHex[recipe.accent];
    const label = family === "hud" ? "LOCK 98.4%" : family === "button" ? "INITIALIZE" : `${family.toUpperCase()} / PX-07`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="240" viewBox="0 0 640 240"><rect width="640" height="240" fill="#080a09"/><path d="M22 18H618V204L602 220H22Z" fill="#0d100e" stroke="${color}" stroke-width="${recipe.borderWidth}"/><path d="M22 54H618M58 18V220" stroke="#313630"/><circle cx="92" cy="112" r="34" fill="none" stroke="${color}"/><path d="M48 112H136M92 68V156" stroke="${color}"/><text x="154" y="118" fill="${color}" font-family="monospace" font-size="24" letter-spacing="4">${label}</text><text x="154" y="150" fill="#747b72" font-family="monospace" font-size="12">SEED ${seed}</text></svg>`;
    download(`${seed}.svg`, svg, "image/svg+xml");
  };

  return (
    <main className="forge-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">PIX<span>–7</span></span><i /><strong>ELEMENT<br />FORGE</strong></div>
        <div className="top-status"><span><i className="online-dot" /> SYSTEM ONLINE</span><span>BUILD 01.07</span><span>{seedStatus}</span></div>
        <div className="top-actions"><button onClick={() => download(`${seed}.recipe.json`, recipeJson, "application/json")}>EXPORT RECIPE</button><button className="primary-action" onClick={() => setSaved(true)}>{saved ? "✓ MINTED" : "+ MINT COMPONENT"}</button></div>
      </header>

      <div className="workspace">
        <aside className="control-rail">
          <section className="family-section">
            <div className="section-heading"><span>01</span><h2>ELEMENT FAMILY</h2><small>{families.length} SYSTEMS</small></div>
            <input className="catalogue-search" value={catalogueSearch} onChange={(event) => setCatalogueSearch(event.target.value)} placeholder="SEARCH CITY SYSTEMS" aria-label="Search element families" />
            <div className="catalogue-filters">{catalogueCategories.map((item) => <button key={item} className={catalogueCategory === item ? "active" : ""} onClick={() => setCatalogueCategory(item)}>{item}</button>)}</div>
            <div className="family-grid">
              {filteredFamilies.map((item) => <button key={item.id} className={family === item.id ? "selected" : ""} onClick={() => selectFamily(item.id)} title={"description" in item ? item.description : item.label}><i className={`family-icon ${item.category !== "core" ? "effect-icon" : ""} icon-${item.id}`} />{item.label}<small>{item.code} / {item.category}</small></button>)}
            </div>
            {filteredFamilies.length === 0 && <p className="catalogue-empty">NO MATCHING SYSTEMS</p>}
          </section>

          <section>
            <div className="section-heading"><span>02</span><h2>DESIGN DNA</h2><small>LOCK TRAITS</small></div>
            <div className="select-row">
              <label>ROLE<select value={recipe.role} onChange={(e) => update("role", e.target.value)}>{roles.map((role) => <option key={role}>{role}</option>)}</select></label>
              <button className={locks.has("role") ? "lock locked" : "lock"} onClick={() => toggleLock("role")}>{locks.has("role") ? "◆" : "◇"}</button>
            </div>
            {(["density", "pixelation", "technicality", "detail", "damage"] as const).map((key) => <TraitSlider key={key} label={key.toUpperCase()} value={recipe[key]} locked={locks.has(key)} onChange={(value) => update(key, value)} onLock={() => toggleLock(key)} />)}
            <div className="chip-block"><label>STRUCTURE</label><div>{structures.map((item) => <button key={item} className={recipe.structure === item ? "active" : ""} onClick={() => update("structure", item)}>{item}</button>)}</div></div>
            <div className="chip-block accent-block"><label>ACCENT</label><div>{accents.map((item) => <button aria-label={item} key={item} className={recipe.accent === item ? "active" : ""} style={{ "--chip": accentHex[item] } as React.CSSProperties} onClick={() => update("accent", item)} />)}</div></div>
            <div className="chip-block variant-block"><label>FORM VARIANT</label><div>{[1, 2, 3, 4, 5, 6].map((item) => <button key={item} className={recipe.variant === item ? "active" : ""} onClick={() => update("variant", item)}>{String(item).padStart(2, "0")}</button>)}</div></div>
            <div className="select-row compact"><label>ANIMATION<select value={recipe.animation} onChange={(e) => update("animation", e.target.value as AnimationMode)}>{animations.map((item) => <option key={item}>{item}</option>)}</select></label></div>
          </section>
        </aside>

        <section className="preview-zone">
          <div className="preview-toolbar">
            <div><span className="eyebrow">{activeEffect ? `NEKO CITY / ${activeEffect.category.toUpperCase()}` : "LIVE ELEMENT"}</span><h1>{(activeEffect?.label ?? family).toUpperCase()} / {recipe.role.toUpperCase()} <small>{seed}</small></h1></div>
            <div className="view-controls"><button className={grid ? "active" : ""} onClick={() => setGrid(!grid)}># GRID</button><button>1×</button><button>2×</button><button>4×</button></div>
          </div>

          <div className={`stage context-${context} ${grid ? "grid-on" : ""}`}>
            <div className="stage-index">X 071.4<br />Y 238.0</div>
            <div className="context-chrome">
              {context !== "isolated" && <><span>{context === "echo" ? "PIXEL ECHO / SPECTRAL FIELD" : context === "zogg" ? "ZOGG / SOUND PATROL" : "PIXEL STUDIO / INSPECTOR"}</span><i /></>}
            </div>
            <div className="component-mount"><ComponentShape recipe={recipe} state={previewState} /></div>
            <span className="stage-corner tl" /><span className="stage-corner tr" /><span className="stage-corner bl" /><span className="stage-corner br" />
          </div>

          <div className="state-strip">
            <span className="eyebrow">STATE MATRIX</span>
            <div>{states.map((state) => <button key={state} className={previewState === state ? "active" : ""} onClick={() => setPreviewState(state)}><ComponentShape recipe={recipe} state={state} scale={0.42} /><span>{state}</span></button>)}</div>
          </div>

          <div className="context-strip">
            <span className="eyebrow">CONTEXT TEST</span>
            <div>{(["isolated", "echo", "zogg", "studio"] as const).map((item) => <button key={item} className={context === item ? "active" : ""} onClick={() => setContext(item)}>{item === "isolated" ? "ISOLATED" : item === "echo" ? "PIXEL ECHO" : item === "zogg" ? "ZOGG PATROL" : "PIXEL STUDIO"}</button>)}</div>
          </div>
        </section>

        <aside className="lineage-rail">
          <section>
            <div className="section-heading"><span>03</span><h2>SEED & LINEAGE</h2></div>
            <label className="seed-input">STABLE SEED<input value={seed} onChange={(e) => setSeed(e.target.value.toUpperCase())} onBlur={() => applyGenerated(seed, family, "reroll")} /></label>
            <div className="lineage-actions"><button className="reroll" onClick={() => applyGenerated(makeSeed(family), family, "reroll")}><span>⟳</span> REROLL<small>KEEP LOCKED TRAITS</small></button><button onClick={() => applyGenerated(`${seed}-M${Date.now().toString().slice(-3)}`, family, "mutate")}><span>⌁</span> MUTATE<small>BRANCH CURRENT DNA</small></button></div>
            <div className="precision-actions"><button onClick={() => update("detail", Math.max(0, recipe.detail - 12))}>− REDUCE</button><button onClick={() => update("density", Math.min(100, recipe.density + 12))}>+ DENSITY</button><button className="more-pix" onClick={() => setRecipe((current) => ({ ...current, technicality: Math.max(78, current.technicality), damage: Math.min(22, current.damage), detail: Math.max(62, current.detail), cornerCut: Math.max(5, current.cornerCut) }))}>MAKE MORE PIX–7</button></div>
            <div className="variant-actions"><button onClick={() => update("variant", recipe.variant === 1 ? 6 : recipe.variant - 1)}>← FORM</button><span>{familyCode(family)} / {String(recipe.variant).padStart(2, "0")}</span><button onClick={() => update("variant", recipe.variant === 6 ? 1 : recipe.variant + 1)}>FORM →</button></div>
          </section>

          <section className="recipe-section">
            <div className="section-heading"><span>04</span><h2>COMPONENT RECIPE</h2><small>LIVE</small></div>
            <pre>{recipeJson}</pre>
          </section>

          <section className="export-section">
            <div className="section-heading"><span>05</span><h2>EXPORT</h2></div>
            <div className="export-grid"><button onClick={exportSvg}>SVG<small>VECTOR</small></button><button onClick={() => download(`${seed}.recipe.json`, recipeJson, "application/json")}>JSON<small>RECIPE</small></button><button onClick={() => download(`${seed}.css`, `/* ${seed} */\n.px7-${family} { --px7-accent: ${accentHex[recipe.accent]}; --px7-cut: ${recipe.cornerCut}px; --px7-density: ${recipe.density / 100}; border-width: ${recipe.borderWidth}px; }`, "text/css")}>CSS<small>TOKENS</small></button><button onClick={() => download(`${seed}.tsx`, `export const ${familyCode(family)}_${seed.slice(-3)} = ${recipeJson} as const;`, "text/plain")}>TSX<small>REACT</small></button></div>
            <p>Exports preserve seed, state behavior, geometry and PIX–7 token lineage.</p>
          </section>
        </aside>
      </div>
      <footer className="statusbar"><span><i /> CONSTRAINT ENGINE: ENFORCED</span><span>NO GLASS / NO GRADIENT / FUNCTION-FIRST</span><span>PIX–7 SYSTEMS © 2026</span></footer>
    </main>
  );
}
