import { useState, useEffect } from "react";

const C = {
    bg: "#FDFAF4", card: "#FFFFFF", primary: "#0C3B2A", accent: "#F4A31A",
    accentL: "#FEF3C7", text: "#1A1A1A", muted: "#6E6658", border: "#E9E4D8",
    green: "#10B981", red: "#EF4444", purple: "#8B5CF6", blue: "#3B82F6",
    sidebarBg: "#0C3B2A", sidebarText: "#D4EDDA"
};

const trips = [
    { id: 1, name: "Southeast Asia Adventure", start: "Jun 10", end: "Jun 28, 2025", stops: ["Bangkok", "Chiang Mai", "Hanoi", "HCMC"], budget: 3200, spent: 2100, emoji: "🌏", days: 18 },
    { id: 2, name: "European Summer", start: "Jul 15", end: "Aug 05, 2025", stops: ["Paris", "Amsterdam", "Berlin", "Prague"], budget: 5500, spent: 1200, emoji: "🗼", days: 22 },
    { id: 3, name: "Japan Cherry Blossom", start: "Mar 25", end: "Apr 08, 2025", stops: ["Tokyo", "Kyoto", "Osaka"], budget: 4800, spent: 4800, emoji: "⛩️", days: 15 },
];

const cities = [
    { name: "Tokyo", country: "Japan", cost: "$$$$", pop: 98, tag: "🏙️ Metropolis" },
    { name: "Bali", country: "Indonesia", cost: "$$", pop: 92, tag: "🌺 Paradise" },
    { name: "Paris", country: "France", cost: "$$$$", pop: 95, tag: "🗼 Romance" },
    { name: "Bangkok", country: "Thailand", cost: "$$", pop: 89, tag: "🏯 Street Life" },
    { name: "Barcelona", country: "Spain", cost: "$$$", pop: 91, tag: "🏛️ Culture" },
    { name: "New York", country: "USA", cost: "$$$$", pop: 94, tag: "🗽 Energy" },
];

const activities = [
    { name: "Senso-ji Temple Visit", type: "Sightseeing", cost: 0, dur: "2h" },
    { name: "Tsukiji Fish Market Tour", type: "Food", cost: 45, dur: "3h" },
    { name: "Mount Fuji Day Trip", type: "Adventure", cost: 120, dur: "Full day" },
    { name: "Shibuya Crossing Experience", type: "Sightseeing", cost: 0, dur: "1h" },
    { name: "Ramen Making Class", type: "Food", cost: 65, dur: "2.5h" },
    { name: "TeamLab Planets (Digital Art)", type: "Culture", cost: 32, dur: "2h" },
];

const packingData = {
    "Clothing": { icon: "👕", items: ["T-shirts (5)", "Jeans", "Light jacket", "Swimwear", "Walking shoes", "Sandals"] },
    "Documents": { icon: "📄", items: ["Passport", "Visa", "Travel insurance", "Hotel printouts", "Flight tickets", "Emergency contacts"] },
    "Electronics": { icon: "🔌", items: ["Phone charger", "Universal adapter", "Power bank", "Camera", "Earphones"] },
    "Toiletries": { icon: "🧴", items: ["Sunscreen", "Toothbrush", "Medications", "Hand sanitizer", "Insect repellent"] },
};

const budget = [
    { cat: "Transport", amt: 820, color: C.accent, icon: "✈️" },
    { cat: "Accommodation", amt: 1240, color: C.green, icon: "🏨" },
    { cat: "Activities", amt: 560, color: C.purple, icon: "🎯" },
    { cat: "Meals", amt: 480, color: C.red, icon: "🍜" },
];

const totalBudget = budget.reduce((s, b) => s + b.amt, 0);

const itinerary = [
    {
        day: 1, city: "Tokyo", date: "Mar 25", activities: [
            { name: "Arrive at Narita Airport", time: "14:00", cost: 0, type: "Transport" },
            { name: "Check-in Shinjuku Hotel", time: "16:00", cost: 0, type: "Stay" },
            { name: "Shibuya Crossing & Dinner", time: "19:00", cost: 45, type: "Food" },
        ]
    },
    {
        day: 2, city: "Tokyo", date: "Mar 26", activities: [
            { name: "Senso-ji Temple, Asakusa", time: "09:00", cost: 0, type: "Sightseeing" },
            { name: "Tsukiji Fish Market Tour", time: "12:00", cost: 45, type: "Food" },
            { name: "TeamLab Planets (Digital Art)", time: "17:00", cost: 32, type: "Culture" },
        ]
    },
    {
        day: 3, city: "Kyoto", date: "Mar 27", activities: [
            { name: "Shinkansen to Kyoto", time: "08:30", cost: 85, type: "Transport" },
            { name: "Fushimi Inari Shrine", time: "11:00", cost: 0, type: "Sightseeing" },
            { name: "Gion District Walk", time: "15:00", cost: 0, type: "Sightseeing" },
            { name: "Kaiseki Dinner", time: "19:00", cost: 95, type: "Food" },
        ]
    },
];

const notes = [
    { id: 1, trip: "Japan Cherry Blossom", title: "Hotel Check-in Notes", text: "Shinjuku Prince Hotel — check-in from 3pm. Luggage storage available.", date: "Mar 20, 2025" },
    { id: 2, trip: "Japan Cherry Blossom", title: "Emergency Contacts", text: "Travel agent: +81-3-1234-5678. Embassy: +81-3-3224-5000.", date: "Mar 20, 2025" },
];

