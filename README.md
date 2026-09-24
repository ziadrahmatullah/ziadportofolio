# Ziad Rahmatullah · Portfolio

Personal portfolio built with Next.js, React Three Fiber, Tailwind CSS, and Framer Motion. The hero features an AI-inspired neural network animation rendered with Three.js.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All copy lives in `src/data/` so you never have to touch components to update the site:

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, headline, rotating roles, bio, contact links, stats, quick facts |
| `src/data/skills.ts` | Skill groups and chips |
| `src/data/experience.ts` | Work timeline, education, organizations |
| `src/data/projects.ts` | Project cards and case-study modals |

### Project pages

Every project in `src/data/projects.ts` gets its own statically generated page at `/projects/<slug>` with the problem, solution, responsibilities, outcomes, highlights, stack, links, and an optional gallery. Cards on the home page link to these pages.

Key fields per project:

| Field | Purpose |
| --- | --- |
| `period` | When it happened, e.g. `"Aug 2025 – Feb 2026"`. Lines marked `// TODO` are estimates to confirm. |
| `team` | Who worked on it. |
| `responsibilities` | What you personally did. |
| `outcomes` | Results of the work (optional). |
| `image` / `gallery` | Cover and extra screenshots (optional). |
| `links` | Demo or repository links (optional). |

### What each project shows

Not every project can honestly show a screenshot. A backend integration has no screen of its own, several of these systems hold client data that should not be published, and on some the frontend was built by someone else. So every cover is a hand-drawn diagram of how the system actually works.

Each project declares a `visual` in `src/data/projects.ts`:

| `visual` | Meaning | How it renders |
| --- | --- | --- |
| `diagram` | Architecture or flow diagram | Uncropped on the project page; cards use the gradient cover |
| `screenshot` | A real screen you built | Fills the frame, cropped to fit |
| `photo` | Photo of deployed hardware | Fills the frame, cropped to fit |

All fifteen covers are currently diagrams, and all fifteen are real artwork rather than placeholders. A caption under each one names what the reader is looking at.

### Replacing a diagram with a real image

The diagrams stand on their own, so nothing is blocked. Swap one only when a real image says more:

1. Save the file over `public/projects/<slug>.png`, at 1600 × 900 and under about 500 KB.
2. Change that project's `visual` to `screenshot` or `photo` in `src/data/projects.ts`.

Worth doing when you have them:

- **Screenshots** of the public-facing sites: DMI Kuningan, the SMAN 2 Kuningan reunion, and the public registration pages for IES 2026, IITS, and SMI.
- **Photos** of the IoT hardware: YipyBox, the Andara gate reader, and the smart meters.
- **Redact first** if you use internal screens from GBB, Ecosolex, or the Yipy CMS. Replace real names and figures with sample data.

Extra images go in a `gallery` array on the same project and appear lower down the page:

```ts
gallery: ["/projects/yipybox-2.png", "/projects/yipybox-3.png"],
```

### Profile photo

`public/avatar.jpg` is the one remaining placeholder. Replace it with a square photo, 800 × 800. To hide the photo entirely, set `avatar: ""` in `src/data/profile.ts`.

Project slugs, in the order they appear on the site:

```
bni-direct              bsi-direct            gate-card-membership
yipybox                 smart-meters          module-access-revamp
ies-2026                iits-2025             iits-2026
smi-event               dmi-kuningan          gbb-portal
ecosolex-erp            reuni-sman2-kuningan  everhealth
```

### Contact links

Contact methods live in the `socials` array in `src/data/profile.ts` and render in three places at once: the hero, the contact section, and the footer. Each entry takes a `label`, `href`, `icon`, and an optional `detail` shown instead of the label (the WhatsApp entry uses it to show the number).

The WhatsApp link uses international format without the leading plus, e.g. `https://wa.me/6287723693870`.

## The 3D scene

- `src/components/three/Scene.tsx` sets up the canvas, camera, fog, and post-processing.
- `src/components/three/NeuralNetwork.tsx` renders the glowing node graph with travelling signals. Tweak `count` and `pulseCount` for density.
- `src/components/three/graph.ts` builds the deterministic graph layout.
- Users with `prefers-reduced-motion` get a static scene.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deploying

The project is a standard Next.js app. Import the repository in Vercel and deploy with the default settings, or run `npm run build && npm run start` behind Nginx on a VPS.
