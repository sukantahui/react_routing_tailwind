import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./microservicesQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Microservices, Message Queues & Docker Quiz"
      questions={questions}
      testId="js_micro_009_quiz"
    />
  );
}
