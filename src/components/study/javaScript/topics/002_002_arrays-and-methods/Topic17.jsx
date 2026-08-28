import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./arraysQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Arrays & Essential Array Methods Quiz"
      questions={questions}
      testId="js_arrays_003_quiz"
    />
  );
}
