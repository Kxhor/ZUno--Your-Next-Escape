"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin, Calendar, DollarSign, Users, FileText,
  Sparkles, ArrowLeft, ArrowRight, Check, Plane
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AILoader } from "@/components/trips/ai-loader";
import type { TravelStyle, BudgetLevel } from "@/types";

// ─── Step Config ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Basics", icon: FileText },
  { id: 2, label: "Dates", icon: Calendar },
  { id: 3, label: "Budget", icon: DollarSign },
  { id: 4, label: "Style", icon: Sparkles },
  { id: 5, label: "Review", icon: Check },
];

const travelStyles: { value: TravelStyle; label: string; emoji: string; desc: string }[] = [
  { value: "adventure", label: "Adventure", emoji: "🧗", desc: "Hiking, extreme sports, off-the-beaten-path" },
  { value: "cultural", label: "Cultural", emoji: "🏛️", desc: "Museums, history, local experiences" },
  { value: "relaxation", label: "Relaxation", emoji: "🌊", desc: "Beaches, spas, slow travel" },
  { value: "foodie", label: "Foodie", emoji: "🍜", desc: "Restaurants, markets, culinary tours" },
  { value: "budget", label: "Budget", emoji: "💰", desc: "Hostels, free activities, smart spending" },
  { value: "luxury", label: "Luxury", emoji: "✨", desc: "5-star hotels, private tours, fine dining" },
];

const budgetLevels: { value: BudgetLevel; label: string; range: string; emoji: string }[] = [
  { value: "budget", label: "Budget", range: "$50–$100/day", emoji: "🎒" },
  { value: "mid-range", label: "Mid-Range", range: "$100–$250/day", emoji: "🏨" },
  { value: "luxury", label: "Luxury", range: "$250+/day", emoji: "💎" },
];

interface FormData {
  title: string;
  description: string;
  destinations: string;
  start_date: string;
  end_date: string;
  budget_level: BudgetLevel;
  travel_style: TravelStyle | "";
  companions: number;
  notes: string;
}

const defaultForm: FormData = {
  title: "",
  description: "",
  destinations: "",
  start_date: "",
  end_date: "",
  budget_level: "mid-range",
  travel_style: "",
  companions: 1,
  notes: "",
};

