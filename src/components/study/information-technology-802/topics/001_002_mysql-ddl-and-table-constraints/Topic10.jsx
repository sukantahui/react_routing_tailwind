import React, { useState } from 'react';
import { 
  FileText, Download, Database, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, BookOpen, Code, Terminal, Layers 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

export default function Topic10() {
  const [activeTab, setActiveTab] = useState('hub');

  const masterSql = `-- ============================================================
-- CBSE CLASS XII IT (802) - MODULE 002 MASTER DDL SCRIPT
-- MySQL DDL Statements & Table Constraints
-- Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
-- ============================================================

CREATE DATABASE IF NOT EXISTS CBSE_IT802_Module002;
USE CBSE_IT802_Module002;

-- 1. Doctor Master Table with Column Constraints
CREATE TABLE Doctor (
    DoctorID INT PRIMARY KEY AUTO_INCREMENT,
    DoctorName VARCHAR(50) NOT NULL,
    Specialization VARCHAR(40) NOT NULL,
    Phone CHAR(10) UNIQUE NOT NULL,
    ConsultationFee DECIMAL(8,2) DEFAULT 500.00
);

-- 2. Patient Admission Table with Foreign Key & ON DELETE CASCADE
CREATE TABLE PatientAdmission (
    AdmissionID INT PRIMARY KEY AUTO_INCREMENT,
    PatientName VARCHAR(60) NOT NULL,
    Age INT NOT NULL CHECK (Age >= 0 AND Age <= 125),
    Gender CHAR(1) NOT NULL CHECK (Gender IN ('M', 'F', 'O')),
    AssignedDoctorID INT NOT NULL,
    AdmissionDate DATE NOT NULL,
    FOREIGN KEY (AssignedDoctorID) REFERENCES Doctor(DoctorID)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. Movie Table with DECIMAL(3,2)
CREATE TABLE Movie (
    MovieID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(80) NOT NULL,
    ReleaseYear INT NOT NULL,
    IMDb_Rating DECIMAL(3,2) CHECK (IMDb_Rating >= 0.0 AND IMDb_Rating <= 9.99)
);

-- 4. Alter Table Examples
ALTER TABLE Movie ADD Genre VARCHAR(30) DEFAULT 'Drama';
ALTER TABLE Movie MODIFY Title VARCHAR(100) NOT NULL;
ALTER TABLE Movie ADD BoxOfficeCrores DECIMAL(10,2) AFTER ReleaseYear;
`;

  const handleDownloadMasterSql = () => {
    const blob = new Blob([masterSql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '002_ddl_constraints_master.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002 · Topic 10
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold rounded-full">
                Downloadable Revision Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Downloadable Documents & Revision Assets
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Download and print curated reference sheets, master MySQL DDL laboratory scripts, and complete chapter summaries for pre-board and practical exam revision.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'hub', label: '1. Resource Hub', icon: Layers },
            { id: 'sql', label: '2. Master SQL Script', icon: Code },
            { id: 'faqs', label: '3. FAQs (25 Qs)', icon: HelpCircle },
            { id: 'notes', label: '4. Printable Notes', icon: FileText }
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

        {/* TAB 1: RESOURCE HUB */}
        {activeTab === 'hub' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-sky-400">
                  <FileText size={22} />
                  <h3 className="text-base font-bold text-white">1. Module 002 Complete Plain Text Guide</h3>
                </div>
                <p className="text-xs text-slate-300">
                  A comprehensive plain-text reference guide covering all 12 topics, formula charts, and step-by-step DDL commands ready for offline printing.
                </p>
                <button
                  onClick={() => setActiveTab('notes')}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-xl transition flex items-center gap-2"
                >
                  <FileText size={14} /> Open Printable Sheet
                </button>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-amber-400">
                  <Database size={22} />
                  <h3 className="text-base font-bold text-white">2. MySQL Master DDL Script</h3>
                </div>
                <p className="text-xs text-slate-300">
                  A complete, tested <code className="text-amber-300 font-mono">.sql</code> script containing CREATE TABLE, ALTER TABLE ADD/MODIFY/CHANGE, and DECIMAL precision tests.
                </p>
                <button
                  onClick={handleDownloadMasterSql}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl transition flex items-center gap-2"
                >
                  <Download size={14} /> Download 002_ddl_constraints_master.sql
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: MASTER SQL SCRIPT */}
        {activeTab === 'sql' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                  <Terminal size={18} />
                  <span>002_ddl_constraints_master.sql</span>
                </div>
                <button
                  onClick={handleDownloadMasterSql}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                >
                  <Download size={13} /> Download Script
                </button>
              </div>
              <pre className="p-4 bg-slate-900 rounded-xl overflow-x-auto text-xs sm:text-sm text-emerald-400 font-mono leading-relaxed border border-slate-800/80">
                <code>{masterSql}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB 3: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 10 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 4: PRINTABLE NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint
              content={noteText}
              title="CBSE Class XII IT 802 – Module 002 Complete Revision Sheet"
              stampEnabled={true}
              showDownload={true}
              downloadButtonText="Download Plain Text Note"
              downloadFileName="topic10_module002_master_revision.txt"
            />
          </div>
        )}

        {/* Teacher Banner */}
        <Teacher note="Run the 002_ddl_constraints_master.sql file in MySQL Command Line Client to test every command live before practical exams! — Sukanta Hui" />

      </div>
    </div>
  );
}