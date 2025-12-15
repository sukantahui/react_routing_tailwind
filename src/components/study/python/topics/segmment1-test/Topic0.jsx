import QuizEngine from "../../../QuizEngine";
import questions from "./python_foundation_mcqs_part_01.json";

export default function Topic0() {
  return (
    <QuizEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}
