import React, { useState } from 'react';
import { 
  TrendingUp, Users, Building, ShieldCheck, Clock, Coins, Sparkles, 
  HelpCircle, CheckCircle2, Zap, Leaf, Scale, AlertTriangle, FileText, Layers 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

const benefitsData = [
  {
    category: 'Social Benefits',
    icon: Users,
    color: 'from-blue-600 to-cyan-600',
    textColor: 'text-cyan-300',
    badge: 'Citizen Empowerment & Inclusivity',
    points: [
      {
        title: 'Elimination of Middlemen & Touts',
        desc: 'Direct citizen-to-government interaction eliminates corrupt touts and commission agents at government offices.'
      },
      {
        title: 'Universal 24x7 Inclusivity',
        desc: 'Services are available 365 days a year from home or local Common Service Centres (CSCs) across rural areas.'
      },
      {
        title: 'Equality & Impartiality',
        desc: 'First-come-first-served automated processing ensures equal treatment without VIP biases or harassment.'
      },
      {
        title: 'Empowerment of Vulnerable Sections',
        desc: 'Direct Benefit Transfer (DBT) delivers subsidies directly to bank accounts without leakage.'
      }
    ]
  },
  {
    category: 'Economic Benefits',
    icon: Coins,
    color: 'from-emerald-600 to-teal-600',
    textColor: 'text-emerald-300',
    badge: 'Cost Savings & Green Economy',
    points: [
      {
        title: 'Massive Citizen Cost Savings',
        desc: 'Saves travel expenses, taking leave from work, and paying agent commissions for routine civic paperwork.'
      },
      {
        title: 'Paperless Green Governance',
        desc: 'Digital files and cloud lockers (DigiLocker) save millions of reams of paper, protecting forests.'
      },
      {
        title: 'Ease of Doing Business (EoDB)',
        desc: 'Fast-track online company registration, GST filing, and import-export licenses boost the national economy.'
      },
      {
        title: 'Lower Administrative Overhead',
        desc: 'Automated databases reduce government spending on physical storage, manual filing clerks, and postal mail.'
      }
    ]
  },
  {
    category: 'Administrative Benefits',
    icon: Building,
    color: 'from-purple-600 to-indigo-600',
    textColor: 'text-indigo-300',
    badge: 'Transparency & Accountability',
    points: [
      {
        title: 'Complete Audit Trail & Tracking',
        desc: 'Every file movement is timestamped. Citizens can track the exact officer holding their application.'
      },
      {
        title: 'Drastic TAT Reduction',
        desc: 'Turnaround Time (TAT) reduced from months to hours (e.g., instant PAN via Aadhaar e-KYC).'
      },
      {
        title: 'Inter-Departmental Data Sharing',
        desc: 'APIs allow instant verification between CBSE, Passport, Police, and Road Transport databases.'
      },
      {
        title: 'Error-Free Automated Validation',
        desc: 'Client-side and server-side forms check mandatory fields, reducing rejection due to manual typos.'
      }
    ]
  }
];

const smartModel = [
  { letter: 'S', word: 'Simple', desc: 'User-friendly interfaces and plain language replacing complicated bureaucratic rules.' },
  { letter: 'M', word: 'Moral', desc: 'Ethical governance that prevents corruption, bribery, and system manipulation.' },
  { letter: 'A', word: 'Accountable', desc: 'Officials are answerable for processing delays with transparent digital audit trails.' },
  { letter: 'R', word: 'Responsive', desc: 'Fast turnaround time with online grievance redressal (e.g. CPGRAMS portal).' },
  { letter: 'T', word: 'Transparent', desc: 'Public access to policies, government budgets, tender bids, and official records.' }
];

const SmartVisualizer = () => {
  const [selectedSmart, setSelectedSmart] = useState(smartModel[0]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Zap size={20} />
          <span>Interactive SMART Governance Model Architecture</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {smartModel.map((item) => {
            const isSelected = selectedSmart.letter === item.letter;
            return (
              <button
                key={item.letter}
                onClick={() => setSelectedSmart(item)}
                className={"p-3.5 rounded-xl border text-center transition-all cursor-pointer " + (
                  isSelected 
                    ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-950/40 scale-105' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                )}
              >
                <span className="text-2xl font-extrabold font-mono block text-amber-400">{item.letter}</span>
                <span className="text-[11px] font-bold uppercase tracking-wider block mt-1">{item.word}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center font-bold font-mono text-2xl shrink-0">
            {selectedSmart.letter}
          </div>
          <div>
            <h4 className="text-base font-bold text-white mb-1">
              {selectedSmart.letter} stands for <span className="text-amber-300">{selectedSmart.word} Governance</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedSmart.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic6() {
  const [activeTab, setActiveTab] = useState('concept');

  const tabs = [
    { id: 'concept', label: 'SMART Governance & Pillars', icon: Zap },
    { id: 'matrix', label: '3-Pillars Matrix', icon: Layers },
    { id: 'pitfalls', label: 'Challenges & Safeguards', icon: AlertTriangle },
    { id: 'faqs', label: 'Questions & Answers', icon: HelpCircle },
    { id: 'notes', label: 'Revision Notes', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <Zap size={14} />
            <span>CBSE Class XII IT (Subject Code 802) • Unit 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Social, Economic & Administrative Benefits of E-Governance
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Understand how digital governance transforms citizen life across social empowerment, economic efficiency, and administrative transparency.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={"flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer " + (
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                )}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1 */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <SmartVisualizer />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="When asked to describe the benefits of e-governance in 3-mark or 5-mark subjective questions, structure your answer into Social (inclusivity & anti-corruption), Economic (citizen cost savings & green paperless office), and Administrative (accountability & turnaround time reduction) points!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benefitsData.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={"p-2.5 rounded-xl bg-gradient-to-br " + item.color + " text-white shadow-lg"}>
                        <Icon size={20} />
                      </div>
                      <span className={"text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 " + item.textColor}>
                        Pillar {idx + 1}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{item.category}</h4>
                      <p className="text-xs text-slate-400">{item.badge}</p>
                    </div>
                    <div className="space-y-2.5 text-xs text-slate-300">
                      {item.points.map((pt, pIdx) => (
                        <div key={pIdx} className="space-y-0.5">
                          <span className="font-semibold text-slate-200 block">• {pt.title}</span>
                          <p className="text-slate-400 pl-3 text-[11px] leading-relaxed">{pt.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3 */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Challenges in E-Governance & Remedial Measures</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="font-bold text-amber-400 block">1. Digital Divide</span>
                  <p className="text-slate-300">Lack of devices or internet in remote villages.</p>
                  <p className="text-emerald-400 text-[11px]">Remedy: Common Service Centres (CSCs) & Gram Panchayat kiosks.</p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="font-bold text-rose-400 block">2. Cyber Threats & Fraud</span>
                  <p className="text-slate-300">Identity theft and phishing scams targeting citizens.</p>
                  <p className="text-emerald-400 text-[11px]">Remedy: CERT-In security audits & 2FA OTP verification.</p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                  <span className="font-bold text-sky-400 block">3. Language Barriers</span>
                  <p className="text-slate-300">English-only portals isolate regional speakers.</p>
                  <p className="text-emerald-400 text-[11px]">Remedy: Bhashini AI multilingual translation across 22 scheduled languages.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 6 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic6_Benefits_of_EGovernance_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
