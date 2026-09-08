import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  Code2,
  Copy,
  Check,
  RotateCcw,
  Activity,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Award,
  Zap,
  Flame
} from "lucide-react";

import pyCode1 from "./topic21_files/01_viva_qa_suite1.py?raw";
import pyCode2 from "./topic21_files/02_viva_qa_suite2.py?raw";
import pyCode3 from "./topic21_files/03_interview_cheat_sheet.py?raw";
import noteText from "./topic21_files/topic21_note.txt?raw";
import questions from "./topic21_files/topic21_questions.js";

const vivaQuestions = [
  {
    id: 1,
    category: "API Architecture",
    question: "What is the meaning and purpose of a trailing underscore in Scikit-learn attribute names (e.g. model.coef_, scaler.mean_)?",
    answer: "Attributes ending with a single trailing underscore are estimated parameters learned from data during the .fit() method. Hyperparameters passed by the user during instantiation (__init__) never have trailing underscores.",
    keyTakeaway: "Trailing underscore = Mathematically estimated from training data!"
  },
  {
    id: 2,
    category: "Data Preprocessing",
    question: "Why should fit_transform() NEVER be executed on testing/validation data?",
    answer: "Calling fit_transform() on test data recalculates the mean, scale, and distributions from test samples, causing severe Data Leakage. Test data must only be transformed using scaler.transform(X_test) with previously learned training statistics.",
    keyTakeaway: "Fit on Train only; Transform on both Train and Test!"
  },
  {
    id: 3,
    category: "Encoding",
    question: "When should you use LabelEncoder vs OneHotEncoder vs OrdinalEncoder?",
    answer: "LabelEncoder is strictly for 1D target labels (y). OrdinalEncoder is for 2D feature columns with inherent ranking (e.g. Education levels). OneHotEncoder is for nominal 2D features without numerical order (e.g. Cities).",
    keyTakeaway: "Never use LabelEncoder on input feature matrix X!"
  },
  {
    id: 4,
    category: "Pipelines",
    question: "What major problems do Scikit-learn Pipelines solve?",
    answer: "Pipelines bundle preprocessing and estimators into a single composite object. Crucially, they prevent data leakage during Cross-Validation and GridSearchCV by ensuring preprocessors are re-fitted strictly on training folds.",
    keyTakeaway: "Pipelines automate leak-free workflows and clean production serialization."
  },
  {
    id: 5,
    category: "Algorithms",
    question: "Why is K-Nearest Neighbors (KNN) called a 'Lazy Learner'?",
    answer: "KNN performs no parameter learning during .fit(); it simply stores instances in memory. All Euclidean distance calculations and majority voting are deferred until .predict() is invoked.",
    keyTakeaway: "Zero training computation, but high query memory and prediction time."
  },
  {
    id: 6,
    category: "Metrics",
    question: "Can the R-squared (R²) regression score be negative?",
    answer: "Yes! R² = 1 - (SS_res / SS_tot). If the model's predictions are worse than a horizontal line predicting the constant mean of the target variable, SS_res exceeds SS_tot, resulting in a negative R².",
    keyTakeaway: "Negative R² means the model is worse than predicting the mean!"
  },
  {
    id: 7,
    category: "Evaluation",
    question: "How do you choose between Precision and Recall for an ML model?",
    answer: "Maximize Precision when False Positives are catastrophic (e.g. Spam filters). Maximize Recall when False Negatives are catastrophic (e.g. Cancer diagnosis, Fraud detection).",
    keyTakeaway: "Precision prevents false alarms; Recall prevents missed detections."
  },
  {
    id: 8,
    category: "Clustering",
    question: "What is Inertia in K-Means clustering and how is the Elbow point found?",
    answer: "Inertia is the Within-Cluster Sum of Squares (WCSS)—the sum of squared Euclidean distances of samples to their closest cluster center. The elbow point marks where adding more clusters yields diminishing returns.",
    keyTakeaway: "Lower inertia = tighter clusters; look for the elbow bend!"
  }
];

