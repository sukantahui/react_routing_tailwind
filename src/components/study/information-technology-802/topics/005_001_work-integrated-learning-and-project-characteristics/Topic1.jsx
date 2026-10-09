import React, { useState } from 'react';
import { 
  Target, Award, TrendingUp, Users, Building, 
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle, 
  BookOpen, ArrowRight, ShieldCheck, Zap, Layers, 
  RefreshCw, Check, Star
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const StakeholderBenefitsMatrix = () => {
  const [selectedGroup, setSelectedGroup] = useState('students');

  const groups = [
    {
      id: 'students',
      label: 'Students (Learners)',
      icon: Users,
      color: 'text-sky-400',
      badge: 'Employability & Skills',
      benefits: [
        'Builds a live, demonstrable portfolio of working database and Java applications.',
        'Develops workplace soft skills: active communication, teamwork, and client feedback integration.',
        'Increases job market competitiveness and higher education admission prospects.',
        'Eliminates fear of real-world software debugging and requirement ambiguity.'
      ]
    },
    {
      id: 'schools',
      label: 'Schools & Institutes',
      icon: Building,
      color: 'text-emerald-400',
      badge: 'Academic Relevance',
      benefits: [
        'Ensures syllabus remains aligned with modern corporate technology stacks.',
        'Enhances school reputation for practical excellence and technical innovation.',
        'Facilitates guest lectures and teacher training opportunities with IT firms.',
        'Produces authentic student-led software tools for school administrative needs.'
      ]
    },
    {
      id: 'industry',
      label: 'Industry Employers',
      icon: TrendingUp,
      color: 'text-amber-400',
      badge: 'Talent Pipeline',
      benefits: [
        'Creates an early-stage pipeline of pre-trained, high-aptitude software candidates.',
        'Dramatically reduces post-hiring onboarding duration and corporate training costs.',
        'Infuses corporate teams with creative, energetic perspectives on problem-solving.',
        'Fulfills corporate social responsibility (CSR) and community educational support.'
      ]
    }
  ];

  const current = groups.find(g => g.id === selectedGroup) || groups[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Target className="w-3.5 h-3.5" /> Stakeholder Impact Matrix
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Multi-Stakeholder Benefits of Work-Integrated Learning
          </h2>
        </div>

        <div className="flex gap-2">
          {groups.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGroup(g.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedGroup === g.id
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-950'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {g.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Showcase */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className={`text-base font-bold ${current.color}`}>{current.label}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800 font-mono">
              {current.badge}
            </span>
          </div>
          <Star className={`w-4 h-4 ${current.color} fill-current`} />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {current.benefits.map((b, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className={`w-4 h-4 ${current.color} mt-0.5 shrink-0`} />
              <p className="text-xs text-slate-300 leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Topic1 = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Module 005_001 • Topic 1
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Objectives and Industry Benefits of WIL in IT Vocational Education
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Explore the core pedagogical objectives of Work-Integrated Learning, evaluate its strategic benefits across students, educational institutions, and industry employers, and discover why it forms the backbone of vocational IT training.
          </p>
        </div>

        {/* Matrix */}
        <StakeholderBenefitsMatrix />

        {/* 4 Core Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-sky-400 font-bold text-sm">1. Employability</div>
            <p className="text-xs text-slate-300 leading-relaxed">Equips students with direct workplace readiness and verifiable technical execution ability.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">2. Soft Skills</div>
            <p className="text-xs text-slate-300 leading-relaxed">Fosters client empathy, constructive code reviews, sprint planning, and team collaboration.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-amber-400 font-bold text-sm">3. Professional Ethics</div>
            <p className="text-xs text-slate-300 leading-relaxed">Instills deep respect for client data confidentiality, software licenses, and secure coding practices.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-purple-400 font-bold text-sm">4. Pipeline Value</div>
            <p className="text-xs text-slate-300 leading-relaxed">Provides businesses with skilled young developers ready to make immediate contributions.</p>
          </div>
        </div>

        {/* Teacher Sukanta Hui Component */}
        <Teacher
          quote="When answering board questions on the objectives of WIL, highlight two complementary dimensions: hard technical skills (building working relational database schemas and Java applications) and professional soft skills (communication, teamwork, and adhering to strict project deadlines)!"
        />

        {/* CBSE Exam FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Revision Notes */}
        <PlainTextPrint
          title="CBSE Class 12 IT (802) • Objectives & Benefits of WIL"
          content={noteText}
        />
      </div>
    </div>
  );
};

export default Topic1;
