# K-Hub Website Redesign – AI Prompt

> Reference website: [https://khub-silk.vercel.app/](https://khub-silk.vercel.app/)
> This prompt describes all the UI/UX changes required. Do NOT rewrite the entire codebase from scratch — make targeted, surgical changes to the existing code only.

---

## 1. HERO SECTION (Home Page) – Full Redesign

### 1.1 Full-Screen Background Image
- The background image in the hero section must fill the **entire viewport** — `width: 100vw; height: 100vh` — with `object-fit: cover` and `object-position: center`.
- Apply a **dark overlay** on top of the image: a semi-transparent black gradient layer (e.g. `linear-gradient(to right, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.35) 100%)`). This overlay must be strong enough on the left side so that all text is clearly legible against the image, while still allowing the image to show through on the right.

### 1.2 Remove Paragraph Text
- **Remove** the following paragraph completely from the hero section:
  > "K-Hub is the deep-tech incubator of KMIT Group of Institutions, empowering students to work on cutting-edge applied research in drug discovery, cybersecurity, robotics, and beyond."
- Do not replace it with any other paragraph. The hero section should have only the heading and the animated/moving text described below.

### 1.3 Animated Moving Text ("Building the Future Through...")
- Keep the existing animated/marquee/typewriter moving text: **"Building the Future Through Deep Tech"** (or whatever the current animation is).
- **Relocate** it to the **bottom-left** of the hero section — position it absolutely or use flexbox so it sits near the lower-left corner of the viewport, slightly above the very bottom edge (e.g. `bottom: 2.5rem; left: 3rem`).
- Do **not** change how the animation works — only change its position.

### 1.4 Hero Carousel
- Convert the hero section into a **multi-slide carousel** (full-screen, one slide at a time).
- Each slide should be a full-viewport-height panel with its own background image (you can reuse the same hero image or use the paradigm logos/visuals already available in the project — e.g. `/logo-drugparadigm.webp`, `/logo-cyberparadigm.webp`, etc. — as slide backgrounds or accent visuals).
- Suggested slide count: **3 to 5 slides**. Slides can represent: (1) K-Hub overview, (2) Research & Innovation, (3) Student Venture Studio, (4) Campus Ecosystem — use relevant imagery or color themes per slide.
- **Navigation controls required:**
  - Left `‹` and Right `›` arrow buttons positioned at the vertical center of the hero, on the left and right edges respectively.
  - Dot indicators at the bottom-center of the hero showing the current slide.
  - Auto-advance every **6 seconds**; reset the timer on manual navigation.
- Each slide must contain: a bold heading, a short (1-line) subheading or tag, and the two CTA buttons ("Explore Our Work" and "Learn More") — consistent across slides or customized per slide.
- The dark image overlay rule from 1.1 applies to every slide.
- The animated moving text (1.3) must remain visible on **all slides**, fixed to the bottom-left of the hero.

---

## 2. DOMAINS SECTION – Orbiting Component Relocation + Carousel Cards

### 2.1 Layout: Two-Column Split
- Change the Domains section layout to a **two-column side-by-side layout**:
  - **Left column (~45% width):** The existing orbiting/sphere component (currently centered on the domains page). Move it here. Its internal behavior (orbiting animation, sphere interactions, clicking on a domain node) must remain **completely unchanged** — only its position changes.
  - **Right column (~55% width):** The domain cards carousel (described in 2.2 below).
- On mobile/tablet, stack them vertically: orbiting component on top, cards below.

### 2.2 Domain Cards as a Carousel (Right Side)
- The existing domain cards (Drugparadigm, Cyberparadigm, Roboparadigm, Neuroparadigm, Neutraparadigm, Crystalparadigm) must now appear as a **carousel** on the right column.
- **One card is visible at a time** in the carousel (full-width of the right column).
- Each card should display: the paradigm logo, name, one-line tagline, and description — exactly as the current cards show.
- **Interaction – Click on orbiting sphere node:** When the user clicks on a domain node in the orbiting component (left side), the carousel on the right must **jump to the corresponding domain card** immediately (no auto-scroll delay, instant transition).
- **Auto-advance:** The carousel auto-advances to the next card every **5 seconds** automatically. Clicking a sphere node resets this timer.
- **Navigation controls required on the carousel:**
  - Left `‹` and Right `›` arrow buttons on the card carousel.
  - Dot indicators below the card showing which domain card is active (6 dots total, one per paradigm).
  - The currently active dot should also visually correspond to / highlight the matching node in the orbiting component if possible (optional but preferred).
- Transition between cards: smooth slide or fade animation (300–400ms).

---

## 3. GENERAL PROFESSIONAL POLISH

### 3.1 Navbar
- Keep the existing navbar. Ensure it remains visible and readable over the dark hero carousel (use a subtle top gradient or frosted glass effect if needed).

### 3.2 Section Transitions
- Add smooth scroll behavior between sections.
- Ensure the Domains section has a clear section title ("Paradigms" or "Our Domains") still visible above the two-column layout.

### 3.3 Responsiveness
- All carousel controls (arrows, dots) must be touch-friendly on mobile (min tap area 44×44px).
- On mobile, the hero carousel arrows can be smaller and positioned closer to center.
- The domain cards carousel must be fully functional on mobile (swipe gesture support is a bonus if using a carousel library).

### 3.4 Accessibility
- Arrow buttons must have `aria-label` attributes: "Previous slide", "Next slide", "Previous domain", "Next domain".
- Pause auto-advance when the user hovers over the carousel (desktop).

---

## 4. WHAT TO KEEP UNCHANGED

- The **About Us** section layout, content, and animations — no changes.
- The **Programs** section — no changes.
- The **Newsletter** section — no changes.
- The **Footer** — no changes.
- The **Navbar** links and routing — no changes.
- The **orbiting component's internal logic** — only relocate it, do not touch its animation or click behavior.
- All existing color themes, fonts, and design tokens.

---

## 5. SUMMARY CHECKLIST FOR AI

| Task | Area | Done? |
|---|---|---|
| Hero image fills full viewport (100vw × 100vh) | Hero | ☐ |
| Dark overlay on hero image (left-heavy gradient) | Hero | ☐ |
| Remove incubator description paragraph | Hero | ☐ |
| Move animated text to bottom-left of hero | Hero | ☐ |
| Hero converted to multi-slide carousel (3–5 slides) | Hero | ☐ |
| Hero carousel: left/right arrows + dot indicators | Hero | ☐ |
| Hero carousel: auto-advance every 6s | Hero | ☐ |
| Domains section: two-column layout | Domains | ☐ |
| Orbiting component relocated to left column | Domains | ☐ |
| Domain cards shown as carousel on right column | Domains | ☐ |
| Click on orbiting node → jump to matching card | Domains | ☐ |
| Domain cards auto-advance every 5s | Domains | ☐ |
| Domain carousel: left/right arrows + dot indicators | Domains | ☐ |
| Mobile responsive layout for all changes | Global | ☐ |
| Accessibility: aria-labels on all buttons | Global | ☐ |
