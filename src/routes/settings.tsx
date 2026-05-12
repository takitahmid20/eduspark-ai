import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/shell";
import { Building2, Bell, Sparkles, Palette } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — Grading.AI" }] }),
  component: Settings,
});

function Settings() {
  return (
    <AppShell title="Profile & Settings" subtitle="Customize your grading experience">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6 max-w-5xl">
        <aside className="space-y-1">
          {[
            { icon: Building2, l: "Profile" },
            { icon: Sparkles, l: "AI Preferences" },
            { icon: Bell, l: "Notifications" },
            { icon: Palette, l: "Appearance" },
          ].map((s, i) => (
            <button key={s.l} className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${i===0?'bg-gradient-primary text-primary-foreground shadow-elegant':'hover:bg-accent'}`}>
              <s.icon className="size-4" /> {s.l}
            </button>
          ))}
        </aside>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
            <h3 className="font-bold mb-4">Profile</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="size-16 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground text-xl font-bold">MH</div>
              <div>
                <div className="font-bold">Prof. Mahmud Hasan</div>
                <div className="text-sm text-muted-foreground">teacher@edubd.ai</div>
              </div>
              <button className="ml-auto px-3 py-2 rounded-xl border border-border text-sm hover:bg-accent">Change avatar</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { l: "Institution", v: "BRAC University" },
                { l: "Department", v: "Computer Science" },
                { l: "Designation", v: "Associate Professor" },
                { l: "Phone", v: "+880 1700 000000" },
              ].map((f) => (
                <div key={f.l}>
                  <label className="text-xs font-medium text-muted-foreground">{f.l}</label>
                  <input defaultValue={f.v} className="mt-1 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
            <h3 className="font-bold mb-4">AI Preferences</h3>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium">Preferred grading style</label>
                <select className="mt-1.5 w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm">
                  <option>Strict — penalize all errors</option>
                  <option>Balanced — focus on understanding</option>
                  <option>Encouraging — emphasize strengths</option>
                </select>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-2"><span>AI Sensitivity</span><span className="font-mono text-primary">75%</span></div>
                <input type="range" defaultValue={75} className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>Lenient</span><span>Strict</span></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium mb-2"><span>Auto-flag confidence threshold</span><span className="font-mono text-primary">75%</span></div>
                <input type="range" defaultValue={75} className="w-full accent-primary" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
            <h3 className="font-bold mb-4">Notifications</h3>
            {["Email me when AI grading completes","Notify on at-risk student detection","Weekly performance summary","Marketing updates"].map((t,i) => (
              <label key={t} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <span className="text-sm">{t}</span>
                <input type="checkbox" defaultChecked={i<3} className="accent-primary size-4" />
              </label>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
