export type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics: { value: string; label: string }[];
  github?: string; // paste your repo link here when ready
  demo?: string; // paste your live demo link here when ready
};

export const projects: Project[] = [
  {
    title: "Green AI Compression",
    tagline: "Smaller, greener deep-learning models",
    description:
      "Applied pruning, quantization and knowledge distillation to deep-learning models to reduce model size and energy use while keeping accuracy.",
    tags: ["Python", "Deep Learning", "Pruning", "Quantization", "Distillation"],
    metrics: [
      { value: "3", label: "compression techniques" },
      { value: "✓", label: "accuracy maintained" },
    ],
    github: "https://github.com/sunilsah0/green-ai-wireless-model",
    demo: "https://github.com/sunilsah0/green-ai-wireless-model",
  },
  {
    title: "SunilGPT-LLM-Agent",
    tagline: "open-source AI chat assistant",
    description:
      "A free, open-source AI chat assistant that runs in the browser, in the style of ChatGPT and Claude.",
    tags: ["RAG", "Generative AI", "LLMs", "Research"],
    metrics: [{ value: "AI ↔ Chat", label: "SunilGPT-LLM-AGent" }],
    github: "https://github.com/sunilsah0/SunilGPT-LLM-Agent",
    demo: "https://sunilgpt-llm-agent.onrender.com/",
  },
  {
    title: "NLP Customer-Support Chatbot",
    tagline: "Automating support conversations",
    description:
      "Built an NLP-based chatbot that answers common customer questions automatically and shortens response time.",
    tags: ["Python", "NLP", "Chatbot"],
    metrics: [{ value: "40%", label: "faster responses" }],
    github: "https://github.com/sunilsah0/natural_language_autoencoders_pipeline",
    demo: "https://github.com/sunilsah0/natural_language_autoencoders_pipeline",
  },
  {
    title: "E-commerce Analytics Dashboard",
    tagline: "Real-time KPIs in one view",
    description:
      "A React front end with a Django backend and PostgreSQL database for real-time KPI monitoring, analytics and business insights.",
    tags: ["React.js", "Django", "PostgreSQL", "REST APIs"],
    metrics: [{ value: "Live", label: "KPI monitoring" }],
    github: "",
    demo: "",
  },
  {
    title: "Adaptive Edge-Cloud AI Offloading",
    tagline: "Master's thesis research",
    description:
      "Research on deciding adaptively where generative AI tasks should run, on resource-constrained edge devices or in the cloud.",
    tags: ["Edge AI", "Generative AI", "LLMs", "Research"],
    metrics: [{ value: "Edge ↔ Cloud", label: "adaptive offloading" }],
    github: "",
    demo: "",
  },
];