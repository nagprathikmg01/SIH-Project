import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { cn } from './ui/utils';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  ts: number;
};

const LOCAL_STORAGE_KEY = 'kk_chat_history_v1';

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as ChatMessage[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, messages]);

  const hasBackend = useMemo(() => {
    return typeof (window as any).__AI_CHAT_ENDPOINT__ === 'string' ||
      import.meta.env.VITE_AI_CHAT_ENDPOINT;
  }, []);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setLoading(true);
    try {
      let assistantText = '';

      if (hasBackend) {
        const endpoint = (window as any).__AI_CHAT_ENDPOINT__ || import.meta.env.VITE_AI_CHAT_ENDPOINT;
        const res = await fetch(String(endpoint), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) }),
        });
        if (!res.ok) throw new Error('Failed to get AI response');
        const data = await res.json();
        assistantText = data.reply ?? data.message ?? 'Sorry, I could not understand. Please try again.';
      } else {
        // Simple built-in mock assistant
        assistantText = mockAnswer(trimmed);
        await new Promise((r) => setTimeout(r, 500));
      }

      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: assistantText,
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'There was an error reaching the AI service. Please try again later.',
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  }

  function mockAnswer(prompt: string): string {
    const lower = prompt.toLowerCase();
    if (lower.includes('crop') && lower.includes('best')) {
      return 'Based on typical Karnataka conditions, consider ragi, paddy, or tur dal. For specific advice, share your district, soil type, and season.';
    }
    if (lower.includes('price') || lower.includes('market')) {
      return 'Crop prices vary by APMC market. Check today’s MSP and local mandi rates. You can also look at our Market Intelligence section for trends.';
    }
    if (lower.includes('disease') || lower.includes('leaf')) {
      return 'For disease issues, inspect for spots, discoloration, or wilting. Share a photo in the AI Predictions section for precise detection, and isolate affected plants meanwhile.';
    }
    if (lower.includes('fertilizer') || lower.includes('urea')) {
      return 'Use balanced NPK as per soil test. Without a test, start low and observe. Ensure proper irrigation and avoid overuse to prevent burn.';
    }
    return 'I am here to help with crops, soil, weather, prices, and diseases. Ask anything or tell me your district and crop for tailored guidance.';
  }

  return (
    <div className="fixed z-[60] bottom-4 right-4">
      {!open && (
        <Button
          aria-label="Open AI chat"
          className="rounded-full h-12 w-12 shadow-lg bg-karnataka-green hover:bg-karnataka-green/90"
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="h-5 w-5 text-white" />
        </Button>
      )}

      {open && (
        <Card className="w-[360px] max-w-[92vw] h-[520px] shadow-2xl border-karnataka-green/30">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-karnataka-green" />
              <span className="font-medium text-karnataka-green">Krishi AI Assistant</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-3 pt-2 flex flex-col h-[calc(520px-56px-64px)]">
            <ScrollArea className="flex-1" viewportRef={scrollRef}>
              <div className="pr-2 py-2 space-y-3">
                {messages.length === 0 && (
                  <div className="text-sm text-muted-foreground px-2">
                    Ask about crop choices, fertilizer schedules, disease control, and market prices.
                  </div>
                )}
                {messages.map((m) => (
                  <Bubble key={m.id} role={m.role} content={m.content} />
                ))}
              </div>
            </ScrollArea>

            <div className="mt-2 flex items-center gap-2">
              <Input
                placeholder={loading ? 'Thinking…' : 'Type your question'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={loading}
              />
              <Button onClick={handleSend} disabled={loading || input.trim().length === 0}>
                <Send className={cn('h-4 w-4', loading && 'opacity-50')} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function Bubble({ role, content }: { role: 'user' | 'assistant'; content: string }) {
  const isUser = role === 'user';
  return (
    <div className={cn('flex items-start gap-2', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="mt-1 shrink-0 rounded-full bg-karnataka-green/10 p-1">
          <Bot className="h-4 w-4 text-karnataka-green" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap',
          isUser ? 'bg-karnataka-green text-white' : 'bg-secondary'
        )}
      >
        {content}
      </div>
      {isUser && (
        <div className="mt-1 shrink-0 rounded-full bg-karnataka-green p-1">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
}

export default ChatWidget;


