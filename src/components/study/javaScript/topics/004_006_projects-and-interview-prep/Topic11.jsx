import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./capstoneQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Capstone Architecture & Technical Evaluation Quiz"
      questions={questions}
      testId="js_capstone_008_quiz"
    />
  );
}
