import React from "react";
import QuizEngine from "../../../QuizEngine";
import allQuestions from "./python_foundation_mcqs_part_01.json";

export default function Topic1() {
  const questions = allQuestions.filter((q) => q.topic === "Topic1");

  return (
    <QuizEngine
      title="Segment 1 Assessment: Variables, Identifiers & Core Data Types"
      questions={questions.length > 0 ? questions : allQuestions}
      testId="py_seg1_variables_datatypes"
    />
  );
}
