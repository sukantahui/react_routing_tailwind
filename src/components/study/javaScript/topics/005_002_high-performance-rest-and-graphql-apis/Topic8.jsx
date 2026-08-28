import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./backendApisQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="High-Performance REST & GraphQL Backend APIs Quiz"
      questions={questions}
      testId="js_bapi_009_quiz"
    />
  );
}
