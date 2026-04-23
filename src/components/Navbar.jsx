"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Domains", href: "/#domains" },
    { label: "Gallery", href: "/gallery" },
    { label: "Achievements", href: "/achievements" },
    { label: "Programs", href: "/#programs" },
    { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const forceElevatedStyle = pathname === "/about";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = (e, href) => {
        if (href.startsWith("/#")) {
            const hash = href.substring(1); // e.g. "#domains"
            e.preventDefault();
            setMobileOpen(false);

            if (pathname === "/") {
                // Already on home page — just scroll
                const el = document.querySelector(hash);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                // Navigate to home first, then scroll after page loads
                router.push("/");
                const scrollAfterNav = () => {
                    const el = document.querySelector(hash);
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                    } else {
                        // Element not rendered yet, retry
                        requestAnimationFrame(scrollAfterNav);
                    }
                };
                setTimeout(scrollAfterNav, 300);
            }
            return;
        }
        setMobileOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -1.5, scale: 1.005 }}
            className="fixed top-3 sm:top-4 left-1/2 z-50 -translate-x-1/2 w-[min(97vw,1240px)]"
        >
            <div
                className={`relative overflow-hidden rounded-[26px] border transition-all duration-500 ${(scrolled || forceElevatedStyle)
                    ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.46),rgba(255,255,255,0.18))] border-white/45 shadow-[0_24px_64px_rgba(15,23,42,0.2),0_8px_24px_rgba(255,255,255,0.42)_inset] backdrop-blur-[28px] backdrop-saturate-150"
                    : "bg-[linear-gradient(135deg,rgba(255,255,255,0.36),rgba(255,255,255,0.12))] border-white/35 shadow-[0_16px_48px_rgba(15,23,42,0.14),0_6px_20px_rgba(255,255,255,0.34)_inset] backdrop-blur-xl backdrop-saturate-150"
                    }`}
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-px rounded-[25px] border border-white/35"
                    style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(255,255,255,0.18)" }}
                />

                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[26px]"
                    style={{
                        background: "linear-gradient(115deg, rgba(255,255,255,0.04) 12%, rgba(255,255,255,0.56) 36%, rgba(255,255,255,0.08) 62%)",
                        backgroundSize: "220% 100%",
                    }}
                    animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -top-12 -left-36 h-48 w-72 rounded-full blur-2xl opacity-80"
                    style={{
                        background: "radial-gradient(circle at 35% 35%, rgba(96,156,104,0.72), rgba(150,186,146,0.42) 46%, rgba(255,255,255,0) 74%)",
                        mixBlendMode: "multiply",
                    }}
                    animate={{ x: [-60, 700, -60], y: [0, 10, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-14 -right-40 h-52 w-80 rounded-full blur-2xl opacity-72"
                    style={{
                        background: "radial-gradient(circle at 60% 45%, rgba(95,151,101,0.66), rgba(160,194,155,0.38) 44%, rgba(255,255,255,0) 72%)",
                        mixBlendMode: "multiply",
                    }}
                    animate={{ x: [60, -680, 60], y: [0, -8, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-[58%]"
                    style={{
                        background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.62), rgba(255,255,255,0))",
                        filter: "blur(1px)",
                    }}
                    animate={{ x: ["0%", "340%"] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative px-7 sm:px-9 md:px-11 lg:px-13">
                    <div className="flex items-center justify-between h-19">
                        <Link
                            href="/"
                            onClick={() => setMobileOpen(false)}
                            className="group flex items-center gap-3.5"
                        >
                            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/78 ring-1 ring-white/70 shadow-[0_6px_18px_rgba(2,44,34,0.14)] flex items-center justify-center overflow-hidden">
                                <Image
                                    src="/logo-khub.png"
                                    alt="K-Hub logo"
                                    width={38}
                                    height={38}
                                    priority
                                    style={{ objectFit: "contain", width: "auto", height: "auto" }}
                                />
                            </div>
                            <div className="leading-none">
                                <span className="block text-[1.12rem] sm:text-[1.24rem] font-semibold tracking-[0.14em] text-on-surface group-hover:text-primary transition-colors duration-300">
                                    K-HUB
                                </span>
                                <span className="block mt-1 text-[0.62rem] sm:text-[0.66rem] tracking-[0.22em] text-on-surface-variant/85 uppercase">
                                    Deep-Tech Innovation
                                </span>
                            </div>
                        </Link>

                        <div className="hidden md:flex items-center gap-2.5 p-1.5 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,255,255,0.2))] ring-1 ring-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_rgba(2,44,34,0.12)] backdrop-blur-[14px]">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                                    whileHover={{ y: -2, scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-5 py-3 rounded-full text-[0.9rem] font-semibold tracking-[0.02em] text-on-surface-variant hover:text-primary bg-transparent hover:bg-white/70 hover:shadow-[0_8px_22px_rgba(2,44,34,0.14),inset_0_1px_0_rgba(255,255,255,0.85)] transition-all duration-300"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>

                        <button
                            onClick={() => setMobileOpen((o) => !o)}
                            className="md:hidden relative w-10 h-10 rounded-full bg-white/62 ring-1 ring-white/80 shadow-[0_6px_16px_rgba(2,44,34,0.12)] flex items-center justify-center"
                            aria-label="Toggle menu"
                        >
                            <span className="relative w-5 h-4 flex flex-col justify-between">
                                <span className={`block w-full h-0.5 bg-on-surface transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                                <span className={`block w-full h-0.5 bg-on-surface transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
                                <span className={`block w-full h-0.5 bg-on-surface transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="md:hidden overflow-hidden bg-white/58 backdrop-blur-2xl border-t border-white/60 rounded-b-[26px]"
                    >
                        <div className="px-4 sm:px-6 py-4 flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    whileHover={{ x: 5 }}
                                    className="px-4 py-3 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-white/72 transition-all"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
