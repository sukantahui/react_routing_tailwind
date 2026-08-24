import QuizEngine from "../../../QuizEngine";
import questions from "./dictionaries-test.json";

export default function Topic17() {
  return (
    <QuizEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}
