import React, { useState } from 'react';
import {
  Download, FileText, Code, BookOpen, CheckCircle2,
  Layers, HelpCircle, ShieldCheck, Printer, Copy, Check, Terminal, Sparkles
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";
import masterScript from "./topic12_files/protocols_cybersecurity_master_lab.py?raw";

export default function Topic12() {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(masterScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadPython = () => {
    const blob = new Blob([masterScript], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = "protocols_cybersecurity_master_lab.py";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 12
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Laboratory &amp; Revision Package
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Downloadable Documents: Network Protocols &amp; Cyber Security Master Package
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl leading-relaxed">
              Consolidate your study of TCP/IP, HTTP/S, FTP, SMTP/POP3/IMAP, VoIP, SSH, DNS, URLs, IPv4/IPv6, Malware, DDoS attacks, and Firewalls. Download the master simulation script, export printable high-yield board revision notes, and solve 25 board exam questions.
            </p>
          </div>
        </div>

        {/* 2. Download Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950/80 border border-blue-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Terminal size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Master Python Simulation Suite</h3>
                <p className="text-xs text-slate-400">Complete runnable network protocols &amp; security lab script (.py)</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Includes TCP 3-way handshake simulation, SMTP/IMAP dual-protocol workflow, URL parsing &amp; DNS lookup, and an Access Control List (ACL) firewall rule engine.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleDownloadPython}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg"
              >
                <Download size={15} /> Download Python Script (.py)
              </button>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700"
              >
                {copiedCode ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                {copiedCode ? "Copied to Clipboard!" : "Copy Source Code"}
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-sky-500/10 rounded-xl text-sky-400">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Concise Revision Compendium</h3>
                <p className="text-xs text-slate-400">Formatted study notes ready for printing and revision</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Summarizes all critical CBSE Class 12 board examination rules, port numbers cheat sheet, HTTP vs HTTPS, Virus vs Worm vs Trojan, and DoS vs DDoS criteria.
            </p>
            <div className="pt-2">
              <PlainTextPrint
                content={noteText}
                filename="cbse_class12_protocols_and_security_master_notes.txt"
                title="Download / Print Master Revision Notes"
              />
            </div>
          </div>
        </div>

        {/* 3. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Review the summary port table and malware taxonomy thoroughly before taking the Topic 13 diagnostic assessment. Pay special attention to port numbers (Port 80/443 for HTTP/S, Port 25/110/143 for Mail, Port 22 for SSH, Port 20/21 for FTP) and the exact distinctions between Virus, Worm, and Trojan to score full marks in Section A and Section D!"
        />

        {/* 4. CBSE Board Examination Practice & FAQs */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board Exam Practice &amp; FAQs</h2>
              <p className="text-xs text-slate-400">25 Authentic Questions with Complete Explanations &amp; Hints</p>
            </div>
          </div>
          <FAQTemplate questions={questions} />
        </div>

      </div>
    </div>
  );
}
