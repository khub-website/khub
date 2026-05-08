K-Hub Gallery — Connecting Thread Full Implementation Prompt
I have a Next.js 14 gallery page with 9 image cards in a zigzag layout (odd-indexed cards have the image on the left side, even-indexed cards have the image on the right side). I need you to implement a cinematic SVG connecting thread that snakes through the entire gallery section connecting all images. Here is every detail you need:

THREAD PATH AND ROUTING
The thread is a single continuous SVG <path> element that lives inside an <svg> tag. This SVG must be positioned absolute, top: 0, left: 0, width: 100%, height must equal the container's scrollHeight (not offsetHeight, not a fixed value), overflow: visible, pointer-events: none, z-index: 1. The parent section must be position: relative. The SVG sits behind the card content but in front of the background, so set card image wrappers to z-index: 2 and card text to z-index: 2 so they appear above the thread.
The thread starts at the exact horizontal center of the section (containerWidth / 2) at y = 0 (top of the section). It ends at the exact horizontal center of the section at y = containerScrollHeight (bottom of the section, just before the footer). It must pass through every single image card — all 9 of them — without skipping any.

EXACTLY WHERE THE THREAD CONNECTS TO EACH IMAGE
This is critical. The thread does not connect to the center of the image. It connects to a specific edge point depending on which side the image is on:

For left-side images (index 0, 2, 4, 6, 8 — the ones on the left half of the page): the thread connects to the right edge, vertically centered of the image wrapper div. So the anchor point X is imageWrapper.getBoundingClientRect().right - containerRect.left and Y is imageWrapper.getBoundingClientRect().top + imageWrapper.getBoundingClientRect().height / 2 + window.scrollY - (containerRect.top + window.scrollY).
For right-side images (index 1, 3, 5, 7 — the ones on the right half of the page): the thread connects to the left edge, vertically centered of the image wrapper div. So anchor X is imageWrapper.getBoundingClientRect().left - containerRect.left and Y is the same vertical center formula.

Place a small invisible ref div (a pinRef) at this exact edge-center point on each image wrapper so you can read its position. Make it position: absolute, width: 1px, height: 1px, for left images place it at right: 0, top: 50%, transform: translateY(-50%), for right images place it at left: 0, top: 50%, transform: translateY(-50%).

HOW TO CALCULATE THE PATH CORRECTLY
Use a custom hook called useThreadPath that takes containerRef and pinRefs array. Inside a useEffect, define a recalculate function that does the following:
Read containerRef.current.getBoundingClientRect() and store as containerRect. Read window.scrollY at the moment of calculation. For each pinRef, read pinRef.getBoundingClientRect() and compute: x = pinRect.left + pinRect.width/2 - containerRect.left and y = pinRect.top + pinRect.height/2 + window.scrollY - (containerRect.top + window.scrollY). Collect all valid anchors in order.
Build the SVG path string starting with M centerX 0. From the start point to the first anchor, draw a cubic bezier: control points should have X equal to centerX and Y halfway between start and first anchor. Between each consecutive pair of anchor points A and B, draw a cubic bezier where control point 1 has X = A.x and Y = midpoint Y between A and B, and control point 2 has X = B.x and Y = midpoint Y between A and B. This creates the natural S-curve swing from left edge to right edge. From the last anchor to the end point at centerX, containerScrollHeight, mirror the same logic. The final path string uses C commands throughout.
Call recalculate on mount. Attach a ResizeObserver on the container element to call recalculate whenever the container resizes. Add window.addEventListener('resize', recalculate). Also wait for all images to load before the first calculation: find all img elements inside the container, for each one if img.complete is already true count it as loaded immediately, otherwise attach an onload listener. Only call recalculate once every image has loaded or errored. Return the computed pathD string from the hook.

DRAW-ON-SCROLL ANIMATION
After the path is rendered, get the total length via pathRef.current.getTotalLength(). Set strokeDasharray to this total length. Set initial strokeDashoffset to this total length (fully hidden). On every scroll event (passive listener), compute progress as: const rect = containerRef.current.getBoundingClientRect(); const progress = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight))). Set pathRef.current.style.strokeDashoffset = String(totalLength * (1 - progress)). Apply path.style.transition = 'stroke-dashoffset 0.06s linear' so it feels real-time. The line fully draws when the user has scrolled through the entire section.

