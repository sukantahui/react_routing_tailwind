import React, { useState } from 'react';
import FAQTemplate from '../../template/FAQTemplate';
import Teacher from '../../Teacher';
import PlainTextPrint from '../../PlainTextPrint';
import { topic7Questions } from './topic7_files/topic7_questions';

const Topic7 = () => {
  const [activeTab, setActiveTab] = useState('simple');
  const [showBengali, setShowBengali] = useState(true);
  const [selectedExample, setSelectedExample] = useState(0);
  const [litmusFilter, setLitmusFilter] = useState('all');

  const explodedTokens = [
    {
      title: "1. Adverbial (Optional Circumstance / Modifies Verb)",
      badge: "Optional / Moveable",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      sentence: "Abhronila studied her biology notes diligently in the quiet library.",
      parts: [
        { label: "Subject", token: "Abhronila", color: "border-sky-500 bg-sky-950/40 text-sky-300", desc: "Actor performing the learning" },
        { label: "Verb", token: "studied", color: "border-purple-500 bg-purple-950/40 text-purple-300", desc: "Transitive action verb" },
        { label: "Direct Object", token: "her biology notes", color: "border-emerald-500 bg-emerald-950/40 text-emerald-300", desc: "Target of studying (Ask: Studied what?)" },
        { label: "Adverbial of Manner", token: "diligently", color: "border-amber-500 bg-amber-950/40 text-amber-300", desc: "How she studied (Can delete or move to start)" },
        { label: "Adverbial of Place", token: "in the quiet library", color: "border-rose-500 bg-rose-950/40 text-rose-300", desc: "Where she studied (Prepositional adjunct)" }
      ],
      queryTest: "Ask: 'HOW did she study?' -> diligently. 'WHERE did she study?' -> in the library.",
      proofTest: "Omission & Mobility: 'Diligently, Abhronila studied her notes' (Sentence remains 100% grammatically intact!).",
      bnNote: "Adverbials বাক্য থেকে মুছে ফেললেও বা স্থান পরিবর্তন করলেও বাক্যের ব্যাকরণগত মৌলিক কাঠামো নষ্ট হয় না।"
    },
    {
      title: "2. Subject Complement (Obligatory State Identity)",
      badge: "Obligatory / Equative",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      sentence: "Tuhina remained extremely calm during the competitive exam.",
      parts: [
        { label: "Subject", token: "Tuhina", color: "border-sky-500 bg-sky-950/40 text-sky-300", desc: "Head noun whose state is being described" },
        { label: "Linking Verb", token: "remained", color: "border-purple-500 bg-purple-950/40 text-purple-300", desc: "Copular verb expressing enduring state" },
        { label: "Subject Complement", token: "extremely calm", color: "border-emerald-500 bg-emerald-950/40 text-emerald-300", desc: "Predicate Adjective completing Tuhina's state (Tuhina = calm)" },
        { label: "Adverbial of Time", token: "during the competitive exam", color: "border-amber-500 bg-amber-950/40 text-amber-300", desc: "When the calm state held true" }
      ],
      queryTest: "Can we delete 'extremely calm'? -> *'Tuhina remained during the exam' is incomplete gibberish!",
      proofTest: "Copular Equation: Tuhina == extremely calm. It completes the subject, not an action target.",
      bnNote: "Subject Complement কখনোই বাদ দেওয়া যায় না। এটি কর্তার অবস্থা সম্পূর্ণ করে।"
    }
  ];

  const litmusTests = [
    { type: 'adjunct', sentence: 'The team celebrated yesterday.', token: 'yesterday', role: 'Adverbial (Adjunct)', check: 'Can be deleted without making sentence ungrammatical.' },
    { type: 'comp', sentence: 'The pizza smells delicious.', token: 'delicious', role: 'Subject Complement', check: 'Cannot be deleted (*The pizza smells).' },
    { type: 'obj', sentence: 'Swadeep designed a sleek database.', token: 'a sleek database', role: 'Direct Object', check: 'Becomes subject in passive: A sleek database was designed.' }
  ];

  const workbenchExamples = [
    { domain: 'Medical', sent: 'The surgeon operated meticulously under intense pressure.', s: 'The surgeon', v: 'operated', elements: [{ name: 'Adverbial of Manner', val: 'meticulously' }, { name: 'Adverbial of Condition', val: 'under intense pressure' }] },
    { domain: 'Astronomy', sent: 'The telescope remained operational despite severe solar radiation.', s: 'The telescope', v: 'remained', elements: [{ name: 'Subject Complement', val: 'operational' }, { name: 'Adverbial of Concession', val: 'despite severe solar radiation' }] },
    { domain: 'Law', sent: 'The magistrate declared the defendant completely innocent.', s: 'The magistrate', v: 'declared', elements: [{ name: 'Direct Object', val: 'the defendant' }, { name: 'Object Complement', val: 'completely innocent' }] },
    { domain: 'Engineering', sent: 'The robotic arm assembled components flawlessly at record speed.', s: 'The robotic arm', v: 'assembled', elements: [{ name: 'Direct Object', val: 'components' }, { name: 'Adverbial 1', val: 'flawlessly' }, { name: 'Adverbial 2', val: 'at record speed' }] }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-indigo-950/60 p-6 md:p-8 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Topic 001_002_07
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-2 tracking-tight">
                Adverbials vs Complements vs Objects
              </h1>
              <p className="text-slate-400 text-sm md:text-base mt-1">
                Mastering the distinction between optional circumstance modifiers, obligatory state complements, and action targets.
              </p>
            </div>
            <button
              onClick={() => setShowBengali(!showBengali)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-medium transition-all shadow-md"
            >
              {showBengali ? '🇧🇩 Hide Bengali' : '🇧🇩 Show Bengali'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
          {['simple', 'workbench', 'litmus', 'socratic', 'mcq'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab === 'simple' && '⚡ In Very Simple Language'}
              {tab === 'workbench' && '🔬 Dissected Workbench'}
              {tab === 'litmus' && '🧪 Diagnostic Litmus Lab'}
              {tab === 'socratic' && '🎓 Socratic Workshop'}
              {tab === 'mcq' && '📝 Practice MCQ (25+)'}
            </button>
          ))}
        </div>

        {/* Tab 1: In Very Simple Language */}
        {activeTab === 'simple' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 p-5 rounded-2xl border border-amber-500/30">
              <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>💡</span> Core Concept: Adjuncts vs Complements vs Objects
              </h2>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                An <strong>Adverbial (Adjunct)</strong> provides extra background scenery (Time, Place, Manner, Reason) and is completely optional. A <strong>Complement</strong> completes an identity or quality and cannot be removed without sentence collapse.
              </p>
              {showBengali && (
                <div className="mt-3 p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200">
                  🇧🇩 <strong>সহজ কথায়:</strong> Adverbial হলো ইচ্ছাধীন অলঙ্কার (মুছে ফেলা যায়)। Complement হলো বাধ্যতামূলক পরিপূরক (মুছে ফেললে বাক্য অর্থহীন হয়ে যায়)।
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
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-amber-300 text-base font-bold tracking-wide">
                    "{item.sentence}"
                  </div>

                  {/* Exploded Token Cards */}
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
                      <strong>🔍 Diagnostic Query:</strong> {item.queryTest}
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
                      <strong>⚖️ Litmus Proof:</strong> {item.proofTest}
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

        {/* Tab 2: Dissected Workbench */}
        {activeTab === 'workbench' && (
          <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {workbenchExamples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedExample(i)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                    selectedExample === i
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {ex.domain}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="text-lg font-mono text-amber-300 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center font-bold">
                "{workbenchExamples[selectedExample].sent}"
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30">
                  <span className="text-xs uppercase text-sky-400 font-bold block">Subject</span>
                  <span className="text-base font-bold text-white mt-1 block">{workbenchExamples[selectedExample].s}</span>
                </div>
                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30">
                  <span className="text-xs uppercase text-purple-400 font-bold block">Verb Core</span>
                  <span className="text-base font-bold text-white mt-1 block">{workbenchExamples[selectedExample].v}</span>
                </div>
                {workbenchExamples[selectedExample].elements.map((el, i) => (
                  <div key={i} className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30">
                    <span className="text-xs uppercase text-amber-400 font-bold block">{el.name}</span>
                    <span className="text-base font-bold text-white mt-1 block">{el.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Litmus Lab */}
        {activeTab === 'litmus' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-lg">🧪 3-Way Diagnostic Matrix</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {litmusTests.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-mono text-sm text-amber-300 font-bold">"{t.sentence}"</div>
                  <div className="text-xs text-sky-300">Target Token: <span className="underline font-semibold">{t.token}</span></div>
                  <div className="text-xs font-bold text-emerald-400">Classified Role: {t.role}</div>
                  <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">{t.check}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Socratic Workshop */}
        {activeTab === 'socratic' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <span>🎓</span> Socratic Dialogue: The Omission Test with Mentor Sukanta Sir
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-200">
                <strong>Debangshu:</strong> "Sir, why is 'at noon' an adverbial, but 'hungry' in 'Swadeep felt hungry' a complement?"
              </div>
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
                <strong>Sukanta Sir:</strong> "Apply the Omission Razor! If you delete 'at noon' from 'The bell rang at noon', 'The bell rang' remains a 100% complete clause. But if you delete 'hungry' from 'Swadeep felt hungry', '*Swadeep felt' is ungrammatical. 'Hungry' is an obligatory complement completing the subject!"
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                <strong>Abhronila:</strong> "So adverbials are optional background decorations, while complements are core structural beams?"
              </div>
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200">
                <strong>Sukanta Sir:</strong> "Precisely! Complements satisfy the valency requirement of copular or complex transitive verbs."
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: MCQ */}
        {activeTab === 'mcq' && (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <FAQTemplate title="Topic 7: Adverbials vs Complements vs Objects" questions={topic7Questions} />
          </div>
        )}

        <Teacher />
        <PlainTextPrint />
      </div>
    </div>
  );
};

export default Topic7;
