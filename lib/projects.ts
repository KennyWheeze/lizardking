export interface ProjectGalleryImage {
  url: string
  caption?: string
}

export interface RelatedProject {
  slug: string
  title: string
  category: string
  image: string
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string[]
  features: string[]
  technologies: string[]
  coverImage: string
  thumbnailImage: string
  thumbnailAlt?: string
  thumbnailVariant?: "image" | "pipeline"
  gallery?: ProjectGalleryImage[]
  client?: string
  timeline: string
  role: string
  liveUrl?: string
  githubUrl?: string
  relatedProjects?: RelatedProject[]
}

// Keep this named export available too
export const projects: Project[] = [
  {
    id: 4,
    slug: "ai-research-pipeline",
    title: "Multi-Source AI Research Pipeline",
    category: "Automation & Digital Systems",
    shortDescription:
      "A scheduled n8n pipeline that combines RSS and API research sources, uses Gemini for structured relevance analysis, manages persistent processing state, prevents duplicates, and builds a searchable Notion research library.",
    description: [
      "A scheduled research system that collects AI developments from RSS and API sources and converts them into one shared research schema.",
      "The workflow prioritizes new work, uses Gemini for structured analysis, protects against duplicate processing and storage, and records completed outcomes for reliable future runs.",
    ],
    features: [
      "Multi-Source Ingestion",
      "Persistent Processing State",
      "Quota-Aware AI Analysis",
      "Duplicate Protection",
      "Retry-Safe Processing",
    ],
    technologies: ["n8n", "AI Automation", "Gemini", "GraphQL", "Notion", "Docker"],
    coverImage: "/images/projects/ai-research-pipeline/ai-research-workflow-full.png",
    thumbnailImage: "/images/projects/ai-research-pipeline/ai-research-workflow-ingestion.png",
    thumbnailAlt: "Architecture-style preview of the scheduled RSS and API research pipeline",
    thumbnailVariant: "pipeline",
    client: "Independent automation project",
    timeline: "Implemented · Production workflow published",
    role: "Workflow Designer & AI Automation Developer",
  },
  {
    id: 3,
    slug: "startup-portfolio-dashboard",
    title: "Startup Portfolio Executive Dashboard",
    category: "Data Analytics & Business Intelligence",
    shortDescription:
      "Designed and validated an interactive Power BI dashboard that transforms 25,000 startup records into an executive view of funding, recurring revenue, runway risk, workforce changes, company outcomes, and data quality.",
    description: [
      "The raw CSV contained 25,000 startup records spanning financial, operational, workforce, company-outcome, and data-quality fields.",
      "The project transformed that source data into a clear, decision-oriented executive dashboard and independently verified every major KPI against the raw records.",
    ],
    features: ["Financial KPIs", "Runway Risk", "Workforce Analysis", "Outcome Analysis", "Data Quality"],
    technologies: [
      "Power BI",
      "Power Query",
      "DAX",
      "Data Cleaning",
      "Data Validation",
      "Dashboard Design",
      "CSV Analysis",
    ],
    coverImage: "/images/projects/startup-portfolio-dashboard.png",
    thumbnailImage: "/images/projects/startup-portfolio-dashboard.png",
    thumbnailAlt:
      "Power BI startup portfolio executive dashboard showing financial, runway, workforce, outcome, and data-quality KPIs",
    client: "Independent sample-data portfolio project",
    timeline: "Completed portfolio project",
    role: "Data Analyst and Dashboard Designer",
    liveUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiNzc5MDBmZGUtNWIzMy00NmQ1LWI4ODgtMTNhM2UzYmRlMjgzIiwidCI6ImUxODMyMmU3LTFjMzMtNGM0My1iOWZiLTBkODY4MTU3N2VkZiIsImMiOjEwfQ%3D%3D",
  },
  {
    id: 2,
    slug: "automated-lms-enrollment",
    title: "Automated LMS Enrollment and User Provisioning Workflow",
    category: "Automation & Digital Systems",
    shortDescription:
      "Designed and implemented a form-driven workflow that creates WordPress learner accounts when needed, assigns purchased LearnDash courses, and delivers automated access instructions using Google Forms, Google Sheets, Apps Script, the WordPress REST API, Zapier, and LearnDash",
    description: [
      "I handled manual learner account creation and course assignment for clients who needed registration assistance.",
      "The workflow replaced repeated backend administration with a controlled, staff-facing enrollment request while preserving human payment verification.",
    ],
    features: ["User Provisioning", "Course Enrollment", "Workflow Orchestration", "Operational Controls"],
    technologies: [
      "Google Apps Script",
      "Zapier",
      "WordPress REST API",
      "LearnDash",
      "Google Workspace",
      "Process Automation",
    ],
    coverImage: "/images/projects/automationthumbnailfeatured.png",
    thumbnailImage: "/images/projects/automationthumbnailfeatured.png",
    thumbnailAlt:
      "Zapier workflow connecting Google Sheets to LearnDash for automated learner enrollment",
    client: "Live training operations",
    timeline: "Implemented in live operations",
    role: "Workflow Designer and LMS Administrator",
  },
  {
    id: 1,
    slug: "sales-enablement",
    title: "Sales Enablement and Client Conversion Improvement Project",
    category: "Performance Consulting / Instructional Design",
    shortDescription:
      "An independent portfolio case study based on a real workplace performance challenge, focused on diagnosing inconsistent client conversion and designing the right combination of learning, performance support, workflow, and accountability interventions.",
    description: [
      "This project explores a real-world sales performance challenge in a technical training services company. The organization receives inquiries from potential clients, but not all inquiries consistently convert into confirmed bookings or paying clients.",
      "Instead of assuming that the issue can be solved through training alone, this project uses a diagnostic approach to determine whether the problem is caused by knowledge gaps, skill gaps, process gaps, motivation or accountability gaps, or market and offer-related gaps.",
      "The final recommendation will include the right mix of learning solutions, performance support tools, workflow improvements, accountability measures, and evaluation methods.",
    ],
    features: [
      "Performance Analysis",
      "Root-Cause Diagnosis",
      "Training vs. Non-Training Decision-Making",
      "Sales Enablement Design",
      "Performance Support",
      "Scenario-Based Learning",
      "Evaluation Planning",
    ],
    technologies: ["Articulate Storyline", "PowerPoint", "Canva", "ChatGPT", "Excel / Google Sheets", "Word / Google Docs"],
    coverImage: "/images/projects/sales-enablement/thumbnailsales.png",
    thumbnailImage: "/images/projects/sales-enablement/thumbnailsales.png",
    thumbnailAlt:
      "Client Inquiry Simulation opening screen for a scenario-based sales enablement prototype",
    client: "Independent anonymized workplace case study",
    timeline: "10-week portfolio project",
    role: "Instructional Designer and Performance Consultant",
  },
]

/** Helper APIs expected by the template pages/components */

// Original getter
export function getProjects(): Project[] {
  return projects
}

// Alias to match pages calling getAllProjects()
export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug)
}

export function getRelatedProjects(slug: string): RelatedProject[] {
  return projects
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      image: p.thumbnailImage,
    }))
}

// Keep default export for existing imports like `import projects from "@/lib/projects"`
export default projects
