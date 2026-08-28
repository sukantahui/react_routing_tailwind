import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./dataStructuresQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Enterprise Data Structures & Algorithmic Challenges Mastery Quiz"
      questions={questions}
      testId="js_ds_lab_007_quiz"
    />
  );
}
