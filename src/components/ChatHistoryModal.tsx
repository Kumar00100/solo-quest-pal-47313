import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User } from 'lucide-react';

interface ChatHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messages: Array<{ role: 'user' | 'assistant'; text: string }>;
}

export function ChatHistoryModal({ open, onOpenChange, messages }: ChatHistoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[80vh] bg-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Chat History
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`
                  flex gap-3 animate-fade-in
                  ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}
                `}
              >
                {/* Avatar */}
                <div className={`
                  flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                  ${msg.role === 'user' 
                    ? 'bg-gradient-primary' 
                    : 'bg-card border-2 border-primary'
                  }
                `}>
                  {msg.role === 'user' ? (
                    <User className="w-5 h-5 text-primary-foreground" />
                  ) : (
                    <Bot className="w-5 h-5 text-primary" />
                  )}
                </div>

                {/* Message */}
                <div
                  className={`
                    flex-1 px-4 py-3 rounded-2xl
                    ${msg.role === 'user'
                      ? 'bg-gradient-primary text-primary-foreground'
                      : 'bg-muted border border-primary/20'
                    }
                  `}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
