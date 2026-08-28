import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./mathAlgoQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Math, Geometry & Arithmetic Algorithms Mastery Quiz"
      questions={questions}
      testId="js_math_lab_007_quiz"
    />
  );
}
