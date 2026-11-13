"use client";

import React from "react";
import ExcelProjectAnswerTemplateEnhanced from "../../../ExcelProjectAnswerTemplateEnhanced";
import { excelModuleProjectsData } from "./topic27_files/excel_module_projects";
import sampleWorkbookUrl from "./excel_files/009_006_projects_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic27_files/topic27_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic27() {
  const dataWithWorkbook = {
    ...excelModuleProjectsData,
    sampleWorkbookUrl,
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ENHANCED EXCEL INTERACTIVE LAB TEMPLATE WITH 25 CAPSTONE PROJECTS */}
        <ExcelProjectAnswerTemplateEnhanced data={dataWithWorkbook} />

        {/* COMPREHENSIVE FAQ SECTION */}
        {questions && (
          <div className="max-w-5xl mx-auto">
            <FAQTemplate
              title="Date, Time & Calendar Engineering Laboratory Projects — Frequently Asked Questions"
              questions={questions}
            />
          </div>
        )}

        {/* TEACHER'S MENTOR NOTE */}
        <div className="max-w-5xl mx-auto">
          <Teacher
            note="Outstanding work reaching the Capstone Projects of Complete Date, Time & Calendar Engineering! You have successfully mastered 25 sophisticated workplace models covering multi-country business calendars, international weekend matrices, 24/7 overnight shift payroll, ISO week logistics, bond accrued interest, SLA turnaround, and automated fiscal schedules. These 25 models represent true corporate Excel engineering at the highest professional standard."
          />
        </div>
      </div>
    </div>
  );
}
