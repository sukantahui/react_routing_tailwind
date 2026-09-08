import React, { useState } from "react";
import {
  HelpCircle,
  Terminal,
  FileText,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Eye,
  Layers,
  Code,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Lightbulb
} from "lucide-react";
import pyCode1 from "./topic16_files/01_interview_qa_architecture_and_lifecycle.py?raw";
import pyCode2 from "./topic16_files/02_interview_qa_plot_types_and_parameters.py?raw";
import pyCode3 from "./topic16_files/03_interview_qa_troubleshooting_and_gotchas.py?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions.js";

export default function Topic16() {
  const [activeTab, setActiveTab] = useState("studio");
  const [activeScript, setActiveScript] = useState(1);
  const [copied, setCopied] = useState(false);

  // Flashcards state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedCards, setExpandedCards] = useState({});

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const scripts = {
    1: { name: "01_interview_qa_architecture_and_lifecycle.py", code: pyCode1, desc: "Architecture, Figure vs Axes, stateful vs OO, and memory leaks Q&A" },
    2: { name: "02_interview_qa_plot_types_and_parameters.py", code: pyCode2, desc: "Plot type selection matrix (barh, hexbin, symlog, density) Q&A" },
    3: { name: "03_interview_qa_troubleshooting_and_gotchas.py", code: pyCode3, desc: "Debugging headless backend crashes, clipped legends, and aspect ratios Q&A" }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionSelect = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const flashcards = [
    {
      id: 1,
      cat: "arch",
      q: "What is the difference between a Figure and an Axes in Matplotlib?",
      ans: "Figure is the top-level container/window holding all subplots, colorbars, and super-titles. An Axes is the actual plotting coordinate bounding box containing lines, bars, ticks, and legends.",
      code: "fig, ax = plt.subplots(figsize=(8, 4)) # fig = container, ax = plot region",
      tip: "Remember: One Figure can hold multiple Axes, but each Axes belongs to only one Figure."
    },
    {
      id: 2,
      cat: "arch",
      q: "Why does omitting plt.close() cause memory leaks in production servers?",
      ans: "Matplotlib retains all active Figure objects in an internal global GUI list. If not explicitly closed with plt.close(fig), memory grows continuously with each request until server RAM is exhausted.",
      code: "fig.savefig(buffer, format='png')\nplt.close(fig) # Releases memory buffer immediately",
      tip: "Always close figures in API handlers or batch training loops."
    },
    {
      id: 3,
      cat: "plots",
      q: "When should you prefer plt.barh() over plt.bar()?",
      ans: "When category names are long (such as Tree Model Feature Importances). Horizontal bars allow labels to be read easily from left-to-right without requiring ugly 90-degree text rotation.",
      code: "bars = ax.barh(feature_names, importances)\nax.bar_label(bars, fmt='%.2f', padding=4)",
      tip: "Sort values before calling barh() to create a clean, ascending visual hierarchy."
    },
    {
      id: 4,
      cat: "plots",
      q: "What is overplotting, and how do alpha and hexbin solve it?",
      ans: "Overplotting occurs when thousands of scatter points overlap into an unreadable solid block. Lowering alpha (e.g. alpha=0.15) shows point density, while ax.hexbin() aggregates points into 2D hexagonal frequency bins.",
      code: "ax.hexbin(x, y, gridsize=30, cmap='inferno')\nfig.colorbar(..., label='Density')",
      tip: "Use hexbin when dataset size N > 20,000 continuous points."
    },
    {
      id: 5,
      cat: "trouble",
      q: "How do you fix '_tkinter.TclError: no display name' in headless Docker containers?",
      ans: "Set the non-interactive 'Agg' backend BEFORE importing matplotlib.pyplot so Matplotlib renders raster images directly into memory without expecting an X11 GUI display server.",
      code: "import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt",
      tip: "Must be placed at the very top of your Python script before any pyplot imports."
    },
    {
      id: 6,
      cat: "trouble",
      q: "Why is bbox_inches='tight' critical when calling plt.savefig()?",
      ans: "By default, savefig uses nominal figure dimensions, clipping outside legends (bbox_to_anchor) and long titles. bbox_inches='tight' recalculates the full outer bounding envelope to prevent clipping.",
      code: "fig.savefig('model_report.png', dpi=300, bbox_inches='tight')",
      tip: "Never omit bbox_inches='tight' when exporting publication figures."
    }
  ];

  const filteredCards = flashcards.filter((card) => {
    const matchesCat = selectedCategory === "all" || card.cat === selectedCategory;
    const matchesSearch =
      card.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.ans.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-700/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-4 h-4" /> Machine Learning Visual Foundations • Segment 009 Module 003
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Topic 16: Short Questions &amp; Viva Preparation
            </h1>
            <p className="text-slate-300 mt-2 text-base max-w-3xl">
              Comprehensive conceptual review and interview preparation. Master essential viva questions on Matplotlib's 3-layer architecture, memory lifecycle management, plot geometry decisions, and mission-critical production troubleshooting.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Viva / Interview Prep
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> High-Yield Concepts
            </span>
          </div>
        </div>

        {/* Mentor Narrative */}
        <div className="mt-6 bg-slate-900/70 border border-slate-700/50 rounded-xl p-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white shrink-0 shadow-md">
            SH
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-300">Sukanta Hui (Coder &amp; AccoTax, Barrackpore):</span>
            <p className="text-slate-300 mt-1">
              "Congratulations students on completing all 17 topics of Matplotlib Essentials! These interview flashcards summarize the key conceptual distinctions (Stateful vs OO, Agg backends, memory management, and bbox tight crops) that top machine learning engineering interviewers look for."
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex border-b border-slate-800 space-x-2">
          {[
            { id: "studio", label: "Interactive Viva Flashcards Studio", icon: HelpCircle },
            { id: "lab", label: "Python Code Lab (3 Q&A Scripts)", icon: Terminal },
            { id: "notes", label: "Revision Notes", icon: FileText },
            { id: "quiz", label: "MCQ Assessment", icon: CheckCircle2 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px rounded-t-lg ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400 bg-blue-950/30"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="max-w-7xl mx-auto">
        {/* TAB 1: STUDIO */}
        {activeTab === "studio" && (
          <div className="space-y-6">
            {/* Search & Category Filter */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search interview questions by keyword (e.g., 'memory', 'backend', 'aspect', 'legend')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-500"
                  />
                </div>

                <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1 overflow-x-auto">
                  {[
                    { id: "all", label: "All Topics" },
                    { id: "arch", label: "Architecture & Memory" },
                    { id: "plots", label: "Plot Selection" },
                    { id: "trouble", label: "Troubleshooting" }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                        selectedCategory === c.id
                          ? "bg-blue-600 text-white shadow"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Flashcards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCards.map((card) => {
                const isExpanded = expandedCards[card.id] !== false; // default expanded
                return (
                  <div
                    key={card.id}
                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase">
                          {card.cat === "arch" ? "Architecture" : card.cat === "plots" ? "Plot Types" : "Troubleshooting"}
                        </span>
                        <button
                          onClick={() => toggleCard(card.id)}
                          className="text-slate-400 hover:text-slate-200 p-1 rounded"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                        {card.q}
                      </h3>

                      {isExpanded && (
                        <div className="space-y-3 mt-3 pt-3 border-t border-slate-800">
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {card.ans}
                          </p>

                          <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-blue-300 whitespace-pre-wrap">
                            {card.code}
                          </div>

                          <div className="flex items-start gap-2 text-[11px] text-amber-300/90 bg-amber-950/20 p-2 rounded border border-amber-500/20">
                            <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span><strong>Sukanta Hui Tip:</strong> {card.tip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: PYTHON CODE LAB */}
        {activeTab === "lab" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Terminal className="text-blue-400 w-5 h-5" />
                  Python Multi-Script Visualization Laboratory
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Explore full runnable Python scripts detailing architecture, plot selection, and debugging gotchas.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setActiveScript(num)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeScript === num
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    Script 0{num}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono text-blue-400">{scripts[activeScript].name}</span>
                <p className="text-xs text-slate-300 mt-0.5">{scripts[activeScript].desc}</p>
              </div>
              <button
                onClick={() => copyCode(scripts[activeScript].code)}
                className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Script"}
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <pre className="p-5 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-[500px]">
                {scripts[activeScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: REVISION NOTES */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="text-blue-400 w-5 h-5" />
                Matplotlib Essentials Module Technical Synthesis
              </h2>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied Notes!" : "Copy Notes"}
              </button>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {noteText}
            </div>
          </div>
        )}

        {/* TAB 4: QUIZ */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="text-blue-400 w-5 h-5" />
                  Final Module Comprehensive Assessment
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Validate your mastery of memory management, headless backends, and aspect ratio normalization.
                </p>
              </div>

              {showResults && (
                <div className="px-4 py-2 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-300 text-sm font-bold">
                  Score: {calculateScore()} / {questions.length} ({Math.round((calculateScore() / questions.length) * 100)}%)
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, qIndex) => (
                <div key={q.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h3 className="text-sm font-semibold text-white mb-3">
                    {qIndex + 1}. {q.question}
                  </h3>
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedAnswers[q.id] === optIndex;
                      const isCorrect = q.correctAnswer === optIndex;
                      let btnStyle = "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700";

                      if (showResults) {
                        if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold";
                        else if (isSelected && !isCorrect) btnStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
                      } else if (isSelected) {
                        btnStyle = "border-blue-500 bg-blue-950/50 text-blue-200 ring-1 ring-blue-500";
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => !showResults && handleOptionSelect(q.id, optIndex)}
                          className={`w-full text-left p-3 rounded-lg text-xs border transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {showResults && (
                    <div className="mt-3 p-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-400">
                      <strong className="text-blue-300">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setShowResults(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
              >
                Reset
              </button>
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg shadow-blue-600/30"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
