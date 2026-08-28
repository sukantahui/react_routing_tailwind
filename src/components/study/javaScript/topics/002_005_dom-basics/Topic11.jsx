import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./domBasicsQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="DOM Tree Architecture & Fundamentals Quiz"
      questions={questions}
      testId="js_dom_basics_006_quiz"
    />
  );
}
