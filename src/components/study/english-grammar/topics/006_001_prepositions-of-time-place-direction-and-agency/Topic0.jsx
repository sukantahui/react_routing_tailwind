import React, { useState } from "react";
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Languages,
  Zap,
  RotateCcw,
  Check,
  Layers,
  Clock,
  MapPin,
  Compass,
  Navigation,
  ArrowLeftRight,
  Sliders,
  ShieldAlert,
  Boxes
} from "lucide-react";
import FAQTemplate from "../../../common/FAQTemplate";
import PlainTextPrint from "../../../common/PlainTextPrint";
import Teacher from "../../../common/TeacherSukantaHui";
import WordDictionary from "../../../../../common/WordDictionary";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  const [showBengali, setShowBengali] = useState(false);
  const [activeTab, setActiveTab] = useState("pyramid");
  const [selectedPyramidLevel, setSelectedPyramidLevel] = useState("at");
  const [selectedMotionPair, setSelectedMotionPair] = useState("in_into");
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedExplanations, setRevealedExplanations] = useState({});

  const handleOptionSelect = (qId, option) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const toggleExplanation = (qId) => {
    setRevealedExplanations((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const pyramidData = {
    at: {
      title: "AT (Precise Points & Small Scale)",
      color: "from-amber-500 to-orange-500",
      timeDescription: "Exact clock times, precise moments, transitions of light.",
      timeExamples: ["at 5:30 PM", "at midnight", "at noon", "at dawn", "at the weekend (UK)"],
      placeDescription: "Specific coordinates, address points, bus stops, small localities.",
      placeExamples: ["at 221B Baker Street", "at the bus stop", "at the traffic light", "at Barrackpore (in Kolkata)"],
      ruleBn: "নির্দিষ্ট ঘড়ির সময়, ভোর/রাত বা কোনো নির্দিষ্ট অবস্থান বা ঠিকানার ক্ষেত্রে 'at' বসে।"
    },
    on: {
      title: "ON (Days, Dates & 2D Surfaces)",
      color: "from-sky-500 to-blue-600",
      timeDescription: "Specific days of the week, calendar dates, anniversaries.",
      timeExamples: ["on Monday", "on 15th August", "on Christmas Day", "on my birthday"],
      placeDescription: "2D Flat surfaces, lines, roads, floors, contact planes.",
      placeExamples: ["on the table", "on the 2nd floor", "on the wall", "on MG Road"],
      ruleBn: "বার (days), তারিখ (dates) এবং সমতল মেঝের উপরিভাগে স্পর্শের ক্ষেত্রে 'on' বসে।"
    },
    in: {
      title: "IN (Long Periods & 3D Enclosed Spaces)",
      color: "from-purple-500 to-indigo-600",
      timeDescription: "Months, years, seasons, decades, centuries, long eras.",
      timeExamples: ["in April", "in 2026", "in summer", "in the 21st century", "in the morning"],
      placeDescription: "3D enclosed spaces, towns, major cities, states, nations.",
      placeExamples: ["in the room", "in the box", "in Kolkata", "in India", "in the forest"],
      ruleBn: "মাস, বছর, ঋতু, শতাব্দী এবং ত্রিমাত্রিক ঘেরা জায়গা বা বড় শহরের ক্ষেত্রে 'in' বসে।"
    }
  };

  const motionPairs = {
    in_into: {
      title: "IN vs INTO",
      concept: "Static Interior vs Dynamic Entering Motion",
      item1: { name: "IN", usage: "Static location inside an enclosure", eg: "The swimmer is swimming in the pool." },
      item2: { name: "INTO", usage: "Dynamic motion moving from outside to inside", eg: "He plunged into the icy water." },
      trapBn: "বাইরে থেকে ভেতরে ঢোকার গতি থাকলে 'into'; আগে থেকেই ভেতরে থাকলে 'in'। (যেমন: She ran INTO the room)."
    },
    on_onto: {
      title: "ON vs ONTO",
      concept: "Static Surface vs Dynamic Landing Movement",
      item1: { name: "ON", usage: "Resting in contact with a surface", eg: "The book is lying on the table." },
      item2: { name: "ONTO", usage: "Dynamic leaping or moving on top of a surface", eg: "The leopard sprang onto the boulder." },
      trapBn: "কোনো সমতল জায়গায় লাফিয়ে পড়ার গতিশীল অবস্থা নির্দেশ করতে 'onto' বসে।"
    },
    through_across: {
      title: "THROUGH vs ACROSS",
      concept: "3D Enclosed Volume vs 2D Flat Plane Crossing",
      item1: { name: "THROUGH", usage: "Moving inside a 3D medium (tunnel, forest, crowd)", eg: "The bullet passed through the wooden partition." },
      item2: { name: "ACROSS", usage: "Crossing from one side to another on a flat 2D plane", eg: "We walked across the pedestrian bridge." },
      trapBn: "ত্রিমাত্রিক মাধ্যম (টানেল, জঙ্গল, ভিড়)-এর ভিতর দিয়ে গেলে 'through'; সমতল পারাপারে 'across'। "
    },
    by_until: {
      title: "BY vs UNTIL (TILL)",
      concept: "Deadline Point vs Continuous Duration",
      item1: { name: "BY", usage: "No later than a deadline (single completion point)", eg: "Submit your thesis by Friday 5:00 PM." },
      item2: { name: "UNTIL", usage: "Continuing non-stop up to a boundary point", eg: "The library remains open until 9:00 PM." },
      trapBn: "'By' মানে ডেডলাইন বা সময়সীমা; 'until' মানে একটানা কাজ চালু থাকা (যেমন: wait until evening)."
    },
    by_with: {
      title: "BY (Agent) vs WITH (Instrument)",
      concept: "Living Doer vs Mechanical Tool / Weapon",
      item1: { name: "BY", usage: "The living doer/agent executing the action", eg: "The contract was signed by the CEO." },
      item2: { name: "WITH", usage: "The physical instrument or tool utilized", eg: "The seal was stamped with green ink." },
      trapBn: "সক্রিয় ব্যক্তি বা কর্তার আগে 'by' বসে; আর যন্ত্র, অস্ত্র বা হাতিয়ারের আগে 'with' বসে।"
    },
    made_of_from: {
      title: "MADE OF vs MADE FROM",
      concept: "Physical Continuity vs Chemical Transformation",
      item1: { name: "MADE OF", usage: "Material retains original physical properties", eg: "This sculpture is made of white marble." },
      item2: { name: "MADE FROM", usage: "Raw material undergoes chemical transformation", eg: "Paper is made from wood pulp." },
      trapBn: "উপাদানটি চেনা গেলে (physical state intact) 'made of'; রাসায়নিক রূপান্তর ঘটলে 'made from'।"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER WITH BILINGUAL SWITCHER                                   */}
        {/* ========================================================================= */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/60 via-slate-900 to-sky-950/40 p-8 sm:p-12 border border-indigo-700/40 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-sky-500/10 text-sky-300 border border-sky-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                Module 006.001 • Relational Grammar
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Prepositions of Time, Place & Direction
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Master the architectural rules of <span className="text-amber-400 font-semibold">At, On, and In</span> across spatial and temporal dimensions, dynamic motion particles (<span className="text-sky-400 font-semibold">Into, Onto, Through</span>), and agency versus instrumentality.
              </p>
            </div>

            <button
              onClick={() => setShowBengali(!showBengali)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold transition-all duration-300 border ${
                showBengali
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-500/10"
                  : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <Languages className="w-4 h-4 text-emerald-400" />
              <span>{showBengali ? "Bengali Explanations ON" : "বাংলা ব্যাখ্যা দেখুন"}</span>
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. INTERACTIVE WORKBENCH: THE PREPOSITION PYRAMID & MOTION LAB             */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <Compass className="w-6 h-6 text-sky-400" />
              <div>
                <h2 className="text-xl font-bold text-white">Interactive Preposition Explorer</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Switch between the At-On-In Pyramid and dynamic spatial motion contrasts.
                </p>
              </div>
            </div>

            <div className="flex gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("pyramid")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "pyramid"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                At / On / In Pyramid
              </button>
              <button
                onClick={() => setActiveTab("motion")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "motion"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Motion & Spatial Lab
              </button>
            </div>
          </div>

          {activeTab === "pyramid" ? (
            <div className="space-y-6">
              {/* Pyramid Level Selector */}
              <div className="grid grid-cols-3 gap-3">
                {["at", "on", "in"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedPyramidLevel(lvl)}
                    className={`p-4 rounded-xl text-center border font-bold uppercase transition-all duration-300 ${
                      selectedPyramidLevel === lvl
                        ? "bg-indigo-950/60 border-indigo-500 text-indigo-300 ring-2 ring-indigo-500/30 shadow-lg"
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-lg tracking-wider">{lvl}</div>
                    <div className="text-[11px] font-normal text-slate-400 lowercase mt-1">
                      {lvl === "at" ? "Precise Points" : lvl === "on" ? "Days & Surfaces" : "Enclosed / Long Periods"}
                    </div>
                  </button>
                ))}
              </div>

              {/* Pyramid Level Detail Card */}
              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                    {pyramidData[selectedPyramidLevel].title}
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                    Hierarchy Level
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Time Dimension */}
                  <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm">
                      <Clock className="w-4 h-4" />
                      <h4>Time Dimension</h4>
                    </div>
                    <p className="text-xs text-slate-300">
                      {pyramidData[selectedPyramidLevel].timeDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {pyramidData[selectedPyramidLevel].timeExamples.map((ex, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-sky-950/60 text-sky-300 border border-sky-800/60 font-mono">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Place Dimension */}
                  <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                      <MapPin className="w-4 h-4" />
                      <h4>Place / Spatial Dimension</h4>
                    </div>
                    <p className="text-xs text-slate-300">
                      {pyramidData[selectedPyramidLevel].placeDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {pyramidData[selectedPyramidLevel].placeExamples.map((ex, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-300 border border-amber-800/60 font-mono">
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {showBengali && (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 text-xs sm:text-sm">
                    <strong>বাংলা ব্যাখ্যা:</strong> {pyramidData[selectedPyramidLevel].ruleBn}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Motion Pairs Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {Object.entries(motionPairs).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMotionPair(key)}
                    className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                      selectedMotionPair === key
                        ? "bg-sky-950/50 border-sky-500 text-sky-200 shadow-md ring-1 ring-sky-500/40"
                        : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div>{data.title}</div>
                    <div className="text-[10px] font-normal text-slate-500 truncate mt-0.5">
                      {data.concept}
                    </div>
                  </button>
                ))}
              </div>

              {/* Motion Pair Contrast Visualizer */}
              <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-sky-400" />
                    {motionPairs[selectedMotionPair].title} — {motionPairs[selectedMotionPair].concept}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="text-sm font-bold text-indigo-400">
                      {motionPairs[selectedMotionPair].item1.name}
                    </div>
                    <div className="text-xs text-slate-300">
                      {motionPairs[selectedMotionPair].item1.usage}
                    </div>
                    <div className="text-xs font-mono bg-slate-950 p-2 rounded text-indigo-200 border border-slate-800">
                      "{motionPairs[selectedMotionPair].item1.eg}"
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="text-sm font-bold text-emerald-400">
                      {motionPairs[selectedMotionPair].item2.name}
                    </div>
                    <div className="text-xs text-slate-300">
                      {motionPairs[selectedMotionPair].item2.usage}
                    </div>
                    <div className="text-xs font-mono bg-slate-950 p-2 rounded text-emerald-200 border border-slate-800">
                      "{motionPairs[selectedMotionPair].item2.eg}"
                    </div>
                  </div>
                </div>

                {showBengali && (
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 text-xs sm:text-sm">
                    <strong>পরীক্ষার কৌশল (Exam Rule):</strong> {motionPairs[selectedMotionPair].trapBn}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 3. SECTION 1: MASTER PREPOSITION RULE MATRIX                              */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Layers className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-white">1. Core Preposition Architecture</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Foundational syntactic rules governing spatial, temporal, and agency relationships.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                Time Relational Rules
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="font-bold text-sky-300">FOR vs SINCE vs DURING</div>
                  <p className="mt-1 text-slate-400">
                    <strong className="text-white">For:</strong> total duration (for 4 hours). <strong className="text-white">Since:</strong> starting timestamp (since 2018). <strong className="text-white">During:</strong> inside an event/period noun (during the war).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="font-bold text-amber-300">BY vs UNTIL</div>
                  <p className="mt-1 text-slate-400">
                    <strong className="text-white">By:</strong> denotes a deadline (no later than). <strong className="text-white">Until:</strong> denotes an action continuously continuing up to that point.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="font-bold text-emerald-300">IN vs WITHIN</div>
                  <p className="mt-1 text-slate-400">
                    <strong className="text-white">In 5 days:</strong> at the end of 5 days. <strong className="text-white">Within 5 days:</strong> before the 5 days expire.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Spatial & Material Rules
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="font-bold text-indigo-300">BETWEEN vs AMONG</div>
                  <p className="mt-1 text-slate-400">
                    <strong className="text-white">Between:</strong> two entities OR distinct, individually named reciprocal entities (e.g., treaty between 3 nations). <strong className="text-white">Among:</strong> an uncounted group or crowd (3+).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="font-bold text-purple-300">BY vs WITH</div>
                  <p className="mt-1 text-slate-400">
                    <strong className="text-white">By:</strong> living agent/doer ("signed by the manager"). <strong className="text-white">With:</strong> instrument/tool ("written with a pen").
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="font-bold text-rose-300">ABOVE / OVER vs BELOW / UNDER</div>
                  <p className="mt-1 text-slate-400">
                    <strong className="text-white">Over/Under:</strong> direct vertical coverage or contact. <strong className="text-white">Above/Below:</strong> higher or lower level/altitude.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. SECTION 2: HIGH-FREQUENCY PREPOSITION COMPARISON TABLE                */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Boxes className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white">2. High-Frequency Preposition Benchmark</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Standard competitive examination triggers and their definitive usage patterns.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
                  <th className="p-3 font-semibold">Preposition Category</th>
                  <th className="p-3 font-semibold">Standard Trigger</th>
                  <th className="p-3 font-semibold">Gold Standard Example</th>
                  <th className="p-3 font-semibold">Common Error Trap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-indigo-400">Clock Time vs Date</td>
                  <td className="p-3">At (time), On (date)</td>
                  <td className="p-3 font-mono text-xs">at 7:00 AM / on 26th January</td>
                  <td className="p-3 text-rose-400">in Monday (Wrong) → on Monday</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-sky-400">Entering 3D Volume</td>
                  <td className="p-3">Into (Dynamic movement)</td>
                  <td className="p-3 font-mono text-xs">jumped into the river</td>
                  <td className="p-3 text-rose-400">jumped in the river (Ambiguous)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-emerald-400">Material Transformation</td>
                  <td className="p-3">Made of vs Made from</td>
                  <td className="p-3 font-mono text-xs">made of gold / made from milk</td>
                  <td className="p-3 text-rose-400">paper made of wood (Chemical shift!)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-amber-400">Enclosed Spatial Travel</td>
                  <td className="p-3">Through (3D tunnel/forest)</td>
                  <td className="p-3 font-mono text-xs">drove through the tunnel</td>
                  <td className="p-3 text-rose-400">drove across the tunnel (Wrong plane)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-purple-400">Reciprocal Relationships</td>
                  <td className="p-3">Between (Named entities)</td>
                  <td className="p-3 font-mono text-xs">treaty between US, UK & France</td>
                  <td className="p-3 text-rose-400">treaty among 3 named countries</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CLASSROOM DIALOGUE WITH SUKANTA SIR                                    */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950/30 rounded-2xl border border-indigo-900/40 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-indigo-900/50 pb-4">
            <Teacher />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-sky-400">Student (Barrackpore): </span>
              "Sir, in Bengali we use '-এ' or '-তে' for almost everything ('কলকাতায়', 'টেবিলে', 'সকালে', '৫টায়'). How do we naturally choose between At, In, and On in English?"
            </div>

            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/40">
              <span className="font-bold text-indigo-300">Sukanta Sir: </span>
              "Excellent observation! Bengali relies heavily on inflectional case endings (বিভক্তি: -এ, -তে, -য়) which generalize across time and place. English, however, uses strict geometric and temporal hierarchies:
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-300">
                <li><strong>Geometric Zero-Dimension (A Point):</strong> Use <span className="text-amber-400 font-semibold">AT</span> ('at the bus stop', 'at 5:00 PM').</li>
                <li><strong>Geometric Two-Dimension (A Surface):</strong> Use <span className="text-sky-400 font-semibold">ON</span> ('on the table', 'on Sunday').</li>
                <li><strong>Geometric Three-Dimension (An Enclosed Volume / Boundary):</strong> Use <span className="text-purple-400 font-semibold">IN</span> ('in the room', 'in July', 'in Kolkata').</li>
              </ul>
              Remember the motion rule: whenever there is dynamic motion crossing a boundary into an enclosure, attach '-to'—giving you <span className="text-emerald-400 font-semibold">into</span> and <span className="text-emerald-400 font-semibold">onto</span>!"
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. SELF-ASSESSMENT MCQ DIAGNOSTIC LAB                                     */}
        {/* ========================================================================= */}
        <section className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-sky-400" />
              <div>
                <h2 className="text-xl font-bold text-white">3. Module Mastery Diagnostics</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Test your mastery across 25 curated spatial, temporal, and directional preposition problems.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono bg-sky-500/10 text-sky-300 px-3 py-1.5 rounded-full border border-sky-500/20">
              25 Questions
            </span>
          </div>

          <div className="space-y-6">
            {questions.map((q) => {
              const selected = userAnswers[q.id];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctAnswer;
              const isExpanded = revealedExplanations[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-slate-950/60 rounded-xl border border-slate-800/80 p-5 space-y-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-200">
                      <span className="text-sky-400 mr-2">Q{q.id}.</span>
                      {q.question}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, idx) => {
                      const isThisSelected = selected === opt;
                      const isThisCorrect = opt === q.correctAnswer;

                      let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700";
                      if (isAnswered) {
                        if (isThisCorrect) {
                          btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-300 font-semibold";
                        } else if (isThisSelected) {
                          btnStyle = "bg-rose-950/60 border-rose-500 text-rose-300";
                        } else {
                          btnStyle = "bg-slate-900/40 border-slate-800/50 text-slate-500";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(q.id, opt)}
                          className={`p-3 rounded-lg text-left text-xs sm:text-sm border transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isThisCorrect && (
                            <Check className="w-4 h-4 text-emerald-400 ml-2 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        onClick={() => toggleExplanation(q.id)}
                        className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 self-start flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        {isExpanded ? "Hide Technical Explanation" : "View Technical Explanation & Bangla Note"}
                      </button>

                      {isExpanded && (
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs text-slate-300">
                          <div>
                            <span className="text-emerald-400 font-semibold">Explanation: </span>
                            {q.explanation}
                          </div>
                          {showBengali && q.explanationBn && (
                            <div className="text-slate-400 border-t border-slate-800/80 pt-2">
                              <span className="text-sky-400 font-semibold">বাংলা ব্যাখ্যা: </span>
                              {q.explanationBn}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. AUXILIARY TOOLS: WORD DICTIONARY, PRINTABLE NOTE & FAQS               */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <WordDictionary />
          <PlainTextPrint noteText={noteText} />
          <FAQTemplate
            faqList={[
              {
                q: "Why do we say 'at night' but 'in the morning'?",
                a: "Historically and geometrically in English, daylight spans (morning, afternoon, evening) are treated as broad temporal enclosures ('in the...'), whereas night, dawn, noon, and dusk are treated as single transition points ('at...')."
              },
              {
                q: "Can 'between' ever be used for more than two items?",
                a: "Yes! 'Between' is strictly correct when referring to distinct, individual, named items in mutual relationship (e.g., 'An alliance between the UK, Germany, and France'). 'Among' is used when items are part of an indistinct crowd or group."
              },
              {
                q: "What is the difference between 'die of' and 'die from'?",
                a: "'Die of' is used when death results directly from an internal disease or hunger (die of malaria, die of cancer). 'Die from' is used when death results from an external cause or indirect circumstance (die from overwork, die from a wound, die from blood loss)."
              }
            ]}
          />
        </section>
      </div>
    </div>
  );
}
