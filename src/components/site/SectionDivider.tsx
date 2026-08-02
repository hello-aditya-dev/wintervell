import { cn } from "@/lib/utils";

/**
 * SectionDivider
 *
 * A purely decorative gradient strip used to smooth the visual transition
 * between adjacent page sections that have different background colors
 * (e.g. a light/paper section meeting a navy section).
 *
 * It is a server component: no client hooks, no "use client".
 *
 * Variants:
 *  - "light-to-dark"     Paper (#F4F6F7) -> Navy (#142634)
 *  - "dark-to-light"     Navy (#142634) -> Paper (#F4F6F7)
 *  - "light-to-glacier"  Paper (#F4F6F7) -> very light Glacier (#EFF8FC)
 *  - "glacier-to-light"  very light Glacier (#EFF8FC) -> Paper (#F4F6F7)
 *
 * The divider sits flush between two sections (no margins) and is hidden
 * from assistive tech via aria-hidden, since it carries no semantic meaning.
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

const VARIANT_CLASS: Record<SectionDividerVariant, string> = {
  "light-to-dark": "bg-gradient-to-b from-[#F4F6F7] to-[#142634]",
  "dark-to-light": "bg-gradient-to-b from-[#142634] to-[#F4F6F7]",
  "light-to-glacier": "bg-gradient-to-b from-[#F4F6F7] to-[#EFF8FC]",
  "glacier-to-light": "bg-gradient-to-b from-[#EFF8FC] to-[#F4F6F7]",
};

export default function SectionDivider({
  variant,
  className,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex-none w-full h-16",
        VARIANT_CLASS[variant],
        className,
      )}
    />
  );
}
