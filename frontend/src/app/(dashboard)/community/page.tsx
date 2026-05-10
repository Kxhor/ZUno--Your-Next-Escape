import Link from "next/link";
import Image from "next/image";
import { GitFork, Star, MapPin, Calendar, Users, Compass, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/trips/status-badge";
import { DestinationCardComponent } from "@/components/trips/destination-card";
import { CommunityTripCard } from "@/components/trips/community-trip-card";
import { mockPublicTrips, mockDestinations } from "@/lib/mock-data";

export const metadata = { title: "Community" };

export default async function CommunityPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Compass className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Community</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Discover community-crafted itineraries. Remix and make them your own.
        </p>
      </div>

      {/* Trending Destinations */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold">Trending Destinations</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {mockDestinations.map((dest) => (
            <DestinationCardComponent key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* Public Trips */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">Community Trips</h2>
          <span className="text-sm text-muted-foreground">{mockPublicTrips.length} trips</span>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockPublicTrips.map((trip) => (
            <CommunityTripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>
    </div>
  );
}
