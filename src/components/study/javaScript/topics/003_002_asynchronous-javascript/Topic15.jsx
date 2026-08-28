import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./asyncQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Asynchronous JavaScript, Promises & Async/Await Quiz"
      questions={questions}
      testId="js_async_007_quiz"
    />
  );
}
