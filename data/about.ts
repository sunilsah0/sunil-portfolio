export const extraFacts: string[] = [
  "Languages spoken: English (fluent), Hindi (fluent), Nepali (native), Swedish (beginner).",
  "Based in Stockholm, Sweden. Has studied and worked in Nepal, India and Sweden.",
  "Certificates: AWS Databricks Platform Architect Learning Plan (2025), Pre-Training and Fine-Tuning LLM (Databricks, 2025), Data Analyst Associate (Databricks, 2025), Graph Search, Shortest Paths and Data Structures (Stanford/Coursera, 2019).",
  "The best way to contact Sunil is the contact form at the bottom of this website, or LinkedIn.",
  // Add more facts here, one per line.
];

export type Photo = {
  src: string; // file inside public/images, for example "/images/sunil-1.webp"
  alt: string; // describe the photo (helps blind users and search engines)
  position?: string; // which part stays visible when cropped, for example "center 20%"
};

// Put 1 to 3 photos here. The layout adapts automatically.
// Only list files that really exist in public/images.
export const photos: Photo[] = [
  {
    src: "/images/sunil-1.webp",
    alt: "Portrait of Sunil Kumar Sah",
    position: "center 25%", // 25% from the top keeps faces in view
  },
  // { src: "/images/sunil-2.webp", alt: "Sunil Kumar Sah working at a laptop", position: "center" },
  // { src: "/images/sunil-3.webp", alt: "Sunil Kumar Sah in Stockholm", position: "center" },
];

// Your bio. One string per paragraph. Edit freely.
export const bio: string[] = [
  "I'm Sunil Kumar Sah, a software engineer and AI/ML professional based in Stockholm, Sweden. I have 3+ years of experience building scalable applications, cloud systems and intelligent solutions, and I've studied and worked across Nepal, India and Sweden.",
  "My Master's in Computer and Systems Sciences at Stockholm University (2024–2026) focuses on NLP, data science, Explainable AI, machine learning and reinforcement learning. My recent work includes compressing deep-learning models with pruning, quantization and knowledge distillation, building NLP chatbots, and researching adaptive edge-cloud AI.",
  "I enjoy turning research ideas into reliable products, from React and Node.js front ends to AWS and Docker deployments.",
];

export const quickFacts = [
  { value: "3+", label: "years of experience" },
  { value: "3", label: "countries: Nepal, India, Sweden" },
  { value: "Master's", label: "Stockholm University" },
];