import React, { useState, useEffect, useRef } from "react";
import { BookA, ExternalLink, Volume2, Search, X, Cpu } from "lucide-react";

/**
 * SelectionWordLookup Component
 * Automatically detects user text selection and provides a sleek floating bubble
 * to define the word or check Computer Dictionaries (Computer Hope, TechTerms, MDN, GeeksforGeeks)
 * and English dictionaries (Cambridge, Merriam-Webster, Google Search).
 */
export default function SelectionWordLookup({ onOpenDictionaryModal }) {
  const [selectionInfo, setSelectionInfo] = useState(null); // { word, x, y }
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseUp = () => {
      // Small timeout to allow browser selection to finish settling
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          // If click was inside our floating popup, don't dismiss immediately
          return;
        }

        const rawText = selection.toString().trim();
        // Check if selection is a word or short term (1-4 words, up to 40 chars)
        if (!rawText || rawText.length > 40 || rawText.includes("\n")) {
          return;
        }

        // Clean up word
        const cleanWord = rawText.replace(/^[^\w]+|[^\w]+$/g, "");
        if (!cleanWord || cleanWord.length < 2) {
          return;
        }

        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          // Calculate position above or below selection
          const x = Math.max(10, Math.min(window.innerWidth - 380, rect.left + rect.width / 2 - 160));
          const y = rect.top > 80 ? rect.top - 48 + window.scrollY : rect.bottom + 12 + window.scrollY;

          setSelectionInfo({
            word: cleanWord,
            x,
            y,
            rectTop: rect.top,
          });
        } catch {
          // Range error fallback
        }
      }, 50);
    };

    const handleMouseDown = (e) => {
      // Dismiss if clicking outside floating bubble
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSelectionInfo(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectionInfo(null);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!selectionInfo) return null;

  const currentWord = selectionInfo.word;
  const encoded = encodeURIComponent(currentWord);

  const handleSpeak = (e) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord);
      utterance.rate = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleOpenFull = (e) => {
    e.stopPropagation();
    if (onOpenDictionaryModal) {
      onOpenDictionaryModal(currentWord);
    }
    setSelectionInfo(null);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        left: `${selectionInfo.x}px`,
        top: `${selectionInfo.y}px`,
        zIndex: 9999,
      }}
      className="animate-in fade-in zoom-in-95 duration-150 shadow-2xl rounded-xl bg-slate-900/95 border border-cyan-500/40 backdrop-blur-md p-1.5 flex items-center gap-1.5 text-xs text-slate-200 select-none ring-1 ring-black/40 flex-wrap sm:flex-nowrap"
    >
      {/* Define in Modal button */}
      <button
        onClick={handleOpenFull}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow transition cursor-pointer shrink-0"
        title={`Lookup definition of "${currentWord}"`}
      >
        <BookA size={13} />
        <span>Define &ldquo;{currentWord.length > 12 ? currentWord.slice(0, 12) + '…' : currentWord}&rdquo;</span>
      </button>

      {/* Pronounce quick button */}
      <button
        onClick={handleSpeak}
        className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-white transition shrink-0"
        title={`Listen to pronunciation of "${currentWord}"`}
      >
        <Volume2 size={13} />
      </button>

      <div className="h-4 w-px bg-slate-800 hidden sm:block shrink-0" />

      {/* Computer Hope (Computer Dictionary) */}
      <a
        href={`https://www.computerhope.com/cgi-bin/search.cgi?q=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-cyan-950 text-cyan-300 hover:text-cyan-100 font-medium transition flex items-center gap-1 shrink-0 border border-cyan-500/20"
        title="Open in Computer Hope (Computer Dictionary)"
        onClick={() => setSelectionInfo(null)}
      >
        <Cpu size={11} className="text-cyan-400" />
        <span>CompHope</span>
        <ExternalLink size={9} className="opacity-60" />
      </a>

      {/* Cambridge Dictionary */}
      <a
        href={`https://dictionary.cambridge.org/dictionary/english/${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-blue-900/60 text-blue-300 hover:text-blue-100 font-medium transition flex items-center gap-1 shrink-0"
        title="Open in Cambridge Dictionary"
        onClick={() => setSelectionInfo(null)}
      >
        <span>Cambridge</span>
        <ExternalLink size={9} className="opacity-60" />
      </a>

      {/* Merriam-Webster */}
      <a
        href={`https://www.merriam-webster.com/dictionary/${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-emerald-900/60 text-emerald-300 hover:text-emerald-100 font-medium transition flex items-center gap-1 shrink-0"
        title="Open in Merriam-Webster"
        onClick={() => setSelectionInfo(null)}
      >
        <span>M-W</span>
        <ExternalLink size={9} className="opacity-60" />
      </a>

      {/* Google Definition Search */}
      <a
        href={`https://www.google.com/search?q=define+${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1 rounded-lg bg-slate-800 hover:bg-amber-900/60 text-amber-300 hover:text-amber-100 transition shrink-0"
        title="Google Definition Search"
        onClick={() => setSelectionInfo(null)}
      >
        <Search size={12} />
      </a>

      {/* Close button */}
      <button
        onClick={() => setSelectionInfo(null)}
        className="p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition ml-0.5 shrink-0"
        title="Dismiss"
      >
        <X size={12} />
      </button>
    </div>
  );
}
