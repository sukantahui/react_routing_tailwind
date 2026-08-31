import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import versionDemoCode from "./topic1_files/VersionEvolutionDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_001 · Topic 1
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            History & Evolution
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          History & Evolution of Java: From Oak to Modern LTS Releases
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Trace the 30-year journey of Java from smart appliance controller ("Oak" in 1991) to the world's most trusted enterprise language powering cloud microservices, big data, and Project Loom Virtual Threads.
        </p>
      </header>

      {/* Section 1: The Origin Story */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🌱</span> The Genesis: How James Gosling Created Oak
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In June 1991, at Sun Microsystems in California, a secret engineering task force known as the <strong>Green Team</strong>—led by <em>James Gosling</em>, <em>Mike Sheridan</em>, and <em>Patrick Naughton</em>—began designing a software platform for the next generation of interactive television set-top boxes and smart consumer electronics.
          </p>
          <p>
            Gosling quickly discovered that C and C++ were deeply flawed for consumer hardware due to manual memory corruption, lack of bounds checking, and tight coupling to specific CPU architectures. He set out to build a safe, robust, and platform-independent language, initially naming it <strong>"Oak"</strong> after an oak tree outside his office window.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300">
            <p className="font-medium text-amber-300 mb-1">Classroom Scenario (Shyamnagar to Ichapur):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Tuhina</strong> at our Shyamnagar learning academy asked why Oak was renamed to Java, we traced the historical trademark conflict with Oak Technology. During an intense team coffee break in 1995, the engineers picked <strong>"Java"</strong>—inspired by aromatic Indonesian Java coffee—creating a brand that now powers billions of devices from Ichapur to Wall Street!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Timeline */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>📅</span> Visual Evolution Timeline (1995 → 2026+)
        </h2>
        <p className="text-sm text-slate-400">
          Explore the landmark architectural leaps that transformed Java across four decades:
        </p>

        {/* Semantic Timeline SVG */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 380"
            className="w-full h-auto"
            aria-label="Java Evolutionary Milestones Timeline"
          >
            {/* Main Center Timeline Spine */}
            <line x1="60" y1="190" x2="820" y2="190" stroke="#475569" strokeWidth="4" strokeDasharray="6" />

            {/* Milestones */}
            {/* 1995: Java 1.0 */}
            <g className="transition-all duration-300 hover:scale-105">
              <circle cx="100" cy="190" r="14" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
              <rect x="30" y="70" width="140" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="100" y="95" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="13">
                1995 · Java 1.0
              </text>
              <text x="100" y="115" textAnchor="middle" fill="#94a3b8" fontSize="11">
                WORA Philosophy
              </text>
              <text x="100" y="132" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Applets & AWT
              </text>
              <text x="100" y="148" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Bytecode / JVM
              </text>
              <line x1="100" y1="160" x2="100" y2="176" stroke="#38bdf8" strokeWidth="2" />
            </g>

            {/* 2004: Java 5 */}
            <g className="transition-all duration-300 hover:scale-105">
              <circle cx="280" cy="190" r="14" fill="#f59e0b" stroke="#d97706" strokeWidth="3" />
              <rect x="210" y="220" width="140" height="105" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="280" y="245" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="13">
                2004 · Java 5.0
              </text>
              <text x="280" y="265" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Generics & Enums
              </text>
              <text x="280" y="282" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Autoboxing & Varargs
              </text>
              <text x="280" y="299" textAnchor="middle" fill="#94a3b8" fontSize="11">
                java.util.concurrent
              </text>
              <text x="280" y="315" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Annotations
              </text>
              <line x1="280" y1="204" x2="280" y2="220" stroke="#f59e0b" strokeWidth="2" />
            </g>

            {/* 2014: Java 8 LTS */}
            <g className="transition-all duration-300 hover:scale-105">
              <circle cx="460" cy="190" r="16" fill="#a855f7" stroke="#7e22ce" strokeWidth="3" />
              <rect x="390" y="60" width="140" height="105" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
              <text x="460" y="85" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="13">
                2014 · Java 8 LTS
              </text>
              <text x="460" y="105" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Lambda Expressions
              </text>
              <text x="460" y="122" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Stream API Pipelines
              </text>
              <text x="460" y="139" textAnchor="middle" fill="#94a3b8" fontSize="11">
                java.time Date API
              </text>
              <text x="460" y="155" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Optional & Defaults
              </text>
              <line x1="460" y1="165" x2="460" y2="174" stroke="#a855f7" strokeWidth="2" />
            </g>

            {/* 2021: Java 17 LTS */}
            <g className="transition-all duration-300 hover:scale-105">
              <circle cx="640" cy="190" r="14" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
              <rect x="570" y="220" width="140" height="105" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
              <text x="640" y="245" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="13">
                2021 · Java 17 LTS
              </text>
              <text x="640" y="265" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Sealed Classes
              </text>
              <text x="640" y="282" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Record Data Classes
              </text>
              <text x="640" y="299" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Pattern Matching
              </text>
              <text x="640" y="315" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Text Blocks (""")
              </text>
              <line x1="640" y1="204" x2="640" y2="220" stroke="#22c55e" strokeWidth="2" />
            </g>

            {/* 2023+: Java 21 LTS */}
            <g className="transition-all duration-300 hover:scale-105">
              <circle cx="790" cy="190" r="16" fill="#ec4899" stroke="#be185d" strokeWidth="3" />
              <rect x="720" y="60" width="140" height="105" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
              <text x="790" y="85" textAnchor="middle" fill="#f472b6" fontWeight="bold" fontSize="13">
                2023+ · Java 21 LTS
              </text>
              <text x="790" y="105" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Virtual Threads (Loom)
              </text>
              <text x="790" y="122" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Pattern Match Switch
              </text>
              <text x="790" y="139" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Record Patterns
              </text>
              <text x="790" y="155" textAnchor="middle" fill="#94a3b8" fontSize="11">
                Sequenced Collections
              </text>
              <line x1="790" y1="165" x2="790" y2="174" stroke="#ec4899" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Modern 6-Month Release Cadence */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>⏱️</span> The Modern 6-Month Release Cadence (LTS vs Non-LTS)
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Prior to 2018, Java releases were multi-year monolithic events (e.g. Java 7 took 5 years, Java 9 took 3.5 years). Starting with <strong>Java 10</strong>, Oracle and the OpenJDK community switched to a predictable <strong>time-driven 6-month release cadence</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li><strong>Feature Releases:</strong> Every 6 months (every March and September), shipping preview and finalized features rapidly.</li>
            <li><strong>Long-Term Support (LTS) Releases:</strong> Designated every 2 years (Java 8, Java 11, Java 17, Java 21) receiving multi-year enterprise maintenance, CVE security patches, and commercial support.</li>
          </ul>
        </div>
      </section>

      {/* Section 4: Hands-on Code with JavaFileLoader */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Source Code
        </h2>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Example: Java Milestone Evolution Simulator
          </h3>
          <JavaFileLoader
            fileModule={versionDemoCode}
            title="VersionEvolutionDemo.java"
            highlightLines={[8, 9, 10, 15, 20]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Misconceptions & Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Misconception: "Java is an Old, Stagnant Language"</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Beginners often confuse Java's 30-year maturity with stagnation. In reality, Java is evolving faster than almost any other enterprise language—adding Virtual Threads, Records, Sealed Classes, and Pattern Matching while maintaining 100% backward compatibility.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Standardize on LTS Versions in Production</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              While you should experiment with 6-month feature releases in development sandboxes, enterprise production deployments (Kubernetes, AWS, Banking servers) should strictly target LTS releases like <strong>Java 17 LTS</strong> and <strong>Java 21 LTS</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Hints & Thinking Guidance */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>“If Python 2 and Python 3 broke backward compatibility causing a painful 10-year migration crisis for the industry, how has Java managed to keep 25-year-old code running seamlessly on modern JVMs?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about the strict preservation of the JVM Bytecode Specification and semantic version contracts maintained by the Java Community Process (JCP).
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="History & Evolution of Java FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 1: History and Evolution of Java"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic1_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="When learning Java, don't just memorize syntax. Appreciate WHY each feature was added: Java 5 fixed type safety with Generics, Java 8 simplified concurrency with Streams, and Java 21 eliminated async callback hell with Virtual Threads. Understanding the evolutionary purpose will make you an extraordinary engineer. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
