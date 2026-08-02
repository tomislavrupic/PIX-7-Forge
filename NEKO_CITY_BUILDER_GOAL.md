# Codex Goal: Build NEKO CITY BUILDER

Build **NEKO CITY BUILDER**, a new standalone project for generating, arranging,
editing, saving, and exporting modular isometric pixel-art city scenes belonging
to the PIX-7 / Pixel Records universe.

This is not a generic text-to-image wrapper and not an eBoy clone. The useful
inspiration is the density, modular storytelling, and readable isometric city
construction found in classic Pixorama-style work. Every building, character,
prop, palette, symbol, interface element, and story detail must be original to
Neko City and the PIX-7 universe.

## Product idea

A user writes a prompt such as:

> Rainy pirate-radio district with a Pixel Records studio, elevated railway,
> PIX-7 patrol station, archive machinery, noodle bar, rooftop antennas, and
> seven cats.

The system translates that prompt into a structured scene recipe, assembles the
scene on a fixed isometric grid from compatible transparent pixel-art assets,
and presents an editable result.

The core pipeline is:

```text
Prompt
→ scene plan
→ district and object recipes
→ isometric grid placement
→ depth-aware scene assembly
→ editable scene
→ deterministic export
```

The generator should favor controlled composition over a single flattened AI
image. Generative models may help produce source assets or propose scene plans,
but the application must enforce the geometry, palette, depth, scale, and asset
contract.

## Source of truth and project boundary

- Create this as a new project and repository, separate from PIX-7 Forge.
- Do not modify, replace, or absorb PIX-7 Forge.
- Reuse PIX-7 design principles and recipe conventions where they help, without
  coupling the two applications.
- Before implementation, inspect the new project for existing architecture and
  preserve it if present.
- Record important rendering and asset rules in project documentation so later
  assets cannot silently drift.

## Visual direction

Neko City is a nocturnal, inhabited electronic city—not generic cyberpunk.

Use:

- a fixed, consistent isometric projection
- crisp, hard-edged pixel clusters
- grid-aligned geometry with no antialiasing
- near-black and charcoal infrastructure
- acid-lime operational signals
- patrol cyan
- restrained magenta, amber, and pale concrete highlights
- local light pools rather than broad glow
- sparse pixel reflections on wet streets
- visible infrastructure: rails, cables, ducts, antennas, stairs, bridges,
  archive machinery, signage, power systems, and broadcast equipment
- functional detail and small readable stories
- cats as active city inhabitants

Avoid:

- copying recognizable eBoy buildings, layouts, characters, mascots, signs, or
  compositions
- glassmorphism
- smooth 3D rendering
- painterly or vector-smooth surfaces
- fake subpixels
- blurred glow
- generic purple cyberpunk gradients
- arbitrary perspective changes
- decorative clutter without a world function
- illegible AI-generated text baked into assets

## Isometric asset contract

Establish the contract before creating a large asset library.

Every placeable asset must define:

```text
asset ID
asset family
pixel dimensions
tile footprint
anchor tile
elevation
depth bounds
occlusion mask or ordering bounds
allowed rotations or directions
palette
lighting direction
connection points
collision/occupancy footprint
tags
source/version
```

All assets must share:

- one projection ratio and camera direction
- one base tile size
- one pixel scale
- one primary lighting direction
- consistent floor and wall heights
- deterministic anchor placement
- correct alpha transparency
- clean edges with no matte fringe

Transparent PNGs are required for buildings, vehicles, characters, vegetation,
signs, street objects, rail pieces, roads, effects, and other reusable assets.
Validate that transparent corners are truly transparent and that no chroma-key
color survives on asset edges.

## Initial content families

The first useful asset library should include:

### Ground and infrastructure

- empty ground tiles
- pavement and road tiles
- corners, intersections, crossings, curbs, and stairs
- rail tracks, elevated rail supports, station platforms, and bridges
- walls, fences, utility ducts, cables, pipes, and ladders
- small park and rooftop-garden tiles

### Neko City buildings

- Pixel Records studio
- pirate-radio tower
- PIX-7 patrol station
- archive facility
- night-rail station
- noodle kiosk
- apartment block
- workshop or power-grid module

### Props and inhabitants

