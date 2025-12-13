import QuizEngine from "../../../QuizEngine";
import questions from "./control-flow-decisions-test.json";

export default function Topic6() {
  return (
    <QuizEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="c_syntax_test"
    />
  );
}
