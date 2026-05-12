import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/shell";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScanText, FileText, Brain, Target, MessageSquareText, Gauge, FileCheck2, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/grading")({
  head: () => ({ meta: [{ title: "AI Grading — Grading.AI" }] }),
  component: Grading,
});

const STEPS = [
  { icon: ScanText, label: "Extracting text", detail: "OCR processing handwritten Bangla & English" },
  { icon: FileText, label: "Reading rubric", detail: "Loading 4 criteria · 100% weight coverage" },
  { icon: Brain, label: "Analyzing submission", detail: "Semantic understanding of student responses" },
  { icon: Target, label: "Matching criteria", detail: "Mapping answers to rubric expectations" },
  { icon: MessageSquareText, label: "Generating feedback", detail: "Personalized comments per criterion" },
  { icon: Gauge, label: "Calculating confidence", detail: "Cross-referencing 3 evaluation passes" },
  { icon: FileCheck2, label: "Finalizing evaluation", detail: "Aggregating scores and insights" },
];

function Grading() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const allInsights = [
    "Detected weak understanding in Newton's Third Law",
    "Grammar confidence: 91%",
    "Strong conceptual flow in introduction",
    "Rubric alignment: 94%",
    "12 submissions flagged for review",
    "Average class score trending upward",
  ];

  useEffect(() => {
    if (step >= STEPS.length) { setDone(true); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1100);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (insights.length >= allInsights.length) return;
    const t = setTimeout(() => setInsights((arr) => [...arr, allInsights[arr.length]]), 900);
    return () => clearTimeout(t);
  }, [insights.length]);

  return (
    <AppShell title="AI Grading in Progress" subtitle="42 submissions · Newton's Laws of Motion">
      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-card to-secondary/5 border border-border p-8 shadow-card">
          <div className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-secondary/20 blur-3xl animate-pulse-glow" />

          {/* Neural orb */}
          <div className="relative grid place-items-center mb-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="size-32 rounded-full border-2 border-dashed border-primary/40" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute size-44 rounded-full border-2 border-dashed border-secondary/40" />
            <div className="absolute size-24 rounded-full bg-gradient-primary grid place-items-center shadow-glow">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Brain className="size-10 text-primary-foreground" />
              </motion.div>
            </div>
          </div>

          <div className="text-center mb-2">
            <div className="text-xs uppercase tracking-widest text-primary font-semibold">{done ? "Complete" : "Processing"}</div>
            <div className="text-3xl font-display font-bold mt-1">{done ? "Evaluation finalized" : STEPS[Math.min(step, STEPS.length - 1)]?.label}</div>
            <div className="text-sm text-muted-foreground mt-1">{done ? "All 42 submissions graded" : STEPS[Math.min(step, STEPS.length - 1)]?.detail}</div>
          </div>

          <div className="mt-6 max-w-md mx-auto">
            <div className="flex justify-between text-xs mb-2"><span>Overall progress</span><span className="font-mono font-semibold">{Math.min(Math.round((step / STEPS.length) * 100), 100)}%</span></div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-primary" animate={{ width: `${Math.min((step / STEPS.length) * 100, 100)}%` }} transition={{ duration: 0.5 }} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STEPS.map((s, i) => {
              const state = i < step ? "done" : i === step ? "active" : "pending";
              return (
                <div key={s.label} className={`flex items-center gap-3 p-3 rounded-xl border transition ${state === 'done' ? 'border-success/30 bg-success/5' : state === 'active' ? 'border-primary/40 bg-primary/5' : 'border-border bg-card/50'}`}>
                  <div className={`size-8 rounded-lg grid place-items-center ${state === 'done' ? 'bg-success text-success-foreground' : state === 'active' ? 'bg-gradient-primary text-primary-foreground animate-pulse-glow' : 'bg-muted text-muted-foreground'}`}>
                    {state === 'done' ? <FileCheck2 className="size-4" /> : <s.icon className="size-4" />}
                  </div>
                  <div className="text-sm font-medium">{s.label}</div>
                  {state === 'active' && <span className="ml-auto text-xs text-primary font-mono">running…</span>}
                </div>
              );
            })}
          </div>

          {done && (
            <div className="mt-8 text-center">
              <Link to="/review" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow">
                Review Results <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </div>

        <aside className="space-y-3">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-3"><Sparkles className="size-4 text-primary" /><h3 className="font-bold">Live Insights</h3></div>
            <div className="space-y-2">
              {insights.map((ins, i) => (
                <motion.div key={ins} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-2 p-3 rounded-xl bg-accent/40 border border-border text-sm">
                  <div className="size-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span>{ins}</span>
                </motion.div>
              ))}
              {insights.length < allInsights.length && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/40 border border-border text-sm text-muted-foreground">
                  <div className="flex gap-1">
                    {[0,1,2].map(i => <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} className="size-1.5 rounded-full bg-primary" />)}
                  </div>
                  AI thinking…
                </div>
              )}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <h3 className="font-bold mb-3">Live Stats</h3>
            <div className="space-y-3">
              {[
                { l: "Processed", v: `${Math.min(Math.round((step/STEPS.length)*42), 42)} / 42` },
                { l: "Avg confidence", v: "91%" },
                { l: "Avg score", v: "82.4%" },
                { l: "Flagged for review", v: "12" },
              ].map((s) => (
                <div key={s.l} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.l}</span>
                  <span className="font-mono font-semibold">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
