import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./pipelinesQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Advanced Array Pipelines & Data Processing Quiz"
      questions={questions}
      testId="js_pipelines_003_quiz"
    />
  );
}
