import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./topic11_files/topic11_quiz.json";

export default function Topic11() {
  return (
    <QuizEngine
      title="Module 1.1 Assessment Test – Accounting Fundamentals & Account Classification"
      questions={questions}
      testId="tally_001_001_module_test"
      questionLimit={10}
      passPercent={70}
      certificateHeader="Coder & AccoTax"
      certificateSubtitle="Barrackpore Accounting Academy · www.codernaccotax.co.in"
      certificateTitle="Accounting Fundamentals & Account Classification Master Certificate"
      leaderboardTitle="Module 1.1 Leaderboard"
    />
  );
}
