import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, Mail, Lock, User, Building2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — Grading.AI" }] }),
  component: Register,
});

function Register() {
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
          <h2 className="text-4xl font-display font-bold text-primary-foreground max-w-md leading-tight">Built for Bangladeshi classrooms.</h2>
          <p className="text-primary-foreground/80 mt-3 max-w-md">Free for the first 50 students. No credit card required.</p>
        </div>
        <div className="relative text-primary-foreground/60 text-sm">© 2025 Grading.AI</div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-display font-bold">Create your account</h1>
          <p className="text-muted-foreground mt-1">Start grading smarter in minutes</p>
          <form onSubmit={(e) => { e.preventDefault(); nav({ to: "/dashboard" }); }} className="mt-8 space-y-4">
            {[
              { i: User, p: "Full name", v: "Prof. Mahmud Hasan" },
              { i: Mail, p: "Email", v: "teacher@edubd.ai" },
              { i: Building2, p: "Institution", v: "BRAC University" },
              { i: Lock, p: "Password", v: "••••••••", t: "password" },
            ].map((f) => (
              <div key={f.p} className="flex items-center gap-2 px-3 py-3 rounded-xl border border-border bg-card focus-within:ring-2 focus-within:ring-ring">
                <f.i className="size-4 text-muted-foreground" />
                <input type={f.t || "text"} defaultValue={f.v} placeholder={f.p} className="bg-transparent outline-none text-sm flex-1" />
              </div>
            ))}
            <button className="w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-elegant hover:shadow-glow transition flex items-center justify-center gap-2">
              Create account <ArrowRight className="size-4" />
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
