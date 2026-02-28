export interface Tour {
  id: string;
  title: string;
  category: 'Adventure' | 'Cultural' | 'Wildlife' | 'Beach' | 'Mountain';
  price: number;
  duration: string;
  groupSize: string;
  location: string;
  image: string;
  description: string;
  highlights: string[];
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  rating: number;
  reviews: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  tour: string;
  date: string;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'Economy' | 'SUV' | 'Luxury' | 'Motorcycle' | 'Minibus';
  pricePerDay: number;
  capacity: number;
  transmission: 'Manual' | 'Automatic';
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid';
  image: string;
  features: string[];
  rating: number;
  reviews: number;
}

export const tours: Tour[] = [
  {
    id: '1',
    title: 'African Safari Adventure',
    category: 'Wildlife',
    price: 2499,
    duration: '7 days',
    groupSize: '2-8 people',
    location: 'Kenya & Tanzania',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
    description: 'Experience the thrill of an African safari with wildlife viewing, expert guides, and luxury accommodations. Witness the great migration and encounter Africa\'s most iconic animals.',
    highlights: ['Big Five viewing', 'Hot air balloon ride', 'Masai village visit', 'Professional guides', 'Luxury tents'],
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 127,
  },
  {
    id: '2',
    title: 'Mountain Trek to Kilimanjaro',
    category: 'Mountain',
    price: 1899,
    duration: '6 days',
    groupSize: '4-12 people',
    location: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    description: 'Climb Africa\'s highest peak with experienced mountaineers. Challenge yourself with this rewarding expedition featuring stunning views and unique ecosystems.',
    highlights: ['Summit attempt', 'Expert porters', 'Altitude acclimatization', 'Camping experience', 'Scenic viewpoints'],
    difficulty: 'Hard',
    rating: 4.7,
    reviews: 98,
  },
  {
    id: '3',
    title: 'Cultural Heritage Tour',
    category: 'Cultural',
    price: 1299,
    duration: '5 days',
    groupSize: '2-10 people',
    location: 'Peru',
    image: 'https://images.unsplash.com/photo-1587595431973-160a0d59ed4b?w=800&h=600&fit=crop',
    description: 'Explore ancient civilizations with visits to iconic historical sites, local communities, and cultural experiences that bring history to life.',
    highlights: ['Machu Picchu', 'Local guides', 'Traditional meals', 'Sacred Valley', 'Indigenous communities'],
    difficulty: 'Moderate',
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '4',
    title: 'Tropical Beach Paradise',
    category: 'Beach',
    price: 1599,
    duration: '4 days',
    groupSize: 'Couples & Families',
    location: 'Maldives',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    description: 'Relax in paradise with pristine beaches, crystal-clear waters, water sports, and luxury island resorts.',
    highlights: ['Private beach', 'Snorkeling', 'Water sports', 'Spa treatments', 'Sunset dinner'],
    difficulty: 'Easy',
    rating: 4.9,
    reviews: 203,
  },
  {
    id: '5',
    title: 'Amazon Rainforest Expedition',
    category: 'Adventure',
    price: 1799,
    duration: '5 days',
    groupSize: '3-8 people',
    location: 'Ecuador',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    description: 'Journey into the world\'s largest rainforest. Spot exotic wildlife, meet indigenous tribes, and discover biodiversity in its purest form.',
    highlights: ['Canopy walks', 'Wildlife spotting', 'River expeditions', 'Indigenous guides', 'Night hikes'],
    difficulty: 'Moderate',
    rating: 4.8,
    reviews: 112,
  },
  {
    id: '6',
    title: 'Swiss Alps Hiking',
    category: 'Mountain',
    price: 1399,
    duration: '6 days',
    groupSize: '2-10 people',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    description: 'Hike through the stunning alpine scenery of Switzerland with scenic valleys, pristine lakes, and charming mountain villages.',
    highlights: ['Alpine trails', 'Mountain lodges', 'Scenic viewpoints', 'Traditional meals', 'Photography opportunities'],
    difficulty: 'Moderate',
    rating: 4.7,
    reviews: 89,
  },
  {
    id: '7',
    title: 'Iceland Northern Lights',
    category: 'Adventure',
    price: 1999,
    duration: '4 days',
    groupSize: '2-15 people',
    location: 'Iceland',
    image: 'https://images.unsplash.com/photo-1504681869696-d977e0a4a435?w=800&h=600&fit=crop',
    description: 'Witness the magical Northern Lights while exploring Iceland\'s geothermal wonders, waterfalls, and black sand beaches.',
    highlights: ['Northern Lights hunting', 'Geysers & hot springs', 'Waterfall tours', 'Glacier walks', 'Blue Lagoon'],
    difficulty: 'Easy',
    rating: 4.9,
    reviews: 178,
  },
  {
    id: '8',
    title: 'Mediterranean Sailing',
    category: 'Beach',
    price: 2199,
    duration: '7 days',
    groupSize: '4-10 people',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    description: 'Sail through the Greek islands exploring charming villages, ancient ruins, and hidden beaches with luxury yacht accommodations.',
    highlights: ['Yacht sailing', 'Island hopping', 'Beach days', 'Local cuisine', 'Sunset views'],
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 134,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    text: 'The African Safari was absolutely incredible! Our guide was knowledgeable and friendly, and we saw all the big five. A truly life-changing experience.',
    tour: '1',
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Michael Chen',
    rating: 5,
    text: 'Climbing Kilimanjaro was challenging but rewarding. The team took great care of us and the views were spectacular.',
    tour: '2',
    date: '2024-01-20',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    rating: 5,
    text: 'The Peru cultural tour was enlightening. We learned so much about the history and had wonderful interactions with local communities.',
    tour: '3',
    date: '2024-01-25',
  },
  {
    id: '4',
    name: 'David Martinez',
    rating: 4,
    text: 'Maldives was beautiful! The resort was luxurious and the snorkeling was amazing. Highly recommend for a romantic getaway.',
    tour: '4',
    date: '2024-02-01',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    rating: 5,
    text: 'The Amazon expedition exceeded all my expectations. Saw incredible wildlife and learned about the ecosystem from expert guides.',
    tour: '5',
    date: '2024-02-05',
  },
  {
    id: '6',
    name: 'James Taylor',
    rating: 5,
    text: 'Swiss Alps hiking was breathtaking. The trails were well-maintained and the mountain lodges were cozy and welcoming.',
    tour: '6',
    date: '2024-02-10',
  },
  {
    id: '7',
    name: 'Sophie Laurent',
    rating: 5,
    text: 'Saw the Northern Lights in Iceland! An unforgettable experience. The guides were experienced and the accommodations were great.',
    tour: '7',
    date: '2024-02-12',
  },
  {
    id: '8',
    name: 'Robert Johnson',
    rating: 5,
    text: 'The Mediterranean sailing trip was perfect. Beautiful islands, excellent service, and amazing food. Will definitely book again!',
    tour: '8',
    date: '2024-02-15',
  },
];

