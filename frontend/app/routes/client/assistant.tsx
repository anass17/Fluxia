import { useState, useEffect, useRef } from "react";
import { useFetcher, useLoaderData } from "react-router";
import { menuService } from "~/api/menu.service";
import type { Message } from "~/utils/types";

type QueryItem = {
  query: string
  answer: string
}


export async function loader({ request }: { request: Request }) {
    const response = menuService.getChatHistory(request)

    return response

}



export default function DietaryAssistant() {
  const fetcher = useFetcher();
  const historyItems : QueryItem[] = useLoaderData()
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<any[]>(
    [
      { 
        role: "assistant", 
        content: "Hello! I can help you check our menu for specific ingredients or allergens. Which dish or ingredient are you concerned about?" 
      },
    ]  
  )

  
  const scrollRef = useRef<HTMLDivElement>(null);
  const isTyping = fetcher.state !== "idle";
  const BRAND_ACCENT = "oklch(49.1% 0.27 292.581)"; 

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history, isTyping]);

  useEffect(() => {
    if (historyItems.length > 0) {
      setHistory([{ 
          role: "assistant", 
          content: "Hello! I can help you check our menu for specific ingredients or allergens. Which dish or ingredient are you concerned about?" 
        },
        ...historyItems.flatMap((item) => [
          { role: "user", content: item.query },
          { role: "assistant", content: item.answer }
        ])
      ]);
    }
  }, [historyItems]);

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

    fetcher.submit({ query: userMsg }, { method: "POST", action: "/chat/assistant" });
  };

  const handleClearChat = () => {
    setHistory(
      [
        { 
          role: "assistant", 
          content: "Hello! I can help you check our menu for specific ingredients or allergens. Which dish or ingredient are you concerned about?" 
        },
      ] 
    )
  }

  const quickFilters = ["Gluten-Free", "Nut Allergy", "Vegan", "Lactose"];

  return (
    <div className="flex flex-col h-[calc(100vh)] mx-auto bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      
      {/* 1. Simple Header */}
      <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white">
        <div>
          <h2 className="text-xl font-black text-slate-900">Dietary Assistant</h2>
          <p className="text-xs text-slate-500 mt-1">Check menu items for allergens and ingredients.</p>
        </div>

        <button 
          onClick={handleClearChat} // Replace with your clear function
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
          title="Clear conversation"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-4 h-4 transition-colors group-hover:stroke-red-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
          <span>Clear Chat</span>
        </button>
      </div>

      {/* 2. Chat History */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/50">
        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <pre 
              style={{
                backgroundColor: msg.role === "user" ? BRAND_ACCENT : "white",
                color: msg.role === "user" ? "white" : "#334155", // Slate-700
              }}
              className={`max-w-[80%] p-5 rounded-[2rem] font-sans whitespace-break-spaces text-sm font-medium leading-relaxed
              ${msg.role === "user" 
                ? "rounded-tr-none shadow-md" 
                : "rounded-tl-none border border-slate-100 shadow-sm"}
            `}>
              {msg.content}
            </pre>
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
            name="query"
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