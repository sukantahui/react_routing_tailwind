import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./loopsQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Module 5 Evaluation – Loops & Iteration Mastery Quiz"
      questions={questions}
      testId="js_loops_005_quiz"
    />
  );
}
