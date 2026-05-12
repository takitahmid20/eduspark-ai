import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/shell";
import { NOTIFICATIONS } from "@/lib/mock-data";
import { Sparkles, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Grading.AI" }] }),
  component: Notifications,
});

function iconFor(t: string) {
  if (t === "success") return { Icon: CheckCircle2, c: "text-success bg-success/15" };
  if (t === "warning") return { Icon: AlertTriangle, c: "text-warning bg-warning/15" };
  return { Icon: Info, c: "text-primary bg-primary/15" };
}

function Notifications() {
  return (
    <AppShell title="Notifications" subtitle="Stay on top of your classes">
      <div className="max-w-3xl space-y-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            {["All","Unread","Mentions"].map((t,i) => (
              <button key={t} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${i===0?'bg-gradient-primary text-primary-foreground':'border border-border hover:bg-accent'}`}>{t}</button>
            ))}
          </div>
          <button className="text-sm text-primary hover:underline">Mark all read</button>
        </div>
        {NOTIFICATIONS.map((n) => {
          const { Icon, c } = iconFor(n.type);
          return (
            <div key={n.id} className="flex gap-3 p-4 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition">
              <div className={`size-10 rounded-xl grid place-items-center ${c}`}><Icon className="size-4" /></div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{n.title}</div>
                <div className="text-sm text-muted-foreground">{n.body}</div>
                <div className="text-xs text-muted-foreground mt-1">{n.time}</div>
              </div>
              <button className="text-xs text-primary hover:underline">View</button>
            </div>
          );
        })}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-border flex items-center gap-4">
          <Sparkles className="size-6 text-primary" />
          <div className="flex-1">
            <div className="font-semibold">All caught up!</div>
            <div className="text-sm text-muted-foreground">You're up to date with everything.</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