const btnBase = { border: "none", cursor: "pointer", borderRadius: 8, fontFamily: "inherit", fontWeight: 600, transition: "all 0.15s" };
const inputBase = { border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontFamily: "inherit", fontSize: 14, outline: "none", width: "100%", background: "#fff", color: C.text, boxSizing: "border-box" };

function Tag({ children, color = C.accentL, textColor = "#92400E" }) {
    return <span style={{ background: color, color: textColor, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{children}</span>;
}

function Card({ children, style = {} }) {
    return <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 24px", ...style }}>{children}</div>;
}

function Avatar({ name, size = 40 }) {
    const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    return <div style={{ width: size, height: size, borderRadius: "50%", background: C.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.38, flexShrink: 0 }}>{initials}</div>;
}

function ProgressBar({ value, max, color = C.green, height = 8 }) {
    const pct = Math.min(100, Math.round((value / max) * 100));
    return (
        <div style={{ background: C.border, borderRadius: 99, height, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.5s" }} />
        </div>
    );
}

function Sidebar({ screen, setScreen, collapsed }) {
    const items = [
        { id: "dashboard", label: "Home", icon: "🏠" },
        { id: "trips", label: "My Trips", icon: "🗺️" },
        { id: "itinerary", label: "Itinerary", icon: "📅" },
        { id: "budget", label: "Budget", icon: "💰" },
        { id: "checklist", label: "Packing", icon: "🎒" },
        { id: "notes", label: "Journal", icon: "📝" },
        { id: "profile", label: "Profile", icon: "👤" },
    ];
    return (
        <div style={{ width: collapsed ? 64 : 220, background: C.sidebarBg, display: "flex", flexDirection: "column", height: "100%", transition: "width 0.2s", flexShrink: 0 }}>
            <div style={{ padding: collapsed ? "24px 0" : "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                {collapsed
                    ? <div style={{ textAlign: "center", fontSize: 22 }}>✈️</div>
                    : <div>
                        <div style={{ color: C.accent, fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>Traveloop</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 2 }}>Plan. Explore. Share.</div>
                    </div>
                }
            </div>
            <nav style={{ flex: 1, padding: "12px 0" }}>
                {items.map(item => {
                    const active = screen === item.id;
                    return (
                        <button key={item.id} onClick={() => setScreen(item.id)} style={{
                            ...btnBase, display: "flex", alignItems: "center", gap: 12,
                            width: "100%", padding: collapsed ? "12px 0" : "11px 20px",
                            justifyContent: collapsed ? "center" : "flex-start",
                            background: active ? "rgba(244,163,26,0.15)" : "transparent",
                            color: active ? C.accent : "rgba(255,255,255,0.65)",
                            fontWeight: active ? 700 : 500, fontSize: 14,
                            borderLeft: active ? `3px solid ${C.accent}` : "3px solid transparent",
                            borderRadius: 0, transition: "all 0.15s"
                        }}>
                            <span style={{ fontSize: 18 }}>{item.icon}</span>
                            {!collapsed && item.label}
                        </button>
                    );
                })}
            </nav>
            <div style={{ padding: collapsed ? "16px 0" : "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                {collapsed
                    ? <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 18 }}>👤</div>
                    : <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar name="Alex Morgan" size={34} />
                        <div>
                            <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>Alex Morgan</div>
                            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Explorer</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

function LoginScreen({ onLogin }) {
    const [tab, setTab] = useState("login");
    const [form, setForm] = useState({ email: "", password: "", name: "" });

    return (
        <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.primary} 0%, #1a5c3f 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}</style>
            <div style={{ width: "100%", maxWidth: 420 }}>
                <div style={{ textAlign: "center", marginBottom: 36 }}>
                    <div style={{ fontSize: 48, marginBottom: 8 }}>✈️</div>
                    <h1 style={{ color: "#fff", fontFamily: "Fraunces", fontSize: 38, fontWeight: 700, margin: "0 0 6px", letterSpacing: -1 }}>Traveloop</h1>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, margin: 0 }}>Your personal travel planner</p>
                </div>
                <div style={{ background: "#fff", borderRadius: 20, padding: 36, boxShadow: "0 25px 60px rgba(0,0,0,0.25)" }}>
                    <div style={{ display: "flex", background: C.bg, borderRadius: 10, padding: 4, marginBottom: 28 }}>
                        {["login", "signup"].map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{
                                ...btnBase, flex: 1, padding: "9px 0", fontSize: 14,
                                background: tab === t ? C.accent : "transparent",
                                color: tab === t ? "#fff" : C.muted, textTransform: "capitalize"
                            }}>{t === "login" ? "Log In" : "Sign Up"}</button>
                        ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {tab === "signup" && (
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6 }}>FULL NAME</label>
                                <input style={inputBase} placeholder="Alex Morgan" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                        )}
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6 }}>EMAIL ADDRESS</label>
                            <input style={inputBase} type="email" placeholder="alex@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6 }}>PASSWORD</label>
                            <input style={inputBase} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                        </div>
                        {tab === "login" && <div style={{ textAlign: "right" }}><a href="#" style={{ fontSize: 13, color: C.primary, fontWeight: 600, textDecoration: "none" }}>Forgot password?</a></div>}
                        <button onClick={onLogin} style={{ ...btnBase, background: C.accent, color: "#fff", padding: "13px", fontSize: 15, borderRadius: 10, marginTop: 6 }}>
                            {tab === "login" ? "Log In →" : "Create Account →"}
                        </button>
                    </div>
                    <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 20, marginBottom: 0 }}>
                        {tab === "login" ? "No account? " : "Already have one? "}
                        <a href="#" style={{ color: C.primary, fontWeight: 700, textDecoration: "none" }} onClick={e => { e.preventDefault(); setTab(tab === "login" ? "signup" : "login"); }}>
                            {tab === "login" ? "Sign up free" : "Log in"}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

