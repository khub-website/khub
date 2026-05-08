# K-Hub Gallery — Complete Implementation Spec
> Give this entire document to an AI coding assistant. It contains everything needed to rebuild the gallery from scratch with a cinematic connecting thread, scroll animations, and all visual improvements.

---

## PROJECT CONTEXT

**Framework:** Next.js 14 (App Router), Tailwind CSS  
**Current page:** `/gallery` route  
**What exists:** 9 gallery cards in a zigzag layout, each with an image, label, title, description, and a duplicate reflection `<img>` tag. A connecting SVG thread line exists but is broken — it renders inconsistently and does not reach all cards.  
**Goal:** Make the gallery feel cinematic and alive. The thread line is the signature feature.

---

## PART 1 — FILE STRUCTURE

Create or modify these files:

```
app/
  gallery/
    page.tsx                    ← main page (already exists, modify)
components/
  gallery/
    GallerySection.tsx          ← new: wrapper with thread
    GalleryCard.tsx             ← new: single card component
    ThreadLine.tsx              ← new: SVG thread component
    GlowDot.tsx                 ← new: animated dot that travels the thread
    Lightbox.tsx                ← new: fullscreen viewer
hooks/
  useThreadPath.ts              ← new: calculates SVG path from DOM
  useScrollProgress.ts          ← new: scroll position 0–1
  useIntersection.ts            ← new: IntersectionObserver helper
```

---

## PART 2 — DATA

The gallery has exactly 9 cards. Each card alternates: odd index (0,2,4,6,8) = image on LEFT, text on RIGHT. Even index (1,3,5,7) = image on RIGHT, text on LEFT.

```ts
// data/gallery.ts
export const GALLERY_ITEMS = [
  { id: 1, label: "KHUB GALLERY 01", title: "All-Hands Energy",    desc: "Builders syncing ideas at full speed.",        src: "/gallery/1.jpg" },
  { id: 2, label: "KHUB GALLERY 02", title: "Experiment Table",    desc: "Sketches, screens, and rapid prototypes.",     src: "/gallery/2.jpg" },
  { id: 3, label: "KHUB GALLERY 03", title: "Afterhours Build",    desc: "Late-night focus where momentum compounds.",   src: "/gallery/3.jpg" },
  { id: 4, label: "KHUB GALLERY 04", title: "Studio Session",      desc: "Concepts shaped into product stories.",        src: "/gallery/4.jpg" },
  { id: 5, label: "KHUB GALLERY 05", title: "Mentor Rounds",       desc: "Feedback loops powering sharper execution.",   src: "/gallery/5.jpg" },
  { id: 6, label: "KHUB GALLERY 06", title: "Demo Prep",           desc: "Polishing details before launch day.",         src: "/gallery/6.jpg" },
  { id: 7, label: "KHUB GALLERY 07", title: "Creative Debrief",    desc: "Insights pinned and shared in real-time.",     src: "/gallery/7.jpg" },
  { id: 8, label: "KHUB GALLERY 08", title: "Launch Window",       desc: "A final check before pushing live.",           src: "/gallery/8.jpg" },
  { id: 9, label: "KHUB GALLERY 09", title: "Founder Pulse",       desc: "A moment captured from the core team.",        src: "/gallery/9.avif"},
]
```

---

## PART 3 — THE CONNECTING THREAD (Most Important Feature)

### 3.1 — What the thread is

A single continuous SVG `<path>` element that snakes through the entire gallery section, entering from the top-center, zigzagging left and right to "pin" each card, and exiting at the bottom-center. It draws itself progressively as the user scrolls down the page.

### 3.2 — Where exactly the thread connects to each card

**This is critical.** The thread does NOT connect to the center or corner of the card. It connects to a **specific pin point** on the top-center edge of each image wrapper div.

- For **left-side images** (index 0,2,4,6,8): the anchor is the **top-center** of the image div.  
- For **right-side images** (index 1,3,5,7): the anchor is also the **top-center** of the image div.

The thread arrives at the top of the image, passes through the pin (a small circular SVG tack illustration), then exits toward the next card. This means the path goes: top of page → down and left to card 1's pin → curves right → down and right to card 2's pin → curves left → and so on until the bottom of the page.

