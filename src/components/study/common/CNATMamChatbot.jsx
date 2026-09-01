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
  Maximize2,
  Minimize2,
  HelpCircle,
  BookOpen,
  MapPin,
  GraduationCap,
  Users
} from "lucide-react";
import {
  CNAT_MAM_PROFILE,
  getQuickChipsForSubject,
  getCNATMamResponse
} from "./cnatMamKnowledge";

export default function CNATMamChatbot({
  topicTitle = "Study Topic",
  moduleSlug = "",
  subjectKey = "excel"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Dynamic quick chips based on current subject track
  const quickChips = getQuickChipsForSubject(subjectKey);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello dear student! I am **CNAT Mam**, your senior AI academic mentor at **Coder & AccoTax**.

I can guide you through **"${topicTitle}"**, explain formulas and code, provide our **campus address**, **teachers & mentors details**, or **course syllabi & admissions**. How can I help you today?`,
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

  // Handle Text-To-Speech (TTS)
  const handleToggleSpeak = (text, index) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking && speakingIndex === index) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown characters for natural speech
    const cleanSpeechText = text
      .replace(/[*#`_~\[\]()>-]/g, " ")
      .replace(/\|/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.includes("en") && (v.name.includes("Female") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Zira"))
    ) || voices.find((v) => v.lang.includes("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingIndex(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setSpeakingIndex(null);
    };

    setIsSpeaking(true);
    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  // Stop speaking when closed
  useEffect(() => {
    if (!isOpen && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingIndex(null);
    }
  }, [isOpen]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: "user", text: query, time: userTime };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");
    setIsTyping(true);

    // Simulate natural AI thinking & response delay
    setTimeout(() => {
      const responseText = getCNATMamResponse(query, { topicTitle, moduleSlug, subjectKey });
      const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: responseText, time: botTime }
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleReset = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setSpeakingIndex(null);
    }
    setMessages([
      {
        sender: "bot",
        text: `Chat reset! I am ready for your next question regarding **"${topicTitle}"**, institute address, teachers details, or courses.`,
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
          className="group relative flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-teal-600 text-white font-bold text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border border-sky-400/30 shadow-sky-950/60 cursor-pointer"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-300"></span>
          </span>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full overflow-hidden border border-sky-300/40 p-0.5 shadow-sm bg-slate-900">
              <img
                src="/teachers/cnat.jpg"
                alt="CNAT Mam"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            <span>Ask CNAT Mam</span>
          </div>

          <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] uppercase font-extrabold tracking-wider text-teal-100">
            AI Mentor
          </span>
        </button>
      )}

      {/* =========================================================================
          INTERACTIVE CHATBOT DRAWER WINDOW
      ========================================================================= */}
      {isOpen && (
        <div
          className={`${
            isExpanded ? "w-[94vw] sm:w-[680px] h-[720px]" : "w-[92vw] sm:w-[440px] h-[600px]"
          } max-h-[88vh] rounded-3xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 border-sky-500/30 transition-all`}
        >
          {/* HEADER BAR */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-sky-400 to-teal-400 p-0.5 shadow-md overflow-hidden">
                  <img
                    src="/teachers/cnat.jpg"
                    alt="CNAT Mam Profile"
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-white text-sm tracking-wide">CNAT Mam</h3>
                  <span className="px-1.5 py-0.5 rounded bg-sky-950 border border-sky-700 text-sky-300 text-[10px] font-mono font-semibold">
                    {subjectKey.toUpperCase()} Mentor
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate max-w-[240px]">
                  {topicTitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                title={isExpanded ? "Compact View" : "Expand View"}
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition cursor-pointer"
              >
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button
                onClick={handleReset}
                title="Reset Conversation"
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition cursor-pointer"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* QUICK INSTITUTION ACTION BAR */}
          <div className="px-3 py-1.5 bg-slate-900/95 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSendMessage("What is the official address and campus location of Coder & AccoTax?")}
                className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 hover:bg-sky-950 border border-slate-700 hover:border-sky-600 text-sky-300 hover:text-sky-100 transition cursor-pointer"
                title="View Campus Address"
              >
                <MapPin size={11} className="text-sky-400" />
                <span>Address</span>
              </button>
              <button
                onClick={() => handleSendMessage("Who are the teachers and faculty members at Coder & AccoTax?")}
                className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-600 text-indigo-300 hover:text-indigo-100 transition cursor-pointer"
                title="View Faculty Profiles"
              >
                <Users size={11} className="text-indigo-400" />
                <span>Teachers</span>
              </button>
              <button
                onClick={() => handleSendMessage("What are all the courses offered at Coder & AccoTax?")}
                className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 hover:bg-emerald-950 border border-slate-700 hover:border-emerald-600 text-emerald-300 hover:text-emerald-100 transition cursor-pointer"
                title="View Courses Catalog"
              >
                <GraduationCap size={11} className="text-emerald-400" />
                <span>Courses</span>
              </button>
            </div>
            <span className="text-[10px] text-slate-400 hidden sm:inline">Coder & AccoTax</span>
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
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}

                <div
                  className={`relative max-w-[88%] rounded-2xl px-4 py-3 shadow-md text-xs sm:text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-br-none"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none"
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans space-y-2">
                    {msg.text.split('\n').map((line, lIdx) => {
                      // Horizontal divider
                      if (line.trim() === '---') {
                        return <hr key={lIdx} className="my-2 border-slate-800" />;
                      }

                      // Markdown headers
                      if (line.startsWith('### ')) {
                        return (
                          <h4 key={lIdx} className="font-bold text-sky-300 text-sm mt-2 mb-1">
                            {line.replace('### ', '')}
                          </h4>
                        );
                      }
                      if (line.startsWith('#### ')) {
                        return (
                          <h5 key={lIdx} className="font-semibold text-teal-300 text-xs mt-1.5 mb-0.5">
                            {line.replace('#### ', '')}
                          </h5>
                        );
                      }

                      // Blockquote line (e.g. Address Box)
                      if (line.startsWith('> ')) {
                        return (
                          <div key={lIdx} className="my-1.5 p-3 rounded-xl bg-slate-950 border-l-4 border-sky-500 text-slate-200 font-sans text-xs">
                            {renderFormattedParts(line.replace(/^>\s*/, ''))}
                          </div>
                        );
                      }

                      // Code block line
                      if (line.startsWith('`=') || line.startsWith('`') || line.startsWith('```')) {
                        const cleanCode = line.replace(/```[a-z]*|```/g, '').replace(/`/g, '');
                        if (!cleanCode.trim()) return null;
                        return (
                          <div key={lIdx} className="my-1.5 p-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sky-300 text-xs overflow-x-auto">
                            {cleanCode}
                          </div>
                        );
                      }

                      // Bullet points
                      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                        const bulletContent = line.trim().slice(2);
                        return (
                          <div key={lIdx} className="flex items-start gap-1.5 pl-1">
                            <span className="text-sky-400 mt-0.5">•</span>
                            <span>{renderFormattedParts(bulletContent)}</span>
                          </div>
                        );
                      }

                      // Numbered list items (e.g., 1. , 2. )
                      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)$/);
                      if (numMatch) {
                        return (
                          <div key={lIdx} className="flex items-start gap-1.5 pl-1">
                            <span className="font-bold text-amber-400 mt-0.5 text-xs">{numMatch[1]}.</span>
                            <span>{renderFormattedParts(numMatch[2])}</span>
                          </div>
                        );
                      }

                      // Table row
                      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
                        if (line.includes(':---') || line.includes('---')) return null;
                        const cells = line.split('|').filter((c) => c.trim() !== '');
                        return (
                          <div key={lIdx} className="my-1 flex gap-2 overflow-x-auto text-[11px] bg-slate-950/60 p-1.5 rounded-lg border border-slate-800">
                            {cells.map((cell, cIdx) => (
                              <div key={cIdx} className="flex-1 font-mono text-slate-300">
                                {renderFormattedParts(cell.trim())}
                              </div>
                            ))}
                          </div>
                        );
                      }

                      // Regular paragraph line
                      return <p key={lIdx}>{renderFormattedParts(line)}</p>;
                    })}
                  </div>

                  <div className="mt-2.5 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{msg.time}</span>
                    {msg.sender === "bot" && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleSpeak(msg.text, index)}
                          className={`hover:text-sky-300 transition flex items-center gap-1 cursor-pointer ${
                            isSpeaking && speakingIndex === index ? "text-amber-400 animate-pulse font-bold" : ""
                          }`}
                          title="Read Aloud"
                        >
                          {isSpeaking && speakingIndex === index ? <VolumeX size={13} /> : <Volume2 size={13} />}
                          <span>{isSpeaking && speakingIndex === index ? "Stop" : "Listen"}</span>
                        </button>

                        <button
                          onClick={() => handleCopy(msg.text, index)}
                          className="hover:text-sky-300 transition flex items-center gap-1 cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedIndex === index ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          <span>{copiedIndex === index ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
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
                <span>CNAT Mam is preparing your response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK PROMPT CHIPS */}
          <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip.query)}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-sky-950 border border-slate-700 hover:border-sky-700 text-slate-300 hover:text-sky-200 text-[11px] font-medium whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer"
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
              placeholder={`Ask about ${topicTitle}, address, teachers, courses...`}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/60 transition"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-md shrink-0 cursor-pointer"
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

// Helper to render markdown bolding, inline code and links
function renderFormattedParts(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

  return parts.map((part, pIdx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={pIdx} className="font-bold text-amber-300">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={pIdx} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-sky-300 text-[11px]">
          {part.slice(1, -1)}
        </code>
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
}