- vending machines
- antennas and satellite dishes
- signs with editable text overlays
- lamps, barriers, crates, terminals, bins, and benches
- a small train and PIX-7 patrol vehicle
- several original cat silhouettes and color variants
- a minimal citizen set

Do not generate hundreds of assets before proving that a small set assembles
correctly.

## Scene model

Scenes must be structured data rather than flattened images.

Example:

```json
{
  "version": "NEKO-CITY/SCENE-01",
  "seed": "NEKO-ISO-611763979",
  "prompt": "Rainy pirate-radio district at neon midnight",
  "grid": {
    "width": 18,
    "height": 18,
    "tileSize": 32,
    "projection": "neko-iso-2x1"
  },
  "environment": {
    "district": "broadcast",
    "time": "neon-midnight",
    "weather": "signal-rain",
    "density": 0.72,
    "damage": 0.16
  },
  "objects": [
    {
      "id": "pixel-records-studio-01",
      "asset": "building/pixel-records-studio/v1",
      "tile": [8, 7],
      "elevation": 0,
      "variant": 2
    }
  ]
}
```

The same recipe and seed must rebuild the same scene.

## First application experience

Build a working editor with:

- a large isometric canvas
- prompt input
- seed display and regeneration
- district, density, time, weather, and damage controls
- asset browser organized by family
- selection, placement, movement, duplication, and deletion
- grid and footprint overlays
- correct depth sorting while objects move
- undo and redo
- save/load scene JSON
- PNG export
- transparent PNG export where appropriate

Useful scene actions:

```text
GENERATE
REROLL BLOCK
LOCK BUILDING
ADD CHARACTER
EXPAND NORTH
MUTATE DISTRICT
CLEAR SELECTION
EXPORT SCENE
```

Prompt generation may initially use a deterministic local rule-based scene
planner. Do not block the first functional version on model training or an
external AI provider. Keep the planner behind an interface so an AI planner can
be added later.

## Recommended technical direction

Prefer a web application with:

- TypeScript
- React
- Canvas, WebGL, or a suitable scene renderer
- deterministic seeded random generation
- structured scene JSON
- a separate asset manifest
- native-resolution rendering followed by nearest-neighbor display scaling

Keep the domain model independent of React components. Rendering, scene state,
asset manifests, prompt planning, and export should be separate modules.

Do not begin by training a custom model. First prove:

1. projection and tile contract
2. transparent asset quality
3. placement and depth sorting
4. deterministic recipes
5. scene editing
6. exact export

## First milestone

Deliver one editable **Broadcast District** demo containing:

- a 12×12 or larger isometric grid
- Pixel Records studio
- pirate-radio tower
- PIX-7 patrol station
- one elevated rail segment with a small train
- archive machinery
- noodle kiosk
- roads, stairs, lamps, antennas, vending machines, and vegetation
- at least seven cats
- neon-midnight and rain presentation
- deterministic scene seed
- functional placement/editing
- clean PNG export
- scene JSON export and reload

The milestone is not complete if it is only a static concept image.

## Reference concept

Use the supplied Neko City concept image as a mood, density, palette, and
world-building reference. Do not trace it literally. Translate it into a
modular asset system with a coherent grid and original reusable components.

Concept image from the originating workspace:

```text
/Users/thecore/.codex/generated_images/019f98ff-ee48-72e1-8662-991ade2af2be/call_AfCpHwvU8OxwRpwR2Nf1Y4No.png
```

Copy the image into the new project under a clearly named references folder if
the new project needs durable access to it.

## Testing and acceptance

Add durable tests for:

- seed determinism
- grid-to-screen and screen-to-grid conversion
- depth-order stability
- footprint collision
- save/load round trips
- asset-manifest validation
- alpha-safe PNG export

Visually verify the live application at desktop and narrow widths.

The first milestone is complete only when:

- the district is assembled from reusable assets
- selection and placement work
- objects sort correctly as they move
- the same seed produces the same scene
- saved JSON reloads without visual drift
- the exported PNG matches the canvas composition
- transparent assets have clean alpha edges
- the result visibly belongs to the Neko City / PIX-7 universe
- no required behavior is represented by a dead button or placeholder

After the milestone is verified, propose the next phase: additional districts,
procedural roads, animation, HyperFrames camera loops, asset generation tools,
and optional AI scene planning.
