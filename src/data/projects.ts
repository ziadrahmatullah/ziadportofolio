/**
 * Projects rendered as cards on the home page and as full case-study pages
 * at /projects/[slug].
 *
 * Screenshots: drop images into `public/projects/` and reference them via
 * `image` (cover) and `gallery` (extra shots). Cards fall back to a generated
 * gradient cover when no image is provided.
 *
 * Dates: lines marked TODO are estimated from the surrounding job period
 * because the CV did not list a date for that specific project.
 *
 * Every cover is currently a hand-drawn diagram. Swap one for a real
 * screenshot or photo by replacing the file and changing `visual`.
 */

export type ProjectCategory =
  | "Payments"
  | "IoT"
  | "Event Platforms"
  | "Fullstack"
  | "Platform";

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  org: string;
  category: ProjectCategory;
  /** When the project happened, e.g. "Aug 2025 – Feb 2026". */
  period: string;
  role: string;
  /** Who worked on it, e.g. "Solo" or "2 backend engineers". */
  team: string;
  tagline: string;
  problem: string;
  solution: string;
  /** What I personally did. */
  responsibilities: string[];
  /** Results or effects of the work. */
  outcomes?: string[];
  highlights: string[];
  stack: string[];
  links?: ProjectLink[];
  /**
   * What the cover actually is. Diagrams are shown uncropped on a flat
   * background; screenshots and photos fill the frame.
   */
  visual?: "screenshot" | "diagram" | "photo";
  image?: string;
  gallery?: string[];
  /** Used for the gradient fallback cover. */
  accent: "cyan" | "violet" | "emerald" | "amber" | "rose";
  featured?: boolean;
};

export const projectCategories: ProjectCategory[] = [
  "Payments",
  "IoT",
  "Event Platforms",
  "Fullstack",
  "Platform",
];

