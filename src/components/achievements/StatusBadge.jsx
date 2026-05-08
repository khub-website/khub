const statusConfig = {
  published: { 
    label: "Published", 
    className: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700" 
  },
  ongoing: { 
    label: "Ongoing", 
    className: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700" 
  },
  "peer-review": { 
    label: "Peer Review", 
    className: "bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700" 
  },
  concluded: { 
    label: "Concluded", 
    className: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600" 
  },
};

export function StatusBadge({ status }) {
  const config = statusConfig[status] ?? statusConfig.concluded;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${config.className}`}>
      {config.label}
    </span>
  );
}
