import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./midtermExamQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Comprehensive Mid-Term Certification Evaluation Quiz"
      questions={questions}
      testId="js_midterm_exam_002_quiz"
    />
  );
}
