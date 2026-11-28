import React from 'react';
import {
  FileText, ShieldCheck, CheckCircle2, AlertTriangle,
  HelpCircle, Layers, ArrowRight, Video, Mic, Volume2, Monitor, Wifi, Radio
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";
import pythonCode from "./topic8_files/videoconferencing_bandwidth_sim.py?raw";

export default function Topic8() {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
      {/* 1. Header */}
      <header className="border-b border-slate-700/60 pb-6">
        <div className="flex items-center space-x-3 text-emerald-400 mb-2">
          <Video className="w-7 h-7" />
          <span className="text-xs font-bold tracking-widest uppercase bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60">
            Case Study Design · High-Scoring Sub-Part
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Video Conferencing Hardware, Software & Protocol Recommendations
        </h1>
        <p className="mt-2 text-base text-slate-400 max-w-4xl leading-relaxed">
          In almost every CBSE 4-mark case study question, part (d) asks students to recommend hardware,
          services, and protocols for remote meetings, online classes, or corporate training. Master the
          exact terminology and model answers guaranteed to score full marks.
        </p>
      </header>

      {/* 2. Teacher Guidance */}
      <Teacher
        teacherName="Sukanta Hui"
        experienceYears="27+"
        designation="Senior Computer Science Faculty & Academic Consultant"
        institution="Coder & AccoTax, Barrackpore"
        message="In Question 35 or 34 of CBSE Class 12 CS, the final sub-question frequently says: 'The company plans to hold interactive real-time training sessions between its Head Office and Branch. Suggest the service/technology, two required hardware devices, and the underlying protocol.' Students often lose half a mark by giving vague answers like 'internet' or 'sound'. The examiner specifically looks for VoIP, Webcams, Microphones, and Video Conferencing. Memorize this exact terminology!"
      />

      {/* 3. Core Concept Grid: The 4 Critical Pillars */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 shadow-lg space-y-6">
        <div className="flex items-center space-x-3 text-sky-400">
          <Layers className="w-6 h-6" />
          <h2 className="text-xl font-bold text-white">The Four Essential Pillars in CBSE Marking Schemes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-2">
              <Radio className="w-4 h-4" />
              <span>1. Technology / Service</span>
            </div>
            <p className="text-white font-semibold text-lg">Video Conferencing</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Acceptable variants: Web Conferencing, VoIP Calling, Teleconferencing, Webcasting.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-sky-500/50 transition-all">
            <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm mb-2">
              <Mic className="w-4 h-4" />
              <span>2. Audio Hardware</span>
            </div>
            <p className="text-white font-semibold text-lg">Microphone & Speakers</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Omnidirectional microphone, echo-cancelling conference boundary mic, headsets, or external sound bars.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-indigo-500/50 transition-all">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm mb-2">
              <Monitor className="w-4 h-4" />
              <span>3. Visual Hardware</span>
            </div>
            <p className="text-white font-semibold text-lg">Webcam & Large Display</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              HD Video Camera/Webcam, Interactive Flat Panel (IFP), projector screen, or high-res dual monitor setup.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-lg border border-slate-700/70 hover:border-amber-500/50 transition-all">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-2">
              <Wifi className="w-4 h-4" />
              <span>4. Protocols</span>
            </div>
            <p className="text-white font-semibold text-lg">VoIP, SIP, RTP</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Voice over IP (VoIP) converts analogue audio to IP packets; SIP sets up calls; RTP delivers media packets.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Real-time Transmission: Technical Deep Dive */}
      <section className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Network Performance Metrics for Seamless Audio/Video</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse border border-slate-700">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="p-3 border border-slate-700">Metric</th>
                <th className="p-3 border border-slate-700">Ideal Threshold</th>
                <th className="p-3 border border-slate-700">Impact if Exceeded</th>
                <th className="p-3 border border-slate-700">Remedial Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-white">Latency (Delay)</td>
                <td className="p-3 text-emerald-400 font-mono">&lt; 150 ms</td>
                <td className="p-3">Speakers talk over each other; awkward conversational pauses.</td>
                <td className="p-3">Dedicated fiber links, local edge routing, minimal hops.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Jitter (Delay Variance)</td>
                <td className="p-3 text-emerald-400 font-mono">&lt; 30 ms</td>
                <td className="p-3">Robot voice, broken words, video frame stuttering.</td>
                <td className="p-3">Jitter buffer algorithms, QoS bandwidth reservation.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Packet Loss</td>
                <td className="p-3 text-emerald-400 font-mono">&lt; 1%</td>
                <td className="p-3">Frozen screens, missing syllables, call dropouts.</td>
                <td className="p-3">Forward Error Correction (FEC), adaptive bitrate scaling.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Symmetric Bandwidth</td>
                <td className="p-3 text-emerald-400 font-mono">&gt; 3.0 Mbps upload</td>
                <td className="p-3">Downscaled pixelated video (360p) or automatic audio-only mode.</td>
                <td className="p-3">Enterprise leased lines or FTTH connections.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Python Bandwidth Simulation */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-sky-400" />
          <span>Interactive Python Simulator: Video Conference Feasibility</span>
        </h3>
        <p className="text-sm text-slate-300">
          Run this simulation script to verify bandwidth, latency, and jitter feasibility across campus branches:
        </p>
        <PythonFileLoader
          filename="videoconferencing_bandwidth_sim.py"
          code={pythonCode}
        />
      </section>

      {/* 6. Quick Revision Notes */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <FileText className="w-5 h-5 text-emerald-400" />
          <span>Quick Revision Summary Note</span>
        </h3>
        <PlainTextPrint
          title="Video Conferencing Model Answers - Quick Revision"
          content={noteText}
        />
      </section>

      {/* 7. Comprehensive FAQ & Exam Questions */}
      <section className="bg-slate-800/60 rounded-xl p-6 border border-slate-700/60 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 mb-2">
          <HelpCircle className="w-6 h-6" />
          <h3 className="text-xl font-bold text-white">25 Authentic CBSE Board Assessment Questions</h3>
        </div>
        <p className="text-sm text-slate-300">
          Test your mastery of hardware, protocols, and network design for video conferencing:
        </p>
        <FAQTemplate questions={questions} />
      </section>
    </div>
  );
}
