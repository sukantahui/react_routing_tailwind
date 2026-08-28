import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./pwaQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Progressive Web Apps (PWAs) & Offline Architecture Quiz"
      questions={questions}
      testId="js_pwa_010_quiz"
    />
  );
}
