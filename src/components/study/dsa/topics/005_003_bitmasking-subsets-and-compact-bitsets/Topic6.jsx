import React, { useEffect, useState } from "react";
import CProjectAnswerTemplateEnhanced from "../../../CProjectAnswerTemplateEnhanced";
import projectsData from "./topic6_files/dsa-bitmasking-projects.json";

export default function Topic6() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // 1. Import all .c files from topic6_files/answers/ as raw text
    const modules = import.meta.glob("./topic6_files/answers/*.c", {
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
      <div className="p-6 text-slate-400 flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Bitmasking Subsets &amp; Compact Bitsets Projects...</span>
        </div>
      </div>
    );
  }

  return <CProjectAnswerTemplateEnhanced data={enhancedData} />;
}
