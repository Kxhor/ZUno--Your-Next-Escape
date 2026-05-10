"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GitFork, Star, MapPin, Calendar, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/trips/status-badge";
import { RemixModal } from "@/components/trips/remix-modal";
import type { Trip } from "@/types";

export function CommunityTripCard({ trip }: { trip: Trip }) {
  const [isRemixOpen, setIsRemixOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group bg-card-gradient">
        {/* Cover */}
        <div className="relative h-48 overflow-hidden">
          {trip.cover_image ? (
            <Image
              src={trip.cover_image}
              alt={trip.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Compass className="h-10 w-10 text-primary/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <StatusBadge status={trip.status} />
          </div>
          {trip.trip_score !== null && (
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs rounded-full px-2 py-0.5 backdrop-blur-sm border border-white/10">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {trip.trip_score}
            </div>
          )}
          <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
            {trip.stops?.slice(0, 2).map((s) => (
              <span key={s.id} className="bg-black/50 text-white text-xs rounded-full px-2 py-0.5 backdrop-blur-sm border border-white/10 flex items-center gap-1">
                <MapPin className="h-2.5 w-2.5" />
                {s.city}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <h3 className="font-semibold text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors">
            {trip.title}
          </h3>
          {trip.description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
              {trip.description}
            </p>
          )}

          {/* Author */}
          {trip.user && (
            <div className="flex items-center gap-2 mt-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {trip.user.name?.charAt(0) ?? "U"}
              </div>
              <span className="text-xs text-muted-foreground truncate">{trip.user.name}</span>
              <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Calendar className="h-3 w-3" />
                {trip.duration_days}d
              </span>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
            <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium text-primary/70">
              <GitFork className="h-3.5 w-3.5" />
              {trip.remix_count} remixes
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/trips/${trip.id}`}>View</Link>
              </Button>
              <Button 
                size="sm" 
                className="gap-1.5 h-8 px-3 bg-primary/10 hover:bg-primary/20 text-primary border-0"
                onClick={() => setIsRemixOpen(true)}
              >
                <GitFork className="h-3.5 w-3.5" /> Remix
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <RemixModal 
        trip={trip} 
        isOpen={isRemixOpen} 
        onOpenChange={setIsRemixOpen} 
      />
    </>
  );
}
