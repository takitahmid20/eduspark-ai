import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/shell";
import { ASSIGNMENTS } from "@/lib/mock-data";
import { Plus, Search, Filter, MoreVertical, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/assignments")({
  head: () => ({ meta: [{ title: "Assignments — Grading.AI" }] }),
  component: Assignments,
});

const TABS = ["All", "Open", "Grading", "Reviewed"];

function Assignments() {
  const [tab, setTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const filtered = tab === "All" ? ASSIGNMENTS : ASSIGNMENTS.filter(a => a.status === tab);

  return (
    <AppShell title="Assignments" subtitle="Manage your courses and assessments">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card flex-1 min-w-64 max-w-md">
          <Search className="size-4 text-muted-foreground" />
          <input placeholder="Search assignments…" className="bg-transparent outline-none text-sm flex-1" />
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card text-sm hover:bg-accent"><Filter className="size-4" /> Filter</button>
        <div className="flex bg-card border border-border rounded-xl p-1">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${tab === t ? 'bg-gradient-primary text-primary-foreground shadow-elegant' : 'text-muted-foreground hover:text-foreground'}`}>{t}</button>
          ))}
        </div>
        <button onClick={() => setShowModal(true)} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-elegant hover:shadow-glow">
          <Plus className="size-4" /> New Assignment
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((a, i) => (
          <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="group p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="size-11 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground text-xs font-bold">{a.subject.slice(0,2).toUpperCase()}</div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${a.status === 'Reviewed' ? 'bg-success/15 text-success' : a.status === 'Grading' ? 'bg-primary/15 text-primary' : 'bg-warning/15 text-warning'}`}>{a.status}</span>
            </div>
            <h3 className="font-bold leading-tight mb-1">{a.title}</h3>
            <p className="text-xs text-muted-foreground mb-4">{a.subject} · {a.course}</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="size-3.5" /> Due {a.deadline}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Users className="size-3.5" /> {a.submissions}/{a.total} submissions</div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5"><span className="text-muted-foreground">AI Grading</span><span className="font-mono font-semibold">{a.aiProgress}%</span></div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-gradient-primary" style={{ width: `${a.aiProgress}%` }} /></div>
            </div>
            <div className="flex gap-2">
              <Link to="/review" className="flex-1 text-center py-2 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold">Review</Link>
              <Link to="/upload" className="flex-1 text-center py-2 rounded-lg border border-border text-xs font-semibold hover:bg-accent">Upload</Link>
              <button className="size-8 grid place-items-center rounded-lg border border-border hover:bg-accent"><MoreVertical className="size-3.5" /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 backdrop-blur p-4" onClick={() => setShowModal(false)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="bg-card rounded-2xl shadow-elegant border border-border p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-1">Create Assignment</h2>
            <p className="text-sm text-muted-foreground mb-5">Set up a new graded task</p>
            <div className="space-y-3">
              <input placeholder="Assignment title" defaultValue="Quantum Mechanics – Wave Functions" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Subject" defaultValue="HSC Physics" className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm" />
                <input placeholder="Course code" defaultValue="PHY-202" className="px-3 py-2.5 rounded-xl border border-border bg-background text-sm" />
              </div>
              <input type="date" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm" />
              <textarea placeholder="Instructions for students…" rows={3} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm resize-none" />
            </div>
            <div className="mt-5 flex gap-2 justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-border text-sm">Cancel</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold">Create</button>
            </div>
          </motion.div>
        </div>
      )}
    </AppShell>
  );
}
