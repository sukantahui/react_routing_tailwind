import QuizEngine from "../../../QuizEngine";
import questions from "./topic19_files/questions.json";

export default function Topic19() {
  return (
    <QuizEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}
