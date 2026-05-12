import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FileText, ClipboardList, Upload, Sparkles,
  BarChart3, GraduationCap, Settings, Bell, Brain, LogOut,
} from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/rubric", label: "Rubric Builder", icon: FileText },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/grading", label: "AI Grading", icon: Sparkles },
  { to: "/review", label: "Review", icon: Brain },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/student", label: "Student Portal", icon: GraduationCap },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="size-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
          <Sparkles className="size-5 text-primary-foreground" />
        </div>
        <div>
          <div className="font-display font-bold leading-tight">Grading.AI</div>
          <div className="text-[10px] text-muted-foreground tracking-widest uppercase">EduBD</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-thin">
        {nav.map((item) => {
          const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active ? "text-primary-foreground" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-primary shadow-elegant"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="size-4 relative z-10" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-3 pb-3 space-y-1 border-t border-sidebar-border pt-3">
        <Link to="/notifications" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent">
          <Bell className="size-4" /> Notifications <span className="ml-auto text-[10px] bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">5</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent">
          <Settings className="size-4" /> Settings
        </Link>
        <Link to="/login" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent">
          <LogOut className="size-4" /> Sign out
        </Link>
        <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-accent to-transparent border border-border">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground text-xs font-semibold">MH</div>
            <div className="text-xs">
              <div className="font-semibold">Prof. Mahmud Hasan</div>
              <div className="text-muted-foreground">BRAC University</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
