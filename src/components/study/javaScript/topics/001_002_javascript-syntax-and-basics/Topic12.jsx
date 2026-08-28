import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./syntaxQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Module 2 Evaluation – JavaScript Syntax, Variables & Data Types Quiz"
      questions={questions}
      testId="js_syntax_002_quiz"
    />
  );
}
