import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/shell";
import { motion } from "framer-motion";
import { Trophy, Flame, TrendingUp, BookOpen, Award, Target, Sparkles } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { IMPROVEMENT } from "@/lib/mock-data";

export const Route = createFileRoute("/student")({
  head: () => ({ meta: [{ title: "Student Portal — Grading.AI" }] }),
  component: StudentPortal,
});

const HISTORY = [
  { t: "Newton's Laws of Motion", s: "Physics", score: 87, date: "Today" },
  { t: "Argumentative Essay – Climate", s: "English", score: 92, date: "2 days ago" },
  { t: "Linear Algebra Set 3", s: "Math", score: 78, date: "1 week ago" },
  { t: "Bangla Rachana – দেশপ্রেম", s: "Bangla", score: 85, date: "1 week ago" },
];

function StudentPortal() {
  return (
    <AppShell title="Welcome, Rahim" subtitle="Class XII · BRAC University">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-4">
          {/* Hero */}
          <div className="grid sm:grid-cols-3 gap-4">
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} className="p-5 rounded-2xl bg-gradient-hero text-primary-foreground shadow-elegant col-span-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-mesh opacity-30" />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest opacity-80">Improvement Meter</div>
                <div className="flex items-end gap-3 mt-2">
                  <div className="text-5xl font-display font-bold">+19%</div>
                  <div className="text-sm opacity-80 mb-2">since term start</div>
                </div>
                <div className="mt-4 h-2 bg-card/20 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.2 }} className="h-full bg-secondary" />
                </div>
                <div className="mt-3 text-xs opacity-80">You're outperforming 78% of your class. Keep going!</div>
              </div>
            </motion.div>
            <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
              <div className="flex items-center gap-2 mb-2"><Flame className="size-5 text-warning" /><div className="text-xs uppercase tracking-widest text-muted-foreground">Streak</div></div>
              <div className="text-4xl font-display font-bold">12 <span className="text-lg text-muted-foreground">days</span></div>
              <div className="text-xs text-muted-foreground mt-2">Submit today to keep it alive 🔥</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Recent Feedback</h3>
              <Link to="/feedback" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="space-y-2">
              {HISTORY.map((h) => (
                <Link to="/feedback" key={h.t} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-accent transition">
                  <div className="size-10 rounded-lg bg-gradient-primary grid place-items-center text-primary-foreground text-xs font-bold">{h.s.slice(0,2).toUpperCase()}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{h.t}</div>
                    <div className="text-xs text-muted-foreground">{h.s} · {h.date}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${h.score >= 85 ? 'text-success' : h.score >= 70 ? 'text-primary' : 'text-warning'}`}>{h.score}</div>
                    <div className="text-[10px] text-muted-foreground">/ 100</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <h3 className="font-bold mb-1">Improvement Trend</h3>
            <p className="text-xs text-muted-foreground mb-4">Your scores over 7 weeks</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={IMPROVEMENT}>
                <XAxis dataKey="week" stroke="oklch(0.5 0.02 270)" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis hide domain={[50, 100]} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="avg" stroke="oklch(0.58 0.22 295)" strokeWidth={3} dot={{ fill: "oklch(0.58 0.22 295)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-3"><Trophy className="size-4 text-warning" /><h3 className="font-bold">Badges</h3></div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Award, label: "Top 20%", c: "from-warning to-secondary" },
                { icon: Flame, label: "10-day", c: "from-destructive to-warning" },
                { icon: TrendingUp, label: "Riser", c: "from-success to-secondary" },
                { icon: Target, label: "Sharp", c: "from-primary to-primary-glow" },
                { icon: BookOpen, label: "Reader", c: "from-accent to-primary" },
                { icon: Sparkles, label: "AI Star", c: "from-primary to-secondary" },
              ].map((b) => (
                <div key={b.label} className="text-center">
                  <div className={`size-12 mx-auto rounded-2xl bg-gradient-to-br ${b.c} grid place-items-center text-primary-foreground shadow-elegant`}>
                    <b.icon className="size-5" />
                  </div>
                  <div className="text-[10px] mt-1 font-medium">{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-border">
            <div className="flex items-center gap-2 mb-3"><Sparkles className="size-4 text-primary" /><h3 className="font-bold">AI Study Plan</h3></div>
            <div className="space-y-2">
              {[
                "Newton's 3rd Law — 12 min",
                "Free body diagrams — 8 min",
                "Practice: Forces (20 Q)",
              ].map((s) => (
                <div key={s} className="p-3 rounded-xl bg-card border border-border text-sm">{s}</div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <h3 className="font-bold mb-3">Weak Topics</h3>
            <div className="space-y-2 text-sm">
              {[{t:"Newton's 3rd Law", s:58}, {t:"Algebra", s:62}, {t:"Conclusions", s:71}].map((w) => (
                <div key={w.t}>
                  <div className="flex justify-between mb-1"><span>{w.t}</span><span className="font-mono text-warning">{w.s}%</span></div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-warning" style={{ width: `${w.s}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
