// src/components/study/c-language/topics/001_005_c-pattern-output-practice-lab/Topic4.jsx

import React, { useEffect, useState } from "react";
import CProjectAnswerTemplateEnhanced from "../../../CProjectAnswerTemplateEnhanced";
import projectsData from "./topic4_files/c-pattern-projects.json";

export default function Topic4() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // 1. Import all 30 .c answer files dynamically from topic4_files/answers/ as raw text
    const modules = import.meta.glob("./topic4_files/answers/*.c", {
      query: "?raw",
      import: "default",
      eager: true,
    });

    // 2. Build lookup map: filename → source code string
    const fileMap = {};
    Object.keys(modules).forEach((path) => {
      const fileName = path.split("/").pop(); // e.g. "pattern_answer1.c"
      fileMap[fileName] = modules[path];
    });

    // 3. Merge source code into each project object's "answer" property
    const enhancedProjects = projectsData.projects.map((proj) => {
      const filePath = proj.answerFile || "";
      const fileName = filePath.split("/").pop();
      const code = fileMap[fileName];

      if (!code) {
        console.warn(`⚠ Missing C pattern answer file: ${fileName}`);
      }

      return {
        ...proj,
        answer: code || `// Source file "${fileName}" not found in answers folder`,
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
          <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold">Loading 30 Project Pattern C Programs...</span>
        </div>
      </div>
    );
  }

  return <CProjectAnswerTemplateEnhanced data={enhancedData} />;
}
