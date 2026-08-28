import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./puzzlesQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Tricky JavaScript Programs & Puzzles Quiz"
      questions={questions}
      testId="js_puzzles_005_quiz"
    />
  );
}
