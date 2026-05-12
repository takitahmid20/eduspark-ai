import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/shell";
import { motion } from "framer-motion";
import { GripVertical, Plus, Sparkles, Trash2, Wand2, Save } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/rubric")({
  head: () => ({ meta: [{ title: "Rubric Builder — Grading.AI" }] }),
  component: RubricBuilder,
});

function RubricBuilder() {
  const [criteria, setCriteria] = useState([
    { id: 1, name: "Concept Accuracy", weight: 35, scoreMax: 35, desc: "Correctness of physics concepts and laws applied", indicator: "Identifies action-reaction pairs, applies Newton's laws correctly" },
    { id: 2, name: "Essay Structure", weight: 20, scoreMax: 20, desc: "Logical organization, intro, body, conclusion", indicator: "Clear thesis, supporting paragraphs, summary" },
    { id: 3, name: "Critical Thinking", weight: 25, scoreMax: 25, desc: "Analysis, reasoning, counter-examples", indicator: "Compares scenarios, considers edge cases" },
    { id: 4, name: "Grammar & Clarity", weight: 20, scoreMax: 20, desc: "Sentence structure, vocabulary, punctuation", indicator: "Few errors, appropriate academic tone" },
  ]);
  const total = criteria.reduce((s, c) => s + c.weight, 0);

  return (
    <AppShell title="Rubric Builder" subtitle="Newton's Laws of Motion · HSC Physics">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Total weight</div>
              <div className={`text-3xl font-bold ${total === 100 ? 'text-success' : 'text-warning'}`}>{total}%</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCriteria([...criteria, { id: Date.now(), name: "New criterion", weight: 10, scoreMax: 10, desc: "", indicator: "" }])} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm hover:bg-accent">
                <Plus className="size-4" /> Add Criterion
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant">
                <Save className="size-4" /> Save Rubric
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {criteria.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition">
                <div className="flex items-start gap-3">
                  <button className="mt-1 cursor-grab text-muted-foreground hover:text-foreground"><GripVertical className="size-4" /></button>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <input value={c.name} onChange={(e) => setCriteria(criteria.map(x => x.id === c.id ? { ...x, name: e.target.value } : x))} className="flex-1 text-lg font-bold bg-transparent outline-none border-b border-transparent focus:border-primary py-1" />
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-muted-foreground">Weight</span>
                        <input type="number" value={c.weight} onChange={(e) => setCriteria(criteria.map(x => x.id === c.id ? { ...x, weight: +e.target.value } : x))} className="w-14 px-2 py-1 rounded-lg border border-border bg-background text-center font-mono" />
                        <span className="text-muted-foreground">%</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-muted-foreground">Max</span>
                        <input type="number" value={c.scoreMax} onChange={(e) => setCriteria(criteria.map(x => x.id === c.id ? { ...x, scoreMax: +e.target.value } : x))} className="w-14 px-2 py-1 rounded-lg border border-border bg-background text-center font-mono" />
                      </div>
                      <button onClick={() => setCriteria(criteria.filter(x => x.id !== c.id))} className="size-8 grid place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"><Trash2 className="size-4" /></button>
                    </div>
                    <textarea value={c.desc} onChange={(e) => setCriteria(criteria.map(x => x.id === c.id ? { ...x, desc: e.target.value } : x))} placeholder="Description for AI evaluation…" rows={2} className="w-full text-sm bg-background border border-border rounded-xl px-3 py-2 resize-none" />
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-accent/40 border border-border">
                      <Sparkles className="size-4 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="text-xs font-semibold mb-1">AI Evaluation Instructions</div>
                        <input value={c.indicator} onChange={(e) => setCriteria(criteria.map(x => x.id === c.id ? { ...x, indicator: e.target.value } : x))} className="w-full text-sm bg-transparent outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border border-border shadow-card">
            <div className="flex items-center gap-2 mb-3"><Wand2 className="size-4 text-primary" /><h3 className="font-bold">AI Suggestions</h3></div>
            <p className="text-xs text-muted-foreground mb-4">Based on similar HSC Physics rubrics</p>
            <div className="space-y-2">
              {[
                "Add 'Diagram Quality' (10%) — common for physics essays",
                "Increase 'Critical Thinking' to 30% — better for HSC standards",
                "Add example answer for grammar criteria",
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="p-3 rounded-xl bg-card border border-border text-xs hover:border-primary cursor-pointer transition">
                  <div className="flex items-start gap-2">
                    <Sparkles className="size-3.5 text-primary mt-0.5 shrink-0" />
                    <span>{s}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <h3 className="font-bold mb-3">Presets</h3>
            <div className="space-y-2">
              {["HSC Physics Essay", "SSC Bangla Rachana", "CSE Lab Report", "English Composition"].map((p) => (
                <button key={p} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-accent transition">{p}</button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
