'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { tours, reviews } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, Star, Check, Share2, Heart } from 'lucide-react';

export default function TourDetailsPage() {
  const { id } = useParams();
  const tour = tours.find((t) => t.id === id);
  const tourReviews = reviews.filter((r) => r.tour === id);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!tour) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Tour not found</h1>
          <Link href="/tours">
            <Button className="mt-4">Back to Tours</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.tourId === tour.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        tourId: tour.id,
        title: tour.title,
        price: tour.price,
        quantity,
        image: tour.image,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${quantity} ${quantity === 1 ? 'tour' : 'tours'} to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href="/tours" className="hover:text-primary">
            Tours
          </Link>
          <span className="mx-2">/</span>
          <span>{tour.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="mb-8">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Title & Basic Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">{tour.title}</h1>
                  <div className="flex items-center gap-2 text-lg text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    {tour.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isFavorite ? 'currentColor' : 'none'}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Badge & Rating */}
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-primary text-primary-foreground">{tour.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{tour.rating}</span>
                  <span className="text-muted-foreground">({tour.reviews} reviews)</span>
                </div>
                <span className={`font-semibold ${
                  tour.difficulty === 'Easy' ? 'text-green-600' :
                  tour.difficulty === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {tour.difficulty} Difficulty
                </span>
              </div>
            </div>

            {/* Tour Details Grid */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="text-lg font-semibold text-foreground">{tour.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Group Size</p>
                  <p className="text-lg font-semibold text-foreground">{tour.groupSize}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Difficulty</p>
                  <p className="text-lg font-semibold text-foreground">{tour.difficulty}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-lg font-semibold text-primary">${tour.price}/person</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Tour</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{tour.description}</p>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Highlights</h2>
              <ul className="space-y-2">
                {tour.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            {tourReviews.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Customer Reviews</h2>
                <div className="space-y-4">
                  {tourReviews.map((review) => (
                    <div key={review.id} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold text-foreground">{review.name}</p>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i} className="text-accent">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{review.text}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <p className="text-sm text-muted-foreground mb-2">Price Per Person</p>
              <p className="text-4xl font-bold text-primary mb-6">${tour.price}</p>

              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Number of Travelers
                  </label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold text-foreground w-8 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ${tour.price * quantity}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full mb-3 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Add to Cart
              </Button>

              <Button variant="outline" className="w-full">
                Contact for Custom Tour
              </Button>

              <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Free cancellation
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  24/7 customer support
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Best price guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
