import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic7_files/CreatingMocksInjectMocksDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 012_006 · Topic 7
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            JUnit 5, Mockito &amp; Clean Code
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Creating Mocks: <code className="text-emerald-400 font-mono">@Mock &amp; @InjectMocks</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Declarative mocking setup: initializing test doubles using @Mock, injecting collaborators with @InjectMocks, and integrating via @ExtendWith(MockitoExtension.class).
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="CreatingMocksInjectMocksDemo.java"
          highlightLines={[18,25,34,43]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="JUnit 5 &amp; Mockito FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 012_006 Topic 7: Creating Mocks (@Mock & @InjectMocks)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="012_006_topic7_creating_mocks_inject_mocks_note.txt"
        />
      </section>

      <Teacher
        note="The cleanest way to write Mockito tests in JUnit 5 is with @ExtendWith(MockitoExtension.class)! Annotate your dependencies with @Mock and your class under test with @InjectMocks — Mockito automatically injects the mocks via constructors or setters! — Sukanta Hui"
      />
    </div>
  );
}
