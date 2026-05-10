import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DestinationCard } from "@/types";

interface DestinationCardProps {
  destination: DestinationCard;
  className?: string;
}

export function DestinationCardComponent({ destination, className }: DestinationCardProps) {
  return (
    <Link
      href={`/community?q=${encodeURIComponent(destination.name)}`}
      className={cn("group block relative overflow-hidden rounded-2xl", className)}
    >
      <div className="relative w-full h-52 overflow-hidden rounded-2xl">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20">
            {destination.tag}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-white text-lg font-bold leading-tight">
                {destination.name}
              </h3>
              <p className="text-white/80 text-sm flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3" />
                {destination.country}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs flex items-center gap-1 justify-end">
                <Users className="h-3 w-3" />
                {destination.tripCount.toLocaleString()} trips
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
