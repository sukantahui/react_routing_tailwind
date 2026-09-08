import React, { useState } from "react";
import {
  Binary,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  RotateCcw,
  Layers,
  ArrowRight,
  Database,
  Tag,
  Hash,
  Grid
} from "lucide-react";

import pyCode1 from "./topic6_files/01_label_encoder_demo.py?raw";
import pyCode2 from "./topic6_files/02_one_hot_encoder_demo.py?raw";
import pyCode3 from "./topic6_files/03_ordinal_encoder_and_column_transformer.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions.js";

const initialRows = [
  { student: "Debangshu", city: "Barrackpore", tier: "Beginner", result: "Pass" },
  { student: "Susmita", city: "Kolkata", tier: "Advanced", result: "Distinction" },
  { student: "Swadeep", city: "Barrackpore", tier: "Intermediate", result: "Pass" },
  { student: "Tuhina", city: "Shyamnagar", tier: "Intermediate", result: "Distinction" },
  { student: "Sachin", city: "Kolkata", tier: "Beginner", result: "Fail" }
];

const allCities = ["Barrackpore", "Kolkata", "Shyamnagar"];
const tierOrder = ["Beginner", "Intermediate", "Advanced"];
const resultClasses = ["Distinction", "Fail", "Pass"]; // alphabetical

