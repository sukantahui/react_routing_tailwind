"use client";
import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/information_and_cell_inspection_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic3() {
  const sectionsRef = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        <header ref={(el) => (sectionsRef.current[0] = el)} className="rounded-3xl p-6 sm:p-10 bg-slate-900 border border-slate-800">
          <span className="px-3 py-1 rounded-full bg-sky-950 text-sky-300 text-xs font-bold uppercase">ISFORMULA · Topic 3</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300 mt-4">Mastering ISFORMULA</h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg">Returns TRUE if cell has a formula.</p>
        </header>

        <section ref={(el) => (sectionsRef.current[1] = el)} className="rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-sky-400 mb-4">Formula Syntax</h2>
          <div className="bg-slate-950 p-4 rounded-xl font-mono text-emerald-400 border border-slate-800">=ISFORMULA(reference)</div>
        </section>

        <section ref={(el) => (sectionsRef.current[2] = el)} className="rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 mb-4">Interactive Spreadsheet Practice</h2>
          <ExcelFileLoader fileUrl={sampleWorkbookUrl} />
        </section>

        {questions && (
          <div className="max-w-5xl mx-auto">
            <FAQTemplate title="ISFORMULA - Concept Checks & Questions" questions={questions} />
          </div>
        )}
        <Teacher note="Information functions ensure your models maintain audited data integrity!" />
      </div>
    </div>
  );
}
