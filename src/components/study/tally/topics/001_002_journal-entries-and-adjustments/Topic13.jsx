import React from "react";
import QuizEngine from "../../../QuizEngine";
import LanguageToggle, { useTopicLanguage } from "./LanguageToggle";
import questions from "./topic13_files/topic13_quiz.json";

export default function Topic13() {
  const { language, setLanguage } = useTopicLanguage();

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8">
      <LanguageToggle language={language} onLanguageChange={setLanguage} />
      <QuizEngine
        title="Module 1.2 Assessment Test – Journal Entries & Adjustments"
        questions={questions}
        testId="tally_001_002_module_test"
        questionLimit={25}
        passPercent={70}
        certificateHeader="Coder & AccoTax"
        certificateSubtitle="Barrackpore Accounting Academy · www.codernaccotax.co.in"
        certificateTitle="Journal Entries & Adjustment Master Certificate"
        leaderboardTitle="Module 1.2 Leaderboard"
      />
    </div>
  );
}
