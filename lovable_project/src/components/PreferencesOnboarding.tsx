import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserPreferences } from '@/types';

interface PreferencesOnboardingProps {
  onComplete: (preferences: UserPreferences) => void;
}

const PreferencesOnboarding = ({ onComplete }: PreferencesOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({});

  const questions = [
    {
      key: 'lightSensitivity' as keyof UserPreferences,
      title: 'Light Sensitivity',
      description: 'How do bright lights affect you?',
      options: [
        { value: 'low', label: 'Bright lights are fine', emoji: '☀️' },
        { value: 'medium', label: 'Prefer moderate lighting', emoji: '🌤️' },
        { value: 'high', label: 'Need dim, soft lighting', emoji: '🌙' }
      ]
    },
    {
      key: 'soundSensitivity' as keyof UserPreferences,
      title: 'Sound Sensitivity',
      description: 'How do you handle noise levels?',
      options: [
        { value: 'low', label: 'Background noise is okay', emoji: '🔊' },
        { value: 'medium', label: 'Prefer moderate sound levels', emoji: '🔉' },
        { value: 'high', label: 'Need quiet environments', emoji: '🔇' }
      ]
    },
    {
      key: 'crowdTolerance' as keyof UserPreferences,
      title: 'Crowd Tolerance',
      description: 'How comfortable are you with crowds?',
      options: [
        { value: 'low', label: 'Avoid crowded places', emoji: '👤' },
        { value: 'medium', label: 'Small groups are fine', emoji: '👥' },
        { value: 'high', label: 'Comfortable in busy places', emoji: '👫' }
      ]
    },
    {
      key: 'smellSensitivity' as keyof UserPreferences,
      title: 'Smell Sensitivity',
      description: 'How do strong scents affect you?',
      options: [
        { value: 'low', label: 'Strong scents are fine', emoji: '🌸' },
        { value: 'medium', label: 'Prefer mild scents', emoji: '🌿' },
        { value: 'high', label: 'Need fragrance-free spaces', emoji: '🚫' }
      ]
    },
    {
      key: 'motionSensitivity' as keyof UserPreferences,
      title: 'Motion Sensitivity',
      description: 'How do you feel about movement and vibrations?',
      options: [
        { value: 'low', label: 'Movement doesn\'t bother me', emoji: '🌊' },
        { value: 'medium', label: 'Prefer stable environments', emoji: '🏔️' },
        { value: 'high', label: 'Need completely still spaces', emoji: '🧘' }
      ]
    },
    {
      key: 'temperatureSensitivity' as keyof UserPreferences,
      title: 'Temperature Sensitivity',
      description: 'What temperature makes you most comfortable?',
      options: [
        { value: 'low', label: 'Temperature doesn\'t matter', emoji: '🌡️' },
        { value: 'medium', label: 'Prefer consistent temperature', emoji: '❄️' },
        { value: 'high', label: 'Very sensitive to temperature', emoji: '🔥' }
      ]
    }
  ];

  const currentQuestion = questions[currentStep];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences as UserPreferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreferenceChange = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      [currentQuestion.key]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-background/50 animate-fade-in">
      <div className="w-full max-w-lg">
        <Card className="interactive-card border-0 shadow-medium rounded-3xl overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 p-10">
            <CardTitle className="text-3xl font-bold text-primary mb-3 tracking-tight">
              Welcome to SenseSafe
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground mb-6 max-w-sm mx-auto leading-relaxed">
              Let's personalize your sensory-friendly navigation experience
            </CardDescription>
            <div className="flex justify-center space-x-3">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentStep ? 'bg-primary scale-125' :
                    index < currentStep ? 'bg-success' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-3">
              Step {currentStep + 1} of {questions.length}
            </div>
          </CardHeader>
          
          <CardContent className="p-10 space-y-8">
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-semibold text-foreground">{currentQuestion.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{currentQuestion.description}</p>
            </div>

            <RadioGroup
              value={preferences[currentQuestion.key] || ''}
              onValueChange={handlePreferenceChange}
              className="space-y-4"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-4 p-5 rounded-2xl hover:bg-muted/30 transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/10">
                  <RadioGroupItem value={option.value} id={option.value} className="text-primary" />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer flex items-center space-x-4"
                  >
                    <span className="text-3xl">{option.emoji}</span>
                    <span className="text-base font-medium text-foreground">{option.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={handleBack} 
                disabled={currentStep === 0}
                className="focus-soft rounded-xl px-6 py-3 text-base"
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!preferences[currentQuestion.key]}
                className="button-primary focus-soft rounded-xl px-6 py-3 text-base shadow-soft"
              >
                {currentStep === questions.length - 1 ? 'Complete Setup' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreferencesOnboarding;