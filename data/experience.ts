export type TimelineItem = {
  type: "work" | "education";
  title: string;
  org: string;
  place: string;
  period: string;
  points: string[];
};

export const timeline: TimelineItem[] = [
  {
    type: "education",
    title: "Master's in Computer and Systems Sciences",
    org: "Stockholm University",
    place: "Sweden",
    period: "2024 – 2026",
    points: [
      "Focus on NLP, Data Science & Mining, Explainable AI and Machine Learning",
      "Also studied Reinforcement Learning, ERP and IT Architecture",
    ],
  },
  {
    type: "work",
    title: "Software Engineer",
    org: "Codeware Lab Pvt. Ltd.",
    place: "Kathmandu, Nepal",
    period: "Mar 2022 – Jan 2024",
    points: [
      "Deployed cloud applications on AWS and Docker, improving scalability by 25%",
      "Led an e-commerce platform in React.js and Node.js, increasing conversion by 15%",
      "Optimized SQL queries and backend workflows, cutting execution time by 20%",
      "Worked in Agile teams with CI/CD-oriented delivery, testing and documentation",
    ],
  },
  {
    type: "work",
    title: "Software Engineer Intern",
    org: "10 Orbit Company",
    place: "Kathmandu, Nepal",
    period: "Oct 2021 – Mar 2022",
    points: [
      "Helped build a React.js web app that increased user engagement by 30%",
      "Debugged and optimized Java applications, resolving 1,000+ code errors",
      "Wrote technical documentation that reduced development time by 15%",
    ],
  },
  {
    type: "education",
    title: "B.E. in Computer Science and Engineering",
    org: "Vellore Institute of Technology",
    place: "India",
    period: "2018 – 2022",
    points: [
      "CGPA 8.02/10, capstone on Scalable AI/ML System Design",
      "Compex Scholarship (Indian Embassy, Kathmandu, 2018) for academic excellence",
    ],
  },
];