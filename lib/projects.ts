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

const projects: Project[] = [
  {
    id: 1,
    slug: "mesh-elearning",
    title: "MESH: Modular eLearning for Safety & Health",
    category: "eLearning",
    shortDescription: "Interactive, voiceover-friendly eLearning modules for First Aid, Electrical Safety, HIRAC.",
    description: [
      "Built visual-heavy slides with minimal text; AI-friendly narration scripts.",
      "Added interactive checks and simulations; aligned to DOLE-OSHC templates."
    ],
    features: ["AI voiceovers", "Interactive quizzes", "Visual design system"],
    technologies: ["Articulate Storyline 3", "PowerPoint", "Next.js"],
    coverImage: "/images/projects/mesh-cover.png",
    thumbnailImage: "/images/projects/mesh-thumb.png",
    timeline: "2025",
    role: "Course Developer / Instructional Designer",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    slug: "hsseq-campaigns",
    title: "Petrosphere HSSEQ Monthly Campaigns",
    category: "HSSEQ",
    shortDescription: "End-to-end monthly safety campaigns and 30–45 min slide decks.",
    description: [
      "Topics include Heat Safety and Disaster Preparedness (with Cybersecurity).",
      "Consistent visual identity; data-backed talking points."
    ],
    features: ["Campaign planning", "Speaker notes", "Templates"],
    technologies: ["PowerPoint", "Google Workspace"],
    coverImage: "/images/projects/hsseq-cover.png",
    thumbnailImage: "/images/projects/hsseq-thumb.png",
    timeline: "2025",
    role: "HSEQ Officer / Trainer",
    liveUrl: "#"
  },
  {
    id: 3,
    slug: "bbs-lcm-manuals",
    title: "BBS & LCM Training Manuals (40 hrs)",
    category: "Training Manuals",
    shortDescription: "Comprehensive manuals with varied slide patterns and assessments.",
    description: [
      "40-hour BBS and LCM manuals with clear objectives and evaluation.",
      "Speaker notes for natural narration; minimal text slides."
    ],
    features: ["Module blueprints", "Assessments", "Speaker notes"],
    technologies: ["PowerPoint"],
    coverImage: "/images/projects/bbs-cover.png",
    thumbnailImage: "/images/projects/bbs-thumb.png",
    timeline: "2025",
    role: "Author / Designer"
  }
]

export default projects