### 3.3 — How to calculate the path (useThreadPath.ts)

```ts
// hooks/useThreadPath.ts
'use client'
import { useEffect, useState, RefObject } from 'react'

export interface AnchorPoint {
  x: number
  y: number
}

export function useThreadPath(
  containerRef: RefObject<HTMLElement>,
  pinRefs: RefObject<(HTMLElement | null)[]>
): string {
  const [pathD, setPathD] = useState('')

  useEffect(() => {
    function recalculate() {
      const container = containerRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const scrollTop = window.scrollY

      // Get the absolute Y position of container top relative to document
      const containerTop = containerRect.top + scrollTop
      const containerLeft = containerRect.left

      // Collect anchor points for each pin
      const anchors: AnchorPoint[] = []

      pinRefs.current?.forEach((pin) => {
        if (!pin) return
        const pinRect = pin.getBoundingClientRect()
        anchors.push({
          // X: center of the pin element, relative to container left
          x: pinRect.left + pinRect.width / 2 - containerLeft,
          // Y: center of the pin element, relative to container top (accounting for scroll)
          y: pinRect.top + scrollTop + pinRect.height / 2 - containerTop,
        })
      })

      if (anchors.length < 2) return

      const containerWidth = containerRect.width
      const containerHeight = container.scrollHeight

      // Start: top-center of section
      const start = { x: containerWidth / 2, y: -40 }
      // End: bottom-center of section
      const end = { x: containerWidth / 2, y: containerHeight + 40 }

      // Build the path
      let d = `M ${start.x} ${start.y} `

      // Curve from start to first anchor
      const cp1y = (start.y + anchors[0].y) / 2
      d += `C ${start.x} ${cp1y}, ${anchors[0].x} ${cp1y}, ${anchors[0].x} ${anchors[0].y} `

      // S-curves between each anchor
      for (let i = 0; i < anchors.length - 1; i++) {
        const a = anchors[i]
        const b = anchors[i + 1]
        const midY = (a.y + b.y) / 2
        // Control points pull toward the center to create the S-shape
        const cpOffset = Math.abs(b.x - a.x) * 0.5
        const cp1x = a.x + (b.x > a.x ? cpOffset : -cpOffset)
        const cp2x = b.x + (a.x > b.x ? cpOffset : -cpOffset)
        d += `C ${cp1x} ${midY}, ${cp2x} ${midY}, ${b.x} ${b.y} `
      }

      // Curve from last anchor to end
      const lastAnchor = anchors[anchors.length - 1]
      const cpLastY = (lastAnchor.y + end.y) / 2
      d += `C ${lastAnchor.x} ${cpLastY}, ${end.x} ${cpLastY}, ${end.x} ${end.y}`

      setPathD(d)
    }

    // Recalculate on mount and on resize
    recalculate()

    // Use ResizeObserver for more reliable recalculation than window resize
    const ro = new ResizeObserver(recalculate)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', recalculate)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', recalculate)
    }
  }, [containerRef, pinRefs])

  return pathD
}
```

### 3.4 — How to animate the thread (draw-on-scroll)

```ts
// hooks/useScrollProgress.ts
'use client'
import { useEffect, useState, RefObject } from 'react'

export function useScrollProgress(ref: RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      // progress: 0 when section enters viewport, 1 when section bottom hits viewport top
      const total = rect.height - windowH
      const scrolled = -rect.top
      const p = Math.min(1, Math.max(0, scrolled / total))
      setProgress(p)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // run once on mount
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])

  return progress
}
```

### 3.5 — ThreadLine component (the full SVG)

