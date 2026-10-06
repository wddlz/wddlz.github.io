# Portfolio restyle · the console look

**Status: done (2026-10-06), with one step after it.** All three steps are built, checked and reviewed: the home page and all three case studies are in the new look, and the clean-up is done. Merged into `master` and pushed at Ian's go. Step 4, a screen of moving instruments behind every page, is built, reviewed, and pushed to `master` at Ian's go (2026-10-06). Branch `console-restyle`. Nothing is live until it merges into `master`, which GitHub Pages publishes within about a minute of a push.

This folder starts with `_`, so GitHub Pages leaves it off the site. It is still public on GitHub.

## Why

Ian asked (2026-10-06) to bring the look of Trent's site v2.2 (the screens of Neon Genesis Evangelion) to this portfolio, toned down: it is a portfolio, so the work, the facts and the case studies must stay clear. No Japanese characters; the rest of the look is wanted.

## The idea

The show's loud moments become the page's chapter breaks, and between them the page reads calmly.

- **Title cards** open the page (the name), each section, and each case study. Heavy serif squeezed sideways to 80%, white on black, cut in hard on arrival.
- **The console's look stays on the edges:** thin orange frames and corner marks, small condensed labels, and in the home page's hero only, rulers, readouts and a seven-segment clock.
- **A screen behind the pages**, as the command room has one: a faint honeycomb, and over it one display at a time, cutting in as the reader moves between sections. On the home page: a survey map with a scan crossing it under the hero, a range finder sweeping at Work, a patch of the honeycomb lighting cell by cell at Education & Experience, rings going out behind Connect. A case study's screen is light: the range finder, dim, at its opening card, then a dim map with a slow scan behind the reading. Thin orange line, slow, kept where the reading column leaves room.
- **Stamps carry facts.** The awards are red stamps on their projects, in place of badges.
- **The work stays plain.** Body text is the system sans at reading size. Screenshots and figures are framed, never tinted.
- **Each color has one job.** White is the words. Orange is the instrument: frames, labels, links and buttons. Red is the award stamps. Green is what is current (Trent AI). Mint is the Connect tiles.
- **Motion happens on arrival, and at the edges.** Title cards cut in, stamps land, panels' corners power on, the Connect tiles light up in turn. While someone reads, only the hero's clock and the screen behind the pages move, slowly and away from the words; on a case study the screen is light (review, 2026-10-06: the still screen read as random lines). A Motion switch stops everything and is remembered; the reader's reduced-motion setting gets a still page.
- **Not borrowed:** any name, logo or line from the show, its title font (Matisse EB is commercial; Noto Serif Display Black stands in, as in v2.2), its strobing (WCAG 2.3.1), and Japanese. Nothing of Trent's site either: its pictures and words stay with Trent.

## The home page, top to bottom

1. **Bar:** the name (to the top), Work, Experience, Connect, Resume, CV, and the Motion switch. Narrow screens keep the name, Resume and CV; the switch moves to the footer.
2. **Hero:** the title card "IAN / DROSOS" with "Security & AI Designer / Developer" at its foot, the intro paragraph and the four links, and nothing else: the show's cards are type alone. Around it, the instrument frame: corners, rulers, a "Now: Trent AI" lamp and a UTC clock.
3. **Featured Work:** a title card, then one panel per project. Promptly runs the full width; Wrex and FxD side by side; then Trent AI and Microsoft. Each panel has its number and venue on its top rule, the screenshot framed, the name in the card serif, the award as a stamp, the summary, and "Case study" and "Read paper". Trent AI has no case study yet, so a striped board says so where its screenshot will go. The Microsoft panel carries the Microsoft and Excel marks with their light tile cut away, and the Trent AI panel the company's white wordmark, the file the product shows in dark mode: a white box behind a logo read as a light theme.
4. **Education & Experience:** a title card, the summary paragraph, then Education above Experience, each a panel of cells three to a row (dates in orange, the current role lit green), and the CV download. Side by side, the three schools' list stood at half the height of the six roles'.
5. **Connect:** a title card and three tiles (Google Scholar, LinkedIn, GitHub) that light up in turn. A phone stacks them as bars.
6. **Footer:** the copyright and the Motion switch.

