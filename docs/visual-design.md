# Personal website visual design

The homepage and blog use a quiet editorial layout: a warm paper background, serif display headings, restrained rules, a compact author rail, and consistent metadata styling. The redesign changes presentation only. Biography, research, publications, links, dates, metrics, images, and blog source remain in their original files.

## Themes and typography

| Role | Day | Night |
|---|---|---|
| Page | `#f7f3eb` warm ivory | `#171c1b` charcoal with a green undertone |
| Surface | `#fcfaf6` | `#1e2522` |
| Heading | `#302b25` | `#efe9dc` |
| Body | `#514b42` | `#c8c9bf` |
| Muted text | `#756a5c` | `#a2ab9f` |
| Accent | `#925536` terracotta | `#d2b58a` champagne |
| Secondary | `#536c5e` sage | `#acc0b3` |

All tokens live in `_sass/_editorial.scss`. Display headings use local Iowan Old Style/Palatino/Georgia; body text uses the system sans-serif stack, with Chinese fallbacks. There are no new remote fonts, image downloads, or front-end dependencies. The existing theme switch still supports light, dark, and the system preference and stores manual preferences in `theme-mode`.

## Layout and behavior

The desktop layout uses a sticky author rail and a wide reading column. The author rail renders `author.bio` once; `site.description` is reserved for page metadata and is not repeated in the contact list. Below 960px the complete author information follows the main content, allowing the introduction to lead on small screens. Below 600px the portrait sits beside the name, metrics form two columns, and research, work, and experience become single-column sections. Existing navigation items remain available through the overflow menu.

The main stylesheet imports the existing template foundations followed by `editorial`. The former custom styles have been replaced rather than retained as a competing theme. Existing publication sorting, metric refresh, email protection, and comment scripts remain unchanged. `assets/js/editorial.js` adds reading progress, section highlighting, accessible overflow-menu state, Escape dismissal, and same-page anchor positioning that respects the sticky header and reduced-motion preferences. The default layout also supplies a keyboard skip link.

## Build and verification

Build as before with `bundle exec jekyll build`, or preview with `bundle exec jekyll serve --host 127.0.0.1`. Keep generated `_site/`, dependency directories, and browser artifacts out of Git.

The September 2026 redesign is checked against a fresh build of the previous source: main content text, heading text, link targets, and image references must match. Browser verification covers both themes at 320, 390, 768, 1024, and 1440 CSS pixels; theme persistence and system following; navigation and focus; email reveal; and blog navigation. External analytics, live metric endpoints, and the hosted comment widget are excluded from deterministic browser checks. Their existing integrations are retained, but their remote service availability is not established by these checks.

### Verified result (2026-09-20, user Mac)

A clean Jekyll build and browser validation passed for all three existing pages: homepage, blog index, and article. All 30 combinations of these pages, five viewport widths, and two themes had no horizontal overflow or broken local images; author contact links remained visible. All 24 sampled theme text combinations met a 4.5:1 contrast threshold (minimum 4.55:1). Browser execution produced zero uncaught JavaScript errors. Theme persistence, system-theme changes, menu dismissal, fixed-header anchors, email reveal, blog navigation, and keyboard skip navigation passed. This is sampled visual/interaction validation, not a full accessibility audit.

All 12 source files under `_pages/`, `_posts/`, `_data/`, and `images/` matched the original SHA-256 digests. Rendered main content matched the baseline on all three pages, including 56 links and one image in total. Eight additional configuration, template, and integration files were confirmed unchanged. Generated CSS is smaller than the baseline; no JavaScript libraries or external resources were added.

## YuE and YuE2 content (September 2026)

Following review, the standalone YuE2 feature, latest-release badge, and featured sorting were removed. The original editorial stylesheet and citation-based project sorting are restored. On September 23, YuE and YuE2 were merged into one ordinary Selected Work card, with separate links to the YuE repository and YuE2 project page. The card displays their shared repository star count once and labels the citation count as YuE's publication only. YuE2 remains a normal research tag and a mention in the biography. The card uses the same styling as the other projects; there is no dedicated hero or Trending scoreboard.

The verified GitHub count remains 9,885 as observed on September 20, 2026 at 23:59:45 +08:00 via the [official repository API](https://api.github.com/repos/multimodal-art-projection/YuE). Stars belong to the shared YuE/YuE2 repository. Counts remain exact below 10,000; larger values use a floored one-decimal `k+` label. Metric timestamps prevent stale branch data from replacing the build-time snapshot. The YuE2 project description scopes its Suno v5 comparison to [WildSongBench](https://github.com/multimodal-art-projection/YuE/blob/main/docs/benchmarks.md). Scholar metrics remain unchanged.

The rejected feature and its dated evidence remain in the chronological task record; they are not part of the current visual design.

## Portrait refinement (September 21, 2026)

The hero portrait uses a square aspect ratio with a 6px corner radius at every viewport. The earlier arched top was removed following user feedback. The source image, small circular author-rail avatar, and the rest of the theme remain unchanged.

The navigation overrides the legacy 250px minimum width so its overflow menu stays within the space reserved beside the theme control. Both controls are vertically centered. This prevents the menu and theme switch from covering one another on narrow screens.

Validation: 24 homepage layouts (light/dark at 320, 360, 390, 572, 600, 601, 768, 960, 961, 1024, 1199 and 1440 CSS pixels) passed in the Codex in-app browser. No horizontal overflow, menu/theme overlap, or name/portrait overlap was observed; portraits stayed square with 6px corners. At 320px, the controls have a 12px gap, the overflow menu opens within the viewport, and selecting Work closes the menu and places its heading below the sticky header. The portrait asset and all page content are unchanged by this refinement.

## Scholar metric freshness (October 13, 2026)

The verified profile snapshot is 9,185 citations, h-index 31 and i10-index 49, observed on October 13, 2026 at 15:16:51 +08:00. It is stored in `_data/metrics.json`; the homepage fallback text uses the same values. The profile table was read earlier that day and the citation total was also confirmed by the user's Scholar screenshot. A later refresh attempt did not complete, so it is not recorded as a new observation. Individual publication counts retain their existing snapshot and are not represented as newly verified.

The `site-metrics` branch updates independently. Its top-level `updated_at` can change when GitHub stars refresh even if Scholar fails. Both the browser and Python updater therefore compare the Scholar group's own `observed_at`, falling back to its `updated_at`, and preserve the newer snapshot. A newer observation is accepted even if citation counts decrease. Successful Scholar fetches now record an exact observation timestamp. The profile capture-date note refers only to the profile metrics.

The updater pins `bibtexparser<2` because scholarly 1.x imports the removed `bibtexparser.bibdatabase` API; the unbounded dependency had prevented updates since the previous snapshot. On failure, the newest verified Scholar data are retained with their original date. To update manually, change the Scholar object and its real observation timestamp, build, and verify the rendered numbers after the asynchronous refresh. Do not relabel an old Scholar snapshot with the workflow run date.

## Publishing

GitHub Pages builds the repository root on the `main` branch and serves [a43992899.github.io](https://a43992899.github.io/). Commit the reviewed source changes and push `main` to publish; generated `_site/` output is not committed. After each release, verify that the Pages deployment corresponds to the pushed commit and has succeeded, then check the live homepage, stylesheet, portrait, and narrow-screen navigation. The site-metrics branch updates statistics independently and is not the Pages source.
