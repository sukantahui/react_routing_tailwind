import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./functionsQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Functions, Scopes & Functional Programming Quiz"
      questions={questions}
      testId="js_functions_002_quiz"
    />
  );
}
