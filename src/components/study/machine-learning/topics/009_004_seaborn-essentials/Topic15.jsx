import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  Code2,
  Copy,
  Check,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Eye,
  Layers,
  Award
} from "lucide-react";

import pyCode1 from "./topic15_files/01_viva_q1_kde_bandwidth.py?raw";
import pyCode2 from "./topic15_files/02_viva_q2_heatmap_annot.py?raw";
import pyCode3 from "./topic15_files/03_viva_q3_pairplot_usecase.py?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions.js";

const flashcards = [
  {
    id: 1,
    category: "Architecture",
    question: "What is Seaborn and how is it related to Matplotlib?",
    answer:
      "Seaborn is a high-level statistical data visualization library built directly on top of Matplotlib. It integrates tightly with Pandas DataFrames and provides declarative syntax with publication-ready defaults."
  },
  {
    id: 2,
    category: "Modern API",
    question: "Why was `sns.distplot()` deprecated in modern Seaborn?",
    answer:
      "sns.distplot() was deprecated in Seaborn 0.11 because it attempted to do too many unrelated tasks. It was replaced by specialized functions: sns.histplot(), sns.kdeplot(), and the figure-level sns.displot()."
  },
  {
    id: 3,
    category: "Visual Encodings",
    question: "How does the 'hue' parameter adapt to categorical vs numeric data types?",
    answer:
      "Categorical columns receive discrete qualitative color palettes with named legends and automatic bar dodging. Numeric/continuous columns receive smooth sequential color gradients (like viridis) with continuous scale bars."
  },
  {
    id: 4,
    category: "Architecture",
    question: "What is the difference between Axes-level and Figure-level functions?",
    answer:
      "Axes-level functions (sns.scatterplot, sns.boxplot) draw onto a provided Matplotlib `ax`. Figure-level functions (sns.relplot, sns.catplot, sns.pairplot) manage an entire multi-panel FacetGrid."
  },
  {
    id: 5,
    category: "Statistics",
    question: "What are the 5 components of a Seaborn Boxplot summary?",
    answer:
      "1. Lower Whisker (Q1 - 1.5*IQR), 2. Q1 (25th percentile), 3. Median (50th percentile), 4. Q3 (75th percentile), 5. Upper Whisker (Q3 + 1.5*IQR). Points beyond whiskers are individual outlier fliers."
  },
  {
    id: 6,
    category: "Statistics",
    question: "Why must correlation heatmaps use diverging colormaps with `center=0`?",
    answer:
      "Pearson correlation r spans from -1.0 to +1.0. Centering at 0 ensures neutral values (no linear relation) display as a neutral midpoint (white/light), negative as cold (blue), and positive as hot (red)."
  },
  {
    id: 7,
    category: "Plot Customization",
    question: "How do you mask the redundant upper-triangular half of a heatmap?",
    answer:
      "Create a boolean mask with `mask = np.triu(np.ones_like(corr, dtype=bool))` and pass `mask=mask` into `sns.heatmap()`."
  },
  {
    id: 8,
    category: "Categorical",
    question: "What does `split=True` do in `sns.violinplot()`?",
    answer:
      "When conditioned on a 2-class binary hue (e.g. sex='Male'/'Female'), it draws one class on the left half and the other on the right half of the exact same violin body."
  },
  {
    id: 9,
    category: "Statistics",
    question: "How do you control the smoothness of a KDE density curve?",
    answer:
      "Using the `bw_adjust` parameter in `sns.kdeplot()` or `kde_kws`. Values < 1.0 make the curve sensitive to local micro-modes, while values > 1.0 make it smoother."
  },
  {
    id: 10,
    category: "Aesthetics",
    question: "What function removes redundant top and right axis spines?",
    answer:
      "`sns.despine()` strips away unnecessary top and right axis borders, producing clean, modern scientific figures."
  }
];

