---
compositionId: salt-on-the-wire
duration_s: 267.36
canvas: { w: 1920, h: 1080, fps: 24 }
style:
  font: "Barlow / IBM Plex Mono"
  palette: ["#111111", "#1A1A18", "#E85D26", "#F0ECE5", "#888880", "#282826"]
assets: "six user-supplied ALI Imagine island-state videos"
build_notes:
  - one paused timeline per frame
  - no remote assets
  - preserve the island as the persistent hero
  - use only deterministic motion and source-relative media timing
---

The track holds a steady, dense 123 BPM pulse across 136 bars, moving from a sparse boot sequence into increasingly forceful transmissions, a central surge, a destabilized late passage, and a short fault-marked finale.

## Frame 1 — acquisition

- src: compositions/frames/01-acquisition.html
- duration: 70.937s
- span_sec: [0.0, 70.937]
- pacing: beat_cut
- mood: [dark, cinematic, tense]
- feel: sparse opening diagnostics develop into a steady heavy pulse with repeated rolls and widening energy.

### Groups

- **g1** — asset
  - span_sec: [0.0, 70.937]
  - asset: { treatment: beat_cut, clips: [assets/public/island-01.mp4, assets/public/island-02.mp4, assets/public/island-03.mp4, assets/public/island-04.mp4, assets/public/island-05.mp4, assets/public/island-06.mp4], anchors: [0.441, 8.29, 16.138, 23.963, 31.811, 39.636, 47.462, 55.287, 63.112, 68.986], overlay_copy: ["PIX-7 // SALT LINE", "ACQUIRING NEKO CITY", "PATROL HUD 01", "SIGNAL 123 BPM"] }
  - visual_program: "Start almost clean. Introduce the Forge scan grid, corner brackets, thin data dividers and one target-lock reticle in stages; source clips change only at selected phrase/downbeat anchors. Finish with the city fully acquired."
  - copy: ["SALT ON THE WIRE", "ACQUIRING NEKO CITY", "PATROL HUD 01"]

## Frame 2 — patrol

- src: compositions/frames/02-patrol.html
- duration: 43.003s
- span_sec: [70.937, 113.94]
- pacing: beat_cut
- mood: [hype, tense, playful]
- feel: a clear surge opens a denser patrol passage, then three sharp energy drops prepare a hard reset.

### Groups

- **g1** — asset
  - span_sec: [70.937, 113.94]
  - asset: { treatment: beat_cut, clips: [assets/public/island-03.mp4, assets/public/island-05.mp4, assets/public/island-02.mp4, assets/public/island-06.mp4, assets/public/island-04.mp4, assets/public/island-01.mp4], anchors: [70.937, 74.861, 78.762, 82.686, 86.587, 90.511, 94.412, 98.337, 102.261, 106.162, 110.063, 112.013], overlay_copy: ["PATROL ACTIVE", "SECTOR 07", "NEKO BROADCAST", "LOCK CONFIRMED"] }
  - visual_program: "Patrol HUD owns the section: orbit rings, map markers, scan beam, waveform meter and compact Neko Broadcast strips pop on strong anchors. Cuts alternate wide, cropped and offset views of the same island without losing geographic continuity."
  - copy: ["PATROL ACTIVE", "SECTOR 07", "LOCK CONFIRMED"]

## Frame 3 — transmission

- src: compositions/frames/03-transmission.html
- duration: 68.987s
- span_sec: [113.94, 182.927]
- pacing: beat_cut
- mood: [hype, cinematic, glitch]
- feel: the strongest surge in the track launches a sustained high-energy broadcast with frequent rolls and little empty space.

### Groups

- **g1** — asset
  - span_sec: [113.94, 182.927]
  - asset: { treatment: beat_cut, clips: [assets/public/island-06.mp4, assets/public/island-04.mp4, assets/public/island-05.mp4, assets/public/island-02.mp4, assets/public/island-03.mp4, assets/public/island-01.mp4], anchors: [113.94, 117.888, 121.812, 125.69, 129.614, 133.538, 137.462, 141.386, 145.287, 149.211, 153.112, 157.013, 160.914, 164.838, 168.739, 172.664, 176.565, 180.489, 182.439], overlay_copy: ["NEKO BROADCAST", "PACKET ASSEMBLY", "CITY STATE // LIVE", "TRANSMISSION 03"] }
  - visual_program: "The strongest surge becomes a full broadcast: Packet Assembly particle clusters converge on the island, segmented borders route data around the coast, and a large but brief Neko Broadcast title interrupts the footage. Use deterministic pixel trails and radial pulse diagrams on rolls."
  - copy: ["NEKO BROADCAST", "PACKET ASSEMBLY", "CITY STATE // LIVE"]

## Frame 4 — signal fault

- src: compositions/frames/04-signal-fault.html
- duration: 63.924s
- span_sec: [182.927, 246.851]
- pacing: beat_cut
- mood: [glitch, tense, aggressive]
- feel: an abrupt drop destabilizes the pulse, alternating high-energy clusters with longer low-energy fault windows before another major drop.

### Groups

- **g1** — asset
  - span_sec: [182.927, 246.851]
  - asset: { treatment: beat_cut, clips: [assets/public/island-02.mp4, assets/public/island-01.mp4, assets/public/island-04.mp4, assets/public/island-06.mp4, assets/public/island-03.mp4, assets/public/island-05.mp4], anchors: [184.39, 188.314, 192.215, 196.116, 200.04, 203.941, 207.842, 211.743, 215.667, 219.568, 223.446, 227.347, 231.271, 235.172, 239.049, 242.95, 244.901], overlay_copy: ["SIGNAL FAULT", "PACKET LOSS", "COASTLINE DESYNC", "RECOVERY ROUTE"] }
  - visual_program: "Signal Fault becomes the dominant intervention: short chromatic splits, horizontal tear bars, pixel-grid dissolves, packet loss cells and one-frame diagnostic flashes. Low-energy windows clear back to the island; high clusters rebuild the interface. Never leave the footage under a constant glitch filter."
  - copy: ["SIGNAL FAULT", "PACKET LOSS", "RECOVERY ROUTE"]

## Frame 5 — salt line

- src: compositions/frames/05-salt-line.html
- duration: 20.509s
- span_sec: [246.851, 267.36]
- pacing: beat_cut
- mood: [cinematic, glitch, elegant]
- feel: a compact final transmission climbs back through medium and high energy, then fractures at the last drop and resolves.

### Groups

- **g1** — asset
  - span_sec: [246.851, 267.36]
  - asset: { treatment: beat_cut, clips: [assets/public/island-05.mp4, assets/public/island-06.mp4, assets/public/island-03.mp4, assets/public/island-01.mp4], anchors: [246.851, 248.802, 250.752, 252.703, 254.653, 256.604, 258.554, 260.505, 262.432, 264.382], overlay_copy: ["SALT LINE RESTORED", "PIX-7", "NEKO CITY // ONLINE"] }
  - visual_program: "Compact final transmission: accelerated packet routing and target-lock confirmations resolve into one clean island view. At the last drop, clear every busy layer, leave the PIX-7 wordmark plus a fine divider, then let the city breathe to black."
  - copy: ["SALT LINE RESTORED", "PIX-7", "NEKO CITY // ONLINE"]
