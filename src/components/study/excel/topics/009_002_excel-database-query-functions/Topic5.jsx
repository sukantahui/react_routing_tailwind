"use client";
import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/excel_database_query_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic5() {
  const sectionsRef = useRef([]);
  
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "excel_database_query_functions_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold uppercase">DMIN · Topic 5</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mt-4">Mastering DMIN</h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg">Returns min value matching criteria table.</p>
        </header>

        <section ref={(el) => (sectionsRef.current[1] = el)} className="rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4">Formula Syntax</h2>
          <div className="bg-slate-950 p-4 rounded-xl font-mono text-emerald-400 border border-slate-800">=DMIN(database, field, criteria)</div>
        </section>

        <section ref={(el) => (sectionsRef.current[2] = el)} className="rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Interactive Spreadsheet Practice</h2>
              <p className="text-slate-400 text-sm mt-1">Explore real database and inspection formulas hands-on.</p>
            </div>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <span>📥 Download Master Practice Sheet</span>
            </button>
          </div>
          <ExcelFileLoader fileUrl={sampleWorkbookUrl} />
        </section>

        {questions && (
          <div className="max-w-5xl mx-auto">
            <FAQTemplate title="DMIN - Concept Checks & Questions" questions={questions} />
          </div>
        )}
        <Teacher note="Database query functions allow complex multi-criteria calculations without complex formula nesting!" />
      </div>
    </div>
  );
}
