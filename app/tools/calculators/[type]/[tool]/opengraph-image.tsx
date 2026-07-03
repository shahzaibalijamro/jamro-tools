import { ImageResponse } from "next/og";
import { getToolBySlug } from "@/data/tools/index";

export const runtime = "edge";
export const alt = "Jamro Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ type: string; tool: string }>;
}) {
  const { tool } = await params;
  const toolConfig = getToolBySlug(tool);
  const title = toolConfig ? toolConfig.title : "Free Online Calculator";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d1117",
          backgroundImage: "linear-gradient(to bottom right, #090e14, #121820, #1a222c)",
        }}
      >
        {/* Subtle grid pattern using SVG */}
        <svg
          style={{ position: "absolute", top: 0, left: 0, opacity: 0.1 }}
          width="1200"
          height="630"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1200" height="630" fill="url(#grid)" />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "32px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            maxWidth: "1000px",
          }}
        >
          <h2
            style={{
              fontSize: 28,
              color: "#60a5fa",
              textTransform: "uppercase",
              letterSpacing: "6px",
              marginBottom: "24px",
              fontWeight: 800,
            }}
          >
            JAMRO TOOLS
          </h2>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {title}
          </h1>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
