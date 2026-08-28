import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./patternsQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Design Patterns & Software Architecture Quiz"
      questions={questions}
      testId="js_patterns_008_quiz"
    />
  );
}
