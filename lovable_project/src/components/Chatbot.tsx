import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, MessageCircle, Heart, Brain, Lightbulb } from 'lucide-react';

interface ChatbotProps {
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const Chatbot = ({ onBack }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm here to help you with any sensory challenges you're facing. Whether it's anxiety, sensory overload, or finding coping strategies, I'm here to support you. How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ["I'm feeling anxious", "I'm overwhelmed by sounds", "I need help with crowds", "I'm having trouble with lights"]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickResponses = {
    anxiety: {
      message: "I understand anxiety can be challenging. Here are some techniques that might help:\n\n🌬️ **Deep Breathing**: Try the 4-7-8 technique - inhale for 4, hold for 7, exhale for 8\n\n🧘 **Grounding**: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste\n\n💪 **Progressive Muscle Relaxation**: Tense and release each muscle group starting from your toes",
      suggestions: ["Tell me more about grounding", "What if I'm in public?", "How to prepare for stressful situations"]
    },
    sounds: {
      message: "Sound sensitivity is very common. Here are some strategies:\n\n🎧 **Noise-Canceling Headphones**: Your best friend for filtering out unwanted sounds\n\n🌊 **White Noise Apps**: Try apps like Rain Rain or Noisli for soothing background sounds\n\n📍 **Location Planning**: Use SenseSafe to find quiet spaces and plan your routes during less busy times",
      suggestions: ["Recommend quiet places nearby", "Best noise-canceling headphones", "How to explain to others"]
    },
    crowds: {
      message: "Crowd anxiety is totally valid. Here's how to cope:\n\n🕐 **Timing**: Visit places during off-peak hours when possible\n\n🚪 **Exit Strategy**: Always identify exits and have a plan to leave if needed\n\n👥 **Gradual Exposure**: Start with smaller groups and gradually work up to larger crowds\n\n🤝 **Support Person**: Bring a trusted friend who understands your needs",
      suggestions: ["Best times to visit places", "How to stay calm in crowds", "What to tell my support person"]
    },
    lights: {
      message: "Light sensitivity can be managed with these approaches:\n\n🕶️ **Protective Eyewear**: FL-41 tinted glasses can filter harsh fluorescent lights\n\n💡 **Environment Control**: Sit away from direct lighting, use lamps instead of overhead lights\n\n🌅 **Natural Light**: When possible, choose spaces with natural lighting over artificial\n\n📱 **Screen Filters**: Use blue light filters on devices, especially in the evening",
      suggestions: ["Where to buy FL-41 glasses", "Apps for screen filtering", "How to ask for lighting accommodations"]
    }
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Generate bot response
    setTimeout(() => {
      let botResponse = generateBotResponse(text);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse.message,
        isBot: true,
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userText: string) => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('anxious') || lowerText.includes('anxiety') || lowerText.includes('worried')) {
      return quickResponses.anxiety;
    } else if (lowerText.includes('sound') || lowerText.includes('noise') || lowerText.includes('loud')) {
      return quickResponses.sounds;
    } else if (lowerText.includes('crowd') || lowerText.includes('people') || lowerText.includes('busy')) {
      return quickResponses.crowds;
    } else if (lowerText.includes('light') || lowerText.includes('bright') || lowerText.includes('fluorescent')) {
      return quickResponses.lights;
    } else if (lowerText.includes('grounding')) {
      return {
        message: "Grounding techniques help bring you back to the present moment:\n\n✋ **5-4-3-2-1 Technique**: \n• 5 things you can see\n• 4 things you can touch\n• 3 things you can hear\n• 2 things you can smell\n• 1 thing you can taste\n\n🦶 **Physical Grounding**: Feel your feet on the ground, press your hands together, or hold a textured object\n\n🌱 **Mental Grounding**: Count backwards from 100 by 7s, or name all the blue things you can see",
        suggestions: ["Practice grounding now", "What if grounding doesn't work?", "Grounding in public spaces"]
      };
    } else if (lowerText.includes('public')) {
      return {
        message: "Managing sensory challenges in public requires preparation:\n\n🎒 **Sensory Kit**: Carry headphones, sunglasses, fidget tools, and emergency contacts\n\n📍 **Scout Locations**: Use SenseSafe to find quiet corners, accessible bathrooms, and exit routes\n\n🗣️ **Communication**: Prepare simple phrases like 'I need a moment' or 'I'm feeling overwhelmed'\n\n⏰ **Time Limits**: Set realistic expectations and plan shorter outings initially",
        suggestions: ["What to include in sensory kit", "How to explain to strangers", "Emergency coping strategies"]
      };
    } else {
      return {
        message: "I hear you. Every person's sensory experience is unique, and what you're feeling is valid. \n\nCan you tell me more about what specifically is challenging you right now? This will help me provide more targeted support and strategies.",
        suggestions: ["I feel overwhelmed", "I need coping strategies", "Help me prepare for an outing", "I want to learn more about sensory processing"]
      };
    }
  };

  return (
    <div className="min-h-screen p-4 animate-fade-in">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="focus-soft">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">SenseSafe Support</h1>
            <p className="text-muted-foreground">Your sensory wellness companion</p>
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-1 focus-soft"
            onClick={() => handleSendMessage("I'm feeling anxious")}
          >
            <Heart className="h-5 w-5 text-destructive" />
            <span className="text-xs">Anxiety</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-1 focus-soft"
            onClick={() => handleSendMessage("I'm overwhelmed by sounds")}
          >
            <Brain className="h-5 w-5 text-primary" />
            <span className="text-xs">Overload</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-1 focus-soft"
            onClick={() => handleSendMessage("I need coping strategies")}
          >
            <Lightbulb className="h-5 w-5 text-warning" />
            <span className="text-xs">Strategies</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col gap-1 focus-soft"
            onClick={() => handleSendMessage("Help me prepare for an outing")}
          >
            <MessageCircle className="h-5 w-5 text-success" />
            <span className="text-xs">Planning</span>
          </Button>
        </div>

        {/* Chat Interface */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat with SenseSafe Assistant
            </CardTitle>
            <CardDescription>
              Get personalized support for sensory challenges and wellness strategies
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-primary-soft text-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm">{message.text}</p>
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-8 focus-soft"
                              onClick={() => handleSendMessage(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Share what you're experiencing..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="focus-soft"
                />
                <Button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim()}
                  className="button-primary focus-soft"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;