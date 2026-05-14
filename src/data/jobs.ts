import type { IndustryLabel } from "@/data/industries";

export type EmploymentType = "Full-time" | "Casual" | "Contract" | "Temporary";

export type JobStatus = "Draft" | "Live" | "Closed";

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
    id: "warehouse-storeperson-western-sydney",
    title: "Warehouse Storeperson",
    industry: "Warehousing & Logistics",
    location: "Western Sydney, NSW",
    type: "Casual",
    rate: "$32 – $36 / hr",
    posted: "Recently listed",
    summary:
      "Greater Sydney DC — ongoing shifts, RF pick experience valued, and a strong induction and safety culture.",
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
    status: "Live",
  },
  {
    id: "forklift-operator-liverpool",
    title: "Forklift Operator",
    industry: "Warehousing & Logistics",
    location: "Liverpool, NSW",
    type: "Casual",
    rate: "$34 – $38 / hr",
    posted: "Recently listed",
    summary:
      "Industrial precinct near Liverpool — LF operations, container devanning and yard discipline with documented procedures.",
    description: [
      "Operate counterbalance and reach forklifts in line with site traffic management and SWMS.",
      "Complete pre-starts, load restraint checks and handover notes for shift continuity.",
      "Support receivals, put-away and dispatch in a high-volume 3PL environment.",
    ],
    requirements: [
      "Current LF forklift licence",
      "Recent high-reach or counterbalance experience",
      "Safety-first attitude and clear communication",
    ],
    status: "Live",
  },
  {
    id: "construction-labourer-greater-sydney",
    title: "Construction Labourer",
    industry: "Construction",
    location: "Greater Sydney, NSW",
    type: "Casual",
    rate: "$36 – $40 / hr",
    posted: "Recently listed",
    summary:
      "Commercial and industrial projects across Western Sydney — site-ready crews with White Card and documented inductions.",
    description: [
      "General labouring, materials handling and site housekeeping as directed by the supervisor.",
      "Assist trades and deliveries with clear communication on exclusion zones and crane slews.",
      "Maintain PPE, signage and tidy work areas in line with site WHS expectations.",
    ],
    requirements: [
      "Valid White Card",
      "Recent construction labouring experience",
      "Own basic PPE and reliable transport",
    ],
    status: "Live",
  },
  {
    id: "process-worker-smithfield",
    title: "Process Worker",
    industry: "Manufacturing",
    location: "Smithfield, NSW",
    type: "Casual",
    rate: "$30 – $34 / hr",
    posted: "Recently listed",
    summary:
      "Western Sydney production facility — ongoing casual roles with GMP awareness and shift handovers.",
    description: [
      "Production line duties including packing, labelling and light machine tending.",
      "Complete quality checks and report variances to the team leader.",
      "Follow hygiene, housekeeping and safe manual handling procedures at all times.",
    ],
    requirements: [
      "Manufacturing or process work experience preferred",
      "Physically fit for repetitive tasks",
      "Available for rotating day/afternoon shifts",
    ],
    status: "Live",
  },
  {
    id: "hr-truck-driver-western-sydney",
    title: "HR Truck Driver",
    industry: "Transport",
    location: "Western Sydney, NSW",
    type: "Full-time",
    rate: "$40 – $45 / hr",
    posted: "Recently listed",
    summary:
      "Distribution network across Greater Sydney — multi-drop metro runs, dock discipline and professional customer contact.",
    description: [
      "Complete deliveries in a rigid HR vehicle with safe loading and restraint checks.",
      "Run multi-drop schedules and maintain accurate paperwork and communication with dispatch.",
      "Complete pre-starts, defect reporting and logbook compliance.",
    ],
    requirements: ["Current HR licence", "Clean driving record", "Multi-drop experience preferred"],
    status: "Live",
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
    status: "Live",
  },
  {
    id: "administration-assistant-parramatta",
    title: "Administration Assistant",
    industry: "Administration",
    location: "Parramatta, NSW",
    type: "Temporary",
    rate: "$35 – $38 / hr",
    posted: "Recently listed",
    summary:
      "Operations support for an industrial client — data entry, scheduling coordination and professional phone/email contact.",
    description: [
      "Coordinate rosters, timesheets and contractor documentation with accuracy and discretion.",
      "Support site and HR teams with scheduling updates and file maintenance.",
      "Handle inbound enquiries with a clear, professional tone.",
    ],
    requirements: [
      "Strong MS Office and data entry skills",
      "Experience in logistics, construction or industrial admin highly regarded",
      "Available for a 3–6 month assignment with potential extension",
    ],
    status: "Live",
  },
];

export const jobsById = Object.fromEntries(SEED_JOBS.map((j) => [j.id, j])) as Record<string, Job>;
