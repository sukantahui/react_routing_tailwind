import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./v8InternalsQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="V8 Engine Architecture & Execution Contexts Quiz"
      questions={questions}
      testId="js_v8_008_quiz"
    />
  );
}
