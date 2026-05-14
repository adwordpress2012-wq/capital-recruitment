import type { IndustryLabel } from "@/data/industries";

export type EmploymentType = "Full-time" | "Casual" | "Contract" | "Temporary";

export type JobStatus = "Draft" | "Published" | "Closed";

/** Job listing — shape kept JSON-friendly for a future Supabase `jobs` table. */
export type Job = {
  id: string;
  title: string;
  industry: IndustryLabel | string;
  location: string;
  /** Employment type (e.g. casual, full-time). */
  type: EmploymentType;
  rate: string;
  posted: string;
  /** Short summary shown in listings. */
  summary: string;
  /** Full description as bullet-style paragraphs. */
  description: string[];
  requirements: string[];
  status: JobStatus;
};

export const SEED_JOBS: Job[] = [
  {
    id: "warehouse-storeperson-sydney",
    title: "Warehouse Storeperson",
    industry: "Warehousing & Logistics",
    location: "Sydney, NSW",
    type: "Casual",
    rate: "$32 – $36 / hr",
    posted: "Recently listed",
    summary:
      "Western Sydney 3PL — ongoing shifts, strong safety culture, and clear induction for day-one productivity.",
    description: [
      "Pick, pack and dispatch orders accurately against KPIs and quality standards.",
      "Load and unload containers and inbound freight using safe manual handling techniques.",
      "Maintain a clean, audit-ready warehouse and support inventory checks as required.",
    ],
    requirements: [
      "Recent warehouse or storeperson experience",
      "LF licence highly regarded",
      "Reliable, safety-focused and team oriented",
    ],
    status: "Published",
  },
  {
    id: "trades-assistant-melbourne",
    title: "Trades Assistant",
    industry: "Construction",
    location: "Melbourne, VIC",
    type: "Full-time",
    rate: "$38 – $42 / hr",
    posted: "Recently listed",
    summary:
      "Established builder — long-term site work with structured supervision and documented SWMS.",
    description: [
      "Support qualified trades on a busy commercial site.",
      "Carry out general labouring duties as directed by the site supervisor.",
      "Keep work areas tidy, segregated and compliant with site WHS expectations.",
    ],
    requirements: [
      "Valid White Card",
      "Recent construction experience",
      "Own PPE and reliable transport",
    ],
    status: "Published",
  },
  {
    id: "machine-operator-brisbane",
    title: "Machine Operator",
    industry: "Manufacturing",
    location: "Brisbane, QLD",
    type: "Full-time",
    rate: "$34 – $38 / hr",
    posted: "Recently listed",
    summary:
      "FMCG manufacturer — day and afternoon shifts with strong GMP and food safety standards.",
    description: [
      "Operate and monitor production equipment in line with SOPs.",
      "Complete quality checks, basic troubleshooting and handover reporting.",
      "Follow GMP, hygiene and food safety procedures at all times.",
    ],
    requirements: [
      "Manufacturing or production experience",
      "Strong attention to detail",
      "Available for shift work",
    ],
    status: "Published",
  },
  {
    id: "hr-driver-perth",
    title: "HR Truck Driver",
    industry: "Transport",
    location: "Perth, WA",
    type: "Full-time",
    rate: "$40 – $45 / hr",
    posted: "Recently listed",
    summary:
      "Metro distribution — multi-drop runs, dock discipline, and professional customer contact.",
    description: [
      "Complete metro deliveries in a rigid HR vehicle.",
      "Run multi-drop schedules with safe loading and restraint checks.",
      "Maintain logbook compliance and vehicle pre-starts.",
    ],
    requirements: ["Current HR licence", "Clean driving record", "Multi-drop experience preferred"],
    status: "Published",
  },
  {
    id: "process-worker-adelaide",
    title: "Process Worker",
    industry: "Manufacturing",
    location: "Adelaide, SA",
    type: "Casual",
    rate: "$30 – $34 / hr",
    posted: "Recently listed",
    summary: "Ongoing casual roles for dependable process workers in a modern production facility.",
    description: [
      "Production line duties",
      "Quality inspection and packaging",
      "Support changeovers as directed",
    ],
    requirements: [
      "Reliable and punctual",
      "Physically fit for repetitive tasks",
      "Available for ongoing work",
    ],
    status: "Published",
  },
  {
    id: "front-of-house-sydney",
    title: "Front of House — Events",
    industry: "Hospitality",
    location: "Sydney, NSW",
    type: "Casual",
    rate: "$33 – $40 / hr",
    posted: "Recently listed",
    summary:
      "Premium venues — flexible shifts, polished presentation, and strong guest-service standards.",
    description: [
      "Set-up, service and pack-down for events",
      "Responsible service of alcohol where required",
      "Maintain venue presentation standards",
    ],
    requirements: ["Current RSA", "Hospitality or events experience", "Black-and-white uniform"],
    status: "Published",
  },
  {
    id: "security-officer-liverpool",
    title: "Security Officer",
    industry: "Security",
    location: "Liverpool, NSW",
    type: "Casual",
    rate: "$35 – $40 / hr",
    posted: "Recently listed",
    summary:
      "Corporate and logistics sites — access control, patrols, and incident reporting with a customer-first approach.",
    description: [
      "Conduct access control, patrols and monitoring in line with site procedures.",
      "Complete accurate incident logs, handovers and duress awareness.",
      "Represent the client professionally with clear communication and de-escalation.",
    ],
    requirements: [
      "Valid security licence (Class 1A/1B as applicable)",
      "First Aid certificate highly regarded",
      "Clear communication and reliability",
    ],
    status: "Published",
  },
];

export const jobsById = Object.fromEntries(SEED_JOBS.map((j) => [j.id, j])) as Record<string, Job>;
