import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Volume2,
  ExternalLink,
  BookOpen,
  Copy,
  Check,
  Globe,
  HelpCircle,
  RotateCcw,
  BookA,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";

/**
 * WordDictionary Component
 * Allows students to lookup definitions, phonetics, audio pronunciations,
 * synonyms, and check dedicated Computer/Tech dictionaries (Computer Hope, TechTerms, MDN, GeeksforGeeks, DevDocs, Webopedia)
 * as well as standard English dictionaries (Cambridge, Merriam-Webster, Oxford, Google, Wikipedia).
 */
export default function WordDictionary({
  initialWord = "",
  className = "",
  onSelectWord,
  compact = false,
  showTitle = true,
}) {
  const [searchTerm, setSearchTerm] = useState(initialWord);
  const [queryWord, setQueryWord] = useState(initialWord || "catastrophic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'computer' | 'english'
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("study-dictionary-history");
      return saved
        ? JSON.parse(saved)
        : ["catastrophic", "immutable", "idempotent", "polymorphism", "asynchronous", "algorithm"];
    } catch {
      return ["catastrophic", "immutable", "idempotent", "polymorphism", "asynchronous", "algorithm"];
    }
  });

  const audioRef = useRef(null);

  // Sync if initialWord changes from parent
  useEffect(() => {
    if (initialWord && initialWord.trim() !== "") {
      setSearchTerm(initialWord.trim());
      setQueryWord(initialWord.trim());
    }
  }, [initialWord]);

  // Fetch word definitions from Free Dictionary API
  useEffect(() => {
    if (!queryWord || !queryWord.trim()) return;

    let isMounted = true;
    const cleanWord = queryWord.trim().toLowerCase().replace(/[^a-zA-Z0-9-]/g, "");
    if (!cleanWord) return;

    setLoading(true);
    setError(null);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? `No general English definition found for "${cleanWord}". You can explore the Computer Science & Tech dictionaries below.`
              : "Unable to reach dictionary service. Please check your network connection."
          );
        }
        return res.json();
      })
      .then((json) => {
        if (!isMounted) return;
        if (Array.isArray(json) && json.length > 0) {
          setData(json[0]);
          setError(null);
          // Save to history
          setHistory((prev) => {
            const next = [cleanWord, ...prev.filter((w) => w.toLowerCase() !== cleanWord)].slice(0, 10);
            try {
              localStorage.setItem("study-dictionary-history", JSON.stringify(next));
            } catch {
              // ignore
            }
            return next;
          });
        } else {
          setData(null);
          setError(`No definitions found for "${cleanWord}".`);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setData(null);
        setError(err.message || "Failed to load word definition.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [queryWord]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault?.();
    if (searchTerm.trim()) {
      setQueryWord(searchTerm.trim());
    }
  };

  const handlePronounce = () => {
    // 1. Try finding audio file from API
    const audioUrl = data?.phonetics?.find((p) => p.audio && p.audio.trim().length > 0)?.audio;
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setIsPlayingAudio(true);
      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => {
        setIsPlayingAudio(false);
        playSpeechSynthesis(queryWord);
      };
      audio.play().catch(() => playSpeechSynthesis(queryWord));
    } else {
      // 2. Fallback to Web Speech API
      playSpeechSynthesis(queryWord);
    }
  };

  const playSpeechSynthesis = (wordToSpeak) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsPlayingAudio(true);
      const utterance = new SpeechSynthesisUtterance(wordToSpeak);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = () => {
    if (!data) return;
    const textToCopy = `Word: ${data.word}\nPhonetic: ${data.phonetic || ""}\nDefinition: ${
      data.meanings?.[0]?.definitions?.[0]?.definition || ""
    }\nExample: ${data.meanings?.[0]?.definitions?.[0]?.example || ""}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentWordEncoded = encodeURIComponent(queryWord || searchTerm || "catastrophic");

  // Computer & Tech Dictionaries
  const computerDictionaries = [
    {
      name: "Computer Hope Dictionary",
      url: `https://www.computerhope.com/cgi-bin/search.cgi?q=${currentWordEncoded}`,
      color: "from-cyan-950/60 to-blue-950/60 border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:text-white",
      badge: "Computer Hope",
      category: "Computer Dictionary",
      icon: "💻",
      desc: "Top computer & jargon glossary",
    },
    {
      name: "TechTerms Computer Dictionary",
      url: `https://techterms.com/search?q=${currentWordEncoded}`,
      color: "from-emerald-950/60 to-teal-950/60 border-emerald-500/40 text-emerald-300 hover:border-emerald-400 hover:text-white",
      badge: "TechTerms",
      category: "Tech Dictionary",
      icon: "⚡",
      desc: "Definitive IT & CS definitions",
    },
    {
      name: "MDN Web Docs",
      url: `https://developer.mozilla.org/en-US/search?q=${currentWordEncoded}`,
      color: "from-violet-950/60 to-purple-950/60 border-violet-500/40 text-violet-300 hover:border-violet-400 hover:text-white",
      badge: "MDN Web Docs",
      category: "Developer Docs",
      icon: "🦖",
      desc: "Web APIs, JS, CSS specifications",
    },
    {
      name: "GeeksforGeeks CS Reference",
      url: `https://www.geeksforgeeks.org/search/?q=${currentWordEncoded}`,
      color: "from-green-950/60 to-emerald-950/60 border-green-500/40 text-green-300 hover:border-green-400 hover:text-white",
      badge: "GeeksforGeeks",
      category: "CS & Coding Portal",
      icon: "🌿",
      desc: "Algorithms, Data structures & CS",
    },
    {
      name: "DevDocs API & Tech Reference",
      url: `https://devdocs.io/#q=${currentWordEncoded}`,
      color: "from-sky-950/60 to-indigo-950/60 border-sky-500/40 text-sky-300 hover:border-sky-400 hover:text-white",
      badge: "DevDocs",
      category: "Dev Reference",
      icon: "🚀",
      desc: "Fast documentation & API lookup",
    },
    {
      name: "Webopedia Tech Encyclopedia",
      url: `https://www.webopedia.com/?s=${currentWordEncoded}`,
      color: "from-amber-950/60 to-orange-950/60 border-amber-500/40 text-amber-300 hover:border-amber-400 hover:text-white",
      badge: "Webopedia",
      category: "Tech Encyclopedia",
      icon: "🌐",
      desc: "Computer terminology encyclopedia",
    },
  ];

  // Standard English Dictionaries
  const generalDictionaries = [
    {
      name: "Cambridge Dictionary",
      url: `https://dictionary.cambridge.org/dictionary/english/${currentWordEncoded}`,
      color: "from-blue-600/20 to-sky-600/20 border-blue-500/30 text-blue-300 hover:border-blue-400 hover:text-white",
      badge: "Cambridge",
      category: "English Dictionary",
      icon: "🏛️",
      desc: "British & International English",
    },
    {
      name: "Merriam-Webster",
      url: `https://www.merriam-webster.com/dictionary/${currentWordEncoded}`,
      color: "from-emerald-600/20 to-teal-600/20 border-emerald-500/30 text-emerald-300 hover:border-emerald-400 hover:text-white",
      badge: "Merriam-Webster",
      category: "English Dictionary",
      icon: "📚",
      desc: "American English & Thesaurus",
    },
    {
      name: "Google Definition Search",
      url: `https://www.google.com/search?q=define+${currentWordEncoded}`,
      color: "from-amber-600/20 to-orange-600/20 border-amber-500/30 text-amber-300 hover:border-amber-400 hover:text-white",
      badge: "Google Define",
      category: "Instant Search",
      icon: "🔍",
      desc: "Google dictionary snippet",
    },
    {
      name: "Oxford Learner's",
      url: `https://www.oxfordlearnersdictionaries.com/definition/english/${currentWordEncoded}`,
      color: "from-indigo-600/20 to-purple-600/20 border-indigo-500/30 text-indigo-300 hover:border-indigo-400 hover:text-white",
      badge: "Oxford",
      category: "Learner's Dictionary",
      icon: "🎓",
      desc: "Definitions & Academic vocabulary",
    },
    {
      name: "Wikipedia Reference",
      url: `https://en.wikipedia.org/wiki/${currentWordEncoded}`,
      color: "from-slate-600/20 to-slate-700/20 border-slate-600/40 text-slate-300 hover:border-slate-400 hover:text-white",
      badge: "Wikipedia",
      category: "Encyclopedia",
      icon: "🌐",
      desc: "In-depth encyclopedia article",
    },
  ];

  return (
    <div className={`flex flex-col space-y-4 text-slate-100 font-sans ${className}`}>
      {/* Optional Header */}
      {showTitle && (
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <BookA size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Vocabulary &amp; Computer Dictionary Lookup
              </h3>
              <p className="text-xs text-slate-400">Definitions, phonetics, computer science &amp; English reference portals</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type any word or tech term (e.g. catastrophic, immutable, polymorphism, daemon)..."
            className="w-full pl-10 pr-24 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1 shadow-sm cursor-pointer"
          >
            <span>Lookup</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </form>

      {/* Quick History Tags */}
      {history.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 custom-scrollbar text-xs">
          <span className="text-slate-500 shrink-0 flex items-center gap-1 text-[11px]">
            <RotateCcw size={11} /> Recent:
          </span>
          {history.map((word) => (
            <button
              key={word}
              onClick={() => {
                setSearchTerm(word);
                setQueryWord(word);
              }}
              className={`px-2 py-0.5 rounded-md border text-[11px] font-mono transition shrink-0 ${
                queryWord.toLowerCase() === word.toLowerCase()
                  ? "bg-sky-500/20 border-sky-500/40 text-sky-300 font-semibold"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      )}

      {/* Section 1: Computer & Tech Dictionaries */}
      <div className="space-y-2 rounded-2xl bg-slate-900/70 border border-slate-800/90 p-3.5 sm:p-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
            <Cpu size={15} className="text-cyan-400" />
            <span>Computer Science &amp; Tech Dictionaries for &ldquo;{queryWord}&rdquo;</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Tech &amp; IT Jargon</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {computerDictionaries.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r border text-xs font-medium transition-all group shadow-sm ${link.color}`}
              title={`Open "${queryWord}" in ${link.name} - ${link.desc}`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-sm shrink-0">{link.icon}</span>
                <div className="truncate text-left">
                  <p className="truncate font-semibold">{link.badge}</p>
                  <p className="text-[10px] opacity-70 truncate">{link.category}</p>
                </div>
              </div>
              <ExternalLink size={12} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
            </a>
          ))}
        </div>
      </div>

      {/* Section 2: Standard English Dictionaries */}
      <div className="space-y-2 rounded-2xl bg-slate-900/50 border border-slate-800/80 p-3.5 sm:p-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
            <Globe size={15} className="text-sky-400" />
            <span>English Dictionaries &amp; Pronunciation for &ldquo;{queryWord}&rdquo;</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">English Language</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {generalDictionaries.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r border text-xs font-medium transition-all group shadow-sm ${link.color}`}
              title={`Open "${queryWord}" in ${link.name}`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-sm shrink-0">{link.icon}</span>
                <div className="truncate text-left">
                  <p className="truncate font-semibold">{link.badge}</p>
                  <p className="text-[10px] opacity-70 truncate">{link.category}</p>
                </div>
              </div>
              <ExternalLink size={12} className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
            </a>
          ))}
        </div>
      </div>

      {/* Definition Content Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 space-y-4">
        {loading ? (
          <div className="py-10 text-center text-slate-400 text-sm space-y-2">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-sky-400 mx-auto" />
            <p>Fetching dictionary definitions for &quot;{queryWord}&quot;...</p>
          </div>
        ) : error ? (
          <div className="py-6 text-center space-y-3">
            <HelpCircle size={32} className="text-amber-400/80 mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-200">{error}</p>
              <p className="text-xs text-slate-400">
                Click any of the Computer Dictionary or English Dictionary buttons above to inspect the full entry.
              </p>
            </div>
          </div>
        ) : data ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Word title, phonetics and audio */}
            <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{data.word}</h4>
                  {data.phonetic && (
                    <span className="text-xs sm:text-sm font-mono text-sky-400 px-2 py-0.5 rounded-md bg-sky-950/60 border border-sky-800/50">
                      {data.phonetic}
                    </span>
                  )}
                </div>
                {data.origin && <p className="text-xs text-slate-400 mt-1 italic">Origin: {data.origin}</p>}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePronounce}
                  className={`p-2 rounded-xl border transition flex items-center gap-1 text-xs font-medium cursor-pointer ${
                    isPlayingAudio
                      ? "bg-sky-500 border-sky-400 text-white animate-pulse"
                      : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-sky-300 hover:text-white"
                  }`}
                  title="Listen to audio pronunciation"
                >
                  <Volume2 size={16} />
                  <span className="hidden sm:inline">Listen</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition text-xs"
                  title="Copy definition"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Meanings grouped by Part of Speech */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
              {data.meanings?.map((m, idx) => (
                <div key={idx} className="space-y-2 rounded-xl bg-slate-950/60 border border-slate-800/80 p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {m.partOfSpeech}
                    </span>
                  </div>

                  {/* Definitions List */}
                  <div className="space-y-2.5 mt-2">
                    {m.definitions?.slice(0, 3).map((def, dIdx) => (
                      <div key={dIdx} className="text-xs sm:text-sm text-slate-200 pl-3 border-l-2 border-sky-500/50 space-y-1">
                        <p className="font-medium text-slate-100">
                          <span className="text-sky-400 font-bold mr-1.5">{dIdx + 1}.</span>
                          {def.definition}
                        </p>
                        {def.example && (
                          <p className="text-xs text-slate-400 italic bg-slate-900/80 p-2 rounded-lg border border-slate-800/60">
                            &ldquo;{def.example}&rdquo;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Synonyms */}
                  {m.synonyms && m.synonyms.length > 0 && (
                    <div className="pt-2 flex flex-wrap items-center gap-1 text-xs">
                      <span className="text-slate-400 text-[11px] font-semibold">Synonyms:</span>
                      {m.synonyms.slice(0, 5).map((syn) => (
                        <button
                          key={syn}
                          onClick={() => {
                            setSearchTerm(syn);
                            setQueryWord(syn);
                          }}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white text-[11px] transition"
                        >
                          {syn}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
