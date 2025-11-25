import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { generateTherapyResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AITherapy: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: 'Namaste. I am your AI Yoga Therapy Assistant. How is your body and mind feeling today? You can tell me about any stress, physical discomfort, or goals you have.',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for context (exclude timestamps for API)
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    const responseText = await generateTherapyResponse(userMsg.text, history);
    
    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="bg-white p-6 rounded-t-2xl shadow-sm border-b border-stone-100 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-amber-100 p-2 rounded-lg">
            <Sparkles className="text-amber-600" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-stone-800 font-serif">AI Therapy Assistant</h1>
            <p className="text-xs text-stone-500">Powered by Gemini • Private & Secure</p>
          </div>
        </div>
        <div className="hidden sm:block text-xs bg-stone-100 px-3 py-1 rounded-full text-stone-500">
          Note: This is not a substitute for medical advice.
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto bg-stone-50 p-4 sm:p-8 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] sm:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 ${msg.role === 'user' ? 'bg-stone-800 ml-3' : 'bg-amber-600 mr-3'}`}>
                {msg.role === 'user' ? <User size={14} color="white" /> : <Bot size={14} color="white" />}
              </div>

              {/* Bubble */}
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-stone-800 text-white rounded-tr-none' 
                  : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
              }`}>
                 {/* Simple markdown formatting support (bold/italic) */}
                 <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex flex-row">
               <div className="flex-shrink-0 h-8 w-8 rounded-full bg-amber-600 mr-3 flex items-center justify-center mt-1">
                <Bot size={14} color="white" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-stone-200 shadow-sm flex items-center space-x-2">
                <Loader2 className="animate-spin text-amber-600" size={16} />
                <span className="text-sm text-stone-500">Meditating on your request...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 rounded-b-2xl shadow-lg border-t border-stone-100">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms, mood, or ask for a yoga routine..."
            className="w-full pl-6 pr-16 py-4 bg-stone-50 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition placeholder-stone-400"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2.5 bg-amber-600 text-white rounded-full hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
          >
            <Send size={20} />
          </button>
        </form>
        <div className="text-center mt-2">
           <p className="text-[10px] text-stone-400">AI can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  );
};