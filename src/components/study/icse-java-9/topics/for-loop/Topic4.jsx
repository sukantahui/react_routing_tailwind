// import QuizEngine from "../../../QuizEngine";
import PracticeEngine from "../../../PracticeEngine";
import questions from "./for-loop-test.json";

export default function Topic4() {
  return (
    <PracticeEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}
