import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import envDemoCode from "./topic8_files/EnvironmentSetupDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
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
            Module 001_001 · Topic 8
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Environment Setup
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Installing OpenJDK & Configuring JAVA_HOME and PATH Variables
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Set up a bulletproof Java development environment on Windows, Linux, and macOS. Learn how to configure <code className="text-amber-300">JAVA_HOME</code> and <code className="text-amber-300">PATH</code> so terminal compilers, Maven, and modern IDEs function flawlessly.
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>⚙️</span> Why Proper Environment Setup Matters
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Before writing a single line of Java code, your operating system needs to know two critical things:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>JAVA_HOME:</strong> The root folder where your JDK is installed (used by Maven, Gradle, Tomcat, Android Studio).</li>
            <li><strong>PATH:</strong> The list of directories where the OS searches for executable binaries like <code className="text-amber-300">javac</code> and <code className="text-amber-300">java</code>.</li>
          </ul>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300">
            <p className="font-medium text-emerald-300 mb-1">Classroom Scenario (Barrackpore Lab):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Debangshu</strong> set up his laptop in our Barrackpore lab, he initially put <code className="text-rose-400">C:\Program Files\Java\jdk-21\bin</code> into JAVA_HOME. When he ran Maven, it failed with <code className="text-rose-400">JAVA_HOME is invalid</code> because Maven appends <code className="text-amber-300">\bin</code> automatically! Removing <code className="text-rose-400">\bin</code> from JAVA_HOME instantly solved the issue.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🛠️</span> Visual Configuration Workflow
        </h2>
        <p className="text-sm text-slate-400">
          Follow the 3-step setup sequence from installation to terminal verification:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 280"
            className="w-full h-auto"
            aria-label="JDK Environment Configuration Workflow"
          >
            {/* Step 1: Install JDK */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="30" y="70" width="240" height="135" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="150" y="100" textAnchor="middle" fill="#38bdf8" fontWeight="bold" fontSize="14">
                Step 1: Install OpenJDK
              </text>
              <text x="150" y="125" textAnchor="middle" fill="#cbd5e1" fontSize="11">
                Download Eclipse Temurin 21
              </text>
              <rect x="50" y="140" width="200" height="45" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="150" y="160" textAnchor="middle" fill="#fde047" fontSize="10" fontFamily="monospace">
                C:\Java\jdk-21
              </text>
              <text x="150" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">
                (Root Installation Folder)
              </text>
            </g>

            {/* Arrow 1 */}
            <path d="M 270 135 L 320 135" stroke="#38bdf8" strokeWidth="2.5" />

            {/* Step 2: Configure Variables */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="320" y="70" width="240" height="135" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
              <text x="440" y="100" textAnchor="middle" fill="#c084fc" fontWeight="bold" fontSize="14">
                Step 2: Set Variables
              </text>
              <rect x="335" y="115" width="210" height="35" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="440" y="132" textAnchor="middle" fill="#4ade80" fontSize="10" fontFamily="monospace">
                JAVA_HOME = C:\Java\jdk-21
              </text>

              <rect x="335" y="155" width="210" height="35" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="440" y="172" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                PATH += %JAVA_HOME%\bin
              </text>
            </g>

            {/* Arrow 2 */}
            <path d="M 560 135 L 610 135" stroke="#a855f7" strokeWidth="2.5" />

            {/* Step 3: Verify in Terminal */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="610" y="70" width="240" height="135" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
              <text x="730" y="100" textAnchor="middle" fill="#4ade80" fontWeight="bold" fontSize="14">
                Step 3: Verify Terminal
              </text>
              <rect x="625" y="115" width="210" height="75" rx="6" fill="#0f172a" stroke="#166534" />
              <text x="635" y="135" fill="#86efac" fontSize="10" fontFamily="monospace">
                &gt; javac -version
              </text>
              <text x="635" y="150" fill="#cbd5e1" fontSize="9" fontFamily="monospace">
                javac 21.0.2
              </text>
              <text x="635" y="168" fill="#86efac" fontSize="10" fontFamily="monospace">
                &gt; java -version
              </text>
              <text x="635" y="182" fill="#4ade80" fontSize="9" fontFamily="monospace" fontWeight="bold">
                ✓ 100% Operational!
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Step-by-Step OS Guide */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📋</span> Step-by-Step Commands by OS
        </h2>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="font-bold text-sky-400 text-lg">Windows Setup Commands (PowerShell)</h3>
            <pre className="p-3 bg-slate-950 rounded text-emerald-300 font-mono text-xs overflow-x-auto">
{`# 1. Install via Winget (Eclipse Temurin 21)
winget install EclipseAdoptium.Temurin.21.JDK

# 2. Test in Fresh PowerShell Window
javac -version
java -version`}
            </pre>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="font-bold text-emerald-400 text-lg">Linux (Ubuntu / Debian) Setup Commands</h3>
            <pre className="p-3 bg-slate-950 rounded text-emerald-300 font-mono text-xs overflow-x-auto">
{`# 1. Update and install OpenJDK 21
sudo apt update && sudo apt install -y openjdk-21-jdk

# 2. Append JAVA_HOME to user profile
echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc`}
            </pre>
          </div>
        </div>
      </section>

      {/* Section 4: Hands-on Code with JavaFileLoader */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Source Code
        </h2>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Example: Environment & Runtime Property Verification
          </h3>
          <JavaFileLoader
            fileModule={envDemoCode}
            title="EnvironmentSetupDemo.java"
            highlightLines={[8, 9, 10, 11, 14, 15, 16, 17]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Setup Pitfalls & Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Old Java in PATH Overriding New JDK</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If an older Java version was installed previously, Windows might find the old <code className="text-rose-300">java.exe</code> first. In your System PATH, move <code className="text-emerald-300">%JAVA_HOME%\bin</code> to the very top to take priority!
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Verify in a Fresh Terminal Window</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Always close your terminal and open a brand new window after editing environment variables, as running terminals do not detect registry changes dynamically.
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
            🤔 <em>“Why does typing `where java` in Windows CMD sometimes display two or three different file paths?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Windows searches PATH sequentially from top to bottom and executes the first matching executable it finds!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="JDK Installation & Environment Setup FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 8: Installing JDK & Environment Variables"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic8_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="A clean, verified development environment is the signature of a professional engineer. Ensure your JAVA_HOME and PATH are configured correctly on day one, and you will never experience mysterious build failures or IDE SDK synchronization headaches. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
