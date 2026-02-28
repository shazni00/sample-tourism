import Link from 'next/link';
import { Tour } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, Star } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Adventure: 'bg-orange-100 text-orange-800',
      Cultural: 'bg-purple-100 text-purple-800',
      Wildlife: 'bg-green-100 text-green-800',
      Beach: 'bg-blue-100 text-blue-800',
      Mountain: 'bg-slate-100 text-slate-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      Easy: 'text-green-600',
      Moderate: 'text-yellow-600',
      Hard: 'text-red-600',
    };
    return colors[difficulty] || 'text-gray-600';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getCategoryColor(tour.category)}>{tour.category}</Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2">{tour.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {tour.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Tour Details */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{tour.groupSize}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{tour.description}</p>

        {/* Rating */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-semibold">{tour.rating}</span>
            <span className="text-muted-foreground">({tour.reviews})</span>
          </div>
          <span className={`font-semibold ${getDifficultyColor(tour.difficulty)}`}>
            {tour.difficulty}
          </span>
        </div>

        {/* Price & Button */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">${tour.price}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
          <Link href={`/tours/${tour.id}`}>
            <Button size="sm" className="whitespace-nowrap">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
