// import QuizEngine from "../../../QuizEngine";
import PracticeEngineAdvance from "../../../PracticeEngineAdvance";
import questions from "./proposition-logic-test.json";

export default function Topic21() {
  return (
    <div className="w-full sm:px-4 md:px-6 lg:max-w-7xl lg:mx-auto">
      <PracticeEngineAdvance
        title="Module Test – Control Flow & Decision Making"
        questions={questions}
        testId="Propositional logic"
      />
    </div>

  );
}

