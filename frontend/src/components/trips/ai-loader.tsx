"use client";

import { useEffect, useState } from "react";
import { Sparkles, Map, Calendar, DollarSign, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const aiSteps = [
  { id: 1, label: "Analyzing destinations...", icon: Map },
  { id: 2, label: "Optimizing travel routes...", icon: Calendar },
  { id: 3, label: "Calculating budget estimates...", icon: DollarSign },
  { id: 4, label: "Finalizing itinerary...", icon: Sparkles },
];

export function AILoader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < aiSteps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
      }
    }, 800); // Progress every 800ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-8 animate-fade-in-up">
      {/* Spinning AI Logo */}
      <div className="relative flex items-center justify-center h-24 w-24">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
        <div className="absolute inset-2 rounded-full border-r-2 border-violet-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <div className="absolute inset-4 rounded-full border-b-2 border-emerald-400 animate-spin" style={{ animationDuration: '2s' }} />
        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-600">
          AI Magic at Work
        </h3>
        <p className="text-sm text-muted-foreground">Crafting your perfect itinerary...</p>
      </div>

      {/* Progress Steps */}
      <div className="w-full max-w-sm space-y-4 text-left">
        {aiSteps.map((step, index) => {
          const isActive = currentStep === index;
          const isDone = currentStep > index;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 transition-all duration-500",
                isActive ? "opacity-100 translate-x-2" : isDone ? "opacity-100" : "opacity-40"
              )}
            >
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  isDone
                    ? "bg-emerald-500/20 text-emerald-600"
                    : isActive
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
              </div>
              <span className={cn("text-sm font-medium", isDone && "text-muted-foreground")}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
