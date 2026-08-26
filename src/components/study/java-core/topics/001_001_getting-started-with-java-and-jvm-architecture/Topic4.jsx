import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import editionsDemoCode from "./topic4_files/JavaEditionsDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
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
            Module 001_001 · Topic 4
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Ecosystem Taxonomy
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Java Editions: Java SE, Jakarta EE, Java ME, and JavaFX
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand the taxonomy of the Java universe: from the foundational Java SE runtime to distributed Jakarta EE enterprise servers, embedded Java ME smart cards, and modern JavaFX desktop UIs.
        </p>
      </header>

      {/* Section 1: Overview */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>🌐</span> The Four Spheres of the Java Universe
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The Java ecosystem is structured into targeted editions, each addressing a specific hardware profile and application category while sharing the identical syntax, compiler, and core runtime concepts.
          </p>
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300">
            <p className="font-medium text-purple-300 mb-1">Classroom Roadmap Guidance (Barrackpore):</p>
            <p className="text-sm leading-relaxed">
              When <strong>Swadeep</strong> and <strong>Tuhina</strong> at our Barrackpore center asked which edition they should master first, our answer is always clear: <strong>Java SE (Standard Edition)</strong> is the non-negotiable core. Once you master Java SE, transitioning to <strong>Jakarta EE</strong> microservices (Spring Boot) or <strong>JavaFX</strong> desktop apps is straightforward and natural!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🗺️</span> The Java Platform Hierarchy
        </h2>
        <p className="text-sm text-slate-400">
          Observe how all specialized editions build upon the core Java SE foundation:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 340"
            className="w-full h-auto"
            aria-label="The 4 Major Java Editions Hierarchy Diagram"
          >
            {/* Foundation Layer: Java SE */}
            <g className="transition-all duration-300 hover:opacity-95">
              <rect x="50" y="220" width="780" height="90" rx="12" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
              <text x="440" y="255" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="18">
                JAVA SE (Standard Edition) · The Core Foundation
              </text>
              <text x="440" y="280" textAnchor="middle" fill="#bae6fd" fontSize="12">
                JVM · Java Language Spec · java.lang · java.util · java.io · java.nio · java.time · java.sql · java.util.concurrent
              </text>
            </g>

            {/* Connecting Pillars */}
            <line x1="180" y1="160" x2="180" y2="220" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4" />
            <line x1="440" y1="160" x2="440" y2="220" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4" />
            <line x1="700" y1="160" x2="700" y2="220" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4" />

            {/* Upper Tier: Jakarta EE */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="50" y="40" width="250" height="120" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
              <text x="175" y="70" textAnchor="middle" fill="#a5b4fc" fontWeight="bold" fontSize="15">
                Jakarta EE (Enterprise)
              </text>
              <text x="175" y="92" textAnchor="middle" fill="#c7d2fe" fontSize="11">
                Cloud Microservices & Web Backends
              </text>
              <text x="175" y="112" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Jakarta Servlets & REST (JAX-RS)
              </text>
              <text x="175" y="128" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Jakarta Persistence (JPA / Hibernate)
              </text>
              <text x="175" y="144" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Powers Spring Boot & Quarkus
              </text>
            </g>

            {/* Upper Tier: Java ME */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="315" y="40" width="250" height="120" rx="10" fill="#14532d" stroke="#4ade80" strokeWidth="2" />
              <text x="440" y="70" textAnchor="middle" fill="#86efac" fontWeight="bold" fontSize="15">
                Java ME (Micro Edition)
              </text>
              <text x="440" y="92" textAnchor="middle" fill="#bbf7d0" fontSize="11">
                Embedded & Constrained IoT
              </text>
              <text x="440" y="112" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Smart SIM Cards & Java Card
              </text>
              <text x="440" y="128" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Runs in mere 16KB - 512KB RAM
              </text>
              <text x="440" y="144" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Industrial microcontrollers
              </text>
            </g>

            {/* Upper Tier: JavaFX */}
            <g className="transition-all duration-300 hover:scale-105">
              <rect x="580" y="40" width="250" height="120" rx="10" fill="#701a75" stroke="#f472b6" strokeWidth="2" />
              <text x="705" y="70" textAnchor="middle" fill="#fbcfe8" fontWeight="bold" fontSize="15">
                JavaFX (Rich Desktop)
              </text>
              <text x="705" y="92" textAnchor="middle" fill="#fdf2f8" fontSize="11">
                Modern Hardware-Accelerated GUI
              </text>
              <text x="705" y="112" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • FXML & CSS styling
              </text>
              <text x="705" y="128" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • 3D graphics & Chart libraries
              </text>
              <text x="705" y="144" textAnchor="middle" fill="#94a3b8" fontSize="10">
                • Succeeded legacy Swing & AWT
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Feature Breakdown */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📚</span> Detailed Edition Specifications
        </h2>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-sky-400 text-lg mb-1">1. The javax.* to jakarta.* Migration</h3>
            <p>
              When Oracle contributed Java EE to the Eclipse Foundation in 2017, the platform was renamed <strong>Jakarta EE</strong>. In Jakarta EE 9, all package names transitioned from <code className="text-rose-300">javax.servlet.*</code> and <code className="text-rose-300">javax.persistence.*</code> to <code className="text-emerald-300">jakarta.servlet.*</code> and <code className="text-emerald-300">jakarta.persistence.*</code>.
            </p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/60">
            <h3 className="font-bold text-pink-400 text-lg mb-1">2. JavaFX & OpenJFX Decoupling</h3>
            <p>
              Starting with Java 11, JavaFX was removed from standard JDK bundles and established as an independent modular open-source project (<strong>OpenJFX</strong>). Desktop GUI developers simply include JavaFX controls via Maven or Gradle.
            </p>
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
            Example: Overview of Java Editions
          </h3>
          <JavaFileLoader
            fileModule={editionsDemoCode}
            title="JavaEditionsDemo.java"
            highlightLines={[8, 9, 10, 11, 14, 20]}
          />
        </div>
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & Best Practices
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-rose-400 text-base">1. Pitfall: Mixing Legacy javax.* and Modern jakarta.* Imports</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When building modern Spring Boot 3+ or Jakarta EE 10 microservices, mixing <code className="text-rose-300">import javax.persistence.Entity</code> with newer Jakarta libraries causes silent runtime classpath errors. Always use <code className="text-emerald-300">jakarta.*</code> in modern applications.
            </p>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-2">
            <h3 className="font-bold text-emerald-400 text-base">2. Best Practice: Build Java SE Mastery Before Enterprise Frameworks</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Never rush directly into Spring Boot or Jakarta EE before thoroughly understanding Java SE collections, generics, exceptions, and multithreading. Frameworks are merely abstractions over Java SE!
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
            🤔 <em>“Why can your bank's Java SE program run on both a Windows ATM and a Linux cloud cluster, while a Java Card applet runs inside the microchip of your physical debit card?”</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about how Java ME and Java Card strip away unneeded libraries while preserving the core bytecode and execution model!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Java Editions (SE, EE, ME, FX) FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Note for Printing */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 4: Java Editions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_001_topic4_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="pt-4">
        <Teacher
          note="Understand the landscape: Java SE is your foundation, Jakarta EE is your enterprise vehicle, and JavaFX is your desktop tool. Focus 100% of your current efforts on mastering Java SE fundamentals — once the roots are deep, every framework becomes easy to master. — Sukanta Hui"
        />
      </section>
    </div>
  );
}
