import React, { useEffect, useState } from "react";
import COutputPracticeTemplateWithFiles from "../../../COutputPracticeTemplateWithFiles";
import questionsData from "./topic14_files/output-questions.json";

// Import all C files with Vite's ?raw suffix
import C001 from "./topic14_files/answers/C001.c?raw";
import C002 from "./topic14_files/answers/C002.c?raw";
import C003 from "./topic14_files/answers/C003.c?raw";
// ... import all 50 or however many you have

const answerMap = {
  C001,
  C002,
  C003,
  // ... map each ID to its raw content
};

export default function COutputPage() {
  const [enhancedData, setEnhancedData] = useState(null);

  useEffect(() => {
    // Add the raw code to each question
    const enhancedQuestions = questionsData.questions.map((q) => ({
      ...q,
      code: answerMap[q.codeFile], // assumes each question has a `codeFile` field like "C001"
    }));

    setEnhancedData({
      ...questionsData,
      questions: enhancedQuestions,
    });
  }, []);

  if (!enhancedData) return <div>Loading...</div>;

  return <COutputPracticeTemplateWithFiles data={enhancedData} />;
}