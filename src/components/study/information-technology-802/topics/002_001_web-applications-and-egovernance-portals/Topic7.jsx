import React, { useState } from 'react';
import { 
  Download, FileText, CheckSquare, BookOpen, Sparkles, HelpCircle, 
  ExternalLink, ShieldCheck, FolderDown, Layers, AlertTriangle 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";
import masterSummary from "./topic7_files/002_001_egovernance_master_summary.txt?raw";

const downloadableFiles = [
  {
    title: 'Master Module Revision Summary (Comprehensive)',
    filename: '002_001_egovernance_master_summary.txt',
    content: masterSummary,
    desc: 'Complete revision guide covering Web Apps vs Desktop Apps, Front-End vs Back-End, Browsers vs Servers, india.gov.in, Civic Portals & SMART Governance.',
    size: '12 KB',
    badge: 'Master Guide'
  },
  {
    title: 'Topic 0: Web Apps vs Desktop Apps Notes',
    filename: 'topic0_note.txt',
    content: noteText,
    desc: 'Operational differences, client-server models, zero-install advantages, and portability tradeoffs.',
    size: '3.5 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 1: Front-End vs Back-End Tools Notes',
    filename: 'topic1_note.txt',
    content: noteText,
    desc: 'HTML, CSS, JS, NetBeans vs Java, Python, MySQL, Oracle, Node.js with clear demarcation.',
    size: '3.8 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 2: Browsers vs Servers vs Apps Notes',
    filename: 'topic2_note.txt',
    content: noteText,
    desc: 'Rendering engines, Chrome/Firefox/Opera identification, Apache/Nginx server operations.',
    size: '3.6 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 3: E-Governance Concept & SMART Model Notes',
    filename: 'topic3_note.txt',
    content: noteText,
    desc: 'G2C, G2B, G2G, G2E models, SMART governance definition, and accountability impact.',
    size: '4.1 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 4: National Portal of India (india.gov.in) Notes',
    filename: 'topic4_note.txt',
    content: noteText,
    desc: 'Single-window metadata gateway, NIC maintenance, Services/Topics/Acts directories.',
    size: '3.4 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 5: Popular Civic Portals Notes',
    filename: 'topic5_note.txt',
    content: noteText,
    desc: 'Passport Seva, DigiLocker, Parivahan (Sarathi/Vahan), NVSP, IRCTC, Municipal taxes.',
    size: '4.8 KB',
    badge: 'Notes'
  },
  {
    title: 'Topic 6: Social, Economic & Admin Benefits Notes',
    filename: 'topic6_note.txt',
    content: noteText,
    desc: 'Cost reduction, corruption elimination, green governance, and Digital Divide challenges.',
    size: '3.9 KB',
    badge: 'Notes'
  }
];

const revisionChecklist = [
  'Can you clearly contrast Desktop Apps (local CPU/RAM, manual install) with Web Apps (browser-based, zero install)?',
  'Can you classify tools into Front-End (HTML, CSS, JS, React, NetBeans GUI) and Back-End (Java, Node.js, Python, MySQL, Oracle)?',
  'Can you identify web browsers (Opera, Chrome, Firefox, Safari, Edge) among mixed software listings?',
  'Do you know the 4 primary interaction models of E-Governance: G2C, G2B, G2G, and G2E with real examples?',
  'Can you expand SMART Governance: Simple, Moral, Accountable, Responsive, and Transparent?',
  'What is the official URL and maintaining body of the National Portal of India? (india.gov.in by NIC / MeitY)',
  'Which portal handles Driving Licenses (Sarathi) and Vehicle RC (Vahan)? (parivahan.gov.in by MoRTH)',
  'Under what law are digital documents in DigiLocker legally recognized? (Rule 9A of IT Rules / IT Act 2000)',
  'Can you list 3 Social, 3 Economic, and 3 Administrative benefits of E-Governance for citizens?'
];

export default function Topic7() {
  const [activeTab, setActiveTab] = useState('downloads');

  const handleDownload = (filename, content) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const tabs = [
    { id: 'downloads', label: 'Download Study Material', icon: FolderDown },
    { id: 'checklist', label: 'Revision Checklist', icon: CheckSquare },
    { id: 'summary', label: 'Full Summary Document', icon: BookOpen },
    { id: 'faqs', label: 'Questions & Answers', icon: HelpCircle },
    { id: 'notes', label: 'Print Notes', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
            <FolderDown size={14} />
            <span>CBSE Class XII IT (Subject Code 802) • Unit 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Downloadable Documents & Master Revision Hub
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Access curated study summaries, downloadable revision notes, and a high-yield board exam checklist for Web Applications and Indian E-Governance Portals.
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
        {activeTab === 'downloads' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {downloadableFiles.map((file, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800/60 font-semibold">
                        {file.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{file.size}</span>
                    </div>
                    <h3 className="font-bold text-slate-100 text-sm sm:text-base mb-1">{file.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{file.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">{file.filename}</span>
                    <button
                      onClick={() => handleDownload(file.filename, file.content || masterSummary)}
                      className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download .txt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Download the Master Revision Summary and review it completely before taking the Timed Exam Simulator in Topic 8!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'checklist' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-emerald-400">
                <CheckSquare size={18} /> CBSE Class XII IT (802) Mastery Checklist
              </h3>
              <p className="text-xs text-slate-400">Self-assess your readiness across all core topics of Module 002_001</p>

              <div className="space-y-2.5 pt-2">
                {revisionChecklist.map((item, idx) => (
                  <label 
                    key={idx} 
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-colors"
                  >
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-700 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3 */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <PlainTextPrint content={masterSummary} fileName="002_001_egovernance_master_summary.txt" />
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 7 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic7_Revision_Hub_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