function Dashboard({ setScreen }) {
    const stats = [
        { label: "Trips Planned", value: 7, icon: "🗺️" },
        { label: "Countries Visited", value: 14, icon: "🌍" },
        { label: "Days Traveled", value: 127, icon: "📅" },
        { label: "Total Saved", value: "$2.4k", icon: "💰" },
    ];
    return (
        <div style={{ padding: "32px 36px", overflowY: "auto", height: "100%" }}>
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontFamily: "Fraunces", fontSize: 30, fontWeight: 700, color: C.text, margin: "0 0 4px", letterSpacing: -0.5 }}>Good morning, Alex ☀️</h1>
                <p style={{ color: C.muted, margin: 0, fontSize: 15 }}>You have 2 upcoming trips. Let's make them unforgettable.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
                {stats.map(s => (
                    <Card key={s.label} style={{ textAlign: "center", padding: "20px 16px" }}>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: C.text, marginBottom: 4 }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{s.label.toUpperCase()}</div>
                    </Card>
                ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24, marginBottom: 32 }}>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <h2 style={{ fontFamily: "Fraunces", fontSize: 20, margin: 0, color: C.text }}>Upcoming Trips</h2>
                        <button onClick={() => setScreen("trips")} style={{ ...btnBase, background: "none", color: C.primary, fontSize: 13, fontWeight: 700, padding: "6px 12px", border: `1px solid ${C.border}` }}>View All</button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {trips.slice(0, 2).map(t => (
                            <Card key={t.id} style={{ padding: "18px 20px", cursor: "pointer" }} onClick={() => setScreen("itinerary")}>
                                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                                    <div style={{ fontSize: 32, width: 50, height: 50, background: C.accentL, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{t.emoji}</div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 3 }}>{t.name}</div>
                                        <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>{t.start} → {t.end} · {t.stops.length} stops</div>
                                        <ProgressBar value={t.spent} max={t.budget} color={t.spent >= t.budget ? C.red : C.green} height={6} />
                                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                                            <span style={{ fontSize: 11, color: C.muted }}>Spent: ${t.spent.toLocaleString()}</span>
                                            <span style={{ fontSize: 11, color: C.muted }}>Budget: ${t.budget.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 style={{ fontFamily: "Fraunces", fontSize: 20, margin: "0 0 16px", color: C.text }}>Trending Destinations</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {cities.slice(0, 5).map(c => (
                            <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px" }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{c.name}, {c.country}</div>
                                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{c.tag}</div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <Tag>{c.cost}</Tag>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>🔥 {c.pop}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Card style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #1a5c3f 100%)`, border: "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>READY FOR YOUR NEXT ADVENTURE?</div>
                        <h3 style={{ color: "#fff", fontFamily: "Fraunces", fontSize: 22, margin: 0, fontWeight: 700 }}>Plan a new trip in minutes</h3>
                        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, margin: "8px 0 0" }}>Add cities, activities, and budgets all in one place.</p>
                    </div>
                    <button onClick={() => setScreen("trips")} style={{ ...btnBase, background: C.accent, color: "#fff", padding: "12px 24px", fontSize: 14, whiteSpace: "nowrap", flexShrink: 0 }}>+ Plan New Trip</button>
                </div>
            </Card>
        </div>
    );
}

function MyTrips({ setScreen }) {

    const [showCreate, setShowCreate] = useState(false);

    const [newTrip, setNewTrip] = useState({
        name: "",
        start: "",
        end: "",
        desc: ""
    });

    const [myTrips, setMyTrips] = useState([]);

    // =========================
    // LOAD TRIPS FROM BACKEND
    // =========================

    useEffect(() => {
        loadTrips();
    }, []);

    const loadTrips = async () => {
        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/trips"
            );

            const data = await response.json();

            setMyTrips(data);

        } catch (error) {
            console.log(error);
        }
    };

    // =========================
    // CREATE NEW TRIP
    // =========================

    const handleCreate = async () => {

        if (!newTrip.name || !newTrip.start) return;

        const payload = {
            title: newTrip.name,
            description: newTrip.desc,
            start_date: newTrip.start,
            end_date: newTrip.end,
            total_budget: 0
        };

        try {

            await fetch(
                "http://127.0.0.1:8000/api/trips/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            await loadTrips();

            setNewTrip({
                name: "",
                start: "",
                end: "",
                desc: ""
            });

            setShowCreate(false);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            style={{
                padding: "32px 36px",
                overflowY: "auto",
                height: "100%",
                position: "relative"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 28
                }}
            >

                <div>
                    <h1
                        style={{
                            fontFamily: "Fraunces",
                            fontSize: 28,
                            fontWeight: 700,
                            color: C.text,
                            margin: "0 0 4px",
                            letterSpacing: -0.5
                        }}
                    >
                        My Trips
                    </h1>

                    <p
                        style={{
                            color: C.muted,
                            margin: 0,
                            fontSize: 14
                        }}
                    >
                        {myTrips.length} trips in your collection
                    </p>
                </div>

                <button
                    onClick={() => setShowCreate(true)}
                    style={{
                        ...btnBase,
                        background: C.accent,
                        color: "#fff",
                        padding: "11px 20px",
                        fontSize: 14
                    }}
                >
                    + New Trip
                </button>

            </div>

            {/* CREATE MODAL */}

            {showCreate && (

                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000
                    }}
                >

                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 20,
                            padding: 36,
                            width: 460,
                            maxWidth: "90vw"
                        }}
                    >

                        <h2
                            style={{
                                marginBottom: 20
                            }}
                        >
                            Create Trip
                        </h2>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 14
                            }}
                        >

                            <input
                                style={inputBase}
                                placeholder="Trip name"
                                value={newTrip.name}
                                onChange={(e) =>
                                    setNewTrip({
                                        ...newTrip,
                                        name: e.target.value
                                    })
                                }
                            />

                            <input
                                style={inputBase}
                                type="date"
                                value={newTrip.start}
                                onChange={(e) =>
                                    setNewTrip({
                                        ...newTrip,
                                        start: e.target.value
                                    })
                                }
                            />

                            <input
                                style={inputBase}
                                type="date"
                                value={newTrip.end}
                                onChange={(e) =>
                                    setNewTrip({
                                        ...newTrip,
                                        end: e.target.value
                                    })
                                }
                            />

                            <textarea
                                style={{
                                    ...inputBase,
                                    height: 100
                                }}
                                placeholder="Description"
                                value={newTrip.desc}
                                onChange={(e) =>
                                    setNewTrip({
                                        ...newTrip,
                                        desc: e.target.value
                                    })
                                }
                            />

                            <div
                                style={{
                                    display: "flex",
                                    gap: 10
                                }}
                            >

                                <button
                                    onClick={() => setShowCreate(false)}
                                    style={{
                                        ...btnBase,
                                        flex: 1,
                                        padding: 12,
                                        background: "#eee"
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleCreate}
                                    style={{
                                        ...btnBase,
                                        flex: 2,
                                        padding: 12,
                                        background: C.primary,
                                        color: "#fff"
                                    }}
                                >
                                    Save Trip
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* TRIPS GRID */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 20
                }}
            >

                {myTrips.map((t) => (

                    <div
                        key={t.id}
                        style={{
                            background: "#fff",
                            border: `1px solid ${C.border}`,
                            borderRadius: 16,
                            overflow: "hidden"
                        }}
                    >

                        <div
                            style={{
                                background: C.primary,
                                padding: "24px"
                            }}
                        >

                            <h2
                                style={{
                                    color: "#fff",
                                    margin: 0
                                }}
                            >
                                {t.title}
                            </h2>

                            <p
                                style={{
                                    color: "rgba(255,255,255,0.7)",
                                    marginTop: 6,
                                    fontSize: 13
                                }}
                            >
                                {t.start_date} → {t.end_date}
                            </p>

                        </div>

                        <div
                            style={{
                                padding: 20
                            }}
                        >

                            <p
                                style={{
                                    color: C.muted,
                                    fontSize: 14,
                                    minHeight: 60
                                }}
                            >
                                {t.description}
                            </p>

                            <div
                                style={{
                                    marginTop: 14,
                                    fontWeight: 700,
                                    color: C.primary
                                }}
                            >
                                Budget: ₹{t.total_budget}
                            </div>

                            <button
                                onClick={() => setScreen("itinerary")}
                                style={{
                                    ...btnBase,
                                    width: "100%",
                                    marginTop: 18,
                                    padding: "10px",
                                    background: C.accent,
                                    color: "#fff"
                                }}
                            >
                                Open Trip
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

function ItineraryScreen({ setScreen }) {
    const [tab, setTab] = useState("builder");
    const [selectedCity, setSelectedCity] = useState("Tokyo");
    const [citySearch, setCitySearch] = useState("");
    const [addedCities, setAddedCities] = useState(["Tokyo", "Kyoto", "Osaka"]);
    const [addedActivities, setAddedActivities] = useState([]);
    const [actFilter, setActFilter] = useState("All");

    const filteredCities = cities.filter(c => c.name.toLowerCase().includes(citySearch.toLowerCase()) || c.country.toLowerCase().includes(citySearch.toLowerCase()));
    const filteredActs = activities.filter(a => actFilter === "All" || a.type === actFilter);
    const actTypes = ["All", "Sightseeing", "Food", "Adventure", "Culture"];
    const typeColors = { Sightseeing: "#DBEAFE", Food: "#FEF3C7", Adventure: "#F3E8FF", Culture: "#D1FAE5" };
    const typeTxtColors = { Sightseeing: "#1D4ED8", Food: "#92400E", Adventure: "#6D28D9", Culture: "#065F46" };

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
            <div style={{ padding: "24px 36px 0", flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div>
                        <h1 style={{ fontFamily: "Fraunces", fontSize: 26, fontWeight: 700, color: C.text, margin: "0 0 2px" }}>Japan Cherry Blossom ⛩️</h1>
                        <p style={{ color: C.muted, margin: 0, fontSize: 13 }}>Mar 25 – Apr 08, 2025 · 15 days · 3 cities</p>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                        <button style={{ ...btnBase, background: C.primary, color: "#fff", padding: "9px 16px", fontSize: 13 }}>🔗 Share</button>
                        <button style={{ ...btnBase, background: C.bg, color: C.muted, padding: "9px 16px", fontSize: 13, border: `1px solid ${C.border}` }}>⬇️ Export</button>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${C.border}` }}>
                    {["builder", "view", "cities", "activities"].map(t => (
                        <button key={t} onClick={() => setTab(t)} style={{ ...btnBase, padding: "10px 18px", background: "none", fontSize: 13, fontWeight: tab === t ? 700 : 500, color: tab === t ? C.primary : C.muted, borderBottom: tab === t ? `2px solid ${C.primary}` : "2px solid transparent", borderRadius: 0, marginBottom: -1, textTransform: "capitalize" }}>
                            {t === "builder" ? "🛠 Builder" : t === "view" ? "📋 View" : t === "cities" ? "🏙 City Search" : "🎯 Activities"}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "24px 36px" }}>
                {tab === "builder" && (
                    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 13, color: C.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Trip Stops</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                                {addedCities.map((city, i) => (
                                    <div key={city} style={{ background: city === selectedCity ? C.primary : "#fff", border: `1px solid ${city === selectedCity ? C.primary : C.border}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                                        onClick={() => setSelectedCity(city)}
                                    >
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 14, color: city === selectedCity ? "#fff" : C.text }}>Stop {i + 1}: {city}</div>
                                            <div style={{ fontSize: 11, color: city === selectedCity ? "rgba(255,255,255,0.6)" : C.muted, marginTop: 2 }}>Mar {25 + i * 2} – Mar {27 + i * 2}</div>
                                        </div>
                                        <span style={{ fontSize: 16 }}>☰</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setTab("cities")} style={{ ...btnBase, width: "100%", padding: "10px", background: C.accentL, color: "#92400E", border: `1px dashed ${C.accent}`, fontSize: 13 }}>+ Add Stop</button>
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 13, color: C.muted, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Activities in {selectedCity}</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {itinerary.filter(d => d.city === selectedCity).flatMap(d => d.activities).map((a, i) => (
                                    <Card key={i} style={{ padding: "14px 18px" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                                <div style={{ background: C.border, borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 600, color: C.muted, whiteSpace: "nowrap" }}>{a.time}</div>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{a.name}</div>
                                                    <Tag color={typeColors[a.type] || C.accentL} textColor={typeTxtColors[a.type] || "#92400E"}>{a.type}</Tag>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <span style={{ fontWeight: 700, fontSize: 14, color: a.cost === 0 ? C.green : C.text }}>{a.cost === 0 ? "Free" : `$${a.cost}`}</span>
                                                <button style={{ ...btnBase, padding: "5px 8px", background: "#FEF2F2", color: C.red, fontSize: 12, border: "none" }}>✕</button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                                <button onClick={() => setTab("activities")} style={{ ...btnBase, padding: "12px", background: C.accentL, color: "#92400E", border: `1px dashed ${C.accent}`, fontSize: 13 }}>+ Add Activity</button>
                            </div>
                        </div>
                    </div>
                )}

                {tab === "view" && (
                    <div>
                        {itinerary.map(day => (
                            <div key={day.day} style={{ marginBottom: 28 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                                    <div style={{ background: C.primary, color: "#fff", borderRadius: 10, padding: "8px 14px", fontWeight: 700, fontSize: 13 }}>Day {day.day}</div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>{day.city}</div>
                                        <div style={{ fontSize: 12, color: C.muted }}>{day.date}</div>
                                    </div>
                                </div>
                                <div style={{ paddingLeft: 16, borderLeft: `2px solid ${C.accent}`, display: "flex", flexDirection: "column", gap: 10 }}>
                                    {day.activities.map((a, i) => (
                                        <div key={i} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                                <div style={{ background: C.accentL, color: "#92400E", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontWeight: 700 }}>{a.time}</div>
                                                <div>
                                                    <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{a.name}</div>
                                                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{a.type}</div>
                                                </div>
                                            </div>
                                            <span style={{ fontWeight: 700, color: a.cost === 0 ? C.green : C.text }}>{a.cost === 0 ? "Free" : `$${a.cost}`}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {tab === "cities" && (
                    <div>
                        <input style={{ ...inputBase, marginBottom: 20, fontSize: 15 }} placeholder="🔍  Search cities by name or country..." value={citySearch} onChange={e => setCitySearch(e.target.value)} />
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                            {filteredCities.map(c => (
                                <Card key={c.name} style={{ padding: "18px 20px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 16, color: C.text }}>{c.name}</div>
                                            <div style={{ fontSize: 12, color: C.muted }}>{c.country}</div>
                                        </div>
                                        <Tag>{c.cost}</Tag>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ fontSize: 12, color: C.muted }}>Popularity: <b style={{ color: C.primary }}>{c.pop}/100</b></div>
                                        <button
                                            onClick={() => { if (!addedCities.includes(c.name)) setAddedCities([...addedCities, c.name]); }}
                                            style={{ ...btnBase, padding: "6px 12px", background: addedCities.includes(c.name) ? "#D1FAE5" : C.primary, color: addedCities.includes(c.name) ? "#065F46" : "#fff", fontSize: 12 }}
                                        >{addedCities.includes(c.name) ? "✓ Added" : "+ Add"}</button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {tab === "activities" && (
                    <div>
                        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                            {actTypes.map(t => (
                                <button key={t} onClick={() => setActFilter(t)} style={{ ...btnBase, padding: "7px 14px", background: actFilter === t ? C.primary : C.bg, color: actFilter === t ? "#fff" : C.muted, fontSize: 13, border: `1px solid ${actFilter === t ? C.primary : C.border}` }}>{t}</button>
                            ))}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
                            {filteredActs.map((a, i) => (
                                <Card key={i} style={{ padding: "16px 20px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <div style={{ flex: 1, minWidth: 0, marginRight: 12 }}>
                                            <div style={{ fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 6 }}>{a.name}</div>
                                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                                <Tag color={typeColors[a.type] || C.accentL} textColor={typeTxtColors[a.type] || "#92400E"}>{a.type}</Tag>
                                                <span style={{ fontSize: 12, color: C.muted }}>⏱ {a.dur}</span>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                                            <span style={{ fontWeight: 700, fontSize: 16, color: a.cost === 0 ? C.green : C.text }}>{a.cost === 0 ? "Free" : `$${a.cost}`}</span>
                                            <button
                                                onClick={() => { const key = a.name; setAddedActivities(prev => prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key]); }}
                                                style={{ ...btnBase, padding: "6px 12px", background: addedActivities.includes(a.name) ? "#D1FAE5" : C.accent, color: addedActivities.includes(a.name) ? "#065F46" : "#fff", fontSize: 12 }}
                                            >{addedActivities.includes(a.name) ? "✓ Added" : "+ Add"}</button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function BudgetScreen() {
    const totalSpent = budget.reduce((s, b) => s + b.amt, 0);
    const tripBudget = 4800;
    const remaining = tripBudget - totalSpent;

    return (
        <div style={{ padding: "32px 36px", overflowY: "auto", height: "100%" }}>
            <h1 style={{ fontFamily: "Fraunces", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 4px", letterSpacing: -0.5 }}>Budget Overview 💰</h1>
            <p style={{ color: C.muted, margin: "0 0 28px", fontSize: 14 }}>Japan Cherry Blossom · 15 days</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
                {[
                    { label: "Total Budget", value: `$${tripBudget.toLocaleString()}`, color: C.primary },
                    { label: "Amount Spent", value: `$${totalSpent.toLocaleString()}`, color: C.accent },
                    { label: "Remaining", value: `$${remaining.toLocaleString()}`, color: remaining >= 0 ? C.green : C.red },
                ].map(s => (
                    <Card key={s.label} style={{ textAlign: "center", padding: "24px" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                        <div style={{ fontSize: 30, fontWeight: 800, color: s.color }}>{s.value}</div>
                        {s.label === "Amount Spent" && <div style={{ marginTop: 12 }}><ProgressBar value={totalSpent} max={tripBudget} color={C.accent} height={6} /></div>}
                    </Card>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <Card>
                    <h2 style={{ fontFamily: "Fraunces", fontSize: 18, margin: "0 0 20px", color: C.text }}>Cost Breakdown</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {budget.map(b => {
                            const pct = Math.round((b.amt / totalSpent) * 100);
                            return (
                                <div key={b.cat}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ fontSize: 18 }}>{b.icon}</span>
                                            <span style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{b.cat}</span>
                                        </div>
                                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                            <span style={{ fontSize: 12, color: C.muted }}>{pct}%</span>
                                            <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>${b.amt.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <ProgressBar value={b.amt} max={totalSpent} color={b.color} height={10} />
                                </div>
                            );
                        })}
                    </div>
                </Card>

                <Card>
                    <h2 style={{ fontFamily: "Fraunces", fontSize: 18, margin: "0 0 20px", color: C.text }}>Visual Split</h2>
                    <div style={{ display: "flex", height: 180, borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
                        {budget.map(b => {
                            const w = Math.round((b.amt / totalSpent) * 100);
                            return (
                                <div key={b.cat} style={{ width: `${w}%`, background: b.color, display: "flex", alignItems: "center", justifyContent: "center", transition: "width 0.5s" }}>
                                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{w}%</span>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {budget.map(b => (
                            <div key={b.cat} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 12, height: 12, borderRadius: 3, background: b.color, flexShrink: 0 }} />
                                <span style={{ fontSize: 12, color: C.muted }}>{b.cat}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card style={{ gridColumn: "span 2" }}>
                    <h2 style={{ fontFamily: "Fraunces", fontSize: 18, margin: "0 0 16px", color: C.text }}>Day-by-Day Spending</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
                        {Array.from({ length: 15 }, (_, i) => {
                            const amt = Math.round(180 + Math.random() * 280);
                            const over = amt > 320;
                            return (
                                <div key={i} style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>D{i + 1}</div>
                                    <div style={{ height: 80, background: C.border, borderRadius: 6, display: "flex", alignItems: "flex-end", overflow: "hidden", marginBottom: 4 }}>
                                        <div style={{ width: "100%", height: `${Math.round((amt / 500) * 100)}%`, background: over ? C.red : C.green, transition: "height 0.5s" }} />
                                    </div>
                                    <div style={{ fontSize: 10, fontWeight: 700, color: over ? C.red : C.text }}>${amt}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: C.green, borderRadius: 2 }} /><span style={{ fontSize: 12, color: C.muted }}>Within budget</span></div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: C.red, borderRadius: 2 }} /><span style={{ fontSize: 12, color: C.muted }}>Over daily limit ($320)</span></div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function PackingScreen() {
    const [checked, setChecked] = useState({});
    const [openCat, setOpenCat] = useState("Clothing");
    const totalItems = Object.values(packingData).reduce((s, c) => s + c.items.length, 0);
    const checkedCount = Object.values(checked).filter(Boolean).length;

    const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div style={{ padding: "32px 36px", overflowY: "auto", height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <h1 style={{ fontFamily: "Fraunces", fontSize: 28, fontWeight: 700, color: C.text, margin: 0, letterSpacing: -0.5 }}>Packing Checklist 🎒</h1>
                <button onClick={() => setChecked({})} style={{ ...btnBase, background: C.bg, color: C.muted, padding: "8px 14px", fontSize: 13, border: `1px solid ${C.border}` }}>Reset All</button>
            </div>
            <p style={{ color: C.muted, margin: "0 0 24px", fontSize: 14 }}>Japan Cherry Blossom · {checkedCount} of {totalItems} items packed</p>

            <div style={{ marginBottom: 20 }}>
                <ProgressBar value={checkedCount} max={totalItems} color={checkedCount === totalItems ? C.green : C.accent} height={10} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 12, color: C.muted }}>
                    <span>{checkedCount} packed</span>
                    <span>{totalItems - checkedCount} remaining</span>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                {Object.entries(packingData).map(([cat, data]) => {
                    const catChecked = data.items.filter(item => checked[`${cat}-${item}`]).length;
                    return (
                        <Card key={cat} style={{ padding: 0, overflow: "hidden" }}>
                            <button onClick={() => setOpenCat(openCat === cat ? null : cat)} style={{ ...btnBase, width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", borderRadius: 0, borderBottom: openCat === cat ? `1px solid ${C.border}` : "none" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <span style={{ fontSize: 20 }}>{data.icon}</span>
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{cat}</div>
                                        <div style={{ fontSize: 11, color: C.muted }}>{catChecked}/{data.items.length} packed</div>
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 50, height: 6, background: C.border, borderRadius: 99, overflow: "hidden" }}>
                                        <div style={{ width: `${Math.round(catChecked / data.items.length * 100)}%`, height: "100%", background: C.green }} />
                                    </div>
                                    <span style={{ color: C.muted, fontSize: 18 }}>{openCat === cat ? "▲" : "▼"}</span>
                                </div>
                            </button>
                            {openCat === cat && (
                                <div style={{ padding: "8px 20px 16px" }}>
                                    {data.items.map(item => {
                                        const key = `${cat}-${item}`;
                                        const isChecked = checked[key];
                                        return (
                                            <div key={item} onClick={() => toggle(key)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
                                                <div style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${isChecked ? C.green : C.border}`, background: isChecked ? C.green : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                                                    {isChecked && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
                                                </div>
                                                <span style={{ fontSize: 14, color: isChecked ? C.muted : C.text, textDecoration: isChecked ? "line-through" : "none", transition: "all 0.15s" }}>{item}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

function NotesScreen() {
    const [myNotes, setMyNotes] = useState(notes);
    const [newNote, setNewNote] = useState({ title: "", text: "" });
    const [adding, setAdding] = useState(false);

    const addNote = () => {
        if (!newNote.title || !newNote.text) return;
        setMyNotes([...myNotes, { id: Date.now(), trip: "Japan Cherry Blossom", title: newNote.title, text: newNote.text, date: "May 10, 2026" }]);
        setNewNote({ title: "", text: "" });
        setAdding(false);
    };

    return (
        <div style={{ padding: "32px 36px", overflowY: "auto", height: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontFamily: "Fraunces", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 4px", letterSpacing: -0.5 }}>Trip Journal 📝</h1>
                    <p style={{ color: C.muted, margin: 0, fontSize: 14 }}>Notes and reminders for your trips</p>
                </div>
                <button onClick={() => setAdding(true)} style={{ ...btnBase, background: C.accent, color: "#fff", padding: "10px 18px", fontSize: 14 }}>+ New Note</button>
            </div>

            {adding && (
                <Card style={{ marginBottom: 24, border: `1px solid ${C.accent}` }}>
                    <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: C.text }}>New Note</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <input style={inputBase} placeholder="Note title..." value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} />
                        <textarea style={{ ...inputBase, height: 100, resize: "vertical" }} placeholder="Write your note here..." value={newNote.text} onChange={e => setNewNote({ ...newNote, text: e.target.value })} />
                        <div style={{ display: "flex", gap: 10 }}>
                            <button onClick={() => setAdding(false)} style={{ ...btnBase, flex: 1, padding: "10px", background: C.bg, color: C.muted, border: `1px solid ${C.border}` }}>Cancel</button>
                            <button onClick={addNote} style={{ ...btnBase, flex: 2, padding: "10px", background: C.accent, color: "#fff" }}>Save Note</button>
                        </div>
                    </div>
                </Card>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                {myNotes.map(n => (
                    <Card key={n.id} style={{ borderLeft: `4px solid ${C.accent}`, paddingLeft: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                            <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{n.title}</div>
                            <button onClick={() => setMyNotes(myNotes.filter(x => x.id !== n.id))} style={{ ...btnBase, padding: "4px 8px", background: "none", color: C.muted, fontSize: 16 }}>✕</button>
                        </div>
                        <Tag color={C.accentL} textColor="#92400E">{n.trip}</Tag>
                        <p style={{ fontSize: 14, color: C.muted, margin: "10px 0 12px", lineHeight: 1.6 }}>{n.text}</p>
                        <div style={{ fontSize: 11, color: "#C4B89A" }}>{n.date}</div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function ProfileScreen() {
    const [profile, setProfile] = useState({ name: "Alex Morgan", email: "alex@example.com", lang: "English", bio: "Adventure seeker, coffee lover, and travel enthusiast. 14 countries down, ∞ to go." });
    const [saved, setSaved] = useState(false);

    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <div style={{ padding: "32px 36px", overflowY: "auto", height: "100%" }}>
            <h1 style={{ fontFamily: "Fraunces", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 28px", letterSpacing: -0.5 }}>Profile & Settings 👤</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Card style={{ textAlign: "center", padding: "32px 24px" }}>
                        <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 28, margin: "0 auto 16px" }}>AM</div>
                        <div style={{ fontWeight: 700, fontSize: 18, color: C.text, fontFamily: "Fraunces" }}>{profile.name}</div>
                        <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>{profile.email}</div>
                        <Tag>🌍 Explorer</Tag>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
                            {[["7", "Trips"], ["14", "Countries"], ["127", "Days"], ["2", "Continents"]].map(([v, l]) => (
                                <div key={l} style={{ background: C.bg, borderRadius: 10, padding: "10px" }}>
                                    <div style={{ fontSize: 20, fontWeight: 800, color: C.primary }}>{v}</div>
                                    <div style={{ fontSize: 11, color: C.muted }}>{l}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                    <Card>
                        <h3 style={{ margin: "0 0 14px", fontFamily: "Fraunces", fontSize: 16 }}>Saved Destinations</h3>
                        {["Santorini, Greece", "Machu Picchu, Peru", "Maldives", "Northern Lights, Iceland"].map(d => (
                            <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
                                <span style={{ fontSize: 13, color: C.text }}>❤️ {d}</span>
                                <button style={{ ...btnBase, padding: "3px 8px", background: "none", color: C.muted, fontSize: 12, border: `1px solid ${C.border}` }}>Remove</button>
                            </div>
                        ))}
                    </Card>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <Card>
                        <h3 style={{ margin: "0 0 20px", fontFamily: "Fraunces", fontSize: 18 }}>Edit Profile</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6 }}>FULL NAME</label>
                                <input style={inputBase} value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
                            </div>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6 }}>EMAIL ADDRESS</label>
                                <input style={inputBase} type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
                            </div>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6 }}>LANGUAGE</label>
                                <select style={{ ...inputBase }}>
                                    {["English", "French", "Spanish", "Japanese", "German"].map(l => <option key={l}>{l}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 6 }}>BIO</label>
                                <textarea style={{ ...inputBase, height: 90, resize: "vertical" }} value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
                            </div>
                            <button onClick={save} style={{ ...btnBase, padding: "12px", background: saved ? C.green : C.accent, color: "#fff", fontSize: 15, transition: "background 0.3s" }}>
                                {saved ? "✓ Saved!" : "Save Changes"}
                            </button>
                        </div>
                    </Card>
                    <Card>
                        <h3 style={{ margin: "0 0 16px", fontFamily: "Fraunces", fontSize: 18 }}>Privacy & Account</h3>
                        {[{ icon: "🔒", title: "Change Password", desc: "Update your login credentials" }, { icon: "🌐", title: "Trip Visibility", desc: "Control who sees your plans" }, { icon: "🔔", title: "Notifications", desc: "Manage email & push alerts" }].map(item => (
                            <div key={item.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.border}` }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{item.title}</div>
                                        <div style={{ fontSize: 11, color: C.muted }}>{item.desc}</div>
                                    </div>
                                </div>
                                <button style={{ ...btnBase, padding: "6px 12px", background: C.bg, color: C.muted, fontSize: 13, border: `1px solid ${C.border}` }}>Edit</button>
                            </div>
                        ))}
                        <button style={{ ...btnBase, width: "100%", padding: "11px", background: "#FEF2F2", color: C.red, fontSize: 14, border: `1px solid #FECACA`, marginTop: 16 }}>Delete Account</button>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function TraveloopApp() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [screen, setScreen] = useState("dashboard");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

    const screens = {
        dashboard: <Dashboard setScreen={setScreen} />,
        trips: <MyTrips setScreen={setScreen} />,
        itinerary: <ItineraryScreen setScreen={setScreen} />,
        budget: <BudgetScreen />,
        checklist: <PackingScreen />,
        notes: <NotesScreen />,
        profile: <ProfileScreen />,
    };

    return (
        <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.text }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'); * { box-sizing: border-box; } ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #D1C8B8; border-radius: 3px; }`}</style>
            <Sidebar screen={screen} setScreen={setScreen} collapsed={sidebarCollapsed} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ height: 52, background: "#fff", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 }}>
                    <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ ...btnBase, background: "none", padding: "6px 8px", color: C.muted, fontSize: 20 }}>☰</button>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg, borderRadius: 8, padding: "7px 14px", border: `1px solid ${C.border}` }}>
                            <span style={{ fontSize: 14 }}>🔍</span>
                            <input style={{ border: "none", background: "none", outline: "none", fontSize: 13, width: 180, color: C.text, fontFamily: "inherit" }} placeholder="Search trips, cities..." />
                        </div>
                        <button style={{ ...btnBase, background: C.accentL, color: "#92400E", padding: "7px 14px", fontSize: 13 }}>🔔 2</button>
                        <Avatar name="Alex Morgan" size={34} />
                    </div>
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                    {screens[screen] || screens.dashboard}
                </div>
            </div>
        </div>
    );
}