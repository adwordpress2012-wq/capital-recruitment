export type Job = {
  id: string;
  title: string;
  industry: string;
  location: string;
  type: "Full-time" | "Casual" | "Contract" | "Temporary";
  rate: string;
  posted: string;
  summary: string;
  description: string[];
  requirements: string[];
};

export const JOBS: Job[] = [
  {
    id: "warehouse-storeperson-sydney",
    title: "Warehouse Storeperson",
    industry: "Warehousing & Logistics",
    location: "Sydney, NSW",
    type: "Casual",
    rate: "$32 – $36 / hr",
    posted: "2 days ago",
    summary: "Join a leading 3PL operation in Western Sydney. Ongoing work with great team culture.",
    description: [
      "Picking and packing customer orders accurately and efficiently.",
      "Loading and unloading containers and freight.",
      "General warehouse duties and housekeeping.",
    ],
    requirements: [
      "Previous warehouse experience preferred",
      "LF licence highly regarded",
      "Reliable, safety-focused and team oriented",
    ],
  },
  {
    id: "trades-assistant-melbourne",
    title: "Trades Assistant",
    industry: "Construction",
    location: "Melbourne, VIC",
    type: "Full-time",
    rate: "$38 – $42 / hr",
    posted: "5 days ago",
    summary: "Major civil project in inner Melbourne. Long-term work for the right candidate.",
    description: [
      "Assisting trades on a busy construction site.",
      "General labouring duties as directed.",
      "Maintaining a safe and tidy work area.",
    ],
    requirements: ["White card (mandatory)", "Construction experience", "Own PPE & reliable transport"],
  },
  {
    id: "machine-operator-brisbane",
    title: "Machine Operator",
    industry: "Manufacturing",
    location: "Brisbane, QLD",
    type: "Full-time",
    rate: "$34 – $38 / hr",
    posted: "1 week ago",
    summary: "Day & afternoon shifts available at a leading FMCG manufacturer.",
    description: [
      "Operate and monitor production line machinery.",
      "Perform quality checks and basic maintenance.",
      "Follow GMP and food safety procedures.",
    ],
    requirements: ["Manufacturing or production experience", "Strong attention to detail", "Available for shift work"],
  },
  {
    id: "hr-driver-perth",
    title: "HR Truck Driver",
    industry: "Transport & Distribution",
    location: "Perth, WA",
    type: "Full-time",
    rate: "$40 – $45 / hr",
    posted: "3 days ago",
    summary: "Local metro deliveries for an established transport company. Day shifts.",
    description: [
      "Local metro deliveries with a rigid HR vehicle.",
      "Multi-drop runs and dock interactions.",
      "Maintain logbook and pre-start checks.",
    ],
    requirements: ["Current HR licence", "Clean driving record", "Multi-drop experience preferred"],
  },
  {
    id: "process-worker-adelaide",
    title: "Process Worker",
    industry: "Manufacturing",
    location: "Adelaide, SA",
    type: "Casual",
    rate: "$30 – $34 / hr",
    posted: "Today",
    summary: "Ongoing casual roles available for reliable process workers.",
    description: ["Production line work", "Quality inspection", "Packing finished goods"],
    requirements: ["Reliable and punctual", "Physically fit", "Available for ongoing work"],
  },
  {
    id: "front-of-house-sydney",
    title: "Front of House — Events",
    industry: "Hospitality & Events",
    location: "Sydney, NSW",
    type: "Casual",
    rate: "$33 – $40 / hr",
    posted: "4 days ago",
    summary: "Casual event work across leading Sydney venues — flexible shifts.",
    description: ["Set-up and pack-down", "Guest service and beverage service", "Maintain venue presentation"],
    requirements: ["RSA (mandatory)", "Hospitality experience", "Black & white uniform"],
  },
];

export const jobsById = Object.fromEntries(JOBS.map((j) => [j.id, j]));