THREAD VISUAL APPEARANCE — TWO LAYERS
Render two <path> elements in the SVG sharing the exact same d attribute value:
Layer 1 is the glow halo. It has strokeWidth="8", fill="none", stroke="url(#threadGradient)", opacity="0.3", filter="url(#glowFilter)". It has NO strokeDasharray and NO strokeDashoffset — it is always fully visible at low opacity, acting as a permanent ambient glow behind the drawing line.
Layer 2 is the sharp animated line. It has strokeWidth="2", fill="none", stroke="url(#threadGradient)", strokeLinecap="round", strokeLinejoin="round". This is the path that gets strokeDasharray and strokeDashoffset set via the scroll listener.
In the SVG <defs>, add a <filter id="glowFilter"> containing <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/> followed by <feMerge> with <feMergeNode in="blur"/> and <feMergeNode in="SourceGraphic"/>.

DYNAMIC COLOR THAT CHANGES AS IT DRAWS
The thread color must change dynamically based on scroll progress — not a static gradient. Here is how to implement it:
In the SVG defs, define a <linearGradient id="threadGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox"> with these stops: at 0% use #6366f1 (indigo), at 16% use #8b5cf6 (violet), at 33% use #ec4899 (pink), at 50% use #f43f5e (rose), at 66% use #f97316 (orange), at 83% use #eab308 (yellow), at 100% use #22c55e (green). This means as the line draws downward through the page, the part connecting to image 1 is indigo, image 2 is violet, image 3 pink, and so on all the way to green at the last image.
Additionally on every scroll event, update the gradient dynamically by moving the stop offsets slightly based on progress to create a subtle color shift effect: multiply each stop offset by (0.8 + progress * 0.4) so the gradient compresses and shifts as the user scrolls. Access the gradient stops via document.getElementById('threadGradient').querySelectorAll('stop') and update their offset attribute.

THREAD PASSES BEHIND IMAGES
The thread must visually pass behind each image card but in front of the dark background. Achieve this with z-index layering only — no clipping paths needed. Set the SVG z-index to 1. Set each card's image wrapper div to position: relative; z-index: 2. Set each card's text block to position: relative; z-index: 2. The background of the page is z-index 0. This way the thread appears to weave behind the photos like a physical string threaded through a corkboard.

EFFECT ON IMAGE WHEN THREAD REACHES IT
Calculate isActive per card as: isActive = scrollProgress > (index / totalCards) * 0.9. When a card becomes active for the first time (transition from inactive to active), trigger these effects all at once with CSS transitions of 0.7s cubic-bezier(0.22, 1, 0.36, 1):
On the image wrapper div: add a colored border glow using boxShadow that changes to 0 0 0 2px rgba(167, 139, 250, 0.6), 0 0 30px rgba(167, 139, 250, 0.25), 0 20px 60px rgba(0,0,0,0.5).
On an absolutely-positioned overlay div covering the image (inset 0, pointer-events none, z-index 3): transition its background from transparent to linear-gradient(135deg, rgba(99, 102, 241, 0.10), rgba(236, 72, 153, 0.07)) and simultaneously transition opacity from 0 to 1.
On the card label text: transition color from #4b5563 to #a78bfa.
On the card title text: transition color from #d1d5db to #f9fafb.
Add a small 14px pin dot at the connection point (the pinRef position) that when the thread reaches it scales from scale(0) to scale(1) with a spring-like overshoot using cubic-bezier(0.34, 1.56, 0.64, 1) over 0.5s, and pulses with a CSS keyframe animation called pinPulse that alternates its box-shadow between 0 0 0 3px rgba(167,139,250,0.4) and 0 0 0 7px rgba(167,139,250,0.0) over 2 seconds infinitely. The pin dot is width: 12px, height: 12px, borderRadius: 50%, background: radial-gradient(circle at 35% 35%, #ffffff, #a78bfa), position: absolute placed exactly at the pinRef anchor position.

RESIZING AND RECALCULATION
Every time the window resizes or the container's dimensions change (via ResizeObserver), recalculate the path, recalculate the total path length, reapply strokeDasharray, and recompute strokeDashoffset based on the current scroll position without resetting the animation. Add window.scrollY correctly every time — never use raw getBoundingClientRect().top as a Y coordinate for the path without adding window.scrollY.

WHAT NOT TO DO
Do not use position: fixed anywhere on the SVG. Do not calculate positions without adding window.scrollY. Do not use offsetHeight for the SVG height — always use scrollHeight. Do not add will-change: transform to the SVG element. Do not set overflow: hidden on the section container. Do not use clipPath to hide the thread behind images — use z-index only. Do not make the glow layer use strokeDashoffset. Do not forget fill="none" on every path element or the path will render as a filled black shape.