export default function Topic6() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Studio State
  const [encoderMode, setEncoderMode] = useState("onehot"); // 'onehot' | 'label' | 'ordinal'
  const [dropFirst, setDropFirst] = useState(false);
  const [testCity, setTestCity] = useState("Naihati"); // Unseen category
  const [handleUnknownIgnore, setHandleUnknownIgnore] = useState(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_label_encoder_demo.py", code: pyCode1 },
    { name: "02_one_hot_encoder_demo.py", code: pyCode2 },
    { name: "03_ordinal_encoder_and_column_transformer.py", code: pyCode3 }
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

  // Compute encoding
  const activeCities = dropFirst ? allCities.slice(1) : allCities;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-violet-500/20 rounded-xl text-violet-400 border border-violet-500/30">
            <Binary className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                Topic 6 • Scikit-learn Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">LabelEncoder &amp; OneHotEncoder</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Categorical Encoding: Target (y) vs Features (X)
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Demystify the critical architectural difference between encoding 1D target labels (<code className="text-violet-300 font-mono">LabelEncoder</code>)
          and 2D feature matrices (<code className="text-violet-300 font-mono">OneHotEncoder</code> / <code className="text-violet-300 font-mono">OrdinalEncoder</code>).
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto">
        <div className="flex border-b border-slate-800 mb-6 gap-2">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "interactive"
                ? "border-violet-400 text-violet-400 bg-violet-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Interactive Encoding Studio
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all border-b-2 ${
              activeTab === "code"
                ? "border-violet-400 text-violet-400 bg-violet-500/10"
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
                ? "border-violet-400 text-violet-400 bg-violet-500/10"
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
                ? "border-violet-400 text-violet-400 bg-violet-500/10"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Knowledge Check
          </button>
        </div>

        {/* TAB 1: INTERACTIVE ENCODING STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            {/* Mode Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setEncoderMode("onehot")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  encoderMode === "onehot"
                    ? "bg-violet-500/15 border-violet-500/60 shadow-lg shadow-violet-950/50"
                    : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-200 font-mono text-sm">OneHotEncoder</span>
                  <span className="text-[10px] bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded font-mono">
                    Features (X)
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Creates binary columns for nominal data (e.g. City). Avoids false mathematical ordinality.
                </div>
              </button>

              <button
                onClick={() => setEncoderMode("ordinal")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  encoderMode === "ordinal"
                    ? "bg-violet-500/15 border-violet-500/60 shadow-lg shadow-violet-950/50"
                    : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-200 font-mono text-sm">OrdinalEncoder</span>
                  <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-mono">
                    Features (X)
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Encodes ranked categories (Beginner=0, Intermediate=1, Advanced=2) preserving hierarchy.
                </div>
              </button>

              <button
                onClick={() => setEncoderMode("label")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  encoderMode === "label"
                    ? "bg-violet-500/15 border-violet-500/60 shadow-lg shadow-violet-950/50"
                    : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-200 font-mono text-sm">LabelEncoder</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                    Target (y) Only
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Strictly for 1D classification targets (e.g. Distinction=0, Fail=1, Pass=2).
                </div>
              </button>
            </div>

            {/* Interactive Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Encoder Options & Diagnostics */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-violet-400" />
                    Encoder Settings &amp; Parameters
                  </h3>

                  {encoderMode === "onehot" && (
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <div>
                          <div className="font-semibold text-slate-200">drop='first'</div>
                          <div className="text-slate-400 text-[11px]">
                            Drops first dummy column to avoid multicollinearity
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={dropFirst}
                          onChange={(e) => setDropFirst(e.target.checked)}
                          className="w-4 h-4 rounded text-violet-600 bg-slate-900 border-slate-700"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                        <div className="font-semibold text-slate-200">handle_unknown='ignore'</div>
                        <div className="text-slate-400 text-[11px]">
                          Simulate unseen category during test time:
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-mono">Unseen City:</span>
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-mono rounded">
                            {testCity}
                          </span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded font-mono text-[11px] text-violet-300">
                          Output: [{activeCities.map(() => "0").join(", ")}] (all zeros, no crash!)
                        </div>
                      </div>
                    </div>
                  )}

                  {encoderMode === "ordinal" && (
                    <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
                      <div className="text-slate-400">Explicit Category Ordering:</div>
                      {tierOrder.map((t, idx) => (
                        <div key={t} className="flex justify-between items-center py-1 border-b border-slate-900 last:border-0">
                          <span className="text-sky-300 font-semibold">{t}</span>
                          <span className="text-slate-400">Mapped Integer: <strong className="text-white">{idx}</strong></span>
                        </div>
                      ))}
                    </div>
                  )}

                  {encoderMode === "label" && (
                    <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2 font-mono text-xs">
                      <div className="text-slate-400">Alphabetical Target Mapping (le.classes_):</div>
                      {resultClasses.map((c, idx) => (
                        <div key={c} className="flex justify-between items-center py-1 border-b border-slate-900 last:border-0">
                          <span className="text-amber-300 font-semibold">{c}</span>
                          <span className="text-slate-400">Class Label: <strong className="text-white">{idx}</strong></span>
                        </div>
                      ))}
                      <div className="text-[11px] text-rose-400 pt-2 border-t border-slate-900 font-sans">
                        ⚠️ DO NOT apply LabelEncoder to multi-column feature matrix X!
                      </div>
                    </div>
                  )}
                </div>

                {/* Scikit-Learn Pro Tip */}
                <div className="p-4 bg-gradient-to-r from-violet-950/40 to-slate-900 border border-violet-500/20 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block mb-1">Barrackpore Lab Rule:</strong>
                  Use <code className="text-violet-300 font-mono">OneHotEncoder</code> or <code className="text-violet-300 font-mono">OrdinalEncoder</code> inside a <code className="text-violet-300 font-mono">ColumnTransformer</code> for input columns. Reserve <code className="text-violet-300 font-mono">LabelEncoder</code> solely for classification targets (<code className="text-violet-300 font-mono">y</code>).
                </div>
              </div>

              {/* Right Column: Encoded Live Matrix */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Grid className="w-4 h-4 text-violet-400" />
                      Live Encoded Output Representation
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {encoderMode.toUpperCase()}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                        <tr>
                          <th className="p-2.5">Student</th>
                          {encoderMode === "onehot" && (
                            <>
                              <th className="p-2.5">Raw City</th>
                              {activeCities.map((city) => (
                                <th key={city} className="p-2.5 text-violet-400">
                                  City_{city}
                                </th>
                              ))}
                            </>
                          )}
                          {encoderMode === "ordinal" && (
                            <>
                              <th className="p-2.5">Raw Tier</th>
                              <th className="p-2.5 text-sky-400">Ordinal Encoded (0-2)</th>
                            </>
                          )}
                          {encoderMode === "label" && (
                            <>
                              <th className="p-2.5">Raw Target (y)</th>
                              <th className="p-2.5 text-amber-400">Encoded Target (0-2)</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {initialRows.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-2.5 font-sans font-medium text-slate-200">
                              {row.student}
                            </td>

                            {encoderMode === "onehot" && (
                              <>
                                <td className="p-2.5 text-slate-400">{row.city}</td>
                                {activeCities.map((city) => (
                                  <td
                                    key={city}
                                    className={`p-2.5 font-bold ${
                                      row.city === city
                                        ? "text-emerald-400 bg-emerald-500/10"
                                        : "text-slate-500"
                                    }`}
                                  >
                                    {row.city === city ? 1 : 0}
                                  </td>
                                ))}
                              </>
                            )}

                            {encoderMode === "ordinal" && (
                              <>
                                <td className="p-2.5 text-slate-400">{row.tier}</td>
                                <td className="p-2.5 text-sky-300 font-bold bg-sky-500/5">
                                  {tierOrder.indexOf(row.tier)}
                                </td>
                              </>
                            )}

                            {encoderMode === "label" && (
                              <>
                                <td className="p-2.5 text-slate-400">{row.result}</td>
                                <td className="p-2.5 text-amber-300 font-bold bg-amber-500/5">
                                  {resultClasses.indexOf(row.result)}
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Dimensionality summary */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div className="text-slate-400">
                    Input Matrix Shape: <span className="text-slate-200 font-mono">5 x 1</span>
                  </div>
                  <div className="text-slate-400">
                    Encoded Shape:{" "}
                    <span className="text-violet-300 font-mono font-bold">
                      {encoderMode === "onehot" ? `5 x ${activeCities.length}` : "5 x 1"}
                    </span>
                  </div>
                </div>
              </div>
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
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
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
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-violet-400 transition-colors"
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
                <BookOpen className="w-5 h-5 text-violet-400" />
                Classroom Revision Notes: LabelEncoder vs OneHotEncoder
              </h3>
              <button
                onClick={() => copyCode(noteText)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-violet-400"
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
                    <HelpCircle className="w-5 h-5 text-violet-400" />
                    Topic 6 Quiz: Categorical Encoders
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Verify your understanding of dummy columns, ordinal hierarchy, and target label encoding.
                  </p>
                </div>
                {submittedQuiz && (
                  <div className="px-4 py-2 bg-violet-500/20 border border-violet-500/30 rounded-xl text-center">
                    <div className="text-xs uppercase text-violet-300 font-semibold">Your Score</div>
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
                        <span className="text-xs px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono mt-0.5">
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
                            optStyle = "bg-violet-500/20 border-violet-500/50 text-violet-200";
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
                          <strong className="text-violet-300 block mb-1">Explanation:</strong>
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
                    className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-lg text-xs font-semibold transition-all shadow-lg shadow-violet-600/20"
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
