import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { allGuideSlugs } from "@/lib/guide-content";
import { GUIDE_AUTHOR, getGuide } from "@/lib/parent-guides";

// Share image for each guide: the question on ivory, logo and author line.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Beacon House Parent Guide";

export function generateStaticParams() {
  return allGuideSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const logo = fs.readFileSync(path.join(process.cwd(), "public", "bh-ig-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          background: "linear-gradient(122deg, #FFFBF5 0%, #FFF8EF 50%, #F3F7FC 100%)",
          borderLeft: "14px solid #203A6B",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} height={44} alt="" style={{ height: 44 }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#203A6B",
            }}
          >
            Parent Guide
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 64,
              lineHeight: 1.12,
              color: "#14213D",
              maxWidth: 980,
            }}
          >
            {guide?.title ?? "Parent Guides"}
          </div>
          <div style={{ marginTop: 26, width: 72, height: 5, background: "#F8AF48" }} />
        </div>
        <div style={{ fontSize: 26, color: "#536174" }}>
          {`By ${GUIDE_AUTHOR.name}, ${GUIDE_AUTHOR.role}`}
        </div>
      </div>
    ),
    size,
  );
}
