import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./arrayAlgoQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Array Transformations & Aggregation Mastery Quiz"
      questions={questions}
      testId="js_arr_lab_007_quiz"
    />
  );
}
