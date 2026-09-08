import React, { useState } from "react";
import {
  Users2,
  Sparkles,
  BookOpen,
  Code2,
  HelpCircle,
  Copy,
  Check,
  Sliders,
  RotateCcw,
  Activity,
  CheckCircle2,
  PieChart,
  Award,
  Layers,
  Zap,
  Target
} from "lucide-react";

import pyCode1 from "./topic19_files/01_end_to_end_kmeans.py?raw";
import pyCode2 from "./topic19_files/02_silhouette_and_elbow_profiling.py?raw";
import pyCode3 from "./topic19_files/03_cluster_persona_interpretation.py?raw";
import noteText from "./topic19_files/topic19_note.txt?raw";
import questions from "./topic19_files/topic19_questions.js";

const personas = [
  {
    id: 0,
    name: "Theory-Heavy / At-Risk",
    color: "#f59e0b",
    badge: "Amber",
    centroid: { logins: 10, submissions: 4, forum: 16 },
    action: "Assign 1-on-1 Debugging Mentor & Hands-on Lab Drills",
    desc: "Active on forums asking conceptual questions but low practical code submissions."
  },
  {
    id: 1,
    name: "High-Achieving Power Coders",
    color: "#10b981",
    badge: "Emerald",
    centroid: { logins: 45, submissions: 39, forum: 2 },
    action: "Fast-Track to Industry Hackathons & Client Projects",
    desc: "Exceptional coding volume and platform activity with minimal conceptual hurdles."
  },
  {
    id: 2,
    name: "Moderate Steady Learners",
    color: "#06b6d4",
    badge: "Cyan",
    centroid: { logins: 22, submissions: 14, forum: 9 },
    action: "Standard Batch Pace with Weekly Milestone Check-ins",
    desc: "Balanced steady progression across both theoretical study and coding exercises."
  }
];

export default function Topic19() {
  const [activeTab, setActiveTab] = useState("interactive");
  const [selectedScript, setSelectedScript] = useState(0);
  const [copied, setCopied] = useState(false);

  // Inbound Student Sliders
  const [logins, setLogins] = useState(42);
  const [submissions, setSubmissions] = useState(36);
  const [forumQuestions, setForumQuestions] = useState(3);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const scripts = [
    { name: "01_end_to_end_kmeans.py", code: pyCode1 },
    { name: "02_silhouette_and_elbow_profiling.py", code: pyCode2 },
    { name: "03_cluster_persona_interpretation.py", code: pyCode3 }
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

  // Euclidean Distance to 3 Persona Centroids (in normalized space)
  // Scaling factors: logins (~15), submissions (~14), forum (~6)
  const distances = personas.map((p) => {
    const dLogins = (logins - p.centroid.logins) / 15;
    const dSubs = (submissions - p.centroid.submissions) / 14;
    const dForum = (forumQuestions - p.centroid.forum) / 6;
    const dist = Math.sqrt(dLogins * dLogins + dSubs * dSubs + dForum * dForum);
    return { ...p, dist };
  });

  distances.sort((a, b) => a.dist - b.dist);
  const assignedPersona = distances[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400 border border-amber-500/30">
            <Users2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Topic 19 • Worked Example 3
              </span>
              <span className="text-xs text-slate-400 font-mono">End-to-End KMeans Clustering</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
              Case Study: Student Behavioral Persona Segmentation
            </h1>
          </div>
        </div>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Walk through an unsupervised customer/student clustering workflow.
          From StandardScaler normalization and Silhouette optimization to business centroid inversion and automated persona triage.
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
            Persona Triage Studio
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

        {/* TAB 1: INTERACTIVE PERSONA STUDIO */}
        {activeTab === "interactive" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Student Behavior Input */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    Student Portal Activity (Inference)
                  </h3>

                  {/* Monthly Logins */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Monthly LMS Logins:</span>
                      <span className="font-mono text-amber-300 font-bold">{logins} logins</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="55"
                      value={logins}
                      onChange={(e) => setLogins(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  {/* Code Submissions */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Code Lab Submissions:</span>
                      <span className="font-mono text-amber-300 font-bold">{submissions} exercises</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={submissions}
                      onChange={(e) => setSubmissions(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  {/* Forum Questions */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Forum Questions Asked:</span>
                      <span className="font-mono text-amber-300 font-bold">{forumQuestions} posts</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={forumQuestions}
                      onChange={(e) => setForumQuestions(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Assigned Persona Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Assigned Persona (KMeans):</span>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-bold font-mono"
                      style={{
                        backgroundColor: `${assignedPersona.color}20`,
                        color: assignedPersona.color,
                        border: `1px solid ${assignedPersona.color}50`
                      }}
                    >
                      Cluster #{assignedPersona.id}
                    </span>
                  </div>

                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: assignedPersona.color }}
                    />
                    <span>{assignedPersona.name}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{assignedPersona.desc}</p>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                    <div className="text-slate-400 font-semibold mb-1">Academy Counselor Action:</div>
                    <div className="text-emerald-300 font-medium">{assignedPersona.action}</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Persona Centroids & Distance Radar */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
                  <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-amber-400" />
                    Inverted Cluster Centroids (Real Business Units)
                  </h3>

                  <div className="space-y-3">
                    {personas.map((p) => {
                      const isSelected = assignedPersona.id === p.id;
                      return (
                        <div
                          key={p.id}
                          className={`p-3.5 rounded-xl border transition-all ${
                            isSelected
                              ? "bg-slate-950 border-amber-500/60 shadow-lg shadow-amber-950/40"
                              : "bg-slate-950/60 border-slate-800/80"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 font-semibold text-xs text-slate-200">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: p.color }}
                              />
                              <span>Cluster {p.id}: {p.name}</span>
                            </div>
                            {isSelected && (
                              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                                MATCHED (d = {p.dist.toFixed(2)})
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-3 gap-2 font-mono text-xs text-slate-400 pt-1 border-t border-slate-900">
                            <div>Logins: <strong className="text-slate-200">{p.centroid.logins}</strong></div>
                            <div>Code Subs: <strong className="text-slate-200">{p.centroid.submissions}</strong></div>
                            <div>Forum: <strong className="text-slate-200">{p.centroid.forum}</strong></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Silhouette & Pipeline Architecture Card */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 font-mono text-xs space-y-2 text-slate-300">
                  <div className="text-slate-400 font-sans font-semibold">Production Pipeline Architecture:</div>
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-slate-400">
                    <div>1. <span className="text-amber-400">StandardScaler()</span> → Z-score Normalization</div>
                    <div>2. <span className="text-amber-400">KMeans(n_clusters=3, init='k-means++', n_init=10)</span></div>
                    <div className="text-emerald-400 pt-1">✓ Silhouette Score: 0.684 (High cluster cohesion)</div>
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
                Classroom Revision Notes: Worked Example 3 (K-Means)
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
                    Topic 19 Quiz: KMeans Worked Example
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Assess your understanding of unsupervised clustering workflows, silhouette metrics, and centroid inversion.
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
