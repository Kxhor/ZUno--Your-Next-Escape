import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar, MapPin, Clock, DollarSign,
  ArrowLeft, Edit, Share2, 
  Utensils, Car, Building2, Landmark, 
  MoreHorizontal, Package, 
  ChevronRight, Mountain, Sailboat, Music, Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/trips/status-badge";
import { getMockTripById } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Activity, ActivityCategory } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ─── Activity Icon Map ─────────────────────────────────────────────────────────

const categoryConfig: Record<ActivityCategory, { icon: any; color: string; bg: string }> = {
  food: { icon: Utensils, color: "text-secondary", bg: "bg-secondary/10" },
  transport: { icon: Car, color: "text-indigo-400", bg: "bg-indigo-400/10" },
  accommodation: { icon: Building2, color: "text-white", bg: "bg-white/10" },
  attraction: { icon: Landmark, color: "text-orange-400", bg: "bg-orange-400/10" },
  other: { icon: MoreHorizontal, color: "text-white/40", bg: "bg-white/5" },
};

// ─── Activity Card ─────────────────────────────────────────────────────────────

function ActivityCard({ activity }: { activity: Activity }) {
  const config = categoryConfig[activity.category] || categoryConfig.other;
  const Icon = config.icon;
  
  return (
    <div className="glass-panel p-4 rounded-2xl flex items-center gap-6 hover:border-white/25 hover:scale-[1.01] transition-all duration-300">
      <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0", config.bg, config.color)}>
        <Icon className="h-8 w-8" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <h5 className="font-bold text-white text-lg">{activity.name}</h5>
          <span className="text-sm font-bold text-secondary">
            {activity.cost !== null && activity.cost !== undefined ? `$${activity.cost}` : "Free"}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-white/40">
          {activity.start_time && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {activity.start_time}
            </span>
          )}
          {activity.duration_hr && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {activity.duration_hr} Hours
            </span>
          )}
          <span className="bg-white/5 px-2 py-0.5 rounded border border-white/10">{activity.category}</span>
        </div>
      </div>
      <button className="p-2 text-white/30 hover:text-secondary transition-colors">
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

