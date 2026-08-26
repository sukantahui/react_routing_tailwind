import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import clsDemoCode from "./topic5_files/ClasspathPropertiesLoadingDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 005_006 · Topic 5
          </span>
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold rounded-full">
            Classpath Resources
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Loading Properties from Application Classpath via <code className="text-emerald-400 font-mono">getResourceAsStream()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Package production-ready applications: streaming embedded configuration files directly out of packaged JAR/WAR archives using Java ClassLoader APIs.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={clsDemoCode}
          title="ClasspathPropertiesLoadingDemo.java"
          highlightLines={[7, 10, 15, 23, 24, 28, 29]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Classpath Loading FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 005_006 Topic 5: Classpath Properties Loading"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="005_006_topic5_classpath_properties_loading_note.txt"
        />
      </section>

      <Teacher
        note="When building a Spring Boot JAR or Maven app, your config files are bundled inside the JAR! 'new File()' will crash, but 'getClassLoader().getResourceAsStream()' will read them effortlessly! — Sukanta Hui"
      />
    </div>
  );
}