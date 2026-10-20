export const profile = {
  name: "Sunil Kumar Sah",
  role: "AI Software Engineer",
  github: "https://github.com/sunilsah0",
  linkedin: "https://www.linkedin.com/in/sunil-kumar-sah-8a7451273",
  gmail: "acshacsh1@gmail.com",
  cv: "/Sunil-Kumar-Sah-CV.pdf", // the file goes in the public/ folder
};

// Update this if you later get a custom domain
export const siteUrl = "https://sunil-portfolio-ten.vercel.app";

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  headline: ["Building", "Autonomous Systems", "& Scalable AI Infrastructure"],
  intro:
    "Software and AI/ML engineer with 3+ years of experience across cloud, NLP and LLM work. Master's student at Stockholm University focused on NLP, Explainable AI and edge-cloud AI.",
  badges: [
    { icon: "pin", text: "Stockholm, Sweden" },
    { icon: "grad", text: "Stockholm University" },
    { icon: "spark", text: "NLP · LLMs · Explainable AI" },
  ],
  terminal: [
    { kind: "cmd", text: "whoami" },
    { kind: "out", text: "sunil-kumar-sah // AI & software engineer" },
    { kind: "cmd", text: "cat focus.txt" },
    { kind: "out", text: "LLMs · NLP · Edge-Cloud AI · Cloud/DevOps" },
    { kind: "cmd", text: "status" },
    { kind: "out", text: "open to opportunities" },
  ],
};

export const socials = {
  github: profile.github,
  linkedin: profile.linkedin,
  gmail: profile.gmail,
  huggingface: "", // e.g. "https://huggingface.co/yourname"
  x: "", // e.g. "https://x.com/yourname"

};