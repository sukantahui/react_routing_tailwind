import React, { useState } from 'react';
import { 
  FolderKanban, Clock, Sparkles, CheckCircle2, AlertTriangle, 
  HelpCircle, BookOpen, ArrowRight, ShieldCheck, Terminal, 
  Code, Zap, Layers, RefreshCw, Repeat, Check, Calendar
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const ProjectVsOperationsExplorer = () => {
  const [activeTab, setActiveTab] = useState('project');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
            <FolderKanban className="w-3.5 h-3.5" /> Conceptual Comparison Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Project vs Operational Activity Classifier
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('project')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'project'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            1. Software Project (Temporary & Unique)
          </button>
          <button
            onClick={() => setActiveTab('operations')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'operations'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-950'
                : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            2. Business Operations (Ongoing & Repetitive)
          </button>
        </div>
      </div>

      {/* Comparison Body */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Core Characteristics</span>
            <span className={activeTab === 'project' ? 'text-amber-400 font-mono' : 'text-sky-400 font-mono'}>
              {activeTab === 'project' ? 'Mode: Temporary Endeavor' : 'Mode: Perpetual Operational'}
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            {activeTab === 'project' ? (
              <>
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                  <strong className="text-amber-400 block font-bold mb-1">Definition:</strong>
                  A temporary endeavor undertaken to create a unique product, service, or result.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-white block font-semibold">IT Examples:</strong>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400">
                    <li>Developing a School Examination Management Portal in Java & MySQL.</li>
                    <li>Designing and deploying an e-Commerce shopping cart system.</li>
                    <li>Migrating a legacy school database to a cloud MySQL server.</li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-200">
                  <strong className="text-sky-400 block font-bold mb-1">Definition:</strong>
                  Ongoing, continuous, and repetitive organizational activities designed to sustain daily operations.
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <strong className="text-white block font-semibold">IT Examples:</strong>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400">
                    <li>Daily database backups and disk cleanup routines.</li>
                    <li>Resetting forgotten student portal passwords at the helpdesk.</li>
                    <li>Routine weekly antivirus scans across school lab computers.</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Matrix Card */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3 font-mono text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider block border-b border-slate-800 pb-2">
            Attribute Breakdown
          </span>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-500">Timeline:</span>
              <span className={activeTab === 'project' ? 'text-amber-400 font-bold' : 'text-sky-400 font-bold'}>
                {activeTab === 'project' ? 'Definite Start & End' : 'Continuous / Perpetual'}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-500">Output Nature:</span>
              <span className={activeTab === 'project' ? 'text-amber-400 font-bold' : 'text-sky-400 font-bold'}>
                {activeTab === 'project' ? 'Unique Deliverable' : 'Repetitive Output'}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-500">Resource Pool:</span>
              <span className="text-emerald-400 font-bold">
                {activeTab === 'project' ? 'Finite / Bounded' : 'Standard Budgeted'}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            💡 <strong>Crucial Rule:</strong> A project ends when its objectives are accomplished or when the project is formally closed.
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic2 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 005_001 • Topic 2
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Definition of a Project: A Temporary Endeavor Undertaken to Create a Unique Product, Service, or Result
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Master the formal definition of a project, examine the exact meaning of "temporary" and "unique", and differentiate projects from routine organizational operations.
          </p>
        </div>

        {/* Classifier Visualizer */}
        <ProjectVsOperationsExplorer />

        {/* 3 Core Pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="text-amber-400 font-bold text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" /> 1. Temporary
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Has a definite beginning and a defined conclusion date when deliverables are accepted.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="text-sky-400 font-bold text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> 2. Unique
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Produces a customized product or outcome with distinct specifications and functional features.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
              <Layers className="w-4 h-4" /> 3. Progressive Elaboration
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Developed in incremental steps, becoming more detailed as requirements are progressively clarified.
            </p>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="Memorize this exact one-line definition for your CBSE Class XII board exam: 'A project is a temporary endeavor undertaken to create a unique product, service, or result.' If an exam question asks whether running a daily backup is a project, the answer is NO — that is an ongoing operational activity!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Project Definition & Concepts"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic2;
