'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Edit2, Trash2, Plus } from 'lucide-react';

interface Booking {
  id: number;
  date: string;
  items: Array<any>;
  customer: any;
  total: number;
}

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}

export default function AdminPage() {
  const [tab, setTab] = useState<'bookings' | 'inquiries' | 'tours' | 'vehicles'>('bookings');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const ADMIN_PASSWORD = 'admin123'; // For demo purposes

  useEffect(() => {
    // Load data from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const savedInquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    setBookings(savedBookings);
    setInquiries(savedInquiries);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Invalid password');
    }
  };

  const deleteBooking = (id: number) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem('bookings', JSON.stringify(updated));
    }
  };

  const deleteInquiry = (id: number) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const updated = inquiries.filter((i) => i.id !== id);
      setInquiries(updated);
      localStorage.setItem('inquiries', JSON.stringify(updated));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="max-w-md mx-auto px-4 py-20">
          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-3xl font-bold text-foreground mb-2 text-center">Admin Login</h1>
            <p className="text-center text-muted-foreground mb-8">Enter the admin password to access the dashboard</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Demo password: admin123</p>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Login
              </Button>
            </form>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-900">
                <strong>Demo Mode:</strong> This is a demo admin panel with sample data stored locally. In production, this would connect to a real database with proper authentication.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => {
              setIsAuthenticated(false);
              setPassword('');
            }}
          >
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          {['bookings', 'inquiries', 'tours', 'vehicles'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                tab === t
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Bookings ({bookings.length})
              </h2>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground mb-4">No bookings yet</p>
                <Link href="/tours">
                  <Button>Browse Tours</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Booking ID</p>
                        <p className="font-semibold text-foreground">#{booking.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Customer</p>
                        <p className="font-semibold text-foreground">
                          {booking.customer.firstName} {booking.customer.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground">{booking.customer.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="font-bold text-primary text-lg">${booking.total}</p>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-secondary/10 rounded">
                      <p className="text-sm font-medium text-foreground mb-2">Tours:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {booking.items.map((item, idx) => (
                          <li key={idx}>
                            • {item.title} (x{item.quantity}) - ${item.price * item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Booked: {booking.date}
                      </p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteBooking(booking.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inquiries Tab */}
        {tab === 'inquiries' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Contact Inquiries ({inquiries.length})
              </h2>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground">No inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-semibold text-foreground">{inquiry.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold text-foreground">{inquiry.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Subject</p>
                        <Badge variant="outline">{inquiry.subject || 'General'}</Badge>
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-secondary/10 rounded">
                      <p className="text-sm text-muted-foreground mb-1">Message:</p>
                      <p className="text-foreground whitespace-pre-wrap">{inquiry.message}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {new Date(inquiry.date).toLocaleDateString()}
                      </p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteInquiry(inquiry.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tours Tab */}
        {tab === 'tours' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Manage Tours</h2>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Tour
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-900">
                <strong>Note:</strong> Tour management is available in the full version. In this demo, tours are stored statically. To add/edit tours in a production system, you would need to:
              </p>
              <ul className="mt-3 ml-4 list-disc text-blue-800 space-y-1">
                <li>Connect to a database (Supabase, MongoDB, etc.)</li>
                <li>Create database models for tours</li>
                <li>Build CRUD API endpoints</li>
                <li>Add authentication and authorization</li>
                <li>Implement file upload for tour images</li>
              </ul>
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {tab === 'vehicles' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Manage Vehicles</h2>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Vehicle
              </Button>
            </div>

            <div className="grid gap-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Vehicles</p>
                    <p className="text-3xl font-bold text-primary">8</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-3xl font-bold text-primary">4.7 ⭐</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle Name</p>
                      <p className="font-semibold text-foreground">Toyota Corolla</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <Badge>Economy</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price/Day</p>
                      <p className="font-semibold text-foreground">$45</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="font-semibold text-foreground">5 passengers</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Vehicle Name</p>
                      <p className="font-semibold text-foreground">Honda CRV SUV</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <Badge>SUV</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price/Day</p>
                      <p className="font-semibold text-foreground">$75</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                      <p className="font-semibold text-foreground">7 passengers</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4">
                <p className="text-blue-900">
                  <strong>Note:</strong> Vehicle management is available in the full version. In this demo, vehicles are stored statically (8 vehicles available). To manage vehicles in production:
                </p>
                <ul className="mt-3 ml-4 list-disc text-blue-800 space-y-1">
                  <li>Connect to a database (Supabase, MongoDB, etc.)</li>
                  <li>Create database models for vehicles with availability calendar</li>
                  <li>Build CRUD API endpoints for vehicle management</li>
                  <li>Implement real-time availability tracking</li>
                  <li>Add vehicle images and specifications management</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
