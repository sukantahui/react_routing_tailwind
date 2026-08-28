import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./operatorsQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Module 3 Evaluation – Operators, Expressions & Basic Logic Quiz"
      questions={questions}
      testId="js_operators_003_quiz"
    />
  );
}
