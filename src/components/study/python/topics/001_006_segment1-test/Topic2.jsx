import React from "react";
import QuizEngine from "../../../QuizEngine";
import allQuestions from "./python_foundation_mcqs_part_01.json";

export default function Topic2() {
  const questions = allQuestions.filter((q) => q.topic === "Topic2");

  return (
    <QuizEngine
      title="Segment 1 Assessment: Operators, Precedence & Expression Evaluation"
      questions={questions.length > 0 ? questions : allQuestions}
      testId="py_seg1_operators_precedence"
    />
  );
}
