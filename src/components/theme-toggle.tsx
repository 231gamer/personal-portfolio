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
      <div className="w-14 h-7 bg-[var(--surface-muted)] rounded-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Sun size={14} className="text-[var(--muted)]" />
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-[var(--surface-muted)] rounded-full transition-colors duration-300 hover:bg-[var(--surface-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
      aria-label="Toggle theme"
    >
      {/* Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun size={12} className={`transition-opacity duration-300 ${isDark ? 'opacity-30' : 'opacity-100'}`} />
        <Moon size={12} className={`transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-30'}`} />
      </div>

      {/* Knob */}
      <motion.div
        className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center"
        animate={{ x: isDark ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {isDark ? (
          <Moon size={10} className="text-[var(--primary)]" />
        ) : (
          <Sun size={10} className="text-[var(--primary)]" />
        )}
      </motion.div>
    </button>
  );
}
