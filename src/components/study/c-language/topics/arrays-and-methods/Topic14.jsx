import React, { useEffect, useState } from "react";
import COutputPracticeTemplateWithFiles from "../../../COutputPracticeTemplateWithFiles";
import questionsData from "./topic14_files/output-questions.json";

export default function COutputPage() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // 🔥 Load all .c files as raw text automatically
    const modules = import.meta.glob(
      "./topic14_files/answers/*.c",
      { as: "raw", eager: true }
    );

    // Map questions with their corresponding raw file
    const enhancedQuestions = questionsData.questions.map((q) => {
      const filePath = `./topic14_files/answers/${q.codeFile}`;

      return {
        ...q,
        code: modules[filePath] || "// Code file not found",
      };
    });

    setEnhancedData({
      ...questionsData,
      questions: enhancedQuestions,
    });
  }, []);

  if (!enhancedData) return <div>Loading...</div>;

  return <COutputPracticeTemplateWithFiles data={enhancedData} />;
}
