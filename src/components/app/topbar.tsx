import { Link } from "@tanstack/react-router";
import { Bell, Search, Sparkles, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="flex items-center gap-4 px-6 py-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold leading-tight truncate">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle}</p>}
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card w-72">
          <Search className="size-4 text-muted-foreground" />
          <input placeholder="Search students, assignments…" className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground" />
          <kbd className="text-[10px] text-muted-foreground border border-border rounded px-1.5">⌘K</kbd>
        </div>
        <button onClick={() => setDark((d) => !d)} className="size-10 rounded-xl border border-border bg-card grid place-items-center hover:bg-accent transition">
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
        <Link to="/notifications" className="relative size-10 rounded-xl border border-border bg-card grid place-items-center hover:bg-accent transition">
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-secondary" />
        </Link>
        <Link to="/grading" className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-elegant hover:shadow-glow transition-all">
          <Sparkles className="size-4" /> AI Assist
        </Link>
      </div>
    </header>
  );
}
