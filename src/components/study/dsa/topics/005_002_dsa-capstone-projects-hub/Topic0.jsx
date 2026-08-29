import React, { useEffect, useState } from "react";
import CProjectAnswerTemplate from "../../../CProjectAnswerTemplate";
import projectsData from "../004_002_dsa-capstone-projects-hub/topic0_files/dsa-projects-catalog.json";

export default function DSACapstoneProjectsPage() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // Import all .c files from answers folder
    const modules = import.meta.glob(
      "../004_002_dsa-capstone-projects-hub/topic0_files/answers/*.c",
      { query: "?raw", import: "default", eager: true }
    );

    const fileMap = {};
    Object.keys(modules).forEach((path) => {
      const fileName = path.split("/").pop(); // e.g. PROJ001.c
      fileMap[fileName] = modules[path];
    });

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

  if (!enhancedData) return <div className="p-6 text-slate-400 bg-slate-950 min-h-screen">Loading DSA Capstone Projects...</div>;

  return <CProjectAnswerTemplate data={enhancedData} />;
}
