import React, { useEffect, useState } from "react";
import CProjectAnswerTemplateEnhanced from "../../../CProjectAnswerTemplateEnhanced";
import projectsData from "./topic7_files/c-structures-projects.json";

export default function Topic7() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    const modules = import.meta.glob("./topic7_files/answers/*.c", {
      query: "?raw",
      import: "default",
      eager: true,
    });

    const fileMap = {};
    Object.keys(modules).forEach((path) => {
      const fileName = path.split("/").pop();
      fileMap[fileName] = modules[path];
    });

    const enhancedProjects = projectsData.projects.map((proj) => {
      const filePath = proj.answerFile || "";
      const fileName = filePath.split("/").pop();
      const code = fileMap[fileName];

      return {
        ...proj,
        answer: code || `// Source file "${fileName}" not found`,
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
          <span className="text-sm font-semibold">Loading 20 Structures, Unions &amp; typedef Capstone Projects...</span>
        </div>
      </div>
    );
  }

  return <CProjectAnswerTemplateEnhanced data={enhancedData} />;
}
