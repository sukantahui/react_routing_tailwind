import React from "react";
import QuizEngine from "../../../QuizEngine";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questions from "./topic11_files/topic11_quiz.json";

export default function Topic11() {
  const { language, setLanguage } = useTopicLanguage();

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8">
      <LanguageToggle language={language} onLanguageChange={setLanguage} />
      <QuizEngine
        title="Module 1.1 Master Assessment Test – Accounting Fundamentals & Account Classification (200 Questions)"
        questions={questions}
        testId="tally_001_001_module_test"
        questionLimit={200}
        passPercent={70}
        certificateHeader="Coder & AccoTax"
        certificateSubtitle="Barrackpore Accounting Academy · www.codernaccotax.co.in"
        certificateTitle="Accounting Fundamentals & Account Classification Master Certificate"
        leaderboardTitle="Module 1.1 Leaderboard"
      />
    </div>
  );
}
