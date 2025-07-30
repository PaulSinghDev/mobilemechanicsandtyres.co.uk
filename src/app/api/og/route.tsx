import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Mobile Mechanics and Tyres";
    const description =
      searchParams.get("description") ||
      "Professional mobile mechanic services in London";

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
            background:
              "linear-gradient(135deg, #0C4A6E 0%, #075985 50%, #0EA5E9 100%)",
            fontFamily: "system-ui, sans-serif",
            position: "relative",
          }}
        >
          {/* Background pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)",
            }}
          />

          {/* Content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px",
              textAlign: "center",
              maxWidth: "1000px",
              zIndex: 1,
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: title.length > 50 ? "48px" : "64px",
                fontWeight: "bold",
                color: "white",
                lineHeight: 1.2,
                marginBottom: "40px",
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                wordWrap: "break-word",
              }}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: "32px",
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.4,
                fontWeight: "300",
                textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                wordWrap: "break-word",
              }}
            >
              {description}
            </p>

            {/* Brand accent */}
            <div
              style={{
                marginTop: "60px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "4px",
                  background: "linear-gradient(90deg, #FCD34D, #F59E0B)",
                  borderRadius: "2px",
                }}
              />
              <span
                style={{
                  fontSize: "24px",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: "500",
                }}
              >
                London&apos;s Trusted Mobile Mechanics
              </span>
              <div
                style={{
                  width: "60px",
                  height: "4px",
                  background: "linear-gradient(90deg, #F59E0B, #FCD34D)",
                  borderRadius: "2px",
                }}
              />
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.log(
      `Failed to generate OG image: ${
        e instanceof Error ? e.message : "Unknown error"
      }`
    );
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
