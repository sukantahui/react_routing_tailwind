import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./storageQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Browser Storage & Web APIs Quiz"
      questions={questions}
      testId="js_storage_007_quiz"
    />
  );
}
