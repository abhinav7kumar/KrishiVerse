'use client';

import { answerAgronomyQuestions } from '@/ai/flows/answer-agronomy-questions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Bot, Send, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '../icons';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

type Language = 'Nepali' | 'Hindi' | 'English';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      text: "Hello! I am your AI Agronomist. How can I help you today? You can ask me about organic pesticides, sowing dates, or government subsidies.",
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<Language>('English');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || loading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await answerAgronomyQuestions({ query: input, language });
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result.answer,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response from the AI.',
        variant: 'destructive',
      });
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting. Please try again later.",
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3',
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <Avatar>
                <AvatarFallback>
                  {message.sender === 'ai' ? (
                    <Logo className='text-primary'/>
                  ) : (
                    <User />
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  'max-w-[75%] rounded-lg p-3',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {loading && (
             <div className='flex items-start gap-3 flex-row'>
                <Avatar>
                    <AvatarFallback>
                        <Logo className='text-primary animate-pulse'/>
                    </AvatarFallback>
                </Avatar>
                <div className='bg-muted rounded-lg p-3'>
                    <div className="flex items-center space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                    </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Hindi">Hindi</SelectItem>
              <SelectItem value="Nepali">Nepali</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading}>
            <Send />
          </Button>
        </div>
      </div>
    </Card>
  );
}
