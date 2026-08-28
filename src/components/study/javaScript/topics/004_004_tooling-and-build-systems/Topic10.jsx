import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./toolingQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Modern Bundlers, Vite & Tooling Quiz"
      questions={questions}
      testId="js_tooling_008_quiz"
    />
  );
}
