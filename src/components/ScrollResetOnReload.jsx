"use client";

import { useEffect } from "react";

export default function ScrollResetOnReload() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const resetToTop = () => {
            if (!window.location.hash) {
                window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            }
        };

        resetToTop();
        requestAnimationFrame(resetToTop);

        window.addEventListener("pageshow", resetToTop);
        return () => {
            window.removeEventListener("pageshow", resetToTop);
        };
    }, []);

    return null;
}
