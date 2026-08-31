import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import helloWorldCode from "./topic0_files/HelloWorld.java?raw";
import enterpriseDemoCode from "./topic0_files/EnterpriseStackDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseSubtle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.85; }
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
            Module 001_001 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          What is Java and Where It Is Used
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build an unshakable mental model of Java: its core architectural philosophy, the “Write Once, Run Anywhere” guarantee, and why it powers 90%+ of global enterprise infrastructure.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Core Definition of Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Java</strong> is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. Conceived by <em>James Gosling</em> at Sun Microsystems in 1995 (now maintained by Oracle), Java introduced the revolutionary programming paradigm: <span className="text-amber-300 font-semibold">“Write Once, Run Anywhere” (WORA)</span>.
          </p>
          <p>
            Java is not merely a language—it is also a complete <strong>software platform</strong> comprising the Java Virtual Machine (JVM), core class libraries (API), and developer tooling that abstract the underlying hardware.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300">
            <p className="font-medium text-sky-300 mb-1">Classroom Analogy (Barrackpore to Naihati):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep</strong> writes a Java program in our Barrackpore computer laboratory on a Windows 11 machine, compiles it into bytecode (<code className="text-amber-300">.class</code>), and passes it to <strong>Abhronila</strong> in Naihati running Linux, and <strong>Debangshu</strong> in Shyamnagar running macOS—the program executes identically on all three machines without modifying or recompiling a single line of code!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> How Java Achieves Universal Portability (WORA)
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Traditional languages compile directly to native OS machine code. Java compiles to intermediate <strong>bytecode</strong>, which is executed by the platform-specific JVM.
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 850 300"
            className="w-full h-auto"
            aria-label="Java Platform Independence Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradSource" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradBytecode" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
              <linearGradient id="gradJVM" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
            </defs>

            {/* Step 1: Source Code */}
            <g className="transition-all duration-300 hover:opacity-90">
              <rect x="30" y="110" width="160" height="80" rx="12" fill="url(#gradSource)" />
              <text x="110" y="145" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="14">
                Source Code
              </text>
              <text x="110" y="165" textAnchor="middle" fill="#0f172a" fontSize="12" fontFamily="monospace">
                HelloWorld.java
              </text>
            </g>

            {/* Arrow 1: Javac */}
            <path d="M 190 150 L 250 150" stroke="#94a3b8" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="220" y="140" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
              javac
            </text>

            {/* Step 2: Bytecode */}
            <g className="transition-all duration-300 hover:opacity-90">
              <rect x="250" y="110" width="160" height="80" rx="12" fill="url(#gradBytecode)" />
              <text x="330" y="145" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="14">
                Bytecode
              </text>
              <text x="330" y="165" textAnchor="middle" fill="#0f172a" fontSize="12" fontFamily="monospace">
                HelloWorld.class
              </text>
            </g>

            {/* Arrow 2: To JVMs */}
            <path d="M 410 150 L 480 70" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
            <path d="M 410 150 L 480 150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />
            <path d="M 410 150 L 480 230" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4" />

            {/* Step 3: Platform JVMs */}
            {/* Windows JVM */}
            <g className="transition-all duration-300 hover:opacity-90">
              <rect x="480" y="40" width="150" height="60" rx="10" fill="url(#gradJVM)" />
              <text x="555" y="70" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                JVM (Windows)
              </text>
              <text x="555" y="86" textAnchor="middle" fill="#e9d5ff" fontSize="11">
                Native Win x64 Binary
              </text>
            </g>

            {/* Linux JVM */}
            <g className="transition-all duration-300 hover:opacity-90">
              <rect x="480" y="120" width="150" height="60" rx="10" fill="url(#gradJVM)" />
              <text x="555" y="150" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                JVM (Linux)
              </text>
              <text x="555" y="166" textAnchor="middle" fill="#e9d5ff" fontSize="11">
                Native ELF Binary
              </text>
            </g>

            {/* macOS JVM */}
            <g className="transition-all duration-300 hover:opacity-90">
              <rect x="480" y="200" width="150" height="60" rx="10" fill="url(#gradJVM)" />
              <text x="555" y="230" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                JVM (macOS ARM)
              </text>
              <text x="555" y="246" textAnchor="middle" fill="#e9d5ff" fontSize="11">
                Native Mach-O Binary
              </text>
            </g>

            {/* Result Badges */}
            <g>
              <rect x="670" y="45" width="150" height="50" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
              <text x="745" y="75" textAnchor="middle" fill="#4ade80" fontWeight="semibold" fontSize="12">
                ✓ Runs on Windows 11
              </text>

              <rect x="670" y="125" width="150" height="50" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
              <text x="745" y="155" textAnchor="middle" fill="#4ade80" fontWeight="semibold" fontSize="12">
                ✓ Runs on Ubuntu Server
              </text>

              <rect x="670" y="205" width="150" height="50" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
              <text x="745" y="235" textAnchor="middle" fill="#4ade80" fontWeight="semibold" fontSize="12">
                ✓ Runs on Apple Silicon
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Real-World Enterprise Applications */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🌐</span> Where is Java Used in Industry?
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java is the backbone of the global enterprise software economy. Here is where Java dominates:
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 hover:border-sky-500/50 transition-all">
              <h3 className="font-bold text-sky-400 text-lg mb-1">1. Global Banking & Financial Ledgers</h3>
              <p className="text-sm text-slate-300">
                Over 90% of Fortune 500 banks (HDFC, SBI, Goldman Sachs, Citi) build their core transaction engines in Java. Java’s strict memory model, high concurrency, and exact arithmetic precision (<code className="text-amber-300">BigDecimal</code>) guarantee zero data loss.
              </p>
            </div>

            <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 hover:border-purple-500/50 transition-all">
              <h3 className="font-bold text-purple-400 text-lg mb-1">2. Big Data & Real-Time Streaming</h3>
              <p className="text-sm text-slate-300">
                The entire modern Big Data stack—including <strong>Apache Kafka</strong> (event streaming), <strong>Apache Spark</strong> (distributed analytics), <strong>Apache Cassandra</strong>, and <strong>Hadoop</strong>—is implemented on the JVM.
              </p>
            </div>

            <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 hover:border-emerald-500/50 transition-all">
              <h3 className="font-bold text-emerald-400 text-lg mb-1">3. Cloud Microservices & High-Throughput APIs</h3>
              <p className="text-sm text-slate-300">
                Enterprises power mission-critical cloud backends on AWS, Azure, and GCP using <strong>Spring Boot</strong>, <strong>Quarkus</strong>, and <strong>Micronaut</strong> with Java 21 Virtual Threads (Project Loom) handling millions of concurrent requests.
              </p>
            </div>

            <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 hover:border-pink-500/50 transition-all">
              <h3 className="font-bold text-pink-400 text-lg mb-1">4. Android Mobile Application Ecosystem</h3>
              <p className="text-sm text-slate-300">
                Over 3 billion active Android smartphones execute apps compiled from Java and Kotlin, utilizing the Android runtime engine derived from standard Java paradigms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Code Examples with JavaFileLoader */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Source Code
        </h2>
        <p className="text-sm text-slate-400">
          Inspect standard Java application structure below. Notice the class declaration, <code className="text-amber-300">main</code> entry point, and output statements.
        </p>

        {/* Code Block 1 */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Example 1: Fundamental Java Program Structure
          </h3>
          <JavaFileLoader
            fileModule={helloWorldCode}
            title="HelloWorld.java"
            highlightLines={[7, 8, 11, 15]}
          />
        </div>

        {/* Code Block 2 */}
        <div className="space-y-2 pt-4">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Example 2: Enterprise Banking Transaction Simulation
          </h3>
          <JavaFileLoader
            fileModule={enterpriseDemoCode}
            title="EnterpriseStackDemo.java"
            highlightLines={[8, 12, 17]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Beginner Pitfalls & Professional Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Mismatched Class and File Name</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If your file contains <code className="text-amber-300">public class HelloWorld</code>, the file name on disk <strong>MUST</strong> be exactly <code className="text-amber-300">HelloWorld.java</code> (case-sensitive). Naming it <code className="text-rose-300">helloworld.java</code> or <code className="text-rose-300">Main.java</code> will trigger a compilation error.
            </p>
          </div>

          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">2. Typing the Main Method Signature Incorrectly</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The JVM specifically looks for the exact signature: <code className="text-amber-300">public static void main(String[] args)</code>. Omitting <code className="text-rose-300">static</code>, using <code className="text-rose-300">string</code> with lowercase 's', or returning <code className="text-rose-300">int</code> will compile but fail at runtime with <code className="text-rose-400">NoSuchMethodError: main</code>.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">3. Professional Tip: Clean Formatting & Java Naming Conventions</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Always use <strong>PascalCase</strong> for class names (<code className="text-amber-300">StudentManager</code>, <code className="text-amber-300">TransactionLedger</code>), <strong>camelCase</strong> for variables/methods (<code className="text-amber-300">accountBalance</code>, <code className="text-amber-300">calculateInterest()</code>), and <strong>UPPER_SNAKE_CASE</strong> for constants (<code className="text-amber-300">MAX_RETRY_COUNT</code>).
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
            🤔 <em>“Why does C compilation produce a `.exe` on Windows and an ELF binary on Linux, whereas Java compilation produces a universal `.class` file on all operating systems?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about who translates instructions into CPU machine code—is it the compiler at build-time, or the native JVM at runtime?
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="What is Java and Where It Is Used FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 0: What is Java and Where It Is Used"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic0_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Remember: In your software development career, tools and frameworks will come and go, but strong fundamentals in Java bytecode, memory lifecycle, and object-oriented design will anchor you for decades. Always visualize what the JVM is doing under the hood. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
