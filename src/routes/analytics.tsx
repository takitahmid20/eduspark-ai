import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/shell";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, RadialBarChart, RadialBar, XAxis, YAxis, Tooltip, CartesianGrid, PolarAngleAxis } from "recharts";
import { WEAK_TOPICS, IMPROVEMENT, WEEKLY_ACTIVITY } from "@/lib/mock-data";
import { AlertTriangle, TrendingUp, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Grading.AI" }] }),
  component: Analytics,
});

const RUBRIC_PERF = [{ name: "Concept", v: 78, fill: "oklch(0.58 0.22 295)" }, { name: "Structure", v: 84, fill: "oklch(0.7 0.2 295)" }, { name: "Thinking", v: 71, fill: "oklch(0.78 0.16 75)" }, { name: "Grammar", v: 89, fill: "oklch(0.7 0.17 155)" }];
const RISK = [
  { n: "Farhan Ahmed", c: "Notre Dame", s: 58, drop: -12 },
  { n: "Mim Akter", c: "Ideal School", s: 62, drop: -8 },
  { n: "Tanvir Hasan", c: "UIU", s: 65, drop: -6 },
];

function Analytics() {
  return (
    <AppShell title="Analytics" subtitle="Class insights · HSC Physics · Term 2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { l: "Class Average", v: "82%", t: "+3.2%", icon: TrendingUp, c: "success" },
          { l: "At-Risk Students", v: "6", t: "-2", icon: AlertTriangle, c: "warning" },
          { l: "Active Students", v: "48", t: "+4", icon: Users, c: "primary" },
          { l: "AI Accuracy", v: "94%", t: "+1.4%", icon: Sparkles, c: "primary" },
        ].map((s) => (
          <div key={s.l} className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <div className="flex items-center justify-between mb-2">
              <div className={`size-9 rounded-lg grid place-items-center ${s.c==='success'?'bg-success/15 text-success':s.c==='warning'?'bg-warning/15 text-warning':'bg-primary/15 text-primary'}`}><s.icon className="size-4" /></div>
              <span className="text-xs text-success font-medium">{s.t}</span>
            </div>
            <div className="text-3xl font-bold">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="font-bold mb-1">Submission Trends</h3>
          <p className="text-xs text-muted-foreground mb-4">Weekly submissions vs reviews</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={WEEKLY_ACTIVITY}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.92 0.005 270)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} stroke="oklch(0.5 0.02 270)" />
              <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="oklch(0.5 0.02 270)" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="graded" fill="oklch(0.58 0.22 295)" radius={[6,6,0,0]} />
              <Bar dataKey="manual" fill="oklch(0.86 0.18 120)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="font-bold mb-1">Rubric Performance</h3>
          <p className="text-xs text-muted-foreground mb-4">Avg score per criterion</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart innerRadius="30%" outerRadius="100%" data={RUBRIC_PERF} startAngle={90} endAngle={-270}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background dataKey="v" cornerRadius={10} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            {RUBRIC_PERF.map((r) => (
              <div key={r.name} className="flex items-center gap-1.5"><span className="size-2 rounded-full" style={{ background: r.fill }} /><span>{r.name}: <span className="font-semibold">{r.v}%</span></span></div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="font-bold mb-1">Improvement</h3>
          <p className="text-xs text-muted-foreground mb-4">Class avg over time</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={IMPROVEMENT}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} fontSize={11} stroke="oklch(0.5 0.02 270)" />
              <YAxis hide domain={[50, 100]} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="avg" stroke="oklch(0.58 0.22 295)" strokeWidth={3} dot={{ fill: "oklch(0.58 0.22 295)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="font-bold mb-3">Weak Chapters</h3>
          <div className="space-y-3">
            {WEAK_TOPICS.map((w) => (
              <div key={w.topic}>
                <div className="flex justify-between text-sm mb-1"><span>{w.topic}</span><span className="font-mono text-warning">{w.score}%</span></div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-warning" style={{ width: `${w.score}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="font-bold mb-3 flex items-center gap-2"><AlertTriangle className="size-4 text-warning" /> At-Risk Students</h3>
          <div className="space-y-2">
            {RISK.map((r) => (
              <div key={r.n} className="flex items-center gap-3 p-2 rounded-xl border border-border">
                <div className="size-8 rounded-full bg-warning/15 text-warning grid place-items-center text-xs font-bold">{r.n.split(" ").map(n=>n[0]).join("")}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{r.n}</div>
                  <div className="text-xs text-muted-foreground truncate">{r.c}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{r.s}%</div>
                  <div className="text-xs text-destructive">{r.drop}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
        <h3 className="font-bold mb-1">Topic Mastery Heatmap</h3>
        <p className="text-xs text-muted-foreground mb-4">Students × chapters · darker = stronger</p>
        <div className="overflow-x-auto">
          <div className="grid gap-1.5" style={{ gridTemplateColumns: "120px repeat(10, 1fr)", minWidth: 720 }}>
            <div></div>
            {Array.from({length:10}).map((_,i)=><div key={i} className="text-[10px] text-center text-muted-foreground">Ch {i+1}</div>)}
            {["Rahim Ahmed","Nusrat Jahan","Tanvir Hasan","Sadia Islam","Farhan Ahmed","Mim Akter","Arif Hossain","Tasnim R."].map((s, si) => (
              <React.Fragment key={s}>
                <div className="text-xs font-medium truncate">{s}</div>
                {Array.from({length:10}).map((_,i)=>{
                  const v = (Math.sin(si*7+i*3) + 1)/2;
                  return <div key={i} className="aspect-square rounded" style={{ background: `oklch(0.58 0.22 295 / ${0.08 + v * 0.85})` }} title={`${Math.round(v*100)}%`} />;
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-border text-sm">
          <span className="font-semibold">AI Insight:</span> 42% of students struggled with Algebraic Expressions (Ch 4). Average writing quality improved by 18% this term.
        </div>
      </div>
    </AppShell>
  );
}
