import React, { useState } from 'react';
import { 
  Monitor, Globe, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Layers, ArrowRight, Zap, RefreshCw, Smartphone, HardDrive 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const AppComparisonVisualizer = () => {
  const [selectedType, setSelectedType] = useState('web');

  const comparisonFeatures = [
    {
      feature: 'Installation Requirement',
      desktop: 'Must be installed locally on each individual PC (.exe, .msi, .dmg)',
      web: 'Zero local installation needed; runs directly inside any standard web browser',
      winner: 'web'
    },
    {
      feature: 'Platform & Device Independence',
      desktop: 'OS-dependent (a Windows EXE will not run on macOS or Android without re-compilation)',
      web: 'Cross-platform (accessible across Windows, macOS, Linux, Android, iOS)',
      winner: 'web'
    },
    {
      feature: 'Software Updates & Patches',
      desktop: 'Manual updates required on every client machine; version fragmentation common',
      web: 'Instant, centralized updates on the server; all users immediately see the latest version',
      winner: 'web'
    },
    {
      feature: 'Offline Usability & Latency',
      desktop: 'Full functionality offline without any internet connection; high hardware rendering speed',
      web: 'Requires network/internet connection; performance dependent on bandwidth',
      winner: 'desktop'
    },
    {
      feature: 'Data Storage & Multi-User Sharing',
      desktop: 'Local hard drive storage; difficult to synchronize real-time concurrent multi-user edits',
      web: 'Centralized cloud database; seamless real-time collaboration among thousands of users',
      winner: 'web'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Layers size={20} />
          <span>Interactive Architecture Comparison: Desktop vs Web Applications</span>
        </div>

        {/* Toggle Mode */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedType('web')}
            className={"px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2 " + (
              selectedType === 'web' ? "bg-sky-500 text-white shadow-lg" : "bg-slate-900 border border-slate-700 text-slate-400"
            )}
          >
            <Globe size={16} /> Web-Based Applications (e.g. Gmail, IRCTC, Google Docs)
          </button>
          <button
            onClick={() => setSelectedType('desktop')}
            className={"px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-2 " + (
              selectedType === 'desktop' ? "bg-emerald-500 text-white shadow-lg" : "bg-slate-900 border border-slate-700 text-slate-400"
            )}
          >
            <Monitor size={16} /> Desktop Applications (e.g. MS Word, NetBeans IDE, Notepad)
          </button>
        </div>

        {/* Detail Card */}
        {selectedType === 'web' ? (
          <div className="p-5 bg-sky-950/40 border border-sky-500/30 rounded-2xl space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-sky-300 font-extrabold text-sm">
              <Zap size={18} /> Why the World Shifted to Web-Based Applications
            </div>
            <p className="text-slate-300 leading-relaxed">
              Web applications operate over a <strong>Client-Server Architecture</strong>. The user needs only a web browser (Client) to communicate with the web server over HTTP/HTTPS. All business logic, database queries, and security updates are handled on the central server, eliminating distribution logistics and user installation overhead.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <span className="text-slate-400 block">Access Mode</span>
                <span className="text-sky-300 font-bold">URL / Browser</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <span className="text-slate-400 block">Installation</span>
                <span className="text-emerald-400 font-bold">0 MB Local</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <span className="text-slate-400 block">Upgrades</span>
                <span className="text-sky-300 font-bold">100% Centralized</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <span className="text-slate-400 block">Concurrency</span>
                <span className="text-amber-300 font-bold">Millions of Users</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-sm">
              <HardDrive size={18} /> Characteristics of Standalone Desktop Software
            </div>
            <p className="text-slate-300 leading-relaxed">
              Desktop applications execute directly on the local operating system (Windows, macOS, Linux) and utilize the client computer's local CPU, GPU, RAM, and hard disk storage. While they provide exceptional offline performance and direct hardware access, distributing updates requires manual re-installation by every individual user.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <span className="text-slate-400 block">Access Mode</span>
                <span className="text-emerald-300 font-bold">Local Shortcut</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <span className="text-slate-400 block">Installation</span>
                <span className="text-rose-400 font-bold">Requires EXE/MSI</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <span className="text-slate-400 block">Offline Mode</span>
                <span className="text-emerald-400 font-bold">100% Native</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <span className="text-slate-400 block">Platform</span>
                <span className="text-amber-300 font-bold">OS-Specific</span>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400">
                <th className="p-3">Comparison Parameter</th>
                <th className="p-3 text-emerald-400">Desktop Applications</th>
                <th className="p-3 text-sky-400">Web-Based Applications</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {comparisonFeatures.map((f, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-white">{f.feature}</td>
                  <td className="p-3 text-slate-300">{f.desktop}</td>
                  <td className="p-3 text-slate-300">{f.web}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default function Topic0() {
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
                Module 002_001 · Topic 0
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Architecture Fundamentals
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Desktop Applications vs Web-Based Applications: Key Operational Differences
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Understand the operational paradigms, installation requirements, platform dependencies, update mechanisms, and data accessibility models separating desktop and web apps.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Architecture Lab', icon: BookOpen },
            { id: 'matrix', label: '2. Comparative Matrix', icon: Layers },
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
            <AppComparisonVisualizer />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="In CBSE board exams, questions often ask you to state 2 or 3 distinct differences between Desktop and Web Applications. Always highlight: 1. Installation requirement, 2. Platform dependency, and 3. Update mechanics!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs sm:text-sm">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> Quick Revision Comparison Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-emerald-400">Desktop Application Examples</span>
                  <ul className="text-slate-300 list-disc list-inside space-y-1">
                    <li>Microsoft Word / Excel / PowerPoint</li>
                    <li>NetBeans IDE / Eclipse</li>
                    <li>Adobe Photoshop (Desktop version)</li>
                    <li>VLC Media Player</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-sky-400">Web Application Examples</span>
                  <ul className="text-slate-300 list-disc list-inside space-y-1">
                    <li>Google Docs / Google Sheets</li>
                    <li>IRCTC Train Booking Portal</li>
                    <li>Passport Seva Kendra Web Portal</li>
                    <li>DigiLocker Web Application</li>
                  </ul>
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
                <p>• <strong>Confusion with Web Pages:</strong> A static website (like a school brochure page) is not the same as a Web Application. A Web Application is interactive and processes transactions dynamically (e.g. fee payment, online exams).</p>
                <p>• <strong>Browser Requirement:</strong> Web applications do not require specialized hardware, but they strictly require a standard Web Browser and network connectivity.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 0 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic0_Desktop_vs_Web_Apps_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
