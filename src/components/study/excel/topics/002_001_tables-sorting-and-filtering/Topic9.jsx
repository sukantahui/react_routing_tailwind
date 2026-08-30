"use client";

import React from "react";
import ExcelProjectAnswerTemplateEnhanced from "../../../ExcelProjectAnswerTemplateEnhanced";
import { excelModuleProjectsData } from "./topic9_files/excel_module_projects";
import sampleWorkbookUrl from "./excel_files/002_001_tables_sorting_and_filtering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic9() {
  const dataWithWorkbook = {
    ...excelModuleProjectsData,
    sampleWorkbookUrl,
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="max-w-7xl mx-auto space-y-12">
        <ExcelProjectAnswerTemplateEnhanced data={dataWithWorkbook} />

        {questions && (
          <div className="max-w-5xl mx-auto">
            <FAQTemplate
              title="Practical Laboratory Exercises - Frequently Asked Questions"
              questions={questions}
            />
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          <Teacher
            note="Great job completing the Practical Laboratory Exercises for Tables, Sorting & Filtering! Master structured references, dynamic AutoFilters, and SUBTOTAL mechanics to build clean, professional Excel applications!"
          />
        </div>
      </div>
    </div>
  );
}
