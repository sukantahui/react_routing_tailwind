import React, { useState } from 'react';
import { 
  Download, FileText, CheckSquare, BookOpen, Sparkles, HelpCircle, 
  ExternalLink, ShieldCheck, FolderDown, Layers, AlertTriangle, CheckCircle2 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import masterSummary from "./topic8_files/002_002_ecommerce_master_summary.txt?raw";

const downloadableFiles = [
  {
    title: 'Master Module Revision Summary (Comprehensive Topics 0-7)',
    filename: '002_002_ecommerce_master_summary.txt',
    content: masterSummary,
    desc: 'Complete high-density revision document covering E-Commerce advantages, portal taxonomy, shopping cart mechanics, e-business risks, HTTPS/SSL, 2FA, and webinars.',
    size: '14 KB',
    badge: 'Master Guide'
  },
  {
    title: 'Topic 0: E-Commerce Concept & Customer Advantages Notes',
    filename: 'topic0_note.txt',
    content: noteText,
    desc: 'Traditional commerce vs e-commerce, 24x7 shopping convenience, price comparisons, and doorstep delivery mechanics.',
    size: '3.6 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 1: Popular E-Commerce vs E-Learning Portals Notes',
    filename: 'topic1_note.txt',
    content: noteText,
    desc: 'Amazon, Flipkart, Snapdeal, Nykaa, Infibeam vs Coursera, edX, SWAYAM, NPTEL, and Khan Academy categorization.',
    size: '3.8 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 2: Virtual Shopping Cart Functionality Notes',
    filename: 'topic2_note.txt',
    content: noteText,
    desc: 'Session state persistence, item quantity management, promotional coupon validation, and checkout gateway handshake.',
    size: '4.0 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 3: E-Business Benefits, Opportunities & Barriers Notes',
    filename: 'topic3_note.txt',
    content: noteText,
    desc: 'E-Business vs E-Commerce superset architecture, enterprise cost reductions, digital divide, and adoption barriers.',
    size: '3.9 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 4: Major E-Business Risks (Privacy, Downtime, Hackers) Notes',
    filename: 'topic4_note.txt',
    content: noteText,
    desc: 'DPDP Act 2023, peak-hour festive traffic crashes, Load Balancers, Auto-scaling, SQL injection, and WAF defense.',
    size: '4.2 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 5: Online Transaction Safety: 7 Golden Rules Notes',
    filename: 'topic5_note.txt',
    content: noteText,
    desc: 'Consumer safety precautions, phishing defense, Vishing scams, virtual keyboards, and helpline 1930.',
    size: '3.7 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 6: HTTPS, SSL Padlock & Multi-Factor Authentication Notes',
    filename: 'topic6_note.txt',
    content: noteText,
    desc: 'Port 443 TLS encryption, public Wi-Fi eavesdropping dangers, 3 factors of MFA, and CVV non-storage mandate.',
    size: '4.1 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 7: Webinars & Real-Time E-Learning Architecture Notes',
    filename: 'topic7_note.txt',
    content: noteText,
    desc: 'Synchronous vs asynchronous learning, WebRTC streaming, screen sharing, live polls, Q&A pods, and breakout rooms.',
    size: '3.8 KB',
    badge: 'Notes'
  }
];

const revisionChecklist = [
  'Can you clearly state 3 distinct advantages of E-Commerce for consumers over physical stores? (24x7 convenience, global catalog, real-time price comparisons)',
  'Can you categorize portals into E-Commerce (Nykaa, Snapdeal, Amazon) and E-Learning / MOOCs (Coursera, edX, SWAYAM)?',
  'Do you know the 4 primary functions of a Virtual Shopping Cart? (Session state persistence, item quantity management, tax/discount calculation, and checkout handshake)',
  'Can you explain why E-Commerce is a subset of E-Business? (E-Business also includes ERP, CRM, SCM, and internal corporate intranets)',
  'Can you enumerate the 3 major e-business risks tested in CBSE IT 802? (Customer Privacy Violations, Peak-Hour Server Downtime, Hacker Infiltration)',
  'What causes peak-hour server downtime and how do Load Balancers & Cloud Auto-Scaling prevent HTTP 503 errors?',
  'What are the 3 independent factor categories of Multi-Factor Authentication (MFA)? (Something you KNOW, Something you HAVE, Something you ARE)',
  'Why are e-commerce merchants strictly prohibited from saving customer CVV codes in their databases under RBI & PCI-DSS rules?',
  'What is the official National Cybercrime Helpline number and portal in India? (1930 / cybercrime.gov.in)',
  'What is a Webinar, and how does synchronous real-time learning differ from asynchronous pre-recorded video courses?'
];

export default function Topic8() {
  const [activeTab, setActiveTab] = useState('downloads');
  const [checkedItems, setCheckedItems] = useState({});

  const handleDownload = (filename, content) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const toggleCheck = (idx) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const tabs = [
    { id: 'downloads', label: '1. Download Materials', icon: FolderDown },
    { id: 'checklist', label: '2. High-Yield Checklist', icon: CheckSquare },
    { id: 'summary', label: '3. Full Master Summary', icon: BookOpen },
    { id: 'faqs', label: '4. FAQs (25 Qs)', icon: HelpCircle },
    { id: 'notes', label: '5. Plain Text Notes', icon: FileText }
  ];

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002_002 · Topic 8
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Downloadable Resource Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Downloadable Documents & Master Revision Hub
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Access curated study summaries, plain text downloadable notes, and an interactive high-yield board examination checklist for E-Commerce, E-Business, and Online Safety.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
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

        {/* TAB 1: DOWNLOADABLE FILES */}
        {activeTab === 'downloads' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {downloadableFiles.map((file, fIdx) => (
                <div key={fIdx} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between hover:border-slate-700 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {file.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{file.size}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">{file.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{file.desc}</p>
                  </div>

                  <button
                    onClick={() => handleDownload(file.filename, file.content)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-sky-500 text-slate-300 hover:text-white border border-slate-800 hover:border-sky-400 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Download size={14} />
                    <span>Download {file.filename}</span>
                  </button>
                </div>
              ))}
            </div>

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Download the '002_002_ecommerce_master_summary.txt' file onto your phone or laptop. It contains high-density revision points and comparative tables covering all topics from Topic 0 through Topic 7, perfect for last-minute review before your CBSE Class XII IT board exam!"
            />
          </div>
        )}

        {/* TAB 2: HIGH-YIELD CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                  <CheckSquare size={18} /> Board Examination High-Yield Self-Assessment Checklist
                </h3>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {Object.values(checkedItems).filter(Boolean).length} / {revisionChecklist.length} Mastered
                </span>
              </div>

              <div className="space-y-2.5">
                {revisionChecklist.map((item, cIdx) => {
                  const isDone = !!checkedItems[cIdx];
                  return (
                    <div
                      key={cIdx}
                      onClick={() => toggleCheck(cIdx)}
                      className={"p-3.5 rounded-xl border text-xs transition-all cursor-pointer flex items-start gap-3 " + (
                        isDone 
                          ? "bg-emerald-950/20 border-emerald-500/40 text-slate-200" 
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                      )}
                    >
                      <div className={"w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 " + (
                        isDone ? "bg-emerald-500 border-emerald-400 text-slate-950" : "border-slate-700 bg-slate-950"
                      )}>
                        {isDone && <CheckCircle2 size={14} />}
                      </div>
                      <span className={isDone ? "font-semibold text-white" : ""}>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FULL MASTER SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[600px]">
              {masterSummary}
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 8 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic8_Downloadable_Documents_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
