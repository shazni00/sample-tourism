"use client";

import { useState, useMemo } from "react";
import { vehicles, vehicleTypes } from "@/lib/data";
import { VehicleCard } from "@/components/vehicle-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Navbar } from "@/components/navbar";

type VehicleType = (typeof vehicleTypes)[number];

export default function VehiclesPage() {
  const [selectedType, setSelectedType] = useState<VehicleType | "All">("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesType =
        selectedType === "All" || vehicle.type === selectedType;
      const matchesPrice =
        vehicle.pricePerDay >= priceRange[0] &&
        vehicle.pricePerDay <= priceRange[1];
      const matchesSearch = vehicle.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesType && matchesPrice && matchesSearch;
    });
  }, [selectedType, priceRange, searchQuery]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Vehicle Rentals</h1>
          <p className="text-lg opacity-90">
            Rent the perfect vehicle for your journey - with or without a tour
            package
          </p>
        </div>
      </section>

      {/* Main content with sidebar like tours page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Filters
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search vehicles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Vehicle Type
                </h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedType === "All" ? "default" : "outline"}
                    onClick={() => setSelectedType("All")}
                    className="w-full justify-start"
                  >
                    All Types
                  </Button>
                  {vehicleTypes.map((type) => (
                    <Button
                      key={type}
                      variant={selectedType === type ? "default" : "outline"}
                      onClick={() => setSelectedType(type)}
                      className="w-full justify-start"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Min: ${priceRange[0]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      Max: ${priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Reset */}
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedType("All");
                  setPriceRange([0, 200]);
                  setSearchQuery("");
                }}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Vehicle cards */}
          <div className="lg:col-span-3">
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No vehicles found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedType("All");
                    setPriceRange([0, 200]);
                    setSearchQuery("");
                  }}
                  className="mt-4"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredVehicles.length} vehicle
                  {filteredVehicles.length !== 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Flexible Rental Options</h2>
          <p className="text-lg mb-6 opacity-90">
            Rent a vehicle for a day, a week, or combine with our tour packages
            for a complete travel experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Book Now
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
