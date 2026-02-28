'use client';

import { Vehicle } from '@/lib/data';
import Link from 'next/link';
import { Star, Users, Zap, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
          {vehicle.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title & Rating */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground">{vehicle.name}</h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(vehicle.rating)
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              {vehicle.rating} ({vehicle.reviews} reviews)
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span>{vehicle.capacity} passengers</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span>{vehicle.transmission} • {vehicle.fuelType}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <DollarSign className="w-5 h-5 text-accent" />
            <span className="text-2xl font-bold text-foreground">${vehicle.pricePerDay}</span>
            <span className="text-sm text-muted-foreground">/day</span>
          </div>
        </div>

        {/* Button */}
        <Link href={`/vehicles/${vehicle.id}`} className="w-full">
          <Button className="w-full" size="lg">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}
