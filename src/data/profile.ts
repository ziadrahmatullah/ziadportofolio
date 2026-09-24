/**
 * Personal information shown across the site.
 * Edit this file to update your name, headline, bio, and contact links.
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "whatsapp";
  /** Optional value shown instead of the label, e.g. a phone number. */
  detail?: string;
};

export const profile = {
  name: "Muhammad Ziad Rahmatullah",
  shortName: "Ziad",
  /** Text shown next to the logo badge in the navbar. */
  wordmark: "Muhammad Ziad Rahmatullah",
  role: "Backend Engineer",
  /** Rotating words in the hero typewriter. */
  roles: [
    "Backend Engineer",
    "Go (Golang) Developer",
    "Payment & IoT Integrator",
    "Fullstack Builder with Next.js",
  ],
  tagline:
    "I design, build, and run production backends in Go. From REST APIs and database schemas to CI/CD, Docker, and Nginx on the server. I also ship fullstack products with React and Next.js.",
  location: "Jakarta, Indonesia",
  /** Optional profile photo. Drop a square image into public/ and set e.g. "/avatar.jpg". */
  avatar: "/avatar.jpg" as string,
  email: "ziad.muhammad.r@gmail.com",
  /** WhatsApp number. `link` uses international format without the leading +. */
  whatsapp: {
    display: "+62 877-2369-3870",
    link: "https://wa.me/6287723693870",
  },
  bio: [
    "I am a versatile Backend Engineer specializing in Go, with hands-on experience designing, building, and maintaining RESTful APIs backed by PostgreSQL and MySQL. I work with GORM, CI/CD pipelines, server deployment, container management, and Nginx configuration.",
    "At Yipy I own the backend end to end in a two-engineer team, from system design to production. I have integrated direct payments with major Indonesian banks (BNI and BSI), and connected IoT hardware such as access gates, smart parcel lockers, and LoRa-based electricity and water meters.",
    "Outside my main role I build fullstack products for events, foundations, and small businesses using Go and Next.js, deployed on VPS infrastructure with Docker and Nginx.",
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/ziadrahmatullah",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/ziadrahmatullah",
      icon: "linkedin",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/6287723693870",
      icon: "whatsapp",
      detail: "+62 877-2369-3870",
    },
    {
      label: "Email",
      href: "mailto:ziad.muhammad.r@gmail.com",
      icon: "mail",
    },
  ] satisfies SocialLink[],
  stats: [
    { value: "2+", label: "Years building production backends" },
    { value: "2", label: "Direct bank integrations (BNI, BSI)" },
    { value: "3", label: "IoT hardware integrations" },
    { value: "15+", label: "Projects shipped" },
  ],
  facts: [
    { label: "Location", value: "Jakarta, Indonesia" },
    { label: "Focus", value: "Go backend, payments, IoT, fullstack" },
    { label: "Education", value: "B.Sc. Computer Science, ITB" },
    { label: "Languages", value: "Indonesian (native), English (intermediate)" },
  ],
} as const;
