import React, { useState } from 'react';
import { 
  Globe, Server, AppWindow, CheckCircle2, XCircle, AlertTriangle, 
  HelpCircle, FileText, Sparkles, BookOpen, Layers, ArrowRight, Zap, RefreshCw, Send 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const ClientServerCycleVisualizer = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Step 1: User Types URL in Web Browser',
      actor: 'Web Browser (Client: Chrome, Firefox, Opera, Edge)',
      action: 'Browser resolves DNS (e.g. india.gov.in &rarr; 164.100.154.6) and sends HTTP GET request over Port 443 (HTTPS).',
      highlight: 'browser'
    },
    {
      title: 'Step 2: Web Server Receives & Routes Request',
      actor: 'Web Server (Apache, Nginx, Microsoft IIS)',
      action: 'Web server validates request headers, enforces SSL certificates, and forwards request to Application Software.',
      highlight: 'server'
    },
    {
      title: 'Step 3: Application Software & Database Processing',
      actor: 'Application Server (Java, Python, PHP + MySQL Database)',
      action: 'Processes business calculations, checks user authentication, queries database, and generates HTML/JSON payload.',
      highlight: 'app'
    },
    {
      title: 'Step 4: Browser Renders HTML, CSS & Runs JavaScript',
      actor: 'Web Browser Engine (Blink, Gecko, WebKit)',
      action: 'Constructs DOM tree, applies CSS rules, executes interactive JavaScript, and displays visual web page to user.',
      highlight: 'browser'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-700/60 pb-3">
          <Globe size={20} />
          <span>HTTP Client-Server Request-Response Lifecycle Simulator</span>
        </div>

        {/* Stepper Buttons */}
        <div className="flex flex-wrap gap-2">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={"px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all " + (
                currentStep === idx 
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25" 
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              )}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>

        {/* Active Step Card */}
        <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-sky-400 tracking-wider">
              {steps[currentStep].title}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              Stage {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <Server size={16} className="text-emerald-400" />
            <span>Active Component: {steps[currentStep].actor}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
            {steps[currentStep].action}
          </p>
        </div>

        {/* 3 Component Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-sky-400 flex items-center gap-1.5">
              <Globe size={16} /> 1. Web Browsers
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Client software that requests, fetches, renders, and displays web pages.
            </p>
            <div className="text-[10px] font-mono text-slate-300 pt-1">
              Examples: Opera, Chrome, Firefox, Safari, Edge
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Server size={16} /> 2. Web Servers
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Server software listening on port 80/443 to receive and respond to HTTP requests.
            </p>
            <div className="text-[10px] font-mono text-slate-300 pt-1">
              Examples: Apache, Nginx, Tomcat, IIS
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <AppWindow size={16} /> 3. Application Software
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Programs created to perform specific user tasks (e.g. accounting, payroll).
            </p>
            <div className="text-[10px] font-mono text-slate-300 pt-1">
              Examples: MS Word, Tally ERP, VLC Player
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic2() {
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
                Module 002_001 · Topic 2
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold rounded-full">
                Software Classification
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Web Browsers vs Web Servers vs Application Software
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Learn how to identify and classify Web Browsers (Opera, Chrome, Firefox), Web Servers (Apache, Nginx), and general Application Software in CBSE Class XII examinations.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Lifecycle Lab', icon: BookOpen },
            { id: 'browser', label: '2. Browser Identification', icon: Globe },
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
            <ClientServerCycleVisualizer />
            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="A classic CBSE board MCQ presents 4 options: (a) MS Word, (b) Opera, (c) MySQL, (d) NetBeans, and asks: 'Which of the following is a Web Browser?' The answer is Opera!"
            />
          </div>
        )}

        {/* TAB 2 */}
        {activeTab === 'browser' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                <Globe size={18} /> Major Modern Web Browsers & Engines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white">Opera</span>
                  <p className="text-slate-400">Popular Chromium-based web browser with built-in VPN and ad-blocker.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white">Google Chrome</span>
                  <p className="text-slate-400">Widely used web browser powered by the open-source Blink layout engine.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white">Mozilla Firefox</span>
                  <p className="text-slate-400">Open-source privacy-focused web browser powered by the Gecko engine.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white">Apple Safari</span>
                  <p className="text-slate-400">Default web browser for macOS and iOS running on the WebKit engine.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-white">Microsoft Edge</span>
                  <p className="text-slate-400">Default Windows web browser running on the Chromium engine.</p>
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
                <p>• <strong>Web Browser vs Search Engine:</strong> Google Chrome is a <em>Web Browser</em>; Google.com is a <em>Search Engine</em>. Do not confuse the client application with the web service!</p>
                <p>• <strong>Server vs Client:</strong> A Web Browser runs on the user's client machine; a Web Server runs remotely on cloud server infrastructure.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4 */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 2 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5 */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic2_Browsers_vs_Servers_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
