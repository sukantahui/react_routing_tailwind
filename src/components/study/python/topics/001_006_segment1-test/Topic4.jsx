import React from "react";
import QuizEngine from "../../../QuizEngine";
import allQuestions from "./python_foundation_mcqs_part_01.json";

export default function Topic4() {
  const questions = allQuestions.filter((q) => q.topic === "Topic4");

  return (
    <QuizEngine
      title="Segment 1 Assessment: Iteration, Nested Loops & Flow Control"
      questions={questions.length > 0 ? questions : allQuestions}
      testId="py_seg1_loops_iteration"
    />
  );
}
