import React, { useState } from 'react';
import {
  Layers, Database, FileSpreadsheet, FileText, CheckCircle2,
  AlertTriangle, HelpCircle, Terminal, BookOpen, Calculator,
  Sparkles, ArrowRight, RefreshCw, ShoppingCart, School,
  Building, Check, Sliders
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";
import pythonCode from "./topic3_files/software_cost_customization_analyzer.py?raw";

// Interactive Application Software Classifier & Decision Engine
const SoftwareDecisionMatrix = () => {
  const [selectedScenario, setSelectedScenario] = useState('school');
  const [budget, setBudget] = useState(60000);
  const [needBespokeWorkflow, setNeedBespokeWorkflow] = useState(true);

  const scenarios = {
    school: {
      title: "School Student Attendance & Report Card Generation",
      description: "Needs CBSE grading rubric, dynamic report cards, and SMS alerts to parents.",
      generalOption: "MS Excel / Google Sheets with Macro templates",
      bespokeOption: "Customized School ERP Portal (Web + Database)"
    },
    retail: {
      title: "Supermarket Point of Sale (POS) & GST Inventory",
      description: "High speed barcode scanning, thermal receipt printing, daily GST tax filing.",
      generalOption: "Off-the-shelf Tally ERP / QuickBooks",
      bespokeOption: "Tailor-Made POS Touchscreen Terminal Software"
    },
    author: {
      title: "Author Writing a 300-Page Computer Science Textbook",
      description: "Formatting chapters, inserting diagrams, indexing, and spell-checking.",
      generalOption: "MS Word / LibreOffice Writer / LaTeX",
      bespokeOption: "Custom Built Markdown CMS"
    }
  };

  const getRecommendation = () => {
    if (selectedScenario === 'author') {
      return {
        type: "General Purpose Software",
        recommend: "Use standard Word Processors (LibreOffice Writer / MS Word).",
        reason: "Word processing needs are standard globally; custom development would be a waste of money and time."
      };
    }
    if (needBespokeWorkflow && budget >= 40000) {
      return {
        type: "Tailor-Made (Customized) Software",
        recommend: scenarios[selectedScenario].bespokeOption,
        reason: "The unique workflow and sufficient budget justify developing customized software tailored to exact operational rules."
      };
    }
    return {
      type: "General Purpose / Packaged Software with Custom Templates",
      recommend: scenarios[selectedScenario].generalOption,
      reason: "Budget constraints or standard requirements make packaged solutions more practical and cost-effective."
    };
  };

  const rec = getRecommendation();

  return (
    <div className="w-full bg-slate-950/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Sliders size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Application Software Selection &amp; Cost-Benefit Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Evaluate when an organization should choose General Purpose packages versus Customized Bespoke software.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Object.entries(scenarios).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setSelectedScenario(key)}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedScenario === key
                ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-lg'
                : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
            }`}
          >
            <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
            <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Available Budget (INR): Rs. {budget.toLocaleString()}
            </label>
            <input
              type="range"
              min="5000"
              max="200000"
              step="5000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-4">
            <label className="text-xs font-semibold text-slate-300">Requires Specialized Custom Business Rules?</label>
            <button
              onClick={() => setNeedBespokeWorkflow(!needBespokeWorkflow)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                needBespokeWorkflow ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {needBespokeWorkflow ? "Yes (Custom Rules)" : "No (Standard Rules)"}
            </button>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Optimal Recommendation:</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
              {rec.type}
            </span>
          </div>
          <h4 className="text-base font-bold text-white">{rec.recommend}</h4>
          <p className="text-xs text-slate-400 leading-relaxed">{rec.reason}</p>
        </div>
      </div>
    </div>
  );
};

export default function Topic3() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 1. Header & Breadcrumb */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit I: CSO · Module 001_002
              </span>
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full">
                Topic 3
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                CBSE Core Syllabus
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Application Software: General Purpose vs Customized / Tailored Packages
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Explore the taxonomy of user-centric application software, comparing off-the-shelf productivity suites with bespoke organizational software systems.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Intuition & Analogy */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={18} />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Intuitive Real-World Analogy: Readymade Clothes vs Tailored Wedding Suit</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5"><ShoppingCart size={14} /> General Purpose: Off-the-Shelf Shirt</span>
              <p className="text-slate-300">
                You walk into a department store and buy a standard size 'L' shirt. It's inexpensive, immediately available, and fits most people reasonably well, though sleeves might be slightly long.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400 flex items-center gap-1.5"><Building size={14} /> Tailor-Made: Bespoke Custom Suit</span>
              <p className="text-slate-300">
                A master tailor takes 20 exact body measurements, stitches custom fabric over three weeks, and produces a garment that fits your body contours perfectly. It costs 10x more and takes time to make, but meets exact specifications.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Core Theory */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <BookOpen className="text-emerald-400" size={24} />
            <h2 className="text-xl font-bold text-white">Taxonomy of Application Software</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Category A</span>
              <h3 className="text-lg font-bold text-white">General Purpose Software (Packaged)</h3>
              <p className="text-slate-300 leading-relaxed">
                Software engineered to handle universal computing needs across millions of users and businesses without customization.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                <li><strong>Word Processors:</strong> MS Word, LibreOffice Writer, Google Docs</li>
                <li><strong>Spreadsheets:</strong> MS Excel, LibreOffice Calc, Google Sheets</li>
                <li><strong>DBMS:</strong> Oracle, MySQL, MS Access, PostgreSQL</li>
                <li><strong>Graphics &amp; Multimedia:</strong> Adobe Photoshop, GIMP, VLC</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">Category B</span>
              <h3 className="text-lg font-bold text-white">Customized / Tailored Software (Bespoke)</h3>
              <p className="text-slate-300 leading-relaxed">
                Software commissioned by a specific organization to implement proprietary business rules and specialized workflows.
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                <li><strong>Railways / Airlines:</strong> IRCTC Online Reservation System</li>
                <li><strong>Schools / Colleges:</strong> Student Fee &amp; Attendance ERP</li>
                <li><strong>Banking:</strong> Core Banking Systems (Finacle, TCS BaNCS)</li>
                <li><strong>Healthcare:</strong> Hospital OPD &amp; Bed Allocation Portals</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Interactive Simulation */}
        <div className="space-y-4">
          <SoftwareDecisionMatrix />
        </div>

        {/* 5. Python Code Demo */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Terminal className="text-emerald-400" size={20} />
            <h3 className="text-lg font-bold text-white">Python Software Cost &amp; Requirement Analyzer</h3>
          </div>
          <PythonFileLoader
            filePath="src/components/study/cbse-class-11-computer-science-083/topics/001_002_types-of-software-and-operating-system-functions/topic3_files/software_cost_customization_analyzer.py"
            fileContent={pythonCode}
          />
        </div>

        {/* 6. Pitfalls & Best Practices */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <AlertTriangle className="text-amber-400" size={24} />
            <h2 className="text-xl font-bold text-white">CBSE Examination Pitfalls &amp; Answering Tips</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <AlertTriangle size={18} />
                <span>Common Mistakes</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>Confusing General Purpose with System Software:</strong> MS Excel is an application software, NOT a system utility or operating system.</li>
                <li><strong>Assuming Customized software is always superior:</strong> For standard tasks like drafting letters, off-the-shelf word processors are far superior and cost-effective.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 size={18} />
                <span>Examiner Preferred Answers</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4 leading-relaxed">
                <li><strong>State the definition of Application Software:</strong> Programs designed to perform specific user-driven tasks and solve end-user problems.</li>
                <li><strong>Provide clear real-world examples:</strong> Cite IRCTC for tailor-made software and MS Excel / LibreOffice Calc for general purpose software.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 7. Frequently Asked Questions */}
        <div className="space-y-4">
          <FAQTemplate questions={questions} />
        </div>

        {/* 8. Plain Text Printable */}
        <div className="space-y-4">
          <PlainTextPrint
            fileName="CBSE_Class11_CS_Topic3_Application_Software_Notes.txt"
            content={noteText}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div className="space-y-4">
          <Teacher
            topicName="Application Software (General Purpose vs Tailored)"
            subject="CBSE Class 11 Computer Science (083)"
          />
        </div>

      </div>
    </div>
  );
}
