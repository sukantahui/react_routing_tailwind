import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./oopQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Objects, Methods & OOP Architecture Quiz"
      questions={questions}
      testId="js_oop_004_quiz"
    />
  );
}
