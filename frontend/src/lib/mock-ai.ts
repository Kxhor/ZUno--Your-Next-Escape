// ─── Mock AI Service ────────────────────────────────────────────────────────

export async function generateAITrip(params: {
  title: string;
  destinations: string;
  days: number;
  style: string;
}) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 3500));

  const dest = params.destinations.split(",")[0]?.trim() || "Unknown Destination";
  const cinematicDesc = `A highly curated ${params.days}-day ${params.style} escape to ${dest}. We've analyzed thousands of data points to optimize your route for minimal crowds and maximum awe. Expect a blend of hidden gems and iconic must-sees.`;

  return {
    id: `ai-gen-${Date.now()}`,
    title: params.title || `The ${dest} Experience`,
    description: cinematicDesc,
    cover_image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80",
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + params.days * 86400000).toISOString(),
    status: "draft" as const,
    is_public: false,
    remixed_from_id: null,
    remix_count: 0,
    trip_score: 96,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    duration_days: params.days,
    stops: [
      {
        id: "ai-stop-1",
        trip_id: "ai-gen",
        city: dest,
        country: null,
        day_number: 1,
        order_index: 0,
        arrival: new Date().toISOString(),
        departure: new Date(Date.now() + params.days * 86400000).toISOString(),
        stay_cost: 450,
        notes: "ZUno AI recommends staying in the historic district for walkability.",
        created_at: new Date().toISOString(),
        activities: [
          {
            id: "ai-act-1",
            trip_id: "ai-gen",
            stop_id: "ai-stop-1",
            name: "Golden Hour Arrival & Local Tastes",
            description: "Check into your curated boutique hotel, then head immediately to the local market for golden hour. Grab street food as the city lights up.",
            category: "food" as const,
            cost: 25,
            duration_hr: 3,
            start_time: "17:00",
            day_number: 1,
            order_index: 0,
            score: null,
            created_at: new Date().toISOString(),
          },
        ],
      },
    ],
    budget: {
      id: "ai-budget-1",
      trip_id: "ai-gen",
      total_budget: params.days * 150,
      transport_est: params.days * 30,
      accommodation_est: params.days * 70,
      food_est: params.days * 40,
      activities_est: params.days * 10,
      misc_est: 0,
      currency: "USD",
      updated_at: new Date().toISOString(),
      daily_average: 150,
      alert: null,
    },
  };
}

export async function generatePackingList(destinations: string, days: number, style: string) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const items = [
    { name: "Passport & ID", category: "Documents", is_checked: false },
    { name: "Travel Insurance", category: "Documents", is_checked: false },
    { name: "Phone Charger", category: "Electronics", is_checked: false },
    { name: "Power Bank", category: "Electronics", is_checked: false },
    { name: "Universal Adapter", category: "Electronics", is_checked: false },
    { name: "Underwear", category: "Clothing", is_checked: false },
    { name: "Socks", category: "Clothing", is_checked: false },
    { name: "Comfortable Walking Shoes", category: "Clothing", is_checked: false },
    { name: "Toothbrush & Paste", category: "Health", is_checked: false },
    { name: "Deodorant", category: "Health", is_checked: false },
    { name: "First Aid Kit", category: "Health", is_checked: false },
  ];

  if (style === "adventure") {
    items.push({ name: "Hiking Boots", category: "Clothing", is_checked: false });
    items.push({ name: "Water Bottle", category: "Essentials", is_checked: false });
  } else if (style === "relaxation") {
    items.push({ name: "Swimsuit", category: "Clothing", is_checked: false });
    items.push({ name: "Sunscreen", category: "Health", is_checked: false });
  }

  return items;
}
