/**
 * WinterVell — Privacy-Conscious Analytics Event Tracking
 *
 * Centralized event names and tracking function.
 * No invasive session recording. No client or audit data sent to analytics.
 *
 * Development mode: console.log output
 * Production: ready for integration with Plausible, Umami, or similar.
 */

/* ─── Event Names ─── */

export const AnalyticsEvent = {
  /** User opened the live demo */
  DEMO_OPENED: "demo_opened",
  /** User opened a sample report */
  SAMPLE_REPORT_OPENED: "sample_report_opened",
  /** User scrolled to or viewed the pricing section */
  PRICING_VIEWED: "pricing_viewed",
  /** User opened the licence comparison table */
  LICENCE_COMPARED: "licence_compared",
  /** User opened the due diligence section */
  DUE_DILIGENCE_OPENED: "due_diligence_opened",
  /** User clicked a checkout / buy button */
  CHECKOUT_CLICKED: "checkout_clicked",
  /** User expanded a FAQ item */
  FAQ_EXPANDED: "faq_expanded",
  /** User opened the documentation link */
  DOCUMENTATION_OPENED: "documentation_opened",
  /** User submitted the contact form */
  CONTACT_SUBMITTED: "contact_submitted",
  /** User interacted with the ROI calculator */
  ROI_CALCULATOR_USED: "roi_calculator_used",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

/* ─── Properties Type ─── */

export type AnalyticsProperties = Record<string, string | number | boolean>;

/* ─── Core Tracking Function ─── */

/**
 * Track an analytics event.
 *
 * In development, logs to the console.
 * In production, dispatches to the configured analytics provider.
 *
 * @param eventName - One of the predefined AnalyticsEvent values
 * @param properties - Optional key/value pairs (never include client or audit data)
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsProperties
): void {
  // Sanitize: never allow PII or audit data through
  const safeProps = properties ? { ...properties } : undefined;

  if (safeProps) {
    // Remove any keys that could contain sensitive data
    const forbiddenKeys = [
      "email",
      "name",
      "phone",
      "url",
      "domain",
      "audit",
      "client",
      "report",
      "token",
      "password",
    ];
    for (const key of forbiddenKeys) {
      delete safeProps[key];
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.log(
      `%c[Analytics] %c${eventName}`,
      "color: #2563EB; font-weight: bold;",
      "color: #142634; font-weight: normal;",
      safeProps ?? ""
    );
  }

  // Production: integrate with Plausible, Umami, or similar
  if (process.env.NODE_ENV === "production") {
    // Plausible custom events
    if (typeof window !== "undefined" && (window as AnalyticsWindow).plausible) {
      (window as AnalyticsWindow).plausible!(eventName, {
        props: safeProps,
      });
    }

    // Umami custom events
    if (typeof window !== "undefined" && (window as AnalyticsWindow).umami) {
      (window as AnalyticsWindow).umami!.track(eventName, safeProps);
    }
  }
}

/* ─── Window Type Extension ─── */

interface AnalyticsWindow {
  plausible?: (
    event: string,
    options?: { props?: AnalyticsProperties }
  ) => void;
  umami?: {
    track: (event: string, properties?: AnalyticsProperties) => void;
  };
}

/* ─── React Hook ─── */

/**
 * React hook for tracking analytics events.
 *
 * @example
 * ```tsx
 * const track = useTrackEvent();
 * track(AnalyticsEvent.DEMO_OPENED);
 * track(AnalyticsEvent.CHECKOUT_CLICKED, { tier: "agency" });
 * ```
 */
export function useTrackEvent() {
  return trackEvent;
}
