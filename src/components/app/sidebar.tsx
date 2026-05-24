import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, ClipboardList, GraduationCap, Settings, LogOut, PanelLeftClose, PanelLeft,
} from "lucide-react";
import { Logo } from "./logo";
import { clearToken } from "@/lib/auth";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/student", label: "Students", icon: GraduationCap },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  function handleLogout() {
    clearToken();
    navigate({ to: "/login" });
  }

  return (
    <aside
      className={cn(
        "hidden md:flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar h-screen sticky top-0 transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo + collapse toggle */}
      <div className={cn("flex items-center border-b border-sidebar-border", collapsed ? "justify-center px-2 py-5" : "justify-between px-5 py-5")}>
        {!collapsed && <Logo size="default" className="text-sidebar-foreground" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="size-8 rounded-md grid place-items-center text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition cursor-pointer"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>
      </div>

      {/* Nav items */}
      <nav className={cn("flex-1 py-3 space-y-0.5 overflow-y-auto scrollbar-thin", collapsed ? "px-1.5" : "px-2")}>
        {nav.map((item) => {
          const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to));
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              title={collapsed ? item.label : undefined}
              className={cn(
                "relative flex items-center text-sm font-medium transition-all rounded-md",
                collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-4 py-2.5",
                active
                  ? "text-sidebar-foreground bg-sidebar-accent border-l-[3px] border-l-primary"
                  : "text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent border-l-[3px] border-l-transparent"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className={cn("pb-4 pt-3 border-t border-sidebar-border", collapsed ? "px-1.5" : "px-2")}>
        <button
          onClick={handleLogout}
          title={collapsed ? "Sign out" : undefined}
          className={cn(
            "w-full flex items-center rounded-md text-sm text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition cursor-pointer",
            collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-4 py-2.5"
          )}
        >
          <LogOut className="size-4 shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
