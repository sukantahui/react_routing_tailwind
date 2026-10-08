import React, { useState } from 'react';
import { 
  Key, ShieldCheck, AlertTriangle, CheckCircle2, 
  Layers, BookOpen, Code, HelpCircle, FileText, ArrowRight, Sparkles 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 001 · Topic 5
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Core Relational Keys
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Relational Keys: Primary Key, Candidate Key, Alternate Key, Composite Key
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the definitions, relationships, mathematical formulas, and SQL constraints governing relational keys in CBSE Class XII IT (802).
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: '1. Key Classification', icon: BookOpen },
            { id: 'code', label: '2. SQL Keys Lab', icon: Code },
            { id: 'pitfalls', label: '3. Board Pitfalls & Tips', icon: AlertTriangle },
            { id: 'faqs', label: '4. FAQs & Practice (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '5. Printable Document', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border-b-2 border-sky-400'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/40'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-sky-400 uppercase">Primary Key</span>
                <h4 className="text-sm font-bold text-white">Designated Identifier</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The chosen candidate key. Must be strictly unique and cannot contain NULL values (Entity Integrity).
                </p>
                <div className="text-xs font-mono text-sky-400">UNIQUE + NOT NULL</div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">Candidate Key</span>
                <h4 className="text-sm font-bold text-white">Minimal Superkey</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All candidate column sets capable of uniquely identifying rows without redundant columns.
                </p>
                <div className="text-xs font-mono text-emerald-400">Uniqueness + Minimality</div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase">Alternate Key</span>
                <h4 className="text-sm font-bold text-white">Secondary Identifiers</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All candidate keys remaining after the primary key has been selected: Candidate Keys - Primary Key.
                </p>
                <div className="text-xs font-mono text-amber-400">Enforced via UNIQUE</div>
              </div>

            </div>

            <Teacher note="Formula to memorize: Alternate Keys = Candidate Keys - Primary Key. If a table has 3 candidate keys, selecting 1 primary key leaves 2 alternate keys! — Sukanta Hui" />
          </div>
        )}

        {/* TAB 2: CODE */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Declaring Primary &amp; Alternate Keys in MySQL</h3>
              <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{`CREATE TABLE StudentRegistration (
    AdmissionNo VARCHAR(10) PRIMARY KEY, -- PRIMARY KEY
    AadhaarNo CHAR(12) NOT NULL UNIQUE,  -- ALTERNATE KEY 1
    StudentEmail VARCHAR(80) UNIQUE,     -- ALTERNATE KEY 2
    FullName VARCHAR(60) NOT NULL,
    DOB DATE NOT NULL
);`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle size={18} />
              Board Exam Traps: Relational Keys
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Primary Keys can NEVER contain NULLs. Alternate Keys (UNIQUE) can accept NULL values.
            </p>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 5 · Relational Keys Architecture FAQs &amp; Board Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 5: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic5_relational_keys_note.txt"
              title="CBSE Class XII IT 802 – Topic 5 Printable Quick Revision Note"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
