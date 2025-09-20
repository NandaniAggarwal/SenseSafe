import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Heart, Home } from 'lucide-react';
import { Cafe } from '@/types';

interface FeedbackRatingProps {
  cafe: Cafe;
  initialRating: number;
  onComplete: () => void;
}

const FeedbackRating = ({ cafe, initialRating, onComplete }: FeedbackRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [sensoryRatings, setSensoryRatings] = useState({
    lighting: 0,
    sound: 0,
    crowd: 0,
    smell: 0,
    comfort: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSensoryRating = (category: keyof typeof sensoryRatings, value: number) => {
    setSensoryRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate feedback submission
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  const sensoryCategories = [
    { key: 'lighting', label: 'Lighting Comfort', emoji: '💡' },
    { key: 'sound', label: 'Sound Level', emoji: '🔉' },
    { key: 'crowd', label: 'Crowd Level', emoji: '👥' },
    { key: 'smell', label: 'Scent/Smell', emoji: '👃' },
    { key: 'comfort', label: 'Overall Comfort', emoji: '🛋️' }
  ];

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
        <Card className="interactive-card max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="animate-bounce-gentle mb-6">
              <Heart className="h-16 w-16 text-success mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-success mb-2">Thank You!</h2>
            <p className="text-muted-foreground">
              Your feedback helps make spaces more sensory-friendly for everyone.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">How was your experience?</h1>
          <p className="text-muted-foreground">Help us improve sensory-friendly spaces</p>
        </div>

        {/* Cafe Info */}
        <Card className="interactive-card">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-warning" />
              {cafe.name}
            </CardTitle>
            <CardDescription>{cafe.address}</CardDescription>
          </CardHeader>
        </Card>

        {/* Overall Rating */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle>Overall Experience</CardTitle>
            <CardDescription>Rate your overall experience at this café</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-4xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-warning text-warning'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {rating === 1 && "Poor experience"}
              {rating === 2 && "Below expectations"}
              {rating === 3 && "Good experience"}
              {rating === 4 && "Great experience"}
              {rating === 5 && "Excellent experience"}
            </p>
          </CardContent>
        </Card>

        {/* Sensory-Specific Ratings */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle>Sensory-Friendly Features</CardTitle>
            <CardDescription>Rate how well each sensory aspect worked for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {sensoryCategories.map(({ key, label, emoji }) => (
              <div key={key} className="space-y-2">
                <Label className="flex items-center gap-2">
                  <span className="text-lg">{emoji}</span>
                  {label}
                </Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
                      onClick={() => handleSensoryRating(key as keyof typeof sensoryRatings, star)}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= sensoryRatings[key as keyof typeof sensoryRatings]
                            ? 'fill-success text-success'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Written Feedback */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle>Additional Feedback</CardTitle>
            <CardDescription>Share any specific thoughts or suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what worked well or what could be improved for sensory-friendly visitors..."
              className="min-h-24 focus-soft"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button 
            onClick={handleSubmit}
            className="button-primary flex-1 h-12 focus-soft"
            disabled={rating === 0}
          >
            Submit Feedback
          </Button>
          <Button 
            onClick={onComplete}
            variant="outline"
            className="focus-soft"
          >
            <Home className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Your feedback helps create a more inclusive world for everyone</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackRating;