import { ImageResponse } from "next/og";

export const alt = "WinterVell — AI Website Audit and Agency Sales Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * WinterVell Open Graph image.
 *
 * Premium B2B credibility card rendered at 1200x630 for social sharing.
 * Uses the WinterVell palette (paper, ink, navy, glacier, action blue) and
 * inline styles because the OG image runtime (Satori) does not support
 * Tailwind utility classes.
 *
 * Decoration: a subtle six-point snowflake watermark in Glacier, rendered
 * as an inline SVG (Satori supports <svg> children directly).
 *
 * Font: a clean sans-serif fallback stack. We avoid loading remote fonts to
 * keep the route lightweight and free of network dependencies.
 */
export default async function WinterVellOGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F4F6F7",
          backgroundImage:
            "radial-gradient(circle at 92% 12%, rgba(183, 221, 236, 0.18) 0%, rgba(183, 221, 236, 0) 38%), radial-gradient(circle at 6% 94%, rgba(183, 221, 236, 0.12) 0%, rgba(183, 221, 236, 0) 32%)",
          padding: "72px 80px",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          color: "#111820",
          position: "relative",
        }}
      >
        {/* Top row: snowflake mark + licence badge */}
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
              gap: "18px",
            }}
          >
            {/* Snowflake icon in Glacier */}
            <svg
              width="56"
              height="56"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <g
                stroke="#B7DDEC"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="32" y1="6" x2="32" y2="58" />
                <line x1="6" y1="32" x2="58" y2="32" />
                <line x1="13.5" y1="13.5" x2="50.5" y2="50.5" />
                <line x1="50.5" y1="13.5" x2="13.5" y2="50.5" />
                <polyline points="26,10 32,6 38,10" />
                <polyline points="26,54 32,58 38,54" />
                <polyline points="10,26 6,32 10,38" />
                <polyline points="54,26 58,32 54,38" />
              </g>
            </svg>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.1,
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#142634",
                  letterSpacing: "0.02em",
                }}
              >
                WinterVell
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#56616C",
                  marginTop: "2px",
                }}
              >
                Source-code licence
              </span>
            </div>
          </div>

          {/* Action blue badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 18px",
              borderRadius: "999px",
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: "#B7DDEC",
              }}
            />
            Founding release
          </div>
        </div>

        {/* Center: wordmark + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            marginTop: "-24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {/* Accent bar in Action Blue */}
            <div
              style={{
                width: "8px",
                height: "92px",
                borderRadius: "4px",
                backgroundColor: "#2563EB",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "92px",
                  fontWeight: 800,
                  color: "#111820",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                WinterVell
              </span>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 600,
                  color: "#142634",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}
              >
                AI Website Audit and Agency Sales Platform
              </span>
            </div>
          </div>

          <p
            style={{
              fontSize: "20px",
              color: "#3F4A55",
              maxWidth: "880px",
              lineHeight: 1.45,
              margin: 0,
            }}
          >
            Turn any website into a sales-ready audit. White-label audit
            engine, report builder, proposal generator and prospect pipeline
            you can deploy under your own brand.
          </p>
        </div>

        {/* Bottom row: feature pills + footer note */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {[
              "White-label audits",
              "Branded reports",
              "Proposal generator",
              "Prospect pipeline",
              "Full source code",
            ].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #DDE3E7",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#142634",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid #DDE3E7",
              paddingTop: "20px",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                color: "#56616C",
                letterSpacing: "0.02em",
              }}
            >
              wintervell.com · Source-code licence
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#56616C",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Self-hosted · Bring-your-own AI keys
            </span>
          </div>
        </div>

        {/* Watermark snowflake — large, low opacity, bottom-right */}
        <svg
          width="320"
          height="320"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-40px",
            bottom: "-60px",
            opacity: "0.12",
          }}
        >
          <g
            stroke="#B7DDEC"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="32" y1="4" x2="32" y2="60" />
            <line x1="4" y1="32" x2="60" y2="32" />
            <line x1="12" y1="12" x2="52" y2="52" />
            <line x1="52" y1="12" x2="12" y2="52" />
            <polyline points="26,8 32,4 38,8" />
            <polyline points="26,56 32,60 38,56" />
            <polyline points="8,26 4,32 8,38" />
            <polyline points="56,26 60,32 56,38" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
