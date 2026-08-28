import QuizEngine from "../../../QuizEngine";
import questions from "./js-control-flow-test.json";

export default function Topic8() {
  return (
    <QuizEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}
