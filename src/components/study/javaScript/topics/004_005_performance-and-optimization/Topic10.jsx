import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./perfQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Performance Optimization & Memory Profiling Quiz"
      questions={questions}
      testId="js_perf_008_quiz"
    />
  );
}
