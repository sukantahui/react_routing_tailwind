import React, { useEffect, useState } from "react";
import COutputPracticeTemplateWithFiles from "../../../COutputPracticeTemplateWithFiles";
import questionsData from "./topic0_files/output-questions.json";

export default function DSAOutputLabPage() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // Load all .c files dynamically from answers folder
    const modules = import.meta.glob(
      "./topic0_files/answers/*.c",
      { query: "?raw", import: "default", eager: true }
    );

    const fileMap = {};
    Object.keys(modules).forEach((path) => {
      const fileName = path.split("/").pop(); // e.g. D001.c
      fileMap[fileName] = modules[path];
    });

    const enhancedQuestions = questionsData.questions.map((q) => {
      const codeContent = fileMap[q.codeFile];
      if (!codeContent) {
        console.warn(`⚠ Missing code file: ${q.codeFile}`);
      }
      return {
        ...q,
        code: codeContent || `// ⚠ File "${q.codeFile}" not found in answers folder`,
      };
    });

    setEnhancedData({
      ...questionsData,
      questions: enhancedQuestions,
    });
  }, []);

  if (!enhancedData) return <div className="p-6 text-slate-400 bg-slate-950 min-h-screen">Loading DSA Output Lab...</div>;

  return <COutputPracticeTemplateWithFiles data={enhancedData} />;
}
