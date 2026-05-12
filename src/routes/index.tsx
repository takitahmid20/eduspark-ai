import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, FileCheck2, Brain, Gauge, Zap, BarChart3,
  Quote, Star, Upload, ScanText, Bot, MessageSquareText,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grading.AI — AI-Powered Grading for Smarter Learning" },
      { name: "description", content: "Grade assignments faster, generate meaningful feedback, and identify learning gaps with AI-assisted assessment built for Bangladeshi educators." },
      { property: "og:title", content: "Grading.AI — AI-Powered Grading" },
      { property: "og:description", content: "Faster grading. Richer feedback. Better learning outcomes." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Grading.AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#how" className="hover:text-foreground transition">How it works</a>
            <a href="#analytics" className="hover:text-foreground transition">Analytics</a>
            <a href="#testimonials" className="hover:text-foreground transition">Testimonials</a>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-primary transition">Sign in</Link>
            <Link to="/dashboard" className="px-4 py-2 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium shadow-elegant hover:shadow-glow transition-all">
              Start Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-mesh">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium mb-6">
              <span className="size-1.5 rounded-full bg-secondary animate-pulse-glow" />
              Trusted by educators across Bangladesh
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] tracking-tight">
              AI-Powered<br />
              <span className="text-gradient">Grading</span> for<br />
              Smarter Learning
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Grade assignments faster, generate meaningful feedback, and identify learning gaps with AI-assisted assessment — built for HSC, SSC, and university classrooms.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition-all">
                Start Demo <ArrowRight className="size-4" />
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card font-semibold hover:bg-accent transition">
                Explore Dashboard
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div><span className="text-2xl font-bold text-foreground block">94%</span> grading accuracy</div>
              <div className="h-8 w-px bg-border" />
              <div><span className="text-2xl font-bold text-foreground block">12×</span> faster than manual</div>
              <div className="h-8 w-px bg-border" />
              <div><span className="text-2xl font-bold text-foreground block">25k+</span> papers graded</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
            <div className="absolute -inset-10 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent blur-3xl" />
            <div className="relative glass rounded-3xl p-6 shadow-elegant">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-destructive/60" />
                  <div className="size-2 rounded-full bg-warning/60" />
                  <div className="size-2 rounded-full bg-success/60" />
                </div>
                <div className="text-xs text-muted-foreground">grading.ai/dashboard</div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { l: "Submissions", v: "248", c: "primary" },
                  { l: "AI Graded", v: "212", c: "secondary" },
                  { l: "Avg Score", v: "82%", c: "success" },
                ].map((s) => (
                  <div key={s.l} className="bg-card rounded-2xl p-3 border border-border">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.l}</div>
                    <div className="text-2xl font-bold mt-1">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="bg-card rounded-2xl p-4 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold">Newton's Laws – Rahim Ahmed</div>
                  <div className="text-xs px-2 py-0.5 rounded-full bg-success/15 text-success font-medium">94% conf</div>
                </div>
                <div className="space-y-2">
                  {[
                    { n: "Concept Accuracy", s: 28, m: 35 },
                    { n: "Critical Thinking", s: 19, m: 25 },
                    { n: "Grammar", s: 18, m: 20 },
                  ].map((r, i) => (
                    <motion.div key={r.n} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.5 + i * 0.15 }}>
                      <div className="flex justify-between text-xs mb-1"><span>{r.n}</span><span className="font-mono">{r.s}/{r.m}</span></div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(r.s / r.m) * 100}%` }} transition={{ delay: 0.7 + i * 0.15, duration: 0.8 }} className="h-full bg-gradient-primary" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-6 -left-8 glass rounded-2xl p-3 shadow-elegant max-w-[200px]">
              <div className="flex items-center gap-2 text-xs">
                <Bot className="size-4 text-primary" />
                <div>
                  <div className="font-semibold">AI Insight</div>
                  <div className="text-muted-foreground">Weak in 3rd Law</div>
                </div>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-4 -right-6 glass rounded-2xl p-3 shadow-elegant">
              <div className="flex items-center gap-2 text-xs">
                <div className="size-8 rounded-full bg-secondary grid place-items-center text-secondary-foreground font-bold">NJ</div>
                <div>
                  <div className="font-semibold">Nusrat Jahan</div>
                  <div className="text-muted-foreground">Score: 92/100</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold">Everything you need to grade smarter</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: ScanText, t: "OCR + Handwriting", d: "Extract text from scanned papers, photos, and handwritten Bangla & English answers." },
            { icon: Brain, t: "Rubric-aware AI", d: "AI evaluates against your custom rubric — not just keyword matching." },
            { icon: MessageSquareText, t: "Feedback Generator", d: "Personalized, encouraging feedback tailored to each student's strengths and gaps." },
            { icon: Gauge, t: "Confidence Scoring", d: "Every grade comes with a confidence score so you know what to review." },
            { icon: BarChart3, t: "Class Analytics", d: "Spot weak chapters, at-risk students, and improvement trends in real time." },
            { icon: Zap, t: "12× Faster Grading", d: "Cut grading time from hours to minutes — focus on teaching." },
          ].map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:shadow-elegant hover:-translate-y-1 transition-all"
            >
              <div className="size-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground mb-4 group-hover:scale-110 transition">
                <f.icon className="size-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Workflow</div>
            <h2 className="text-4xl md:text-5xl font-display font-bold">From upload to feedback in minutes</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { n: "01", icon: Upload, t: "Upload submissions", d: "Drag and drop PDFs, photos, or DOCX files." },
              { n: "02", icon: ScanText, t: "OCR extraction", d: "AI reads handwriting and printed text." },
              { n: "03", icon: Brain, t: "Rubric evaluation", d: "Each answer scored against your criteria." },
              { n: "04", icon: FileCheck2, t: "Review & approve", d: "Override scores and finalize with one click." },
            ].map((s) => (
              <div key={s.n} className="relative p-6 rounded-2xl bg-card border border-border">
                <div className="text-5xl font-display font-bold text-gradient opacity-50 mb-2">{s.n}</div>
                <s.icon className="size-6 text-primary mb-3" />
                <h3 className="font-bold mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics showcase */}
      <section id="analytics" className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Analytics</div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">See what your class actually understands</h2>
          <p className="text-muted-foreground mb-6">
            Heatmaps, weak-topic alerts, and risk scores surface patterns that gradebooks miss.
            Identify struggling students before exam week.
          </p>
          <ul className="space-y-3">
            {["42% of class struggled with Algebraic Expressions", "Writing quality up 18% vs last term", "6 students flagged as at-risk"].map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm">
                <span className="size-5 rounded-full bg-success/15 text-success grid place-items-center"><FileCheck2 className="size-3" /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-3xl p-6 shadow-elegant">
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 49 }).map((_, i) => {
              const intensity = Math.random();
              return <div key={i} className="aspect-square rounded-md" style={{ background: `oklch(0.58 0.22 295 / ${0.1 + intensity * 0.8})` }} />;
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Topic mastery heatmap · 7 weeks</span>
            <span>Low → High</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">Loved by educators</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "Prof. Mahmud Hasan", r: "BRAC University", q: "Cut my grading time by 80%. The rubric AI actually understands what I'm looking for." },
              { n: "Ayesha Rahman", r: "Viqarunnisa Noon School", q: "I can finally give every student personalized feedback. Game changer for SSC prep." },
              { n: "Tanzim Chowdhury", r: "United International University", q: "The analytics caught two struggling students I would have missed. Highly recommend." },
            ].map((t) => (
              <div key={t.n} className="p-6 rounded-2xl bg-card border border-border">
                <Quote className="size-6 text-primary mb-3" />
                <p className="text-sm mb-4 leading-relaxed">{t.q}</p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground text-xs font-bold">{t.n.split(" ").map(n=>n[0]).slice(0,2).join("")}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-3">{Array(5).fill(0).map((_, i) => <Star key={i} className="size-3 fill-secondary text-secondary" />)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-12 md:p-20 text-center shadow-elegant">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4">Start grading smarter today</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">Join Bangladesh's leading educators using AI to teach better.</p>
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-card text-foreground font-semibold shadow-elegant hover:scale-105 transition-transform">
              Try the Demo <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-gradient-primary grid place-items-center"><Sparkles className="size-3.5 text-primary-foreground" /></div>
            <span>© 2025 Grading.AI · Built for Bangladeshi classrooms</span>
          </div>
          <div className="flex gap-6"><a href="#" className="hover:text-foreground">Privacy</a><a href="#" className="hover:text-foreground">Terms</a><a href="#" className="hover:text-foreground">Contact</a></div>
        </div>
      </footer>
    </div>
  );
}
