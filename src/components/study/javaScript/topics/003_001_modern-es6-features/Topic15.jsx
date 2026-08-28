import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./es6Quiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Modern JavaScript (ES6 through ES2026+) Quiz"
      questions={questions}
      testId="js_es6_007_quiz"
    />
  );
}
