# K-Hub Frontend Design & Architecture Guide

This guide documents the frontend design patterns, architectural decisions, and development conventions for the K-Hub website. Follow these guidelines to maintain consistency when building or extending the frontend.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Design System](#design-system)
4. [Component Architecture](#component-architecture)
5. [Styling & Colors](#styling--colors)
6. [Animation & Motion](#animation--motion)
7. [Responsive Design](#responsive-design)
8. [Development Conventions](#development-conventions)
9. [Adding New Features](#adding-new-features)

---

## Tech Stack

**Core Framework:**

- **Next.js 16.2.2** - React framework with SSR capabilities
- **React 19.2.4** - UI library (latest version)
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.38.0** - Animation library for React
- **Next/Image** - Optimized image component

**Development Tools:**

- **ESLint 9** - Code linting
- **PostCSS 4** - CSS processing
- **TypeScript** - Optional type safety

**Configuration:**

- **Node.js** - Runtime environment
- **Port:** 5000 (for development and production)
- **Deployment:** Replit-compatible environment

---

## Project Structure

```
K-hub-web/
├── src/
│   ├── app/
│   │   ├── layout.js           # Root layout with metadata
│   │   ├── page.js             # Home page (main entry)
│   │   └── globals.css         # Global styles & theme definitions
│   ├── components/             # Reusable React components
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── Hero.jsx            # Hero section with cycling words
│   │   ├── About.jsx           # About section with stats
│   │   ├── Domains.jsx         # Deep-tech domains showcase
│   │   ├── Programs.jsx        # Programs/initiatives section
│   │   ├── Impact.jsx          # Impact metrics
│   │   ├── CTA.jsx             # Call-to-action section
│   │   ├── Footer.jsx          # Footer section
│   │   ├── OrbitRing.jsx       # Animated orbit visualization
│   │   └── ScrollResetOnReload.jsx  # Scroll behavior manager
│   └── ...
├── colors/                      # Theme color preview images
├── paradigm_logos/              # Brand asset logos
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind configuration
├── next.config.mjs              # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── eslint.config.mjs            # ESLint rules
└── globals.css                  # Theme variables & root styles
```

---

## Design System

### Color Palette Architecture

The K-Hub frontend uses a **Material Design 3-inspired color system** with **10 dynamic themes** that users can cycle through. All colors are stored as CSS variables and can be toggled at runtime.

#### Core Color Tokens (Semantic)

```css
--color-surface              /* Primary background */
--color-surface-container-low    /* Secondary background */
--color-surface-container-lowest  /* Tertiary/card background */
--color-surface-container-high   /* Accent background */
--color-on-surface           /* Primary text color */
--color-on-surface-variant   /* Secondary text color */
--color-primary              /* Brand primary color */
--color-primary-container    /* Primary accent/button */
--color-tertiary             /* Tertiary accent */
--color-outline-variant      /* Borders & dividers */

/* RGB variants (for opacity) */
--color-primary-rgb          /* RGB version of primary */
--color-primary-container-rgb  /* RGB version of container */

/* Hero CTA Gradient */
--hero-cta-from              /* Gradient start color */
--hero-cta-to                /* Gradient end color */
--hero-secondary-bg          /* Secondary button background */
--hero-secondary-bg-hover    /* Secondary button hover state */
--hero-secondary-text        /* Secondary button text */
```

#### Available Themes (10 Total)

Each theme is activated by setting `data-theme` attribute on the HTML root:

```javascript
// Theme mapping stored in Hero.jsx
const THEMES = [
  "theme-1", // Ocean Breeze
  "theme-2", // Sunset Warmth
  "theme-3", // Oceanic Cactus Pop
  "theme-4", // Pastel Dream
  "theme-5", // ... (8 total themes in globals.css)
  // ... up to theme-10
];
```

**Theme Persistence:** Themes are saved in localStorage with key `khub-theme-index`.

#### Adding a New Theme

1. Define theme variables in `globals.css` under `html[data-theme="theme-X"]` selector:

```css
html[data-theme="theme-11"] {
  /* Theme 11: Your Theme Name */
  --color-surface: #YourColor;
  --color-surface-container-low: #YourColor;
  /* ... all other color tokens ... */
}
```

2. Update the `THEMES` array in `src/components/Hero.jsx` to include your new theme.

3. Add a theme preview image to `colors/` folder for reference.

---

## Component Architecture

### Component Patterns

#### 1. **Client Components** (with "use client")

Most interactive components use the `"use client"` directive:

```jsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MyComponent() {
  const [state, setState] = useState(false);

  useEffect(() => {
    // Side effects here
  }, []);

  return <motion.div>{/* Component JSX */}</motion.div>;
}
```

**When to use "use client":**

- Components with interactivity (clicks, forms, etc.)
- Components using React hooks (useState, useEffect, etc.)
- Components using Framer Motion animations
- Components with event handlers

#### 2. **Server Components** (no "use client")

Used only for static layout/metadata:

```jsx
// src/app/layout.js - Server component
import { Inter } from "next/font/google";

export const metadata = {
  title: "K-Hub | Deep-Tech Innovation",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

#### 3. **Section Components**

Each major page section has its own component with consistent structure:

- **ID anchors** for navigation: `id="about"`, `id="domains"`, etc.
- **Padding structure:** `py-20 md:py-28` (vertical), `px-6 sm:px-8 md:px-10 lg:px-12` (horizontal)
- **Max-width container:** `max-w-6xl mx-auto`
- **Background color from tokens:** `bg-surface` or `bg-surface-container-low`

```jsx
export default function SectionComponent() {
  return (
    <section id="section-id" className="py-20 md:py-28 bg-surface">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        {/* Content */}
      </div>
    </section>
  );
}
```

---

## Styling & Colors

### Tailwind CSS Configuration

The project uses **Tailwind CSS 4** with custom color tokens:

```typescript
// tailwind.config.ts
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#fcf9f4",
        "surface-container-low": "#f6f3ee",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#ebe8e3",
        "on-surface": "#1c1c19",
        "on-surface-variant": "#4d5555",
        primary: "#006c51",
        "primary-container": "#33c096",
        tertiary: "#4d6264",
        "outline-variant": "#bbcac2",
      },
    },
  },
};
```

### CSS Variable Usage

CSS variables (defined in `globals.css`) are the **primary** way to apply dynamic theme colors:

```jsx
// In globals.css
@theme inline {
  --color-surface: var(--color-surface);
  --color-primary: var(--color-primary);
  --font-display: var(--font-inter), system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
}
```

**In components, use inline styles or Tailwind for CSS variable application:**

```jsx
// Using inline styles with CSS variables
<div style={{ backgroundColor: 'var(--color-surface)' }}>
  {/* Content */}
</div>

// Using Tailwind with pre-defined colors
<div className="bg-surface">
  {/* Content */}
</div>
```

### Responsive Design Utilities

**Breakpoints used:**

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

**Responsive Typography with `clamp()`:**

```jsx
className = "text-[clamp(1.8rem,4.5vw,3rem)]";
// min: 1.8rem, preferred: 4.5vw, max: 3rem
```

### Typography

- **Font:** Inter (from Google Fonts)
- **Font variable:** `--font-inter` (set in layout.js)
- **Weight:** 400 (regular), 600 (semibold), 700 (bold)
- **Letter spacing:** Use `tracking-tight` for headings, `tracking-tight` for body

```jsx
// Heading styles
className =
  "font-display text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] tracking-tight text-on-surface";

// Body text
className =
  "text-[0.875rem] leading-relaxed tracking-tight text-on-surface-variant";

// Label/Badge
className =
  "text-[0.75rem] font-semibold tracking-[0.15em] uppercase text-primary";
```

---

## Animation & Motion

### Framer Motion Setup

All animations use **Framer Motion** with consistent easing functions:

```jsx
import { motion, AnimatePresence } from "framer-motion";
```

### Standard Easing Function

**K-Hub uses a custom easing curve for consistency:**

```javascript
// Standard easing for K-Hub animations
ease: [0.22, 1, 0.36, 1]; // Smooth, natural motion
```

### Common Animation Patterns

#### 1. **Fade Up Animation** (most common)

```javascript
const fadeUp = {
  hidden: { opacity: 0, y: 20 }, // or y: 24 for larger movements
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Usage
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-60px" }}
>
  {/* Content */}
</motion.div>;
```

#### 2. **Staggered Container Animation**

```javascript
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12, // Delay between children
      delayChildren: 0.3, // Initial delay
    },
  },
};

// Apply to parent, children use fadeUp variant
<motion.div variants={container} initial="hidden" animate="show">
  {/* Children automatically animate with stagger */}
</motion.div>;
```

#### 3. **Hover Effects**

```jsx
<motion.button
  whileHover={{ y: -2, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
>
  Hover Me
</motion.button>
```

#### 4. **Continuous Animation** (Navbar shimmer)

```jsx
<motion.div
  animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
  style={{
    background: "linear-gradient(115deg, ...)",
    backgroundSize: "220% 100%",
  }}
/>
```

### Animation Guidelines

- **Duration:** 0.6s for most animations, 0.2s for micro-interactions
- **Delay:** Use `delayChildren` for staggered effects
- **Viewport:** Use `whileInView` for section animations with `{ once: true, margin: "-60px" }`
- **Performance:** Use `transform` and `opacity` for GPU acceleration
- **Easing:** Always use `[0.22, 1, 0.36, 1]` unless specified otherwise

---

## Responsive Design

### Mobile-First Approach

Build mobile layouts first, then enhance with Tailwind breakpoints:

```jsx
// Small screens: 100% width, large padding
className = "px-6 sm:px-8 md:px-10 lg:px-12";

// Small screens: stacked, large screens: grid
className = "grid md:grid-cols-2 gap-8 md:gap-12";

// Small screens: hidden, large screens: visible
className = "hidden md:block";

// Responsive text size
className = "text-lg md:text-2xl lg:text-4xl";
```

### Viewport Height Considerations

Use `dvh` (dynamic viewport height) instead of `vh` for better mobile support:

```jsx
className = "min-h-[100dvh]"; // Instead of min-h-screen
```

### Common Responsive Patterns

**Hero section:**

```jsx
className = "flex flex-col lg:flex-row items-center gap-8 lg:gap-4";
```

**Grid layout (About section):**

```jsx
className = "grid md:grid-cols-2 gap-20 md:gap-28 items-center";
```

**Container with max-width:**

```jsx
className = "max-w-7xl mx-auto px-6 sm:px-10 lg:px-14";
```

---

## Development Conventions

### File Naming

- **Components:** PascalCase (e.g., `Navbar.jsx`, `HeroSection.jsx`)
- **Utilities/Hooks:** camelCase (e.g., `useScrollPosition.js`)
- **CSS classes:** kebab-case (Tailwind default)

### Import Organization

```jsx
// 1. External imports (React, Next.js, third-party)
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

// 2. Internal imports (components, utilities)
import OrbitRing from "./OrbitRing";
import { AnimationVariants } from "@/utils/animations";

// 3. Styles (if CSS modules)
import styles from "./Component.module.css";
```

### Component Structure Template

```jsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Constants
const ANIMATION_VARIANTS = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
};

const DATA = [
  { id: 1, label: "Item 1" },
  // ...
];

// Component
export default function ComponentName() {
  const [state, setState] = useState(false);

  useEffect(() => {
    // Side effects
  }, []);

  const handleEvent = () => {
    // Event handlers
  };

  return (
    <section id="component-id" className="py-20 md:py-28 bg-surface">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10">
        <motion.div
          variants={ANIMATION_VARIANTS.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Content */}
        </motion.div>
      </div>
    </section>
  );
}
```

### Common Patterns to Follow

1. **Smooth Scroll Navigation:**

```jsx
const handleLinkClick = (e, href) => {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
```

2. **Window Event Listeners:**

```jsx
useEffect(() => {
  const handleScroll = () => {
    /* ... */
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

3. **localStorage Theme Persistence:**

```jsx
// Load theme from localStorage
useEffect(() => {
  const saved = window.localStorage.getItem("khub-theme-index");
  if (saved) setThemeIndex(Number(saved));
}, []);

// Save theme to localStorage
useEffect(() => {
  document.documentElement.setAttribute("data-theme", THEMES[themeIndex]);
  window.localStorage.setItem("khub-theme-index", String(themeIndex));
}, [themeIndex]);
```

---

## Adding New Features

### Adding a New Section

1. **Create a new component** in `src/components/NewSection.jsx`:

```jsx
"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function NewSection() {
  return (
    <section id="new-section" className="py-20 md:py-28 bg-surface">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="font-display text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.1] text-on-surface"
        >
          New Section Title
        </motion.h2>
        {/* Additional content */}
      </div>
    </section>
  );
}
```

2. **Add to navigation** (if needed in Navbar):

```jsx
const navLinks = [
  { label: "New Section", href: "#new-section" },
  // ... existing links
];
```

3. **Import in `src/app/page.js`:**

```jsx
import NewSection from "@/components/NewSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <NewSection /> {/* Add here */}
        <Footer />
      </main>
    </>
  );
}
```

### Adding a New Color to Tailwind

1. Update `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      'new-color': '#hexvalue',
    },
  },
},
```

2. Use in components:

```jsx
className = "bg-new-color text-new-color";
```

### Adding a New Animation

1. Define in component or create utility file:

```javascript
const slideInFromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
```

2. Use with Framer Motion:

```jsx
<motion.div
  variants={slideInFromLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {/* Content */}
</motion.div>
```

---

## Performance Optimization Tips

1. **Use `whileInView`** for animations instead of `animate` to prevent off-screen animations
2. **Use CSS variables** for theme colors (faster than JS color changes)
3. **Optimize images** with Next.js Image component
4. **Use `transform` and `opacity`** in animations for GPU acceleration
5. **Lazy load components** with dynamic imports if necessary
6. **Keep animation durations reasonable** (0.4-0.8s for most animations)

---

## Browser Support & Compatibility

- **Modern browsers:** Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile:** iOS Safari 12+, Chrome Android
- **CSS Grid & Flexbox:** Full support
- **CSS Variables:** Full support
- **CSS Backdrop Filter:** Supported in all modern browsers

---

## Common Issues & Solutions

### Issue: Theme not persisting on reload

**Solution:** Ensure localStorage is being used in `useEffect` with proper initial state:

```jsx
useEffect(() => {
  const saved = window.localStorage.getItem("khub-theme-index");
  if (saved) setThemeIndex(Number(saved));
}, []);
```

### Issue: Animations not triggering on mobile

**Solution:** Use `whileInView` instead of `animate`, and ensure viewport margin:

```jsx
whileInView="visible"
viewport={{ once: true, margin: "-60px" }}
```

### Issue: Colors not updating with theme change

**Solution:** Use CSS variables that are defined in the theme:

```jsx
style={{ backgroundColor: 'var(--color-surface)' }}
// OR
className="bg-surface"  // Uses Tailwind color token
```

---

## Deployment Checklist

- [ ] All components use consistent spacing and padding
- [ ] All animations use the standard easing function
- [ ] Colors use CSS variables or Tailwind color tokens
- [ ] Mobile responsive design tested on multiple devices
- [ ] All images optimized with Next/Image component
- [ ] Navigation links have correct anchor IDs
- [ ] Theme switching works and persists
- [ ] ESLint passes without errors
- [ ] Build completes successfully (`npm run build`)

---

**Last Updated:** 2026-04-21  
**Maintained By:** K-Hub Development Team  
**Next Review:** 2026-06-21
