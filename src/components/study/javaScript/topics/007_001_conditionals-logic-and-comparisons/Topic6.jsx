import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./conditionalsQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Conditionals, Boolean Logic & Comparisons Mastery Quiz"
      questions={questions}
      testId="js_cond_lab_007_quiz"
    />
  );
}
