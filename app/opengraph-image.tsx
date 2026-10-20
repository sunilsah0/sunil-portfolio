import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = "Sunil Kumar Sah | AI Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "linear-gradient(135deg, #05060f 0%, #14102e 60%, #0b2a3a 100%)",
          color: "#e6e9f5",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#22d3ee" }}>
          // portfolio
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 700, marginTop: 16 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 46, marginTop: 12, color: "#a855f7" }}>
          {profile.role}
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 44, color: "#9aa3c7" }}>
          NLP · LLMs · Edge-Cloud AI · Cloud and DevOps
        </div>
      </div>
    ),
    { ...size }
  );
}