import React, { useState } from 'react';
import { 
  Briefcase, GraduationCap, Building2, Sparkles, 
  CheckCircle2, AlertTriangle, HelpCircle, BookOpen, 
  ArrowRight, ShieldCheck, Terminal, Code, Zap, 
  Layers, RefreshCw, Users, Check
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const WilBridgeVisualizer = () => {
  const [activeNode, setActiveNode] = useState('integration');

  const nodes = [
    {
      id: 'academic',
      title: '1. Academic Foundation',
      icon: GraduationCap,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      tag: 'Classroom & Lab',
      desc: 'Mastering SQL queries, relational keys, Java OOP classes, and web client-server concepts inside the classroom.'
    },
    {
      id: 'integration',
      title: '2. The WIL Bridge',
      icon: Briefcase,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      tag: 'Workplace Integration',
      desc: 'Applying classroom theory to authentic software development: client meetings, real-world database design, and sprint deadlines.'
    },
    {
      id: 'industry',
      title: '3. Professional Industry',
      icon: Building2,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      tag: 'Employment & Career',
      desc: 'Developing workplace competencies, professional ethics, code reviews, and enterprise-grade problem-solving skills.'
    }
  ];

  const current = nodes.find(n => n.id === activeNode) || nodes[1];
  const IconComponent = current.icon;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Briefcase className="w-3.5 h-3.5" /> Educational Framework Visualizer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Work-Integrated Learning (WIL) Tripartite Model
          </h2>
        </div>

        <div className="flex gap-2">
          {nodes.map(n => (
            <button
              key={n.id}
              onClick={() => setActiveNode(n.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeNode === n.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-950'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {n.tag}
            </button>
          ))}
        </div>
      </div>

      {/* Tripartite Architecture Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {nodes.map(n => {
          const NodeIcon = n.icon;
          const isSelected = activeNode === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setActiveNode(n.id)}
              className={`p-5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? `${n.bg} ${n.border} shadow-lg shadow-emerald-950/40`
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{n.tag}</span>
                <NodeIcon className={`w-5 h-5 ${isSelected ? n.color : 'text-slate-500'}`} />
              </div>
              <h3 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {n.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Active Node Detail */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-start gap-4">
        <div className={`p-3 rounded-2xl ${current.bg} ${current.border} border shrink-0`}>
          <IconComponent className={`w-6 h-6 ${current.color}`} />
        </div>
        <div className="space-y-1">
          <span className={`text-xs font-bold font-mono uppercase ${current.color}`}>{current.title}</span>
          <p className="text-sm text-slate-300 leading-relaxed">{current.desc}</p>
        </div>
      </div>
    </div>
  );
};

const Topic0 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 005_001 • Topic 0
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What is Work-Integrated Learning (WIL)? Educational Approach Combining Academic Studies with Real-World Workplace Experience
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Discover the concept of Work-Integrated Learning (WIL), explore the tripartite partnership between students, schools, and industry, and learn how hands-on software development bridges classroom theory with professional excellence.
          </p>
        </div>

        {/* Visualizer */}
        <WilBridgeVisualizer />

        {/* Core Concepts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sky-400" />
              The Academic-Workplace Gap
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Traditional computer science teaching often focuses purely on isolated syntax drills. WIL introduces authentic ambiguity, client specifications, changing requirements, and software testing deadlines.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              Real-World Deliverables
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Students build functional school software systems (e.g. Student Attendance Tracing, Library Book Tracker, Fee Receipt Generator) that run in genuine school offices.
            </p>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="Work-Integrated Learning (WIL) is the heart of vocational education under CBSE Code 802. In board exams, define WIL as: 'An educational approach that deliberately combines classroom academic studies with authentic real-world workplace experience to produce job-ready IT professionals!'"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Work-Integrated Learning (WIL) Overview"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic0;