interface TripDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  const { id } = await params;
  const trip = getMockTripById(id);
  if (!trip) notFound();

  const allActivities = trip.stops?.flatMap((s) => s.activities ?? []) ?? [];
  const currentStop = trip.stops?.[1] || trip.stops?.[0]; // Mocking "Active" stop as the second one if exists

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full h-20 flex justify-between items-center px-8 py-4 bg-transparent sticky top-0 z-40 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white tracking-tight">{trip.title}</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Active Trip</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="glass-panel border-white/10 text-white/60 hover:text-white hover:bg-white/5 gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
          <Button size="sm" className="primary-gradient text-white font-bold gap-2 shadow-lg shadow-primary/20">
            <Edit className="h-4 w-4" /> Edit Trip
          </Button>
        </div>
      </header>

      <div className="px-8 py-8 space-y-10 max-w-7xl mx-auto w-full">
        
        {/* Trip Meta & Timeline Row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3 text-white/60">
              <Calendar className="h-5 w-5 text-secondary" />
              <span className="text-lg font-medium">
                {trip.start_date ? new Date(trip.start_date).toLocaleDateString("en-US", { month: "long", day: "numeric" }) : "—"} 
                – 
                {trip.end_date ? new Date(trip.end_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—"}
              </span>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold text-white">Quick Access</h4>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Package className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {["Packing List", "Digital Vault", "Invite Friends"].map((item) => (
                  <button key={item} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group text-white/60 hover:text-secondary">
                    <span className="text-sm font-bold uppercase tracking-widest">{item}</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline View */}
          <div className="lg:col-span-2 glass-panel p-8 rounded-2xl overflow-x-auto custom-scrollbar">
            <div className="flex items-center justify-between min-w-[600px] relative h-24">
              {/* Timeline Line */}
              <div className="absolute top-[20px] left-8 right-8 h-1 bg-white/5">
                <div className="h-full bg-primary w-1/2 rounded-full shadow-[0_0_10px_rgba(108,99,255,0.5)]"></div>
              </div>
              
              {trip.stops?.map((stop, idx) => {
                const isActive = idx === 1; // Mocking second stop as active
                const isPast = idx < 1;
                
                return (
                  <div key={stop.id} className="relative z-10 flex flex-col items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#0A0A12] transition-all",
                      isActive ? "bg-secondary shadow-[0_0_20px_rgba(71,245,219,0.4)] scale-110" : 
                      isPast ? "bg-primary" : "bg-white/20"
                    )}>
                      <MapPin className={cn(
                        "h-4 w-4",
                        isActive ? "text-on-secondary" : isPast ? "text-white" : "text-white/40"
                      )} />
                    </div>
                    <div className="text-center">
                      <p className={cn(
                        "text-[10px] uppercase tracking-widest font-bold",
                        isActive ? "text-secondary" : "text-white/60"
                      )}>{stop.city}</p>
                      <p className="text-[9px] text-white/30 uppercase mt-0.5">
                        {stop.arrival ? new Date(stop.arrival).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Current Stop Hero & Map */}
        {currentStop && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[450px]">
            <div className="lg:col-span-4 glass-panel-elevated p-10 rounded-3xl flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute inset-0 opacity-20">
                <Image 
                  src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=60" 
                  alt={currentStop.city} 
                  fill
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-secondary mb-4">
                  <Compass className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Current Stop</span>
                </div>
                <h3 className="text-5xl font-bold text-white tracking-tighter mb-2">{currentStop.city}</h3>
                <p className="text-lg text-white/60 font-medium">{currentStop.country || "Italy"}</p>
              </div>
              <div className="relative z-10 p-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-white/40">Arrival</span>
                  <span className="text-white">June 15, 2025</span>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                  <span className="text-white/40">Departure</span>
                  <span className="text-white">June 18, 2025</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-8 glass-panel rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                <Image 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format&fit=crop&q=60" 
                  alt="Map Placeholder" 
                  fill
                  className="object-cover opacity-40 mix-blend-luminosity"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="glass-panel p-5 rounded-2xl max-w-xs space-y-2">
                  <p className="text-[10px] uppercase font-bold text-secondary tracking-widest">Route Summary</p>
                  <p className="text-xs text-white/60 leading-relaxed">Direct rail from Rome Termini to Napoli Centrale (1h 10m). First class tickets included.</p>
                </div>
                <button className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-white">
                  <Compass className="h-5 w-5" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Grid: Activities & Expenses */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Activities List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center">
              <h4 className="text-3xl font-bold text-white tracking-tight">Activities in {currentStop?.city}</h4>
              <div className="flex gap-2">
                <button className="p-3 glass-panel rounded-xl hover:text-secondary transition-colors text-white/60">
                  <SettingsIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4 relative">
              {currentStop?.activities?.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              )) || (
                <div className="glass-panel p-12 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
                  <Landmark className="h-12 w-12 text-white/10" />
                  <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">No activities planned for this stop</p>
                  <Button variant="outline" className="glass-panel border-white/10 text-secondary font-bold uppercase tracking-widest text-[10px]">Add Activity</Button>
                </div>
              )}
              
              {/* FAB for Activities */}
              <button className="absolute -bottom-6 right-6 w-14 h-14 primary-gradient rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-transform z-20">
                <Plus className="h-8 w-8" />
              </button>
            </div>
          </div>

          {/* Budget & Notes Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Budget Widget */}
            <div className="glass-panel p-8 rounded-3xl space-y-8">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-white tracking-tight">Stop Budget</h4>
                <Wallet className="h-5 w-5 text-secondary" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-white/40 uppercase tracking-widest">Spent</span>
                  <span className="text-white">$1,240 / $2,000</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-secondary shadow-[0_0_15px_rgba(71,245,219,0.3)]" style={{ width: "62%" }}></div>
                </div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold text-right">Remaining: $760</p>
              </div>
              <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">Stops</p>
                  <p className="text-2xl font-bold text-white">{trip.stops?.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase text-white/40 font-bold tracking-widest mb-1">Days</p>
                  <p className="text-2xl font-bold text-white">{trip.duration_days}</p>
                </div>
              </div>
            </div>

            {/* Trip Notes Widget */}
            <div className="glass-panel p-8 rounded-3xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-400/10 flex items-center justify-center">
                  <Landmark className="h-4 w-4 text-orange-400" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">Trip Notes</h4>
              </div>
              <p className="text-sm text-white/60 leading-relaxed italic">
                "Don't forget to book the Sitasud bus for Amalfi Coast in advance. Remember to carry Euros for smaller cafes in Naples old town."
              </p>
              <button className="text-secondary font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:underline">
                View all notes <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
