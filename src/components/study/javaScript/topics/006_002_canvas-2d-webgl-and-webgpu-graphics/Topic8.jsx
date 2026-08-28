import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./graphicsQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Canvas 2D, WebGL Shaders & WebGPU Graphics Quiz"
      questions={questions}
      testId="js_gpu_010_quiz"
    />
  );
}
