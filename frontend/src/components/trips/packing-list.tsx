"use client";

import { useState, useEffect } from "react";
import { Check, Package, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { generatePackingList } from "@/lib/mock-ai";
import { cn } from "@/lib/utils";
import type { Trip, PackingItem } from "@/types";

interface PackingListProps {
  trip: Trip;
}

export function PackingList({ trip }: PackingListProps) {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    async function loadList() {
      // Use mock AI to generate list based on trip
      const destinations = trip.stops?.map((s) => s.city).join(", ") || "Unknown";
      const style = "cultural"; // Just mock style for now
      const mockItems = await generatePackingList(destinations, trip.duration_days || 3, style);
      
      setItems(
        mockItems.map((mi, i) => ({
          id: `item-${i}`,
          trip_id: trip.id,
          name: mi.name,
          category: mi.category,
          is_checked: mi.is_checked,
          created_at: new Date().toISOString(),
        }))
      );
      setIsLoading(false);
    }
    loadList();
  }, [trip]);

  const toggleItem = (id: string) => {
    setItems((curr) =>
      curr.map((i) => (i.id === id ? { ...i, is_checked: !i.is_checked } : i))
    );
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    
    const newItem: PackingItem = {
      id: `custom-${Date.now()}`,
      trip_id: trip.id,
      name: newItemName.trim(),
      category: "Custom",
      is_checked: false,
      created_at: new Date().toISOString(),
    };
    
    setItems((curr) => [...curr, newItem]);
    setNewItemName("");
  };

  const removeItem = (id: string) => {
    setItems((curr) => curr.filter((i) => i.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
        <Package className="h-10 w-10 text-primary animate-bounce mb-4" />
        <p className="font-semibold text-lg">Generating smart packing list...</p>
        <p className="text-sm text-muted-foreground mt-1">
          Analyzing destinations and travel style
        </p>
      </div>
    );
  }

  const completed = items.filter((i) => i.is_checked).length;
  const progress = items.length === 0 ? 0 : Math.round((completed / items.length) * 100);

  // Group items by category
  const grouped = items.reduce((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Progress Card */}
      <Card className="border-0 shadow-sm bg-card-gradient">
        <CardContent className="p-5 flex items-center gap-6">
          <div className="relative flex items-center justify-center h-16 w-16 shrink-0">
            <svg className="rotate-[-90deg]" width="64" height="64">
              <circle cx="32" cy="32" r="26" strokeWidth="6" fill="none" className="stroke-muted" />
              <circle
                cx="32" cy="32" r="26" strokeWidth="6" fill="none"
                stroke="oklch(0.52 0.22 262)"
                strokeLinecap="round"
                strokeDasharray={`${(progress / 100) * (2 * Math.PI * 26)} ${2 * Math.PI * 26}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute text-center text-sm font-bold">{progress}%</div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Packing Progress</h3>
            <p className="text-sm text-muted-foreground">
              {completed} of {items.length} items packed. You're getting there!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add Item Form */}
      <form onSubmit={addItem} className="flex gap-2">
        <Input
          placeholder="Add custom item..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="bg-background shadow-sm"
        />
        <Button type="submit" size="sm" className="shrink-0 gap-1.5 h-auto">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </form>

      {/* Checklist */}
      <div className="grid gap-6 sm:grid-cols-2">
        {Object.entries(grouped).map(([category, catItems]) => (
          <div key={category} className="space-y-3">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary/60" />
              {category}
              <span className="text-muted-foreground text-xs font-normal">
                ({catItems.filter((i) => i.is_checked).length}/{catItems.length})
              </span>
            </h4>
            <div className="space-y-1">
              {catItems.map((item) => (
                <div
                  key={item.id}
                  className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={cn(
                      "h-5 w-5 rounded border flex items-center justify-center shrink-0 transition-all",
                      item.is_checked
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border hover:border-primary/50 text-transparent"
                    )}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                  <span
                    className={cn(
                      "text-sm flex-1 transition-all",
                      item.is_checked && "line-through text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
