import React, { useState } from 'react';
import { 
  GitMerge, CheckCircle2, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, ArrowRight, ShieldCheck, Terminal, 
  Code, Zap, Layers, RefreshCw, FileText, Layout, 
  Play, Shield, Rocket, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

const SdlcPipelineVisualizer = () => {
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      id: 0,
      name: '1. Conception',
      icon: Sparkles,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      badge: 'Feasibility & Goals',
      deliverable: 'Project Charter & Feasibility Report',
      tasks: [
        'Identify school administrative bottleneck (e.g. manual fee logbooks).',
        'Assess technical feasibility (hardware requirements, Java/MySQL tools).',
        'Conduct cost-benefit analysis and obtain formal project approval.'
      ]
    },
    {
      id: 1,
      name: '2. Requirements',
      icon: FileText,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      badge: 'Analysis & SRS',
      deliverable: 'Software Requirement Specification (SRS)',
      tasks: [
        'Interview teachers, accountants, and school clerks for feature wishlists.',
        'Document Functional Requirements (e.g. student search by roll number).',
        'Document Non-Functional Requirements (security, 2-second response times).'
      ]
    },
    {
      id: 2,
      name: '3. Design',
      icon: Layout,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      badge: 'Architecture & Schema',
      deliverable: 'ER Diagrams & Database Schemas',
      tasks: [
        'Design Relational Model (Tables: STUDENT, MARKS, FEES, PRIMARY/FOREIGN KEYS).',
        'Create Data Flow Diagrams (DFDs) and modular architectural flowcharts.',
        'Wireframe GUI interface forms (NetBeans Java Swing layouts).'
      ]
    },
    {
      id: 3,
      name: '4. Implementation',
      icon: Code,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      badge: 'Coding & Construction',
      deliverable: 'Compiled Java & MySQL Source Code',
      tasks: [
        'Create database tables via MySQL DDL scripts with table constraints.',
        'Develop Java classes, constructors, methods, and JDBC connection drivers.',
        'Write event listeners for GUI buttons and menu actions.'
      ]
    },
    {
      id: 4,
      name: '5. Testing',
      icon: Shield,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      badge: 'Quality Assurance',
      deliverable: 'Test Cases & Bug Defect Log',
      tasks: [
        'Unit testing on individual Java methods (testing calculations and string methods).',
        'Integration testing between GUI frontend and MySQL relational backend.',
        'System boundary-value tests with sample school student data.'
      ]
    },
    {
      id: 5,
      name: '6. Deployment',
      icon: Rocket,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      badge: 'Launch & Maintenance',
      deliverable: 'Live Production Software & User Manual',
      tasks: [
        'Install software executable on school office workstations.',
        'Provide user training manual for school administrative staff.',
        'Perform ongoing maintenance and minor feature updates.'
      ]
    }
  ];

  const curr = phases[activePhase];
  const CurrIcon = curr.icon;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <GitMerge className="w-3.5 h-3.5" /> SDLC Process Pipeline
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The 6 Project Life Cycle Phases
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePhase(prev => (prev > 0 ? prev - 1 : phases.length - 1))}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer"
          >
            &larr; Prev
          </button>
          <button
            onClick={() => setActivePhase(prev => (prev < phases.length - 1 ? prev + 1 : 0))}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer font-bold shadow-md shadow-emerald-950"
          >
            Next Phase &rarr;
          </button>
        </div>
      </div>

      {/* Phase Pipeline Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {phases.map((p, idx) => {
          const isSelected = activePhase === idx;
          return (
            <button
              key={p.id}
              onClick={() => setActivePhase(idx)}
              className={`p-3 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-between ${
                isSelected
                  ? `${p.bg} ${p.border} shadow-lg shadow-emerald-950/40 scale-102`
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900'
              }`}
            >
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500">Phase {idx + 1}</span>
              <span className={`text-xs font-bold mt-1 ${isSelected ? p.color : 'text-slate-300'}`}>
                {p.name.split('. ')[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail Showcase for Active Phase */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${curr.bg} ${curr.border} border`}>
              <CurrIcon className={`w-5 h-5 ${curr.color}`} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{curr.name}</h3>
              <span className="text-xs text-slate-400 font-mono">Deliverable: {curr.deliverable}</span>
            </div>
          </div>
          <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full ${curr.bg} ${curr.color} border ${curr.border}`}>
            {curr.badge}
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Core Activities in this Phase:
          </span>
          <div className="grid sm:grid-cols-3 gap-3">
            {curr.tasks.map((task, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                <CheckCircle2 className={`w-4 h-4 ${curr.color} mt-0.5 shrink-0`} />
                <span>{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic5 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 005_001 • Topic 5
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Project Life Cycle Phases: Conception, Requirement Definition, Design, Implementation, Testing, Deployment
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Trace the six standard phases of the Software Development Life Cycle (SDLC), understand the specific deliverables created at each stage, and learn how requirements transform into working production software.
          </p>
        </div>

        {/* Pipeline Visualizer */}
        <SdlcPipelineVisualizer />

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="The six SDLC phases are a standard CBSE board question. Memorize them in exact order: 1) Conception, 2) Requirement Definition (produces the SRS document), 3) Design (creates ER Diagrams and UI wireframes), 4) Implementation (writing Java code & MySQL tables), 5) Testing (debugging & quality assurance), and 6) Deployment (production launch & user training)!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Project Life Cycle Phases"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic5;
