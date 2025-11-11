import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface VoiceInputProps {
  onSend: (message: string) => void;
  isListening?: boolean;
  onToggleListening?: () => void;
  onOpenHistory?: () => void;
}

export function VoiceInput({ onSend, isListening = false, onToggleListening, onOpenHistory }: VoiceInputProps) {
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
      setIsExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (isExpanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div className={`
      fixed bottom-24 left-1/2 -translate-x-1/2 z-30
      transition-all duration-300 ease-out
      ${isExpanded ? 'w-[calc(100%-2rem)] max-w-2xl' : 'w-64'}
    `}>
      <div className={`
        relative bg-card border border-primary/30 rounded-3xl overflow-hidden
        shadow-glow
        ${isExpanded ? 'p-4' : 'p-2'}
      `}>
        <div className="relative flex items-center gap-2">
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => !text && setIsExpanded(false)}
            onKeyPress={handleKeyPress}
            placeholder={isExpanded ? "Type your message or use voice..." : "Tap to chat..."}
            className={`
              resize-none bg-transparent border-0 focus-visible:ring-0 text-foreground
              placeholder:text-muted-foreground
              ${isExpanded ? 'min-h-[100px]' : 'h-10'}
            `}
            style={{ 
              paddingRight: '80px',
              scrollbarWidth: 'thin'
            }}
          />
          
          <div className="absolute right-2 top-2 flex items-center gap-2">
            {/* History button */}
            <Button
              size="icon"
              variant="ghost"
              onClick={onOpenHistory}
              className="rounded-full h-10 w-10 bg-primary/10 hover:bg-primary/20 text-primary transition-all"
            >
              <History className="w-5 h-5" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={onToggleListening}
              className={`
                rounded-full h-10 w-10 transition-all
                ${isListening 
                  ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse-glow' 
                  : 'bg-primary/10 hover:bg-primary/20 text-primary'
                }
              `}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            
            {text && (
              <Button
                size="icon"
                onClick={handleSend}
                className="rounded-full h-10 w-10 bg-gradient-primary hover:shadow-glow"
              >
                <Send className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {isListening && (
          <div className="mt-2 flex items-center gap-2 text-xs text-destructive">
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            Listening...
          </div>
        )}
      </div>
    </div>
  );
}