```tsx
// components/gallery/ThreadLine.tsx
'use client'
import { useEffect, useRef, RefObject } from 'react'
import { useThreadPath } from '@/hooks/useThreadPath'
import { useScrollProgress } from '@/hooks/useScrollProgress'

interface Props {
  containerRef: RefObject<HTMLElement>
  pinRefs: RefObject<(HTMLElement | null)[]>
}

export default function ThreadLine({ containerRef, pinRefs }: Props) {
  const pathRef = useRef<SVGPathElement>(null)
  const pathD = useThreadPath(containerRef, pinRefs)
  const scrollProgress = useScrollProgress(containerRef)

  // Apply stroke-dashoffset based on scroll progress
  useEffect(() => {
    const path = pathRef.current
    if (!path || !pathD) return

    // getTotalLength only works after the element is rendered with a valid 'd'
    const length = path.getTotalLength()
    if (!length) return

    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length * (1 - scrollProgress)}`
  }, [scrollProgress, pathD])

  if (!pathD) return null

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'visible',
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Main gradient: cool blue at top → warm amber at bottom */}
        <linearGradient id="threadGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor="#6366f1" stopOpacity="0.9" />
          <stop offset="35%"  stopColor="#8b5cf6" stopOpacity="0.85" />
          <stop offset="65%"  stopColor="#ec4899" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.9" />
        </linearGradient>

        {/* Glow filter for the thread */}
        <filter id="threadGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/*
        Layer 1: Wide, blurred glow path (gives the neon glow effect)
        This is slightly thicker and blurred to create the halo.
      */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#threadGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#threadGlow)"
        opacity="0.35"
        ref={undefined} // glow doesn't need dashoffset, it will show always
        style={{ strokeDasharray: 'none' }}
      />

      {/*
        Layer 2: The actual sharp thread line that draws on scroll
      */}
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="url(#threadGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: 'stroke-dashoffset 0.05s linear',
        }}
      />
    </svg>
  )
}
```

**CRITICAL IMPLEMENTATION NOTE:** The glow layer (Layer 1) should NOT have strokeDashoffset. Only Layer 2 (the sharp line) should animate. This creates the effect where the neon glow is always slightly visible behind the drawing line.

---

## PART 4 — THE PIN DOT (where thread meets image)

At the top-center of every image card, place a small pin/tack SVG element. This is:
1. The visual "anchor" where the thread connects
2. The DOM element whose position the `useThreadPath` hook reads

### 4.1 — Pin visual design

The pin should look like a thumbtack:
- A small filled circle, diameter 14px
- A tiny vertical stem below it, 8px tall, 2px wide
- Color: off-white `#f5f5f0` with a subtle drop shadow
- On thread-reach (when scrollProgress passes this card's threshold): the pin glows with a pulse animation

### 4.2 — Pin component

```tsx
// components/gallery/Pin.tsx
'use client'
import { forwardRef } from 'react'

interface PinProps {
  isActive: boolean // true when the thread has reached this card
}

const Pin = forwardRef<HTMLDivElement, PinProps>(({ isActive }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: '-18px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* Pin head (circle) */}
      <div
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: isActive
            ? 'radial-gradient(circle at 35% 35%, #ffffff, #a78bfa)'
            : 'radial-gradient(circle at 35% 35%, #ffffff, #d4d4d8)',
          boxShadow: isActive
            ? '0 0 0 3px rgba(167,139,250,0.4), 0 0 12px rgba(167,139,250,0.6), 0 2px 6px rgba(0,0,0,0.4)'
            : '0 2px 6px rgba(0,0,0,0.4)',
          transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          animation: isActive ? 'pinPulse 2s ease-in-out infinite' : 'none',
        }}
      />
      {/* Pin stem */}
      <div
        style={{
          width: '2px',
          height: '10px',
          background: isActive
            ? 'linear-gradient(to bottom, #a78bfa, transparent)'
            : 'linear-gradient(to bottom, #a1a1aa, transparent)',
          transition: 'all 0.6s ease',
        }}
      />

      {/* Pulse ring animation (CSS keyframes must be in global CSS) */}
      <style>{`
        @keyframes pinPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(167,139,250,0.4), 0 0 12px rgba(167,139,250,0.6), 0 2px 6px rgba(0,0,0,0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(167,139,250,0.1), 0 0 20px rgba(167,139,250,0.8), 0 2px 6px rgba(0,0,0,0.4); }
        }
      `}</style>
    </div>
  )
})
Pin.displayName = 'Pin'
export default Pin
```

---

## PART 5 — CARD COMPONENT

### 5.1 — Layout rules

- Each card is a full-width row (`display: flex`, `flex-direction: row` or `row-reverse`)
- Image wrapper: `width: 44%`, `max-width: 560px`
- Text block: `width: 40%`
- Gap between image and text: `16%` — this empty center space is where the thread runs vertically
- Card height: minimum `420px`
- Vertical spacing between cards: `120px` (this gap is what makes the thread S-curve dramatic)
- On mobile (< 768px): stack vertically, image always on top, full width

