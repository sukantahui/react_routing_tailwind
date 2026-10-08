import React, { useState } from 'react';
import { 
  ShieldCheck, Eye, Users, FileCheck2, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Layers, CheckCircle2, Award, Scale 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const SmartGovernanceWheel = () => {
  const [selectedPillar, setSelectedPillar] = useState('transparent');

  const pillars = {
    simple: {
      letter: 'S',
      title: 'Simple',
      color: 'text-sky-400',
      desc: 'Simplification of government rules, user-friendly digital forms, and removing bureaucratic red-tape.',
      benefit: 'Citizens can apply for caste, income, and birth certificates with minimal documentation.'
    },
    moral: {
      letter: 'M',
      title: 'Moral',
      color: 'text-emerald-400',
      desc: 'Ethical governance ensuring fairness, anti-corruption safeguards, and objective public tenders.',
      benefit: 'E-procurement and digital auction portals prevent bribery and backdoor favoritism.'
    },
    accountable: {
      letter: 'A',
      title: 'Accountable',
      color: 'text-purple-400',
      desc: 'Clear digital audit trails where every administrative action and file timestamp is tracked.',
      benefit: 'Officials are answerable for processing delays under the Right to Public Services acts.'
    },
    responsive: {
      letter: 'R',
      title: 'Responsive',
      color: 'text-amber-400',
      desc: 'Speedy redressal of citizen grievances through grievance redressal portals (e.g. CPGRAMS).',
      benefit: 'Citizens can track complaints online with guaranteed statutory turnaround timelines.'
    },
    transparent: {
      letter: 'T',
      title: 'Transparent',
      color: 'text-rose-400',
      desc: 'Public disclosure of government budgets, welfare beneficiary lists, and policy decisions online.',
      benefit: 'Citizens can verify municipal project fund allocations and public welfare beneficiary registries.'
    }
  };

  const active = pillars[selectedPillar];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Scale size={20} />
          <span>The SMART Governance Model & Anti-Corruption Framework</span>
        </div>

        {/* 5 SMART Letter Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(pillars).map(([k, p]) => (
            <button
              key={k}
              onClick={() => setSelectedPillar(k)}
              className={"p-3 rounded-2xl text-center border transition-all cursor-pointer " + (
                selectedPillar === k 
                  ? "bg-slate-800 border-sky-500 shadow-lg scale-105" 
                  : "bg-slate-900 border-slate-800 hover:border-slate-700"
              )}
            >
              <div className={"text-xl sm:text-2xl font-black " + p.color}>{p.letter}</div>
              <div className="text-[10px] font-bold text-slate-300 hidden sm:block mt-1">{p.title}</div>
            </button>
          ))}
        </div>

        {/* Pillar Details Card */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className={"text-lg font-extrabold " + active.color}>
              {active.letter} &mdash; {active.title} Governance
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">
              Core Objective
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {active.desc}
          </p>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <CheckCircle2 size={16} className={"shrink-0 mt-0.5 " + active.color} />
            <span><strong>Citizen Impact:</strong> {active.benefit}</span>
          </div>
        </div>

        {/* 4 Interaction Models */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <span className="text-sky-400 font-bold block">G2C</span>
            <span className="text-[10px] text-slate-400">Gov to Citizen</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <span className="text-emerald-400 font-bold block">G2B</span>
            <span className="text-[10px] text-slate-400">Gov to Business</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <span className="text-purple-400 font-bold block">G2G</span>
            <span className="text-[10px] text-slate-400">Gov to Gov</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <span className="text-amber-400 font-bold block">G2E</span>
            <span className="text-[10px] text-slate-400">Gov to Employee</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic3() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002_001 · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Civic Governance
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Concept and Objectives of E-Governance: Enhancing Transparency, Accountability, and Citizen Empowerment
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the definition, objectives, and SMART governance paradigm of E-Governance, and discover how digital service delivery eliminates corruption and empowers citizens.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. SMART Governance Lab', icon: BookOpen },
            { id: 'models', label: '2. E-Governance Models', icon: Layers },
            { id: 'pitfalls', label: '3. Board Tips & Pitfalls', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Plain Text Notes', icon: FileText }
          ].map((tab) => {
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
            <SmartGovernanceWheel />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Always remember the full form of SMART Governance: Simple, Moral, Accountable, Responsive, and Transparent. This 5-point definition is an examiner favorite in subjective theory questions!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'models' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                <Layers size={18} /> The 4 Core Delivery Models of E-Governance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-sky-400">1. G2C (Government to Citizen)</span>
                  <p className="text-slate-300">Public services delivered directly to citizens: Passport application, DigiLocker, driving licence renewal, electricity bill payments.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">2. G2B (Government to Business)</span>
                  <p className="text-slate-300">Services connecting businesses with government: GST e-Filing, corporate registrations (MCA21), e-Tenders, export/import licences.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-purple-400">3. G2G (Government to Government)</span>
                  <p className="text-slate-300">Inter-departmental data exchange: Sharing crime records between state police departments via CCTNS, national tax intelligence sharing.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-amber-400">4. G2E (Government to Employee)</span>
                  <p className="text-slate-300">Internal administrative management: Online employee payroll, leave management, pension processing, e-Service books.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3 */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Tips</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <p>• <strong>E-Governance vs E-Government:</strong> E-Government refers to the IT infrastructure (servers, networks), whereas E-Governance is the broader transformational process of delivering citizen-centric services with transparency.</p>
                <p>• <strong>Elimination of Middlemen:</strong> Always state that Direct Benefit Transfer (DBT) directly credits welfare funds to Aadhaar-linked bank accounts, eliminating corrupt intermediaries.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 3 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic3_EGovernance_Objectives_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