export const categories = ['Adventure', 'Cultural', 'Wildlife', 'Beach', 'Mountain'] as const;

export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    name: 'Toyota Corolla',
    type: 'Economy',
    pricePerDay: 45,
    capacity: 5,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop',
    features: ['Air conditioning', 'GPS Navigation', 'Bluetooth', 'USB charging'],
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 'v2',
    name: 'Honda CRV SUV',
    type: 'SUV',
    pricePerDay: 75,
    capacity: 7,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19d14311?w=800&h=600&fit=crop',
    features: ['AWD', 'Roof rails', 'Panoramic sunroof', 'Rear camera', 'Cruise control'],
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 'v3',
    name: 'Mercedes-Benz E-Class',
    type: 'Luxury',
    pricePerDay: 180,
    capacity: 5,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
    features: ['Leather seats', 'Climate control', 'Premium sound system', 'Parking assist', 'Adaptive suspension'],
    rating: 4.9,
    reviews: 134,
  },
  {
    id: 'v4',
    name: 'Royal Enfield Bike',
    type: 'Motorcycle',
    pricePerDay: 35,
    capacity: 2,
    transmission: 'Manual',
    fuelType: 'Petrol',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    features: ['Classic design', 'Comfortable seating', 'Good mileage', 'Low maintenance', 'Adventure-ready'],
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 'v5',
    name: 'Ford Transit Minibus',
    type: 'Minibus',
    pricePerDay: 120,
    capacity: 12,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
    features: ['Large luggage', 'Comfortable seats', 'Air conditioning', 'Wheelchair accessible', 'USB ports in seats'],
    rating: 4.7,
    reviews: 67,
  },
  {
    id: 'v6',
    name: 'Maruti Swift',
    type: 'Economy',
    pricePerDay: 40,
    capacity: 5,
    transmission: 'Manual',
    fuelType: 'Petrol',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop',
    features: ['Fuel efficient', 'Easy to drive', 'Power steering', 'Air conditioning', 'Central locking'],
    rating: 4.5,
    reviews: 102,
  },
  {
    id: 'v7',
    name: 'BMW X5 SUV',
    type: 'SUV',
    pricePerDay: 150,
    capacity: 7,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19d14311?w=800&h=600&fit=crop',
    features: ['Luxury interior', 'All-wheel drive', 'Navigation system', 'Panoramic roof', 'Premium entertainment'],
    rating: 4.8,
    reviews: 121,
  },
  {
    id: 'v8',
    name: 'Harley-Davidson',
    type: 'Motorcycle',
    pricePerDay: 85,
    capacity: 2,
    transmission: 'Manual',
    fuelType: 'Petrol',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    features: ['Iconic design', 'Powerful engine', 'Windscreen', 'Storage bags', 'Leather seats'],
    rating: 4.9,
    reviews: 145,
  },
];

export const vehicleTypes = ['Economy', 'SUV', 'Luxury', 'Motorcycle', 'Minibus'] as const;
