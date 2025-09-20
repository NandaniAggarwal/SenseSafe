import { useState } from 'react';
import PreferencesOnboarding from '@/components/PreferencesOnboarding';
import HomePage from '@/components/HomePage';
import CafeRegistration from '@/components/CafeRegistration';
import Navigation from '@/components/Navigation';
import Chatbot from '@/components/Chatbot';
import FeedbackRating from '@/components/FeedbackRating';
import { UserPreferences, Cafe } from '@/types';

type AppState = 'onboarding' | 'home' | 'registration' | 'navigation' | 'chatbot' | 'feedback';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('onboarding');
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [journeyRating, setJourneyRating] = useState<number>(0);

  const handlePreferencesComplete = (preferences: UserPreferences) => {
    setUserPreferences(preferences);
    setCurrentState('home');
  };

  const handleCafeSelect = (cafe: Cafe) => {
    setSelectedCafe(cafe);
    setCurrentState('navigation');
  };

  const handleNavigationComplete = (rating: number) => {
    setJourneyRating(rating);
    setCurrentState('feedback');
  };

  const handleFeedbackComplete = () => {
    setCurrentState('home');
    setSelectedCafe(null);
    setJourneyRating(0);
  };

  const handleBackToHome = () => {
    setCurrentState('home');
  };

  const handleOpenChat = () => {
    setCurrentState('chatbot');
  };

  const handleRegisterCafe = () => {
    setCurrentState('registration');
  };

  // Render based on current state
  switch (currentState) {
    case 'onboarding':
      return <PreferencesOnboarding onComplete={handlePreferencesComplete} />;
    
    case 'home':
      if (!userPreferences) return <PreferencesOnboarding onComplete={handlePreferencesComplete} />;
      return (
        <HomePage 
          preferences={userPreferences}
          onCafeSelect={handleCafeSelect}
          onRegisterCafe={handleRegisterCafe}
          onOpenChat={handleOpenChat}
        />
      );
    
    case 'registration':
      return <CafeRegistration onBack={handleBackToHome} />;
    
    case 'navigation':
      if (!selectedCafe) return <HomePage preferences={userPreferences!} onCafeSelect={handleCafeSelect} onRegisterCafe={handleRegisterCafe} onOpenChat={handleOpenChat} />;
      return (
        <Navigation 
          cafe={selectedCafe}
          onBack={handleBackToHome}
          onComplete={handleNavigationComplete}
        />
      );
    
    case 'chatbot':
      return <Chatbot onBack={handleBackToHome} />;
    
    case 'feedback':
      if (!selectedCafe) return <HomePage preferences={userPreferences!} onCafeSelect={handleCafeSelect} onRegisterCafe={handleRegisterCafe} onOpenChat={handleOpenChat} />;
      return (
        <FeedbackRating 
          cafe={selectedCafe}
          initialRating={journeyRating}
          onComplete={handleFeedbackComplete}
        />
      );
    
    default:
      return <PreferencesOnboarding onComplete={handlePreferencesComplete} />;
  }
};

export default Index;
