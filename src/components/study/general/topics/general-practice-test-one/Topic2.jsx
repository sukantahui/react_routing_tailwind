// import QuizEngine from "../../../QuizEngine";
import PracticeEngine from "../../../PracticeEngine";
import questions from "./general-test.json";

export default function Topic2() {
  return (
    <PracticeEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}

