/**
 * Work history rendered in the Experience timeline (most recent first).
 */

export type ExperienceType =
  | "Full-time"
  | "Freelance"
  | "Self-employed"
  | "Trainee"
  | "Apprenticeship"
  | "Training"
  | "Organization";

export type Experience = {
  company: string;
  role: string;
  type: ExperienceType;
  period: string;
  location?: string;
  summary?: string;
  bullets: string[];
  tags?: string[];
};

export const experiences: Experience[] = [
  {
    company: "PT Sentra Inovasi Prima (Yipy)",
    role: "Backend Engineer",
    type: "Full-time",
    period: "Apr 2024 – Present",
    location: "Jakarta, Indonesia",
    summary:
      "Yipy is a property-management platform for residences and apartments. I am one of two backend engineers and own the stack end to end.",
    bullets: [
      "Own the backend end to end: API design, database access, CI/CD deployment, Docker containers, Nginx, SSL, logging, and subdomain management.",
      "Contribute to system design analysis from the start of every new project and practice two-way peer code review.",
      "Built direct payment integrations with Bank BNI and Bank BSI as the sole backend engineer, replacing costly payment-gateway fees.",
      "Delivered IoT integrations: ZKTeco gate access cards, the MINNO-based YipyBox smart parcel locker, and LoRa smart electricity and water meters.",
      "Revamped the module and access-control system, enabling per-building feature toggles and CRUD-level role permissions.",
      "Handle ongoing maintenance, bug fixes, and continuous improvements across the platform.",
    ],
    tags: ["Go", "REST API", "CI/CD", "Docker", "Nginx", "Payments", "IoT"],
  },
  {
    company: "PT Mantra Rupa",
    role: "Backend Engineer",
    type: "Freelance",
    period: "Aug 2025 – Present",
    location: "Remote",
    summary:
      "A three-person studio (UI/UX, frontend, backend) trusted by PT Royalindo, an event organizer, for participant registration, websites, microsites, and event design.",
    bullets: [
      "Built registration and check-in APIs for Indonesia Economic Summit 2026, IITS 2025, IITS 2026, and PT SMI events, with QR code scanning at the venue.",
      "Integrated Xendit payments and exchanged participant data with partner vendors: ATS for business matching and Regius for badge printing.",
      "Developed CMS endpoints for user management, galleries, articles, and event schedules; ran participant email blasts.",
    ],
    tags: ["Go", "Xendit", "QR Code", "CMS", "Email Blast"],
  },
  {
    company: "PT Abdul Ghani Global",
    role: "Fullstack Engineer",
    type: "Self-employed",
    period: "Apr 2026 – Present",
    location: "Remote",
    bullets: [
      "Built and shipped the Dewan Masjid Indonesia Kabupaten Kuningan website and CMS: finance tracking, Qurban records, articles, gallery, and interactive dashboards.",
      "Building the Gerakan Baik Berdampak foundation portal: three portals (Internal, Scholarship Recipients, Donors) on separate subdomains with independent authentication.",
      "Responsible end to end: Go backend, Next.js frontend, and deployment with Docker and Nginx on a VPS.",
    ],
    tags: ["Go", "Next.js", "Tailwind CSS", "Docker", "Nginx", "VPS"],
  },
  {
    company: "Sea Labs Indonesia (Shopee)",
    role: "Backend Golang Engineer",
    type: "Trainee",
    period: "Oct 2023 – Feb 2024",
    bullets: [
      "Developed a strong foundation in backend development: OOP, design patterns, and clean architecture for maintainable, scalable code.",
      "Applied Go concurrency techniques such as channels to optimize application performance and responsiveness.",
      "Built RESTful APIs following best practices, including precise use of HTTP status codes.",
      "Gained proficiency in gRPC for scalable communication in distributed systems.",
    ],
    tags: ["Go", "gRPC", "Clean Architecture", "Concurrency"],
  },
  {
    company: "PT Telkom Indonesia Tbk.",
    role: "Android App Developer",
    type: "Apprenticeship",
    period: "May 2021 – Aug 2021",
    bullets: [
      "Developed a multi-experience video project in Flutter, establishing real-time video connections between Android and web applications.",
      "Implemented real-time communication protocols and synchronization for synchronized video streaming across platforms.",
    ],
    tags: ["Flutter", "Real-time Video", "Cross-platform"],
  },
  {
    company: "Google Bangkit",
    role: "Android App Developer",
    type: "Trainee",
    period: "Feb 2021 – Jun 2021",
    bullets: [
      "Completed full-stack Android training: server-side applications and REST APIs in Java, user interfaces in Kotlin.",
      "Trained in teamwork dynamics and professional conduct for effective collaboration.",
    ],
    tags: ["Java", "Kotlin", "Android"],
  },
  {
    company: "Student Hub Indonesia",
    role: "Student Camp Hackathon",
    type: "Training",
    period: "Jan 2021 – Feb 2021",
    bullets: [
      "Trained across the full hackathon cycle: ideation, problem solving, design and implementation, and pitching.",
    ],
    tags: ["Hackathon", "Pitching"],
  },
  {
    company: "Himpunan Mahasiswa Informatika ITB",
    role: "Project Manager",
    type: "Organization",
    period: "Jul 2020 – Dec 2020",
    bullets: [
      "Managed three projects within the division with a focus on web development.",
      "Led two web development projects from planning to delivery while coordinating teams and resources.",
    ],
    tags: ["Project Management", "Web Development"],
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
  location: string;
  details: string[];
};

export const education: Education[] = [
  {
    school: "Institut Teknologi Bandung",
    degree: "Bachelor's Degree in Computer Science",
    period: "Aug 2018 – Oct 2022",
    location: "Bandung, Jawa Barat, Indonesia",
    details: [
      "GPA 3.07 / 4.00",
      "Thesis: Application of Text Mining to Classify the Corpus of Al-Hadith",
    ],
  },
];

export type Organization = {
  name: string;
  role: string;
  period: string;
  bullets: string[];
};

export const organizations: Organization[] = [
  {
    name: "Bright Scholarship YBM BRI",
    role: "Member",
    period: "Aug 2019 – Jul 2022",
    bullets: [
      "Supported local MSMEs through community empowerment programs.",
      "Mentored high school students preparing for state university entrance exams.",
    ],
  },
  {
    name: "Himpunan Mahasiswa Informatika ITB",
    role: "Member",
    period: "Jul 2019 – Oct 2022",
    bullets: [
      "Joined a Capture the Flag bootcamp to sharpen cybersecurity skills.",
      "Built games in Unity and C# with the Game Development unit and competed in game jams.",
    ],
  },
  {
    name: "Keluarga Mahasiswa Islam ITB",
    role: "Member",
    period: "Sep 2018 – Oct 2022",
    bullets: [
      "Completed Latihan Mujtahid Dakwah (LMD), a leadership and problem-solving program for tackling community issues with technology.",
    ],
  },
];
