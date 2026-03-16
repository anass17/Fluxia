import { useState, useEffect, useRef } from "react";
import { useFetcher } from "react-router";
import type { Message } from "~/utils/types";



export default function DietaryAssistant() {
  const fetcher = useFetcher();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I can help you check our menu for specific ingredients or allergens. Which dish or ingredient are you concerned about?" 
    }
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isTyping = fetcher.state !== "idle";
  const BRAND_ACCENT = "oklch(49.1% 0.27 292.581)"; 

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, isTyping]);

  // Sync fetcher data with history
  useEffect(() => {
    if (fetcher.data?.answer) {
      setHistory(prev => [...prev, { role: "assistant", content: fetcher.data.answer }]);
    }
  }, [fetcher.data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setHistory(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    // Send to RAG backend
    // fetcher.submit({ query: userMsg }, { method: "POST" });
  };

  const quickFilters = ["Gluten-Free", "Nut Allergy", "Vegan", "Lactose"];

  return (
    <div className="flex flex-col h-[calc(100vh)] mx-auto bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      
      {/* 1. Simple Header */}
      <div className="p-6 border-b border-slate-100 bg-white">
        <h2 className="text-xl font-black text-slate-900">Dietary Assistant</h2>
        <p className="text-xs text-slate-500 mt-1">Check menu items for allergens and ingredients.</p>
      </div>

      {/* 2. Chat History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/50">
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div 
              style={{
                backgroundColor: msg.role === "user" ? BRAND_ACCENT : "white",
                color: msg.role === "user" ? "white" : "#334155", // Slate-700
              }}
              className={`max-w-[80%] p-5 rounded-[2rem] text-sm font-medium leading-relaxed
              ${msg.role === "user" 
                ? "rounded-tr-none shadow-md" 
                : "rounded-tl-none border border-slate-100 shadow-sm"}
            `}>
              {msg.content}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-5 rounded-[2rem] rounded-tl-none border border-slate-100 flex gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* 3. Input, Quick Tags & Warning */}
      <div className="p-8 bg-white border-t border-slate-100">
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
          {quickFilters.map(tag => (
            <button 
              key={tag}
              type="button"
              onClick={() => setInput(`Which items are ${tag}?`)}
              className="whitespace-nowrap px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        <fetcher.Form onSubmit={handleSubmit} className="relative mb-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Does the Truffle Pasta contain nuts?"
            className="w-full p-5 pr-16 bg-slate-100 border-none rounded-[1.5rem] text-sm font-bold focus:ring-2 outline-none transition-all"
            style={{ '--tw-ring-color': BRAND_ACCENT } as React.CSSProperties} // Set ring color dynamically
          />
          <button 
            type="submit"
            disabled={isTyping}
            style={{ backgroundColor: BRAND_ACCENT }}
            className="absolute right-2 top-2 bottom-2 px-6 text-white rounded-xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
          >
            {isTyping ? (
                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            )}
          </button>
        </fetcher.Form>

        {/* Gray Warning at Bottom */}
        <div className="text-center pt-2">
          <p className="text-[10px] font-medium text-slate-400 leading-tight">
            Safety First: Our AI analyzes documented ingredients, but cross-contamination is possible. Always notify your server of severe allergies.
          </p>
        </div>
      </div>
    </div>
  );
}