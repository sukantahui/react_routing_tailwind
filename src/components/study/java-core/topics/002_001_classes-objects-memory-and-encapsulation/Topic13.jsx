import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import gettersSettersDemoCode from "./topic13_files/GettersSettersConventionsDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bridgeGlow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-bridge {
            animation: bridgeGlow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 002_001 · Topic 13
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            JavaBean Standards &amp; Framework Contracts
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Getter and Setter Methods: Accessor and Mutator Conventions
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the official JavaBeans Specification conventions for accessors and mutators: dissecting <code className="text-sky-400 font-mono">get...()</code> vs <code className="text-emerald-400 font-mono">is...()</code> boolean conventions, understanding how Spring Boot, Jackson, and Hibernate use Reflection introspection to map JSON payloads and database columns, and building modern fluent chaining setters.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📋</span> The Official JavaBeans Accessor &amp; Mutator Conventions
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The JavaBeans API specification defines precise standardized naming rules that allow frameworks and IDEs to discover and bind properties automatically:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">Standard Property</h3>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-sky-300">getStudentName()</code> &amp; <code className="text-sky-300">setStudentName(...)</code>
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">Primitive boolean</h3>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-emerald-300">isActiveScholarship()</code> (uses <code className="text-emerald-200">is</code> prefix)
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">Wrapper Boolean</h3>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-purple-300">getRemoteAccess()</code> (uses <code className="text-purple-200">get</code> prefix)
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">Indexed Element</h3>
              <p className="text-slate-300 font-sans text-xs">
                <code className="text-amber-300">getSkill(int i)</code> &amp; <code className="text-amber-300">setSkill(int i, s)</code>
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Jackson JSON Serialization in Barrackpore):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep Paul</strong> and <strong>Tuhina Das</strong> were enrolled into the academy portal, Jackson JSON Serializer used Java Reflection to inspect our <code className="text-sky-300 font-mono">TraineeEnrollmentBean</code>. By finding <code className="text-emerald-400 font-mono">getRollNumber()</code> and <code className="text-emerald-400 font-mono">isActiveScholarship()</code>, it generated clean, compliant REST JSON payloads without exposing private fields directly!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The JavaBean Reflection Bridge: Frameworks → Getters/Setters → Private Fields
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing how Spring Boot, Jackson, and Hibernate interact with private state through standardized JavaBean accessor bridges:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 920 320"
            className="w-full h-auto"
            aria-label="JavaBean Reflection Bridge Diagram"
          >
            <defs>
              <marker
                id="bridgeArrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
              <marker
                id="bridgeArrow2"
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

            {/* Left Box: External Frameworks (Jackson, Spring, Hibernate) */}
            <rect x="25" y="25" width="280" height="270" rx="10" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
            <text x="165" y="52" fill="#818cf8" fontSize="13" fontWeight="bold" textAnchor="middle">ENTERPRISE FRAMEWORKS</text>
            <text x="165" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Spring Boot &middot; Jackson &middot; Hibernate</text>

            <rect x="40" y="85" width="250" height="55" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
            <text x="50" y="105" fill="#e0e7ff" fontSize="10" fontWeight="bold">JSON Payload / REST API</text>
            <text x="50" y="125" fill="#fde047" fontSize="9" fontFamily="monospace">&#123; &quot;studentFullName&quot;: &quot;Swadeep&quot; &#125;</text>

            <rect x="40" y="150" width="250" height="55" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
            <text x="50" y="170" fill="#e0e7ff" fontSize="10" fontWeight="bold">JPA / SQL Table Mapping</text>
            <text x="50" y="190" fill="#fde047" fontSize="9" fontFamily="monospace">SELECT course_fee_inr FROM trainees</text>

            <rect x="40" y="215" width="250" height="65" rx="6" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
            <text x="50" y="235" fill="#bae6fd" fontSize="9" fontWeight="bold">Reflection Introspector:</text>
            <text x="50" y="250" fill="#94a3b8" fontSize="8">Pairs property names with matching</text>
            <text x="50" y="265" fill="#94a3b8" fontSize="8">get...() and set...() methods in bytecode</text>

            {/* Middle Box: Standardized JavaBean Accessor Bridge */}
            <rect x="340" y="25" width="290" height="270" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            <text x="485" y="52" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">JAVABEAN METHOD BRIDGE</text>
            <text x="485" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Public Getters &amp; Setters Contract</text>

            <rect x="355" y="85" width="260" height="55" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="365" y="105" fill="#bae6fd" fontSize="10" fontWeight="bold">+ getStudentFullName() : String</text>
            <text x="365" y="125" fill="#38bdf8" fontSize="9" fontFamily="monospace">+ setStudentFullName(String s) : void</text>

            <rect x="355" y="150" width="260" height="55" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="365" y="170" fill="#bae6fd" fontSize="10" fontWeight="bold">+ isActiveScholarship() : boolean</text>
            <text x="365" y="190" fill="#38bdf8" fontSize="9" fontFamily="monospace">+ setActiveScholarship(boolean b) : void</text>

            <rect x="355" y="215" width="260" height="65" rx="6" fill="#042f2e" stroke="#10b981" strokeWidth="1" />
            <text x="365" y="235" fill="#a7f3d0" fontSize="9" fontWeight="bold">Validation &amp; Invariant Defense:</text>
            <text x="365" y="252" fill="#fde047" fontSize="9" fontFamily="monospace">if (fee &lt; 0) throw IllegalArgumentException</text>
            <text x="365" y="268" fill="#6ee7b7" fontSize="8">&check; Guards state before mutating</text>

            {/* Right Box: Protected Private Fields in Heap */}
            <rect x="665" y="25" width="230" height="270" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="780" y="52" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">PROTECTED HEAP STATE</text>
            <text x="780" y="68" fill="#94a3b8" fontSize="9" textAnchor="middle">Encapsulated Private Fields</text>

            <rect x="680" y="85" width="200" height="195" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <text x="690" y="110" fill="#a7f3d0" fontSize="10" fontFamily="monospace">- int rollNumber</text>
            <text x="690" y="135" fill="#a7f3d0" fontSize="10" fontFamily="monospace">- String studentFullName</text>
            <text x="690" y="160" fill="#a7f3d0" fontSize="10" fontFamily="monospace">- double courseFeeInr</text>
            <text x="690" y="185" fill="#a7f3d0" fontSize="10" fontFamily="monospace">- boolean activeScholarship</text>
            <text x="690" y="210" fill="#a7f3d0" fontSize="10" fontFamily="monospace">- List&lt;String&gt; skills</text>
            <text x="690" y="250" fill="#fde047" fontSize="9" fontWeight="bold">Hidden &amp; Secure in Heap</text>

            {/* Connecting Arrows */}
            <path d="M 290 115 L 340 115" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#bridgeArrow)" />
            <path d="M 615 115 L 665 115" stroke="#10b981" strokeWidth="2" markerEnd="url(#bridgeArrow2)" />
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
            GettersSettersConventionsDemo.java
          </span>
        </div>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The runnable source code below showcases strict JavaBean naming conventions, boolean <code className="text-sky-300 font-mono">is...()</code> rules, setter validation logic, indexed accessors, and simulated Jackson JSON reflection:
        </p>

        <JavaFileLoader
          fileName="GettersSettersConventionsDemo.java"
          code={gettersSettersDemoCode}
        />
      </section>

      {/* Section 4: Key Takeaways & Exam Points */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>🎯</span> Key Takeaways &amp; JavaBean Exam Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-sky-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Boolean Getter Naming Rule
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Primitive <code className="text-sky-300 font-mono">boolean</code> getters use the <code className="text-sky-300 font-mono">is...()</code> prefix (e.g. <code className="text-slate-300 font-mono">isActive()</code>), whereas wrapper <code className="text-sky-300 font-mono">Boolean</code> getters use the standard <code className="text-sky-300 font-mono">get...()</code> prefix (e.g. <code className="text-slate-300 font-mono">getActive()</code>).
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-emerald-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Mandatory No-Arg Constructor
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Frameworks like Spring and Hibernate instantiate beans dynamically via reflection (<code className="text-emerald-300 font-mono">Class.getDeclaredConstructor().newInstance()</code>), requiring every JavaBean to declare a public no-arg constructor.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-purple-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Virtual Computed Properties
            </h3>
            <p className="text-slate-300 leading-relaxed">
              A getter does not require a backing field. Writing <code className="text-purple-300 font-mono">public String getFullName() &#123; return first + &quot; &quot; + last; &#125;</code> exposes a valid read-only property to JSON serializers.
            </p>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700/60 space-y-2">
            <h3 className="text-amber-300 font-bold text-base flex items-center gap-2">
              <span>📌</span> Never Throw Checked Exceptions in Setters
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Framework parameter binding fails if setters declare checked exceptions. Setters should throw unchecked <code className="text-amber-300 font-mono">IllegalArgumentException</code> on validation errors.
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
              <span>❌</span> Pitfall: Odd Field Casing (e.g. &apos;uName&apos;, &apos;eMail&apos;)
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Naming fields with an initial lowercase letter followed immediately by an uppercase letter causes Introspector decapitalization bugs in Jackson and Spring binding.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
              <code>
                {`// BUG-PRONE: Introspector creates 'eMail' property!
private String eMail;
public String geteMail() { return eMail; }`}
              </code>
            </div>
          </div>

          {/* Good Practice */}
          <div className="p-5 bg-emerald-950/20 rounded-xl border border-emerald-500/30 space-y-3">
            <h3 className="text-emerald-400 font-bold text-base flex items-center gap-2">
              <span>✅</span> Recommended: Standard CamelCase Naming
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              Use standard camelCase (<code className="text-emerald-300 font-mono">emailAddress</code>, <code className="text-emerald-300 font-mono">userName</code>) to ensure 100% flawless reflection mapping across all frameworks.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>
                {`// CLEAN: Standard camelCase JavaBean mapping
private String emailAddress;
public String getEmailAddress() { return emailAddress; }`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Think About This Challenge */}
      <section className="space-y-4 bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 p-6 md:p-8 rounded-2xl border border-sky-500/30">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>💡</span> Think About This: Why did Java 16+ Records drop the &apos;get&apos; prefix entirely?
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          The <code className="text-sky-300 font-mono">get</code> prefix in JavaBeans was designed in 1997 for mutable GUI component introspection. In modern Java, <strong>Records</strong> represent immutable mathematical tuples (DTOs). Using <code className="text-emerald-300 font-mono">student.rollNumber()</code> and <code className="text-emerald-300 font-mono">student.studentFullName()</code> aligns with functional programming standards, reduces syntactic noise, and clarifies that the accessor is an immutable component projection rather than a mutable JavaBean property!
        </p>
      </section>

      {/* Section 7: Teacher Sukanta Hui's Guidance */}
      <Teacher
        quote="Never view getters and setters as mindless robotic boilerplate. Every setter is a border security checkpoint that defends your invariants, and every getter is a protective diplomatic courier. Follow JavaBean naming standards, and the entire enterprise ecosystem will work with your code effortlessly."
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
          fileName="Topic13_Getters_Setters_Conventions_Note.txt"
        />
      </section>
    </div>
  );
}
