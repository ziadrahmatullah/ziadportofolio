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

Not every project can honestly show a screenshot. A backend integration has no screen of its own, and several systems hold client data that should not be published. Each project therefore declares a `visual` in `src/data/projects.ts`:

| `visual` | Meaning | How it renders |
| --- | --- | --- |
| `screenshot` | A real screen you built | Fills the frame, cropped to fit |
| `diagram` | Architecture or flow diagram | Shown uncropped on the project page; cards fall back to the gradient cover |
| `photo` | Photo of deployed hardware | Fills the frame, cropped to fit |

Two diagrams are already real, not placeholders: `bni-direct.png` (payment sequence) and `bsi-direct.png` (shared payment architecture). Every other image is still a placeholder.

Suggested plan for the rest:

- **Screenshots** for the public-facing sites: DMI Kuningan, the SMAN 2 Kuningan reunion, and the public registration pages for IES 2026, IITS, and SMI.
- **Hardware photos** for the IoT work: YipyBox, the Andara gate reader, and the smart meters.
- **Diagrams** for backend-only work: the module and access control revamp still needs one.
- **Redact first** if you use internal screens from GBB, Ecosolex, or the Yipy CMS. Replace real names and figures with sample data.

### Photos to prepare

Placeholder images are already in place, wired into the data, and named exactly as the final files. Replace a file in place, keep the same name, and nothing else needs changing.

| What | File | Size | Required |
| --- | --- | --- | --- |
| Profile photo | `public/avatar.jpg` | 800 × 800 (square) | Optional |
| Project cover (15×) | `public/projects/<slug>.png` | 1600 × 900 (16:9) | 1 per project |
| Project gallery | `public/projects/<slug>-2.png`, `-3.png`, … | 1600 × 900 (16:9) | Optional, max 4 |

Keep each file under about 500 KB. If you save a photo as `.jpg` where the placeholder is `.png`, also update that project's `image` line in `src/data/projects.ts`.

Project slugs, in the order they appear on the site:

```
bni-direct              bsi-direct            gate-card-membership
yipybox                 smart-meters          module-access-revamp
ies-2026                iits-2025             iits-2026
smi-event               dmi-kuningan          gbb-portal
ecosolex-erp            reuni-sman2-kuningan  everhealth
```

To add gallery shots to a project, drop the files in and list them:

```ts
gallery: ["/projects/yipybox-2.png", "/projects/yipybox-3.png"],
```

`yipybox` already has two gallery placeholders as a working example. To hide the profile photo, set `avatar: ""` in `src/data/profile.ts`.

### Adding project screenshots

1. Drop the image into `public/projects/` (e.g. `public/projects/yipybox.png`). Recommended size: 1600×900 (16:9), PNG or JPG under 500 KB.
2. Set `image: "/projects/yipybox.png"` on the matching project in `src/data/projects.ts`. Add more shots with `gallery: ["/projects/yipybox-2.png"]`.

Cards and pages without an image fall back to a generated gradient cover.

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
