import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./controlFlowQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Module 4 Evaluation – Control Flow & Decision Making Quiz"
      questions={questions}
      testId="js_controlflow_004_quiz"
    />
  );
}
