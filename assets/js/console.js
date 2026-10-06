/*
 * The console's script, shared by every page: the Motion switch, the
 * arrivals, the section marker in the bar, the hero's clock, and on the
 * case studies the reading gauge and enlarged figures. Plan:
 * _plans/2026-10-06_console-restyle.md.
 *
 * Everything here is an extra. Without it the page reads in full: nothing
 * waits to arrive, and the clock and the switch stay hidden. A stored
 * "motion off" is applied by a line in each page's <head>, before the first
 * paint, so a reader who turned it off never sees anything cut in.
 */
(() => {
  "use strict";

  const root = document.documentElement;
  /* Where the reader's choice is kept: a display preference, nothing more. */
  const MOTION_KEY = "iandrosos.motion";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const switchedOn = () => root.getAttribute("data-motion") !== "off";
  const moving = () => switchedOn() && !reduced.matches;

  /* ── Seven-segment digits ────────────────────────────────────────────── */

  /* Readout digits drawn as segments, the way the show's clocks are:
     slanted, every unlit segment a faint ghost. Shapes, not a font. Which
     segments light: a top, b upper right, c lower right, d bottom, e lower
     left, f upper left, g middle. */
  const SEGMENTS = {
    0: "abcdef",
    1: "bc",
    2: "abdeg",
    3: "abcdg",
    4: "bcfg",
    5: "acdfg",
    6: "acdefg",
    7: "abc",
    8: "abcdefg",
    9: "abcdfg",
    "-": "g",
    " ": "",
  };
  /* A digit's box, a segment's thickness, the gap between two tips, a
     digit's advance, a colon's or point's width, and the lean. */
  const W = 36;
  const H = 64;
  const STROKE = 7;
  const GAP = 1.5;
  const ADVANCE = 46;
  const SEPARATOR = 18;
  const SLANT = 7;
  const LEAN = H * Math.tan((SLANT * Math.PI) / 180);

  const polygon = (points) => points.map(([x, y]) => `${x},${y}`).join(" ");
  const flat = (y, x0, x1) => {
    const h = STROKE / 2;
    return polygon([
      [x0, y],
      [x0 + h, y - h],
      [x1 - h, y - h],
      [x1, y],
      [x1 - h, y + h],
      [x0 + h, y + h],
    ]);
  };
  const standing = (x, y0, y1) => {
    const h = STROKE / 2;
    return polygon([
      [x, y0],
      [x + h, y0 + h],
      [x + h, y1 - h],
      [x, y1],
      [x - h, y1 - h],
      [x - h, y0 + h],
    ]);
  };
  const LEFT = STROKE / 2;
  const RIGHT = W - STROKE / 2;
  const TOP = STROKE / 2;
  const MIDDLE = H / 2;
  const BOTTOM = H - STROKE / 2;
  const SHAPES = {
    a: flat(TOP, LEFT + GAP, RIGHT - GAP),
    b: standing(RIGHT, TOP + GAP, MIDDLE - GAP),
    c: standing(RIGHT, MIDDLE + GAP, BOTTOM - GAP),
    d: flat(BOTTOM, LEFT + GAP, RIGHT - GAP),
    e: standing(LEFT, MIDDLE + GAP, BOTTOM - GAP),
    f: standing(LEFT, TOP + GAP, MIDDLE - GAP),
    g: flat(MIDDLE, LEFT + GAP, RIGHT - GAP),
  };
  const isSeparator = (char) => char === ":" || char === ".";

  /* One character, slanted about its own foot. */
  const glyph = (char) => {
    if (isSeparator(char)) {
      const dots = char === ":" ? [H * 0.3, H * 0.7] : [BOTTOM];
      return `<g transform="skewX(${-SLANT})">${dots
        .map(
          (y) =>
            `<rect x="${SEPARATOR / 2 - STROKE / 2}" y="${y - STROKE / 2}" width="${STROKE}" height="${STROKE}" class="seg-on"/>`,
        )
        .join("")}</g>`;
    }
    const lit = SEGMENTS[char] ?? "";
    return `<g transform="skewX(${-SLANT})">${Object.entries(SHAPES)
      .map(
        ([name, points]) =>
          `<polygon points="${points}" class="${lit.includes(name) ? "seg-on" : "seg-off"}"/>`,
      )
      .join("")}</g>`;
  };

  /* A readout: digits, colons and points, left to right. */
  const readout = (value) => {
    const chars = [...value];
    let x = 0;
    const placed = chars.map((char) => {
      const at = x;
      x += isSeparator(char) ? SEPARATOR : ADVANCE;
      return `<g transform="translate(${at} 0)">${glyph(char)}</g>`;
    });
    // The last digit needs no space after it.
    const last = chars[chars.length - 1];
    const width = chars.length && !isSeparator(last) ? x - (ADVANCE - W) : x;
    return `<svg viewBox="${-LEAN} 0 ${width + LEAN} ${H}" aria-hidden="true" focusable="false">${placed.join("")}</svg>`;
  };

  /* The digits 0 to 9 stacked, for a digit that runs: the stylesheet slides
     the strip behind a one-digit window, so it moves by transform. */
  const strip = () =>
    `<svg viewBox="${-LEAN} 0 ${W + LEAN} ${H * 10}" aria-hidden="true" focusable="false">${[
      ..."0123456789",
    ]
      .map(
        (char, i) => `<g transform="translate(0 ${i * H})">${glyph(char)}</g>`,
      )
      .join("")}</svg>`;

  /* ── The clock ───────────────────────────────────────────────────────── */

  /* The hero's UTC clock: the seconds set on each second, the hundredths
     running on their strips. It runs only while it is on screen and the
     page may move; stopped, it reads dashes, as an idle instrument does. */
  const startClock = (el) => {
    if (!el) return () => {};
    const digits = el.querySelector(".clock-digits");
    for (const roll of el.querySelectorAll(".roll")) roll.innerHTML = strip();
    let timer = 0;
    let onScreen = true;
    const show = (value) => {
      digits.innerHTML = readout(value);
    };
    const tick = () => {
      show(`${new Date().toISOString().slice(11, 19)}.`);
      timer = window.setTimeout(tick, 1000 - (Date.now() % 1000));
    };
    const sync = () => {
      window.clearTimeout(timer);
      timer = 0;
      if (!moving()) {
        show("--:--:--.");
        el.removeAttribute("data-running");
      } else if (onScreen) {
        tick();
        el.setAttribute("data-running", "");
      } else {
        el.removeAttribute("data-running");
      }
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        onScreen = entries[entries.length - 1].isIntersecting;
        sync();
      }).observe(el);
    }
    reduced.addEventListener("change", sync);
    sync();
    return sync;
  };

  const syncClock = startClock(document.querySelector("[data-clock]"));

  /* ── The Motion switch ───────────────────────────────────────────────── */

  /* WCAG 2.2.2 asks for a way to stop what moves on its own. The bar
     carries one on a wide screen and the footer always does; both read the
     same attribute, so they never disagree. */
  const switches = [...document.querySelectorAll("[data-motion-switch]")];
  const render = () => {
    const on = switchedOn();
    for (const control of switches) {
      control.setAttribute("aria-checked", String(on));
      const state = control.querySelector(".motion-state");
      if (state) state.textContent = on ? "On" : "Off";
    }
  };
  for (const control of switches) {
    control.addEventListener("click", () => {
      const next = !switchedOn();
      root.setAttribute("data-motion", next ? "on" : "off");
      try {
        localStorage.setItem(MOTION_KEY, next ? "on" : "off");
      } catch {
        // Storage refused (a private window): the choice holds for this visit.
      }
      render();
      syncClock();
    });
  }
  render();

  /* ── Arrivals ────────────────────────────────────────────────────────── */

  /* Each title card, panel and the tiles play once, in full, as they come
     into view (`.enter`, console.css). Only once this has marked the page
     `data-armed` do they wait to arrive. Under reduced motion nothing is
     armed: everything simply stands. */
  if (!reduced.matches && "IntersectionObserver" in window) {
    const arrivals = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-entered", "");
          arrivals.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const el of document.querySelectorAll(".enter")) arrivals.observe(el);
    root.setAttribute("data-armed", "");
  }

  /* ── The section marker ──────────────────────────────────────────────── */

  /* The bar marks the section that crosses the middle of the screen. A case
     study's bar scrolls sideways on a narrow screen, so it brings the marked
     link into view (sideways only: the page itself stays put). */
  const links = [...document.querySelectorAll('.bar-nav a[href^="#"]')];
  const sections = links
    .map((link) => document.getElementById(link.getAttribute("href").slice(1)))
    .filter(Boolean);
  const reveal = (link) => {
    const nav = link.parentElement;
    if (nav.scrollWidth <= nav.clientWidth) return;
    const box = nav.getBoundingClientRect();
    const at = link.getBoundingClientRect();
    if (at.left < box.left || at.right > box.right - 24) {
      nav.scrollBy({ left: at.left - box.left - 16 });
    }
  };
  if (sections.length && "IntersectionObserver" in window) {
    const crossing = new Map();
    const marker = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          crossing.set(entry.target.id, entry.isIntersecting);
        const current = sections.find((section) => crossing.get(section.id));
        for (const link of links) {
          if (current && link.getAttribute("href") === `#${current.id}`) {
            if (!link.hasAttribute("aria-current")) {
              link.setAttribute("aria-current", "location");
              reveal(link);
            }
          } else {
            link.removeAttribute("aria-current");
          }
        }
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    for (const section of sections) marker.observe(section);
  }

  /* ── How far down the page ───────────────────────────────────────────── */

  /* A case study's bar carries a thin line that fills as the reader goes
     down the page: an instrument's gauge, tied to the scroll, so it moves
     only when the reader does. */
  const gauge = document.querySelector(".bar-progress");
  if (gauge) {
    let queued = false;
    const measure = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const done = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      gauge.style.transform = `scaleX(${done})`;
    };
    const queue = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    measure();
  }

  /* ── Figures, enlarged ───────────────────────────────────────────────── */

  /* Each figure is a link to its image file, so without this script it
     still opens full size. With it, the image opens in a dialog over the
     page instead: Escape, the Close button or a click outside the image
     closes it, and focus returns to the figure. A click that asks for a new
     tab or window still gets one. */
  const zoom = document.querySelector("dialog.zoom");
  if (zoom && typeof zoom.showModal === "function") {
    const shown = zoom.querySelector("img");
    for (const link of document.querySelectorAll("[data-zoom]")) {
      link.addEventListener("click", (event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        shown.src = link.href;
        shown.alt = link.querySelector("img")?.alt ?? "";
        zoom.showModal();
      });
    }
    zoom.addEventListener("click", (event) => {
      if (
        event.target === zoom ||
        event.target.classList.contains("zoom-stage")
      )
        zoom.close();
    });
    zoom.addEventListener("close", () => shown.removeAttribute("src"));
  }

  root.setAttribute("data-ready", "");
})();
