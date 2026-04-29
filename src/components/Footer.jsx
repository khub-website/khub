"use client";

import { motion } from "framer-motion";

export default function Footer() {
    const mapsShareUrl = "https://www.google.com/maps/search/?api=1&query=Teleparadigm+Towers&query_place_id=&ll=17.3941203,78.6214986"

    return (
        <footer id="contact" className="border-t border-surface-container-low bg-surface">
            <div className="page-container py-16 md:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16"
                >
                    {/* Brand */}
                    <div>
                        <p className="font-display text-2xl font-bold tracking-tight text-on-surface mb-4">
                            K-Hub
                        </p>
                        <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs font-light">
                            The deep-tech incubator and venture studio of KMIT Group of
                            Institutions. Learning by doing.
                        </p>
                        <p className="text-[0.75rem] font-body font-semibold tracking-[0.1em] uppercase text-primary mt-8 mb-5">
                            Socials
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://www.instagram.com/khubmedialabs/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="K-Hub on Instagram"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant transition-colors duration-300 hover:text-primary"
                            >
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="3" width="18" height="18" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/company/khubofficial/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="K-Hub on LinkedIn"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant transition-colors duration-300 hover:text-primary"
                            >
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="currentColor"
                                >
                                    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3.5 9h3v11h-3V9zM9 9h2.9v1.6h.05c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.6 2.01 3.6 4.62V20h-3v-5.3c0-1.26-.02-2.88-1.76-2.88-1.77 0-2.04 1.38-2.04 2.8V20H9V9z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <p className="text-[0.75rem] font-body font-semibold tracking-[0.1em] uppercase text-primary mb-5">
                            Quick Links
                        </p>
                        <ul className="space-y-3">
                            {[
                                { label: "About", href: "/about" },
                                { label: "Paradigms", href: "#domains" },
                                { label: "Programs", href: "#programs" },
                                { label: "Contact", href: "/contact" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => {
                                            if (link.href.startsWith("#")) {
                                                e.preventDefault();
                                                document
                                                    .querySelector(link.href)
                                                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                                            }
                                        }}
                                        className="text-sm text-on-surface-variant hover:text-primary transition-colors duration-300 font-light"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-[0.75rem] font-body font-semibold tracking-[0.1em] uppercase text-primary mb-5">
                            Contact
                        </p>
                        <div className="space-y-3 text-sm text-on-surface-variant font-light">
                            <p>
                                SY No 32/A & 32/E2, Near NGIT College,
                                <br />
                                Uppal, Hyderabad, Telangana&nbsp;–&nbsp;500088
                            </p>
                            <p>
                                <a
                                    href="tel:+919052906665"
                                    className="hover:text-primary transition-colors duration-300"
                                >
                                    +91 9052906665
                                </a>
                            </p>
                            <p>
                                <a
                                    href="mailto:komurojusairaudhran@gmail.com"
                                    className="hover:text-primary transition-colors duration-300"
                                >
                                    komurojusairaudhran@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Location Map */}
                    <div>
                        <p className="text-[0.75rem] font-body font-semibold tracking-widest uppercase text-primary mb-5">
                            Find Us
                        </p>
                        <div className="overflow-hidden rounded-xl border border-surface-container-low bg-surface-container-lowest">
                            <iframe
                                title="K-Hub location"
                                src="https://www.google.com/maps/embed?origin=mfe&pb=!1m12!1m8!1m3!1d3807.3678507970926!2d78.6214986!3d17.3941203!3m2!1i1024!2i768!4f13.1!2m1!1sTeleparadigm+Towers!6i17"

                                className="w-full h-40"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <a
                            href={mapsShareUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-3 text-xs text-on-surface-variant hover:text-primary transition-colors duration-300 font-light"
                        >
                            Open in Google Maps
                        </a>
                    </div>
                </motion.div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-on-surface-variant/60 font-light">
                        © {new Date().getFullYear()} K-Hub. All rights reserved.
                    </p>
                    <p className="text-xs text-on-surface-variant/50 font-light">
                        Deep-Tech Innovation Hub
                    </p>
                </div>
            </div>
        </footer>
    );
}