export default function Topic15() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Flashcards state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCat, setSelectedCat] = useState("All");
  const [mastered, setMastered] = useState({});

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_viva_q1_kde_bandwidth.py", code: pyCode1 },
    { name: "02_viva_q2_heatmap_annot.py", code: pyCode2 },
    { name: "03_viva_q3_pairplot_usecase.py", code: pyCode3 }
  ];

  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const filteredCards =
    selectedCat === "All"
      ? flashcards
      : flashcards.filter((c) => c.category === selectedCat);

  const currentCard = filteredCards[currentIdx] || filteredCards[0];

  const toggleMastered = (id) => {
    setMastered((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-indigo-950 border border-teal-800/40 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs uppercase tracking-widest mb-2">
                <HelpCircle className="w-4 h-4" />
                <span>Machine Learning Module • Topic 15</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Short Questions &amp; Viva Voce Review
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Master the Top 10 Data Science &amp; Machine Learning interview viva questions on Seaborn. Review architectural concepts, statistical math, and diagnostic insights.
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono">
              Coder &amp; AccoTax • Barrackpore
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800/80">
            {[
              { id: "interactive", label: "Interactive Viva Flashcards", icon: Sparkles },
              { id: "code", label: "Python Code Lab", icon: Code2 },
              { id: "notes", label: "Revision Notes", icon: BookOpen },
              { id: "quiz", label: "Knowledge Check", icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-600/30"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Interactive Flashcards */}
        {activeTab === "interactive" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Category Filter & Deck Navigation */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm border-b border-slate-800 pb-3">
                <BookOpen className="w-4 h-4" />
                <span>Filter by Topic Category</span>
              </div>

              {/* Categories */}
              <div className="space-y-1.5">
                {["All", "Architecture", "Modern API", "Visual Encodings", "Statistics", "Categorical"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCat(cat);
                      setCurrentIdx(0);
                      setIsFlipped(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-medium text-left flex items-center justify-between transition-all ${
                      selectedCat === cat
                        ? "bg-teal-600 text-white shadow"
                        : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-300">
                      {cat === "All"
                        ? flashcards.length
                        : flashcards.filter((c) => c.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Progress Mastery Bar */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Flashcards Mastered:</span>
                  <span className="font-mono text-teal-400">
                    {Object.values(mastered).filter(Boolean).length} / {flashcards.length}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-full transition-all duration-300"
                    style={{
                      width: `${(Object.values(mastered).filter(Boolean).length / flashcards.length) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Main Interactive Flashcard Body */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-mono text-teal-400 font-semibold uppercase tracking-wider">
                  Card {currentIdx + 1} of {filteredCards.length} • {currentCard.category}
                </span>
                <button
                  onClick={() => toggleMastered(currentCard.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    mastered[currentCard.id]
                      ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {mastered[currentCard.id] ? "Mastered" : "Mark Mastered"}
                </button>
              </div>

              {/* Flip Card Canvas */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-[220px] p-6 md:p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-center items-center text-center cursor-pointer hover:border-teal-500/50 transition-all duration-300 relative group"
              >
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                  {isFlipped ? "💡 Model Answer (Click to see Question)" : "❓ Viva Voce Question (Click to Reveal Answer)"}
                </div>

                {!isFlipped ? (
                  <h3 className="text-lg md:text-xl font-bold text-white max-w-lg leading-relaxed">
                    {currentCard.question}
                  </h3>
                ) : (
                  <p className="text-sm md:text-base text-teal-200 max-w-lg leading-relaxed font-sans">
                    {currentCard.answer}
                  </p>
                )}

                <div className="mt-4 text-[11px] text-slate-500 font-mono group-hover:text-teal-400 transition-colors">
                  [ Click card to flip ]
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <button
                  onClick={() => {
                    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
                    setIsFlipped(false);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-4 py-2 rounded-xl bg-teal-600/20 text-teal-300 border border-teal-500/30 text-xs font-semibold hover:bg-teal-600/30 transition-all"
                >
                  {isFlipped ? "Show Question" : "Reveal Answer"}
                </button>

                <button
                  onClick={() => {
                    setCurrentIdx((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
                    setIsFlipped(false);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Python Code Lab */}
        {activeTab === "code" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex flex-wrap gap-2">
                {scripts.map((sc, idx) => (
                  <button
                    key={sc.name}
                    onClick={() => setSelectedScript(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedScript === idx
                        ? "bg-teal-600 text-white shadow"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    {sc.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => copyCode(scripts[selectedScript].code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Script"}
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <pre className="p-4 text-xs font-mono text-teal-300 overflow-x-auto leading-relaxed max-h-[480px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Revision Notes */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Topic 15 Summary &amp; Theoretical Notes</span>
              </div>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied Notes!" : "Copy Notes"}
              </button>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[520px] overflow-y-auto">
              {noteText}
            </div>
          </div>
        )}

        {/* Tab 4: Knowledge Check */}
        {activeTab === "quiz" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm">
                <HelpCircle className="w-4 h-4" />
                <span>Topic 15 Knowledge Assessment (4 Questions)</span>
              </div>
              {submittedQuiz && (
                <div className="px-3.5 py-1 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
                  Score: {calculateScore()} / {questions.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="font-medium text-sm text-slate-200">
                      {idx + 1}. {q.question}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
                        if (submittedQuiz) {
                          if (optIdx === q.correctAnswer) {
                            btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-300";
                          } else if (isSelected) {
                            btnStyle = "bg-rose-950/70 border-rose-500 text-rose-300";
                          }
                        } else if (isSelected) {
                          btnStyle = "bg-teal-600/30 border-teal-500 text-teal-200";
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`p-3 rounded-lg border text-left text-xs transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div
                        className={`p-3 rounded-lg text-xs leading-relaxed ${
                          isCorrect
                            ? "bg-emerald-950/40 text-emerald-300 border border-emerald-900/50"
                            : "bg-rose-950/40 text-rose-300 border border-rose-900/50"
                        }`}
                      >
                        <span className="font-semibold">{isCorrect ? "✓ Correct: " : "✗ Incorrect: "}</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setSubmittedQuiz(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Reset
              </button>
              <button
                onClick={() => setSubmittedQuiz(true)}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-teal-600/30 transition-all"
              >
                Submit Answers
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
