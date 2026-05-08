"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function useCountUp(target, duration = 1500, delay = 0) {
  const [count, setCount] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (target === 0) return;
    const timeout = setTimeout(() => {
      const animate = (timestamp) => {
        if (startRef.current === null) startRef.current = timestamp;
        const elapsed = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return count;
}

export function StatCard({ label, value, icon, delay = 0, colorClass = "text-primary" }) {
  const count = useCountUp(value, 1400, delay);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, duration: 0.5, ease: "easeOut" }}
      className="bg-surface-container-low border border-outline-variant/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1">{label}</p>
          <p className={`text-3xl font-bold tracking-tight ${colorClass}`}>{count.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-xl bg-primary/5 ${colorClass} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
