import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import dataHidingDemoCode from "./topic11_files/DataHidingPrivateModifierDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes vaultLock {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(139, 92, 246, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-vault-lock {
            animation: vaultLock 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Data Hiding &amp; Access Control
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Data Hiding: Restricting Direct Field Access Using the <code className="text-purple-400 font-mono">&apos;private&apos;</code> Modifier
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the defensive core of data hiding in Java: understanding how the <code className="text-purple-400 font-mono">private</code> modifier enforces compile-time and bytecode-level barriers against direct field manipulation, protecting sensitive domain secrets, implementing masked accessors, and leveraging Java 11+ Nestmates.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
          <span>🔒</span> The Architecture of Data Hiding
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Data Hiding is the precise mechanism of making internal fields and helper routines inaccessible to any external class using the <code className="text-purple-400 font-mono">private</code> modifier:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">1. Compile-Time Barrier</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Direct external access (<code className="text-rose-300">vault.password</code>) is halted at compile time with a private access violation error.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">2. Secret Protection</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Raw secrets, cryptographic salts, and internal algorithms remain forever hidden behind private member boundaries.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">3. Masked Exposure</h3>
              <p className="text-slate-300 font-sans text-xs leading-relaxed">
                Exposing only safe, redacted metadata (e.g. <code className="text-emerald-300">s***l@domain.com</code>) to prevent data leakage in logs.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (Barrackpore Credential Vault):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> registered his academy credentials, his plain password was immediately hashed into a private SHA-256 string. Outside code could never read or overwrite his hash. When an unauthorized attacker attempted 3 consecutive incorrect passwords, our private lockout invariant locked the account automatically!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The &apos;private&apos; Security Wall: Blocked Direct Access vs Authorized Method Gates
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing how the compiler blocks unauthorized external field writes while channeling requests through public teller methods:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 320"
            className="w-full h-auto"
            aria-label="Private Access Security Wall Diagram"
          >
            <defs>
              <marker
                id="blockArrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
              <marker
                id="allowArrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
              </marker>
            </defs>

            {/* Left Box: External Caller Class */}
            <rect x="25" y="25" width="280" height="270" rx="10" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <text x="165" y="52" fill="#94a3b8" fontSize="13" fontWeight="bold" textAnchor="middle">EXTERNAL CALLER CLASS</text>
            <text x="165" y="68" fill="#64748b" fontSize="9" textAnchor="middle">Outside Application Package</text>

            <rect x="40" y="85" width="250" height="60" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="50" y="105" fill="#fca5a5" fontSize="10" fontFamily="monospace">vault.saltedPasswordHash = "x";</text>
            <text x="50" y="125" fill="#f87171" fontSize="9" fontWeight="bold">&times; COMPILE ERROR: private access</text>

            <rect x="40" y="155" width="250" height="60" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="50" y="175" fill="#fca5a5" fontSize="10" fontFamily="monospace">vault.failedAttempts = 0;</text>
            <text x="50" y="195" fill="#f87171" fontSize="9" fontWeight="bold">&times; COMPILE ERROR: private access</text>

            <rect x="40" y="225" width="250" height="55" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="50" y="245" fill="#a7f3d0" fontSize="10" fontFamily="monospace">vault.authenticate("pwd123");</text>
            <text x="50" y="265" fill="#4ade80" fontSize="9" fontWeight="bold">&check; VALID: Public Method Gate</text>

            {/* Middle: The 'private' Security Wall */}
            <line x1="345" y1="25" x2="345" y2="295" stroke="#a855f7" strokeWidth="4" strokeDasharray="8 4" />
            <text x="345" y="165" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(-90 345 165)">
              THE &apos;private&apos; SECURITY WALL
            </text>

            {/* Right Box: Secure Vault Class */}
            <rect x="380" y="25" width="515" height="270" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
            <text x="637" y="52" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">SecureStudentCredentialVault (INSIDE CAPSULE)</text>
            <text x="637" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Encapsulated Private State &amp; Cryptographic Helpers</text>

            {/* Public Teller Windows */}
            <rect x="395" y="85" width="485" height="55" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
            <text x="405" y="105" fill="#a7f3d0" fontSize="10" fontWeight="bold">Public Authorized Teller Windows:</text>
            <text x="405" y="125" fill="#fde047" fontSize="9" fontFamily="monospace">+ authenticate(pwd) | + changePassword(old, new) | + getMaskedEmail()</text>

            {/* Hidden Vault Chamber */}
            <rect x="395" y="150" width="485" height="130" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="405" y="172" fill="#e0e7ff" fontSize="10" fontWeight="bold">Protected Private Vault Chamber (Inaccessible from Outside):</text>
            <text x="405" y="192" fill="#c7d2fe" fontSize="9" fontFamily="monospace">- private String saltedPasswordHash (SHA-256 Hash)</text>
            <text x="405" y="208" fill="#c7d2fe" fontSize="9" fontFamily="monospace">- private int failedLoginAttemptsCount (Brute-force counter)</text>
            <text x="405" y="224" fill="#c7d2fe" fontSize="9" fontFamily="monospace">- private boolean isAccountLocked (Security invariant)</text>
            <text x="405" y="240" fill="#fca5a5" fontSize="9" fontFamily="monospace">- private String computeSha256Hash(...) [Hidden Crypto Method]</text>
            <text x="405" y="265" fill="#a7f3d0" fontSize="8">&check; Bytecode verifier enforces access rules natively in JVM</text>

            {/* Pointers */}
            <path d="M 290 115 L 340 115" stroke="#ef4444" strokeWidth="2" markerEnd="url(#blockArrow)" />
            <path d="M 290 185 L 340 185" stroke="#ef4444" strokeWidth="2" markerEnd="url(#blockArrow)" />
            <path d="M 290 250 L 395 115" stroke="#10b981" strokeWidth="2" markerEnd="url(#allowArrow)" />
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
            DataHidingPrivateModifierDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The runnable source code below showcases private cryptographic hashing, masked accessors, brute-force lockout invariants, and password verification workflows:
        </p>

        <JavaFileLoader
          fileName="DataHidingPrivateModifierDemo.java"
          code={dataHidingDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; Security Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Class-Based Access Control
            </h3>
            <p className="text-slate-300 leading-relaxed">
              In Java, access control is class-based rather than instance-based. Any method in Class A can directly access private fields of another instance of Class A (<code className="text-sky-300 font-mono">other.privateField</code>).
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Java 11+ Nestmates (JEP 181)
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Inner nested classes and outer enclosing classes share private members natively in bytecode without generating synthetic <code className="text-emerald-300 font-mono">access$000</code> bridge methods.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Private Methods Cannot Be Overridden
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Subclasses do not inherit private methods. If a child class defines a method with the same signature, it is treated as a completely separate method, not a polymorphic override.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Masked Accessors for PII
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Sensitive information like email addresses or phone numbers should be exposed through masked accessors (<code className="text-amber-300 font-mono">getMaskedEmail()</code>) to prevent data leakage in logging pipelines.
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
              <span>❌</span> Pitfall: Exposing Plaintext Passwords or Raw Secrets via Getters
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Providing a public getter for a private password or secret key completely defeats Data Hiding and exposes confidential credentials to reflection and log scrapers.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// DANGEROUS: Leaks raw private secret!
private String password;
public String getPassword() {
    return this.password; // NEVER DO THIS!
}`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Store Cryptographic Hashes &amp; Provide Verifier Methods
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Store salted hashes internally and expose only verification methods (<code className="text-emerald-300 font-mono">authenticate(password)</code>) that return boolean outcomes without ever revealing the secret.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// SAFE: Validates without exposing hash
private String saltedHash;
public boolean authenticate(String input) {
    return this.saltedHash.equals(hash(input));
}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-purple-500/10 via-sky-500/10 to-emerald-500/10 p-6 md:p-8 rounded-2xl border border-purple-500/30">
        <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why does Java allow private interface methods?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Starting in <strong>Java 9</strong>, interfaces were granted the ability to declare <code className="text-purple-300 font-mono">private</code> static and instance methods. When multiple <code className="text-purple-300 font-mono">default</code> methods in a large interface share duplicate validation or algorithmic logic, private interface methods allow developers to refactor that shared code into private helpers without leaking those implementation details into the public API of implementing classes!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="A bank does not leave currency on the pavement—it locks the cash in an underground vault and opens a fortified teller window. Treat your class fields as currency in a vault; make them private, and let authorized public methods be your tellers."
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
          fileName="Topic11_Data_Hiding_Private_Modifier_Note.txt"
        />
      </section>
    </div>
  );
}
