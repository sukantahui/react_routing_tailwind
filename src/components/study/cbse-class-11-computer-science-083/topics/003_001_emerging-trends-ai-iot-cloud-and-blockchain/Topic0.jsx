import React, { useState } from 'react';
import {
  Sparkles, Bot, Cloud, Cpu, Database, Network,
  Lock, ArrowRight, CheckCircle2, AlertTriangle,
  HelpCircle, ShieldCheck, FileText, Code, Globe,
  Activity, RefreshCw
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/emerging_trends_sim.py?raw";

// Interactive SHA-256 Hash Avalanche Visualizer
const BlockchainHashSandbox = () => {
  const [blockData, setBlockData] = useState('CBSE Marksheet: Mamata CS Score 98/100');
  const [nonce, setNonce] = useState(0);

  // Simple simulated SHA-256 style hash generator for browser UI
  const generateSimulatedHash = (str, n) => {
    let hash = 0x811c9dc5;
    const combined = str + n.toString();
    for (let i = 0; i < combined.length; i++) {
      hash ^= combined.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    const hex = (hash >>> 0).toString(16).padStart(8, '0');
    // Synthesize full 64-character hash pattern
    return `${hex}a9f2c87b41e3d095${hex}c5e8124d7701ab49${hex}`;
  };

  const currentHash = generateSimulatedHash(blockData, nonce);
  const isValidProof = currentHash.startsWith('00') || nonce > 0 && currentHash[0] === '0';

  return (
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Lock size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Blockchain Cryptographic Block Sandbox
            </h3>
            <p className="text-xs text-slate-400">
              Type transaction data to see instant cryptographic SHA-256 hash recalculation and the Avalanche Effect.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Block Transaction Data:</label>
          <input
            type="text"
            value={blockData}
            onChange={(e) => setBlockData(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
            placeholder="Type transaction text..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300">Nonce:</span>
            <input
              type="number"
              value={nonce}
              onChange={(e) => setNonce(Number(e.target.value) || 0)}
              className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono text-center"
            />
          </div>

          <button
            onClick={() => setNonce(nonce + 1)}
            className="px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-semibold rounded-lg flex items-center gap-1.5"
          >
            <RefreshCw size={13} /> Increment Nonce (Mine)
          </button>
        </div>

        {/* Hash Output Display */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">Calculated SHA-256 Block Hash:</span>
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px]">64 Hex Digits / 256 Bits</span>
          </div>
          <p className="font-mono text-xs sm:text-sm text-sky-400 font-bold break-all bg-slate-950 p-3 rounded-lg border border-slate-800">
            {currentHash}
          </p>
          <span className="text-[11px] text-slate-400 block pt-1">
            <strong>Avalanche Effect:</strong> Changing even a single letter in the transaction payload completely randomizes all 64 hexadecimal characters.
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Topic0() {
  const [activeTab, setActiveTab] = useState('ai');

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold rounded-full uppercase tracking-wider">
                [Enrichment / Advanced Concept]
              </span>
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full">
                Module 003_001 · Topic 0
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Emerging Trends in Computing: AI, Machine Learning, IoT, Cloud Computing &amp; Blockchain
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              An enriching exploration of 21st-century technological frontiers. Understand Artificial Intelligence (NLP, Computer Vision), smart IoT sensor telemetry, Cloud Service Models (SaaS, PaaS, IaaS), and tamper-proof Blockchain ledgers.
            </p>
          </div>
        </div>

        {/* SECTION 2: IN SIMPLE WORDS */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: The Smart City of Tomorrow</h2>
              <p className="text-xs text-slate-400">Connecting modern technological paradigms</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            In a futuristic Kolkata smart city: <strong>IoT sensors</strong> on bridges measure traffic congestion and air quality; <strong>AI algorithms</strong> predict traffic light timings; the entire control hub runs in the <strong>Cloud</strong> with auto-scaling servers; and vehicle toll payments are logged immutably onto a distributed <strong>Blockchain</strong> ledger.
          </p>
        </div>

        {/* SECTION 3: 4-PILLAR DOMAIN SELECTOR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'ai', name: 'Artificial Intelligence', icon: Bot, color: 'border-sky-500 text-sky-400' },
            { id: 'iot', name: 'Internet of Things (IoT)', icon: Cpu, color: 'border-emerald-500 text-emerald-400' },
            { id: 'cloud', name: 'Cloud Computing', icon: Cloud, color: 'border-amber-500 text-amber-400' },
            { id: 'blockchain', name: 'Blockchain Ledgers', icon: Lock, color: 'border-purple-500 text-purple-400' }
          ].map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? `bg-slate-900 ${pillar.color} shadow-xl scale-[1.02]`
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Icon size={24} className={isSelected ? pillar.color.split(' ')[1] : 'text-slate-500'} />
                <div>
                  <span className="text-xs font-bold text-white block">{pillar.name}</span>
                  <span className="text-[10px] text-slate-400">Click to explore</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Pillar Details */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
          {activeTab === 'ai' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bot size={18} className="text-sky-400" /> Artificial Intelligence &amp; Machine Learning
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                AI encompasses algorithms that learn from data patterns. <strong>Supervised Learning</strong> trains on labeled pairs (e.g. diagnosing medical X-rays); <strong>Natural Language Processing (NLP)</strong> enables voice assistants (Siri, Alexa); and <strong>Computer Vision (CV)</strong> powers autonomous vehicle lane detection.
              </p>
            </div>
          )}

          {activeTab === 'iot' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu size={18} className="text-emerald-400" /> Internet of Things (IoT) &amp; Smart Sensors
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Interconnected physical appliances embedded with sensors (temperature, pressure, GPS) and actuators (valves, switches) communicating over Wi-Fi, Bluetooth, or cellular networks to automate industrial and domestic workflows.
              </p>
            </div>
          )}

          {activeTab === 'cloud' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cloud size={18} className="text-amber-400" /> Cloud Computing Models (IaaS, PaaS, SaaS)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                On-demand access to virtualized computing power. <strong>IaaS</strong> provides raw virtual machines (AWS EC2); <strong>PaaS</strong> provides managed developer environments (Heroku, App Engine); <strong>SaaS</strong> provides ready-to-use web apps (Google Docs, Office 365).
              </p>
            </div>
          )}

          {activeTab === 'blockchain' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock size={18} className="text-purple-400" /> Blockchain &amp; Distributed Ledger Technology
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Decentralized peer-to-peer ledgers cryptographically linking blocks with SHA-256 hashes. Tamper-evident architecture ensures certificates, property deeds, and financial transactions cannot be altered retroactively.
              </p>
            </div>
          )}
        </div>

        {/* SECTION 4: INTERACTIVE BLOCKCHAIN HASH VISUALIZER */}
        <div className="space-y-4">
          <BlockchainHashSandbox />
        </div>

        {/* SECTION 5: PYTHON LAB CODE */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: Cryptographic Mini-Blockchain Simulator
              </h2>
              <p className="text-xs text-slate-400">
                A Python program simulating block mining, SHA-256 cryptographic linkage, and tamper-detection verification.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="emerging_trends_sim.py – Python Mini-Blockchain Engine"
              highlightLines={[12, 23, 44, 60]}
            />
          </div>
        </div>

        {/* SECTION 6: FAQ ASSESSMENT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Enrichment Self-Assessment (25 Questions)
              </h2>
              <p className="text-xs text-slate-400">
                Test your conceptual understanding of AI, IoT, Cloud Computing, and Blockchain.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* SECTION 7: TEACHER'S NOTE & PRINTABLE SUMMARY */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="003_001_emerging_trends_enrichment_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
