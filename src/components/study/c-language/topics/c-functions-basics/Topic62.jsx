import React, { useEffect, useState } from "react";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate"; // adjust the import path as needed
import projectsData from "./topic62_files/expert-projects.json";             // your generated JSON file

export default function CProjectPage() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // 1. Import all .c files from the answers folder (as raw strings)
    const modules = import.meta.glob("./topic62_files/answers/*.c", { as: "raw", eager: true });

    // 2. Build a lookup map: filename -> source code
    const fileMap = {};
    Object.keys(modules).forEach((path) => {
      const fileName = path.split("/").pop(); // e.g., "E001.c"
      fileMap[fileName] = modules[path];
    });

    // 3. Merge the code into each project (add an "answer" field)
    const enhancedProjects = projectsData.projects.map((proj) => {
      // Extract the file name from the answerFile field (e.g., "./answers/E001.c" → "E001.c")
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

  if (!enhancedData) return <div className="p-6 text-slate-400">Loading projects...</div>;

  return <CProjectAnswerTemplate data={enhancedData} />;
}