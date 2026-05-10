"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, GitFork, Check, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Trip } from "@/types";

interface RemixModalProps {
  trip: Trip;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RemixModal({ trip, isOpen, onOpenChange }: RemixModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<"confirm" | "remixing" | "success">("confirm");

  const handleRemix = async () => {
    setStep("remixing");
    
    // Simulate remix API call and copying process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setStep("success");
    
    // Navigate to the newly remixed trip after showing success
    setTimeout(() => {
      onOpenChange(false);
      // In a real app we'd get the new trip ID back from the API
      router.push(`/trips/new?remix=${trip.id}`);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-0 bg-card/95 backdrop-blur-xl shadow-2xl">
        {step === "confirm" && (
          <div className="animate-fade-in-up">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GitFork className="h-5 w-5 text-primary" />
                Remix Trip
              </DialogTitle>
              <DialogDescription>
                Copy this itinerary to your workspace to customize it.
              </DialogDescription>
            </DialogHeader>

            <div className="my-6 rounded-xl overflow-hidden border border-border/50 relative">
              <div className="h-24 w-full relative">
                {trip.cover_image ? (
                  <Image src={trip.cover_image} alt={trip.title} fill className="object-cover" />
                ) : (
                  <div className="h-full bg-gradient-to-br from-primary/30 to-accent/30" />
                )}
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <p className="text-white font-bold">{trip.title}</p>
                <p className="text-white/80 text-xs">by {trip.user?.name}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleRemix} className="gap-2 bg-gradient-to-r from-primary to-violet-600">
                <Sparkles className="h-4 w-4" />
                Remix Now
              </Button>
            </div>
          </div>
        )}

        {step === "remixing" && (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-fade-in-up">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
              <div className="absolute inset-2 rounded-full border-b-2 border-violet-500 animate-spin" style={{ animationDirection: "reverse" }} />
              <GitFork className="h-6 w-6 absolute inset-0 m-auto text-primary animate-pulse" />
            </div>
            <div className="text-center">
              <p className="font-semibold">Cloning Itinerary...</p>
              <p className="text-sm text-muted-foreground">Copying activities and stops</p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-fade-in-up">
            <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Check className="h-8 w-8" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">Trip Remixed!</p>
              <p className="text-sm text-muted-foreground">Redirecting to your workspace...</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
