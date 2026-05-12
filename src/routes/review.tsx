import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/shell";
import { useState } from "react";
import { motion } from "framer-motion";
import { RUBRIC, SUBMISSIONS } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight, Sparkles, RefreshCw, FileCheck2, MessageSquareText, ArrowRight, Brain } from "lucide-react";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Review Submission — Grading.AI" }] }),
  component: Review,
});

function Review() {
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState(RUBRIC.map(r => r.score));
  const sub = SUBMISSIONS[idx];
  const total = scores.reduce((a, b) => a + b, 0);
  const max = RUBRIC.reduce((a, b) => a + b.max, 0);

  return (
    <AppShell title={`Review · ${sub.student}`} subtitle={`${sub.file} · Confidence ${sub.confidence}%`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => setIdx(Math.max(0, idx - 1))} className="size-9 rounded-xl border border-border bg-card grid place-items-center hover:bg-accent"><ChevronLeft className="size-4" /></button>
          <div className="text-sm font-medium px-3 py-2 rounded-xl bg-card border border-border">{idx + 1} of {SUBMISSIONS.length}</div>
          <button onClick={() => setIdx(Math.min(SUBMISSIONS.length - 1, idx + 1))} className="size-9 rounded-xl border border-border bg-card grid place-items-center hover:bg-accent"><ChevronRight className="size-4" /></button>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm hover:bg-accent"><RefreshCw className="size-4" /> Re-run AI</button>
          <Link to="/feedback" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant"><FileCheck2 className="size-4" /> Approve & Send</Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px_340px] gap-4">
        {/* Left: Submission preview */}
        <div className="rounded-2xl bg-card border border-border shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
            <div className="text-sm font-semibold">{sub.file}</div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-success/15 text-success">OCR · 99% accuracy</span>
          </div>
          <div className="p-6 bg-background h-[640px] overflow-y-auto scrollbar-thin space-y-4 text-sm leading-relaxed">
            <div className="text-center font-display text-lg font-bold">Newton's Laws of Motion</div>
            <div className="text-center text-xs text-muted-foreground">Submitted by {sub.student}</div>
            <p><strong>Q1.</strong> State Newton's three laws of motion and provide one real-world example for each.</p>
            <div className="pl-4 border-l-2 border-primary/40 space-y-2">
              <p><strong>First Law (Inertia):</strong> An object will remain at rest or in uniform motion unless acted upon by an external force. Example: A book on a table stays put until someone pushes it.</p>
              <p><strong>Second Law:</strong> The acceleration of an object is directly proportional to the net force and inversely proportional to its mass. <span className="bg-warning/20">F = ma. </span>Example: Pushing a shopping cart — heavier carts need more force.</p>
              <p><strong>Third Law:</strong> For every action there is an <span className="bg-destructive/20">equal and opposite reaction</span>. Example: When you jump, you push the earth down and it pushes you up. <span className="bg-warning/20 italic">[AI note: example slightly imprecise — student should specify equal-magnitude force]</span></p>
            </div>
            <p className="mt-4"><strong>Q2.</strong> Explain why a person sitting in a moving bus lurches forward when the bus stops suddenly.</p>
            <p className="pl-4 border-l-2 border-primary/40">Due to inertia (First Law), the body tends to continue its forward motion even though the bus has stopped. This is why we lurch forward — our body resists the change in motion.</p>
            <p className="text-muted-foreground italic text-xs pt-4">— continues for 3 more pages —</p>
          </div>
        </div>

        {/* Center: Rubric */}
        <div className="rounded-2xl bg-card border border-border shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Rubric Scoring</h3>
            <div className="text-right">
              <div className="text-2xl font-bold text-gradient">{total}<span className="text-sm text-muted-foreground">/{max}</span></div>
              <div className="text-[10px] text-muted-foreground uppercase">Total</div>
            </div>
          </div>
          <div className="space-y-4">
            {RUBRIC.map((r, i) => (
              <div key={r.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{r.name}</div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-mono">{r.conf}% conf</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="range" min={0} max={r.max} value={scores[i]} onChange={(e) => { const c = [...scores]; c[i] = +e.target.value; setScores(c); }} className="flex-1 accent-primary" />
                  <div className="flex items-center gap-1 text-sm font-mono w-20 justify-end">
                    <input type="number" value={scores[i]} onChange={(e) => { const c = [...scores]; c[i] = +e.target.value; setScores(c); }} className="w-12 px-2 py-1 rounded-lg border border-border bg-background text-center" />
                    <span className="text-muted-foreground">/{r.max}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-1.5 py-0.5 rounded bg-muted">AI: {r.ai}</span>
                  <span className="px-1.5 py-0.5 rounded bg-secondary/30 text-secondary-foreground">Final: {scores[i]}</span>
                  {scores[i] !== r.ai && <span className="text-warning">overridden</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-border">
            <div className="text-xs text-muted-foreground">AI vs Final</div>
            <div className="flex items-end gap-3 mt-1">
              <div><div className="text-xs text-muted-foreground">AI</div><div className="text-xl font-bold">{RUBRIC.reduce((s, r) => s + r.ai, 0)}</div></div>
              <ArrowRight className="size-4 text-muted-foreground mb-1" />
              <div><div className="text-xs text-muted-foreground">Teacher</div><div className="text-xl font-bold text-gradient">{total}</div></div>
            </div>
          </div>
        </div>

        {/* Right: AI feedback */}
        <div className="rounded-2xl bg-card border border-border shadow-card p-5 space-y-4">
          <div className="flex items-center gap-2"><Sparkles className="size-4 text-primary" /><h3 className="font-bold">AI Feedback</h3></div>
          <div className="space-y-3 max-h-[420px] overflow-y-auto scrollbar-thin pr-1">
            {RUBRIC.map((r) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-accent/40 border border-border">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold">{r.name}</div>
                  <div className="text-[10px] text-muted-foreground">{r.conf}%</div>
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">{r.note}</div>
              </motion.div>
            ))}
          </div>
          <div>
            <label className="text-xs font-semibold flex items-center gap-1.5 mb-1.5"><MessageSquareText className="size-3.5" /> Teacher note</label>
            <textarea defaultValue="Strong overall. Revise Newton's 3rd Law example with equal-magnitude framing." rows={3} className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2 resize-none" />
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border">
            <div className="flex items-center gap-2 mb-1.5"><Brain className="size-3.5 text-primary" /><div className="text-xs font-semibold">AI Suggestion</div></div>
            <div className="text-xs text-muted-foreground">Recommend reading materials on Newton's Third Law (Chapter 5) to address conceptual gap.</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
