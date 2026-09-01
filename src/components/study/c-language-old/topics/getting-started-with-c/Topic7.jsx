import QuizEngine from "../../../QuizEngine";
import questions from "./c-fundamental-test.json";

export default function Topic7() {
  return (
    <QuizEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}
