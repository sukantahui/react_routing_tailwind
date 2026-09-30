import React, { useState } from 'react';
import FAQTemplate from '../../template/FAQTemplate';
import Teacher from '../../Teacher';
import PlainTextPrint from '../../PlainTextPrint';
import { topic9Questions } from './topic9_files/topic9_questions';

const Topic9 = () => {
  const [activeTab, setActiveTab] = useState('simple');
  const [showBengali, setShowBengali] = useState(true);
  const [selectedTree, setSelectedTree] = useState(0);

  const explodedTokens = [
    {
      title: "Master Sentence Dissection (Hierarchical Tree Breakdown)",
      badge: "Deep Hierarchy",
      badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
      sentence: "The dedicated research team eagerly demonstrated their breakthrough algorithm to the international board yesterday.",
      parts: [
        { label: "Complete Subject (NP)", token: "The dedicated research team", color: "border-sky-500 bg-sky-950/40 text-sky-300", desc: "Head noun 'team' with determiner 'The' and pre-modifiers 'dedicated research'" },
        { label: "Adverbial of Manner", token: "eagerly", color: "border-amber-500 bg-amber-950/40 text-amber-300", desc: "Pre-verbal manner adjunct" },
        { label: "Finite Lexical Verb", token: "demonstrated", color: "border-purple-500 bg-purple-950/40 text-purple-300", desc: "Past tense transitive action core" },
        { label: "Direct Object (NP)", token: "their breakthrough algorithm", color: "border-emerald-500 bg-emerald-950/40 text-emerald-300", desc: "Target entity receiving demonstration (Demonstrated what?)" },
        { label: "Prepositional Recipient", token: "to the international board", color: "border-rose-500 bg-rose-950/40 text-rose-300", desc: "Prepositional phrase recipient (Demonstrated to whom?)" },
        { label: "Adverbial of Time", token: "yesterday", color: "border-cyan-500 bg-cyan-950/40 text-cyan-300", desc: "Temporal adjunct answering 'when?'" }
      ],
      queryTest: "Complete Predicate: 'eagerly demonstrated their breakthrough algorithm to the international board yesterday'.",
      proofTest: "Clause Core: [Team] + [demonstrated] + [algorithm] (SVO). All other branches are recursive adverbial/prepositional modifiers.",
      bnNote: "যেকোনো জটিল বাক্যকে প্রথমে Subject এবং Predicate-এ ভাগ করতে হয়, তারপর Head Noun, Verb, Object এবং Adverbial মডিফায়ারে বিশ্লিষ্ট করতে হয়।"
    }
  ];

  const treeData = [
    {
      title: "Sentence: 'The brilliant astronomer discovered a distant galaxy.'",
      tree: [
        { level: "ROOT: S (Clause)", detail: "Complete Sentence Structure" },
        { level: "├── NP (Subject)", detail: "The brilliant astronomer (Det: The | Adj: brilliant | Noun: astronomer)" },
        { level: "└── VP (Predicate)", detail: "discovered a distant galaxy" },
        { level: "    ├── V (Verb Core)", detail: "discovered (Past tense transitive verb)" },
        { level: "    └── NP (Direct Object)", detail: "a distant galaxy (Det: a | Adj: distant | Noun: galaxy)" }
      ]
    },
    {
      title: "Sentence: 'The chief engineer considered the structural design completely flawless.'",
      tree: [
        { level: "ROOT: S (Clause)", detail: "Complex Transitive Clause (SVOC)" },
        { level: "├── NP (Subject)", detail: "The chief engineer (Det: The | Mod: chief | Head: engineer)" },
        { level: "└── VP (Predicate)", detail: "considered the structural design completely flawless" },
        { level: "    ├── V (Verb Core)", detail: "considered (Complex Transitive)" },
        { level: "    ├── NP (Direct Object)", detail: "the structural design" },
        { level: "    └── AdjP (Object Complement)", detail: "completely flawless (Design == flawless)" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-950/60 via-slate-900 to-indigo-950/60 p-6 md:p-8 border border-teal-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40">
                Topic 001_002_09
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
                Sentence Anatomy Workbench, Trees & Socratic Diagnostic Lab
              </h1>
              <p className="text-slate-400 text-sm md:text-base mt-1">
                The ultimate synthesis: Parsing syntactic tree hierarchies, testing boundaries, and solving deep structural puzzles.
              </p>
            </div>
            <button
              onClick={() => setShowBengali(!showBengali)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-xs font-medium transition-all shadow-md"
            >
              {showBengali ? '🇧🇩 Hide Bengali' : '🇧🇩 Show Bengali'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {['simple', 'trees', 'socratic', 'mcq'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/25'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab === 'simple' && '⚡ Master Dissection'}
              {tab === 'trees' && '🌳 Syntactic Parse Trees'}
              {tab === 'socratic' && '🎓 Socratic Workshop'}
              {tab === 'mcq' && '📝 Practice MCQ (25+)'}
            </button>
          ))}
        </div>

        {/* Tab 1: Master Dissection */}
        {activeTab === 'simple' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-indigo-950/40 p-5 rounded-2xl border border-teal-500/30">
              <h2 className="text-lg font-bold text-teal-300 flex items-center gap-2">
                <span>🔬</span> Complete Syntactic X-Ray of Complex Clauses
              </h2>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                Break down any multi-word sentence into its atomic grammatical tokens: NP Subject, Finite Verb, Direct Object, Indirect Object/Recipient, and Adverbial Adjuncts.
              </p>
              {showBengali && (
                <div className="mt-3 p-3 rounded-xl bg-teal-950/30 border border-teal-500/20 text-xs text-teal-200">
                  🇧🇩 <strong>সহজ কথায়:</strong> বাক্যের প্রতিটি শব্দগুচ্ছের নিজস্ব স্থান ও ভূমিকা থাকে। বড় বাক্যকে পার্ট-বাই-পার্ট খণ্ড করে দেখলে ব্যাকরণ অত্যন্ত স্বচ্ছ হয়ে ওঠে।
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {explodedTokens.map((item, idx) => (
                <div key={idx} className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-white text-base md:text-lg">{item.title}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Sentence Banner */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-teal-300 text-sm md:text-base font-bold tracking-wide">
                    "{item.sentence}"
                  </div>

                  {/* Exploded Tokens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {item.parts.map((p, pIdx) => (
                      <div key={pIdx} className={`p-3.5 rounded-xl border ${p.color} flex flex-col justify-between`}>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">{p.label}</span>
                          <span className="text-sm font-bold block mt-0.5">{p.token}</span>
                        </div>
                        <p className="text-xs opacity-90 mt-2">{p.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Diagnostic Tests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-sky-950/30 border border-sky-500/20 text-sky-300">
                      <strong>🔍 Predicate Scope:</strong> {item.queryTest}
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
                      <strong>⚖️ Structural Backbone:</strong> {item.proofTest}
                    </div>
                  </div>

                  {showBengali && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      🇧🇩 {item.bnNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Syntactic Parse Trees */}
        {activeTab === 'trees' && (
          <div className="space-y-6">
            <div className="flex gap-2">
              {treeData.map((td, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTree(i)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    selectedTree === i
                      ? 'bg-teal-500 text-slate-950 border-teal-400 font-bold shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Tree Example {i + 1}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="font-bold text-teal-300 text-base">{treeData[selectedTree].title}</h3>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs md:text-sm space-y-2">
                {treeData[selectedTree].tree.map((node, nIdx) => (
                  <div key={nIdx} className="flex flex-wrap items-baseline gap-2">
                    <span className="text-teal-400 font-bold">{node.level}</span>
                    <span className="text-slate-400">➔</span>
                    <span className="text-slate-200">{node.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Socratic Workshop */}
        {activeTab === 'socratic' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <span>🎓</span> Socratic Dialogue: Final Module Mastery with Sukanta Sir
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30 text-teal-200">
                <strong>Swadeep:</strong> "Sir, we have mastered Subject, Predicate, Direct/Indirect Objects, Complements, and Adverbials. What is the ultimate takeaway?"
              </div>
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
                <strong>Sukanta Sir:</strong> "The ultimate rule is: Meaning flows from syntactic form. Every word has a precise syntactic duty. Identify the Verb Core first, find who governs it (Subject), ask what receives it (Object) or equates with it (Complement), and separate all decorative scenery (Adverbials)!"
              </div>
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200">
                <strong>Debangshu & Abhronila:</strong> "Understood, Sir! We can now dissect and diagnose any sentence with 100% precision."
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: MCQ */}
        {activeTab === 'mcq' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <FAQTemplate title="Topic 9: Sentence Anatomy Workbench, Trees & Socratic Diagnostic Lab" questions={topic9Questions} />
          </div>
        )}

        <Teacher />
        <PlainTextPrint />
      </div>
    </div>
  );
};

export default Topic9;
