import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./stringAlgoQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="String Analysis & Character Manipulation Mastery Quiz"
      questions={questions}
      testId="js_str_lab_007_quiz"
    />
  );
}
