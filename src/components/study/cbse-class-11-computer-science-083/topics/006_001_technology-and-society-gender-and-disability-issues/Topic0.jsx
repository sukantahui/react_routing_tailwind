import React, { useState } from 'react';
import {
  Users, HeartHandshake, Eye, Volume2, Hand, Brain,
  Sparkles, CheckCircle2, AlertTriangle, HelpCircle,
  ShieldCheck, FileText, Code, Terminal, Layers, ArrowRight,
  Globe, Award, BookmarkCheck
} from 'lucide-react';
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import pythonCode from "./topic0_files/accessibility_audit_suite.py?raw";

// Interactive Assistive Technology Matrix Component
const AssistiveTechMatrix = () => {
  const [activeCategory, setActiveCategory] = useState('visual');

  const categories = {
    visual: {
      name: "Visual Accessibility (Blindness & Low Vision)",
      icon: Eye,
      color: "border-sky-500 text-sky-400 bg-sky-500/10",
      barriers: "Inability to see graphical icons, images without alt text, low-contrast text, mouse cursor pointers.",
      solutions: [
        { item: "Screen Readers (NVDA, JAWS, VoiceOver)", desc: "Software that parses semantic HTML and reads aloud text, buttons, and form labels using text-to-speech." },
        { item: "Refreshable Braille Displays", desc: "Electro-mechanical tactile pin boards raising dynamic Braille cells in real time from screen buffers." },
        { item: "Screen Magnifiers & High Contrast Themes", desc: "Software zooming active focus areas and inverting colors to maintain WCAG 4.5:1 minimum contrast." },
        { item: "Alternative Text (`alt` attribute)", desc: "Descriptive textual tags embedded in images so non-visual users perceive graphic contents." }
      ]
    },
    hearing: {
      name: "Auditory Accessibility (Deaf & Hard of Hearing)",
      icon: Volume2,
      color: "border-emerald-500 text-emerald-400 bg-emerald-500/10",
      barriers: "Audio-only notifications, video lectures without captions, audio CAPTCHAs, voice-only customer support.",
      solutions: [
        { item: "Closed Captioning (CC) & Subtitles", desc: "Synchronized textual transcripts of dialogue, ambient sound effects, and musical cues in video content." },
        { item: "Visual & Haptic Notifications", desc: "Screen flashes, border pulses, or device vibration alerts replacing acoustic audio error beeps." },
        { item: "Real-Time Speech-to-Text Transcription", desc: "AI-driven automatic speech recognition displaying live lecture captions on student displays." }
      ]
    },
    motor: {
      name: "Motor & Physical Accessibility (Tremors & Paralysis)",
      icon: Hand,
      color: "border-amber-500 text-amber-400 bg-amber-500/10",
      barriers: "Inability to manipulate physical mice, tiny touch targets, timeout countdowns requiring fast clicking.",
      solutions: [
        { item: "Eye-Tracking Camera Systems", desc: "Infrared gaze tracking allowing cursor positioning and dwell-clicking using only eye movements." },
        { item: "Sip-and-Puff / Adaptive Microswitches", desc: "Pneumatic tubes operated by inhaling/exhaling air or oversized buttons pressed with chin/feet." },
        { item: "100% Keyboard Operability", desc: "Complete navigation across all links, forms, and dialogs via `Tab`, `Shift+Tab`, and `Enter`." },
        { item: "Speech Dictation / Voice Typing", desc: "Hands-free voice recognition translating spoken sentences directly into code and text." }
      ]
    },
    cognitive: {
      name: "Cognitive & Neurodivergent Accessibility (Dyslexia, ADHD)",
      icon: Brain,
      color: "border-purple-500 text-purple-400 bg-purple-500/10",
      barriers: "Dense unformatted text, confusing navigation hierarchies, distracting auto-playing videos, strobe animations.",
      solutions: [
        { item: "Dyslexia-Friendly Fonts (OpenDyslexic)", desc: "Specially weighted bottom glyphs preventing letter flipping and visual character rotation." },
        { item: "Distraction-Free Reading Views", desc: "Simplified clean interfaces stripping sidebars, popups, and non-essential visual clutter." },
        { item: "Synchronized Text-to-Speech Highlighting", desc: "Bimodal reading tools highlighting active phrases on screen while reading aloud." }
      ]
    }
  };

  const curr = categories[activeCategory];
  const Icon = curr.icon;

  return (
    <div className="bg-slate-950/90 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <HeartHandshake size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Assistive Technology &amp; Disability Barrier Explorer
            </h3>
            <p className="text-xs text-slate-400">
              Explore assistive hardware, software adaptations, and inclusive design for Divyangjan (Persons with Disabilities).
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {Object.keys(categories).map((key) => {
          const item = categories[key];
          const TabIcon = item.icon;
          const isSelected = activeCategory === key;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                isSelected
                  ? `${item.color} shadow-lg scale-105 font-bold`
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <TabIcon size={18} className={isSelected ? item.color.split(' ')[1] : 'text-slate-500'} />
              <span className="text-xs truncate">{item.name.split('(')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Category Details */}
      <div className={`p-5 rounded-2xl border ${curr.color} space-y-4`}>
        <div className="flex items-center gap-2">
          <Icon size={20} className={curr.color.split(' ')[1]} />
          <h4 className="text-base font-bold text-white">{curr.name}</h4>
        </div>

        <div className="p-3 bg-slate-950/80 rounded-xl border border-white/10 text-xs">
          <span className="text-rose-300 font-bold block mb-0.5">Primary Digital Barriers Encountered:</span>
          <p className="text-slate-300">{curr.barriers}</p>
        </div>

        <div className="space-y-2.5 pt-1">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">Key Assistive Hardware &amp; Software Solutions:</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {curr.solutions.map((sol, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-white/10 space-y-1">
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                  <ArrowRight size={12} className="text-emerald-400 shrink-0" /> {sol.item}
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Topic0() {
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* SECTION 1: HEADER & BREADCRUMB */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/50 to-slate-900 border border-sky-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-sky-500/15 text-sky-400 border border-sky-500/30 text-xs font-bold rounded-full uppercase tracking-wider">
                Unit III: SLE · 15 Marks
              </span>
              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-full">
                Module 006_001 · Topic 0
              </span>
              <span className="px-3 py-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold rounded-full">
                Mandatory Prescribed Area
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Technology &amp; Society: Gender Disparity, Disability Accessibility &amp; Assistive Computing
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
              Explore the critical societal dimensions of digital computing as mandated by the official CBSE Class XI curriculum. Master gender parity in STEM, digital divides, disability barriers, assistive hardware (screen readers, Braille displays, eye-tracking), WCAG accessibility standards, and the Sugamya Bharat Abhiyan framework.
            </p>
          </div>
        </div>

        {/* SECTION 2: IN SIMPLE WORDS */}
        <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-lg space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">In Simple Words: Building Ramps into the Digital World</h2>
              <p className="text-xs text-slate-400">Why universal accessibility and gender equity matter in software engineering</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Just as modern schools in Barrackpore construct physical wheelchair ramps and elevators so every student can enter classrooms, computer scientists must build <strong>digital ramps</strong>—screen reader support, captions, high-contrast themes, and bias-free educational environments—ensuring technology empowers all humans regardless of physical ability or gender.
          </p>
        </div>

        {/* SECTION 3: FEMALE PIONEERS IN COMPUTING */}
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Award size={20} className="text-amber-400" />
            <h3 className="text-base font-bold text-white">Inspiring Female Pioneers in Computer Science History</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-amber-300 text-sm block">1. Ada Lovelace (1815–1852)</span>
              <p className="text-slate-300 leading-relaxed">
                The world’s first computer programmer. Published the first algorithm intended to be executed on Charles Babbage’s mechanical Analytical Engine in 1843.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-sky-300 text-sm block">2. Rear Admiral Grace Hopper</span>
              <p className="text-slate-300 leading-relaxed">
                Pioneered the first compiler (A-0) and English-like programming languages leading to COBOL. Popularized the term <em>"debugging"</em> after removing a moth from a relay.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-300 text-sm block">3. Katherine Johnson (NASA)</span>
              <p className="text-slate-300 leading-relaxed">
                Calculated orbital trajectories for Mercury and Apollo 11 missions, validating early electronic computer trajectory calculations manually.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 4: INTERACTIVE ASSISTIVE TECH MATRIX */}
        <div className="space-y-4">
          <AssistiveTechMatrix />
        </div>

        {/* SECTION 5: WCAG & SUGAMYA BHARAT ABHIYAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/70 p-5 rounded-2xl border border-sky-500/30 space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-sky-400" />
              <h4 className="text-sm font-bold text-white">WCAG 2.1 Principles (POUR)</h4>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li><strong className="text-white">1. Perceivable:</strong> Information must be presentable to users in ways they can perceive (Alt text, captions).</li>
              <li><strong className="text-white">2. Operable:</strong> UI must be fully navigable via keyboard alone (No mouse-only traps).</li>
              <li><strong className="text-white">3. Understandable:</strong> Clear language, consistent layouts, and helpful error messages.</li>
              <li><strong className="text-white">4. Robust:</strong> Compatible across browsers and diverse assistive screen readers.</li>
            </ul>
          </div>

          <div className="bg-slate-900/70 p-5 rounded-2xl border border-emerald-500/30 space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Sugamya Bharat &amp; RPwD Act 2016</h4>
            </div>
            <p className="text-slate-300 leading-relaxed">
              The <strong>Rights of Persons with Disabilities (RPwD) Act 2016</strong> and <strong>Sugamya Bharat Abhiyan</strong> mandate that all public portals, educational LMS platforms, and banking portals in India conform to GIGW (Guidelines for Indian Government Websites) accessibility compliance.
            </p>
          </div>
        </div>

        {/* SECTION 6: PYTHON LAB SCRIPT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Code size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Python Laboratory: Automated WCAG Color Contrast Audit Suite
              </h2>
              <p className="text-xs text-slate-400">
                A Python script calculating relative luminance and verifying WCAG AA (4.5:1) / AAA (7.0:1) contrast compliance ratios.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <PythonFileLoader
              fileModule={pythonCode}
              title="accessibility_audit_suite.py – WCAG Color Contrast & Accessibility Engine"
              highlightLines={[12, 25, 38, 52]}
            />
          </div>
        </div>

        {/* SECTION 7: COMMON PITFALLS & EXAM ALERTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
              <AlertTriangle size={16} /> Common Examination Pitfalls
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Ignoring WCAG POUR:</strong> When asked for accessibility principles, remembering the acronym <strong>POUR</strong> (Perceivable, Operable, Understandable, Robust).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400 font-bold shrink-0">✗</span>
                <span><strong>Assuming Accessibility is Only for Blind Users:</strong> Accessibility spans 4 categories: Visual, Hearing, Motor, and Cognitive impairments.</span>
              </li>
            </ul>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={16} /> Best Practices &amp; Inclusive Thinking
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Mention Key Assistive Hardware:</strong> Name Refreshable Braille displays, Eye-tracking cameras, and Sip-and-puff switches in 3-mark questions.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Cite Indian Frameworks:</strong> Mention <strong>Sugamya Bharat Abhiyan</strong> and <strong>RPwD Act 2016</strong> in societal impact questions.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 8: FAQ ASSESSMENT */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <HelpCircle size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Exam Preparation &amp; Conceptual Self-Assessment (25 Questions)
              </h2>
              <p className="text-xs text-slate-400">
                Test your mastery of gender parity in STEM, disability accessibility barriers, assistive technology, and WCAG standards.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <FAQTemplate questions={questions} />
          </div>
        </div>

        {/* SECTION 9: TEACHER'S NOTE & PRINTABLE SUMMARY */}
        <div className="space-y-6">
          <Teacher />

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-4 sm:p-6">
            <PlainTextPrint
              content={noteText}
              filename="006_001_technology_and_society_gender_disability_notes.txt"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
