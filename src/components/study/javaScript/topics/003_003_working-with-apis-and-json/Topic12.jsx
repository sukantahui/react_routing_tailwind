import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./apiQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="REST APIs, HTTP & JSON Processing Quiz"
      questions={questions}
      testId="js_api_007_quiz"
    />
  );
}
