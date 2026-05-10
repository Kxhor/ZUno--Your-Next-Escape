import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Activity } from "lucide-react";
import type { Trip } from "@/types";
import { cn } from "@/lib/utils";

interface TripCardProps {
  trip: Trip;
  className?: string;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function TripCard({ trip, className }: TripCardProps) {
  const budgetUsed = trip.budget?.total_spent ?? 0;
  const budgetTotal = trip.budget?.total_budget ?? 1;
  const progress = Math.min(Math.round((budgetUsed / budgetTotal) * 100), 100);

  return (
    <Link href={`/trips/${trip.id}`} className="group block">
      <div
        className={cn(
          "glass-panel overflow-hidden group h-full flex flex-col",
          className
        )}
      >
        <div className="h-40 relative overflow-hidden">
          {trip.cover_image ? (
            <Image
              src={trip.cover_image}
              alt={trip.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            <div className="h-full w-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-12 w-12 text-primary/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <div className="absolute top-3 right-3 px-3 py-1 bg-secondary text-on-secondary text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">
            {trip.status}
          </div>

          <div className="absolute bottom-3 left-3 flex gap-2">
            {trip.stops?.slice(0, 2).map((stop) => (
              <span key={stop.id} className="px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/20 rounded text-[10px] text-white font-medium">
                {stop.city}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-lg text-white group-hover:text-secondary transition-colors line-clamp-1">
              {trip.title}
            </h4>
            <span className="text-[10px] text-white/40 uppercase font-bold whitespace-nowrap ml-2">
              {formatDate(trip.start_date)}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {trip.tags?.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-primary font-bold uppercase tracking-tighter">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
              <span className="text-white/40">Budget: ${budgetUsed.toLocaleString()} / ${budgetTotal.toLocaleString()}</span>
              <span className="text-secondary">{progress}%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-secondary h-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
