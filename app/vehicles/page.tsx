'use client';

import { useState, useMemo } from 'react';
import { vehicles, vehicleTypes } from '@/lib/data';
import { VehicleCard } from '@/components/vehicle-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

type VehicleType = typeof vehicleTypes[number];

export default function VehiclesPage() {
  const [selectedType, setSelectedType] = useState<VehicleType | 'All'>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesType = selectedType === 'All' || vehicle.type === selectedType;
      const matchesPrice = vehicle.pricePerDay >= priceRange[0] && vehicle.pricePerDay <= priceRange[1];
      const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesPrice && matchesSearch;
    });
  }, [selectedType, priceRange, searchQuery]);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Vehicle Rentals</h1>
          <p className="text-lg opacity-90">
            Rent the perfect vehicle for your journey - with or without a tour package
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-secondary/50 py-8 sticky top-16 z-40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Vehicle Type</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === 'All' ? 'default' : 'outline'}
                onClick={() => setSelectedType('All')}
                size="sm"
              >
                All Types
              </Button>
              {vehicleTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  onClick={() => setSelectedType(type)}
                  size="sm"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-6 space-y-3">
            <p className="text-sm font-medium text-foreground">
              Price Range: ${priceRange[0]} - ${priceRange[1]}/day
            </p>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="flex gap-4">
                <div>
                  <label className="text-xs text-muted-foreground">Min Price</label>
                  <input
                    type="number"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-20 px-2 py-1 border border-border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Max Price</label>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-20 px-2 py-1 border border-border rounded text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No vehicles found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedType('All');
                  setPriceRange([0, 200]);
                  setSearchQuery('');
                }}
                className="mt-4"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredVehicles.length} vehicle{filteredVehicles.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Flexible Rental Options</h2>
          <p className="text-lg mb-6 opacity-90">
            Rent a vehicle for a day, a week, or combine with our tour packages for a complete travel experience
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
