"use client";

import { useActionState } from "react";
import Link from "next/link";
import { PlaneTakeoff, AlertCircle, ShieldCheck, UserCircle } from "lucide-react";
import { registerAction } from "@/app/actions/auth";
import { SubmitButton } from "@/components/submit-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const [state, action] = useActionState(registerAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#13121b]">
      {/* Background Mesh/Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-secondary/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <div className="glass-panel p-10 rounded-[32px] shadow-2xl border-t border-white/10 relative overflow-hidden group">
          {/* Subtle top light effect */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(108,99,255,0.2)] group-hover:scale-110 transition-transform duration-500">
              <PlaneTakeoff className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Join ZUno</h1>
            <p className="text-white/40 text-sm font-medium">Start your collaborative travel journey today.</p>
          </div>

          <form action={action} className="space-y-6">
            {state?.error && (
              <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400 rounded-2xl">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-bold text-[10px] uppercase tracking-widest">{state.error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-center mb-8">
              <div className="relative group cursor-pointer">
                <div className="h-24 w-24 rounded-[24px] bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50 group-hover:bg-primary/5">
                  <UserCircle className="h-12 w-12 text-white/20 group-hover:text-primary/50 transition-colors" />
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-[24px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Upload</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2 group/input">
                <label
                  htmlFor="name"
                  className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1 block group-focus-within/input:text-secondary transition-colors"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                  className="w-full bg-transparent border-b border-white/10 py-3 px-1 text-white focus:border-primary focus:outline-none transition-all placeholder:text-white/10 font-medium"
                />
              </div>

              <div className="space-y-2 group/input">
                <label
                  htmlFor="email"
                  className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1 block group-focus-within/input:text-secondary transition-colors"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="explorer@zuno.travel"
                  required
                  className="w-full bg-transparent border-b border-white/10 py-3 px-1 text-white focus:border-primary focus:outline-none transition-all placeholder:text-white/10 font-medium"
                />
              </div>

              <div className="space-y-2 group/input">
                <label
                  htmlFor="password"
                  className="text-[10px] font-bold uppercase tracking-widest text-primary ml-1 block group-focus-within/input:text-secondary transition-colors"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-transparent border-b border-white/10 py-3 px-1 text-white focus:border-primary focus:outline-none transition-all placeholder:text-white/10 font-medium"
                />
              </div>
            </div>

            <SubmitButton
              className="w-full primary-gradient text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              pendingText="Preparing Account..."
            >
              Sign Up
            </SubmitButton>
          </form>

          <div className="mt-10 flex items-center justify-center space-x-4">
            <div className="h-px bg-white/5 flex-grow"></div>
            <div className="flex items-center gap-1.5 text-white/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Join</span>
            </div>
            <div className="h-px bg-white/5 flex-grow"></div>
          </div>

          <div className="mt-10 text-center text-[11px] font-bold uppercase tracking-widest">
            <span className="text-white/20">Already have an account?</span>{" "}
            <Link href="/login" className="text-primary hover:text-secondary transition-colors ml-1">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
