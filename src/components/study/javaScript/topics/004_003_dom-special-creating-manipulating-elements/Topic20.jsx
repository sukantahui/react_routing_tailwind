import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./domElementsQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="DOM Special: Creating & Manipulating Elements Quiz"
      questions={questions}
      testId="js_dom_elements_006_quiz"
    />
  );
}
