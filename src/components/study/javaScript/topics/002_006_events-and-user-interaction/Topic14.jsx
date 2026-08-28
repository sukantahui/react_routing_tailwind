import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./eventsQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Events, Listeners & Interactivity Quiz"
      questions={questions}
      testId="js_events_006_quiz"
    />
  );
}
