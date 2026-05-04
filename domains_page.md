You are working on a Next.js website for K-Hub Deep-Tech Innovation Hub. The Paradigms/Domains section currently shows an orbital layout of paradigm logos on the left and an info card on the right. You need to make the following changes only to the Domains/Paradigms section.

Task 1 — Swap Layout: Card Left, Orbit Right

Move the info card to the left side of the section.
Move the orbital logo cluster to the right side.
Maintain responsive behavior — on mobile they should stack vertically (card on top, orbit below).


Task 2 — Add K-Hub Card + Flip Animation Between Cards
Add a new paradigm entry for K-Hub:

Name: K-Hub
Subtitle: Deep-Tech Innovation Hub
Description: The student-led deep-tech incubator and venture studio of KMIT Group of Institutions — accelerating research across drug, cyber, neuro, robo, nutra, and crystal domains.
Logo: use the existing /logo-khub.png
Card gradient colors: #ed5b00 (orange) and #1b7e87 (teal)
K-Hub should be the default selected paradigm — its card shows when the page loads.
Clicking the K-Hub center sphere (the central/hub node in the orbital) should select K-Hub and show its card.

Replace slide animation with flip animation:

When switching between paradigm cards, the existing card should flip on the Y-axis (like turning a card over) to reveal the new card.
Use a CSS 3D rotateY flip — first half of flip hides old card, second half reveals new one.
Duration: ~500–600ms, easing: ease-in-out.
Keep any existing hover glow/shimmer effects on the card itself.


Task 3 — Larger Card + Per-Paradigm Corner Animations
Increase card size to be more prominent on the page — roughly 480–520px wide and auto height, or whatever fits well given the new left-side placement.
Add a decorative CSS/SVG animation in the card corner (top-right or bottom-right corner, approximately 100×100px area) for each paradigm. The animation must not overlap or obscure the text. Keep existing card hover effects. Below are the animation specs per paradigm:
1. Drugparadigm — DNA Helix Animation

Animate a double helix using pure CSS or inline SVG.
Two sine-wave strands offset by 180°, with small connecting "rung" lines between them.
The helix should appear to scroll/rotate continuously (infinite loop).
Colors: use purples/blues to match the Drugparadigm brand.
No images needed — pure CSS/SVG only.

2. Cyberparadigm — Falling Binary/Hash Numbers

Animate columns of falling 0s and 1s (or hex characters) from top to bottom, Matrix-style.
Multiple columns at slightly different speeds and opacities.
Color: bright green (#00ff41) or cyan, on dark/transparent background.
Characters should fade out at the bottom.
No images needed — pure CSS or canvas animation.

3. Neuroparadigm — Brain Neural Network Connecting

Animate nodes connecting with pulsing lines (simulating synaptic firing).
Use an SVG with ~6–8 dots; lines between them appear and fade in a looping sequence.
A traveling "pulse" dot should slide along each connection line.
Colors: match Neuroparadigm brand (colorful/rainbow or warm tones).
No images needed — SVG + CSS animation only.

4. Roboparadigm — Robotic Arm Animation

Animate a simplified 2D robotic arm with 2–3 pivot joints.
The arm should rotate/extend and retract in a loop (pick-and-place motion).
Built entirely with SVG rectangles and circles for joints.
Colors: metallic greys and blues matching the Roboparadigm logo.
No images needed — SVG + CSS keyframes only.

5. Nutraparadigm — Leaf + Pill Float Animation

Animate 2–3 small leaf shapes and 1–2 pill capsule shapes floating gently upward and fading out, then looping.
Leaves can be simple SVG paths; pills are rounded rectangles split in two colors.
Gentle swaying/rotation while floating.
Colors: greens and natural tones matching Nutraparadigm.
No images needed — SVG + CSS only.

6. Crystal Paradigm — Revolving Geometric Crystal

Animate a wireframe crystal/gem shape (like a hexagonal prism or octahedron outline) that slowly rotates.
Use SVG lines to form the shape; rotate the whole group continuously.
Optionally add a shimmer line sweeping across it.
Colors: ice blue / teal / light cyan matching Crystal Paradigm.
No images needed — SVG + CSS only.

7. K-Hub Card — Orbiting Dots

Animate 6 small colored dots orbiting a central point (one for each paradigm).
Each dot in its paradigm's color, orbiting at slightly different radii/speeds.
Soft glow on each dot.
No images needed — CSS + SVG only.