export default function CreateTripPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const update = (field: keyof FormData, value: string | number) =>
    setForm((f) => ({ ...f, [field]: value }));

  const canNext = () => {
    if (step === 1) return form.title.trim().length > 0 && form.destinations.trim().length > 0;
    if (step === 2) return form.start_date !== "" && form.end_date !== "";
    if (step === 3) return form.budget_level !== "";
    if (step === 4) return form.travel_style !== "";
    return true;
  };

  const handleSubmit = async (mode: "manual" | "ai") => {
    setIsSubmitting(true);
    if (mode === "ai") {
      setIsGenerating(true);
      const { generateAITrip } = await import("@/lib/mock-ai");
      
      const duration = form.start_date && form.end_date 
        ? Math.ceil((new Date(form.end_date).getTime() - new Date(form.start_date).getTime()) / 86400000) 
        : 3;
        
      await generateAITrip({
        title: form.title,
        destinations: form.destinations,
        days: duration,
        style: form.travel_style || "cultural",
      });
      // In a real app we'd save this to DB, then navigate
      router.push("/trips/trip1"); 
    } else {
      // Manual creation simulation
      await new Promise((r) => setTimeout(r, 1000));
      router.push("/trips/trip1");
    }
  };

  if (isGenerating) {
    // Requires AILoader component to be dynamically or statically imported
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <AILoader />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New Trip</h1>
          <p className="text-muted-foreground text-sm">Plan your next adventure step by step</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                  step > s.id
                    ? "bg-primary text-primary-foreground"
                    : step === s.id
                    ? "bg-primary/20 text-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {step > s.id ? <Check className="h-4 w-4" /> : <s.icon className="h-3.5 w-3.5" />}
              </div>
              <span className="text-[10px] text-muted-foreground hidden sm:block">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("flex-1 h-0.5 rounded transition-colors", step > s.id ? "bg-primary" : "bg-muted")} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card className="border-0 shadow-sm bg-card-gradient">
        <CardContent className="p-6 space-y-5">

          {/* Step 1 — Basics */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in-up">
              <div>
                <CardTitle className="text-lg mb-1">Trip Basics</CardTitle>
                <CardDescription>Give your trip a name and choose your destinations</CardDescription>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Trip Title *</label>
                <Input
                  placeholder="e.g. Japan Spring Adventure"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="What's this trip about? (optional)"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  className="w-full min-h-[80px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Destinations *
                </label>
                <Input
                  placeholder="e.g. Tokyo, Kyoto, Osaka"
                  value={form.destinations}
                  onChange={(e) => update("destinations", e.target.value)}
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">Separate multiple cities with commas</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  Companions
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => update("companions", Math.max(1, form.companions - 1))}
                  >
                    −
                  </Button>
                  <span className="text-lg font-semibold w-8 text-center">{form.companions}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => update("companions", form.companions + 1)}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {form.companions === 1 ? "Solo" : `${form.companions} people`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Dates */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in-up">
              <div>
                <CardTitle className="text-lg mb-1">Travel Dates</CardTitle>
                <CardDescription>When are you planning to travel?</CardDescription>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    Start Date *
                  </label>
                  <Input
                    type="date"
                    value={form.start_date}
                    onChange={(e) => update("start_date", e.target.value)}
                    className="bg-background"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    End Date *
                  </label>
                  <Input
                    type="date"
                    value={form.end_date}
                    onChange={(e) => update("end_date", e.target.value)}
                    className="bg-background"
                    min={form.start_date || new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>
              {form.start_date && form.end_date && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Plane className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">
                        {Math.ceil((new Date(form.end_date).getTime() - new Date(form.start_date).getTime()) / 86400000)} day trip
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(form.start_date).toLocaleDateString("en-US", { month: "long", day: "numeric" })} —{" "}
                        {new Date(form.end_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Step 3 — Budget */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in-up">
              <div>
                <CardTitle className="text-lg mb-1">Budget Level</CardTitle>
                <CardDescription>How are you planning to spend?</CardDescription>
              </div>
              <div className="grid gap-3">
                {budgetLevels.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => update("budget_level", b.value)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-primary/40",
                      form.budget_level === b.value
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-background"
                    )}
                  >
                    <span className="text-3xl">{b.emoji}</span>
                    <div>
                      <p className="font-semibold">{b.label}</p>
                      <p className="text-sm text-muted-foreground">{b.range}</p>
                    </div>
                    {form.budget_level === b.value && (
                      <div className="ml-auto h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 — Travel Style */}
          {step === 4 && (
            <div className="space-y-5 animate-fade-in-up">
              <div>
                <CardTitle className="text-lg mb-1">Travel Style</CardTitle>
                <CardDescription>Pick the vibe that matches your trip</CardDescription>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {travelStyles.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => update("travel_style", s.value)}
                    className={cn(
                      "flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:border-primary/40",
                      form.travel_style === s.value
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-background"
                    )}
                  >
                    <span className="text-2xl">{s.emoji}</span>
                    <div>
                      <p className="font-semibold text-sm">{s.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{s.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Notes</label>
                <textarea
                  placeholder="Any special preferences or requirements?"
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  className="w-full min-h-[80px] resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
              </div>
            </div>
          )}

          {/* Step 5 — Review */}
          {step === 5 && (
            <div className="space-y-5 animate-fade-in-up">
              <div>
                <CardTitle className="text-lg mb-1">Review Your Trip</CardTitle>
                <CardDescription>Everything look good? Create or generate with AI.</CardDescription>
              </div>
              <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
                {[
                  { label: "Title", value: form.title },
                  { label: "Destinations", value: form.destinations },
                  { label: "Dates", value: `${form.start_date} → ${form.end_date}` },
                  { label: "Budget", value: budgetLevels.find((b) => b.value === form.budget_level)?.label ?? "" },
                  { label: "Style", value: travelStyles.find((s) => s.value === form.travel_style)?.label ?? "" },
                  { label: "Travelers", value: `${form.companions} person${form.companions > 1 ? "s" : ""}` },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between px-4 py-3 text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium">{row.value || "—"}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit("manual")}
                >
                  <Check className="h-4 w-4" />
                  Create Trip
                </Button>
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90"
                  disabled={isSubmitting}
                  onClick={() => handleSubmit("ai")}
                >
                  <Sparkles className="h-4 w-4" />
                  {isSubmitting ? "Generating..." : "Generate with AI ✨"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {step < 5 && (
          <Button
            onClick={() => setStep((s) => Math.min(5, s + 1))}
            disabled={!canNext()}
            className="gap-2"
          >
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
