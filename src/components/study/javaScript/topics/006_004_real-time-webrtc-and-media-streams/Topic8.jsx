import React from "react";
import QuizEngine from "../../../QuizEngine";
import questions from "./webrtcQuiz.json";

export default function QuizTopic() {
  return (
    <QuizEngine
      title="Real-Time WebRTC, Audio & Media Streams Quiz"
      questions={questions}
      testId="js_rtc_010_quiz"
    />
  );
}
