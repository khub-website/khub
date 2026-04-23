import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { paradigms } from "./ParadigmData";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "../ui/tooltip";

/** Keep pearls inside the outer disc (half-size = 280px). */
const ARM_RADIUS_RATIO = 198 / 560;
/** Labels live well inside the opaque inner disc for contrast. */
const LABEL_RADIUS_RATIO = 135 / 560;
/** Logo badge size next to each label (inactive / active). */
const LOGO_SIZE_RATIO = { inactive: 36 / 560, active: 44 / 560 };
const N = paradigms.length;
const SELECTOR_ANGLE = 180;

const SHORT_NAMES = {
  "drug-paradigm": "Drug",
  "robo-paradigm": "Robo",
  "cyber-paradigm": "Cyber",
  "neuro-paradigm": "Neuro",
  "crystal-paradigm": "Crystal",
  "nutra-paradigm": "Nutra",
};

const PARADIGM_LOGOS = {
  "drug-paradigm": "/attached_assets/Logo_Drugparadigm_1775035725463.webp",
  "robo-paradigm": "/attached_assets/Logo-ROBOPARADIGM_1775035747321.webp",
  "cyber-paradigm": "/attached_assets/Logo_CYBERPARADIGM_1775035776538.webp",
  "neuro-paradigm": "/attached_assets/Logo-NEUROPARADIGM_1775035736800.webp",
  "crystal-paradigm": "/attached_assets/Crystalparadigm_Logo_white_bg_1775035756777.webp",
  "nutra-paradigm": "/attached_assets/Logo-Neutraparadigm_1775035742117.webp",
};

