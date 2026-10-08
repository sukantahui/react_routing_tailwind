import React, { useState } from 'react';
import { 
  Globe, Landmark, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Layers, ArrowRight, ExternalLink, Search 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

const NationalPortalExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState('citizens');

  const categories = {
    citizens: {
      title: 'Services for Citizens',
      color: 'text-sky-400',
      items: [
        { name: 'Birth & Death Certificates', desc: 'Apply online for vital event registration across municipal corporations' },
        { name: 'Aadhaar Card Services', desc: 'Download e-Aadhaar, book enrollment appointments, update address' },
        { name: 'PAN Card Application', desc: 'Apply for fresh Permanent Account Number or corrections through NSDL/UTI' },
        { name: 'Utility Bill Payments', desc: 'Pay electricity, water, municipal property tax, and LPG gas cylinders online' }
      ]
    },
    business: {
      title: 'Services for Businesses & Commerce',
      color: 'text-emerald-400',
      items: [
        { name: 'Company Registration (MCA21)', desc: 'Online incorporation of Private Limited, LLP, and One Person Companies' },
        { name: 'GST Registration & e-Filing', desc: 'Unified tax filing portal for monthly GSTR-1 and GSTR-3B submissions' },
        { name: 'Import-Export Code (IEC)', desc: 'Directorate General of Foreign Trade (DGFT) digital registration' },
        { name: 'GeM (Government e-Marketplace)', desc: 'Public procurement platform for goods and services required by government' }
      ]
    },
    overseas: {
      title: 'Services for Non-Resident Indians (NRIs) & Overseas',
      color: 'text-amber-400',
      items: [
        { name: 'Consular Services (MADAD)', desc: 'Consular Grievance Monitoring System for Indians residing abroad' },
        { name: 'e-Visa for International Visitors', desc: 'Electronic Travel Authorization for tourists and business delegates' },
        { name: 'OCI (Overseas Citizen of India)', desc: 'Application submission, document verification, and status tracking' },
        { name: 'Attestation of Documents', desc: 'Digital apostille and legal attestation of educational certificates' }
      ]
    }
  };

  const current = categories[selectedCategory];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Landmark size={20} />
          <span>The National Portal of India (india.gov.in) Single-Window Directory</span>
        </div>

        {/* Portal URL Header */}
        <div className="p-4 bg-gradient-to-r from-sky-950/60 to-slate-900 border border-sky-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Official Gateway</span>
            <div className="text-xl font-extrabold text-white font-mono flex items-center gap-2">
              <Globe className="text-emerald-400" size={20} /> india.gov.in
            </div>
            <p className="text-xs text-slate-300">Developed & maintained by the National Informatics Centre (NIC), Ministry of Electronics & IT.</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full border border-emerald-500/30">
            Single-Window Access
          </span>
        </div>

        {/* Category Selector */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(categories).map(([k, cat]) => (
            <button
              key={k}
              onClick={() => setSelectedCategory(k)}
              className={"px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all " + (
                selectedCategory === k 
                  ? "bg-sky-500 text-white shadow-lg" 
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {current.items.map((item, idx) => (
            <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className={"font-bold text-xs " + current.color}>{item.name}</span>
                <CheckCircle2 size={14} className="text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default function Topic4() {
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
                Module 002_001 · Topic 4
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                National Gateway
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              The National Portal of India (india.gov.in) and Key Public Services
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the design, architecture, and civic service catalog of India's flagship single-window national digital portal (india.gov.in).
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. National Portal Lab', icon: BookOpen },
            { id: 'structure', label: '2. Portal Architecture', icon: Layers },
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
            <NationalPortalExplorer />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Remember that india.gov.in is known as the 'Single-Window Portal of India'. It acts as a comprehensive umbrella directory linking over 12,000+ state and central government services!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'structure' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                <Landmark size={18} /> 3-Tier E-Governance Portal Structure in India
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-sky-400">1. National Level</span>
                  <p className="text-slate-300">Central Ministries, Passport, Railways (IRCTC), Income Tax, UIDAI (Aadhaar).</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-emerald-400">2. State Level</span>
                  <p className="text-slate-300">State Land Records (e.g. Banglarbhumi, Bhulekh), State Transport, Higher Secondary Boards.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="font-bold text-amber-400">3. Local Municipal Level</span>
                  <p className="text-slate-300">Municipal property tax assessment, water bill payment, trade licenses, birth/death registration.</p>
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
                <p>• <strong>Exact URL:</strong> The official URL of the National Portal of India is <code>india.gov.in</code> (not .com or .org). Always write the complete domain name in exams.</p>
                <p>• <strong>National Informatics Centre (NIC):</strong> The National Portal is designed and maintained by NIC under MeitY.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 4 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic4_National_Portal_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
