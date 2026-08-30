"use client";

import React from "react";
import ExcelProjectAnswerTemplateEnhanced from "../../../ExcelProjectAnswerTemplateEnhanced";
import { excelModuleProjectsData } from "./topic13_files/excel_module_projects";
import sampleWorkbookUrl from "./excel_files/003_002_data_validation_protection_and_cleaning_techniques_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic13() {
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
              title="Comprehensive Laboratory Practice Session - Frequently Asked Questions"
              questions={questions}
            />
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          <Teacher
            note="Great job completing the Practical Laboratory Exercises! Practice each project using the master workbook to solidify your skills!"
          />
        </div>
      </div>
    </div>
  );
}