function useDiscSize() {
  const [discSize, setDiscSize] = useState(560); // Safe SSR default

  useLayoutEffect(() => {
    const compute = () => {
      const vw = window.visualViewport?.width ?? window.innerWidth;
      const vh = window.visualViewport?.height ?? window.innerHeight;
      return Math.min(560, Math.max(220, Math.min(vw, vh) * 0.7));
    };

    // Measure immediately after paint
    setDiscSize(compute());

    const update = () => setDiscSize(compute());
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  return discSize;
}

function getSnapTarget(currentRotation, idx) {
  const baseTarget = -(360 / N) * idx;
  const delta = ((baseTarget - currentRotation) % 360 + 540) % 360 - 180;
  return currentRotation + delta;
}

function getNearestIdx(currentRotation) {
  let nearestIdx = 0;
  let smallestDelta = Infinity;
  for (let i = 0; i < N; i++) {
    const snapTarget = getSnapTarget(currentRotation, i);
    const d = Math.abs(snapTarget - currentRotation);
    if (d < smallestDelta) { smallestDelta = d; nearestIdx = i; }
  }
  return nearestIdx;
}

export function PearlNav() {
  const DISC_SIZE = useDiscSize();
  const isMobile = DISC_SIZE < 400;
  const ARM_RADIUS = ARM_RADIUS_RATIO * DISC_SIZE;
  const LABEL_RADIUS = LABEL_RADIUS_RATIO * DISC_SIZE;
  // Desktop: 1.12× bump; Mobile: 1.28× bump for logos
  const logoScale = isMobile ? 1.28 : 1.12;
  const LOGO_SIZE = {
    inactive: Math.round(LOGO_SIZE_RATIO.inactive * DISC_SIZE * logoScale),
    active: Math.round(LOGO_SIZE_RATIO.active * DISC_SIZE * logoScale),
  };
  // Mobile gets larger label text too
  const labelFontScale = isMobile ? 1.22 : 1;

  // Toggle button scales with disc
  const BTN_W = Math.round(DISC_SIZE * 26 / 560);
  const BTN_H = Math.round(DISC_SIZE * 30 / 560);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 650);
    return () => clearTimeout(timer);
  }, []);

  const [activeIdx, setActiveIdx] = useState(0);
  const [outerRotation, setOuterRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [missingLogos, setMissingLogos] = useState({});
  const containerRef = useRef(null);
  const dragRef = useRef(null);
  const outerRotRef = useRef(0);
  const activeIdxRef = useRef(0);
  const suppressScrollRef = useRef(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      window.scrollTo({ top: absoluteTop - 80, behavior: "smooth" });
    }
  };

  const getAngle = (e) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    dragRef.current = { startAngle: getAngle(e), startRotation: outerRotRef.current };
    setIsDragging(true);
    setIsSnapping(false);
  };

  const handleTouchStart = (e) => {
    dragRef.current = { startAngle: getAngle(e), startRotation: outerRotRef.current };
    setIsDragging(true);
    setIsSnapping(false);
  };

  const rotateTo = (idx) => {
    const target = getSnapTarget(outerRotRef.current, idx);
    outerRotRef.current = target;
    activeIdxRef.current = idx;
    setOuterRotation(target);
    setActiveIdx(idx);
  };

  const snapAndNavigate = () => {
    const nearest = getNearestIdx(outerRotRef.current);
    rotateTo(nearest);
    setIsSnapping(true);
    suppressScrollRef.current = true;
    scrollTo(paradigms[nearest].id);
    setTimeout(() => { 
      setIsSnapping(false); 
      suppressScrollRef.current = false; 
    }, 2000);
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current || !containerRef.current) return;
      const angle = getAngle(e);
      const delta = angle - dragRef.current.startAngle;
      const next = dragRef.current.startRotation + delta;
      outerRotRef.current = next;
      setOuterRotation(next);
    };
    const onUp = () => {
      if (dragRef.current) {
        dragRef.current = null;
        setIsDragging(false);
        snapAndNavigate();
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0,
    };

    const callback = (entries) => {
      if (dragRef.current || suppressScrollRef.current) return;

      let bestEntry = null;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
            bestEntry = entry;
          }
        }
      }

      if (bestEntry) {
        const id = bestEntry.target.id;
        const idx = paradigms.findIndex((p) => p.id === id);
        if (idx !== -1 && idx !== activeIdxRef.current) {
          rotateTo(idx);
        }
      }
    };

    const observer = new IntersectionObserver(callback, options);
    paradigms.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backdropFilter: isDragging ? "blur(12px)" : "blur(0px)",
          background: isDragging ? "rgba(25, 45, 20, 0.1)" : "rgba(0,0,0,0)",
          zIndex: 40,
          pointerEvents: "none",
          transition: "backdrop-filter 0.35s ease, background 0.35s ease",
        }}
      />

      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{
          position: "fixed",
          right: 0,
          top: "50vh",
          transform: "translateY(-50%)",
          zIndex: 60,
          width: BTN_W,
          height: BTN_H,
          borderRadius: "6px 0 0 6px",
          background: isOpen ? paradigms[activeIdx].color : `color-mix(in srgb, ${paradigms[activeIdx].color} 20%, transparent)`,
          border: "1px solid var(--color-surface-container-high)",
          borderRight: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          outline: "none",
          boxShadow: isOpen ? "none" : `0 0 30px ${paradigms[activeIdx].color}22`,
        }}
        title={isOpen ? "Close navigation" : "Open navigation"}
      >
        <span style={{ 
          color: isOpen ? "#FF6B35" : paradigms[activeIdx].color,
          fontSize: Math.round(BTN_W * 0.9), 
          fontWeight: "bold",
          lineHeight: 1,
          fontFamily: "monospace",
          transform: "translateX(-1px)"
        }}>
          {isOpen ? "×" : "›"}
        </span>
      </button>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              ref={containerRef}
              data-testid="pearl-disc-nav"
              onTouchStart={handleTouchStart}
              style={{
                position: "fixed",
                right: isOpen ? -(DISC_SIZE / 2) : -DISC_SIZE,
                top: `calc(50vh - ${DISC_SIZE / 2}px)`,
                width: DISC_SIZE,
                height: DISC_SIZE,
                zIndex: 50,
                transition: "right 0.5s cubic-bezier(0.4,0,0.2,1)",
                pointerEvents: isOpen ? "auto" : "none",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <div
                className="pearl-disc-rotate"
                style={{ position: "absolute", inset: 0, borderRadius: "50%", pointerEvents: "none" }}
              >
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 35%, color-mix(in srgb, var(--color-surface-container-low) 40%, transparent) 0%, color-mix(in srgb, var(--color-surface) 15%, transparent) 100%)",
                  border: "0px solid transparent",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 0 80px rgba(0,60,40,0.04), inset 0 0 60px rgba(255,255,255,0.25)",
                  zIndex: 1,
                }} />
                {[0.82, 0.64, 0.46, 0.28].map((s, i) => (
                  <div key={i} style={{
                    position: "absolute", borderRadius: "50%",
                    border: `1px solid ${paradigms[activeIdx].color}${i === 0 ? "1a" : "0d"}`,
                    top: `${((1 - s) / 2) * 100}%`, left: `${((1 - s) / 2) * 100}%`,
                    width: `${s * 100}%`, height: `${s * 100}%`,
                    zIndex: 2,
                  }} />
                ))}
                
                {/* Opaque inner disc to increase label contrast */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: DISC_SIZE * 0.62,
                    height: DISC_SIZE * 0.62,
                    borderRadius: "50%",
                    background: "color-mix(in oklab, var(--color-surface-container-low) 92%, var(--color-on-surface) 8%)",
                    border: "1px solid color-mix(in oklab, var(--color-surface-container-high) 80%, rgba(0,0,0,0.1))",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4), 0 16px 48px rgba(0,0,0,0.14)",
                    zIndex: 3,
                  }}
                />
              </div>

              <div
                onMouseDown={handleMouseDown}
                style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  transform: `rotate(${outerRotation}deg)`,
                  transition: isDragging ? "none" : "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  cursor: isDragging ? "grabbing" : "grab",
                  zIndex: 2,
                }}
              >
                <svg style={{ position: "absolute", inset: 0, pointerEvents: "none" }} width={DISC_SIZE} height={DISC_SIZE}>
                  <circle
                    cx={DISC_SIZE / 2} cy={DISC_SIZE / 2} r={ARM_RADIUS}
                    fill="none" stroke={paradigms[activeIdx].color} strokeWidth="1.5" strokeDasharray="4 8"
                    style={{ opacity: 0.15 }}
                  />
                </svg>

                {paradigms.map((p, idx) => {
                  const angleDeg = SELECTOR_ANGLE + (360 / N) * idx;
                  const isActive = idx === activeIdx;

                  return (
                    <div key={p.id} style={{
                      position: "absolute", left: "50%", top: "50%",
                      width: 0, height: 0,
                      transform: `rotate(${angleDeg}deg)`,
                      transformOrigin: "0 0",
                    }}>
                      <button
                        onClick={() => {
                          if (!isDragging) {
                            rotateTo(idx);
                            suppressScrollRef.current = true;
                            scrollTo(p.id);
                            setTimeout(() => { suppressScrollRef.current = false; }, 2000);
                          }
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        data-testid={`pearl-nav-${p.id}`}
                        style={{
                          position: "absolute",
                          left: LABEL_RADIUS - LOGO_SIZE.active / 3,
                          top: -LOGO_SIZE.active / 2,
                          display: "flex", alignItems: "center",
                          background: "transparent", border: "none",
                          cursor: "pointer", outline: "none", padding: "0",
                          maxWidth: LABEL_RADIUS + 28,
                        }}
                      >
                        <div style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: Math.round(DISC_SIZE * 10 / 560),
                          minWidth: 0,
                          transform: `rotate(180deg)`,
                          transition: isDragging ? "none" : "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}>
                          <div
                            style={{
                              width: isActive ? LOGO_SIZE.active : LOGO_SIZE.inactive,
                              height: isActive ? LOGO_SIZE.active : LOGO_SIZE.inactive,
                              borderRadius: "50%",
                              flexShrink: 0,
                              overflow: "hidden",
                              background: `radial-gradient(circle at 32% 28%, #fff 0%, ${p.color} 50%, rgba(0,0,0,0.2) 100%)`,
                              boxShadow: isActive
                                ? `0 0 30px ${p.color}, inset -1px -1px 4px rgba(0,0,0,0.2)`
                                : `0 0 15px ${p.color}66`,
                              border: `2px solid ${isActive ? "#fff" : "rgba(255,255,255,0.8)"}`,
                              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                              display: "grid",
                              placeItems: "center",
                            }}
                          >
                            {!missingLogos[p.id] ? (
                              <img
                                src={PARADIGM_LOGOS[p.id]}
                                alt={`${p.name} logo`}
                                onError={() =>
                                  setMissingLogos((prev) => ({ ...prev, [p.id]: true }))
                                }
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  transform: "scale(1.15)",
                                }}
                              />
                            ) : null}
                          </div>

                          <span
                            title={SHORT_NAMES[p.id] ?? p.name}
                            style={{
                              color: isActive ? "var(--color-on-surface)" : "var(--color-on-surface-variant)",
                              fontSize: isActive ? Math.round(DISC_SIZE * 13 / 560 * labelFontScale) : Math.round(DISC_SIZE * 12 / 560 * labelFontScale),
                              fontWeight: isActive ? 850 : 650,
                              fontFamily: "var(--font-display)",
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              transition: "all 0.3s ease",
                              userSelect: "none",
                              textAlign: "left",
                              display: "inline-flex",
                              alignItems: "center",
                              minWidth: 0,
                              maxWidth: isActive ? Math.round(DISC_SIZE * 118 / 560 * labelFontScale) : Math.round(DISC_SIZE * 92 / 560 * labelFontScale),
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              padding: isActive
                                ? `${Math.round(DISC_SIZE * 4 / 560)}px ${Math.round(DISC_SIZE * 10 / 560)}px`
                                : `${Math.round(DISC_SIZE * 3 / 560)}px ${Math.round(DISC_SIZE * 9 / 560)}px`,
                              borderRadius: 999,
                              background: isActive 
                                  ? "color-mix(in oklab, var(--color-surface-container-low) 78%, var(--color-on-surface) 22%)" 
                                  : "color-mix(in oklab, var(--color-surface-container-low) 88%, var(--color-on-surface) 12%)",
                              border: "1px solid color-mix(in oklab, var(--color-surface-container-high) 60%, var(--color-on-surface) 40%)",
                              boxShadow: isActive ? "0 10px 22px rgba(0,0,0,0.12)" : "0 8px 18px rgba(0,0,0,0.08)",
                            }}
                          >
                            {SHORT_NAMES[p.id] ?? p.name}
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            side="left" 
            className="max-w-xs"
          >
            <div className="text-sm space-y-1">
              <p className="font-semibold text-white">Paradigm Wheel</p>
              <p className="text-white/80">• Drag to rotate</p>
              <p className="text-white/80">• Auto-syncs as you scroll</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
