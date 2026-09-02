import React, { useEffect, useState } from "react";
import CProjectAnswerTemplateEnhanced from "../../../CProjectAnswerTemplateEnhanced";
import projectsData from "./topic7_files/c-pointers-projects.json";

export default function Topic7() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // 1. Import all 10 .c answer files dynamically from topic7_files/answers/ as raw text
    const modules = import.meta.glob("./topic7_files/answers/*.c", {
      query: "?raw",
      import: "default",
      eager: true,
    });

    // 2. Build lookup map: filename → source code string
    const fileMap = {};
    Object.keys(modules).forEach((path) => {
      const fileName = path.split("/").pop(); // e.g. "answer1.c"
      fileMap[fileName] = modules[path];
    });

    // 3. Merge source code into each project object's "answer" property
    const enhancedProjects = projectsData.projects.map((proj) => {
      const filePath = proj.answerFile || "";
      const fileName = filePath.split("/").pop();
      const code = fileMap[fileName];

      if (!code) {
        console.warn(`⚠ Missing C answer file: ${fileName}`);
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
          <div className="w-6 h-6 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold">Loading 10 C Pointer &amp; Memory Architecture Projects...</span>
        </div>
      </div>
    );
  }

  return <CProjectAnswerTemplateEnhanced data={enhancedData} />;
}
