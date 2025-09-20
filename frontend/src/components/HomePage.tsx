import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Users, MessageCircle, Coffee, Plus } from 'lucide-react';
import { UserPreferences, Cafe } from '@/types';

interface HomePageProps {
  preferences: UserPreferences;
  onCafeSelect: (cafe: Cafe) => void;
  onRegisterCafe: () => void;
  onOpenChat: () => void;
}

const HomePage = ({ preferences, onCafeSelect, onRegisterCafe, onOpenChat }: HomePageProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock cafes based on preferences
  const mockCafes: Cafe[] = [
    {
      id: '1',
      name: 'Quiet Corner Café',
      address: '123 Peaceful St, Downtown',
      rating: 4.8,
      features: {
        dimLighting: true,
        quietZone: true,
        lowCrowd: true,
        noStrongSmells: true,
        stableSeating: true,
        climateControlled: true,
      },
      distance: 0.3,
      image: '/cafe1.jpg',
      verified: true,
      description: 'A serene café perfect for sensitive souls'
    },
    {
      id: '2',
      name: 'Gentle Grounds',
      address: '456 Calm Ave, Midtown',
      rating: 4.6,
      features: {
        dimLighting: true,
        quietZone: true,
        lowCrowd: true,
        noStrongSmells: false,
        stableSeating: true,
        climateControlled: true,
      },
      distance: 0.7,
      image: '/cafe2.jpg',
      verified: true,
      description: 'Cozy atmosphere with sensory-friendly design'
    },
    {
      id: '3',
      name: 'Soft Space Coffee',
      address: '789 Comfort Blvd, Uptown',
      rating: 4.9,
      features: {
        dimLighting: true,
        quietZone: true,
        lowCrowd: true,
        noStrongSmells: true,
        stableSeating: true,
        climateControlled: true,
      },
      distance: 1.2,
      image: '/cafe3.jpg',
      verified: true,
      description: 'Thoughtfully designed for sensory comfort'
    }
  ];

  const getPreferenceScore = (cafe: Cafe): number => {
    let score = 0;
    if (preferences.lightSensitivity === 'high' && cafe.features.dimLighting) score += 2;
    if (preferences.soundSensitivity === 'high' && cafe.features.quietZone) score += 2;
    if (preferences.crowdTolerance === 'low' && cafe.features.lowCrowd) score += 2;
    if (preferences.smellSensitivity === 'high' && cafe.features.noStrongSmells) score += 2;
    if (preferences.motionSensitivity === 'high' && cafe.features.stableSeating) score += 2;
    if (preferences.temperatureSensitivity === 'high' && cafe.features.climateControlled) score += 2;
    return score;
  };

  const sortedCafes = mockCafes
    .map(cafe => ({ ...cafe, preferenceScore: getPreferenceScore(cafe) }))
    .sort((a, b) => b.preferenceScore - a.preferenceScore || a.distance - b.distance);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50 p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 py-8">
          <h1 className="text-5xl font-bold text-primary tracking-tight">SenseSafe</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Find your perfect sensory-friendly space
          </p>
        </div>

        {/* Search Bar */}
        <Card className="interactive-card border-0 shadow-soft">
          <CardContent className="p-8">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for cafes, restaurants, or quiet spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-0 bg-muted/30 focus-soft rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button 
            onClick={onRegisterCafe}
            className="button-secondary h-16 text-base rounded-xl focus-soft shadow-soft"
          >
            <Plus className="mr-3 h-5 w-5" />
            Register Your Café
          </Button>
          
          <Button 
            onClick={onOpenChat}
            className="button-primary h-16 text-base rounded-xl focus-soft shadow-soft"
          >
            <MessageCircle className="mr-3 h-5 w-5" />
            Get Support
          </Button>
          
          <Button 
            variant="outline"
            className="h-16 text-base rounded-xl focus-soft shadow-soft border-primary/20 hover:bg-primary/5"
          >
            <Coffee className="mr-3 h-5 w-5" />
            My Preferences
          </Button>
        </div>

        {/* Recommended Cafes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-foreground">Recommended for You</h2>
            <Badge variant="outline" className="px-3 py-1 text-sm">
              {sortedCafes.length} matches
            </Badge>
          </div>
          
          <div className="grid gap-6">
            {sortedCafes.map((cafe) => (
              <Card key={cafe.id} className="interactive-card cursor-pointer border-0 shadow-soft hover:shadow-medium transition-all duration-300 rounded-2xl overflow-hidden" onClick={() => onCafeSelect(cafe)}>
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-semibold text-foreground">
                          {cafe.name}
                        </h3>
                        {cafe.verified && (
                          <Badge className="bg-success/10 text-success border-success/20 rounded-full px-3 py-1">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground flex items-center gap-2 text-base">
                        <MapPin className="h-4 w-4" />
                        {cafe.address} • {cafe.distance} km away
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-warning/10 px-3 py-2 rounded-full">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-semibold text-warning">{cafe.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 text-base leading-relaxed">{cafe.description}</p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {cafe.features.dimLighting && (
                      <Badge variant="secondary" className="rounded-full px-3 py-2 text-sm">Dim Lighting</Badge>
                    )}
                    {cafe.features.quietZone && (
                      <Badge variant="secondary" className="rounded-full px-3 py-2 text-sm">Quiet Zone</Badge>
                    )}
                    {cafe.features.lowCrowd && (
                      <Badge variant="secondary" className="rounded-full px-3 py-2 text-sm">Low Crowd</Badge>
                    )}
                    {cafe.features.noStrongSmells && (
                      <Badge variant="secondary" className="rounded-full px-3 py-2 text-sm">No Strong Smells</Badge>
                    )}
                    {cafe.features.climateControlled && (
                      <Badge variant="secondary" className="rounded-full px-3 py-2 text-sm">Climate Controlled</Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        cafe.preferenceScore >= 8 ? 'bg-success' :
                        cafe.preferenceScore >= 6 ? 'bg-primary' :
                        cafe.preferenceScore >= 4 ? 'bg-warning' : 'bg-muted'
                      }`} />
                      <span className="text-base font-medium text-foreground">
                        {cafe.preferenceScore >= 8 ? 'Perfect Match' :
                         cafe.preferenceScore >= 6 ? 'Great Match' :
                         cafe.preferenceScore >= 4 ? 'Good Match' : 'Fair Match'}
                      </span>
                    </div>
                    <Button className="button-primary rounded-xl px-6 py-3 shadow-soft">
                      Visit This Café
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;