export const projects: Project[] = [
  {
    slug: "bni-direct",
    title: "Bank BNI Direct Payment Integration",
    org: "Yipy",
    category: "Payments",
    period: "2024 – 2026", // TODO: confirm exact months
    role: "Sole backend engineer",
    team: "Solo, coordinating directly with BNI IT support",
    tagline: "Direct bank payments that bypass costly gateway fees.",
    problem:
      "Building management at Eastpark complained that Xendit admin fees were too high and wanted resident payments to land directly in their own bank account.",
    solution:
      "Integrated Yipy directly with Bank BNI so residents can pay bills straight to the building's account. I owned the integration end to end and worked directly with BNI IT support to clarify the technical documentation.",
    responsibilities: [
      "Studied BNI's technical documentation and resolved open questions directly with BNI IT support.",
      "Designed and implemented the payment flow, bank callbacks, and reconciliation logic in the Yipy backend.",
      "Shipped to production and supported the rollout for Eastpark.",
    ],
    outcomes: [
      "Resident payments settle directly in the building's BNI account.",
      "Removed the third-party gateway admin fees management had complained about.",
    ],
    highlights: [
      "Full ownership of design, implementation, and production rollout.",
      "Direct communication with the bank's IT support team.",
      "Removed third-party gateway fees for the building.",
    ],
    stack: ["Go", "REST API", "Bank API", "Webhooks"],
    visual: "diagram",
    image: "/projects/bni-direct.png",
    accent: "cyan",
    featured: true,
  },
  {
    slug: "bsi-direct",
    title: "Bank BSI Direct Payment Integration",
    org: "Yipy",
    category: "Payments",
    period: "2024 – 2026", // TODO: confirm exact months
    role: "Sole backend engineer",
    team: "Solo",
    tagline: "Second direct bank integration, built for buildings around Bogor.",
    problem:
      "Many buildings in the Bogor area bank with BSI, and payment-gateway fees were eating into their budgets.",
    solution:
      "Delivered a BSI Direct integration following the same pattern as the BNI work, handling the whole integration myself from documentation to production.",
    responsibilities: [
      "Owned the integration end to end, mirroring the proven BNI architecture.",
      "Handled bank documentation, testing, and the production rollout.",
    ],
    outcomes: [
      "Buildings that bank with BSI can now accept direct payments through Yipy.",
      "Second bank running on the same direct-payment architecture.",
    ],
    highlights: [
      "Reused and hardened the direct-payment architecture from the BNI integration.",
      "Expanded Yipy's payment coverage to a second major Indonesian bank.",
    ],
    stack: ["Go", "REST API", "Bank API", "Webhooks"],
    visual: "diagram",
    image: "/projects/bsi-direct.png",
    accent: "cyan",
  },
  {
    slug: "gate-card-membership",
    title: "Gate Card Membership for Andara Residence",
    org: "Yipy",
    category: "IoT",
    period: "2024 – 2026", // TODO: confirm exact months
    role: "Backend engineer",
    team: "2 backend engineers",
    tagline: "Card-based facility access tied to residents' payment status.",
    problem:
      "Building management could not monitor who entered the facilities, and residents who had not paid their monthly fees (IPL) could still walk in.",
    solution:
      "Integrated ZKTeco access hardware with the Yipy web app. When a resident's card is scanned, Yipy checks their IPL status; unpaid residents are denied and the gate stays closed.",
    responsibilities: [
      "Designed the integration between ZKTeco access-control devices and the Yipy web app.",
      "Implemented the access decision that checks a resident's IPL payment status on every card scan.",
      "Built endpoints for card membership management so building management can monitor facility entry and exit.",
    ],
    outcomes: [
      "Residents with unpaid IPL are denied entry automatically.",
      "Building management gained visibility into who enters and leaves the facilities.",
    ],
    highlights: [
      "Real-time access decisions based on billing data.",
      "Integration with ZKTeco access-control devices.",
      "Gave management visibility into facility entry and exit.",
    ],
    stack: ["Go", "ZKTeco", "REST API", "Access Control"],
    visual: "diagram",
    image: "/projects/gate-card-membership.png",
    accent: "violet",
    featured: true,
  },
  {
    slug: "yipybox",
    title: "YipyBox Smart Parcel Locker",
    org: "Yipy",
    category: "IoT",
    period: "2024 – 2026", // TODO: confirm exact months
    role: "Backend engineer",
    team: "2 backend engineers; I owned the user-facing endpoints, a colleague handled the MINNO server link",
    tagline: "OTP-driven parcel lockers integrated with resident and staff apps.",
    problem:
      "Packages piled up in front of apartments. Residents could not find their parcels, security got pulled into the search, and food deliveries spoiled and made a mess.",
    solution:
      "Built the backend for YipyBox, a smart locker based on MINNO IoT hardware. Couriers register a parcel in the staff app and receive an OTP to open a box; the resident is notified instantly and picks it up with their own OTP. Food parcels older than 12 hours trigger an overdue alert so staff can move them.",
    responsibilities: [
      "Built the resident and staff endpoints: parcel registration, OTP generation and validation, and the pickup flow.",
      "Implemented push notifications for parcel arrival and overdue events.",
      "Implemented the 12-hour overdue rule for food parcels and the staff retrieval flow.",
    ],
    outcomes: [
      "Parcels are stored securely instead of piling up in the lobby.",
      "Residents are notified instantly and collect parcels with a personal OTP.",
    ],
    highlights: [
      "Three-party OTP flow: courier, resident, and staff.",
      "Push notifications on arrival and overdue events.",
      "Worked alongside a second backend engineer who handled the MINNO server link.",
    ],
    stack: ["Go", "IoT", "OTP", "Push Notifications"],
    visual: "diagram",
    image: "/projects/yipybox.png",
    accent: "emerald",
    featured: true,
  },
  {
    slug: "smart-meters",
    title: "Smart Electricity & Water Meter Integration",
    org: "Yipy",
    category: "IoT",
    period: "2024 – 2026", // TODO: confirm exact months
    role: "Backend engineer",
    team: "Backend engineer, working with hardware vendor Shengda",
    tagline: "LoRa-connected meters with automatic token top-up from the app.",
    problem:
      "When prepaid electricity or water ran out, residents had to type purchased tokens into the meter by hand and had no way to see their remaining balance.",
    solution:
      "Integrated Shengda LoRa meters with Yipy. A concentrator with a 1 km range serves up to 300 meters per unit. Residents buy tokens in the app and the credit is pushed to the device automatically, with purchases blocked for residents who have unpaid IPL.",
    responsibilities: [
      "Integrated Shengda's LoRa concentrator and meter protocol with the Yipy backend.",
      "Built the token purchase flow that pushes credit to the physical meter automatically.",
      "Added billing rules so residents with unpaid IPL cannot buy tokens.",
    ],
    outcomes: [
      "No more manual token entry for electricity or water.",
      "One concentrator covers up to 300 meters within a 1 km radius.",
    ],
    highlights: [
      "Automatic token delivery to physical meters, no manual input.",
      "Billing-aware purchase rules.",
      "Battery-powered water meters and mains-powered electricity meters on one integration.",
    ],
    stack: ["Go", "LoRa", "IoT", "REST API"],
    visual: "diagram",
    image: "/projects/smart-meters.png",
    accent: "emerald",
  },
  {
    slug: "module-access-revamp",
    title: "Module & Access Control Revamp",
    org: "Yipy",
    category: "Platform",
    period: "2024 – 2026", // TODO: confirm exact months
    role: "Backend engineer",
    team: "Backend engineer",
    tagline: "Per-building feature modules and CRUD-level role permissions.",
    problem:
      "Feature availability and permissions were hard to manage across many buildings and user roles.",
    solution:
      "Redesigned the module system so each building can be granted or denied specific features, and added backend-enforced access rules that restrict endpoints by Create/Read/Update/Delete group for BM Admin, BM Manager, Staff, and Security roles.",
    responsibilities: [
      "Redesigned the module model that maps features to buildings.",
      "Implemented CRUD-group permission checks per role at the API layer.",
      "Revamped existing endpoints to enforce the new access rules.",
    ],
    outcomes: [
      "Buildings only see the features they are entitled to.",
      "Roles such as BM Manager can view billing without being able to create it.",
    ],
    highlights: [
      "Fine-grained permissions, e.g. a manager can view billing but cannot create it.",
      "Enforced at the API layer, not just in the UI.",
    ],
    stack: ["Go", "RBAC", "REST API"],
    visual: "diagram",
    image: "/projects/module-access-revamp.png",
    accent: "amber",
  },
  {
    slug: "ies-2026",
    title: "Indonesia Economic Summit 2026",
    org: "PT Mantra Rupa",
    category: "Event Platforms",
    period: "Aug 2025 – Feb 2026",
    role: "Backend engineer",
    team: "3-person studio (UI/UX, frontend, backend) plus partner vendors ATS and Regius",
    tagline: "Registration, payments, and partner integrations for a national summit.",
    problem:
      "A large summit needed online registration with payments, QR check-in, badge printing, and business matching handled by separate vendors.",
    solution:
      "Built the registration API with Xendit payments, integrated participant data with ATS (mobile app and business matching) and Regius (badge printing), and supported QR code scanning at the venue plus participant email blasts.",
    responsibilities: [
      "Built the registration API and participant data model.",
      "Integrated Xendit for ticket payments.",
      "Exchanged participant data with ATS for the mobile app and business matching, and with Regius for badge printing.",
      "Generated QR codes for check-in and ran participant email blasts.",
    ],
    outcomes: [
      "Participants registered, paid, and checked in with a single QR code.",
      "Partner vendors received participant data for the mobile app and badges.",
    ],
    highlights: [
      "Payment integration with Xendit.",
      "Data exchange with two external vendors.",
      "QR code registration and check-in.",
    ],
    stack: ["Go", "Xendit", "QR Code", "Email Blast", "REST API"],
    visual: "diagram",
    image: "/projects/ies-2026.png",
    accent: "rose",
    featured: true,
  },
  {
    slug: "iits-2025",
    title: "Indonesia International Transport Summit 2025",
    org: "PT Mantra Rupa",
    category: "Event Platforms",
    period: "2025", // TODO: confirm exact months
    role: "Backend engineer",
    team: "3-person studio (UI/UX, frontend, backend)",
    tagline: "Participant registration with QR check-in and a user-management CMS.",
    problem:
      "The organizer needed a reliable way to register participants and check them in at the door.",
    solution:
      "Built the registration backend with QR code generation and scanning, plus CMS endpoints for managing users.",
    responsibilities: [
      "Built the participant registration backend and QR code check-in.",
      "Built CMS endpoints for user management.",
    ],
    outcomes: ["Door check-in handled by QR scan."],
    highlights: ["QR code based check-in.", "CMS for user management."],
    stack: ["Go", "QR Code", "CMS"],
    visual: "diagram",
    image: "/projects/iits-2025.png",
    accent: "rose",
  },
  {
    slug: "iits-2026",
    title: "Indonesia International Transport Summit 2026",
    org: "PT Mantra Rupa",
    category: "Event Platforms",
    period: "2026", // TODO: confirm exact months
    role: "Backend engineer",
    team: "3-person studio (UI/UX, frontend, backend)",
    tagline: "Registration platform extended with a content-managed microsite.",
    problem:
      "The 2026 edition added a microsite that needed editable galleries, articles, and schedules on top of registration.",
    solution:
      "Rebuilt registration, QR check-in, and user management, and added CRUD endpoints for gallery, articles, and event schedule content.",
    responsibilities: [
      "Rebuilt registration, QR check-in, and CMS user management for the new edition.",
      "Added CRUD endpoints for the microsite's gallery, articles, and event schedule.",
    ],
    outcomes: ["The microsite team can publish content without backend changes."],
    highlights: ["Microsite content API.", "QR code registration and scanning."],
    stack: ["Go", "QR Code", "CMS", "REST API"],
    visual: "diagram",
    image: "/projects/iits-2026.png",
    accent: "rose",
  },
  {
    slug: "smi-event",
    title: "PT SMI Event Registration",
    org: "PT Mantra Rupa",
    category: "Event Platforms",
    period: "2025 – 2026", // TODO: confirm exact months
    role: "Backend engineer",
    team: "3-person studio (UI/UX, frontend, backend)",
    tagline: "Dual-track registration for an award ceremony and a symposium.",
    problem:
      "One event had two distinct categories, the ESS Award and a Symposium, each requiring separate registration flows.",
    solution:
      "Designed the registration system to separate both tracks cleanly, and built CMS features for user management, gallery, articles, and schedules.",
    responsibilities: [
      "Modeled two registration tracks, ESS Award and Symposium, in one system.",
      "Built CMS endpoints for users, gallery, articles, and schedules.",
    ],
    outcomes: ["Both event categories are handled by one backend with separate flows."],
    highlights: ["Two registration tracks in one system.", "Full content CMS."],
    stack: ["Go", "CMS", "REST API"],
    visual: "diagram",
    image: "/projects/smi-event.png",
    accent: "rose",
  },
  {
    slug: "dmi-kuningan",
    title: "Dewan Masjid Indonesia Kab. Kuningan Website",
    org: "PT Abdul Ghani Global",
    category: "Fullstack",
    period: "Apr 2026 – 2026", // TODO: confirm end month
    role: "Solo fullstack engineer",
    team: "Solo",
    tagline: "Public information site and CMS with financial dashboards.",
    problem:
      "DMI Kabupaten Kuningan needed a public presence with transparent finances, Qurban records, organizational structure, articles, and a gallery, all manageable by non-technical staff.",
    solution:
      "Built a Go backend and a Next.js + Tailwind frontend. The CMS manages income and expense transactions, Qurban data, articles, and gallery, with interactive charts on both the CMS and the public site. Deployed on a VPS with Docker and Nginx.",
    responsibilities: [
      "Designed and built the Go backend and REST API.",
      "Built the Next.js + Tailwind frontend and CMS and integrated them with the backend.",
      "Implemented income and expense tracking, Qurban records, articles, gallery, and organization structure.",
      "Added interactive transaction charts to both the CMS and the public site.",
      "Deployed on a VPS with Docker and Nginx.",
    ],
    outcomes: [
      "DMI Kuningan publishes its finances and activities transparently.",
      "Non-technical staff manage all content from the CMS.",
    ],
    highlights: [
      "Interactive transaction dashboards.",
      "Solo delivery from design to production.",
      "Docker + Nginx deployment on a VPS.",
    ],
    stack: ["Go", "Next.js", "Tailwind CSS", "Docker", "Nginx"],
    visual: "diagram",
    image: "/projects/dmi-kuningan.png",
    accent: "violet",
  },
  {
    slug: "gbb-portal",
    title: "Gerakan Baik Berdampak Foundation Portal",
    org: "PT Abdul Ghani Global",
    category: "Fullstack",
    period: "2026 – Present",
    role: "Solo fullstack engineer",
    team: "Solo",
    tagline: "Three portals, three subdomains, one foundation.",
    problem:
      "The foundation needed one system to run everything: internal operations, scholarship recipients, and donors, each with different access.",
    solution:
      "Built separate Internal, Scholarship Recipient, and Donor portals, each on its own subdomain with independent authentication. Features cover periods, recipients, curriculum, mentors, events, assignments, finance, reports, and settings.",
    responsibilities: [
      "Architected three portals (Internal, Scholarship Recipients, Donors) on separate subdomains with independent authentication.",
      "Built modules for periods, recipients, curriculum, mentors, events, assignments, finance, reports, and settings.",
      "Own the frontend, backend, and deployment end to end.",
    ],
    outcomes: [
      "One system runs the foundation's operations for staff, scholars, and donors.",
    ],
    highlights: [
      "Multi-portal architecture with isolated auth.",
      "End-to-end ownership: backend, frontend, and deployment.",
    ],
    stack: ["Go", "Next.js", "Tailwind CSS", "Docker", "Nginx"],
    visual: "diagram",
    image: "/projects/gbb-portal.png",
    accent: "violet",
    featured: true,
  },
  {
    slug: "ecosolex-erp",
    title: "Ecosolex ERP",
    org: "Shenzhen Topband Co., Ltd. (Indonesia)",
    category: "Fullstack",
    period: "2025 – 2026", // TODO: confirm exact period
    role: "Solo fullstack engineer",
    team: "Solo",
    tagline: "B2B ERP with purchase orders, price bargaining, and auctions.",
    problem:
      "Topband's Indonesian branch needed an ERP to manage inventory and high-value B2B purchases, where transactions reach hundreds of millions to billions of rupiah and cannot run through a payment gateway.",
    solution:
      "Built a landing page and a CMS covering stock in and out, purchase orders with approvals, price bargaining between admin and buyer companies, invoice upload with manual payment verification, a product catalog with documentation, workshop scheduling, and an auction feature. Delivered from scratch to production.",
    responsibilities: [
      "Built the landing page and a two-sided CMS for Topband admins and buyer companies.",
      "Implemented inventory in and out, purchase orders with approval, and price bargaining.",
      "Implemented invoice upload with manual payment verification before goods are released.",
      "Built the product catalog with documentation, workshop scheduling, and an auction module.",
      "Deployed the system to production.",
    ],
    outcomes: [
      "High-value B2B purchases flow through a controlled PO, approval, and verification process.",
    ],
    highlights: [
      "Two-sided CMS: Topband admins and buyer companies.",
      "PO approval and bargaining workflows.",
      "Auction module for partner companies.",
    ],
    stack: ["Go", "Next.js", "PostgreSQL", "Docker"],
    visual: "diagram",
    image: "/projects/ecosolex-erp.png",
    accent: "amber",
  },
  {
    slug: "reuni-sman2-kuningan",
    title: "SMAN 2 Kuningan Grand Reunion",
    org: "Free project",
    category: "Fullstack",
    period: "2025", // TODO: confirm exact period
    role: "Fullstack engineer",
    team: "Solo, frontend assisted by v0",
    tagline: "Event registration with QR tickets and a doorprize draw.",
    problem:
      "Alumni needed to register, pay a contribution, receive an entry pass, and follow event news in one place.",
    solution:
      "Built registration with Xendit (completed in development, payment verification switched to manual due to production onboarding delays), QR codes for entry, articles and gallery, a CMS to manage content, and a random doorprize winner draw.",
    responsibilities: [
      "Built registration with Xendit payments, completed in development with production verification handled manually.",
      "Generated QR codes that serve as entry passes.",
      "Built the CMS for articles, gallery, and event information, plus a random doorprize draw.",
    ],
    outcomes: ["Alumni registered online and entered the event with a QR pass."],
    highlights: ["QR code entry passes.", "Random doorprize draw feature."],
    stack: ["Go", "Next.js", "Xendit", "QR Code"],
    visual: "diagram",
    image: "/projects/reuni-sman2-kuningan.png",
    accent: "amber",
  },
  {
    slug: "everhealth",
    title: "Everhealth",
    org: "Team project",
    category: "Platform",
    period: "2023 – 2024", // TODO: confirm exact period
    role: "Backend engineer",
    team: "Team project",
    tagline: "A one-stop healthcare platform.",
    problem:
      "Patients needed a single place to consult doctors, find nearby pharmacies, and order medicine.",
    solution:
      "Contributed to a platform with pharmacy management for admins, online doctor consultations, and a drug e-commerce flow that routes orders to the nearest pharmacy.",
    responsibilities: [
      "Backend work for pharmacy management, doctor consultation, and medicine e-commerce.",
    ],
    highlights: ["Pharmacy management.", "Online doctor consultation.", "Medicine e-commerce."],
    stack: ["Go", "REST API"],
    visual: "diagram",
    image: "/projects/everhealth.png",
    accent: "emerald",
  },
];
