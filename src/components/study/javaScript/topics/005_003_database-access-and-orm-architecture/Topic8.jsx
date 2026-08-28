import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./dbOrmQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Database Access & Modern ORM Systems Quiz"
      questions={questions}
      testId="js_db_009_quiz"
    />
  );
}
