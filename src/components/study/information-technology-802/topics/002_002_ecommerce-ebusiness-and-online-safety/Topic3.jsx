import React, { useState } from 'react';
import { 
  Briefcase, TrendingUp, ShieldAlert, Ban, CheckCircle2, 
  XCircle, AlertTriangle, HelpCircle, FileText, Sparkles, 
  BookOpen, Layers, ArrowRight, Zap, RefreshCw, BarChart2, Globe, Lock 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const EBusinessEcosystemExplorer = () => {
  const [activeTab, setActiveTab] = useState('benefits');

  const swotData = {
    benefits: {
      title: "Core Enterprise Benefits & Strategic Advantages",
      icon: TrendingUp,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/10",
      points: [
        { title: "Global Market Reach", desc: "Access international and pan-India buyers without capital-intensive physical retail branches." },
        { title: "Low Overhead Expenses", desc: "Substantial savings on prime real-estate rent, showroom air conditioning, and sales counter staff." },
        { title: "24x7x365 Continuous Sales", desc: "Automated digital storefronts take customer orders round-the-clock without closing." },
        { title: "Automated Supply Chain", desc: "Real-time stock alerts and automated B2B e-procurement eliminate warehouse stockouts." }
      ]
    },
    opportunities: {
      title: "Emerging Market Opportunities & Growth Vectors",
      icon: Globe,
      color: "text-sky-400",
      border: "border-sky-500/30",
      bg: "bg-sky-500/10",
      points: [
        { title: "AI-Powered Personalization", desc: "Machine learning algorithms recommend tailored products, boosting conversion rates and Average Order Value." },
        { title: "Direct-to-Consumer (D2C)", desc: "Manufacturers bypass wholesale distributors and retail markups, capturing higher profit margins." },
        { title: "Voice & Regional M-Commerce", desc: "Vernacular language interfaces and voice search empower millions of rural smartphone users." },
        { title: "Omnichannel Integration", desc: "Unifying online catalogs with offline Click-and-Collect store pickups creates seamless consumer loyalty." }
      ]
    },
    risks: {
      title: "Operational Risks & Cyber Vulnerabilities",
      icon: ShieldAlert,
      color: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-500/10",
      points: [
        { title: "Peak-Traffic Server Crashes", desc: "Unprecedented festive traffic spikes causing HTTP 503 errors and direct revenue destruction." },
        { title: "Customer Privacy Breaches", desc: "Unsecured databases leaking phone numbers, addresses, and transaction histories leading to regulatory penalties." },
        { title: "Hacker Infiltration & Ransomware", desc: "SQL injection, payment gateway sniffing, and ransomware encrypting business inventory databases." },
        { title: "Reputational Social Media Backlash", desc: "Single service failures escalating rapidly on viral social platforms damaging enterprise brand equity." }
      ]
    },
    barriers: {
      title: "Adoption Barriers & Structural Hurdles",
      icon: Ban,
      color: "text-rose-400",
      border: "border-rose-500/30",
      bg: "bg-rose-500/10",
      points: [
        { title: "The Digital Divide", desc: "Uneven broadband penetration and smartphone literacy disparities across tier-3 and rural regions." },
        { title: "Lack of Physical Touch & Feel", desc: "Consumer reluctance in purchasing clothing, jewelry, and footwear without in-person physical trial." },
        { title: "Cybersecurity Apprehensions", desc: "Consumer fear of credit card cloning, phishing links, and fake lookalike merchant websites." },
        { title: "High Reverse Logistics Burden", desc: "Cost of managing product returns, restocking returned items, and refund processing eating up margins." }
      ]
    }
  };

  const current = swotData[activeTab];
  const Icon = current.icon;

  return (
    <div className="space-y-6">
      <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-750 pb-3">
          <Briefcase size={20} />
          <span>Interactive Enterprise Matrix: E-Business Ecosystem Explorer</span>
        </div>

        {/* Quadrant Selector Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            { id: 'benefits', label: '1. Strategic Benefits', icon: TrendingUp, color: 'text-emerald-400' },
            { id: 'opportunities', label: '2. Market Opportunities', icon: Globe, color: 'text-sky-400' },
            { id: 'risks', label: '3. Operational Risks', icon: ShieldAlert, color: 'text-amber-400' },
            { id: 'barriers', label: '4. Adoption Barriers', icon: Ban, color: 'text-rose-400' }
          ].map(b => {
            const BIcon = b.icon;
            return (
              <button
                key={b.id}
                onClick={() => setActiveTab(b.id)}
                className={"p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between " + (
                  activeTab === b.id
                    ? "bg-slate-800 border-sky-500 text-white shadow-lg shadow-sky-500/10"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                )}
              >
                <div className="flex items-center gap-2 font-bold text-xs">
                  <BIcon size={16} className={activeTab === b.id ? b.color : "text-slate-500"} />
                  <span>{b.label}</span>
                </div>
                <ArrowRight size={14} className={activeTab === b.id ? "text-sky-400" : "text-slate-600"} />
              </button>
            );
          })}
        </div>

        {/* Selected Quadrant Detailed Card */}
        <div className={"p-6 rounded-2xl border " + current.border + " " + current.bg + " space-y-4"}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
              <Icon size={24} className={current.color} />
            </div>
            <h3 className="text-lg font-extrabold text-white">{current.title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {current.points.map((pt, pIdx) => (
              <div key={pIdx} className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
                <span className={"text-xs font-bold block " + current.color}>
                  {pIdx + 1}. {pt.title}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{pt.desc}</p>
              </div>
            ))}
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
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002_002 · Topic 3
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Enterprise Ecosystem
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              E-Business: Enterprise Opportunities, Strategic Benefits, Risks and Market Barriers
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Analyze how digital technologies transform corporate business operations, explore operational cost reductions, and examine systemic barriers like the digital divide and cyber fraud apprehension.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Ecosystem Lab', icon: BookOpen },
            { id: 'matrix', label: '2. E-Business vs E-Commerce', icon: Layers },
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

        {/* TAB 1: ECOSYSTEM LAB */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <EBusinessEcosystemExplorer />

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Remember this clear distinction for your exams: E-Commerce is strictly transactional (buying & selling online). E-Business is the complete digital enterprise (E-Commerce + ERP + CRM + SCM + E-Procurement + HR Intranet). When asked about 'Barriers of E-Business', always cite: (1) Lack of physical touch/feel, (2) Digital divide / rural bandwidth limits, and (3) Cyber security fears."
            />
          </div>
        )}

        {/* TAB 2: E-BUSINESS VS E-COMMERCE */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> E-Business vs E-Commerce Scope Matrix
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                      <th className="p-3">Dimension</th>
                      <th className="p-3 text-sky-400">E-Business (Superset)</th>
                      <th className="p-3 text-amber-400">E-Commerce (Subset)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Conceptual Scope</td>
                      <td className="p-3">All electronic business processes and internal workflows</td>
                      <td className="p-3">Commercial transactions involving buying and selling goods/services</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Target Stakeholders</td>
                      <td className="p-3">Employees, vendors, suppliers, distributors, partners, consumers</td>
                      <td className="p-3">Primarily buyers (consumers) and sellers (merchants)</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Core Software Systems</td>
                      <td className="p-3">ERP (SAP/Oracle), CRM (Salesforce), SCM, Intranet, E-Procurement</td>
                      <td className="p-3">Product Catalog, Shopping Cart, Payment Gateway, Courier API</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Network Infrastructure</td>
                      <td className="p-3">Internet + Secure Private Intranets + B2B Extranets</td>
                      <td className="p-3">Primarily Public Internet and Mobile App networks</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOARD PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-850/60 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Traps</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Trap 1: Stating E-Business and E-Commerce are synonyms</p>
                  <p className="text-slate-400">Never write that E-Commerce and E-Business are the same. State clearly that E-Commerce is a specialized subset of E-Business.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Trap 2: Confusing 'Risks' with 'Barriers'</p>
                  <p className="text-slate-400">Risks are active operational vulnerabilities of running an e-business (e.g. server crashes, hacker penetration). Barriers are hurdles preventing customers or merchants from adopting it (e.g. digital divide, lack of physical product trial).</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 3 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic3_EBusiness_Benefits_Risks_Barriers_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
