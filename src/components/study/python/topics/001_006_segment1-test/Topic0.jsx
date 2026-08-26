import React from "react";
import QuizEngine from "../../../QuizEngine";
import allQuestions from "./python_foundation_mcqs_part_01.json";

export default function Topic0() {
  const questions = allQuestions.filter((q) => q.topic === "Topic0");

  return (
    <QuizEngine
      title="Segment 1 Assessment: Python Syntax, Indentation & First Steps"
      questions={questions.length > 0 ? questions : allQuestions}
      testId="py_seg1_syntax_indentation"
    />
  );
}
