import { ImageResponse } from "next/og";

export const alt = "Mohamed Elbeek — Backend Developer";
export const size = {
  width: 1200,
  height: 630,
};
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
          justifyContent: "space-between",
          padding: "70px 80px",
          backgroundColor: "#090a0d",
          color: "#f4f4f7",
          fontFamily: "system-ui, -apple-system, sans-serif",
          border: "12px solid #0e1117",
        }}
      >
        {/* Top Header Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#3b82f6",
              }}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "18px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#9ca3af",
              }}
            >
              BACKEND DEVELOPER
            </span>
          </div>

          <span
            style={{
              fontFamily: "monospace",
              fontSize: "16px",
              color: "#6b7280",
            }}
          >
            Cairo, Egypt
          </span>
        </div>

        {/* Main Center Typographic Block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "68px",
              fontWeight: 500,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              margin: 0,
              color: "#ffffff",
            }}
          >
            Mohamed Elbeek
          </h1>

          <p
            style={{
              fontSize: "26px",
              color: "#9ca3af",
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "960px",
            }}
          >
            I build APIs with Node.js and NestJS, with a focus on authentication,
            payments, and data consistency.
          </p>
        </div>

        {/* Bottom Core Technologies Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
            }}
          >
            {["Node.js", "NestJS", "TypeScript", "PostgreSQL"].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 18px",
                  backgroundColor: "#12151b",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontFamily: "monospace",
                  color: "#d1d5db",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <span
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              color: "#3b82f6",
            }}
          >
            Clean Architecture · Prisma · Stripe
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
