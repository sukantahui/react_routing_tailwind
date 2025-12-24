// import QuizEngine from "../../../QuizEngine";
import PracticeEngineAdvance from "../../../PracticeEngineAdvance";
import questions from "./general-test.json";

export default function Topic3() {
  return (
    <PracticeEngineAdvance
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="js_control_flow_100"
    />
  );
}

