import { cn } from "@/lib/utils";

/**
 * SectionDivider
 *
 * A decorative gradient strip with optional wave/curve effect used to smooth
 * the visual transition between adjacent page sections that have different
 * background colors.
 *
 * It is a server component: no client hooks, no "use client".
 *
 * Variants:
 *  - "light-to-dark"     Paper (#F4F6F7) -> Navy (#142634)
 *  - "dark-to-light"     Navy (#142634) -> Paper (#F4F6F7)
 *  - "light-to-glacier"  Paper (#F4F6F7) -> very light Glacier (#EFF8FC)
 *  - "glacier-to-light"  very light Glacier (#EFF8FC) -> Paper (#F4F6F7)
 */

export type SectionDividerVariant =
  | "light-to-dark"
  | "dark-to-light"
  | "light-to-glacier"
  | "glacier-to-light";

interface SectionDividerProps {
  variant: SectionDividerVariant;
  className?: string;
}

const VARIANT_STYLES: Record<SectionDividerVariant, { from: string; to: string; waveColor: string }> = {
  "light-to-dark": { from: "#F4F6F7", to: "#142634", waveColor: "#F4F6F7" },
  "dark-to-light": { from: "#142634", to: "#F4F6F7", waveColor: "#142634" },
  "light-to-glacier": { from: "#F4F6F7", to: "#EFF8FC", waveColor: "#F4F6F7" },
  "glacier-to-light": { from: "#EFF8FC", to: "#F4F6F7", waveColor: "#EFF8FC" },
};

export default function SectionDivider({
  variant,
  className,
}: SectionDividerProps) {
  const style = VARIANT_STYLES[variant];

  return (
    <div
      aria-hidden="true"
      className={cn("relative flex-none w-full overflow-hidden", className)}
      style={{ height: "80px" }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${style.from} 0%, ${style.to} 100%)`,
        }}
      />

      {/* Wave SVG overlay */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        style={{ height: "40px" }}
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 20C240 0 480 40 720 20C960 0 1200 40 1440 20V40H0V20Z"
          fill={style.to}
          fillOpacity="0.3"
        />
        <path
          d="M0 25C360 10 720 35 1080 15C1260 5 1380 25 1440 20V40H0V25Z"
          fill={style.to}
          fillOpacity="0.5"
        />
      </svg>
    </div>
  );
}
