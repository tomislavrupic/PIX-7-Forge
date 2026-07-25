# PIX-7 Forge

PIX-7 Forge is a deterministic component generator for the Pixel Records
interface system. It turns the PIX-7 visual language into reusable production
assets instead of one-off graphics.

## First release

The initial generator supports:

- panels
- buttons
- sliders
- segmented meters
- badges
- HUD markers

Every component is generated from a stable seed and structured recipe. Traits
can be edited, locked, rerolled, or mutated while the result is tested across
interaction states and Pixel Echo, ZOGG, and Pixel Studio contexts.

## Exports

- SVG
- JSON component recipe
- CSS tokens
- TypeScript/React recipe module

## PIX-7 constraints

The Forge keeps components inside the system language: near-black structural
surfaces, restrained functional accents, thin borders, clipped geometry,
compact technical typography, selective pixel influence, and motion that
communicates state. It deliberately excludes glassmorphism, generic gradients,
oversized rounded cards, and decorative elements without a job.

## Development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

Validation:

```bash
npm run lint
npm test
```

The application uses Next.js/React through the Cloudflare-compatible vinext
runtime.
