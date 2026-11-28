import React from 'react';
import {
  Globe, Network, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Zap, History, Milestone
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/network_evolution_milestones_lab.py?raw";

export default function Topic0() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 1. Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Unit II · Segment 4 · Topic 0
              </span>
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-semibold rounded-full">
                Historical Foundations
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Evolution of Networking: ARPANET, NSFNET, Interspace &amp; Modern Internet
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Trace the revolutionary history of global telecommunications. From the 4-node military research experiment in 1969 to the academic NSFNET backbone, Interspace vision, and today's multi-gigabit planetary Web.
            </p>
          </div>
        </div>

        {/* 2. Visual Architecture Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 w-fit">
              <Milestone size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">1969: ARPANET</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              US DoD funded 4-node network (UCLA, Stanford, UCSB, Utah). Pioneered packet switching.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 w-fit">
              <Network size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">1980s: NSFNET</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-speed national backbone connecting 5 supercomputing research centers for universities.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 w-fit">
              <Layers size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">INTERSPACE</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Visionary distributed software architecture for multi-user 3D collaborative virtual spaces.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 w-fit">
              <Globe size={20} />
            </div>
            <h3 className="text-sm font-bold text-white">Modern Internet</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decentralized planetary network of networks operating over the TCP/IP protocol suite.
            </p>
          </div>
        </div>

        {/* 3. Deep Dive Theory */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="text-blue-400" size={22} />
            Why Build Networks? The 4 Core Drivers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-sky-400">1. Hardware &amp; Software Resource Sharing</h4>
              <p className="text-slate-400">
                Instead of buying 100 printers or isolated software copies, a network allows all nodes to share a central high-speed printer and centralized server databases.
              </p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-emerald-400">2. High Reliability Through Redundancy</h4>
              <p className="text-slate-400">
                If an individual workstation or cable link goes down, packet-switched routing dynamically redirects traffic through alternate paths, avoiding total blackout.
              </p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-amber-400">3. Dramatic Cost Reduction</h4>
              <p className="text-slate-400">
                Shared compute power, centralized backups, and virtual cloud servers reduce capital investment and maintenance overhead significantly.
              </p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <h4 className="font-bold text-purple-400">4. Instantaneous Global Communication</h4>
              <p className="text-slate-400">
                Email, video conferencing, real-time telemetry, and file transfers happen in milliseconds across continents.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Code Lab Example */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Practical Lab Simulation
            </h2>
            <span className="text-xs text-slate-400 font-mono">network_evolution_milestones_lab.py</span>
          </div>
          <PythonFileLoader
            code={pythonCode}
            fileName="network_evolution_milestones_lab.py"
            title="ARPANET vs Modern Internet Routing Simulator"
          />
        </div>

        {/* 5. Common Pitfalls & Traps */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <AlertTriangle size={22} />
            Board Examination Traps &amp; Confusions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 1: Confusing Internet with the World Wide Web</p>
              <p className="text-slate-400">
                The Internet is the massive physical and logical NETWORK infrastructure (cables, routers, IP protocol). The World Wide Web (WWW) is an APPLICATION SERVICE running on the Internet that uses HTTP to view linked web pages!
              </p>
            </div>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-amber-500/20">
              <p className="font-bold text-amber-400 mb-1">Trap 2: Misspelling ARPANET expansion</p>
              <p className="text-slate-400">
                Remember: <strong className="text-white">Advanced Research Projects Agency Network</strong>. Forgetting the 's' in 'Projects' or writing 'Association' is penalized in 1-mark board questions.
              </p>
            </div>
          </div>
        </div>

        {/* 6. Teacher's Pedagogical Guidance */}
        <Teacher
          name="Sukanta Hui"
          role="Senior Computer Science Educator"
          school="Coder & AccoTax, Barrackpore"
          experience="25+ Years Experience in CBSE & Vocational CS Training"
          tip="Unit II carries 10 precious theory marks. In Section A, expect 1-mark questions on ARPANET, NSFNET, or the difference between Internet and Intranet. Write precise, keyword-focused answers: cite US DoD for ARPANET, supercomputing centers for NSFNET, and Tim Berners-Lee for the Web to guarantee full marks!"
        />

        {/* 7. Downloadable Revision Notes */}
        <PlainTextPrint
          content={noteText}
          filename="cbse_class12_network_evolution.txt"
          title="Download Topic 0 Concise Revision Notes"
        />

        {/* 8. CBSE Board Examination Quality FAQ Set */}
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