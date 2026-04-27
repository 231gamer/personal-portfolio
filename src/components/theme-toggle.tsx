"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const effectiveTheme = useMemo(() => {
    if (!mounted) return "light";
    if (theme === "system") return resolvedTheme || "light";
    return theme;
  }, [mounted, theme, resolvedTheme]);

  const isDark = effectiveTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <div className="relative h-9 w-16 rounded-full bg-slate-100/90 dark:bg-white/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <Sun size={14} className="text-slate-500 dark:text-slate-400" />
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative h-9 w-16 rounded-full border border-slate-200/80 bg-slate-100/90 px-1.5 transition duration-300 hover:bg-slate-200/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2EC4B6]/30 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/15"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 flex items-center justify-between px-1.5 text-slate-500 dark:text-slate-300">
        <Sun size={12} className={isDark ? "opacity-30" : "opacity-100"} />
        <Moon size={12} className={isDark ? "opacity-100" : "opacity-30"} />
      </div>

      <motion.div
        className="absolute top-0.5 h-7 w-7 rounded-full bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-white/10 flex items-center justify-center"
        animate={{ x: isDark ? 34 : 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {isDark ? (
          <Moon size={10} className="text-[#2EC4B6]" />
        ) : (
          <Sun size={10} className="text-[#2EC4B6]" />
        )}
      </motion.div>
    </button>
  );
}
