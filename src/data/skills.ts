/**
 * Skill groups rendered in the Skills section.
 */

export type SkillGroup = {
  title: string;
  description: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    description: "Primary and secondary programming languages.",
    items: ["Go (Golang)", "Python", "JavaScript / TypeScript", "Java", "C / C++", "Dart (Flutter)"],
  },
  {
    title: "Backend",
    description: "Frameworks, protocols, and patterns I use daily.",
    items: ["Gin", "GORM", "REST API", "gRPC", "Protobuf", "Kafka", "Redis", "Unit Testing", "Clean Architecture"],
  },
  {
    title: "Databases",
    description: "Relational and NoSQL stores.",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Cassandra"],
  },
  {
    title: "DevOps & Infrastructure",
    description: "Shipping and operating services in production.",
    items: ["Docker", "Kubernetes", "CI/CD Pipelines", "Nginx", "SSL / TLS", "Linux VPS", "Logging & Monitoring"],
  },
  {
    title: "Frontend",
    description: "Building and integrating user interfaces.",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Integrations",
    description: "Third-party systems I have connected end to end.",
    items: ["Bank BNI Direct", "Bank BSI Direct", "Xendit", "ZKTeco Access Control", "LoRa IoT Meters", "QR Code Check-in", "Email Blast"],
  },
];
