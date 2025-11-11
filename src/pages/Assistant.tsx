import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { AssistantAvatar } from '@/components/AssistantAvatar';
import { VoiceInput } from '@/components/VoiceInput';
import { TasksSlideOver } from '@/components/TasksSlideOver';
import { ProfileModal } from '@/components/ProfileModal';
import { DashboardModal } from '@/components/DashboardModal';
import { WalkingTracker } from '@/components/WalkingTracker';
import { ChatHistoryModal } from '@/components/ChatHistoryModal';
import { Button } from '@/components/ui/button';
import { User, LayoutDashboard, MapPin, Keyboard, Mic, MicOff } from 'lucide-react';

type Expression = 'idle' | 'speaking' | 'thinking' | 'happy';

const Assistant = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [expression, setExpression] = useState<Expression>('idle');
  const [profileOpen, setProfileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [walkingTrackerOpen, setWalkingTrackerOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Hello! I\'m your SoloLevel assistant. How can I help you level up today?' }
  ]);

  const handleSendMessage = (text: string) => {
    setMessages([...messages, { role: 'user', text }]);
    setExpression('thinking');
    
    // Simulate AI response with realistic expressions
    setTimeout(() => {
      setExpression('speaking');
      setIsSpeaking(true);
      const response = "I understand you want to work on that. Let me help you create a plan!";
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
      
      // Simulate speech duration with lip sync
      setTimeout(() => {
        setIsSpeaking(false);
        setExpression('happy');
        
        // Return to idle after a moment
        setTimeout(() => setExpression('idle'), 1500);
      }, 3000);
    }, 800);
  };

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setExpression('thinking');
    } else {
      setExpression('idle');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-glow blur-3xl opacity-20 animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Quick action buttons */}
      <div className="fixed top-20 right-4 z-40 flex flex-col gap-2">
        <Button
          onClick={() => setProfileOpen(true)}
          size="icon"
          className="rounded-full w-12 h-12 bg-card/80 backdrop-blur-md border border-primary/20 hover:bg-card"
        >
          <User className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => setDashboardOpen(true)}
          size="icon"
          className="rounded-full w-12 h-12 bg-card/80 backdrop-blur-md border border-primary/20 hover:bg-card"
        >
          <LayoutDashboard className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => setWalkingTrackerOpen(true)}
          size="icon"
          className="rounded-full w-12 h-12 bg-card/80 backdrop-blur-md border border-primary/20 hover:bg-card"
        >
          <MapPin className="w-5 h-5" />
        </Button>
      </div>

      {/* Main content area */}
      <div className="relative pt-32 min-h-screen pb-32">
        {/* Avatar */}
        <AssistantAvatar 
          isSpeaking={isSpeaking}
          isListening={isListening}
          expression={expression}
        />

        {/* Chat messages */}
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`
                  flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}
                  animate-slide-up
                `}
              >
                <div
                  className={`
                    max-w-[80%] px-4 py-3 rounded-2xl
                    ${msg.role === 'user'
                      ? 'bg-gradient-primary text-primary-foreground ml-auto'
                      : 'bg-card border border-primary/20'
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Controls */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
          {/* Keyboard toggle button */}
          <Button
            onClick={() => setShowInput(!showInput)}
            size="icon"
            className={`
              rounded-full w-14 h-14 shadow-glow transition-all
              ${showInput 
                ? 'bg-primary hover:bg-primary/90' 
                : 'bg-card/80 backdrop-blur-md border border-primary/20 hover:bg-card'
              }
            `}
          >
            <Keyboard className="w-6 h-6" />
          </Button>

          {/* Mic button */}
          <Button
            onClick={handleToggleListening}
            size="icon"
            className={`
              rounded-full w-14 h-14 shadow-glow transition-all
              ${isListening 
                ? 'bg-destructive hover:bg-destructive/90 animate-pulse-glow' 
                : 'bg-gradient-primary hover:shadow-glow-lg'
              }
            `}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>
        </div>

        {/* Voice Input - only shown when keyboard is toggled */}
        {showInput && (
          <VoiceInput
            onSend={handleSendMessage}
            isListening={isListening}
            onToggleListening={handleToggleListening}
            onOpenHistory={() => setHistoryOpen(true)}
          />
        )}

        {/* Tasks Slide-over */}
        <TasksSlideOver />

        {/* Modals */}
        <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
        <DashboardModal open={dashboardOpen} onOpenChange={setDashboardOpen} />
        <WalkingTracker open={walkingTrackerOpen} onOpenChange={setWalkingTrackerOpen} />
        <ChatHistoryModal open={historyOpen} onOpenChange={setHistoryOpen} messages={messages} />
      </div>
    </div>
  );
};

export default Assistant;
