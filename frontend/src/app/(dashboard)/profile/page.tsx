import Image from "next/image";
import { MapPin, Calendar, Award, Compass, Heart, Map, Grid, Star, Globe, Plane, Share2, Bell, Eco, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TripCard } from "@/components/trips/trip-card";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { mockTrips, mockPublicTrips } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const metadata = { title: "Explorer Profile | ZUno" };

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const name = user?.user_metadata?.name || "Julian Sterling";
  const role = "Platinum Explorer";
  const joinedDate = "Joined Dec 2023";
  const citizenId = "#ZUNO-8829";

  // Mock stats
  const stats = [
    { label: "Countries Visited", value: 12, icon: Globe, color: "text-primary" },
    { label: "Flights Taken", value: 48, icon: Plane, color: "text-secondary" },
  ];

  const recentActivity = [
    { id: 1, title: "Tokyo Expedition Finalized", description: "Completed logistics for 7 days in Shibuya", date: "2d ago", accent: "bg-primary" },
    { id: 2, title: "Earned 'Global Nomad' Badge", description: "Unlocked for visiting 3 continents in 1 year", date: "1w ago", accent: "bg-secondary" },
  ];

  const preferences = [
    { label: "Flight Preference", value: "Window Seat, Business Class", accent: "border-l-primary" },
    { label: "Hotel Style", value: "Boutique & Modern Luxury", accent: "border-l-secondary" },
    { label: "Dining Choice", value: "Local Experiences & High Tea", accent: "border-l-indigo-400" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Explorer Profile</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] mt-1">Global Citizen ID: {citizenId}</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 glass-panel rounded-full flex items-center justify-center hover:bg-white/10 transition-colors group">
            <Bell className="h-5 w-5 text-white/60 group-hover:text-primary transition-colors" />
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 p-0.5">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60" 
                alt="Profile" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Profile Card ────────────────────────────────────── */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-8 rounded-[32px] text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[40px] rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
            
            <div className="relative z-10">
              <div className="w-32 h-32 mx-auto rounded-[32px] overflow-hidden mb-6 border-4 border-white/5 shadow-2xl relative">
                <Image 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60" 
                  alt="Avatar" 
                  fill 
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8">{role} • {joinedDate}</p>
              
              <div className="flex gap-3 w-full">
                <Button className="flex-1 primary-gradient text-white font-bold py-6 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Edit Profile
                </Button>
                <button className="w-14 h-14 glass-panel rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors group">
                  <Share2 className="h-5 w-5 text-white/60 group-hover:text-primary transition-colors" />
                </button>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-white/5 space-y-6 text-left">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Default Currency</span>
                <span className="text-primary font-bold text-sm">USD ($)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Time Zone</span>
                <span className="text-white font-bold text-sm">GMT -5 (EST)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Preference</span>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary/10 text-secondary rounded-full border border-secondary/20">
                  <Eco className="h-3 w-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Sustainable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats & Activity ────────────────────────────────── */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-panel p-8 rounded-[32px] flex flex-col justify-between group relative overflow-hidden">
                <div className={cn("absolute top-0 right-0 w-24 h-24 blur-[40px] rounded-full -mr-12 -mt-12 opacity-10 transition-colors", stat.color === "text-primary" ? "bg-primary" : "bg-secondary")} />
                <stat.icon className={cn("h-8 w-8 mb-6 group-hover:scale-110 transition-transform", stat.color)} />
                <div>
                  <p className="text-6xl font-bold text-white tracking-tighter mb-1">{stat.value}</p>
                  <p className="text-white/40 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel p-10 rounded-[32px] relative overflow-hidden group">
            <Globe className="absolute -right-10 -bottom-10 h-64 w-64 text-white/[0.03] group-hover:scale-110 transition-transform duration-1000" />
            <h4 className="text-2xl font-bold text-white mb-8 tracking-tight relative z-10">Recent Activity</h4>
            <div className="space-y-8 relative z-10">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-6 group/item">
                  <div className={cn("mt-2 w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(108,99,255,0.6)] shrink-0", activity.accent)} />
                  <div className="flex-grow">
                    <p className="text-white font-bold text-lg leading-tight group-hover/item:text-primary transition-colors">{activity.title}</p>
                    <p className="text-white/40 text-sm mt-1">{activity.description}</p>
                  </div>
                  <span className="text-white/20 text-xs font-bold uppercase tracking-widest">{activity.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {preferences.map((pref) => (
              <div key={pref.label} className={cn("glass-panel p-6 rounded-[24px] border-l-4 transition-all hover:translate-y-[-4px]", pref.accent)}>
                <h5 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">{pref.label}</h5>
                <p className="text-white font-bold leading-tight">{pref.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Trips Section ─────────────────────────────────────── */}
      <div className="space-y-8 pt-8 border-t border-white/5">
        <Tabs defaultValue="created" className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <TabsList className="bg-white/5 p-1.5 h-auto rounded-2xl border border-white/5">
              <TabsTrigger value="created" className="rounded-xl px-8 py-3 gap-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all text-white/40 font-bold uppercase tracking-widest text-[10px]">
                <Grid className="h-3.5 w-3.5" /> Created
              </TabsTrigger>
              <TabsTrigger value="saved" className="rounded-xl px-8 py-3 gap-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all text-white/40 font-bold uppercase tracking-widest text-[10px]">
                <Heart className="h-3.5 w-3.5" /> Saved
              </TabsTrigger>
              <TabsTrigger value="visited" className="rounded-xl px-8 py-3 gap-2 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg transition-all text-white/40 font-bold uppercase tracking-widest text-[10px]">
                <MapPin className="h-3.5 w-3.5" /> Map
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-3">
               <button className="glass-panel px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-white/60 hover:text-white transition-all">
                <Settings className="h-4 w-4" />
                <span className="text-xs uppercase tracking-widest">Account Settings</span>
              </button>
              <button className="glass-panel px-6 py-3 rounded-xl flex items-center gap-2 font-bold text-red-400 hover:bg-red-400/10 transition-all">
                <LogOut className="h-4 w-4" />
                <span className="text-xs uppercase tracking-widest">Sign Out</span>
              </button>
            </div>
          </div>

          <TabsContent value="created" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {mockTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {mockPublicTrips.slice(0, 2).map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="visited" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="glass-panel rounded-[32px] h-[500px] flex flex-col items-center justify-center text-center p-12 group overflow-hidden relative">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                  <MapPin className="h-10 w-10 text-primary" />
                </div>
                <h4 className="text-3xl font-bold text-white mb-4">Interactive Map Coming Soon</h4>
                <p className="text-white/40 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                  We're building a cinematic way for you to visualize your global footprint across every continent.
                </p>
                <Button className="primary-gradient text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                  Notify Me
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