### 5.2 — Card entrance animation

Each card starts invisible and below its final position. When it enters the viewport, it slides up and fades in.

```ts
// hooks/useIntersection.ts
'use client'
import { useEffect, useState, RefObject } from 'react'

export function useIntersection(ref: RefObject<Element>, threshold = 0.15): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isVisible
}
```

```tsx
// components/gallery/GalleryCard.tsx
'use client'
import { useRef, forwardRef } from 'react'
import Image from 'next/image'
import { useIntersection } from '@/hooks/useIntersection'
import Pin from './Pin'

interface CardProps {
  item: { id: number; label: string; title: string; desc: string; src: string }
  index: number
  isThreadActive: boolean // true when thread has drawn past this card's pin
  onOpen: (index: number) => void
  pinRef: (el: HTMLElement | null) => void
}

export default function GalleryCard({ item, index, isThreadActive, onOpen, pinRef }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isVisible = useIntersection(cardRef, 0.15)
  const isLeft = index % 2 === 0

  // Deterministic tilt based on index (same every render, not random)
  const tilt = ((index * 37) % 7) - 3 // produces values between -3 and +3 degrees

  return (
    <div
      ref={cardRef}
      onClick={() => onOpen(index)}
      style={{
        display: 'flex',
        flexDirection: isLeft ? 'row' : 'row-reverse',
        alignItems: 'center',
        width: '100%',
        marginBottom: '120px',
        cursor: 'pointer',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(52px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms,
                     transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
      }}
    >
      {/* IMAGE BLOCK — 44% width */}
      <div
        style={{
          width: '44%',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* The pin — this element's position is read by useThreadPath */}
        <Pin ref={pinRef} isActive={isThreadActive} />

        {/* Image wrapper with tilt and hover effect */}
        <div
          style={{
            position: 'relative',
            transform: `rotate(${tilt}deg)`,
            transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: isThreadActive
              ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.3)'
              : '0 12px 40px rgba(0,0,0,0.35)',
          }}
          className="gallery-image-wrapper" // add hover CSS via global stylesheet
        >
          {/* Polaroid-style white top border */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '12px',
            background: 'rgba(255,255,255,0.06)',
            zIndex: 1,
          }} />

          <Image
            src={item.src}
            alt={item.title}
            width={720}
            height={480}
            sizes="(max-width: 768px) 100vw, 44vw"
            priority={index < 2}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              aspectRatio: '3/2',
              objectFit: 'cover',
            }}
          />

          {/* Thread-reach overlay: subtle color wash when pin is active */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isThreadActive
                ? 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(236,72,153,0.08))'
                : 'transparent',
              transition: 'background 0.8s ease',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* CSS REFLECTION — replaces the duplicate <img> tag */}
        <div
          aria-hidden="true"
          style={{
            transform: 'scaleY(-1)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 65%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 65%)',
            pointerEvents: 'none',
            userSelect: 'none',
            marginTop: '2px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Image
            src={item.src}
            alt=""
            width={720}
            height={480}
            sizes="(max-width: 768px) 100vw, 44vw"
            aria-hidden={true}
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              aspectRatio: '3/2',
              objectFit: 'cover',
              opacity: 0.5,
            }}
          />
        </div>
      </div>

      {/* GAP — 12% — thread runs here */}
      <div style={{ flex: 1 }} />

      {/* TEXT BLOCK — 40% width */}
      <div
        style={{
          width: '40%',
          flexShrink: 0,
          padding: '0 24px',
          textAlign: isLeft ? 'left' : 'right',
        }}
      >
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: isThreadActive ? '#a78bfa' : '#6b7280',
          marginBottom: '12px',
          transition: 'color 0.6s ease',
        }}>
          {item.label}
        </p>
        <h3 style={{
          fontSize: 'clamp(20px, 2.5vw, 32px)',
          fontWeight: '600',
          lineHeight: '1.2',
          marginBottom: '12px',
          color: isThreadActive ? '#f5f5f5' : '#e5e5e5',
          transition: 'color 0.6s ease',
        }}>
          {item.title}
        </h3>
        <p style={{
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#9ca3af',
        }}>
          {item.desc}
        </p>
      </div>
    </div>
  )
}
```

