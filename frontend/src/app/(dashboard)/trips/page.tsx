import Link from "next/link";
import { Plus, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TripCard } from "@/components/trips/trip-card";
import { FilterBar } from "@/components/trips/filter-bar";
import { mockTrips } from "@/lib/mock-data";
import type { TripStatus } from "@/types";
import { Suspense } from "react";
import { TripCardSkeleton } from "@/components/trips/skeletons";

export const metadata = { title: "My Trips" };

interface TripsPageProps {
  searchParams: Promise<{ status?: string; q?: string }>;
}

export default async function TripsPage({ searchParams }: TripsPageProps) {
  const params = await searchParams;
  const statusFilter = params.status as TripStatus | undefined;
  const query = params.q?.toLowerCase() ?? "";

  let filtered = [...mockTrips];

  if (statusFilter && statusFilter !== "all" as unknown) {
    filtered = filtered.filter((t) => t.status === statusFilter);
  }
  if (query) {
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description?.toLowerCase().includes(query) ||
        t.stops?.some((s) => s.city.toLowerCase().includes(query))
    );
  }

  const grouped = {
    ongoing: filtered.filter((t) => t.status === "ongoing"),
    upcoming: filtered.filter((t) => t.status === "upcoming"),
    draft: filtered.filter((t) => t.status === "draft"),
    completed: filtered.filter((t) => t.status === "completed"),
  };

  const sections: { key: keyof typeof grouped; label: string }[] = [
    { key: "ongoing", label: "Ongoing" },
    { key: "upcoming", label: "Upcoming" },
    { key: "draft", label: "Drafts" },
    { key: "completed", label: "Completed" },
  ];

  const isEmpty = filtered.length === 0;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Trips</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mockTrips.length} trip{mockTrips.length !== 1 ? "s" : ""} planned
          </p>
        </div>
        <Button asChild className="gap-2 shrink-0">
          <Link href="/trips/new">
            <Plus className="h-4 w-4" /> New Trip
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Suspense>
        <FilterBar />
      </Suspense>

      {/* Empty State */}
      {isEmpty && (
        <Card className="border-dashed border-2 shadow-none mt-8">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Map className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold text-lg mb-1">No trips found</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              {query
                ? `No trips match "${query}". Try a different search.`
                : "No trips in this category yet. Create one to get started!"}
            </p>
            <Button asChild size="sm" className="mt-6 gap-2">
              <Link href="/trips/new">
                <Plus className="h-4 w-4" /> Create Trip
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Grouped Sections */}
      {!isEmpty &&
        sections.map(({ key, label }) => {
          const trips = grouped[key];
          if (trips.length === 0) return null;
          return (
            <section key={key}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-base font-semibold">{label}</h2>
                <span className="bg-muted text-muted-foreground text-xs rounded-full px-2.5 py-0.5 font-medium">
                  {trips.length}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            </section>
          );
        })}
    </div>
  );
}
