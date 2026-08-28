import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./nodeLibuvQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Node.js Core Internals & Libuv Architecture Quiz"
      questions={questions}
      testId="js_node_009_quiz"
    />
  );
}