Ian's changes from the step 1 review (2026-10-06): the cat photo is off the hero, since it is not Ian's own photo (it stays the browser tab's icon), and X / Twitter is gone from Connect, since Ian is not active there.

## A case study, top to bottom (Promptly, the template)

1. **Bar:** the name with an arrow back home, then the study's sections (Summary, Intro, Formative, Design, Methods, Results, Conclusion) at every width, scrolling sideways on a phone with the one in view lit. A thin orange line along the bar's foot fills as the reader goes down the page.
2. **The opening card:** "CASE STUDY:01", the name filling most of the frame, its line at its foot ("Dynamic Prompt Middleware"), then the venue boxed beside the award's stamp, the page's own introduction, and Read Full Paper. Corner marks and a "Case study / 01 of 03" readout frame it.
3. **The abstract**, in a panel under the card.
4. **Sections:** each opens on a small title card ("SECTION:01", the heading in the card serif), then a reading column held to about 75 characters a line. Subheadings are the card serif in mixed case. Numbered lists carry orange numbers.
5. **Figures:** each in a frame, its number on a strip over it ("FIG. 05 · ENLARGE"), the image as it is, never wider than it was made, and its caption under it. A click or Enter opens it large over the page; without script it opens the image file.
6. **Design goals** as readouts (the goal in the card serif, its key words in orange); **participants' words** on an orange rule with their number under them; **the implications** as numbered panels.
7. **The next study:** "NEXT: WREX →" in the card serif, and All Projects.

## Copy changes, kept small

Everything else is word for word.

- "Learn More" is now "Case study": a link should say where it goes.
- "Best Paper HM" is now "Best Paper Honorable Mention".
- "Trent.AI" is now "Trent AI", the spelling the rest of the page uses.
- Trent AI's "Coming Soon" badge is now the board reading "Case study / Coming soon".
- Date ranges use an en dash ("2017–2022").
- The footer's year is 2026.
- Typos fixed. Promptly: "knowedge" to "knowledge", "This lead to" to "This led to" twice, "workflows ... was seen" to "were seen". Wrex: "This lead to" to "This led to" twice, "inspect the code Python code" to "inspect the Python code". FxD: "FxD's features provides" to "provide", "fit with in" to "fit within".
- Promptly's "Every Day AI" is now "Everyday AI", as on the home page (Ian's call).
- On the case studies, "Abstract:" became its panel's heading, each quote's participant number moved under it, and "DG1:" became the label "Design goal · DG1".
- Names keep their own casing inside capitals: "Trent AI" never shows as "TRENT", and "FxD" never as "FXD".

## Steps

1. **The home page.** Built and reviewed.
2. **Promptly**, as the template the other two case studies follow. Built and reviewed.
3. **Wrex and FxD**, then the clean-up. Built. The clean-up:
   - Images: every picture the pages show is a WebP copy in `images/web/` (11.9 MB of PNGs shown as 2.3 MB). The originals stay where they were, as the full-size files a figure enlarges to.
   - The old stylesheets and scripts are gone, since no page loads them: `variables.css`, `modern.css`, `theme.js`, `animations.js`, `modern.js`.
   - Deleted with Ian's go (review, 2026-10-06): the old résumé copies (`/Ian_Drosos_Resume.pdf.pdf`, `images/resume_iandrosos.pdf` and `.docx`, `images/Ian_Drosos_Resume.docx`, `images/Ian_Drosos_Resume.md`), `index.html.backup`, and the images no page used (`pic01`–`pic06.jpg`, `bg.jpg`, `DProbe.png`, `Design1Annotated.png`, `Design2Annotated.png`, `VideoStudyDiagram.png`, `four-domains-vlhcc.png`, `hfbar.PNG`, `issta.PNG`, `janus.PNG`, `notebookspace.PNG`, `DPM/Promptly1.png`, `images/avatar.png`, `images/avatar.jpg`). Kept: `images/Ian_Drosos_Resume_UXR.pdf`.
   - The browser tab's icon is now an orange "ID" on black with two of the frame's corner marks (`favicon.svg`, with PNG copies for Safari and the iPhone home screen). The cat (`avatar.png` at the root) is no longer used anywhere.
