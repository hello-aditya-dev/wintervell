# Scoring Methodology

WinterVell scores every audit across nine categories: Overall, Technical, SEO, Accessibility, Conversion, Trust, Mobile, Content, and AI-visibility. Scores are weighted, reproducible, versioned, explainable, and evidence-based. A score is a number between 0 and 100.

This document is the canonical methodology. It is the contract between the audit engine, the report builder, and the published report.

---

## What a WinterVell score is, and is not

A WinterVell score **is** a reproducible summary of the findings collected during a specific audit at a specific time. The same findings and the same scoring version always produce the same score.

A WinterVell score **is not** an industry certification, an SEO ranking prediction, a WCAG conformance statement, or a guarantee of commercial outcome. Two sites with identical scores can have very different problems. The score is a starting point for a conversation, not a verdict.

This disclaimer appears on every published report and inside the report's executive summary. See [`known-limitations.md`](known-limitations.md).

---

## The nine score categories

| # | Category | Source |
|---|---|---|
| 1 | **Overall** | Weighted aggregate of the eight sub-scores (not itself a separate set of checks) |
| 2 | **Technical** | Technical category findings |
| 3 | **SEO** | SEO category findings |
| 4 | **Accessibility** | Accessibility category findings |
| 5 | **Conversion** | Conversion/UX category findings |
| 6 | **Trust** | Trust & Commercial Readiness category findings |
| 7 | **Mobile** | Technical mobile-rendering and Conversion/UX mobile-usability findings (cross-category slice) |
| 8 | **Content** | SEO content-depth and AI-visibility content-clarity findings (cross-category slice) |
| 9 | **AI-visibility** | AI & Search Visibility category findings |

Overall is the weighted aggregate of the other eight. Mobile and Content are cross-category slices: a Mobile sub-score is computed from the mobile-relevant findings across Technical and Conversion/UX, and the Content sub-score is computed from content-relevant findings across SEO and AI-visibility. This avoids double-counting while still giving the reader a focused view.

---

## Weighting table

The default weights are:

| Sub-score | Default weight |
|---|---|
| Technical | 0.18 |
| SEO | 0.16 |
| Accessibility | 0.14 |
| Conversion | 0.16 |
| Trust | 0.12 |
| Mobile | 0.08 |
| Content | 0.06 |
| AI-visibility | 0.10 |
| **Total** | **1.00** |

Weights are configurable per agency (an SEO-focused agency may up-weight SEO; a CRO-focused agency may up-weight Conversion) but the **default** weights above are what the report shows unless the agency has overridden them. Weight overrides are recorded in the audit's metadata so a reader can always tell which weighting was applied.

---

## Formula

For each sub-score `s` in `{Technical, SEO, Accessibility, Conversion, Trust, Mobile, Content, AI-visibility}`:

```
sub_score_s = 100 * (1 - deduction_s)
```

where `deduction_s` is the weighted sum of penalties for findings in that sub-score:

```
deduction_s = sum over findings f in s of (
    severity_penalty(f.severity)
    * confidence_factor(f.confidence)
    * scope_factor(f.scope)
    * category_normalizer(s)
)
```

- `severity_penalty`: Critical = 1.00, High = 0.60, Medium = 0.30, Low = 0.10, Informational = 0.00.
- `confidence_factor`: High = 1.00, Medium = 0.70, Low = 0.40. Lower-confidence findings contribute less to the deduction, because they may be false positives.
- `scope_factor`: site-wide = 1.00, primary-page-only = 0.60, single-page = 0.30.
- `category_normalizer`: a per-category constant chosen so that a "typical poorly-built site" lands around 40–55 and a "typical well-built site" lands around 80–90. The normalizer is part of the scoring version; it is not tuned per audit.

The Overall score is:

```
overall = 100 * sum over s of ( weight_s * (sub_score_s / 100) )
```

The Overall score is rounded to the nearest integer for display; sub-scores are rounded to the nearest integer. The underlying computation uses the unrounded values.

---

## Versioning

Every audit records the `ScoreVersion` used. A `ScoreVersion` is an immutable record containing:

- The set of sub-scores
- The default weights
- The severity / confidence / scope / normalizer constants
- The runner versions used to collect the findings
- A human-readable changelog

When the methodology changes, a new `ScoreVersion` is created. Existing reports keep the version they were published with — a report's score never silently changes because the methodology improved. Re-running an audit with a newer score version produces a new score, and the report shows both versions side by side where applicable.

---

## Incomplete scores

A sub-score is marked **incomplete** when:

- The category runner failed and could not be retried within the audit window.
- The audit was a Quick audit that did not run that category.
- A required page could not be crawled (DNS failure, timeout, blocked).
- The auditor marked a finding as "cannot verify."

An incomplete sub-score is shown as `—` in the report and excluded from the Overall computation. The Overall score is then recomputed against the remaining sub-scores with weights renormalised to the available set. The report explicitly states which sub-scores were excluded and why.

A score is never shown as a confident number when its evidence is incomplete. This is non-negotiable.

---

## Explainability

Every score in a WinterVell report can be expanded to show:

1. The findings that contributed to the deduction.
2. The severity, confidence, and scope of each contributing finding.
3. The penalty each finding contributed.
4. The weight applied to the sub-score.
5. The score version used.

A reader who disagrees with a score can drill down to the exact finding that drove it, read the evidence, and either accept it or flag it for manual review. There are no opaque "AI judged your site 67/100" outputs.

---

## Reproducibility

Given:

- The same set of findings
- The same `ScoreVersion`
- The same agency weight overrides

…two computations of the score produce identical results. The scoring function is pure: it does not depend on time, on the identity of the auditor, or on the prospect's industry. Reproducibility is enforced by a unit test that recomputes scores for a fixed findings fixture on every CI run.

---

## What scoring does not do

- It does not compare the prospect to other prospects (no benchmark percentile).
- It does not predict revenue uplift (no "fixing this will earn you $X").
- It does not rank the prospect against competitors.
- It does not certify anything.

Any commercial claim ("a 10-point increase in Trust typically converts X% better") would require evidence WinterVell does not collect and is therefore not made. The report's business-impact section is qualitative, written by an Auditor, and based on the findings — not on a score-derived projection.

---

## Related documents

- [`audit-methodology.md`](audit-methodology.md) — what produces the findings
- [`report-workflow.md`](report-workflow.md) — where scores appear
- [`../architecture/data-model.md`](../architecture/data-model.md) — `Score` and `ScoreVersion` models
- [`known-limitations.md`](known-limitations.md) — what WinterVell does not claim
