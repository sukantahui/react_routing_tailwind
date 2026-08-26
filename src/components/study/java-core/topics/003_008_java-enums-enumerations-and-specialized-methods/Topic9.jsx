import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import fsmDemoCode from "./topic9_files/EnumStateMachineTransitionDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      <header className="space-y-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_008 · Topic 9
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            State Machine Architecture
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Building Finite State Machines (FSM) with Enums: <code className="text-purple-400 font-mono">PENDING</code> &rarr; <code className="text-sky-400 font-mono">PAID</code> &rarr; <code className="text-emerald-400 font-mono">DELIVERED</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Architect robust business workflow engines: modeling order lifecycles and student admission workflows with type-safe state transitions using polymorphic enum methods.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-On Java Demo Code
        </h2>
        <JavaFileLoader
          fileModule={fsmDemoCode}
          title="EnumStateMachineTransitionDemo.java"
          highlightLines={[7, 10, 11, 12, 14, 15, 17, 18, 20, 21, 28, 38, 41, 44]}
        />
      </section>

      <section className="space-y-4">
        <FAQTemplate
          title="State Machine FAQs"
          questions={questions}
        />
      </section>

      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 003_008 Topic 9: Enum State Machines"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_008_topic9_enum_state_machine_note.txt"
        />
      </section>

      <Teacher
        note="Enums make the best state machines! In our AccoTax invoice processing system, an invoice transitions from DRAFT -> SUBMITTED -> APPROVED -> PAID cleanly with zero chances of illegal status skipping! — Sukanta Hui"
      />
    </div>
  );
}