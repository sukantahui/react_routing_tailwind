import QuizEngine from "../../../QuizEngine";
import questions from "./operators-and-expressions.json";

export default function Topic9() {
  return (
    <QuizEngine
      title="Module Test – Control Flow & Decision Making"
      questions={questions}
      testId="c_syntax_test"
    />
  );
}
