"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  HelpCircle,
  BookOpen,
  ChevronDown
} from "lucide-react";
import {
  CNAT_MAM_PROFILE,
  QUICK_PROMPT_CHIPS,
  getCNATMamResponse
} from "./cnatMamKnowledge";

export default function CNATMamChatbot({
  topicTitle = "Study Topic",
  moduleSlug = "",
  subjectKey = "excel"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello dear student! I am **CNAT Mam**, your senior AI academic mentor. I'm right here to guide you through **"${topicTitle}"**! How can I help you master your formulas or concepts today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: "user", text: query, time: userTime };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");
    setIsTyping(true);

    // Simulate AI thinking & typing delay
    setTimeout(() => {
      const responseText = getCNATMamResponse(query, { topicTitle, moduleSlug, subjectKey });
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: responseText, time: botTime }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleReset = () => {
    setMessages([
      {
        sender: "bot",
        text: `Chat reset! I am ready for your next question regarding **"${topicTitle}"**.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* =========================================================================
          FLOATING LAUNCHER BUTTON
      ========================================================================= */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-600 text-white font-bold text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-sky-400/30 shadow-sky-950/60"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-300"></span>
          </span>

          <div className="flex items-center gap-2.5">
            <img
              src="/teachers/cnat.jpg"
              alt="CNAT Mam Avatar"
              className="w-7 h-7 rounded-full object-cover border border-amber-300 shadow-sm"
            />
            <span>Ask CNAT Mam</span>
          </div>

          <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] uppercase font-extrabold tracking-wider text-teal-100">
            AI Tutor
          </span>
        </button>
      )}

      {/* =========================================================================
          INTERACTIVE CHATBOT DRAWER WINDOW
      ========================================================================= */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-3xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 border-sky-500/20">
          
          {/* HEADER BAR */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-sky-500 p-0.5 shadow-md">
                  <img
                    src="/teachers/cnat.jpg"
                    alt="CNAT Mam Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-white text-sm tracking-wide">CNAT Mam</h3>
                  <span className="px-1.5 py-0.2 rounded bg-sky-950 border border-sky-700 text-sky-300 text-[10px] font-mono">
                    AI Mentor
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                  {topicTitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              <button
                onClick={handleReset}
                title="Reset Chat"
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* MESSAGES SCROLL AREA */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm custom-scrollbar bg-slate-950/40">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <img
                    src="/teachers/cnat.jpg"
                    alt="CNAT Mam"
                    className="w-7 h-7 rounded-full object-cover border border-sky-600/60 shrink-0 mt-0.5 shadow-sm"
                  />
                )}

                <div
                  className={`relative max-w-[85%] rounded-2xl px-4 py-3 shadow-md text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-br-none"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text.split('\n').map((line, lIdx) => {
                      if (line.startsWith('`=') || line.startsWith('`')) {
                        return (
                          <div key={lIdx} className="my-1.5 p-2 rounded bg-slate-950 border border-slate-800 font-mono text-sky-300 text-xs overflow-x-auto">
                            {line.replace(/`/g, '')}
                          </div>
                        );
                      }
                      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
                      const parsedLine = parts.map((part, pIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return (
                            <strong key={pIdx} className="font-bold text-amber-300">
                              {part.slice(2, -2)}
                            </strong>
                          );
                        }
                        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
                        if (linkMatch) {
                          return (
                            <a
                              key={pIdx}
                              href={linkMatch[2]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sky-400 font-semibold underline hover:text-sky-300 transition"
                            >
                              {linkMatch[1]}
                            </a>
                          );
                        }
                        return part;
                      });
                      return <p key={lIdx} className={lIdx > 0 ? "mt-1" : ""}>{parsedLine}</p>;
                    })}
                  </div>

                  <div className="mt-2 pt-1 border-t border-slate-800/40 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{msg.time}</span>
                    {msg.sender === "bot" && (
                      <button
                        onClick={() => handleCopy(msg.text, index)}
                        className="hover:text-sky-300 transition flex items-center gap-1"
                        title="Copy Answer"
                      >
                        {copiedIndex === index ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      </button>
                    )}
                  </div>
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-9">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping delay-200" />
                </span>
                <span>CNAT Mam is formulating your answer...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK PROMPT CHIPS */}
          <div className="px-3 py-2 bg-slate-900/80 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 no-scrollbar">
            {QUICK_PROMPT_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.query)}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-[11px] font-medium whitespace-nowrap transition-all duration-200 shrink-0"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* INPUT FORM AREA */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask CNAT Mam about ${topicTitle}...`}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/60 transition"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-md shrink-0"
              title="Send Question"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