export default function Topic21() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Accordion open states
  const [openItems, setOpenItems] = useState({ 1: true });

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_viva_qa_suite1.py", code: pyCode1 },
    { name: "02_viva_qa_suite2.py", code: pyCode2 },
    { name: "03_interview_cheat_sheet.py", code: pyCode3 }
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

  const toggleItem = (id) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
            <Flame className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Topic 21 • Viva Voce &amp; Interview
              </span>
              <span className="text-xs text-slate-400 font-mono">Scikit-learn Master Review</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Top Technical Interview &amp; Viva Voce Questions
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Prepare for technical job interviews and viva exams. Review high-frequency conceptual questions
          spanning estimator design, data leakage, regularized linear models, metrics tradeoffs, and pipeline best practices.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-amber-400 text-amber-400 bg-amber-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Interview Q&amp;A Flashcards
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-amber-400 text-amber-400 bg-amber-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Code2 className="w-4 h-4" />
            Python Code Lab ({scripts.length})
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "notes"
                ? "border-amber-400 text-amber-400 bg-amber-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Revision Notes
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "quiz"
                ? "border-amber-400 text-amber-400 bg-amber-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE FLASHCARD SUITE */}
        {activeTab === "interactive" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs text-slate-400 font-mono">
                {vivaQuestions.length} Core Technical Interview Questions
              </span>
              <button
                onClick={() => {
                  const allOpen = {};
                  vivaQuestions.forEach((q) => (allOpen[q.id] = true));
                  setOpenItems(allOpen);
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                Expand All Answers
              </button>
            </div>

            <div className="space-y-3">
              {vivaQuestions.map((q) => {
                const isOpen = openItems[q.id];
                return (
                  <div
                    key={q.id}
                    className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleItem(q.id)}
                      className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-amber-400 uppercase font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {q.category} • Q{q.id}
                        </span>
                        <div className="text-sm font-semibold text-slate-200 pt-1">
                          {q.question}
                        </div>
                      </div>
                      <div className="p-1 rounded bg-slate-800 text-slate-400 shrink-0 mt-1">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-950/60 space-y-3 text-xs leading-relaxed animate-fadeIn">
                        <div className="text-slate-300">
                          <strong className="text-emerald-400 block mb-1">Model Answer:</strong>
                          {q.answer}
                        </div>
                        <div className="p-2.5 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-200 font-mono text-[11px]">
                          <strong>Key Takeaway:</strong> {q.keyTakeaway}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CODE LAB */}
        {activeTab === "code" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
              {scripts.map((script, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedScript(idx)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
                    selectedScript === idx
                      ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                      : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  {script.name}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">
                  {scripts[selectedScript].name}
                </span>
                <button
                  onClick={() => copyCode(scripts[selectedScript].code)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs md:text-sm font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-[500px]">
                {scripts[selectedScript].code}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: REVISION NOTES */}
        {activeTab === "notes" && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                Classroom Revision Notes: Short Questions &amp; Viva
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Notes</span>
              </button>
            </div>
            <pre className="text-xs md:text-sm font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
              {noteText}
            </pre>
          </div>
        )}

        {/* TAB 4: KNOWLEDGE CHECK */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-amber-400" />
                    Topic 21 Quiz: Viva &amp; Interview Review
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Verify your mastery of Scikit-learn interview topics, negative R², and metric priorities.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-amber-300 font-semibold">Your Score</div>
                    <div className="text-xl font-bold text-white">
                      {calculateScore()} / {questions.length}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {questions.map((q, idx) => {
                  const isSelected = selectedAnswers[q.id] !== undefined;
                  const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
                  return (
                    <div key={q.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                      <div className="text-sm font-semibold text-slate-200 mb-3 flex items-start gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono mt-0.5">
                          Q{idx + 1}
                        </span>
                        <span>{q.question}</span>
                      </div>

                      <div className="space-y-2 mb-3">
                        {q.options.map((opt, optIdx) => {
                          const checked = selectedAnswers[q.id] === optIdx;
                          let optStyle = "bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-900";
                          if (submittedQuiz) {
                            if (optIdx === q.correctAnswer) {
                              optStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200";
                            } else if (checked && !isCorrect) {
                              optStyle = "bg-rose-500/20 border-rose-500/50 text-rose-200";
                            }
                          } else if (checked) {
                            optStyle = "bg-amber-500/20 border-amber-500/50 text-amber-200";
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectAnswer(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm transition-all flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {submittedQuiz && optIdx === q.correctAnswer && (
                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {submittedQuiz && (
                        <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-slate-400">
                          <strong className="text-amber-300 block mb-1">Explanation:</strong>
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                {submittedQuiz ? (
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setSubmittedQuiz(false);
                    }}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Quiz
                  </button>
                ) : (
                  <button
                    onClick={() => setSubmittedQuiz(true)}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-amber-600/20"
                  >
                    Submit Answers
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
