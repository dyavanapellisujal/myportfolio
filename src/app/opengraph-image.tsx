import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Rendered once at build time into a static PNG.
export const dynamic = "force-static";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const tags = ["Kubernetes", "EKS / GKE", "GitOps", "ArgoCD", "Helm", "KEDA", "Terraform", "AWS", "GCP", "Linux"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0d10",
          color: "#e7e9ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#7dd3b0", letterSpacing: 2 }}>DEVOPS / PLATFORM ENGINEER</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ marginTop: 20, fontSize: 32, color: "#a3aab5", maxWidth: 980, lineHeight: 1.35 }}>{site.positioning}</div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {tags.map((t) => (
            <div key={t} style={{ display: "flex", border: "1px solid #323944", borderRadius: 6, padding: "6px 14px", fontSize: 22, color: "#a3aab5" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
