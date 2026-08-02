# Task 3-h: FinalCTA, ContactSection, SecuritySection

## Summary
Created three "use client" section components for the WinterVell commercial website, plus the server-side API route for contact form handling.

## Files Created

### 1. `/home/z/my-project/src/components/site/FinalCTA.tsx`
- **Section ID**: `final-cta`
- **Heading**: "Turn your next website review into a commercial opportunity."
- **Supporting copy**: "Deploy WinterVell under your own brand and connect website evidence directly to reports, proposals and pipeline."
- **Primary CTA**: "Buy the source licence" (large button, action blue #2563EB)
- **Secondary CTA**: "Explore the live demo" (outline button with Glacier border)
- **Trust line**: 4 items (Secure checkout, Commercial licence included, Deployment documentation included, Source delivery after verified payment)
  - "Secure checkout" is conditionally rendered — only shown when a checkout provider URL is configured in `commercial.checkout`
- **Navy background** (#142634) with white text
- Framer Motion animations with reduced-motion support

### 2. `/home/z/my-project/src/components/site/ContactSection.tsx`
- **Section ID**: `contact`
- **Form fields**: Name (required), Email (required), Subject (select: 5 options), Message (textarea, required)
- **Validation**: react-hook-form + zod resolver with full schema validation
- **Honeypot**: Hidden `website` field — if filled by a bot, submission is silently rejected (pretends success)
- **Protection**: Client-side validation, honeypot, server-side validation, safe error handling
- **Submit to**: `/api/contact` (POST)
- **Success/error states**: Full UI feedback with success screen, error banner, loading spinner
- **Contact info sidebar**: Lists all 5 contact purposes with email addresses from commercial config
- **Privacy note**: Server-side submission, no third-party scripts, honeypot active
- **Paper background** (#F4F6F7), white cards

### 3. `/home/z/my-project/src/components/site/SecuritySection.tsx`
- **Section ID**: `security`
- **Heading**: "Security built for production"
- **8 security features** in a 4-column grid:
  - SSRF protection with block-lists
  - Organisation-scoped data isolation (multi-tenant)
  - IDOR prevention
  - Rate limiting
  - Graceful licence validation (never deletes data)
  - Bring-your-own-key AI model
  - No client data transmitted to licence servers
  - Audit logging
- **Important disclaimer**: Amber callout explicitly stating this does NOT constitute formal WCAG certification, guaranteed security, or warranty
- **Security disclosure contact**: Links to `commercial.contact.securityEmail`
- **Navy background** (#142634), dark cards (#1A2E3E), Glacier accents

### 4. `/home/z/my-project/src/app/api/contact/route.ts`
- POST handler with zod validation matching the client schema
- Server-side validation (name, email, subject enum, message)
- Safe error handling — no internal details exposed
- Logs submissions for development; production would integrate a transactional email service
- Returns 400 for validation errors, 200 for success, 500 for server errors

## Page Integration
- All three new components added to `src/app/page.tsx` after existing sections
- Also added previously missing: BuyerRiskReduction, DueDiligence, FAQSection
- Section order: ...LicenceComparison → BuyerRiskReduction → DueDiligence → FAQSection → SecuritySection → ContactSection → FinalCTA → Footer

## Design System Applied
- Paper: #F4F6F7, Surface: #FFFFFF, Ink: #111820, Secondary ink: #56616C
- Navy: #142634, Glacier: #B7DDEC, Action: #2563EB, Pine: #24584F
- Amber: #B7791F, Critical: #B43C3C, Border: #DDE3E7
- Framer Motion animations with `useReducedMotion` support
- Responsive layouts (1→2→4 columns)
- All icons from lucide-react

## Lint & Compilation
- ESLint: passed with no errors
- Dev server: compiling successfully
