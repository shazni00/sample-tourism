'use client';

import { useState } from 'react';
import { vehicles } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Star, Users, Zap, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function VehicleDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const vehicle = vehicles.find((v) => v.id === params.id);
  const [days, setDays] = useState(1);
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-muted-foreground mb-6">Sorry, we couldn't find the vehicle you're looking for.</p>
          <Link href="/vehicles">
            <Button>Back to Vehicles</Button>
          </Link>
        </div>
      </main>
    );
  }

  const totalPrice = vehicle.pricePerDay * days;

  const handleAddToCart = () => {
    const booking = {
      type: 'vehicle',
      id: vehicle.id,
      name: vehicle.name,
      pricePerDay: vehicle.pricePerDay,
      days,
      pickupDate,
      dropoffDate,
      totalPrice,
    };

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    localStorage.setItem('cart', JSON.stringify(existingBookings));

    router.push('/booking');
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/vehicles" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Vehicles
          </Link>
          <h1 className="text-4xl font-bold text-foreground">{vehicle.name}</h1>
          <p className="text-muted-foreground mt-2">{vehicle.type}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image */}
              <div className="overflow-hidden rounded-lg">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Rating & Reviews */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(vehicle.rating)
                            ? 'fill-accent text-accent'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{vehicle.rating}</p>
                    <p className="text-sm text-muted-foreground">{vehicle.reviews} reviews</p>
                  </div>
                </div>
                <p className="text-foreground">
                  Customers love this {vehicle.name} for its{' '}
                  {vehicle.features[0].toLowerCase()} and {vehicle.features[1].toLowerCase()}.
                </p>
              </Card>

              {/* Features */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Vehicle Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Specifications */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-lg font-bold">{vehicle.capacity}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Transmission</p>
                    <p className="text-lg font-bold">{vehicle.transmission}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Fuel Type</p>
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <span className="text-lg font-bold">{vehicle.fuelType}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Rental Policy */}
              <Card className="p-6 bg-secondary/20 border-secondary">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-bold text-foreground">Rental Requirements</h3>
                    <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                      <li>Valid driver's license required</li>
                      <li>Minimum age: 21 years</li>
                      <li>Credit card for security deposit</li>
                      <li>Insurance options available</li>
                      <li>Unlimited mileage included</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            {/* Booking Panel */}
            <div>
              <Card className="p-6 sticky top-24 space-y-6">
                {/* Price */}
                <div className="border-b border-border pb-6">
                  <div className="text-sm text-muted-foreground mb-2">Daily Rate</div>
                  <div className="text-4xl font-bold text-foreground">${vehicle.pricePerDay}</div>
                  <div className="text-sm text-muted-foreground mt-1">per day</div>
                </div>

                {/* Rental Period */}
                <div className="space-y-3">
                  <label className="block">
                    <span className="text-sm font-medium text-foreground mb-2 block">Pickup Date</span>
                    <Input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-foreground mb-2 block">Dropoff Date</span>
                    <Input
                      type="date"
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      className="w-full"
                    />
                  </label>

                  <div className="space-y-2">
                    <label className="block">
                      <span className="text-sm font-medium text-foreground mb-2 block">Number of Days</span>
                      <Input
                        type="number"
                        min="1"
                        value={days}
                        onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full"
                      />
                    </label>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="border-t border-b border-border py-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rate:</span>
                    <span>${vehicle.pricePerDay}/day</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Number of days:</span>
                    <span>{days} day{days !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={handleAddToCart}
                  disabled={!pickupDate || !dropoffDate}
                  size="lg"
                  className="w-full"
                >
                  Add to Cart
                </Button>

                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/booking">View Cart</Link>
                </Button>

                {/* Additional Info */}
                <div className="space-y-2 text-xs text-muted-foreground border-t pt-4">
                  <p>✓ Free cancellation up to 24 hours before pickup</p>
                  <p>✓ Insurance and roadside assistance available</p>
                  <p>✓ Flexible rental duration options</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Vehicles */}
      <section className="py-12 bg-secondary/20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Similar Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicles
              .filter((v) => v.type === vehicle.type && v.id !== vehicle.id)
              .slice(0, 4)
              .map((v) => (
                <Card key={v.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{v.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">${v.pricePerDay}</span>
                      <Link href={`/vehicles/${v.id}`}>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
