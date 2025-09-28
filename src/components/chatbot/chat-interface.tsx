
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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Bot, Send, User, Mic, Paperclip, X, Volume2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  imageUrl?: string;
};

type Language = 'Nepali' | 'Hindi' | 'English';

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      text: 'Hello! I am your AI Chatbot. How can I help you today? You can ask me about organic pesticides, sowing dates, or government subsidies.',
      sender: 'ai',
    },
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<Language>('English');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbotLogo = PlaceHolderImages.find((p) => p.id === 'chatbot-logo');
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setInput(spokenText);
        setIsListening(false);
        // Automatically send after speech recognized
        handleSend(spokenText, uploadedImage); 
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        toast({ title: 'Voice Error', description: 'Could not recognize speech. Please try again.', variant: 'destructive'});
        setIsListening(false);
      };
    }
  }, [toast, uploadedImage]);
  
  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    const synth = window.speechSynthesis;
    return () => {
      if (synth.speaking) {
         synth.cancel();
      }
    }
  }, []);


  const handleSend = async (textToSend?: string, imageToSend?: string | null) => {
    const currentInput = textToSend || input;
    const currentImage = imageToSend === undefined ? uploadedImage : imageToSend;
    
    if (currentInput.trim() === '' || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      sender: 'user',
      imageUrl: currentImage || undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setUploadedImage(null);
    setLoading(true);

    try {
      const result = await answerAgronomyQuestions({
        query: currentInput,
        language,
        photoDataUri: currentImage || undefined,
      });
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
  
  const handleMicClick = () => {
    if (!recognitionRef.current) {
      toast({ title: 'Not Supported', description: 'Voice input is not supported in your browser.', variant: 'destructive' });
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleReadAloud = (message: Message) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      toast({ title: 'Not Supported', description: 'Text-to-speech is not supported in your browser.', variant: 'destructive'});
      return;
    }

    if (speakingMessageId === message.id) {
      synth.cancel();
      setSpeakingMessageId(null);
      return;
    }

    if (synth.speaking) {
      synth.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(message.text);
    
    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    // Simple language mapping
    if (language === 'Hindi') utterance.lang = 'hi-IN';
    else if (language === 'Nepali') utterance.lang = 'ne-NP';
    else utterance.lang = 'en-US';

    setSpeakingMessageId(message.id);
    synth.speak(utterance);
  }


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
                {message.sender === 'ai' && chatbotLogo ? (
                  <AvatarImage
                    src={chatbotLogo.imageUrl}
                    alt={chatbotLogo.description}
                  />
                ) : null}
                <AvatarFallback>
                  {message.sender === 'ai' ? <Bot /> : <User />}
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
                {message.imageUrl && (
                    <Image src={message.imageUrl} alt="User upload" width={200} height={200} className="rounded-md mb-2"/>
                )}
                <p className="text-sm">{message.text}</p>
                 {message.sender === 'ai' && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 mt-2" onClick={() => handleReadAloud(message)}>
                    <Volume2 className={cn("h-4 w-4", speakingMessageId === message.id && "text-primary animate-pulse")} />
                  </Button>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-3 flex-row">
              <Avatar>
                {chatbotLogo ? (
                  <AvatarImage
                    src={chatbotLogo.imageUrl}
                    alt={chatbotLogo.description}
                    className="animate-pulse"
                  />
                ) : null}
                <AvatarFallback>
                  <Bot className="text-primary animate-pulse" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg p-3">
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
        {uploadedImage && (
          <div className="relative mb-2 w-fit">
            <Image src={uploadedImage} alt="Preview" width={80} height={80} className="rounded-md" />
            <Button variant="ghost" size="icon" className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-muted-foreground/50 text-white" onClick={() => setUploadedImage(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Select
            value={language}
            onValueChange={(v) => setLanguage(v as Language)}
          >
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
            placeholder={isListening ? "Listening..." : "Ask a question..."}
            disabled={loading || isListening}
          />
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} disabled={loading}>
            <Paperclip />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleMicClick} disabled={loading} className={cn(isListening && 'text-destructive')}>
            <Mic />
          </Button>
          <Button onClick={() => handleSend()} disabled={loading || (!input.trim() && !uploadedImage)}>
            <Send />
          </Button>
        </div>
      </div>
    </Card>
  );
}
