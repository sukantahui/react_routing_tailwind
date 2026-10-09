import React, { useState } from 'react';
import { 
  Box, Shield, GitFork, Sparkles, Layers, 
  CheckCircle2, BookOpen, ArrowRight, ShieldCheck, 
  Terminal, Code, Zap, Eye, Lock, RefreshCw, Cpu
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

const OopPillarsVisualizer = () => {
  const [activePillar, setActivePillar] = useState('encapsulation');

  const pillars = [
    {
      id: 'abstraction',
      name: '1. Abstraction',
      badge: 'Complexity Hiding',
      color: 'text-sky-400',
      bg: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      analogy: 'Car Dashboard & Accelerator Pedal',
      desc: 'Hiding internal mechanical complexity (valves, fuel injection) and exposing only clean, high-level control interfaces to the driver/user.',
      code: `// Abstraction: User calls startEngine() without managing spark plugs
Car myCar = new Car();
myCar.startEngine(); // Clean, simple high-level interface`
    },
    {
      id: 'encapsulation',
      name: '2. Encapsulation',
      badge: 'Data Hiding & Security',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      analogy: 'Medicine Capsule / Bank Account Vault',
      desc: 'Wrapping private variables and public methods into a single class entity. Data cannot be accessed or modified directly without getter/setter validations.',
      code: `public class BankAccount {
    private double balance; // Protected from outside tampering
    
    public double getBalance() { return balance; }
    public void deposit(double amt) { 
        if (amt > 0) balance += amt; // Validation rule
    }
}`
    },
    {
      id: 'inheritance',
      name: '3. Inheritance',
      badge: 'Code Reusability',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      analogy: 'Parent to Child Biological Traits',
      desc: 'Deriving child classes from a parent class using the "extends" keyword. Eliminates redundant code and establishes natural "is-a" hierarchies.',
      code: `public class Teacher extends Employee {
    String subjectSpecialization;
    // Automatically inherits name, empId, salary from Employee
}`
    },
    {
      id: 'polymorphism',
      name: '4. Polymorphism',
      badge: 'Many Forms',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      analogy: 'Smartphone Button / Camera Lens',
      desc: 'The capability of a method or operator to perform different tasks based on the number or types of input arguments (Overloading) or object instance (Overriding).',
      code: `public class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; } // Overloaded
}`
    }
  ];

  const current = pillars.find(p => p.id === activePillar) || pillars[1];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Box className="w-3.5 h-3.5" /> Architecture Explorer
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            The 4 Fundamental Pillars of Java OOP
          </h2>
        </div>
        
        {/* Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {pillars.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activePillar === p.id 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {p.name.split('. ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Detail Showcase */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${current.bg} ${current.color} border ${current.border}`}>
              {current.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Analogy: <strong className="text-slate-200">{current.analogy}</strong>
            </span>
          </div>

          <h3 className="text-xl font-bold text-white">{current.name}</h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {current.desc}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
            <strong className="text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Academic Board Definition:
            </strong>
            <p className="text-[11px] leading-relaxed text-slate-400">
              In CBSE IT (802), define <span className="text-white font-semibold">{current.name.split('. ')[1]}</span> clearly using data protection, reusability, or overloading terms.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-sky-400" /> Java Implementation Syntax
            </span>
            <pre className="text-xs font-mono text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 overflow-x-auto leading-relaxed">
{current.code}
            </pre>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
            Key Java Keyword: <span className="text-emerald-400 font-bold">{activePillar === 'inheritance' ? 'extends' : activePillar === 'encapsulation' ? 'private / public' : 'class / method'}</span>
          </div>
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
            <Sparkles className="w-3.5 h-3.5" /> Module 004_001 • Topic 0
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Core Principles of Object-Oriented Programming (OOP)
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
            Master the four cornerstones of Object-Oriented Programming: Abstraction, Encapsulation, Inheritance, and Polymorphism, and see how they are implemented in modern Java applications.
          </p>
        </div>

        {/* Visualizer */}
        <OopPillarsVisualizer />

        {/* FAQs */}
        <FAQTemplate
          title="Frequently Asked Questions • Core OOP Principles"
          questions={questions}
        />

        {/* Printable Note */}
        <PlainTextPrint
          content={noteText}
          title="CBSE Class XII IT 802 – OOP Principles Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Note (.txt)"
          downloadFileName="004_001_topic0_note.txt"
        />

        {/* Teacher's Note */}
        <Teacher
          note="In CBSE Class XII IT 802, distinguishing Abstraction (hiding implementation complexity) from Encapsulation (hiding data using private fields) is a classic 2-mark question. Remember: Abstraction is 'What to show', Encapsulation is 'How to hide and protect data'. — Sukanta Hui"
        />
      </div>
    </div>
  );
};

export default Topic0;
