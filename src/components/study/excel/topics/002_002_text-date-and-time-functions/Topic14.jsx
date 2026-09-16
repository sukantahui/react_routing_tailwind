"use client";

import React from "react";
import ExcelProjectAnswerTemplateEnhanced from "../../../ExcelProjectAnswerTemplateEnhanced";
import { excelModuleProjectsData } from "./topic14_files/excel_module_projects";
import sampleWorkbookUrl from "./excel_files/002_002_text_date_and_time_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic14_files/topic14_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic14() {
  const dataWithWorkbook = {
    ...excelModuleProjectsData,
    sampleWorkbookUrl,
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ENHANCED EXCEL INTERACTIVE LAB TEMPLATE WITH 20 CAPSTONE PROJECTS */}
        <ExcelProjectAnswerTemplateEnhanced data={dataWithWorkbook} />

        {/* COMPREHENSIVE FAQ SECTION */}
        {questions && (
          <div className="max-w-5xl mx-auto">
            <FAQTemplate
              title="Module Capstone Projects: Text, Date & Time Functions - Frequently Asked Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TEACHER'S MENTOR NOTE */}
        <div className="max-w-5xl mx-auto">
          <Teacher
            note="Outstanding work reaching the Module Capstone! You have successfully mastered 20 real-world business scenarios spanning clean string manipulation, international phone and financial formatting, complex fiscal year mapping, overnight shift math, and ISO timestamp parsing. These 20 capstone models are directly applicable to enterprise analytics, automated reporting, and ERP auditing workflows."
          />
        </div>
      </div>
    </div>
  );
}
