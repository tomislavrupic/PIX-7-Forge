# PIX-7 Forge

PIX-7 Forge is a deterministic component generator for the Pixel Records
interface system. It turns the PIX-7 visual language into reusable production
assets instead of one-off graphics.

Live page: [tomislavrupic.github.io/PIX-7-Forge](https://tomislavrupic.github.io/PIX-7-Forge/)

## Effect catalogue

The generator includes 55 systems:

- 14 foundational interface and motion families
- 37 Neko City effects across city, security, signal, broadcast, archive,
  and typography categories
- four seekable HyperFrames video-loop collections: Patrol HUD, Neko
  Broadcast, Packet Assembly, and Signal Fault
- six deterministic form variants for every system
- catalogue search and category filtering

Every component is generated from a stable seed and structured recipe. Traits
can be edited, locked, rerolled, or mutated while the result is tested across
interaction states and Pixel Echo, ZOGG, and Pixel Studio contexts.

The Neko City catalogue includes transit and district systems, patrol
instruments, signal fields, particle environments, archive reconstruction,
security boundaries, damaged typography, and broadcast displays.

## Exports

- SVG
- JSON component recipe
- CSS tokens
- TypeScript/React recipe module
- standalone HyperFrames composition with duration, frame rate, alpha,
  deterministic seed data, and a registered seekable timeline

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
npm run pages:build
```

The application uses Next.js/React through the Cloudflare-compatible vinext
runtime.
