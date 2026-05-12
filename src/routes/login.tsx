import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, ArrowRight, GraduationCap, Brain } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Grading.AI" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        <Link to="/" className="relative flex items-center gap-2 text-primary-foreground">
          <div className="size-9 rounded-xl bg-card/20 backdrop-blur grid place-items-center"><Sparkles className="size-5" /></div>
          <span className="font-display font-bold text-lg">Grading.AI</span>
        </Link>
        <div className="relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="glass rounded-2xl p-4 text-primary-foreground max-w-sm">
              <div className="flex items-center gap-2 text-xs mb-2 opacity-80"><Brain className="size-3.5" /> AI evaluation complete</div>
              <div className="text-2xl font-bold">94% confidence</div>
              <div className="text-xs opacity-80 mt-1">Newton's Laws · Rahim Ahmed</div>
            </div>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="glass rounded-2xl p-4 text-primary-foreground max-w-sm ml-12">
              <div className="text-xs opacity-80 mb-1">Class average improving</div>
              <div className="flex items-end gap-1 h-12">
                {[40, 55, 50, 70, 65, 80, 88].map((h, i) => <div key={i} className="flex-1 bg-card/30 rounded-t" style={{ height: `${h}%` }} />)}
              </div>
            </motion.div>
          </motion.div>
          <h2 className="relative text-4xl font-display font-bold text-primary-foreground mt-12 max-w-md leading-tight">Grade smarter, teach better.</h2>
          <p className="relative text-primary-foreground/80 mt-3 max-w-md">Join 1,200+ educators across Bangladesh using AI-assisted assessment.</p>
        </div>
        <div className="relative text-primary-foreground/60 text-sm">"Cut my grading time by 80%." — Prof. Mahmud Hasan, BRAC University</div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Link to="/" className="flex items-center gap-2"><div className="size-9 rounded-xl bg-gradient-primary grid place-items-center"><Sparkles className="size-5 text-primary-foreground" /></div><span className="font-display font-bold">Grading.AI</span></Link></div>
          <h1 className="text-3xl font-display font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Sign in to continue grading</p>

          <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/dashboard" }); }} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="mt-1.5 flex items-center gap-2 px-3 py-3 rounded-xl border border-border bg-card focus-within:ring-2 focus-within:ring-ring transition">
                <Mail className="size-4 text-muted-foreground" />
                <input defaultValue="teacher@edubd.ai" className="bg-transparent outline-none text-sm flex-1" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Password</label>
              <div className="mt-1.5 flex items-center gap-2 px-3 py-3 rounded-xl border border-border bg-card focus-within:ring-2 focus-within:ring-ring transition">
                <Lock className="size-4 text-muted-foreground" />
                <input type="password" defaultValue="demo1234" className="bg-transparent outline-none text-sm flex-1" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2"><input type="checkbox" className="accent-primary" /> Remember me</label>
              <Link to="/login" className="text-primary hover:underline">Forgot password?</Link>
            </div>
            <button className="w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition flex items-center justify-center gap-2">
              Sign in <ArrowRight className="size-4" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><div className="flex-1 h-px bg-border" /> or continue as <div className="flex-1 h-px bg-border" /></div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => nav({ to: "/dashboard" })} className="py-3 rounded-xl border border-border bg-card hover:bg-accent text-sm font-medium flex items-center justify-center gap-2">
              <Brain className="size-4 text-primary" /> Teacher
            </button>
            <button onClick={() => nav({ to: "/student" })} className="py-3 rounded-xl border border-border bg-card hover:bg-accent text-sm font-medium flex items-center justify-center gap-2">
              <GraduationCap className="size-4 text-primary" /> Student
            </button>
          </div>
          <button onClick={() => nav({ to: "/dashboard" })} className="mt-3 w-full py-3 rounded-xl border-2 border-dashed border-primary/30 text-primary text-sm font-medium hover:bg-primary/5 transition">
            ✨ Demo Access (No login required)
          </button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
