import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/shell";
import { motion } from "framer-motion";
import { RUBRIC } from "@/lib/mock-data";
import { Award, Download, Share2, Sparkles, BookOpen, TrendingUp, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/feedback")({
  head: () => ({ meta: [{ title: "Feedback Report — Grading.AI" }] }),
  component: Feedback,
});

function Feedback() {
  const total = RUBRIC.reduce((s, r) => s + r.score, 0);
  const max = RUBRIC.reduce((s, r) => s + r.max, 0);
  const pct = Math.round((total / max) * 100);

  return (
    <AppShell title="Feedback Report" subtitle="Newton's Laws · Rahim Ahmed">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6 max-w-6xl">
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-elegant">
            <div className="absolute inset-0 bg-mesh opacity-30" />
            <div className="relative flex items-center gap-6">
              <div className="size-24 rounded-full bg-card/20 backdrop-blur grid place-items-center">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold">{pct}%</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-80">Grade</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest opacity-80">Final Score</div>
                <div className="text-4xl font-display font-bold mt-1">{total} <span className="text-2xl opacity-70">/ {max}</span></div>
                <div className="flex items-center gap-2 mt-2">
                  <Award className="size-4" />
                  <span className="text-sm">Excellent work — top 20% of class</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="size-10 rounded-xl bg-card/20 backdrop-blur grid place-items-center hover:bg-card/30 transition"><Download className="size-4" /></button>
                <button className="size-10 rounded-xl bg-card/20 backdrop-blur grid place-items-center hover:bg-card/30 transition"><Share2 className="size-4" /></button>
              </div>
            </div>
          </motion.div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
            <h3 className="font-bold mb-4">Rubric Breakdown</h3>
            <div className="space-y-4">
              {RUBRIC.map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-semibold">{r.name}</span>
                    <span className="font-mono">{r.score}/{r.max}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(r.score/r.max)*100}%` }} transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }} className="h-full bg-gradient-primary" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1.5">{r.note}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-3"><MessageCircle className="size-4 text-primary" /><h3 className="font-bold">Teacher's Comments</h3></div>
            <p className="text-sm leading-relaxed">Strong understanding of Newton's First and Second Laws. Your real-world examples were clear and well-explained. For the Third Law, remember to emphasize that the action and reaction forces are equal in <em>magnitude</em>, not just opposite. Keep up the excellent essay structure!</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <div className="size-7 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-bold">MH</div>
              <span>Prof. Mahmud Hasan · BRAC University</span>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-border">
            <div className="flex items-center gap-2 mb-3"><Sparkles className="size-4 text-primary" /><h3 className="font-bold">AI Insights</h3></div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase">Strengths</div>
                <ul className="mt-1 space-y-1 text-sm">
                  <li>✓ Clear essay structure</li>
                  <li>✓ Strong grammar (95% conf)</li>
                  <li>✓ Logical First Law explanation</li>
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-muted-foreground uppercase">Improve</div>
                <ul className="mt-1 space-y-1 text-sm">
                  <li>• Newton's 3rd Law precision</li>
                  <li>• Add diagrams for forces</li>
                  <li>• Counter-example analysis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-3"><BookOpen className="size-4 text-primary" /><h3 className="font-bold">Suggested Study</h3></div>
            <div className="space-y-2">
              {[
                { t: "Newton's 3rd Law deep dive", time: "12 min read" },
                { t: "Free body diagrams basics", time: "8 min video" },
                { t: "Practice set: Forces & Motion", time: "20 questions" },
              ].map((s) => (
                <Link to="/student" key={s.t} className="block p-3 rounded-xl border border-border hover:bg-accent transition">
                  <div className="text-sm font-semibold">{s.t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.time}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-3"><TrendingUp className="size-4 text-success" /><h3 className="font-bold">Your Progress</h3></div>
            <div className="text-3xl font-bold text-gradient">+14<span className="text-base text-muted-foreground"> pts</span></div>
            <div className="text-xs text-muted-foreground">vs your last assignment</div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
