import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AppShell } from "@/components/app/shell";
import { ASSIGNMENTS, SUBMISSIONS, WEEKLY_ACTIVITY, WEAK_TOPICS, IMPROVEMENT } from "@/lib/mock-data";
import { Plus, Upload, Sparkles, Download, TrendingUp, AlertTriangle, FileCheck2, Brain, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Grading.AI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { label: "Total Submissions", value: "248", trend: "+12%", icon: FileCheck2, color: "primary" },
    { label: "AI Graded Today", value: "67", trend: "+24%", icon: Sparkles, color: "secondary" },
    { label: "Avg Class Score", value: "82%", trend: "+3.2%", icon: TrendingUp, color: "success" },
    { label: "Pending Review", value: "12", trend: "-5", icon: AlertTriangle, color: "warning" },
    { label: "Avg Confidence", value: "91%", trend: "+1.4%", icon: Brain, color: "primary" },
  ];

  return (
    <AppShell title="Welcome back, Prof. Mahmud" subtitle="Here's what's happening in your classes today">
      {/* Quick actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link to="/assignments" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-elegant hover:shadow-glow transition"><Plus className="size-4" /> Create Assignment</Link>
        <Link to="/upload" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium hover:bg-accent transition"><Upload className="size-4" /> Upload Submissions</Link>
        <Link to="/grading" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium hover:bg-accent transition"><Sparkles className="size-4" /> Generate AI Review</Link>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium hover:bg-accent transition"><Download className="size-4" /> Export Report</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition">
            <div className="flex items-center justify-between mb-3">
              <div className={`size-9 rounded-lg grid place-items-center ${s.color === 'success' ? 'bg-success/15 text-success' : s.color === 'warning' ? 'bg-warning/15 text-warning' : s.color === 'secondary' ? 'bg-secondary/30 text-secondary-foreground' : 'bg-primary/15 text-primary'}`}>
                <s.icon className="size-4" />
              </div>
              <span className={`text-xs font-medium ${s.trend.startsWith('-') && s.label !== 'Pending Review' ? 'text-destructive' : 'text-success'}`}>{s.trend}</span>
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-card border border-border shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold">Weekly Grading Activity</h3>
              <p className="text-xs text-muted-foreground">AI-graded vs manually reviewed</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" /> AI</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-secondary" /> Manual</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={WEEKLY_ACTIVITY}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.58 0.22 295)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.58 0.22 295)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.86 0.18 120)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="oklch(0.86 0.18 120)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.005 270)" vertical={false} />
              <XAxis dataKey="day" stroke="oklch(0.5 0.02 270)" fontSize={12} axisLine={false} tickLine={false} />
              <YAxis stroke="oklch(0.5 0.02 270)" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="graded" stroke="oklch(0.58 0.22 295)" strokeWidth={2} fill="url(#g1)" />
              <Area type="monotone" dataKey="manual" stroke="oklch(0.7 0.18 120)" strokeWidth={2} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="font-bold mb-1">Weak Topics</h3>
          <p className="text-xs text-muted-foreground mb-4">Avg score per topic</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={WEAK_TOPICS} layout="vertical" margin={{ left: 0 }}>
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis type="category" dataKey="topic" stroke="oklch(0.5 0.02 270)" fontSize={11} axisLine={false} tickLine={false} width={120} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="score" fill="oklch(0.58 0.22 295)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-card border border-border shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Recent Assignments</h3>
            <Link to="/assignments" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">View all <ArrowUpRight className="size-3" /></Link>
          </div>
          <div className="space-y-3">
            {ASSIGNMENTS.slice(0, 4).map((a) => (
              <Link key={a.id} to="/review" className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-accent transition">
                <div className="size-10 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground text-xs font-bold">{a.subject.slice(0, 2).toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.subject} · {a.submissions}/{a.total} submitted</div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1">
                  <div className="text-xs text-muted-foreground">AI Progress</div>
                  <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-gradient-primary" style={{ width: `${a.aiProgress}%` }} /></div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${a.status === 'Reviewed' ? 'bg-success/15 text-success' : a.status === 'Grading' ? 'bg-primary/15 text-primary' : 'bg-warning/15 text-warning'}`}>{a.status}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
          <h3 className="font-bold mb-1">Improvement Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Class average · 7 weeks</p>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={IMPROVEMENT}>
              <XAxis dataKey="week" stroke="oklch(0.5 0.02 270)" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis hide domain={[50, 100]} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="avg" stroke="oklch(0.58 0.22 295)" strokeWidth={3} dot={{ fill: "oklch(0.58 0.22 295)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-secondary/20 to-transparent border border-border">
            <div className="text-xs text-muted-foreground">AI Insight</div>
            <div className="text-sm font-semibold mt-1">Class avg up 19 points since W1 — keep emphasizing problem-based learning.</div>
          </div>
          <div className="mt-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Pending Reviews</h4>
            {SUBMISSIONS.filter(s => s.status === "Review").slice(0,3).map((s) => (
              <Link to="/review" key={s.id} className="flex items-center gap-2 py-2 text-sm hover:text-primary transition">
                <div className="size-7 rounded-full bg-accent grid place-items-center text-xs font-semibold">{s.student.split(" ").map(n=>n[0]).join("")}</div>
                <span className="flex-1 truncate">{s.student}</span>
                <span className="text-xs text-warning">{s.confidence}%</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
