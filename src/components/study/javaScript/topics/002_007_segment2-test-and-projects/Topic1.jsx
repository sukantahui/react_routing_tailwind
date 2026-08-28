import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./projectsEvalQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Interactive Web Applications & DOM Capstone Evaluation Quiz"
      questions={questions}
      testId="js_dom_capstone_002_quiz"
    />
  );
}
