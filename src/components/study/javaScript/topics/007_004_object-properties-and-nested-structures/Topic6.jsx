import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./objectAlgoQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Object Properties & Nested Data Structures Mastery Quiz"
      questions={questions}
      testId="js_obj_lab_007_quiz"
    />
  );
}
