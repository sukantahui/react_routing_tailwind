import React, { useState } from 'react';
import { 
  FileText, CheckSquare, Users, Cpu, Shield, 
  CheckCircle2, XCircle, AlertTriangle, HelpCircle, 
  Sparkles, BookOpen, Layers, ArrowRight, Zap, RefreshCw, Copy, Check 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

const SRSBuilderSimulator = () => {
  const [systemName, setSystemName] = useState("Online Retail Store Billing System");
  const [selectedRoles, setSelectedRoles] = useState({
    admin: true,
    cashier: true,
    customer: true,
    auditor: false
  });
  const [selectedFeatures, setSelectedFeatures] = useState({
    barcodeScan: true,
    gstCompute: true,
    pdfInvoice: true,
    stockAlert: true,
    creditCardUPI: true,
    discountCoupons: false
  });
  const [perfTarget, setPerfTarget] = useState("Sub-2.0s response under 1,000 concurrent sessions");
  const [copied, setCopied] = useState(false);

  const toggleRole = (role) => {
    setSelectedRoles(prev => ({ ...prev, [role]: !prev[role] }));
  };

  const toggleFeature = (feat) => {
    setSelectedFeatures(prev => ({ ...prev, [feat]: !prev[feat] }));
  };

  const generateSRS = () => {
    const rolesList = Object.keys(selectedRoles).filter(r => selectedRoles[r]).map(r => r.toUpperCase()).join(", ");
    const featsList = Object.keys(selectedFeatures).filter(f => selectedFeatures[f]).map(f => {
      if (f === 'barcodeScan') return "• Automated Item Barcode Scanning & Item Lookup";
      if (f === 'gstCompute') return "• Dynamic Statutory GST (CGST + SGST) Tax Computation";
      if (f === 'pdfInvoice') return "• Automated Printable PDF Tax Invoice Generation";
      if (f === 'stockAlert') return "• Real-Time Low Inventory Restocking Warning Alerts";
      if (f === 'creditCardUPI') return "• Secure Multi-Mode Payment (UPI / Cards / Cash)";
      if (f === 'discountCoupons') return "• Promotional Coupon Code & Loyalty Point Deductions";
      return f;
    }).join("\n");

    return `================================================================================
SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
PROJECT: ${systemName.toUpperCase()}
VERSION: 1.0 (BASELINE DRAFT)
================================================================================

1. PROJECT SCOPE & OBJECTIVE:
This web application provides automated electronic transaction processing, itemized 
tax invoicing, and inventory tracking for commercial retail operations.

2. USER ROLES & ACCESS PERMISSIONS:
Authorized Roles: ${rolesList || "None Selected"}

3. CORE FUNCTIONAL REQUIREMENTS (FRs):
${featsList || "• No functional features selected."}

4. NON-FUNCTIONAL REQUIREMENTS (NFRs):
• Performance: ${perfTarget}
• Security: Transport Layer Security (HTTPS / Port 443), Salted SHA-256 Hashing.
• Availability: 99.9% operational uptime with automated daily database backups.

5. OPERATIONAL CONSTRAINTS & STACK DEPENDENCIES:
• Front-End Tier: HTML5, Tailwind CSS, JavaScript (React)
• Back-End Tier: Java Servlets / Spring Boot on Apache Tomcat
• Persistence Tier: MySQL 8.0 Relational Database (InnoDB ACID engine)
================================================================================`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSRS());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-base border-b border-slate-750 pb-3">
          <FileText size={20} />
          <span>Interactive SRS Generator: Online Billing & Enterprise Systems</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Config */}
          <div className="lg:col-span-6 space-y-4">
            {/* System Title */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 block">1. Target Project Name:</label>
              <input
                type="text"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* User Roles */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 block">2. Identified User Roles (RBAC):</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'admin', label: 'Store Administrator' },
                  { id: 'cashier', label: 'Billing Cashier' },
                  { id: 'customer', label: 'Retail Customer' },
                  { id: 'auditor', label: 'Tax Auditor' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => toggleRole(r.id)}
                    className={"p-2 rounded-lg text-xs font-bold border text-left transition-all cursor-pointer flex items-center justify-between " + (
                      selectedRoles[r.id]
                        ? "bg-sky-500/15 border-sky-500 text-sky-300"
                        : "bg-slate-950 border-slate-800 text-slate-500"
                    )}
                  >
                    <span>{r.label}</span>
                    {selectedRoles[r.id] && <CheckCircle2 size={12} className="text-sky-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Functional Features */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 block">3. Functional Requirements (FRs):</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'barcodeScan', label: 'Barcode Item Lookup' },
                  { id: 'gstCompute', label: '18% GST Tax Engine' },
                  { id: 'pdfInvoice', label: 'PDF Tax Invoicing' },
                  { id: 'stockAlert', label: 'Low Stock Warnings' },
                  { id: 'creditCardUPI', label: 'UPI / Card Payment' },
                  { id: 'discountCoupons', label: 'Discount Coupons' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => toggleFeature(f.id)}
                    className={"p-2 rounded-lg text-xs font-bold border text-left transition-all cursor-pointer flex items-center justify-between " + (
                      selectedFeatures[f.id]
                        ? "bg-emerald-500/15 border-emerald-500 text-emerald-300"
                        : "bg-slate-950 border-slate-800 text-slate-500"
                    )}
                  >
                    <span>{f.label}</span>
                    {selectedFeatures[f.id] && <CheckCircle2 size={12} className="text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated SRS Preview */}
          <div className="lg:col-span-6 space-y-3 flex flex-col justify-between">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                <span className="text-xs font-bold text-slate-300">Live Generated SRS Document Preview:</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Ready for Baseline Sign-Off
                </span>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-850 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-[340px]">
                {generateSRS()}
              </div>

              <button
                onClick={handleCopy}
                className="w-full py-2.5 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Copied SRS to Clipboard!" : "Copy SRS Document Text"}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic1() {
  const [activeTab, setActiveTab] = useState('concept');

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Module 002_003 · Topic 1
              </span>
              <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-semibold rounded-full">
                Stage 1 Specification
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Stage 1: Requirement Definition / Analysis Phase
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Master the art of stakeholder elicitation, feasibility studies, scope boundary demarcation, and Software Requirements Specification (SRS) documentation for systems like Online Billing.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. SRS Builder Lab', icon: BookOpen },
            { id: 'matrix', label: '2. Functional vs Non-Functional', icon: Layers },
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

        {/* TAB 1: SRS BUILDER LAB */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <SRSBuilderSimulator />

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="When asked about Stage 1 in CBSE examinations: (1) Define Requirement Definition as the phase that discovers 'WHAT' the system must do, (2) List the 4 fact-finding techniques: Interviews, Questionnaires, Document Analysis, and Observation, and (3) Explicitly name the Software Requirements Specification (SRS) as the primary deliverable!"
            />
          </div>
        )}

        {/* TAB 2: FUNCTIONAL VS NON-FUNCTIONAL */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> Functional Requirements vs Non-Functional Requirements
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                      <th className="p-3">Dimension</th>
                      <th className="p-3 text-emerald-400">Functional Requirements (FR)</th>
                      <th className="p-3 text-sky-400">Non-Functional Requirements (NFR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Definition</td>
                      <td className="p-3">Specific behavioral tasks and operations the software must execute</td>
                      <td className="p-3">System quality attributes, performance criteria, and operational constraints</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Core Question Answered</td>
                      <td className="p-3 font-semibold text-emerald-300">"What specific feature must the software do?"</td>
                      <td className="p-3 font-semibold text-sky-300">"How well, fast, and securely must the software perform?"</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Examples (Billing App)</td>
                      <td className="p-3">Barcode item scan, 18% GST calculation, printable PDF bill generation</td>
                      <td className="p-3">Response time &lt; 1.5 seconds, 99.9% uptime, HTTPS encryption</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Verification Mode</td>
                      <td className="p-3">Functional testing (Pass/Fail for specific features)</td>
                      <td className="p-3">Load testing, stress testing, security audits</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BOARD PITFALLS */}
        {activeTab === 'pitfalls' && (
          <div className="space-y-6">
            <div className="bg-slate-850/60 border border-amber-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle size={22} />
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Common Mistakes</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Mistake 1: Listing 'Design' or 'Coding' activities under Stage 1</p>
                  <p className="text-slate-400">Remember: In Stage 1, ZERO code is written and NO graphic layouts are finalized. It is purely an analytical and discovery phase that culminates in the written SRS document.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Mistake 2: Confusing Functional with Non-Functional Requirements</p>
                  <p className="text-slate-400">If an exam prompt says 'The application must support 5,000 concurrent users with 99.9% uptime', this is a Non-Functional requirement (Performance/Availability), NOT a functional feature!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 1 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic1_Requirement_Definition_SRS_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
