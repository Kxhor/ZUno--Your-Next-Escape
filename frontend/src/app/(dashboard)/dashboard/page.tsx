import Link from "next/link";
import { Plus, Compass, Wallet, Calendar, Public, Search, Notifications, Settings as SettingsIcon } from "lucide-react";
import { StatsCard } from "@/components/trips/stats-card";
import { TripCard } from "@/components/trips/trip-card";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { mockTrips, getMockDashboardStats } from "@/lib/mock-data";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const metadata = { title: "ZUno Master Dashboard" };

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const stats = getMockDashboardStats();
  const recentTrips = mockTrips.slice(0, 2);
  const firstName = user?.user_metadata?.name?.split(" ")[0] ?? "Kishor";

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── TopAppBar ────────────────────────────────────────── */}
      <header className="w-full h-20 flex justify-between items-center px-8 py-4 bg-transparent sticky top-0 z-40 backdrop-blur-md border-b border-white/5">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome back, {firstName}</h2>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Your next adventure starts in 12 days.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 h-4 w-4" />
            <input 
              className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all w-64 text-sm" 
              placeholder="Search trips..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/60 hover:text-secondary transition-colors relative p-2">
              <Notifications className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-[#0A0A12]"></span>
            </button>
            <button className="text-white/60 hover:text-secondary transition-colors p-2">
              <SettingsIcon className="h-5 w-5" />
            </button>
            <Avatar className="h-10 w-10 border-2 border-secondary/30 p-0.5">
              <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9gUPGUhiNtW2ul4SNHcaZafJ9mHRLuNlpJoUaC-l1qXE9QymxZ46uZkEMyECc2EMUxsFpXsO1ExQ-V7LQNO6R2tUJfwwG6N6P3edCL77tYhzMAC_Vd5Qujkqg4oy3Q4mpoL_Sx_jXPcntac4h0eHw1Sd2xd7Su5Te_LFb83MrDjFMOEa3ptbKeeX-F8gag2xN_RSEEKGMJhpHFHBUswCcxMCGst_e-Ftd_tGeunfr36HyZw0LptTUCnyOFn04LlYDXGRbiWpqPGM" />
              <AvatarFallback>KG</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* ── Dashboard Content ────────────────────────────────── */}
      <div className="px-8 py-8 space-y-10">
        
        {/* Stats Row */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Total Trips"
            value={stats.totalTrips}
            icon={Compass}
            trend={{ value: 8, label: "up" }}
          />
          <StatsCard
            title="Countries Visited"
            value={8}
            icon={Compass}
            trend={{ value: 2, label: "up" }}
            iconClassName="text-orange-400 bg-orange-400/10"
          />
          <StatsCard
            title="Total Budget"
            value={`$${stats.totalSpent?.toLocaleString()}`}
            icon={Wallet}
            trend={{ value: 15, label: "up" }}
            iconClassName="text-indigo-400 bg-indigo-400/10"
          />
          <StatsCard
            title="Upcoming Trips"
            value={stats.upcomingTrips}
            icon={Calendar}
            subtitle="Next trip in 12 days"
          />
        </section>

        {/* Main Grid: Trips and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* My Trips Section */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white tracking-tight">My Trips</h3>
              <Link href="/trips" className="text-secondary font-bold text-[10px] uppercase tracking-widest hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>

          {/* Budget Analytics Widget */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Analytics</h3>
            <div className="glass-panel p-8 h-full flex flex-col">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-8">Budget Breakdown</p>
              
              {/* Pseudo Doughnut Chart */}
              <div className="relative w-48 h-48 mx-auto my-6 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" fill="none" r="16" stroke="rgba(255,255,255,0.05)" strokeWidth="3"></circle>
                  <circle cx="18" cy="18" fill="none" r="16" stroke="#6C63FF" strokeDasharray="40 100" strokeWidth="3"></circle>
                  <circle cx="18" cy="18" fill="none" r="16" stroke="#00D9C0" strokeDasharray="25 100" strokeDashoffset="-40" strokeWidth="3"></circle>
                  <circle cx="18" cy="18" fill="none" r="16" stroke="#ffb785" strokeDasharray="20 100" strokeDashoffset="-65" strokeWidth="3"></circle>
                  <circle cx="18" cy="18" fill="none" r="16" stroke="#e4e1ee" strokeDasharray="15 100" strokeDashoffset="-85" strokeWidth="3"></circle>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">$24.5k</span>
                  <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Spent</span>
                </div>
              </div>

              <div className="space-y-4 mt-auto">
                {[
                  { label: "Transport", color: "bg-[#6C63FF]", value: "40%" },
                  { label: "Lodging", color: "bg-secondary", value: "25%" },
                  { label: "Activities", color: "bg-orange-400", value: "20%" },
                  { label: "Food", color: "bg-white", value: "15%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={cn("w-3 h-3 rounded-full", item.color)}></span>
                      <span className="text-sm font-medium text-white/70">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Completed Trip Card (Extra Feature from Stitch) */}
        <section className="glass-panel p-8 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <Compass className="w-48 h-48" />
          </div>
          <div className="w-full md:w-1/3 h-52 rounded-xl overflow-hidden relative">
            <Image 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=60" 
              alt="Swiss Alps" 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="flex-1 space-y-6 z-10">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-white/10 text-white/60 text-[10px] font-bold rounded-full uppercase tracking-widest">Completed</span>
              <h4 className="text-2xl font-bold text-white tracking-tight">Swiss Alps Escape</h4>
            </div>
            <p className="text-base text-white/60 max-w-xl leading-relaxed">
              Our most expensive trip to date, focusing on high-altitude skiing and luxury spa retreats. 
              Budget was fully utilized with zero overages.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Final Budget</p>
                <p className="text-lg font-bold text-secondary">$6,000</p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Duration</p>
                <p className="text-lg font-bold text-white">10 Days</p>
              </div>
            </div>
          </div>
          <button className="glass-panel bg-white/10 px-8 py-3 text-secondary font-bold text-sm uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-all">
            Revisit Itinerary
          </button>
        </section>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 rounded-full primary-gradient text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 shadow-primary/40">
          <Plus className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
