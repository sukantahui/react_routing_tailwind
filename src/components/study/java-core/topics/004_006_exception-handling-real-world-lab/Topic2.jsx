import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import gatewayDemoCode from "./topic2_files/GlobalExceptionInterceptorSimulationDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_006 · Topic 2
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Global Interceptor
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Implementing a Global Exception Interceptor Simulation (<code className="text-purple-400 font-mono">@ControllerAdvice</code> Pattern)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Architect centralized error handling: simulating modern framework exception interceptors to automatically convert domain failures into standard JSON API payloads.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={gatewayDemoCode}
          title="GlobalExceptionInterceptorSimulationDemo.java"
          highlightLines={[7, 10, 12, 13, 15, 16, 18, 19, 24, 28, 30]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="Global Interceptor FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_006 Topic 2: Global Exception Interceptor"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_006_topic2_global_interceptor_note.txt"
        />
      </section>

      <Teacher
        note="In Spring Boot, '@ControllerAdvice' works exactly like our GlobalExceptionHandlerGateway! It intercepts any error thrown anywhere in your app and turns it into a beautiful HTTP response! — Sukanta Hui"
      />
    </div>
  );
}