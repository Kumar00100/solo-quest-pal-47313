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
  const [isThinking, setIsThinking] = useState(false);
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
    setIsThinking(true);
    setExpression('thinking');
    
    // Simulate AI thinking/processing
    setTimeout(() => {
      setIsThinking(false);
      setExpression('speaking');
      setIsSpeaking(true);
      const response = "I understand you want to work on that. Let me help you create a plan!";
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
      
      // Simulate speech duration
      setTimeout(() => {
        setIsSpeaking(false);
        setExpression('happy');
        
        // Return to idle
        setTimeout(() => setExpression('idle'), 1500);
      }, 3000);
    }, 1500);
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
        
        {/* Emergency SOS Button */}
        <div className="h-px bg-border/50 my-2" />
        <Button
          onClick={() => alert('Emergency SOS activated! Sending alert...')}
          size="icon"
          className="rounded-full w-14 h-14 bg-destructive/20 backdrop-blur-md border-2 border-destructive hover:bg-destructive hover:border-destructive/80 shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] transition-all animate-pulse-glow"
        >
          <span className="text-xl font-bold text-destructive-foreground">SOS</span>
        </Button>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 max-w-3xl pt-20 pb-32 min-h-screen">
        {/* Avatar section - centered */}
        <div className="flex justify-center pt-16">
          <AssistantAvatar 
            isSpeaking={isSpeaking}
            isListening={isListening}
            isThinking={isThinking}
          />
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
  );
};

export default Assistant;