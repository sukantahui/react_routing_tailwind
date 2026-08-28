import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./errorHandlingQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Error Handling, Resilience & Debugging Quiz"
      questions={questions}
      testId="js_errors_007_quiz"
    />
  );
}
