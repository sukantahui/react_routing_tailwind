import React, { useEffect, useState } from "react";
import COutputPracticeTemplateWithFiles from "../../../COutputPracticeTemplateWithFiles";
import questionsData from "./topic14_files/output-questions.json";

export default function COutputPage() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // 🔥 Load all .c files dynamically
    const modules = import.meta.glob(
      "./topic14_files/answers/*.c",
      { as: "raw", eager: true }
    );

    // Convert module keys into cleaner lookup map
    const fileMap = {};

    Object.keys(modules).forEach((path) => {
      const fileName = path.split("/").pop(); // C001.c
      fileMap[fileName] = modules[path];
    });

    // Enhance questions with mapped code
    const enhancedQuestions = questionsData.questions.map((q) => {
      const codeContent = fileMap[q.codeFile];

      if (!codeContent) {
        console.warn(`⚠ Missing code file: ${q.codeFile}`);
      }

      return {
        ...q,
        code:
          codeContent ||
          `// ⚠ File "${q.codeFile}" not found in answers folder`,
      };
    });

    setEnhancedData({
      ...questionsData,
      questions: enhancedQuestions,
    });

    // Optional: Dev debugging
    if (import.meta.env.DEV) {
      console.log("Loaded files:", Object.keys(fileMap));
    }
  }, []);

  if (!enhancedData) return <div>Loading...</div>;

  return <COutputPracticeTemplateWithFiles data={enhancedData} />;
}