### 5.3 — Global hover CSS (add to globals.css)

```css
/* Hover: image lifts, straightens, gains brighter shadow */
.gallery-image-wrapper:hover {
  transform: rotate(0deg) translateY(-6px) !important;
  box-shadow: 0 28px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.5) !important;
}

/* Reduced motion: disable all animations */
@media (prefers-reduced-motion: reduce) {
  .gallery-image-wrapper {
    transform: none !important;
    transition: none !important;
  }
}
```

---

## PART 6 — THREAD "ACTIVATION" PER CARD

Each card's pin should know whether the thread has reached it. Calculate this in the parent:

```tsx
// In GallerySection.tsx

// Per-card activation threshold
// card 0 activates when scrollProgress > 0/9, card 1 at 1/9, etc.
const isThreadActive = (index: number, progress: number): boolean => {
  const threshold = index / GALLERY_ITEMS.length
  return progress > threshold
}
```

When a card becomes active (thread reaches it):
1. Pin glows and pulses (handled inside Pin component)
2. Card label text changes from gray to purple
3. Card title text brightens to near-white
4. Card image gets a subtle indigo-pink color wash overlay
5. Card image box-shadow brightens with a colored halo

---

## PART 7 — GallerySection (parent that wires everything together)

```tsx
// components/gallery/GallerySection.tsx
'use client'
import { useRef } from 'react'
import { GALLERY_ITEMS } from '@/data/gallery'
import GalleryCard from './GalleryCard'
import ThreadLine from './ThreadLine'
import Lightbox from './Lightbox'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useState } from 'react'

export default function GallerySection() {
  const containerRef = useRef<HTMLElement>(null)
  const pinRefs = useRef<(HTMLElement | null)[]>([])
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const scrollProgress = useScrollProgress(containerRef)

  const isActive = (index: number) => scrollProgress > index / GALLERY_ITEMS.length

  return (
    <>
      <section
        ref={containerRef}
        style={{
          position: 'relative',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '80px 48px 160px',
        }}
      >
        {/* Thread SVG — sits behind all cards */}
        <ThreadLine containerRef={containerRef} pinRefs={pinRefs} />

        {/* Cards */}
        {GALLERY_ITEMS.map((item, i) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={i}
            isThreadActive={isActive(i)}
            onOpen={setLightboxIndex}
            pinRef={(el) => { pinRefs.current[i] = el }}
          />
        ))}

        {/* End knot */}
        <div style={{ textAlign: 'center', paddingTop: '40px', color: '#6b7280', fontSize: '13px', letterSpacing: '0.1em' }}>
          ✦ A stitched archive of K-Hub moments ✦
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={GALLERY_ITEMS}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
```

---

## PART 8 — LIGHTBOX

```tsx
// components/gallery/Lightbox.tsx
'use client'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

interface LightboxProps {
  items: { id: number; label: string; title: string; desc: string; src: string }[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex)

  const prev = useCallback(() => setCurrent(i => (i - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % items.length), [items.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, next, prev])

  const item = items[current]

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '24px', right: '32px',
          background: 'none', border: 'none', color: '#9ca3af',
          fontSize: '28px', cursor: 'pointer', lineHeight: 1,
        }}
        aria-label="Close lightbox"
      >✕</button>

      {/* Image */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', maxWidth: '85vw', maxHeight: '75vh' }}
      >
        <Image
          src={item.src}
          alt={item.title}
          width={1200}
          height={800}
          style={{ maxWidth: '85vw', maxHeight: '75vh', width: 'auto', height: 'auto', borderRadius: '8px' }}
        />
      </div>

      {/* Footer info */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ marginTop: '24px', textAlign: 'center' }}
      >
        <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#a78bfa', marginBottom: '6px' }}>{item.label}</p>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#f5f5f5', marginBottom: '8px' }}>{item.title}</h3>
        <p style={{ fontSize: '14px', color: '#9ca3af' }}>{item.desc}</p>
      </div>

      {/* Prev / Next */}
      <button onClick={(e) => { e.stopPropagation(); prev() }}
        style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', fontSize: '24px', padding: '14px 18px', borderRadius: '8px', cursor: 'pointer' }}
        aria-label="Previous">‹</button>
      <button onClick={(e) => { e.stopPropagation(); next() }}
        style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff', fontSize: '24px', padding: '14px 18px', borderRadius: '8px', cursor: 'pointer' }}
        aria-label="Next">›</button>

      {/* Dot counter */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
        {items.map((_, i) => (
          <div key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
            style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? '#a78bfa' : '#374151', cursor: 'pointer', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </div>
  )
}
```

