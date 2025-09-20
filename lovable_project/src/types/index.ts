export interface UserPreferences {
  lightSensitivity: 'low' | 'medium' | 'high';
  soundSensitivity: 'low' | 'medium' | 'high';
  crowdTolerance: 'low' | 'medium' | 'high';
  smellSensitivity: 'low' | 'medium' | 'high';
  motionSensitivity: 'low' | 'medium' | 'high';
  temperatureSensitivity: 'low' | 'medium' | 'high';
}

export interface Cafe {
  id: string;
  name: string;
  address: string;
  rating: number;
  features: {
    dimLighting: boolean;
    quietZone: boolean;
    lowCrowd: boolean;
    noStrongSmells: boolean;
    stableSeating: boolean;
    climateControlled: boolean;
  };
  distance: number;
  image: string;
  verified: boolean;
  description: string;
}

export interface NavigationPrompt {
  id: string;
  message: string;
  type: 'route' | 'suggestion' | 'arrival';
  timestamp: number;
}