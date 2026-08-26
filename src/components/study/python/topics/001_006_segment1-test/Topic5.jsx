import React from "react";
import QuizEngine from "../../../QuizEngine";
import allQuestions from "./python_foundation_mcqs_part_01.json";

export default function Topic5() {
  return (
    <QuizEngine
      title="Segment 1 Final Comprehensive MCQ & Code Tracing Test"
      questions={allQuestions}
      testId="py_seg1_comprehensive_final"
    />
  );
}