---

## PART 9 — SCROLL PROGRESS BAR

Add a thin 2px bar at the very top of the gallery section (not full-page) that fills as the user scrolls through the gallery.

```tsx
// Inside GallerySection, before the ThreadLine:
<div style={{
  position: 'absolute',
  top: 0, left: 0,
  width: `${scrollProgress * 100}%`,
  height: '2px',
  background: 'linear-gradient(to right, #6366f1, #ec4899, #f59e0b)',
  transition: 'width 0.1s linear',
  borderRadius: '1px',
  zIndex: 5,
}} />
```

---

## PART 10 — WHY THE THREAD WAS BREAKING (root cause)

The current thread implementation uses a static SVG path computed once, likely at mount time or with hardcoded coordinates. It fails because:

1. **Images are lazy-loaded** — their final sizes aren't known at mount, so positions shift after the first render.
2. **No ResizeObserver** — window resize doesn't trigger path recalculation reliably.
3. **Scroll position ignored** — `getBoundingClientRect()` returns viewport-relative coordinates. You must add `window.scrollY` to get document-absolute Y positions.
4. **Container height not tracked** — the SVG height doesn't match the section's actual scroll height.

The `useThreadPath` hook in Part 3.3 fixes all four of these. It uses `ResizeObserver`, adds `window.scrollY`, reads the container's `scrollHeight`, and triggers recalculation after images load.

To ensure images are loaded before first calculation, add this to GallerySection:

```tsx
useEffect(() => {
  // After all images in the section have loaded, recalculate
  const images = containerRef.current?.querySelectorAll('img') || []
  let loaded = 0
  const check = () => { loaded++; if (loaded === images.length) { /* trigger recalc via state */ } }
  images.forEach(img => {
    if (img.complete) check()
    else img.addEventListener('load', check)
  })
}, [])
```

Or more simply: give the `<Image />` components an `onLoad` callback that increments a counter, and only render `<ThreadLine />` when all images are loaded.

---

## PART 11 — THREAD VISUAL DESIGN SUMMARY

| Property | Value |
|---|---|
| Stroke width (sharp line) | 1.5px |
| Stroke width (glow layer) | 6px |
| Glow layer opacity | 0.35 |
| Glow blur (feGaussianBlur stdDeviation) | 3 |
| Gradient top color | #6366f1 (indigo) |
| Gradient mid-top color | #8b5cf6 (violet) |
| Gradient mid-bottom color | #ec4899 (pink) |
| Gradient bottom color | #f59e0b (amber) |
| Animation | stroke-dasharray + dashoffset, driven by scroll |
| Transition timing | 0.05s linear (real-time draw) |
| z-index | 2 (above background, below cards text) |
| pointer-events | none (never blocks clicks) |

---

## PART 12 — COMMON MISTAKES TO AVOID

1. **Do NOT use `position: fixed` for the SVG** — it must be `position: absolute` inside the `position: relative` container so its coordinate space matches the cards.
2. **Do NOT read pinRef positions on every scroll event** — this causes layout thrashing. Read positions only on mount and resize. Drive the draw animation purely via `strokeDashoffset` on scroll.
3. **Do NOT place the glow path inside a `<clipPath>`** — it will be invisible.
4. **Do NOT forget `overflow: visible` on the SVG** — the path can extend slightly outside the container bounds at the top and bottom; without this it will be clipped.
5. **Do NOT add `will-change: transform` to the SVG** — it creates a new stacking context that breaks the gradient rendering in Safari.
6. **Pin refs must point to the pin div, not the card div** — the hook reads the pin position, not the card's top.