4. **The screen behind the pages** (review, 2026-10-06: the black wanted some visual interest, as v2.2 has behind its pages; then, on the first, still version: it should move, shift with the home page's sections, and stay light on the case studies). Built and reviewed.

## How it is built

- Plain HTML, CSS and one script, no build step and no npm. GitHub Pages serves the files as they are; Jekyll runs but leaves files without front matter alone.
- New files beside the old: `assets/css/console.css` (shared by every page: fonts, colors, type, the bar, the opening card's frame, buttons, panels, stamps, motion), `assets/css/home.css` (the home page's own parts), `assets/css/case.css` (the case studies' own parts), `assets/js/console.js` (the Motion switch, the arrivals, the section marker in the bar, the clock, the reading gauge, enlarged figures).
- Every page loads `console.css`, its own stylesheet (`home.css` or `case.css`) and `console.js`, and nothing else: no Google Fonts, no icon library.
- Images are WebP copies (`images/web/`), at most 2,000px wide, lossless unless a quality-92 copy comes in under 70% of its size. The home page's two cropped screenshots are cut to their panels' 16:10 frame from the top. A figure's link still goes to the original PNG.
- The screen behind the pages is `assets/css/screen.css`, loaded by every page after `console.css`, and one decorative `<div class="screen">` at the top of each page's body, holding its displays. Each section names its display (`data-screen`), and `console.js` sets the screen's `data-show` to the one named by the section crossing the middle of the screen; without the script the markup's first display stays. Its pictures are SVG files in `assets/screen/` (16 KB together), drawn for this site by `_tools/screen-art.py` (plain Python, no packages; run it again and the files come out the same). Everything moves by transform and opacity; the board's cells sit on the honeycomb's own cells by CSS `round()`. The body has no fill of its own now, so the screen shows through; the root's black is the page's.
- The fonts live in `assets/fonts/`, Latin only (15 KB and 21 KB), with their SIL Open Font License files. No request goes to Google.
- The squeeze is a transform: each line is laid out wider by the inverse and squeezed back, so it fills its column, and the section clips the wider box.
- Each title's big line fills its block from its measured width (in ems, measured in Chrome, kept on the card as `--em`), capped by the screen's height so a short screen keeps it whole. A renamed title needs measuring again. The card is held to the capped name's width, so the line at its foot stays under the name.
- A page's opening card (`.plays`) runs on load with no script. Every other arrival waits for the script, which marks the page first, so without script everything simply stands.
- An enlarged figure is a native `<dialog>`: Escape and its Close button shut it, focus goes back to the figure, and the page under it does not scroll.
- Accessibility: one `h1`; every title is real text; frames, rulers, readouts and the clock are hidden from screen readers; stamps are real text; an orange focus ring; a skip link; links that open a new tab say so to screen readers; each figure's link names the figure it enlarges.

## Checks

On a local server, in headless Chrome: widths 320, 390, 768, 1024, 1280, 1440, 1920 and 2560, plus a phone on its side; no sideways scroll; axe; contrast measured against the real pixels under the letters; a keyboard walk; motion on, off and reduced; idle repaints; for the case studies, the enlarged figure by keyboard and by mouse. Firefox and Safari by hand.

**Build log:** [./2026-10-06_console-restyle-BUILDLOG.md](./2026-10-06_console-restyle-BUILDLOG.md).

## Merging

`console-restyle` was merged into `master` and pushed at Ian's go (2026-10-06); GitHub Pages publishes about a minute after a push. Anyone with a link to one of the deleted files now gets GitHub's 404 page.
