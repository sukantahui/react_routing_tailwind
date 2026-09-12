import React, { useEffect, useState } from "react";
import RDBMSProjectAnswerTemplate from "../../../RDBMSProjectAnswerTemplate";
import projectsData from "./topic18_files/sql-fundamentals-projects.json";

// Auxiliary framework components for print & notes
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic18_files/topic18_questions";
import noteText from "./topic18_files/topic18_note.txt?raw";

/**
 * Topic18 – SQL Fundamentals Practical Projects & Real-World Lab Case Studies
 * Module: 001_002_sql-fundamentals
 *
 * @component
 * @returns {JSX.Element} 20 Hands-on Database Projects using RDBMSProjectAnswerTemplate
 */
export default function Topic18() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // Eagerly load all .sql answer scripts as raw strings
    const modules = import.meta.glob("./topic18_files/answers/*.sql", {
      query: "?raw",
      import: "default",
      eager: true,
    });

    const fileMap = {};
    Object.keys(modules).forEach((p) => {
      const fileName = p.split("/").pop();
      fileMap[fileName] = modules[p];
    });

    // Merge code content into projects data
    const enhancedProjects = projectsData.projects.map((proj) => {
      const filePath = proj.answerFile || "";
      const fileName = filePath.split("/").pop();
      const code = fileMap[fileName];

      return {
        ...proj,
        answer: code || `-- SQL Solution for ${proj.title}\n-- File "${fileName}" will be generated automatically.`,
      };
    });

    setEnhancedData({
      ...projectsData,
      projects: enhancedProjects,
    });
  }, []);

  if (!enhancedData) {
    return (
      <div className="p-8 text-slate-400 flex items-center justify-center min-h-[350px]">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading SQL Practical Database Projects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <RDBMSProjectAnswerTemplate data={enhancedData} />

      {/* FAQs and Printable Study Notes */}
      <div className="space-y-8 pt-8 border-t border-slate-800">
        <FAQTemplate questions={questions} />
        <Teacher />
        <PlainTextPrint content={noteText} />
      </div>
    </div>
  );
}
