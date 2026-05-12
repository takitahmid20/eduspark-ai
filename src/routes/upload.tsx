import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/shell";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Image as ImageIcon, FileCheck2, X, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/upload")({
  head: () => ({ meta: [{ title: "Upload Submissions — Grading.AI" }] }),
  component: UploadPage,
});

const MOCK_FILES = [
  { name: "Rahim_Ahmed_Assignment.pdf", size: "1.2 MB", type: "pdf" },
  { name: "Nusrat_Jahan_Essay.jpg", size: "2.4 MB", type: "img" },
  { name: "Tanvir_CSE_Report.pdf", size: "0.9 MB", type: "pdf" },
  { name: "Sadia_Physics_Q1.pdf", size: "1.5 MB", type: "pdf" },
  { name: "Farhan_Newton_Laws.docx", size: "0.6 MB", type: "doc" },
];

function UploadPage() {
  const [files, setFiles] = useState<typeof MOCK_FILES>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  const startUpload = () => {
    setFiles(MOCK_FILES);
    MOCK_FILES.forEach((f) => {
      let p = 0;
      const t = setInterval(() => {
        p += Math.random() * 20;
        setProgress((prev) => ({ ...prev, [f.name]: Math.min(p, 100) }));
        if (p >= 100) clearInterval(t);
      }, 250 + Math.random() * 300);
    });
  };

  return (
    <AppShell title="Upload Submissions" subtitle="Newton's Laws of Motion · HSC Physics">
      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div>
          <div onClick={startUpload} className="relative cursor-pointer rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5 p-12 text-center hover:border-primary transition group">
            <div className="size-16 rounded-2xl bg-gradient-primary mx-auto grid place-items-center text-primary-foreground shadow-elegant group-hover:scale-110 transition">
              <Upload className="size-7" />
            </div>
            <h3 className="font-display font-bold text-2xl mt-4">Drop submissions here</h3>
            <p className="text-sm text-muted-foreground mt-1">PDF, JPG, PNG, DOCX up to 50MB · OCR for handwritten work</p>
            <button className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant">Browse files</button>
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><FileText className="size-3.5" /> PDF</span>
              <span className="flex items-center gap-1.5"><ImageIcon className="size-3.5" /> JPG / PNG</span>
              <span className="flex items-center gap-1.5"><FileText className="size-3.5" /> DOCX</span>
            </div>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">Uploading {files.length} files</h3>
                <Link to="/grading" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant">
                  <Sparkles className="size-4" /> Start AI Grading <ArrowRight className="size-4" />
                </Link>
              </div>
              <AnimatePresence>
                {files.map((f, i) => {
                  const pct = progress[f.name] || 0;
                  return (
                    <motion.div key={f.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-4 p-3 rounded-xl bg-card border border-border">
                      <div className={`size-10 rounded-lg grid place-items-center ${f.type === 'img' ? 'bg-secondary/20 text-secondary-foreground' : 'bg-primary/15 text-primary'}`}>
                        {f.type === 'img' ? <ImageIcon className="size-4" /> : <FileText className="size-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{f.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-primary transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground w-12 text-right">{Math.round(pct)}%</span>
                        </div>
                        {pct >= 100 && (
                          <div className="flex gap-3 mt-1.5 text-xs">
                            <span className="text-success flex items-center gap-1"><FileCheck2 className="size-3" /> OCR completed</span>
                            <span className="text-primary flex items-center gap-1"><Sparkles className="size-3" /> AI analysis queued</span>
                          </div>
                        )}
                      </div>
                      <button className="size-8 grid place-items-center rounded-lg hover:bg-accent text-muted-foreground"><X className="size-4" /></button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="p-5 rounded-2xl bg-card border border-border shadow-card">
            <h3 className="font-bold mb-3">Upload tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">•</span> Name files <span className="font-mono text-xs bg-muted px-1 rounded">Student_Assignment.pdf</span> for auto-matching</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Photos work — keep paper flat, good lighting</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Bangla & English handwriting supported</li>
              <li className="flex gap-2"><span className="text-primary">•</span> Bulk uploads supported up to 200 files</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-border shadow-card">
            <Sparkles className="size-5 text-primary mb-2" />
            <h3 className="font-bold mb-1">AI is ready</h3>
            <p className="text-xs text-muted-foreground">Rubric loaded. Once uploaded, AI will extract, evaluate, and score each submission against your 4-criterion rubric.</p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
