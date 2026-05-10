// ─── Core Domain Types ────────────────────────────────────────────────────────

export type TripStatus = "draft" | "upcoming" | "ongoing" | "completed";
export type TravelStyle = "adventure" | "cultural" | "relaxation" | "foodie" | "budget" | "luxury";
export type ActivityCategory = "food" | "transport" | "attraction" | "accommodation" | "other";
export type BudgetLevel = "budget" | "mid-range" | "luxury";

// ─── User ─────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
}

// ─── Trip ─────────────────────────────────────────────────────────────────────

export interface Trip {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  start_date: string | null;
  end_date: string | null;
  status: TripStatus;
  is_public: boolean;
  remixed_from_id: string | null;
  remix_count: number;
  trip_score: number | null;
  created_at: string;
  updated_at: string;
  // Relations (eager-loaded)
  stops?: ItineraryStop[];
  budget?: Budget | null;
  _count?: { activities: number; stops: number };
  user?: Pick<User, "id" | "name" | "avatar_url">;
  // Computed helpers
  duration_days?: number;
}

// ─── Itinerary Stop ───────────────────────────────────────────────────────────

export interface ItineraryStop {
  id: string;
  trip_id: string;
  city: string;
  country: string | null;
  day_number: number;
  order_index: number;
  arrival: string | null;
  departure: string | null;
  stay_cost: number | null;
  notes: string | null;
  created_at: string;
  activities?: Activity[];
}

// ─── Activity ─────────────────────────────────────────────────────────────────

export interface Activity {
  id: string;
  trip_id: string;
  stop_id: string | null;
  name: string;
  description: string | null;
  category: ActivityCategory;
  cost: number | null;
  duration_hr: number | null;
  start_time: string | null;
  day_number: number | null;
  order_index: number;
  score: number | null;
  created_at: string;
}

// ─── Budget ───────────────────────────────────────────────────────────────────

export interface Budget {
  id: string;
  trip_id: string;
  total_budget: number | null;
  transport_est: number | null;
  accommodation_est: number | null;
  food_est: number | null;
  activities_est: number | null;
  misc_est: number | null;
  currency: string;
  updated_at: string;
  // Computed
  daily_average?: number;
  alert?: "over_budget" | null;
}

// ─── Packing + Notes ──────────────────────────────────────────────────────────

export interface PackingItem {
  id: string;
  trip_id: string;
  name: string;
  category: string | null;
  is_checked: boolean;
  created_at: string;
}

export interface TripNote {
  id: string;
  trip_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// ─── UI-specific helpers ──────────────────────────────────────────────────────

export interface TripFormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  budget_level: BudgetLevel;
  travel_style: TravelStyle;
  companions: number;
  destinations: string[];
  notes: string;
}

export interface BudgetBreakdown {
  accommodation_est: number;
  food_est: number;
  transport_est: number;
  activities_est: number;
  misc_est: number;
  total_budget: number;
  daily_average: number;
  currency: string;
}

export interface DestinationCard {
  id: string;
  name: string;
  country: string;
  image: string;
  tag: string;
  tripCount: number;
}
