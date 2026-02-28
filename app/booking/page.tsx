'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowLeft } from 'lucide-react';

interface CartItem {
  tourId?: string;
  id?: string;
  type?: 'tour' | 'vehicle';
  title?: string;
  name?: string;
  price?: number;
  pricePerDay?: number;
  quantity?: number;
  image?: string;
  days?: number;
  pickupDate?: string;
  dropoffDate?: string;
  totalPrice?: number;
}

export default function BookingPage() {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const removeFromCart = (id: string, type?: string) => {
    const updated = cartItems.filter((item) => {
      if (type === 'vehicle') {
        return item.id !== id;
      }
      return item.tourId !== id;
    });
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const updateQuantity = (id: string, quantity: number, type?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, type);
      return;
    }

    const updated = cartItems.map((item) => {
      if (type === 'vehicle') {
        return item.id === id ? { ...item, quantity } : item;
      }
      return item.tourId === id ? { ...item, quantity } : item;
    });
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    if (item.type === 'vehicle') {
      return sum + (item.totalPrice || 0);
    }
    return sum + (item.price || 0) * (item.quantity || 0);
  }, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.firstName || !formData.email || !formData.address || !formData.city) {
      alert('Please fill in all required fields');
      return;
    }

    // Save booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cartItems,
      customer: formData,
      total,
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Clear cart
    localStorage.removeItem('cart');
    setCartItems([]);
    setStep('confirmation');
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✓</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for booking with TravelExplorers. A confirmation email has been sent to {formData.email}
          </p>

          <div className="bg-card border border-border rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-lg text-foreground mb-4">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Guest:</span>
                <span className="font-medium text-foreground ml-2">
                  {formData.firstName} {formData.lastName}
                </span>
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium text-foreground ml-2">{formData.email}</span>
              </p>
              <p>
                <span className="text-muted-foreground">Total Amount:</span>
                <span className="font-bold text-primary ml-2">${total}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours">
              <Button>Browse More Tours</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-center gap-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step === 'cart' || step === 'checkout' || step === 'confirmation'
                ? 'bg-primary text-primary-foreground'
                : 'bg-border text-muted-foreground'
            }`}
          >
            1
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step === 'checkout' || step === 'confirmation'
                ? 'bg-primary text-primary-foreground'
                : 'bg-border text-muted-foreground'
            }`}
          >
            2
          </div>
          <div className="w-8 h-0.5 bg-border" />
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step === 'confirmation'
                ? 'bg-primary text-primary-foreground'
                : 'bg-border text-muted-foreground'
            }`}
          >
            3
          </div>
        </div>

        {step === 'cart' && (
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
                <Link href="/tours">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => {
                      const itemId = item.tourId || item.id || idx.toString();
                      const itemType = item.type || 'tour';
                      const isVehicle = itemType === 'vehicle';
                      
                      return (
                        <div key={itemId} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                          <img
                            src={item.image}
                            alt={item.title || item.name}
                            className="w-24 h-24 object-cover rounded"
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{item.title || item.name}</h3>
                            {isVehicle ? (
                              <>
                                <p className="text-sm text-muted-foreground mb-2">
                                  ${item.pricePerDay}/day • {item.days} days
                                </p>
                                {item.pickupDate && (
                                  <p className="text-xs text-muted-foreground mb-2">
                                    {item.pickupDate} to {item.dropoffDate}
                                  </p>
                                )}
                                <span className="font-semibold text-foreground">
                                  ${item.totalPrice}
                                </span>
                              </>
                            ) : (
                              <>
                                <p className="text-sm text-muted-foreground mb-2">
                                  ${item.price} per person
                                </p>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateQuantity(itemId, (item.quantity || 0) - 1, itemType)}
                                    className="px-2 py-1 border border-border rounded hover:bg-secondary"
                                  >
                                    −
                                  </button>
                                  <span className="px-4 font-semibold">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(itemId, (item.quantity || 0) + 1, itemType)}
                                    className="px-2 py-1 border border-border rounded hover:bg-secondary"
                                  >
                                    +
                                  </button>
                                  <span className="ml-auto font-semibold text-foreground">
                                    ${(item.price || 0) * (item.quantity || 0)}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>

                          <button
                            onClick={() => removeFromCart(itemId, itemType)}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>

                    <div className="space-y-2 mb-4 pb-4 border-b border-border">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium text-foreground">${subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (10%)</span>
                        <span className="font-medium text-foreground">${tax}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="font-bold text-primary text-2xl">${total}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setStep('checkout')}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3"
                    >
                      Proceed to Checkout
                    </Button>

                    <Link href="/tours">
                      <Button variant="outline" className="w-full">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'checkout' && (
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-foreground mb-8">Checkout</h1>

            <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      required
                    />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleFormChange}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Address</h3>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleFormChange}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleFormChange}
                        required
                      />
                      <Input
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        value={formData.zipCode}
                        onChange={handleFormChange}
                      />
                    </div>
                    <Input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>

                  <div className="space-y-2 mb-4 pb-4 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="font-medium text-foreground">${tax}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-primary text-2xl">${total}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3"
                  >
                    Complete Booking
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep('cart')}
                  >
                    Back to Cart
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
