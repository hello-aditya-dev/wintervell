# Contributing to WinterVell

> Contribution rules for the WinterVell repository. WinterVell is a
> **proprietary commercial product** governed by the WinterVell
> Commercial Source License (WV-CSL) v1.0 — see [`LICENSE`](LICENSE).
> It is not an open-source project, and external contributions are not
> generally accepted.

---

## External contributions

WinterVell does **not** accept pull requests from non-owners. The
repository is private and the source is not licensed for redistribution.
If you are not an authorized contributor (an employee, contractor, or
licensee with written modification rights), do not clone, fork, or
submit changes.

If you are a licensee with an Agency Source or Studio tier and you
believe you have found a bug or have a feature request, see
[`SUPPORT.md`](SUPPORT.md) for the correct channel. Do not submit source
modifications unless your licence and a separate written agreement
permit it.

Security reports must follow [`SECURITY.md`](SECURITY.md). Do not open
public issues for security reports.

---

## Internal contribution flow

Authorized contributors follow this flow:

1. **Branch from `main`.** Use a descriptive branch name prefixed by the
   type: `feat/`, `fix/`, `docs/`, `chore/`, `refactor/`, `test/`,
   `perf/`.
2. **Write conventional commits.** Use the Conventional Commits format
   (`type(scope): subject`). The subject line is imperative, lowercase,
   and not longer than 72 characters. The body explains *why*, not just
   *what*.
3. **Do not commit secrets.** No real API keys, database credentials,
   licence identifiers, or production environment values. Use
   `.env.example` for placeholders only.
4. **Do not introduce copyleft dependencies.** No GPL, AGPL, or other
   copyleft licences in the WinterVell proprietary code path. If a
   dependency is unclear, ask before adding it.
5. **Update the SBOM.** When you add, upgrade, or remove a dependency,
   regenerate `sbom.json` and confirm the dependency licence report is
   still consistent.
6. **Pass CI.** Lint, type-check, and build must pass on the branch
   before merge. The CI workflow in `.github/workflows/` runs these
   checks automatically.
7. **Review.** At least one authorized reviewer must approve. Sensitive
   changes (security model, licence, provenance, SSRF block-list,
   data model migrations) require two reviewers.
8. **Squash-merge into `main`.** The commit message follows Conventional
   Commits. Release tags are cut from `main`.

---

## Code standards

- **TypeScript** strict mode; no `any` without a justifying comment.
- **React 19** functional components; hooks only; no class components.
- **Next.js 16** App Router conventions; server components by default;
  client components only where interactivity is required.
- **Prisma** for all database access; no raw SQL outside the documented
  migration path.
- **shadcn/ui (New York) + Tailwind 4** for UI; no inline styles for
  colour, spacing, or typography.
- **Accessibility.** New UI must pass the automated checks WinterVell
  itself runs; do not regress the product's own accessibility posture.
- **Tests.** New features require tests. Bug fixes require a regression
  test. The test suite is part of the roadmap (see [`ROADMAP.md`](ROADMAP.md)).

---

## Provenance and attribution

- **No Co-Authored-By or AI-attribution lines** in commit messages. The
  WinterVell project does not record AI-tool attribution in commit
  metadata.
- **No false attribution.** History is not rewritten to attribute work
  to a person who did not perform it.
- **Inherited code is labelled.** Code inherited from Cloudsun is
  re-licensed under WV-CSL; do not represent it as WinterVell-original
  if it is not. See [`docs/legal/PROVENANCE.md`](docs/legal/PROVENANCE.md).
- **AI-assisted code is reviewed.** Code produced with AI assistance is
  reviewed for verbatim copying, licence contamination, incorrect
  attribution, security vulnerabilities, unclear authorship, and
  fabricated implementations. Where review is incomplete, the gap is
  recorded in `docs/legal/KNOWN_LIMITATIONS.md`.

---

## Sign-off

Every commit by an authorized contributor must include a
`Signed-off-by: Name <email>` line, certifying that the contributor has
the right to submit the work under the WinterVell Commercial Source
License and that the work does not introduce third-party material
without a compatible licence.

This sign-off is the contributor's certification, modelled on the
Developer Certificate of Origin, adapted for WinterVell's proprietary
context. It is an internal record, not a grant of rights to any third
party.

---

## What you must not do

- Do not commit secrets.
- Do not introduce copyleft dependencies.
- Do not remove or alter copyright or licence notices.
- Do not represent the software as open source.
- Do not push WinterVell changes into the Cloudsun repository.
- Do not modify the Cloudsun repository, its history, its deployment,
  its environment, or its branding.
- Do not commit Cloudsun customer data or production secrets.
- Do not add `Co-Authored-By` or AI-tool attribution lines.
- Do not bypass CI, lint, type-check, or build requirements.

---

## Related documents

- [`LICENSE`](LICENSE) — WinterVell Commercial Source License (WV-CSL) v1.0.
- [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) — community conduct.
- [`SECURITY.md`](SECURITY.md) — security policy and reporting.
- [`SUPPORT.md`](SUPPORT.md) — support and commercial contact.
- [`ROADMAP.md`](ROADMAP.md) — phased delivery roadmap.
- [`docs/legal/PROVENANCE.md`](docs/legal/PROVENANCE.md) — provenance.
