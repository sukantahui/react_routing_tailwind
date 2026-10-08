import React, { useState } from 'react';
import { 
  Database, Layers, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Code, Terminal, ArrowRight, Layout, Server, Cpu 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const FullStackExplorer = () => {
  const [activeTier, setActiveTier] = useState('frontend');

  const tiers = {
    frontend: {
      title: 'Front-End (Client-Side Presentation Tier)',
      color: 'text-sky-400',
      borderColor: 'border-sky-500/40',
      bgColor: 'bg-sky-500/10',
      desc: 'Runs directly in the user browser. Controls structure, styling, responsiveness, and client-side interactivity.',
      tools: [
        { name: 'HTML5', purpose: 'Defines document structure, semantic tags, forms, tables, and multimedia' },
        { name: 'CSS3', purpose: 'Controls visual aesthetics, colors, typography, animations, and responsive grids' },
        { name: 'JavaScript', purpose: 'Enables client-side form validation, dynamic DOM manipulation, and AJAX calls' },
        { name: 'NetBeans GUI Builder', purpose: 'Rapid drag-and-drop graphical user interface designer for desktop/web forms' }
      ]
    },
    backend: {
      title: 'Back-End (Server-Side Logic & Business Tier)',
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgColor: 'bg-emerald-500/10',
      desc: 'Executes securely on the web server. Handles business rules, authentication, session security, and data APIs.',
      tools: [
        { name: 'Java (Servlets / Spring)', purpose: 'Robust enterprise-grade server-side application logic and threading' },
        { name: 'Node.js', purpose: 'High-performance asynchronous JavaScript runtime for scalable backend services' },
        { name: 'Python / Django / Flask', purpose: 'Clean, rapid server-side scripting and data science API endpoints' },
        { name: 'Apache Tomcat / Nginx', purpose: 'Web server hosting environments that route incoming HTTP requests' }
      ]
    },
    database: {
      title: 'Database (Persistence & Storage Tier)',
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgColor: 'bg-amber-500/10',
      desc: 'Stores, indexes, retrieves, and maintains ACID-compliant relational data structures.',
      tools: [
        { name: 'MySQL 8.0', purpose: 'Open-source Relational Database Management System (RDBMS) for SQL queries' },
        { name: 'Oracle Database 19c', purpose: 'Enterprise multi-model RDBMS for massive mission-critical transactions' },
        { name: 'PostgreSQL', purpose: 'Extensible object-relational database with complex SQL support' },
        { name: 'MongoDB', purpose: 'NoSQL document-oriented store for JSON-like flexible schemas' }
      ]
    }
  };

  const current = tiers[activeTier];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Layout size={20} />
          <span>Full-Stack 3-Tier Web Application Architecture Explorer</span>
        </div>

        {/* Tier Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'frontend', label: '1. Front-End Tier', icon: Layout },
            { id: 'backend', label: '2. Back-End Logic Tier', icon: Server },
            { id: 'database', label: '3. Database Data Tier', icon: Database }
          ].map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id)}
                className={"p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between " + (
                  activeTier === t.id 
                    ? "bg-slate-800 border-sky-500 text-white shadow-lg" 
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                )}
              >
                <div className="flex items-center gap-2.5 font-bold text-xs">
                  <Icon size={16} className={activeTier === t.id ? "text-sky-400" : "text-slate-500"} />
                  <span>{t.label}</span>
                </div>
                <ArrowRight size={14} className={activeTier === t.id ? "text-sky-400" : "text-slate-600"} />
              </button>
            );
          })}
        </div>

        {/* Active Tier Details */}
        <div className={"p-5 rounded-2xl border " + current.borderColor + " " + current.bgColor + " space-y-4"}>
          <div className="space-y-1">
            <h3 className={"text-base font-extrabold " + current.color}>{current.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {current.tools.map((tool, idx) => (
              <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                <span className={"font-bold text-xs font-mono " + current.color}>{tool.name}</span>
                <p className="text-[11px] text-slate-400 leading-snug">{tool.purpose}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic1() {
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
                Module 002_001 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Full-Stack Tools
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Front-End Tools vs Back-End Tools in Web Development
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Distinguish between client-side rendering technologies (HTML, CSS, JavaScript, NetBeans GUI) and server-side processing engines & databases (Java, MySQL, Oracle, Node.js).
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Full-Stack Explorer', icon: BookOpen },
            { id: 'tools', label: '2. Tool Classification', icon: Code },
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
            <FullStackExplorer />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="Remember: HTML, CSS, JavaScript, and NetBeans GUI Builder are Front-End tools; Java, Node.js, MySQL, and Oracle are Back-End tools. This classification is a guaranteed 1-2 mark question in CBSE Class XII IT!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                <Code size={18} /> CBSE Board Tool Categorization Table
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950">
                      <th className="p-3">Technology Name</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Primary Role in Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr><td className="p-3 text-white font-bold">HTML5</td><td className="p-3 text-sky-400">Front-End</td><td className="p-3 font-sans">Content structuring & semantic layout</td></tr>
                    <tr><td className="p-3 text-white font-bold">CSS3</td><td className="p-3 text-sky-400">Front-End</td><td className="p-3 font-sans">Colors, fonts, styling & responsive layout</td></tr>
                    <tr><td className="p-3 text-white font-bold">JavaScript</td><td className="p-3 text-sky-400">Front-End</td><td className="p-3 font-sans">Client-side logic & form validations</td></tr>
                    <tr><td className="p-3 text-white font-bold">NetBeans GUI</td><td className="p-3 text-sky-400">Front-End IDE</td><td className="p-3 font-sans">Drag-and-drop form interface designer</td></tr>
                    <tr><td className="p-3 text-white font-bold">Java</td><td className="p-3 text-emerald-400">Back-End</td><td className="p-3 font-sans">Server-side business logic & servlets</td></tr>
                    <tr><td className="p-3 text-white font-bold">MySQL / Oracle</td><td className="p-3 text-amber-400">Database (Back-End)</td><td className="p-3 font-sans">Data storage, queries & relational tables</td></tr>
                  </tbody>
                </table>
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
                <p>• <strong>JavaScript Dual Nature:</strong> In Class XII IT (802), JavaScript is traditionally classified as a <strong>Front-End</strong> tool (running in the browser). If Node.js is mentioned, specify server-side JavaScript.</p>
                <p>• <strong>NetBeans:</strong> NetBeans is an IDE with a built-in GUI builder (palette of Swing/AWT controls) that assists front-end visual creation.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 1 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic1_FrontEnd_vs_BackEnd_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
