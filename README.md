# Commedia Solutions — Expo 2026 Technology Showcase

> Showcasing two flagship enterprise products: **CNMS v2.0** (Commedia Network Management System) and **Operations Advisor** (AI-Powered Operational Assistance).

---

## 1. Creative Direction & Visual System

- **Video-First Hero Showcase**:
  - Two side-by-side 16:9 demonstration panels prominently introducing Expo visitors to Commedia Solutions' technology:
    - **CNMS v2.0**: Streams the authentic high-definition video demonstration (`CNMS.mp4`).
    - **Operations Advisor**: Streams the operational demonstration video (`operations-advisor.mp4`).
- **Authentic CNMS Interface Matrix**:
  - Ground station and satellite network observability console showcasing six real production screenshots:
    1. Centralised Dashboard
    2. Network Topology
    3. Earth Station Maps
    4. Device Inventory & Details
    5. Alerts and Live Events
    6. Performance Monitoring
- **Dimensional 3D Models**:
  - **3D Neural Sphere** (`NeuralSphere3D`): Procedural Three.js cognitive mesh with dynamic vertex ripples and interactive pointer responsiveness.
  - **3D Telemetry Radar** (`Radar3D`): Live scanning reticle and beacon pulses embedded in the engagement hub.
- **Enterprise Typography System**:
  - Headings: **Manrope** (semi-bold to bold) with responsive CSS `clamp()` scaling.
  - Body & UI: **Inter** (regular to medium) for crystal-clear readability.
  - Technical Labels: **IBM Plex Mono** for telemetry data points and technical eyebrow badges.
- **Engagement Hub & Contact**:
  - Interactive product selection form with client-side validation, automatic `mailto:` generation, and instant "Copy Email Draft" clipboard copy.

---

## 2. Technical Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Build Tool**: Vite 5 (with Rollup code-splitting for Three.js, React, and motion libraries)
- **3D Graphics Engine**: Three.js (`three` & `@types/three`)
- **Smooth Scrolling**: Lenis (`lenis`)
- **Motion Timelines & Reveals**: Anime.js (`animejs` & `@types/animejs`)
- **Styling**: Tailwind CSS 3 (configured with Manrope, Inter, IBM Plex Mono, and obsidian/cyan/indigo color tokens)
- **Icons**: Lucide React (`lucide-react`)
- **Telemetry**: Google Analytics 4 (privacy-preserving, zero PII, disabled gracefully when unconfigured)

---

## 3. Local Development Commands

```powershell
# Start the local development server (runs on port 3000)
npm run dev

# Run TypeScript type check
npm run lint

# Build production bundle with optimized code splitting
npm run build

# Preview production build locally
npm run preview
```

---

## 4. Media & Assets

| Asset Type | Path | Status |
|---|---|---|
| **CNMS Video Demo** | `public/videos/CNMS.mp4` | **Active** (~35.7 MB, 01:22 duration, 16:9). Streams with HTTP 200. |
| **Operations Advisor Video** | `public/videos/operations-advisor.mp4` | **Active** (~39.7 MB, 16:9). Streams with HTTP 200. |
| **CNMS Screenshots** | `img/` & `public/img/` | **Active** (6 authentic captures: Dashboard, Network Topology, Earth Station, Inventory, Alerts, Performance). |

---

## 5. Google Analytics 4 (GA4) Configuration

Set your Measurement ID in `.env`:
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
If blank or omitted, GA4 is disabled gracefully without throwing errors. No personally identifiable information (PII) is ever sent.

---

## 6. Expo QR Campaign URL

Deploy the built `dist/` directory to your public HTTPS domain, then use this campaign link format in your brochure QR code:
```
https://YOUR-PUBLIC-URL/?utm_source=broadcast_india&utm_medium=qr&utm_campaign=commedia_products_2026
```

---

## 7. Verification & Testing Summary

- [x] **Linting & Types**: `npm run lint` (`tsc --noEmit`) passed with **0 errors**.
- [x] **Production Build**: `npm run build` completed cleanly with separate chunks for `three`, `react`, `motion`, and CSS.
- [x] **Dev Server**: Running at `http://localhost:3000/` with HTTP 200 responses.
- [x] **Three.js Performance**: Damped pointer tracking, DPR clamping, and automatic pause offscreen.
- [x] **Video Streaming**: Verified HTTP 200 streaming for `CNMS.mp4` (`video/mp4`, 35,690,361 bytes).
- [x] **Missing Media Fallback**: Tested `operations-advisor.mp4` fallback logic; switches cleanly to cognitive preview.
- [x] **Demo Request Flow**: Verified field validation, preselection sync, `mailto:` drafting, and clipboard copy.
- [x] **Safety Boundary**: Zero files outside `EXPO/` were touched or modified.
