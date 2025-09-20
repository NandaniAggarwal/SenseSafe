import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';

interface CafeRegistrationProps {
  onBack: () => void;
}

const CafeRegistration = ({ onBack }: CafeRegistrationProps) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    description: '',
    email: '',
    phone: '',
    features: {
      dimLighting: false,
      quietZone: false,
      lowCrowd: false,
      noStrongSmells: false,
      stableSeating: false,
      climateControlled: false,
    }
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleFeatureChange = (feature: keyof typeof formData.features) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsSubmitting(false);
      setIsVerified(true);
    }, 2000);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
        <Card className="interactive-card max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-success mb-2">Verified!</h2>
              <p className="text-muted-foreground">
                Your café has been successfully verified by our team. 
                Welcome to SenseSafe!
              </p>
            </div>
            <Button onClick={onBack} className="button-primary w-full">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
        <Card className="interactive-card max-w-md w-full text-center">
          <CardContent className="p-8">
            <div className="mb-6">
              <Clock className="h-16 w-16 text-primary mx-auto mb-4 animate-bounce-gentle" />
              <h2 className="text-2xl font-bold text-primary mb-2">Under Verification</h2>
              <p className="text-muted-foreground">
                Our team is reviewing your café submission. 
                This usually takes just a moment...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="focus-soft">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">Register Your Café</h1>
            <p className="text-muted-foreground">Join our sensory-friendly network</p>
          </div>
        </div>

        <Card className="interactive-card">
          <CardHeader>
            <CardTitle>Café Information</CardTitle>
            <CardDescription>
              Tell us about your café and the sensory-friendly features you offer
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Café Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your café name"
                    required
                    className="focus-soft"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    required
                    className="focus-soft"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Main St, City, State"
                  required
                  className="focus-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="cafe@example.com"
                  required
                  className="focus-soft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your café's atmosphere and what makes it special..."
                  className="min-h-20 focus-soft"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-semibold">Sensory-Friendly Features</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'dimLighting', label: 'Dim/Soft Lighting', emoji: '🌙' },
                    { key: 'quietZone', label: 'Quiet Zone Available', emoji: '🔇' },
                    { key: 'lowCrowd', label: 'Low Crowd Environment', emoji: '👤' },
                    { key: 'noStrongSmells', label: 'No Strong Smells', emoji: '🚫' },
                    { key: 'stableSeating', label: 'Stable Seating', emoji: '🪑' },
                    { key: 'climateControlled', label: 'Climate Controlled', emoji: '🌡️' },
                  ].map(({ key, label, emoji }) => (
                    <div key={key} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id={key}
                        checked={formData.features[key as keyof typeof formData.features]}
                        onCheckedChange={() => handleFeatureChange(key as keyof typeof formData.features)}
                        className="focus-soft"
                      />
                      <Label htmlFor={key} className="flex-1 cursor-pointer flex items-center space-x-2">
                        <span className="text-lg">{emoji}</span>
                        <span>{label}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="button-primary w-full h-12 focus-soft"
                  disabled={!formData.name || !formData.address || !formData.email}
                >
                  Submit for Verification
                </Button>
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Your café will be reviewed by our team within 24 hours</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CafeRegistration;