# Portfolio restyle · build log

Plan: [./2026-10-06_console-restyle.md](./2026-10-06_console-restyle.md).

## Step 1 — the home page (2026-10-06)

### Asked

Ian asked for the look of Trent's site v2.2 (Neon Genesis Evangelion's screens) on this portfolio, toned down so the work, the facts and the case studies stay clear, with no Japanese characters (request, 2026-10-06). The site is plain HTML on GitHub Pages.

### How it was run

From the session that built v2.2, editing this repo by its full path. Branch `console-restyle`, cut from `master` at `36d98e4` after a fetch. A local server (`python3 -m http.server 8765`) served the folder; every check ran in headless Chrome over its debugging protocol, from scripts kept outside the repo.

### Built

- `index.html`, rewritten: the bar, the hero inside its instrument frame, Featured Work, Education & Experience, Connect, the footer. The words are the old page's, with the copy changes the plan lists.
- `assets/css/console.css` (shared): the two fonts, the colors, base type, the bar, the Motion switch, buttons, the title cards and the squeeze, panels, stamps, lamps, the footer, and the arrival motion.
- `assets/css/home.css`: the hero and its frame (corners, rulers, readouts, the clock), the sections' cards, the work grid, the "Case study / Coming soon" board, the history lists, the Connect tiles.
- `assets/js/console.js`: the Motion switch and its memory, the arrivals, the section marker in the bar, the seven-segment clock (drawn as SVG shapes, ported from v2.2's `seven-segment.tsx`).
- `assets/fonts/`: Noto Serif Display Black and Oswald, Latin only (14.9 KB and 21.4 KB), each with its OFL license file.
- Nothing old was deleted. The case studies still load `variables.css`, `modern.css`, `theme.js`, `animations.js` and `modern.js`, and look as they did.

### Measured

Each title's width in the card serif at 900, in ems, before the squeeze (Chrome, 2026-10-06). A title's big line fills its block from these.

| Title      | em    |
| ---------- | ----- |
| DROSOS     | 4.379 |
| WORK       | 3.416 |
| EXPERIENCE | 6.841 |
| CONNECT    | 5.205 |

Also measured, for later: IAN 2.02, FEATURED 5.722, EDUCATION & 7.479, PROMPTLY 5.883, WREX 3.295, FXD 2.225, TRENT AI 5.037, MICROSOFT 6.4.

### Findings and fixes

1. **The bar let the page show through.** At 92% black, the hero's ruler and clock ghosted behind the name and the Resume button as the page scrolled. The bar is solid now.
2. **The Trent AI panel was half empty.** Stretched to the Microsoft panel's height, it had a gap of about 200px above its button. A striped board reading "Case study / Coming soon" now takes the spare height, and replaces the tag that said the same.
3. **The Education list was half empty, and the green lamp sat low.** The two history panels stretched to the same height, so Education (three rows) had a blank lower half. Each panel now keeps its own height. The date cell spanned two rows, so the lamp centered on both; it now sits on the first line.
4. **On a phone held sideways, the tagline drifted away from the name.** The card took the full width while the name was capped by the screen's height, so "Security & AI Designer / Developer" sat flush to the far edge. The card is now held to the capped name's width, and the tagline wraps under it.
5. **The Connect tiles lit before their title arrived.** They now start once CONNECT has landed (0.55 s).
6. **Each clock tick repainted the page.** The clock is on its own layer now. A trace of 2 s shows one paint a second at the hero, two small raster tasks, and no paints at all further down the page.
7. **On a short laptop screen the hero ran past the fold.** At 1280×720 the buttons sat at the edge and the clock was cut off. On wide screens no taller than 820px, the name's cap drops from 30% of the screen's height to 24%, and the whole frame, clock included, fits.
8. **Section titles took a lot of space.** At up to 22% of the screen's height, each section opened on a very tall block of type. The cap is now 19%.

### Checks

- **Sizes:** 320×568, 390×844, 768×1024, 844×390, 1024×768, 1280×720, 1280×800, 1366×768, 1440×900, 1920×1080, 2560×1440. Nothing scrolls sideways at any of them.
- **axe** (WCAG 2.0/2.1 A and AA, 2.2 AA, best practice): no violations at 1440×900, 390×844, 1280×720 and 844×390, with motion reduced and with motion on. axe left the text over the hero's frame as "incomplete" for contrast.
- **Contrast** against the real pixels under each letter: no text below AA, and none within 0.5 of it, at 1440×900, 1280×720, 390×844, 320×568 and 844×390.
- **Keyboard:** 28 stops, the skip link first, each with an orange ring and on screen. The hidden switches are not stops.
- **Motion:** filmed frame by frame (the hero's cut, a section card, a stamp, the tiles). The Motion switch stops every animation and the clock, is remembered, and applies before the first paint on a reload; switched back on, everything runs again.
- **No script:** nothing is hidden; the clock and the switches stay out of sight.
- **Links:** all 17 local references load.
- **Not run:** Firefox (its headless screenshot hangs in this environment) and Safari.

## Step 1 — the review round (2026-10-06)

### Asked

Hide the cat photo, since it is not Ian's own image, and remove X / Twitter, since Ian is not active there; then continue to step 2 (review, 2026-10-06).

### Built

- The hero is type alone: the title card, the intro and the links. On a wide screen the name takes 64% of the width, so it stands as tall as before, and the black to its right belongs to the card. `avatar.png` stays in the repo as the browser tab's icon.
- Connect has three tiles: Google Scholar, LinkedIn, GitHub. From 560px wide they stand in a row of squares; below that they stack as bars, the number beside the name, so "Google Scholar" never wraps in a small square.
- Moved to `console.css` so the case studies can share them: the frame's corners and its two-tier readout, a heading on a panel's top rule, corner marks for any box (`.marked`), and the opening card's play on load (`.plays`, which replaces the hero's own rules).

## Step 2 — Promptly (2026-10-06)

### Built

- `promptly.html`, rewritten in the new look, its words kept (the plan lists the small copy changes). Its inline style block and its own image-modal script are gone; it loads `console.css`, `case.css` and `console.js` only.
- `assets/css/case.css`: the bar's section links and gauge, the opening card, the abstract, section cards, the reading column, figures and their strips, design goals, quotes, the implications, the next study, and the enlarged-figure dialog.
- `assets/js/console.js`: the reading gauge (scaled on scroll, one update a frame at most), the enlarged figure (a native dialog over the page), and the bar bringing the lit section's link into view on a phone.
- Every image has its width and height, so nothing jumps as images load.

### Findings and fixes

1. **The first four figures filled the frame.** Their width cap (`--w: 48rem`) lost to the rule that lets figures out of the reading column, so each prompt strip ran 1,088px wide with type near 40px. Figures now take their own cap.
2. **The abstract's panel was wider than its words.** The panel itself is now 48rem wide.
3. **The implications took the reading column's list numbers.** The four panels are an ordered list, so they picked up the column's "01." markers and indent on top of the numbers on their rules. They now carry only their own.

### Checks

- **Sizes:** 320×568, 390×844, 768×1024, 844×390, 1024×768, 1280×720, 1440×900, 1920×1080 and 2560×1440. Nothing scrolls sideways. On a phone the section links scroll inside the bar only.
- **axe:** no violations on Promptly or the home page at 1440×900 and 390×844, with motion reduced and with motion on.
- **Contrast** against the real pixels under each letter: no text below AA, and none within 0.5 of it, on both pages at 1440×900 and 390×844.
- **Keyboard:** 25 stops on Promptly, each with an orange ring and on screen: the bar, Read Full Paper, the 13 figures, the next study, All Projects.
- **Enlarged figures:** Enter opens a figure with focus on Close and the page held still; Escape closes it and returns focus to the figure; a click opens one and a click beside the image closes it. Without script, all 13 figures link to their image files.
- **Gauge:** half way down the page it reads half; at the foot, full.
- **Motion:** the opening card filmed frame by frame (label, name, line, then the stamp at 1.1 s). The Motion switch stops it and is remembered across a reload. No paints at all on an idle Promptly page, at the top, the middle or the foot.
- **Not run:** Firefox and Safari.

## Step 2 — the review round (2026-10-06)

Ian approved Promptly and said to go on to step 3 (review, 2026-10-06). The open questions were answered at the start of the clean-up: delete the old résumé copies, `index.html.backup` and the unused images, but keep the UXR résumé; make the tab icon a console-style "ID" mark; and the challenge is "Everyday AI".

## Step 3 — Wrex, FxD and the clean-up (2026-10-06)

### Built

- `wrex.html` and `fxd.html`, rewritten on Promptly's template with their words kept (the plan lists the typo fixes). Wrex's qualitative findings and its discussion are numbered panels; FxD's four features are numbered panels between the figures they explain, and its four charts stay SVG.
- Shared additions in `case.css`: a third heading level (a label in the show's condensed capitals), plain lists with orange ticks, and numbered panels that stand alone between figures (`.flow > .panel`) as well as in a run (`.cards`, which Promptly's implications now use too).
- A `.keep-case` rule in `console.css`, last in the file so it beats any capitals set on the same element: "Trent AI" (the hero's readout, its panel, its button) and "FxD" (its panel, its title, three headings, the "Next" link) keep their own casing.
- `images/web/`: 30 WebP copies made with Pillow (11.9 MB of PNGs shown as 2.3 MB). Side by side at full size, PNG and WebP crops of text-heavy screenshots look the same. The script lives outside the repo; its rule is in the plan.
- The old stylesheets and scripts, 25 unused or stale files Ian approved, and the cat as tab icon are gone; `favicon.svg`, `favicon-32.png` and `apple-touch-icon.png` are new.

### Findings and fixes

1. **Wrex's wide screenshot strips were unreadable beside the text.** In the side-by-side layout, the 1,316px strips shrank to about 400px wide and 140px tall. They now sit under their paragraphs at full width, and the side-by-side layout, which only Promptly still uses, is an even half and half.
2. **An enlarged tall figure ran off the screen.** Wrex's notebook screenshot opened about 2,000px tall: the image's height was capped as a percentage of a grid row, which did not hold. It is now capped by the screen's height, less the Close bar; on a phone it opens at 350 by 519.
3. **Names went all-caps.** The title and label styles capitalize everything, so "Trent AI" showed as "TRENT AI" in three places on the home page, and "FxD" as "FXD". The first `.keep-case` rule sat above the panel styles in the file and lost to them; moved last, it holds.
4. **Wrex's synthesis table was too small to read** at 40rem; it now takes the frame's full width.

### Checks

- **Sizes:** Wrex and FxD at 320×568, 390×844, 768×1024, 844×390, 1024×768, 1280×720, 1440×900, 1920×1080 and 2560×1440. Nothing scrolls sideways.
- **axe:** no violations on all four pages at 1440×900 and 390×844, with motion reduced and with motion on.
- **Contrast** against the real pixels: no text below AA, and none within 0.5 of it, on Wrex and FxD at 1440×900 and 390×844.
- **Keyboard:** 23 stops on Wrex and 18 on FxD, each with an orange ring and on screen, at 1440 and 390.
- **Enlarged figures:** on Wrex and FxD, Enter opens with focus on Close, Escape returns focus to the figure, and a click beside the image closes it; FxD's SVG charts enlarge too. Without script, every figure links to its file (10 on Wrex, 7 on FxD).
- **Idle:** no paints on Wrex or FxD at the top, the middle or the foot.
- **Links:** all 107 local references across the four pages load, and no page logs a failed request.
- **Not run:** Firefox and Safari.

## The last review round (2026-10-06)

### Asked

Commit and push. Before that: the Microsoft panel's logos sat in a light square that looked out of place on the dark page; the Trent AI panel can use the company's logo, the SVG the product shows in dark mode; and the Education box was much shorter than the Experience box, so make them the same height or arrange them so the difference shows less (review, 2026-10-06).

### Built

- **Logos on the dark fill.** The logo image already had a transparent background; the light square was the panel's own white backing plus the light-gray tile drawn behind the Microsoft squares. The backing is gone from the CSS, and the tile is cut out of the image (a flood fill from the tile, so the white X inside the Excel icon stays), leaving the four colored squares and the Excel icon on the panel's dark fill.
- **The Trent AI wordmark.** `images/trent-ai-wordmark.svg` is a copy of the product's `Trent AI_Horizontal_Logo_Cloudstone White.svg`, the file its wordmark component shows in dark mode. It sits where the Microsoft panel's logo sits; its alt text is empty, since the panel's heading already names Trent AI.
- **Education and Experience, rearranged.** The two panels now stack, each a board of cells three to a row on a wide screen: the three schools fill one row and the six roles two, so neither box is a short list beside a long one. Each cell is its dates, the role or degree, and the place, on a thin orange rule. A phone keeps one column.

### Checks

- At 1440, 1024 and 390 wide: nothing scrolls sideways; on a phone the wordmark sits under the panel's name.
- axe: no violations on the home page at 1440×900 and 390×844, with motion reduced and with motion on.
- Contrast against the real pixels: no text below AA, and none within 0.5 of it, at 1440×900 and 390×844.
