"use client";
import React from "react";
import ExcelProjectAnswerTemplateEnhanced from "../../../ExcelProjectAnswerTemplateEnhanced";
import { excelModuleProjectsData } from "./topic7_files/excel_module_projects";
import sampleWorkbookUrl from "./excel_files/009_002_excel_database_query_functions_master.xlsx?url";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
  const dataWithWorkbook = { ...excelModuleProjectsData, sampleWorkbookUrl };
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <ExcelProjectAnswerTemplateEnhanced data={dataWithWorkbook} />
        <Teacher note="Great job completing Database Query Functions Projects!" />
      </div>
    </div>
  );
}
