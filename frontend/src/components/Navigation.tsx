import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Navigation as NavigationIcon, MessageCircle, CheckCircle } from 'lucide-react';
import { Cafe, NavigationPrompt } from '@/types';

interface NavigationProps {
  cafe: Cafe;
  onBack: () => void;
  onComplete: (rating: number) => void;
}

const Navigation = ({ cafe, onBack, onComplete }: NavigationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [prompts, setPrompts] = useState<NavigationPrompt[]>([]);
  const [hasArrived, setHasArrived] = useState(false);

  const navigationSteps = [
    { position: [40.7128, -74.0060], message: "Starting your journey to " + cafe.name },
    { position: [40.7138, -74.0050], message: "Walking towards your destination..." },
    { position: [40.7148, -74.0040], message: "Keep going straight, you're doing great!" },
    { position: [40.7158, -74.0030], message: "Almost there, just a few more minutes!" },
    { position: [40.7168, -74.0020], message: "You've arrived at " + cafe.name + "!" }
  ];

  const helpfulPrompts = [
    {
      id: '1',
      message: "Hey! There's a quieter route through the park if sound is bothering you. Would you like me to redirect?",
      type: 'route' as const,
      timestamp: Date.now()
    },
    {
      id: '2', 
      message: "I noticed a lovely quiet garden nearby if you need a break before continuing to the café. Want to take a detour?",
      type: 'suggestion' as const,
      timestamp: Date.now()
    },
    {
      id: '3',
      message: "You're almost there! The café has confirmed they have your preferred dim lighting ready.",
      type: 'route' as const,
      timestamp: Date.now()
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setHasArrived(true);
          clearInterval(timer);
          return 100;
        }
        
        const newProgress = prev + 2;
        const stepIndex = Math.floor((newProgress / 100) * navigationSteps.length);
        
        if (stepIndex !== currentStep && stepIndex < navigationSteps.length) {
          setCurrentStep(stepIndex);
          
          // Add helpful prompts at specific progress points
          if (newProgress === 30) {
            setPrompts(prev => [...prev, helpfulPrompts[0]]);
          } else if (newProgress === 60) {
            setPrompts(prev => [...prev, helpfulPrompts[1]]);
          } else if (newProgress === 90) {
            setPrompts(prev => [...prev, helpfulPrompts[2]]);
          }
        }
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [currentStep]);

  const handlePromptResponse = (promptId: string, accepted: boolean) => {
    setPrompts(prev => prev.filter(p => p.id !== promptId));
    // Here you could handle different responses
  };

  if (hasArrived) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
        <Card className="interactive-card max-w-md w-full text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-20 w-20 text-success mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-success mb-4">You've Arrived!</h2>
            <p className="text-muted-foreground mb-6">
              Welcome to {cafe.name}! Enjoy your sensory-friendly experience.
            </p>
            
            <div className="space-y-3">
              <p className="text-sm font-medium">How was your journey?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant="outline"
                    size="sm"
                    onClick={() => onComplete(rating)}
                    className="w-10 h-10 rounded-full focus-soft"
                  >
                    ⭐
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="focus-soft">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">Navigating to {cafe.name}</h1>
            <p className="text-muted-foreground">Sensory-friendly route in progress</p>
          </div>
        </div>

        {/* Map Simulation */}
        <Card className="interactive-card">
          <CardContent className="p-6">
            <div className="relative h-64 bg-gradient-to-br from-primary-soft to-accent-soft rounded-lg overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-br from-success/30 to-primary/30"></div>
                {/* Simulated streets */}
                <div className="absolute top-16 left-0 w-full h-1 bg-muted"></div>
                <div className="absolute top-32 left-0 w-full h-1 bg-muted"></div>
                <div className="absolute top-48 left-0 w-full h-1 bg-muted"></div>
                <div className="absolute top-0 left-16 w-1 h-full bg-muted"></div>
                <div className="absolute top-0 left-32 w-1 h-full bg-muted"></div>
                <div className="absolute top-0 left-48 w-1 h-full bg-muted"></div>
              </div>
              
              {/* Moving position indicator */}
              <div 
                className="absolute w-4 h-4 bg-primary rounded-full animate-bounce-gentle transition-all duration-500 border-2 border-white shadow-medium"
                style={{ 
                  left: `${20 + (progress * 0.6)}%`, 
                  top: `${60 - (progress * 0.3)}%` 
                }}
              >
                <NavigationIcon className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
              </div>
              
              {/* Destination marker */}
              <div className="absolute right-8 top-8 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-white shadow-medium">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              
              {/* Progress bar */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/80 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-center mt-2 text-foreground font-medium">
                  {progress < 100 ? `${Math.round(progress)}% Complete` : 'Arrived!'}
                </p>
              </div>
            </div>
            
            {/* Current status */}
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-foreground">
                {navigationSteps[currentStep]?.message || "Preparing route..."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Helpful Prompts */}
        {prompts.map((prompt) => (
          <Card key={prompt.id} className="interactive-card border-primary/20 bg-primary-soft/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-foreground">{prompt.message}</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      className="button-primary"
                      onClick={() => handlePromptResponse(prompt.id, true)}
                    >
                      Yes, please
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handlePromptResponse(prompt.id, false)}
                    >
                      No, thanks
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Destination Info */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Destination: {cafe.name}
            </CardTitle>
            <CardDescription>{cafe.address}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cafe.features.dimLighting && <Badge variant="secondary">Dim Lighting</Badge>}
              {cafe.features.quietZone && <Badge variant="secondary">Quiet Zone</Badge>}
              {cafe.features.lowCrowd && <Badge variant="secondary">Low Crowd</Badge>}
              {cafe.features.noStrongSmells && <Badge variant="secondary">No Strong Smells</Badge>}
              {cafe.features.climateControlled && <Badge variant="secondary">Climate Controlled</Badge>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Navigation;