import React, { useEffect, useState } from "react";
import JavaScriptProjectAnswerTemplate from "../../../JavaScriptProjectAnswerTemplate";
import projectsData from "./topic7_files/js-wasm-projects.json";

export default function PracticalProjectsPage() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    const modules = import.meta.glob("./topic7_files/answers/*.js", { query: "?raw", import: "default", eager: true });
    const fileMap = {};
    Object.keys(modules).forEach((p) => {
      const fileName = p.split("/").pop();
      fileMap[fileName] = modules[p];
    });

    const enhancedProjects = projectsData.projects.map((proj) => {
      const filePath = proj.answerFile || "";
      const fileName = filePath.split("/").pop();
      const code = fileMap[fileName];

      return {
        ...proj,
        answer: code || `// File "${fileName}" not found in answers folder`,
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
          <span>Loading practical lab projects and exercises...</span>
        </div>
      </div>
    );
  }

  return <JavaScriptProjectAnswerTemplate data={enhancedData} />;
}
