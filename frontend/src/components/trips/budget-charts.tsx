"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Budget } from "@/types";

const COLORS = [
  "oklch(0.52 0.22 262)",  // primary - transport
  "oklch(0.65 0.2 180)",   // teal - accommodation
  "oklch(0.72 0.18 140)",  // green - food
  "oklch(0.7 0.2 60)",     // amber - activities
  "oklch(0.62 0.22 30)",   // orange - misc
];

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent,
}: {
  cx: number; cy: number; midAngle: number;
  innerRadius: number; outerRadius: number; percent: number;
}) => {
  if (percent < 0.07) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight="600">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface BudgetPieChartProps {
  budget: Budget;
}

export function BudgetPieChart({ budget }: BudgetPieChartProps) {
  const data = [
    { name: "Transport", value: budget.transport_est ?? 0 },
    { name: "Stay", value: budget.accommodation_est ?? 0 },
    { name: "Food", value: budget.food_est ?? 0 },
    { name: "Activities", value: budget.activities_est ?? 0 },
    { name: "Misc", value: budget.misc_est ?? 0 },
  ].filter((d) => d.value > 0);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <Card className="border-0 shadow-sm bg-card-gradient">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Budget Breakdown</CardTitle>
        <CardDescription>
          Total: ${total.toLocaleString()} {budget.currency}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid oklch(0.9 0.01 250)",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <div
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-muted-foreground truncate">{item.name}</span>
              <span className="font-medium ml-auto">${item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Budget Bar Chart (daily spend) ──────────────────────────────────────────

const mockDailySpend = [
  { day: "Day 1", spent: 220, budget: 400 },
  { day: "Day 2", spent: 185, budget: 400 },
  { day: "Day 3", spent: 310, budget: 400 },
  { day: "Day 4", spent: 145, budget: 400 },
  { day: "Day 5", spent: 390, budget: 400 },
  { day: "Day 6", spent: 265, budget: 400 },
  { day: "Day 7", spent: 180, budget: 400 },
];

export function DailySpendChart() {
  return (
    <Card className="border-0 shadow-sm bg-card-gradient">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Daily Spend vs Budget</CardTitle>
        <CardDescription>Actual vs estimated per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockDailySpend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 250 / 0.4)" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(v: number) => [`$${v}`, ""]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="budget" name="Daily Budget" fill="oklch(0.52 0.22 262 / 0.25)" radius={[3, 3, 0, 0]} />
            <Bar dataKey="spent" name="Actual Spend" fill="oklch(0.52 0.22 262)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// ─── Budget Progress Bars ─────────────────────────────────────────────────────

interface BudgetProgressProps {
  budget: Budget;
}

export function BudgetProgress({ budget }: BudgetProgressProps) {
  const categories = [
    { label: "Accommodation", value: budget.accommodation_est ?? 0, color: COLORS[1] },
    { label: "Transport", value: budget.transport_est ?? 0, color: COLORS[0] },
    { label: "Food", value: budget.food_est ?? 0, color: COLORS[2] },
    { label: "Activities", value: budget.activities_est ?? 0, color: COLORS[3] },
    { label: "Misc", value: budget.misc_est ?? 0, color: COLORS[4] },
  ];
  const total = budget.total_budget ?? 1;

  return (
    <Card className="border-0 shadow-sm bg-card-gradient">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Spend Categories</CardTitle>
        <CardDescription>Budget allocation per category</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((cat) => {
          const pct = Math.min((cat.value / total) * 100, 100);
          return (
            <div key={cat.label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">{cat.label}</span>
                <span className="font-medium">${cat.value.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: cat.color }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
