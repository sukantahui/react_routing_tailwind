import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./wasmQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="WebAssembly (WASM) & Native Interop Quiz"
      questions={questions}
      testId="js_wasm_010_quiz"
    />
  );
}
