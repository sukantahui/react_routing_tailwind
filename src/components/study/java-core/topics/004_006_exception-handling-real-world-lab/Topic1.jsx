import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import errDtoDemoCode from "./topic1_files/ApiErrorResponse.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 004_006 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            REST Error DTO
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Designing a Unified Enterprise API Error Response Model (RFC 7807 Pattern)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Build industry-standard REST error contracts: crafting immutable DTOs carrying timestamps, HTTP status codes, machine error codes, and field-level validation maps.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={errDtoDemoCode}
          title="ApiErrorResponse.java"
          highlightLines={[7, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="API Error Model FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 004_006 Topic 1: API Error Response Model"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="004_006_topic1_api_error_response_note.txt"
        />
      </section>

      <Teacher
        note="Every modern REST API you build should return a clean JSON payload like ApiErrorResponse whenever an error occurs! Clients like React and Flutter can easily parse fieldErrors and display red outlines on form inputs! — Sukanta Hui"
      />
    </div>
  );
}