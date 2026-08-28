import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./securityCryptoQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Enterprise Security, Cryptography & OAuth2 Quiz"
      questions={questions}
      testId="js_sec_009_quiz"
    />
  );
}
