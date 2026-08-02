/**
 * SkipLink — Accessibility "Skip to main content" link
 *
 * Hidden by default, visible on keyboard focus.
 * Must be the first focusable element on the page.
 * Links to #hero (the main content start).
 */

export default function SkipLink() {
  return (
    <a
      href="#hero"
      aria-label="Skip to main content"
      className="
        sr-only
        focus:not-sr-only
        focus:fixed
        focus:top-4
        focus:left-1/2
        focus:z-[9999]
        focus:-translate-x-1/2
        focus:rounded-lg
        focus:bg-[#142634]
        focus:px-5
        focus:py-3
        focus:text-sm
        focus:font-semibold
        focus:text-white
        focus:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-[#2563EB]
        focus:ring-offset-2
        focus:ring-offset-white
        focus:transition-none
      "
    >
      Skip to main content
    </a>
  );
}
