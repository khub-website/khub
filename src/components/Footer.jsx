"use client";

import { motion } from "framer-motion";

export default function Footer() {
    const mapsShareUrl = "https://share.google/VactTMVzldUcG9lxT";

    return (
        <footer id="contact" className="border-t border-surface-container-low bg-surface">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16 md:py-20">
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
                                    href="mailto:pratham@k-hub.org.in"
                                    className="hover:text-primary transition-colors duration-300"
                                >
                                    pratham@k-hub.org.in
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
                                src="https://maps.google.com/maps?q=SY%20No%2032%2FA%20%26%2032%2FE2%2C%20Near%20NGIT%20College%2C%20Uppal%2C%20Hyderabad%2C%20Telangana%20500088&z=15&output=embed"
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
