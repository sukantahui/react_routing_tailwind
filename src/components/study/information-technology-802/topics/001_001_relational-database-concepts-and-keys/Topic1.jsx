import React, { useState } from 'react';
import { 
  PhoneCall, Landmark, Train, HeartPulse, GraduationCap, 
  Layers, CheckCircle2, AlertTriangle, BookOpen, Code, HelpCircle, FileText, ArrowRight, Zap 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
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
                Module 001 · Topic 1
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Enterprise Application Areas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Work Areas &amp; Domains Utilizing DBMS (Telecom, Banking, Railways, Hospitality, Education)
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore how relational database engines power mission-critical operations across major industries with massive scale, concurrency control, and zero data loss.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'overview', label: '1. Domain Breakdown', icon: BookOpen },
            { id: 'code', label: '2. Multi-Domain SQL Lab', icon: Code },
            { id: 'realworld', label: '3. Case Studies', icon: Zap },
            { id: 'pitfalls', label: '4. Board Pitfalls & Tips', icon: AlertTriangle },
            { id: 'faqs', label: '5. FAQs & Practice (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '6. Printable Document', icon: FileText }
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                  <PhoneCall size={20} />
                </div>
                <h3 className="text-base font-bold text-white">1. Telecommunication</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Processes billions of Call Detail Records (CDR), data packet accounting, automated prepaid balance deduction, and tower location tracking.
                </p>
                <div className="text-[11px] text-sky-400 font-mono">Key Entity: TelecomCDR</div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <Landmark size={20} />
                </div>
                <h3 className="text-base font-bold text-white">2. Banking &amp; Financial</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Maintains double-entry ledgers, ATM/UPI concurrency, prevents double-spending, and logs complete audit trails.
                </p>
                <div className="text-[11px] text-emerald-400 font-mono">Key Entity: AccountLedger</div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                  <Train size={20} />
                </div>
                <h3 className="text-base font-bold text-white">3. Indian Railways (IRCTC)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Manages live seat inventory, prevents double-booking through row-level locks, and automatically executes Waiting-List to Confirmed upgrades.
                </p>
                <div className="text-[11px] text-amber-400 font-mono">Key Entity: RailwayReservation</div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
                  <HeartPulse size={20} />
                </div>
                <h3 className="text-base font-bold text-white">4. Hospital Management</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Unites patient Electronic Health Records (EHR), lab diagnostic reports, doctor scheduling, and pharmacy batch expiry tracking.
                </p>
                <div className="text-[11px] text-rose-400 font-mono">Key Entity: PatientEHR</div>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-3 sm:col-span-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-base font-bold text-white">5. Educational Institutions &amp; Boards</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Powers Student Information Systems (SIS), fee billing registers, attendance tracking, and automated CBSE Class XII IT (802) marksheet compilation.
                </p>
                <div className="text-[11px] text-purple-400 font-mono">Key Entity: StudentMarks</div>
              </div>

            </div>

            <Teacher note="In Question 8 of the CBSE IT (802) board exam, when asked about DBMS applications in Telecom, focus on CDR logging and billing rating engines. For Railways, focus on concurrency and seat locking. Provide precise schema entity names! — Sukanta Hui" />
          </div>
        )}

        {/* TAB 2: CODE */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Multi-Domain SQL Schema Implementations</h3>
              <pre className="bg-slate-950 p-4 rounded-xl text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed">
                <code>{`-- Telecom Call Detail Record (CDR) Table
CREATE TABLE TelecomCDR (
    CallID BIGINT AUTO_INCREMENT PRIMARY KEY,
    CallerMSISDN VARCHAR(15) NOT NULL,
    ReceiverMSISDN VARCHAR(15) NOT NULL,
    DurationSeconds INT NOT NULL,
    TowerID VARCHAR(20) NOT NULL,
    CallRatePerMinute DECIMAL(4,2) DEFAULT 1.20
);

-- Indian Railways Berth Reservation with Concurrency Unique Constraint
CREATE TABLE RailwayReservation (
    PNR VARCHAR(10) PRIMARY KEY,
    TrainNumber INT NOT NULL,
    PassengerName VARCHAR(50) NOT NULL,
    TravelDate DATE NOT NULL,
    CoachNumber VARCHAR(5) NOT NULL,
    BerthNumber INT NOT NULL,
    CONSTRAINT unq_train_seat UNIQUE (TrainNumber, TravelDate, CoachNumber, BerthNumber)
);`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: REAL WORLD */}
        {activeTab === 'realworld' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-sky-400 font-mono">CASE 1 · BSNL & JIO BARRACKPORE TOWER</span>
                <h4 className="text-sm font-bold text-white">CDR Ingestion & Live Rating Engine</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When Mamata makes a 3-minute voice call in Barrackpore, the cell tower logs the event into partitioned tables, instantly deducting ₹3.60 from her prepaid wallet.
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-bold text-emerald-400 font-mono">CASE 2 · EASTERN RAILWAYS (SEALDAH DIVISION)</span>
                <h4 className="text-sm font-bold text-white">Tatkal Reservation Row-Locking</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  During 10:00 AM Tatkal rush, DBMS locks ensure Sachin and Debangshu cannot both obtain Berth 45 on the Darjeeling Mail simultaneously.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle size={18} />
              Board Exam Tips: Domain-Specific Relational Concepts
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When answering questions on why Flat Files fail in Telecom and Banking, mention that Flat Files cannot perform row-level locking or high-speed partition pruning, leading to transaction corruption.
            </p>
          </div>
        )}

        {/* TAB 5: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate
              title="Topic 1 · Enterprise Domains Technical FAQs & Board Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TAB 6: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              filename="topic1_enterprise_domains_note.txt"
              title="CBSE Class XII IT 802 – Topic 1 Printable Quick Revision Note"
              hidePreview={false}
              showDownload={true}
            />
          </div>
        )}

      </div>
    </div>
  );
}
