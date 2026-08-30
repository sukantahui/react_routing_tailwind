"use client";
import React from "react";
import ExcelProjectAnswerTemplateEnhanced from "../../../ExcelProjectAnswerTemplateEnhanced";
import { excelModuleProjectsData } from "./topic8_files/excel_module_projects";
import sampleWorkbookUrl from "./excel_files/information_and_cell_inspection_functions_master.xlsx?url";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
  const dataWithWorkbook = { ...excelModuleProjectsData, sampleWorkbookUrl };
  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        <ExcelProjectAnswerTemplateEnhanced data={dataWithWorkbook} />
        <Teacher note="Great job completing Information Functions Projects!" />
      </div>
    </div>
  );
}
