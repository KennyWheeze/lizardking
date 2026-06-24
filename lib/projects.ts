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
    id: 1,
    slug: "sales-enablement",
    title: "Sales Enablement and Client Conversion Improvement Project",
    category: "Performance Consulting / Instructional Design",
    shortDescription:
      "A portfolio case study focused on diagnosing low client conversion and designing a sales enablement solution using performance analysis, diagnostic tools, and learning support assets.",
    description: [
      "This project explores a real-world sales performance challenge in a technical training services company. The organization receives inquiries from potential clients, but not all inquiries consistently convert into confirmed bookings or paying clients.",
      "Instead of assuming that the issue can be solved through training alone, this project uses a diagnostic approach to determine whether the problem is caused by knowledge gaps, skill gaps, process gaps, motivation or accountability gaps, or market and offer-related gaps.",
      "The final recommendation will include the right mix of learning solutions, performance support tools, workflow improvements, accountability measures, and evaluation methods."
    ], 
    features: ["Performance gap analysis", "Sales diagnostic framework", "Training vs non-training recommendation", "Sales enablement toolkit", "Storyline conversation simulation", "KPI-based evaluation plan"],
    technologies: ["Articulate Storyline", "PowerPoint", "ChatGPT", "Excel / Google Sheets", "Word / Google Docs"],
    coverImage: "/images/projects/mesh-cover.png",
    thumbnailImage: "/images/projects/mesh-thumb.png",
    client: "Anonymized workplace-based case study",
    timeline: "10-week portfolio project",
    role: "Instructional Designer / Performance Consultant",
    liveUrl: "#",
    githubUrl: "#",
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
