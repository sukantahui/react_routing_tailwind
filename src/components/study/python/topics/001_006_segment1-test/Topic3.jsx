import React from "react";
import QuizEngine from "../../../QuizEngine";
import allQuestions from "./python_foundation_mcqs_part_01.json";

export default function Topic3() {
  const questions = allQuestions.filter((q) => q.topic === "Topic3");

  return (
    <QuizEngine
      title="Segment 1 Assessment: Conditional Logic & Decision Branching"
      questions={questions.length > 0 ? questions : allQuestions}
      testId="py_seg1_conditional_logic"
    />
  );
}
