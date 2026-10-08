import React, { useState } from 'react';
import { 
  Video, Mic, MicOff, Monitor, Hand, MessageSquare, 
  Users, CheckCircle2, XCircle, AlertTriangle, HelpCircle, 
  FileText, Sparkles, BookOpen, Layers, ArrowRight, Zap, RefreshCw, BarChart3, Radio 
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

const VirtualClassroomSimulator = () => {
  const [handRaised, setHandRaised] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [pollVote, setPollVote] = useState(null);
  const [activeTab, setActiveTab] = useState('slides'); // 'slides', 'poll', 'qa'

  const pollOptions = [
    { id: 'A', text: "A. Synchronous & Real-Time with Live Q&A", votes: 42 },
    { id: 'B', text: "B. Asynchronous Pre-recorded Only", votes: 4 },
    { id: 'C', text: "C. Physical Offline Postal Letter", votes: 1 }
  ];

  const totalVotes = pollOptions.reduce((acc, opt) => acc + opt.votes, 0) + (pollVote ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="bg-slate-850/60 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-750 pb-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
            <Video size={20} />
            <span>Interactive Live Webinar & Virtual Classroom Simulator</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> LIVE STREAM
            </span>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1">
              <Users size={12} /> 48 Students
            </span>
          </div>
        </div>

        {/* Webinar Stage Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Stage Presentation Feed */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 relative overflow-hidden min-h-[280px] flex flex-col justify-between">
              
              {/* Presenter Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center border border-sky-500/40">
                    SH
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Sukanta Hui (Host & Educator)</span>
                    <span className="text-[10px] text-slate-400">Screen Sharing: NetBeans IDE Java GUI Lab</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Latency: 28ms (Optimal)
                </span>
              </div>

              {/* Central Slide / Content View */}
              {activeTab === 'slides' && (
                <div className="p-6 bg-slate-900/90 rounded-xl border border-slate-800 text-center space-y-3 my-auto">
                  <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block">
                    CBSE Class XII IT (802) · Live Lecture Slide
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">
                    "Webinars allow bidirectional audio/video and instantaneous doubt clarification."
                  </h3>
                  <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300 max-w-md mx-auto">
                    Student Q: How do we prevent Zoombombing? → Ans: Enable Waiting Rooms & Passcodes!
                  </div>
                </div>
              )}

              {activeTab === 'poll' && (
                <div className="p-5 bg-slate-900 rounded-xl border border-slate-800 space-y-3 my-auto">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                    <BarChart3 size={16} />
                    <span>Live In-Class Comprehension Poll:</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold">
                    What is the hallmark pedagogical advantage of webinars compared to recorded video clips?
                  </p>
                  <div className="space-y-2 pt-1">
                    {pollOptions.map((opt) => {
                      const isSelected = pollVote === opt.id;
                      const count = opt.votes + (isSelected ? 1 : 0);
                      const pct = Math.round((count / totalVotes) * 100);

                      return (
                        <button
                          key={opt.id}
                          onClick={() => setPollVote(opt.id)}
                          className={"w-full p-2.5 rounded-lg border text-left text-xs transition-all relative overflow-hidden cursor-pointer " + (
                            isSelected 
                              ? "bg-amber-500/20 border-amber-500 text-white font-bold" 
                              : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                          )}
                        >
                          <div 
                            className="absolute top-0 left-0 bottom-0 bg-amber-500/10 pointer-events-none transition-all"
                            style={{ width: `${pct}%` }}
                          />
                          <div className="relative flex justify-between items-center">
                            <span>{opt.text}</span>
                            <span className="font-mono text-[11px] text-amber-300">{pct}% ({count})</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'qa' && (
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 my-auto text-xs">
                  <span className="font-bold text-sky-400 block mb-1">Live Q&A Clearance Pod:</span>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    <div className="p-2 bg-slate-950 rounded border border-slate-850">
                      <span className="text-[11px] font-bold text-slate-300">Mamata (Kolkata): </span>
                      <span className="text-slate-400">Can an e-learning platform have both webinars and pre-recorded videos?</span>
                      <span className="text-emerald-400 block text-[10px] font-mono mt-0.5">✓ Answered by Sukanta Hui: Yes! That is called Blended Learning.</span>
                    </div>
                    <div className="p-2 bg-slate-950 rounded border border-slate-850">
                      <span className="text-[11px] font-bold text-slate-300">Abhronila (Barrackpore): </span>
                      <span className="text-slate-400">Is WebRTC required for browser-based video streaming?</span>
                      <span className="text-emerald-400 block text-[10px] font-mono mt-0.5">✓ Answered by Sukanta Hui: Exactly, WebRTC powers zero-plugin real-time browser audio/video.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stage Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-850 pt-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('slides')}
                    className={"px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer " + (activeTab === 'slides' ? "bg-sky-500 text-white" : "bg-slate-900 border border-slate-800 text-slate-400")}
                  >
                    Lecture Slide
                  </button>
                  <button
                    onClick={() => setActiveTab('poll')}
                    className={"px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer " + (activeTab === 'poll' ? "bg-amber-500 text-slate-950 font-extrabold" : "bg-slate-900 border border-slate-800 text-slate-400")}
                  >
                    Live Poll
                  </button>
                  <button
                    onClick={() => setActiveTab('qa')}
                    className={"px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer " + (activeTab === 'qa' ? "bg-emerald-500 text-slate-950 font-extrabold" : "bg-slate-900 border border-slate-800 text-slate-400")}
                  >
                    Q&A Pod
                  </button>
                </div>

                {/* Participant Action Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHandRaised(!handRaised)}
                    className={"p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 " + (
                      handRaised 
                        ? "bg-amber-500 text-slate-950 font-extrabold animate-bounce" 
                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    <Hand size={14} />
                    <span>{handRaised ? "Hand Raised" : "Raise Hand"}</span>
                  </button>
                  <button
                    onClick={() => setMicActive(!micActive)}
                    className={"p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 " + (
                      micActive 
                        ? "bg-emerald-500 text-slate-950 font-extrabold" 
                        : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    {micActive ? <Mic size={14} /> : <MicOff size={14} />}
                    <span>{micActive ? "Mic On" : "Muted"}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Sidebar: Key Highlights */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <span className="font-bold text-white block border-b border-slate-800 pb-2">
                Why Webinars Excel in IT Education
              </span>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-sky-400 font-bold">•</span>
                  <span><strong>Instant Question Clearance:</strong> No waiting days for forum replies; doubts resolved in seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Live Code Debugging:</strong> Teacher shares IDE screen and runs live code step-by-step.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span><strong>Cloud Recording Archive:</strong> Every session recorded for exam revision before boards.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function Topic7() {
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
                Module 002_002 · Topic 7
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold rounded-full">
                Interactive Learning Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Webinars & E-Learning: Real-Time Interactive Online Lectures for Question Clearance
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Explore the architectural anatomy of synchronous webinars, contrast real-time interactive lectures with asynchronous MOOCs, and master virtual collaboration tools.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
          {[
            { id: 'concept', label: '1. Virtual Classroom Lab', icon: BookOpen },
            { id: 'matrix', label: '2. Synchronous vs Asynchronous', icon: Layers },
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

        {/* TAB 1: VIRTUAL CLASSROOM LAB */}
        {activeTab === 'concept' && (
          <div className="space-y-6">
            <VirtualClassroomSimulator />

            <Teacher 
              teacherName="Sukanta Hui" 
              role="Senior Computer Science & IT Educator"
              experience="15+ Years CBSE Class XII Board Mentorship"
              tip="In CBSE Class XII IT questions: 'What is a Webinar? State its primary pedagogical benefit', answer clearly: A webinar is an interactive seminar, lecture, or presentation conducted over the Internet in real time using video conferencing software. Its primary pedagogical benefit is two-way synchronous interactivity allowing instantaneous student doubt clearance and real-time screen sharing!"
            />
          </div>
        )}

        {/* TAB 2: SYNCHRONOUS VS ASYNCHRONOUS */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2 text-sky-400">
                <Layers size={18} /> Synchronous Live Webinars vs Asynchronous MOOCs
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                      <th className="p-3">Dimension</th>
                      <th className="p-3 text-sky-400">Synchronous (Live Webinars)</th>
                      <th className="p-3 text-amber-400">Asynchronous (Pre-recorded MOOCs)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Interaction Timing</td>
                      <td className="p-3">Real-time scheduled meetings with live teacher & peers</td>
                      <td className="p-3">Self-paced; access video lectures on-demand 24x7</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Doubt Clearance</td>
                      <td className="p-3">Instant live resolution via microphone, chat, or Q&A pod</td>
                      <td className="p-3">Delayed resolution via discussion forums or email tickets</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Student Engagement</td>
                      <td className="p-3">High social interaction, live polls, and breakout rooms</td>
                      <td className="p-3">Independent, self-motivated individual study</td>
                    </tr>
                    <tr className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">Representative Software</td>
                      <td className="p-3 font-mono text-sky-300">Zoom, Google Meet, MS Teams, Cisco Webex</td>
                      <td className="p-3 font-mono text-amber-300">Coursera, edX, SWAYAM, Udemy, NPTEL</td>
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
                <h3 className="text-lg font-bold text-white">Board Examination Pitfalls & Traps</h3>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Trap 1: Describing a webinar as a recorded broadcast</p>
                  <p className="text-slate-400">A recorded video clip on YouTube is NOT a webinar. A webinar MUST be conducted live in real time with interactive audience participation.</p>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <p className="font-bold text-amber-300 mb-1">Trap 2: Forgetting the Origin of the Term</p>
                  <p className="text-slate-400">In 1-mark objective questions, you may be asked to identify the portmanteau words. Remember: Webinar = 'Web' + 'Seminar'!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <FAQTemplate title="CBSE Class XII IT (802) – Topic 7 FAQs" questions={questions} />
          </div>
        )}

        {/* TAB 5: PLAIN TEXT NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <PlainTextPrint content={noteText} fileName="Topic7_Webinars_ELearning_Notes.txt" />
          </div>
        )}

      </div>
    </div>
  );
}
