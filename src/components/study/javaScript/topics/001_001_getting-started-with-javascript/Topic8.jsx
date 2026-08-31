import React, { useEffect, useState } from "react";
import JavaScriptProjectAnswerTemplate from "../../../JavaScriptProjectAnswerTemplate";
import projectsData from "./topic8_files/js-getting-started-projects.json";

export default function GettingStartedProjectsPage() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // 1. Import all .js files from the answers folder (as raw strings)
    const modules = import.meta.glob("./topic8_files/answers/*.js", { query: "?raw", import: "default", eager: true });

    // 2. Build a lookup map: filename → source code
    const fileMap = {};
    Object.keys(modules).forEach((path) => {
      const fileName = path.split("/").pop(); // e.g., "INTRO001.js"
      fileMap[fileName] = modules[path];
    });

    // 3. Merge the code into each project (add an "answer" field)
    const enhancedProjects = projectsData.projects.map((proj) => {
      const filePath = proj.answerFile || "";
      const fileName = filePath.split("/").pop();
      const code = fileMap[fileName];

      if (!code) {
        console.warn(`⚠ Missing code file: ${fileName}`);
      }

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
          <span>Loading Getting Started projects and exercises...</span>
        </div>
      </div>
    );
  }

  return <JavaScriptProjectAnswerTemplate data={enhancedData} />;
}
