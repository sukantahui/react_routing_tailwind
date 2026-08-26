import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import constructorRulesDemoCode from "./topic1_files/ConstructorRulesAndSyntaxDemo.java?raw";
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
          @keyframes syntaxGlow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-syntax {
            animation: syntaxGlow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_002 · Topic 1
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Constructor Syntax &amp; Rules
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Rules of Writing Constructors: Name Matches Class, No Return Type
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the exact grammatical laws and compiler constraints governing constructor declarations in Java: exploring exact case-sensitive name matching, the catastrophic <code className="text-rose-400 font-mono">&apos;void&apos;</code> return type trap, permitted access modifiers, and analyzing why <code className="text-amber-400 font-mono">static</code>, <code className="text-amber-400 font-mono">final</code>, and <code className="text-amber-400 font-mono">abstract</code> are strictly forbidden.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          <span>📜</span> The 5 Golden Rules of Constructor Declaration
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Constructors occupy a unique syntactic position in Java, governed by 5 uncompromisable compiler rules:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">1. Exact Name Match</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Constructor identifier must match the class name with 100% exact case sensitivity (<code className="text-purple-300 font-mono">public CourseRegistration(...)</code>).
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-sm mb-1">2. Zero Return Type</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Must NOT declare any return type. Adding <code className="text-rose-300 font-mono">void</code> converts it into a standard method that <code className="text-rose-300 font-mono">new</code> will never run!
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">3. Permitted Visibility</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Can be declared <code className="text-emerald-300 font-mono">public</code>, <code className="text-emerald-300 font-mono">protected</code>, package-private, or <code className="text-emerald-300 font-mono">private</code>.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (The &apos;void&apos; Constructor Trap in Barrackpore Hub):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> wrote <code className="text-rose-400 font-mono">public void CourseRegistrationTrap(...)</code>, the compiler treated it as a regular instance method. When <code className="text-slate-200 font-mono">new CourseRegistrationTrap()</code> was executed, the compiler&apos;s default no-arg constructor ran instead, leaving his fee as <code className="text-amber-300 font-mono">₹0.0</code> and name as <code className="text-rose-400 font-mono">null</code>!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Constructor Grammar: Permitted Modifiers vs Prohibited Keywords
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing the syntactic anatomy and compiler rules of Java constructors:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 320"
            className="w-full h-auto"
            aria-label="Constructor Syntax and Modifier Rules Diagram"
          >
            {/* Box 1: Permitted Modifiers */}
            <rect x="25" y="25" width="260" height="270" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="155" y="52" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">PERMITTED MODIFIERS</text>
            <text x="155" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">Access Control Scopes</text>

            <rect x="35" y="85" width="240" height="40" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="45" y="110" fill="#a7f3d0" fontSize="9" fontFamily="monospace">&check; public Student(...) [Global]</text>

            <rect x="35" y="135" width="240" height="40" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="45" y="160" fill="#a7f3d0" fontSize="9" fontFamily="monospace">&check; protected Student(...) [Pkg+Sub]</text>

            <rect x="35" y="185" width="240" height="40" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="45" y="210" fill="#a7f3d0" fontSize="9" fontFamily="monospace">&check; Student(...) [Package-Private]</text>

            <rect x="35" y="235" width="240" height="40" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="45" y="260" fill="#a7f3d0" fontSize="9" fontFamily="monospace">&check; private Student(...) [Singleton]</text>

            {/* Box 2: Valid Constructor Syntax */}
            <rect x="305" y="25" width="310" height="270" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
            <text x="460" y="52" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">ANATOMY OF A TRUE CONSTRUCTOR</text>
            <text x="460" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">Compiler Verified Signature</text>

            <rect x="315" y="85" width="290" height="60" rx="6" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1" />
            <text x="325" y="105" fill="#f3e8ff" fontSize="10" fontWeight="bold">Signature Anatomy:</text>
            <text x="325" y="125" fill="#fde047" fontSize="9" fontFamily="monospace">public Student(int id, String name)</text>
            <text x="325" y="138" fill="#c7d2fe" fontSize="8">&rarr; NO return type! Name matches &apos;Student&apos;</text>

            <rect x="315" y="155" width="290" height="120" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <text x="325" y="175" fill="#34d399" fontSize="9" fontWeight="bold">Execution Characteristics:</text>
            <text x="325" y="195" fill="#a7f3d0" fontSize="8">&bull; Bytecode name: &lt;init&gt;</text>
            <text x="325" y="210" fill="#a7f3d0" fontSize="8">&bull; Opcode: invokespecial</text>
            <text x="325" y="225" fill="#a7f3d0" fontSize="8">&bull; Invoked ONLY via &apos;new&apos;, this(), super()</text>
            <text x="325" y="255" fill="#fde047" fontSize="8" fontWeight="bold">&check; Forges living Heap instance</text>

            {/* Box 3: Prohibited Modifiers */}
            <rect x="635" y="25" width="260" height="270" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
            <text x="765" y="52" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">PROHIBITED MODIFIERS</text>
            <text x="765" y="68" fill="#94a3b8" fontSize="8" textAnchor="middle">Compiler Enforced Illegal Keywords</text>

            <rect x="645" y="85" width="240" height="40" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="655" y="110" fill="#fca5a5" fontSize="9" fontFamily="monospace">&times; static (No &apos;this&apos; context)</text>

            <rect x="645" y="135" width="240" height="40" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="655" y="160" fill="#fca5a5" fontSize="9" fontFamily="monospace">&times; final (Never overridden)</text>

            <rect x="645" y="185" width="240" height="40" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="655" y="210" fill="#fca5a5" fontSize="9" fontFamily="monospace">&times; abstract (Must have body)</text>

            <rect x="645" y="235" width="240" height="40" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="655" y="260" fill="#fca5a5" fontSize="9" fontFamily="monospace">&times; synchronized (Thread exclusive)</text>
          </svg>
        </div>
      </section>

      {/* Section 3: Live Interactive Java Demonstration */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
            <span>💻</span> Production Java Demonstration
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
            ConstructorRulesAndSyntaxDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The executable Java code below demonstrates the real-world trap of adding <code className="text-rose-400 font-mono">void</code> to a constructor, contrasting it with a 100% rule-compliant constructor:
        </p>

        <JavaFileLoader
          fileName="ConstructorRulesAndSyntaxDemo.java"
          code={constructorRulesDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; Syntax Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Case-Sensitive Exact Match
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The constructor name must match the class name with exact casing. Mismatched casing causes a compile error: <code className="text-rose-300 font-mono">invalid method declaration; return type required</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> The &apos;void&apos; Return Type Trap
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Adding <code className="text-rose-300 font-mono">void</code> transforms the constructor into a standard instance method. Calling <code className="text-slate-300 font-mono">new ClassName()</code> will bypass your method entirely!
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Prohibited Modifiers
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Constructors can NEVER be marked <code className="text-purple-300 font-mono">static</code>, <code className="text-purple-300 font-mono">final</code>, <code className="text-purple-300 font-mono">abstract</code>, or <code className="text-purple-300 font-mono">synchronized</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Plain &apos;return;&apos; is Legal
            </h3>
            <p className="text-slate-300 leading-relaxed">
              A constructor can contain a plain <code className="text-amber-300 font-mono">return;</code> statement for early exit, but returning any value (<code className="text-rose-400 font-mono">return val;</code>) causes a compile error.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Defensive Best Practices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Bad Practice */}
          <div className="p-5 bg-rose-950/20 rounded-xl border border-rose-500/30 space-y-3">
            <h3 className="text-rose-400 font-bold text-base flex items-center gap-2">
              <span>❌</span> Pitfall: Calling Constructor Directly on Existing Object
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Attempting to call <code className="text-rose-300 font-mono">obj.Student()</code> on an already existing instance causes a compile error. Constructors are not methods and cannot be re-invoked.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// COMPILE ERROR:
Student s = new Student();
s.Student(); // cannot find symbol method Student()`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Invoke via &apos;new&apos; or Constructor Chaining
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Constructors are invoked strictly during instantiation with <code className="text-emerald-300 font-mono">new</code> or chained via <code className="text-emerald-300 font-mono">this(...)</code> / <code className="text-emerald-300 font-mono">super(...)</code>.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// CORRECT INVOCATION:
Student s = new Student("Swadeep"); // 'new' invokes constructor
public Student() { this("Swadeep"); } // 'this()' chains`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-purple-500/10 via-sky-500/10 to-emerald-500/10 p-6 md:p-8 rounded-2xl border border-purple-500/30">
        <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why does Java allow methods to have the exact same name as the class?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Java allows a regular method to be named <code className="text-purple-300 font-mono">public void Student()</code> for historical backward compatibility with C++ syntax parsers. However, modern IDEs flag this as a critical warning (<code className="text-amber-300 font-mono">&ldquo;Method name is same as class name&rdquo;</code>). In professional enterprise code, naming a method after the class is considered an egregious anti-pattern that leads to severe initialization bugs!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="A constructor is not a method; it has no return type, bears the proud name of its class, and exists solely to forge a valid living object in memory. Respect the 5 golden rules, never poison a constructor with 'void', and your object architecture will stand solid."
        mentor="Sukanta Hui"
        role="Lead Java Architect & Senior Academic Mentor"
        location="Barrackpore & Naihati Campus, West Bengal"
      />

      {/* Section 8: FAQ Catalog */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>❓</span> Frequently Asked Technical Questions (30 Q&amp;As)
        </h2>
        <FAQTemplate questions={questions} />
      </section>

      {/* Section 9: Plain Text Printable Reference */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-300 flex items-center gap-2">
            <span>🖨️</span> Printable Quick Reference Note
          </h2>
        </div>
        <PlainTextPrint
          content={noteText}
          fileName="Topic1_Constructor_Rules_and_Syntax_Note.txt"
        />
      </section>
    </div>
  );
}
