import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./gettingStartedQuiz.json";

export default function Topic9() {
  return (
    <QuizEngine
      title="Module 1 Evaluation – Getting Started with JavaScript"
      questions={questions}
      testId="js_getting_started_001_quiz"
    />
  );
}
