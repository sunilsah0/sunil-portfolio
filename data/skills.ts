export type SkillCategory = {
  title: string;
  icon: "code" | "brain" | "database" | "layers" | "cloud";
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "code",
    items: ["Python", "Java", "JavaScript", "C", "SQL", "HTML", "CSS", "TypeScript"],
  },
  {
    title: "AI / Machine Learning",
    icon: "brain",
    items: [
      "Machine Learning",
      "Deep Learning",
      "NLP",
      "Generative AI",
      "LLMs",
      "LLM Fine-Tuning",
      "Explainable AI",
      "Reinforcement Learning",
      "Quantization",
      "Knowledge Distillation",
    ],
  },
  {
    title: "Data & Databases",
    icon: "database",
    items: [
      "PostgreSQL",
      "MySQL",
      "Oracle",
      "Databricks",
      "Data Analytics",
      "Data Mining",
      "Feature Engineering",
    ],
  },
  {
    title: "Software Engineering",
    icon: "layers",
    items: [
      "React.js",
      "Node.js",
      "Django",
      "REST APIs",
      "System Design",
      "Software Architecture",
      "Testing",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    items: [
      "AWS",
      "GCP",
      "Docker",
      "Git",
      "GitLab",
      "CI/CD",
      "Deployment Automation",
    ],
  },
];