import React, { useState } from 'react';
import FAQTemplate from '../../template/FAQTemplate';
import Teacher from '../../Teacher';
import PlainTextPrint from '../../PlainTextPrint';
import { topic8Questions } from './topic8_files/topic8_questions';

const Topic8 = () => {
  const [activeTab, setActiveTab] = useState('simple');
  const [showBengali, setShowBengali] = useState(true);
  const [selectedPattern, setSelectedPattern] = useState(0);

  const patterns = [
    {
      code: "SV",
      name: "Subject + Verb",
      example: "The baby cried.",
      tokens: [
        { label: "Subject", text: "The baby", role: "Agent / Head noun" },
        { label: "Intransitive Verb", text: "cried", role: "Self-contained action; needs no object" }
      ],
      query: "Did crying hit a target? No. The action ends with the baby.",
      bn: "কর্তা + অকর্মক ক্রিয়া (কোনো কর্ম নেই)।"
    },
    {
      code: "SVO",
      name: "Subject + Verb + Direct Object",
      example: "Debangshu mastered Python programming.",
      tokens: [
        { label: "Subject", text: "Debangshu", role: "Actor" },
        { label: "Transitive Verb", text: "mastered", role: "Action transferred to target" },
        { label: "Direct Object", text: "Python programming", role: "Receives mastery (Mastered what?)" }
      ],
      query: "Mastered WHAT? -> Python programming. Passive: Python programming was mastered.",
      bn: "কর্তা + সকর্মক ক্রিয়া + প্রত্যক্ষ কর্ম।"
    },
    {
      code: "SVC",
      name: "Subject + Verb + Subject Complement",
      example: "The software architect looks exhausted.",
      tokens: [
        { label: "Subject", text: "The software architect", role: "Entity described" },
        { label: "Copular Verb", text: "looks", role: "Sensory linking bridge" },
        { label: "Subject Complement", text: "exhausted", role: "Adjective describing architect (S == C)" }
      ],
      query: "Equation check: Architect == exhausted. Cannot be passivized.",
      bn: "কর্তা + সংযোজক ক্রিয়া + কর্তার পরিপূরক।"
    },
    {
      code: "SVA",
      name: "Subject + Verb + Obligatory Adverbial",
      example: "The research laboratory lies near the riverbank.",
      tokens: [
        { label: "Subject", text: "The research laboratory", role: "Entity located" },
        { label: "Locative Verb", text: "lies", role: "Verb requiring spatial location" },
        { label: "Obligatory Adverbial", text: "near the riverbank", role: "Mandatory spatial complement" }
      ],
      query: "Can you omit 'near the riverbank'? *'The lab lies' is incomplete in this sense.",
      bn: "কর্তা + স্থানবাচক ক্রিয়া + বাধ্যতামূলক স্থানসূচক পদ।"
    },
    {
      code: "SVOO",
      name: "Subject + Verb + Indirect Object + Direct Object",
      example: "Sukanta Sir gifted Abhronila a grammar encyclopedia.",
      tokens: [
        { label: "Subject", text: "Sukanta Sir", role: "Giver / Donor" },
        { label: "Ditransitive Verb", text: "gifted", role: "Two-target transfer verb" },
        { label: "Indirect Object", text: "Abhronila", role: "Recipient (Gifted to WHOM?)" },
        { label: "Direct Object", text: "a grammar encyclopedia", role: "Entity transferred (Gifted WHAT?)" }
      ],
      query: "Prepositional shift: Sukanta Sir gifted a grammar encyclopedia TO Abhronila.",
      bn: "কর্তা + দ্বিকর্মক ক্রিয়া + পরোক্ষ কর্ম + প্রত্যক্ষ কর্ম।"
    },
    {
      code: "SVOC",
      name: "Subject + Verb + Direct Object + Object Complement",
      example: "The committee elected Tuhina chairperson.",
      tokens: [
        { label: "Subject", text: "The committee", role: "Selector" },
        { label: "Complex Transitive Verb", text: "elected", role: "Transformative/naming verb" },
        { label: "Direct Object", text: "Tuhina", role: "Person elected" },
        { label: "Object Complement", text: "chairperson", role: "New status of DO (Tuhina == chairperson)" }
      ],
      query: "Equation check: Tuhina == chairperson (Object Complement, NOT second object).",
      bn: "কর্তা + সকর্মক রূপান্তর ক্রিয়া + কর্ম + কর্মের পরিপূরক।"
    },
    {
      code: "SVOA",
      name: "Subject + Verb + Direct Object + Obligatory Adverbial",
      example: "Swadeep placed the quantum server inside the cooling chamber.",
      tokens: [
        { label: "Subject", text: "Swadeep", role: "Agent" },
        { label: "Transitive Locative Verb", text: "placed", role: "Placement verb needing destination" },
        { label: "Direct Object", text: "the quantum server", role: "Object moved" },
        { label: "Obligatory Adverbial", text: "inside the cooling chamber", role: "Mandatory destination" }
      ],
      query: "Cannot omit: *'Swadeep placed the server' is grammatically defective.",
      bn: "কর্তা + স্থানান্তর ক্রিয়া + কর্ম + বাধ্যতামূলক স্থাননির্দেশক।"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/60 p-6 md:p-8 border border-indigo-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Topic 001_002_08
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
                The 7 Canonical Clause Patterns (SV, SVO, SVC, SVA, SVOO, SVOC, SVOA)
              </h1>
              <p className="text-slate-400 text-sm md:text-base mt-1">
                The universal architectural blueprints governing every standard English sentence.
              </p>
            </div>
            <button
              onClick={() => setShowBengali(!showBengali)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-all shadow-md"
            >
              {showBengali ? '🇧🇩 Hide Bengali' : '🇧🇩 Show Bengali'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {['simple', 'matrix', 'socratic', 'mcq'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-indigo-500 text-slate-950 shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab === 'simple' && '⚡ 7 Exploded Blueprints'}
              {tab === 'matrix' && '📊 Pattern Comparison Matrix'}
              {tab === 'socratic' && '🎓 Socratic Workshop'}
              {tab === 'mcq' && '📝 Practice MCQ (25+)'}
            </button>
          ))}
        </div>

        {/* Tab 1: Exploded Blueprints */}
        {activeTab === 'simple' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/40 p-5 rounded-2xl border border-indigo-500/30">
              <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
                <span>📐</span> The 7 Fundamental Building Blocks of English
              </h2>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                Every declarative English clause, no matter how complex, reduces to one of these 7 canonical formulas based on verb valency.
              </p>
              {showBengali && (
                <div className="mt-3 p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200">
                  🇧🇩 ইংরেজি ভাষার প্রতিটি সাধারণ বাক্য এই ৭টি মৌলিক কাঠামোর (7 Patterns) যেকোনো একটির ওপর দাঁড়িয়ে থাকে।
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {patterns.map((pat, idx) => (
                <div key={idx} className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-extrabold rounded-lg">
                        {pat.code}
                      </span>
                      <h3 className="font-bold text-white text-base md:text-lg">{pat.name}</h3>
                    </div>
                  </div>

                  {/* Sentence Banner */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-indigo-300 text-base font-bold tracking-wide">
                    "{pat.example}"
                  </div>

                  {/* Exploded Tokens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {pat.tokens.map((tok, tIdx) => (
                      <div key={tIdx} className="p-3.5 rounded-xl border border-slate-700 bg-slate-950/60 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 block">{tok.label}</span>
                          <span className="text-sm font-bold text-white block mt-0.5">{tok.text}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{tok.role}</p>
                      </div>
                    ))}
                  </div>

                  {/* Diagnostic Verification */}
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-300">
                    <strong>🔍 Diagnostic Verification:</strong> {pat.query}
                  </div>

                  {showBengali && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      🇧🇩 {pat.bn}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Comparison Matrix */}
        {activeTab === 'matrix' && (
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 overflow-x-auto">
            <h3 className="font-bold text-white text-lg mb-4">📊 7-Pattern Structural Comparison</h3>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-indigo-300">
                  <th className="p-3">Pattern</th>
                  <th className="p-3">Verb Type</th>
                  <th className="p-3">Obligatory Elements</th>
                  <th className="p-3">Example Sentence</th>
                  <th className="p-3">Passivizable?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr><td className="p-3 font-mono font-bold text-white">SV</td><td className="p-3">Intransitive</td><td className="p-3">S + V</td><td className="p-3 font-mono">The eagle soared.</td><td className="p-3 text-rose-400">No</td></tr>
                <tr><td className="p-3 font-mono font-bold text-white">SVO</td><td className="p-3">Monotransitive</td><td className="p-3">S + V + DO</td><td className="p-3 font-mono">Swadeep wrote code.</td><td className="p-3 text-emerald-400">Yes</td></tr>
                <tr><td className="p-3 font-mono font-bold text-white">SVC</td><td className="p-3">Copular</td><td className="p-3">S + V + SC</td><td className="p-3 font-mono">The solution is optimal.</td><td className="p-3 text-rose-400">No</td></tr>
                <tr><td className="p-3 font-mono font-bold text-white">SVA</td><td className="p-3">Copular / Locative</td><td className="p-3">S + V + A(obligatory)</td><td className="p-3 font-mono">The campus lies nearby.</td><td className="p-3 text-rose-400">No</td></tr>
                <tr><td className="p-3 font-mono font-bold text-white">SVOO</td><td className="p-3">Ditransitive</td><td className="p-3">S + V + IO + DO</td><td className="p-3 font-mono">Tuhina sent me data.</td><td className="p-3 text-emerald-400">Yes (2 Passives)</td></tr>
                <tr><td className="p-3 font-mono font-bold text-white">SVOC</td><td className="p-3">Complex Transitive</td><td className="p-3">S + V + DO + OC</td><td className="p-3 font-mono">They made him leader.</td><td className="p-3 text-emerald-400">Yes</td></tr>
                <tr><td className="p-3 font-mono font-bold text-white">SVOA</td><td className="p-3">Complex Transitive</td><td className="p-3">S + V + DO + A(obligatory)</td><td className="p-3 font-mono">Put the file here.</td><td className="p-3 text-emerald-400">Yes</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Socratic Workshop */}
        {activeTab === 'socratic' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <span>🎓</span> Socratic Dialogue: Distinguishing SVOO vs SVOC vs SVOA
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200">
                <strong>Swadeep:</strong> "Sir, why is 'They appointed him director' SVOC, but 'They gave him a car' SVOO?"
              </div>
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
                <strong>Sukanta Sir:</strong> "Apply the Identity Equation test! In 'They appointed him director', him == director (same person). Thus 'director' is an Object Complement (SVOC). In 'They gave him a car', him != a car (two distinct entities: recipient and gift). Thus it is SVOO!"
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                <strong>Tuhina:</strong> "And what makes 'She placed the keys on the shelf' SVOA rather than SVO?"
              </div>
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200">
                <strong>Sukanta Sir:</strong> "Because 'placed' has a valency of three: Actor + Entity + Destination. You cannot say '*She placed the keys'. The prepositional phrase is an obligatory adverbial (SVOA)!"
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: MCQ */}
        {activeTab === 'mcq' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <FAQTemplate title="Topic 8: The 7 Canonical Clause Patterns" questions={topic8Questions} />
          </div>
        )}

        <Teacher />
        <PlainTextPrint />
      </div>
    </div>
  );
};

export default Topic8;
