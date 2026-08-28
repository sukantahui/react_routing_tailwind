import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./clientAiQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Client-Side AI, Neural Networks & Web LLMs Quiz"
      questions={questions}
      testId="js_ai_010_quiz"
    />
  );
}
