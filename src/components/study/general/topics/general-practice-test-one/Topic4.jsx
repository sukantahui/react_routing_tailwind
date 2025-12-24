// import QuizEngine from "../../../QuizEngine";
import PracticeEngineAdvance from "../../../PracticeEngineAdvance";
import questions from "./general-test.json";

export default function Topic4() {
  return (
    <div className="w-full sm:px-4 md:px-6 lg:max-w-7xl lg:mx-auto">
      <PracticeEngineAdvance
        title="Module Test – Control Flow & Decision Making"
        questions={questions}
        testId="js_control_flow_100"
      />
    </div>

  );
}

